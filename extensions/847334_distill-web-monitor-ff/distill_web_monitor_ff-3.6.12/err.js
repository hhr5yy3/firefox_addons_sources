Sentry.init(CFG.SENTRY);

// Service level configurations
class ErrorBase extends Error {
  constructor(code, message, data = {}) {
    super(message);
    this.code = code;
    this.data = data;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      stack: this.stack,
    }
  }
}

function Err(code, msg) {
  const tpl = createTemplate(msg);

  return class Error extends ErrorBase {
    constructor(data) {
      super(code, tpl(data), data);
    }

    setSnapshot(snapshot) {
      this.snapshot = snapshot
    }

    hasSnapshot(snapshot) {
      return !!this.snapshot
    }

    // Checks if err is of same type
    static si(err) {
      return code === err.code;
    }
  };
}

// XXX expose different error classes directly?
_.extend(Err, {

  ABORT: Err('ABORT', 'Activity aborted!'),

  NOT_FOUND: Err('NOT_FOUND', '{{type}} not found with {{id}}.'),

  PARAM_INVALID: Err('PARAM_INVALID', 'Invalid {{param}}, got: {{value}}'),

  PAGE_LOAD: Err('ELOAD', 'Failed to load page; cause: {{message}}'),

  SELECTION_EMPTY: Err('SELECTION_EMPTY', 'Selection did not match any content'),

  TIMEOUT: Err('TIMEOUT', '{{type}} timedout after {{time}} seconds.'),

  TYPE_UNKNOWN: Err('TYPE_UNKNOWN', '{{type}} of unknown type: {{value}}'),

  UNHANDLED: function(e) {
    return {
      code: 'UNHANDLED',
      message: e.toString(),
      data: e.stack,
    };
  },

});

