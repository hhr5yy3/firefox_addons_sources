import { A as AppSpinner, _ as _sfc_main$3, a as _export_sfc, m as mdiLaptop, b as mdiLaptopOff, V as VIcon, c as VSwitch, O as OPCOES_FILTROS_PERFIS, d as mdiBrushVariant, e as OPCOES_TEMA, f as defaultTheme, g as darkTheme, h as highContrastTheme, i as mdiContentCopy, j as OPCOES_COPIAR_DADOS_DA_PECA, k as mdiTextBoxOutline, l as mdiCommentOffOutline, n as mdiFileOutline, o as mdiFilterOutline, G as GerenciadorOpcoes, p as browser, q as mdiGavel, r as mdiDomain, s as mdiApplicationSettingsOutline, t as mdiFormatListChecks, u as useTheme, v as obterManifesto, D as DEFINICOES, w as _sfc_main$4, x as mdiCursorDefaultClick, y as AppLinkBtn, z as AppRadio, B as vuetify } from "./high-contrast-theme-837e3c31.js";
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, withDirectives, createVNode, unref, vShow, createElementVNode, toDisplayString, pushScopeId, popScopeId, reactive, ref, createCommentVNode, Fragment, renderList, createBlock, createTextVNode, createApp } from "../vue.esm-browser.prod.js";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppIcoBtn",
  props: {
    carregando: { type: Boolean, default: false },
    desabilitado: { type: Boolean, default: false },
    icone: { default: "" },
    tamanho: { default: 16 },
    cor: { default: "gray" },
    alturaContainer: { default: void 0 },
    larguraContainer: { default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const estilos = computed(() => {
      return {
        height: props.alturaContainer ? `${props.alturaContainer}px` : `${Number(props.tamanho) * 2}px`,
        width: props.larguraContainer ? `${props.larguraContainer}px` : `${Number(props.tamanho) * 2}px`,
        color: props.cor,
        fontSize: `${props.tamanho}px`
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["app-ico-btn-container", { disabled: _ctx.desabilitado || _ctx.carregando }]),
        style: normalizeStyle(estilos.value)
      }, [
        withDirectives(createVNode(unref(AppSpinner), {
          tamanho: _ctx.tamanho,
          mono: ""
        }, null, 8, ["tamanho"]), [
          [vShow, _ctx.carregando]
        ]),
        withDirectives(createVNode(unref(_sfc_main$3), {
          nome: _ctx.icone,
          style: normalizeStyle({ color: _ctx.cor, fontSize: `${_ctx.tamanho}px` })
        }, null, 8, ["nome", "style"]), [
          [vShow, !_ctx.carregando]
        ])
      ], 6);
    };
  }
});
const AppIcoBtn = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7ff1f0bc"]]);
const _withScopeId = (n) => (pushScopeId("data-v-026ac11d"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "box" };
const _hoisted_2$1 = { class: "box2" };
const _hoisted_3$1 = { class: "icon-box" };
const _hoisted_4$1 = { class: "label" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", { class: "helper-text" }, "Aproveite e utilize todos os recursos.", -1));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppAtivador",
  props: {
    modelValue: { type: Boolean, default: false },
    textoAtivado: { default: "Ativado" },
    textoDesativado: { default: "Desativado" }
  },
  emits: ["update:model-value"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ativada = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:model-value", val)
    });
    const label = computed(() => ativada.value ? props.textoAtivado : props.textoDesativado);
    const icon = computed(() => ativada.value ? mdiLaptop : mdiLaptopOff);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", _hoisted_2$1, [
          createElementVNode("div", _hoisted_3$1, [
            createVNode(VIcon, {
              color: "extensionActivatedIconColor",
              icon: icon.value
            }, null, 8, ["icon"]),
            createVNode(unref(_sfc_main$3), { nome: "mdi-sync" })
          ]),
          createElementVNode("div", null, [
            createElementVNode("p", _hoisted_4$1, toDisplayString(label.value), 1),
            _hoisted_5$1
          ])
        ]),
        createVNode(VSwitch, {
          modelValue: ativada.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ativada.value = $event),
          color: "extensionActivatedSwitch",
          "hide-details": ""
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
const AppAtivador = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-026ac11d"]]);
const filtros = {
  primeiro: [
    { rotulo: " Vara Mista", valor: OPCOES_FILTROS_PERFIS.VARA_MISTA },
    { rotulo: " Direção", valor: OPCOES_FILTROS_PERFIS.DIRECAO },
    { rotulo: " Minhas Tarefas", valor: OPCOES_FILTROS_PERFIS.MINHAS_TAREFAS }
  ],
  segundo: [
    { rotulo: " Minhas Tarefas", valor: OPCOES_FILTROS_PERFIS.MINHAS_TAREFAS },
    { rotulo: " Turma Recursal", valor: OPCOES_FILTROS_PERFIS.TURMA_RECURSAL }
  ],
  tudo: [
    { rotulo: " Vara Mista", valor: OPCOES_FILTROS_PERFIS.VARA_MISTA },
    { rotulo: " Direção", valor: OPCOES_FILTROS_PERFIS.DIRECAO },
    { rotulo: " Turma Recursal", valor: OPCOES_FILTROS_PERFIS.TURMA_RECURSAL },
    { rotulo: " Minhas Tarefas", valor: OPCOES_FILTROS_PERFIS.MINHAS_TAREFAS }
  ]
};
const defineFiltrosASeremMostrados = async (grau) => {
  if (grau) {
    return filtros[grau];
  } else {
    return filtros.tudo;
  }
};
const extensionActivator = {
  rotuloAtivado: "Extensão Ativada",
  rotuloDesativado: "Extensão Desativada",
  item: "ativada"
};
const getFilters = async () => {
  var _a, _b;
  const icons = [mdiGavel, mdiDomain, mdiApplicationSettingsOutline, mdiFormatListChecks];
  const response = await defineFiltrosASeremMostrados(
    ((_b = (_a = await browser.storage.local.get("ramoEGrau")) == null ? void 0 : _a.ramoEGrau) == null ? void 0 : _b.grau) ?? "tudo"
  );
  return response.map((filter, index) => ({
    ...filter,
    icon: icons[index]
  }));
};
const radioTema = {
  titulo: "Aparência",
  icon: mdiBrushVariant,
  item: "tema",
  opcoes: [
    { rotulo: "Padrão", valor: OPCOES_TEMA.PADRAO, imagemUrl: defaultTheme, width: "120" },
    { rotulo: "Escuro", valor: OPCOES_TEMA.ESCURO, imagemUrl: darkTheme, width: "120" },
    {
      rotulo: "Contraste",
      valor: OPCOES_TEMA.ALTO_CONTRASTE,
      imagemUrl: highContrastTheme,
      width: "120"
    }
  ]
};
const radioDadosPeca = {
  titulo: "Copiar Dados das Peças",
  icon: mdiContentCopy,
  item: "copiarDadosDaPeca",
  opcoes: [
    {
      rotulo: "Com descrição",
      valor: OPCOES_COPIAR_DADOS_DA_PECA.DESCRICAO,
      icon: mdiTextBoxOutline
    },
    {
      rotulo: "Sem descrição",
      valor: OPCOES_COPIAR_DADOS_DA_PECA.SEM_DESCRICAO,
      icon: mdiCommentOffOutline
    },
    { rotulo: "Apenas ID", valor: OPCOES_COPIAR_DADOS_DA_PECA.APENAS_ID, icon: mdiFileOutline },
    {
      rotulo: "Apenas ID entre parênteses",
      valor: OPCOES_COPIAR_DADOS_DA_PECA.ID_ENTRE_PARENTESE,
      icon: mdiFileOutline
    }
  ]
};
const radioFiltroTarefas = {
  titulo: "Ativar Filtro",
  icon: mdiFilterOutline,
  item: "filtros",
  opcoes: await getFilters()
};
const opcoes = reactive({});
reactive([]);
new GerenciadorOpcoes((dados) => {
  Object.assign(opcoes, dados);
});
function obterRadios() {
  const radios2 = [];
  radios2.push(radioTema);
  opcoes.copiaDadosPecaAtivado && radios2.push(radioDadosPeca);
  opcoes.filtrostarefas && radios2.push(radioFiltroTarefas);
  return radios2;
}
const data = "3 de setembro de 2024";
const _hoisted_1 = { class: "box" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { class: "logo" };
const _hoisted_4 = {
  key: 0,
  class: "container"
};
const _hoisted_5 = {
  key: 0,
  class: "ativadores"
};
const _hoisted_6 = { key: 1 };
const _hoisted_7 = { class: "shortcut" };
const _hoisted_8 = { class: "shortcut-text" };
const _hoisted_9 = /* @__PURE__ */ createElementVNode("span", null, [
  /* @__PURE__ */ createTextVNode(" Acesso "),
  /* @__PURE__ */ createElementVNode("br"),
  /* @__PURE__ */ createTextVNode(" rápido ")
], -1);
const _hoisted_10 = { class: "radios" };
const _hoisted_11 = { class: "fieldset-header" };
const _hoisted_12 = { class: "fieldset-title" };
const _hoisted_13 = { class: "fieldset-radios" };
const _hoisted_14 = { style: { "text-align": "center" } };
const _hoisted_15 = /* @__PURE__ */ createElementVNode("p", { style: { "padding": "1px 7px 1px 7px", "color": "red" } }, " CUIDADO! Você está usando uma versão de teste. Para instalar a versão para usuário final acesse o link abaixo: ", -1);
const _hoisted_16 = /* @__PURE__ */ createElementVNode("a", {
  style: { "padding": "0px 10px 0px 10px" },
  href: "https://chrome.google.com/webstore/detail/pje%20r/kafnfkonkgfgkppomkfckmkgpkfkggcp?hl=pt-BR",
  target: "_blank"
}, "Google Chrome", -1);
const _hoisted_17 = /* @__PURE__ */ createElementVNode("a", {
  style: { "padding": "0px 10px 0px 10px" },
  href: "https://addons.mozilla.org/pt-BR/firefox/addon/pje-mais-r/",
  target: "_blank"
}, "Mozilla Firefox", -1);
const _hoisted_18 = [
  _hoisted_15,
  _hoisted_16,
  _hoisted_17
];
const _hoisted_19 = { class: "footer-shortcut" };
const _hoisted_20 = /* @__PURE__ */ createElementVNode("span", null, "Encontre-nos", -1);
const _hoisted_21 = { class: "version" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Popup",
  setup(__props) {
    const theme = useTheme();
    const opcoesCarregadas = ref(false);
    const opcoes2 = reactive({});
    let sitePje = ref("");
    let siteSei = ref("");
    let siteContraCheuqe = ref("");
    let calculadora = "https://www.trf3.jus.br/cecalc/";
    let siteEsosti = ref("");
    const manifesto = obterManifesto();
    const themeDict = {
      padrao: "light",
      escuro: "dark",
      altoContraste: "highContrast"
    };
    let links = ref([
      {
        href: sitePje,
        title: "PJe",
        icone: "nossos-pje",
        alt: "Logo do PJe"
      },
      {
        href: DEFINICOES.LINKS.OUTLOOK,
        title: "Outlook",
        icone: "mdi-outlook",
        cor: "#0072C6",
        alt: "Logo do Outlook"
      },
      {
        href: siteEsosti,
        title: "e-Sosti",
        icone: "ic-baseline-sos",
        cor: "rgba(233,87,30,1)",
        alt: "Ícone de socorro"
      },
      {
        href: siteSei,
        title: "Sei!",
        icone: "nossos-sei",
        alt: "Logo do Sei!"
      },
      {
        href: DEFINICOES.LINKS.SISBAJUD,
        title: "Sisbajud",
        icone: "nossos-sisbajud",
        alt: "Logo do Sisbajud",
        bgColor: "#313231"
      },
      {
        href: DEFINICOES.LINKS.RENAJUD,
        title: "Renajud",
        cor: "rgba(255,204,0,1)",
        icone: "nossos-renajud",
        alt: "Logo do Renajud"
      },
      {
        href: siteContraCheuqe,
        title: "Contracheque",
        icone: "fa-solid-money-check-alt",
        cor: "rgba(0,255,0,1)",
        alt: "Ícone de contracheque"
      },
      {
        href: calculadora,
        title: "Fábrica de Cálculos",
        icone: "nossos-jf-fabrica-de-calculos",
        cor: "#383365",
        alt: "Ícone de Fábrica de Cálculos",
        bgColor: "#313231"
      }
    ]);
    const gerenciadorOpcoes = new GerenciadorOpcoes((dados) => {
      const themeValue = themeDict[dados.tema] || "light";
      theme.global.name.value = themeValue;
      Object.assign(opcoes2, dados);
      opcoesCarregadas.value = true;
      sitePje.value = opcoes2.linksUlteisMultante.enderecoPje.site;
      siteSei.value = opcoes2.linksUlteisMultante.enderecoSei.site;
      const resultPje = sitePje.value.includes("trf1");
      if (resultPje == true) {
        siteContraCheuqe.value = "https://portal.trf1.jus.br/Consulta/ContraCheque/ContraCheque.php";
        siteEsosti.value = "https://esosti.trf1.jus.br/itsm/webclient/login/login.jsp?appservauth=true";
        siteSei.value = "https://sei.trf1.jus.br/";
      }
    });
    const atualizar = async (opcao, valor) => {
      gerenciadorOpcoes.definirOpcao({ opcao, valor });
      if (opcao == "tema") {
        if (valor == OPCOES_TEMA.PADRAO) {
          theme.global.name.value = "light";
        } else if (valor == OPCOES_TEMA.ESCURO) {
          theme.global.name.value = "dark";
        } else if (valor == OPCOES_TEMA.ALTO_CONTRASTE) {
          theme.global.name.value = "highContrast";
        }
      }
    };
    const atualizarFiltro = (perfil) => {
      gerenciadorOpcoes.definirOpcaoFiltrosPerfis(perfil);
    };
    const irParaOpcoes = () => browser.runtime.openOptionsPage();
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createVNode(unref(_sfc_main$4), { tamanho: "48" })
          ]),
          createVNode(unref(AppIcoBtn), {
            icone: "nossos-engrenagem",
            color: "windowConfig",
            tamanho: "25",
            onClick: _cache[0] || (_cache[0] = ($event) => irParaOpcoes())
          })
        ]),
        opcoesCarregadas.value ? (openBlock(), createElementBlock("main", _hoisted_4, [
          opcoes2 ? (openBlock(), createElementBlock("section", _hoisted_5, [
            createVNode(unref(AppAtivador), {
              "model-value": opcoes2[(_a = unref(extensionActivator)) == null ? void 0 : _a.item],
              "texto-ativado": unref(extensionActivator).rotuloAtivado,
              "texto-desativado": unref(extensionActivator).rotuloDesativado,
              class: "ativador",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => atualizar(unref(extensionActivator).item, $event))
            }, null, 8, ["model-value", "texto-ativado", "texto-desativado"])
          ])) : createCommentVNode("", true),
          opcoes2["ativada"] ? (openBlock(), createElementBlock("div", _hoisted_6, [
            createElementVNode("div", _hoisted_7, [
              createElementVNode("div", _hoisted_8, [
                createVNode(VIcon, {
                  icon: unref(mdiCursorDefaultClick),
                  size: "small"
                }, null, 8, ["icon"]),
                _hoisted_9
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(links), (link, index) => {
                return withDirectives((openBlock(), createBlock(unref(AppLinkBtn), {
                  key: `link-${index}`,
                  href: link.href,
                  target: "_blank",
                  title: link.title,
                  icone: link.icone,
                  alt: link.alt,
                  tamanho: "40",
                  cor: link.cor,
                  "bg-color": link.bgColor
                }, null, 8, ["href", "title", "icone", "alt", "cor", "bg-color"])), [
                  [vShow, link.href != ""]
                ]);
              }), 128))
            ]),
            createElementVNode("section", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(obterRadios)(), (radio, index) => {
                return openBlock(), createElementBlock("div", {
                  key: `fieldset-${index}`,
                  class: "fieldset"
                }, [
                  createElementVNode("div", _hoisted_11, [
                    createVNode(VIcon, {
                      icon: radio.icon,
                      class: "fieldset-icon"
                    }, null, 8, ["icon"]),
                    createElementVNode("div", _hoisted_12, toDisplayString(radio.titulo), 1)
                  ]),
                  createElementVNode("div", _hoisted_13, [
                    radio.item === "filtros" ? (openBlock(), createBlock(unref(AppRadio), {
                      key: 0,
                      "model-value": opcoes2.filtros.perfilAtivo,
                      titulo: radio.titulo,
                      opcoes: radio.opcoes,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => atualizarFiltro($event))
                    }, null, 8, ["model-value", "titulo", "opcoes"])) : (openBlock(), createBlock(unref(AppRadio), {
                      key: 1,
                      "model-value": opcoes2[radio.item],
                      titulo: radio.titulo,
                      opcoes: radio.opcoes,
                      "onUpdate:modelValue": ($event) => atualizar(radio.item, $event)
                    }, null, 8, ["model-value", "titulo", "opcoes", "onUpdate:modelValue"]))
                  ])
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          createElementVNode("footer", null, [
            withDirectives(createElementVNode("div", _hoisted_14, _hoisted_18, 512), [
              [vShow, unref(manifesto).name == "P-J-e+R-tester"]
            ]),
            createElementVNode("div", _hoisted_19, [
              _hoisted_20,
              withDirectives(createVNode(unref(AppLinkBtn), {
                href: "https://chat.whatsapp.com/HR8wLKdRJEa9SHLGk6Yvkc",
                target: "_blank",
                title: "Entrar no grupo de WhatsApp",
                icone: "nossos-whatsapp",
                alt: "Ícone do Watsapp",
                tamanho: "25",
                cor: "green",
                class: "icones-rodape",
                "bg-color": "transparent"
              }, null, 512), [
                [vShow, unref(manifesto).name != "P-J-e+R-tester"]
              ]),
              withDirectives(createVNode(unref(AppLinkBtn), {
                href: "https://chat.whatsapp.com/GfjswAHFuzDBQOv0rlfw9I",
                target: "_blank",
                title: "Entrar no grupo de WhatsApp Pje+R-Tester",
                icone: "nossos-whatsapp",
                alt: "Ícone do Watsapp",
                tamanho: "25",
                cor: "green",
                class: "icones-rodape",
                "bg-color": "transparent"
              }, null, 512), [
                [vShow, unref(manifesto).name == "P-J-e+R-tester"]
              ]),
              withDirectives(createVNode(unref(AppLinkBtn), {
                href: "https://t.me/+wws58j6db5tiNTY5",
                target: "_blank",
                title: "Entrar no grupo Telegram Pje+R-Tester",
                icone: "nossos-telegram",
                alt: "Ícone do Telegram",
                tamanho: "25",
                cor: "blue",
                class: "icones-rodape",
                "bg-color": "transparent"
              }, null, 512), [
                [vShow, unref(manifesto).name == "P-J-e+R-tester"]
              ]),
              createVNode(unref(AppLinkBtn), {
                href: "https://www.youtube.com/watch?v=PuQpa35Cosk&list=PL-MRmNJoF0Q9ikkb2BcMIbFeC1TyuF4fl",
                target: "_blank",
                title: "Tutoriais em vídeo",
                icone: "nossos-youtube",
                alt: "Ícone com link para canal do Youtube",
                tamanho: "25",
                cor: "red",
                class: "icones-rodape",
                "bg-color": "transparent"
              })
            ]),
            createElementVNode("p", _hoisted_21, "v. " + toDisplayString(unref(manifesto).version) + " | " + toDisplayString(unref(data)), 1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const Popup_vue_vue_type_style_index_0_lang = "";
const app = createApp(_sfc_main);
app.use(vuetify).mount("#app");
