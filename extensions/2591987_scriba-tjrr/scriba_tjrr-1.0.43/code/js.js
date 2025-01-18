"use strict";

var recordings = null;
var recordingLink = null;
var activatedForm = false;
var profileAuth = false;
var currentTribunal = null;
var failedXHRs = 0;
var maxFailedXHRs = 2;

var doingXHR = false;

var hasXHRError = false;

function extensionVersion() {
  var b = null;
  if (typeof chrome !== 'undefined') {
    b = chrome;
  } else if (typeof browser !== 'undefined') {
    b = browser;
  }
  return (b && b.runtime && b.runtime.getManifest) ? b.runtime.getManifest().version : 'scriba-static';
}

function resetRecordings() {
  recordings = null;
  recordingLink = null;
  activatedForm = false;
}

function getInnerFrame() {
  // or var assumes we're not inside the extension, but on the view served by our server
  var or = $('iframe')[0];
  var frame = $('frame[name="mainFrame"]', or && or.contentDocument)[0];
  var frameDoc = frame && frame.contentDocument;
  var iframeDoc;

  if (frameDoc) {
    var iframe = $('iframe[name="userMainFrame"]', frameDoc)[0];
    iframeDoc = iframe && iframe.contentDocument;
  }

  return iframeDoc || frameDoc || document;
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// -------------------

function showRecordingPresentAlert(iframeDoc) {
  var container = $("#container", iframeDoc)[0];

  var documentScreen = $('#fileUploadForm h3:contains("Inserir Arquivo")', iframeDoc)[0];

  if (!documentScreen) {
    return;
  }

  if ($("#warningMessages:visible", iframeDoc)[0]) {

    if ($("#selectedRecording", iframeDoc)[0] || !recordingLink) {
      return;
    }

    var box = $("#warningMessages .box-content", iframeDoc)[0];

    var e = iframeDoc.createElement('div');
    e.id = 'selectedRecording';
    e.innerHTML = '<strong style="padding-left: 15px; padding-bottom: 15px;">' + STRINGS.recordingSelected + '</strong>';
    box.appendChild(e);

    updateSelectedRecording();

    return;
  } else if ($("#warningMessages", iframeDoc)[0]) {
    return $("#warningMessages", iframeDoc).show();
  } else {

    var div = iframeDoc.createElement('div');
    div.id = 'warningMessages';
    div.style.display = 'block !important';
    div.style.margin = '10px 0 0 20px';
    div.style.width = '80%';
    div.style.color = COLORS.modalWarningTitle;

    div.innerHTML = '<div class="top-left" ></div>\
    <div class="top-right"></div>\
    <div class="box-content">\
      <div class="spaces">\
        <h4>' + STRINGS.insertRecordingTitle + '</h4>\
        <p>' + STRINGS.insertRecordingText + '</p>\
      </div>\
    </div>\
    <div class="bottom-left"></div><div class="bottom-right"></div>';

    if (container && container.children[1]) {
      container.insertBefore(div, container.children[1]);
    }
  }

}

function indicateXHRError(iframeDoc) {
  hasXHRError = true;

  var container = $("#container", iframeDoc)[0];

  if ($("#xhrError:visible", iframeDoc)[0]) {
    return;
  } else if ($("#xhrError", iframeDoc)[0]) {
    return $("#xhrError", iframeDoc).show();
  } else {

    var div = iframeDoc.createElement('div');
    div.id = 'xhrError';
    div.style.display = 'block !important';
    div.style.margin = '10px';
    div.style.padding = '10px';
    div.style.width = '90%';
    div.style.color = COLORS.xhrError;
    div.style['background-color'] = COLORS.xhrErrorBackground;

    div.style.border = 'solid 2px ' + COLORS.xhrError;
    div.style['border-radius'] = '4px';

    div.innerHTML = '<div class="box-content">\
      <div class="spaces">\
        <h3 style="margin-bottom: 10px;">' + STRINGS.xhrError + '</h3>\
        <p><strong>' + STRINGS.xhrErrorDescription + '</strong></p>\
      </div>\
    </div>';

    if (container && container.children[1]) {
      container.insertBefore(div, container.children[1]);
    }
  }
}

function isHeaderInitialized(doc) {
  var header = $('table.resultTable thead tr', doc)[0];
  return header && header.children.length > 6;
}

function shouldShowConferenceLink(d) {
  if (!d) {
    return false;
  }
  var now = new Date(Date.now());

  return (now.getDate() === d.getDate())
      && (now.getMonth() === d.getMonth())
      && (now.getFullYear() === d.getFullYear());
}

function getEnterButton(doc, tagName, id, permissionLink, d, userLink, longForm) {
  var button = doc.createElement(tagName);
  var buttonText, inviteText;

  if (!longForm) {
    button.style.cssText = 'text-align:center';
  }

  buttonText = shouldShowConferenceLink(d) ? API.getConferenceLink(id, d, userLink, longForm) : STRINGS.enterEmpty;

  inviteText = (d && UTILS.compareDates(d, new Date()) && USER.isModerator()) ? API.getInviteLink(id, d, userLink, longForm) : STRINGS.enterEmpty;

  if (buttonText !== STRINGS.enterEmpty) {
    if (USER.isModerator()) {
      button.innerHTML = buttonText + ((longForm ? ' | ' : '<br>') + inviteText);
    } else {
      button.innerHTML = buttonText;
    }
  } else if (inviteText !== STRINGS.enterEmpty) {
    button.innerHTML = inviteText;
  }
  return button;
}

function addConferenceLinks() {
  if (hasXHRError) {
    return;
  }

  var iframeDoc = getInnerFrame();
  var profile = USER.getProfile(iframeDoc);

  if (!iframeDoc) {
    return;
  }

  var title = $('h3', iframeDoc)[0];

  if (!(title && title.innerText === "Listagem de Audiências")) {
    return;
  }

  // Add 'Webconference' header for the first time
  if (!isHeaderInitialized(iframeDoc)) {
    var thead = $('table.resultTable thead tr', iframeDoc)[0];

    if (thead && thead.children.length === 6) {
      var header = iframeDoc.createElement('th');
      header.innerHTML = STRINGS.conferenceColumn;
      header.style.cssText = 'padding:0 20px 0 20px';
      thead.appendChild(header);
    }
  }

  var tbody = $('table.resultTable tbody', iframeDoc)[0];

  if (tbody) {

    var rows = tbody.children;

    if (rows[0].children[0].innerText === "Nenhum registro encontrado") {
      return;
    }

    for (var row of rows) {
      if (row.children.length !== 6) {
        continue;
      }

      var id = row.children[0].innerText.trim();
      var permissionLink = row.children[0].children[0].attributes.href.value;
      var dateText = row.children[3].innerText;
      var date = UTILS.getDateFromString(dateText, 'short');
      var button = getEnterButton(iframeDoc, 'td', id, permissionLink, date, profile.userLink, false);

      row.appendChild(button);
    }
  }

}

function addConferenceLinkToAudience() {
  if (hasXHRError) {
    return;
  }

  var iframeDoc = getInnerFrame();
  var profile = USER.getProfile(iframeDoc);

  if (!iframeDoc) {
    return;
  }

  var processTitle = $('#processoForm h3, #recursoForm h3', iframeDoc)[0];
  var processNumber = null;

  if (processTitle) {
    var processText = /(\w+)\s+([^ ]+)\s*.*/.exec(processTitle.innerText);
    processNumber = processText && processText[2];
  } else {
    return;
  }

  var id = processNumber.trim();
  var permissionLink = iframeDoc.location;
  if (permissionLink) {
    permissionLink = permissionLink.pathname + permissionLink.search;
  }

  // Try agenda links
  var links = $('td:contains("Agendada para: ")', iframeDoc);

  for (var link of links) {

    var dateText = link.innerText.trim();
    var date = UTILS.getDateFromString(dateText, 'schedule');
    var dateUTC = date ? date.getTime() : '';

    var result = $("[data-date='"+dateUTC+"']", iframeDoc)[0];
    if (result) {
      continue;
    }

    var button = getEnterButton(iframeDoc, 'tr', id, permissionLink, date, profile.userLink, true);

    if (button.innerHTML === STRINGS.enterEmpty) {
      continue;
    }

    button.setAttribute('data-date', dateUTC);

    // Remove empty td elements before last useful td with text
    var elem = $("#informacoesProcessuais td:visible", iframeDoc).last()[0];
    while (elem.innerText === '') {
      elem.remove();
      elem = $("#informacoesProcessuais td:visible", iframeDoc).last()[0];
    }

    // Fix td style
    $(elem).removeAttr('colspan');

    var prefix = STRINGS.conferencePrefix + ' ' + UTILS.getFormattedDate(date, '/') + ' ' + UTILS.getTimeFromDate(date, ':');

    button.innerHTML = '<td class="labelRadio"><label>' + prefix + ':</label></td> <td>' + button.innerHTML + '</td>';

    insertAfter(button, elem.parentElement);
  }

  if (result) {
    return;
  }

  // Try to get links inside analyst square
  links = $('td:contains("Audiência ")', iframeDoc);

  for (var link of links) {

    var dateText = link.innerText.trim();
    var date = UTILS.getDateFromString(dateText, 'audience');
    var dateUTC = date ? date.getTime() : '';

    var result = $("[data-date='"+dateUTC+"']", iframeDoc)[0];
    if (result) {
      continue;
    }

    var button = getEnterButton(iframeDoc, 'tr', id, permissionLink, date, profile.userLink, true);

    if (button.innerHTML === STRINGS.enterEmpty) {
      continue;
    }

    button.setAttribute('data-date', dateUTC);

    // Remove empty td elements before last useful td with text
    var elem = $("#informacoesProcessuais td", iframeDoc).last()[0];
    while (elem.innerText === '') {
      elem.remove();
      elem = $("#informacoesProcessuais td", iframeDoc).last()[0];
    }

    // Fix td style
    $(elem).removeAttr('colspan');

    var prefix = STRINGS.conferencePrefix + ' ' + UTILS.getFormattedDate(date, '/') + ' ' + UTILS.getTimeFromDate(date, ':');

    button.innerHTML = '<td class="labelRadio"><label>' + prefix + ':</label></td> <td>' + button.innerHTML + '</td>';

    insertAfter(button, elem.parentElement);
  }
}

function addRecordingsToDocument() {
  if (hasXHRError) {
    return;
  }

  clearRecordingUI();

  var iframeDoc = getInnerFrame();
  var profile = USER.getProfile(iframeDoc);

  if (!iframeDoc) {
    return;
  }

  var processTitle = $('div.tjpr_title', iframeDoc)[0];
  var processNumber = null;

  if (processTitle) {
    var processText = /(\w+)\s+([^ ]+)\s*.*/.exec(processTitle.innerText);
    processNumber = processText && processText[2];
  } else {
    return;
  }

  if (!processNumber) {
    return;
  }

  var formFrame = $('iframe', iframeDoc)[0];
  var formDocument = formFrame && formFrame.contentDocument;

  if (recordings && recordings.length) {
    renderRecordingUI();
  }

  if (!formDocument || !processNumber) {
    return;
  }

  if (recordings && recordings.length) {
    showRecordingPresentAlert(formDocument);

    if (!activatedForm) {
      setupRecordingForm(formDocument);
    }

    return;
  } else if (recordings) {
    return;
  }

  var documentPresent = $('a[href*="/projudi/upload.do?_tj="]:not(#linkMatchTipoArquivo)', formDocument)[0];

  if (documentPresent) {
    return;
  }

  if (failedXHRs >= maxFailedXHRs) {
    indicateXHRError(iframeDoc);
    return;
  }

  getRecordingsFromAPI(profile, processNumber);
}

function getRecordingsFromAPI(profile, processNumber) {
  var url = API.getRecordingsProcessLink(processNumber, profile.userLink);

  if (doingXHR) {
    return;
  }

  doingXHR = true;

  $.ajax({
    url: url,
    success: function (result) {
      doingXHR = false;
      failedXHRs = 0;

      if (result && !result.length) {
        console.log("No recording present for '" + processNumber + "'");
        recordings = [];
      } else {
        console.log("Got recording");
        recordings = result;
      }
    },
    error: function(result) {
      doingXHR = false;
      failedXHRs += 1;

      console.log("Got error ", result);
    },
    async: true
  });
}

function setupRecordingForm(formDocument) {
  var form = $('#fileUploadForm', formDocument)[0];
  var ckeEditor = $('#cke_conteudoEditor', form)[0];
  var textarea = $('#conteudoEditor', form)[0];
  var editorFrame = $('iframe', ckeEditor)[0];
  var editor = editorFrame ? editorFrame.contentDocument : null;

  var makeLink = function(url) {
    return '<a style="font-size: 13px;" href="' + url + '" target="_blank">' + url + '</a>';
  };

  if (recordingLink && recordingLink.length && form && ckeEditor && editorFrame && editor) {
    $(form).submit(function() {

      var body = $('body', editor)[0];
      var text = body.innerHTML;
      text = text.replace(/\$enderecoGravacao/, makeLink(recordingLink));
      textarea.value = text;

      return true;
    });
    activatedForm = true;
  }

}

function updateSelectedRecording() {
  var frame = getInnerFrame();

  // Reset background color of each
  $(".recordingClickable", frame).each(function (e) {
    $(this)[0].style["background-color"] = null;
    $(this)[0].id = "";

    if ($(this).find('a[href="' + recordingLink + '"]')[0]) {
      $(this)[0].style["background-color"] = COLORS.selectedRecording;
      $(this)[0].id = 'selectedRecording';
    }
  });

}

function clearRecordingUI() {
  var frame = getInnerFrame();

  var formFrame = $('iframe', frame)[0];
  var formDocument = formFrame && formFrame.contentDocument;

  // Clear recordings when we're not in the audience screen and/or modal or we already included a document
  var processTitle = $('#processoForm h3, #recursoForm h3', frame)[0];
  var processTitleModal = $('div.tjpr_title', frame)[0];
  var documentPresent = $('a[href*="/projudi/upload.do?_tj="]:not(#linkMatchTipoArquivo)', formDocument)[0];
  if ((!processTitleModal && !processTitle) || documentPresent) {
    resetRecordings();

    $("#warningMessages", formDocument).remove();
    $("#recordingUI", frame).remove();
  }
}

function renderRecordingUI() {
  var frame = getInnerFrame();

  if (!frame || !recordings || $('#recordingUI', frame)[0]) {
    return;
  }

  var result = "";
  var elem = frame.createElement('div');
  elem.id = "recordingUI";

  var container = frame.createElement('div');
  container.id = "recordingContainer";

  elem.style["font-size"] = '12px';
  elem.style["font-family"] = 'Verdana, Arial, Helvetica, sans-serif';
  elem.style["background-color"] = COLORS.recordingsBackground;
  elem.style["z-index"] = '100';
  elem.style["overflow-y"] = 'scroll';
  elem.style.position = 'absolute';
  elem.style.top = '0';
  elem.style.right = '0';
  elem.style.height = '100%';

  container.style["word-break"] =  'break-all';
  container.style["text-align"] = 'justify';
  container.style.height = 'auto';

  var title = frame.createElement('h3');
  title.appendChild(frame.createTextNode(STRINGS.recordingsTitle));
  title.style["font-weight"] = 'bold';
  title.style["border-bottom"] = '1px dotted ' + COLORS.recordingsTitleBorder;
  title.style.color = COLORS.recordingsTitle;
  title.style.padding = '5px 0 5px 15px';

  elem.appendChild(title);

  for(var i = recordings.length; i--;) {
    if (recordings[i].published) {
      var rec = recordings[i];
      result +='<div class="recordingClickable" style="padding: 20px;">';
      result += '<p style="padding-bottom: 5px;"> <strong>' + STRINGS.recordingsItemName + (recordings.length - i) + ' </strong> </p>';
      result += '<p> <strong>' + STRINGS.recordingsItemStartTime + ': </strong>' + UTILS.intToDate(rec.startTime) + '</p>';
      result += '<p> <strong>' + STRINGS.recordingsItemDuration + ': </strong>' + UTILS.minutesToDuration(rec.length) + '</p>';
      result += '<p style="padding-bottom: 16px;"> <strong>' + STRINGS.recordingsItemSize + ': </strong>' + UTILS.bytesToSize(rec.size) + '</p>';
      result += '<a style="color: ' + COLORS.recordingsLink + ';" target="_blank" href="' + rec.transcriptionUrl + '">' + STRINGS.recordingsTranscriptionLink + '</a>';
      result += '<p><strong><a style="color:' + COLORS.recordingsLink + ';" class="includeRecording" href="' + rec.transcriptionUrl + '">' + STRINGS.recordingsItemSelect + '</a></strong></p>';
      result +='</div>';
      result += '<hr />';
    }
  }

  result += '</div>';

  container.innerHTML = result;

  elem.appendChild(container);

  frame.getElementsByTagName('body')[0].appendChild(elem);

  $('.includeRecording', frame).on('click', function(e) {
    e.preventDefault();

    recordingLink = $(this).attr('href');

    console.log("Set recording link: ", recordingLink);

    updateSelectedRecording();
  });

}

function renderRecordingsFieldset(iframeDoc) {
  if ($('#recordingFieldSet', iframeDoc)[0]) {
    return;
  }

  var firstPart = $('#informacoesProcessuais, fieldset table.form', iframeDoc)[0];

  var result = '';

  for(var i = recordings.length; i--;) {
    if (recordings[i].published) {
      var rec = recordings[i];
      result +='<div class="recordingDisplay" style="margin: 10px; display: inline; float: left;">';
      result += '<p style="padding-bottom: 5px;"> <strong>' + STRINGS.recordingsItemName + (recordings.length - i) + ' </strong> </p>';
      result += '<p> <strong>' + STRINGS.recordingsItemStartTime + ': </strong>' + UTILS.intToDate(rec.startTime) + '</p>';
      result += '<p> <strong>' + STRINGS.recordingsItemDuration + ': </strong>' + UTILS.minutesToDuration(rec.length) + '</p>';
      result += '<p style="padding-bottom: 16px;"> <strong>' + STRINGS.recordingsItemSize + ': </strong>' + UTILS.bytesToSize(rec.size) + '</p>';
      result += '<a style="color: ' + COLORS.recordingsLink + ';" target="_blank" href="' + rec.transcriptionUrl + '">' + STRINGS.recordingsTranscriptionLink + '</a>';
      result +='</div>';
    }
  }

  var internal = '\
    <legend style="color: #63735F; font-family: Verdana, Arial, Helvetica, Sans-Serif; font-size: 1.5em; font-weight: bold;">\
      <table style="width: auto;" title="Recordings">\
        <tbody>\
          <tr>\
            <td>' + STRINGS.recordingsFieldSet + '</td>\
          </tr>\
        </tbody>\
      </table>\
    </legend>\
    <div id="recordingList" style="overflow: scroll; max-height: 22em; overflow-y: auto; overflow-x: auto;"> <div id="">' + result + '</div></div>';

  var elem = iframeDoc.createElement('fieldset');
  elem.id = "recordingFieldSet";
  elem.style.border = '1px solid #3E4034';
  elem.style['margin-bottom'] = '10px';
  elem.style['margin-top'] = '20px';

  elem.innerHTML = internal;

  insertAfter(elem, firstPart);
}

function addRecordingsToAudience() {
  if (hasXHRError) {
    return;
  }

  var iframeDoc = getInnerFrame();
  var profile = USER.getProfile(iframeDoc);

  if (!iframeDoc) {
    return;
  }

  var processTitle = $('#processoForm h3, #recursoForm h3', iframeDoc)[0];
  var processNumber = null;

  if (processTitle) {
    var processText = /(\w+)\s+([^ ]+)\s*.*/.exec(processTitle.innerText);
    processNumber = processText && processText[2];
  } else {
    return;
  }

  if (recordings && recordings.length) {
    renderRecordingsFieldset(iframeDoc);
    return;
  } else if (recordings) {
    return;
  }

  if (!processNumber) {
    return;
  }

  getRecordingsFromAPI(profile, processNumber);
}

function authenticateUserProfile() {
  var dontAuth = ['/projudi/scriba/guest'];
  if (hasXHRError) {
    return;
  }

  var location = window.location.pathname;

  if (dontAuth.includes(location)) {
    return;
  }

  var iframeDoc = getInnerFrame();
  var profile = USER.getProfile(iframeDoc);

  if (!iframeDoc) {
    return;
  }

  if (failedXHRs >= maxFailedXHRs) {
    indicateXHRError(iframeDoc);
    return;
  }

  if (!profile) {
    return;
  }

  if (profileAuth && profile.tribunal == currentTribunal) {
    return;
  }

  if (doingXHR) {
    return;
  }

  var url = API.getAuthProfileLink();

  doingXHR = true;

  var version = extensionVersion();

  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      userLink: profile.userLink,
      profile: profile,
      extensionVersion: version
    }),
    success: function (result) {
      doingXHR = false;
      failedXHRs = 0;
      profileAuth = true;
      currentTribunal = profile.tribunal;

      console.log("Auth profile for ", profile, "Extension version: ", version);
    },
    error: function(result) {
      doingXHR = false;
      failedXHRs += 1;

      console.log("Auth profile error ", result);
    },
    async: true
  });

}

$(document).ready(function() {
  setInterval(addRecordingsToDocument, 500);
  setInterval(addConferenceLinks, 500);
  setInterval(addConferenceLinkToAudience, 500);
  setInterval(addRecordingsToAudience, 500);
  setInterval(authenticateUserProfile, 2000);
});
