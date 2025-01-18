var kl = Object.defineProperty;
var Ul = (e, t, r) => t in e ? kl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var de = (e, t, r) => (Ul(e, typeof t != "symbol" ? t + "" : t, r), r);
var Ai = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, yo = {}, _l = {
  get exports() {
    return yo;
  },
  set exports(e) {
    yo = e;
  }
};
(function(e, t) {
  (function(r, n) {
    n(e);
  })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Ai, function(r) {
    var n, o;
    if (!((o = (n = globalThis.chrome) == null ? void 0 : n.runtime) != null && o.id))
      throw new Error("This script should only be loaded in a browser extension.");
    if (typeof globalThis.browser > "u" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
      const a = "The message port closed before a response was received.", s = (i) => {
        const c = {
          alarms: {
            clear: {
              minArgs: 0,
              maxArgs: 1
            },
            clearAll: {
              minArgs: 0,
              maxArgs: 0
            },
            get: {
              minArgs: 0,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          bookmarks: {
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getChildren: {
              minArgs: 1,
              maxArgs: 1
            },
            getRecent: {
              minArgs: 1,
              maxArgs: 1
            },
            getSubTree: {
              minArgs: 1,
              maxArgs: 1
            },
            getTree: {
              minArgs: 0,
              maxArgs: 0
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeTree: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          browserAction: {
            disable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            enable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            getBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1
            },
            getBadgeText: {
              minArgs: 1,
              maxArgs: 1
            },
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            openPopup: {
              minArgs: 0,
              maxArgs: 0
            },
            setBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setBadgeText: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          browsingData: {
            remove: {
              minArgs: 2,
              maxArgs: 2
            },
            removeCache: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCookies: {
              minArgs: 1,
              maxArgs: 1
            },
            removeDownloads: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFormData: {
              minArgs: 1,
              maxArgs: 1
            },
            removeHistory: {
              minArgs: 1,
              maxArgs: 1
            },
            removeLocalStorage: {
              minArgs: 1,
              maxArgs: 1
            },
            removePasswords: {
              minArgs: 1,
              maxArgs: 1
            },
            removePluginData: {
              minArgs: 1,
              maxArgs: 1
            },
            settings: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          commands: {
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          contextMenus: {
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeAll: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          cookies: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 1,
              maxArgs: 1
            },
            getAllCookieStores: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          devtools: {
            inspectedWindow: {
              eval: {
                minArgs: 1,
                maxArgs: 2,
                singleCallbackArg: !1
              }
            },
            panels: {
              create: {
                minArgs: 3,
                maxArgs: 3,
                singleCallbackArg: !0
              },
              elements: {
                createSidebarPane: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            }
          },
          downloads: {
            cancel: {
              minArgs: 1,
              maxArgs: 1
            },
            download: {
              minArgs: 1,
              maxArgs: 1
            },
            erase: {
              minArgs: 1,
              maxArgs: 1
            },
            getFileIcon: {
              minArgs: 1,
              maxArgs: 2
            },
            open: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            pause: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFile: {
              minArgs: 1,
              maxArgs: 1
            },
            resume: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          extension: {
            isAllowedFileSchemeAccess: {
              minArgs: 0,
              maxArgs: 0
            },
            isAllowedIncognitoAccess: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          history: {
            addUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteAll: {
              minArgs: 0,
              maxArgs: 0
            },
            deleteRange: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            getVisits: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          i18n: {
            detectLanguage: {
              minArgs: 1,
              maxArgs: 1
            },
            getAcceptLanguages: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          identity: {
            launchWebAuthFlow: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          idle: {
            queryState: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          management: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getSelf: {
              minArgs: 0,
              maxArgs: 0
            },
            setEnabled: {
              minArgs: 2,
              maxArgs: 2
            },
            uninstallSelf: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          notifications: {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            create: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getPermissionLevel: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          pageAction: {
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            hide: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          permissions: {
            contains: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            request: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          runtime: {
            getBackgroundPage: {
              minArgs: 0,
              maxArgs: 0
            },
            getPlatformInfo: {
              minArgs: 0,
              maxArgs: 0
            },
            openOptionsPage: {
              minArgs: 0,
              maxArgs: 0
            },
            requestUpdateCheck: {
              minArgs: 0,
              maxArgs: 0
            },
            sendMessage: {
              minArgs: 1,
              maxArgs: 3
            },
            sendNativeMessage: {
              minArgs: 2,
              maxArgs: 2
            },
            setUninstallURL: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          sessions: {
            getDevices: {
              minArgs: 0,
              maxArgs: 1
            },
            getRecentlyClosed: {
              minArgs: 0,
              maxArgs: 1
            },
            restore: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          storage: {
            local: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            managed: {
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            sync: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            }
          },
          tabs: {
            captureVisibleTab: {
              minArgs: 0,
              maxArgs: 2
            },
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            detectLanguage: {
              minArgs: 0,
              maxArgs: 1
            },
            discard: {
              minArgs: 0,
              maxArgs: 1
            },
            duplicate: {
              minArgs: 1,
              maxArgs: 1
            },
            executeScript: {
              minArgs: 1,
              maxArgs: 2
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 0
            },
            getZoom: {
              minArgs: 0,
              maxArgs: 1
            },
            getZoomSettings: {
              minArgs: 0,
              maxArgs: 1
            },
            goBack: {
              minArgs: 0,
              maxArgs: 1
            },
            goForward: {
              minArgs: 0,
              maxArgs: 1
            },
            highlight: {
              minArgs: 1,
              maxArgs: 1
            },
            insertCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            query: {
              minArgs: 1,
              maxArgs: 1
            },
            reload: {
              minArgs: 0,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            sendMessage: {
              minArgs: 2,
              maxArgs: 3
            },
            setZoom: {
              minArgs: 1,
              maxArgs: 2
            },
            setZoomSettings: {
              minArgs: 1,
              maxArgs: 2
            },
            update: {
              minArgs: 1,
              maxArgs: 2
            }
          },
          topSites: {
            get: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          webNavigation: {
            getAllFrames: {
              minArgs: 1,
              maxArgs: 1
            },
            getFrame: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          webRequest: {
            handlerBehaviorChanged: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          windows: {
            create: {
              minArgs: 0,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 1
            },
            getLastFocused: {
              minArgs: 0,
              maxArgs: 1
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          }
        };
        if (Object.keys(c).length === 0)
          throw new Error("api-metadata.json has not been included in browser-polyfill");
        class u extends WeakMap {
          constructor(h, x = void 0) {
            super(x), this.createItem = h;
          }
          get(h) {
            return this.has(h) || this.set(h, this.createItem(h)), super.get(h);
          }
        }
        const l = (A) => A && typeof A == "object" && typeof A.then == "function", g = (A, h) => (...x) => {
          i.runtime.lastError ? A.reject(new Error(i.runtime.lastError.message)) : h.singleCallbackArg || x.length <= 1 && h.singleCallbackArg !== !1 ? A.resolve(x[0]) : A.resolve(x);
        }, m = (A) => A == 1 ? "argument" : "arguments", I = (A, h) => function(y, ...v) {
          if (v.length < h.minArgs)
            throw new Error(`Expected at least ${h.minArgs} ${m(h.minArgs)} for ${A}(), got ${v.length}`);
          if (v.length > h.maxArgs)
            throw new Error(`Expected at most ${h.maxArgs} ${m(h.maxArgs)} for ${A}(), got ${v.length}`);
          return new Promise((D, k) => {
            if (h.fallbackToNoCallback)
              try {
                y[A](...v, g({
                  resolve: D,
                  reject: k
                }, h));
              } catch (j) {
                console.warn(`${A} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, j), y[A](...v), h.fallbackToNoCallback = !1, h.noCallback = !0, D();
              }
            else
              h.noCallback ? (y[A](...v), D()) : y[A](...v, g({
                resolve: D,
                reject: k
              }, h));
          });
        }, C = (A, h, x) => new Proxy(h, {
          apply(y, v, D) {
            return x.call(v, A, ...D);
          }
        });
        let p = Function.call.bind(Object.prototype.hasOwnProperty);
        const L = (A, h = {}, x = {}) => {
          let y = /* @__PURE__ */ Object.create(null), v = {
            has(k, j) {
              return j in A || j in y;
            },
            get(k, j, H) {
              if (j in y)
                return y[j];
              if (!(j in A))
                return;
              let R = A[j];
              if (typeof R == "function")
                if (typeof h[j] == "function")
                  R = C(A, A[j], h[j]);
                else if (p(x, j)) {
                  let Z = I(j, x[j]);
                  R = C(A, A[j], Z);
                } else
                  R = R.bind(A);
              else if (typeof R == "object" && R !== null && (p(h, j) || p(x, j)))
                R = L(R, h[j], x[j]);
              else if (p(x, "*"))
                R = L(R, h[j], x["*"]);
              else
                return Object.defineProperty(y, j, {
                  configurable: !0,
                  enumerable: !0,
                  get() {
                    return A[j];
                  },
                  set(Z) {
                    A[j] = Z;
                  }
                }), R;
              return y[j] = R, R;
            },
            set(k, j, H, R) {
              return j in y ? y[j] = H : A[j] = H, !0;
            },
            defineProperty(k, j, H) {
              return Reflect.defineProperty(y, j, H);
            },
            deleteProperty(k, j) {
              return Reflect.deleteProperty(y, j);
            }
          }, D = Object.create(A);
          return new Proxy(D, v);
        }, B = (A) => ({
          addListener(h, x, ...y) {
            h.addListener(A.get(x), ...y);
          },
          hasListener(h, x) {
            return h.hasListener(A.get(x));
          },
          removeListener(h, x) {
            h.removeListener(A.get(x));
          }
        }), V = new u((A) => typeof A != "function" ? A : function(x) {
          const y = L(
            x,
            {},
            {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            }
          );
          A(y);
        }), _ = new u((A) => typeof A != "function" ? A : function(x, y, v) {
          let D = !1, k, j = new Promise((ie) => {
            k = function(te) {
              D = !0, ie(te);
            };
          }), H;
          try {
            H = A(x, y, k);
          } catch (ie) {
            H = Promise.reject(ie);
          }
          const R = H !== !0 && l(H);
          if (H !== !0 && !R && !D)
            return !1;
          const Z = (ie) => {
            ie.then((te) => {
              v(te);
            }, (te) => {
              let ge;
              te && (te instanceof Error || typeof te.message == "string") ? ge = te.message : ge = "An unexpected error occurred", v({
                __mozWebExtensionPolyfillReject__: !0,
                message: ge
              });
            }).catch((te) => {
              console.error("Failed to send onMessage rejected reply", te);
            });
          };
          return Z(R ? H : j), !0;
        }), q = ({
          reject: A,
          resolve: h
        }, x) => {
          i.runtime.lastError ? i.runtime.lastError.message === a ? h() : A(new Error(i.runtime.lastError.message)) : x && x.__mozWebExtensionPolyfillReject__ ? A(new Error(x.message)) : h(x);
        }, G = (A, h, x, ...y) => {
          if (y.length < h.minArgs)
            throw new Error(`Expected at least ${h.minArgs} ${m(h.minArgs)} for ${A}(), got ${y.length}`);
          if (y.length > h.maxArgs)
            throw new Error(`Expected at most ${h.maxArgs} ${m(h.maxArgs)} for ${A}(), got ${y.length}`);
          return new Promise((v, D) => {
            const k = q.bind(null, {
              resolve: v,
              reject: D
            });
            y.push(k), x.sendMessage(...y);
          });
        }, F = {
          devtools: {
            network: {
              onRequestFinished: B(V)
            }
          },
          runtime: {
            onMessage: B(_),
            onMessageExternal: B(_),
            sendMessage: G.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: G.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        }, W = {
          clear: {
            minArgs: 1,
            maxArgs: 1
          },
          get: {
            minArgs: 1,
            maxArgs: 1
          },
          set: {
            minArgs: 1,
            maxArgs: 1
          }
        };
        return c.privacy = {
          network: {
            "*": W
          },
          services: {
            "*": W
          },
          websites: {
            "*": W
          }
        }, L(i, F, c);
      };
      r.exports = s(chrome);
    } else
      r.exports = globalThis.browser;
  });
})(_l);
const xo = yo;
function Fl() {
  return chrome !== void 0 ? chrome.runtime.getManifest().manifest_version === 3 ? chrome : xo : E !== void 0 ? E : xo;
}
const To = navigator.userAgent.includes("Firefox"), E = Fl(), $o = () => E.runtime.getManifest();
var pi = /* @__PURE__ */ ((e) => (e[e.QUANTIDADE_TOTAL_TAREFA = 1] = "QUANTIDADE_TOTAL_TAREFA", e[e.PARALIZADOS_ENTRADA_TAREFA = 2] = "PARALIZADOS_ENTRADA_TAREFA", e[e.PARALIZADOS_ULTIMO_MOVIMENTO = 3] = "PARALIZADOS_ULTIMO_MOVIMENTO", e))(pi || {}), Ii = /* @__PURE__ */ ((e) => (e.PADRAO = "mc_formato_padrao", e.MINIMO = "mc_formato_minimo", e))(Ii || {}), hi = /* @__PURE__ */ ((e) => (e[e.NAO_ATIVADO = 0] = "NAO_ATIVADO", e[e.DESMONTADO = 1] = "DESMONTADO", e[e.COMPLETAMENTE_MONTADO = 2] = "COMPLETAMENTE_MONTADO", e[e.REQUISITANDO_E_PROCESSANDO_DADOS = 3] = "REQUISITANDO_E_PROCESSANDO_DADOS", e))(hi || {}), Ye = /* @__PURE__ */ ((e) => (e.PADRAO = "padrao", e.ESCURO = "escuro", e.AJUSTES_GERAIS = "ajustes_gerais", e.ALTO_CONTRASTE = "altoContraste", e.MAIS_ESPACO = "mais_espaco", e))(Ye || {}), It = /* @__PURE__ */ ((e) => (e.NORMAL = "normal", e.ALTERNAR_LINHAS = "alternar_linhas", e.MINIMO = "minimo", e))(It || {});
const Fa = {
  ativada: !0,
  carregadaPJE: !1,
  autosAbaMovimentos: !1,
  autosAbaFases: !1,
  autosAjustaDataHora: !1,
  copiarDadosDaPeca: "sem_descricao",
  copiaDadosPecaAtivado: !1,
  tema: "padrao",
  incluirLotacaoNoTitulo: !0,
  ajustesGerais: !1,
  maisEspaco: !1,
  avisoDuplicacaoEtiquetas: !1,
  destacarLembretes: !0,
  selecionarLotacao: !0,
  pularquadroavisos: !0,
  pularpaginavazia: !0,
  dataQuadroAviso: "",
  totalTarefas: !0,
  inativaCartao: !1,
  cartaoProcesso: "normal",
  opcoesCopiarDadosPolo: "nome",
  opcoesPaletaCores: "completo",
  ajustarUsuarioMinuta: !0,
  minutaCentralizada: !1,
  removerAvisoAtencao: !0,
  ajustarUrgenciaSigilo: !0,
  ajustarPrazoIntimacao: !0,
  ajustarCaixaMovimentos: !0,
  homologadorMovimentos: !0,
  ultimalotacaoacessada: 0,
  filtros: {
    perfilAtivo: "direcao",
    perfis: {
      vara_mista: {
        nome: "Vara Mista",
        setores: {
          "[Civ]": ["[Civ]"],
          "[Crim]": ["[Crim]"],
          "[EF]": ["[EF]"],
          "[JEF]": ["[JEF]"],
          "[PInvest]": ["[PInvest]"]
        }
      },
      direcao: {
        nome: "Direção",
        setores: {
          GAB: [
            "Minutar Decisão - Gabinete",
            "Minutar Despacho - Gabinete",
            "Minutar informação",
            "Minutar Sentença - Gabinete",
            "Revisar Decisão - Gabinete",
            "Revisar Despacho - Gabinete",
            "Revisar Sentença - Gabinete"
          ],
          SEINP: [
            "Assinar comunicação via Sistema ou DJe",
            "Aguardando devolução de AR",
            "Aguardando ato judicial de órgão julgador diverso",
            "Aguardando devolução de Carta Precatória",
            "Aguardando devolução de Carta Rogatória",
            "Aguardando devolução de mandado",
            "Aguardando publicação de Edital no DJe",
            "Aguardando remessa de Carta aos Correios",
            "Aguardando remessa de Carta Precatória",
            "Aguardando remessa de Carta Rogatória",
            "Aguardando remessa de expediente aos Correios",
            "Assinar comunicação via Telefone ou Balcão",
            "Avaliar ato judicial proferido",
            "Avaliar ato judicial URGENTE proferido",
            "Avaliar ato ordinatório praticado",
            "Avaliar certidão expedida",
            "Avaliar informação proferida",
            "Concluir publicação de Edital no DJe",
            "Concluir publicação no DJe",
            "Encerrar prazos em aberto",
            "Escolher expediente padrão e prazo",
            "Escolher rotina de comunicações e outros expedientes",
            "Lançar movimentação não registrada",
            "Preparar comunicação por outros meios",
            "Preparar comunicação via Carta Precatória",
            "Preparar comunicação via Carta Rogatória",
            "Preparar comunicação via Ceman local",
            "Preparar comunicação via Correios",
            "Preparar comunicação via Edital",
            "Preparar comunicação via Sistema ou DJe",
            "Preparar comunicação via Telefone ou Balcão",
            "Preparar comunicações - rotina individual",
            "Preparar comunicações e outros expedientes - rotina em lote",
            "Recebidos da Central de Perícias",
            "Selecionar Central de Mandado",
            "Aguardando prazo manual"
          ],
          SEPOD: [
            "Aguardando elaboração de parecer ou cálculos na própria Vara",
            "Aguardando prazo automático - Analisar petição",
            "Aguardando prazo manual - Analisar petição",
            "Analisar petição",
            "Análise de secretaria",
            "Arquivados - Analisar petição",
            "Avaliar Carta Precatória sem cumprimento ou devolução",
            "Avaliar carta sem cumprimento ou devolução",
            "Avaliar mandado devolvido",
            "Avaliar mandado sem cumprimento",
            "Avaliar parecer ou cálculos do serventuário",
            "Certificar decurso de prazo anterior ao arquivamento",
            "Classificar sobrestados por decisão de Instância ou Tribunal Superior",
            "Definir prazo e tipo de sobrestamento",
            "Definir tipo de arquivamento",
            "Evoluir de classe judicial",
            "Recebidos da Conciliação",
            "Recebidos da Contadoria",
            "Recebidos da rotina de comunicações e outros expedientes",
            "Recebidos da Turma Recursal",
            "Recebidos do arquivo",
            "Recebidos do sobrestamento",
            "Redistribuir processo",
            "Remeter à Turma Recursal",
            "Selecionar órgão julgador de destino",
            "Sobrestados - Analisar petição",
            "Sobrestados para aguardar julgamento de outra causa ou recurso",
            "Sobrestados para cumprimento de transação penal",
            "Sobrestados por arguição de impedimento ou de suspeição",
            "Sobrestados por conflito de competência",
            "Sobrestados por convenção das partes",
            "Sobrestados por decisão do Presidente do STF - IRDR",
            "Sobrestados por incidente de insanidade mental",
            "Sobrestados por IRDR (TRF)",
            "Sobrestados por morte de parte ou procurador",
            "Sobrestados por outros motivos",
            "Sobrestados por RE com repercussão geral",
            "Sobrestados por RESP repetitivo",
            "Sobrestados por suspensão condicional do processo",
            "Solucionar impedimentos à remessa à Turma Recursal",
            "Solucionar impedimentos ao arquivamento",
            "Verificar impedimentos à redistribuição"
          ],
          SEAJP: [
            "Agendar e administrar audiência cível",
            "Aguardando audiência cível",
            "Aguardando audiência cível - Analisar petição",
            "Aguardando audiência de conciliação",
            "Alterar cargo de juiz atribuído ao processo",
            "Anexar ata de audiência cível e audiovisual",
            "Anexar ata de audiência criminal e audiovisual",
            "Anexar audiovisual da audiência cível",
            "Anexar audiovisual da audiência criminal",
            "Audiências cíveis do dia",
            "Audiências de conciliação do dia",
            "Informar dados da audiência - Conciliação",
            "Informar dados da audiência cível",
            "Minutar ata de audiência cível",
            "Minutar ata de audiência de conciliação",
            "Minutar ou anexar ata de audiência sem assinatura do Magistrado",
            "Prevenção - Analisar e Minutar ato",
            "Processos reclassificados",
            "Recebidos da audiência cível",
            "Triagem inicial",
            "Triagem inicial URGENTES"
          ],
          SESUD: [
            "Aguardando depósito ou negativa de precatório",
            "Aguardando depósito ou negativa de RPV",
            "Aguardando expedição e juntada de precatório",
            "Aguardando expedição e juntada de RPV",
            "Aguardando impressão de alvará",
            "Aguardando migração de precatório",
            "Aguardando migração de RPV",
            "Aguardando prazo - Avaliar manifestação - Precatório",
            "Aguardando prazo - Avaliar manifestação - RPV",
            "Aguardando prazo - Precatório",
            "Aguardando prazo - RPV",
            "Preparar alvará",
            "Preparar precatório",
            "Preparar RPV",
            "Recebidos da rotina de requisição de pagamento"
          ]
        }
      },
      minhas_tarefas: {
        nome: "Minhas Tarefas",
        setores: { Exemplo: ["Exemplo de tarefa 1"] }
      },
      turma_recursal: {
        nome: "Turma Recursal",
        setores: {
          Secretaria: [
            "[TR]  Aguardando devolução de AR",
            "[TR] Aguardando expedição de mandado",
            "[TR] Aguardando impressão de alvará",
            "[TR] Aguardando julgamento pela Turma Nacional",
            "[TR] Aguardando julgamento pela Turma Regional",
            "[TR] Aguardando prazo automático",
            "[TR] Aguardando prazo automático - Analisar petição",
            "[TR] Aguardando prazo manual",
            "[TR] Aguardando prazo manual - Analisar petição",
            "[TR] Aguardando publicação de Edital no DJe",
            "[TR] Aguardando remessa de expediente aos Correios",
            "[TR] Alterar Classe para remessa à Turma Regional",
            "[TR] Análise de secretaria",
            "[TR] Arquivados - Analisar petição",
            "[TR] Arquivo permanente",
            "[TR] Arquivo provisório",
            "[TR] Assinar alvará",
            "[TR] Assinar ato ordinatório",
            "[TR] Assinar certidão",
            "[TR] Assinar certidão de decurso de prazo",
            "[TR] Assinar certidão de trânsito em julgado",
            "[TR] Assinar comunicação por outros meios",
            "[TR] Assinar comunicação via Ceman",
            "[TR] Assinar comunicação via Ceman - Magistrado",
            "[TR] Assinar comunicação via Correios",
            "[TR] Assinar comunicação via Edital",
            "[TR] Assinar comunicação via Sistema ou DJe",
            "[TR] Assinar comunicação via Telefone ou Balcão",
            "[TR] Assinar informação",
            "[TR] Avaliar acórdão proferido",
            "[TR] Avaliar Acórdão proferido - intimações pendentes",
            "[TR] Avaliar ato judicial proferido",
            "[TR] Avaliar ato judicial URGENTE proferido",
            "[TR] Avaliar ato ordinatório praticado",
            "[TR] Avaliar certidão expedida",
            "[TR] Avaliar informação proferida",
            "[TR] Avaliar mandado devolvido",
            "[TR] Certificar decurso de prazo anterior ao arquivamento",
            "[TR] Certificar trânsito em julgado",
            "[TR] Classificar sobrestados por decisão de Instância ou Tribunal Superior",
            "[TR] Concluir publicação de Edital no DJe",
            "[TR] Concluir publicação no DJe",
            "[TR] Conferir alvará",
            "[TR] Definir prazo e tipo de sobrestamento",
            "[TR] Definir tipo de arquivamento",
            "[TR] Encerrar prazos em aberto",
            "[TR] Escolher expediente padrão e prazo",
            "[TR] Escolher rotina de comunicações e outros expedientes",
            "[TR] Migração - Triagem",
            "[TR] Minutar ato ordinatório",
            "[TR] Minutar certidão",
            "[TR] Minutar certidão de decurso de prazo",
            "[TR] Minutar certidão de trânsito em julgado",
            "[TR] Minutar informação",
            "[TR] Preparar alvará",
            "[TR] Preparar comunicação por outros meios",
            "[TR] Preparar comunicação via Ceman",
            "[TR] Preparar comunicação via Correios",
            "[TR] Preparar comunicação via Edital",
            "[TR] Preparar comunicação via Sistema ou DJe",
            "[TR] Preparar comunicação via Telefone ou Balcão",
            "[TR] Preparar comunicações - rotina individual",
            "[TR] Preparar comunicações e outros expedientes - rotina em lote",
            "[TR] Processos baixados por cancelamento da distribuição",
            "[TR] Processos baixados por remessa a outro órgão",
            "[TR] Processos com a conclusão cancelada",
            "[TR] Processos remetidos ao Juizado Especial Federal",
            "[TR] Recebidos da Conciliação",
            "[TR] Recebidos da Contadoria",
            "[TR] Recebidos da rotina de comunicações e outros expedientes",
            "[TR] Recebidos da Turma Nacional",
            "[TR] Recebidos da Turma Regional",
            "[TR] Recebidos do arquivo",
            "[TR] Recebidos do sobrestamento",
            "[TR] Reclassificar tipo de documento",
            "[TR] Redistribuir processo",
            "[TR] Redistribuir processo ao TRF1",
            "[TR] Remeter a outro órgão julgador",
            "[TR] Remeter à Turma Nacional",
            "[TR] Remeter à Turma Regional",
            "[TR] Remeter ao Juizado Especial Federal",
            "[TR] Remetidos à Conciliação",
            "[TR] Remetidos à Contadoria",
            "[TR] Selecionar Central de Mandados",
            "[TR] Sobrestados - Analisar petição",
            "[TR] Sobrestados para aguardar julgamento de outra causa ou recurso",
            "[TR] Sobrestados para cumprimento de transação penal",
            "[TR] Sobrestados por arguição de impedimento ou de suspeição",
            "[TR] Sobrestados por conflito de competência",
            "[TR] Sobrestados por convenção das partes",
            "[TR] Sobrestados por decisão do Presidente do STF - IRDR",
            "[TR] Sobrestados por incidente de insanidade mental",
            "[TR] Sobrestados por IRDR (TRF)",
            "[TR] Sobrestados por morte de parte ou procurador",
            "[TR] Sobrestados por outros motivos",
            "[TR] Sobrestados por RE com repercussão geral",
            "[TR] Sobrestados por RESP repetitivo",
            "[TR] Sobrestados por suspensão condicional do processo",
            "[TR] Solucionar impedimentos à remessa à Turma Nacional",
            "[TR] Solucionar impedimentos ao arquivamento",
            "[TR] Trasladar documentos de outro processo",
            "[TR] Triagem inicial"
          ],
          Gabinete: [
            "[TR] Aguardando a sessão - Confirmar Voto Vista",
            "[TR] Aguardando a sessão - Encaminhados para o Gabinete Vista",
            "[TR] Aguardando a sessão - Preparar Voto Vista",
            "[TR] Aguardando a sessão - adiados",
            "[TR] Aguardando a sessão - incluídos em pauta",
            "[TR] Aguardando a sessão - incluídos em pauta - Voto Vista",
            "[TR] Aguardando a sessão - iniciada",
            "[TR] Aguardando a sessão - não incluídos em pauta",
            "[TR] Aguardando a sessão - não relator",
            "[TR] Aguardando a sessão - preparar voto vista",
            "[TR] Apreciar admissibilidade do Pedido de Uniformização",
            "[TR] Apreciar admissibilidade do RE",
            "[TR] Assinar Decisão",
            "[TR] Assinar Decisão - órgão julgador diverso",
            "[TR] Assinar Despacho",
            "[TR] Assinar Despacho - órgão julgador diverso",
            "[TR] Assinar ato sobre admissibilidade do Pedido de Uniformização",
            "[TR] Assinar ato sobre admissibilidade do RE",
            "[TR] Assinar inteiro teor",
            "[TR] Confirmar Voto Vista",
            "[TR] Confirmar Voto e encaminhar para Gabinete Vista",
            "[TR] Confirmar voto - não relator",
            "[TR] Confirmar voto vencido - relator",
            "[TR] Lançar movimentações processuais do julgamento",
            "[TR] Lançar movimentação não registrada",
            "[TR] Minutar Decisão",
            "[TR] Minutar Decisão - órgão julgador diverso",
            "[TR] Minutar Despacho",
            "[TR] Minutar Despacho - órgão julgador diverso",
            "[TR] Minutar voto - não relator",
            "[TR] Preparar Voto Vista",
            "[TR] Preparar relatório e voto",
            "[TR] Prevenção - Analisar e Minutar ato",
            "[TR] Prevenção - Assinar ato",
            "[TR] Revisar Decisão",
            "[TR] Revisar Decisão - órgão julgador diverso",
            "[TR] Revisar Despacho",
            "[TR] Revisar Despacho - órgão julgador diverso",
            "[TR] Revisar ato sobre admissibilidade do Pedido de Uniformização",
            "[TR] Revisar ato sobre admissibilidade do RE",
            "[TR] Triagem - Gabinete de Turma Recursal",
            "[TR] Triagem - Gabinete do Presidente de Turma Recursal",
            "[TR] Triagem inicial - órgão julgador diverso",
            "[TR] Votar antecipadamente - não relator"
          ]
        }
      }
    }
  },
  filtrostarefas: !0,
  inverterOrdemDownload: !1,
  etiquetasMaisUsadas: {
    valores: [
      {
        nome: "",
        tarefa: ""
      }
    ]
  },
  linksUlteisMultante: {
    enderecoPje: {
      site: "",
      vezes: 0
    },
    enderecoSei: {
      site: "",
      vezes: 0
    }
  },
  painelBaixaTarefas: !1,
  etiquetasColoridas: !0,
  coresEtiquetasColoridas: {},
  integracaoAJG: !1,
  tagsAutosDigitais: !0,
  etiquetaFavoritaMinhasTarefas: !0,
  abrirLinkMenuNoAppup: !1,
  esconderBarraLateralPainelTarefas: !0,
  painelOficialJustica: !1,
  sisbajud: !1,
  gestorDeModelos: !1,
  ultimasEtiquetasUsadaTarefa: !0,
  autorizarLogEmProducao: !1,
  copiarDadosPolo: !0,
  automacaoProcessos: !0,
  telaVisivel: !1,
  gerenciadorEtiquetas: !0,
  contarSelecaoProcessos: !0,
  multivisualizador: !1,
  gerarSinopseRelatoria: !1,
  adicionarEtiquetasAutos: !0,
  linksUltimasTarefas: !1,
  melhorarCartaoTarefa: !0,
  melhorarCartaoTarefaOpcoesAuxiliares: {
    flagDeLimiteVermelho: 30,
    flagDeLimiteAmarelo: 20,
    flagDeLimiteVerde: 15,
    destacarNumeroProcesso: !0,
    modificarCorPadraoEtiqueta: !1,
    copiarNumeroProcesso: !0,
    melhorarDestaquePrioridade: !0,
    recolherdorCartao: !0,
    melhorarDestaqueCartaoSelecionado: !0,
    contarDiasConclusao: !0
  },
  melhorarCartaoTarefaCartoesRecolhidosPersistencia: [],
  atalhosuteis: !0,
  maisAtalhosAutosDigitais: !1,
  visualizadorLembretes: !0,
  pesquisacamposreordena: !0,
  siteAtual: "",
  seletorProcessos: !1,
  integracaoInfojud: !1,
  mapaDeCalorPainelUsuario: !1,
  mapaDeCalorPainelUsuarioLimitesFlags: {
    flagDeLimiteVermelho: 30,
    flagDeLimiteAmarelo: 25,
    flagDeLimiteVerde: 15,
    mapaDeCalorPainelUsuarioUsarLimitesFlagsMelhorarCartaoTarefa: !1
  },
  mapaDeCalorPainelUsuarioStorage: {},
  mapaDeCalorPainelUsuaroiAnalisesProcessadasStorage: {},
  mapaDeCalorPainelUsuarioTarefasIgnoradas: [
    "arquivo",
    "aguardando apreciação",
    "processos suspensos",
    "remetidos para tr",
    "remetidos à tr",
    "sobrestados"
  ],
  mapaDeCalorPainelUsuarioOrigemDados: pi.PARALIZADOS_ENTRADA_TAREFA,
  mapaDeCalorPainelUsuarioFormatoBarra: Ii.PADRAO,
  mapaDeCalorPainelUsuaroiHashImpressaoLimitesFlags: Math.E,
  mapaDeCalorPainelUsuarioSessionStorage: {
    status: hi.NAO_ATIVADO,
    timestampMontagem: -1
  },
  menuHaburgueIntegracaoSistemas: !0,
  integracaoSerasajud: !1,
  mostraProcessosDigitos: !1,
  intimaZap: !1,
  abrirLembreteNoPopup: !1,
  PostIt: !1
  // inserir novo valor default acima
}, Bl = /https?:\/\/((.+)\.(.+)\.jus\.br\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)|(pje.g)\.(.+)\.jus\.br|frontend.prd.cnj.cloud|corregedoria.pje.jus.br|localhost:8080\/pje)\//, Vl = /https?:\/\/((.+)\.(.+)\.jus\.br\/(pje.g|pje\w|pje-treinamento-1g|pje|.g|.+grau)|(pje.g)\.(.+)\.jus\.br|corregedoria\.pje\.jus\.br)/, ur = {
  MINUTA: /http:\/\/localhost:(.+)\/(pje|pje.|pje.g|.g|.+grau)\/minuta\.html/,
  PAINEL_USUARIO: /http:\/\/localhost:(.+)\/(pje|pje.|pje.g|.g|.+grau)\/painel-usuario\.html/,
  PAINEL_USUARIO_LOCAL: "http://localhost:4000/pje/painel-usuario.html",
  AUTOS_DIGITAIS: /http:\/\/localhost:(.+)\/(pje|pje.|pje.g|.g|.+grau)\/autos-digitais\.html/
}, Qe = {
  // https://pjehml2gmaster.trf1.jus.br/pje/ng2/dev.seam#/painel-usuario-interno
  ROOT: /https?:\/\/((.+)\.(.+)\.jus\.br\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)|(pje.g)\.(.+)\.jus\.br|corregedoria.pje.jus.br|localhost:8080\/pje)\//,
  MINUTA: /https:\/\/((.+)\.(.+)\.jus\.br\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)|(pje.g)\.(.+)\.jus\.br|corregedoria.pje.jus.br)\/Processo\/movimentar.seam\?(idProcesso=[0-9]+&newTaskId=|newTaskId=)[0-9]+/,
  PAINEL_CONSULTA_CLOUD: /https:\/\/.*frontend.*prd.*cnj\.cloud\/?$/,
  PAINEL_CONSULTA: /https:\/\/(.+)\.jus\.br\/(pje|pje\.|pje\.g|\.g|pje-treinamento-1g|.+grau)\/Processo\/ConsultaProcesso\/listView\.seam/,
  PAINEL_ETIQUETAS: /.*frontend.*painel-usuario-interno\/etiquetas/,
  PAINEL_USUARIO: /.*frontend.*painel-usuario-interno(?!\/etiquetas)/,
  PAINEL_USUARIO_LOCAL: /https:\/\/((.+)\.(.+)\.jus\.br\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)|(pje.g)\.(.+)\.jus\.br|corregedoria.pje.jus.br)\/ng2\/dev\.seam#\/painel-usuario-interno/,
  AUTOS_DIGITAIS: /https:\/\/(.+)\.jus\.br\/(pje|pje\.|pje\.g|\.g|.g|pje-treinamento-1g|.+grau)\/Processo\/ConsultaProcesso\/Detalhe\/(listAutosDigitais|detalheProcessoVisualizacao)\.seam\?(id|idProcesso)=(.+)/,
  FRAME_PRINCIPAL_VARIOS_TRIBUNAIS: /https:\/\/((.+)\.(.+)\.jus\.br\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)|(pje.g)\.(.+)\.jus\.br|corregedoria.pje.jus.br)\/ng2\/dev.seam#\/painel-usuario-interno/,
  FRAME_PRINCIPAL_TRF1_1G: /https:\/\/pje1g\.trf1\.jus\.br\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)\/ng2\/dev.seam#\/painel-usuario-interno/,
  AJG: /https:\/\/ajg1.cjf.jus.br/,
  PAINEL_OFICIAL_JUSTICA: /Painel\/painel_usuario\/Paniel_Usuario_Oficial_Justica/,
  RELACAO_JULGAMENTO: /https:\/\/(pje2g|pjetrn2g|pjehml2grt)\.(trf1|trf2|trf3|trf4|trf5|trf6)\.jus\.br\/(pje|pje.|pje.g|.g|.+grau)\/Sessao\/RelacaoJulgamento\/sessaoPopUp\.seam\?idSessao=\d+/,
  ULTIMAS_TAREFAS: /\/(pje|pje.|pje.g|.g|pje-treinamento-1g|.+grau)\/Painel\/painel_usuario\/include\/listTasksUsuarioPje2.seam/
}, jt = {
  CONTENT_SCRIPTS: {
    ESTILOS_URL: "content/style.css"
  },
  REGEX: { NUMERO_PROCESSO: /\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/ },
  LINKS: {
    PJE: "https://pje1g.trf1.jus.br",
    OUTLOOK: "https://outlook.office.com/mail/inbox",
    ESOSTI: "https://esosti.trf1.jus.br/itsm/webclient/login/login.jsp?appservauth=true",
    SEI: "https://sei.trf1.jus.br/",
    SISBAJUD: "https://sso.cloud.pje.jus.br/auth/realms/pje/protocol/openid-connect/auth?client_id=sisbajud&redirect_uri=https%3A%2F%2Fsisbajud.cnj.jus.br%2F%3F&state=f9fd5e6e-e36c-4a8d-8dc7-b22b93373787&response_mode=fragment&response_type=code&scope=openid&nonce=06af9d0f-f779-4d6b-a769-308471bbda7e",
    RENAJUD: "https://renajud.denatran.serpro.gov.br/renajud/login.jsf",
    CONTRACHEQUE: "https://portal.trf1.jus.br/Consulta/ContraCheque/ContraCheque.php",
    AJG: {
      NOMEACAO: "https://ajg1.cjf.jus.br/aj/nomeacao/nomearprofissionais/nomearprofissionais_index.jsf",
      SOLICITACAO: "https://ajg1.cjf.jus.br/aj/pagamento/mantersolicitacaopagamento/mantersolicitacaopagamento_principal.jsf"
    }
  },
  HREFS: {
    ROOT: Bl,
    LEGACY_WEB_ROOT: Vl,
    MINUTA: [Qe.MINUTA, ur.MINUTA],
    PAINEL_CONSULTA_CLOUD: Qe.PAINEL_CONSULTA_CLOUD,
    PAINEL_CONSULTA: Qe.PAINEL_CONSULTA,
    PAINEL_ETIQUETAS: Qe.PAINEL_ETIQUETAS,
    PAINEL_USUARIO: [Qe.PAINEL_USUARIO, ur.PAINEL_USUARIO],
    PAINEL_USUARIO_LOCAL: [Qe.PAINEL_USUARIO_LOCAL, ur.PAINEL_USUARIO_LOCAL],
    AUTOS_DIGITAIS: [Qe.AUTOS_DIGITAIS, ur.AUTOS_DIGITAIS],
    AJG: Qe.AJG,
    PAINEL_OFICIAL_JUSTICA: Qe.PAINEL_OFICIAL_JUSTICA,
    RELACAO_JULGAMENTO: [Qe.RELACAO_JULGAMENTO, ur.AUTOS_DIGITAIS],
    ULTIMAS_TAREFAS: Qe.ULTIMAS_TAREFAS
  }
}, we = class {
  static info(t) {
    we.log(t, we.estilos.azul);
  }
  static erro(t) {
    t instanceof Error ? (we.log(t.message, we.estilos.vermelho), console.log(t)) : we.log(t, we.estilos.vermelho);
  }
  static aviso(t) {
    we.log(t, we.estilos.laranja);
  }
  static sucesso(t) {
    we.log(t, we.estilos.verde);
  }
  static detalhes(t) {
    we.log(t, we.estilos.cinza);
  }
  static inspecionar(t, r) {
    this.autorizarEmProducao && (we.detalhes(t), console.log(r));
  }
  static log(t, r = "") {
    this.autorizarEmProducao && console.log(`%c${t}`, r);
  }
};
let he = we;
de(he, "estilos", {
  azul: "background-color: #2979FF; color: #ffffff; font-weight: bold; padding: 2px 6px;",
  vermelho: "background-color: #F44336; color: #ffffff; font-weight: bold; padding: 2px 6px;",
  laranja: "background-color: #F57F17; color: #ffffff; font-weight: bold; padding: 2px 6px;",
  verde: "background-color: #2E7D32; color: #ffffff; font-weight: bold; padding: 2px 6px;",
  cinza: "background-color: #757575; color: #ffffff; font-weight: bold; padding: 2px 6px;"
}), de(he, "console", {
  assert: (...t) => {
  },
  count: (...t) => {
  },
  debug: (...t) => {
  },
  dir: (...t) => {
  },
  error: (...t) => {
  },
  group: (...t) => {
  },
  groupCollapsed: (...t) => {
  },
  groupEnd: (...t) => {
  },
  info: (...t) => {
  },
  log: (...t) => {
  },
  profile: (...t) => {
  },
  table: (...t) => {
  },
  time: (...t) => {
  },
  timeEnd: (...t) => {
  },
  trace: (...t) => {
  },
  warn: (...t) => {
  }
}), de(he, "autorizarEmProducao", !1);
class gt {
  static iniciar() {
    E.storage.local.set(Fa);
  }
  static async atualizar() {
    const t = await gt.obter(null);
    E.storage.local.set(Object.assign(Fa, t));
  }
  static remover(t) {
    return E.storage.local.remove(t);
  }
  static guardar(t) {
    return E.storage.local.set(t);
  }
  static async obter(t) {
    return await E.storage.local.get(t || null);
  }
  static async guardarSessionStorage(t) {
    if (E.runtime.getManifest().manifest_version === 2) {
      for (const r in t)
        if (Object.prototype.hasOwnProperty.call(t, r)) {
          const n = t[r];
          sessionStorage.setItem(r, JSON.stringify(n));
        }
    } else
      try {
        await E.storage.session.set(t), he.console.log("Dados salvos no armazenamento de sessão.");
      } catch {
      }
  }
  static async obterSessionStorage(t = null) {
    if (E.runtime.getManifest().manifest_version === 2) {
      const r = {};
      for (let n = 0; n < sessionStorage.length; n++) {
        const o = sessionStorage.key(n);
        o && (r[o] = sessionStorage.getItem(o));
      }
      return t ? sessionStorage.getItem(t) : r;
    } else
      try {
        const r = await E.storage.session.get(t);
        return t ? r[t] : r;
      } catch {
        return null;
      }
  }
}
const Kn = `nav.main-menu,#divSideBar{max-width:40px;min-width:40px}painel-usuario-menu-esquerdo{left:unset!important}#divProcessosTarefa{width:25%!important;flex-grow:1}#divMainPanel{width:75%!important;overflow-y:hidden!important}#divPainelUsuarioContent{display:flex}#divRightPanel{flex:1}#conteudoTarefa,.assinaturas-tarefa{overflow-y:hidden}#pageBody.container-fluid.scroll-y.novoPainel{overflow-y:hidden!important}#divLiAgrupadores,#divLiAssinatura,#divLiConsultaProcessual,#divLiEtiquetas,#divLiExpedientes,#divLiMinhasTarefas,#divLiSessoes,#divLiTarefas,#divLiUltimasTarefas{left:41px!important}#pageBody{padding:0}
`, zl = `:root{--darkreader-escuro-fraco: rgb(33, 36, 37);--darkreader-neutral-background: #131516;--darkreader-neutral-text: #d8d4cf;--darkreader-selection-background: #44c7fa;--darkreader-selection-text: #e8e6e3;--letra-preto-branco: rgb(255, 255, 255);--background-branco-preto: #2e2d30;--background-branco-cinza: #1d1f1d;--a-hover: rgb(51, 52, 53);--bord-branco-preto: #ffff;--azl-letras: rgb(137, 217, 249);--background: rgb(34, 32, 32);--nav-azul-outros: #00384f;--nav-sigiloso: #8c0d00;--faixa-superior: rgb(51, 51, 51);--button: rgb(0, 95, 136);--border: rgb(24, 26, 27)}.main-menu{background:var(--background)}.hrDivisao{border-top-color:var(--border)!important;border-right-color:var(--border)!important;border-bottom-color:var(--border)!important;border-left-color:var(--border)!important}html body app-root selector div.container-fluid.painel-usuario-interno div#divPainelUsuarioContent.row div#divSideBar.sideBarDefault side-bar nav.main-menu{background:var(--background)}#barraSuperiorPrincipal,.navbar,.navtop,.navbar-static-top,.navtop .navbar-collapse,.navbar-header,.navbar-collapse,.navbar-nav,.nav-bar-brand,.navbar-right{background:var(--nav-azul-outros)!important}.nav-sigilo{background:var(--nav-sigiloso)!important}span{color:var(--letra-preto-branco)}.login-body{background:var(--darkreader-escuro-fraco)!important}#username,#password{background:var(--darkreader-escuro-fraco)}#divProcessosTarefa{background:var(--background)}html body app-root selector div.container-fluid.painel-usuario-interno div#divPainelUsuarioContent.row div#divRightPanel.rightPanelDefault right-panel div#rightPanel.rightPanel.container-fluid div.painel-usuario-interno-dashboard.row div.col-md-4 div.dashboard-item-header{background:var(--button)}#acoes-processos-selecionados{background:var(--background)}.painel-usuario-interno-dashboard.row,.rightPanel.container-fluid{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}#acoes-processos-selecionados,.header-wrapper{background:var(--background)}#pageBody{background-color:var(--background-branco-preto)}#frameTarefas>.header-wrapper{background:var(--border)}#frameTarefas>.header-wrapper>.header-processo .mais-detalhes{background:var(--border)}div.vcenter.col-md-7.no-padding.header-processo{background:var(--border)}.btn.btn-primary{background:var(--button)}.btn.btn-primary:hover{background:var(--a-hover)}.btn-default{background:var(--button);color:var(--letra-preto-branco);font-weight:700}.btn-default:hover{background:var(--a-hover)}.text-info{color:var(--button)}#modalAssinarEmLote>div:nth-child(1)>div:nth-child(1){background:var(--background)}.faixa-superior{background-color:var(--faixa-superior)!important}#loginAplicacaoButton{background:var(--button)}#loginAplicacaoButton:hover{background:var(--a-hover)}#btnEntrar{background:var(--button)}#btnEntrar:hover{background:var(--a-hover)}#kc-pje-office,#kc-login{background:var(--button)}.dados{background-color:var(--darkreader-neutral-background)!important}.pageBody{background-color:var(--darkreader-escuro-fraco)!important}.nomeSistema,.subNomeSistema{color:var(--azl-letras)!important}.rich-stglpanel-header,.rich-stglpanel-body,.rich-panel-body,.value{background-color:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}input,select,textarea,.form-control{color:var(--letra-preto-branco);background-color:var(--darkreader-neutral-background);border-color:var(--letra-preto-branco)}#avisosPannel_header{background-color:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}#quadroAvisoPapelMensagem\\:j_id137_body>div.propertyView>div.value.col-sm-12>input[type=text]{background-color:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#quadroAvisoPapelMensagem\\:dataPublicacaoDecoration\\:dataPublicacaoFromFormInputDate,#quadroAvisoPapelMensagem\\:dataPublicacaoDecoration\\:dataPublicacaoToFormInputDate{background-color:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#menu{background-color:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}#menu>div.nivel.nivel-aberto{background-color:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}#pageBody{background-color:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#input-search-processo,ul#menu *{background-color:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}ul#menu a:hover{background-color:var(--a-hover)!important}#menu *{background-color:var(--darkreader-neutral-background);color:var(--letra-preto-branco)!important}#menu a:hover{background-color:var(--a-hover)!important}.dropdown-menu{color:var(--letra-preto-branco);background-color:var(--darkreader-neutral-background);border-color:var(--letra-preto-branco)}html,body,input,textarea,select,button{border-color:var(--darkreader-escuro-fraco)}#processosTarefa>p-datalist>div>div>ul *{background-color:var(--darkreader-neutral-background);border-bottom-color:var(--background-branco-cinza);border-left-color:var(--background-branco-cinza)}li.ng-star-inserted>processo-datalist-card:nth-child(1)>div:nth-child(1)>div:nth-child(3)>a:nth-child(1)>span{color:var(--darkreader-selection-background)}span.orgao.col-sm-12.no-padding{color:var(--letra-preto-branco)}.tarefa-numero-processo.process{color:var(--darkreader-selection-background)}span.local.col-sm-12.no-padding,span.local.col-sm-12.no-padding.ng-star-inserted{color:var(--letra-preto-branco)}.modal-header,.modal-footer{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}.processos-list,.col-sm-12{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}#modalMovimentarEmLote>div:nth-child(1)>div:nth-child(1)>div:nth-child(2)>*{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}#dropdown-filtro-tarefas,button.btn:nth-child(3){background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}#detalheDocumento\\:toolbarDocumento,body,#divTimeLine\\:divEventosTimeLine{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}.media-body,.box{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}.timeline .media.data,.timeline .media.data>.media-body{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)}#PjeMaisRTabs,.pesquisa,.affix-top{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}#divTimeLine{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}#j_id51\\:j_id76_header,#j_id51\\:j_id53_header{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}.col-xs-12{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}.rich-stglpanel-header{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}#j_id51\\:j_id361\\:tableDestinatariosLote\\:prazoGeralInput{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}#j_id51\\:j_id361\\:tableDestinatariosLote\\:prazoHeaderLote,#j_id51\\:j_id361\\:tableDestinatariosLote\\:meioHeaderlote,#j_id51\\:j_id361\\:tableDestinatariosLote\\:pessoalHeaderLote,#j_id51\\:j_id361\\:tableDestinatariosLote\\:PHeaderLote,#j_id51\\:j_id361\\:tableDestinatariosLote\\:EHeaderLote{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}#j_id51\\:poloTerceiroLoteBotao,#j_id51\\:poloPassivoLoteBotao,#j_id51\\:poloAtivoLoteBotao,#j_id51\\:j_id361\\:tableDestinatariosLote\\:P,#j_id51\\:j_id361\\:tableDestinatariosLote\\:E{background:var(--darkreader-escuro-fraco);color:var(--letra-preto-branco)}.rich-table-row,.rich-table-firstrow{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#j_id51\\:processosElegiveis *>h6{color:var(--nav-azul-outros)}#j_id51\\:processosElegiveis\\:transicoesColHeader,.rich-table-header,#cke_1_top{background:var(--darkreader-neutral-background);color:var(--letra-preto-branco)}[class*=dashboard-item-header]{background:#1b1b1a!important}#divTarefasPendentes>div.wrapper-filtro-tarefas-pendentes>div{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#inputPesquisaTarefas,#filtro-tarefas{background:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}.form-control,.ng-pristine,.ng-invalid,.ng-touched{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#dataDistribuicaoInicio>span>div{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}.ui-state-default,.ng-tns-c23-2,.ng-star-inserted,.ui-datepicker-title,.ui-datepicker-header,.ui-widget-header,.ui-helper-clearfix,.ui-corner-all{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}#dataDistribuicaoInicio>span>input{background:var(--a-hover)!important}.titulo-accordion,.datalist-content,.folha,.rich-datascr,.rich-table-footercell,#taskInstanceForm\\:WEB-INF_xhtml_flx_visualizarPeticao-2601387906\\:j_id195>table>tbody>*{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}.media-left,.dropdown-menu,.media-body,.box,.pesquisa,.affix-top{background:var(--darkreader-escuro-fraco)!important;color:var(--letra-preto-branco)!important}.btn,.btn-flat,.btn-default,.hidden-sm{background:var(--darkreader-neutral-background)!important;color:var(--letra-preto-branco)!important}#pje-mais-r-tabelaEtiquetasMaisUsadas tbody tr:nth-child(even){background-color:#3b3b39!important;color:#fff!important;font:bold}#pje-mais-r-tabelaEtiquetasMaisUsadas tbody tr:nth-child(even):hover{background-color:#bce4ee80!important}.tree li:last-child:before{background-color:var(--darkreader-escuro-fraco)!important}
`, Hl = `:root{--darkreader-escuro-fraco: #636566;--darkreader-neutral-background: rgb(48, 50, 51);--darkreader-neutral-text: #d8d4cf;--darkreader-selection-background: #004daa;--darkreader-selection-text: #e8e6e3;--letra-preto-branco: #ffff;--background-branco-preto: #f2f2f2;--background-branco-cinza: #e4e4e4;--a-hover: rgb(165, 167, 170);--bord-branco-preto: #ffff;--azl-letras: rgb(137, 217, 249);--background: rgb(204, 204, 204);--nav-azul-outros: rgb(48, 50, 51);--nav-sigiloso: #8c0d00;--faixa-superior: #636566;--button: #636566;--border: #f2f2f2}.main-menu{background:var(--background)}.hrDivisao{border-top-color:var(--border)!important;border-right-color:var(--border)!important;border-bottom-color:var(--border)!important;border-left-color:var(--border)!important}html body app-root selector div.container-fluid.painel-usuario-interno div#divPainelUsuarioContent.row div#divSideBar.sideBarDefault side-bar nav.main-menu{background:var(--background)}#barraSuperiorPrincipal,.navbar,.navtop,.navbar-static-top,.navtop .navbar-collapse,.navbar-header,.navbar-collapse,.navbar-nav,.nav-bar-brand,.navbar-right{background:var(--nav-azul-outros)!important}.nav-sigilo{background:var(--nav-sigiloso)!important}#divProcessosTarefa{background:var(--background-branco-cinza)!important}html body app-root selector div.container-fluid.painel-usuario-interno div#divPainelUsuarioContent.row div#divRightPanel.rightPanelDefault right-panel div#rightPanel.rightPanel.container-fluid div.painel-usuario-interno-dashboard.row div.col-md-4 div.dashboard-item-header{background:var(--button)}.painel-usuario-interno-dashboard.row,.rightPanel.container-fluid,.pesquisa-etiquetas,.rightPanel,#acoes-processos-selecionados{background:var(--background-branco-cinza)}.header-wrapper{background:var(--background)}#pageBody{background-color:var(--background-branco-preto)}#frameTarefas>.header-wrapper{background:var(--border)}#frameTarefas>.header-wrapper>.header-processo .mais-detalhes{background:var(--border)}div.vcenter.col-md-7.no-padding.header-processo{background:var(--border)}.detalhe-processo>.header-top{background:var(--nav-azul-outros)}.btn.btn-primary{background:var(--button)}.btn.btn-primary:hover{background:var(--azl-letras)}.btn-default{background:var(--button);color:var(--letra-preto-branco);font-weight:700}.btn-default:hover{background:var(--azl-letras)}.pesquisa{background-color:var(--background-branco-cinza)}.text-info{color:var(--button)}#modalAssinarEmLote>div:nth-child(1)>div:nth-child(1){background:var(--background)}.faixa-superior{background-color:var(--faixa-superior)!important}#loginAplicacaoButton{background:#636566 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA4CAIAAADW7/fEAAANR3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZlJcjM5DoX3PEUfgfNwHI4RdYM+fn8gU7Yky/ZvVy16UVZIKWcyQQAPw0NKzf/+tdR/+AvGeeVDyrHEqPnzxRdb+ZL1+Sv702i/P/efS9c183heudtNllNOVp5/U73WV86H9xtuy017PK/ydcXmS5B5E3w0kJ3l+7hXkvP2nDf+ElTm+RJLTveqtktQvxZuVa63f1PrHOR/9XAi4aUR2MhZO51xen/mo4E778o77k+U4mrgu3FF7cNNGA55MO921PreQQ9OXu0y7dn7b9+enG/rdd49+TLeBMXXF0x4Ou/etrEP4XB9U5x+uDCSsR/Mud5rjbzWPNZVH/FovCJqO9vcxLAQi73bt0VeiXfge9qvwivrqjuQD91149VNMRYnL2W8GaaaZeY+dtNR0dtpE0dru3X7XHbJFtud4OTlZZZNrrjhMlh2O5VznLZvupi9b9n7dZPZeRiWWoMwwy2fvtRXF3/yUmt1cZHR+fJTE4CtOBw1BDn5ZBWAmHXhFraDb68Lfn0XP4QqCIbt5oyBVbcjogXzHltu4+xYFzieFDIqjUsALmLvgDLGgYCORL+JRidrkzH4MQNQRXPrvG0gYEKwAyWtdy5alWy2sjf3JLPX2mCjldPUJoAIZFYCm+IqYHkfiJ/kMzFUgws+hBBDClmFEmp00ccQY0xRilxNLvkUUkwp5VRSzS77HHLMKedcci22OGpgKLGkkksptVpV2agiq7K+cqbZ5ppvocWWWm6l1U74dN9Djz313Euvww43KBMjjjTyKKNOoyaVYvoZZpxp5llmXcTacsuvsOJKK6+y6htq5krb59cPUDMXanYjJevSG2qcVSndRBgpJ0EwAzHrDYgnQYCAtoKZzsZ7K8gJZrpYkiJYlAyCjRpGEANCP40Ny7xh947cH+GmQv4j3Ox3yCmB7p9ATgHdR9xeoDakz/WN2MlC8al2ZN9yOCKraktGcb5WaW6/Pqq/K+BfQf83ghb51GlzutMPjbEj1kj6aj1HWi2kUuIcevbVXOw9huKnSq51WZLSCnWRJ6YFr5c3uXqy30zp3oTkiM1AQuwswY01VuipmLgQPZbVIaqIQAKS9TbVQg81lTxMfbhJuzN9VpfKtK2NsrxfRs/qm+RiSdPnTF6EXFL2KuiRA+nDrWUOUhj1ColR2po52sH/0oRI6m2arVm72VCtTY8p2TcK1lhLSX81se7l2TSb1jLBp9WpKdPGhbsyXpH2N4rbqyrV5IMwJdJ+JUwg6TPXVZwDEUXbNy4t2EWoTThL7EWW9hDMNurJTu4/dj5Zqbb8m6GXYiy+FBPI7lXT+qac1JSt3qWcutPO7hvv1MO5R8FLva9AUJ+h8FO/qVeO+43f1JPjfI8R3caPdVNfg/qFbqnNlfUiMWqYLalKD5gFClmDDSSERLqnM9hmrS9ldBh2M7ZDH/2cjgtQxyrcMrSOSmYe3FVJ3bVUakyjttnHivSWRSLblUjIOusYUDu3UhqpjdTnmC4sXcU2g/rd8XU0xeo0Y6B1rRlTCbQlx/4t9wPsqQq1rBzDghVQXkhnZirXY4sJ9o1E32QWQR7DDF3JIMkH44MMT6+PaZRMoCTxxWxmulgqCvZmVcNFlKHMODRGCGV2b3uaUhuwBhuhP476YPpycxWUM3Ti1L0Q80ZdMTOP5KoKY3phB5AHunRDCt0Uz0aTO3SxZjNqgRlZP0xYXgyxeezauQvilVJJrQryUzjD+wotH1fkpL2AJGAJ1bcsiY2qJTZ8xHFpzV19d9K2NXbELtPqhxVrncuSh03i7LUs9WHpC0mPW72WpV4v/rle6pOlP9ZLfbX4J3qpL5f+QC+lv138Z3qpl0HxC73Umi0SipDFafVwK7hCwdKjhu7CNNnXBjUcMNFBPs9gSR9bk3bWpNKpSrvSd6tehfst2kMTUaiCVnTlvcmaDLBxkVcRqt0tbZzBLAwFMSZRqyurkOHs5IWHJApimCk7iLFkN1w8ocxyrk+ZjmdwjPXMfr1SNfmXmi0sRaeetorFjChUhmTfJbU66ysVLjC0Z2E1YZLAplP4IfRtZ2FjNpTIhn5b0vtWixgl66ZJH45udib+xuTQfI4sZUIcoFH2dZU/vfHbYx82iGRKRKyKIGjTUcV6Bj+QjXpSY4cBPOZdJ5U80S/m7l8UKCr6GjLh7EYljzW2OerYI1OxfNPPR7NixAKsmDig33FEPR6Wq9f3f3o0Mv44UUND607IbterR99v17dJH6AV04I2mBeUgHbA3FCaO3zEHvWpQZoIcfRyj1OI1aZLo+NXa8oWOuj1dZIXneigBR1+VPUKeVdoienBvt6CRzUL5x7Z/Ruurb4n422YNGksCx7rdGsuoxKZzs49Y3YqI6SqzOoMuzS8NDbzGOTF9gfdaJZKti5SAGqSIllpW3TbNleX9vdBoZ6jIswV6MuBJjjd6vgAfT6JMwsJD+04Xf1Bh2ZSwJ1iSA61U5FOJWJsJQ+9MWR3k0dj+6T3bkS3xsw7NnyypClbZuhHC1WmB02zh2KDFzQIMFfA7jqa7iWuqCblJEf6ND7RlCpjVhlwnBRp7nihGJTAbRCO5BdCRpWho/qSO8wOnsRgQ5SoypCRk8kbYgm3jHI3ymfnvCifDpvyud3ZrbkoX0qHjtriThzBTfZAxaSySSYR7fOpzG4L6LtwP12+LkqSSBzNTRaNvshiazeGbbw42G/P5nxE5DBuDFvXi2HH1i56LCxNVCWYhkXq2iaSZuz6dpHq+XCZcpSk2uV+ccjLIZc7ZHg47pAZ4N4hMjwcl8jwYPfwcDyCVhitPrXafe0zMeoIOV5Rb265nCLP1MfVq16h8wZOe9xIPe8U/sQv7fjl3i3q2S+h7Ie3Q5i2N3DgRT0hrX3KY3h5IoQgq7MbvMPcKrbebhMk1Lni2rHKpfyk27EP9Z/MLLXCWatxFcrfUpA2OeURXTWl5GZ6TE7By2lOIbz1mhHJLzumNdL0XZl66BTo0IYZnO1yick6JoxiivZGOz5D9GokMgvxp8/a5M1VwYMAwNizuYZ49OugVd9F7WwWQi+9NZGsYWYqeJS2EVdDGvUt7eqkdqkcqe5KKR2jzT3vSEXbQMgjvkCBtGF2OmaSZxtmAmI+dTKcOqled89TJzeO1z0A8n7XdQuF+dzELQpKUDN9KzGbfd0cd9MFS0Zldzyq2633WHwkzQfTMV9mHuqVJJguVZ7WxDM+PPQnaFDViZl0GqnklvmIOaUqRGLDyKvXVmJ2hH5zqFc6k2OUZzlMSa3GzaMWsRFoAkx3sQgpMzXN2gAeZzsXl2NiGp0wrqHRVZNEJB8QLMom3pK0EXSCO4nq886DuDNKCpE+Q82+fq5ybcl/P57/1fOM7fu1R7nfYgdCPLXFI2z4vjEtVlo8CdjVrtV/62GGzIW5qW+Io4bQ99UPebc2xNPQabdtR3RsYdlIzFFqpYsaTd0w8rw7tkEXRHqsBgIMWS4mBHH6/hGs718rHWKenqaoXz6G8o576N2O4iC8AEFJYJ07+4WLkQiu0dLdyi4mau3OTTFRpxOcMJlgP2Seeky9LzKvJhfrc6q+r1cPRPdnaWfcMrb5Sfq5rnSrtYeYYnF+JT2jkx+GPAyhDwgMQUOEy2MOGqrJVVYCiavBZzgrVbx0/FLhR01H2kmxqTs8QggyyeD7uJ+zetTtu+P6mM4jJ3launsN0Uh0UdVDInNV0ogOnVuKMDy5BBloNqI/zSehIqIKlxb526tkDeq2U/SYDLx8NVZJeO7INwUciV2qC3E8taUcTxNWYEX0UsHJYfqbbLUz4Zzcqc1pJecNBWZvty9cGwoAtw3JH7sT4n5PIX/vu6prWwLucYe9wRryhFiiB25MsdnDLWOB/E5VT1t37oSyoqmto2rXf+ba8Eo89ejZ/gc7X7n1tVfVvVvf7Pto3WvbLsvYaKjLsju7hGdsyyTDLsuEjn6w7d6ypV64+FcYqkcQf4+hegTx9xiqRxB/j6H6PDVeYGjlFAWcvd2TbaqlexCF+91h2OBCcKdJQaB8pVwhcdKXgT6OSa01if2Y6sZgOipjMcuhSQrMNkGo8zO8gbElyw/b8FoKlDOdqdK7kOSXRWIEGqd2fzCjyqOVTx8ktNkzHQ4CcmZvebrMagYjmzaLslotSuXuqYMZPEj1sa6P+s2gy1jXGfhsE0zdCqWoFvTC1FHxJ3PrpiMuwXdjKKE5Brg1ZSqH+eAdHBtr3mPOgG6ePICGg9qQguz23AmdkWdbwgyLtBmbNtgtnNETv3NDDZJjZV6/bb3drK67N3U498vPURtDJAiC++JN9LpEJ3wm7WSexxq6KZx322Vdu/ivRN9LkF8f2iXgpMh297qX8a0Gzwqo32rwrID6rQbPCqjfavCsgPqgwfgzDZ4VYBTt411CO/HxpoFEztcQnJuZ+6fti5FLeCKUKBHFvq7Zg7DtUaFIU35ooZpECb84C1yBVcx3K0Gl4i11VP2HfvH9V9A/JkiqL/n0P69U300EZUAiAAABhGlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TtSJVh3YQcchQnSyIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi5Oik6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyoGXtEDP0IYQFRipp5IL2bgOb7u4ePrXZRneZ/7c/QreZMBPpF4jumGRbxBPLNp6Zz3icOsJCnE58TjBl2Q+JHrsstvnIsOCzwzbGRS88RhYrHYwXIHs5KhEk8TRxRVo3wh67LCeYuzWqmx1j35C4N5bSXNdZojiGMJCSQhQkYNZVRgIUqrRoqJFO3HPPzDjj9JLplcZTByLKAKFZLjB/+D392ahalJNykYA7pfbPtjFAjsAs26bX8f23bzBPA/A1da219tALOfpNfbWuQIGNwGLq7bmrwHXO4AQ0+6ZEiO5KcpFArA+xl9Uw4I3QJ9a25vrX2cPgAZ6mr5Bjg4BMaKlL3u8e7ezt7+PdPq7wdjVXKhcd841QAAECJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQxMzE0OEY4QTJFMTFFNUFDRUZBRThEREI3MzUxOEQiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2FlZGU2NmItYjcxMS00ZDVjLWEzYWMtODBlNmU5NTk0NzIxIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjZjYTllYWItMDAwYy00ZjYwLTg0ZDgtMTRmZjA3NTFhOGNkIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTU5MTIxMTk1MzA4Njg0MSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjE4IgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNWM5MGQ1Zi00ODE2LTQ2NDktODFmMS1jMTE1YjVjNTYxZWMiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMDNUMTU6MTk6MTMiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8eG1wTU06RGVyaXZlZEZyb20KICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg1MTFBQUIyRUVCMTFFNThFRjNDM0U3MjA4RDBGMkIiCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4NTExQUFBMkVFQjExRTU4RUYzQzNFNzIwOEQwRjJCIi8+CiAgIDxwbHVzOkltYWdlU3VwcGxpZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZVN1cHBsaWVyPgogICA8cGx1czpJbWFnZUNyZWF0b3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZUNyZWF0b3I+CiAgIDxwbHVzOkNvcHlyaWdodE93bmVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6Q29weXJpZ2h0T3duZXI+CiAgIDxwbHVzOkxpY2Vuc29yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6TGljZW5zb3I+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5y7eKeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AYDExMN3cqJfAAAAwBJREFUaN7tmd9uG3UQhb8zu21AVmpLqAk33PAEtM0FSERWKtqKJ0YFYWQoNyhpn4G70j9q1UQ1pt45XOympNANXeOsqLRzZckr7/ebOTNndq3Prt/gfx/B+xAD5UA5UA6UA+VAOVC+v5Rl2xez72fj8RUJbEmAbepPGwlDQpGQFWVBPnqxuHMw7ZDL2fzeZPIGIqANIkLKFAlhlwXg2NkefTv/uUMuJ6MtkcDD54uvv5pedEHv/jDf2R5ZXB1tddOliWcnf/SACNw5mD5brAQoO3fPzemXvfXHzf3Pax10oxSru7OfeqP8bjY3mdGxx3G5My4fHP1CRn0W28ja7PAyKEk5LMLuOi8FrNxQJc0Uik3ykQgTSDKG6Erp+lu5uUxg5GpjlLUCnZAWFmqVZXvFZVAIMFYKUECxwVxaoeZGTb6CqlMuZYHrSqOsa73apCKFSKupW63Itly268xGpyUP/Uurres/Io1V46XlouskUmLcHM+1Ir3ZVUcQKeEwFSHLnXs8sBWQgFQY3OIN60XV3Key0LkJOK+IT14ub+3v9zPVZ/N7k1EhOnoP5KPjl715z8OT35G7b8GOy3GpN8otud7C1tFljw8NkbTur3Ge9fQYciWKXKN7fMb87x8diqxPVUHBCqI2XqXrPUFpVFjIWSn2buz98zfvHx1yulzIXNtrrklKJagzZYb/yvT1t91yXdMJU4niLFPhJFpLeF73KC6g7q4gpb/PxyrSZBtmay4rsTrj/Q8OD7EJQZqQ0wr51bW9LzpmsqgL7HizvCqUckv/tFIWUJyp+GsB/cdoVU5z9u66XK6WvfX4KivbanHgsr3BY2cy6Y1yd/uKUKOHd6SUDJ58uPXN7MdfHz9duSgj7CrFpjpKplLIVaBPd69ORpfM6Zr5jpRPTpYfjS6H8uPxB7vjT2hmYdsysOZCVLh6bTdmJZePj5cdJtGt6f7TFwsT1OubYZNvXwCK2gLqRwtCLn87Xtw+ePsbAA3/8A2UA+VAOVAOlAPlQHmh8ScfjzuKVYjyJQAAAABJRU5ErkJggg==) no-repeat scroll 0px center}#btnEntrar{background:#636566}#kc-pje-office{background:#636566 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA4CAIAAADW7/fEAAANR3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZlJcjM5DoX3PEUfgfNwHI4RdYM+fn8gU7Yky/ZvVy16UVZIKWcyQQAPw0NKzf/+tdR/+AvGeeVDyrHEqPnzxRdb+ZL1+Sv702i/P/efS9c183heudtNllNOVp5/U73WV86H9xtuy017PK/ydcXmS5B5E3w0kJ3l+7hXkvP2nDf+ElTm+RJLTveqtktQvxZuVa63f1PrHOR/9XAi4aUR2MhZO51xen/mo4E778o77k+U4mrgu3FF7cNNGA55MO921PreQQ9OXu0y7dn7b9+enG/rdd49+TLeBMXXF0x4Ou/etrEP4XB9U5x+uDCSsR/Mud5rjbzWPNZVH/FovCJqO9vcxLAQi73bt0VeiXfge9qvwivrqjuQD91149VNMRYnL2W8GaaaZeY+dtNR0dtpE0dru3X7XHbJFtud4OTlZZZNrrjhMlh2O5VznLZvupi9b9n7dZPZeRiWWoMwwy2fvtRXF3/yUmt1cZHR+fJTE4CtOBw1BDn5ZBWAmHXhFraDb68Lfn0XP4QqCIbt5oyBVbcjogXzHltu4+xYFzieFDIqjUsALmLvgDLGgYCORL+JRidrkzH4MQNQRXPrvG0gYEKwAyWtdy5alWy2sjf3JLPX2mCjldPUJoAIZFYCm+IqYHkfiJ/kMzFUgws+hBBDClmFEmp00ccQY0xRilxNLvkUUkwp5VRSzS77HHLMKedcci22OGpgKLGkkksptVpV2agiq7K+cqbZ5ppvocWWWm6l1U74dN9Djz313Euvww43KBMjjjTyKKNOoyaVYvoZZpxp5llmXcTacsuvsOJKK6+y6htq5krb59cPUDMXanYjJevSG2qcVSndRBgpJ0EwAzHrDYgnQYCAtoKZzsZ7K8gJZrpYkiJYlAyCjRpGEANCP40Ny7xh947cH+GmQv4j3Ox3yCmB7p9ATgHdR9xeoDakz/WN2MlC8al2ZN9yOCKraktGcb5WaW6/Pqq/K+BfQf83ghb51GlzutMPjbEj1kj6aj1HWi2kUuIcevbVXOw9huKnSq51WZLSCnWRJ6YFr5c3uXqy30zp3oTkiM1AQuwswY01VuipmLgQPZbVIaqIQAKS9TbVQg81lTxMfbhJuzN9VpfKtK2NsrxfRs/qm+RiSdPnTF6EXFL2KuiRA+nDrWUOUhj1ColR2po52sH/0oRI6m2arVm72VCtTY8p2TcK1lhLSX81se7l2TSb1jLBp9WpKdPGhbsyXpH2N4rbqyrV5IMwJdJ+JUwg6TPXVZwDEUXbNy4t2EWoTThL7EWW9hDMNurJTu4/dj5Zqbb8m6GXYiy+FBPI7lXT+qac1JSt3qWcutPO7hvv1MO5R8FLva9AUJ+h8FO/qVeO+43f1JPjfI8R3caPdVNfg/qFbqnNlfUiMWqYLalKD5gFClmDDSSERLqnM9hmrS9ldBh2M7ZDH/2cjgtQxyrcMrSOSmYe3FVJ3bVUakyjttnHivSWRSLblUjIOusYUDu3UhqpjdTnmC4sXcU2g/rd8XU0xeo0Y6B1rRlTCbQlx/4t9wPsqQq1rBzDghVQXkhnZirXY4sJ9o1E32QWQR7DDF3JIMkH44MMT6+PaZRMoCTxxWxmulgqCvZmVcNFlKHMODRGCGV2b3uaUhuwBhuhP476YPpycxWUM3Ti1L0Q80ZdMTOP5KoKY3phB5AHunRDCt0Uz0aTO3SxZjNqgRlZP0xYXgyxeezauQvilVJJrQryUzjD+wotH1fkpL2AJGAJ1bcsiY2qJTZ8xHFpzV19d9K2NXbELtPqhxVrncuSh03i7LUs9WHpC0mPW72WpV4v/rle6pOlP9ZLfbX4J3qpL5f+QC+lv138Z3qpl0HxC73Umi0SipDFafVwK7hCwdKjhu7CNNnXBjUcMNFBPs9gSR9bk3bWpNKpSrvSd6tehfst2kMTUaiCVnTlvcmaDLBxkVcRqt0tbZzBLAwFMSZRqyurkOHs5IWHJApimCk7iLFkN1w8ocxyrk+ZjmdwjPXMfr1SNfmXmi0sRaeetorFjChUhmTfJbU66ysVLjC0Z2E1YZLAplP4IfRtZ2FjNpTIhn5b0vtWixgl66ZJH45udib+xuTQfI4sZUIcoFH2dZU/vfHbYx82iGRKRKyKIGjTUcV6Bj+QjXpSY4cBPOZdJ5U80S/m7l8UKCr6GjLh7EYljzW2OerYI1OxfNPPR7NixAKsmDig33FEPR6Wq9f3f3o0Mv44UUND607IbterR99v17dJH6AV04I2mBeUgHbA3FCaO3zEHvWpQZoIcfRyj1OI1aZLo+NXa8oWOuj1dZIXneigBR1+VPUKeVdoienBvt6CRzUL5x7Z/Ruurb4n422YNGksCx7rdGsuoxKZzs49Y3YqI6SqzOoMuzS8NDbzGOTF9gfdaJZKti5SAGqSIllpW3TbNleX9vdBoZ6jIswV6MuBJjjd6vgAfT6JMwsJD+04Xf1Bh2ZSwJ1iSA61U5FOJWJsJQ+9MWR3k0dj+6T3bkS3xsw7NnyypClbZuhHC1WmB02zh2KDFzQIMFfA7jqa7iWuqCblJEf6ND7RlCpjVhlwnBRp7nihGJTAbRCO5BdCRpWho/qSO8wOnsRgQ5SoypCRk8kbYgm3jHI3ymfnvCifDpvyud3ZrbkoX0qHjtriThzBTfZAxaSySSYR7fOpzG4L6LtwP12+LkqSSBzNTRaNvshiazeGbbw42G/P5nxE5DBuDFvXi2HH1i56LCxNVCWYhkXq2iaSZuz6dpHq+XCZcpSk2uV+ccjLIZc7ZHg47pAZ4N4hMjwcl8jwYPfwcDyCVhitPrXafe0zMeoIOV5Rb265nCLP1MfVq16h8wZOe9xIPe8U/sQv7fjl3i3q2S+h7Ie3Q5i2N3DgRT0hrX3KY3h5IoQgq7MbvMPcKrbebhMk1Lni2rHKpfyk27EP9Z/MLLXCWatxFcrfUpA2OeURXTWl5GZ6TE7By2lOIbz1mhHJLzumNdL0XZl66BTo0IYZnO1yick6JoxiivZGOz5D9GokMgvxp8/a5M1VwYMAwNizuYZ49OugVd9F7WwWQi+9NZGsYWYqeJS2EVdDGvUt7eqkdqkcqe5KKR2jzT3vSEXbQMgjvkCBtGF2OmaSZxtmAmI+dTKcOqled89TJzeO1z0A8n7XdQuF+dzELQpKUDN9KzGbfd0cd9MFS0Zldzyq2633WHwkzQfTMV9mHuqVJJguVZ7WxDM+PPQnaFDViZl0GqnklvmIOaUqRGLDyKvXVmJ2hH5zqFc6k2OUZzlMSa3GzaMWsRFoAkx3sQgpMzXN2gAeZzsXl2NiGp0wrqHRVZNEJB8QLMom3pK0EXSCO4nq886DuDNKCpE+Q82+fq5ybcl/P57/1fOM7fu1R7nfYgdCPLXFI2z4vjEtVlo8CdjVrtV/62GGzIW5qW+Io4bQ99UPebc2xNPQabdtR3RsYdlIzFFqpYsaTd0w8rw7tkEXRHqsBgIMWS4mBHH6/hGs718rHWKenqaoXz6G8o576N2O4iC8AEFJYJ07+4WLkQiu0dLdyi4mau3OTTFRpxOcMJlgP2Seeky9LzKvJhfrc6q+r1cPRPdnaWfcMrb5Sfq5rnSrtYeYYnF+JT2jkx+GPAyhDwgMQUOEy2MOGqrJVVYCiavBZzgrVbx0/FLhR01H2kmxqTs8QggyyeD7uJ+zetTtu+P6mM4jJ3launsN0Uh0UdVDInNV0ogOnVuKMDy5BBloNqI/zSehIqIKlxb526tkDeq2U/SYDLx8NVZJeO7INwUciV2qC3E8taUcTxNWYEX0UsHJYfqbbLUz4Zzcqc1pJecNBWZvty9cGwoAtw3JH7sT4n5PIX/vu6prWwLucYe9wRryhFiiB25MsdnDLWOB/E5VT1t37oSyoqmto2rXf+ba8Eo89ejZ/gc7X7n1tVfVvVvf7Pto3WvbLsvYaKjLsju7hGdsyyTDLsuEjn6w7d6ypV64+FcYqkcQf4+hegTx9xiqRxB/j6H6PDVeYGjlFAWcvd2TbaqlexCF+91h2OBCcKdJQaB8pVwhcdKXgT6OSa01if2Y6sZgOipjMcuhSQrMNkGo8zO8gbElyw/b8FoKlDOdqdK7kOSXRWIEGqd2fzCjyqOVTx8ktNkzHQ4CcmZvebrMagYjmzaLslotSuXuqYMZPEj1sa6P+s2gy1jXGfhsE0zdCqWoFvTC1FHxJ3PrpiMuwXdjKKE5Brg1ZSqH+eAdHBtr3mPOgG6ePICGg9qQguz23AmdkWdbwgyLtBmbNtgtnNETv3NDDZJjZV6/bb3drK67N3U498vPURtDJAiC++JN9LpEJ3wm7WSexxq6KZx322Vdu/ivRN9LkF8f2iXgpMh297qX8a0Gzwqo32rwrID6rQbPCqjfavCsgPqgwfgzDZ4VYBTt411CO/HxpoFEztcQnJuZ+6fti5FLeCKUKBHFvq7Zg7DtUaFIU35ooZpECb84C1yBVcx3K0Gl4i11VP2HfvH9V9A/JkiqL/n0P69U300EZUAiAAABhGlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TtSJVh3YQcchQnSyIijhKFYtgobQVWnUwufQLmjQkKS6OgmvBwY/FqoOLs64OroIg+AHi5Oik6CIl/i8ptIjx4Lgf7+497t4BQqPCVLNrAlA1y0jFY2I2tyoGXtEDP0IYQFRipp5IL2bgOb7u4ePrXZRneZ/7c/QreZMBPpF4jumGRbxBPLNp6Zz3icOsJCnE58TjBl2Q+JHrsstvnIsOCzwzbGRS88RhYrHYwXIHs5KhEk8TRxRVo3wh67LCeYuzWqmx1j35C4N5bSXNdZojiGMJCSQhQkYNZVRgIUqrRoqJFO3HPPzDjj9JLplcZTByLKAKFZLjB/+D392ahalJNykYA7pfbPtjFAjsAs26bX8f23bzBPA/A1da219tALOfpNfbWuQIGNwGLq7bmrwHXO4AQ0+6ZEiO5KcpFArA+xl9Uw4I3QJ9a25vrX2cPgAZ6mr5Bjg4BMaKlL3u8e7ezt7+PdPq7wdjVXKhcd841QAAECJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDQxMzE0OEY4QTJFMTFFNUFDRUZBRThEREI3MzUxOEQiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2FlZGU2NmItYjcxMS00ZDVjLWEzYWMtODBlNmU5NTk0NzIxIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjZjYTllYWItMDAwYy00ZjYwLTg0ZDgtMTRmZjA3NTFhOGNkIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTU5MTIxMTk1MzA4Njg0MSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjE4IgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNWM5MGQ1Zi00ODE2LTQ2NDktODFmMS1jMTE1YjVjNTYxZWMiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMDNUMTU6MTk6MTMiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8eG1wTU06RGVyaXZlZEZyb20KICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg1MTFBQUIyRUVCMTFFNThFRjNDM0U3MjA4RDBGMkIiCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI4NTExQUFBMkVFQjExRTU4RUYzQzNFNzIwOEQwRjJCIi8+CiAgIDxwbHVzOkltYWdlU3VwcGxpZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZVN1cHBsaWVyPgogICA8cGx1czpJbWFnZUNyZWF0b3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZUNyZWF0b3I+CiAgIDxwbHVzOkNvcHlyaWdodE93bmVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6Q29weXJpZ2h0T3duZXI+CiAgIDxwbHVzOkxpY2Vuc29yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6TGljZW5zb3I+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5y7eKeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AYDExMN3cqJfAAAAwBJREFUaN7tmd9uG3UQhb8zu21AVmpLqAk33PAEtM0FSERWKtqKJ0YFYWQoNyhpn4G70j9q1UQ1pt45XOympNANXeOsqLRzZckr7/ebOTNndq3Prt/gfx/B+xAD5UA5UA6UA+VAOVC+v5Rl2xez72fj8RUJbEmAbepPGwlDQpGQFWVBPnqxuHMw7ZDL2fzeZPIGIqANIkLKFAlhlwXg2NkefTv/uUMuJ6MtkcDD54uvv5pedEHv/jDf2R5ZXB1tddOliWcnf/SACNw5mD5brAQoO3fPzemXvfXHzf3Pax10oxSru7OfeqP8bjY3mdGxx3G5My4fHP1CRn0W28ja7PAyKEk5LMLuOi8FrNxQJc0Uik3ykQgTSDKG6Erp+lu5uUxg5GpjlLUCnZAWFmqVZXvFZVAIMFYKUECxwVxaoeZGTb6CqlMuZYHrSqOsa73apCKFSKupW63Itly268xGpyUP/Uurres/Io1V46XlouskUmLcHM+1Ir3ZVUcQKeEwFSHLnXs8sBWQgFQY3OIN60XV3Key0LkJOK+IT14ub+3v9zPVZ/N7k1EhOnoP5KPjl715z8OT35G7b8GOy3GpN8otud7C1tFljw8NkbTur3Ge9fQYciWKXKN7fMb87x8diqxPVUHBCqI2XqXrPUFpVFjIWSn2buz98zfvHx1yulzIXNtrrklKJagzZYb/yvT1t91yXdMJU4niLFPhJFpLeF73KC6g7q4gpb/PxyrSZBtmay4rsTrj/Q8OD7EJQZqQ0wr51bW9LzpmsqgL7HizvCqUckv/tFIWUJyp+GsB/cdoVU5z9u66XK6WvfX4KivbanHgsr3BY2cy6Y1yd/uKUKOHd6SUDJ58uPXN7MdfHz9duSgj7CrFpjpKplLIVaBPd69ORpfM6Zr5jpRPTpYfjS6H8uPxB7vjT2hmYdsysOZCVLh6bTdmJZePj5cdJtGt6f7TFwsT1OubYZNvXwCK2gLqRwtCLn87Xtw+ePsbAA3/8A2UA+VAOVAOlAPlQHmh8ScfjzuKVYjyJQAAAABJRU5ErkJggg==) no-repeat scroll 0px center}#kc-login{background:#636566}
`, Zl = `.sideBarDefault,.sideBarMin,#divSideBar{width:950px;display:inline-block;position:absolute;left:0px;max-height:520px;bottom:0px;height:46px;left:1px}nav.main-menu{height:unset;border-right:unset;border-radius:12px}.ui-datalist .ui-datalist-data>li{padding-left:30px}.rightPanelDefault,.rightPanelFull,#divRightPanel{width:100%!important}div#divProcessosTarefa.rightPanel{width:100%;min-width:250px;max-width:330px;position:absolute;left:-280px;transition:left 1s,border-right-width 1s,border-top-right-radius 1s;border-right-color:#a9a9a9;border-right-width:30px;border-right-style:groove;border-top-right-radius:80px}div#divProcessosTarefa.rightPanel:hover,div#divProcessosTarefa.rightPanel:focus,div#divProcessosTarefa.rightPanel:active{left:0;border-right-width:0;border-top-right-radius:0}div.rightPanelDefault #divMainPanel.mainPanel{width:100%!important;min-width:1140px!important;max-width:1250px!important}@media screen and (min-width: 1595px){div.rightPanelDefault #divProcessosTarefa.rightPanel{left:0!important;transition-duration:1s;border-right-width:0;border-top-right-radius:0}div.rightPanelDefault #divMainPanel.mainPanel{padding-left:335px!important;min-width:unset!important;max-width:unset!important}}
`, gr = `#frameTarefas>div div.col-md-5 div.dropdown:nth-child(3) ul{left:-570px;height:500px;width:680px}div>div.col-md-5.btn-toolbar.pb-5.toolbar-processo>div.dropdown.pull-right.open>ul>li>pje-selecionar-etiquetas>div{height:500px;width:680px;box-shadow:1px 2px 2px 2px #ecab6047;border-radius:5px}#conteudoTarefa #pesquisar-etiquetas{box-sizing:border-box;width:51%;float:right;display:block}#conteudoTarefa .table-etiquetas{box-sizing:border-box;cursor:pointer;width:51%;float:right;display:block}#pje-mais-r-divEtiquetaFavorita{height:auto;width:48%;overflow:hidden;align-items:center;text-align:center;border-radius:5px;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;line-height:1.42857143;color:#333;font-family:sans-serif,Open Sans regular,Arial,Verdana!important;font-size:13px;list-style:none;box-sizing:border-box;min-height:1px;position:relative;display:table;border-collapse:separate;float:none;padding:2px}
`, dr = `#pje-mais-r-tabelaEtiquetasMaisUsadas{border-right:solid;border-color:#1a7aa7;border-collapse:collapse;width:100%;height:100%;overflow:auto;flex-wrap:wrap;cursor:pointer;padding:5px;margin-left:0%;display:block}#pje-mais-r-tabelaEtiquetasMaisUsadas tbody tr:nth-child(even){background-color:#ebf0f3}#pje-mais-r-tabelaEtiquetasMaisUsadas tbody tr:nth-child(even):hover td:nth-child(2){background-color:#abdae2}#pje-mais-r-tabelaEtiquetasMaisUsadas td{padding:4px;border:1px #ccc solid}#avj-menu-tabela tr:hover td:nth-child(2),#pje-mais-r-tabelaEtiquetasMaisUsadas tr:hover td:nth-child(2){background-color:#abdae2}#pje-mais-r-b{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzY2NiIgc3Ryb2tlPSJub25lIiBkPSJNIDMuNSAyMC41IFEgNC4wNSAxOS45NSA0LjA1IDE5LjIgTCA0LjA1IDE4LjggMS45NSAxOC44IDEuOTUgMjEuMDUgMi4yIDIxLjA1IFEgMi45NSAyMS4wNSAzLjUgMjAuNSBNIDE0LjU1IDMgUSAxMy43IDMgMTMuMDUgMy42NSAxMi40NSA0LjI1IDEyLjQ1IDUuMSBMIDEyLjQ1IDE0LjU1IFEgMTIuNDUgMTUuMzUgMTIuMDUgMTUuOCAxMS42NSAxNi40IDEwLjggMTYuNCAxMC4yIDE2LjQgOS44IDE2Ljc1IDkuNCAxNy4xNSA5LjMgMTcuNyA5LjMgMTcuOSA5LjQgMTguMDUgOS41IDE4LjIgOS43IDE4LjI1IDEwLjI1IDE4LjQgMTAuOCAxOC40IDEyLjc1IDE4LjQgMTMuNyAxNy4yIDE0LjUgMTYuMjUgMTQuNTUgMTQuNzUgTCAxNC41NSAzIE0gMTEuMzUgMTEuNiBRIDExLjM1IDkuODUgMTAuMzUgOC43IDkuMjUgNy4zNSA3LjIgNy4zNSBMIDIuOCA3LjM1IFEgMi40NSA3LjM1IDIuMiA3LjYgMS45NSA3Ljg1IDEuOTUgOC4xNSBMIDEuOTUgMTAuOCA0LjA1IDEwLjggNC4wNSA5LjQ1IDcuMSA5LjQ1IFEgOC4wNSA5LjQ1IDguNTUgMTAuMTUgOSAxMC43NSA5IDExLjYgOSAxMi41IDguNTUgMTMuMSA4LjA1IDEzLjc1IDcuMSAxMy43NSBMIDcgMTMuNzUgNyAxNS44NSA3LjIgMTUuODUgUSA5LjI1IDE1Ljg1IDEwLjM1IDE0LjU1IDExLjM1IDEzLjM1IDExLjM1IDExLjYgWiIvPjxwYXRoIGZpbGw9IiNFOTU3MUUiIGQ9Ik0gNC44NSAxNi42NSBMIDQuODUgMTguMTUgNy4xNSAyMC40NSBRIDcuNSAyMC43NSA3LjkgMjAuOSA4LjI1IDIxLjA1IDguNjUgMjEuMDUgOC45NSAyMS4wNSA5LjIgMjEgOS43IDIwLjg1IDEwLjEgMjAuNDUgTCAxMC4xNSAyMC40NSA2LjM1IDE2LjY1IDQuODUgMTYuNjUgTSAyMy4zNSAxNC45IFEgMjQuMDUgMTQuODUgMjQuMDUgMTQuMTUgMjQuMDUgMTIuMyAyMi44NSAxMS4xNSAyMS43IDEwLjA1IDE5Ljk1IDEwLjA1IDE4LjIgMTAuMDUgMTcgMTEuMTUgMTUuNzUgMTIuMzUgMTUuNzUgMTQuMiAxNS43NSAxNi4wNSAxNi45NSAxNy4yNSAxOC4xNSAxOC40IDE5Ljk1IDE4LjQgMjEuNiAxOC40IDIyLjggMTcuNDUgTCAyMyAxNy4zIFEgMjMuMiAxNyAyMy4xNSAxNi42NSAyMy4xIDE2LjI1IDIyLjggMTYuMDUgMjIuNiAxNS44NSAyMi4zIDE1Ljg1IDIyLjA1IDE1Ljg1IDIxLjg1IDE2LjA1IDIxLjA1IDE2LjYgMjAuMDUgMTYuNiAxOS4xNSAxNi42IDE4LjYgMTYuMTUgMTggMTUuNzUgMTcuOCAxNC45IEwgMjMuMzUgMTQuOSBNIDIxLjQgMTIuMjUgUSAyMS45NSAxMi43IDIyLjA1IDEzLjUgTCAxNy44IDEzLjUgUSAxOC4xNSAxMS44IDE5Ljk1IDExLjggMjAuODUgMTEuOCAyMS40IDEyLjI1IFoiLz48cGF0aCBmaWxsPSIjMUVCMEU5IiBkPSJNIDQuMDUgMTEuODUgTCAxLjk1IDExLjg1IDEuOTUgMTMuNzUgMC4wNSAxMy43NSAwLjA1IDE1Ljg1IDEuOTUgMTUuODUgMS45NSAxNy44IDQuMDUgMTcuOCA0LjA1IDE1Ljg1IDYgMTUuODUgNiAxMy43NSA0LjA1IDEzLjc1IDQuMDUgMTEuODUgWiIvPjwvc3ZnPg==)}#pje-mais-r-icone-robo{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzY2NiIgc3Ryb2tlPSJub25lIiBkPSJNIDMuNSAyMC41IFEgNC4wNSAxOS45NSA0LjA1IDE5LjIgTCA0LjA1IDE4LjggMS45NSAxOC44IDEuOTUgMjEuMDUgMi4yIDIxLjA1IFEgMi45NSAyMS4wNSAzLjUgMjAuNSBNIDE0LjU1IDMgUSAxMy43IDMgMTMuMDUgMy42NSAxMi40NSA0LjI1IDEyLjQ1IDUuMSBMIDEyLjQ1IDE0LjU1IFEgMTIuNDUgMTUuMzUgMTIuMDUgMTUuOCAxMS42NSAxNi40IDEwLjggMTYuNCAxMC4yIDE2LjQgOS44IDE2Ljc1IDkuNCAxNy4xNSA5LjMgMTcuNyA5LjMgMTcuOSA5LjQgMTguMDUgOS41IDE4LjIgOS43IDE4LjI1IDEwLjI1IDE4LjQgMTAuOCAxOC40IDEyLjc1IDE4LjQgMTMuNyAxNy4yIDE0LjUgMTYuMjUgMTQuNTUgMTQuNzUgTCAxNC41NSAzIE0gMTEuMzUgMTEuNiBRIDExLjM1IDkuODUgMTAuMzUgOC43IDkuMjUgNy4zNSA3LjIgNy4zNSBMIDIuOCA3LjM1IFEgMi40NSA3LjM1IDIuMiA3LjYgMS45NSA3Ljg1IDEuOTUgOC4xNSBMIDEuOTUgMTAuOCA0LjA1IDEwLjggNC4wNSA5LjQ1IDcuMSA5LjQ1IFEgOC4wNSA5LjQ1IDguNTUgMTAuMTUgOSAxMC43NSA5IDExLjYgOSAxMi41IDguNTUgMTMuMSA4LjA1IDEzLjc1IDcuMSAxMy43NSBMIDcgMTMuNzUgNyAxNS44NSA3LjIgMTUuODUgUSA5LjI1IDE1Ljg1IDEwLjM1IDE0LjU1IDExLjM1IDEzLjM1IDExLjM1IDExLjYgWiIvPjxwYXRoIGZpbGw9IiNFOTU3MUUiIGQ9Ik0gNC44NSAxNi42NSBMIDQuODUgMTguMTUgNy4xNSAyMC40NSBRIDcuNSAyMC43NSA3LjkgMjAuOSA4LjI1IDIxLjA1IDguNjUgMjEuMDUgOC45NSAyMS4wNSA5LjIgMjEgOS43IDIwLjg1IDEwLjEgMjAuNDUgTCAxMC4xNSAyMC40NSA2LjM1IDE2LjY1IDQuODUgMTYuNjUgTSAyMy4zNSAxNC45IFEgMjQuMDUgMTQuODUgMjQuMDUgMTQuMTUgMjQuMDUgMTIuMyAyMi44NSAxMS4xNSAyMS43IDEwLjA1IDE5Ljk1IDEwLjA1IDE4LjIgMTAuMDUgMTcgMTEuMTUgMTUuNzUgMTIuMzUgMTUuNzUgMTQuMiAxNS43NSAxNi4wNSAxNi45NSAxNy4yNSAxOC4xNSAxOC40IDE5Ljk1IDE4LjQgMjEuNiAxOC40IDIyLjggMTcuNDUgTCAyMyAxNy4zIFEgMjMuMiAxNyAyMy4xNSAxNi42NSAyMy4xIDE2LjI1IDIyLjggMTYuMDUgMjIuNiAxNS44NSAyMi4zIDE1Ljg1IDIyLjA1IDE1Ljg1IDIxLjg1IDE2LjA1IDIxLjA1IDE2LjYgMjAuMDUgMTYuNiAxOS4xNSAxNi42IDE4LjYgMTYuMTUgMTggMTUuNzUgMTcuOCAxNC45IEwgMjMuMzUgMTQuOSBNIDIxLjQgMTIuMjUgUSAyMS45NSAxMi43IDIyLjA1IDEzLjUgTCAxNy44IDEzLjUgUSAxOC4xNSAxMS44IDE5Ljk1IDExLjggMjAuODUgMTEuOCAyMS40IDEyLjI1IFoiLz48cGF0aCBmaWxsPSIjMUVCMEU5IiBkPSJNIDQuMDUgMTEuODUgTCAxLjk1IDExLjg1IDEuOTUgMTMuNzUgMC4wNSAxMy43NSAwLjA1IDE1Ljg1IDEuOTUgMTUuODUgMS45NSAxNy44IDQuMDUgMTcuOCA0LjA1IDE1Ljg1IDYgMTUuODUgNiAxMy43NSA0LjA1IDEzLjc1IDQuMDUgMTEuODUgWiIvPjwvc3ZnPg==)}#pje-mais-r-icone-robo:hover{scale:125%}div.anexos a[name^=divTimeLine]:hover{background:rgb(223,230,230)}#pje-mais-r-icone{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzY2NiIgc3Ryb2tlPSJub25lIiBkPSJNIDMuNSAyMC41IFEgNC4wNSAxOS45NSA0LjA1IDE5LjIgTCA0LjA1IDE4LjggMS45NSAxOC44IDEuOTUgMjEuMDUgMi4yIDIxLjA1IFEgMi45NSAyMS4wNSAzLjUgMjAuNSBNIDE0LjU1IDMgUSAxMy43IDMgMTMuMDUgMy42NSAxMi40NSA0LjI1IDEyLjQ1IDUuMSBMIDEyLjQ1IDE0LjU1IFEgMTIuNDUgMTUuMzUgMTIuMDUgMTUuOCAxMS42NSAxNi40IDEwLjggMTYuNCAxMC4yIDE2LjQgOS44IDE2Ljc1IDkuNCAxNy4xNSA5LjMgMTcuNyA5LjMgMTcuOSA5LjQgMTguMDUgOS41IDE4LjIgOS43IDE4LjI1IDEwLjI1IDE4LjQgMTAuOCAxOC40IDEyLjc1IDE4LjQgMTMuNyAxNy4yIDE0LjUgMTYuMjUgMTQuNTUgMTQuNzUgTCAxNC41NSAzIE0gMTEuMzUgMTEuNiBRIDExLjM1IDkuODUgMTAuMzUgOC43IDkuMjUgNy4zNSA3LjIgNy4zNSBMIDIuOCA3LjM1IFEgMi40NSA3LjM1IDIuMiA3LjYgMS45NSA3Ljg1IDEuOTUgOC4xNSBMIDEuOTUgMTAuOCA0LjA1IDEwLjggNC4wNSA5LjQ1IDcuMSA5LjQ1IFEgOC4wNSA5LjQ1IDguNTUgMTAuMTUgOSAxMC43NSA5IDExLjYgOSAxMi41IDguNTUgMTMuMSA4LjA1IDEzLjc1IDcuMSAxMy43NSBMIDcgMTMuNzUgNyAxNS44NSA3LjIgMTUuODUgUSA5LjI1IDE1Ljg1IDEwLjM1IDE0LjU1IDExLjM1IDEzLjM1IDExLjM1IDExLjYgWiIvPjxwYXRoIGZpbGw9IiNFOTU3MUUiIGQ9Ik0gNC44NSAxNi42NSBMIDQuODUgMTguMTUgNy4xNSAyMC40NSBRIDcuNSAyMC43NSA3LjkgMjAuOSA4LjI1IDIxLjA1IDguNjUgMjEuMDUgOC45NSAyMS4wNSA5LjIgMjEgOS43IDIwLjg1IDEwLjEgMjAuNDUgTCAxMC4xNSAyMC40NSA2LjM1IDE2LjY1IDQuODUgMTYuNjUgTSAyMy4zNSAxNC45IFEgMjQuMDUgMTQuODUgMjQuMDUgMTQuMTUgMjQuMDUgMTIuMyAyMi44NSAxMS4xNSAyMS43IDEwLjA1IDE5Ljk1IDEwLjA1IDE4LjIgMTAuMDUgMTcgMTEuMTUgMTUuNzUgMTIuMzUgMTUuNzUgMTQuMiAxNS43NSAxNi4wNSAxNi45NSAxNy4yNSAxOC4xNSAxOC40IDE5Ljk1IDE4LjQgMjEuNiAxOC40IDIyLjggMTcuNDUgTCAyMyAxNy4zIFEgMjMuMiAxNyAyMy4xNSAxNi42NSAyMy4xIDE2LjI1IDIyLjggMTYuMDUgMjIuNiAxNS44NSAyMi4zIDE1Ljg1IDIyLjA1IDE1Ljg1IDIxLjg1IDE2LjA1IDIxLjA1IDE2LjYgMjAuMDUgMTYuNiAxOS4xNSAxNi42IDE4LjYgMTYuMTUgMTggMTUuNzUgMTcuOCAxNC45IEwgMjMuMzUgMTQuOSBNIDIxLjQgMTIuMjUgUSAyMS45NSAxMi43IDIyLjA1IDEzLjUgTCAxNy44IDEzLjUgUSAxOC4xNSAxMS44IDE5Ljk1IDExLjggMjAuODUgMTEuOCAyMS40IDEyLjI1IFoiLz48cGF0aCBmaWxsPSIjMUVCMEU5IiBkPSJNIDQuMDUgMTEuODUgTCAxLjk1IDExLjg1IDEuOTUgMTMuNzUgMC4wNSAxMy43NSAwLjA1IDE1Ljg1IDEuOTUgMTUuODUgMS45NSAxNy44IDQuMDUgMTcuOCA0LjA1IDE1Ljg1IDYgMTUuODUgNiAxMy43NSA0LjA1IDEzLjc1IDQuMDUgMTEuODUgWiIvPjwvc3ZnPg==)}#pje-mais-r-youtube{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjIuNzUgNC45cS0uNi0uNi0xLjM1LS44LTEuMi0uMy01LjQtLjQ1LTEuMyAwLTIuOC0uMDVIMTJxLTEuODUgMC00IC4wNS00LjIuMTUtNS4zNS40NS0uOC4yLTEuMzUuOC0uNi41NS0uOCAxLjM1US4yIDcuNC4wNSA5Ljg1IDAgMTEuMDUgMCAxMi4wNXYuNjVxLjA1LjguMDUgMS41NS4xNSAyLjQ1LjQ1IDMuNi4yLjguOCAxLjM1LjU1LjU1IDEuMzUuNzUgMS4xNS4zIDUuMzUuNDUgMi4xNS4wNSA0IC4wNWgxLjJxMS41IDAgMi44LS4wNSA0LjItLjE1IDUuNC0uNDUuNzUtLjIgMS4zNS0uNzUuNTUtLjU1Ljc1LTEuMzUuMy0xLjE1LjQ1LTMuNi4wNS0uNzUuMDUtMS41NXYtLjY1cTAtMS0uMDUtMi4yLS4xNS0yLjQ1LS40NS0zLjYtLjItLjgtLjc1LTEuMzVNOS41NSA4LjVsNi4yNSAzLjU1LTYuMjUgMy41NVY4LjVaIi8+PC9zdmc+Cg==);display:flex;float:right}#pje-mais-r-menu-hanburgue-opcoes{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);line-height:1.42857143;font-family:Open Sans regular,Arial,Verdana,sans-serif;color:#454545;box-sizing:border-box;position:absolute;top:100%;z-index:1000;float:left;min-width:160px;padding:5px 0;margin:0;font-size:14px;text-align:left;list-style:none;background-color:#02638d;background-clip:padding-box;border-radius:0 0 4px 4px;box-shadow:0 6px 12px #0000002d;border:0;transform-origin:top;animation-fill-mode:forwards;transition:all .2s linear;opacity:1;visibility:visible;transform:scale(1);display:table;width:100%;left:0;right:0}#pje-mais-r-menu-hanburgue-opcoes li{margin:0 10px}#pje-mais-r-menu-hanburgue-opcoes a{text-decoration:none;color:#fff;font-weight:700;padding:5px;border-radius:5px;transition:background-color .3s}#pje-mais-r-menu-hanburgue-opcoes a:hover{background-color:#c5ece1;color:#000}
`, zr = `.fa-sticky-note{background:#b32006!important;color:#f57f17!important}.fa-sticky-note:hover{transform:scale(125%)}.lembrete{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;list-style-type:none;font:inherit;text-align:center;white-space:nowrap;cursor:pointer;user-select:none;text-transform:uppercase;background:rgb(245,127,23)!important;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;font-size:1.33333em;line-height:.75em;vertical-align:-.0667em;font-family:"Font Awesome 5 Free";font-weight:900;box-sizing:border-box;width:18px;height:18px;top:20px;padding:5px}[title-pje-mais-r]{position:relative}[title-pje-mais-r]:hover:before{animation:aparecer .1s ease-out 0s 1 both;border-radius:10px;content:attr(title-pje-mais-r);background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzY2NiIgc3Ryb2tlPSJub25lIiBkPSJNIDMuNSAyMC41IFEgNC4wNSAxOS45NSA0LjA1IDE5LjIgTCA0LjA1IDE4LjggMS45NSAxOC44IDEuOTUgMjEuMDUgMi4yIDIxLjA1IFEgMi45NSAyMS4wNSAzLjUgMjAuNSBNIDE0LjU1IDMgUSAxMy43IDMgMTMuMDUgMy42NSAxMi40NSA0LjI1IDEyLjQ1IDUuMSBMIDEyLjQ1IDE0LjU1IFEgMTIuNDUgMTUuMzUgMTIuMDUgMTUuOCAxMS42NSAxNi40IDEwLjggMTYuNCAxMC4yIDE2LjQgOS44IDE2Ljc1IDkuNCAxNy4xNSA5LjMgMTcuNyA5LjMgMTcuOSA5LjQgMTguMDUgOS41IDE4LjIgOS43IDE4LjI1IDEwLjI1IDE4LjQgMTAuOCAxOC40IDEyLjc1IDE4LjQgMTMuNyAxNy4yIDE0LjUgMTYuMjUgMTQuNTUgMTQuNzUgTCAxNC41NSAzIE0gMTEuMzUgMTEuNiBRIDExLjM1IDkuODUgMTAuMzUgOC43IDkuMjUgNy4zNSA3LjIgNy4zNSBMIDIuOCA3LjM1IFEgMi40NSA3LjM1IDIuMiA3LjYgMS45NSA3Ljg1IDEuOTUgOC4xNSBMIDEuOTUgMTAuOCA0LjA1IDEwLjggNC4wNSA5LjQ1IDcuMSA5LjQ1IFEgOC4wNSA5LjQ1IDguNTUgMTAuMTUgOSAxMC43NSA5IDExLjYgOSAxMi41IDguNTUgMTMuMSA4LjA1IDEzLjc1IDcuMSAxMy43NSBMIDcgMTMuNzUgNyAxNS44NSA3LjIgMTUuODUgUSA5LjI1IDE1Ljg1IDEwLjM1IDE0LjU1IDExLjM1IDEzLjM1IDExLjM1IDExLjYgWiIvPjxwYXRoIGZpbGw9IiNFOTU3MUUiIGQ9Ik0gNC44NSAxNi42NSBMIDQuODUgMTguMTUgNy4xNSAyMC40NSBRIDcuNSAyMC43NSA3LjkgMjAuOSA4LjI1IDIxLjA1IDguNjUgMjEuMDUgOC45NSAyMS4wNSA5LjIgMjEgOS43IDIwLjg1IDEwLjEgMjAuNDUgTCAxMC4xNSAyMC40NSA2LjM1IDE2LjY1IDQuODUgMTYuNjUgTSAyMy4zNSAxNC45IFEgMjQuMDUgMTQuODUgMjQuMDUgMTQuMTUgMjQuMDUgMTIuMyAyMi44NSAxMS4xNSAyMS43IDEwLjA1IDE5Ljk1IDEwLjA1IDE4LjIgMTAuMDUgMTcgMTEuMTUgMTUuNzUgMTIuMzUgMTUuNzUgMTQuMiAxNS43NSAxNi4wNSAxNi45NSAxNy4yNSAxOC4xNSAxOC40IDE5Ljk1IDE4LjQgMjEuNiAxOC40IDIyLjggMTcuNDUgTCAyMyAxNy4zIFEgMjMuMiAxNyAyMy4xNSAxNi42NSAyMy4xIDE2LjI1IDIyLjggMTYuMDUgMjIuNiAxNS44NSAyMi4zIDE1Ljg1IDIyLjA1IDE1Ljg1IDIxLjg1IDE2LjA1IDIxLjA1IDE2LjYgMjAuMDUgMTYuNiAxOS4xNSAxNi42IDE4LjYgMTYuMTUgMTggMTUuNzUgMTcuOCAxNC45IEwgMjMuMzUgMTQuOSBNIDIxLjQgMTIuMjUgUSAyMS45NSAxMi43IDIyLjA1IDEzLjUgTCAxNy44IDEzLjUgUSAxOC4xNSAxMS44IDE5Ljk1IDExLjggMjAuODUgMTEuOCAyMS40IDEyLjI1IFoiLz48cGF0aCBmaWxsPSIjMUVCMEU5IiBkPSJNIDQuMDUgMTEuODUgTCAxLjk1IDExLjg1IDEuOTUgMTMuNzUgMC4wNSAxMy43NSAwLjA1IDE1Ljg1IDEuOTUgMTUuODUgMS45NSAxNy44IDQuMDUgMTcuOCA0LjA1IDE1Ljg1IDYgMTUuODUgNiAxMy43NSA0LjA1IDEzLjc1IDQuMDUgMTEuODUgWiIvPjwvc3ZnPg==) no-repeat right bottom;background-size:35px 25px;background-color:#ebf0f3;color:#000;border-style:groove;border-color:#09c7bd;top:70px;left:calc(50% - 15vw);display:flex;overflow:hidden;font-size:16px;font-weight:300;padding:10px;position:absolute;text-align:left;text-transform:none;white-space:pre-line;z-index:10009;width:450px;height:auto}
`, fr = `.pmr-datasProcesso{display:inline-grid;vertical-align:middle}i[pmr-proc-data-mov],i[pmr-proc-data-task]{margin-right:3px;font-size:90%}.flag-decurso-tempo-tarefa-verde{background:#aff1af;color:#000;font-weight:700;border-radius:.25em;padding-left:3px;padding-right:3px}.flag-decurso-tempo-tarefa-amarelo{background:#fff38a;color:#000;font-weight:700;border-radius:.25em;padding-left:3px;padding-right:3px}.flag-decurso-tempo-tarefa-vermelho{background:#a94442;color:#fff;font-weight:700;border-radius:.25em;padding-left:3px;padding-right:3px}i.i-animacao{font-size:.1em;opacity:0;transition:font-size .15s ease-in-out,opacity .15s ease-in-out}i.i-animacao-in{font-size:1em;opacity:1;transition:font-size .35s ease-in-out,opacity .35s ease-in-out}i.i-animacao-out{font-size:.1em;opacity:0}div>.tarefa-numero-processo[pmr-np-destaque]{font-size:18px!important}div>.tarefa-numero-processo[pmr-np-destaque] i[pmr-np-copiar]{font-size:14px}i[pmr-np-copiar]{cursor:copy;color:#ff8b22;padding-left:5px}processo-datalist-card .label.label-info.label-etiqueta[pmr-cor-padrao-etiqueta]:not([style]){color:#000;background:#f6d290;border-radius:.25em}div[pmr-e-prioridade]{background:linear-gradient(45deg,#a9444229,white)}div[pmr-e-prioridade] i.fa.fa-exclamation-triangle,div[pmr-destaque-selecionado] i.fa.fa-exclamation-triangle{color:#f7c600;text-shadow:-3.3px 2px 0 black,1px 2px 0 black,-1px -2.1px 0 black,2.9px 2px 0 black,-.2px -3.5px 0 black}i[pmr-e-prioridade]{color:#a94442}i[pmr-recolhedor-cartao]{position:absolute;bottom:0;right:0;cursor:pointer;color:#ff8b22;font-size:14px;border-radius:50%;padding:2px;border:solid 1px}processo-datalist-card i.fa-chevron-up[pmr-esta-recolhido]{transform:rotate(180deg);transition:transform .5s ease-in-out}processo-datalist-card i.fa-chevron-up:not([pmr-esta-recolhido]){transform:rotate(0);transition:transform .5s ease-in-out}processo-datalist-card i.i-animacao-in{font-size:14px}div.datalist-content.selecionado[pmr-destaque-selecionado]{background:rgb(243 255 238);border-left:3px solid #48ce35}div.datalist-content.selecionado[pmr-destaque-selecionado]:hover{background:rgb(227 244 220);border-left:3px solid #48ce35}div.datalist-content.selecionado .tarefa-numero-processo[pmr-destaque-selecionado]{color:#227b15}.tarefa-numero-processo.text-danger{font-size:14px!important}
`, mr = `[pmr-mapa-calor-montador-container]{display:block!important}div.menuItem[pmr-mapadecalornopainelusuario][pmr-mc-montado]{transition:background-blend-mode .5s ease;background-size:contain;background-blend-mode:overlay}div.menuItem[pmr-mapadecalornopainelusuario][pmr-mc-montado]:hover{background-blend-mode:screen!important}div.menuItem[pmr-mapadecalornopainelusuario][pmr-mc-montado] a:hover{background:transparent!important}div.menuItem[pmr-mapadecalornopainelusuario][pmr-mc-barra-minima]{background-repeat:no-repeat;background-position:center bottom;background-size:100% 4px}div[pmr-mapa-calor-montador-container]{position:relative;margin-top:20px;padding-bottom:80px;z-index:2000}@media (min-width: 992px){div[pmr-mapa-calor-montador-container]{position:absolute;bottom:0;padding-bottom:25px;z-index:2000}}[pmr-mapa-calor-montador-container] button{top:12px;height:35px}[pmr-mapa-calor-montador-container] button:first-child{padding-left:8px;padding-right:8px}[pmr-mapa-calor-montador-container] button.btn-primary{background-color:#ff912c!important;font-weight:700;color:#fff}[pmr-mapa-calor-montador-container] button.btn-secondary[pmr-mc-but-on]{background:rgb(255 223 194)!important}[pmr-mapa-calor-montador-container] svg{height:100%}[pmr-mapa-calor-montador-container][pmr-mc-montado=false] button[pmr-mc-but-off],[pmr-mapa-calor-montador-container][pmr-mc-montado=true] button[pmr-mc-but-on]{display:none}[pmr-mapa-calor-montador-container][pmr-mc-montado=true] button[pmr-mc-but-off]{border-color:#ff912c;margin-left:unset}[pmr-mapa-calor-montador-container][pmr-mc-montado=true] button:first-child,[pmr-mapa-calor-montador-container] button.pmr-outline{border-color:#ff912c}[pmr-mapa-calor-montador-container][pmr-mc-montado=true] [pmr-mc-info-sem-suporte]{display:unset}[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando] [pmr-mc-info-sem-suporte]{display:flex}[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando] #pmr-info-sem-suporte{display:flex!important}[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando] #pmr-mc-info-text [prm-info-ultimo-mov],[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando] button[pmr-mc-but-off]{display:none}[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando][pmr-executando] button[pmr-mc-but-off]{display:unset}[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando] button[pmr-mc-but-on],[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando] button[pmr-mc-but-atualiz]{display:none}[pmr-mapa-calor-montador-container][pmr-mc-montado=requisitando-e-processando]:not([pmr-executando]) button[pmr-mc-but-desbloq]{display:unset!important}[pmr-mapa-calor-montador-container][pmr-mc-montado=true] button[pmr-mc-but-atualiz]{display:unset!important}#pmr-info-sem-suporte{margin-top:5px;background-color:#f0f0f0;border-radius:5px;padding:2px 15px}[pmr-mapa-calor-montador-container] .ui-progressbar-value-animate{background:rgb(255 145 44)!important}[pmr-mapa-calor-montador-container] .pmr-icon-button{cursor:pointer;transition:all .5s}[pmr-mapa-calor-montador-container] .pmr-icon-button i{padding-right:0;transition:all .5s}[pmr-mapa-calor-montador-container] .pmr-icon-button .button-text{position:absolute;transition:left .3s}[pmr-mapa-calor-montador-container] .pmr-icon-button .button-text{opacity:0;transition:opacity .6s ease}[pmr-mapa-calor-montador-container] .pmr-icon-button:hover .button-text{opacity:1}[pmr-mapa-calor-montador-container] .pmr-icon-button:hover i{padding-right:8px}[pmr-mapa-calor-montador-container] .pmr-icon-button[pmr-mc-but-atualiz]:hover{padding-right:85px}[pmr-mapa-calor-montador-container] .pmr-icon-button[pmr-mc-but-desbloq]:hover{padding-right:118px}[pmr-mc-spinner] .loaderWrapper{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;display:block;background:rgba(0,0,0,.5);cursor:progress}[pmr-mc-spinner] .position{position:relative;top:calc(100vh/3);bottom:0;left:0;right:0;margin:auto}[pmr-mc-spinner] .mat-progress-spinner{display:block;position:relative}[pmr-mc-spinner] .mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}[pmr-mc-spinner] .mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}[pmr-mc-spinner] ._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}[pmr-mc-spinner] .mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:pmr-mc-mat-progress-spinner-linear-rotate 2s linear infinite}[pmr-mc-spinner] ._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}[pmr-mc-spinner] .mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4s;animation-timing-function:cubic-bezier(.35,0,.25,1);animation-iteration-count:infinite}[pmr-mc-spinner] ._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}[pmr-mc-spinner] .mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:pmr-mc-mat-progress-spinner-stroke-rotate-fallback 10s cubic-bezier(.87,.03,.33,1) infinite}[pmr-mc-spinner] ._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}[pmr-mc-spinner] .mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}[pmr-mc-spinner] ._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}[pmr-mc-spinner] .mat-progress-spinner circle,[pmr-mc-spinner] .mat-spinner circle{stroke:#ff912c}@keyframes pmr-mc-mat-progress-spinner-linear-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes pmr-mc-mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.60617px;transform:rotate(0)}12.5%{stroke-dashoffset:56.54867px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.60617px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.54867px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.60617px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.54867px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.60617px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.54867px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.54867px;transform:rotateX(180deg) rotate(341.5deg)}to{stroke-dashoffset:268.60617px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes pmr-mc-mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}to{transform:rotate(4680deg)}}
`;
function Ci(e, t, r) {
  !t || !r || r.match(jt.HREFS.ROOT) && new en(e, t).definir();
}
const ke = class {
  constructor(t, r) {
    de(this, "v3", $o().manifest_version === 3);
    de(this, "tabId");
    de(this, "ativada");
    de(this, "tema");
    de(this, "maisEspaco");
    de(this, "ajustesGerais");
    de(this, "ultimasEtiquetasUsadaTarefa");
    de(this, "melhorarCartaoTarefa");
    de(this, "mapaDeCalorPainelUsuario");
    de(this, "destacarLembretes");
    this.tabId = r;
    const {
      ativada: n,
      tema: o,
      ajustesGerais: a,
      maisEspaco: s,
      ultimasEtiquetasUsadaTarefa: i,
      destacarLembretes: c,
      melhorarCartaoTarefa: u,
      mapaDeCalorPainelUsuario: l
    } = t;
    this.ativada = n, this.ajustesGerais = a, this.tema = o, this.maisEspaco = s, this.ultimasEtiquetasUsadaTarefa = i, this.melhorarCartaoTarefa = u, this.mapaDeCalorPainelUsuario = l, this.destacarLembretes = c;
  }
  injetarCSS() {
    this.tabId && (this.ajustesGerais && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: Kn
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: Kn,
      runAt: "document_start"
    })), (this.tema === Ye.ESCURO || this.tema === Ye.ALTO_CONTRASTE) && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: ke.temas[this.tema]
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: ke.temas[this.tema],
      runAt: "document_start"
    })), this.maisEspaco && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: ke.temas[Ye.MAIS_ESPACO]
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: ke.temas[Ye.MAIS_ESPACO],
      runAt: "document_start"
    })), this.ultimasEtiquetasUsadaTarefa && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: gr
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: gr,
      runAt: "document_start"
    })), this.melhorarCartaoTarefa && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: fr
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: fr,
      runAt: "document_start"
    })), this.mapaDeCalorPainelUsuario && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: mr
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: mr,
      runAt: "document_start"
    })), this.destacarLembretes && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: zr
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: zr,
      runAt: "document_start"
    })), this.ativada && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: dr
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: dr,
      runAt: "document_start"
    })));
  }
  removerCSS() {
    this.tabId && (this.v3 ? (E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: ke.temas[Ye.ESCURO]
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: ke.temas[Ye.ALTO_CONTRASTE]
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: ke.temas[Ye.MAIS_ESPACO]
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: ke.temas[Ye.AJUSTES_GERAIS]
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: gr
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: dr
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: fr
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: mr
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: zr
    })) : (E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: ke.temas[Ye.ESCURO]
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: ke.temas[Ye.ALTO_CONTRASTE]
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: ke.temas[Ye.MAIS_ESPACO]
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: gr
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: dr
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: fr
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: mr
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: zr
    })));
  }
  definir() {
    this.removerCSS(), this.ativada && this.injetarCSS();
  }
};
let en = ke;
de(en, "temas", {
  ajustes_gerais: Kn,
  alto_contraste: zl,
  escuro: Hl,
  mais_espaco: Zl,
  ultimasEtiquetasUsadaTarefa: gr,
  estilo_geral: dr,
  melhorarCartaoTarefa: fr,
  mapaDeCalorPainelUsuario: mr
});
const Yl = `li.ng-star-inserted>processo-datalist-card:nth-child(1)>div:nth-child(1)>div:nth-child(3)>a:nth-child(1)>span{text-align:right}span.orgao.col-sm-12.no-padding{display:none}span.local.col-sm-12.no-padding{display:none;text-align:right}span.local.col-sm-12.no-padding.ng-star-inserted{display:block;text-align:left}
`, Wl = `li.ng-star-inserted>processo-datalist-card:nth-child(1)>div:nth-child(1)>div:nth-child(3)>a:nth-child(1)>span{text-align:right}span.orgao.col-sm-12.no-padding{float:right;width:162px;font-size:10px;font-family:monospace,monospace;line-height:100%;white-space:pre;overflow:hidden;direction:rtl}span.local.col-sm-12.no-padding{text-align:right}span.local.col-sm-12.no-padding.ng-star-inserted{text-align:left}
`, Jl = `.row.icones{display:block}span.orgao.col-sm-12.no-padding,span.local.col-sm-12.no-padding{display:none}.datalist-content{position:sticky;flex-flow:column wrap}.datalist-content.selecionado .selecionarProcesso{outline:none}.datalist-content.selecionado>.row.icones{display:block}.datalist-content.selecionado span.orgao.col-sm-12.no-padding,.datalist-content.selecionado span.local.col-sm-12.no-padding{display:block}.ui-paginator-bottom{position:static}
`, ql = `.row.icones{display:block}span.orgao.col-sm-12.no-padding,span.local.col-sm-12.no-padding,span.local.col-sm-12.no-padding.ng-star-inserted{display:none}.datalist-content{position:sticky;flex-flow:column wrap}.datalist-content.selecionado .selecionarProcesso{outline:none}.datalist-content.selecionado>.row.icones{display:block}.datalist-content.selecionado span.orgao.col-sm-12.no-padding,.datalist-content.selecionado span.local.col-sm-12.no-padding{display:none}.datalist-content.selecionado span.local.col-sm-12.no-padding.ng-star-inserted{display:block}.ui-paginator-bottom{position:static}
`;
function bi(e, t, r) {
  !t || !r || r.match(jt.HREFS.ROOT) && new tn(e, t).definir();
}
const Le = class {
  constructor(t, r) {
    //static vCartoes: Record<string, string> = { alternar_linhas, minimo }
    de(this, "v3", $o().manifest_version === 3);
    de(this, "tabId");
    de(this, "ativada");
    de(this, "inativarCartao");
    de(this, "cartaoProcesso");
    this.tabId = r;
    const { ativada: n, cartaoProcesso: o, inativaCartao: a } = t;
    this.ativada = n, this.cartaoProcesso = o, this.inativarCartao = a;
  }
  injetarCSS() {
    if (this.tabId && ((this.cartaoProcesso === It.ALTERNAR_LINHAS || this.cartaoProcesso === It.MINIMO) && (this.v3 ? E.scripting.insertCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: Le.cartoes[this.cartaoProcesso]
    }) : E.tabs.insertCSS(this.tabId, {
      allFrames: !0,
      code: Le.cartoes[this.cartaoProcesso],
      runAt: "document_start"
    })), this.inativarCartao)) {
      const t = this.cartaoProcesso !== It.MINIMO ? Le.cartoes.cartao_inativo : Le.cartoes.cartao_inativo_minimo;
      this.v3 ? E.scripting.insertCSS({
        target: { tabId: this.tabId, allFrames: !0 },
        css: t
      }) : E.tabs.insertCSS(this.tabId, {
        allFrames: !0,
        code: t,
        runAt: "document_start"
      });
    }
  }
  removerCSS() {
    this.tabId && (this.v3 ? (E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: Le.cartoes[It.MINIMO]
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: Le.cartoes[It.ALTERNAR_LINHAS]
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: Le.cartoes.cartao_inativo
    }), E.scripting.removeCSS({
      target: { tabId: this.tabId, allFrames: !0 },
      css: Le.cartoes.cartao_inativo_minimo
    })) : (E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: Le.cartoes[It.MINIMO]
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: Le.cartoes[It.ALTERNAR_LINHAS]
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: Le.cartoes.cartao_inativo
    }), E.tabs.removeCSS(this.tabId, {
      allFrames: !0,
      code: Le.cartoes.cartao_inativo_minimo
    })));
  }
  definir() {
    this.removerCSS(), this.ativada && this.injetarCSS();
  }
};
let tn = Le;
de(tn, "cartoes", {
  minimo: Yl,
  alternar_linhas: Wl,
  cartao_inativo: Jl,
  cartao_inativo_minimo: ql
});
function Gl(e) {
  const { manifest_version: t } = $o(), r = t === 3 ? "action" : "browserAction";
  e ? E[r].setBadgeText({ text: "" }) : (E[r].setBadgeText({ text: "X" }), E[r].setBadgeBackgroundColor({ color: "#B71C1C" }));
}
var Yt = {}, Ql = {
  get exports() {
    return Yt;
  },
  set exports(e) {
    Yt = e;
  }
};
const $l = (e) => typeof crypto < "u" && typeof crypto.getRandomValues == "function" ? () => {
  const t = crypto.getRandomValues(new Uint8Array(1))[0];
  return (t >= e ? t % e : t).toString(e);
} : () => Math.floor(Math.random() * e).toString(e), vi = (e = 7, t = !1) => Array.from({ length: e }, $l(t ? 16 : 36)).join("");
Ql.exports = vi;
Yt.default = vi;
var Xl = () => `uid::${Yt(7)}`, Kl = (e, t = ["endpointName", "fingerprint"]) => typeof e == "object" && e !== null && t.every((r) => r in e), eu = (e) => {
  try {
    const t = JSON.parse(e);
    return Kl(t) ? t : null;
  } catch {
    return null;
  }
}, tu = () => {
  let e = [];
  return {
    add: (...t) => {
      e = [...e, ...t];
    },
    remove: (t) => {
      e = typeof t == "string" ? e.filter((r) => r.message.transactionId !== t) : e.filter((r) => !t.includes(r));
    },
    entries: () => e
  };
}, Ar = class {
  static toBackground(e, t) {
    return e.postMessage(t);
  }
  static toExtensionContext(e, t) {
    return e.postMessage(t);
  }
}, ru = Object.defineProperty, nu = Object.defineProperties, ou = Object.getOwnPropertyDescriptors, Ba = Object.getOwnPropertySymbols, au = Object.prototype.hasOwnProperty, su = Object.prototype.propertyIsEnumerable, Va = (e, t, r) => t in e ? ru(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ct = (e, t) => {
  for (var r in t || (t = {}))
    au.call(t, r) && Va(e, r, t[r]);
  if (Ba)
    for (var r of Ba(t))
      su.call(t, r) && Va(e, r, t[r]);
  return e;
}, Xo = (e, t) => nu(e, ou(t)), iu = /^((?:background$)|devtools|popup|options|content-script|window)(?:@(\d+)(?:\.(\d+))?)?$/, Ko = (e) => {
  const [, t, r, n] = e.match(iu) || [];
  return {
    context: t,
    tabId: +r,
    frameId: n ? +n : void 0
  };
}, rn = ({ context: e, tabId: t, frameId: r }) => ["background", "popup", "options"].includes(e) ? e : `${e}@${t}${r ? `.${r}` : ""}`;
const cu = [
  {
    property: "name",
    enumerable: !1
  },
  {
    property: "message",
    enumerable: !1
  },
  {
    property: "stack",
    enumerable: !1
  },
  {
    property: "code",
    enumerable: !0
  }
], So = Symbol(".toJSON was called"), lu = (e) => {
  e[So] = !0;
  const t = e.toJSON();
  return delete e[So], t;
}, yi = ({
  from: e,
  seen: t,
  to_: r,
  forceEnumerable: n,
  maxDepth: o,
  depth: a
}) => {
  const s = r || (Array.isArray(e) ? [] : {});
  if (t.push(e), a >= o)
    return s;
  if (typeof e.toJSON == "function" && e[So] !== !0)
    return lu(e);
  for (const [i, c] of Object.entries(e)) {
    if (typeof Buffer == "function" && Buffer.isBuffer(c)) {
      s[i] = "[object Buffer]";
      continue;
    }
    if (c !== null && typeof c == "object" && typeof c.pipe == "function") {
      s[i] = "[object Stream]";
      continue;
    }
    if (typeof c != "function") {
      if (!c || typeof c != "object") {
        s[i] = c;
        continue;
      }
      if (!t.includes(e[i])) {
        a++, s[i] = yi({
          from: e[i],
          seen: [...t],
          forceEnumerable: n,
          maxDepth: o,
          depth: a
        });
        continue;
      }
      s[i] = "[Circular]";
    }
  }
  for (const { property: i, enumerable: c } of cu)
    typeof e[i] == "string" && Object.defineProperty(s, i, {
      value: e[i],
      enumerable: n ? !0 : c,
      configurable: !0,
      writable: !0
    });
  return s;
};
function uu(e, t = {}) {
  const { maxDepth: r = Number.POSITIVE_INFINITY } = t;
  return typeof e == "object" && e !== null ? yi({
    from: e,
    seen: [],
    forceEnumerable: !0,
    maxDepth: r,
    depth: 0
  }) : typeof e == "function" ? `[Function: ${e.name || "anonymous"}]` : e;
}
let xi = () => ({
  events: {},
  emit(e, ...t) {
    (this.events[e] || []).forEach((r) => r(...t));
  },
  on(e, t) {
    return (this.events[e] = this.events[e] || []).push(t), () => this.events[e] = (this.events[e] || []).filter((r) => r !== t);
  }
});
var gu = (e, t, r) => {
  const n = Yt(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = (i) => {
    if (i.destination.context === e && !i.destination.frameId && !i.destination.tabId) {
      r == null || r(i);
      const { transactionId: c, messageID: u, messageType: l } = i, g = () => {
        const I = o.get(c);
        if (I) {
          const { err: C, data: p } = i;
          if (C) {
            const L = C, B = self[L.name], V = new (typeof B == "function" ? B : Error)(L.message);
            for (const _ in L)
              V[_] = L[_];
            I.reject(V);
          } else
            I.resolve(p);
          o.delete(c);
        }
      }, m = async () => {
        let I, C, p = !1;
        try {
          const L = a.get(u);
          if (typeof L == "function")
            I = await L({
              sender: i.origin,
              id: u,
              data: i.data,
              timestamp: i.timestamp
            });
          else
            throw p = !0, new Error(`[webext-bridge] No handler registered in '${e}' to accept messages with id '${u}'`);
        } catch (L) {
          C = L;
        } finally {
          if (C && (i.err = uu(C)), s(Xo(Ct({}, i), {
            messageType: "reply",
            data: I,
            origin: { context: e, tabId: null },
            destination: i.origin,
            hops: []
          })), C && !p)
            throw I;
        }
      };
      switch (l) {
        case "reply":
          return g();
        case "message":
          return m();
      }
    }
    return i.hops.push(`${e}::${n}`), t(i);
  };
  return {
    handleMessage: s,
    endTransaction: (i) => {
      const c = o.get(i);
      c == null || c.reject("Transaction was ended before it could complete"), o.delete(i);
    },
    sendMessage: (i, c, u = "background") => {
      const l = typeof u == "string" ? Ko(u) : u, g = "Bridge#sendMessage ->";
      if (!l.context)
        throw new TypeError(`${g} Destination must be any one of known destinations`);
      return new Promise((m, I) => {
        const C = {
          messageID: i,
          data: c,
          destination: l,
          messageType: "message",
          transactionId: Yt(),
          origin: { context: e, tabId: null },
          hops: [],
          timestamp: Date.now()
        };
        o.set(C.transactionId, { resolve: m, reject: I });
        try {
          s(C);
        } catch (p) {
          o.delete(C.transactionId), I(p);
        }
      });
    },
    onMessage: (i, c) => (a.set(i, c), () => a.delete(i))
  };
}, Kt = class {
  constructor(e, t) {
    this.endpointRuntime = e, this.streamInfo = t, this.emitter = xi(), this.isClosed = !1, this.handleStreamClose = () => {
      this.isClosed || (this.isClosed = !0, this.emitter.emit("closed", !0), this.emitter.events = {});
    }, Kt.initDone || (e.onMessage("__crx_bridge_stream_transfer__", (r) => {
      const { streamId: n, streamTransfer: o, action: a } = r.data, s = Kt.openStreams.get(n);
      s && !s.isClosed && (a === "transfer" && s.emitter.emit("message", o), a === "close" && (Kt.openStreams.delete(n), s.handleStreamClose()));
    }), Kt.initDone = !0), Kt.openStreams.set(this.streamInfo.streamId, this);
  }
  get info() {
    return this.streamInfo;
  }
  send(e) {
    if (this.isClosed)
      throw new Error("Attempting to send a message over closed stream. Use stream.onClose(<callback>) to keep an eye on stream status");
    this.endpointRuntime.sendMessage("__crx_bridge_stream_transfer__", {
      streamId: this.streamInfo.streamId,
      streamTransfer: e,
      action: "transfer"
    }, this.streamInfo.endpoint);
  }
  close(e) {
    e && this.send(e), this.handleStreamClose(), this.endpointRuntime.sendMessage("__crx_bridge_stream_transfer__", {
      streamId: this.streamInfo.streamId,
      streamTransfer: null,
      action: "close"
    }, this.streamInfo.endpoint);
  }
  onMessage(e) {
    return this.getDisposable("message", e);
  }
  onClose(e) {
    return this.getDisposable("closed", e);
  }
  getDisposable(e, t) {
    const r = this.emitter.on(e, t);
    return Object.assign(r, {
      dispose: r,
      close: r
    });
  }
}, dn = Kt;
dn.initDone = !1;
dn.openStreams = /* @__PURE__ */ new Map();
var du = (e) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = xi();
  e.onMessage("__crx_bridge_stream_open__", (s) => new Promise((i) => {
    const { sender: c, data: u } = s, { channel: l } = u;
    let g = !1, m = () => {
    };
    const I = () => {
      const C = r.get(l);
      typeof C == "function" ? (C(new dn(e, Xo(Ct({}, u), { endpoint: c }))), g && m(), i(!0)) : g || (g = !0, m = n.on("did-change-stream-callbacks", I));
    };
    I();
  }));
  async function o(s, i) {
    if (t.has(s))
      throw new Error("webext-bridge: A Stream is already open at this channel");
    const c = typeof i == "string" ? Ko(i) : i, u = { streamId: Yt(), channel: s, endpoint: c }, l = new dn(e, u);
    return l.onClose(() => t.delete(s)), await e.sendMessage("__crx_bridge_stream_open__", u, c), t.set(s, l), l;
  }
  function a(s, i) {
    if (r.has(s))
      throw new Error("webext-bridge: This channel has already been claimed. Stream allows only one-on-one communication");
    r.set(s, i), n.emit("did-change-stream-callbacks");
  }
  return {
    openStream: o,
    onOpenStreamChannel: a
  };
}, Mo = {}, fu = {
  get exports() {
    return Mo;
  },
  set exports(e) {
    Mo = e;
  }
};
(function(e, t) {
  (function(r, n) {
    n(e);
  })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Ai, function(r) {
    if (typeof globalThis != "object" || typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id)
      throw new Error("This script should only be loaded in a browser extension.");
    if (typeof globalThis.browser > "u" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
      const n = "The message port closed before a response was received.", o = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)", a = (s) => {
        const i = {
          alarms: {
            clear: {
              minArgs: 0,
              maxArgs: 1
            },
            clearAll: {
              minArgs: 0,
              maxArgs: 0
            },
            get: {
              minArgs: 0,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          bookmarks: {
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getChildren: {
              minArgs: 1,
              maxArgs: 1
            },
            getRecent: {
              minArgs: 1,
              maxArgs: 1
            },
            getSubTree: {
              minArgs: 1,
              maxArgs: 1
            },
            getTree: {
              minArgs: 0,
              maxArgs: 0
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeTree: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          browserAction: {
            disable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            enable: {
              minArgs: 0,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            getBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1
            },
            getBadgeText: {
              minArgs: 1,
              maxArgs: 1
            },
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            openPopup: {
              minArgs: 0,
              maxArgs: 0
            },
            setBadgeBackgroundColor: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setBadgeText: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          browsingData: {
            remove: {
              minArgs: 2,
              maxArgs: 2
            },
            removeCache: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCookies: {
              minArgs: 1,
              maxArgs: 1
            },
            removeDownloads: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFormData: {
              minArgs: 1,
              maxArgs: 1
            },
            removeHistory: {
              minArgs: 1,
              maxArgs: 1
            },
            removeLocalStorage: {
              minArgs: 1,
              maxArgs: 1
            },
            removePasswords: {
              minArgs: 1,
              maxArgs: 1
            },
            removePluginData: {
              minArgs: 1,
              maxArgs: 1
            },
            settings: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          commands: {
            getAll: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          contextMenus: {
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeAll: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          cookies: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 1,
              maxArgs: 1
            },
            getAllCookieStores: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          devtools: {
            inspectedWindow: {
              eval: {
                minArgs: 1,
                maxArgs: 2,
                singleCallbackArg: !1
              }
            },
            panels: {
              create: {
                minArgs: 3,
                maxArgs: 3,
                singleCallbackArg: !0
              },
              elements: {
                createSidebarPane: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            }
          },
          downloads: {
            cancel: {
              minArgs: 1,
              maxArgs: 1
            },
            download: {
              minArgs: 1,
              maxArgs: 1
            },
            erase: {
              minArgs: 1,
              maxArgs: 1
            },
            getFileIcon: {
              minArgs: 1,
              maxArgs: 2
            },
            open: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            pause: {
              minArgs: 1,
              maxArgs: 1
            },
            removeFile: {
              minArgs: 1,
              maxArgs: 1
            },
            resume: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          extension: {
            isAllowedFileSchemeAccess: {
              minArgs: 0,
              maxArgs: 0
            },
            isAllowedIncognitoAccess: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          history: {
            addUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteAll: {
              minArgs: 0,
              maxArgs: 0
            },
            deleteRange: {
              minArgs: 1,
              maxArgs: 1
            },
            deleteUrl: {
              minArgs: 1,
              maxArgs: 1
            },
            getVisits: {
              minArgs: 1,
              maxArgs: 1
            },
            search: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          i18n: {
            detectLanguage: {
              minArgs: 1,
              maxArgs: 1
            },
            getAcceptLanguages: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          identity: {
            launchWebAuthFlow: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          idle: {
            queryState: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          management: {
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getSelf: {
              minArgs: 0,
              maxArgs: 0
            },
            setEnabled: {
              minArgs: 2,
              maxArgs: 2
            },
            uninstallSelf: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          notifications: {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            create: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            getPermissionLevel: {
              minArgs: 0,
              maxArgs: 0
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          },
          pageAction: {
            getPopup: {
              minArgs: 1,
              maxArgs: 1
            },
            getTitle: {
              minArgs: 1,
              maxArgs: 1
            },
            hide: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setIcon: {
              minArgs: 1,
              maxArgs: 1
            },
            setPopup: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            setTitle: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            },
            show: {
              minArgs: 1,
              maxArgs: 1,
              fallbackToNoCallback: !0
            }
          },
          permissions: {
            contains: {
              minArgs: 1,
              maxArgs: 1
            },
            getAll: {
              minArgs: 0,
              maxArgs: 0
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            request: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          runtime: {
            getBackgroundPage: {
              minArgs: 0,
              maxArgs: 0
            },
            getPlatformInfo: {
              minArgs: 0,
              maxArgs: 0
            },
            openOptionsPage: {
              minArgs: 0,
              maxArgs: 0
            },
            requestUpdateCheck: {
              minArgs: 0,
              maxArgs: 0
            },
            sendMessage: {
              minArgs: 1,
              maxArgs: 3
            },
            sendNativeMessage: {
              minArgs: 2,
              maxArgs: 2
            },
            setUninstallURL: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          sessions: {
            getDevices: {
              minArgs: 0,
              maxArgs: 1
            },
            getRecentlyClosed: {
              minArgs: 0,
              maxArgs: 1
            },
            restore: {
              minArgs: 0,
              maxArgs: 1
            }
          },
          storage: {
            local: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            managed: {
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            sync: {
              clear: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getBytesInUse: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            }
          },
          tabs: {
            captureVisibleTab: {
              minArgs: 0,
              maxArgs: 2
            },
            create: {
              minArgs: 1,
              maxArgs: 1
            },
            detectLanguage: {
              minArgs: 0,
              maxArgs: 1
            },
            discard: {
              minArgs: 0,
              maxArgs: 1
            },
            duplicate: {
              minArgs: 1,
              maxArgs: 1
            },
            executeScript: {
              minArgs: 1,
              maxArgs: 2
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 0
            },
            getZoom: {
              minArgs: 0,
              maxArgs: 1
            },
            getZoomSettings: {
              minArgs: 0,
              maxArgs: 1
            },
            goBack: {
              minArgs: 0,
              maxArgs: 1
            },
            goForward: {
              minArgs: 0,
              maxArgs: 1
            },
            highlight: {
              minArgs: 1,
              maxArgs: 1
            },
            insertCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            move: {
              minArgs: 2,
              maxArgs: 2
            },
            query: {
              minArgs: 1,
              maxArgs: 1
            },
            reload: {
              minArgs: 0,
              maxArgs: 2
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            removeCSS: {
              minArgs: 1,
              maxArgs: 2
            },
            sendMessage: {
              minArgs: 2,
              maxArgs: 3
            },
            setZoom: {
              minArgs: 1,
              maxArgs: 2
            },
            setZoomSettings: {
              minArgs: 1,
              maxArgs: 2
            },
            update: {
              minArgs: 1,
              maxArgs: 2
            }
          },
          topSites: {
            get: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          webNavigation: {
            getAllFrames: {
              minArgs: 1,
              maxArgs: 1
            },
            getFrame: {
              minArgs: 1,
              maxArgs: 1
            }
          },
          webRequest: {
            handlerBehaviorChanged: {
              minArgs: 0,
              maxArgs: 0
            }
          },
          windows: {
            create: {
              minArgs: 0,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 2
            },
            getAll: {
              minArgs: 0,
              maxArgs: 1
            },
            getCurrent: {
              minArgs: 0,
              maxArgs: 1
            },
            getLastFocused: {
              minArgs: 0,
              maxArgs: 1
            },
            remove: {
              minArgs: 1,
              maxArgs: 1
            },
            update: {
              minArgs: 2,
              maxArgs: 2
            }
          }
        };
        if (Object.keys(i).length === 0)
          throw new Error("api-metadata.json has not been included in browser-polyfill");
        class c extends WeakMap {
          constructor(h, x = void 0) {
            super(x), this.createItem = h;
          }
          get(h) {
            return this.has(h) || this.set(h, this.createItem(h)), super.get(h);
          }
        }
        const u = (A) => A && typeof A == "object" && typeof A.then == "function", l = (A, h) => (...x) => {
          s.runtime.lastError ? A.reject(new Error(s.runtime.lastError.message)) : h.singleCallbackArg || x.length <= 1 && h.singleCallbackArg !== !1 ? A.resolve(x[0]) : A.resolve(x);
        }, g = (A) => A == 1 ? "argument" : "arguments", m = (A, h) => function(y, ...v) {
          if (v.length < h.minArgs)
            throw new Error(`Expected at least ${h.minArgs} ${g(h.minArgs)} for ${A}(), got ${v.length}`);
          if (v.length > h.maxArgs)
            throw new Error(`Expected at most ${h.maxArgs} ${g(h.maxArgs)} for ${A}(), got ${v.length}`);
          return new Promise((D, k) => {
            if (h.fallbackToNoCallback)
              try {
                y[A](...v, l({
                  resolve: D,
                  reject: k
                }, h));
              } catch (j) {
                console.warn(`${A} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, j), y[A](...v), h.fallbackToNoCallback = !1, h.noCallback = !0, D();
              }
            else
              h.noCallback ? (y[A](...v), D()) : y[A](...v, l({
                resolve: D,
                reject: k
              }, h));
          });
        }, I = (A, h, x) => new Proxy(h, {
          apply(y, v, D) {
            return x.call(v, A, ...D);
          }
        });
        let C = Function.call.bind(Object.prototype.hasOwnProperty);
        const p = (A, h = {}, x = {}) => {
          let y = /* @__PURE__ */ Object.create(null), v = {
            has(k, j) {
              return j in A || j in y;
            },
            get(k, j, H) {
              if (j in y)
                return y[j];
              if (!(j in A))
                return;
              let R = A[j];
              if (typeof R == "function")
                if (typeof h[j] == "function")
                  R = I(A, A[j], h[j]);
                else if (C(x, j)) {
                  let Z = m(j, x[j]);
                  R = I(A, A[j], Z);
                } else
                  R = R.bind(A);
              else if (typeof R == "object" && R !== null && (C(h, j) || C(x, j)))
                R = p(R, h[j], x[j]);
              else if (C(x, "*"))
                R = p(R, h[j], x["*"]);
              else
                return Object.defineProperty(y, j, {
                  configurable: !0,
                  enumerable: !0,
                  get() {
                    return A[j];
                  },
                  set(Z) {
                    A[j] = Z;
                  }
                }), R;
              return y[j] = R, R;
            },
            set(k, j, H, R) {
              return j in y ? y[j] = H : A[j] = H, !0;
            },
            defineProperty(k, j, H) {
              return Reflect.defineProperty(y, j, H);
            },
            deleteProperty(k, j) {
              return Reflect.deleteProperty(y, j);
            }
          }, D = Object.create(A);
          return new Proxy(D, v);
        }, L = (A) => ({
          addListener(h, x, ...y) {
            h.addListener(A.get(x), ...y);
          },
          hasListener(h, x) {
            return h.hasListener(A.get(x));
          },
          removeListener(h, x) {
            h.removeListener(A.get(x));
          }
        }), B = new c((A) => typeof A != "function" ? A : function(x) {
          const y = p(
            x,
            {},
            {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            }
          );
          A(y);
        });
        let V = !1;
        const _ = new c((A) => typeof A != "function" ? A : function(x, y, v) {
          let D = !1, k, j = new Promise((ie) => {
            k = function(te) {
              V || (console.warn(o, new Error().stack), V = !0), D = !0, ie(te);
            };
          }), H;
          try {
            H = A(x, y, k);
          } catch (ie) {
            H = Promise.reject(ie);
          }
          const R = H !== !0 && u(H);
          if (H !== !0 && !R && !D)
            return !1;
          const Z = (ie) => {
            ie.then((te) => {
              v(te);
            }, (te) => {
              let ge;
              te && (te instanceof Error || typeof te.message == "string") ? ge = te.message : ge = "An unexpected error occurred", v({
                __mozWebExtensionPolyfillReject__: !0,
                message: ge
              });
            }).catch((te) => {
              console.error("Failed to send onMessage rejected reply", te);
            });
          };
          return Z(R ? H : j), !0;
        }), q = ({
          reject: A,
          resolve: h
        }, x) => {
          s.runtime.lastError ? s.runtime.lastError.message === n ? h() : A(new Error(s.runtime.lastError.message)) : x && x.__mozWebExtensionPolyfillReject__ ? A(new Error(x.message)) : h(x);
        }, G = (A, h, x, ...y) => {
          if (y.length < h.minArgs)
            throw new Error(`Expected at least ${h.minArgs} ${g(h.minArgs)} for ${A}(), got ${y.length}`);
          if (y.length > h.maxArgs)
            throw new Error(`Expected at most ${h.maxArgs} ${g(h.maxArgs)} for ${A}(), got ${y.length}`);
          return new Promise((v, D) => {
            const k = q.bind(null, {
              resolve: v,
              reject: D
            });
            y.push(k), x.sendMessage(...y);
          });
        }, F = {
          devtools: {
            network: {
              onRequestFinished: L(B)
            }
          },
          runtime: {
            onMessage: L(_),
            onMessageExternal: L(_),
            sendMessage: G.bind(null, "sendMessage", {
              minArgs: 1,
              maxArgs: 3
            })
          },
          tabs: {
            sendMessage: G.bind(null, "sendMessage", {
              minArgs: 2,
              maxArgs: 3
            })
          }
        }, W = {
          clear: {
            minArgs: 1,
            maxArgs: 1
          },
          get: {
            minArgs: 1,
            maxArgs: 1
          },
          set: {
            minArgs: 1,
            maxArgs: 1
          }
        };
        return i.privacy = {
          network: {
            "*": W
          },
          services: {
            "*": W
          },
          websites: {
            "*": W
          }
        }, p(s, F, i);
      };
      r.exports = a(chrome);
    } else
      r.exports = globalThis.browser;
  });
})(fu);
const mu = Mo;
var vr = tu(), _e = /* @__PURE__ */ new Map(), er = /* @__PURE__ */ new Map(), fn = /* @__PURE__ */ new Map(), Ti = (e, t) => (er.set(e, (er.get(e) || /* @__PURE__ */ new Set()).add(t)), () => {
  const r = er.get(e);
  r != null && r.delete(t) && (r == null ? void 0 : r.size) === 0 && er.delete(e);
}), Si = (e, t) => {
  fn.set(e, (fn.get(e) || /* @__PURE__ */ new Set()).add(t));
}, Bt = (e) => ({
  withFingerprint: (t) => {
    const r = (o) => ({ and: () => o }), n = {
      aboutIncomingMessage: (o) => {
        const a = _e.get(e);
        return Ar.toExtensionContext(a.port, {
          status: "incoming",
          message: o
        }), r(n);
      },
      aboutSuccessfulDelivery: (o) => {
        const a = _e.get(e);
        return Ar.toExtensionContext(a.port, {
          status: "delivered",
          receipt: o
        }), r(n);
      },
      aboutMessageUndeliverability: (o, a) => {
        const s = _e.get(e);
        return (s == null ? void 0 : s.fingerprint) === t && Ar.toExtensionContext(s.port, {
          status: "undeliverable",
          resolvedDestination: o,
          message: a
        }), r(n);
      },
      whenDeliverableTo: (o) => {
        const a = () => {
          const s = _e.get(e);
          if ((s == null ? void 0 : s.fingerprint) === t && _e.has(o))
            return Ar.toExtensionContext(s.port, {
              status: "deliverable",
              deliverableTo: o
            }), !0;
        };
        if (!a()) {
          const s = Ti(o, a);
          Si(t, s);
        }
        return r(n);
      },
      aboutSessionEnded: (o) => {
        const a = _e.get(e);
        return (a == null ? void 0 : a.fingerprint) === t && Ar.toExtensionContext(a.port, {
          status: "terminated",
          fingerprint: o
        }), r(n);
      }
    };
    return n;
  }
}), Au = Xl(), mn = gu("background", (e) => {
  var t;
  if (e.origin.context === "background" && ["content-script", "devtools "].includes(e.destination.context) && !e.destination.tabId)
    throw new TypeError("When sending messages from background page, use @tabId syntax to target specific tab");
  const r = rn(Ct(Ct({}, e.origin), e.origin.context === "window" && { context: "content-script" })), n = rn(Xo(Ct(Ct({}, e.destination), e.destination.context === "window" && {
    context: "content-script"
  }), {
    tabId: e.destination.tabId || e.origin.tabId
  }));
  e.destination.tabId = null, e.destination.frameId = null;
  const o = () => _e.get(n), a = () => _e.get(r), s = () => {
    var i;
    Bt(n).withFingerprint(o().fingerprint).aboutIncomingMessage(e);
    const c = {
      message: e,
      to: o().fingerprint,
      from: {
        endpointId: r,
        fingerprint: (i = a()) == null ? void 0 : i.fingerprint
      }
    };
    e.messageType === "message" && vr.add(c), e.messageType === "reply" && vr.remove(e.messageID), a() && Bt(r).withFingerprint(a().fingerprint).aboutSuccessfulDelivery(c);
  };
  (t = o()) != null && t.port ? s() : e.messageType === "message" && (e.origin.context === "background" ? Ti(n, s) : a() && Bt(r).withFingerprint(a().fingerprint).aboutMessageUndeliverability(n, e).and().whenDeliverableTo(n));
}, (e) => {
  const t = rn(Ct(Ct({}, e.origin), e.origin.context === "window" && { context: "content-script" })), r = _e.get(t), n = {
    message: e,
    to: Au,
    from: {
      endpointId: t,
      fingerprint: r.fingerprint
    }
  };
  Bt(t).withFingerprint(r.fingerprint).aboutSuccessfulDelivery(n);
});
mu.runtime.onConnect.addListener((e) => {
  var t;
  const r = eu(e.name);
  if (!r)
    return;
  r.endpointName || (r.endpointName = rn({
    context: "content-script",
    tabId: e.sender.tab.id,
    frameId: e.sender.frameId
  }));
  const { tabId: n, frameId: o } = Ko(r.endpointName);
  _e.set(r.endpointName, {
    fingerprint: r.fingerprint,
    port: e
  }), (t = er.get(r.endpointName)) == null || t.forEach((a) => a()), er.delete(r.endpointName), Si(r.fingerprint, () => {
    const a = vr.entries().filter((s) => s.to === r.fingerprint);
    vr.remove(a), a.forEach((s) => {
      s.from.endpointId === "background" ? mn.endTransaction(s.message.transactionId) : Bt(s.from.endpointId).withFingerprint(s.from.fingerprint).aboutSessionEnded(r.fingerprint);
    });
  }), e.onDisconnect.addListener(() => {
    var a, s;
    ((a = _e.get(r.endpointName)) == null ? void 0 : a.fingerprint) === r.fingerprint && _e.delete(r.endpointName), (s = fn.get(r.fingerprint)) == null || s.forEach((i) => i()), fn.delete(r.fingerprint);
  }), e.onMessage.addListener((a) => {
    var s, i;
    if (a.type === "sync") {
      const c = [..._e.values()].map((l) => l.fingerprint), u = a.pendingResponses.filter((l) => c.includes(l.to));
      vr.add(...u), a.pendingResponses.filter((l) => !c.includes(l.to)).forEach((l) => Bt(r.endpointName).withFingerprint(r.fingerprint).aboutSessionEnded(l.to)), a.pendingDeliveries.forEach((l) => Bt(r.endpointName).withFingerprint(r.fingerprint).whenDeliverableTo(l));
      return;
    }
    a.type === "deliver" && ((i = (s = a.message) == null ? void 0 : s.origin) != null && i.context) && (a.message.origin.tabId = n, a.message.origin.frameId = o, mn.handleMessage(a.message));
  });
});
var { sendMessage: OI, onMessage: ea } = mn;
du(mn);
const eo = {
  credentials: "include",
  headers: {
    "User-Agent": pu(),
    Accept: "*/*",
    "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Site": "same-origin",
    referrerPolicy: "strict-origin-when-cross-origin",
    mode: "cors",
    credentials: "include"
    //todo: ??
  }
};
function pu() {
  try {
    return window.navigator.userAgent;
  } catch {
    return "";
  }
}
async function yr(e) {
  const t = e.args;
  if (!t)
    return;
  const n = await E.webNavigation.getAllFrames({ tabId: e.senderTab });
  return wI(n, t.frame);
}
async function Jt(e) {
  const t = { tabId: e.senderTab }, r = await yr({ ...e, args: { frame: "movimentar.seam" } }) || await yr({ ...e, args: { frame: "minutarLotePainelNovoCK.seam" } }) || await yr({ ...e, args: { frame: "listView.seam" } });
  return r ? Object.assign(t, { tabId: e.senderTab, frameIds: [r.frameId] }) : Object.assign(t, { tabId: e.senderTab, allFrames: !0 }), t;
}
async function Iu(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: (r) => {
      if ("CKEDITOR" in window) {
        const n = window;
        n.CKEDITOR.instances[Object.getOwnPropertyNames(n.CKEDITOR.instances)[0]].insertHtml(r);
      } else if (window.wrappedJSObject) {
        const n = window;
        n.wrappedJSObject.CKEDITOR.instances[Object.getOwnPropertyNames(n.wrappedJSObject.CKEDITOR.instances)[0]].insertHtml(r);
      }
    },
    args: [e.args],
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function hu(e) {
  const t = e.args ?? "";
  return await E.scripting.executeScript({
    target: { tabId: e.senderTab },
    func: (r) => {
      try {
        if (r) {
          if ("tinyMCE" in window) {
            const n = window;
            n.tinyMCE.activeEditor.setContent(r), n.tinyMCE.activeEditor.focus();
          } else if (window.wrappedJSObject) {
            const n = window;
            n.wrappedJSObject.tinyMCE.activeEditor.setContent(r), n.wrappedJSObject.tinyMCE.activeEditor.focus();
          }
          setTimeout(() => {
            const n = Array.from(document.querySelectorAll("input")).find(
              (o) => o.id.includes("update")
            );
            n == null || n.dispatchEvent(new Event("click", {}));
          }, 250);
        }
        if ("salvar" in window && typeof window.salvar == "function") {
          const n = window;
          window.salvar(
            n.CKEDITOR.instances[Object.getOwnPropertyNames(n.CKEDITOR.instances)[0]].getData()
          );
        } else if (window.wrappedJSObject) {
          const n = window;
          n.wrappedJSObject.salvar(
            n.wrappedJSObject.CKEDITOR.instances[Object.getOwnPropertyNames(n.wrappedJSObject.CKEDITOR.instances)[0]].getData()
          );
        }
      } catch (n) {
        console.warn(n);
      }
    },
    args: [t],
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function Cu(e) {
  var t;
  return (t = (await E.scripting.executeScript({
    target: { tabId: e.senderTab },
    func: () => {
      let r;
      if (window.sessionStorage.pjeLegacyUrl && typeof window.sessionStorage.pjeLegacyUrl == "string")
        try {
          const n = JSON.parse(window.sessionStorage.pjeLegacyUrl);
          n && n.value && typeof n.value == "string" && (r = n.value);
        } catch {
        }
      return r ?? window.location.href;
    },
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  })).at(0)) == null ? void 0 : t.result;
}
async function bu(e) {
  return await E.webNavigation.getAllFrames({ tabId: e.senderTab });
}
/**
* @vue/shared v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function ta(e, t) {
  const r = new Set(e.split(","));
  return t ? (n) => r.has(n.toLowerCase()) : (n) => r.has(n);
}
const le = {}, xr = [], De = () => {
}, vu = () => !1, jn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ra = (e) => e.startsWith("onUpdate:"), Ae = Object.assign, na = (e, t) => {
  const r = e.indexOf(t);
  r > -1 && e.splice(r, 1);
}, yu = Object.prototype.hasOwnProperty, re = (e, t) => yu.call(e, t), J = Array.isArray, Tr = (e) => Dn(e) === "[object Map]", xu = (e) => Dn(e) === "[object Set]", $ = (e) => typeof e == "function", Ce = (e) => typeof e == "string", sr = (e) => typeof e == "symbol", ue = (e) => e !== null && typeof e == "object", Mi = (e) => (ue(e) || $(e)) && $(e.then) && $(e.catch), Tu = Object.prototype.toString, Dn = (e) => Tu.call(e), Su = (e) => Dn(e).slice(8, -1), Mu = (e) => Dn(e) === "[object Object]", oa = (e) => Ce(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Sr = /* @__PURE__ */ ta(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Nn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (r) => t[r] || (t[r] = e(r));
}, Eu = /-(\w)/g, $e = Nn((e) => e.replace(Eu, (t, r) => r ? r.toUpperCase() : "")), wu = /\B([A-Z])/g, qt = Nn(
  (e) => e.replace(wu, "-$1").toLowerCase()
), On = Nn((e) => e.charAt(0).toUpperCase() + e.slice(1)), to = Nn((e) => e ? `on${On(e)}` : ""), wt = (e, t) => !Object.is(e, t), ro = (e, ...t) => {
  for (let r = 0; r < e.length; r++)
    e[r](...t);
}, An = (e, t, r, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: r
  });
}, Lu = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ju = (e) => {
  const t = Ce(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let za;
const Mr = () => za || (za = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function aa(e) {
  if (J(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++) {
      const n = e[r], o = Ce(n) ? Pu(n) : aa(n);
      if (o)
        for (const a in o)
          t[a] = o[a];
    }
    return t;
  } else if (Ce(e) || ue(e))
    return e;
}
const Du = /;(?![^(]*\))/g, Nu = /:([^]+)/, Ou = /\/\*[^]*?\*\//g;
function Pu(e) {
  const t = {};
  return e.replace(Ou, "").split(Du).forEach((r) => {
    if (r) {
      const n = r.split(Nu);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function sa(e) {
  let t = "";
  if (Ce(e))
    t = e;
  else if (J(e))
    for (let r = 0; r < e.length; r++) {
      const n = sa(e[r]);
      n && (t += n + " ");
    }
  else if (ue(e))
    for (const r in e)
      e[r] && (t += r + " ");
  return t.trim();
}
const Ru = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ku = /* @__PURE__ */ ta(Ru);
function Ei(e) {
  return !!e || e === "";
}
/**
* @vue/reactivity v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ue;
class wi {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Ue, !t && Ue && (this.index = (Ue.scopes || (Ue.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const r = Ue;
      try {
        return Ue = this, t();
      } finally {
        Ue = r;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Ue = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Ue = this.parent;
  }
  stop(t) {
    if (this._active) {
      let r, n;
      for (r = 0, n = this.effects.length; r < n; r++)
        this.effects[r].stop();
      for (r = 0, n = this.cleanups.length; r < n; r++)
        this.cleanups[r]();
      if (this.scopes)
        for (r = 0, n = this.scopes.length; r < n; r++)
          this.scopes[r].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function ia(e) {
  return new wi(e);
}
function Uu(e, t = Ue) {
  t && t.active && t.effects.push(e);
}
function _u() {
  return Ue;
}
function Xe(e) {
  Ue && Ue.cleanups.push(e);
}
let Vt;
class ca {
  constructor(t, r, n, o) {
    this.fn = t, this.trigger = r, this.scheduler = n, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Uu(this, o);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Dt();
      for (let t = 0; t < this._depsLength; t++) {
        const r = this.deps[t];
        if (r.computed && (Fu(r.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Nt();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = Mt, r = Vt;
    try {
      return Mt = !0, Vt = this, this._runnings++, Ha(this), this.fn();
    } finally {
      Za(this), this._runnings--, Vt = r, Mt = t;
    }
  }
  stop() {
    this.active && (Ha(this), Za(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Fu(e) {
  return e.value;
}
function Ha(e) {
  e._trackId++, e._depsLength = 0;
}
function Za(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Li(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Li(e, t) {
  const r = e.get(t);
  r !== void 0 && t._trackId !== r && (e.delete(t), e.size === 0 && e.cleanup());
}
let Mt = !0, Eo = 0;
const ji = [];
function Dt() {
  ji.push(Mt), Mt = !1;
}
function Nt() {
  const e = ji.pop();
  Mt = e === void 0 ? !0 : e;
}
function la() {
  Eo++;
}
function ua() {
  for (Eo--; !Eo && wo.length; )
    wo.shift()();
}
function Di(e, t, r) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const n = e.deps[e._depsLength];
    n !== t ? (n && Li(n, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const wo = [];
function Ni(e, t, r) {
  la();
  for (const n of e.keys()) {
    let o;
    n._dirtyLevel < t && (o ?? (o = e.get(n) === n._trackId)) && (n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0), n._dirtyLevel = t), n._shouldSchedule && (o ?? (o = e.get(n) === n._trackId)) && (n.trigger(), (!n._runnings || n.allowRecurse) && n._dirtyLevel !== 2 && (n._shouldSchedule = !1, n.scheduler && wo.push(n.scheduler)));
  }
  ua();
}
const Oi = (e, t) => {
  const r = /* @__PURE__ */ new Map();
  return r.cleanup = e, r.computed = t, r;
}, pn = /* @__PURE__ */ new WeakMap(), zt = Symbol(""), Lo = Symbol("");
function Oe(e, t, r) {
  if (Mt && Vt) {
    let n = pn.get(e);
    n || pn.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(r);
    o || n.set(r, o = Oi(() => n.delete(r))), Di(
      Vt,
      o
    );
  }
}
function ut(e, t, r, n, o, a) {
  const s = pn.get(e);
  if (!s)
    return;
  let i = [];
  if (t === "clear")
    i = [...s.values()];
  else if (r === "length" && J(e)) {
    const c = Number(n);
    s.forEach((u, l) => {
      (l === "length" || !sr(l) && l >= c) && i.push(u);
    });
  } else
    switch (r !== void 0 && i.push(s.get(r)), t) {
      case "add":
        J(e) ? oa(r) && i.push(s.get("length")) : (i.push(s.get(zt)), Tr(e) && i.push(s.get(Lo)));
        break;
      case "delete":
        J(e) || (i.push(s.get(zt)), Tr(e) && i.push(s.get(Lo)));
        break;
      case "set":
        Tr(e) && i.push(s.get(zt));
        break;
    }
  la();
  for (const c of i)
    c && Ni(
      c,
      4
    );
  ua();
}
function Bu(e, t) {
  const r = pn.get(e);
  return r && r.get(t);
}
const Vu = /* @__PURE__ */ ta("__proto__,__v_isRef,__isVue"), Pi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(sr)
), Ya = /* @__PURE__ */ zu();
function zu() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...r) {
      const n = ee(this);
      for (let a = 0, s = this.length; a < s; a++)
        Oe(n, "get", a + "");
      const o = n[t](...r);
      return o === -1 || o === !1 ? n[t](...r.map(ee)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...r) {
      Dt(), la();
      const n = ee(this)[t].apply(this, r);
      return ua(), Nt(), n;
    };
  }), e;
}
function Hu(e) {
  sr(e) || (e = String(e));
  const t = ee(this);
  return Oe(t, "has", e), t.hasOwnProperty(e);
}
class Ri {
  constructor(t = !1, r = !1) {
    this._isReadonly = t, this._isShallow = r;
  }
  get(t, r, n) {
    const o = this._isReadonly, a = this._isShallow;
    if (r === "__v_isReactive")
      return !o;
    if (r === "__v_isReadonly")
      return o;
    if (r === "__v_isShallow")
      return a;
    if (r === "__v_raw")
      return n === (o ? a ? rg : Fi : a ? _i : Ui).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const s = J(t);
    if (!o) {
      if (s && re(Ya, r))
        return Reflect.get(Ya, r, n);
      if (r === "hasOwnProperty")
        return Hu;
    }
    const i = Reflect.get(t, r, n);
    return (sr(r) ? Pi.has(r) : Vu(r)) || (o || Oe(t, "get", r), a) ? i : ye(i) ? s && oa(r) ? i : i.value : ue(i) ? o ? fa(i) : ft(i) : i;
  }
}
class ki extends Ri {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, r, n, o) {
    let a = t[r];
    if (!this._isShallow) {
      const c = Wt(a);
      if (!nr(n) && !Wt(n) && (a = ee(a), n = ee(n)), !J(t) && ye(a) && !ye(n))
        return c ? !1 : (a.value = n, !0);
    }
    const s = J(t) && oa(r) ? Number(r) < t.length : re(t, r), i = Reflect.set(t, r, n, o);
    return t === ee(o) && (s ? wt(n, a) && ut(t, "set", r, n) : ut(t, "add", r, n)), i;
  }
  deleteProperty(t, r) {
    const n = re(t, r);
    t[r];
    const o = Reflect.deleteProperty(t, r);
    return o && n && ut(t, "delete", r, void 0), o;
  }
  has(t, r) {
    const n = Reflect.has(t, r);
    return (!sr(r) || !Pi.has(r)) && Oe(t, "has", r), n;
  }
  ownKeys(t) {
    return Oe(
      t,
      "iterate",
      J(t) ? "length" : zt
    ), Reflect.ownKeys(t);
  }
}
class Zu extends Ri {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, r) {
    return !0;
  }
  deleteProperty(t, r) {
    return !0;
  }
}
const Yu = /* @__PURE__ */ new ki(), Wu = /* @__PURE__ */ new Zu(), Ju = /* @__PURE__ */ new ki(
  !0
);
const ga = (e) => e, Pn = (e) => Reflect.getPrototypeOf(e);
function Hr(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  const o = ee(e), a = ee(t);
  r || (wt(t, a) && Oe(o, "get", t), Oe(o, "get", a));
  const { has: s } = Pn(o), i = n ? ga : r ? Aa : jr;
  if (s.call(o, t))
    return i(e.get(t));
  if (s.call(o, a))
    return i(e.get(a));
  e !== o && e.get(t);
}
function Zr(e, t = !1) {
  const r = this.__v_raw, n = ee(r), o = ee(e);
  return t || (wt(e, o) && Oe(n, "has", e), Oe(n, "has", o)), e === o ? r.has(e) : r.has(e) || r.has(o);
}
function Yr(e, t = !1) {
  return e = e.__v_raw, !t && Oe(ee(e), "iterate", zt), Reflect.get(e, "size", e);
}
function Wa(e, t = !1) {
  !t && !nr(e) && !Wt(e) && (e = ee(e));
  const r = ee(this);
  return Pn(r).has.call(r, e) || (r.add(e), ut(r, "add", e, e)), this;
}
function Ja(e, t, r = !1) {
  !r && !nr(t) && !Wt(t) && (t = ee(t));
  const n = ee(this), { has: o, get: a } = Pn(n);
  let s = o.call(n, e);
  s || (e = ee(e), s = o.call(n, e));
  const i = a.call(n, e);
  return n.set(e, t), s ? wt(t, i) && ut(n, "set", e, t) : ut(n, "add", e, t), this;
}
function qa(e) {
  const t = ee(this), { has: r, get: n } = Pn(t);
  let o = r.call(t, e);
  o || (e = ee(e), o = r.call(t, e)), n && n.call(t, e);
  const a = t.delete(e);
  return o && ut(t, "delete", e, void 0), a;
}
function Ga() {
  const e = ee(this), t = e.size !== 0, r = e.clear();
  return t && ut(e, "clear", void 0, void 0), r;
}
function Wr(e, t) {
  return function(n, o) {
    const a = this, s = a.__v_raw, i = ee(s), c = t ? ga : e ? Aa : jr;
    return !e && Oe(i, "iterate", zt), s.forEach((u, l) => n.call(o, c(u), c(l), a));
  };
}
function Jr(e, t, r) {
  return function(...n) {
    const o = this.__v_raw, a = ee(o), s = Tr(a), i = e === "entries" || e === Symbol.iterator && s, c = e === "keys" && s, u = o[e](...n), l = r ? ga : t ? Aa : jr;
    return !t && Oe(
      a,
      "iterate",
      c ? Lo : zt
    ), {
      // iterator protocol
      next() {
        const { value: g, done: m } = u.next();
        return m ? { value: g, done: m } : {
          value: i ? [l(g[0]), l(g[1])] : l(g),
          done: m
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function At(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function qu() {
  const e = {
    get(a) {
      return Hr(this, a);
    },
    get size() {
      return Yr(this);
    },
    has: Zr,
    add: Wa,
    set: Ja,
    delete: qa,
    clear: Ga,
    forEach: Wr(!1, !1)
  }, t = {
    get(a) {
      return Hr(this, a, !1, !0);
    },
    get size() {
      return Yr(this);
    },
    has: Zr,
    add(a) {
      return Wa.call(this, a, !0);
    },
    set(a, s) {
      return Ja.call(this, a, s, !0);
    },
    delete: qa,
    clear: Ga,
    forEach: Wr(!1, !0)
  }, r = {
    get(a) {
      return Hr(this, a, !0);
    },
    get size() {
      return Yr(this, !0);
    },
    has(a) {
      return Zr.call(this, a, !0);
    },
    add: At("add"),
    set: At("set"),
    delete: At("delete"),
    clear: At("clear"),
    forEach: Wr(!0, !1)
  }, n = {
    get(a) {
      return Hr(this, a, !0, !0);
    },
    get size() {
      return Yr(this, !0);
    },
    has(a) {
      return Zr.call(this, a, !0);
    },
    add: At("add"),
    set: At("set"),
    delete: At("delete"),
    clear: At("clear"),
    forEach: Wr(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((a) => {
    e[a] = Jr(a, !1, !1), r[a] = Jr(a, !0, !1), t[a] = Jr(a, !1, !0), n[a] = Jr(
      a,
      !0,
      !0
    );
  }), [
    e,
    r,
    t,
    n
  ];
}
const [
  Gu,
  Qu,
  $u,
  Xu
] = /* @__PURE__ */ qu();
function da(e, t) {
  const r = t ? e ? Xu : $u : e ? Qu : Gu;
  return (n, o, a) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    re(r, o) && o in n ? r : n,
    o,
    a
  );
}
const Ku = {
  get: /* @__PURE__ */ da(!1, !1)
}, eg = {
  get: /* @__PURE__ */ da(!1, !0)
}, tg = {
  get: /* @__PURE__ */ da(!0, !1)
};
const Ui = /* @__PURE__ */ new WeakMap(), _i = /* @__PURE__ */ new WeakMap(), Fi = /* @__PURE__ */ new WeakMap(), rg = /* @__PURE__ */ new WeakMap();
function ng(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function og(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ng(Su(e));
}
function ft(e) {
  return Wt(e) ? e : ma(
    e,
    !1,
    Yu,
    Ku,
    Ui
  );
}
function ag(e) {
  return ma(
    e,
    !1,
    Ju,
    eg,
    _i
  );
}
function fa(e) {
  return ma(
    e,
    !0,
    Wu,
    tg,
    Fi
  );
}
function ma(e, t, r, n, o) {
  if (!ue(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const a = o.get(e);
  if (a)
    return a;
  const s = og(e);
  if (s === 0)
    return e;
  const i = new Proxy(
    e,
    s === 2 ? n : r
  );
  return o.set(e, i), i;
}
function Er(e) {
  return Wt(e) ? Er(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Wt(e) {
  return !!(e && e.__v_isReadonly);
}
function nr(e) {
  return !!(e && e.__v_isShallow);
}
function Bi(e) {
  return e ? !!e.__v_raw : !1;
}
function ee(e) {
  const t = e && e.__v_raw;
  return t ? ee(t) : e;
}
function sg(e) {
  return Object.isExtensible(e) && An(e, "__v_skip", !0), e;
}
const jr = (e) => ue(e) ? ft(e) : e, Aa = (e) => ue(e) ? fa(e) : e;
class Vi {
  constructor(t, r, n, o) {
    this.getter = t, this._setter = r, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ca(
      () => t(this._value),
      () => nn(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = n;
  }
  get value() {
    const t = ee(this);
    return (!t._cacheable || t.effect.dirty) && wt(t._value, t._value = t.effect.run()) && nn(t, 4), zi(t), t.effect._dirtyLevel >= 2 && nn(t, 2), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function ig(e, t, r = !1) {
  let n, o;
  const a = $(e);
  return a ? (n = e, o = De) : (n = e.get, o = e.set), new Vi(n, o, a || !o, r);
}
function zi(e) {
  var t;
  Mt && Vt && (e = ee(e), Di(
    Vt,
    (t = e.dep) != null ? t : e.dep = Oi(
      () => e.dep = void 0,
      e instanceof Vi ? e : void 0
    )
  ));
}
function nn(e, t = 4, r, n) {
  e = ee(e);
  const o = e.dep;
  o && Ni(
    o,
    t
  );
}
function ye(e) {
  return !!(e && e.__v_isRef === !0);
}
function Me(e) {
  return Hi(e, !1);
}
function ze(e) {
  return Hi(e, !0);
}
function Hi(e, t) {
  return ye(e) ? e : new cg(e, t);
}
class cg {
  constructor(t, r) {
    this.__v_isShallow = r, this.dep = void 0, this.__v_isRef = !0, this._rawValue = r ? t : ee(t), this._value = r ? t : jr(t);
  }
  get value() {
    return zi(this), this._value;
  }
  set value(t) {
    const r = this.__v_isShallow || nr(t) || Wt(t);
    t = r ? t : ee(t), wt(t, this._rawValue) && (this._rawValue, this._rawValue = t, this._value = r ? t : jr(t), nn(this, 4));
  }
}
function lg(e) {
  return ye(e) ? e.value : e;
}
const ug = {
  get: (e, t, r) => lg(Reflect.get(e, t, r)),
  set: (e, t, r, n) => {
    const o = e[t];
    return ye(o) && !ye(r) ? (o.value = r, !0) : Reflect.set(e, t, r, n);
  }
};
function Zi(e) {
  return Er(e) ? e : new Proxy(e, ug);
}
function Yi(e) {
  const t = J(e) ? new Array(e.length) : {};
  for (const r in e)
    t[r] = Wi(e, r);
  return t;
}
class gg {
  constructor(t, r, n) {
    this._object = t, this._key = r, this._defaultValue = n, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Bu(ee(this._object), this._key);
  }
}
class dg {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0;
  }
  get value() {
    return this._getter();
  }
}
function fg(e, t, r) {
  return ye(e) ? e : $(e) ? new dg(e) : ue(e) && arguments.length > 1 ? Wi(e, t, r) : Me(e);
}
function Wi(e, t, r) {
  const n = e[t];
  return ye(n) ? n : new gg(e, t, r);
}
/**
* @vue/runtime-core v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Et(e, t, r, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    Rn(o, t, r);
  }
}
function Je(e, t, r, n) {
  if ($(e)) {
    const o = Et(e, t, r, n);
    return o && Mi(o) && o.catch((a) => {
      Rn(a, t, r);
    }), o;
  }
  if (J(e)) {
    const o = [];
    for (let a = 0; a < e.length; a++)
      o.push(Je(e[a], t, r, n));
    return o;
  }
}
function Rn(e, t, r, n = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let a = t.parent;
    const s = t.proxy, i = `https://vuejs.org/error-reference/#runtime-${r}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let l = 0; l < u.length; l++)
          if (u[l](e, s, i) === !1)
            return;
      }
      a = a.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Dt(), Et(
        c,
        null,
        10,
        [e, s, i]
      ), Nt();
      return;
    }
  }
  mg(e, r, o, n);
}
function mg(e, t, r, n = !0) {
  console.error(e);
}
let Dr = !1, jo = !1;
const Se = [];
let rt = 0;
const tr = [];
let bt = null, _t = 0;
const Ji = /* @__PURE__ */ Promise.resolve();
let pa = null;
function ir(e) {
  const t = pa || Ji;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ag(e) {
  let t = rt + 1, r = Se.length;
  for (; t < r; ) {
    const n = t + r >>> 1, o = Se[n], a = Nr(o);
    a < e || a === e && o.pre ? t = n + 1 : r = n;
  }
  return t;
}
function Ia(e) {
  (!Se.length || !Se.includes(
    e,
    Dr && e.allowRecurse ? rt + 1 : rt
  )) && (e.id == null ? Se.push(e) : Se.splice(Ag(e.id), 0, e), qi());
}
function qi() {
  !Dr && !jo && (jo = !0, pa = Ji.then(Qi));
}
function pg(e) {
  const t = Se.indexOf(e);
  t > rt && Se.splice(t, 1);
}
function Ig(e) {
  J(e) ? tr.push(...e) : (!bt || !bt.includes(
    e,
    e.allowRecurse ? _t + 1 : _t
  )) && tr.push(e), qi();
}
function Qa(e, t, r = Dr ? rt + 1 : 0) {
  for (; r < Se.length; r++) {
    const n = Se[r];
    if (n && n.pre) {
      if (e && n.id !== e.uid)
        continue;
      Se.splice(r, 1), r--, n();
    }
  }
}
function Gi(e) {
  if (tr.length) {
    const t = [...new Set(tr)].sort(
      (r, n) => Nr(r) - Nr(n)
    );
    if (tr.length = 0, bt) {
      bt.push(...t);
      return;
    }
    for (bt = t, _t = 0; _t < bt.length; _t++) {
      const r = bt[_t];
      r.active !== !1 && r();
    }
    bt = null, _t = 0;
  }
}
const Nr = (e) => e.id == null ? 1 / 0 : e.id, hg = (e, t) => {
  const r = Nr(e) - Nr(t);
  if (r === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return r;
};
function Qi(e) {
  jo = !1, Dr = !0, Se.sort(hg);
  const t = De;
  try {
    for (rt = 0; rt < Se.length; rt++) {
      const r = Se[rt];
      r && r.active !== !1 && Et(
        r,
        r.i,
        r.i ? 15 : 14
      );
    }
  } finally {
    rt = 0, Se.length = 0, Gi(), Dr = !1, pa = null, (Se.length || tr.length) && Qi();
  }
}
let nt, Cr = [], Do = !1;
function kn(e, ...t) {
  nt ? nt.emit(e, ...t) : Do || Cr.push({ event: e, args: t });
}
function $i(e, t) {
  var r, n;
  nt = e, nt ? (nt.enabled = !0, Cr.forEach(({ event: o, args: a }) => nt.emit(o, ...a)), Cr = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((n = (r = window.navigator) == null ? void 0 : r.userAgent) != null && n.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((a) => {
    $i(a, t);
  }), setTimeout(() => {
    nt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Do = !0, Cr = []);
  }, 3e3)) : (Do = !0, Cr = []);
}
function Cg(e, t) {
  kn("app:init", e, t, {
    Fragment: Fe,
    Text: _r,
    Comment: We,
    Static: an
  });
}
function bg(e) {
  kn("app:unmount", e);
}
const vg = /* @__PURE__ */ ha(
  "component:added"
  /* COMPONENT_ADDED */
), Xi = /* @__PURE__ */ ha(
  "component:updated"
  /* COMPONENT_UPDATED */
), yg = /* @__PURE__ */ ha(
  "component:removed"
  /* COMPONENT_REMOVED */
), xg = (e) => {
  nt && typeof nt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !nt.cleanupBuffer(e) && yg(e);
};
/*! #__NO_SIDE_EFFECTS__ */
function ha(e) {
  return (t) => {
    kn(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
function Tg(e, t, r) {
  kn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    r
  );
}
let Ne = null, Ki = null;
function In(e) {
  const t = Ne;
  return Ne = e, Ki = e && e.type.__scopeId || null, t;
}
function Sg(e, t = Ne, r) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && cs(-1);
    const a = In(t);
    let s;
    try {
      s = e(...o);
    } finally {
      In(a), n._d && cs(1);
    }
    return __VUE_PROD_DEVTOOLS__ && Xi(t), s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Mg(e, t) {
  if (Ne === null)
    return e;
  const r = zn(Ne), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [a, s, i, c = le] = t[o];
    a && ($(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && xt(s), n.push({
      dir: a,
      instance: r,
      value: s,
      oldValue: void 0,
      arg: i,
      modifiers: c
    }));
  }
  return e;
}
function Pt(e, t, r, n) {
  const o = e.dirs, a = t && t.dirs;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    a && (i.oldValue = a[s].value);
    let c = i.dir[n];
    c && (Dt(), Je(c, r, 8, [
      e.el,
      i,
      e,
      t
    ]), Nt());
  }
}
const vt = Symbol("_leaveCb"), qr = Symbol("_enterCb");
function ec() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return ba(() => {
    e.isMounted = !0;
  }), va(() => {
    e.isUnmounting = !0;
  }), e;
}
const Ze = [Function, Array], tc = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: Ze,
  onEnter: Ze,
  onAfterEnter: Ze,
  onEnterCancelled: Ze,
  // leave
  onBeforeLeave: Ze,
  onLeave: Ze,
  onAfterLeave: Ze,
  onLeaveCancelled: Ze,
  // appear
  onBeforeAppear: Ze,
  onAppear: Ze,
  onAfterAppear: Ze,
  onAppearCancelled: Ze
}, rc = (e) => {
  const t = e.subTree;
  return t.component ? rc(t.component) : t;
}, Eg = {
  name: "BaseTransition",
  props: tc,
  setup(e, { slots: t }) {
    const r = wa(), n = ec();
    return () => {
      const o = t.default && Ca(t.default(), !0);
      if (!o || !o.length)
        return;
      let a = o[0];
      if (o.length > 1) {
        for (const m of o)
          if (m.type !== We) {
            a = m;
            break;
          }
      }
      const s = ee(e), { mode: i } = s;
      if (n.isLeaving)
        return no(a);
      const c = $a(a);
      if (!c)
        return no(a);
      let u = Or(
        c,
        s,
        n,
        r,
        // #11061, ensure enterHooks is fresh after clone
        (m) => u = m
      );
      or(c, u);
      const l = r.subTree, g = l && $a(l);
      if (g && g.type !== We && !Ft(c, g) && rc(r).type !== We) {
        const m = Or(
          g,
          s,
          n,
          r
        );
        if (or(g, m), i === "out-in" && c.type !== We)
          return n.isLeaving = !0, m.afterLeave = () => {
            n.isLeaving = !1, r.update.active !== !1 && (r.effect.dirty = !0, r.update());
          }, no(a);
        i === "in-out" && c.type !== We && (m.delayLeave = (I, C, p) => {
          const L = nc(
            n,
            g
          );
          L[String(g.key)] = g, I[vt] = () => {
            C(), I[vt] = void 0, delete u.delayedLeave;
          }, u.delayedLeave = p;
        });
      }
      return a;
    };
  }
}, wg = Eg;
function nc(e, t) {
  const { leavingVNodes: r } = e;
  let n = r.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), r.set(t.type, n)), n;
}
function Or(e, t, r, n, o) {
  const {
    appear: a,
    mode: s,
    persisted: i = !1,
    onBeforeEnter: c,
    onEnter: u,
    onAfterEnter: l,
    onEnterCancelled: g,
    onBeforeLeave: m,
    onLeave: I,
    onAfterLeave: C,
    onLeaveCancelled: p,
    onBeforeAppear: L,
    onAppear: B,
    onAfterAppear: V,
    onAppearCancelled: _
  } = t, q = String(e.key), G = nc(r, e), F = (h, x) => {
    h && Je(
      h,
      n,
      9,
      x
    );
  }, W = (h, x) => {
    const y = x[1];
    F(h, x), J(h) ? h.every((v) => v.length <= 1) && y() : h.length <= 1 && y();
  }, A = {
    mode: s,
    persisted: i,
    beforeEnter(h) {
      let x = c;
      if (!r.isMounted)
        if (a)
          x = L || c;
        else
          return;
      h[vt] && h[vt](
        !0
        /* cancelled */
      );
      const y = G[q];
      y && Ft(e, y) && y.el[vt] && y.el[vt](), F(x, [h]);
    },
    enter(h) {
      let x = u, y = l, v = g;
      if (!r.isMounted)
        if (a)
          x = B || u, y = V || l, v = _ || g;
        else
          return;
      let D = !1;
      const k = h[qr] = (j) => {
        D || (D = !0, j ? F(v, [h]) : F(y, [h]), A.delayedLeave && A.delayedLeave(), h[qr] = void 0);
      };
      x ? W(x, [h, k]) : k();
    },
    leave(h, x) {
      const y = String(e.key);
      if (h[qr] && h[qr](
        !0
        /* cancelled */
      ), r.isUnmounting)
        return x();
      F(m, [h]);
      let v = !1;
      const D = h[vt] = (k) => {
        v || (v = !0, x(), k ? F(p, [h]) : F(C, [h]), h[vt] = void 0, G[y] === e && delete G[y]);
      };
      G[y] = e, I ? W(I, [h, D]) : D();
    },
    clone(h) {
      const x = Or(
        h,
        t,
        r,
        n,
        o
      );
      return o && o(x), x;
    }
  };
  return A;
}
function no(e) {
  if (Un(e))
    return e = Lt(e), e.children = null, e;
}
function $a(e) {
  if (!Un(e))
    return e;
  const { shapeFlag: t, children: r } = e;
  if (r) {
    if (t & 16)
      return r[0];
    if (t & 32 && $(r.default))
      return r.default();
  }
}
function or(e, t) {
  e.shapeFlag & 6 && e.component ? or(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ca(e, t = !1, r) {
  let n = [], o = 0;
  for (let a = 0; a < e.length; a++) {
    let s = e[a];
    const i = r == null ? s.key : String(r) + String(s.key != null ? s.key : a);
    s.type === Fe ? (s.patchFlag & 128 && o++, n = n.concat(
      Ca(s.children, t, i)
    )) : (t || s.type !== We) && n.push(i != null ? Lt(s, { key: i }) : s);
  }
  if (o > 1)
    for (let a = 0; a < n.length; a++)
      n[a].patchFlag = -2;
  return n;
}
/*! #__NO_SIDE_EFFECTS__ */
function Lg(e, t) {
  return $(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => Ae({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const on = (e) => !!e.type.__asyncLoader, Un = (e) => e.type.__isKeepAlive;
function jg(e, t) {
  oc(e, "a", t);
}
function Dg(e, t) {
  oc(e, "da", t);
}
function oc(e, t, r = ve) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = r;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (_n(t, n, r), r) {
    let o = r.parent;
    for (; o && o.parent; )
      Un(o.parent.vnode) && Ng(n, t, r, o), o = o.parent;
  }
}
function Ng(e, t, r, n) {
  const o = _n(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  sc(() => {
    na(n[t], o);
  }, r);
}
function _n(e, t, r = ve, n = !1) {
  if (r) {
    const o = r[e] || (r[e] = []), a = t.__weh || (t.__weh = (...s) => {
      Dt();
      const i = Fr(r), c = Je(t, r, e, s);
      return i(), Nt(), c;
    });
    return n ? o.unshift(a) : o.push(a), a;
  }
}
const mt = (e) => (t, r = ve) => {
  (!Vn || e === "sp") && _n(e, (...n) => t(...n), r);
}, Og = mt("bm"), ba = mt("m"), Pg = mt("bu"), ac = mt("u"), va = mt("bum"), sc = mt("um"), Rg = mt("sp"), kg = mt(
  "rtg"
), Ug = mt(
  "rtc"
);
function _g(e, t = ve) {
  _n("ec", e, t);
}
const ic = "components", Fg = "directives";
function Bg(e, t) {
  return cc(ic, e, !0, t) || e;
}
const Vg = Symbol.for("v-ndc");
function zg(e) {
  return cc(Fg, e);
}
function cc(e, t, r = !0, n = !1) {
  const o = Ne || ve;
  if (o) {
    const a = o.type;
    if (e === ic) {
      const i = Pd(
        a,
        !1
      );
      if (i && (i === t || i === $e(t) || i === On($e(t))))
        return a;
    }
    const s = (
      // local registration
      // check instance[type] first which is resolved for options API
      Xa(o[e] || a[e], t) || // global registration
      Xa(o.appContext[e], t)
    );
    return !s && n ? a : s;
  }
}
function Xa(e, t) {
  return e && (e[t] || e[$e(t)] || e[On($e(t))]);
}
const No = (e) => e ? Ec(e) ? zn(e) : No(e.parent) : null, wr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ae(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => No(e.parent),
    $root: (e) => No(e.root),
    $emit: (e) => e.emit,
    $options: (e) => __VUE_OPTIONS_API__ ? ya(e) : e.type,
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, Ia(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ir.bind(e.proxy)),
    $watch: (e) => __VUE_OPTIONS_API__ ? md.bind(e) : De
  })
), oo = (e, t) => e !== le && !e.__isScriptSetup && re(e, t), Hg = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: r, setupState: n, data: o, props: a, accessCache: s, type: i, appContext: c } = e;
    let u;
    if (t[0] !== "$") {
      const I = s[t];
      if (I !== void 0)
        switch (I) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return r[t];
          case 3:
            return a[t];
        }
      else {
        if (oo(n, t))
          return s[t] = 1, n[t];
        if (o !== le && re(o, t))
          return s[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && re(u, t)
        )
          return s[t] = 3, a[t];
        if (r !== le && re(r, t))
          return s[t] = 4, r[t];
        (!__VUE_OPTIONS_API__ || Oo) && (s[t] = 0);
      }
    }
    const l = wr[t];
    let g, m;
    if (l)
      return t === "$attrs" && Oe(e.attrs, "get", ""), l(e);
    if (
      // css module (injected by vue-loader)
      (g = i.__cssModules) && (g = g[t])
    )
      return g;
    if (r !== le && re(r, t))
      return s[t] = 4, r[t];
    if (
      // global properties
      m = c.config.globalProperties, re(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, r) {
    const { data: n, setupState: o, ctx: a } = e;
    return oo(o, t) ? (o[t] = r, !0) : n !== le && re(n, t) ? (n[t] = r, !0) : re(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = r, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: r, ctx: n, appContext: o, propsOptions: a }
  }, s) {
    let i;
    return !!r[s] || e !== le && re(e, s) || oo(t, s) || (i = a[0]) && re(i, s) || re(n, s) || re(wr, s) || re(o.config.globalProperties, s);
  },
  defineProperty(e, t, r) {
    return r.get != null ? e._.accessCache[t] = 0 : re(r, "value") && this.set(e, t, r.value, null), Reflect.defineProperty(e, t, r);
  }
};
function Ka(e) {
  return J(e) ? e.reduce(
    (t, r) => (t[r] = null, t),
    {}
  ) : e;
}
let Oo = !0;
function Zg(e) {
  const t = ya(e), r = e.proxy, n = e.ctx;
  Oo = !1, t.beforeCreate && es(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: a,
    methods: s,
    watch: i,
    provide: c,
    inject: u,
    // lifecycle
    created: l,
    beforeMount: g,
    mounted: m,
    beforeUpdate: I,
    updated: C,
    activated: p,
    deactivated: L,
    beforeDestroy: B,
    beforeUnmount: V,
    destroyed: _,
    unmounted: q,
    render: G,
    renderTracked: F,
    renderTriggered: W,
    errorCaptured: A,
    serverPrefetch: h,
    // public API
    expose: x,
    inheritAttrs: y,
    // assets
    components: v,
    directives: D,
    filters: k
  } = t;
  if (u && Yg(u, n, null), s)
    for (const R in s) {
      const Z = s[R];
      $(Z) && (n[R] = Z.bind(r));
    }
  if (o) {
    const R = o.call(r, r);
    ue(R) && (e.data = ft(R));
  }
  if (Oo = !0, a)
    for (const R in a) {
      const Z = a[R], ie = $(Z) ? Z.bind(r, r) : $(Z.get) ? Z.get.bind(r, r) : De, te = !$(Z) && $(Z.set) ? Z.set.bind(r) : De, ge = X({
        get: ie,
        set: te
      });
      Object.defineProperty(n, R, {
        enumerable: !0,
        configurable: !0,
        get: () => ge.value,
        set: (Pe) => ge.value = Pe
      });
    }
  if (i)
    for (const R in i)
      lc(i[R], n, r, R);
  if (c) {
    const R = $(c) ? c.call(r) : c;
    Reflect.ownKeys(R).forEach((Z) => {
      Fn(Z, R[Z]);
    });
  }
  l && es(l, e, "c");
  function H(R, Z) {
    J(Z) ? Z.forEach((ie) => R(ie.bind(r))) : Z && R(Z.bind(r));
  }
  if (H(Og, g), H(ba, m), H(Pg, I), H(ac, C), H(jg, p), H(Dg, L), H(_g, A), H(Ug, F), H(kg, W), H(va, V), H(sc, q), H(Rg, h), J(x))
    if (x.length) {
      const R = e.exposed || (e.exposed = {});
      x.forEach((Z) => {
        Object.defineProperty(R, Z, {
          get: () => r[Z],
          set: (ie) => r[Z] = ie
        });
      });
    } else
      e.exposed || (e.exposed = {});
  G && e.render === De && (e.render = G), y != null && (e.inheritAttrs = y), v && (e.components = v), D && (e.directives = D);
}
function Yg(e, t, r = De) {
  J(e) && (e = Po(e));
  for (const n in e) {
    const o = e[n];
    let a;
    ue(o) ? "default" in o ? a = at(
      o.from || n,
      o.default,
      !0
    ) : a = at(o.from || n) : a = at(o), ye(a) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => a.value,
      set: (s) => a.value = s
    }) : t[n] = a;
  }
}
function es(e, t, r) {
  Je(
    J(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    r
  );
}
function lc(e, t, r, n) {
  const o = n.includes(".") ? Tc(r, n) : () => r[n];
  if (Ce(e)) {
    const a = t[e];
    $(a) && me(o, a);
  } else if ($(e))
    me(o, e.bind(r));
  else if (ue(e))
    if (J(e))
      e.forEach((a) => lc(a, t, r, n));
    else {
      const a = $(e.handler) ? e.handler.bind(r) : t[e.handler];
      $(a) && me(o, a, e);
    }
}
function ya(e) {
  const t = e.type, { mixins: r, extends: n } = t, {
    mixins: o,
    optionsCache: a,
    config: { optionMergeStrategies: s }
  } = e.appContext, i = a.get(t);
  let c;
  return i ? c = i : !o.length && !r && !n ? c = t : (c = {}, o.length && o.forEach(
    (u) => hn(c, u, s, !0)
  ), hn(c, t, s)), ue(t) && a.set(t, c), c;
}
function hn(e, t, r, n = !1) {
  const { mixins: o, extends: a } = t;
  a && hn(e, a, r, !0), o && o.forEach(
    (s) => hn(e, s, r, !0)
  );
  for (const s in t)
    if (!(n && s === "expose")) {
      const i = Wg[s] || r && r[s];
      e[s] = i ? i(e[s], t[s]) : t[s];
    }
  return e;
}
const Wg = {
  data: ts,
  props: rs,
  emits: rs,
  // objects
  methods: br,
  computed: br,
  // lifecycle
  beforeCreate: Ee,
  created: Ee,
  beforeMount: Ee,
  mounted: Ee,
  beforeUpdate: Ee,
  updated: Ee,
  beforeDestroy: Ee,
  beforeUnmount: Ee,
  destroyed: Ee,
  unmounted: Ee,
  activated: Ee,
  deactivated: Ee,
  errorCaptured: Ee,
  serverPrefetch: Ee,
  // assets
  components: br,
  directives: br,
  // watch
  watch: qg,
  // provide / inject
  provide: ts,
  inject: Jg
};
function ts(e, t) {
  return t ? e ? function() {
    return Ae(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Jg(e, t) {
  return br(Po(e), Po(t));
}
function Po(e) {
  if (J(e)) {
    const t = {};
    for (let r = 0; r < e.length; r++)
      t[e[r]] = e[r];
    return t;
  }
  return e;
}
function Ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function br(e, t) {
  return e ? Ae(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function rs(e, t) {
  return e ? J(e) && J(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ae(
    /* @__PURE__ */ Object.create(null),
    Ka(e),
    Ka(t ?? {})
  ) : t;
}
function qg(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const r = Ae(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    r[n] = Ee(e[n], t[n]);
  return r;
}
function uc() {
  return {
    app: null,
    config: {
      isNativeTag: vu,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Gg = 0;
function Qg(e, t) {
  return function(n, o = null) {
    $(n) || (n = Ae({}, n)), o != null && !ue(o) && (o = null);
    const a = uc(), s = /* @__PURE__ */ new WeakSet();
    let i = !1;
    const c = a.app = {
      _uid: Gg++,
      _component: n,
      _props: o,
      _container: null,
      _context: a,
      _instance: null,
      version: ds,
      get config() {
        return a.config;
      },
      set config(u) {
      },
      use(u, ...l) {
        return s.has(u) || (u && $(u.install) ? (s.add(u), u.install(c, ...l)) : $(u) && (s.add(u), u(c, ...l))), c;
      },
      mixin(u) {
        return __VUE_OPTIONS_API__ && (a.mixins.includes(u) || a.mixins.push(u)), c;
      },
      component(u, l) {
        return l ? (a.components[u] = l, c) : a.components[u];
      },
      directive(u, l) {
        return l ? (a.directives[u] = l, c) : a.directives[u];
      },
      mount(u, l, g) {
        if (!i) {
          const m = ae(n, o);
          return m.appContext = a, g === !0 ? g = "svg" : g === !1 && (g = void 0), l && t ? t(m, u) : e(m, u, g), i = !0, c._container = u, u.__vue_app__ = c, __VUE_PROD_DEVTOOLS__ && (c._instance = m.component, Cg(c, ds)), zn(m.component);
        }
      },
      unmount() {
        i && (e(null, c._container), __VUE_PROD_DEVTOOLS__ && (c._instance = null, bg(c)), delete c._container.__vue_app__);
      },
      provide(u, l) {
        return a.provides[u] = l, c;
      },
      runWithContext(u) {
        const l = rr;
        rr = c;
        try {
          return u();
        } finally {
          rr = l;
        }
      }
    };
    return c;
  };
}
let rr = null;
function Fn(e, t) {
  if (ve) {
    let r = ve.provides;
    const n = ve.parent && ve.parent.provides;
    n === r && (r = ve.provides = Object.create(n)), r[e] = t;
  }
}
function at(e, t, r = !1) {
  const n = ve || Ne;
  if (n || rr) {
    const o = rr ? rr._context.provides : n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return r && $(t) ? t.call(n && n.proxy) : t;
  }
}
const gc = {}, dc = () => Object.create(gc), fc = (e) => Object.getPrototypeOf(e) === gc;
function $g(e, t, r, n = !1) {
  const o = {}, a = dc();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), mc(e, t, o, a);
  for (const s in e.propsOptions[0])
    s in o || (o[s] = void 0);
  r ? e.props = n ? o : ag(o) : e.type.props ? e.props = o : e.props = a, e.attrs = a;
}
function Xg(e, t, r, n) {
  const {
    props: o,
    attrs: a,
    vnode: { patchFlag: s }
  } = e, i = ee(o), [c] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const l = e.vnode.dynamicProps;
      for (let g = 0; g < l.length; g++) {
        let m = l[g];
        if (Bn(e.emitsOptions, m))
          continue;
        const I = t[m];
        if (c)
          if (re(a, m))
            I !== a[m] && (a[m] = I, u = !0);
          else {
            const C = $e(m);
            o[C] = Ro(
              c,
              i,
              C,
              I,
              e,
              !1
            );
          }
        else
          I !== a[m] && (a[m] = I, u = !0);
      }
    }
  } else {
    mc(e, t, o, a) && (u = !0);
    let l;
    for (const g in i)
      (!t || // for camelCase
      !re(t, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((l = qt(g)) === g || !re(t, l))) && (c ? r && // for camelCase
      (r[g] !== void 0 || // for kebab-case
      r[l] !== void 0) && (o[g] = Ro(
        c,
        i,
        g,
        void 0,
        e,
        !0
      )) : delete o[g]);
    if (a !== i)
      for (const g in a)
        (!t || !re(t, g)) && (delete a[g], u = !0);
  }
  u && ut(e.attrs, "set", "");
}
function mc(e, t, r, n) {
  const [o, a] = e.propsOptions;
  let s = !1, i;
  if (t)
    for (let c in t) {
      if (Sr(c))
        continue;
      const u = t[c];
      let l;
      o && re(o, l = $e(c)) ? !a || !a.includes(l) ? r[l] = u : (i || (i = {}))[l] = u : Bn(e.emitsOptions, c) || (!(c in n) || u !== n[c]) && (n[c] = u, s = !0);
    }
  if (a) {
    const c = ee(r), u = i || le;
    for (let l = 0; l < a.length; l++) {
      const g = a[l];
      r[g] = Ro(
        o,
        c,
        g,
        u[g],
        e,
        !re(u, g)
      );
    }
  }
  return s;
}
function Ro(e, t, r, n, o, a) {
  const s = e[r];
  if (s != null) {
    const i = re(s, "default");
    if (i && n === void 0) {
      const c = s.default;
      if (s.type !== Function && !s.skipFactory && $(c)) {
        const { propsDefaults: u } = o;
        if (r in u)
          n = u[r];
        else {
          const l = Fr(o);
          n = u[r] = c.call(
            null,
            t
          ), l();
        }
      } else
        n = c;
    }
    s[
      0
      /* shouldCast */
    ] && (a && !i ? n = !1 : s[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === qt(r)) && (n = !0));
  }
  return n;
}
const Kg = /* @__PURE__ */ new WeakMap();
function Ac(e, t, r = !1) {
  const n = __VUE_OPTIONS_API__ && r ? Kg : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const a = e.props, s = {}, i = [];
  let c = !1;
  if (__VUE_OPTIONS_API__ && !$(e)) {
    const l = (g) => {
      c = !0;
      const [m, I] = Ac(g, t, !0);
      Ae(s, m), I && i.push(...I);
    };
    !r && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  if (!a && !c)
    return ue(e) && n.set(e, xr), xr;
  if (J(a))
    for (let l = 0; l < a.length; l++) {
      const g = $e(a[l]);
      ns(g) && (s[g] = le);
    }
  else if (a)
    for (const l in a) {
      const g = $e(l);
      if (ns(g)) {
        const m = a[l], I = s[g] = J(m) || $(m) ? { type: m } : Ae({}, m), C = I.type;
        let p = !1, L = !0;
        if (J(C))
          for (let B = 0; B < C.length; ++B) {
            const V = C[B], _ = $(V) && V.name;
            if (_ === "Boolean") {
              p = !0;
              break;
            } else
              _ === "String" && (L = !1);
          }
        else
          p = $(C) && C.name === "Boolean";
        I[
          0
          /* shouldCast */
        ] = p, I[
          1
          /* shouldCastTrue */
        ] = L, (p || re(I, "default")) && i.push(g);
      }
    }
  const u = [s, i];
  return ue(e) && n.set(e, u), u;
}
function ns(e) {
  return e[0] !== "$" && !Sr(e);
}
const pc = (e) => e[0] === "_" || e === "$stable", xa = (e) => J(e) ? e.map(tt) : [tt(e)], ed = (e, t, r) => {
  if (t._n)
    return t;
  const n = Sg((...o) => xa(t(...o)), r);
  return n._c = !1, n;
}, Ic = (e, t, r) => {
  const n = e._ctx;
  for (const o in e) {
    if (pc(o))
      continue;
    const a = e[o];
    if ($(a))
      t[o] = ed(o, a, n);
    else if (a != null) {
      const s = xa(a);
      t[o] = () => s;
    }
  }
}, hc = (e, t) => {
  const r = xa(t);
  e.slots.default = () => r;
}, Cc = (e, t, r) => {
  for (const n in t)
    (r || n !== "_") && (e[n] = t[n]);
}, td = (e, t, r) => {
  const n = e.slots = dc();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Cc(n, t, r), r && An(n, "_", o, !0)) : Ic(t, n);
  } else
    t && hc(e, t);
}, rd = (e, t, r) => {
  const { vnode: n, slots: o } = e;
  let a = !0, s = le;
  if (n.shapeFlag & 32) {
    const i = t._;
    i ? r && i === 1 ? a = !1 : Cc(o, t, r) : (a = !t.$stable, Ic(t, o)), s = t;
  } else
    t && (hc(e, t), s = { default: 1 });
  if (a)
    for (const i in o)
      !pc(i) && s[i] == null && delete o[i];
};
function ko(e, t, r, n, o = !1) {
  if (J(e)) {
    e.forEach(
      (m, I) => ko(
        m,
        t && (J(t) ? t[I] : t),
        r,
        n,
        o
      )
    );
    return;
  }
  if (on(n) && !o)
    return;
  const a = n.shapeFlag & 4 ? zn(n.component) : n.el, s = o ? null : a, { i, r: c } = e, u = t && t.r, l = i.refs === le ? i.refs = {} : i.refs, g = i.setupState;
  if (u != null && u !== c && (Ce(u) ? (l[u] = null, re(g, u) && (g[u] = null)) : ye(u) && (u.value = null)), $(c))
    Et(c, i, 12, [s, l]);
  else {
    const m = Ce(c), I = ye(c);
    if (m || I) {
      const C = () => {
        if (e.f) {
          const p = m ? re(g, c) ? g[c] : l[c] : c.value;
          o ? J(p) && na(p, a) : J(p) ? p.includes(a) || p.push(a) : m ? (l[c] = [a], re(g, c) && (g[c] = l[c])) : (c.value = [a], e.k && (l[e.k] = c.value));
        } else
          m ? (l[c] = s, re(g, c) && (g[c] = s)) : I && (c.value = s, e.k && (l[e.k] = s));
      };
      s ? (C.id = -1, je(C, r)) : C();
    }
  }
}
const bc = Symbol("_vte"), nd = (e) => e.__isTeleport, Lr = (e) => e && (e.disabled || e.disabled === ""), os = (e) => typeof SVGElement < "u" && e instanceof SVGElement, as = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Uo = (e, t) => {
  const r = e && e.to;
  return Ce(r) ? t ? t(r) : null : r;
}, od = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, r, n, o, a, s, i, c, u) {
    const {
      mc: l,
      pc: g,
      pbc: m,
      o: { insert: I, querySelector: C, createText: p, createComment: L }
    } = u, B = Lr(t.props);
    let { shapeFlag: V, children: _, dynamicChildren: q } = t;
    if (e == null) {
      const G = t.el = p(""), F = t.anchor = p("");
      I(G, r, n), I(F, r, n);
      const W = t.target = Uo(t.props, C), A = yc(W, t, p, I);
      W && (s === "svg" || os(W) ? s = "svg" : (s === "mathml" || as(W)) && (s = "mathml"));
      const h = (x, y) => {
        V & 16 && l(
          _,
          x,
          y,
          o,
          a,
          s,
          i,
          c
        );
      };
      B ? h(r, F) : W && h(W, A);
    } else {
      t.el = e.el, t.targetStart = e.targetStart;
      const G = t.anchor = e.anchor, F = t.target = e.target, W = t.targetAnchor = e.targetAnchor, A = Lr(e.props), h = A ? r : F, x = A ? G : W;
      if (s === "svg" || os(F) ? s = "svg" : (s === "mathml" || as(F)) && (s = "mathml"), q ? (m(
        e.dynamicChildren,
        q,
        h,
        o,
        a,
        s,
        i
      ), Ta(e, t, !0)) : c || g(
        e,
        t,
        h,
        x,
        o,
        a,
        s,
        i,
        !1
      ), B)
        A ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Gr(
          t,
          r,
          G,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const y = t.target = Uo(
          t.props,
          C
        );
        y && Gr(
          t,
          y,
          null,
          u,
          0
        );
      } else
        A && Gr(
          t,
          F,
          W,
          u,
          1
        );
    }
    vc(t);
  },
  remove(e, t, r, { um: n, o: { remove: o } }, a) {
    const {
      shapeFlag: s,
      children: i,
      anchor: c,
      targetStart: u,
      targetAnchor: l,
      target: g,
      props: m
    } = e;
    if (g && (o(u), o(l)), a && o(c), s & 16) {
      const I = a || !Lr(m);
      for (let C = 0; C < i.length; C++) {
        const p = i[C];
        n(
          p,
          t,
          r,
          I,
          !!p.dynamicChildren
        );
      }
    }
  },
  move: Gr,
  hydrate: ad
};
function Gr(e, t, r, { o: { insert: n }, m: o }, a = 2) {
  a === 0 && n(e.targetAnchor, t, r);
  const { el: s, anchor: i, shapeFlag: c, children: u, props: l } = e, g = a === 2;
  if (g && n(s, t, r), (!g || Lr(l)) && c & 16)
    for (let m = 0; m < u.length; m++)
      o(
        u[m],
        t,
        r,
        2
      );
  g && n(i, t, r);
}
function ad(e, t, r, n, o, a, {
  o: { nextSibling: s, parentNode: i, querySelector: c, insert: u, createText: l }
}, g) {
  const m = t.target = Uo(
    t.props,
    c
  );
  if (m) {
    const I = m._lpa || m.firstChild;
    if (t.shapeFlag & 16)
      if (Lr(t.props))
        t.anchor = g(
          s(e),
          t,
          i(e),
          r,
          n,
          o,
          a
        ), t.targetStart = I, t.targetAnchor = I && s(I);
      else {
        t.anchor = s(e);
        let C = I;
        for (; C; ) {
          if (C && C.nodeType === 8) {
            if (C.data === "teleport start anchor")
              t.targetStart = C;
            else if (C.data === "teleport anchor") {
              t.targetAnchor = C, m._lpa = t.targetAnchor && s(t.targetAnchor);
              break;
            }
          }
          C = s(C);
        }
        t.targetAnchor || yc(m, t, l, u), g(
          I && s(I),
          t,
          m,
          r,
          n,
          o,
          a
        );
      }
    vc(t);
  }
  return t.anchor && s(t.anchor);
}
const sd = od;
function vc(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let r = e.children[0].el;
    for (; r && r !== e.targetAnchor; )
      r.nodeType === 1 && r.setAttribute("data-v-owner", t.uid), r = r.nextSibling;
    t.ut();
  }
}
function yc(e, t, r, n) {
  const o = t.targetStart = r(""), a = t.targetAnchor = r("");
  return o[bc] = a, e && (n(o, e), n(a, e)), a;
}
function id() {
  typeof __VUE_OPTIONS_API__ != "boolean" && (Mr().__VUE_OPTIONS_API__ = !0), typeof __VUE_PROD_DEVTOOLS__ != "boolean" && (Mr().__VUE_PROD_DEVTOOLS__ = !1), typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (Mr().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
}
const je = yd;
function cd(e) {
  return ld(e);
}
function ld(e, t) {
  id();
  const r = Mr();
  r.__VUE__ = !0, __VUE_PROD_DEVTOOLS__ && $i(r.__VUE_DEVTOOLS_GLOBAL_HOOK__, r);
  const {
    insert: n,
    remove: o,
    patchProp: a,
    createElement: s,
    createText: i,
    createComment: c,
    setText: u,
    setElementText: l,
    parentNode: g,
    nextSibling: m,
    setScopeId: I = De,
    insertStaticContent: C
  } = e, p = (d, f, b, S = null, T = null, w = null, P = void 0, N = null, O = !!f.dynamicChildren) => {
    if (d === f)
      return;
    d && !Ft(d, f) && (S = be(d), Pe(d, T, w, !0), d = null), f.patchFlag === -2 && (O = !1, f.dynamicChildren = null);
    const { type: M, ref: U, shapeFlag: Y } = f;
    switch (M) {
      case _r:
        L(d, f, b, S);
        break;
      case We:
        B(d, f, b, S);
        break;
      case an:
        d == null && V(f, b, S, P);
        break;
      case Fe:
        v(
          d,
          f,
          b,
          S,
          T,
          w,
          P,
          N,
          O
        );
        break;
      default:
        Y & 1 ? G(
          d,
          f,
          b,
          S,
          T,
          w,
          P,
          N,
          O
        ) : Y & 6 ? D(
          d,
          f,
          b,
          S,
          T,
          w,
          P,
          N,
          O
        ) : (Y & 64 || Y & 128) && M.process(
          d,
          f,
          b,
          S,
          T,
          w,
          P,
          N,
          O,
          it
        );
    }
    U != null && T && ko(U, d && d.ref, w, f || d, !f);
  }, L = (d, f, b, S) => {
    if (d == null)
      n(
        f.el = i(f.children),
        b,
        S
      );
    else {
      const T = f.el = d.el;
      f.children !== d.children && u(T, f.children);
    }
  }, B = (d, f, b, S) => {
    d == null ? n(
      f.el = c(f.children || ""),
      b,
      S
    ) : f.el = d.el;
  }, V = (d, f, b, S) => {
    [d.el, d.anchor] = C(
      d.children,
      f,
      b,
      S,
      d.el,
      d.anchor
    );
  }, _ = ({ el: d, anchor: f }, b, S) => {
    let T;
    for (; d && d !== f; )
      T = m(d), n(d, b, S), d = T;
    n(f, b, S);
  }, q = ({ el: d, anchor: f }) => {
    let b;
    for (; d && d !== f; )
      b = m(d), o(d), d = b;
    o(f);
  }, G = (d, f, b, S, T, w, P, N, O) => {
    f.type === "svg" ? P = "svg" : f.type === "math" && (P = "mathml"), d == null ? F(
      f,
      b,
      S,
      T,
      w,
      P,
      N,
      O
    ) : h(
      d,
      f,
      T,
      w,
      P,
      N,
      O
    );
  }, F = (d, f, b, S, T, w, P, N) => {
    let O, M;
    const { props: U, shapeFlag: Y, transition: z, dirs: Q } = d;
    if (O = d.el = s(
      d.type,
      w,
      U && U.is,
      U
    ), Y & 8 ? l(O, d.children) : Y & 16 && A(
      d.children,
      O,
      null,
      S,
      T,
      ao(d, w),
      P,
      N
    ), Q && Pt(d, null, S, "created"), W(O, d, d.scopeId, P, S), U) {
      for (const ce in U)
        ce !== "value" && !Sr(ce) && a(O, ce, null, U[ce], w, S);
      "value" in U && a(O, "value", null, U.value, w), (M = U.onVnodeBeforeMount) && et(M, S, d);
    }
    __VUE_PROD_DEVTOOLS__ && (An(O, "__vnode", d, !0), An(O, "__vueParentComponent", S, !0)), Q && Pt(d, null, S, "beforeMount");
    const K = ud(T, z);
    K && z.beforeEnter(O), n(O, f, b), ((M = U && U.onVnodeMounted) || K || Q) && je(() => {
      M && et(M, S, d), K && z.enter(O), Q && Pt(d, null, S, "mounted");
    }, T);
  }, W = (d, f, b, S, T) => {
    if (b && I(d, b), S)
      for (let w = 0; w < S.length; w++)
        I(d, S[w]);
    if (T) {
      let w = T.subTree;
      if (f === w) {
        const P = T.vnode;
        W(
          d,
          P,
          P.scopeId,
          P.slotScopeIds,
          T.parent
        );
      }
    }
  }, A = (d, f, b, S, T, w, P, N, O = 0) => {
    for (let M = O; M < d.length; M++) {
      const U = d[M] = N ? yt(d[M]) : tt(d[M]);
      p(
        null,
        U,
        f,
        b,
        S,
        T,
        w,
        P,
        N
      );
    }
  }, h = (d, f, b, S, T, w, P) => {
    const N = f.el = d.el;
    __VUE_PROD_DEVTOOLS__ && (N.__vnode = f);
    let { patchFlag: O, dynamicChildren: M, dirs: U } = f;
    O |= d.patchFlag & 16;
    const Y = d.props || le, z = f.props || le;
    let Q;
    if (b && Rt(b, !1), (Q = z.onVnodeBeforeUpdate) && et(Q, b, f, d), U && Pt(f, d, b, "beforeUpdate"), b && Rt(b, !0), (Y.innerHTML && z.innerHTML == null || Y.textContent && z.textContent == null) && l(N, ""), M ? x(
      d.dynamicChildren,
      M,
      N,
      b,
      S,
      ao(f, T),
      w
    ) : P || Z(
      d,
      f,
      N,
      null,
      b,
      S,
      ao(f, T),
      w,
      !1
    ), O > 0) {
      if (O & 16)
        y(N, Y, z, b, T);
      else if (O & 2 && Y.class !== z.class && a(N, "class", null, z.class, T), O & 4 && a(N, "style", Y.style, z.style, T), O & 8) {
        const K = f.dynamicProps;
        for (let ce = 0; ce < K.length; ce++) {
          const oe = K[ce], pe = Y[oe], Ge = z[oe];
          (Ge !== pe || oe === "value") && a(N, oe, pe, Ge, T, b);
        }
      }
      O & 1 && d.children !== f.children && l(N, f.children);
    } else
      !P && M == null && y(N, Y, z, b, T);
    ((Q = z.onVnodeUpdated) || U) && je(() => {
      Q && et(Q, b, f, d), U && Pt(f, d, b, "updated");
    }, S);
  }, x = (d, f, b, S, T, w, P) => {
    for (let N = 0; N < f.length; N++) {
      const O = d[N], M = f[N], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ft(O, M) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 70) ? g(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      p(
        O,
        M,
        U,
        null,
        S,
        T,
        w,
        P,
        !0
      );
    }
  }, y = (d, f, b, S, T) => {
    if (f !== b) {
      if (f !== le)
        for (const w in f)
          !Sr(w) && !(w in b) && a(
            d,
            w,
            f[w],
            null,
            T,
            S
          );
      for (const w in b) {
        if (Sr(w))
          continue;
        const P = b[w], N = f[w];
        P !== N && w !== "value" && a(d, w, N, P, T, S);
      }
      "value" in b && a(d, "value", f.value, b.value, T);
    }
  }, v = (d, f, b, S, T, w, P, N, O) => {
    const M = f.el = d ? d.el : i(""), U = f.anchor = d ? d.anchor : i("");
    let { patchFlag: Y, dynamicChildren: z, slotScopeIds: Q } = f;
    Q && (N = N ? N.concat(Q) : Q), d == null ? (n(M, b, S), n(U, b, S), A(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      b,
      U,
      T,
      w,
      P,
      N,
      O
    )) : Y > 0 && Y & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (x(
      d.dynamicChildren,
      z,
      b,
      T,
      w,
      P,
      N
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || T && f === T.subTree) && Ta(
      d,
      f,
      !0
      /* shallow */
    )) : Z(
      d,
      f,
      b,
      U,
      T,
      w,
      P,
      N,
      O
    );
  }, D = (d, f, b, S, T, w, P, N, O) => {
    f.slotScopeIds = N, d == null ? f.shapeFlag & 512 ? T.ctx.activate(
      f,
      b,
      S,
      P,
      O
    ) : k(
      f,
      b,
      S,
      T,
      w,
      P,
      O
    ) : j(d, f, O);
  }, k = (d, f, b, S, T, w, P) => {
    const N = d.component = Ld(
      d,
      S,
      T
    );
    if (Un(d) && (N.ctx.renderer = it), jd(N, !1, P), N.asyncDep) {
      if (T && T.registerDep(N, H, P), !d.el) {
        const O = N.subTree = ae(We);
        B(null, O, f, b);
      }
    } else
      H(
        N,
        d,
        f,
        b,
        T,
        w,
        P
      );
  }, j = (d, f, b) => {
    const S = f.component = d.component;
    if (Cd(d, f, b))
      if (S.asyncDep && !S.asyncResolved) {
        R(S, f, b);
        return;
      } else
        S.next = f, pg(S.update), S.effect.dirty = !0, S.update();
    else
      f.el = d.el, S.vnode = f;
  }, H = (d, f, b, S, T, w, P) => {
    const N = () => {
      if (d.isMounted) {
        let { next: U, bu: Y, u: z, parent: Q, vnode: K } = d;
        {
          const Qt = xc(d);
          if (Qt) {
            U && (U.el = K.el, R(d, U, P)), Qt.asyncDep.then(() => {
              d.isUnmounted || N();
            });
            return;
          }
        }
        let ce = U, oe;
        Rt(d, !1), U ? (U.el = K.el, R(d, U, P)) : U = K, Y && ro(Y), (oe = U.props && U.props.onVnodeBeforeUpdate) && et(oe, Q, U, K), Rt(d, !0);
        const pe = so(d), Ge = d.subTree;
        d.subTree = pe, p(
          Ge,
          pe,
          // parent may have changed if it's in a teleport
          g(Ge.el),
          // anchor may have changed if it's in a fragment
          be(Ge),
          d,
          T,
          w
        ), U.el = pe.el, ce === null && bd(d, pe.el), z && je(z, T), (oe = U.props && U.props.onVnodeUpdated) && je(
          () => et(oe, Q, U, K),
          T
        ), __VUE_PROD_DEVTOOLS__ && Xi(d);
      } else {
        let U;
        const { el: Y, props: z } = f, { bm: Q, m: K, parent: ce } = d, oe = on(f);
        if (Rt(d, !1), Q && ro(Q), !oe && (U = z && z.onVnodeBeforeMount) && et(U, ce, f), Rt(d, !0), Y && Xn) {
          const pe = () => {
            d.subTree = so(d), Xn(
              Y,
              d.subTree,
              d,
              T,
              null
            );
          };
          oe ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !d.isUnmounted && pe()
          ) : pe();
        } else {
          const pe = d.subTree = so(d);
          p(
            null,
            pe,
            b,
            S,
            d,
            T,
            w
          ), f.el = pe.el;
        }
        if (K && je(K, T), !oe && (U = z && z.onVnodeMounted)) {
          const pe = f;
          je(
            () => et(U, ce, pe),
            T
          );
        }
        (f.shapeFlag & 256 || ce && on(ce.vnode) && ce.vnode.shapeFlag & 256) && d.a && je(d.a, T), d.isMounted = !0, __VUE_PROD_DEVTOOLS__ && vg(d), f = b = S = null;
      }
    }, O = d.effect = new ca(
      N,
      De,
      () => Ia(M),
      d.scope
      // track it in component's effect scope
    ), M = d.update = () => {
      O.dirty && O.run();
    };
    M.i = d, M.id = d.uid, Rt(d, !0), M();
  }, R = (d, f, b) => {
    f.component = d;
    const S = d.vnode.props;
    d.vnode = f, d.next = null, Xg(d, f.props, S, b), rd(d, f.children, b), Dt(), Qa(d), Nt();
  }, Z = (d, f, b, S, T, w, P, N, O = !1) => {
    const M = d && d.children, U = d ? d.shapeFlag : 0, Y = f.children, { patchFlag: z, shapeFlag: Q } = f;
    if (z > 0) {
      if (z & 128) {
        te(
          M,
          Y,
          b,
          S,
          T,
          w,
          P,
          N,
          O
        );
        return;
      } else if (z & 256) {
        ie(
          M,
          Y,
          b,
          S,
          T,
          w,
          P,
          N,
          O
        );
        return;
      }
    }
    Q & 8 ? (U & 16 && ne(M, T, w), Y !== M && l(b, Y)) : U & 16 ? Q & 16 ? te(
      M,
      Y,
      b,
      S,
      T,
      w,
      P,
      N,
      O
    ) : ne(M, T, w, !0) : (U & 8 && l(b, ""), Q & 16 && A(
      Y,
      b,
      S,
      T,
      w,
      P,
      N,
      O
    ));
  }, ie = (d, f, b, S, T, w, P, N, O) => {
    d = d || xr, f = f || xr;
    const M = d.length, U = f.length, Y = Math.min(M, U);
    let z;
    for (z = 0; z < Y; z++) {
      const Q = f[z] = O ? yt(f[z]) : tt(f[z]);
      p(
        d[z],
        Q,
        b,
        null,
        T,
        w,
        P,
        N,
        O
      );
    }
    M > U ? ne(
      d,
      T,
      w,
      !0,
      !1,
      Y
    ) : A(
      f,
      b,
      S,
      T,
      w,
      P,
      N,
      O,
      Y
    );
  }, te = (d, f, b, S, T, w, P, N, O) => {
    let M = 0;
    const U = f.length;
    let Y = d.length - 1, z = U - 1;
    for (; M <= Y && M <= z; ) {
      const Q = d[M], K = f[M] = O ? yt(f[M]) : tt(f[M]);
      if (Ft(Q, K))
        p(
          Q,
          K,
          b,
          null,
          T,
          w,
          P,
          N,
          O
        );
      else
        break;
      M++;
    }
    for (; M <= Y && M <= z; ) {
      const Q = d[Y], K = f[z] = O ? yt(f[z]) : tt(f[z]);
      if (Ft(Q, K))
        p(
          Q,
          K,
          b,
          null,
          T,
          w,
          P,
          N,
          O
        );
      else
        break;
      Y--, z--;
    }
    if (M > Y) {
      if (M <= z) {
        const Q = z + 1, K = Q < U ? f[Q].el : S;
        for (; M <= z; )
          p(
            null,
            f[M] = O ? yt(f[M]) : tt(f[M]),
            b,
            K,
            T,
            w,
            P,
            N,
            O
          ), M++;
      }
    } else if (M > z)
      for (; M <= Y; )
        Pe(d[M], T, w, !0), M++;
    else {
      const Q = M, K = M, ce = /* @__PURE__ */ new Map();
      for (M = K; M <= z; M++) {
        const Re = f[M] = O ? yt(f[M]) : tt(f[M]);
        Re.key != null && ce.set(Re.key, M);
      }
      let oe, pe = 0;
      const Ge = z - K + 1;
      let Qt = !1, ka = 0;
      const lr = new Array(Ge);
      for (M = 0; M < Ge; M++)
        lr[M] = 0;
      for (M = Q; M <= Y; M++) {
        const Re = d[M];
        if (pe >= Ge) {
          Pe(Re, T, w, !0);
          continue;
        }
        let Ke;
        if (Re.key != null)
          Ke = ce.get(Re.key);
        else
          for (oe = K; oe <= z; oe++)
            if (lr[oe - K] === 0 && Ft(Re, f[oe])) {
              Ke = oe;
              break;
            }
        Ke === void 0 ? Pe(Re, T, w, !0) : (lr[Ke - K] = M + 1, Ke >= ka ? ka = Ke : Qt = !0, p(
          Re,
          f[Ke],
          b,
          null,
          T,
          w,
          P,
          N,
          O
        ), pe++);
      }
      const Ua = Qt ? gd(lr) : xr;
      for (oe = Ua.length - 1, M = Ge - 1; M >= 0; M--) {
        const Re = K + M, Ke = f[Re], _a = Re + 1 < U ? f[Re + 1].el : S;
        lr[M] === 0 ? p(
          null,
          Ke,
          b,
          _a,
          T,
          w,
          P,
          N,
          O
        ) : Qt && (oe < 0 || M !== Ua[oe] ? ge(Ke, b, _a, 2) : oe--);
      }
    }
  }, ge = (d, f, b, S, T = null) => {
    const { el: w, type: P, transition: N, children: O, shapeFlag: M } = d;
    if (M & 6) {
      ge(d.component.subTree, f, b, S);
      return;
    }
    if (M & 128) {
      d.suspense.move(f, b, S);
      return;
    }
    if (M & 64) {
      P.move(d, f, b, it);
      return;
    }
    if (P === Fe) {
      n(w, f, b);
      for (let Y = 0; Y < O.length; Y++)
        ge(O[Y], f, b, S);
      n(d.anchor, f, b);
      return;
    }
    if (P === an) {
      _(d, f, b);
      return;
    }
    if (S !== 2 && M & 1 && N)
      if (S === 0)
        N.beforeEnter(w), n(w, f, b), je(() => N.enter(w), T);
      else {
        const { leave: Y, delayLeave: z, afterLeave: Q } = N, K = () => n(w, f, b), ce = () => {
          Y(w, () => {
            K(), Q && Q();
          });
        };
        z ? z(w, K, ce) : ce();
      }
    else
      n(w, f, b);
  }, Pe = (d, f, b, S = !1, T = !1) => {
    const {
      type: w,
      props: P,
      ref: N,
      children: O,
      dynamicChildren: M,
      shapeFlag: U,
      patchFlag: Y,
      dirs: z,
      cacheIndex: Q
    } = d;
    if (Y === -2 && (T = !1), N != null && ko(N, null, b, d, !0), Q != null && (f.renderCache[Q] = void 0), U & 256) {
      f.ctx.deactivate(d);
      return;
    }
    const K = U & 1 && z, ce = !on(d);
    let oe;
    if (ce && (oe = P && P.onVnodeBeforeUnmount) && et(oe, f, d), U & 6)
      Qn(d.component, b, S);
    else {
      if (U & 128) {
        d.suspense.unmount(b, S);
        return;
      }
      K && Pt(d, null, f, "beforeUnmount"), U & 64 ? d.type.remove(
        d,
        f,
        b,
        it,
        S
      ) : M && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !M.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== Fe || Y > 0 && Y & 64) ? ne(
        M,
        f,
        b,
        !1,
        !0
      ) : (w === Fe && Y & 384 || !T && U & 16) && ne(O, f, b), S && Ot(d);
    }
    (ce && (oe = P && P.onVnodeUnmounted) || K) && je(() => {
      oe && et(oe, f, d), K && Pt(d, null, f, "unmounted");
    }, b);
  }, Ot = (d) => {
    const { type: f, el: b, anchor: S, transition: T } = d;
    if (f === Fe) {
      Gn(b, S);
      return;
    }
    if (f === an) {
      q(d);
      return;
    }
    const w = () => {
      o(b), T && !T.persisted && T.afterLeave && T.afterLeave();
    };
    if (d.shapeFlag & 1 && T && !T.persisted) {
      const { leave: P, delayLeave: N } = T, O = () => P(b, w);
      N ? N(d.el, w, O) : O();
    } else
      w();
  }, Gn = (d, f) => {
    let b;
    for (; d !== f; )
      b = m(d), o(d), d = b;
    o(f);
  }, Qn = (d, f, b) => {
    const { bum: S, scope: T, update: w, subTree: P, um: N, m: O, a: M } = d;
    ss(O), ss(M), S && ro(S), T.stop(), w && (w.active = !1, Pe(P, d, f, b)), N && je(N, f), je(() => {
      d.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve()), __VUE_PROD_DEVTOOLS__ && xg(d);
  }, ne = (d, f, b, S = !1, T = !1, w = 0) => {
    for (let P = w; P < d.length; P++)
      Pe(d[P], f, b, S, T);
  }, be = (d) => {
    if (d.shapeFlag & 6)
      return be(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const f = m(d.anchor || d.el), b = f && f[bc];
    return b ? m(b) : f;
  };
  let st = !1;
  const cr = (d, f, b) => {
    d == null ? f._vnode && Pe(f._vnode, null, null, !0) : p(
      f._vnode || null,
      d,
      f,
      null,
      null,
      null,
      b
    ), f._vnode = d, st || (st = !0, Qa(), Gi(), st = !1);
  }, it = {
    p,
    um: Pe,
    m: ge,
    r: Ot,
    mt: k,
    mc: A,
    pc: Z,
    pbc: x,
    n: be,
    o: e
  };
  let $n, Xn;
  return t && ([$n, Xn] = t(
    it
  )), {
    render: cr,
    hydrate: $n,
    createApp: Qg(cr, $n)
  };
}
function ao({ type: e, props: t }, r) {
  return r === "svg" && e === "foreignObject" || r === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : r;
}
function Rt({ effect: e, update: t }, r) {
  e.allowRecurse = t.allowRecurse = r;
}
function ud(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ta(e, t, r = !1) {
  const n = e.children, o = t.children;
  if (J(n) && J(o))
    for (let a = 0; a < n.length; a++) {
      const s = n[a];
      let i = o[a];
      i.shapeFlag & 1 && !i.dynamicChildren && ((i.patchFlag <= 0 || i.patchFlag === 32) && (i = o[a] = yt(o[a]), i.el = s.el), !r && i.patchFlag !== -2 && Ta(s, i)), i.type === _r && (i.el = s.el);
    }
}
function gd(e) {
  const t = e.slice(), r = [0];
  let n, o, a, s, i;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const u = e[n];
    if (u !== 0) {
      if (o = r[r.length - 1], e[o] < u) {
        t[n] = o, r.push(n);
        continue;
      }
      for (a = 0, s = r.length - 1; a < s; )
        i = a + s >> 1, e[r[i]] < u ? a = i + 1 : s = i;
      u < e[r[a]] && (a > 0 && (t[n] = r[a - 1]), r[a] = n);
    }
  }
  for (a = r.length, s = r[a - 1]; a-- > 0; )
    r[a] = s, s = t[s];
  return r;
}
function xc(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : xc(t);
}
function ss(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].active = !1;
}
const dd = Symbol.for("v-scx"), fd = () => at(dd);
function Gt(e, t) {
  return Sa(e, null, t);
}
const Qr = {};
function me(e, t, r) {
  return Sa(e, t, r);
}
function Sa(e, t, {
  immediate: r,
  deep: n,
  flush: o,
  once: a,
  onTrack: s,
  onTrigger: i
} = le) {
  if (t && a) {
    const F = t;
    t = (...W) => {
      F(...W), G();
    };
  }
  const c = ve, u = (F) => n === !0 ? F : (
    // for deep: false, only traverse root-level properties
    xt(F, n === !1 ? 1 : void 0)
  );
  let l, g = !1, m = !1;
  if (ye(e) ? (l = () => e.value, g = nr(e)) : Er(e) ? (l = () => u(e), g = !0) : J(e) ? (m = !0, g = e.some((F) => Er(F) || nr(F)), l = () => e.map((F) => {
    if (ye(F))
      return F.value;
    if (Er(F))
      return u(F);
    if ($(F))
      return Et(F, c, 2);
  })) : $(e) ? t ? l = () => Et(e, c, 2) : l = () => (I && I(), Je(
    e,
    c,
    3,
    [C]
  )) : l = De, t && n) {
    const F = l;
    l = () => xt(F());
  }
  let I, C = (F) => {
    I = _.onStop = () => {
      Et(F, c, 4), I = _.onStop = void 0;
    };
  }, p;
  if (Vn)
    if (C = De, t ? r && Je(t, c, 3, [
      l(),
      m ? [] : void 0,
      C
    ]) : l(), o === "sync") {
      const F = fd();
      p = F.__watcherHandles || (F.__watcherHandles = []);
    } else
      return De;
  let L = m ? new Array(e.length).fill(Qr) : Qr;
  const B = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const F = _.run();
        (n || g || (m ? F.some((W, A) => wt(W, L[A])) : wt(F, L))) && (I && I(), Je(t, c, 3, [
          F,
          // pass undefined as the old value when it's changed for the first time
          L === Qr ? void 0 : m && L[0] === Qr ? [] : L,
          C
        ]), L = F);
      } else
        _.run();
  };
  B.allowRecurse = !!t;
  let V;
  o === "sync" ? V = B : o === "post" ? V = () => je(B, c && c.suspense) : (B.pre = !0, c && (B.id = c.uid), V = () => Ia(B));
  const _ = new ca(l, De, V), q = _u(), G = () => {
    _.stop(), q && na(q.effects, _);
  };
  return t ? r ? B() : L = _.run() : o === "post" ? je(
    _.run.bind(_),
    c && c.suspense
  ) : _.run(), p && p.push(G), G;
}
function md(e, t, r) {
  const n = this.proxy, o = Ce(e) ? e.includes(".") ? Tc(n, e) : () => n[e] : e.bind(n, n);
  let a;
  $(t) ? a = t : (a = t.handler, r = t);
  const s = Fr(this), i = Sa(o, a.bind(n), r);
  return s(), i;
}
function Tc(e, t) {
  const r = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < r.length && n; o++)
      n = n[r[o]];
    return n;
  };
}
function xt(e, t = 1 / 0, r) {
  if (t <= 0 || !ue(e) || e.__v_skip || (r = r || /* @__PURE__ */ new Set(), r.has(e)))
    return e;
  if (r.add(e), t--, ye(e))
    xt(e.value, t, r);
  else if (J(e))
    for (let n = 0; n < e.length; n++)
      xt(e[n], t, r);
  else if (xu(e) || Tr(e))
    e.forEach((n) => {
      xt(n, t, r);
    });
  else if (Mu(e)) {
    for (const n in e)
      xt(e[n], t, r);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && xt(e[n], t, r);
  }
  return e;
}
const Ad = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${$e(t)}Modifiers`] || e[`${qt(t)}Modifiers`];
function pd(e, t, ...r) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || le;
  let o = r;
  const a = t.startsWith("update:"), s = a && Ad(n, t.slice(7));
  s && (s.trim && (o = r.map((l) => Ce(l) ? l.trim() : l)), s.number && (o = r.map(Lu))), __VUE_PROD_DEVTOOLS__ && Tg(e, t, o);
  let i, c = n[i = to(t)] || // also try camelCase event handler (#2249)
  n[i = to($e(t))];
  !c && a && (c = n[i = to(qt(t))]), c && Je(
    c,
    e,
    6,
    o
  );
  const u = n[i + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[i])
      return;
    e.emitted[i] = !0, Je(
      u,
      e,
      6,
      o
    );
  }
}
function Sc(e, t, r = !1) {
  const n = t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const a = e.emits;
  let s = {}, i = !1;
  if (__VUE_OPTIONS_API__ && !$(e)) {
    const c = (u) => {
      const l = Sc(u, t, !0);
      l && (i = !0, Ae(s, l));
    };
    !r && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !a && !i ? (ue(e) && n.set(e, null), null) : (J(a) ? a.forEach((c) => s[c] = null) : Ae(s, a), ue(e) && n.set(e, s), s);
}
function Bn(e, t) {
  return !e || !jn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), re(e, t[0].toLowerCase() + t.slice(1)) || re(e, qt(t)) || re(e, t));
}
function so(e) {
  const {
    type: t,
    vnode: r,
    proxy: n,
    withProxy: o,
    propsOptions: [a],
    slots: s,
    attrs: i,
    emit: c,
    render: u,
    renderCache: l,
    props: g,
    data: m,
    setupState: I,
    ctx: C,
    inheritAttrs: p
  } = e, L = In(e);
  let B, V;
  try {
    if (r.shapeFlag & 4) {
      const q = o || n, G = q;
      B = tt(
        u.call(
          G,
          q,
          l,
          g,
          I,
          m,
          C
        )
      ), V = i;
    } else {
      const q = t;
      B = tt(
        q.length > 1 ? q(
          g,
          { attrs: i, slots: s, emit: c }
        ) : q(
          g,
          null
        )
      ), V = t.props ? i : Id(i);
    }
  } catch (q) {
    Rn(q, e, 1), B = ae(We);
  }
  let _ = B;
  if (V && p !== !1) {
    const q = Object.keys(V), { shapeFlag: G } = _;
    q.length && G & 7 && (a && q.some(ra) && (V = hd(
      V,
      a
    )), _ = Lt(_, V, !1, !0));
  }
  return r.dirs && (_ = Lt(_, null, !1, !0), _.dirs = _.dirs ? _.dirs.concat(r.dirs) : r.dirs), r.transition && (_.transition = r.transition), B = _, In(L), B;
}
const Id = (e) => {
  let t;
  for (const r in e)
    (r === "class" || r === "style" || jn(r)) && ((t || (t = {}))[r] = e[r]);
  return t;
}, hd = (e, t) => {
  const r = {};
  for (const n in e)
    (!ra(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
  return r;
};
function Cd(e, t, r) {
  const { props: n, children: o, component: a } = e, { props: s, children: i, patchFlag: c } = t, u = a.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (r && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? is(n, s, u) : !!s;
    if (c & 8) {
      const l = t.dynamicProps;
      for (let g = 0; g < l.length; g++) {
        const m = l[g];
        if (s[m] !== n[m] && !Bn(u, m))
          return !0;
      }
    }
  } else
    return (o || i) && (!i || !i.$stable) ? !0 : n === s ? !1 : n ? s ? is(n, s, u) : !0 : !!s;
  return !1;
}
function is(e, t, r) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const a = n[o];
    if (t[a] !== e[a] && !Bn(r, a))
      return !0;
  }
  return !1;
}
function bd({ vnode: e, parent: t }, r) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = r, t = t.parent;
    else
      break;
  }
}
const vd = (e) => e.__isSuspense;
function yd(e, t) {
  t && t.pendingBranch ? J(e) ? t.effects.push(...e) : t.effects.push(e) : Ig(e);
}
const Fe = Symbol.for("v-fgt"), _r = Symbol.for("v-txt"), We = Symbol.for("v-cmt"), an = Symbol.for("v-stc");
let St = null, Ma = 1;
function cs(e) {
  Ma += e, e < 0 && St && (St.hasOnce = !0);
}
function _o(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Mc = ({ key: e }) => e ?? null, sn = ({
  ref: e,
  ref_key: t,
  ref_for: r
}) => (typeof e == "number" && (e = "" + e), e != null ? Ce(e) || ye(e) || $(e) ? { i: Ne, r: e, k: t, f: !!r } : e : null);
function xd(e, t = null, r = null, n = 0, o = null, a = e === Fe ? 0 : 1, s = !1, i = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Mc(t),
    ref: t && sn(t),
    scopeId: Ki,
    slotScopeIds: null,
    children: r,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: a,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ne
  };
  return i ? (Ea(c, r), a & 128 && e.normalize(c)) : r && (c.shapeFlag |= Ce(r) ? 8 : 16), Ma > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  St && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || a & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && St.push(c), c;
}
const ae = Td;
function Td(e, t = null, r = null, n = 0, o = null, a = !1) {
  if ((!e || e === Vg) && (e = We), _o(e)) {
    const i = Lt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return r && Ea(i, r), Ma > 0 && !a && St && (i.shapeFlag & 6 ? St[St.indexOf(e)] = i : St.push(i)), i.patchFlag = -2, i;
  }
  if (Rd(e) && (e = e.__vccOpts), t) {
    t = Sd(t);
    let { class: i, style: c } = t;
    i && !Ce(i) && (t.class = sa(i)), ue(c) && (Bi(c) && !J(c) && (c = Ae({}, c)), t.style = aa(c));
  }
  const s = Ce(e) ? 1 : vd(e) ? 128 : nd(e) ? 64 : ue(e) ? 4 : $(e) ? 2 : 0;
  return xd(
    e,
    t,
    r,
    n,
    o,
    s,
    a,
    !0
  );
}
function Sd(e) {
  return e ? Bi(e) || fc(e) ? Ae({}, e) : e : null;
}
function Lt(e, t, r = !1, n = !1) {
  const { props: o, ref: a, patchFlag: s, children: i, transition: c } = e, u = t ? Ve(o || {}, t) : o, l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Mc(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      r && a ? J(a) ? a.concat(sn(t)) : [a, sn(t)] : sn(t)
    ) : a,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Fe ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Lt(e.ssContent),
    ssFallback: e.ssFallback && Lt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && or(
    l,
    c.clone(l)
  ), l;
}
function Md(e = " ", t = 0) {
  return ae(_r, null, e, t);
}
function tt(e) {
  return e == null || typeof e == "boolean" ? ae(We) : J(e) ? ae(
    Fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? yt(e) : ae(_r, null, String(e));
}
function yt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Lt(e);
}
function Ea(e, t) {
  let r = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (J(t))
    r = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ea(e, o()), o._c && (o._d = !0));
      return;
    } else {
      r = 32;
      const o = t._;
      !o && !fc(t) ? t._ctx = Ne : o === 3 && Ne && (Ne.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    $(t) ? (t = { default: t, _ctx: Ne }, r = 32) : (t = String(t), n & 64 ? (r = 16, t = [Md(t)]) : r = 8);
  e.children = t, e.shapeFlag |= r;
}
function Ve(...e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = sa([t.class, n.class]));
      else if (o === "style")
        t.style = aa([t.style, n.style]);
      else if (jn(o)) {
        const a = t[o], s = n[o];
        s && a !== s && !(J(a) && a.includes(s)) && (t[o] = a ? [].concat(a, s) : s);
      } else
        o !== "" && (t[o] = n[o]);
  }
  return t;
}
function et(e, t, r, n = null) {
  Je(e, t, 7, [
    r,
    n
  ]);
}
const Ed = uc();
let wd = 0;
function Ld(e, t, r) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Ed, a = {
    uid: wd++,
    vnode: e,
    type: n,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new wi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ac(n, o),
    emitsOptions: Sc(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: le,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: le,
    data: le,
    props: le,
    attrs: le,
    slots: le,
    refs: le,
    setupState: le,
    setupContext: null,
    // suspense related
    suspense: r,
    suspenseId: r ? r.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = pd.bind(null, a), e.ce && e.ce(a), a;
}
let ve = null;
const wa = () => ve || Ne;
let Cn, Fo;
{
  const e = Mr(), t = (r, n) => {
    let o;
    return (o = e[r]) || (o = e[r] = []), o.push(n), (a) => {
      o.length > 1 ? o.forEach((s) => s(a)) : o[0](a);
    };
  };
  Cn = t(
    "__VUE_INSTANCE_SETTERS__",
    (r) => ve = r
  ), Fo = t(
    "__VUE_SSR_SETTERS__",
    (r) => Vn = r
  );
}
const Fr = (e) => {
  const t = ve;
  return Cn(e), e.scope.on(), () => {
    e.scope.off(), Cn(t);
  };
}, ls = () => {
  ve && ve.scope.off(), Cn(null);
};
function Ec(e) {
  return e.vnode.shapeFlag & 4;
}
let Vn = !1;
function jd(e, t = !1, r = !1) {
  t && Fo(t);
  const { props: n, children: o } = e.vnode, a = Ec(e);
  $g(e, n, a, t), td(e, o, r);
  const s = a ? Dd(e, t) : void 0;
  return t && Fo(!1), s;
}
function Dd(e, t) {
  const r = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Hg);
  const { setup: n } = r;
  if (n) {
    const o = e.setupContext = n.length > 1 ? Od(e) : null, a = Fr(e);
    Dt();
    const s = Et(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    );
    if (Nt(), a(), Mi(s)) {
      if (s.then(ls, ls), t)
        return s.then((i) => {
          us(e, i, t);
        }).catch((i) => {
          Rn(i, e, 0);
        });
      e.asyncDep = s;
    } else
      us(e, s, t);
  } else
    wc(e, t);
}
function us(e, t, r) {
  $(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ue(t) && (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = t), e.setupState = Zi(t)), wc(e, r);
}
let gs;
function wc(e, t, r) {
  const n = e.type;
  if (!e.render) {
    if (!t && gs && !n.render) {
      const o = n.template || ya(e).template;
      if (o) {
        const { isCustomElement: a, compilerOptions: s } = e.appContext.config, { delimiters: i, compilerOptions: c } = n, u = Ae(
          Ae(
            {
              isCustomElement: a,
              delimiters: i
            },
            s
          ),
          c
        );
        n.render = gs(o, u);
      }
    }
    e.render = n.render || De;
  }
  if (__VUE_OPTIONS_API__) {
    const o = Fr(e);
    Dt();
    try {
      Zg(e);
    } finally {
      Nt(), o();
    }
  }
}
const Nd = {
  get(e, t) {
    return Oe(e, "get", ""), e[t];
  }
};
function Od(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  return {
    attrs: new Proxy(e.attrs, Nd),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Zi(sg(e.exposed)), {
    get(t, r) {
      if (r in t)
        return t[r];
      if (r in wr)
        return wr[r](e);
    },
    has(t, r) {
      return r in t || r in wr;
    }
  })) : e.proxy;
}
function Pd(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Rd(e) {
  return $(e) && "__vccOpts" in e;
}
const X = (e, t) => ig(e, t, Vn);
function Hn(e, t, r) {
  const n = arguments.length;
  return n === 2 ? ue(t) && !J(t) ? _o(t) ? ae(e, null, [t]) : ae(e, t) : ae(e, null, t) : (n > 3 ? r = Array.prototype.slice.call(arguments, 2) : n === 3 && _o(r) && (r = [r]), ae(e, t, r));
}
const ds = "3.4.38";
/**
* @vue/runtime-dom v3.4.38
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const kd = "http://www.w3.org/2000/svg", Ud = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, fs = lt && /* @__PURE__ */ lt.createElement("template"), _d = {
  insert: (e, t, r) => {
    t.insertBefore(e, r || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, r, n) => {
    const o = t === "svg" ? lt.createElementNS(kd, e) : t === "mathml" ? lt.createElementNS(Ud, e) : r ? lt.createElement(e, { is: r }) : lt.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => lt.createTextNode(e),
  createComment: (e) => lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => lt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, r, n, o, a) {
    const s = r ? r.previousSibling : t.lastChild;
    if (o && (o === a || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), r), !(o === a || !(o = o.nextSibling)); )
        ;
    else {
      fs.innerHTML = n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e;
      const i = fs.content;
      if (n === "svg" || n === "mathml") {
        const c = i.firstChild;
        for (; c.firstChild; )
          i.appendChild(c.firstChild);
        i.removeChild(c);
      }
      t.insertBefore(i, r);
    }
    return [
      // first
      s ? s.nextSibling : t.firstChild,
      // last
      r ? r.previousSibling : t.lastChild
    ];
  }
}, pt = "transition", pr = "animation", ar = Symbol("_vtc"), Zn = (e, { slots: t }) => Hn(wg, jc(e), t);
Zn.displayName = "Transition";
const Lc = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, Fd = Zn.props = /* @__PURE__ */ Ae(
  {},
  tc,
  Lc
), kt = (e, t = []) => {
  J(e) ? e.forEach((r) => r(...t)) : e && e(...t);
}, ms = (e) => e ? J(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function jc(e) {
  const t = {};
  for (const v in e)
    v in Lc || (t[v] = e[v]);
  if (e.css === !1)
    return t;
  const {
    name: r = "v",
    type: n,
    duration: o,
    enterFromClass: a = `${r}-enter-from`,
    enterActiveClass: s = `${r}-enter-active`,
    enterToClass: i = `${r}-enter-to`,
    appearFromClass: c = a,
    appearActiveClass: u = s,
    appearToClass: l = i,
    leaveFromClass: g = `${r}-leave-from`,
    leaveActiveClass: m = `${r}-leave-active`,
    leaveToClass: I = `${r}-leave-to`
  } = e, C = Bd(o), p = C && C[0], L = C && C[1], {
    onBeforeEnter: B,
    onEnter: V,
    onEnterCancelled: _,
    onLeave: q,
    onLeaveCancelled: G,
    onBeforeAppear: F = B,
    onAppear: W = V,
    onAppearCancelled: A = _
  } = t, h = (v, D, k) => {
    ht(v, D ? l : i), ht(v, D ? u : s), k && k();
  }, x = (v, D) => {
    v._isLeaving = !1, ht(v, g), ht(v, I), ht(v, m), D && D();
  }, y = (v) => (D, k) => {
    const j = v ? W : V, H = () => h(D, v, k);
    kt(j, [D, H]), As(() => {
      ht(D, v ? c : a), ct(D, v ? l : i), ms(j) || ps(D, n, p, H);
    });
  };
  return Ae(t, {
    onBeforeEnter(v) {
      kt(B, [v]), ct(v, a), ct(v, s);
    },
    onBeforeAppear(v) {
      kt(F, [v]), ct(v, c), ct(v, u);
    },
    onEnter: y(!1),
    onAppear: y(!0),
    onLeave(v, D) {
      v._isLeaving = !0;
      const k = () => x(v, D);
      ct(v, g), ct(v, m), Nc(), As(() => {
        v._isLeaving && (ht(v, g), ct(v, I), ms(q) || ps(v, n, L, k));
      }), kt(q, [v, k]);
    },
    onEnterCancelled(v) {
      h(v, !1), kt(_, [v]);
    },
    onAppearCancelled(v) {
      h(v, !0), kt(A, [v]);
    },
    onLeaveCancelled(v) {
      x(v), kt(G, [v]);
    }
  });
}
function Bd(e) {
  if (e == null)
    return null;
  if (ue(e))
    return [io(e.enter), io(e.leave)];
  {
    const t = io(e);
    return [t, t];
  }
}
function io(e) {
  return ju(e);
}
function ct(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.add(r)), (e[ar] || (e[ar] = /* @__PURE__ */ new Set())).add(t);
}
function ht(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const r = e[ar];
  r && (r.delete(t), r.size || (e[ar] = void 0));
}
function As(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Vd = 0;
function ps(e, t, r, n) {
  const o = e._endId = ++Vd, a = () => {
    o === e._endId && n();
  };
  if (r)
    return setTimeout(a, r);
  const { type: s, timeout: i, propCount: c } = Dc(e, t);
  if (!s)
    return n();
  const u = s + "end";
  let l = 0;
  const g = () => {
    e.removeEventListener(u, m), a();
  }, m = (I) => {
    I.target === e && ++l >= c && g();
  };
  setTimeout(() => {
    l < c && g();
  }, i + 1), e.addEventListener(u, m);
}
function Dc(e, t) {
  const r = window.getComputedStyle(e), n = (C) => (r[C] || "").split(", "), o = n(`${pt}Delay`), a = n(`${pt}Duration`), s = Is(o, a), i = n(`${pr}Delay`), c = n(`${pr}Duration`), u = Is(i, c);
  let l = null, g = 0, m = 0;
  t === pt ? s > 0 && (l = pt, g = s, m = a.length) : t === pr ? u > 0 && (l = pr, g = u, m = c.length) : (g = Math.max(s, u), l = g > 0 ? s > u ? pt : pr : null, m = l ? l === pt ? a.length : c.length : 0);
  const I = l === pt && /\b(transform|all)(,|$)/.test(
    n(`${pt}Property`).toString()
  );
  return {
    type: l,
    timeout: g,
    propCount: m,
    hasTransform: I
  };
}
function Is(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((r, n) => hs(r) + hs(e[n])));
}
function hs(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Nc() {
  return document.body.offsetHeight;
}
function zd(e, t, r) {
  const n = e[ar];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : r ? e.setAttribute("class", t) : e.className = t;
}
const bn = Symbol("_vod"), Oc = Symbol("_vsh"), Hd = {
  beforeMount(e, { value: t }, { transition: r }) {
    e[bn] = e.style.display === "none" ? "" : e.style.display, r && t ? r.beforeEnter(e) : Ir(e, t);
  },
  mounted(e, { value: t }, { transition: r }) {
    r && t && r.enter(e);
  },
  updated(e, { value: t, oldValue: r }, { transition: n }) {
    !t != !r && (n ? t ? (n.beforeEnter(e), Ir(e, !0), n.enter(e)) : n.leave(e, () => {
      Ir(e, !1);
    }) : Ir(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ir(e, t);
  }
};
function Ir(e, t) {
  e.style.display = t ? e[bn] : "none", e[Oc] = !t;
}
const Zd = Symbol(""), Yd = /(^|;)\s*display\s*:/;
function Wd(e, t, r) {
  const n = e.style, o = Ce(r);
  let a = !1;
  if (r && !o) {
    if (t)
      if (Ce(t))
        for (const s of t.split(";")) {
          const i = s.slice(0, s.indexOf(":")).trim();
          r[i] == null && cn(n, i, "");
        }
      else
        for (const s in t)
          r[s] == null && cn(n, s, "");
    for (const s in r)
      s === "display" && (a = !0), cn(n, s, r[s]);
  } else if (o) {
    if (t !== r) {
      const s = n[Zd];
      s && (r += ";" + s), n.cssText = r, a = Yd.test(r);
    }
  } else
    t && e.removeAttribute("style");
  bn in e && (e[bn] = a ? n.display : "", e[Oc] && (n.display = "none"));
}
const Cs = /\s*!important$/;
function cn(e, t, r) {
  if (J(r))
    r.forEach((n) => cn(e, t, n));
  else if (r == null && (r = ""), t.startsWith("--"))
    e.setProperty(t, r);
  else {
    const n = Jd(e, t);
    Cs.test(r) ? e.setProperty(
      qt(n),
      r.replace(Cs, ""),
      "important"
    ) : e[n] = r;
  }
}
const bs = ["Webkit", "Moz", "ms"], co = {};
function Jd(e, t) {
  const r = co[t];
  if (r)
    return r;
  let n = $e(t);
  if (n !== "filter" && n in e)
    return co[t] = n;
  n = On(n);
  for (let o = 0; o < bs.length; o++) {
    const a = bs[o] + n;
    if (a in e)
      return co[t] = a;
  }
  return t;
}
const vs = "http://www.w3.org/1999/xlink";
function ys(e, t, r, n, o, a = ku(t)) {
  n && t.startsWith("xlink:") ? r == null ? e.removeAttributeNS(vs, t.slice(6, t.length)) : e.setAttributeNS(vs, t, r) : r == null || a && !Ei(r) ? e.removeAttribute(t) : e.setAttribute(
    t,
    a ? "" : sr(r) ? String(r) : r
  );
}
function qd(e, t, r, n) {
  if (t === "innerHTML" || t === "textContent") {
    if (r == null)
      return;
    e[t] = r;
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const s = o === "OPTION" ? e.getAttribute("value") || "" : e.value, i = r == null ? "" : String(r);
    (s !== i || !("_value" in e)) && (e.value = i), r == null && e.removeAttribute(t), e._value = r;
    return;
  }
  let a = !1;
  if (r === "" || r == null) {
    const s = typeof e[t];
    s === "boolean" ? r = Ei(r) : r == null && s === "string" ? (r = "", a = !0) : s === "number" && (r = 0, a = !0);
  }
  try {
    e[t] = r;
  } catch {
  }
  a && e.removeAttribute(t);
}
function Gd(e, t, r, n) {
  e.addEventListener(t, r, n);
}
function Qd(e, t, r, n) {
  e.removeEventListener(t, r, n);
}
const xs = Symbol("_vei");
function $d(e, t, r, n, o = null) {
  const a = e[xs] || (e[xs] = {}), s = a[t];
  if (n && s)
    s.value = n;
  else {
    const [i, c] = Xd(t);
    if (n) {
      const u = a[t] = tf(
        n,
        o
      );
      Gd(e, i, u, c);
    } else
      s && (Qd(e, i, s, c), a[t] = void 0);
  }
}
const Ts = /(?:Once|Passive|Capture)$/;
function Xd(e) {
  let t;
  if (Ts.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Ts); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : qt(e.slice(2)), t];
}
let lo = 0;
const Kd = /* @__PURE__ */ Promise.resolve(), ef = () => lo || (Kd.then(() => lo = 0), lo = Date.now());
function tf(e, t) {
  const r = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= r.attached)
      return;
    Je(
      rf(n, r.value),
      t,
      5,
      [n]
    );
  };
  return r.value = e, r.attached = ef(), r;
}
function rf(e, t) {
  if (J(t)) {
    const r = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      r.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const Ss = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nf = (e, t, r, n, o, a) => {
  const s = o === "svg";
  t === "class" ? zd(e, n, s) : t === "style" ? Wd(e, r, n) : jn(t) ? ra(t) || $d(e, t, r, n, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : of(e, t, n, s)) ? (qd(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ys(e, t, n, s, a, t !== "value")) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), ys(e, t, n, s));
};
function of(e, t, r, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ss(t) && $(r));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Ss(t) && Ce(r) ? !1 : t in e;
}
const Pc = /* @__PURE__ */ new WeakMap(), Rc = /* @__PURE__ */ new WeakMap(), vn = Symbol("_moveCb"), Ms = Symbol("_enterCb"), kc = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ Ae({}, Fd, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const r = wa(), n = ec();
    let o, a;
    return ac(() => {
      if (!o.length)
        return;
      const s = e.moveClass || `${e.name || "v"}-move`;
      if (!gf(
        o[0].el,
        r.vnode.el,
        s
      ))
        return;
      o.forEach(cf), o.forEach(lf);
      const i = o.filter(uf);
      Nc(), i.forEach((c) => {
        const u = c.el, l = u.style;
        ct(u, s), l.transform = l.webkitTransform = l.transitionDuration = "";
        const g = u[vn] = (m) => {
          m && m.target !== u || (!m || /transform$/.test(m.propertyName)) && (u.removeEventListener("transitionend", g), u[vn] = null, ht(u, s));
        };
        u.addEventListener("transitionend", g);
      });
    }), () => {
      const s = ee(e), i = jc(s);
      let c = s.tag || Fe;
      if (o = [], a)
        for (let u = 0; u < a.length; u++) {
          const l = a[u];
          l.el && l.el instanceof Element && (o.push(l), or(
            l,
            Or(
              l,
              i,
              n,
              r
            )
          ), Pc.set(
            l,
            l.el.getBoundingClientRect()
          ));
        }
      a = t.default ? Ca(t.default()) : [];
      for (let u = 0; u < a.length; u++) {
        const l = a[u];
        l.key != null && or(
          l,
          Or(l, i, n, r)
        );
      }
      return ae(c, null, a);
    };
  }
}, af = (e) => delete e.mode;
kc.props;
const sf = kc;
function cf(e) {
  const t = e.el;
  t[vn] && t[vn](), t[Ms] && t[Ms]();
}
function lf(e) {
  Rc.set(e, e.el.getBoundingClientRect());
}
function uf(e) {
  const t = Pc.get(e), r = Rc.get(e), n = t.left - r.left, o = t.top - r.top;
  if (n || o) {
    const a = e.el.style;
    return a.transform = a.webkitTransform = `translate(${n}px,${o}px)`, a.transitionDuration = "0s", e;
  }
}
function gf(e, t, r) {
  const n = e.cloneNode(), o = e[ar];
  o && o.forEach((i) => {
    i.split(/\s+/).forEach((c) => c && n.classList.remove(c));
  }), r.split(/\s+/).forEach((i) => i && n.classList.add(i)), n.style.display = "none";
  const a = t.nodeType === 1 ? t : t.parentNode;
  a.appendChild(n);
  const { hasTransform: s } = Dc(n);
  return a.removeChild(n), s;
}
const df = /* @__PURE__ */ Ae({ patchProp: nf }, _d);
let Es;
function ff() {
  return Es || (Es = cd(df));
}
const Uc = (...e) => {
  ff().render(...e);
};
async function mf() {
  let e = "";
  await gt.obter(null).then((n) => {
    e = n.siteAtual;
  });
  const t = /\.br\/([^/]+)/, r = e.match(t);
  if (r) {
    const n = r[1];
    return he.log(n), n;
  } else
    return he.log("Não foi possível encontrar a correspondência."), "pje";
}
function Af(e) {
  return fetch(e, {
    headers: { "Content-Type": "application/json" },
    body: "{}",
    method: "POST",
    credentials: "include"
  }).then((t) => t.json());
}
function pf(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/recuperarProcessosTarefaPendenteComCriterios/${encodeURI(
    t.trim()
  )}/false`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: "{}",
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function If(e = "pje") {
  const t = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/etiquetas`;
  return fetch(t, {
    headers: { "Content-Type": "application/json" },
    body: "{}",
    method: "POST",
    credentials: "include"
  }).then((r) => r.json());
}
function hf(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${t}","competencia":"","etiquetas":[]}`,
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function Cf(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${t}","numeroProcessoReferencia":"","etiqueta":"","etiquetas":[],"filtrado":true,"modoCompleto":false}`,
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function bf(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${t}","competencia":"","etiquetas":[],"ignorarCache":false}`,
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function vf() {
  const t = `${window.location.origin.includes("frontend") ? document.referrer.replace(/\/+$/, "") : window.location.origin}/pje/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(t, {
    headers: { "Content-Type": "application/json" },
    body: '{"numeroProcesso":"","competencia":"","etiquetas":[]}',
    method: "POST",
    credentials: "include"
  }).then((r) => r.json());
}
function yf(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/transicoes/${t}`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: null,
    method: "GET",
    credentials: "include"
  }).then((n) => n.json());
}
function xf(e = "pje", t, r) {
  const n = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/processoTags/inserir`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    body: `{"tag":"${t}","idProcesso":"${r}"}`,
    method: "POST",
    credentials: "include"
  }).then((o) => o.json());
}
function Tf(e = "pje", t, r) {
  const n = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/processoTags/remover`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    body: `{"idTag":${t},"idProcesso":${r}}`,
    method: "POST",
    credentials: "include"
  }).then((o) => o.json());
}
function Sf(e = "pje", t, r) {
  const n = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/recuperarProcessosTarefaPendenteComCriterios/${t}/false`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${r}","classe":null,"tags":[],"tagsString":null,"poloAtivo":null,"poloPassivo":null,"orgao":null,"ordem":null,"page":0,"maxResults":300,"idTaskInstance":null,"apelidoSessao":null,"idTipoSessao":null,"dataSessao":null,"somenteFavoritas":null,"objeto":null,"semEtiqueta":null,"assunto":null,"dataAutuacao":null,"nomeParte":null,"nomeFiltro":null,"numeroDocumento":null,"competencia":"","relator":null,"orgaoJulgador":null,"somenteLembrete":null,"somenteSigiloso":null,"somenteLiminar":null,"eleicao":null,"estado":null,"municipio":null,"prioridadeProcesso":null,"cpfCnpj":null,"porEtiqueta":null,"conferidos":null,"orgaoJulgadorColegiado":null,"naoLidos":null,"tipoProcessoDocumento":null}`,
    method: "POST",
    credentials: "include"
  }).then((o) => o.json());
}
function Mf(e = "pje", t, r) {
  const n = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/movimentar/${t}/${r}`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include"
  }).then((o) => o.json());
}
function Ef(e) {
  var n;
  const r = `${(n = window.location.href.match(jt.HREFS.ROOT)) == null ? void 0 : n.at(0)}seam/resource/rest/pje-legacy/painelUsuario/tags`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"marcado":false,"possuiFilhos":false,"id":null,"nomeTag":"${e}","nomeTagCompleto":"${e}","pai":null}`,
    method: "POST",
    mode: "cors",
    credentials: "include"
  }).then((o) => o.json());
}
async function wf(e, t) {
  var o;
  const n = `${(o = window.location.href.match(jt.HREFS.ROOT)) == null ? void 0 : o.at(0)}seam/resource/rest/pje-legacy/painelUsuario/tags`;
  return await fetch(n, {
    headers: { "Content-Type": "application/json" },
    body: `{"marcado":false,"possuiFilhos":false,"id":${e},"nomeTag":"${t}","nomeTagCompleto":"${t}","pai":null}`,
    method: "PUT",
    credentials: "include"
  }).then((a) => a.json());
}
async function Lf(e) {
  var n;
  if (e == null || typeof e == "string" && !e.length)
    return !1;
  const r = `${(n = window.location.href.match(jt.HREFS.ROOT)) == null ? void 0 : n.at(0)}seam/resource/rest/pje-legacy/painelUsuario/tagEdicao/${e}`;
  return await fetch(r, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include"
  }).then((o) => o.json());
}
function jf(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/etiquetas/${t}/processos`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
    mode: "cors"
  }).then((n) => n.json());
}
function Df(e = "pje", t) {
  const r = `${document.referrer}${e}/seam/resource/rest/pje-legacy/painelUsuario/tags/${t}`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    credentials: "include",
    mode: "cors"
  }).then((n) => n.json());
}
async function _c(e, t) {
  const n = `${await Br(t)}/seam/resource/rest/pje-legacy/processos/numero-processo/${e}/validar`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
    mode: "cors"
  }).then((o) => o.text()).then((o) => Number(o));
}
const Yn = _c;
async function Nf(e, t) {
  const n = `${await Br(t)}/seam/resource/rest/pje-legacy/painelUsuario/gerarChaveAcessoProcesso/${e}`;
  return fetch(n, {
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    method: "GET",
    credentials: "include",
    mode: "cors"
  }).then((o) => o.text());
}
async function Fc(e, t) {
  const n = `${await Br(t)}/seam/resource/rest/pje-legacy/processos/${e}/movimentacoes`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
    mode: "cors"
  }).then((o) => o.json());
}
function Of(e, t) {
  return Yn(e, t).then(
    (r) => Fc(r, t)
  );
}
async function Bc(e, t) {
  const n = `${await Br(t)}/seam/resource/rest/pje-legacy/processos/${e}/ultimoMovimento`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
    mode: "cors"
  }).then((o) => o.json());
}
function Pf(e) {
  return Yn(e).then(
    (t) => Bc(t)
  );
}
async function Vc(e, t) {
  const n = `${await Br(t)}/seam/resource/rest/pje-legacy/processos/${e}/tarefas`;
  return fetch(n, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
    mode: "cors"
  }).then((o) => o.json());
}
function Rf(e) {
  return Yn(e).then(
    (t) => Vc(t)
  );
}
function kf(e = "pje", t) {
  const r = `${window.location.origin}/${e}/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${t}","competencia":"","etiquetas":[]}`,
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function Uf(e = "pje", t) {
  const r = `${window.location.origin}/${e}/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${t}","numeroProcessoReferencia":"","etiqueta":"","etiquetas":[],"filtrado":true,"modoCompleto":false}`,
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function _f(e = "pje", t) {
  const r = `${window.location.origin}/${e}/seam/resource/rest/pje-legacy/painelUsuario/tarefas`;
  return fetch(r, {
    headers: { "Content-Type": "application/json" },
    body: `{"numeroProcesso":"${t}","competencia":"","etiquetas":[],"ignorarCache":false}`,
    method: "POST",
    credentials: "include"
  }).then((n) => n.json());
}
function Ff(e, t) {
  return fetch(e, t);
}
class La {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fetch(t, ...r) {
    try {
      const n = Bf[t];
      if (n)
        try {
          return n(...r);
        } catch (o) {
          const a = o, s = r.at(-1);
          if (s != null && s.fetchingViaBackground)
            return {
              fetchingViaBackgroundWithError: !0,
              errorMessage: a.message
            };
          if (a.message.match(/CORS/i))
            return La.fetchViaBackground(t, ...r);
          throw new Error(a.message);
        }
      else
        throw new Error(`Endpoint function "${t}" not found`);
    } catch (n) {
      return he.erro("Error fetching endpoint:"), he.erro(n), null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async fetchViaBackground(t, ...r) {
    const n = await Rl({
      mensagem: "backgroundFetchEndpoint",
      conteudo: {
        functionName: t,
        args: { ...r }
      }
    });
    if (n && n.fetchingViaBackgroundWithError)
      throw new Error(
        n.errorMessage
      );
    return n;
  }
}
const Bf = {
  pegaEnderecoSiglaPje: mf,
  baixarTodosProcessos: Af,
  listaProcessosTarefa: pf,
  listaEtiquetas: If,
  localizarTarefaNumeroProcesso: hf,
  localizarTarefaNumeroProcessoTJDFT: Cf,
  localizarTarefaNumeroProcessoTJPE: bf,
  listatodosTarefas: vf,
  listaEncaminha: yf,
  inserirEtiquetas: xf,
  removerEtiquetas: Tf,
  localizaIdProcesso: Sf,
  movimentarProcessos: Mf,
  criarEtiqueta: Ef,
  editarEtiqueta: wf,
  listarEtiqueta: Lf,
  numeroProcessoPorEtiqueta: jf,
  apagarEtiquetaLotação: Df,
  validarNumeroProcesso: _c,
  obterIdProcesso: Yn,
  gerarChaveAcessoProcesso: Nf,
  obterMovimentosDoProcesso: Fc,
  obterMovimentosDoProcessoPeloNumeroUnico: Of,
  obterUltimoMovimentoDoProcesso: Bc,
  obterUltimoMovimentoDoProcessoPeloNumeroUnico: Pf,
  obterTarefasPendentesDoProcesso: Vc,
  obterTarefasPendentesDoProcessoPeloNumeroUnico: Rf,
  localizarTarefaNumeroProcessoAutodigitais: kf,
  localizarTarefaNumeroProcessoTJDFTAutodsDigitais: Uf,
  localizarTarefaNumeroProcessoTJPEAutodsDigitais: _f,
  obterDoURL: Ff
};
async function Vf(e) {
  const t = e.args;
  return La.fetch(
    t.functionName,
    ...Object.values(t.args),
    e,
    { fetchingViaBackground: !0 }
  );
}
async function zc(e) {
  const t = {
    backgroundResponseWithError: !0,
    errorMessage: "WEB_ROOT da guia não foi encontrada"
  };
  return e ? E.tabs.get(e.senderTab).then((r) => {
    var o;
    const { url: n } = r;
    if (n) {
      const a = (o = n.match(jt.HREFS.LEGACY_WEB_ROOT)) == null ? void 0 : o.at(0);
      return a || t;
    } else
      return t;
  }) : t;
}
async function Br(e) {
  var t;
  if (typeof window < "u") {
    const r = (t = window == null ? void 0 : window.location.href.match(jt.HREFS.LEGACY_WEB_ROOT)) == null ? void 0 : t.at(0);
    if (r)
      return r;
    if (window != null && window.location.origin.includes("frontend")) {
      const n = await Rl({
        mensagem: "backgroundObterURLDaGuiaAtiva"
      });
      if (n && n.backgroundResponseWithError)
        throw new Error(
          n.errorMessage
        );
      return n;
    }
  }
  return zc(e);
}
var Hc = /* @__PURE__ */ ((e) => (e.atalhoModelo = "atalhoModelo", e.atalhoEntrada = "atalhoEntrada", e.entradaNegativa = "entradaNegativa", e))(Hc || {});
({
  ...Hc
});
const zf = {
  dadosCompletos: () => "seam/resource/rest/pje-legacy/api/v1/dados-completos/",
  partes: (e) => `seam/resource/rest/pje-legacy/api/v1/processos-judiciais/${encodeURI(e)}`
}, Hf = {
  etiquetas: () => "seam/resource/rest/pje-legacy/painelUsuario/etiquetas",
  movimentarIndividual: (e, t) => `seam/resource/rest/pje-legacy/painelUsuario/movimentarIndividual/${e}/${t}`,
  tarefas: (e) => `seam/resource/rest/pje-legacy/painelUsuario/tarefas/${e}`,
  tarefasFavoritas: (e) => `seam/resource/rest/pje-legacy/painelUsuario/tarefasFavoritas/${e}`,
  tarefasMinutas: (e) => `seam/resource/rest/pje-legacy/painelUsuario/tarefas/minutas/${e}`,
  tagEdicao: (e) => `seam/resource/rest/pje-legacy/painelUsuario/tagEdicao/${e}`,
  transicoes: (e) => `seam/resource/rest/pje-legacy/painelUsuario/transicoes/${e}`,
  assuntos: () => "seam/resource/rest/pje-legacy/painelUsuario/assuntos/",
  jurisdicoes: () => "seam/resource/rest/pje-legacy/painelUsuario/jurisdicoes/",
  historicoTarefas: (e) => `seam/resource/rest/pje-legacy/painelUsuario/historicoTarefas/${e}`
}, Zf = {
  tags: () => "seam/resource/rest/pje-legacy/painelUsuario/tags/",
  todas: () => "seam/resource/rest/pje-legacy/painelUsuario/processoTags/todas/",
  inserir: () => "seam/resource/rest/pje-legacy/painelUsuario/processoTags/inserir",
  remover: (e, t) => `seam/resource/rest/pje-legacy/painelUsuario/processoTags/remover/${e}/${t}`,
  processos: (e) => `seam/resource/rest/pje-legacy/painelUsuario//etiquetas/${e}/processos/`
}, se = {
  Endpoints: {
    processoJudicialRestController: zf,
    painelUsuarioInterno: Hf,
    tags: Zf
  },
  UrlRaiz: LI(),
  Get: async (e) => await fetch(se.UrlRaiz + e, {
    ...eo,
    cache: "force-cache"
  }),
  Post: async (e, t) => await fetch(se.UrlRaiz + (e || ""), {
    ...eo,
    headers: {
      ...eo.headers,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: t || ""
  }),
  getTarefasPendentes: async (e) => se.Post(se.UrlRaiz + "/tarefas", JSON.stringify(e)),
  getTarefasFavoritas: async (e) => se.Post(se.UrlRaiz + "/tarefasFavoritas", JSON.stringify(e)),
  getTarefasAssinatura: async () => se.Get(se.UrlRaiz + "/tarefasAssinatura"),
  getTarefasDaLocalizacao: async () => se.Get(se.UrlRaiz + "/tarefas"),
  getProcessosTarefa(e, t, r) {
    return se.Post(
      se.UrlRaiz + `/recuperarProcessosTarefaPendenteComCriterios/${e}/${t}`,
      JSON.stringify(r)
    );
  },
  getProcessoByTarefaIdentificador(e, t) {
    return se.Get(
      se.UrlRaiz + `/recuperarProcessoPorTarefaIdentificador/${e}/${t}`
    );
  },
  getTarefaPendenteByIdTaskInstance(e) {
    return se.Get(se.UrlRaiz + `/recuperarProcesso/${e}/false`);
  },
  getTrasicoesSaidaTarefa(e) {
    return se.Get(se.UrlRaiz + `/transicoes/${e}`);
  },
  movimentarTarefa(e, t) {
    return se.Get(
      se.UrlRaiz + `/movimentar/${e}/${encodeURI(t)}`
    );
  },
  movimentarTarefaIndividual(e, t) {
    return se.Get(
      se.UrlRaiz + `/movimentarIndividual/${e}/${encodeURI(t)}`
    );
  },
  getHistoricoTarefas(e) {
    return se.Get(se.UrlRaiz + `/historicoTarefas/${e}`);
  },
  getDownloadDocumento(e) {
    return se.Get(`seam/resource/rest/pje-legacy/documento/download/${e}`);
  },
  async getEtiquetas() {
    const e = await se.Post(se.Endpoints.painelUsuarioInterno.etiquetas());
    if (e.ok)
      try {
        const t = await e.text();
        return JSON.parse(t);
      } catch {
        return;
      }
  },
  /**
   *
   * @param tag
   * @param idProcesso
   * @returns
   */
  async inserirEtiqueta(e, t) {
    const r = await se.Post(
      se.Endpoints.tags.inserir(),
      JSON.stringify({ tag: e, idProcesso: t })
    );
    if (r.ok)
      try {
        return await r.json();
      } catch {
        return;
      }
  }
};
function Wn(e, t) {
  let r;
  function n() {
    r = ia(), r.run(() => t.length ? t(() => {
      r == null || r.stop(), n();
    }) : t());
  }
  me(e, (o) => {
    o && !r ? n() : o || (r == null || r.stop(), r = void 0);
  }, {
    immediate: !0
  }), Xe(() => {
    r == null || r.stop();
  });
}
const fe = typeof window < "u", Yf = fe && "IntersectionObserver" in window, Wf = fe && ("ontouchstart" in window || window.navigator.maxTouchPoints > 0);
function Jf(e, t, r) {
  const n = t.length - 1;
  if (n < 0)
    return e === void 0 ? r : e;
  for (let o = 0; o < n; o++) {
    if (e == null)
      return r;
    e = e[t[o]];
  }
  return e == null || e[t[n]] === void 0 ? r : e[t[n]];
}
function ws(e, t, r) {
  return e == null || !t || typeof t != "string" ? r : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Jf(e, t.split("."), r));
}
function Zc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (r, n) => t + n);
}
function Te(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function yn(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function qf(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const Ls = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
function Yc(e) {
  return Object.keys(e);
}
function uo(e, t) {
  return t.every((r) => e.hasOwnProperty(r));
}
function Gf(e, t) {
  const r = {}, n = new Set(Object.keys(e));
  for (const o of t)
    n.has(o) && (r[o] = e[o]);
  return r;
}
function Qf(e, t) {
  const r = {
    ...e
  };
  return t.forEach((n) => delete r[n]), r;
}
const $f = /^on[^a-z]/, Wc = (e) => $f.test(e);
function Bo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(r, e));
}
function js(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + r.repeat(Math.max(0, t - e.length));
}
function Ds(e, t) {
  return (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0").repeat(Math.max(0, t - e.length)) + e;
}
function Xf(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const r = [];
  let n = 0;
  for (; n < e.length; )
    r.push(e.substr(n, t)), n += t;
  return r;
}
function dt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0;
  const n = {};
  for (const o in e)
    n[o] = e[o];
  for (const o in t) {
    const a = e[o], s = t[o];
    if (yn(a) && yn(s)) {
      n[o] = dt(a, s, r);
      continue;
    }
    if (Array.isArray(a) && Array.isArray(s) && r) {
      n[o] = r(a, s);
      continue;
    }
    n[o] = s;
  }
  return n;
}
function Ht() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Ht.cache.has(e))
    return Ht.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Ht.cache.set(e, t), t;
}
Ht.cache = /* @__PURE__ */ new Map();
function Jc(e) {
  const t = ft({}), r = X(e);
  return Gt(() => {
    for (const n in r.value)
      t[n] = r.value[n];
  }, {
    flush: "sync"
  }), Yi(t);
}
function Vo(e, t) {
  return e.includes(t);
}
function qc(e) {
  return e[2].toLowerCase() + e.slice(3);
}
function Kf(e, t) {
  if (!(fe && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`)))
    return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function em(e, t) {
  if (!fe || e === 0)
    return t(), () => {
    };
  const r = window.setTimeout(t, e);
  return () => window.clearTimeout(r);
}
function Ns() {
  const e = ze(), t = (r) => {
    e.value = r;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (r) => e.value = r
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => qf(e.value)
  }), t;
}
const Gc = ["top", "bottom"], tm = ["start", "end", "left", "right"];
function Os(e, t) {
  let [r, n] = e.split(" ");
  return n || (n = Vo(Gc, r) ? "start" : Vo(tm, r) ? "top" : "center"), {
    side: Ps(r, t),
    align: Ps(n, t)
  };
}
function Ps(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function go(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function fo(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function Rs(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function ks(e) {
  return Vo(Gc, e.side) ? "y" : "x";
}
class Zt {
  constructor(t) {
    let {
      x: r,
      y: n,
      width: o,
      height: a
    } = t;
    this.x = r, this.y = n, this.width = o, this.height = a;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function Us(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function rm(e) {
  return Array.isArray(e) ? new Zt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function nm(e) {
  const t = e.getBoundingClientRect(), r = getComputedStyle(e), n = r.transform;
  if (n) {
    let o, a, s, i, c;
    if (n.startsWith("matrix3d("))
      o = n.slice(9, -1).split(/, /), a = +o[0], s = +o[5], i = +o[12], c = +o[13];
    else if (n.startsWith("matrix("))
      o = n.slice(7, -1).split(/, /), a = +o[0], s = +o[3], i = +o[4], c = +o[5];
    else
      return new Zt(t);
    const u = r.transformOrigin, l = t.x - i - (1 - a) * parseFloat(u), g = t.y - c - (1 - s) * parseFloat(u.slice(u.indexOf(" ") + 1)), m = a ? t.width / a : e.offsetWidth + 1, I = s ? t.height / s : e.offsetHeight + 1;
    return new Zt({
      x: l,
      y: g,
      width: m,
      height: I
    });
  } else
    return new Zt(t);
}
function om(e, t, r) {
  if (typeof e.animate > "u")
    return {
      finished: Promise.resolve()
    };
  let n;
  try {
    n = e.animate(t, r);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof n.finished > "u" && (n.finished = new Promise((o) => {
    n.onfinish = () => {
      o(n);
    };
  })), n;
}
const ln = /* @__PURE__ */ new WeakMap();
function am(e, t) {
  Object.keys(t).forEach((r) => {
    if (Wc(r)) {
      const n = qc(r), o = ln.get(e);
      if (t[r] == null)
        o == null || o.forEach((a) => {
          const [s, i] = a;
          s === n && (e.removeEventListener(n, i), o.delete(a));
        });
      else if (!o || ![...o].some((a) => a[0] === n && a[1] === t[r])) {
        e.addEventListener(n, t[r]);
        const a = o || /* @__PURE__ */ new Set();
        a.add([n, t[r]]), ln.has(e) || ln.set(e, a);
      }
    } else
      t[r] == null ? e.removeAttribute(r) : e.setAttribute(r, t[r]);
  });
}
function sm(e, t) {
  Object.keys(t).forEach((r) => {
    if (Wc(r)) {
      const n = qc(r), o = ln.get(e);
      o == null || o.forEach((a) => {
        const [s, i] = a;
        s === n && (e.removeEventListener(n, i), o.delete(a));
      });
    } else
      e.removeAttribute(r);
  });
}
const $t = 2.4, _s = 0.2126729, Fs = 0.7151522, Bs = 0.072175, im = 0.55, cm = 0.58, lm = 0.57, um = 0.62, $r = 0.03, Vs = 1.45, gm = 5e-4, dm = 1.25, fm = 1.25, zs = 0.078, Hs = 12.82051282051282, Xr = 0.06, Zs = 1e-3;
function Ys(e, t) {
  const r = (e.r / 255) ** $t, n = (e.g / 255) ** $t, o = (e.b / 255) ** $t, a = (t.r / 255) ** $t, s = (t.g / 255) ** $t, i = (t.b / 255) ** $t;
  let c = r * _s + n * Fs + o * Bs, u = a * _s + s * Fs + i * Bs;
  if (c <= $r && (c += ($r - c) ** Vs), u <= $r && (u += ($r - u) ** Vs), Math.abs(u - c) < gm)
    return 0;
  let l;
  if (u > c) {
    const g = (u ** im - c ** cm) * dm;
    l = g < Zs ? 0 : g < zs ? g - g * Hs * Xr : g - Xr;
  } else {
    const g = (u ** um - c ** lm) * fm;
    l = g > -Zs ? 0 : g > -zs ? g - g * Hs * Xr : g + Xr;
  }
  return l * 100;
}
const xn = 0.20689655172413793, mm = (e) => e > xn ** 3 ? Math.cbrt(e) : e / (3 * xn ** 2) + 4 / 29, Am = (e) => e > xn ? e ** 3 : 3 * xn ** 2 * (e - 4 / 29);
function Qc(e) {
  const t = mm, r = t(e[1]);
  return [116 * r - 16, 500 * (t(e[0] / 0.95047) - r), 200 * (r - t(e[2] / 1.08883))];
}
function $c(e) {
  const t = Am, r = (e[0] + 16) / 116;
  return [t(r + e[1] / 500) * 0.95047, t(r), t(r - e[2] / 200) * 1.08883];
}
const pm = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.204, 1.057]], Im = (e) => e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055, hm = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], Cm = (e) => e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
function Xc(e) {
  const t = Array(3), r = Im, n = pm;
  for (let o = 0; o < 3; ++o)
    t[o] = Math.round(Bo(r(n[o][0] * e[0] + n[o][1] * e[1] + n[o][2] * e[2])) * 255);
  return {
    r: t[0],
    g: t[1],
    b: t[2]
  };
}
function ja(e) {
  let {
    r: t,
    g: r,
    b: n
  } = e;
  const o = [0, 0, 0], a = Cm, s = hm;
  t = a(t / 255), r = a(r / 255), n = a(n / 255);
  for (let i = 0; i < 3; ++i)
    o[i] = s[i][0] * t + s[i][1] * r + s[i][2] * n;
  return o;
}
function zo(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function bm(e) {
  return zo(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Ws = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, vm = {
  rgb: (e, t, r, n) => ({
    r: e,
    g: t,
    b: r,
    a: n
  }),
  rgba: (e, t, r, n) => ({
    r: e,
    g: t,
    b: r,
    a: n
  }),
  hsl: (e, t, r, n) => Js({
    h: e,
    s: t,
    l: r,
    a: n
  }),
  hsla: (e, t, r, n) => Js({
    h: e,
    s: t,
    l: r,
    a: n
  }),
  hsv: (e, t, r, n) => Pr({
    h: e,
    s: t,
    v: r,
    a: n
  }),
  hsva: (e, t, r, n) => Pr({
    h: e,
    s: t,
    v: r,
    a: n
  })
};
function ot(e) {
  if (typeof e == "number")
    return {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Ws.test(e)) {
    const {
      groups: t
    } = e.match(Ws), {
      fn: r,
      values: n
    } = t, o = n.split(/,\s*/).map((a) => a.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(r) ? parseFloat(a) / 100 : parseFloat(a));
    return vm[r](...o);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    return [3, 4].includes(t.length) ? t = t.split("").map((r) => r + r).join("") : [6, 8].includes(t.length), xm(t);
  } else if (typeof e == "object") {
    if (uo(e, ["r", "g", "b"]))
      return e;
    if (uo(e, ["h", "s", "l"]))
      return Pr(Kc(e));
    if (uo(e, ["h", "s", "v"]))
      return Pr(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Pr(e) {
  const {
    h: t,
    s: r,
    v: n,
    a: o
  } = e, a = (i) => {
    const c = (i + t / 60) % 6;
    return n - n * r * Math.max(Math.min(c, 4 - c, 1), 0);
  }, s = [a(5), a(3), a(1)].map((i) => Math.round(i * 255));
  return {
    r: s[0],
    g: s[1],
    b: s[2],
    a: o
  };
}
function Js(e) {
  return Pr(Kc(e));
}
function Kc(e) {
  const {
    h: t,
    s: r,
    l: n,
    a: o
  } = e, a = n + r * Math.min(n, 1 - n), s = a === 0 ? 0 : 2 - 2 * n / a;
  return {
    h: t,
    s,
    v: a,
    a: o
  };
}
function Kr(e) {
  const t = Math.round(e).toString(16);
  return ("00".substr(0, 2 - t.length) + t).toUpperCase();
}
function ym(e) {
  let {
    r: t,
    g: r,
    b: n,
    a: o
  } = e;
  return `#${[Kr(t), Kr(r), Kr(n), o !== void 0 ? Kr(Math.round(o * 255)) : ""].join("")}`;
}
function xm(e) {
  e = Tm(e);
  let [t, r, n, o] = Xf(e, 2).map((a) => parseInt(a, 16));
  return o = o === void 0 ? o : o / 255, {
    r: t,
    g: r,
    b: n,
    a: o
  };
}
function Tm(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = js(js(e, 6), 8, "F")), e;
}
function Sm(e, t) {
  const r = Qc(ja(e));
  return r[0] = r[0] + t * 10, Xc($c(r));
}
function Mm(e, t) {
  const r = Qc(ja(e));
  return r[0] = r[0] - t * 10, Xc($c(r));
}
function Em(e) {
  const t = ot(e);
  return ja(t)[1];
}
function el(e) {
  const t = Math.abs(Ys(ot(0), ot(e)));
  return Math.abs(Ys(ot(16777215), ot(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function He(e, t) {
  return (r) => Object.keys(e).reduce((n, o) => {
    const s = typeof e[o] == "object" && e[o] != null && !Array.isArray(e[o]) ? e[o] : {
      type: e[o]
    };
    return r && o in r ? n[o] = {
      ...s,
      default: r[o]
    } : n[o] = s, t && !n[o].source && (n[o].source = t), n;
  }, {});
}
const wm = He({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function qe(e, t) {
  const r = wa();
  if (!r)
    throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return r;
}
function Lm() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = qe(e).type;
  return Ht((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let tl = 0, un = /* @__PURE__ */ new WeakMap();
function Da() {
  const e = qe("getUid");
  if (un.has(e))
    return un.get(e);
  {
    const t = tl++;
    return un.set(e, t), t;
  }
}
Da.reset = () => {
  tl = 0, un = /* @__PURE__ */ new WeakMap();
};
function jm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : qe("injectSelf");
  const {
    provides: r
  } = t;
  if (r && e in r)
    return r[e];
}
const Rr = Symbol.for("vuetify:defaults");
function Dm(e) {
  return Me(e);
}
function rl() {
  const e = at(Rr);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function Nm(e, t) {
  var r, n;
  return typeof ((r = e.props) == null ? void 0 : r[t]) < "u" || typeof ((n = e.props) == null ? void 0 : n[Ht(t)]) < "u";
}
function Om() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : rl();
  const n = qe("useDefaults");
  if (t = t ?? n.type.name ?? n.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const o = X(() => {
    var c;
    return (c = r.value) == null ? void 0 : c[e._as ?? t];
  }), a = new Proxy(e, {
    get(c, u) {
      var g, m, I, C, p, L, B;
      const l = Reflect.get(c, u);
      return u === "class" || u === "style" ? [(g = o.value) == null ? void 0 : g[u], l].filter((V) => V != null) : typeof u == "string" && !Nm(n.vnode, u) ? ((m = o.value) == null ? void 0 : m[u]) !== void 0 ? (I = o.value) == null ? void 0 : I[u] : ((p = (C = r.value) == null ? void 0 : C.global) == null ? void 0 : p[u]) !== void 0 ? (B = (L = r.value) == null ? void 0 : L.global) == null ? void 0 : B[u] : l : l;
    }
  }), s = ze();
  Gt(() => {
    if (o.value) {
      const c = Object.entries(o.value).filter((u) => {
        let [l] = u;
        return l.startsWith(l[0].toUpperCase());
      });
      s.value = c.length ? Object.fromEntries(c) : void 0;
    } else
      s.value = void 0;
  });
  function i() {
    const c = jm(Rr, n);
    Fn(Rr, X(() => s.value ? dt((c == null ? void 0 : c.value) ?? {}, s.value) : c == null ? void 0 : c.value));
  }
  return {
    props: a,
    provideSubDefaults: i
  };
}
function Vr(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return e;
  if (e._setup) {
    e.props = He(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((r) => r !== "class" && r !== "style");
    e.filterProps = function(n) {
      return Gf(n, t);
    }, e.props._as = String, e.setup = function(n, o) {
      const a = rl();
      if (!a.value)
        return e._setup(n, o);
      const {
        props: s,
        provideSubDefaults: i
      } = Om(n, n._as ?? e.name, a), c = e._setup(s, o);
      return i(), c;
    };
  }
  return e;
}
function Na() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Vr : Lg)(t);
}
function nl(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; )
      e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Pm = "cubic-bezier(0.4, 0, 0.2, 1)";
function Rm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? km(e) : Oa(e))
      return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function Tn(e, t) {
  const r = [];
  if (t && e && !t.contains(e))
    return r;
  for (; e && (Oa(e) && r.push(e), e !== t); )
    e = e.parentElement;
  return r;
}
function Oa(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function km(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Um(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ol(e) {
  const t = qe("useRender");
  t.render = e;
}
function Pa(e, t, r) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (g) => g, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (g) => g;
  const a = qe("useProxiedModel"), s = Me(e[t] !== void 0 ? e[t] : r), i = Ht(t), u = X(i !== t ? () => {
    var g, m, I, C;
    return e[t], !!(((g = a.vnode.props) != null && g.hasOwnProperty(t) || (m = a.vnode.props) != null && m.hasOwnProperty(i)) && ((I = a.vnode.props) != null && I.hasOwnProperty(`onUpdate:${t}`) || (C = a.vnode.props) != null && C.hasOwnProperty(`onUpdate:${i}`)));
  } : () => {
    var g, m;
    return e[t], !!((g = a.vnode.props) != null && g.hasOwnProperty(t) && ((m = a.vnode.props) != null && m.hasOwnProperty(`onUpdate:${t}`)));
  });
  Wn(() => !u.value, () => {
    me(() => e[t], (g) => {
      s.value = g;
    });
  });
  const l = X({
    get() {
      const g = e[t];
      return n(u.value ? g : s.value);
    },
    set(g) {
      const m = o(g), I = ee(u.value ? e[t] : s.value);
      I === m || n(I) === g || (s.value = m, a == null || a.emit(`update:${t}`, m));
    }
  });
  return Object.defineProperty(l, "externalValue", {
    get: () => u.value ? e[t] : s.value
  }), l;
}
const _m = {
  badge: "Badge",
  open: "Open",
  close: "Close",
  dismiss: "Dismiss",
  confirmEdit: {
    ok: "OK",
    cancel: "Cancel"
  },
  dataIterator: {
    noResultsText: "No matching records found",
    loadingText: "Loading items..."
  },
  dataTable: {
    itemsPerPageText: "Rows per page:",
    ariaLabel: {
      sortDescending: "Sorted descending.",
      sortAscending: "Sorted ascending.",
      sortNone: "Not sorted.",
      activateNone: "Activate to remove sorting.",
      activateDescending: "Activate to sort descending.",
      activateAscending: "Activate to sort ascending."
    },
    sortBy: "Sort by"
  },
  dataFooter: {
    itemsPerPageText: "Items per page:",
    itemsPerPageAll: "All",
    nextPage: "Next page",
    prevPage: "Previous page",
    firstPage: "First page",
    lastPage: "Last page",
    pageText: "{0}-{1} of {2}"
  },
  dateRangeInput: {
    divider: "to"
  },
  datePicker: {
    itemsSelected: "{0} selected",
    range: {
      title: "Select dates",
      header: "Enter dates"
    },
    title: "Select date",
    header: "Enter date",
    input: {
      placeholder: "Enter date"
    }
  },
  noDataText: "No data available",
  carousel: {
    prev: "Previous visual",
    next: "Next visual",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} more",
    today: "Today"
  },
  input: {
    clear: "Clear {0}",
    prependAction: "{0} prepended action",
    appendAction: "{0} appended action",
    otp: "Please enter OTP character {0}"
  },
  fileInput: {
    counter: "{0} files",
    counterSize: "{0} files ({1} in total)"
  },
  timePicker: {
    am: "AM",
    pm: "PM",
    title: "Select Time"
  },
  pagination: {
    ariaLabel: {
      root: "Pagination Navigation",
      next: "Next page",
      previous: "Previous page",
      page: "Go to page {0}",
      currentPage: "Page {0}, Current page",
      first: "First page",
      last: "Last page"
    }
  },
  stepper: {
    next: "Next",
    prev: "Previous"
  },
  rating: {
    ariaLabel: {
      item: "Rating {0} of {1}"
    }
  },
  loading: "Loading...",
  infiniteScroll: {
    loadMore: "Load more",
    empty: "No more"
  }
}, qs = "$vuetify.", Gs = (e, t) => e.replace(/\{(\d+)\}/g, (r, n) => String(t[+n])), al = (e, t, r) => function(n) {
  for (var o = arguments.length, a = new Array(o > 1 ? o - 1 : 0), s = 1; s < o; s++)
    a[s - 1] = arguments[s];
  if (!n.startsWith(qs))
    return Gs(n, a);
  const i = n.replace(qs, ""), c = e.value && r.value[e.value], u = t.value && r.value[t.value];
  let l = ws(c, i, null);
  return l || (`${n}${e.value}`, l = ws(u, i, null)), l || (l = n), typeof l != "string" && (l = n), Gs(l, a);
};
function sl(e, t) {
  return (r, n) => new Intl.NumberFormat([e.value, t.value], n).format(r);
}
function mo(e, t, r) {
  const n = Pa(e, t, e[t] ?? r.value);
  return n.value = e[t] ?? r.value, me(r, (o) => {
    e[t] == null && (n.value = r.value);
  }), n;
}
function il(e) {
  return (t) => {
    const r = mo(t, "locale", e.current), n = mo(t, "fallback", e.fallback), o = mo(t, "messages", e.messages);
    return {
      name: "vuetify",
      current: r,
      fallback: n,
      messages: o,
      t: al(r, n, o),
      n: sl(r, n),
      provide: il({
        current: r,
        fallback: n,
        messages: o
      })
    };
  };
}
function Fm(e) {
  const t = ze((e == null ? void 0 : e.locale) ?? "en"), r = ze((e == null ? void 0 : e.fallback) ?? "en"), n = Me({
    en: _m,
    ...e == null ? void 0 : e.messages
  });
  return {
    name: "vuetify",
    current: t,
    fallback: r,
    messages: n,
    t: al(t, r, n),
    n: sl(t, r),
    provide: il({
      current: t,
      fallback: r,
      messages: n
    })
  };
}
const Ho = Symbol.for("vuetify:locale");
function Bm(e) {
  return e.name != null;
}
function Vm(e) {
  const t = e != null && e.adapter && Bm(e == null ? void 0 : e.adapter) ? e == null ? void 0 : e.adapter : Fm(e), r = Hm(t, e);
  return {
    ...t,
    ...r
  };
}
function zm() {
  return {
    af: !1,
    ar: !0,
    bg: !1,
    ca: !1,
    ckb: !1,
    cs: !1,
    de: !1,
    el: !1,
    en: !1,
    es: !1,
    et: !1,
    fa: !0,
    fi: !1,
    fr: !1,
    hr: !1,
    hu: !1,
    he: !0,
    id: !1,
    it: !1,
    ja: !1,
    km: !1,
    ko: !1,
    lv: !1,
    lt: !1,
    nl: !1,
    no: !1,
    pl: !1,
    pt: !1,
    ro: !1,
    ru: !1,
    sk: !1,
    sl: !1,
    srCyrl: !1,
    srLatn: !1,
    sv: !1,
    th: !1,
    tr: !1,
    az: !1,
    uk: !1,
    vi: !1,
    zhHans: !1,
    zhHant: !1
  };
}
function Hm(e, t) {
  const r = Me((t == null ? void 0 : t.rtl) ?? zm()), n = X(() => r.value[e.current.value] ?? !1);
  return {
    isRtl: n,
    rtl: r,
    rtlClasses: X(() => `v-locale--is-${n.value ? "rtl" : "ltr"}`)
  };
}
function Zm() {
  const e = at(Ho);
  if (!e)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const Jn = {
  "001": 1,
  AD: 1,
  AE: 6,
  AF: 6,
  AG: 0,
  AI: 1,
  AL: 1,
  AM: 1,
  AN: 1,
  AR: 1,
  AS: 0,
  AT: 1,
  AU: 1,
  AX: 1,
  AZ: 1,
  BA: 1,
  BD: 0,
  BE: 1,
  BG: 1,
  BH: 6,
  BM: 1,
  BN: 1,
  BR: 0,
  BS: 0,
  BT: 0,
  BW: 0,
  BY: 1,
  BZ: 0,
  CA: 0,
  CH: 1,
  CL: 1,
  CM: 1,
  CN: 1,
  CO: 0,
  CR: 1,
  CY: 1,
  CZ: 1,
  DE: 1,
  DJ: 6,
  DK: 1,
  DM: 0,
  DO: 0,
  DZ: 6,
  EC: 1,
  EE: 1,
  EG: 6,
  ES: 1,
  ET: 0,
  FI: 1,
  FJ: 1,
  FO: 1,
  FR: 1,
  GB: 1,
  "GB-alt-variant": 0,
  GE: 1,
  GF: 1,
  GP: 1,
  GR: 1,
  GT: 0,
  GU: 0,
  HK: 0,
  HN: 0,
  HR: 1,
  HU: 1,
  ID: 0,
  IE: 1,
  IL: 0,
  IN: 0,
  IQ: 6,
  IR: 6,
  IS: 1,
  IT: 1,
  JM: 0,
  JO: 6,
  JP: 0,
  KE: 0,
  KG: 1,
  KH: 0,
  KR: 0,
  KW: 6,
  KZ: 1,
  LA: 0,
  LB: 1,
  LI: 1,
  LK: 1,
  LT: 1,
  LU: 1,
  LV: 1,
  LY: 6,
  MC: 1,
  MD: 1,
  ME: 1,
  MH: 0,
  MK: 1,
  MM: 0,
  MN: 1,
  MO: 0,
  MQ: 1,
  MT: 0,
  MV: 5,
  MX: 0,
  MY: 1,
  MZ: 0,
  NI: 0,
  NL: 1,
  NO: 1,
  NP: 0,
  NZ: 1,
  OM: 6,
  PA: 0,
  PE: 0,
  PH: 0,
  PK: 0,
  PL: 1,
  PR: 0,
  PT: 0,
  PY: 0,
  QA: 6,
  RE: 1,
  RO: 1,
  RS: 1,
  RU: 1,
  SA: 0,
  SD: 6,
  SE: 1,
  SG: 0,
  SI: 1,
  SK: 1,
  SM: 1,
  SV: 0,
  SY: 6,
  TH: 0,
  TJ: 1,
  TM: 1,
  TR: 1,
  TT: 0,
  TW: 0,
  UA: 1,
  UM: 0,
  US: 0,
  UY: 1,
  UZ: 1,
  VA: 1,
  VE: 0,
  VI: 0,
  VN: 1,
  WS: 0,
  XK: 1,
  YE: 0,
  ZA: 0,
  ZW: 0
};
function Ym(e, t, r) {
  const n = [];
  let o = [];
  const a = cl(e), s = ll(e), i = r ?? Jn[t.slice(-2).toUpperCase()] ?? 0, c = (a.getDay() - i + 7) % 7, u = (s.getDay() - i + 7) % 7;
  for (let l = 0; l < c; l++) {
    const g = new Date(a);
    g.setDate(g.getDate() - (c - l)), o.push(g);
  }
  for (let l = 1; l <= s.getDate(); l++) {
    const g = new Date(e.getFullYear(), e.getMonth(), l);
    o.push(g), o.length === 7 && (n.push(o), o = []);
  }
  for (let l = 1; l < 7 - u; l++) {
    const g = new Date(s);
    g.setDate(g.getDate() + l), o.push(g);
  }
  return o.length > 0 && n.push(o), n;
}
function Wm(e, t, r) {
  const n = r ?? Jn[t.slice(-2).toUpperCase()] ?? 0, o = new Date(e);
  for (; o.getDay() !== n; )
    o.setDate(o.getDate() - 1);
  return o;
}
function Jm(e, t) {
  const r = new Date(e), n = ((Jn[t.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
  for (; r.getDay() !== n; )
    r.setDate(r.getDate() + 1);
  return r;
}
function cl(e) {
  return new Date(e.getFullYear(), e.getMonth(), 1);
}
function ll(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 0);
}
function qm(e) {
  const t = e.split("-").map(Number);
  return new Date(t[0], t[1] - 1, t[2]);
}
const Gm = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
function ul(e) {
  if (e == null)
    return /* @__PURE__ */ new Date();
  if (e instanceof Date)
    return e;
  if (typeof e == "string") {
    let t;
    if (Gm.test(e))
      return qm(e);
    if (t = Date.parse(e), !isNaN(t))
      return new Date(t);
  }
  return null;
}
const Qs = new Date(2e3, 0, 2);
function Qm(e, t) {
  const r = t ?? Jn[e.slice(-2).toUpperCase()] ?? 0;
  return Zc(7).map((n) => {
    const o = new Date(Qs);
    return o.setDate(Qs.getDate() + r + n), new Intl.DateTimeFormat(e, {
      weekday: "narrow"
    }).format(o);
  });
}
function $m(e, t, r, n) {
  const o = ul(e) ?? /* @__PURE__ */ new Date(), a = n == null ? void 0 : n[t];
  if (typeof a == "function")
    return a(o, t, r);
  let s = {};
  switch (t) {
    case "fullDate":
      s = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "fullDateWithWeekday":
      s = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      break;
    case "normalDate":
      const i = o.getDate(), c = new Intl.DateTimeFormat(r, {
        month: "long"
      }).format(o);
      return `${i} ${c}`;
    case "normalDateWithWeekday":
      s = {
        weekday: "short",
        day: "numeric",
        month: "short"
      };
      break;
    case "shortDate":
      s = {
        month: "short",
        day: "numeric"
      };
      break;
    case "year":
      s = {
        year: "numeric"
      };
      break;
    case "month":
      s = {
        month: "long"
      };
      break;
    case "monthShort":
      s = {
        month: "short"
      };
      break;
    case "monthAndYear":
      s = {
        month: "long",
        year: "numeric"
      };
      break;
    case "monthAndDate":
      s = {
        month: "long",
        day: "numeric"
      };
      break;
    case "weekday":
      s = {
        weekday: "long"
      };
      break;
    case "weekdayShort":
      s = {
        weekday: "short"
      };
      break;
    case "dayOfMonth":
      return new Intl.NumberFormat(r).format(o.getDate());
    case "hours12h":
      s = {
        hour: "numeric",
        hour12: !0
      };
      break;
    case "hours24h":
      s = {
        hour: "numeric",
        hour12: !1
      };
      break;
    case "minutes":
      s = {
        minute: "numeric"
      };
      break;
    case "seconds":
      s = {
        second: "numeric"
      };
      break;
    case "fullTime":
      s = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullTime12h":
      s = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullTime24h":
      s = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "fullDateTime":
      s = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime12h":
      s = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "fullDateTime24h":
      s = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDate":
      s = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      break;
    case "keyboardDateTime":
      s = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    case "keyboardDateTime12h":
      s = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !0
      };
      break;
    case "keyboardDateTime24h":
      s = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: !1
      };
      break;
    default:
      s = a ?? {
        timeZone: "UTC",
        timeZoneName: "short"
      };
  }
  return new Intl.DateTimeFormat(r, s).format(o);
}
function Xm(e, t) {
  const r = e.toJsDate(t), n = r.getFullYear(), o = Ds(String(r.getMonth() + 1), 2, "0"), a = Ds(String(r.getDate()), 2, "0");
  return `${n}-${o}-${a}`;
}
function Km(e) {
  const [t, r, n] = e.split("-").map(Number);
  return new Date(t, r - 1, n);
}
function eA(e, t) {
  const r = new Date(e);
  return r.setMinutes(r.getMinutes() + t), r;
}
function tA(e, t) {
  const r = new Date(e);
  return r.setHours(r.getHours() + t), r;
}
function rA(e, t) {
  const r = new Date(e);
  return r.setDate(r.getDate() + t), r;
}
function nA(e, t) {
  const r = new Date(e);
  return r.setDate(r.getDate() + t * 7), r;
}
function oA(e, t) {
  const r = new Date(e);
  return r.setDate(1), r.setMonth(r.getMonth() + t), r;
}
function aA(e) {
  return e.getFullYear();
}
function sA(e) {
  return e.getMonth();
}
function iA(e) {
  return e.getDate();
}
function cA(e) {
  return new Date(e.getFullYear(), e.getMonth() + 1, 1);
}
function lA(e) {
  return new Date(e.getFullYear(), e.getMonth() - 1, 1);
}
function uA(e) {
  return e.getHours();
}
function gA(e) {
  return e.getMinutes();
}
function dA(e) {
  return new Date(e.getFullYear(), 0, 1);
}
function fA(e) {
  return new Date(e.getFullYear(), 11, 31);
}
function mA(e, t) {
  return Sn(e, t[0]) && IA(e, t[1]);
}
function AA(e) {
  const t = new Date(e);
  return t instanceof Date && !isNaN(t.getTime());
}
function Sn(e, t) {
  return e.getTime() > t.getTime();
}
function pA(e, t) {
  return Sn(Zo(e), Zo(t));
}
function IA(e, t) {
  return e.getTime() < t.getTime();
}
function $s(e, t) {
  return e.getTime() === t.getTime();
}
function hA(e, t) {
  return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function CA(e, t) {
  return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
}
function bA(e, t) {
  return e.getFullYear() === t.getFullYear();
}
function vA(e, t, r) {
  const n = new Date(e), o = new Date(t);
  switch (r) {
    case "years":
      return n.getFullYear() - o.getFullYear();
    case "quarters":
      return Math.floor((n.getMonth() - o.getMonth() + (n.getFullYear() - o.getFullYear()) * 12) / 4);
    case "months":
      return n.getMonth() - o.getMonth() + (n.getFullYear() - o.getFullYear()) * 12;
    case "weeks":
      return Math.floor((n.getTime() - o.getTime()) / (1e3 * 60 * 60 * 24 * 7));
    case "days":
      return Math.floor((n.getTime() - o.getTime()) / (1e3 * 60 * 60 * 24));
    case "hours":
      return Math.floor((n.getTime() - o.getTime()) / (1e3 * 60 * 60));
    case "minutes":
      return Math.floor((n.getTime() - o.getTime()) / (1e3 * 60));
    case "seconds":
      return Math.floor((n.getTime() - o.getTime()) / 1e3);
    default:
      return n.getTime() - o.getTime();
  }
}
function yA(e, t) {
  const r = new Date(e);
  return r.setHours(t), r;
}
function xA(e, t) {
  const r = new Date(e);
  return r.setMinutes(t), r;
}
function TA(e, t) {
  const r = new Date(e);
  return r.setMonth(t), r;
}
function SA(e, t) {
  const r = new Date(e);
  return r.setDate(t), r;
}
function MA(e, t) {
  const r = new Date(e);
  return r.setFullYear(t), r;
}
function Zo(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0, 0);
}
function EA(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
}
class wA {
  constructor(t) {
    this.locale = t.locale, this.formats = t.formats;
  }
  date(t) {
    return ul(t);
  }
  toJsDate(t) {
    return t;
  }
  toISO(t) {
    return Xm(this, t);
  }
  parseISO(t) {
    return Km(t);
  }
  addMinutes(t, r) {
    return eA(t, r);
  }
  addHours(t, r) {
    return tA(t, r);
  }
  addDays(t, r) {
    return rA(t, r);
  }
  addWeeks(t, r) {
    return nA(t, r);
  }
  addMonths(t, r) {
    return oA(t, r);
  }
  getWeekArray(t, r) {
    return Ym(t, this.locale, r ? Number(r) : void 0);
  }
  startOfWeek(t, r) {
    return Wm(t, this.locale, r ? Number(r) : void 0);
  }
  endOfWeek(t) {
    return Jm(t, this.locale);
  }
  startOfMonth(t) {
    return cl(t);
  }
  endOfMonth(t) {
    return ll(t);
  }
  format(t, r) {
    return $m(t, r, this.locale, this.formats);
  }
  isEqual(t, r) {
    return $s(t, r);
  }
  isValid(t) {
    return AA(t);
  }
  isWithinRange(t, r) {
    return mA(t, r);
  }
  isAfter(t, r) {
    return Sn(t, r);
  }
  isAfterDay(t, r) {
    return pA(t, r);
  }
  isBefore(t, r) {
    return !Sn(t, r) && !$s(t, r);
  }
  isSameDay(t, r) {
    return hA(t, r);
  }
  isSameMonth(t, r) {
    return CA(t, r);
  }
  isSameYear(t, r) {
    return bA(t, r);
  }
  setMinutes(t, r) {
    return xA(t, r);
  }
  setHours(t, r) {
    return yA(t, r);
  }
  setMonth(t, r) {
    return TA(t, r);
  }
  setDate(t, r) {
    return SA(t, r);
  }
  setYear(t, r) {
    return MA(t, r);
  }
  getDiff(t, r, n) {
    return vA(t, r, n);
  }
  getWeekdays(t) {
    return Qm(this.locale, t ? Number(t) : void 0);
  }
  getYear(t) {
    return aA(t);
  }
  getMonth(t) {
    return sA(t);
  }
  getDate(t) {
    return iA(t);
  }
  getNextMonth(t) {
    return cA(t);
  }
  getPreviousMonth(t) {
    return lA(t);
  }
  getHours(t) {
    return uA(t);
  }
  getMinutes(t) {
    return gA(t);
  }
  startOfDay(t) {
    return Zo(t);
  }
  endOfDay(t) {
    return EA(t);
  }
  startOfYear(t) {
    return dA(t);
  }
  endOfYear(t) {
    return fA(t);
  }
}
const LA = Symbol.for("vuetify:date-options"), Xs = Symbol.for("vuetify:date-adapter");
function jA(e, t) {
  const r = dt({
    adapter: wA,
    locale: {
      af: "af-ZA",
      // ar: '', # not the same value for all variants
      bg: "bg-BG",
      ca: "ca-ES",
      ckb: "",
      cs: "cs-CZ",
      de: "de-DE",
      el: "el-GR",
      en: "en-US",
      // es: '', # not the same value for all variants
      et: "et-EE",
      fa: "fa-IR",
      fi: "fi-FI",
      // fr: '', #not the same value for all variants
      hr: "hr-HR",
      hu: "hu-HU",
      he: "he-IL",
      id: "id-ID",
      it: "it-IT",
      ja: "ja-JP",
      ko: "ko-KR",
      lv: "lv-LV",
      lt: "lt-LT",
      nl: "nl-NL",
      no: "no-NO",
      pl: "pl-PL",
      pt: "pt-PT",
      ro: "ro-RO",
      ru: "ru-RU",
      sk: "sk-SK",
      sl: "sl-SI",
      srCyrl: "sr-SP",
      srLatn: "sr-SP",
      sv: "sv-SE",
      th: "th-TH",
      tr: "tr-TR",
      az: "az-AZ",
      uk: "uk-UA",
      vi: "vi-VN",
      zhHans: "zh-CN",
      zhHant: "zh-TW"
    }
  }, e);
  return {
    options: r,
    instance: DA(r, t)
  };
}
function DA(e, t) {
  const r = ft(typeof e.adapter == "function" ? new e.adapter({
    locale: e.locale[t.current.value] ?? t.current.value,
    formats: e.formats
  }) : e.adapter);
  return me(t.current, (n) => {
    r.locale = e.locale[n] ?? n ?? r.locale;
  }), r;
}
const Yo = Symbol.for("vuetify:display"), Ks = {
  mobileBreakpoint: "lg",
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
}, NA = function() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ks;
  return dt(Ks, e);
};
function ei(e) {
  return fe && !e ? window.innerWidth : typeof e == "object" && e.clientWidth || 0;
}
function ti(e) {
  return fe && !e ? window.innerHeight : typeof e == "object" && e.clientHeight || 0;
}
function ri(e) {
  const t = fe && !e ? window.navigator.userAgent : "ssr";
  function r(C) {
    return !!t.match(C);
  }
  const n = r(/android/i), o = r(/iphone|ipad|ipod/i), a = r(/cordova/i), s = r(/electron/i), i = r(/chrome/i), c = r(/edge/i), u = r(/firefox/i), l = r(/opera/i), g = r(/win/i), m = r(/mac/i), I = r(/linux/i);
  return {
    android: n,
    ios: o,
    cordova: a,
    electron: s,
    chrome: i,
    edge: c,
    firefox: u,
    opera: l,
    win: g,
    mac: m,
    linux: I,
    touch: Wf,
    ssr: t === "ssr"
  };
}
function OA(e, t) {
  const {
    thresholds: r,
    mobileBreakpoint: n
  } = NA(e), o = ze(ti(t)), a = ze(ri(t)), s = ft({}), i = ze(ei(t));
  function c() {
    o.value = ti(), i.value = ei();
  }
  function u() {
    c(), a.value = ri();
  }
  return Gt(() => {
    const l = i.value < r.sm, g = i.value < r.md && !l, m = i.value < r.lg && !(g || l), I = i.value < r.xl && !(m || g || l), C = i.value < r.xxl && !(I || m || g || l), p = i.value >= r.xxl, L = l ? "xs" : g ? "sm" : m ? "md" : I ? "lg" : C ? "xl" : "xxl", B = typeof n == "number" ? n : r[n], V = i.value < B;
    s.xs = l, s.sm = g, s.md = m, s.lg = I, s.xl = C, s.xxl = p, s.smAndUp = !l, s.mdAndUp = !(l || g), s.lgAndUp = !(l || g || m), s.xlAndUp = !(l || g || m || I), s.smAndDown = !(m || I || C || p), s.mdAndDown = !(I || C || p), s.lgAndDown = !(C || p), s.xlAndDown = !p, s.name = L, s.height = o.value, s.width = i.value, s.mobile = V, s.mobileBreakpoint = n, s.platform = a.value, s.thresholds = r;
  }), fe && window.addEventListener("resize", c, {
    passive: !0
  }), {
    ...Yi(s),
    update: u,
    ssr: !!t
  };
}
function PA() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Lm();
  const r = at(Yo);
  if (!r)
    throw new Error("Could not find Vuetify display injection");
  const n = X(() => {
    if (e.mobile != null)
      return e.mobile;
    if (!e.mobileBreakpoint)
      return r.mobile.value;
    const a = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : r.thresholds.value[e.mobileBreakpoint];
    return r.width.value < a;
  }), o = X(() => t ? {
    [`${t}--mobile`]: n.value
  } : {});
  return {
    ...r,
    displayClasses: o,
    mobile: n
  };
}
const RA = Symbol.for("vuetify:goto");
function kA() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function UA(e, t) {
  return {
    rtl: t.isRtl,
    options: dt(kA(), e)
  };
}
const _A = {
  collapse: "mdi-chevron-up",
  complete: "mdi-check",
  cancel: "mdi-close-circle",
  close: "mdi-close",
  delete: "mdi-close-circle",
  // delete (e.g. v-chip close)
  clear: "mdi-close-circle",
  success: "mdi-check-circle",
  info: "mdi-information",
  warning: "mdi-alert-circle",
  error: "mdi-close-circle",
  prev: "mdi-chevron-left",
  next: "mdi-chevron-right",
  checkboxOn: "mdi-checkbox-marked",
  checkboxOff: "mdi-checkbox-blank-outline",
  checkboxIndeterminate: "mdi-minus-box",
  delimiter: "mdi-circle",
  // for carousel
  sortAsc: "mdi-arrow-up",
  sortDesc: "mdi-arrow-down",
  expand: "mdi-chevron-down",
  menu: "mdi-menu",
  subgroup: "mdi-menu-down",
  dropdown: "mdi-menu-down",
  radioOn: "mdi-radiobox-marked",
  radioOff: "mdi-radiobox-blank",
  edit: "mdi-pencil",
  ratingEmpty: "mdi-star-outline",
  ratingFull: "mdi-star",
  ratingHalf: "mdi-star-half-full",
  loading: "mdi-cached",
  first: "mdi-page-first",
  last: "mdi-page-last",
  unfold: "mdi-unfold-more-horizontal",
  file: "mdi-paperclip",
  plus: "mdi-plus",
  minus: "mdi-minus",
  calendar: "mdi-calendar",
  treeviewCollapse: "mdi-menu-down",
  treeviewExpand: "mdi-menu-right",
  eyeDropper: "mdi-eyedropper"
}, FA = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (e) => Hn(dl, {
    ...e,
    class: "mdi"
  })
}, BA = [String, Function, Object, Array], ni = Symbol.for("vuetify:icons"), qn = He({
  icon: {
    type: BA
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon");
Na()({
  name: "VComponentIcon",
  props: qn(),
  setup(e, t) {
    let {
      slots: r
    } = t;
    return () => {
      const n = e.icon;
      return ae(e.tag, null, {
        default: () => {
          var o;
          return [e.icon ? ae(n, null, null) : (o = r.default) == null ? void 0 : o.call(r)];
        }
      });
    };
  }
});
const gl = Vr({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: qn(),
  setup(e, t) {
    let {
      attrs: r
    } = t;
    return () => ae(e.tag, Ve(r, {
      style: null
    }), {
      default: () => [ae("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((n) => Array.isArray(n) ? ae("path", {
        d: n[0],
        "fill-opacity": n[1]
      }, null) : ae("path", {
        d: n
      }, null)) : ae("path", {
        d: e.icon
      }, null)])]
    });
  }
});
Vr({
  name: "VLigatureIcon",
  props: qn(),
  setup(e) {
    return () => ae(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
const dl = Vr({
  name: "VClassIcon",
  props: qn(),
  setup(e) {
    return () => ae(e.tag, {
      class: e.icon
    }, null);
  }
});
function VA() {
  return {
    svg: {
      component: gl
    },
    class: {
      component: dl
    }
  };
}
function zA(e) {
  const t = VA(), r = (e == null ? void 0 : e.defaultSet) ?? "mdi";
  return r === "mdi" && !t.mdi && (t.mdi = FA), dt({
    defaultSet: r,
    sets: t,
    aliases: {
      ..._A,
      /* eslint-disable max-len */
      vuetify: ["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z", ["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z", 0.6]],
      "vuetify-outline": "svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z",
      "vuetify-play": ["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z", ["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z", 0.6]]
      /* eslint-enable max-len */
    }
  }, e);
}
const Mn = Symbol.for("vuetify:theme"), HA = He({
  theme: String
}, "theme");
function oi() {
  return {
    defaultTheme: "light",
    variations: {
      colors: [],
      lighten: 0,
      darken: 0
    },
    themes: {
      light: {
        dark: !1,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#000000",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 0.87,
          "medium-emphasis-opacity": 0.6,
          "disabled-opacity": 0.38,
          "idle-opacity": 0.04,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.12,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#F5F5F5",
          "theme-on-code": "#000000"
        }
      },
      dark: {
        dark: !0,
        colors: {
          background: "#121212",
          surface: "#212121",
          "surface-bright": "#ccbfd6",
          "surface-light": "#424242",
          "surface-variant": "#a3a3a3",
          "on-surface-variant": "#424242",
          primary: "#2196F3",
          "primary-darken-1": "#277CC1",
          secondary: "#54B6B2",
          "secondary-darken-1": "#48A9A6",
          error: "#CF6679",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00"
        },
        variables: {
          "border-color": "#FFFFFF",
          "border-opacity": 0.12,
          "high-emphasis-opacity": 1,
          "medium-emphasis-opacity": 0.7,
          "disabled-opacity": 0.5,
          "idle-opacity": 0.1,
          "hover-opacity": 0.04,
          "focus-opacity": 0.12,
          "selected-opacity": 0.08,
          "activated-opacity": 0.12,
          "pressed-opacity": 0.16,
          "dragged-opacity": 0.08,
          "theme-kbd": "#212529",
          "theme-on-kbd": "#FFFFFF",
          "theme-code": "#343434",
          "theme-on-code": "#CCCCCC"
        }
      }
    }
  };
}
function ZA() {
  var n, o;
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : oi();
  const t = oi();
  if (!e)
    return {
      ...t,
      isDisabled: !0
    };
  const r = {};
  for (const [a, s] of Object.entries(e.themes ?? {})) {
    const i = s.dark || a === "dark" ? (n = t.themes) == null ? void 0 : n.dark : (o = t.themes) == null ? void 0 : o.light;
    r[a] = dt(i, s);
  }
  return dt(t, {
    ...e,
    themes: r
  });
}
function YA(e) {
  const t = ZA(e), r = Me(t.defaultTheme), n = Me(t.themes), o = X(() => {
    const l = {};
    for (const [g, m] of Object.entries(n.value)) {
      const I = l[g] = {
        ...m,
        colors: {
          ...m.colors
        }
      };
      if (t.variations)
        for (const C of t.variations.colors) {
          const p = I.colors[C];
          if (p)
            for (const L of ["lighten", "darken"]) {
              const B = L === "lighten" ? Sm : Mm;
              for (const V of Zc(t.variations[L], 1))
                I.colors[`${C}-${L}-${V}`] = ym(B(ot(p), V));
            }
        }
      for (const C of Object.keys(I.colors)) {
        if (/^on-[a-z]/.test(C) || I.colors[`on-${C}`])
          continue;
        const p = `on-${C}`, L = ot(I.colors[C]);
        I.colors[p] = el(L);
      }
    }
    return l;
  }), a = X(() => o.value[r.value]), s = X(() => {
    var C;
    const l = [];
    (C = a.value) != null && C.dark && Ut(l, ":root", ["color-scheme: dark"]), Ut(l, ":root", ai(a.value));
    for (const [p, L] of Object.entries(o.value))
      Ut(l, `.v-theme--${p}`, [`color-scheme: ${L.dark ? "dark" : "normal"}`, ...ai(L)]);
    const g = [], m = [], I = new Set(Object.values(o.value).flatMap((p) => Object.keys(p.colors)));
    for (const p of I)
      /^on-[a-z]/.test(p) ? Ut(m, `.${p}`, [`color: rgb(var(--v-theme-${p})) !important`]) : (Ut(g, `.bg-${p}`, [`--v-theme-overlay-multiplier: var(--v-theme-${p}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${p})) !important`, `color: rgb(var(--v-theme-on-${p})) !important`]), Ut(m, `.text-${p}`, [`color: rgb(var(--v-theme-${p})) !important`]), Ut(m, `.border-${p}`, [`--v-border-color: var(--v-theme-${p})`]));
    return l.push(...g, ...m), l.map((p, L) => L === 0 ? p : `    ${p}`).join("");
  });
  function i() {
    return {
      style: [{
        children: s.value,
        id: "vuetify-theme-stylesheet",
        nonce: t.cspNonce || !1
      }]
    };
  }
  function c(l) {
    if (t.isDisabled)
      return;
    const g = l._context.provides.usehead;
    if (g)
      if (g.push) {
        const I = g.push(i);
        fe && me(s, () => {
          I.patch(i);
        });
      } else
        fe ? (g.addHeadObjs(X(i)), Gt(() => g.updateDOM())) : g.addHeadObjs(i());
    else {
      let C = function() {
        if (typeof document < "u" && !I) {
          const p = document.createElement("style");
          p.type = "text/css", p.id = "vuetify-theme-stylesheet", t.cspNonce && p.setAttribute("nonce", t.cspNonce), I = p, document.head.appendChild(I);
        }
        I && (I.innerHTML = s.value);
      };
      var m = C;
      let I = fe ? document.getElementById("vuetify-theme-stylesheet") : null;
      fe ? me(s, C, {
        immediate: !0
      }) : C();
    }
  }
  const u = X(() => t.isDisabled ? void 0 : `v-theme--${r.value}`);
  return {
    install: c,
    isDisabled: t.isDisabled,
    name: r,
    themes: n,
    current: a,
    computedThemes: o,
    themeClasses: u,
    styles: s,
    global: {
      name: r,
      current: a
    }
  };
}
function WA(e) {
  qe("provideTheme");
  const t = at(Mn, null);
  if (!t)
    throw new Error("Could not find Vuetify theme injection");
  const r = X(() => e.theme ?? t.name.value), n = X(() => t.themes.value[r.value]), o = X(() => t.isDisabled ? void 0 : `v-theme--${r.value}`), a = {
    ...t,
    name: r,
    current: n,
    themeClasses: o
  };
  return Fn(Mn, a), a;
}
function Ut(e, t, r) {
  e.push(`${t} {
`, ...r.map((n) => `  ${n};
`), `}
`);
}
function ai(e) {
  const t = e.dark ? 2 : 1, r = e.dark ? 1 : 2, n = [];
  for (const [o, a] of Object.entries(e.colors)) {
    const s = ot(a);
    n.push(`--v-theme-${o}: ${s.r},${s.g},${s.b}`), o.startsWith("on-") || n.push(`--v-theme-${o}-overlay-multiplier: ${Em(a) > 0.18 ? t : r}`);
  }
  for (const [o, a] of Object.entries(e.variables)) {
    const s = typeof a == "string" && a.startsWith("#") ? ot(a) : void 0, i = s ? `${s.r}, ${s.g}, ${s.b}` : void 0;
    n.push(`--v-${o}: ${i ?? a}`);
  }
  return n;
}
function fl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const {
    blueprint: t,
    ...r
  } = e, n = dt(t, r), {
    aliases: o = {},
    components: a = {},
    directives: s = {}
  } = n, i = Dm(n.defaults), c = OA(n.display, n.ssr), u = YA(n.theme), l = zA(n.icons), g = Vm(n.locale), m = jA(n.date, g), I = UA(n.goTo, g);
  return {
    install: (p) => {
      for (const L in s)
        p.directive(L, s[L]);
      for (const L in a)
        p.component(L, a[L]);
      for (const L in o)
        p.component(L, Vr({
          ...o[L],
          name: L,
          aliasName: o[L].name
        }));
      if (u.install(p), p.provide(Rr, i), p.provide(Yo, c), p.provide(Mn, u), p.provide(ni, l), p.provide(Ho, g), p.provide(LA, m.options), p.provide(Xs, m.instance), p.provide(RA, I), fe && n.ssr)
        if (p.$nuxt)
          p.$nuxt.hook("app:suspense:resolve", () => {
            c.update();
          });
        else {
          const {
            mount: L
          } = p;
          p.mount = function() {
            const B = L(...arguments);
            return ir(() => c.update()), p.mount = L, B;
          };
        }
      Da.reset(), (typeof __VUE_OPTIONS_API__ != "boolean" || __VUE_OPTIONS_API__) && p.mixin({
        computed: {
          $vuetify() {
            return ft({
              defaults: Xt.call(this, Rr),
              display: Xt.call(this, Yo),
              theme: Xt.call(this, Mn),
              icons: Xt.call(this, ni),
              locale: Xt.call(this, Ho),
              date: Xt.call(this, Xs)
            });
          }
        }
      });
    },
    defaults: i,
    display: c,
    theme: u,
    icons: l,
    locale: g,
    date: m,
    goTo: I
  };
}
const JA = "3.7.0";
fl.version = JA;
function Xt(e) {
  var n, o;
  const t = this.$, r = ((n = t.parent) == null ? void 0 : n.provides) ?? ((o = t.vnode.appContext) == null ? void 0 : o.provides);
  if (r && e in r)
    return r[e];
}
const qA = {
  collapse: "svg:M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",
  complete: "svg:M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  cancel: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  close: "svg:M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  delete: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  // delete (e.g. v-chip close)
  clear: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  success: "svg:M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
  info: "svg:M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  warning: "svg:M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  error: "svg:M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  prev: "svg:M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
  next: "svg:M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  checkboxOn: "svg:M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
  checkboxOff: "svg:M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  checkboxIndeterminate: "svg:M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
  delimiter: "svg:M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  // for carousel
  sortAsc: "svg:M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
  sortDesc: "svg:M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
  expand: "svg:M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  menu: "svg:M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
  subgroup: "svg:M7,10L12,15L17,10H7Z",
  dropdown: "svg:M7,10L12,15L17,10H7Z",
  radioOn: "svg:M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z",
  radioOff: "svg:M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
  edit: "svg:M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
  ratingEmpty: "svg:M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  ratingFull: "svg:M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
  ratingHalf: "svg:M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
  loading: "svg:M19,8L15,12H18C18,15.31 15.31,18 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20C16.42,20 20,16.42 20,12H23M6,12C6,8.69 8.69,6 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4C7.58,4 4,7.58 4,12H1L5,16L9,12",
  first: "svg:M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
  last: "svg:M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
  unfold: "svg:M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
  file: "svg:M16.5,6V17.5C16.5,19.71 14.71,21.5 12.5,21.5C10.29,21.5 8.5,19.71 8.5,17.5V5C8.5,3.62 9.62,2.5 11,2.5C12.38,2.5 13.5,3.62 13.5,5V15.5C13.5,16.05 13.05,16.5 12.5,16.5C11.95,16.5 11.5,16.05 11.5,15.5V6H10V15.5C10,16.88 11.12,18 12.5,18C13.88,18 15,16.88 15,15.5V5C15,2.79 13.21,1 11,1C8.79,1 7,2.79 7,5V17.5C7,20.54 9.46,23 12.5,23C15.54,23 18,20.54 18,17.5V6H16.5Z",
  plus: "svg:M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  minus: "svg:M19,13H5V11H19V13Z",
  calendar: "svg:M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z",
  treeviewCollapse: "svg:M7,10L12,15L17,10H7Z",
  treeviewExpand: "svg:M10,17L15,12L10,7V17Z",
  eyeDropper: "svg:M19.35,11.72L17.22,13.85L15.81,12.43L8.1,20.14L3.5,22L2,20.5L3.86,15.9L11.57,8.19L10.15,6.78L12.28,4.65L19.35,11.72M16.76,3C17.93,1.83 19.83,1.83 21,3C22.17,4.17 22.17,6.07 21,7.24L19.08,9.16L14.84,4.92L16.76,3M5.56,17.03L4.5,19.5L6.97,18.44L14.4,11L13,9.6L5.56,17.03Z"
}, GA = {
  component: gl
};
function QA() {
  return !0;
}
function ml(e, t, r) {
  if (!e || Al(e, r) === !1)
    return !1;
  const n = nl(t);
  if (typeof ShadowRoot < "u" && n instanceof ShadowRoot && n.host === e.target)
    return !1;
  const o = (typeof r.value == "object" && r.value.include || (() => []))();
  return o.push(t), !o.some((a) => a == null ? void 0 : a.contains(e.target));
}
function Al(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || QA)(e);
}
function $A(e, t, r) {
  const n = typeof r.value == "function" ? r.value : r.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && ml(e, t, r) && setTimeout(() => {
    Al(e, r) && n && n(e);
  }, 0);
}
function si(e, t) {
  const r = nl(e);
  t(document), typeof ShadowRoot < "u" && r instanceof ShadowRoot && t(r);
}
const pl = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const r = (o) => $A(o, e, t), n = (o) => {
      e._clickOutside.lastMousedownWasOutside = ml(o, e, t);
    };
    si(e, (o) => {
      o.addEventListener("click", r, !0), o.addEventListener("mousedown", n, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: r,
      onMousedown: n
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (si(e, (r) => {
      var a;
      if (!r || !((a = e._clickOutside) != null && a[t.instance.$.uid]))
        return;
      const {
        onClick: n,
        onMousedown: o
      } = e._clickOutside[t.instance.$.uid];
      r.removeEventListener("click", n, !0), r.removeEventListener("mousedown", o, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function XA(e, t) {
  if (!Yf)
    return;
  const r = t.modifiers || {}, n = t.value, {
    handler: o,
    options: a
  } = typeof n == "object" ? n : {
    handler: n,
    options: {}
  }, s = new IntersectionObserver(function() {
    var g;
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], c = arguments.length > 1 ? arguments[1] : void 0;
    const u = (g = e._observe) == null ? void 0 : g[t.instance.$.uid];
    if (!u)
      return;
    const l = i.some((m) => m.isIntersecting);
    o && (!r.quiet || u.init) && (!r.once || l || u.init) && o(l, i, c), l && r.once ? Il(e, t) : u.init = !0;
  }, a);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: s
  }, s.observe(e);
}
function Il(e, t) {
  var n;
  const r = (n = e._observe) == null ? void 0 : n[t.instance.$.uid];
  r && (r.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const KA = {
  mounted: XA,
  unmounted: Il
};
function ep(e, t) {
  const r = t.modifiers || {}, n = t.value, {
    once: o,
    immediate: a,
    ...s
  } = r, i = !Object.keys(s).length, {
    handler: c,
    options: u
  } = typeof n == "object" ? n : {
    handler: n,
    options: {
      attributes: (s == null ? void 0 : s.attr) ?? i,
      characterData: (s == null ? void 0 : s.char) ?? i,
      childList: (s == null ? void 0 : s.child) ?? i,
      subtree: (s == null ? void 0 : s.sub) ?? i
    }
  }, l = new MutationObserver(function() {
    let g = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], m = arguments.length > 1 ? arguments[1] : void 0;
    c == null || c(g, m), o && hl(e, t);
  });
  a && (c == null || c([], l)), e._mutate = Object(e._mutate), e._mutate[t.instance.$.uid] = {
    observer: l
  }, l.observe(e, u);
}
function hl(e, t) {
  var r;
  (r = e._mutate) != null && r[t.instance.$.uid] && (e._mutate[t.instance.$.uid].observer.disconnect(), delete e._mutate[t.instance.$.uid]);
}
const tp = {
  mounted: ep,
  unmounted: hl
};
function rp(e, t) {
  var o, a;
  const r = t.value, n = {
    passive: !((o = t.modifiers) != null && o.active)
  };
  window.addEventListener("resize", r, n), e._onResize = Object(e._onResize), e._onResize[t.instance.$.uid] = {
    handler: r,
    options: n
  }, (a = t.modifiers) != null && a.quiet || r();
}
function np(e, t) {
  var o;
  if (!((o = e._onResize) != null && o[t.instance.$.uid]))
    return;
  const {
    handler: r,
    options: n
  } = e._onResize[t.instance.$.uid];
  window.removeEventListener("resize", r, n), delete e._onResize[t.instance.$.uid];
}
const op = {
  mounted: rp,
  unmounted: np
};
const Wo = Symbol("rippleStop"), ap = 80;
function ii(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Jo(e) {
  return e.constructor.name === "TouchEvent";
}
function Cl(e) {
  return e.constructor.name === "KeyboardEvent";
}
const sp = function(e, t) {
  var g;
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = 0, o = 0;
  if (!Cl(e)) {
    const m = t.getBoundingClientRect(), I = Jo(e) ? e.touches[e.touches.length - 1] : e;
    n = I.clientX - m.left, o = I.clientY - m.top;
  }
  let a = 0, s = 0.3;
  (g = t._ripple) != null && g.circle ? (s = 0.15, a = t.clientWidth / 2, a = r.center ? a : a + Math.sqrt((n - a) ** 2 + (o - a) ** 2) / 4) : a = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const i = `${(t.clientWidth - a * 2) / 2}px`, c = `${(t.clientHeight - a * 2) / 2}px`, u = r.center ? i : `${n - a}px`, l = r.center ? c : `${o - a}px`;
  return {
    radius: a,
    scale: s,
    x: u,
    y: l,
    centerX: i,
    centerY: c
  };
}, En = {
  /* eslint-disable max-statements */
  show(e, t) {
    var I;
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((I = t == null ? void 0 : t._ripple) != null && I.enabled))
      return;
    const n = document.createElement("span"), o = document.createElement("span");
    n.appendChild(o), n.className = "v-ripple__container", r.class && (n.className += ` ${r.class}`);
    const {
      radius: a,
      scale: s,
      x: i,
      y: c,
      centerX: u,
      centerY: l
    } = sp(e, t, r), g = `${a * 2}px`;
    o.className = "v-ripple__animation", o.style.width = g, o.style.height = g, t.appendChild(n);
    const m = window.getComputedStyle(t);
    m && m.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), o.classList.add("v-ripple__animation--enter"), o.classList.add("v-ripple__animation--visible"), ii(o, `translate(${i}, ${c}) scale3d(${s},${s},${s})`), o.dataset.activated = String(performance.now()), setTimeout(() => {
      o.classList.remove("v-ripple__animation--enter"), o.classList.add("v-ripple__animation--in"), ii(o, `translate(${u}, ${l}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var a;
    if (!((a = e == null ? void 0 : e._ripple) != null && a.enabled))
      return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0)
      return;
    const r = t[t.length - 1];
    if (r.dataset.isHiding)
      return;
    r.dataset.isHiding = "true";
    const n = performance.now() - Number(r.dataset.activated), o = Math.max(250 - n, 0);
    setTimeout(() => {
      r.classList.remove("v-ripple__animation--in"), r.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var i;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((i = r.parentNode) == null ? void 0 : i.parentNode) === e && e.removeChild(r.parentNode);
      }, 300);
    }, o);
  }
};
function bl(e) {
  return typeof e > "u" || !!e;
}
function kr(e) {
  const t = {}, r = e.currentTarget;
  if (!(!(r != null && r._ripple) || r._ripple.touched || e[Wo])) {
    if (e[Wo] = !0, Jo(e))
      r._ripple.touched = !0, r._ripple.isTouch = !0;
    else if (r._ripple.isTouch)
      return;
    if (t.center = r._ripple.centered || Cl(e), r._ripple.class && (t.class = r._ripple.class), Jo(e)) {
      if (r._ripple.showTimerCommit)
        return;
      r._ripple.showTimerCommit = () => {
        En.show(e, r, t);
      }, r._ripple.showTimer = window.setTimeout(() => {
        var n;
        (n = r == null ? void 0 : r._ripple) != null && n.showTimerCommit && (r._ripple.showTimerCommit(), r._ripple.showTimerCommit = null);
      }, ap);
    } else
      En.show(e, r, t);
  }
}
function ci(e) {
  e[Wo] = !0;
}
function Be(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Be(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), En.hide(t);
  }
}
function vl(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Ur = !1;
function yl(e) {
  !Ur && (e.keyCode === Ls.enter || e.keyCode === Ls.space) && (Ur = !0, kr(e));
}
function xl(e) {
  Ur = !1, Be(e);
}
function Tl(e) {
  Ur && (Ur = !1, Be(e));
}
function Sl(e, t, r) {
  const {
    value: n,
    modifiers: o
  } = t, a = bl(n);
  if (a || En.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = a, e._ripple.centered = o.center, e._ripple.circle = o.circle, yn(n) && n.class && (e._ripple.class = n.class), a && !r) {
    if (o.stop) {
      e.addEventListener("touchstart", ci, {
        passive: !0
      }), e.addEventListener("mousedown", ci);
      return;
    }
    e.addEventListener("touchstart", kr, {
      passive: !0
    }), e.addEventListener("touchend", Be, {
      passive: !0
    }), e.addEventListener("touchmove", vl, {
      passive: !0
    }), e.addEventListener("touchcancel", Be), e.addEventListener("mousedown", kr), e.addEventListener("mouseup", Be), e.addEventListener("mouseleave", Be), e.addEventListener("keydown", yl), e.addEventListener("keyup", xl), e.addEventListener("blur", Tl), e.addEventListener("dragstart", Be, {
      passive: !0
    });
  } else
    !a && r && Ml(e);
}
function Ml(e) {
  e.removeEventListener("mousedown", kr), e.removeEventListener("touchstart", kr), e.removeEventListener("touchend", Be), e.removeEventListener("touchmove", vl), e.removeEventListener("touchcancel", Be), e.removeEventListener("mouseup", Be), e.removeEventListener("mouseleave", Be), e.removeEventListener("keydown", yl), e.removeEventListener("keyup", xl), e.removeEventListener("dragstart", Be), e.removeEventListener("blur", Tl);
}
function ip(e, t) {
  Sl(e, t, !1);
}
function cp(e) {
  delete e._ripple, Ml(e);
}
function lp(e, t) {
  if (t.value === t.oldValue)
    return;
  const r = bl(t.oldValue);
  Sl(e, t, r);
}
const up = {
  mounted: ip,
  unmounted: cp,
  updated: lp
};
function El(e, t) {
  const {
    self: r = !1
  } = t.modifiers ?? {}, n = t.value, o = typeof n == "object" && n.options || {
    passive: !0
  }, a = typeof n == "function" || "handleEvent" in n ? n : n.handler, s = r ? e : t.arg ? document.querySelector(t.arg) : window;
  s && (s.addEventListener("scroll", a, o), e._onScroll = Object(e._onScroll), e._onScroll[t.instance.$.uid] = {
    handler: a,
    options: o,
    // Don't reference self
    target: r ? void 0 : s
  });
}
function wl(e, t) {
  var a;
  if (!((a = e._onScroll) != null && a[t.instance.$.uid]))
    return;
  const {
    handler: r,
    options: n,
    target: o = e
  } = e._onScroll[t.instance.$.uid];
  o.removeEventListener("scroll", r, n), delete e._onScroll[t.instance.$.uid];
}
function gp(e, t) {
  t.value !== t.oldValue && (wl(e, t), El(e, t));
}
const dp = {
  mounted: El,
  unmounted: wl,
  updated: gp
}, fp = (e) => {
  const {
    touchstartX: t,
    touchendX: r,
    touchstartY: n,
    touchendY: o
  } = e, a = 0.5, s = 16;
  e.offsetX = r - t, e.offsetY = o - n, Math.abs(e.offsetY) < a * Math.abs(e.offsetX) && (e.left && r < t - s && e.left(e), e.right && r > t + s && e.right(e)), Math.abs(e.offsetX) < a * Math.abs(e.offsetY) && (e.up && o < n - s && e.up(e), e.down && o > n + s && e.down(e));
};
function mp(e, t) {
  var n;
  const r = e.changedTouches[0];
  t.touchstartX = r.clientX, t.touchstartY = r.clientY, (n = t.start) == null || n.call(t, {
    originalEvent: e,
    ...t
  });
}
function Ap(e, t) {
  var n;
  const r = e.changedTouches[0];
  t.touchendX = r.clientX, t.touchendY = r.clientY, (n = t.end) == null || n.call(t, {
    originalEvent: e,
    ...t
  }), fp(t);
}
function pp(e, t) {
  var n;
  const r = e.changedTouches[0];
  t.touchmoveX = r.clientX, t.touchmoveY = r.clientY, (n = t.move) == null || n.call(t, {
    originalEvent: e,
    ...t
  });
}
function Ip() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: e.left,
    right: e.right,
    up: e.up,
    down: e.down,
    start: e.start,
    move: e.move,
    end: e.end
  };
  return {
    touchstart: (r) => mp(r, t),
    touchend: (r) => Ap(r, t),
    touchmove: (r) => pp(r, t)
  };
}
function hp(e, t) {
  var i;
  const r = t.value, n = r != null && r.parent ? e.parentElement : e, o = (r == null ? void 0 : r.options) ?? {
    passive: !0
  }, a = (i = t.instance) == null ? void 0 : i.$.uid;
  if (!n || !a)
    return;
  const s = Ip(t.value);
  n._touchHandlers = n._touchHandlers ?? /* @__PURE__ */ Object.create(null), n._touchHandlers[a] = s, Yc(s).forEach((c) => {
    n.addEventListener(c, s[c], o);
  });
}
function Cp(e, t) {
  var a, s;
  const r = (a = t.value) != null && a.parent ? e.parentElement : e, n = (s = t.instance) == null ? void 0 : s.$.uid;
  if (!(r != null && r._touchHandlers) || !n)
    return;
  const o = r._touchHandlers[n];
  Yc(o).forEach((i) => {
    r.removeEventListener(i, o[i]);
  }), delete r._touchHandlers[n];
}
const bp = {
  mounted: hp,
  unmounted: Cp
};
function Ao(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function vp(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function li(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: r,
      align: n
    } = e, o = n === "left" ? 0 : n === "center" ? t.width / 2 : n === "right" ? t.width : n, a = r === "top" ? 0 : r === "bottom" ? t.height : r;
    return Ao({
      x: o,
      y: a
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: r,
      align: n
    } = e, o = r === "left" ? 0 : r === "right" ? t.width : r, a = n === "top" ? 0 : n === "center" ? t.height / 2 : n === "bottom" ? t.height : n;
    return Ao({
      x: o,
      y: a
    }, t);
  }
  return Ao({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Ll = {
  static: Tp,
  // specific viewport position, usually centered
  connected: Mp
  // connected to a certain element
}, yp = He({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Ll
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function xp(e, t) {
  const r = Me({}), n = Me();
  fe && Wn(() => !!(t.isActive.value && e.locationStrategy), (a) => {
    var s, i;
    me(() => e.locationStrategy, a), Xe(() => {
      window.removeEventListener("resize", o), n.value = void 0;
    }), window.addEventListener("resize", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? n.value = (s = e.locationStrategy(t, e, r)) == null ? void 0 : s.updateLocation : n.value = (i = Ll[e.locationStrategy](t, e, r)) == null ? void 0 : i.updateLocation;
  });
  function o(a) {
    var s;
    (s = n.value) == null || s.call(n, a);
  }
  return {
    contentStyles: r,
    updateLocation: n
  };
}
function Tp() {
}
function Sp(e, t) {
  const r = nm(e);
  return t ? r.x += parseFloat(e.style.right || 0) : r.x -= parseFloat(e.style.left || 0), r.y -= parseFloat(e.style.top || 0), r;
}
function Mp(e, t, r) {
  (Array.isArray(e.target.value) || Um(e.target.value)) && Object.assign(r.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: o,
    preferredOrigin: a
  } = Jc(() => {
    const C = Os(t.location, e.isRtl.value), p = t.origin === "overlap" ? C : t.origin === "auto" ? go(C) : Os(t.origin, e.isRtl.value);
    return C.side === p.side && C.align === fo(p).align ? {
      preferredAnchor: Rs(C),
      preferredOrigin: Rs(p)
    } : {
      preferredAnchor: C,
      preferredOrigin: p
    };
  }), [s, i, c, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((C) => X(() => {
    const p = parseFloat(t[C]);
    return isNaN(p) ? 1 / 0 : p;
  })), l = X(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const C = t.offset.split(" ").map(parseFloat);
      return C.length < 2 && C.push(0), C;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let g = !1;
  const m = new ResizeObserver(() => {
    g && I();
  });
  me([e.target, e.contentEl], (C, p) => {
    let [L, B] = C, [V, _] = p;
    V && !Array.isArray(V) && m.unobserve(V), L && !Array.isArray(L) && m.observe(L), _ && m.unobserve(_), B && m.observe(B);
  }, {
    immediate: !0
  }), Xe(() => {
    m.disconnect();
  });
  function I() {
    if (g = !1, requestAnimationFrame(() => g = !0), !e.target.value || !e.contentEl.value)
      return;
    const C = rm(e.target.value), p = Sp(e.contentEl.value, e.isRtl.value), L = Tn(e.contentEl.value), B = 12;
    L.length || (L.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (p.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), p.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const V = L.reduce((y, v) => {
      const D = v.getBoundingClientRect(), k = new Zt({
        x: v === document.documentElement ? 0 : D.x,
        y: v === document.documentElement ? 0 : D.y,
        width: v.clientWidth,
        height: v.clientHeight
      });
      return y ? new Zt({
        x: Math.max(y.left, k.left),
        y: Math.max(y.top, k.top),
        width: Math.min(y.right, k.right) - Math.max(y.left, k.left),
        height: Math.min(y.bottom, k.bottom) - Math.max(y.top, k.top)
      }) : k;
    }, void 0);
    V.x += B, V.y += B, V.width -= B * 2, V.height -= B * 2;
    let _ = {
      anchor: o.value,
      origin: a.value
    };
    function q(y) {
      const v = new Zt(p), D = li(y.anchor, C), k = li(y.origin, v);
      let {
        x: j,
        y: H
      } = vp(D, k);
      switch (y.anchor.side) {
        case "top":
          H -= l.value[0];
          break;
        case "bottom":
          H += l.value[0];
          break;
        case "left":
          j -= l.value[0];
          break;
        case "right":
          j += l.value[0];
          break;
      }
      switch (y.anchor.align) {
        case "top":
          H -= l.value[1];
          break;
        case "bottom":
          H += l.value[1];
          break;
        case "left":
          j -= l.value[1];
          break;
        case "right":
          j += l.value[1];
          break;
      }
      return v.x += j, v.y += H, v.width = Math.min(v.width, c.value), v.height = Math.min(v.height, u.value), {
        overflows: Us(v, V),
        x: j,
        y: H
      };
    }
    let G = 0, F = 0;
    const W = {
      x: 0,
      y: 0
    }, A = {
      x: !1,
      y: !1
    };
    let h = -1;
    for (; !(h++ > 10); ) {
      const {
        x: y,
        y: v,
        overflows: D
      } = q(_);
      G += y, F += v, p.x += y, p.y += v;
      {
        const k = ks(_.anchor), j = D.x.before || D.x.after, H = D.y.before || D.y.after;
        let R = !1;
        if (["x", "y"].forEach((Z) => {
          if (Z === "x" && j && !A.x || Z === "y" && H && !A.y) {
            const ie = {
              anchor: {
                ..._.anchor
              },
              origin: {
                ..._.origin
              }
            }, te = Z === "x" ? k === "y" ? fo : go : k === "y" ? go : fo;
            ie.anchor = te(ie.anchor), ie.origin = te(ie.origin);
            const {
              overflows: ge
            } = q(ie);
            (ge[Z].before <= D[Z].before && ge[Z].after <= D[Z].after || ge[Z].before + ge[Z].after < (D[Z].before + D[Z].after) / 2) && (_ = ie, R = A[Z] = !0);
          }
        }), R)
          continue;
      }
      D.x.before && (G += D.x.before, p.x += D.x.before), D.x.after && (G -= D.x.after, p.x -= D.x.after), D.y.before && (F += D.y.before, p.y += D.y.before), D.y.after && (F -= D.y.after, p.y -= D.y.after);
      {
        const k = Us(p, V);
        W.x = V.width - k.x.before - k.x.after, W.y = V.height - k.y.before - k.y.after, G += k.x.before, p.x += k.x.before, F += k.y.before, p.y += k.y.before;
      }
      break;
    }
    const x = ks(_.anchor);
    return Object.assign(r.value, {
      "--v-overlay-anchor-origin": `${_.anchor.side} ${_.anchor.align}`,
      transformOrigin: `${_.origin.side} ${_.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: Te(po(F)),
      left: e.isRtl.value ? void 0 : Te(po(G)),
      right: e.isRtl.value ? Te(po(-G)) : void 0,
      minWidth: Te(x === "y" ? Math.min(s.value, C.width) : s.value),
      maxWidth: Te(ui(Bo(W.x, s.value === 1 / 0 ? 0 : s.value, c.value))),
      maxHeight: Te(ui(Bo(W.y, i.value === 1 / 0 ? 0 : i.value, u.value)))
    }), {
      available: W,
      contentBox: p
    };
  }
  return me(() => [o.value, a.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => I()), ir(() => {
    const C = I();
    if (!C)
      return;
    const {
      available: p,
      contentBox: L
    } = C;
    L.height > p.y && requestAnimationFrame(() => {
      I(), requestAnimationFrame(() => {
        I();
      });
    });
  }), {
    updateLocation: I
  };
}
function po(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function ui(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let qo = !0;
const wn = [];
function Ep(e) {
  !qo || wn.length ? (wn.push(e), Go()) : (qo = !1, e(), Go());
}
let gi = -1;
function Go() {
  cancelAnimationFrame(gi), gi = requestAnimationFrame(() => {
    const e = wn.shift();
    e && e(), wn.length ? Go() : qo = !0;
  });
}
const gn = {
  none: null,
  close: jp,
  block: Dp,
  reposition: Np
}, wp = He({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in gn
  }
}, "VOverlay-scroll-strategies");
function Lp(e, t) {
  if (!fe)
    return;
  let r;
  Gt(async () => {
    r == null || r.stop(), t.isActive.value && e.scrollStrategy && (r = ia(), await new Promise((n) => setTimeout(n)), r.active && r.run(() => {
      var n;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, r) : (n = gn[e.scrollStrategy]) == null || n.call(gn, t, e, r);
    }));
  }), Xe(() => {
    r == null || r.stop();
  });
}
function jp(e) {
  function t(r) {
    e.isActive.value = !1;
  }
  jl(e.targetEl.value ?? e.contentEl.value, t);
}
function Dp(e, t) {
  var s;
  const r = (s = e.root.value) == null ? void 0 : s.offsetParent, n = [.../* @__PURE__ */ new Set([...Tn(e.targetEl.value, t.contained ? r : void 0), ...Tn(e.contentEl.value, t.contained ? r : void 0)])].filter((i) => !i.classList.contains("v-overlay-scroll-blocked")), o = window.innerWidth - document.documentElement.offsetWidth, a = ((i) => Oa(i) && i)(r || document.documentElement);
  a && e.root.value.classList.add("v-overlay--scroll-blocked"), n.forEach((i, c) => {
    i.style.setProperty("--v-body-scroll-x", Te(-i.scrollLeft)), i.style.setProperty("--v-body-scroll-y", Te(-i.scrollTop)), i !== document.documentElement && i.style.setProperty("--v-scrollbar-offset", Te(o)), i.classList.add("v-overlay-scroll-blocked");
  }), Xe(() => {
    n.forEach((i, c) => {
      const u = parseFloat(i.style.getPropertyValue("--v-body-scroll-x")), l = parseFloat(i.style.getPropertyValue("--v-body-scroll-y")), g = i.style.scrollBehavior;
      i.style.scrollBehavior = "auto", i.style.removeProperty("--v-body-scroll-x"), i.style.removeProperty("--v-body-scroll-y"), i.style.removeProperty("--v-scrollbar-offset"), i.classList.remove("v-overlay-scroll-blocked"), i.scrollLeft = -u, i.scrollTop = -l, i.style.scrollBehavior = g;
    }), a && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Np(e, t, r) {
  let n = !1, o = -1, a = -1;
  function s(i) {
    Ep(() => {
      var l, g;
      const c = performance.now();
      (g = (l = e.updateLocation).value) == null || g.call(l, i), n = (performance.now() - c) / (1e3 / 60) > 2;
    });
  }
  a = (typeof requestIdleCallback > "u" ? (i) => i() : requestIdleCallback)(() => {
    r.run(() => {
      jl(e.targetEl.value ?? e.contentEl.value, (i) => {
        n ? (cancelAnimationFrame(o), o = requestAnimationFrame(() => {
          o = requestAnimationFrame(() => {
            s(i);
          });
        })) : s(i);
      });
    });
  }), Xe(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(a), cancelAnimationFrame(o);
  });
}
function jl(e, t) {
  const r = [document, ...Tn(e)];
  r.forEach((n) => {
    n.addEventListener("scroll", t, {
      passive: !0
    });
  }), Xe(() => {
    r.forEach((n) => {
      n.removeEventListener("scroll", t);
    });
  });
}
const Op = Symbol.for("vuetify:v-menu"), Pp = He({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Rp(e, t) {
  let r = () => {
  };
  function n(s) {
    r == null || r();
    const i = Number(s ? e.openDelay : e.closeDelay);
    return new Promise((c) => {
      r = em(i, () => {
        t == null || t(s), c(s);
      });
    });
  }
  function o() {
    return n(!0);
  }
  function a() {
    return n(!1);
  }
  return {
    clearDelay: r,
    runOpenDelay: o,
    runCloseDelay: a
  };
}
const kp = He({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...Pp()
}, "VOverlay-activator");
function Up(e, t) {
  let {
    isActive: r,
    isTop: n,
    contentEl: o
  } = t;
  const a = qe("useActivator"), s = Me();
  let i = !1, c = !1, u = !0;
  const l = X(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), g = X(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !l.value), {
    runOpenDelay: m,
    runCloseDelay: I
  } = Rp(e, (A) => {
    A === (e.openOnHover && i || l.value && c) && !(e.openOnHover && r.value && !n.value) && (r.value !== A && (u = !0), r.value = A);
  }), C = Me(), p = {
    onClick: (A) => {
      A.stopPropagation(), s.value = A.currentTarget || A.target, r.value || (C.value = [A.clientX, A.clientY]), r.value = !r.value;
    },
    onMouseenter: (A) => {
      var h;
      (h = A.sourceCapabilities) != null && h.firesTouchEvents || (i = !0, s.value = A.currentTarget || A.target, m());
    },
    onMouseleave: (A) => {
      i = !1, I();
    },
    onFocus: (A) => {
      Kf(A.target, ":focus-visible") !== !1 && (c = !0, A.stopPropagation(), s.value = A.currentTarget || A.target, m());
    },
    onBlur: (A) => {
      c = !1, A.stopPropagation(), I();
    }
  }, L = X(() => {
    const A = {};
    return g.value && (A.onClick = p.onClick), e.openOnHover && (A.onMouseenter = p.onMouseenter, A.onMouseleave = p.onMouseleave), l.value && (A.onFocus = p.onFocus, A.onBlur = p.onBlur), A;
  }), B = X(() => {
    const A = {};
    if (e.openOnHover && (A.onMouseenter = () => {
      i = !0, m();
    }, A.onMouseleave = () => {
      i = !1, I();
    }), l.value && (A.onFocusin = () => {
      c = !0, m();
    }, A.onFocusout = () => {
      c = !1, I();
    }), e.closeOnContentClick) {
      const h = at(Op, null);
      A.onClick = () => {
        r.value = !1, h == null || h.closeParents();
      };
    }
    return A;
  }), V = X(() => {
    const A = {};
    return e.openOnHover && (A.onMouseenter = () => {
      u && (i = !0, u = !1, m());
    }, A.onMouseleave = () => {
      i = !1, I();
    }), A;
  });
  me(n, (A) => {
    var h;
    A && (e.openOnHover && !i && (!l.value || !c) || l.value && !c && (!e.openOnHover || !i)) && !((h = o.value) != null && h.contains(document.activeElement)) && (r.value = !1);
  }), me(r, (A) => {
    A || setTimeout(() => {
      C.value = void 0;
    });
  }, {
    flush: "post"
  });
  const _ = Ns();
  Gt(() => {
    _.value && ir(() => {
      s.value = _.el;
    });
  });
  const q = Ns(), G = X(() => e.target === "cursor" && C.value ? C.value : q.value ? q.el : Dl(e.target, a) || s.value), F = X(() => Array.isArray(G.value) ? void 0 : G.value);
  let W;
  return me(() => !!e.activator, (A) => {
    A && fe ? (W = ia(), W.run(() => {
      _p(e, a, {
        activatorEl: s,
        activatorEvents: L
      });
    })) : W && W.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Xe(() => {
    W == null || W.stop();
  }), {
    activatorEl: s,
    activatorRef: _,
    target: G,
    targetEl: F,
    targetRef: q,
    activatorEvents: L,
    contentEvents: B,
    scrimEvents: V
  };
}
function _p(e, t, r) {
  let {
    activatorEl: n,
    activatorEvents: o
  } = r;
  me(() => e.activator, (c, u) => {
    if (u && c !== u) {
      const l = i(u);
      l && s(l);
    }
    c && ir(() => a());
  }, {
    immediate: !0
  }), me(() => e.activatorProps, () => {
    a();
  }), Xe(() => {
    s();
  });
  function a() {
    let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : i(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    c && am(c, Ve(o.value, u));
  }
  function s() {
    let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : i(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    c && sm(c, Ve(o.value, u));
  }
  function i() {
    let c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Dl(c, t);
    return n.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, n.value;
  }
}
function Dl(e, t) {
  var n, o;
  if (!e)
    return;
  let r;
  if (e === "parent") {
    let a = (o = (n = t == null ? void 0 : t.proxy) == null ? void 0 : n.$el) == null ? void 0 : o.parentNode;
    for (; a != null && a.hasAttribute("data-no-activator"); )
      a = a.parentNode;
    r = a;
  } else
    typeof e == "string" ? r = document.querySelector(e) : "$el" in e ? r = e.$el : r = e;
  return r;
}
function Fp(e) {
  return Jc(() => {
    const t = [], r = {};
    if (e.value.background)
      if (zo(e.value.background)) {
        if (r.backgroundColor = e.value.background, !e.value.text && bm(e.value.background)) {
          const n = ot(e.value.background);
          if (n.a == null || n.a === 1) {
            const o = el(n);
            r.color = o, r.caretColor = o;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (zo(e.value.text) ? (r.color = e.value.text, r.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: r
    };
  });
}
function Bp(e, t) {
  const r = X(() => ({
    background: ye(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: n,
    colorStyles: o
  } = Fp(r);
  return {
    backgroundColorClasses: n,
    backgroundColorStyles: o
  };
}
const Vp = He({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function zp(e) {
  return {
    dimensionStyles: X(() => {
      const r = {}, n = Te(e.height), o = Te(e.maxHeight), a = Te(e.maxWidth), s = Te(e.minHeight), i = Te(e.minWidth), c = Te(e.width);
      return n != null && (r.height = n), o != null && (r.maxHeight = o), a != null && (r.maxWidth = a), s != null && (r.minHeight = s), i != null && (r.minWidth = i), c != null && (r.width = c), r;
    })
  };
}
function Hp() {
  if (!fe)
    return ze(!1);
  const {
    ssr: e
  } = PA();
  if (e) {
    const t = ze(!1);
    return ba(() => {
      t.value = !0;
    }), t;
  } else
    return ze(!0);
}
const Zp = He({
  eager: Boolean
}, "lazy");
function Yp(e, t) {
  const r = ze(!1), n = X(() => r.value || e.eager || t.value);
  me(t, () => r.value = !0);
  function o() {
    e.eager || (r.value = !1);
  }
  return {
    isBooted: r,
    hasContent: n,
    onAfterLeave: o
  };
}
function Wp() {
  var e, t;
  return (t = (e = qe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
let Io = !1;
function Jp(e, t) {
  let r = !1, n, o;
  fe && (ir(() => {
    window.addEventListener("popstate", a), n = e == null ? void 0 : e.beforeEach((s, i, c) => {
      Io ? r ? t(c) : c() : setTimeout(() => r ? t(c) : c()), Io = !0;
    }), o = e == null ? void 0 : e.afterEach(() => {
      Io = !1;
    });
  }), Xe(() => {
    window.removeEventListener("popstate", a), n == null || n(), o == null || o();
  }));
  function a(s) {
    var i;
    (i = s.state) != null && i.replaced || (r = !0, setTimeout(() => r = !1));
  }
}
function Nl() {
  const t = qe("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const di = Symbol.for("vuetify:stack"), hr = ft([]);
function qp(e, t, r) {
  const n = qe("useStack"), o = !r, a = at(di, void 0), s = ft({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Fn(di, s);
  const i = ze(+t.value);
  Wn(e, () => {
    var g;
    const l = (g = hr.at(-1)) == null ? void 0 : g[1];
    i.value = l ? l + 10 : +t.value, o && hr.push([n.uid, i.value]), a == null || a.activeChildren.add(n.uid), Xe(() => {
      if (o) {
        const m = ee(hr).findIndex((I) => I[0] === n.uid);
        hr.splice(m, 1);
      }
      a == null || a.activeChildren.delete(n.uid);
    });
  });
  const c = ze(!0);
  o && Gt(() => {
    var g;
    const l = ((g = hr.at(-1)) == null ? void 0 : g[0]) === n.uid;
    setTimeout(() => c.value = l);
  });
  const u = X(() => !s.activeChildren.size);
  return {
    globalTop: fa(c),
    localTop: u,
    stackStyles: X(() => ({
      zIndex: i.value
    }))
  };
}
function Gp(e) {
  return {
    teleportTarget: X(() => {
      const r = e();
      if (r === !0 || !fe)
        return;
      const n = r === !1 ? document.body : typeof r == "string" ? document.querySelector(r) : r;
      if (n == null)
        return;
      let o = [...n.children].find((a) => a.matches(".v-overlay-container"));
      return o || (o = document.createElement("div"), o.className = "v-overlay-container", n.appendChild(o)), o;
    })
  };
}
const Qp = He({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), $p = (e, t) => {
  let {
    slots: r
  } = t;
  const {
    transition: n,
    disabled: o,
    group: a,
    ...s
  } = e, {
    component: i = a ? sf : Zn,
    ...c
  } = typeof n == "object" ? n : {};
  return Hn(i, Ve(typeof n == "string" ? {
    name: o ? "" : n
  } : c, typeof n == "string" ? {} : Object.fromEntries(Object.entries({
    disabled: o,
    group: a
  }).filter((u) => {
    let [l, g] = u;
    return g !== void 0;
  })), s), r);
};
function Xp(e) {
  const {
    modelValue: t,
    color: r,
    ...n
  } = e;
  return ae(Zn, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && ae("div", Ve({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, n), null)]
  });
}
const Ol = He({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...kp(),
  ...wm(),
  ...Vp(),
  ...Zp(),
  ...yp(),
  ...wp(),
  ...HA(),
  ...Qp()
}, "VOverlay"), fi = Na()({
  name: "VOverlay",
  directives: {
    ClickOutside: pl
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Ol()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: r,
      attrs: n,
      emit: o
    } = t;
    const a = qe("VOverlay"), s = Me(), i = Me(), c = Me(), u = Pa(e, "modelValue"), l = X({
      get: () => u.value,
      set: (ne) => {
        ne && e.disabled || (u.value = ne);
      }
    }), {
      themeClasses: g
    } = WA(e), {
      rtlClasses: m,
      isRtl: I
    } = Zm(), {
      hasContent: C,
      onAfterLeave: p
    } = Yp(e, l), L = Bp(X(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: B,
      localTop: V,
      stackStyles: _
    } = qp(l, fg(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: q,
      activatorRef: G,
      target: F,
      targetEl: W,
      targetRef: A,
      activatorEvents: h,
      contentEvents: x,
      scrimEvents: y
    } = Up(e, {
      isActive: l,
      isTop: V,
      contentEl: c
    }), {
      teleportTarget: v
    } = Gp(() => {
      var st, cr, it;
      const ne = e.attach || e.contained;
      if (ne)
        return ne;
      const be = ((st = q == null ? void 0 : q.value) == null ? void 0 : st.getRootNode()) || ((it = (cr = a.proxy) == null ? void 0 : cr.$el) == null ? void 0 : it.getRootNode());
      return be instanceof ShadowRoot ? be : !1;
    }), {
      dimensionStyles: D
    } = zp(e), k = Hp(), {
      scopeId: j
    } = Nl();
    me(() => e.disabled, (ne) => {
      ne && (l.value = !1);
    });
    const {
      contentStyles: H,
      updateLocation: R
    } = xp(e, {
      isRtl: I,
      contentEl: c,
      target: F,
      isActive: l
    });
    Lp(e, {
      root: s,
      contentEl: c,
      targetEl: W,
      isActive: l,
      updateLocation: R
    });
    function Z(ne) {
      o("click:outside", ne), e.persistent ? Ot() : l.value = !1;
    }
    function ie(ne) {
      return l.value && B.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || ne.target === i.value || ne instanceof MouseEvent && ne.shadowTarget === i.value);
    }
    fe && me(l, (ne) => {
      ne ? window.addEventListener("keydown", te) : window.removeEventListener("keydown", te);
    }, {
      immediate: !0
    }), va(() => {
      fe && window.removeEventListener("keydown", te);
    });
    function te(ne) {
      var be, st;
      ne.key === "Escape" && B.value && (e.persistent ? Ot() : (l.value = !1, (be = c.value) != null && be.contains(document.activeElement) && ((st = q.value) == null || st.focus())));
    }
    const ge = Wp();
    Wn(() => e.closeOnBack, () => {
      Jp(ge, (ne) => {
        B.value && l.value ? (ne(!1), e.persistent ? Ot() : l.value = !1) : ne();
      });
    });
    const Pe = Me();
    me(() => l.value && (e.absolute || e.contained) && v.value == null, (ne) => {
      if (ne) {
        const be = Rm(s.value);
        be && be !== document.scrollingElement && (Pe.value = be.scrollTop);
      }
    });
    function Ot() {
      e.noClickAnimation || c.value && om(c.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Pm
      });
    }
    function Gn() {
      o("afterEnter");
    }
    function Qn() {
      p(), o("afterLeave");
    }
    return ol(() => {
      var ne;
      return ae(Fe, null, [(ne = r.activator) == null ? void 0 : ne.call(r, {
        isActive: l.value,
        targetRef: A,
        props: Ve({
          ref: G
        }, h.value, e.activatorProps)
      }), k.value && C.value && ae(sd, {
        disabled: !v.value,
        to: v.value
      }, {
        default: () => [ae("div", Ve({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": l.value,
            "v-overlay--contained": e.contained
          }, g.value, m.value, e.class],
          style: [_.value, {
            "--v-overlay-opacity": e.opacity,
            top: Te(Pe.value)
          }, e.style],
          ref: s
        }, j, n), [ae(Xp, Ve({
          color: L,
          modelValue: l.value && !!e.scrim,
          ref: i
        }, y.value), null), ae($p, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: F.value,
          onAfterEnter: Gn,
          onAfterLeave: Qn
        }, {
          default: () => {
            var be;
            return [Mg(ae("div", Ve({
              ref: c,
              class: ["v-overlay__content", e.contentClass],
              style: [D.value, H.value]
            }, x.value, e.contentProps), [(be = r.default) == null ? void 0 : be.call(r, {
              isActive: l
            })]), [[Hd, l.value], [zg("click-outside"), {
              handler: Z,
              closeConditional: ie,
              include: () => [q.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: q,
      scrimEl: i,
      target: F,
      animateClick: Ot,
      contentEl: c,
      globalTop: B,
      localTop: V,
      updateLocation: R
    };
  }
}), ho = Symbol("Forwarded refs");
function Co(e, t) {
  let r = e;
  for (; r; ) {
    const n = Reflect.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Object.getPrototypeOf(r);
  }
}
function Kp(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e[ho] = r, new Proxy(e, {
    get(o, a) {
      if (Reflect.has(o, a))
        return Reflect.get(o, a);
      if (!(typeof a == "symbol" || a.startsWith("$") || a.startsWith("__"))) {
        for (const s of r)
          if (s.value && Reflect.has(s.value, a)) {
            const i = Reflect.get(s.value, a);
            return typeof i == "function" ? i.bind(s.value) : i;
          }
      }
    },
    has(o, a) {
      if (Reflect.has(o, a))
        return !0;
      if (typeof a == "symbol" || a.startsWith("$") || a.startsWith("__"))
        return !1;
      for (const s of r)
        if (s.value && Reflect.has(s.value, a))
          return !0;
      return !1;
    },
    set(o, a, s) {
      if (Reflect.has(o, a))
        return Reflect.set(o, a, s);
      if (typeof a == "symbol" || a.startsWith("$") || a.startsWith("__"))
        return !1;
      for (const i of r)
        if (i.value && Reflect.has(i.value, a))
          return Reflect.set(i.value, a, s);
      return !1;
    },
    getOwnPropertyDescriptor(o, a) {
      var i;
      const s = Reflect.getOwnPropertyDescriptor(o, a);
      if (s)
        return s;
      if (!(typeof a == "symbol" || a.startsWith("$") || a.startsWith("__"))) {
        for (const c of r) {
          if (!c.value)
            continue;
          const u = Co(c.value, a) ?? ("_" in c.value ? Co((i = c.value._) == null ? void 0 : i.setupState, a) : void 0);
          if (u)
            return u;
        }
        for (const c of r) {
          const u = c.value && c.value[ho];
          if (!u)
            continue;
          const l = u.slice();
          for (; l.length; ) {
            const g = l.shift(), m = Co(g.value, a);
            if (m)
              return m;
            const I = g.value && g.value[ho];
            I && l.push(...I);
          }
        }
      }
    }
  });
}
const eI = He({
  id: String,
  text: String,
  ...Qf(Ol({
    closeOnBack: !1,
    location: "end",
    locationStrategy: "connected",
    eager: !0,
    minWidth: 0,
    offset: 10,
    openOnClick: !1,
    openOnHover: !0,
    origin: "auto",
    scrim: !1,
    scrollStrategy: "reposition",
    transition: !1
  }), ["absolute", "persistent"])
}, "VTooltip"), tI = Na()({
  name: "VTooltip",
  props: eI(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: r
    } = t;
    const n = Pa(e, "modelValue"), {
      scopeId: o
    } = Nl(), a = Da(), s = X(() => e.id || `v-tooltip-${a}`), i = Me(), c = X(() => e.location.split(" ").length > 1 ? e.location : e.location + " center"), u = X(() => e.origin === "auto" || e.origin === "overlap" || e.origin.split(" ").length > 1 || e.location.split(" ").length > 1 ? e.origin : e.origin + " center"), l = X(() => e.transition ? e.transition : n.value ? "scale-transition" : "fade-transition"), g = X(() => Ve({
      "aria-describedby": s.value
    }, e.activatorProps));
    return ol(() => {
      const m = fi.filterProps(e);
      return ae(fi, Ve({
        ref: i,
        class: ["v-tooltip", e.class],
        style: e.style,
        id: s.value
      }, m, {
        modelValue: n.value,
        "onUpdate:modelValue": (I) => n.value = I,
        transition: l.value,
        absolute: !0,
        location: c.value,
        origin: u.value,
        persistent: !0,
        role: "tooltip",
        activatorProps: g.value,
        _disableGlobalStack: !0
      }, o), {
        activator: r.activator,
        default: function() {
          var L;
          for (var I = arguments.length, C = new Array(I), p = 0; p < I; p++)
            C[p] = arguments[p];
          return ((L = r.default) == null ? void 0 : L.call(r, ...C)) ?? e.text;
        }
      });
    }), Kp({}, i);
  }
});
function rI(e, t) {
  const r = typeof e == "string" ? Bg(e) : e, n = nI(r, t);
  return {
    mounted: n,
    updated: n,
    unmounted(o) {
      Uc(null, o);
    }
  };
}
function nI(e, t) {
  return function(r, n, o) {
    var g, m, I;
    const a = typeof t == "function" ? t(n) : t, s = ((g = n.value) == null ? void 0 : g.text) ?? n.value ?? (a == null ? void 0 : a.text), i = yn(n.value) ? n.value : {}, c = () => s ?? r.innerHTML, u = (o.ctx === n.instance.$ ? (m = oI(o, n.instance.$)) == null ? void 0 : m.provides : (I = o.ctx) == null ? void 0 : I.provides) ?? n.instance.$.provides, l = Hn(e, Ve(a, i), c);
    l.appContext = Object.assign(/* @__PURE__ */ Object.create(null), n.instance.$.appContext, {
      provides: u
    }), Uc(l, r);
  };
}
function oI(e, t) {
  const r = /* @__PURE__ */ new Set(), n = (a) => {
    var s, i;
    for (const c of a) {
      if (!c)
        continue;
      if (c === e)
        return !0;
      r.add(c);
      let u;
      if (c.suspense ? u = n([c.ssContent]) : Array.isArray(c.children) ? u = n(c.children) : (s = c.component) != null && s.vnode && (u = n([(i = c.component) == null ? void 0 : i.subTree])), u)
        return u;
      r.delete(c);
    }
    return !1;
  };
  if (!n([t.subTree]))
    throw new Error("Could not find original vnode");
  const o = Array.from(r).reverse();
  for (const a of o)
    if (a.component)
      return a.component;
  return t;
}
const aI = rI(tI, (e) => {
  var t;
  return {
    activator: "parent",
    location: ((t = e.arg) == null ? void 0 : t.replace("-", " ")) ?? "top",
    text: typeof e.value == "boolean" ? void 0 : e.value
  };
}), sI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClickOutside: pl,
  Intersect: KA,
  Mutate: tp,
  Resize: op,
  Ripple: up,
  Scroll: dp,
  Tooltip: aI,
  Touch: bp
}, Symbol.toStringTag, { value: "Module" }));
const iI = {
  dark: !1,
  colors: {
    windowBackground: "#FAFAFA",
    windowBorder: "#E5E5E5",
    windowConfig: "#9F9FA9",
    extensionActivatedBackground: "#D7EDF5",
    extensionActivatedBorder: "#D7EDF5",
    extensionActivatedIconBackground: "#85C3DB",
    extensionActivatedIconColor: "#428FAD",
    extensionActivatedTitle: "#3B3B3B",
    extensionActivatedSubtitle: "#838D96",
    extensionActivatedSwitch: "#ED815F",
    radioBackground: "#FFFFFF",
    radioBorder: "#ECECEC",
    radioFont: "#858585",
    radioIcon: "#858585",
    radioItem: "#FFFFFF",
    radioItemBorder: "#858585",
    radioItemText: "#858585",
    radioItemSelected: "#F5B6A2",
    radioItemSelectedText: "#3B3B3B",
    footerFont: "#A0A0A0",
    footerFontVersion: "#D5D5D5",
    bannerBg: "#FAFAFA",
    sidebarBg: "#D7EDF5",
    sidebarTextColor: "#3B3B3B",
    titleColor: "#123F50",
    subtitleColor: "#344054",
    actionBtnColor: "#428FAD",
    actionBtnHover: "#CBD5E0"
  }
}, cI = {
  dark: !1,
  colors: {
    windowBackground: "#F1F1F2",
    windowBorder: "#E5E5E5",
    windowConfig: "#9F9FA9",
    extensionActivatedBackground: "#525658",
    extensionActivatedBorder: "#525658",
    extensionActivatedIconBackground: "#7C7C7C",
    extensionActivatedIconColor: "#F1F1F2",
    extensionActivatedTitle: "#FFFFFF",
    extensionActivatedSubtitle: "#E2E2E2",
    extensionActivatedSwitch: "#20799B",
    radioBackground: "#E6E6E6",
    radioBorder: "#DCDCDC",
    radioFont: "#858585",
    radioIcon: "#858585",
    radioItem: "#FFFFFF",
    radioItemBorder: "#858585",
    radioItemText: "#858585",
    radioItemSelected: "#20799B",
    radioItemSelectedText: "#FFFFFF",
    footerFont: "#A0A0A0",
    footerFontVersion: "#D5D5D5",
    bannerBg: "#E6E6E6",
    sidebarBg: "#F1F1F2",
    sidebarTextColor: "#666666",
    titleColor: "#123F50",
    subtitleColor: "#344054",
    actionBtnColor: "#123F50",
    actionBtnHover: "#CBD5E0"
  }
}, lI = {
  dark: !1,
  colors: {
    windowBackground: "#525658",
    windowBorder: "#E5E5E5",
    windowConfig: "#9F9FA9",
    extensionActivatedBackground: "#20799B",
    extensionActivatedBorder: "#20799B",
    extensionActivatedIconBackground: "#85C3DB",
    extensionActivatedIconColor: "#16607D",
    extensionActivatedTitle: "#FFFFFF",
    extensionActivatedSubtitle: "#DEDEDE",
    extensionActivatedSwitch: "#ED815F",
    radioBackground: "#424648",
    radioBorder: "#5B5F61",
    radioFont: "#DEDEDE",
    radioIcon: "#DEDEDE",
    radioItem: "#424648",
    radioItemBorder: "#E0E0E0",
    radioItemText: "#E0E0E0",
    radioItemSelected: "#F5B6A2",
    radioItemSelectedText: "#3B3B3B",
    footerFont: "#A0A0A0",
    footerFontVersion: "#D5D5D5",
    bannerBg: "#525658",
    sidebarBg: "#424648",
    sidebarTextColor: "#DEDEDE",
    titleColor: "#DEDEDE",
    subtitleColor: "#DEDEDE",
    actionBtnColor: "#DEDEDE",
    actionBtnHover: "#1D94C1"
  }
};
fl({
  directives: sI,
  icons: {
    defaultSet: "mdi",
    aliases: qA,
    sets: {
      mdi: GA
    }
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: iI,
      dark: cI,
      highContrast: lI
    }
  }
});
async function uI(e, t) {
  return await (await fetch(e, t)).text();
}
async function gI(e) {
  const t = e.args;
  if (!t)
    return { erro: "Não foi possível obter os argumentos da requisição" };
  if (!t.url)
    return { erro: "Não foi possível obter a url da requisição" };
  if (!t.init)
    return { erro: "Não foi possível obter o init da requisição" };
  const r = await yr({ ...e, args: { frame: "/pje/" } });
  return r ? await E.scripting.executeScript({
    target: { tabId: e.senderTab, frameIds: [r.frameId] },
    func: uI,
    args: [t.url, t.init],
    world: "ISOLATED"
  }) : { erro: "Não possível obter o frame do PJE" };
}
async function dI(e) {
  const t = e.args;
  if (!t)
    return { erro: "Não foi possível obter os argumentos da requisição" };
  if (!t.frame)
    return { erro: "Não foi possível obter o frame da requisição" };
  if (!t.evento)
    return { erro: "Não foi possível obter o evento da requisição" };
  const r = await yr(e);
  return r ? await E.scripting.executeScript({
    target: { tabId: e.senderTab, frameIds: [r.frameId] },
    func: (n, o) => {
      document.dispatchEvent(new CustomEvent(n, { detail: { ...o } }));
    },
    args: [t.evento, t.detail || {}],
    world: "ISOLATED"
  }) : { erro: `Não possível obter o frame: ${t.frame}` };
}
async function fI(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: () => {
      if ("CKEDITOR" in window) {
        const r = window;
        return r.CKEDITOR.instances[Object.getOwnPropertyNames(r.CKEDITOR.instances)[0]].getData();
      } else if (window.wrappedJSObject) {
        const r = window;
        return r.wrappedJSObject.CKEDITOR.instances[Object.getOwnPropertyNames(r.wrappedJSObject.CKEDITOR.instances)[0]].getData();
      }
      return "";
    },
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function mI(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: (r) => {
      if ("CKEDITOR" in window) {
        const n = window;
        n.CKEDITOR.instances[Object.getOwnPropertyNames(n.CKEDITOR.instances)[0]].setData(r);
      } else if (window.wrappedJSObject) {
        const n = window;
        n.wrappedJSObject.CKEDITOR.instances[Object.getOwnPropertyNames(n.wrappedJSObject.CKEDITOR.instances)[0]].setData(r);
      }
    },
    args: [e.args],
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function AI(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: () => {
      let r, n = !1;
      const o = () => {
        setTimeout(() => {
          var s;
          const a = document.querySelector("iframe.cke_wysiwyg_frame");
          r = (s = a == null ? void 0 : a.contentDocument) == null ? void 0 : s.body, r && (n ? n && r.getAttribute("pmr-ckeditor-init") !== "true" && (r.setAttribute("pmr-ckeditor-init", "true"), window.dispatchEvent(new CustomEvent("PJMR:CKEDITOR_RESET"))) : (n = !0, r.setAttribute("pmr-ckeditor-init", "true"), window.dispatchEvent(new CustomEvent("PJMR:CKEDITOR_READY")))), o();
        }, 1e3);
      };
      if ("CKEDITOR" in window) {
        const a = () => {
          setTimeout(() => {
            const s = window, i = Object.getOwnPropertyNames(s.CKEDITOR.instances)[0], c = s.CKEDITOR.instances[i].status;
            c !== "ready" && a(), c === "ready" && o();
          }, 100);
        };
        a();
      } else if (window.wrappedJSObject) {
        const a = () => {
          setTimeout(() => {
            const s = window, i = Object.getOwnPropertyNames(
              s.wrappedJSObject.CKEDITOR.instances
            )[0], c = s.wrappedJSObject.CKEDITOR.instances[i].status;
            c !== "ready" && a(), c === "ready" && o();
          }, 100);
        };
        a();
      }
    },
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function pI(e) {
  return e.isFirefox ? await E.storage.local.get() : await chrome.storage.local.get();
}
async function II(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: () => "tinyMCE" in window ? window.tinyMCE.activeEditor.getContent() : window.wrappedJSObject ? window.wrappedJSObject.tinyMCE.activeEditor.getContent() : "",
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function hI(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: (r) => {
      "tinyMCE" in window ? window.tinyMCE.activeEditor.setContent(r) : window.wrappedJSObject && window.wrappedJSObject.tinyMCE.activeEditor.setContent(r);
    },
    args: [e.args],
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
async function CI(e) {
  const t = await Jt(e);
  return await E.scripting.executeScript({
    target: t,
    func: (r) => {
      const n = window.tinyMCE || window.wrappedJSObject.tinyMCE, o = Object.values(n.editors)[0], a = o.selection.getNode(), s = ["body", "div", "blockquote", "td"], i = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
      let c = a;
      for (; c.parentElement && !s.includes(c.parentElement.tagName.toLowerCase()); )
        c = c.parentElement;
      if (c && i.forEach((u) => {
        "tagName" in c && (c = c.closest(u) || c);
      }), "tagName" in c) {
        const u = new DOMParser().parseFromString(r, "text/html");
        for (; u.body.lastChild; )
          c.insertAdjacentElement(
            "afterend",
            u.body.lastChild
          );
      } else
        o.execCommand("mceInsertContent", !1, r);
    },
    args: [e.args],
    world: e.isFirefox ? "ISOLATED" : "MAIN"
  });
}
function Ra(e) {
  return new Promise((t, r) => {
    e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => r(e.error);
  });
}
function bI(e, t) {
  const r = indexedDB.open(e);
  r.onupgradeneeded = () => r.result.createObjectStore(t);
  const n = Ra(r);
  return (o, a) => n.then((s) => a(s.transaction(t, o).objectStore(t)));
}
let bo;
function Pl() {
  return bo || (bo = bI("keyval-store", "keyval")), bo;
}
function vI(e, t = Pl()) {
  return t("readonly", (r) => Ra(r.get(e)));
}
function yI(e, t, r = Pl()) {
  return r("readwrite", (n) => (n.put(t, e), Ra(n.transaction)));
}
let vo = "";
const Tt = /* @__PURE__ */ new Map();
async function xI(e) {
  const { acao: t, conteudo: r, pjeLegacyUrl: n } = e.args;
  if (!n || !n.length)
    return;
  vo = n, Tt.get("init") !== !0 && await TI() && Tt.set("init", !0);
  const o = Tt.get(vo) || {};
  if (t === "obter")
    if (r) {
      const a = r;
      return typeof a == "string" && a in o ? o[a] : o;
    } else
      return o;
  else
    t === "definir" && (Object.assign(o, r), Tt.set(vo, o), await yI("state", Tt));
  return o;
}
async function TI() {
  const e = await vI("state");
  if (Tt.size === 0 && e) {
    Tt.clear();
    for (const [t, r] of e)
      Tt.set(t, r);
  }
  return !0;
}
const mi = {
  salvarModelo: hu,
  adicionarConteudoCkeditor: Iu,
  obterUrl: Cu,
  obterFrames: bu,
  enviarRequisicaoPJE: gI,
  enviarEventoFrame: dI,
  obterConteudoCkeditor: fI,
  definirConteudoCkeditor: mI,
  checarCKEditorReady: AI,
  getSessionStorage: pI,
  obterConteudoTinyEditor: II,
  definirConteudoTinyEditor: hI,
  adicionarConteudoTinyEditor: CI,
  state: xI,
  backgroundFetchEndpoint: Vf,
  backgroundObterURLDaGuiaAtiva: zc
};
var Ln = /* @__PURE__ */ ((e) => (e.GESTOR = "gestor", e))(Ln || {});
function SI() {
  E.webNavigation.onCommitted.addListener(
    async (e) => {
      e.url.includes("painel-usuario-interno") && E.scripting.executeScript({
        target: { tabId: e.tabId, frameIds: [e.frameId] },
        files: ["pjecomm.js", "CacheXMLHttpRequestProxy.js"],
        world: To ? "ISOLATED" : "MAIN"
      });
    },
    {
      url: [
        {
          urlMatches: "frontend.+(cnj|trf|tj|tre|trt).+"
        }
      ]
    }
  );
}
function MI(e, t, r) {
  var o;
  if (e.origem !== "gestor")
    return !1;
  const n = !!navigator.userAgent.match(/firefox|fxios/i);
  if (t.id !== E.runtime.id) {
    const a = { resposta: "Erro desconhecido.", mensagemOriginal: e };
    if (!n && r)
      return r(a);
    if (n)
      return new Promise((s) => s(a));
  }
  if (!t.tab || !t.tab.id) {
    const a = { resposta: "Requisição sem tab ou tabId" };
    if (!n && r)
      return r(a);
    if (n)
      return new Promise((s) => s(a));
  } else if (e.mensagem in mi) {
    const a = mi[e.mensagem]({
      senderTab: (o = t.tab) == null ? void 0 : o.id,
      args: e.conteudo,
      frameId: t.frameId,
      isFirefox: n
    });
    return n ? a : (a.then((s) => {
      r && r(s);
    }), !0);
  } else
    return !1;
}
function EI(e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const n = e.charCodeAt(r);
    t = (t << 5) - t + n, t &= t;
  }
  return new Uint32Array([t])[0].toString(36);
}
function wI(e, t) {
  const r = e;
  return r ? Array.isArray(r) ? r.find((o) => o.url.includes(t)) : r : void 0;
}
function Rl(e, t) {
  return new Promise((r) => {
    !!navigator.userAgent.match(/firefox|fxios/i) ? xo.runtime.sendMessage({ ...e, origem: Ln.GESTOR }).then((o) => {
      t && t(o), r(o);
    }) : chrome.runtime.sendMessage({ ...e, origem: Ln.GESTOR }, (o) => {
      t && t(o), r(o);
    });
  });
}
function LI() {
  var e;
  try {
    return ((e = window.location.href.match(jt.HREFS.ROOT)) == null ? void 0 : e.at(0)) || "";
  } catch {
    return "";
  }
}
let Qo = null, xe = null;
setInterval(async () => {
  var r;
  if (!xe) {
    xe = ((r = await E.storage.local.get("pjeCache")) == null ? void 0 : r.pjeCache) ?? {};
    return;
  }
  const e = (/* @__PURE__ */ new Date()).getTime(), t = Object.keys(xe);
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    xe[o].expires < e && delete xe[o];
  }
  E.storage.local.set({ pjeCache: xe });
}, 1e3 * 30);
E.webNavigation.onCompleted.addListener(
  async (e) => {
    let t = 0, r;
    const n = setInterval(async () => {
      if (t++ > 50) {
        clearInterval(n);
        return;
      }
      if (r = (await E.scripting.executeScript({
        target: { tabId: e.tabId, frameIds: [e.frameId] },
        func: (...o) => {
          var u;
          if (!(window.top === window))
            return null;
          const [s] = o, i = window, c = s ? (u = i.wrappedJSObject) == null ? void 0 : u.pjePayload : i.pjePayload;
          return c != null && c.CONSTANTES.WEB_ROOT ? c : !1;
        },
        args: [To],
        world: To ? "ISOLATED" : "MAIN"
      }))[0], r.result === null) {
        clearInterval(n);
        return;
      }
      if (r.result !== !1) {
        clearInterval(n);
        const o = r.result;
        Qo = DI(o.CONSTANTES.WEB_ROOT, o.CONSTANTES.COOKIES);
      }
    }, 250);
  },
  {
    url: [
      {
        urlMatches: "pje.+(cnj|trf|tj|tre|trt).+"
      }
    ]
  }
);
ea("requisicaoAPI", async (e) => {
  var t, r;
  if (xe || (xe = ((t = await E.storage.local.get("pjeCache")) == null ? void 0 : t.pjeCache) ?? {}), !Qo)
    return null;
  if (e.data.endpoint) {
    const { cache: n = "indefinido", maxAge: o = 30 } = e.data.opcoes ?? {};
    if (n !== "indefinido" && n !== "padrão" && n !== "não-guardar" && n !== "recarregar" && n !== "apenas-se-presente-no-cache")
      return null;
    const a = EI(JSON.stringify(e.data));
    if (n === "apenas-se-presente-no-cache")
      return ((r = (xe ?? {})[a]) == null ? void 0 : r.conteudo) ?? null;
    const s = /* @__PURE__ */ new Date();
    let i = !1;
    if (n === "indefinido" || n === "padrão") {
      if (xe[a] && xe[a].conteudo && xe[a].expires > s.getTime())
        return xe[a].conteudo;
      i = !0;
    }
    const c = await Qo[e.data.endpoint](
      ...e.data.args ?? []
    );
    if (n === "não-guardar")
      return c;
    if (n === "recarregar" || i) {
      const u = s.getTime() + o * 6e4, l = { conteudo: c, expires: u };
      return c && xe && (xe[a] = l, he.console.log({ chaveCache: a, atCache: xe[a] })), c;
    }
    return c;
  }
  return null;
});
function jI(e, t) {
  const r = `${e}/seam/resource/rest/pje-legacy/painelUsuario`, n = new Headers({
    Cookie: t,
    "Content-Type": "application/json"
  });
  return {
    baseURL: e,
    headers: n,
    get(o) {
      return fetch(`${r}${o}`, {
        headers: n,
        method: "GET"
      });
    },
    post(o, a) {
      return fetch(`${r}${o}`, {
        headers: n,
        method: "POST",
        body: a ?? ""
      });
    }
  };
}
function DI(e, t) {
  const r = jI(e, t), n = async function(a) {
    return Ie(
      await fetch(
        `${r.baseURL}/seam/resource/rest/pje-legacy/processos/numero-processo/${a}/validar`,
        {
          headers: r.headers,
          method: "GET",
          mode: "cors"
        }
      )
    );
  };
  return {
    validarNumeroProcesso: n,
    obterIdProcesso: n,
    async tarefasPendentes(a) {
      const s = await r.post("/tarefas", JSON.stringify(a));
      return Ie(s);
    },
    async tarefasFavoritas(a) {
      return Ie(await r.post("/tarefasFavoritas", JSON.stringify(a)));
    },
    async tarefasAssinatura() {
      return Ie(await r.get("/tarefasAssinatura"));
    },
    async tarefasLocalizacao() {
      return Ie(await r.get("/tarefas"));
    },
    async processosTarefa(a, s, i) {
      return Ie(
        await r.post(
          `/recuperarProcessosTarefaPendenteComCriterios/${a}/${s}`,
          JSON.stringify(i)
        )
      );
    },
    async inserirEtiqueta(a, s) {
      const i = await r.post(
        "/processoTags/inserir",
        JSON.stringify({
          tag: a,
          idProcesso: s
        })
      );
      return Ie(i);
    },
    async removerEtiqueta(a, s) {
      const i = await r.post(
        "/processoTags/remover",
        JSON.stringify({
          idTag: parseInt(a),
          idProcesso: parseInt(s)
        })
      );
      return Ie(i);
    },
    async etiquetasDoProcesso(a) {
      const s = await r.get(`/processoTags/listar/${a}`);
      return Ie(s);
    },
    async recuperarEtiquetasQuantitativoProcessoTarefaPendente(a) {
      const s = await r.post(
        `/recuperarEtiquetasQuantitativoProcessoTarefaPendente/${a}/true`,
        JSON.stringify({})
      );
      return Ie(s);
    },
    async processosPorTarefaIdentificador(a, s) {
      return Ie(
        await r.get(`/recuperarProcessoPorTarefaIdentificador/${a}/${s}`)
      );
    },
    async tarefaPendentePorIdTarefa(a) {
      return Ie(await r.get(`/recuperarProcesso/${a}/false`));
    },
    async transicoesSaidaTarefa(a) {
      return Ie(await r.get(`/transicoes/${a}`));
    },
    async movimentarTarefa(a, s) {
      return Ie(await r.get(`/movimentar/${a}/${s}`));
    },
    async movimentarTarefaIndividual(a, s) {
      return Ie(await r.get(`/movimentarIndividual/${a}/${s}`));
    },
    async historicoTarefas(a) {
      return Ie(await r.get(`/historicoTarefas/${a}`));
    },
    async obterUltimoMovimentoDoProcesso(a) {
      return Ie(
        await fetch(
          `${r.baseURL}/seam/resource/rest/pje-legacy/processos/${a}/ultimoMovimento`,
          {
            headers: r.headers,
            method: "GET",
            mode: "cors"
          }
        )
      );
    },
    async downloadDocumento(a) {
      return await fetch(
        `${r.baseURL}/seam/resource/rest/pje-legacy/documento/download/${a}`,
        {
          headers: r.headers,
          method: "GET"
        }
      );
    },
    async getEtiquetas() {
      return await Ie(await r.post("/etiquetas"));
    }
  };
}
async function Ie(e) {
  let t;
  if (e) {
    try {
      return t = await e.text(), JSON.parse(t);
    } catch (r) {
      he.erro(r);
    }
    if (he.log(t ?? ""), t)
      return t;
  }
  return null;
}
SI();
E.runtime.onInstalled.addListener((e) => {
  e.reason === "install" ? (gt.iniciar(), he.sucesso("Extensão instalada!")) : e.reason === "update" && (he.sucesso("Extensão atualizada!"), gt.atualizar()), he.inspecionar("this: ", globalThis), he.inspecionar("browser: ", E);
});
ea("guardarSessionStorage", async (e) => {
  let t;
  try {
    t = JSON.parse(e.data);
  } catch {
    return { resposta: "Erro ao converter dados para JSON" };
  }
  return await gt.guardarSessionStorage(t), { resposta: "Dados guardados na sessionStorage" };
});
ea("obterSessionStorage", async (e) => {
  const t = await gt.obterSessionStorage(e.data);
  return JSON.stringify({ resposta: t });
});
E.runtime.onMessage.addListener((e, t, r) => {
  if (e.origem === Ln.GESTOR)
    return MI(e, t, r);
});
E.runtime.onMessage.addListener((e, t, r) => {
  if (e.action === "checkWhatsAppTab")
    return E.tabs.query({ url: "*://web.whatsapp.com/*" }).then((n) => {
      if (n.length > 0) {
        const o = n[0].id;
        o !== void 0 && E.tabs.update(o, { url: e.url, active: !0 }).then(() => {
          r({ success: !0 });
        });
      } else
        E.tabs.create({ url: e.url }).then(() => {
          r({ success: !0 });
        });
    }), !0;
});
E.storage.onChanged.addListener((e, t) => {
  he.inspecionar(`Mudanças na área de armazenamento "${t}":`, e), e.ativada && Gl(e.ativada.newValue), (e.ativada || e.tema || e.cartaoProcesso || e.ajustesGerais || e.maisEspaco || e.ultimasEtiquetasUsadaTarefa || e.destacarLembretes || e.inativaCartao) && E.tabs.query({}).then((r) => {
    gt.obter(null).then((n) => {
      r.forEach((o) => {
        const { url: a, id: s } = o;
        Ci(n, s, a), bi(n, s, a);
      });
    });
  });
});
E.tabs.onUpdated.addListener((e) => {
  E.tabs.get(e).then((t) => {
    const { url: r } = t;
    gt.obter(null).then((n) => {
      Ci(n, e, r), bi(n, e, r);
    });
  });
});
