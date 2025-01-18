const jwkCertKey = {
  "kty": "RSA",
  "n": "xW3J9jNQz_tAfQVpyqiDv4In-mJduhGinI0asERp9FYqd4UIMGD9GW2D8k5SgXUHrY1-rwVN8-u2YKvVv19r9ofTafpQBcPKOUv4cDGFFNNOoThk6ZkTjJLP4thqp92_hnSkJCh-ixyVuwAvpZCM7TfwJN5XzFAjTrylnsmuVmDWIAcNFns4vkfOOT0U_8EBvQZdiKX-IUa3qqSm0fy1daFcY-fWbiWGN0csk-tufhwRfVjsnsLctN_eCxwvgemZWZ4N1BNUPzN3JlOALd-WfbjyV4eSMWwnTPdRcKkB2MoTcGqBaU8DNadESvcGUB9LoK5_H9rFbQKg77MggA1jQxouhQ00hFcioJ7rynPVd6p_vtjsJ2RrT2_phMOs7bfgsh3wY9PNFSo5L6htaQhrKGEweZG3VIXmtqB2lYwWOBUrxVX3Sbqm3ftDjU3p8sQ6UDpvtNddD0EP0Pc3YnpoYd6wEBUn-5e7jjP-34yGaCs28wAqHfrJtq5_or9JqYZswP95TZQbWg6WUQIcS-gPIRBi4t6kYDak0hTneulwV5RhhDlPETGnyQ1sBObhtGpIoHNgF5_sFtfBF_f7PHFTFVr7sl_fqAUxO6arlYHaDhM3X9gySCyGweaff2llKSNwaiQl1qcwSjPO7bDDZVQRZ4Rh95kRb5LyUeBQkZVAaX8",
  "e": "AQAB"
};

async function verifyJWT(token, key) {
  const decodeBase64Url = (str) => {
    const convmap = {
      '-': '+',
      '_': '/',
    };
    const urlUnsafed = str.replace(/([\-_=])/g, (match, p1) => convmap[p1]);
    return atob(urlUnsafed);
  };

  const toBuffer = (str) => {
    let buf = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) buf[i] = str.charCodeAt(i);
    return buf;
  };

  const algorithm = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: { name: 'SHA-256' }
  };

  const cryptoKey = await crypto.subtle.importKey('jwk', key, algorithm, true, ['verify']);

  const [head, claim, sig] = token.split('.');
  const signature = toBuffer(decodeBase64Url(sig));
  const payload = toBuffer(`${head}.${claim}`);

  const result = await crypto.subtle.verify(algorithm, cryptoKey, signature, payload);
  if (!result) throw new Error('Failed to verify token')

  const data = JSON.parse(decodeBase64Url(claim));
  if (data.exp && (new Date(data.exp * 1000) < new Date())) throw new Error('Token expired');

  return data;
}

async function validateKeyCode(keyCode) {
  const lines = keyCode.split('\n');
  const contents = lines.slice(1, -1);
  const metadatas = {};
  let i = 0;
  for (; i < contents.length; i++) {
    const metadata = contents[i].trim();
    if (metadata.length === 0) break;
    const [key, val] = metadata.split(': ');
    metadatas[key] = val;
  }
  const token = contents.slice(++i).join('');

  const data = await verifyJWT(token, jwkCertKey);
  if (data.organizationName) {
    if (data.organizationName === metadatas['Organization Name'] && data.numberOfUsers === metadatas['Number of Users']) {
      return { name: data.organizationName, exp: data.exp };
    }
  } else if (data.individualName) {
    if (data.individualName === metadatas['Individual Name']) {
      return { name: data.individualName, exp: data.exp };
    }
  }
  throw new Error('Invalid')
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

function setIcon(path) {
  const brw = chrome || browser;
  return brw.action.setIcon({ path });
}

const syncStorageRepo = new SyncStorageRepository(chrome || browser);
const sessionMemory = new SessionMemory(chrome || browser);

function updateKeyExpire(exp) {
  syncStorageRepo.set({ goldenKeyExpire: exp })
  .then(() => {
    return sessionMemory.set({ hasGoldenKey: exp ? exp : '' })
  })
  .then(() => {
    return setIcon(`/icons/Icon_48x48${exp ? '_g' : ''}.png`);
  });
}

function setEventHandler() {
  const keyCodeValid = document.getElementById('keyCodeValid');
  const keyCodeInvalid = document.getElementById('keyCodeInvalid');

  textareaKeyCode.oninput = function() {
    const keyCode = this.value;
    if (!keyCode) {
      keyCodeValid.style.display = 'none';
      keyCodeInvalid.style.display = 'none';
      updateKeyExpire(null);
      return;
    }

    validateKeyCode(keyCode)
    .then(data => {
      keyCodeValid.style.display = 'block';
      keyCodeInvalid.style.display = 'none';
      updateKeyExpire(data.exp);
    })
    .catch(err => {
      keyCodeValid.style.display = 'none';
      keyCodeInvalid.style.display = 'block';
      updateKeyExpire(null);
    });
  };
}

window.onload = function() {
  const textareaKeyCode = document.getElementById('textareaKeyCode');

  textareaKeyCode.placeholder = `\
---------- BEGIN ------ AESR GOLDEN KEY ----------
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
----------- END ------- AESR GOLDEN KEY ----------`;

  syncStorageRepo.get(['goldenKeyExpire'])
  .then(data => {
    const { goldenKeyExpire } = data;
    if ((new Date().getTime() / 1000) < Number(goldenKeyExpire)) {
      document.getElementById('keyCodeValid').style.display = 'block';
    }
    setEventHandler();
  });
};
