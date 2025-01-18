import {
  YoutubePlayerBox_default
} from "./FNVQU4MI.js";
import {
  Recoil_index_22,
  Recoil_index_24,
  Recoil_index_8
} from "./FQZJQWJR.js";
import {
  Box_default,
  Button_default,
  Link_default,
  Skeleton_default,
  Tooltip_default,
  import_ClickAwayListener,
  material_exports
} from "./2FH7W2EF.js";
import {
  Stack_default,
  Typography_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  authEmitPricingHooksLog,
  getPermissionCardSettingsBySceneType,
  promiseTimeout
} from "./IHKLZ7RH.js";
import {
  require_react
} from "./AMCWABVH.js";
import {
  getUseChatGPTUserInfo,
  parseUserPlan
} from "./QVVA4RGO.js";
import {
  ContentScriptConnectionV2
} from "./KFVZFM6T.js";
import {
  CHROME_EXTENSION_POST_MESSAGE_ID,
  MAXAI_INSTALL_LINK
} from "./XVTLOGGR.js";
import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  v4_default
} from "./2RTBHBIC.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/mainUI/constants/index.ts
var TOOLBAR_SHADOW_ROOT_ID = "wcg-toolbar";
var SLASH_COMMANDS_MENU_ROOT_ID = "SLASH_COMMANDS_MENU_ROOT_ID";

// src/features/prompt/constant/index.ts
var DEFAULT_PROMPT_LIST_TYPE = "Public";
var NEED_AUTH_PROMPT_LIST_TYPE = ["Favorites", "Own"];
var DEFAULT_PROMPT_AUTHOR = "MaxAI.me";
var DEFAULT_PROMPT_AUTHOR_LINK = MAXAI_INSTALL_LINK;
var PROMPT_COLORS = ["#5D5FEF", "#FF6154", "#008000", "#FFA500"];
var PROMPT_APP_SHADOW_ROOT_ID = "WEBCHATGPT_PROMPT_APP_SHADOW_ROOT";
var PROMPT_APP_WRAPPER_ID = "WEBCHATGPT_PROMPT_APP_WRAPPER";
var PROMPT_RUNNER_SHADOW_ROOT_ID = "WEBCHATGPT_PROMPT_RUNNER_SHADOW_ROOT";
var PROMPT_RUNNER_WRAPPER_ID = "WEBCHATGPT_PROMPT_RUNNER_WRAPPER";
var PROMPT_AUTH_REF = {
  Favorites: "webchatgpt-favorites",
  Own: "webchatgpt-own",
  Public: "webchatgpt-public"
};
var DEFAULT_PROMPT_VARIABLE = [
  // type livecrawling
  {
    name: "Live Crawling Target URL",
    hint: "Enter the URL you wish to extract text from",
    type: "livecrawling",
    isSystemVariable: true
  },
  {
    name: "Live Crawling Crawled Text",
    hint: "This variable will be automatically updated with text extracted from the target URL",
    type: "livecrawling",
    isSystemVariable: true
  },
  // {
  //   name: 'Live Crawling Crawled Html',
  //   hint: 'This variable will be automatically updated with Html extracted from the target URL',
  //   type: 'livecrawling',
  //   isSystemVariable: true,
  // },
  // type webaccess
  {
    name: "Web Search Query",
    hint: "Enter your search term",
    type: "websearch",
    isSystemVariable: true
  },
  {
    name: "Web Search Results",
    hint: "This variable will be automatically updated with the search results",
    type: "websearch",
    isSystemVariable: true
  },
  // type system
  {
    name: "System Current Date",
    hint: "This variable will be automatically updated with the current date",
    type: "system",
    isSystemVariable: true
  }
];
var VARIABLE_TYPE_LABEL_MAP = {
  livecrawling: "Live Crawling",
  websearch: "Web Search",
  system: "System",
  text: "Text"
};

// src/utils/elementHelper.ts
var shadowRootIdMap = {
  PromptApp: PROMPT_APP_SHADOW_ROOT_ID,
  PromptRunner: PROMPT_RUNNER_SHADOW_ROOT_ID,
  WebAccessToolbar: TOOLBAR_SHADOW_ROOT_ID,
  GlobalSnackbar: "webchatgpt-snackbar"
};
function getAppRoot(name) {
  var _a, _b;
  if (name && shadowRootIdMap[name]) {
    return ((_b = (_a = document.querySelector(`#${shadowRootIdMap[name]}`)) == null ? void 0 : _a.shadowRoot) == null ? void 0 : _b.querySelector("div:first-of-type")) || document.body;
  }
  return document.body;
}
function getPossibleElementByQuerySelector(queryArray) {
  for (const query of queryArray) {
    const element = document.querySelector(query);
    if (element) {
      return element;
    }
  }
}
var createShadowRoot = (props) => {
  const {
    containerId,
    presetContainerElement,
    shadowRootId,
    presetShadowRootElement,
    webComponent = true
  } = props;
  const isSupportWebComponent = "customElements" in window;
  const shadowRoot = document.createElement(
    isSupportWebComponent && webComponent ? `webchatgpt-custom-element-${v4_default()}` : "div"
  );
  if (shadowRootId) {
    shadowRoot.id = shadowRootId;
  }
  if (presetShadowRootElement) {
    presetShadowRootElement(shadowRoot);
  }
  const shadowContainerWindow = shadowRoot.attachShadow({ mode: "open" });
  const emotionRoot = document.createElement("style");
  if (containerId) {
    emotionRoot.id = `${containerId}-emotion-style`;
  }
  const container = document.createElement("div");
  if (containerId) {
    container.id = containerId;
  }
  if (presetContainerElement) {
    presetContainerElement(shadowRoot);
  }
  shadowContainerWindow.appendChild(emotionRoot);
  shadowContainerWindow.appendChild(container);
  return {
    container,
    shadowRoot,
    emotionRoot
  };
};
function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
function queryShadowContainerElementSelector(shadowRootId, selectors) {
  var _a, _b;
  return (_b = (_a = document.querySelector(`#${shadowRootId}`)) == null ? void 0 : _a.shadowRoot) == null ? void 0 : _b.querySelector(selectors);
}

// src/features/auth/hooks/useAuth.tsx
var import_react4 = __toESM(require_react());
var import_webextension_polyfill = __toESM(require_browser_polyfill());

// src/features/auth/store/index.ts
var AuthModalShowState = Recoil_index_8({
  key: "AuthModalShowState",
  default: false
});
var AuthParamsState = Recoil_index_8({
  key: "AuthParamsState",
  default: {
    ref: ""
  }
});

// src/features/auth/hooks/useUserProfile.ts
var import_react3 = __toESM(require_react());

// src/hooks/useEffectOnce.ts
var import_react = __toESM(require_react());
function useEffectOnce(effect) {
  const destroyFunc = (0, import_react.useRef)();
  const calledOnce = (0, import_react.useRef)(false);
  const renderAfterCalled = (0, import_react.useRef)(false);
  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }
  (0, import_react.useEffect)(() => {
    if (calledOnce.current) {
      return;
    }
    calledOnce.current = true;
    destroyFunc.current = effect();
    return () => {
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
}
var useEffectOnce_default = useEffectOnce;

// src/hooks/useFocus.ts
var import_react2 = __toESM(require_react());
var useFocus = (execFunction) => {
  (0, import_react2.useEffect)(() => {
    const onFocus = () => {
      execFunction();
    };
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
};

// src/features/auth/hooks/useUserProfile.ts
var useUserProfile = (focusUpdate = true) => {
  const [userInfo, setUserInfo] = (0, import_react3.useState)(null);
  const [loaded, setLoaded] = (0, import_react3.useState)(false);
  const [loading, setLoading] = (0, import_react3.useState)(false);
  useEffectOnce_default(() => {
    setLoading(true);
    getUseChatGPTUserInfo().then((userInfo2) => {
      if (userInfo2) {
        setUserInfo(userInfo2);
      }
      setLoaded(true);
      setLoading(false);
    }).catch(() => {
      setLoaded(true);
      setLoading(false);
    });
  });
  useFocus(() => {
    if (focusUpdate) {
      getUseChatGPTUserInfo().then((userInfo2) => {
        setUserInfo(userInfo2);
      });
    }
  });
  const isLogin = (0, import_react3.useMemo)(() => !!userInfo, [userInfo]);
  const currentUserPlan = (0, import_react3.useMemo)(
    () => userInfo ? parseUserPlan(userInfo) : "free",
    [userInfo]
  );
  return {
    isLogin,
    userInfo,
    loaded,
    loading,
    currentUserPlan
  };
};

// src/features/auth/hooks/useAuth.tsx
var AUTH_MODAL_EVENT = "AUTH_MODAL_CALLBACK";
var port = new ContentScriptConnectionV2({
  runtime: "client"
});
var useAuth = () => {
  const { isLogin, userInfo } = useUserProfile();
  const [authParams, setAuthParams] = Recoil_index_22(AuthParamsState);
  const setAuthModal = Recoil_index_24(AuthModalShowState);
  const waitAuthModalPromise = (0, import_react4.useCallback)(
    (params, options) => {
      const { resolveWithClose = false, timeout } = options || {};
      return promiseTimeout(
        new Promise((resolve) => {
          if (isLogin && userInfo) {
            resolve({ isLogin, userInfo });
            return;
          }
          const authModalCallbackListener = (e) => {
            const { isLogin: isLogin2, userInfo: userInfo2, reason } = e.detail;
            if (resolveWithClose && reason === "close") {
              resolve({ isLogin: isLogin2, userInfo: userInfo2 });
            } else if (reason === "auth") {
              resolve({ isLogin: isLogin2, userInfo: userInfo2 });
            }
            window.removeEventListener(
              AUTH_MODAL_EVENT,
              authModalCallbackListener
            );
          };
          window.addEventListener(AUTH_MODAL_EVENT, authModalCallbackListener);
          setAuthParams(params);
          setAuthModal(true);
        }),
        // 默认 5 分钟超时
        timeout != null ? timeout : 1e3 * 60 * 5,
        {
          isLogin: false
        }
      );
    },
    [isLogin, userInfo]
  );
  const syncAppAuthStatusPromise = (0, import_react4.useCallback)(async () => {
    if (isLogin && userInfo) {
      return { isLogin, userInfo };
    }
    const { ref } = authParams;
    await port.postMessage({
      event: "Client_openAuthClientTab",
      data: {
        ref: ref || "webchatgpt-search-with-free-ai"
      }
    });
    return new Promise(async (resolve) => {
      const listener = async (msg) => {
        const { event, data } = msg;
        if ((msg == null ? void 0 : msg.id) && msg.id !== CHROME_EXTENSION_POST_MESSAGE_ID) {
          return;
        }
        switch (event) {
          case "Client_authDone":
            {
              const { data: authInfo } = data;
              import_webextension_polyfill.default.runtime.onMessage.removeListener(listener);
              resolve({
                isLogin: !!authInfo.userInfo,
                userInfo: authInfo.userInfo
              });
              return {
                success: true,
                data: {},
                message: "ok"
              };
            }
            break;
        }
        return void 0;
      };
      import_webextension_polyfill.default.runtime.onMessage.addListener(listener);
    });
  }, [authParams, isLogin, userInfo]);
  return {
    syncAppAuthStatusPromise,
    waitAuthModalPromise
  };
};
var useAuth_default = useAuth;

// src/features/auth/components/PermissionWrapper/index.tsx
var import_react7 = __toESM(require_react());

// src/components/LazyloadImage.tsx
var import_react5 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var LazyLoadImage = (props) => {
  const { src, alt, width, height, skeletonHeight } = props;
  const [loaded, setLoaded] = import_react5.default.useState(false);
  const [, setError] = import_react5.default.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src,
        alt,
        width: loaded ? width : 0,
        height: loaded ? height : 0,
        onLoad: () => {
          setLoaded(true);
        },
        onError: () => {
          setLoaded(true);
          setError(true);
        }
      }
    ),
    !loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Skeleton_default,
      {
        variant: "rounded",
        height: skeletonHeight || height,
        width: width || "100%"
      }
    )
  ] });
};
var LazyloadImage_default = LazyLoadImage;

// src/features/auth/hooks/usePermissionCard.ts
var import_react6 = __toESM(require_react());
var usePermissionCard = (sceneType) => {
  return (0, import_react6.useMemo)(() => {
    const settings = getPermissionCardSettingsBySceneType(sceneType);
    const permissionCard = {
      title: settings.title,
      description: settings.description,
      ctaButtonText: settings.ctaButtonText,
      ctaButtonLink: settings.ctaButtonLink,
      ctaButtonOnClick: settings.ctaButtonOnClick,
      imageUrl: settings.imageUrl,
      videoUrl: settings.videoUrl,
      sceneType
    };
    return permissionCard;
  }, [sceneType]);
};

// src/features/auth/components/PermissionWrapper/index.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var MAXAI_PERMISSION_WRAPPER_TOGGLE_EVENT = "MAXAI_PERMISSION_WRAPPER_TOGGLE_EVENT";
var MAXAI_PERMISSION_WRAPPER_CUSTOM_EVENT = "MAXAI_PERMISSION_WRAPPER_CUSTOM_EVENT";
var PermissionWrapper = (props) => {
  const {
    sceneType,
    allowedRoles,
    mountContainerName,
    onPermission,
    BoxProps: BoxProps2,
    TooltipProps: TooltipProps2,
    children,
    id,
    preAuth
  } = props;
  const permissionCard = usePermissionCard(sceneType);
  const [modifyPermissionCard, setModifyPermissionCard] = (0, import_react7.useState)(void 0);
  const memoizedPermissionCard = (0, import_react7.useMemo)(() => {
    if (modifyPermissionCard) {
      return modifyPermissionCard;
    }
    return permissionCard;
  }, [permissionCard, modifyPermissionCard]);
  const { currentUserPlan, userInfo, isLogin } = useUserProfile();
  const [open, setOpen] = (0, import_react7.useState)(false);
  const idRef = (0, import_react7.useRef)(id != null ? id : v4_default());
  (0, import_react7.useEffect)(() => {
    const listener = (event) => {
      if (event.detail.id === idRef.current)
        return;
      setOpen(event.detail.open);
    };
    window.addEventListener(MAXAI_PERMISSION_WRAPPER_CUSTOM_EVENT, listener);
    return () => {
      window.removeEventListener(
        MAXAI_PERMISSION_WRAPPER_CUSTOM_EVENT,
        listener
      );
    };
  }, []);
  (0, import_react7.useEffect)(() => {
    const listener = (event) => {
      if (event.detail.id === idRef.current) {
        setOpen(event.detail.open);
      }
    };
    window.addEventListener(MAXAI_PERMISSION_WRAPPER_TOGGLE_EVENT, listener);
    return () => {
      window.removeEventListener(
        MAXAI_PERMISSION_WRAPPER_TOGGLE_EVENT,
        listener
      );
    };
  }, []);
  const hasPermissionMemo = (0, import_react7.useMemo)(() => {
    if (allowedRoles.find((permission) => permission === currentUserPlan)) {
      return true;
    }
    return false;
  }, [currentUserPlan, allowedRoles]);
  const preCheckLogin = (0, import_react7.useCallback)(async () => {
    if (userInfo && isLogin) {
      return parseUserPlan(userInfo);
    }
    if (!isLogin && preAuth) {
      const newUserInfo = await preAuth();
      if (newUserInfo) {
        const newUserRole = parseUserPlan(newUserInfo);
        return newUserRole;
      }
    }
    return null;
  }, [isLogin, preAuth, userInfo]);
  const popperContainer = (0, import_react7.useMemo)(() => {
    if (mountContainerName) {
      return Array.isArray(mountContainerName) ? queryShadowContainerElementSelector(
        mountContainerName[0],
        mountContainerName[1]
      ) : getAppRoot(mountContainerName);
    }
    return document.body;
  }, [mountContainerName]);
  if (hasPermissionMemo) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Tooltip_default,
    {
      arrow: true,
      open,
      PopperProps: {
        container: popperContainer,
        sx: {
          "& > div": {
            maxWidth: 320,
            p: 1
          }
        }
      },
      title: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_ClickAwayListener.default,
        {
          mouseEvent: "onMouseDown",
          onClickAway: () => {
            setOpen(false);
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            Stack_default,
            {
              spacing: 1,
              component: "div",
              onClick: (e) => {
                e.stopPropagation();
              },
              children: [
                memoizedPermissionCard.videoUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  YoutubePlayerBox_default,
                  {
                    borderRadius: 4,
                    youtubeLink: memoizedPermissionCard.videoUrl
                  }
                ),
                !memoizedPermissionCard.videoUrl && memoizedPermissionCard.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  Box_default,
                  {
                    sx: {
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                      overflow: "hidden",
                      "& img": {
                        width: "100%",
                        height: "auto"
                      }
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      LazyloadImage_default,
                      {
                        height: 140,
                        src: memoizedPermissionCard.imageUrl,
                        alt: `${memoizedPermissionCard.title} img`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  Typography_default,
                  {
                    variant: "custom",
                    fontSize: "16px",
                    fontWeight: 600,
                    textAlign: "left",
                    color: "rgba(255,255,255,.87)",
                    children: memoizedPermissionCard.title
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  Typography_default,
                  {
                    variant: "custom",
                    fontSize: "14px",
                    fontWeight: 400,
                    textAlign: "left",
                    color: "rgba(255,255,255,.87)",
                    children: memoizedPermissionCard.description
                  }
                ),
                memoizedPermissionCard.ctaButtonText && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  Link_default,
                  {
                    target: "_blank",
                    href: memoizedPermissionCard.ctaButtonLink,
                    onClick: (event) => {
                      var _a;
                      event.preventDefault();
                      window.open(memoizedPermissionCard.ctaButtonLink, "_blank");
                      (_a = memoizedPermissionCard.ctaButtonOnClick) == null ? void 0 : _a.call(memoizedPermissionCard, event);
                      setOpen(false);
                      authEmitPricingHooksLog("click", permissionCard.sceneType);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button_default, { fullWidth: true, variant: "contained", children: memoizedPermissionCard.ctaButtonText })
                  }
                )
              ]
            }
          )
        }
      ),
      ...TooltipProps2,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Box_default, { ...BoxProps2, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Box_default, { children: import_react7.default.Children.map(children, (child) => {
        if (import_react7.default.isValidElement(child)) {
          const newProps = {
            ...child.props,
            ...child.props.onClick && {
              onClick: async (event, ...args) => {
                var _a, _b, _c, _d, _e, _f;
                let isAuth = false;
                (_a = event == null ? void 0 : event.stopPropagation) == null ? void 0 : _a.call(event);
                (_b = event == null ? void 0 : event.preventDefault) == null ? void 0 : _b.call(event);
                const preCheckResponseRole = await preCheckLogin();
                if (allowedRoles.includes(
                  preCheckResponseRole || currentUserPlan
                )) {
                  (_d = (_c = child.props) == null ? void 0 : _c.onClick) == null ? void 0 : _d.call(_c, event, ...args);
                  return;
                }
                if (onPermission) {
                  const { success, cardSettings } = await onPermission(
                    preCheckResponseRole || currentUserPlan,
                    permissionCard,
                    [event, ...args]
                  );
                  setModifyPermissionCard({
                    ...permissionCard,
                    ...cardSettings
                  });
                  isAuth = success;
                }
                const customEvent = new CustomEvent(
                  MAXAI_PERMISSION_WRAPPER_CUSTOM_EVENT,
                  {
                    detail: {
                      id: idRef.current,
                      open: false
                    }
                  }
                );
                window.dispatchEvent(customEvent);
                setOpen(!isAuth);
                if (isAuth) {
                  (_f = (_e = child.props) == null ? void 0 : _e.onClick) == null ? void 0 : _f.call(_e, event, ...args);
                } else {
                  authEmitPricingHooksLog(
                    "show",
                    permissionCard.sceneType
                  );
                }
              }
            },
            ...child.props.onChange && {
              onChange: async (event, ...args) => {
                var _a, _b, _c, _d, _e, _f;
                let isAuth = false;
                (_a = event == null ? void 0 : event.stopPropagation) == null ? void 0 : _a.call(event);
                (_b = event == null ? void 0 : event.preventDefault) == null ? void 0 : _b.call(event);
                const preCheckResponseRole = await preCheckLogin();
                if (allowedRoles.includes(
                  preCheckResponseRole || currentUserPlan
                )) {
                  (_d = (_c = child.props) == null ? void 0 : _c.onChange) == null ? void 0 : _d.call(_c, event, ...args);
                  return;
                }
                if (onPermission) {
                  const { success, cardSettings } = await onPermission(
                    preCheckResponseRole || currentUserPlan,
                    permissionCard,
                    [event, ...args]
                  );
                  setModifyPermissionCard({
                    ...permissionCard,
                    ...cardSettings
                  });
                  isAuth = success;
                }
                const customEvent = new CustomEvent(
                  MAXAI_PERMISSION_WRAPPER_CUSTOM_EVENT,
                  {
                    detail: {
                      id: idRef.current,
                      open: false
                    }
                  }
                );
                window.dispatchEvent(customEvent);
                setOpen(!isAuth);
                if (isAuth) {
                  (_f = (_e = child.props) == null ? void 0 : _e.onChange) == null ? void 0 : _f.call(_e, event, ...args);
                } else {
                  authEmitPricingHooksLog(
                    "show",
                    permissionCard.sceneType
                  );
                }
              }
            }
          };
          return import_react7.default.cloneElement(child, newProps);
        }
        return child;
      }) }) })
    }
  );
};
var PermissionWrapper_default = PermissionWrapper;

export {
  TOOLBAR_SHADOW_ROOT_ID,
  SLASH_COMMANDS_MENU_ROOT_ID,
  DEFAULT_PROMPT_LIST_TYPE,
  NEED_AUTH_PROMPT_LIST_TYPE,
  DEFAULT_PROMPT_AUTHOR,
  DEFAULT_PROMPT_AUTHOR_LINK,
  PROMPT_COLORS,
  PROMPT_APP_SHADOW_ROOT_ID,
  PROMPT_APP_WRAPPER_ID,
  PROMPT_RUNNER_SHADOW_ROOT_ID,
  PROMPT_RUNNER_WRAPPER_ID,
  PROMPT_AUTH_REF,
  DEFAULT_PROMPT_VARIABLE,
  VARIABLE_TYPE_LABEL_MAP,
  getAppRoot,
  getPossibleElementByQuerySelector,
  createShadowRoot,
  insertAfter,
  AuthModalShowState,
  useEffectOnce_default,
  useUserProfile,
  AUTH_MODAL_EVENT,
  useAuth_default,
  PermissionWrapper_default
};
