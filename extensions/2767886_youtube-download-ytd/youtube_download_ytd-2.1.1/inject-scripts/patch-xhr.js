(() => {
  const patchXHR = () => {
    ((xhr) => {
      // console.log("we are in main page!!!");
      function mock(xhrInstance) {
        try {
          const contentType = xhrInstance.getResponseHeader("content-type");
          // console.log("CONTENT TYPE!!!", contentType);
          if (contentType.includes("application/json")) {
            // console.log("RESPONSE!!!", xhrInstance.responseText);
            const data = JSON.parse(xhrInstance.responseText);
            window.postMessage(data, "*");
          } else {
            // console.log("RESPONSE!!!", xhrInstance.responseText);
          }
        } catch (e) {
          console.log(e);
        }
      }
      const { open } = xhr;
      /* eslint-disable-next-line no-param-reassign */
      xhr.open = function () {
        /* eslint-disable-next-line prefer-rest-params */
        const openArguments = arguments;
        const { send } = this;
        this.send = function (data, ...args) {
          if (openArguments[0].toLowerCase() === "post" && openArguments[1].includes("/ajax/bulk-route-definitions/")) {
            const resolveParams = {};
            const bodyParams = new URLSearchParams(data);
            /* eslint-disable-next-line no-restricted-syntax */
            for (const key of bodyParams.keys()) {
              resolveParams[key] = bodyParams.get(key);
            }
            window.resolveParams = resolveParams;
          }
          const { onload } = this;
          if (onload) {
            // Apply monkey-patch
            this.onload = function (...xhrArgs) {
              mock(this);
              return onload.apply(this, xhrArgs);
            };
          }
          return send.apply(this, [data, ...args]);
        };
        /* eslint-disable-next-line prefer-rest-params */
        return open.apply(this, arguments);
      };
    })(XMLHttpRequest.prototype);
  };
  patchXHR();
}
)();
