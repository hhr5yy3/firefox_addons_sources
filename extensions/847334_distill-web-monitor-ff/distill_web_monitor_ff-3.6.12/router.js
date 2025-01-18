function Route(options) {
  _.extend(this, options, this.parse(options.path));
}

_.extend(Route.prototype, {

  match: function(path) {
    const
      keys = this.keys;


    const params = this.params = {};


    const m = this.regexp.exec(path);

    if (!m) return false;

    for (let i = 1, len = m.length; i < len; ++i) {
      const key = keys[i - 1];

      const val = 'string' == typeof m[i]
        ? decode(m[i])
        : m[i];

      if (key) {
        params[key.name] = val;
      } else {
        throw new Error('Nameless param not supported, path:'+path);
      }
    }

    return true;
  },
  
  // The parse method returns a regular expression for the path provided which is later used 
  // to match the paths of store with input url in `api.js`

  parse: function(path) {
    const keys = []; const strict = true;
    path = path
      .concat(strict ? '' : '/?')
      .replace(/\/\(/g, '(?:/')
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,
        function(_, slash, format, key, capture, optional, star) {
          keys.push({name: key, optional: !! optional});
          slash = slash || '';
          return ''
          + (optional ? '' : slash)
          + '(?:'
          + (optional ? slash : '')
          + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
          + (optional || '')
          + (star ? '(/*)?' : '');
        })
      .replace(/([\/.])/g, '\\$1')
      .replace(/\*/g, '(.*)');
    return {
      keys: keys,
      regexp: new RegExp('^' + path + '$', 'i'),
    };
  },

});


function Router(options) {
  this.routes = _.map(options.routes, function(routeOptions) {
    return new Route(routeOptions);
  }, this);

  // console.log('this.routes:', this.routes, options);
}

_.extend(Router.prototype, {

  find: function(path) {
    const route = _.find(this.routes, function(route) {
      return route.match(path);
    });
    return route;
  },

});

function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}

