(function () {
  'use strict';
  let storedResume = null;
  let shouldSendDataWhenResumeBecameReady = false;

  const RUNTIME_MESSAGE_ACTIONS = {
    'HHTms-Init': () => {
      sendResume();
    },
  };

  const GET_RESUME_TEXT_EMPTY_RESULT = {
    actionResult: null,
  };

  const NAME_PART_CASES_DEFAULT = {
    1: ['firstName'],
    2: ['lastName', 'firstName'],
    3: ['lastName', 'firstName', 'middleName'],
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request.action || !RUNTIME_MESSAGE_ACTIONS[request.action]) {
      return;
    }

    RUNTIME_MESSAGE_ACTIONS[request.action](request, sender, sendResponse);
    return true;
  });

  const Utils = {
    csrf(pattern) {
      const re = new RegExp(unescape(pattern));
      return document.cookie.match(re)?.pop() ?? '';
    },
    getLocationPathNextSiblingPart(path) {
      return window.location.pathname.split(path).pop().split('/')[0];
    },
    replace(str, searchValue, replaceValue) {
      return str.replace(searchValue, replaceValue);
    },
  };

  const applyFn = ([fn, ...args]) => Utils[fn].apply(null, args);

  const useFn = (value) => (Array.isArray(value) ? applyFn(value) : value);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw { code: response.status, statusText: response.statusText };
    }
    return response.json();
  };

  const handleNetworkError = () => {
    throw {
      code: 0,
      statusText: 'Network request failed',
    };
  };

  const MUTATION_TIMEOUT = 5000;

  const ACTIONS = {
    actionsUnion: (options) => {
      const actions = options.actions.map((actionConfig) => createActionWrapper(actionConfig));
      return Promise.all(actions);
    },
    waitMutation: (options) =>
      new Promise((resolve, reject) => {
        const element = getElement(options);
        const count = options.count || 1;
        let doneCount = 0;

        if (!element) {
          return reject();
        }

        const observer = new MutationObserver(() => {
          if (++doneCount !== count) {
            return;
          }

          clearTimeout(timeout);
          observer.disconnect();
          resolve();
        });
        observer.observe(element, {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true,
        });

        const timeout = setTimeout(() => {
          observer.disconnect();
          reject();
        }, MUTATION_TIMEOUT);
      }),
    getNodeText: (options) =>
      new Promise((resolve, reject) => {
        const element = getElement(options);
        if (!element) {
          return reject();
        }

        let elementText = element.innerText;
        const patternMatched = !options.patternMatch || new RegExp(options.patternMatch).test(elementText);
        const patternSelected = options.patternSelected;

        if (options.unnecessaryPart) {
          elementText = elementText.replace(new RegExp(options.unnecessaryPart), '');
        }

        if (patternSelected && patternSelected.pattern) {
          const elements = elementText.match(new RegExp(patternSelected.pattern, patternSelected.flags || 'gi'));
          const element = elements[patternSelected.index || 0];

          if (element) {
            elementText = element;
          }
        }

        patternMatched ? resolve(elementText.trim()) : reject();
      }),
    getNodeAttribute: (options) =>
      new Promise((resolve, reject) => {
        const element = getElement(options);
        element ? resolve(element.getAttribute(options.attribute)) : reject();
      }),
    click: (options) =>
      new Promise((resolve, reject) => {
        if (!options.all) {
          const element = getElement(options);
          element && element.click();
          return element ? resolve() : reject();
        }

        const elements = document.querySelectorAll(options.selector);
        if (!elements.length) {
          return reject();
        }
        for (let i = 0; i < elements.length; i++) {
          elements[i].click();
        }
        resolve();
      }),
    next: (options) => Promise.reject(),
    api(options) {
      const { requestOptions } = options;
      const { prepare, ...declareOptions } = requestOptions;

      function preparEachOptions(options) {
        return Object.entries(options).reduce((options, [key, value]) => {
          if (typeof value === 'string' || typeof value === 'number') {
            options[key] = value;
          }
          if (typeof value === 'object') {
            options[key] = preparEachOptions(value);
          }
          if (Array.isArray(value)) {
            const [fn, ...args] = value;
            options[key] = applyFn([fn, ...args.map(useFn)]);
          }
          return options;
        }, {});
      }

      Object.assign(declareOptions, preparEachOptions(prepare));

      return new Promise((resolve) => {
        const { field, resource = '' } = options;
        const { url, method, ...params } = declareOptions;
        const requestUrl = `${url}${resource}`;

        fetch(requestUrl, {
          method,
          ...params,
        })
          .catch(handleNetworkError)
          .then(handleResponse)
          .then((data) => resolve({ [field]: { status: 'success', request: requestUrl, ...data } }))
          .catch((error) => resolve({ [field]: { status: 'error', request: requestUrl, error } }));
      });
    },
  };

  function createActionWrapper(actionConfig) {
    if (Array.isArray(actionConfig)) {
      let prevAction = Promise.resolve();
      actionConfig.forEach((action) => {
        prevAction = prevAction.then(() => ACTIONS[action.action || 'getNodeText'](action));
      });

      return prevAction;
    }

    return ACTIONS[actionConfig.action || 'getNodeText'](actionConfig);
  }

  function saveResume(result) {
    storedResume = result;
    if (shouldSendDataWhenResumeBecameReady) {
      sendResume();
      shouldSendDataWhenResumeBecameReady = false;
    }
  }
  function sendResume() {
    if (storedResume === null) {
      shouldSendDataWhenResumeBecameReady = true;
    }
    const message = Object.assign({ to: 'iframe' }, storedResume);
    chrome.runtime.sendMessage({ action: 'saveResume', data: message }, () => {
      storedResume = null;
    });
  }

  chrome.runtime.sendMessage({ action: 'getConfig', location: window.location.href }, (response) => {
    let resultPromise;
    if (!response.parsingParams) {
      resultPromise = Promise.resolve({
        status: 'configError',
      });
    } else if (response.state === 'disabled') {
      resultPromise = Promise.resolve({
        status: 'unsupported',
        link: window.location.href,
      });
    } else if (response.state === 'enabled') {
      resultPromise = Promise.resolve({
        status: 'wrongPage',
      });
    } else {
      const resumeFetchers = response.parsingParams.config;
      const { type, config } = resumeFetchers.find((fetcher) => window.location.host.includes(fetcher.pattern));

      if (['hh', 'Zarplata'].includes(type)) {
        resultPromise = Promise.resolve({ status: 'ok', resume: { type, link: window.location.href } });
      } else {
        resultPromise = getResume(type, config);
      }
    }
    resultPromise.then(saveResume);
  });

  function getResumeText(actions) {
    return new Promise((resolve) => {
      let currentAction = 0;
      function tryNextAction() {
        if (!actions || currentAction >= actions.length) {
          resolve(GET_RESUME_TEXT_EMPTY_RESULT);
        } else {
          createActionWrapper(actions[currentAction++])
            .then((actionResult) => {
              resolve({
                action: actions[currentAction - 1],
                actionResult,
              });
            }, tryNextAction)
            .catch(tryNextAction);
        }
      }

      tryNextAction();
    });
  }

  function getElement(options) {
    const elements = document.querySelectorAll(options.selector);
    const index = options.index || 0;
    if (elements.length > index) {
      return elements[index];
    }
  }

  function getResumeParts(parts) {
    return parts.map(function (selector) {
      const elements = document.querySelectorAll(selector);
      return [].map.call(elements, (element) => element.innerHTML).join(' ');
    });
  }

  function getNameParts(nameValue, nameConfig) {
    const result = {};
    const partsCount = Math.min(3, nameValue.length);
    const partsConfig = nameConfig[partsCount];
    partsConfig.forEach((partKey, index) => {
      result[partKey] = nameValue[index];
    });
    return result;
  }

  function getApiData(config) {
    return config
      ? new Promise((resolve) =>
        Promise.all(config.actions.map((action) => createActionWrapper(action))).then((values) =>
          resolve(
            values.reduce((map, current) => ({ ...map, ...current })),
            {}
          )
        )
      )
      : Promise.resolve(null);
  }

  function clearHTMLData(data, selectors) {
    const placeholder = document.createElement('template');
    const container = document.createElement('div');

    placeholder.innerHTML = data;
    container.append(placeholder.content.cloneNode(true));

    selectors.forEach((selector) => {
      const elements = container.querySelectorAll(selector);
      if (elements.length) {
        elements.forEach((element) => {
          element.parentNode.removeChild(element);
        });
      }
    });

    /**
     * Делаем замену <tr> и </tr> на <p> и </p>,
     * так как tr при вставке в html меняются на div и текст становится склееным
     * @see https://grrr.tech/posts/create-dom-node-from-html-string/#caveats
     */
    return container.innerHTML.replace(/(<tr>)/g, '<p>').replace(/<\/tr>/g, '</p>')
  }

  function getResume(type, config) {
    const preparePromise = config.prepare ? getResumeText(config.prepare, config) : Promise.resolve();
    return preparePromise.then(() => {
      let promises = [
        getResumeText(config.name),
        getResumeText(config.cell),
        getResumeText(config.email),
        getResumeText(config.cellImage),
        getResumeText(config.linkedIn),
        getResumeText(config.habr),
        getApiData(config.api),
      ];

      return Promise.all(promises)
        .then((values) => {
          if (!config.afterContacts) {
            return Promise.resolve(values);
          }

          return new Promise((resolve) => {
            getResumeText(config.afterContacts).then(() => resolve(values));
          });
        })
        .then((values) => {
          let name = values[0].actionResult;
          const nameActionConfig = values[0].action;
          const cell = values[1].actionResult;
          const email = values[2].actionResult;
          const cellImage = values[3].actionResult;
          const linkedIn = values[4].actionResult;
          const habr = values[5].actionResult;
          const jsonData = values[6];
          if (name && (cell || email || cellImage || linkedIn || habr)) {
            name = name.split(' ');
            let resumeParts = getResumeParts(config.resume).join(' ');
            const contacts = [];

            if (cell) {
              contacts.push({ type: 'cell', value: cell });
            }

            if (email) {
              contacts.push({ type: 'email', value: email });
            }

            if (linkedIn) {
              contacts.push({ type: 'linkedin', value: linkedIn });
            }

            if (habr) {
              contacts.push({ type: 'habr', value: habr });
            }

            if (config.resumeClearData) {
              resumeParts = clearHTMLData(resumeParts, config.resumeClearData);
            }

            return Promise.resolve({
              status: 'ok',
              resume: {
                ...getNameParts(name, nameActionConfig.namePartCases || NAME_PART_CASES_DEFAULT),
                cellImage: cellImage,
                contacts: contacts,
                resume: {
                  type: type,
                  text: '<div>' + resumeParts + '</div>',
                  link: window.location.href,
                  jsonData: jsonData,
                },
              },
            });
          } else {
            if (config.buyContacts.some((item) => document.querySelector(item))) {
              return Promise.resolve({ status: 'auth' });
            } else {
              let bodyClone = document.body.cloneNode(true);
              bodyClone.querySelectorAll('script, style').forEach((unnecessaryEl) => unnecessaryEl.remove());
              return Promise.resolve({
                status: 'error',
                report: {
                  type: type,
                  link: window.location.href,
                  data: {
                    name: name,
                    cell: cell,
                    email: email,
                    linkedIn: linkedIn,
                    habr: habr,
                  },
                  html: bodyClone.innerHTML,
                },
              });
            }
          }
        });
    });
  }
})();
