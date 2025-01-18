function createRoleListItem(document, item, url, region, { hidesAccountId }, selectHandler) {
  const li = document.createElement('li');
  const headSquare = document.createElement('span');
  headSquare.textContent = ' ';
  headSquare.className = 'headSquare';
  if (item.color) {
    headSquare.style.backgroundColor = `#${item.color}`;
  } else if (!item.image) {
    // set gray if both color and image are undefined
    headSquare.style.backgroundColor = '#aaaaaa';
  }
  if (item.image) {
    headSquare.style.backgroundImage = `url('${item.image.replace(/"/g, '')}')`;
  }

  const anchor = document.createElement('a');
  anchor.href = "#";
  anchor.title = item.role_name + '@' + item.aws_account_id;
  anchor.dataset.profile = item.name;
  anchor.dataset.rolename = item.role_name;
  anchor.dataset.account = item.aws_account_id;
  anchor.dataset.color = item.color || 'aaaaaa';
  anchor.dataset.redirecturi = createRedirectUri(url, region, item.region);
  anchor.dataset.search = item.name.toLowerCase() + ' ' + item.aws_account_id;

  anchor.appendChild(headSquare);
  anchor.appendChild(document.createTextNode(item.name));

  if (hidesAccountId) {
    anchor.dataset.displayname = createDisplayName(item.name);
  } else {
    anchor.dataset.displayname = createDisplayName(item.name, item.aws_account_id);

    const accountIdSpan = document.createElement('span');
    accountIdSpan.className = 'suffixAccountId';
    accountIdSpan.textContent = item.aws_account_id;
    anchor.appendChild(accountIdSpan);
  }

  anchor.onclick = function() {
    const data = { ...this.dataset }; // do not directly refer DOM data in Firefox
    selectHandler(data);
    return false;
  };

  li.appendChild(anchor);

  return li
}

function createRedirectUri(currentUrl, curRegion, destRegion) {
  let redirectUri = currentUrl;
  if (curRegion && destRegion && curRegion !== destRegion) {
    redirectUri = redirectUri.replace('region=' + curRegion, 'region=' + destRegion);
  }
  return encodeURIComponent(redirectUri);
}

function createDisplayName(profile, awsAccountId) {
  const maxLength = 64;
  const separator = '  |  ';
  const overflow = '…';

  let displayName = profile;
  let totalLength = displayName.length;

  if (awsAccountId !== undefined) {
    totalLength += separator.length + awsAccountId.length;
  }

  if (totalLength > maxLength) {
    displayName = displayName.substring(0, displayName.length - (totalLength - maxLength) - overflow.length)
                  + overflow;
  }

  if (awsAccountId !== undefined) {
    displayName += separator + awsAccountId;
  }
  
  return displayName;
}

class CurrentContext {
  constructor(userInfo, settings) {
    const {
      loginDisplayNameAccount, loginDisplayNameUser,
      roleDisplayNameAccount, roleDisplayNameUser,
    } = userInfo;
    const { showOnlyMatchingRoles } = settings;

    this.baseAccount = brushAccountId(loginDisplayNameAccount);
    this.loginRole = extractLoginRole(loginDisplayNameUser.split("/", 2)[0]);
    this.filterByTargetRole = showOnlyMatchingRoles ? (roleDisplayNameUser || this.loginRole) : null;
  }
}

function brushAccountId(val) {
  const r = val.match(/^(\d{4})\-(\d{4})\-(\d{4})$/);
  if (!r) return val;
  return r[1] + r[2] + r[3];
}

const RESERVED_SSO_PREFIX = "AWSReservedSSO_";
function extractLoginRole(role) {
  if (role.startsWith(RESERVED_SSO_PREFIX)) {
    // extract permission set from SSO role
    const lastUnderscore = role.lastIndexOf('_');
    return role.substr(RESERVED_SSO_PREFIX.length, lastUnderscore - RESERVED_SSO_PREFIX.length);
  }
  return role;
}

class ConfigLoadError extends Error {
    line;
    constructor(message, line) {
        super(message);
        this.line = line;
    }
}
class ConfigLoader {
    #singleProfiles = [];
    #complexProfiles = [];
    load(sectionItems) {
        this.#singleProfiles = [];
        this.#complexProfiles = [];
        const destsBySrcMap = {}; // { <srcProfileName>: [<destProfile>... ] }
        const singleOrSrcProfiles = [];
        sectionItems.forEach((sectionItem) => {
            const srcProf = sectionItem.params.source_profile;
            delete sectionItem.params.source_profile;
            const item = this.createProfileItem(sectionItem);
            if (srcProf) {
                if (srcProf in destsBySrcMap) {
                    destsBySrcMap[srcProf].push(item);
                }
                else {
                    destsBySrcMap[srcProf] = [item];
                }
            }
            else {
                singleOrSrcProfiles.push(item);
            }
        });
        singleOrSrcProfiles.forEach((item) => {
            if (item.name in destsBySrcMap) {
                this.#complexProfiles.push({
                    ...item,
                    targets: destsBySrcMap[item.name],
                });
                delete destsBySrcMap[item.name];
            }
            else {
                this.#singleProfiles.push(item);
            }
        });
        const undefinedSources = Object.keys(destsBySrcMap).join(", ");
        if (undefinedSources) {
            throw new ConfigLoadError(`The following profiles are referenced as \`source_profile\` but not defined: ${undefinedSources}`, 0);
        }
        return {
            singles: this.#singleProfiles,
            complexes: this.#complexProfiles,
        };
    }
    createProfileItem(sectionItem) {
        const name = sectionItem.name.replace(/^profile\s+/i, "");
        let { aws_account_id, role_arn, role_name, ...others } = sectionItem.params;
        if (role_arn) {
            if (aws_account_id || role_name) {
                throw new ConfigLoadError("The profile includes both `role_arn` and either `aws_account_id` or `role_name`.", sectionItem.startLine);
            }
            const result = this.parseRoleArn(role_arn);
            if (!result) {
                throw new ConfigLoadError("The profile includes invalid `role_arn` parameter.", sectionItem.startLine);
            }
            aws_account_id = result.aws_account_id;
            role_name = result.role_name;
        }
        if (!aws_account_id)
            throw new ConfigLoadError("The profile doesn't specify an AWS account ID.", sectionItem.startLine);
        return {
            name,
            aws_account_id,
            role_name,
            ...others,
        };
    }
    parseRoleArn(roleArn) {
        const si = roleArn.indexOf("/");
        const prefix = roleArn.substring(0, si);
        const role = roleArn.substring(si + 1);
        if (role === undefined)
            return null;
        const iams = prefix.split(":");
        if (iams[0] !== "arn" ||
            iams[2] !== "iam" ||
            iams[3] !== "" ||
            iams[5] !== "role")
            return null;
        return { aws_account_id: iams[4], role_name: role };
    }
}

class SectionItemImpl {
    name;
    startLine;
    params;
    constructor(name, line) {
        this.name = name;
        this.startLine = line;
        this.params = {};
    }
    hasParam(key) {
        return key in this.params;
    }
    setParam(key, value) {
        this.params[key] = value;
    }
}
class IniParseError extends Error {
    line;
    text;
    constructor(message, text, line) {
        super(message);
        this.text = text;
        this.line = line;
    }
}
class IniParser {
    #item = null;
    #items = [];
    parse(text) {
        this.#item = null;
        this.#items = [];
        const textLines = text.split(/\r\n|\r|\n/);
        textLines.forEach((str, idx) => {
            this.parseLine(str, idx + 1);
        });
        this.appendCurrentItem();
        return this.#items;
    }
    parseLine(text, line) {
        text = text.replace(/[\;\#].*$/, "").trim(); // trim comment and spaces
        if (text.length === 0)
            return; // skip empty line
        const md = text.match(/^\[(.+)\]$/);
        if (md) {
            this.appendCurrentItem();
            this.#item = new SectionItemImpl(md[1].trim(), line);
        }
        else if (this.#item) {
            const { key, value } = this.parseKeyValue(text, line);
            if (this.#item.hasParam(key)) {
                throw new IniParseError(`The \`${key}\` parameter is duplicated in the same profile.`, text, line);
            }
            this.#item.setParam(key, value);
        }
        else {
            throw new IniParseError("Unexpected text", text, line);
        }
    }
    parseKeyValue(text, line) {
        const [key, val] = text.split("=", 2);
        const value = val ? val.trim() : undefined;
        if (!value)
            throw new IniParseError("Invalid parameter definition", text, line);
        return { key: key.trim(), value };
    }
    appendCurrentItem() {
        if (!this.#item)
            return;
        this.#items.push(this.#item);
        this.#item = null;
    }
}

class ProfileSet {
    singles;
    complexes;
    constructor(rawProfileSet) {
        const { singles, complexes } = rawProfileSet;
        this.singles = [];
        if (singles) {
            if (!(singles instanceof Array)) {
                throw new ValidationError("INVALID_SINGLES_TYPE", "singles must be an array.");
            }
            singles.forEach((item, i) => {
                this.singles.push(this.createSingleProfile(item, i));
            });
        }
        this.complexes = [];
        if (complexes) {
            if (!(complexes instanceof Array)) {
                throw new ValidationError("INVALID_COMPLEXES_TYPE", "complexes must be an array.");
            }
            complexes.forEach((item, i) => {
                this.complexes.push(this.createComplexProfile(item, i));
            });
        }
    }
    createSingleProfile(profile, index) {
        const PATH = `singles[${index}]`;
        const { name, aws_account_id, role_name, ...others } = profile;
        if (this.validateRequiredString(name, PATH, "name", "INVALID_PROFILE_NAME") &&
            this.validateRequiredString(aws_account_id, PATH, "aws_account_id", "INVALID_AWS_ACCOUNT_ID") &&
            this.validateRequiredString(role_name, PATH, "role_name", "INVALID_ROLE_NAME")) {
            return { name, aws_account_id, role_name, ...others };
        }
        throw new Error("unreachable");
    }
    createComplexProfile(complexProfile, index) {
        const { targets, ...baseProfile } = complexProfile;
        const newBaseProfile = this.createComplexBaseProfile(baseProfile, index);
        if (!(targets instanceof Array)) {
            throw new ValidationError("INVALID_TARGETS_TYPE", `complexes[${index}].targets must be an array.`);
        }
        let newTargets;
        try {
            const baseHasTargetRole = !!baseProfile.target_role_name;
            newTargets = targets.map((item, i) => this.createComplexTargetProfile(item, i, baseHasTargetRole));
        }
        catch (err) {
            if (err instanceof Error) {
                err.message = `complexes[${index}].${err.message}`;
            }
            throw err;
        }
        return { ...newBaseProfile, targets: newTargets };
    }
    createComplexBaseProfile(profile, index) {
        const PATH = `complexes[${index}]`;
        this.validateRequiredString(profile.name, PATH, "name", "INVALID_PROFILE_NAME");
        this.validateRequiredString(profile.aws_account_id, PATH, "aws_account_id", "INVALID_AWS_ACCOUNT_ID");
        this.validateStringOrUndefined(profile.aws_account_alias, PATH, "aws_account_alias", "INVALID_AWS_ACCOUNT_ALIAS");
        this.validateStringOrUndefined(profile.role_name, PATH, "role_name", "INVALID_ROLE_NAME");
        this.validateStringOrUndefined(profile.target_role_name, PATH, "target_role_name", "INVALID_TARGET_ROLE_NAME");
        return profile;
    }
    createComplexTargetProfile(profile, index, baseHasTargetRole) {
        const PATH = `targets[${index}]`;
        this.validateRequiredString(profile.name, PATH, "name", "INVALID_PROFILE_NAME");
        this.validateRequiredString(profile.aws_account_id, PATH, "aws_account_id", "INVALID_AWS_ACCOUNT_ID");
        if (baseHasTargetRole) {
            this.validateStringOrUndefined(profile.role_name, PATH, "role_name", "INVALID_ROLE_NAME");
        }
        else {
            this.validateRequiredString(profile.role_name, PATH, "role_name", "INVALID_ROLE_NAME");
        }
        return profile;
    }
    validateRequiredString(value, owner, field, errorCode) {
        const t = typeof value;
        if (t === "string" && t.length > 0)
            return true;
        throw new ValidationError(errorCode, `${owner}.${field} is required to be a valid string.`);
    }
    validateStringOrUndefined(value, owner, field, errorCode) {
        const t = typeof value;
        if ((t === "string" && t.length > 0) || t === "undefined")
            return true;
        throw new ValidationError(errorCode, `${owner}.${field} must be a valid string.`);
    }
}
class ValidationError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

class ConfigParser {
    static parseIni(text) {
        const sectionItems = new IniParser().parse(text);
        const rawProfileSet = new ConfigLoader().load(sectionItems);
        return new ProfileSet(rawProfileSet);
    }
}

class DBManager {
  constructor(dbName) {
    this.dbName = dbName;
    this.version = 1;
    this.db = null;
  }

  open() {
    return new Promise((resolve, reject) => {
      const openReq = indexedDB.open(this.dbName, this.version);
      openReq.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };
      openReq.onupgradeneeded = (event) => {
        const { oldVersion, newVersion } = event;
        const db = event.target.result;
        for (let v = oldVersion + 1; v <= newVersion; v++) {
          if (v === 1) {
            db.createObjectStore('profiles', { keyPath: 'profilePath' });
          }
        }
      };
      openReq.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  transaction(storeName, trFuncWithTable, permission = 'readwrite') {
    if (!this.db) throw new Error('Database not opend');

    return new Promise((resolve, reject) => {
      const tran = this.db.transaction([storeName], permission);
      tran.oncomplete = (e) => {
        resolve();
      };
      tran.onerror = (e) => {
        reject(e.target.error);
      };

      const dbTable = new DBTable(tran.objectStore(storeName));
      trFuncWithTable(dbTable).then(() => {
        tran.commit();
      }).catch(reject);
    });
  }
}

class DBTable {
  constructor(objectStore) {
    this.objStore = objectStore;
  }

  all() {
    return new Promise((resolve, reject) => {
      const req = this.objStore.getAll();
      req.onsuccess = (e) => {
        resolve(e.target.result);
      };
      req.onerror = (e) => {
        reject(e.target.error);
      };
    })
  }

  insert(data) {
    return new Promise((resolve, reject) => {
      const req = this.objStore.add(data);
      req.onsuccess = (e) => {
        resolve(e.target.result);
      };
      req.onerror = (e) => {
        reject(e.target.error);
      };
    })
  }

  query(prefix) {
    return new Promise((resolve, reject) => {
      const range = IDBKeyRange.bound(prefix, prefix + "\uffff");
      const req = this.objStore.openCursor(range, 'next');
      const results = [];
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = (e) => {
        reject(e.target.error);
      };
    })
  }

  truncate() {
    return new Promise((resolve, reject) => {
      const req = this.objStore.clear();
      req.onsuccess = (e) => {
        resolve(e.target.result);
      };
      req.onerror = (e) => {
        reject(e.target.error);
      };
    })
  }
}

var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n;}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return "";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256;}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o));}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return "";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else {if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u);}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}else {for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a];}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++);}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++;}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return ""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return "";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else {if(l!==d)return null;v=s+s.charAt(0);}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++);}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

class CompressedTextSplitter {
  constructor(area) {
    if (area === 'sync') {
      this.itemLen = 2700;
      this.maxItemCount = 8;
    } else {
      this.itemLen = 10485760;
      this.maxItemCount = 1;
    }
  }

  getKeys() {
    const keys = ['lztext'];
    for (let i = 1; i < this.maxItemCount; i++) {
      keys.push(`lztext_${i}`);
    }
    return keys;
  }

  textFromDataSet(dataSet) {
    if (!dataSet.lztext) return '';

    let ctxt = dataSet.lztext;
    for (let i = 1; i < this.maxItemCount; i++) {
      const val = dataSet[`lztext_${i}`];
      if (val) {
        ctxt += val;
      } else {
        break;
      }
    }

    return LZString.decompressFromUTF16(ctxt);
  }

  textToDataSet(text) {
    const ctxt = LZString.compressToUTF16(text);
    if (ctxt.length > this.itemLen * this.maxItemCount) {
      throw new Error('Configuration is too large to save.');
    }

    const dataSet = { lztext: ctxt.substring(0, this.itemLen) };
    let ctxtR = ctxt.substring(this.itemLen);
    for (let i = 1; i < this.maxItemCount; i++) {
      if (ctxtR.length > 0) {
        dataSet[`lztext_${i}`] = ctxtR.substring(0, this.itemLen);
        ctxtR = ctxtR.substring(this.itemLen);
      } else {
        dataSet[`lztext_${i}`] = '';
      }
    }

    return dataSet;  
  }
}

async function loadConfigIni(storageRepo) {
  const cts = new CompressedTextSplitter(storageRepo.kind);
  const dataSet = await storageRepo.get(cts.getKeys());
  return cts.textFromDataSet(dataSet);
}

class StorageRepository {
  constructor(browser, storageArea) {
    this.kind = storageArea;
    this.runtime = browser.runtime;
    this.storageArea = browser.storage[storageArea];
  }

  async get(keys) {
    return new Promise(resolve => {
      this.storageArea.get(keys, resolve);
    })
  }

  async set(items) {
    return new Promise((resolve, reject) => {
      this.storageArea.set(items, () => {
        const { lastError } = this.runtime;
        if (lastError) return reject(lastError)
        resolve();
      });
    })
  }

  delete(keys) {
    this.storageArea.remove(keys, () => {});
  }
}

class SyncStorageRepository extends StorageRepository {
  constructor(browser) {
    super(browser, 'sync');
  }
}

class LocalStorageRepository extends StorageRepository {
  constructor(browser) {
    super(browser, 'local');
  }
}

class SessionStorageRepository extends StorageRepository {
  constructor(browser) {
    super(browser, 'session');
  }

  get disabled() {
    return !this.storageArea
  }
}

class SessionMemory {
  constructor(browser) {
    this.storageRepo = new SessionStorageRepository(browser);
    if (this.storageRepo.disabled) {
      this.storageRepo = new LocalStorageRepository(browser);
    }
  }

  async get(keys) {
    return this.storageRepo.get(keys)
  }

  async set(items) {
    return this.storageRepo.set(items)
  }

  delete(keys) {
    this.storageRepo.delete(keys);
  }
}

class StorageProvider {
  static _local = null;
  static _sync = null;

  static getLocalRepository() {
    if (!this._local) {
      this._local = new LocalStorageRepository(chrome || browser);
    }
    return this._local;
  }

  static getSyncRepository() {
    if (!this._sync) {
      this._sync = new SyncStorageRepository(chrome || browser);
    }
    return this._sync;
  }

  static getRepositoryByKind(kind) {
    if (kind === 'local') return this.getLocalRepository();
    if (kind === 'sync') return this.getSyncRepository();
  }
}

async function findTargetProfiles(ctx) {
  try {
    return await retrieveTargetProfilesFromDB(ctx);
  } catch (err) {
    // Firefox private browsing
    return await retrieveTargetProfilesFromLztext(ctx);
  }
}

async function retrieveTargetProfilesFromDB(ctx) {
  const { baseAccount, loginRole, filterByTargetRole } = ctx;
  const dbManager = new DBManager('aesr');
  await dbManager.open();

  const results = [];
  await dbManager.transaction('profiles', async dbTable => {
    const singles = await dbTable.query(`[SINGLE];`);
    results.push(...singles);

    const complexSrcItems = await dbTable.query('[COMPLEX];');
    const matchedComplexSrc = complexSrcItems.find(it => matchSourceProfile(it, baseAccount, loginRole));
    if (matchedComplexSrc) {
      const complexTargetItems = await dbTable.query(`${matchedComplexSrc.name};`);
      let targets = complexTargetItems.map(it => convertComplexTarget(it, matchedComplexSrc));
      if (filterByTargetRole) {
        targets = targets.filter(it => matchRoleNameLeaf(it, filterByTargetRole));
      }
      results.push(...targets);
    }
  }, 'readonly');

  await dbManager.close();

  return results;
}

function matchSourceProfile(item, account, role) {
  const { aws_account_id, aws_account_alias, role_name } = item;
  if (role_name && role_name !== role) return false;
  return (aws_account_id === account || aws_account_alias === account);
}

function convertComplexTarget(item, baseProfile) {
  if (!item.role_name) {
    item.role_name = baseProfile.target_role_name;
  }

  if (!item.region && baseProfile.target_region) {
    item.region = baseProfile.target_region;
  }

  return item
}

async function retrieveTargetProfilesFromLztext(ctx) {
  const { baseAccount, loginRole, filterByTargetRole } = ctx;
  
  const localRepo = StorageProvider.getLocalRepository();
  const cfgText = await loadConfigIni(localRepo);
  if (!cfgText) return [];

  const profileSet = ConfigParser.parseIni(cfgText);

  const results = [...profileSet.singles];

  const matchedComplexSrc = profileSet.complexes.find(it => matchSourceProfile(it, baseAccount, loginRole));
  if (matchedComplexSrc) {
    let targets = matchedComplexSrc.targets;
    if (filterByTargetRole) {
      targets = targets.filter(it => matchRoleNameLeaf(it, filterByTargetRole));
    }
    results.push(...targets);
  }

  return results;
}

function matchRoleNameLeaf(item, targetLeaf) {
  return item.role_name.split('/').pop() === targetLeaf;
}

function nowEpochSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

function createCodeVerifier() {
  const data = randomData(50);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let str = '', buf = data[0];
  let i = 1, li = data.length - 1, blen = 8;
  while (true) {
    str += chars[buf % 64];
    if (i === li) break;
    blen -= 6;
    buf = buf >> 6;
    if (blen < 6) {
      buf += (data[++i] << blen);
      blen += 8;
    }
  }
  return str;
}

function randomData(len) {
  const arr = new Uint8Array(len);
  return window.crypto.getRandomValues(arr);
}

async function createCodeChallenge(verifier) {
  const hash = await createSha256(verifier);
  return encodeBase64URL(new Uint8Array(hash));
}

async function createSha256(str) {
  const data = new TextEncoder().encode(str);
  return window.crypto.subtle.digest('SHA-256', data);
}

function encodeBase64URL(bytes) {
  const buf = window.btoa(String.fromCharCode(...bytes));
  return buf.replace(/([+/=])/g, (_m, p1) => {
    return p1 == '+' ? '-' : p1 == '/' ? '_' : '';
  });
}

class OAuthClient {
  constructor(subdomain, clientId) {
    this.domain = subdomain + '.aesr.dev';
    this.clientId = clientId;
  }

  async startAuthFlow() {
    const codeVerifier = createCodeVerifier();
    const codeChallenge = await createCodeChallenge(codeVerifier);

    const authorizeUrl = `https://auth.${this.domain}/oauth2/authorize`;
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: `https://api.${this.domain}/callback`,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    return {
      authorizeUrl: authorizeUrl + '?' + params.toString(),
      codeVerifier,
      codeChallenge,
    };
  }

  validateCallbackUrl(uRL) {
    if (uRL.host === `api.${this.domain}` && uRL.pathname === '/callback') {
      const error = uRL.searchParams.get('error');
      if (error) {
        let errmsg = error;
        const errDesc = uRL.searchParams.get('error_description');
        if (errDesc) errmsg += ': ' + errDesc;
        throw new Error(errmsg);
      }
      const authCode = uRL.searchParams.get('code');
      if (authCode) return authCode;
    }
  }

  async verify(codeVerifier, authCode) {
    const params = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      redirect_uri: `https://api.${this.domain}/callback`,
      code: authCode,
      code_verifier: codeVerifier
    };

    const res = await fetch(`https://auth.${this.domain}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error);
    }
    return result;
  }

  async getIdTokenByRefresh(refreshToken) {
    const params = {
      grant_type: 'refresh_token',
      client_id: this.clientId,
      refresh_token: refreshToken,
    };

    const res = await fetch(`https://auth.${this.domain}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    });
    const result = await res.json();
    if (!res.ok) {
      if (result.error === 'invalid_grant') {
        throw new RefreshTokenError('refresh token is invalid');
      }
      throw new Error(result.error);
    }
    return result.id_token;
  }

  async getUserConfig(idToken) {
    const res = await fetch(`https://api.${this.domain}/user/config`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + idToken,
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  }
}

class RefreshTokenError extends Error {}

const sessionMemory$1 = new SessionMemory(chrome || browser);

async function remoteCallback(uRL) {
  const { remoteConnectParams } = await sessionMemory$1.get(['remoteConnectParams']);
  const { subdomain, clientId, codeVerifier } = remoteConnectParams;

  const oauthClient = new OAuthClient(subdomain, clientId);
  const authCode = oauthClient.validateCallbackUrl(uRL);

  const now = nowEpochSeconds();
  const resultToken = await oauthClient.verify(codeVerifier, authCode);
  await sessionMemory$1.set({
    remoteConnectParams: {
      idToken: resultToken.id_token,
      expiresAt: now + resultToken.expires_in - 15,
      apiEndpoint: `https://api.${subdomain}.aesr.dev`,
    }
  });

  const localRepo = StorageProvider.getLocalRepository();
  const remoteConnectInfo = {
    subdomain,
    clientId,
    refreshToken: resultToken.refresh_token,
  };
  await localRepo.set({ remoteConnectInfo });
  return await oauthClient.getUserConfig(resultToken.id_token);
}

async function writeProfileSetToTable(profileSet) {
  const dbManager = new DBManager('aesr');
  await dbManager.open();

  await dbManager.transaction('profiles', async dbTable => {
    await dbTable.truncate();
  });

  await dbManager.transaction('profiles', async dbTable => {
    const { singles = [], complexes = [] } = profileSet;
    let i = 0;

    for (const profile of singles) {
      await dbTable.insert({
        profilePath: `[SINGLE];${formatNum(++i)}`,
        ...profile,
      });
    }

    for (const baseProfile of complexes) {
      const { targets, ...props } = baseProfile;
      await dbTable.insert({
        profilePath: `[COMPLEX];${formatNum(++i)}`,
        ...props,
      });

      for (const targetProfile of targets) {
        await dbTable.insert({
          profilePath: `${props.name};${formatNum(++i)}`,
          ...targetProfile,
        });
      }
    }
  });

  await dbManager.close();
}

function formatNum(num) {
  return `${num}`.padStart(6, '0');
}

const sessionMemory = new SessionMemory(chrome || browser);

function openOptions() {
  (chrome || browser).runtime.openOptionsPage().catch(err => {
    console.error(`Error: ${err}`);
  });
}

function openPage(pageUrl) {
  const brw = chrome || browser;
  const url = brw.runtime.getURL(pageUrl);
  brw.tabs.create({ url }).catch(err => {
    console.error(`Error: ${err}`);
  });
}

async function getCurrentTab() {
  const brw = chrome || browser;
  const [tab] = await brw.tabs.query({ currentWindow:true, active:true });
  return tab;
}

async function moveTabToOption(tabId) {
  const brw = chrome || browser;
  const url = await brw.runtime.getURL('options.html');
  await brw.tabs.update(tabId, { url });
}

async function executeAction(tabId, action, data) {
  return (chrome || browser).tabs.sendMessage(tabId, { action, data });
}

window.onload = function() {
  const MANY_SWITCH_COUNT = 4;

  document.getElementById('openOptionsLink').onclick = function(e) {
    openOptions();
    return false;
  };

  document.getElementById('openUpdateNoticeLink').onclick = function(e) {
    openPage('updated.html');
    return false;
  };

  document.getElementById('openCreditsLink').onclick = function(e) {
    openPage('credits.html');
    return false;
  };

  document.getElementById('openSupportersLink').onclick = document.getElementById('openSupportMe').onclick = function(e) {
    openPage('supporters.html');
    return false;
  };

  const storageRepo = new SyncStorageRepository(chrome || browser);
  storageRepo.get(['visualMode']).then(({ visualMode }) => {
    const mode = visualMode || 'default';
    if (mode === 'dark' || (mode === 'default' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('darkMode');
    }
  });

  sessionMemory.get(['hasGoldenKey', 'switchCount'])
    .then(({ hasGoldenKey, switchCount }) => {
      if (hasGoldenKey || false) {
        document.getElementById('goldenkey').style.display = 'block';
      } else if ((switchCount || 0) > MANY_SWITCH_COUNT) {
        document.getElementById('supportComment').style.display = 'block';
      }
      main();
    });
};

function main() {
  getCurrentTab()
    .then(tab => {
      if (!tab.url) return;

      const url = new URL(tab.url);
      if (url.host.endsWith('.aws.amazon.com')
       || url.host.endsWith('.amazonaws-us-gov.com')
       || url.host.endsWith('.amazonaws.cn')) {
        executeAction(tab.id, 'loadInfo', {}).then(userInfo => {
          if (userInfo) {
            document.getElementById('main').style.display = 'block';
            return loadFormList(url, userInfo, tab.id);
          } else {
            const noMain = document.getElementById('noMain');
            const p = noMain.querySelector('p');
            p.textContent = 'Failed to fetch user info from the AWS Management Console page';
            p.style.color = '#d11';
            noMain.style.display = 'block';
          }
        });
      } else if (url.host.endsWith('.aesr.dev') && url.pathname.startsWith('/callback')) {
        remoteCallback(url)
        .then(userCfg => {
          const p = noMain.querySelector('p');
          p.textContent = "Successfully connected to AESR Config Hub!";
          noMain.style.display = 'block';
          return writeProfileSetToTable(userCfg.profile);
        })
        .then(() => moveTabToOption(tab.id))
        .catch(err => {
          const p = noMain.querySelector('p');
          p.textContent = `Failed to connect to AESR Config Hub because.\n${err.message}`;
          noMain.style.display = 'block';
        });
      } else {
        const p = noMain.querySelector('p');
        p.textContent = "You'll see the role list here when the current tab is AWS Management Console page.";
        noMain.style.display = 'block';
      }
    });
}

async function loadFormList(curURL, userInfo, tabId) {
  const storageRepo = new SyncStorageRepository(chrome || browser);
  const data = await storageRepo.get(['hidesAccountId', 'showOnlyMatchingRoles', 'signinEndpointInHere']);
  const { hidesAccountId = false, showOnlyMatchingRoles = false, signinEndpointInHere = false } = data;

  const curCtx = new CurrentContext(userInfo, { showOnlyMatchingRoles });
  const profiles = await findTargetProfiles(curCtx);
  renderRoleList(profiles, tabId, curURL, { hidesAccountId, signinEndpointInHere });
  setupRoleFilter();
}

function renderRoleList(profiles, tabId, curURL, options) {
  const { url, region, isLocal } = getCurrentUrlandRegion(curURL);
  const listItemOnSelect = function(data) {
    if (options.signinEndpointInHere && isLocal) data.actionSubdomain = region;
    sendSwitchRole(tabId, data);
  };
  const list = document.getElementById('roleList');
  profiles.forEach(item => {
    const li = createRoleListItem(document, item, url, region, options, listItemOnSelect);
    list.appendChild(li);
  });
}

function setupRoleFilter() {
  const roleFilter = document.getElementById('roleFilter');

  let AWSR_firstAnchor = null;
  roleFilter.onkeyup = function(e) {
    const words = this.value.toLowerCase().split(' ');
    if (e.keyCode === 13) {
      if (AWSR_firstAnchor) {
        AWSR_firstAnchor.click();
      }
    } else {
      const lis = Array.from(document.querySelectorAll('#roleList > li'));
      let firstHitLi = null;
      lis.forEach(li => {
        const anchor = li.querySelector('a');
        const profileName = anchor.dataset.search;
        const hit = words.every(it => profileName.includes(it));
        li.style.display = hit ? 'block' : 'none';
        li.classList.remove('selected');
        if (hit && firstHitLi === null) firstHitLi = li;
      });

      if (firstHitLi) {
        firstHitLi.classList.add('selected');
        AWSR_firstAnchor = firstHitLi.querySelector('a');
      } else {
        AWSR_firstAnchor = null;
      }
    }
  };

  roleFilter.focus();
}

function sendSwitchRole(tabId, data) {
  executeAction(tabId, 'switch', data).then(() => {
    sessionMemory.get(['switchCount']).then(({ switchCount }) => {
      let swcnt = switchCount || 0;
      return sessionMemory.set({ switchCount: ++swcnt });
    }).then(() => {
      window.close();
    });
  });
}

function getCurrentUrlandRegion(aURL) {
  const url = aURL.href;
  let region = '';
  const md = aURL.search.match(/region=([a-z\-1-9]+)/);
  if (md) region = md[1];

  let isLocal = false;
  const mdsd = aURL.host.match(/^(([a-z]{2}\-[a-z]+\-[1-9])\.)?console\.aws/);
  if (mdsd) {
    const [,, cr = 'us-east-1'] = mdsd;
    if (cr === region) isLocal = true;
  }

  return { url, region, isLocal }
}
