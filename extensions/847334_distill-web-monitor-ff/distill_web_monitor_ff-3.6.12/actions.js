const ActionEmail = {
  send: function(action, context, callback) {
    // console.log('ActionEmail:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/email', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          emailContent: context.html,
          hasDiff: true,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionPush = {
  send: function(action, context, callback) {
    // console.log('ActionPush action, context);

    if (auth.getToken()) {
      api('/agents/actions/push', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionSMS = {
  send: function(action, context, callback) {
    // console.log('ActionEmail:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/sms', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'tags', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionWebhook = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/webhook', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'tags', 'ts', ),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'data', 'ts', ),
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

const ActionTab = {
  open: function(action, context, callback) {
    // console.log('ActionOpenTab:', action, context);

    chrome.tabs.create({
      active: true,
      url: context.sieve.uri,
    });
  },
};

// Slack Action
const ActionSlack = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/slack', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

// Discord Action
const ActionDiscord = {
  send: function(action, context, callback) {
    // console.log('ActionWebhook:send:', action, context);

    if (auth.getToken()) {
      api('/agents/actions/discord', 'POST', {
        context: {
          action,
          sieve_id: context.sieve.id,
          sieve: _.pick(context.sieve, 'id', 'name', 'uri', 'ts', 'content_type'),
          sieve_data_id: context.sieve_data.id,
          sieve_data: _.pick(context.sieve_data, 'id', 'text', 'ts'),
          content: context.html,
        },
        logData: {
          sieve_id: context.sieve.id,
          sieve_data_id: context.sieve_data.id,
          sieve_action_id: action?.id,
        },
      }, callback);
    } else {
      callback({code: 'EAUTH', msg: 'Login to take this action'});
    }
  },
};

// Macro Action
const ActionMacro = {
  log: async function (doc) {
    const res = await api('/agents/actions/macro/log', 'POST', doc)
  },
  run: async function (action, context, callback) {
    if (!auth.getToken()) {
      return callback({code: 'EAUTH', msg: 'Login to take this action'});
    }

    try {
      const usageLeft = await api('/users/usage-left/action_macro', 'GET')
      if (usageLeft?.action_macro <= 0) {
        return callback({
          // server also responds with 503
          code: 503,
          msg: 'e_quota'
        })
      }

      const pageContext = new PageContext({
        pageMods: ['locator'],
        pageProperties: {
          loaderProperties: {
            pinned: false,
            active: true,
          },
          closeLoadersOnClose: false,
        }
      });
      pageContext.setMacroId(action.config.macro_id);
      let macroErr = null
      try {
        await pageContext.run_macro(context.sieve)
      } catch (e) {
        DBG && console.log('ActionMacro', 'run', e)
        macroErr = e.msg || e.message
      }

      await this.log({
        error: macroErr, sieve_id: context.sieve.id, sieve_data_id: context.sieve_data.id, sieve_action_id: action?.id,
      })
      pageContext._close()
      callback()
    } catch (e) {
      console.error('cannot run the macro action', action.config.macro_id, e)
      callback()
    }
  },
};
