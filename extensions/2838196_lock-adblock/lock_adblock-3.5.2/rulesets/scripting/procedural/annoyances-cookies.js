/*******************************************************************************

    uBlock Origin Lite - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2014-present Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

/* jshint esversion:11 */

'use strict';

// ruleset: annoyances-cookies

/******************************************************************************/

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = [["{\"selector\":\"#overlay\",\"tasks\":[[\"has\",{\"selector\":\"[href*=\\\"privacyprefs/\\\"]\"}]]}"],["{\"selector\":\"[data-p*=\\\"/consent.google.\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"button[jsname=\\\"tWT92d\\\"]\"}]]}"],["{\"selector\":\"body > div > div\",\"tasks\":[[\"has\",{\"selector\":\"#jentis_consent\"}]]}"],["{\"selector\":\"#CookieWrapper\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\"div[id$=\\\"_modal_outer_\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"> .cookie-modal\"}]]}"],["{\"selector\":\"body > div:not([class]):not([id]) > div[class*=\\\" \\\"]\",\"tasks\":[[\"has\",{\"selector\":\"> div > div > div[class] > a[href^=\\\"https://policy.medium.com/medium-privacy-policy-\\\"]\"}]]}","{\"selector\":\"div\",\"tasks\":[[\"has\",{\"selector\":\"div[role=\\\"alert\\\"] > a[href^=\\\"https://policy.medium.com/medium-privacy-policy-\\\"]\"}]]}"],["{\"selector\":\"section[id][class]\",\"tasks\":[[\"has\",{\"selector\":\"> div[class] > button[class][onclick^=\\\"onClickCookiesBannerWeb\\\"]\"}]]}"],["{\"selector\":\"body\",\"action\":[\"style\",\"display: flex !important\"],\"tasks\":[[\"has\",{\"selector\":\"div[class*=\\\"Styled\\\"][class*=\\\"Container\\\"] [data-testid=\\\"bbc-logo-wrapper\\\"]\"}],[\"spath\",\" > .fc-consent-root\"]]}"],["{\"selector\":\".hasParental.cookies-modal\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\"#ask-consent\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\".gb_g\",\"tasks\":[[\"has-text\",\"cookie\"]]}"],["{\"selector\":\".warning\",\"tasks\":[[\"has\",{\"selector\":\"[data-cookie-type]\"}]]}"],["{\"selector\":\".modal\",\"tasks\":[[\"has\",{\"selector\":\"#eprivacy\"}]]}"],["{\"selector\":\"body > div[style*=\\\"z-index: 2147483647\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"a[href=\\\"https://nytimes.com/cookie-policy/\\\"]\"}]]}"],["{\"selector\":\".sanoma-logo-container ~ .message-component.privacy-manager-tcfv2 .tcfv2-stack:not([title=\\\"Sanoman sisällönjakelukumppanit\\\"]) button.pm-switch.checked\",\"action\":[\"remove-class\",\"checked\"]}"],["{\"selector\":\".undefined\",\"tasks\":[[\"has\",{\"selector\":\"[data-test-selector=\\\"click-the-cookie-banner\\\"]\"}]]}"],["{\"selector\":\"#moduleCookies\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\"div[class^=\\\"elements__Banner-\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"> div > a[href$=\\\"-privacy-policy\\\"]\"}]]}"],["{\"selector\":\"[data-p*=\\\"/consent.youtube.com\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"button[jsname=\\\"tWT92d\\\"]\"}]]}","{\"selector\":\"body.bodyUIModernization\",\"tasks\":[[\"has\",{\"selector\":\"[action=\\\"https://consent.youtube.com/save\\\"] .saveButtonUIModernization[value][aria-label]\"}]]}"],["{\"selector\":\".fancybox-container\",\"tasks\":[[\"has\",{\"selector\":\"a[onclick=\\\"document.getElementById('privacy_more').style.display='block';\\\"]\"}]]}"],["{\"selector\":\".container\",\"action\":[\"style\",\"display: block !important\"],\"tasks\":[[\"has\",{\"selector\":\".consent-blocking-embed-message\"}],[\"spath\",\" ~ #onetrust-consent-sdk\"]]}"],["{\"selector\":\".banner\",\"tasks\":[[\"has\",{\"selector\":\"[href=\\\"javascript:acceptAllCookies();void(0);\\\"]\"}]]}"],["{\"selector\":\".fixed\",\"tasks\":[[\"has\",{\"selector\":\".cookies-scrollbar\"}]]}"]];

const hostnamesMap = new Map([["moebelix.at",2],["schwarzenbacher-kundl.at",3],["flip.bg",4],["primegaming.blog",5],["uxdesign.cc",5],["eand.co",5],["blog.discord.com",5],["infosecwriteups.com",5],["medium.com",5],["netflixtechblog.com",5],["towardsdatascience.com",5],["windscribe.com",5],["medium.engineering",5],["codeburst.io",5],["plainenglish.io",5],["minhaconexao.com.br",6],["bbc.com",7],["buktube.com",8],["xhamster.com",8],["xhamster2.com",8],["xhamster3.com",8],["xhamster.desi",8],["e-comas.com",9],["play.google.com",10],["istockphoto.com",11],["kiertokanki.com",12],["archive.nytimes.com",13],["cdn.privacy-mgmt.com",14],["studocu.com",15],["topographic-map.com",16],["yogainternational.com",17],["consent.youtube.com",18],["50plusmatch.fi",19],["mtvuutiset.fi",20],["ilmattino.it",21],["leggo.it",21],["sonarhome.pl",22]]);

const entitiesMap = new Map([["music.amazon",0],["consent.google",1]]);

const exceptionsMap = new Map(undefined);

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, hostnamesMap, entitiesMap, exceptionsMap });

/******************************************************************************/

})();

/******************************************************************************/
