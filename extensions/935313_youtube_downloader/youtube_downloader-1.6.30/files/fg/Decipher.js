var ytHtml5SignatureDecipher = {
  readObfFunc: function(func, data) {
    var vList = func.match(/\[(\w+)\]/g);
    if (!vList) {
      return;
    }
    for (var i = 0, v; v = vList[i]; i++) {
      var vv = data.match(new RegExp('[, ]{1}'+ v.slice(1, -1) +'="(\\w+)"'));
      if (vv) {
        func = func.replace(v, '.'+vv[1]);
      }
    }
    var arr = func.split(';');
    var actList = [];
    for (var i = 0, item; item = arr[i]; i++) {
      if (item.indexOf('.split(') !== -1 || item.indexOf('.join(') !== -1) {
        continue;
      }
      if (item.indexOf('reverse') !== -1) {
        actList.push(['reverse', null]);
        continue;
      }
      var m = item.match(/splice\((\d+)\)/);
      if (m) {
        m = parseInt(m[1]);
        if (isNaN(m)) return;
        actList.push(['splice', m]);
        continue;
      }
      var m = item.match(/slice\((\d+)\)/);
      if (m) {
        m = parseInt(m[1]);
        if (isNaN(m)) return;
        actList.push(['slice', m]);
        continue;
      }
      var m = item.match(/\[(\d+)%\w+\.length/);
      if (m) {
        m = parseInt(m[1]);
        if (isNaN(m)) return;
        actList.push(['swap', m]);
      }
    }
    return actList;
  },
  getNewChip: function (data) {
    var getObjPropFn = function (objectName, propName) {
      objectName = objectName.replace(/\$/g, '\\$');
      var placeRe = new RegExp('(?:var |,)?' + objectName + '={');
      var placePos = data.search(placeRe);
      if (placePos === -1) {
        throw new Error('Place is not found');
      }

      var place = data.substr(placePos);
      propName = propName.replace(/\$/g, '\\$');
      var re = new RegExp(propName + ':function\\(([$\\w,]+)\\){([^}]+)}');
      var m = place.match(re);
      if (!m) {
        throw new Error('Place function is not found!');
      }

      var args = m[1];
      var statement = m[2];
      return {args: args, statement: statement};
    };
    var readAction = function (item) {
      var m = /([\w$]+)\.([\w$]+)\([\w$]+,?([\w$]+)?\)/.exec(item);
      if (!m) {
        throw new Error('readAction');
      }

      var objectName = m[1];
      var propName = m[2];
      var arg = m[3];
      var fn = getObjPropFn(objectName, propName);
      if (/\.reverse/.test(fn.statement)) {
        return ['reverse', null];
      } else {
        if (!/^[\d]+$/.test(arg)) {
          throw new Error('Arg is not number');
        }

        if (/\.splice/.test(fn.statement)) {
          return ['splice', parseInt(arg)];
        } else if (/\.slice/.test(fn.statement)) {
          return ['slice', parseInt(arg)];
        } else {
          return ['swap', parseInt(arg)];
        }
      }
    };
    var readStatement = function (arg, statement) {
      arg = arg.replace(/\$/g, '\\$');
      var re = new RegExp('[\\w$]+\\.[\\w$]+\\(' + arg + '[^)]*\\)', 'g');
      var actionList = statement.match(re);
      if (!actionList) {
        throw new Error('readScope');
      }

      return actionList.map(function (item) {
        return readAction(item);
      });
    };
    var findDecodeFn = function (name) {
      name = name.replace(/\$/g, '\\$');
      var re = new RegExp('(?:function ' + name + '|(?:var |,|;\n)' + name + '=function)\\(([\\w$]+)\\){([^}]*)}[;,]');
      var m = re.exec(data);
      if (!m) {
        throw new Error('findConvertFn');
      }

      var variable = m[1];
      var statement = m[2];
      return readStatement(variable, statement);
    };

    var actionList = null;
    var sts = null;
    try {
      var stsM = /,sts:(\d+|\w+)/.exec(data);
      if (!stsM) {
        throw new Error('Sts is not found');
      }
      sts = parseInt(stsM[1]);
      if (isNaN(sts)) {
        stsM = new RegExp(stsM[1] + '=(\\d+);.*,sts:').exec(data);
        if (!stsM) {
          throw new Error('Sts is not found');
        }
        sts = parseInt(stsM[1]);
      }

      var fnName = /[$_a-zA-Z0-9]+\.set\("signature",([$_a-zA-Z0-9]+)\(/.exec(data);
      if (fnName) {
        d_log('new chip');
      } else {
        fnName = /(?:function ([$_a-zA-Z0-9]+)|(?:var |,|;\n)([$_a-zA-Z0-9]+)=function)\(([\w$]+)\)\{\3=\3\.split\([^}]+;return \3\.join\([^}]+\}[;,]/.exec(data);
        if (fnName) {
          d_log('alt chip');
          fnName = [fnName[0], fnName[1] || fnName[2]];
        }
      }
      if (!fnName) {
        throw new Error('Decode function name is not found!');
      }

      actionList = findDecodeFn(fnName[1]);
    } catch (err) {
      d_log(err);
    }

    return actionList;
  },
  getChip: function(data) {
    var sts = data.match(/,sts:(\d+)/);
    sts = sts && sts[1];

    var actList = [];
    var funcName = data.match(/\.sig\|\|([$_a-zA-Z0-9]+)\(/);
    if (!funcName) {
      return this.getNewChip(data);
    } else {
      d_log('old chip');
    }
    funcName = funcName[1];
    funcName = funcName.replace(/\$/g, '\\$');
    var func = data.match(new RegExp("((?:function "+funcName+"|(?:var |,|;\n)"+funcName+"=function)\\(([\\w$]+)\\){[^}]*})[;,]"));
    if (!func) {
      return null;
    }
    var vName = func[2];
    func = func[1];
    var regexp = new RegExp("[\\w$]+\\.[\\w$]+\\("+vName+"[^)]*\\)", 'g');
    var sFuncList = func.match(regexp);
    if (!sFuncList) {
      actList = this.readObfFunc(func, data);
      if (actList && actList.length > 0) {
        return actList;
      }
      return null;
    }
    var objName = '';
    var objElList = [];
    for (var i = 0, item; item = sFuncList[i]; i++) {
      var m = item.match(/([\w$]+)\.([\w$]+)\([\w$]+,?([\w$]+)?\)/);
      if (m) {
        objName = m[1];
        objElList.push({name: m[2], arg: parseInt(m[3])});
      }
    }
    var sPos = data.indexOf('var '+objName+'={');
    if (sPos === -1) {
      sPos = data.indexOf(','+objName+'={');
    }
    if (sPos === -1) {
      sPos = data.indexOf(objName+'={');
    }
    var place = data.substr(sPos, 300);
    for (i = 0, item; item = objElList[i]; i++) {
      var vName = item.name;
      regexp = new RegExp(vName+":(function\\([$\\w,]+\\){[^}]+})");
      var sF = place.match(regexp);
      if (!sF) {
        return null;
      }
      sF = sF[1];
      if (sF.indexOf('splice') !== -1) {
        if (isNaN(item.arg)) {
          return null;
        }
        actList.push(['splice', item.arg]);
      } else
      if (sF.indexOf('slice') !== -1) {
        if (isNaN(item.arg)) {
          return null;
        }
        actList.push(['slice', item.arg]);
      } else
      if (sF.indexOf('reverse') !== -1) {
        item.arg = null;
        actList.push(['reverse', item.arg]);
      } else {
        if (isNaN(item.arg)) {
          return null;
        }
        actList.push(['swap', item.arg]);
      }
    }
    return actList;
  }
}

// based on https://github.com/distubejs/ytdl-core/blob/master/lib/sig.js
var getNTransformFunc = function(data) {
  const N_ARGUMENT = 'ncode';
  const SCVR = '[a-zA-Z0-9$_]';
  const FNR = `${SCVR}+`;
  const AAR = '\\[(\\d+)]';
  const N_TRANSFORM_NAME_REGEXPS = [
    // NewPipeExtractor regexps
    `${SCVR}+="nn"\\[\\+${
      SCVR}+\\.${SCVR}+],${
      SCVR}+=${SCVR
    }+\\.get\\(${SCVR}+\\)\\)&&\\(${
      SCVR}+=(${SCVR
    }+)\\[(\\d+)]`,
    `${SCVR}+="nn"\\[\\+${
      SCVR}+\\.${SCVR}+],${
      SCVR}+=${SCVR}+\\.get\\(${
      SCVR}+\\)\\).+\\|\\|(${SCVR
    }+)\\(""\\)`,
    `\\(${SCVR}=String\\.fromCharCode\\(110\\),${
      SCVR}=${SCVR}\\.get\\(${
      SCVR}\\)\\)&&\\(${SCVR
    }=(${FNR})(?:${AAR})?\\(${
      SCVR}\\)`,
    `\\.get\\("n"\\)\\)&&\\(${SCVR
    }=(${FNR})(?:${AAR})?\\(${
      SCVR}\\)`,
    // Skick regexps
    '(\\w+).length\\|\\|\\w+\\(""\\)',
    '\\w+.length\\|\\|(\\w+)\\(""\\)',
  ];
  const matchRegex = (regex, str) => {
    var match = str.match(new RegExp(regex, 's'));
    if (!match) throw new Error(`Could not match ${regex}`);
    return match;
  };
  
  const matchGroup1 = (regex, str) => matchRegex(regex, str)[1];
  
  const getFuncName = (body, regexps) => {
    let fn;
    for (const regex of regexps) {
      try {
        fn = matchGroup1(regex, body);
        try {
          fn = matchGroup1(`${fn.replace(/\$/g, '\\$')}=\\[([a-zA-Z0-9$\\[\\]]{2,})\\]`, body);
        } catch (err) {
          // Function name is not inside an array
        }
        break;
      } catch (err) {
        continue;
      }
    }
    if (!fn || fn.includes('[')) throw Error();
    return fn;
  };
  
  const extractNTransformWithName = body => {
    try {
      const nFuncName = getFuncName(body, N_TRANSFORM_NAME_REGEXPS);
      const funcPattern = `(${
        nFuncName.replace(/\$/g, '\\$')
      // eslint-disable-next-line max-len
      }=\\s*function([\\S\\s]*?\\}\\s*return (([\\w$]+?\\.join\\(""\\))|(Array\\.prototype\\.join\\.call\\([\\w$]+?,[\\n\\s]*(("")|(\\("",""\\)))\\)))\\s*\\}))`;
      const nTransformFunc = `var ${matchGroup1(funcPattern, body)};`;
      const callerFunc = `${nFuncName}(${N_ARGUMENT});`;
      return nTransformFunc + callerFunc;
    } catch (e) {
      return null;
    }
  };

  const code = extractNTransformWithName(data);

  return function(old_n) {
    return eval(`var ${N_ARGUMENT} = "${old_n}"; ${code}`);
  };
}

var getSig = function(list, a) {
  var actionList = {
    slice:function(a,b){a.slice(b)},
    splice:function(a,b){a.splice(0,b)},
    reverse:function(a){a.reverse()},
    swap:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c}
  };
  a = a.split("");
  for (var i = 0, item; item = list[i]; i++) {
    actionList[item[0]](a, item[1]);
  }
  return a.join("");
}

var getDecodeSignatureFunc = function(data) {
  var actList = ytHtml5SignatureDecipher.getChip(data);
  return function (s) {
    return getSig(actList, s);
  }
}

var getTransformUrlFunc = function(data) {
  var nTransformFunc = getNTransformFunc(data);
  return function (url) {
    var n_param = url.match(/&n=([^&]+)&/);
    if (!n_param) {
      return url;
    }
    n_param = n_param[1];
    return url.replace(n_param, nTransformFunc(n_param));
  }
}