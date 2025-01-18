const DATE_START = new Date();
const BROADCAST_HEARTBEAT_TIMEOUT = 120000; // 2 minutes
DBG && console.log('init main', DATE_START);

function upgradeCheck() {
  const version = Prefs.get('version');
  const newVersion = CFG.VERSION;

  if (!version) {
    Prefs.set('version', newVersion);

    // We are a new install. Show getting started page.
    setTimeout(function () {
      !DEV && !isElectron() && chrome.tabs.create({
        url: CFG.URL.WELCOME + '?utm_source=install',
        active: true,
      });
    }, 2000);
  } else if (version != newVersion) {
    const oldDate = version.split('.').pop();
    Prefs.set('version', newVersion);
    /*
    setTimeout(function() {
      showUpdateNotes(version, newVersion);
    }, 2000);
    */
  }
}


const diffWorker = new DiffWorker({ url: CFG.URL.DIFFWORKER });

const Scheduler = (function () {
  const q = [];
  const liveRunners = {};
  const runners = {};

  let timeouts = {}, count = 0;
  let checkInetervalId;
  let nActive = 0;

  //clientid changes on other peer disconnection
  let clientIds = [];
  const groupDetails = {};
  let initialized = false;

  function checkQueue() {
    // Check queue for schedule jobs and runs them when its their turn. Run it
    // only if there is an empty slot.
    const
      nMaxWorkers = Prefs.get('nworkers');


    const nWaiting = q.length;
    if (nWaiting > 0 && nActive < nMaxWorkers) {
      const id = q.shift();
      SieveStore.findOne(id, {
        only: ['id', 'name', 'uri', 'config', 'content_type', 'schedule',
          'err', 'client_id', 'rule_id', 'state', 'tags', 'user_id', 'macro_id', 'datasource_id'],
      }, function (err, sieve) {
        if(!sieve) {
          // could have been deleted after it was added to queue
          // XXX FIXME was it not deleted from `q`?
          return;
        }
        // allow turned off monitors so that manually run but paused monitors
        // work
        if (!isReadyToRun(sieve, true)) {
          // when sieve is not ready, return. clear any check state to make
          // sure that we don't show any checking state in the ui
          gEvents.trigger('worker:sieve:state', {
            id: sieve.id,
            state: C.RUN_STATE_INIT,
          });
          return;
        }

        sieve.config = JSON.parse(sieve.config);

        // DBG && console.log('Scheduler:checkQueue:findOne:', sieve);
        if (willAbortAndCanRun(sieve)) {
          run(sieve, function (err) {
            // console.log('Scheduler:run:callback:', err, sieve.id);
            // err && console.error('Error running:', sieve, err);

            count += 1;
            nActive -= 1;

            if (!(err && Err.ABORT.si(err))) {
              // Schedule again iff it has not been aborted by Scheduler.this
              schedule(sieve);
            } else {
              // Ignore errors that are ABORTs since they are called by
              // scheduler
            }
          });

          // Increment counter iff the worker started successfully.
          nActive += 1;
        }

        if (nActive < nMaxWorkers && nWaiting > 1) {
          setTimeout(checkQueue, 200);
        }
      });
    }
  }

  function deSchedule(sieveOrId) {
    // DBG && console.log('deSchedule:sieveOrId:', sieveOrId);

    const id = _.isString(sieveOrId) ? sieveOrId : sieveOrId.id;
    const timeoutId = timeouts[id];
    const liveRunner = liveRunners[id];

    if (timeoutId) {
      delete timeouts[id];
      clearTimeout(timeoutId);
    }

    if (liveRunner) {
      liveRunner.abort();
    }
    // What if the sieve is already being run? Let that run and finish.
  }

  function getScheduleOn(sieve, callback) {
    const schedule = sieve.schedule;

    WorkStore.find({
      rel: SieveStore.name,
      key: sieve.id,
    }, {
      limit: 10,
      only: ['id', 'err', 'ts'],
      order: ['-ts'],
    }, function (err, result) {
      if (err) {
        callback(err);
      } else {
        const scheduler = ScheduleDescriptors[schedule.type];
        if (!scheduler) {
          callback(new Err.TYPE_UNKNOWN({
            type: 'scheduler',
            value: schedule.type,
          }));
        } else {
          callback(null, scheduler.getSchedule(schedule.params, result.data));
        }
      }
    });
  }

  function onUpdate(sieve) {
    // console.log('onUpdate:', sieve);
    const {id, state} = sieve;
    if ((state != void 0) && (state != C.STATE_READY)) {
      // console.log('onUpdate:deSchedule', sieve);
      deSchedule(id);
    } else if (state == C.STATE_READY) {
      // console.log('onUpdate:schedule', sieve);
      schedule(id);
    } else if ('schedule' in sieve) {
      // console.log('onUpdate:schedule', sieve);
      schedule(id);
    }
  }

  function processResult(sieve, result, doneCallback) {
    // console.log('processResult:result:', result);
    const dataAttr = sieve.config.dataAttr || 'text';
    const ignoreWhitespace = sieve.config.ignoreWhitespace !== false;

    SieveDataProxy.find({
      sieve_id: sieve.id,
    }, {
      only: ['id', 'ts', 'text', 'data'],
      order: ['-ts'],
      limit: 1,
    }, function (err, res) {
      if (err) {
        // console.error('Scheduler:failed to find sieve data', err);
        doneCallback(err);
      } else {
        const lastData = res.count > 0 ? res.data[0] : null;
        const
          RE_WHITESPACE = /\s|\b/g;


        const RE_SPLIT = /\s+|\b/g;


        const equal = lastData &&
          (ignoreWhitespace ?
            _.isEqual(lastData[dataAttr].replace(RE_WHITESPACE, ''),
              result[dataAttr].replace(RE_WHITESPACE, ''))
            :
            _.isEqual(lastData[dataAttr].split(RE_SPLIT),
              result[dataAttr].split(RE_SPLIT))
          );

        if (equal) {
          if (sieve.err) {
            // Clear error from previous run
            SieveStore.update(sieve.id, { err: null }, doneCallback);
          } else {
            // Do nothing.
            doneCallback();
          }
        } else {
          saveData(lastData);
        }
      }
    });

    function saveData(lastData) {
      const
        now = Date.now();


      const ts = (new Date(now)).toISOString();


      const ts_view = (new Date(now + 1)).toISOString();
      // Save data
      async.parallel({
        sieve_data: function (callback) {
          SieveDataStore.create(_.extend({
            sieve_id: sieve.id,
            ts,
            ts_mod: ts,
            client_id: Prefs.get('client.id')
          }, result), callback);
        },
        sieve: function (callback) {
          const
            doc = {
              err: null,
              // Trim text content for preview
              text: result.text.slice(0, 199),
              ts_data: ts,
            };
          if (!lastData) {
            doc.ts_view = ts_view;
          }
          SieveStore.update(sieve.id, doc, callback);
        },
      }, async function (err, results) {
        doneCallback(err);

        if (!lastData) {
          return;
        }

        function getSummary(diffs) {
          // console.log('diffs:', diffs);
          let firstIns = -1;
          let firstInsEnd = -1;
          let len = 0;
          let summary = _.reduce(diffs, function (buff, aDiff) {
            const op = aDiff[0];
            let text = aDiff[1];

            if (op == DIFF_EQUAL) {
              buff.push(text);
              len += text.length;
            } else if (op == DIFF_INSERT) {
              text = '*' + text.trim() + '*';
              buff.push(text);
              if (firstIns < 0) {
                firstIns = len;
                firstInsEnd = firstIns + text.length;
              }
              len += text.length;
            }
            return buff;
          }, []).join('');

          if (firstIns > 40) {
            if (firstInsEnd > 80) {
              // XXX Slice on a word boundary
              summary = '...' + summary.slice(firstIns - 10);
            }
          }

          return summary.slice(0, 199);
        }

        const curData = results.sieve_data;

        if(!diffWorker.ready){
          await diffWorker.init();
        }
        let diffs;
        try {
          diffs = await diffWorker.diff(lastData.text, curData.text, {type: 'text'});
        } catch (err) {
          DBG && console.error('Scheduler:failed to diff', err);
          diffs = [[diff_match_patch.DIFF_INSERT, curData.text]];
        }

        const dels = _.reduce(diffs, function (buff, aDiff) {
          if (aDiff[0] == DIFF_DELETE) {
            buff.push(aDiff[1]);
          }
          return buff;
        }, []).join(' ');


        const inserts = _.reduce(diffs, function (buff, aDiff) {
          if (aDiff[0] == DIFF_INSERT) {
            buff.push(aDiff[1]);
          }
          return buff;
        }, []).join(' ');

        if(sieve.tags) {
          let tagIds = sieve.tags.split(',');
          let tagDocs = (await TagStore.find({
            'id.in': tagIds,
            state: C.STATE_DEFAULT,
          })).data;
          sieve.tags = _.map(tagDocs, doc => doc.name).join(',');
        }

        const context = {
          sieve,
          sieve_data: results.sieve_data,
          old_sieve_data: lastData, // added for matchRule
          items: [curData, lastData],
          diffs,
          dels,
          inserts,
        };

        /*
        if(curData.text.length > 80) {
          // Focus on changes in preview.
          SieveStore.update(sieve.id, { text: getSummary(diffs) });
        }
        */
        ActionManager.computeActions(context);

        // Prune old data that is outside of storage units
        SieveDataStore.destroyWithSubQuery({
          sieve_id: sieve.id,
        }, {
          limit: 10,
          offset: Prefs.get('nhist') || 10, // limit according to client's abilities
          order: ['-ts'],
        }, function (err) {
          if (err) {
            DBG && console.error('Scheduler:SieveDataStore:destroyWithSubQuery', err);
          }
        });
      });
    }
  }

  function qNow(id) {
    deSchedule(id);
    q.push(id);

    gEvents.trigger('worker:sieve:state', {
      id,
      state: C.RUN_STATE_WAIT,
    });
  }

  function resetAll() {
    _.each(_.values(timeouts), deSchedule);
    _.each(_.values(runners), stop);
    updateCliendIds();
  }

  function run(sieve, callback) {
    // console.log('Scheduler:run:', sieve);
    const runner = new Runner(sieve);

    // Keep reference for control.

    runners[sieve.id] = runner;

    runner.run(function (errRun, result, metrics) {
      // console.log('Scheduler:run:runner.run:', errRun, result, metrics);
      delete runners[sieve.id];
      sieveResultHandler(sieve, errRun, result, metrics, callback);
    });

    gEvents.trigger('worker:sieve:state', {
      id: sieve.id,
      state: C.RUN_STATE_WIP,
    });
  }

  function runLive(sieve) {
    const oldRunner = liveRunners[sieve.id];

    if (oldRunner) {
      // console.log('LiveRunner already running');
      return;
    }

    const liveRunner = new LiveRunner(sieve);

    liveRunners[sieve.id] = liveRunner;

    liveRunner.run(function (errRun, result, metrics) {
      if (errRun) {
        DBG && console.error('Error running live monitor', errRun, sieve);
        if (Err.ABORT.si(errRun)) {
          // deSchedule aborts a liveRunner. Remove the runner here after the
          // abort. It should be re-scheduled later
          delete liveRunners[sieve.id];
        } else if (Err.TIMEOUT.si(errRun)) {
          liveRunner.abort();
        }
      }
      sieveResultHandler(sieve, errRun, result, metrics, function (err) {
        if (!err) {
          return;
        }
      });
    });
  }

  function sieveResultHandler(sieve, errRun, result, metrics, callback) {
    if (errRun && Err.ABORT.si(errRun)) {
      callback(errRun);
      return;
    }

    const work = {
      rel: SieveStore.name,
      key: sieve.id,
      duration: metrics ? metrics.duration : 0,
    };

    let snapshot
    if (errRun) {
      snapshot = errRun.snapshot ? errRun.snapshot : undefined
      if (snapshot) {
        delete errRun.snapshot
      }

      WorkStore.find({
        key: sieve.id,
      }, {
        limit: 1,
        only: ['id', 'err', 'ts'],
        order: ['-ts'],
      }, function (err, result) {
        if (err) {
          console.error('Error querying WorkStore', err);
        } else {
          const lastError = result.count > 0 ? JSON.parse(result.data[0].err) : null;
          errRun.count = lastError && lastError.count ? lastError.count + 1 : 1;
        }
        work.err = JSON.stringify(errRun);
        insertWork();
      });

      if(!errRun.code) {
        // log unknown error so that we can fix it
        logMessage('sieve: unknown run error', {extra: {errRun, sieve}});
      }
    } else {
      insertWork();
    }

    async function insertWork() {
      let savedWork
      try {
        savedWork = await WorkStore.create(work)
      } catch (err) {
        DBG && console.error('Scheduler: failed to save work result to DB', err);
      }

      if (snapshot) {
        try {
         const res = await SieveSnapshotStore.create({
            sieve_id: sieve.id,
            work_id: savedWork.id,
            uri: snapshot.uri,
            content: snapshot.content,
            content_type: 'text/html',
          })

          await WorkStore.update({id: savedWork.id}, {snapshot_id: res.id});
        } catch (err) {
          DBG && console.error('SieveSnapshotStore: cannot insert the snapshot', err);
        }
      }

      if (errRun) {
        await SieveStore.update(sieve.id, {err: work.err})
        try {
          ErrorActions.handleError(sieve, errRun);
        } catch (e) {
          console.error('Error calling handleError', e);
        }

        callback(errRun);
      } else {
        processResult(sieve, result, callback);
      }

      try {
        const result = await WorkStore.find({rel: SieveStore.name, key: sieve.id,}, {
          limit: 10,
          offset: 10,
          order: ['-ts'],
          only: ['id']
        })
        if (result.count > 0) {
          await SieveSnapshotStore.destroyWithSubQuery({"work_id.in": result.data.map((d) => d.id),}, {})
        }
      } catch (err) {
        DBG && console.error('Scheduler:WorkStore:create:SieveSnapshotStore:destroy:err', err);
      }

      // Delete old entries from work log.
      // TODO Collect metrics into a stats table to summarize activity.
      try {
        await WorkStore.destroyWithSubQuery({
          rel: SieveStore.name,
          key: sieve.id,
        }, {
          limit: 10,
          offset: 10,
          order: ['-ts'],
        });
      } catch (err) {
        DBG && console.error('Scheduler:WorkStore:create:destroy:err', err);
        // A case of unhandled error.
      }

      if (sieve.client_id !== Prefs.get('client.id')) {
        const workTable = {
          name: 'work',
          data: work
        }
        PeerConnection.sendAllPeers(workTable);
      }
    }

    gEvents.trigger('worker:sieve:state', {
      id: sieve.id,
      state: C.RUN_STATE_INIT,
    });
  }

  function isReadyToRun(sieve, allowPaused = false) {
    const user_id = auth.getId();
    return (sieve
      && clientIds.includes(sieve.client_id)
      && (!user_id || sieve.user_id == user_id)
      && (allowPaused || sieve.state == C.STATE_READY));
  }

  function schedule(sieve, callback) {
    callback || (callback = function (err) {
      if (err) throw err;
    });
    // console.log('Clients Monitoring: ', clientIds)
    const id = _.isString(sieve) ? sieve : sieve.id;

    SieveStore.findOne(id, function (err, sieve) {
      if (!isReadyToRun(sieve)) {
        deSchedule(id);
        return;
      }

      sieve.config = JSON.parse(sieve.config);
      sieve.schedule = JSON.parse(sieve.schedule);

      if (sieve.schedule.type == 'LIVE') {
        // Start live runner
        runLive(sieve);
        callback();
        return;
      }

      getScheduleOn(sieve, function (err, scheduleOn) {
        if (err) {
          DBG && console.error('Error getting schedule:', sieve, err);
          callback(err);
        } else if (scheduleOn < 0) {
          // There is no need to schedule it according to its parameters.
          // DBG && console.log('Scheduler:not scheduled:', sieve.id, sieve.name);
          callback();
        } else {
          // console.log('Scheduler: schedule:', sieve.id, sieve.name, scheduleOn-Date.now()/1000);
          deSchedule(id);

          // XXX limit min and max https://stackoverflow.com/a/43358488
          const intervalInMs = Math.max(Math.min(scheduleOn * 1000 - Date.now(), 0x7FFFFFFF), 0);
          timeouts[sieve.id] = setTimeout(function () {
            // XXX There could be a subtle bug when the timeout for this sieve is
            // set after it was scheduled.
            qNow(sieve.id);
          }, intervalInMs);

          callback();
        }
      });
    });
  }
  function scheduleMonitors(offset=0) {
    SieveStore.find({
      state: C.STATE_READY,
      'client_id.in': clientIds,
      $or: [
        ['user_id', auth.getId()],
        ['user_id', null],
      ],
    }, {
      limit: 1000,
      offset: offset,
      only: ['id', 'schedule', 'client_id', 'ts'],
      order: ['-ts'],
    }, function (err, result) {
      // console.log('monitoring: clients: ', [...clientIds], '; sieves: ', result.data, 0);
      if (err) {
        console.error('Failed to schedule.', err);
        // XXX Severe error, unilkely to happen.
      } else {
        async.eachSeries(result.data, schedule, function (err) {
          if (err) {
            DBG && console.error('Error scheduling:', err);
          } else {
            if (result.total_count > (result.count + result.offset)) {
              scheduleMonitors(result.offset + result.count);
            }
          }
        });
      }
    });
  }
  function updateClientIds() {
    initiatePeerTable();
    scheduleMonitors();
  }

  function checkAndElectCoordinator(closedConnId) {
    const closedPeerGroup = PeerConnection.getClientsGroup(closedConnId);
    const clients = _.clone(PeerConnection.getClients());
    let coordinator;
    const orderedClients = {};
    Object.keys(clients).sort().forEach(function (key) {
      orderedClients[key] = clients[key];
    });

    // console.log(closedPeerGroup, clients)
    if (closedPeerGroup !== undefined) {
      for (let group of closedPeerGroup) {
        let count = 0, conn;
        if (group === C.DEFAULT_GROUPID && !clientIds.includes(C.DEFAULT_GROUPID) && groupDetails[C.DEFAULT_GROUPID] === closedConnId) {
          for (let id in orderedClients) {
            if (orderedClients[id] === C.CLIENT_ACTIVE) {
              coordinator = id;
              break;
            }
          }
          electCoordinator(1, coordinator, null, C.DEFAULT_GROUPID);
        } else if (group !== C.DEFAULT_GROUPID && groupDetails[group] === closedConnId) {
          for (conn of PeerConnection.getConnections(group)) {
            if (conn !== null) {
              if (clients[conn] === C.CLIENT_ACTIVE && count <= 2) {
                count++;
                coordinator = conn;
              } else if (count > 1) {
                break;
              }
            }
          }
          electCoordinator(count, coordinator, conn, group);
        }
      }
    } else {
      if(!clientIds.includes(C.DEFAULT_GROUPID)) {
        electCoordinator(1, Prefs.get('client.id'), null, C.DEFAULT_GROUPID);
      }
    }
    const msg = {
      name: 'group',
      data: groupDetails
    }
    PeerConnection.sendAllPeers(msg);
    scheduleMonitors();
  }

  function electCoordinator(count, coordinator, conn, group) {
    if (((count >= 1 && coordinator === Prefs.get('client.id')) || (count <= 1 && conn === Prefs.get('client.id'))) && clientIds[clientIds.length - 1] !== C.DEFAULT_GROUPID) {
      clientIds.push(group);
      groupDetails[group] = coordinator;
    }
  }

  function willAbortAndCanRun(sieve) {
    // If it is already running, stop current runner and remove its references.
    const oldRunner = runners[sieve.id];

    if (!oldRunner) {
      return true;
    }

    if (!_.isEqual(sieve.config, oldRunner.config)) {
      oldRunner.abort();
      delete runners[sieve.id];
      return true;
    }

    return false;
  }

  function initiatePeerTable() {
    const localGroup = loadClientIds();
    makeCoordinator(localGroup);
    clientIds =  _.union(localGroup, [Prefs.get('client.id')]);
  }

  function makeCoordinator(localGroup) {
    for (let peer_id of localGroup) {
      groupDetails[peer_id] = Prefs.get('client.id');
    }
    if (Object.entries(groupDetails).length !== 0) {
      const msg = {
        name: 'group',
        data: groupDetails
      }
      PeerConnection.sendAllPeers(msg);
    }
  }
  function loadClientIds() {
    let localGroup = _.clone(PeerConnection.getOwnGroups());
    const clients = _.clone(PeerConnection.getClients());
    for (let client in clients) {
      let clientsGroup = PeerConnection.getClientsGroup(client);
      if (clients[client] === C.CLIENT_ACTIVE && client !== Prefs.get('client.id') && Object.entries(localGroup).length !== 0) {
        localGroup = localGroup.filter(item => {
          if (groupDetails[item] === Prefs.get('client.id')) {
            return true;
          } else if (item !== undefined && clientsGroup !== undefined) {
            return clientsGroup.indexOf(item) < 0;
          } else if (clientsGroup === undefined && item === C.DEFAULT_GROUPID) {
            return false;
          }
        });
      }
    }
    return localGroup;
  }
  function onPeerConnect(conn) {
    const msg = {
      name: 'group',
      data: groupDetails
    }
    conn.send(msg);
  }

  function updateGroupDetails(groups) {
    for (let peer_id in groups) {
      groupDetails[peer_id] = groups[peer_id];
    }
  }
  return {
    isBusy: function () {
      return _.size(runners) > 0;
    },

    checkNow: function (ids) {
      _.each(ids, qNow);
    },

    getInfo: function () {
      return { count, initialized, nActive, nQueued: q.length, clientIds };
    },

    init: function () {
      if (initialized) this.uninit();
      PeerConnection.init();
      _.delay(updateClientIds, 6000);
      checkInetervalId = setInterval(function () {
        checkQueue();
      }, 1000);
      gEvents.on('store:' + SieveStore.name + ':create', schedule);
      gEvents.on('store:' + SieveStore.name + ':update', onUpdate);
      gEvents.on('store:' + SieveStore.name + ':destroy', deSchedule);

      gEvents.on('store:' + ClientGroupStore.name + ':create', PeerConnection.init);
      gEvents.on('store:' + ClientStore.name + ':create', PeerConnection.peerConnect);
      gEvents.on('store:' + ClientGroupStore.name + ':update', PeerConnection.init);

      PeerConnection.on('update:clients', updateClientIds);
      PeerConnection.on('change:clients:disconnect', checkAndElectCoordinator);
      PeerConnection.on('change:clients:peerconnected', onPeerConnect);
      PeerConnection.on('change:clients:updateGroup', updateGroupDetails);

      initialized = true;
    },

    uninit: function () {
      initialized = false;

      clearInterval(checkInetervalId);

      gEvents.off('store:' + SieveStore.name + ':create', schedule);
      gEvents.off('store:' + SieveStore.name + ':update', onUpdate);
      gEvents.off('store:' + SieveStore.name + ':destroy', deSchedule);

      _.each(_.values(runners), function (runner) {
        runner.abort();
      });
      _.each(_.values(liveRunners), function (runner) {
        runner.abort();
      });

      _.each(timeouts, clearTimeout);
      timeouts = {};

      q.splice(0);
      PeerConnection.uninit();
      gEvents.off('store:' + ClientGroupStore.name + ':create', PeerConnection.init);
      gEvents.off('store:' + ClientStore.name + ':create', PeerConnection.peerConnect);
      gEvents.off('store:' + ClientGroupStore.name + ':update', PeerConnection.init);

      PeerConnection.off('update:clients', updateClientIds);
      PeerConnection.off('change:clients:disconnect', checkAndElectCoordinator);
      PeerConnection.off('change:clients:peerconnected', onPeerConnect);
      PeerConnection.off('change:clients:updateGroup', updateGroupDetails);
    },
  };
})();

var ActionManager = (function () {
  async function computeActions(context) {

    let {sieve} = context;

    let promises = [
      UserStore.findOne(auth.getId()),
      ActionStore.find({ sieve_id: sieve.id, state: 0, }),
    ];

    if (sieve.rule_id) {
      promises.push(RuleStore.findOne(sieve.rule_id));
    }

    let [user, rActions, rule] = await Promise.all(promises);
    user || (user = {id: 0, prefs: {}});

    let globalActions = await getGlobalActions(user);
    let actions = dedupeActions([...globalActions, ...rActions.data]);

    context.actions = actions;
    context.rule = rule;

    // console.log('computeActions: context after diff: ', context);

    let matched = true;
    matched = matchRule(context, user.prefs);
    await updateSieveDataWithConditions(context, user.prefs, matched);
    if (matched) {
      await setContextDiff(context, user);
      takeActions(context);
      // Broadcast audio and popup actions to other peers
      const actions = context.actions.filter(
        (action) => action.type == C.ACTION_LOCAL_POPUP || action.type == C.ACTION_LOCAL_AUDIO
      );
      if (actions.length > 0) {
        const remoteContext = { ...context, actions };
        PeerConnection.sendAllPeers({
          name: 'notification',
          data: remoteContext
        });
      }
    } else {
      // Mark item as read
      SieveStore.update(sieve.id, { ts_view: Date.now() });
    }
  }

  async function updateSieveDataWithConditions(context, prefs, matched) {
      const sieveConditions = context.rule;
      const globalConditions = prefs.rule;
      const sieveConditionVersion = sieveConditions?.version ?? '';
      const globalConditionVersion = globalConditions?.version ?? '';
      const sieveRule = JSON.parse(sieveConditions?.config ?? '{}');

      const metaConditions = {
        rule: {
          global: {
            rules: { rule: globalConditions ?? {} },
            version: globalConditionVersion
          },
          sieve: {
            rules: sieveRule ?? {},
            version: sieveConditionVersion
          }
        }
      }

      const metaConditionsString = JSON.stringify(metaConditions);
      await SieveDataStore.update(
        { id: context.sieve_data.id },
        {
          meta: metaConditionsString,
          triggered: matched
        }
      );
  }

  function takeActions(context) {
    // console.log('takeActions:', context);
    async.each(context.actions, function (action, callback) {
      const desc = ActionDescriptors[action.type];
      if (!desc) {
        DBG && console.error('Invalid action type', action);
        callback(new Err.NOT_FOUND({
          type: 'action:desc',
          id: action.type,
        }));
      } else {
        // console.log('ActionManager:takeAction:', action);
        action = { ...action, config: JSON.parse(action.config||null) }
        // action.config && (action.config = JSON.parse(action.config));
        desc.act(action, context, callback);
      }
    });
  }


  return {

    computeActions,

    init: function () {
      // Start listening to events that result in actions.
      // Listen for action events sent by peers
      PeerConnection.on('change:clients:notification', onNotification);
      function onNotification(context) {
        setTimeout(takeActions, 2000, context);
      }
    },

    uninit: function () {
      // Remove peer notification listener or let remote notifications come?
    },
  };
})();

async function getGlobalActions({id, prefs}) {
  if(!prefs) {
    logMessage('user: prefs missing:', {extra: {id, }});
    return [];
  }
  let actions = prefs.actions;
  let hasApp = !!await AttrStore.findOne({
    user_id: id,
    'name.in': ['apns_id', 'fcm_id', ],
    state: C.STATE_DEFAULT,
  });

  if(hasApp && actions == null) {
    actions = [{
      type: C.ACTION_PUSH,
      config: null,
    }];
  }

  return actions || [];
}

function dedupeActions(actions) {
  return _.uniq(actions, (action) => action.type+action.config);
}

// set notification email content
async function setContextDiff(context, user) {
  if (!user.id) {
    return;
  }
  const newData = context.items[0];
  const oldData = context.items[1];

  // TODO set default behaviour if prefs not set

  const emailPrefs = _.defaults(user?.prefs?.action_email || {}, {
    content_type: 'HTML',
    highlighted: true,
    snipped: true,
    mode: 'SPLIT'
  });

  const { content_type } = context.sieve;
  switch (content_type) {
    case C.TYPE_FEED:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, { type: 'feed' });
      } catch (e) {
        console.error('error:setContextDiff:feed: ', e);
      }
      break;
    case C.TYPE_JSON:
      try {
        context.html = await diffWorker.diffAndRenderEmail(oldData.data, newData.data, {
          type: 'json',
          emailOpts: emailPrefs
        });
      } catch (e) {
        console.error('error:setContextDiff:json: ', e);
      }
      break;
    default:
      // html diff
      const isHTML = emailPrefs.content_type == 'HTML';
      const newHtml = isHTML ? newData.data : `<div>${newData.text}</div>`;
      const oldHtml = isHTML ? oldData.data : `<div>${oldData.text}</div>`;

      // in html diff, xml tags are preserved as-is but xml diff needs <,> in xml tags to be replaced with $lt; and $gt;
      // html : <span><note></note></span>
      // text: <span>&lt;note&gt;&lt;/note&gt;</span>
      try {
        let result = await diffWorker.diffAndRenderEmail(oldHtml, newHtml, {
          type: content_type === C.TYPE_XML ? 'text' : 'html',
          emailOpts: { oldTs: oldData.ts, ...emailPrefs }
        });
        context.html = result;
      } catch (e) {
        context.html = newHtml;
        console.error('error:setContextDiff:email: ', e);
      }
  }
}

function setDiffStyle(doc) {
  setStyle(doc.querySelectorAll('.removed'), 'background-color', '#ff9494');
  setStyle(doc.querySelectorAll('.inserted'), 'background-color', '#b7fdcb');

  setStyle(doc.querySelectorAll('span.inserted, span.removed'), 'padding', '1px 4px');

  setStyle(doc.querySelectorAll('a.removed, a .removed'), 'color', '#008');

  setStyle(doc.querySelectorAll('img.removed'), 'border', 'solid 2px red');
  setStyle(doc.querySelectorAll('img.removed'), 'background-color', 'transparent');
  setStyle(doc.querySelectorAll('img.removed'), 'padding', '2px');

  setStyle(doc.querySelectorAll('img.inserted'), 'border', 'solid 2px green');
  setStyle(doc.querySelectorAll('img.inserted'), 'background-color', 'transparent');
  setStyle(doc.querySelectorAll('img.inserted'), 'padding', '2px');

  function setStyle(els, name, value) {
    _.each(els, function (el) {
      el.style[name] = value;
    });
  }
}

function Service(options) {
  const self = this;

  this.options = _.extend({}, this.OPTIONS, options);
  this.active = true;
  this.state = new Backbone.Model({ unread: 0, error: 0, sync: {
      syncing: false,
      name: null,
      err: null
    } }); // for ui
  this.initialized = false;
  this.initError = null;

  _.extend(this, Backbone.Events);

  this.once('init:stores', () => {
    // The most important step in init is preparing stores. So setting flag here
    // even when other parts that are super critical may fail
    this.initialized = true;

    initLocale();
  });


  this.init((err) => {
    if (Prefs.get('sieve-slot.enabled')) {
      Prefs.set('active', checkSlot());
    }

    setInterval(() => {
      if (Prefs.get('sieve-slot.enabled')) {
        Prefs.set('active', checkSlot());
      }
    }, 60000);

    Prefs.on('change:sieve-slot.enabled', (enabled) => {
      if (enabled) {
        Prefs.set('active', checkSlot());
      } else {
        Prefs.set('active', true);
      }
    });

    if (err) {
      console.error('Failed to init distill service:', err);
      this.initError = err;
      this.trigger('init:error', err);
    }

    upgradeCheck();

    auth.on('login', () => {
      // Called whenever user's logged in status changes
      if (auth.isReady()) {
        this.active && Scheduler.init();
        this.initData();
        this.updateState();
      }
    });

    auth.on('expired', () => {
      Scheduler.uninit();
      chrome.tabs.query({ url: CFG.URL.BASE + '*' }, function (tabs) {
        tabs.forEach((tab) => chrome.tabs.update(tab.id, { url: tab.url }));
      });
    });

    auth.on('logout', () => {
      this.setEventSource(null);
    });
  });
}

_.extend(Service.prototype, {

  appUrl: CFG.URL.WATCHLIST,

  serviceLoginUrl: CFG.URL.LOGIN,

  Scheduler: Scheduler,

  SyncMan: SyncMan,

  heartbeatTimer: null,

  checkNow: Scheduler.checkNow,

  getInfo: function () {
    return {
      active: this.active,
      ready: this.ready,
      errEventSource: this.errEventSource,
      initError: this.initError,
      initialized: this.initialized,
      scheduler: Scheduler.getInfo(),
    };
  },

  toggleService: function () {
    Prefs.set('sieve-slot.enabled', false);
    Prefs.set('active', !Prefs.get('active'));
  },

  // add listener that will be called back after service has inititalized
  afterInit: function (callback) {
    // NOTE Order of initialized and initError is important
    if (this.initialized) {
      callback();
    } else if (this.initError) {
      callback(this.initError);
    } else {
      this.once('init:stores', function () {
        try {
          callback();
        } catch (e) {
          // NOTE An error in one callback doesn't affect others
          console.error('Error calling afterInit callback', e);
        }
      });
      this.once('init:error', function (err) {
        try {
          callback(err);
        } catch (e) {
          console.error('Error calling afterInit callback', e);
        }
      });
    }
  },

  init: function (callback) {
    // gEvents.off('store:'+SieveDataStore.name+':create', this.onSieveDataCreate, this);
    gEvents.on('store:' + SieveDataStore.name + ':create', this.onSieveDataCreate, this);
    SyncMan.on("all", (eventName, err, _) => {
      if (eventName.endsWith(":sync:init")) {
        const storeName = eventName.split(":sync")[0]
        this.state.set("sync", {
          syncing: true,
          name: storeName
        })
      } else if (eventName.endsWith(":sync")) {
        const storeName = eventName.split(":sync")[0]
        this.state.set("sync", {
          syncing: false,
          name: storeName,
          err
        })
      }
    })

    this.initData(callback);
  },

  initData: function (callback) {
    async.series([
      initStores,
      (callback) => {
        this.trigger('init:stores');
        callback();
      },
      SyncId.init,
      (callback) => {
        auth.init(function (err) {
          // console.log('auth.init done');
          // TODO Add error to message store for review by user.
          err && console.error('Failed to init auth', err);
          callback();
        });
      },
      initData,
      (callback) => {
        this.triggerInit();
        this.initSync(callback);
      },
    ], callback);
  },

  isReady() {
    return this.ready;
  },

  isActive() {
    return this.active;
  },

  triggerInit: function () {
    this.ready = true;
    this.trigger('init init:data');
    gEvents.trigger('init');
  },

  initSync: promisifyOrCallback(function (callback){
    callback || (callback = function () { });

    if (SyncMan.canSync()) {
      api('/users/constraints', (err, constraint) => {
        if (err) {
          if (err.status == 401 || err.status == 403) {
            callback(err);
            // Do not retry in case of authentication failure
            // XXX sync inits after auth resets.
            // TODO Check various authentication and network failure modes
            // TODO Flag this error to user so that they can take action
            return;
          }

          let
            retryInterval = 300000; // 5 mins
          if (err.status == 403) {
            retryInterval = 3600000;
          } else if (err.status == 0 || err.status >= 500) {
            // temporary interruption
            retryInterval = 5000;
          }

          setTimeout(() => this.initSync(), retryInterval); // Retry
          callback(); // XXX Don't send back error
        } else {
          if (constraint.sync == 'S') {
            SyncMan.accountEnabled = true;
            // SyncMan.sync(false, callback);
            this.createEventSource(callback);
          } else {
            callback();
          }
        }
      });
    } else {
      // console.log('auth not set, cant create event source');
      this.setEventSource(null);
      callback();
    }
  }),

  createEventSource: function (callback) {
    callback || (callback = function () { });
    createEventSource((err, res) => {
      this.errEventSource = err;
      if (err) {
        console.error("createEventSource err callback", err)
        setTimeout(() => this.createEventSource(), 10000);
        callback();
      } else {
        this.setEventSource(res, callback);
      }
    });
  },

  resetHeartbeatTimer: function () {
    // Wait 2 minutes for a broadcast heartbeat
    // Re-initialize the eventsource if heartbeat is not recieved
    clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = setTimeout(() => {
      console.error('Broadcast message not received within timeout', new Date());
      setTimeout(() => this.createEventSource(), 10000);
    }, BROADCAST_HEARTBEAT_TIMEOUT);
  },

  markRead: function (callback) {
    SieveStore.update({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'ts_view.lt': { name: 'ts_data', type: 'field' },
    }, {
      ts_view: Date.now(),
    }, callback);

    this.syncStore(SieveStore);
  },

  markReadById: async function (id) {
    await SieveStore.update(id, { ts_view: Date.now() });
    this.syncStore(SieveStore);
  },

  pause: function () {
    Scheduler.uninit();
    ActionManager.uninit();
    // PeerConnection.uninit();
    gEvents.off('store:create:' + SieveStore.name, this.onSieveCreate, this);
    gEvents.off('store:destroy:' + SieveStore.name, this.onSieveDestroy, this);
    gEvents.off('store:update:' + SieveStore.name, this.onSieveUpdate, this);
  },

  onSieveCreate: function (doc) {
    this.updateState(doc.id);
  },

  onSieveDataCreate: function (doc) {
    if (doc._state !== C.LOCAL_STATE_SYNCED) {
      this.syncStore(SieveDataStore, (err) => {
        if (!err) {
          this.syncStore(SieveStore, { delay: 100 });
        }
      });
    }
  },

  onSieveDestroy: function (doc) {
    // console.log('onSieveDestroy');
    this.updateState(doc.id);
  },

  onSieveUpdate: function (doc) {
    // console.log('main:onseiveupdate:', doc);
    this.updateState(doc.id);
  },

  open: function (id, options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }

    SieveStore.findOne(id, {
      only: ['uri', 'name'],
    }, (err, sieve) => {
      if (err) {
        callback(new Err.NOT_FOUND({
          type: 'sieve',
          id: id,
        }));
      } else {
        // Look for open weapps. Request and focus one of them to show
        // sieve in inbox. If none is open, create and open a new tab.

        const url = sieve.uri;
        this.showURL(url, options, (err, tab) => {
          callback();
        });
      }
    });
  },

  openAndMarkRead: function (id, options, callback) {
    SieveStore.update(id, { ts_view: new Date().toISOString() }, () => {
      this.open(id, options, callback);
    });

    this.syncStore(SieveStore);
  },

  openGettingStarted: function () {
    chrome.tabs.create({
      url: CFG.URL.WELCOME,
      active: true,
    });
  },

  resume: function () {
    auth.isReady() && Scheduler.init();
    ActionManager.init();

    gEvents.on('store:' + SieveStore.name + ':create', this.onSieveCreate, this);
    gEvents.on('store:' + SieveStore.name + ':destroy', this.onSieveDestroy, this);
    gEvents.on('store:' + SieveStore.name + ':update', this.onSieveUpdate, this);

    this.updateState();
  },

  // Called and managed by service creator
  setActive: function (active) {
    // console.log('set active:', active);
    this.active = active;
    this[active ? 'resume' : 'pause']();
    gEvents.trigger('service:active', active);
  },

  setEventSource: function (source, callback) {
    callback || (callback = function () { });
    if (this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = source;
    if (source) {
      source.addEventListener('message', (e) => {
        this.resetHeartbeatTimer();
        const
          data = JSON.parse(e.data);
        // name, id, op, ts_mod

        const store = SQLStore[REMOTE_LOCAL_NAME_MAP[data.name]];

        // Find if we have the entity

        store && store.findOne(data.id, {
          only: ['ts_mod'],
        }, (err, doc) => {
          if (err) {
            // Most likely a programming or a fatal error. Shouldn't happen.
            DBG && console.error('Error fetching doc:', err);
          } else if (!doc) {
            if (store.name !== 'sieve_data') {
                this.syncStore(store);
            }
          } else {
            const
              ts1 = new Date(data.ts_mod);


            const ts2 = new Date(doc.ts_mod);


            const delta = Math.abs(ts1.valueOf() - ts2.valueOf());

            DBG && console.log('ts:', data.ts_mod, ts1, doc.ts_mod, ts2, delta);

            // stale by more than 5 sec.
            if (delta > 5000) {
              // We have stale data. Schedule a sync after
              if (store.name === 'sieve_data') {
                if (data.op === 'U') {
                  this.syncStore(store);
                }
              } else {
                this.syncStore(store);
              }
            }
          }
        });
      });

      source.addEventListener('error', (e) => {
        DBG && console.error('EventSource error', e);
        switch (e.target.readyState) {
          case EventSource.CLOSED:
            this.initSync();
            break;
        }
      });

      source.addEventListener('open', (e) => {
        // console.log('source.addEventListener: Opened');
        SyncMan.sync(false, callback);
      });
    } else {
      callback();
    }
  },

  showInInbox: function (id, team, callback) {
    if(typeof team == 'function') {
      callback = team;
    }
    chrome.tabs.create({
      active: true,
      url: `${this.appUrl}#/w/${team||0}/list/all/${id}.id/`,
    }, function () {
      callback && callback();
    });
  },

  showWatchlist: function (team) {
    this.showURL(`${this.appUrl}#/w/${team||0}/list/all/`);
  },

  openUrlInTabId: function (url, sender) {
    // console.log(url, sender);
    if (url.indexOf('app://') == 0) {
      const page = url.replace('app://', '');
      url = chrome.runtime.getURL(page);
    }
    if (sender.tab && sender.tab.id) {
      chrome.tabs.update(sender.tab.id, {
        active: true,
        url: url,
      });
    }
  },

  async showURL(url, options) {
    // console.log('showURL:', url);

    options || (options = {});

    let tabs = await chrome.tabs.queryAsync({ url });
    if (tabs && tabs.length > 0) {
      return await chrome.tabs.updateAsync(tabs[0].id, {
        active: true,
        url,
      });
    } else {
      // Get current tab. If it is an empty tab, do not create a new one.
      let tabs = await chrome.tabs.queryAsync({ active: true });
      const tab = tabs && tabs.length > 0 && tabs[0];
      // console.log('active tab:', tab);
      if (tab &&
        // A workaround to avoid all urls in one tab when opening multipe tabs
        options.openInBlank !== false &&
        /^(about:blank)|(about:newtab)|(chrome:\/\/newtab)/.test(tab.url)) {
        return await chrome.tabs.updateAsync(tab.id, {
          active: true,
          url,
        });
      } else {
        return await chrome.tabs.createAsync({
          active: true,
          url,
        });
      }
    }
  },

  syncStore: function (store, options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = null;
    }
    if (SyncMan.canSync()) {
      SyncMan.syncStore(store, options || { delay: 5000 }, function () { });
    }
  },

  updateState: function (sieveId) {
    // Update following parameters:
    // 1. Unread count
    const user_id = auth.getId();
    SieveStore.find({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'ts_view.lt': { name: 'ts_data', type: 'field' },
      '$and': {
        $or: [
          ['user_id', user_id],
          ['user_id', null],
        ],
      },
    }, {
      only: ['id'],
      limit: 1,
    }, (err, result) => {
      this.state.set('unread', result.total_count);
    });

    SieveStore.find({
      'id.ne': null, // FIXME Workaround for bug in ZangoDB
      'state.in': [C.STATE_READY, C.STATE_PAUSED],
      'err.ne': '$null',
      '$and': {
        $or: [
          ['user_id', user_id],
          ['user_id', null],
        ],
      },
    },
      {
        only: ['id'],
        limit: 1,
      }, (err, result) => {
        this.state.set('error', result.total_count);
      });

    if (sieveId) {
      SieveStore.findOne(sieveId, {
        only: ['_state'],
      }, (err, doc) => {
        if (doc && doc._state !== C.LOCAL_STATE_SYNCED) {
          this.syncStore(SieveStore, { delay: 1000 });
        }
      });
    }
  },

});

let brwsr; let curBrowser;
try {
  brwsr = ['browser', 'chrome'];
  curBrowser = window[typeof browser == 'undefined' ? brwsr[1] : brwsr[0]];
} catch (e) {
  console.error(e);
}
curBrowser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // console.log( "onMessage", msg);
  chromeOnMessageHandler(msg, sender, sendResponse);
  return true;
});

async function chromeOnMessageHandler(msg, sender, sendResponse) {
  function replyOnMessage(msg) {
    if (typeof browser == 'undefined') { // XXX For firefox
      sendResponse(msg);
    } else {
      Promise.reject(msg);
    }
  }
  if (msg.type == 'request') {
    let
      { module, method, args } = { ...msg };


    const modulePath = (module && module != '') ? module : ('window');


    const tStore = getValueFromPath(window, module);
    args || (args = []);
    args = args.map((arg) => arg == '$sender' ? sender : arg);
    // console.log('main: ', msg, tStore, args)
    if (tStore) {
      try {
        const
          callable = tStore[method];
        if (typeof callable == 'function') {
          res = callable.bind(tStore)(...args);
          if (res && typeof res.then == 'function') {
            res = await res;
          }
        } else {
          res = callable;
        }
        // console.log('message: request: response', msg, res, ...args)
        try {
          sendResponse([null, res]);
        } catch (e) {
          console.error('onMessage: request: ', e);
        }
      } catch (e) {
        replyOnMessage([{ msg: e.msg || e.message || e }]);
      }
    } else {
      replyOnMessage([{ msg: 'Unhandled request, unknown store: ' + tStore }]);
    }
  } else {
    replyOnMessage([{ msg: 'Unhandled message type' }]);
  }
}


function checkSlot() {
  if (isActiveDay()) {
    const map = Prefs.get('time-slot-map');
    const date = new Date();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const timeString = currentHours + ':' + currentMinutes;
    const slots = map[date.getDay() + ''];
    let inSlot = false;
    try {
      for (const i in slots) {
        const slot = slots[i];
        if (compareTime(timeString, slot.start) && compareTime(slot.end, timeString)) {
          inSlot = true;
          break;
        }
      }
    } catch (e) {
      // Fix data format
      // Prefs.time-slot-map format:
      // { 0: [{ start: 'mm:ss', end:'mm:ss'}], 1: [{ start: 'mm:ss', end:'mm:ss'}] ....}
      const days = [0, 1, 2, 3, 4, 5, 6];
      const fixedTimeSlotMap = days.reduce((acc, day) => {
        acc[day] = [{ start: '00:00', end: '23:59' }];
        return acc;
      }, {});
      // sieve-slot.start and sieve-slot.end are only used in UI
      Prefs.set('sieve-slot.start', '00:00');
      Prefs.set('sieve-slot.end', '23:59');
      Prefs.set('time-slot-map', fixedTimeSlotMap);
      return true;
    }
    return inSlot;
  } else {
    return false;
  }
}

function isActiveDay() {
  const map = Prefs.get('time-slot-map');
  const day = (new Date()).getDay();
  return !!map[(day + '')];
}

function compareTime(time1, time2) {
  const time1Data = time1.split(':');
  const time1Hours = parseInt(time1Data[0]);
  const time1Minutes = parseInt(time1Data[1]);
  const time2Data = time2.split(':');
  const time2Hours = parseInt(time2Data[0]);
  const time2Minutes = parseInt(time2Data[1]);
  if (time1Hours > time2Hours) {
    return true;
  } else if (time1Hours < time2Hours) {
    return false;
  } else {
    if (time1Minutes >= time2Minutes) {
      return true;
    } else {
      return false;
    }
  }
}
