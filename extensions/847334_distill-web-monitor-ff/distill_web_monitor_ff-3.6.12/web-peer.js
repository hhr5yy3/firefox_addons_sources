const PeerConnection = (function () {
  let connections = {};
  let clientsGroup = {};
  let connectionPeers = {};
  let clients = {};
  let reconnectPeers = {};
  let reconnectHandle = {};
  let peers, ownPeer;
  let myGroups = [];
  let initialized = 0;
  const peerEvents = _.extend({}, Backbone.Events);
  const handleInit = Promise.resolve();
  function init() {
    return handleInit.then(() => new Promise(async () => {
      const user_id = Prefs.get('service.user_id');
      initialized++;
      if (user_id === undefined) initialized = 0;
      const client_id = Prefs.get('client.id');
      if (initialized === 1) {
        ownPeer = createPeer(user_id, client_id);
        ownPeer.on('open', () => {
          ClientStore.find({ user_id, state: C.STATE_DEFAULT }, { order: ['id'] }, (err, otherClients) => {
            if (otherClients.count > 0) {
              peers = otherClients.data;
              for (let other of peers) {
                if (other.type !== 2) {
                  peerConnect(other);
                }
              }
            }
          });
        })
      }
      if (user_id !== undefined) {
        try {
          const otherPeers = await getGroupDetail(client_id, user_id);
          storeGroups(otherPeers, client_id);
          peerEvents.trigger('update:clients');
        } catch (err) {
          DBG && console.error('Unable to fetch group details');
        }
      }
    }));
  }
  function storeGroups(otherPeers, client_id) {
    if (otherPeers.count > 0) {
      const peerInfo = otherPeers.data;
      for (let info of peerInfo) {
        if (info.client_id === client_id || info.client_id === null) {
          if (myGroups.includes(info.cgid) === false) { 
            myGroups.push(info.cgid);
          }
          if (connections[info.cgid] !== undefined && !connections[info.cgid].includes(info.client_id)) {
            connections[info.cgid].push(info.client_id);
          } else if (connections[info.cgid] === undefined) {
            connections[info.cgid] = [info.client_id];
          }
        } else {
          if (clientsGroup[info.client_id] !== undefined && !clientsGroup[info.client_id].includes(info.cgid)) {
            clientsGroup[info.client_id].push(info.cgid);
          } else if (clientsGroup[info.client_id] === undefined) {
            clientsGroup[info.client_id] = [info.cgid];
          }
          if (connections[info.cgid] !== undefined && !connections[info.cgid].includes(info.client_id)) {
            connections[info.cgid].push(info.client_id);
          } else if (connections[info.cgid] === undefined) {
            connections[info.cgid] = [info.client_id];
          }
        }
      }
      for (let groups in clientsGroup) {
        if (!clientsGroup[groups].includes(C.DEFAULT_GROUPID)) {
          clientsGroup[groups].push(C.DEFAULT_GROUPID);
        }
      }
    } else {
      myGroups.push(C.DEFAULT_GROUPID);
    }
  }

  function peerConnect(client) {
    const user_id = Prefs.get('service.user_id');
    const client_id = Prefs.get('client.id');
    if (client_id !== client.id) {
      joinPeer(user_id, ownPeer, client.id);
    }
  }
  function uninit() {
    return handleInit.then(() => new Promise(() => {
      connections = {};
      clients = {};
      connectionPeers = {};
      clientsGroup = {};
      myGroups = [];
    }));
  }

  function joinPeer(user_id, peer, id) {
    const conn = peer.connect(user_id + '-' + id, {
      reliable: true
    });
    if (conn !== undefined) {
      connectionOpenHandler(conn, user_id, peer);
    }
  }
  function createPeer(user_id, id) {
    var last_id = user_id + '-' + id;
    let invalidUser;
    let peer = window.peer = new Peer(
      last_id, {
      debug: 0,
      host: CFG.SIGNAL.WS_URL,
      port: CFG.SIGNAL.WS_PORT,
      path: '/signal',
      token: Prefs.get('client.token'),
      key: 'peerjs',
      secure: CFG.SIGNAL.SECURE,
    });
    clients[id] = C.CLIENT_ACTIVE;
    peer.on('disconnected', function () {
      peer._lastServerId = last_id;
      if (invalidUser !== C.CLIENT_INVALID) {
        peer.reconnect();
      }
    });
    peer.on('close', function () {
      peer.destroy();
    });
    peer.on('error', function (err) {
      // console.log(err)
      if (String(err).search('Invalid user')) {
        invalidUser = C.CLIENT_INVALID;
      }
      if (err.type === 'peer-unavailable') {
        const peerUUID = String(err).match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/i);
        const peer_id = peerUUID[0].replace(Prefs.get('service.user_id') + '-', '');
        let peerConn = peer._connections.get(peerUUID[0]);
        if(peerConn.length > 1 && peerConn[peerConn.length - 1]._eventsCount !== 4) {
          peer._removeConnection(peerConn[peerConn.length - 1]);
        }
        if (clients[peer_id] === C.CLIENT_ACTIVE) {
          clients[peer_id] = C.CLIENT_DISCONN;
          peerEvents.trigger('change:clients:disconnect', peer_id)
        } else {
          clients[peer_id] = C.CLIENT_INACTIVE;
        }
        peerReconnection(user_id, peer, peer_id, peerUUID);
      }
    });
    peer.on('connection', function (conn) {
      // console.log(peer.id, " is Connected to : " + conn.peer);
      connectionOpenHandler(conn, user_id, peer);
    });
    return peer;
  }

  function connectionOpenHandler(conn, user_id, peer) {
    // console.log("connectionOpenHandler:", conn.peer, 'connecting to ' + peer.id);
    conn.on('open', () => {
      peerEvents.trigger('change:clients:peerconnected', conn);
      // console.log("connectionOpenHandler:", conn.peer, 'has been Connected to ' + peer.id, conn.connectionId);
      if (reconnectHandle[conn.peer] !== undefined) {
        clearTimeout(reconnectHandle[conn.peer]);
        reconnectPeers[conn.peer] = 0;
      }
      const peer_id = conn.peer.replace(user_id + '-', '');
      conn.on('close', () => {
        // console.log('Disconnected: ', conn.peer, conn.connectionId, clients[peer_id]);
        let conns = peer._connections.get(conn.peer);
        for (let conn1 of conns) {
          if (conn1._eventsCount !== 4) {
            peer._removeConnection(conn1);
          }
        }
        if (conns.length === 0) {
          joinPeer(user_id, peer, peer_id);
        }
      })
      conn.on('data', function (data) {
        setMessage(data);
      })
      conn.on('error', function (err) {
        // console.log('Disconnected-err: ', conn.peer, conn.connectionId);
      });

      if (clients[peer_id] === C.CLIENT_ACTIVE) {
        let conns = peer._connections.get(conn.peer);
        // console.log('Disconnected-ing: ', conns.map(c => c.connectionId), conn.peer, conn.connectionId);
        for(let conn1 of conns) {
          if(conn1.connectionId !== conn.connectionId && conn1._eventsCount === 4) {
            conn1.close();
            peer._removeConnection(conn1);
          }
        }
      }
      if (clients[peer_id] !== C.CLIENT_DISCONN) {
        clients[peer_id] = C.CLIENT_ACTIVE;
      }
      clients[peer_id] = C.CLIENT_ACTIVE;
      connectionPeers[peer_id] = conn;
    });
  }
  function peerReconnection(user_id, peer, peer_id, peerUUID) {
    if (reconnectPeers[peerUUID[0]] === undefined || reconnectPeers[peerUUID[0]] === 0) {
      reconnectPeers[peerUUID[0]] = 2;
    } else if (reconnectPeers[peerUUID[0]] < 256) {
      reconnectPeers[peerUUID[0]] *= 2;
    }
    reconnectHandle[peerUUID[0]] = setTimeout(joinPeer, reconnectPeers[peerUUID[0]] * 1000, user_id, peer, peer_id);
  }

  function setMessage(message) {
    if (message.name === 'work') {
      const data = message.data;
      if (data.length === undefined) {
        WorkStore.create(data, function (errSaveWork) {
          if (errSaveWork) {
            DBG && console.error('Scheduler: failed to save work result to DB');
          }
        });
      } else {
        for (let work of data) {
          if (data.key !== undefined) {
            WorkStore.create(work, function (errSaveWork) {
              if (errSaveWork) {
                DBG && console.error('Scheduler: failed to save work result to DB');
              }
            });
          }
        }
      }
    } else if (message.name === 'group') {
      peerEvents.trigger('change:clients:updateGroup', message.data);
    } else if (message.name === 'notification') {
      peerEvents.trigger('change:clients:notification', message.data);
    }
  }
  async function getGroupDetail(id, user_id) {
    try {
      const cgids = await ClientGroupStore.find(
        { $or: [['client_id', id], ['client_id', null]] },
        { only: ['cgid'] });
      if (cgids) {
        const groups = [];
        for (let group of cgids.data) {
          groups.push(group.cgid);
        }
        return await ClientGroupStore.find(
          { 'cgid.in': groups, user_id, state: 0 }, { order: ['-cgid'] })
      }
    } catch (err) {
      console.error('Store: Error: Cannot Access')
    }
  }
  function sendAllPeers(data) {
    const allPeers = connectionPeers;
    for (let conn in allPeers) {
      connectionPeers[conn].send(data)
    }
  }

  return _.extend(peerEvents, {
    init,
    getClients: () => clients,
    uninit,
    getOwnGroups: () => myGroups,
    getClientsGroup: (client) => clientsGroup[client],
    connectionPeers,
    sendAllPeers,
    getConnections: (group) => connections[group],
    peerConnect,
  })
})();