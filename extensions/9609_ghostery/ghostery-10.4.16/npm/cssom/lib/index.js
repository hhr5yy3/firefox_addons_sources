globalThis.chrome = globalThis.browser;

import { __require as requireCSSStyleDeclaration } from './CSSStyleDeclaration.js';
import './CSSRule.js';
import './CSSGroupingRule.js';
import './CSSConditionRule.js';
import { __require as requireCSSStyleRule } from './CSSStyleRule.js';
import './MediaList.js';
import './CSSMediaRule.js';
import './CSSSupportsRule.js';
import { __require as requireCSSImportRule } from './CSSImportRule.js';
import { __require as requireCSSFontFaceRule } from './CSSFontFaceRule.js';
import './CSSHostRule.js';
import './StyleSheet.js';
import { __require as requireCSSStyleSheet } from './CSSStyleSheet.js';
import './CSSKeyframesRule.js';
import { __require as requireCSSKeyframeRule } from './CSSKeyframeRule.js';
import './MatcherList.js';
import './CSSDocumentRule.js';
import './CSSValue.js';
import './CSSValueExpression.js';
import { __require as requireParse } from './parse.js';
import './clone.js';

requireCSSStyleDeclaration().CSSStyleDeclaration;
requireCSSStyleRule().CSSStyleRule;
requireCSSImportRule().CSSImportRule;
requireCSSFontFaceRule().CSSFontFaceRule;
requireCSSStyleSheet().CSSStyleSheet;
requireCSSKeyframeRule().CSSKeyframeRule;
var parse = requireParse().parse;

export { parse };
