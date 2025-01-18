import {
  useTranslation
} from "./DLRZRKOT.js";
import {
  PermissionWrapper_default,
  useAuth_default
} from "./6NLHHV4N.js";
import {
  Autocomplete_default,
  MenuItem_default,
  TextField_default,
  material_exports
} from "./2FH7W2EF.js";
import {
  ListItemText_default,
  Typography_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  require_react
} from "./AMCWABVH.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/components/select/LanguageSelect.tsx
var import_react2 = __toESM(require_react());

// src/i18n/types/index.ts
var LANGUAGE_CODE_MAP = {
  am: { label: "\u12A0\u121B\u122D\u129B", en_label: "Amharic" },
  ar: { label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", en_label: "Arabic" },
  bg: { label: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438", en_label: "Bulgarian" },
  bn: { label: "\u09AC\u09BE\u0982\u09B2\u09BE", en_label: "Bengali" },
  ca: { label: "Catal\xE0", en_label: "Catalan" },
  cs: { label: "\u010Ce\u0161tina", en_label: "Czech" },
  da: { label: "Dansk", en_label: "Danish" },
  de: { label: "Deutsch", en_label: "German" },
  el: { label: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", en_label: "Greek" },
  en: { label: "English", en_label: "English" },
  en_GB: { label: "English (UK)", en_label: "English (UK)" },
  en_US: { label: "English (US)", en_label: "English (US)" },
  es: { label: "Espa\xF1ol", en_label: "Spanish" },
  es_419: {
    label: "Espa\xF1ol (Latinoam\xE9rica)",
    en_label: "Spanish (Latin America)"
  },
  et: { label: "Eesti", en_label: "Estonian" },
  fa: { label: "\u0641\u0627\u0631\u0633\u06CC", en_label: "Persian" },
  fi: { label: "Suomi", en_label: "Finnish" },
  fil: { label: "Filipino", en_label: "Filipino" },
  fr: { label: "Fran\xE7ais", en_label: "French" },
  gu: { label: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0", en_label: "Gujarati" },
  he: { label: "\u05E2\u05D1\u05E8\u05D9\u05EA", en_label: "Hebrew" },
  he_IL: { label: "\u05E2\u05D1\u05E8\u05D9\u05EA (\u05D9\u05E9\u05E8\u05D0\u05DC)", en_label: "Hebrew (Israel)" },
  hi: { label: "\u0939\u093F\u0928\u094D\u0926\u0940", en_label: "Hindi" },
  hr: { label: "Hrvatski", en_label: "Croatian" },
  hy: { label: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", en_label: "Armenian" },
  hu: { label: "Magyar", en_label: "Hungarian" },
  in: { label: "Bahasa Indonesia", en_label: "Indonesian" },
  id: { label: "Indonesia", en_label: "Indonesian" },
  it: { label: "Italiano", en_label: "Italian" },
  ja: { label: "\u65E5\u672C\u8A9E", en_label: "Japanese" },
  kn: { label: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1", en_label: "Kannada" },
  ko: { label: "\uD55C\uAD6D\uC5B4", en_label: "Korean" },
  lt: { label: "Lietuvi\u0173", en_label: "Lithuanian" },
  lv: { label: "Latvie\u0161u", en_label: "Latvian" },
  ml: { label: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02", en_label: "Malayalam" },
  mr: { label: "\u092E\u0930\u093E\u0920\u0940", en_label: "Marathi" },
  ms: { label: "Melayu", en_label: "Malay" },
  nl: { label: "Nederlands", en_label: "Dutch" },
  no: { label: "Norsk", en_label: "Norwegian" },
  pl: { label: "Polski", en_label: "Polish" },
  pt_BR: { label: "Portugu\xEAs (Brasil)", en_label: "Portuguese (Brazil)" },
  pt_PT: { label: "Portugu\xEAs (Portugal)", en_label: "Portuguese (Portugal)" },
  ro: { label: "Rom\xE2n\u0103", en_label: "Romanian" },
  ru: { label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", en_label: "Russian" },
  sk: { label: "Sloven\u010Dina", en_label: "Slovak" },
  sl: { label: "Sloven\u0161\u010Dina", en_label: "Slovenian" },
  sr: { label: "\u0421\u0440\u043F\u0441\u043A\u0438", en_label: "Serbian" },
  sv: { label: "Svenska", en_label: "Swedish" },
  sw: { label: "Kiswahili", en_label: "Swahili" },
  ta: { label: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", en_label: "Tamil" },
  te: { label: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", en_label: "Telugu" },
  th: { label: "\u0E44\u0E17\u0E22", en_label: "Thai" },
  tr: { label: "T\xFCrk\xE7e", en_label: "Turkish" },
  ua: { label: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", en_label: "Ukrainian" },
  uk: { label: "\u0627\u0631\u062F\u0648", en_label: "Urdu" },
  vi: { label: "Ti\u1EBFng Vi\u1EC7t", en_label: "Vietnamese" },
  zh_CN: { label: "\u7B80\u4F53\u4E2D\u6587", en_label: "SimplifiedChinese" },
  zh_TW: { label: "\u7E41\u4F53\u4E2D\u6587", en_label: "TraditionalChinese" }
};

// src/components/select/BaseSelect/AutocompleteSelect.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function filterOptions(options, { inputValue }) {
  return options.filter((option) => {
    var _a, _b;
    const label = option.label.toLowerCase();
    const value = option.value.toLowerCase();
    const enWord = ((_b = (_a = option.origin) == null ? void 0 : _a.en_label) == null ? void 0 : _b.toLowerCase()) || "";
    const input = inputValue.toLowerCase();
    return label.includes(input) || value.includes(input) || enWord.includes(input);
  });
}
var AutocompleteSelect = (props) => {
  var _a;
  const {
    options,
    label = "",
    value = "",
    onChange = (value2) => {
    },
    sx,
    placement = "auto",
    disablePortal = true,
    onPermission
  } = props;
  const [open, setOpen] = import_react.default.useState(false);
  const handleClose = () => {
    props.onClose && props.onClose();
    setOpen(false);
  };
  const handleOpen = () => {
    props.onOpen && props.onOpen();
    setOpen(true);
  };
  const { t } = useTranslation("common");
  const renderDom = (option) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ListItemText_default,
      {
        primary: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography_default, { fontSize: 14, children: option.label })
      }
    );
  };
  const renderOptionCache = (0, import_react.useCallback)(
    (props2, option) => {
      var _a2, _b;
      if ((_a2 = option.origin) == null ? void 0 : _a2.permission) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PermissionWrapper_default,
          {
            mountContainerName: option.origin.permission.mountContainerName,
            sceneType: option.origin.permission.sceneType,
            allowedRoles: option.origin.permission.allowedRoles,
            preAuth: option.origin.permission.preAuth,
            onPermission,
            TooltipProps: {
              placement: "left"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              MenuItem_default,
              {
                selected: option.value === value,
                disabled: (_b = option.origin) == null ? void 0 : _b.disabled,
                value: option.value,
                onClick: (event) => {
                  var _a3;
                  if ((_a3 = option.origin) == null ? void 0 : _a3.disabled) {
                    event.stopPropagation();
                    event.preventDefault();
                  }
                  const newValue = option.value;
                  onChange && onChange(newValue);
                  handleClose();
                },
                children: renderDom(option)
              }
            )
          },
          option.value
        );
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        MenuItem_default,
        {
          value: option.value,
          selected: option.value === value,
          onClick: (event) => {
            var _a3;
            if ((_a3 = option.origin) == null ? void 0 : _a3.disabled) {
              event.stopPropagation();
              event.preventDefault();
            }
            const newValue = option.value;
            onChange && onChange(newValue);
            handleClose();
          },
          children: renderDom(option)
        },
        option.value
      );
    },
    [value, onChange]
  );
  const autocompleteValue = (0, import_react.useMemo)(() => {
    return options.find((option) => option.value === value) || options[0];
  }, [options, value]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Autocomplete_default,
    {
      open,
      onClose: handleClose,
      onOpen: handleOpen,
      disablePortal,
      disableClearable: true,
      autoHighlight: true,
      value: autocompleteValue,
      size: "small",
      sx: {
        width: 220,
        "& .MuiInputBase-root": {
          height: (_a = sx == null ? void 0 : sx.height) != null ? _a : "auto"
        },
        "& .MuiInputBase-input": {
          fontSize: 14,
          fontWeight: 500,
          pl: "2px !important"
        },
        "& .MuiAutocomplete-popupIndicator": {
          color: "inherit",
          p: 0
        },
        ...sx
      },
      getOptionLabel: (option) => option.label,
      options,
      onChange: (event, newValue) => {
        onChange(newValue.value);
      },
      noOptionsText: t("no_options"),
      filterOptions,
      renderOption: renderOptionCache,
      componentsProps: {
        popper: {
          placement
        }
      },
      renderInput: (params) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        TextField_default,
        {
          ...params,
          label,
          inputProps: {
            ...params.inputProps,
            autoComplete: "new-password"
            // disable autocomplete and autofill
          }
        }
      )
    }
  );
};
var AutocompleteSelect_default = AutocompleteSelect;

// src/components/select/LanguageSelect.tsx
var import_jsx_runtime2 = (
  // <PermissionWrapper
  //   mountContainerName={inWhere}
  //   sceneType={'WEBACCESS_LANGUAGE'}
  //   allowedRoles={['pro', 'pro_gift', 'elite']}
  //   TooltipProps={{
  //     placement: 'left',
  //   }}
  //   preAuth={async () => {
  //     const result = await waitAuthModalPromise({
  //       ref: 'webchatgpt-web-access',
  //     })
  //     return result.userInfo
  //   }}
  // >
  __toESM(require_jsx_runtime())
);
var LanguageSelect = (props) => {
  const {
    label = "",
    value = "",
    onChange = (value2) => {
    },
    placement = "left",
    sx,
    disablePortal,
    hasAuto = false,
    inWhere,
    hasPermission = false
  } = props;
  const { waitAuthModalPromise } = useAuth_default();
  const languageOptions = (0, import_react2.useMemo)(() => {
    const languages = Object.keys(LANGUAGE_CODE_MAP).map((key) => {
      const languageCode = LANGUAGE_CODE_MAP[key];
      const option = {
        label: languageCode.label,
        value: key,
        origin: {
          value: key,
          ...languageCode
        }
      };
      return option;
    });
    if (hasAuto) {
      languages.unshift({
        label: "Auto",
        value: "auto"
      });
    }
    return languages;
  }, [hasAuto, inWhere]);
  const valueCoverCache = (0, import_react2.useMemo)(() => {
    if (value && value !== "") {
      return value;
    } else {
      return hasAuto ? "auto" : "en";
    }
  }, [value, hasAuto]);
  if (hasPermission) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      AutocompleteSelect_default,
      {
        label,
        options: languageOptions,
        value: valueCoverCache,
        onChange,
        placement,
        sx
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    AutocompleteSelect_default,
    {
      label,
      options: languageOptions,
      value: valueCoverCache,
      onChange,
      placement,
      disablePortal,
      sx
    }
  );
};
var LanguageSelect_default = LanguageSelect;

export {
  LANGUAGE_CODE_MAP,
  AutocompleteSelect_default,
  LanguageSelect_default
};
