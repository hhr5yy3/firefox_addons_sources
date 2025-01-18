var AmazonWebsocket = function() {
  var _ = this;
  _.socket;
  _.connectionID;
  //
  _.ping_time_out_time = 1000 * 5; //60*1;// lo que espera el ping para definir que la conexión se cayó
  _.pingErrorTimeout; //funcion que meneja el errro de ping
  _.waiting_for_pong = false; // boolean si ya hay un ping corriendo
  _.ping_test_time = 1000 * 60 * 2;
  _.ping_reconnect_interval = 1000 * 10;

  this.build = function() {
    document.addEventListener("ON_SWITCH_ACCOUNT", _.resetConnection);
  };

  this.destroy = function() {
    document.removeEventListener("ON_SWITCH_ACCOUNT", _.resetConnection);
    if (typeof _.socket != "undefined") {
      _.socket.close();
    }
    clearRegisteredInterval('ping_interval');
  };

  this.resetConnection = function() {
    _.socket.close();
    _.init();
  };

  this.init = function() {
    _.destroy();
    _.build();
    _.socket = new WebSocket(WS_URL);
    _.setEventListeners();
    clearRegisteredInterval('ping_interval');
    registeredInterval(_.ping, _.ping_test_time, 'ping_interval');
  };

  this.send = function(message, time) {
    _.waitForConnection(function() {
      _.socket.send(message);
    }, time, 0);
  };

  this.waitForConnection = function(callback, interval, repeat) {
    repeat++;
    if (_.socket.readyState === 1) {
      callback();
    } else if (repeat === 5) {
      return;
    } else {
      let self = this;
      setTimeout(function() {
        self.waitForConnection(callback, interval, repeat);
      }, interval);
    }
  };

  this.ping = function() {
    // mensage
    if (_.waiting_for_pong == false && currentUser.isLoggedIn()) {
      _.send('Hola', 1000);
      _.pingErrorTimeout = setTimeout(function() {
        _.waiting_for_pong = false;
        _.init();
      }, _.ping_time_out_time);
    }
    _.waiting_for_pong = true;
  };

  this.pong = function() {
    _.waiting_for_pong = false;
    clearTimeout(_.pingErrorTimeout);
  };

  this.setEventListeners = function(){

    _.socket.onopen = function(e) {
      console.log('[open] Connection established');
      console.log('Getting connectionId');
      _.send('{"action": "getConnection", "data":{"email":"'+currentUser.get().email+'","token":"'+currentUser.get().token+'"}}', 1000);
      _.attempts_to_reconnect = 0;
      _.pong();
    };

    _.socket.onmessage = function(event) {
      _.pong();
      var data = JSON.parse(event.data);
      var event_data = {};
      try {
        event_data = JSON.parse(data.json);
      } catch (err) {}

      console.log('//WS: '+data.action);
      console.log('//WS: '+data.client_id);
      console.log(data);
      var was_this_client = (typeof(data.client_id) != "undefined" && data.client_id == _.connectionID)?true:false;
      console.log("Was this client: "+was_this_client);
      //
      if(data.action == "getConnection"){
        _.connectionID = data.data.connectionID;
        sessionStorage.setItem("ClientApp", "TrackingTime " + getAppVersion());
        sessionStorage.setItem("ClientID", _.connectionID);
        var params = {
          data :{
            token : _.connectionID,
            user_id : currentUser.get().id
          }
        };
        device.register(params);
      }
      /*
      if(data.action == "notifications_update"){
        // cambiar broadcast
        var evt = new CustomEvent('WS_NOTIFICATIONS_UPDATED', {'detail': event_data});
        document.dispatchEvent(evt);
      }

      if(data.action == "working_on_update"){
        // cambiar broadcast
        var evt = new CustomEvent('WS_WORKING_ON_UPDATED', {'detail': event_data});
        document.dispatchEvent(evt);
      }

      if(data.action == "invoice_added"){
        var evt = new CustomEvent('WS_INVOICE_ADDED', {'detail': event_data});
        document.dispatchEvent(evt);
      }

      if(data.action == "import_completed"){
        var evt = new CustomEvent('WS_IMPORT_COMPLETED', {detail: event_data});
        document.dispatchEvent(evt);
      }
      */
      if (!was_this_client) {
        // track
        if (data.action == "track") {
          broadcast('WS_TRACK', event_data);
        } else
        if (data.action == "stop") {
          broadcast('WS_STOP', event_data);
        } else
        if (data.action == "user_updated") {
          currentUser.set(event_data.data);
        } else
        if (data.action == "integration_turned_on") {
          currentUser.setApp(event_data.data);
        } else
        if (data.action == "integration_turned_off") {
          currentUser.setApp(event_data.data);
        } 
        
        /* else
        
        // events
        if (data.action == "event_added") {
          eventsStore.add(event_data, { event_id: event_data.data.id, task_id: event_data.data.task_id });
          broadcast('EVENT_ADDED', event_data);
        } else
        if (data.action == "event_updated") {
          eventsStore.update(event_data);
          broadcast('EVENT_UPDATED', event_data);
        } else
        if (data.action == "event_deleted") {
          eventsStore.remove({event_data}, { event_id: event_data.data.id, task_id: event_data.data.task_id });
          broadcast('EVENT_UPDATED', { data: event_data, params: { event_id: event_data.data.id, task_id: event_data.data.task_id } });
        }
        
        // tasks
        if (data.action == "task_added") {
          tasksStore.add(event_data, {ws: true});
        } else
        if (data.action == "task_updated") {
          tasksStore.update(event_data, {ws: true});
        } else
        if (data.action == "task_opened") {
          tasksStore.open(event_data, {ws: true});
        }else
        if (data.action == "task_closed") {
          tasksStore.close(event_data, {ws: true});
        } else
        if (data.action == "task_deleted") {
          tasksStore.remove({}, {task_id: event_data.data.id, project_id: event_data.data.project_id, ws: true});
        } else
        
        // subtasks
        if (data.action == "subtask_added") {
          subtasksStore.add(event_data, {data: {subtask_id: event_data.data.id}, task_id: event_data.data.task_id, ws: true});
        } else
        if (data.action == "subtask_updated") {
          subtasksStore.update(event_data, {data: {subtask_id: event_data.data.id}, task_id: event_data.data.task_id, ws: true});
        } else
        if (data.action == "subtask_opened") {
          subtasksStore.open(event_data, {data: {subtask_id: event_data.data.id}, task_id: event_data.data.task_id, ws: true});
        }else
        if (data.action == "subtask_closed") {
          subtasksStore.close(event_data, {data: {subtask_id: event_data.data.id}, task_id: event_data.data.task_id, ws: true});
        } else
        if (data.action == "subtask_deleted") {
          subtasksStore.remove(event_data, {data: {subtask_id: event_data.data.id}, task_id: event_data.data.task_id, ws: true});
        } else
        
        // comments
        if (data.action == "taskcomment_added") {
          commentsStore.add(event_data, {data: {comment_id: event_data.data.id}, task_id: event_data.data.task, ws: true});
        } else
        if (data.action == "taskcomment_deleted") {
          commentsStore.remove(event_data, {data: {comment_id: event_data.data.id}, task_id: event_data.data.task, ws: true});
        } else
        
        // tasklist
        if (data.action == "tasklist_added") {
          tasklistsStore.add(event_data, {task_list_id: event_data.data.id, project_id: event_data.data.project, ws: true});
        } else
        if (data.action == "tasklist_updated") {
          tasklistsStore.update(event_data, {task_list_id: event_data.data.id, project_id: event_data.data.project, ws: true});
        } else
        if (data.action == "tasklist_deleted") {
          tasklistsStore.remove(event_data, {task_list_id: event_data.data.id, project_id: event_data.data.project, ws: true});
        } else
        if (data.action == "tasklist_moved") {
          tasklistsStore.move(event_data, {task_list_id: event_data.data.id, project_id: event_data.data.project, ws: true});
        } else
        
        // projects
        if (data.action == "project_added") {
          projectsStore.add(event_data, {});
        } else
        if (data.action == "project_updated") {
          projectsStore.update(event_data, {});
        } else
        if (data.action == "project_opened") {
          projectsStore.open({ data: event_data }, {});
        }else
        if (data.action == "project_closed") {
          projectsStore.close({ data: event_data }, {});
        } else
        if (data.action == "project_followed") {
          projectsStore.follow(event_data, {});
        }else
        if (data.action == "project_unfollowed") {
          projectsStore.unfollow(event_data, {});
        } else
        if (data.action == "project_deleted") {
          projectsStore.remove({}, { project_id: event_data.data.id });
        } else
        
        // users
        if (data.action == "user_opened") {
          usersStore.open(event_data, { data: { id: event_data.data.id } });
        }else
        if (data.action == "user_closed") {
          usersStore.close(event_data, { data: { id: event_data.data.id } });
        }
        */
      }
      /*
      // custom fileds
      if (data.action == "custom_field_deleted") {
        broadcast('WS_CUSTOM_FIELD_DELETED', event_data);
      } else
      if (data.action == "custom_field_added") {
        broadcast('WS_CUSTOM_FIELD_ADDED', event_data);
      } else
      if (data.action == "custom_field_updated") {
        broadcast('WS_CUSTOM_FIELD_UPDATED', event_data);
      }
      */
    };

    _.socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('[close] Connection closed cleanly, code=${event.code} reason=${event.reason}');
      } else {
        console.log('[close] Connection died');
      }
      setTimeout(_.ping, _.ping_reconnect_interval);
      //_.ping();
      var evt = new CustomEvent('WS_CLOSED');
      document.dispatchEvent(evt);
    };

    _.socket.onerror = function(error) {
      console.log('[error] ${error.message}');
      setTimeout(_.ping, _.ping_reconnect_interval);
    };
  };
};
