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

function nowEpochSeconds() {
  return Math.floor(new Date().getTime() / 1000);
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

async function saveConfigIni(storageRepo, text) {
  const cts = new CompressedTextSplitter(storageRepo.kind);
  const dataSet = cts.textToDataSet(text);
  await storageRepo.set(dataSet);
}

class ColorPicker {
  constructor(doc) {
    const colorPicker = doc.getElementById('colorPicker');
    const colorValue = doc.getElementById('colorValue');
    this.onpick = null;
  
    const me = this;
  
    colorPicker.oninput = function() {
      var rrggbb = this.value.substr(1);
      colorValue.value = rrggbb;
      if (me.onpick != null) {
        me.onpick(rrggbb);
      }
    };
  
    colorValue.oninput = function() {
      colorPicker.value = '#'+this.value;
      if (me.onpick != null) {
        me.onpick(this.value);
      }
    };
  
    colorValue.oninput = function() {
      colorPicker.value = '#'+this.value;
    };
  
    colorValue.onkeypress = function(evt) {
      if (evt.keyCode === 13) {
        if (me.onpick != null) {
          me.onpick(this.value);
        }
      }
    };
  }

  setColor(color) {
    colorPicker.value = '#'+color;
    colorValue.value = color;
  }  
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

async function remoteConnect(subdomain, clientId) {
  const permparams = { origins: [`https://*.${subdomain}.aesr.dev/*`] };
  const granted = await chrome.permissions.request(permparams);
  if (!granted) return;

  const oauthClient = new OAuthClient(subdomain, clientId);
  const { authorizeUrl, codeVerifier } = await oauthClient.startAuthFlow();
  const remoteConnectParams = { subdomain, clientId, codeVerifier };
  await sessionMemory$1.set({ remoteConnectParams });

  window.location.href = authorizeUrl;
}

async function getRemoteConnectInfo() {
  const localRepo = StorageProvider.getLocalRepository();
  const { remoteConnectInfo } = await localRepo.get(['remoteConnectInfo']);
  return remoteConnectInfo;
}

function deleteRemoteConnectInfo() {
  const localRepo = StorageProvider.getLocalRepository();
  localRepo.delete(['remoteConnectInfo']);
}

async function deleteRefreshTokenFromRemoteConnectInfo() {
  const localRepo = StorageProvider.getLocalRepository();
  const { remoteConnectInfo } = await localRepo.get(['remoteConnectInfo']);
  delete remoteConnectInfo.refreshToken;
  await localRepo.set({ remoteConnectInfo });
}

async function reloadConfig(remoteConnectInfo) {
  const oaClient = new OAuthClient(remoteConnectInfo.subdomain, remoteConnectInfo.clientId);
  try {
    const idToken = await oaClient.getIdTokenByRefresh(remoteConnectInfo.refreshToken);
    const { profile } = await oaClient.getUserConfig(idToken);
    await writeProfileSetToTable(profile);
    console.log('Updated profile from Config Hub');
    return true;
  } catch (err) {
    if (err instanceof RefreshTokenError) {
      await deleteRefreshTokenFromRemoteConnectInfo();
      console.log('Refresh token is expired');
      return false;
    }
    throw err;
  }
}

function elById(id) {
  return document.getElementById(id);
}

const sessionMemory = new SessionMemory(chrome || browser);

window.onload = function() {
  const syncStorageRepo = StorageProvider.getSyncRepository();
  let configStorageArea = 'sync';
  let colorPicker = new ColorPicker(document);

  elById('switchConfigHubButton').onclick = function() {
    updateRemoteFieldsState('disconnected');
  };
  elById('cancelConfigHubButton').onclick = function() {
    updateRemoteFieldsState('not_shown');
  };
  elById('connectConfigHubButton').onclick = function() {
    const subdomain = elById('configHubDomain').value;
    const clientId = elById('configHubClientId').value;
    remoteConnect(subdomain, clientId).catch(err => {
      updateMessage('remoteMsgSpan', err.message, 'warn');
    });
  };
  elById('disconnectConfigHubButton').onclick = function() {
    updateRemoteFieldsState('disconnected');
    deleteRemoteConnectInfo();
  };
  elById('reloadConfigHubButton').onclick = function() {
    getRemoteConnectInfo().then(rci => {
      if (rci && rci.subdomain && rci.clientId) {
        reloadConfig(rci).then(result => {
          if (result) {
            updateMessage('remoteMsgSpan', "Successfully reloaded config from Hub!");
          } else {
            updateMessage('remoteMsgSpan', `Failed to reload because the connection expired.`, 'warn');
            updateRemoteFieldsState('disconnected');
          }
        }).catch(e => {
          updateMessage('remoteMsgSpan', `Failed to reload because ${e.message}`, 'warn');
        });
      } else {
        updateMessage('remoteMsgSpan', `Failed to reload because the connection is broken.`, 'warn');
      }
    });
  };

  let selection = [];
  let textArea = elById('awsConfigTextArea');
  textArea.onselect = function() {
    let str = this.value.substring(this.selectionStart, this.selectionEnd);
    let r = str.match(/^([0-9a-fA-F]{6})$/);
    if (r !== null) {
      colorPicker.setColor(r[1]);
      selection = [this.selectionStart, this.selectionEnd];
      colorPicker.onpick = function(newColor) {
        str = textArea.value;
        textArea.value = str.substring(0, selection[0]) + newColor + str.substring(selection[1]);
      };
    } else {
      selection = [];
      colorPicker.onpick = null;
    }
  };

  elById('saveButton').onclick = function() {
    try {
      const area = elById('configStorageSyncRadioButton').checked ? 'sync' : 'local';
      saveConfiguration(textArea.value, area).then(() => {
        updateMessage('msgSpan', 'Configuration has been updated!');
      })
      .catch(lastError => {
        let msg = lastError.message;
        if (lastError.message === "A mutation operation was attempted on a database that did not allow mutations.") {
          msg = "Configuration cannot be saved while using Private Browsing.";
        }
        updateMessage('msgSpan', msg, 'warn');
        if (typeof lastError.line === 'number') focusConfigTextArea(lastError.line);
      });
    } catch (e) {
      updateMessage('msgSpan', `Failed to save because ${e.message}`, 'warn');
    }
  };

  const booleanSettings = ['hidesAccountId', 'showOnlyMatchingRoles', 'autoAssumeLastRole'];
  for (let key of booleanSettings) {
    elById(`${key}CheckBox`).onchange = function() {
      syncStorageRepo.set({ [key]: this.checked });
    };
  }
  const signinEndpointInHereCheckBox = elById('signinEndpointInHereCheckBox');
  sessionMemory.get(['hasGoldenKey'])
  .then(({ hasGoldenKey }) => {
    if (hasGoldenKey) {
      signinEndpointInHereCheckBox.onchange = function() {
        syncStorageRepo.set({ signinEndpointInHere: this.checked });
      };

      getRemoteConnectInfo().then(rci => {
        if (rci && rci.subdomain && rci.clientId) {
          elById('configHubDomain').value = rci.subdomain;
          elById('configHubClientId').value = rci.clientId;
          if (rci.refreshToken) {
            updateRemoteFieldsState('connected');
          } else {
            updateRemoteFieldsState('disconnected');
            updateMessage('remoteMsgSpan', "Please reconnect because your credentials have expired.", 'warn');
          }
        }
      });
    } else {
      signinEndpointInHereCheckBox.disabled = true;
      const schb = elById('switchConfigHubButton');
      schb.disabled = true;
      schb.title = 'Supporters only';
    }
  });
  booleanSettings.push('signinEndpointInHere');

  elById('configSenderIdText').onchange = function() {
    syncStorageRepo.set({ configSenderId: this.value });
  };

  elById('configStorageSyncRadioButton').onchange = elById('configStorageLocalRadioButton').onchange = function(e) {
    if (this.value === 'sync') {
      // local to sync
      const localStorageRepo = StorageProvider.getLocalRepository();
      const now = nowEpochSeconds();
      loadConfigIni(localStorageRepo)
      .then(text => {
        if (text) {
          return saveConfigIni(syncStorageRepo, text)
        }
      })
      .then(() => {
        return Promise.all([
          syncStorageRepo.set({ configStorageArea: 'sync', profilesLastUpdated: now }),
          localStorageRepo.set({ profilesTableUpdated: now }),
        ])
      })
      .catch(err => {
        e.preventDefault();
        alert(err.message);
        elById('configStorageLocalRadioButton').checked = true;
      });
    } else {
      // sync to local
      syncStorageRepo.set({ configStorageArea: 'local' })
      .catch(err => {
        e.preventDefault();
        alert(err.message);
        elById('configStorageSyncRadioButton').checked = true;
      });
    }
  };

  elById('defaultVisualRadioButton').onchange = elById('lightVisualRadioButton').onchange = elById('darkVisualRadioButton').onchange = function() {
    const visualMode = this.value;
    syncStorageRepo.set({ visualMode });
    if (visualMode === 'dark' || (visualMode === 'default' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  };

  syncStorageRepo.get(['configSenderId', 'configStorageArea', 'visualMode'].concat(booleanSettings))
  .then(data => {
    elById('configSenderIdText').value = data.configSenderId || '';
    for (let key of booleanSettings) {
      elById(`${key}CheckBox`).checked = data[key] || false;
    }

    configStorageArea = data.configStorageArea || 'sync';
    switch (configStorageArea) {
      case 'sync':
        elById('configStorageSyncRadioButton').checked = true;
        break;
      case 'local':
        elById('configStorageLocalRadioButton').checked = true;
        break;
    }

    const visualMode = data.visualMode || 'default';
    elById(visualMode + 'VisualRadioButton').checked = true;
    if (visualMode === 'dark' || (visualMode === 'default' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('darkMode');
    }

    loadConfigIni(StorageProvider.getRepositoryByKind(configStorageArea)).then(cfgText => {
      textArea.value = cfgText || '';
    });
  });
};

async function saveConfiguration(text, storageArea) {
  const syncRepo = StorageProvider.getSyncRepository();
  const localRepo = StorageProvider.getLocalRepository();
  const now = nowEpochSeconds();

  await saveConfigIni(localRepo, text);
  if (storageArea === 'sync') {
    await saveConfigIni(syncRepo, text);
    await syncRepo.set({ profilesLastUpdated: now });
  }

  const profileSet = ConfigParser.parseIni(text);
  await writeProfileSetToTable(profileSet);
  await localRepo.set({ profilesTableUpdated: now });
}

function updateMessage(elId, msg, cls = 'success') {
  const el = elById(elId);
  const span = document.createElement('span');
  span.className = cls;
  span.textContent = msg;
  const child = el.firstChild;
  if (child) {
    el.replaceChild(span, child);
  } else {
    el.appendChild(span);
  }

  if (cls === 'success') {
    setTimeout(() => {
      span.remove();
    }, 2500);
  }
}

function updateRemoteFieldsState(state) {
  if (state === 'connected') {
    elById('configHubPanel').style.display = 'block';
    elById('standalonePanel').style.display = 'none';
    elById('configHubDomain').disabled = true;
    elById('configHubClientId').disabled = true;
    elById('cancelConfigHubButton').style.display = 'none';
    elById('connectConfigHubButton').style.display = 'none';
    elById('disconnectConfigHubButton').style.display = 'inline-block';
    elById('reloadConfigHubButton').style.display = 'inline-block';
  } else if (state === 'disconnected') {
    elById('configHubPanel').style.display = 'block';
    elById('standalonePanel').style.display = 'none';
    elById('configHubDomain').disabled = false;
    elById('configHubClientId').disabled = false;
    elById('cancelConfigHubButton').style.display = 'inline-block';
    elById('connectConfigHubButton').style.display = 'inline-block';
    elById('disconnectConfigHubButton').style.display = 'none';
    elById('reloadConfigHubButton').style.display = 'none';
  } else { // not shown
    elById('standalonePanel').style.display = 'block';
    elById('configHubPanel').style.display = 'none';
  }
}

function focusConfigTextArea(ln) {
  const ta = document.getElementById('awsConfigTextArea');
  ta.scrollTop = ln < 10 ? 0 : 16 * (ln - 10);
  const lines = ta.value.split('\n');
  if (ln === 1) {
    ta.setSelectionRange(0, lines[0].length + 1);
    ta.focus();
    return;
  }
  ln--;
  const start = lines.slice(0, ln).join('\n').length + 1;
  const end = start + lines[ln].length;
  ta.setSelectionRange(start, end);
  ta.focus();
}
