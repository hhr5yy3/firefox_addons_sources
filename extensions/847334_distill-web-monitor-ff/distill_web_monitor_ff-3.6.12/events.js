/**
 * Global object to trigger and subscribe to events.
 *
 * Namespacing events:
 *  ns_1:ns_x:name, event
 *
 * All arguments to a trigger should be serializable into JSON.
 */
const gEvents = window.gEvents = _.extend({}, Backbone.Events);

function createEventSource(callback) {
  // 1. Get token to subscribe to notifications
  HTTP.request({
    url: CFG.URL.BROADCAST + '/temp_token',
    method: 'POST',
    headers: apiHeaders(),
  }, function(err, xhrObj) {
    if (err) {
      callback(err);
    } else {
      let res = xhrObj.response;
      const ENTITIES = ['clients', 'sieves', 'sieve_data', 'sieve_actions', 'sieve_rules', 'tags', 'user_attrs', 'users', 'users_clients_groups', 'macros'];
      const source = new EventSource(CFG.URL.BROADCAST + '/events/' + res.token+'?' + qs.stringify({entities: ENTITIES}));
      callback(null, source);
    }
  });
}
