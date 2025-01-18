(() => {
  const sandboxed = [null];

  window.addEventListener("CustomWorkerRequest", (e) => {
    const {
      action,
      _sid,
      _cid,
      args,
      body,
      params = [],
    } = JSON.parse(e.detail);
    const resp = (r) => {
      const data = JSON.stringify({ _sid, _cid, ...r });
      const event = new CustomEvent("CustomWorkerResponse", { detail: data });
      window.dispatchEvent(event);
    };

    switch (action) {
    case "create":
      try {
        // eslint-disable-next-line no-new-func
        sandboxed.push(new Function(...args, body));
        resp({ _sid: sandboxed.length - 1, result: "inited" });
      } catch (err) {
        resp({ _sid, error: err.message, stack: err.stack });
      }
      break;
    case "call":
      if (!_sid) {
        resp({ _sid, error: "unknown instance id" });
        return;
      }
      (async () => {
        try {
          const result = await sandboxed[_sid](...params);
          resp({ _sid, result });
        } catch (err) {
          resp({ _sid, error: err.message, stack: err.stack });
        }
      })();
      break;
    default:
      resp({ _sid, error: "unknown params" });
    }
  });
})();
