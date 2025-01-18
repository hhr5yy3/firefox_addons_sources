let isValidFilename = (filename) => {
  'use strict';
  return !!filename && (!/(\/|\\|\s)/.test(filename) && isValidPathPart(filename));
},
isValidFolderPath = (path) => {
  'use strict';
  if (path === '') {
      return true;
  }
  if (/^(\/|\\|\s)|[\\\/]{2,}|(\/|\\|\s)$/.test(path)) {
      return false;
  }

  return !path.split(/[\\\/]/).some(p => !isValidPathPart(p));
},
isValidPathPart = (pathPart) => {
  'use strict';
  let tokens = /<(?:originalname|originaltype|savetype|imagehost|pagehost|time:[._-]*[YMDHISGA]+[._\-YMDHISGA]*)>/gi,
      pathPartWithVariableRemoved = pathPart.replace(tokens, '');

  let restrictedNames = /^(?:\.+|\.|CON|PRN|AUX|NUL|(?:COM|LPT)[1-9]?)$/i,
      validCharactersCustomPart = new RegExp('^[a-z0-9_\\-&#@!\'$%^\\(\\)\\[\\]\{\\}=+ .,]{' + (pathPartWithVariableRemoved === pathPart ? '1' : '0')  + ',100}$', 'i')
  return !restrictedNames.test(pathPartWithVariableRemoved) &&
    validCharactersCustomPart.test(pathPartWithVariableRemoved);
},
isValidColor = (color) => {
  'use strict';
  return /#[0-9a-f]{6}/i.test(color);
},
insertVariablesinPath = (pathPart, variables) => {
  'use strict';
  let tokens = /<(originalname|originaltype|savetype|imagehost|pagehost|)>/gi,
      newPathPart = pathPart.replace(tokens, (_, token) => {return variables[token]; }),
      time = /<time:([._-]*[YMDHISGA]+[._\-YMDHISGA]*)>/gi;
  return newPathPart.replace(time,  (_, timeFormat) => {return formatedDate(timeFormat); });
},
DirectorySeperator = '/',
correctPathSeperator = (path) => {
  'use strict';
  return path.replace(DirectorySeperator === '/' ? '\\' : '/', DirectorySeperator);
},
parsePath = (variables, path, filename) => {
  'use strict';
  let pathWithVariables = insertVariablesinPath(path, variables);
  return correctPathSeperator(pathWithVariables + (pathWithVariables === '' ? '' : DirectorySeperator) + insertVariablesinPath(filename, variables) + '.' + variables.savetype);
},
hasClassName = (el, classname) => {
  'use strict';
  var i, n,
    cn = el.getAttribute('class') || '';
  cn = cn.split(' ');
  for (i = 0, n = cn.length; i < n; ++i) {
    if (cn[i] !== '' && cn[i] === classname) {
      return true;
    }
  }
  return false;
},
addClassName = (el, classname) => {
  'use strict';
  if (!hasClassName(el, classname)) {
    var cn = (el.getAttribute('class') === null ? '' : el.getAttribute('class')) + ' ' + classname;
    el.setAttribute('class', cn);
  }
},
removeClassName = (el, classname) => {
  'use strict';
  var new_cn = [],
    i, n,
    cn = el.getAttribute('class') || '';
  cn = cn.split(' ');
  for (i = 0, n = cn.length; i < n; ++i) {
    if (cn[i] !== '' && cn[i] !== classname) {
      new_cn.push(cn[i]);
    }
  }
  new_cn = new_cn.join(' ');
  el.setAttribute('class', new_cn);
},
toggleClassName = (el, classname) => {
  'use strict';
  if (hasClassName(el, classname)) {
    removeClassName(el, classname);
    return;
  }
  addClassName(el, classname);
},
flipClassName = (el, classname, state) => {
  'use strict';
  (state ? addClassName : removeClassName)(el, classname);
},
isGecko = typeof browser !== 'undefined',
formatedDate = (format, date) => {
  'use strict';
  date = date || new Date();
  return format
  	.replace(/Y/g, date.getFullYear())
  	.replace(/y/g, date.getFullYear().toString().substr(2))
  	.replace(/M/g, (date.getMonth() + 1).toString().padStart(2,'0'))
  	.replace(/m/g, (date.getMonth() + 1).toString())
    .replace(/D/g, date.getDate().toString().padStart(2,'0'))
  	.replace(/d/g, date.getDate().toString())
  	.replace(/H/g, date.getHours().toString().padStart(2,'0'))
  	.replace(/h/g, date.getHours().toString())
  	.replace(/G/g, ((date.getHours() % 12) || 12).toString().padStart(2,'0'))
  	.replace(/g/g, ((date.getHours() % 12)  || 12).toString())
    .replace(/I/g, date.getMinutes().toString().padStart(2,'0'))
  	.replace(/i/g, date.getMinutes().toString())
    .replace(/S/g, date.getSeconds().toString().padStart(2,'0'))
  	.replace(/s/g, date.getSeconds().toString())
    .replace(/A/g, (date.getHours() < 12 ? 'AM' : 'PM'))
    .replace(/a/g, (date.getHours() < 12 ? 'am' : 'pm'));
  };
