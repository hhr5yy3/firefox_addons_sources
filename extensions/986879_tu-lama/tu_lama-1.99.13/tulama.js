/* 
  TU lAma - let Alma be more adroit

  content script
 
  Copyright (C) 2019 Leo Zachl, Technische Universität Wien, Bibliothek

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

var toastdiv;
var deltoast;
var isTuw = false;
var isObv = false;
var settings = {};
var wcols = ['#ffffff','#008000','#000080','#808000','#c43e00','#E00009'];

function debug(msg,level = 1){
 try {
  return new Promise(function(resolv, reject){
    if (!!settings.debugLevel && settings.debugLevel >= level || level == 0){
      let iframe = newMde?'nMDE':(newMDEWrapper?'mdeW':(mde?'oMDE':(newLayout?'nLay':'oLay')));
      if (typeof msg === 'string')
        resolv(iframe+': '+msg);
      else if (typeof msg === 'object'){
        msg = {iFrame: iframe, obj: msg};
        resolv(msg);
      }
    }
  });
 } catch(e) { console.log(e); resolv(msg); }
}

function hashCode(s) {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  if (h < 0) h = -h;
  return h.toString(16);
}

function toast(msg='', col='#eee', sek=10){
  // message am unteren rand ~10 sec lang, col als hintergrund
  // einmal drauf clicken: nachricht beliebt stehen
  // ein zweitesmal drauf clicken: nachricht wird entfernt.
  if (toastdiv == undefined){
    toastdiv = $("<div id='tu_lAma_toast' style='position: fixed; width: 100%; bottom: 0; display: flex; z-index: 1000; '></div>");
    $('body').append(toastdiv);
  }
  let msgId = 'msg_'+hashCode(msg);
  if (!!msg && (toastdiv.find('#'+msgId).length == 0 || toastdiv.find('div').filter(function(i,div){return div.innerHTML == msg}).length == 0)){

    var toastobj = $(`<div id='${msgId}' style='display: none; background: ${col}; padding: 5px 5px 5px 20px; flex-grow: 1; '>${msg}</div>`);
    toastdiv.append(toastobj);
    toastobj.fadeIn(1000).delay(sek*1000).fadeOut(1000);
    var deltoast = setTimeout(function(){
      toastobj.remove();
    }, sek*1000);
    toastobj.click(function(){
      clearTimeout(deltoast);
      toastobj.stop(true).show().click(function(){ toastobj.remove();});
    });
  }
}

function search_items(){
  var title = $('#MarcEditorView\\.title:contains(Bestand), #MarcEditorView\\.title:contains(Holding)');
  if (title.length == 0){
    title = $('#MarcEditorView\\.title:contains(Bibliografisch), #MarcEditorView\\.title:contains(Bibliographic)');
  }
  if (title.length == 1){
    var idre = /\((\d*)\)/;
    var match = idre.exec(title.text());
    if (match && match[1] != ''){
      debug(match[1],2).then(function(m){console.log(m)});
      browser.runtime.sendMessage({action: "search", what: "ITEM", id: match[1]});
    }
  } else {
    return false;
  }
}

function setSimpleSearchKey(keyStr){
  var label = findSimpleSearchKeyLabel(keyStr);
  if(keyStr && label){
    setSimpleSearchKeyAndLabel(keyStr, label);
  }
}

function setSimpleSearchKeyAndLabel(searchKey, searchLabel){
  $('#simpleSearchKey').val(searchKey);
  $('#simpleSearchKeyDisplay').html(searchLabel);
  $('#simpleSearchKey').change();
  $('#simpleSearchKeyDisplay').parent('button').attr("title",searchLabel);
}

function findSimpleSearchKeyLabel(keyStr){
  var label;
  $('.simpleSearchKeys').each(function(){
     var searchKey = $(this).data("search-key");
     var searchLabel = $(this).data("search-label");
     if(searchKey === keyStr) label= searchLabel;
     return;
  });
  return label;
}

var invoiceNR = false;

function addSaveInvoiceAndGotoReceive(){

  if ($('#PAGE_BUTTONS_save_and_continue').length == 1){
    let buttontext = ($('html').attr('lang') == 'de')?'Speichern und Eingang':'Save and Receive';
    $('#breadcrumbs .btnWrapper').prepend('<div class="pull-right marLeft10"> <button class="btn btn-warning jsBlockScreen" id="PAGE_BUTTONS_save_and_receive" title="">' + buttontext + '</button></div>');
    $('#PAGE_BUTTONS_save_and_receive').click(function(){
      invoiceNR = $('#pageBeaninvoiceinvoiceNumber').val();
      if (!invoiceNR) invoiceNR = $('span#pageBeaninvoiceinvoiceNumber').text();
      $('#PAGE_BUTTONS_save_and_continue').click();
      return false;
    });
  }
}

function gotoReceive(invoiceNR){
  $('#menu_button_comexlibrisdpswrkgeneralmenuAcquisition button').get(0).click();
  setTimeout(function(){
    $('#MENU_LINK_ID_comexlibrisdpswrkgeneralmenuAcquisitionPOLinesReceiveNewMarterial').get(0).click();
    setTimeout(function(){
      $('#menu_button_comexlibrisdpswrkgeneralmenuAcquisition button').get(0).click();
    },500);
  },500);
}

function addRecordViewLinks(){
  try{
    let isHolding = ($('#pageBeanRegistryType').text() == 'marc21_holding');
    if (!settings.addLinks){
      debug('add links',2).then(function(m){console.log(m)});
      var backButton = $('#PAGE_BUTTONS_cbuttonback').parent();
      if (backButton.length > 0){
        var mms_id = $('#pageBeanmmsId').text();
        if ($('#PAGE_BUTTONS_cbuttonitems').length == 0){
          var itemsButton = $('<div class="pull-right marLeft10 "> <button type="submit" class="btn btn-secondary jsBlockScreen  jsToolTipDelayed" id="PAGE_BUTTONS_cbuttonitems" title="' + browser.i18n.getMessage('physicalItems') + '" value="' + browser.i18n.getMessage('physicalItems') + '" name="page.buttons.operation">' + browser.i18n.getMessage('physicalItems') + '</button></div>');
          backButton.before(itemsButton);
          itemsButton.on('click',function(){
            browser.runtime.sendMessage({
              action: 'search',
              what: 'ITEM',
              id: mms_id
            });
            return false;
          });
        }
        if (isHolding){
          if ($('#PAGE_BUTTONS_cbuttonbibmms').length == 0){
            var bibButton = $('<div class="pull-right marLeft10 "> <button type="submit" class="btn btn-secondary jsBlockScreen  jsToolTipDelayed" id="PAGE_BUTTONS_cbuttonbibmms" title="' + browser.i18n.getMessage('bib_mms') + '" value="' + browser.i18n.getMessage('bib_mms') + '" name="page.buttons.operation">' + browser.i18n.getMessage('bib_mms') + '</button></div>');
            backButton.before(bibButton);
            bibButton.on('click',function(){
              browser.runtime.sendMessage({
                action: 'search',
                what: 'BIB_MMS',
                id: mms_id
              });
              return false;
            });
          }
        } else {
          if ($('#PAGE_BUTTONS_cbuttonholdings').length == 0){
            var holButton = $('<div class="pull-right marLeft10 "> <button type="submit" class="btn btn-secondary jsBlockScreen  jsToolTipDelayed" id="PAGE_BUTTONS_cbuttonholdings" title="' + browser.i18n.getMessage('holding') + '" value="' + browser.i18n.getMessage('holding') + '" name="page.buttons.operation">' + browser.i18n.getMessage('holding') + '</button></div>');
            backButton.before(holButton);
            holButton.on('click',function(){
              browser.runtime.sendMessage({
                action: 'search',
                what: 'IEP',
                id: mms_id
              });
              return false;
            });
          }
        }
      }
    }
    if (!isHolding && !!settings.addPortfolio && $('#PAGE_BUTTONS_cbuttonAddPf').length == 0){
      var addPfButton = $('<div class="pull-right marLeft10 "> <button type="submit" class="btn btn-secondary jsBlockScreen  jsToolTipDelayed" id="PAGE_BUTTONS_cbuttonAddPf" title="' + browser.i18n.getMessage('addPf') + '" value="' + browser.i18n.getMessage('addPf') + '" name="page.buttons.operation">' + browser.i18n.getMessage('addPf') + '</button></div>');
      backButton.before(addPfButton);
      addPfButton.on('click',function(){
        var f856 = $("span[id$='_COL_tag']:contains(856)").closest('tr').find("[id$='_COL_value']:contains(Resolving-System)");
        if (f856.length == 0)
          f856 = $("span[id$='_COL_tag']:contains(856)").closest('tr').find("[id$='_COL_value']:contains(Volltext):contains(text/html)");
        if (f856.length == 0)
          f856 = $("span[id$='_COL_tag']:contains(856)").closest('tr').find("[id$='_COL_value']:contains(Volltext)");
        var link = f856.find('a').get(0).href;
        if (f856.text()[0] != '4' || !link)
          link = '';
        window.location.href = '/ng/page;u=%2Frep%2Faction%2FpageAction.ecreation.eresource_creation.xml.do%3FxmlFileName%3Decreation.eresource_creation.xml&pageViewMode%3DEdit&operation%3DLOAD&pageBean.mmsId%3D'
          + $('#pageBeanmmsId').text()+'&pageBean.portfolioCreationType%3DUSE_EXISTING&RenewBean%3Dtrue&pageBean.currentUrl%3D&pageViewMode%3DEdit&operation%3DLOAD&pageBean.mmsId%3D'
          + $('#pageBeanmmsId').text()+'%26pageBean.portfolioCreationType%3DUSE_EXISTING%26RenewBean%3Dtrue%26pageBean.currentUrl%3D%26pageBean.electronicMaterialType%3DBOOK%26pageBean.url%3D'
          + encodeURIComponent(link);
        return false;
      });
    }
  } catch(err){
    console.log(err)
  }
}

function gotoFirstEmpty(){
  if (!settings.goto001 && $(document.activeElement).closest('tr').find('[id^="MarcEditorPresenter.textArea.LDR"]').length > 0){
    $("[id^='MarcEditorPresenter.textArea.001'] textarea").eq(0).click().focus();
  }
  if (!settings.goto1stEmpty && $("[id^='FieldTagBox.tag.LDR']").length > 0){
    var firstEmpty = $("input[id^='FieldTagBox.tag..']");
    if (firstEmpty.length == 0){
      firstEmpty = $("div[id^='MarcEditorPresenter.textArea'] textarea").filter(function(){
        if (this.value.trim() == '$$a' || this.value.trim() == ''){
          if (!this.closest("[id^='MarcEditorPresenter.textArea']").id.startsWith('MarcEditorPresenter.textArea.00'))
            this.value = '$$a ';
          return true;
        } else {
          return false;
        }
      });
    }
    debug(firstEmpty,2).then(function(m){console.log(m)});
    if (firstEmpty.length > 0){
      firstEmpty.eq(0).click().focus();
      firstEmpty.get(0).scrollIntoView(true);
    }
  }
}

var ce = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "e", charCode :0, keyCode: 69, ctrlKey : true});

var click = document.createEvent('HTMLEvents');
click.initEvent('click', true, true);

var change = document.createEvent('HTMLEvents');
change.initEvent('keyup', false, true);

var change1 = document.createEvent('HTMLEvents');
change1.initEvent('change', false, true);

var input = document.createEvent('HTMLEvents');
input.initEvent('input', false, true);

function load_template(templateName){
  // MDE erweitern aus vorlage
  if (!!templateName && $("[id^='FieldTagBox.tag.LDR']").length > 0){
    if (newMde || newMDEWrapper){
      browser.runtime.sendMessage({action: "loadMdeTemplate"});
    } else {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.removedNodes.length >= 1 && $(mutation.removedNodes).find('#MdEditor\\.PopupMsg\\.LOADING').length >= 1){
            var option = $("div.gwt-DialogBox select.gwt-ListBox option:contains(" + templateName + ")");
            if (option.length > 0){
              option.prop('selected',true).trigger('change');
              $("div.gwt-DialogBox button:contains('Ok')").get(0).dispatchEvent(click);
            }
          }
        });
      });
      observer.observe($('body').get(0),{childList:true,subtree:false});
      obstimer = setTimeout(function(){
        debug('load template observer timed out!').then(function(m){console.log(m)});
        observer.disconnect();
      },30000);
    }
    document.dispatchEvent(ce);
  }
}

var konksuche = '';
var activeAutoCompleteTarget = false;
var ksStarted = false;

function keyscan( event ) {

  function getKeywords(){
    var selection = new Array;
    $("div[id^='MarcEditorPresenter.textArea']")
        .filter('[id*="a.600"],[id*="a.610"],[id*="a.611"],[id*="a.630"],[id*="a.650"],[id*="a.653"],[id*="a.655"],[id*="a.689"]')
        .find('textarea').each(function(i,v){
      if (match = $(v).val().match(/\$\$a (.*?)( \$\$|$)/))
        if (match[1].trim() != '')
          selection.push(match[1]);
    });
    let sel = [...new Set(selection)].join('* ')+'*';
    if (sel != '*') return sel; else return '';
  }

  function mkKonkDiv(acConfig){
    let konkinput = $('<div id="lAmaKonkDiv"><textarea id="lAmaKonkInput"/><button id="closelAmaKonkInput">x</button></div>');
    $('body').append(konkinput);
    act = konkinput.find('#lAmaKonkInput');
    konkinput.find('button').on('click',function(){
      if (act.autocomplete("instance") != undefined)
        act.autocomplete("destroy");
      activeAutoCompleteTarget = act = false;
      konkinput.remove();
      konksuche = '';
    });
    act.autocomplete(acConfig).close = function(e){
      this.cancelSearch = !0,
      this._close(t);
    };
    act.autocomplete('option',{delay: 50000});
    act.focus();
  }

  function isbn_suche(){
    var isbns = new Array;
    var isbn020 = $("div[id^='MarcEditorPresenter.textArea.020'] textarea");
    var isbn7xx = $("div[id^='MarcEditorPresenter.textArea']")
        .filter('[id*="a.765"],[id*="a.767"],[id*="a.770"],[id*="a.772"],[id*="a.773"],[id*="a.774"],[id*="a.775"],[id*="a.776"],[id*="a.777"],[id*="a.780"],[id*="a.785"],[id*="a.786"],[id*="a.787"]')
        .find('textarea');
    debug(isbn020,2).then(function(m){console.log(m)});
    debug(isbn7xx,2).then(function(m){console.log(m)});
    isbn020.each(function(i,ta){
      var isbn = ta.value.match(/\$\$[az] *([0-9X\-]{10,}) *(\$\$.*)?$/);
      if (isbn){
        isbns.push(isbn[1].replace('-',''));
      }
      debug(isbn,2).then(function(m){console.log(m)});
      debug(ta.value,2).then(function(m){console.log(m)});
    });
    isbn7xx.each(function(i,ta){
      var isbn = ta.value.match(/\$\$z *([0-9X\-]{10,}) *(\$\$.*)?$/);
      if (isbn){
        isbns.push(isbn[1].replace('-',''));
      }
      debug(isbn,2).then(function(m){console.log(m)});
      debug(ta.value,2).then(function(m){console.log(m)});
    });
    ksStarted = true;
    if (isbns.length > 0)
      act.autocomplete('search',isbns.join(','));
    else {
      act.autocomplete('search','dasistkeineisbnnummer');
      browser.runtime.sendMessage({
        action: "toast",
        message: "keine ISBNs zur Konkordanzsuche vorhanden, suche nur nach Titel ",
        color: '#ffff8f',
        duration: 20
      });
    }
  }

  debug( event, 3).then(function(m){console.log(m)});
  debug(activeAutoCompleteTarget,5).then(function(m){console.log(m)});
  let strgAlt = (event.altKey || event.metaKey) && event.ctrlKey;
  var act = (!!activeAutoCompleteTarget)?activeAutoCompleteTarget:$(event.target);
  var aci = act.autocomplete("instance");
  debug(aci,5).then(function(m){console.log(m)});
  if (aci == undefined)
    acwv = undefined
  else
    try {
      acwv = act.autocomplete('widget').is(':visible');
    } catch (e){ acwv = undefined }
  if (event.type == "keydown" && !!acwv && aci.menu.element.is(':visible')){
    switch( event.keyCode ){
      case $.ui.keyCode.LEFT:
        // debug( "left" ).then(function(m){console.log(m)});
        break;
      case $.ui.keyCode.RIGHT:
        // debug( "right" ).then(function(m){console.log(m)});
        break;
      case $.ui.keyCode.UP:
        // up und down zum autocomplete umlenken
        event.stopPropagation();
        event.preventDefault();
        if (event.type == "keydown") aci._keyEvent('previous', event);
        return false;
        break;
      case $.ui.keyCode.DOWN:
        // debug( "down" ).then(function(m){console.log(m)});
        event.stopImmediatePropagation();
        event.preventDefault();
        if (event.type == "keydown") aci._keyEvent('next', event);
        return false;
        break;
      case $.ui.keyCode.ENTER:
      case $.ui.keyCode.TAB:
        aci.menu.active && (event.type == "keydown", aci.menu.select(event), event.stopPropagation(), event.preventDefault());
        return false;
        break;
      case $.ui.keyCode.ESCAPE:
        event.target.dataset.selectedItem = '';
        aci.option("keepOpen",false);
        aci._value(aci.term);
        aci.close(event);
        event.stopPropagation();
        event.preventDefault();
        return false;
        break;
    }
  } else if (event.type == "keydown" && !acwv && event.keyCode == $.ui.keyCode.ESCAPE && $('#closelAmaKonkInput').length > 0){
    $('#closelAmaKonkInput').click();
  } else if (event.type == "keydown" && !acwv && (event.keyCode == $.ui.keyCode.ENTER || event.keyCode == $.ui.keyCode.RIGHT || event.code == "ControlRight" || event.code == "OSRight") && $('#closelAmaKonkInput').length > 0){
    ksStarted = true;
    act.autocomplete('search');
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  if (event.type == "keydown" && event.keyCode == 84 && strgAlt){
    load_template(settings.templateName);
  } else if (event.type == "keydown" &&
    ( event.keyCode == 83 && event.ctrlKey       // save (draft)
      || event.keyCode == 73 && !event.ctrlKey && (event.altKey || event.metaKey)   // new item
      || event.keyCode == 82 && event.ctrlKey && (event.altKey || event.metaKey))){ // save and release
    check852c();
  } else if (mde && event.keyCode == 89 && strgAlt){
    event.stopPropagation();
    event.preventDefault();
    if (event.type == "keydown"){
      createDiff();
    }
  } else if (diffdiv && event.keyCode == 27 && event.type == "keydown"){
    diffdiv.remove();
    diffdiff = false;
  } else if (mde && event.type == "keydown" && ((!!settings.gndUrl || !!settings.lobidUrl) && event.target.parentNode != undefined
    && ($(event.target).closest("tr").filter("tr:has([id^='MarcEditorPresenter.textArea.971'])").filter(function(){
      let ind1 = $(this).find("[id^='FieldIndicatorBox.tag.971'][id$='.1']").val();
      return ind1 == "0" || ind1 == "1" || ind1 == "2";
    }).length > 0 
    || !!settings.creatorAC && $(event.target).closest("tr").filter("tr:has([id^='MarcEditorPresenter.textArea.100'],[id^='MarcEditorPresenter.textArea.700'])").filter(function(){
      let ind1 = $(this).find("[id^='FieldIndicatorBox.tag'][id$='.1']").val();
      return ind1 == "0" || ind1 == "1" || ind1 == "2";
    }).length > 0)
    || isTuw && event.target.parentNode != undefined && $(event.target).closest("tr").filter("tr:has([id^='MarcEditorPresenter.textArea.971'])").filter(function(){
      let ind1 = $(this).find("[id^='FieldIndicatorBox.tag.971'][id$='.1']").val();
      return ind1 == "5";
    }).length > 0)){
    switch( event.keyCode ){
      case $.ui.keyCode.LEFT:
        break;
      case 17: // CONTROL
      case 224: // Mac CMD-Right
        if (!acwv && (event.code == "ControlRight" || event.code == "OSRight")){
          act.autocomplete('search');
          event.stopPropagation();
          event.preventDefault();
        }
        break;
      case $.ui.keyCode.RIGHT:
        // debug( "right" ).then(function(m){console.log(m)});
        break;
      case $.ui.keyCode.UP:
        if (acwv){
          // up und down zum autocomplete umlenken
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown") aci._keyEvent('previous', event);
          return false;
        }
        break;
      case $.ui.keyCode.DOWN:
        if (acwv){
          // debug( "down" ).then(function(m){console.log(m)});
          event.stopImmediatePropagation();
          event.preventDefault();
          if (event.type == "keydown") aci._keyEvent('next', event);
          return false;
        }
        break;
      case $.ui.keyCode.ENTER:
      case $.ui.keyCode.TAB:
        aci.menu.active && (event.type == "keydown", aci.menu.select(event), event.stopPropagation(), event.preventDefault());
        break;
/*      case $.ui.keyCode.ESCAPE:
        aci.menu.element.is(':visible') && (aci.isMultiLine || aci._value(aci.term), aci.close(event), event.stopPropagation(), event.preventDefault());
        break; */
    }
  } else if (mde && isTuw && !!settings.tuwsysUrl
    && (event.target.nodeName == "TEXTAREA" && event.target.parentNode != undefined && $(event.target).closest('[id^="MarcEditorPresenter.textArea"]').length > 0
    && $(event.target).closest('[id^="MarcEditorPresenter.textArea"]').attr('id').startsWith('MarcEditorPresenter.textArea.983') || ['i','k'].includes(konksuche))){
    switch( event.keyCode ) {
      case $.ui.keyCode.UP:
        if (acwv){
          // up und down zum autocomplete umlenken
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown") aci._keyEvent('previous', event);
          return false;
        }
        break;
      case $.ui.keyCode.DOWN:
        if (acwv){
          // debug( "down" ).then(function(m){console.log(m)});
          event.stopImmediatePropagation();
          event.preventDefault();
          if (event.type == "keydown") aci._keyEvent('next', event);
          return false;
        }
        break;
      case $.ui.keyCode.LEFT:
        break;
      case $.ui.keyCode.RIGHT:
        break;
      case 17:
      case 224:
        if (event.code != "ControlRight" && event.code != "OSRight")
          break;
      case $.ui.keyCode.ENTER:
        if (ksStarted)
          ksStarted = false;
        else if (!aci.menu.active){
          act.autocomplete('search');
          event.stopPropagation();
          event.preventDefault();
        }
      case $.ui.keyCode.TAB:
        aci.menu.active && (event.type == "keydown", aci.menu.select(event), event.stopPropagation(), event.preventDefault());
        break;
      case 68:
      case $.ui.keyCode.BACKSPACE:
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown"){
            $(event.target).val('$$a ');
            $(event.target).trigger('change');
            $(event.target).autocomplete('search',$(event.target).val());
          }
        }
        break;
      case 71: // Ctrl-Alt-G Geographikum
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown"){
            var loc = act.val().match(/(.*?)\$\$g *(.*?) *(\$\$.*)?$/);
            if (!loc){
              act.val(act.val().trim() + ' $$g ');
            } else {
              if (loc[3] == undefined)
                act.val(loc[1] + '$$g ');
              else
                act.val(loc[1] + loc[3] + ' $$g ');
            }
            act.trigger('change');
            act.autocomplete('search',act.val());
          }
        }
        break;
      case 65: // Ctrl-Alt-A Sprachcode
      case 76: // Ctrl-Alt-L Sprachcode von linked data belegt...
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown" && event.keyCode==76 || event.type == "keyup" && event.keyCode==65){
            var lang = act.val().match(/(.*?)\$\$s *(.*?) *(\$\$.*)?$/);
            // debug(lang).then(function(m){console.log(m)});
            // debug(act.val().substr(4,7)).then(function(m){console.log(m)});
            if (!lang){
              act.val(act.val().trim() + ' $$s ');
            } else {
              if (lang[3] == undefined)
                if (act.val().substr(4,7) == 'ALL:001')
                  act.val(lang[1] + ' $$s ' + lang[2] + ' $$s ');
                else
                  act.val(lang[1] + '$$s ');
              else
                if (act.val().substr(4,7) == 'ALL:001')
                  act.val(lang[1] + lang[3] + ' $$s ' + lang[2] + ' $$s ');
                else
                  act.val(lang[1] + lang[3] + ' $$s ');
            }
            act.trigger('change');
            act.autocomplete('search',act.val());
          }
        }
        break;
      case 77: // Ctrl-Alt-M Ortskürzel -> µ darum mit Shift oder:
      case 192: // Ctrl-Alt-Ö Ortskürzel unter Linux
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown"){
            var lang = act.val().match(/(.*?)\$\$o *(.*?) *(\$\$.*)?$/);
            if (!lang){
              act.val(act.val().trim() + ' $$o ');
            } else {
              if (lang[3] == undefined)
                act.val(lang[1] + '$$o ');
              else
                act.val(lang[1] + lang[3] + ' $$o ');
            }
            act.trigger('change');
            act.autocomplete('search',act.val());
          }
        }
        break;
      case 78: // Ctrl-Alt-N Namenskürzel
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown"){
            var pers = act.val().match(/(.*?)\$\$n *(.*?) *(\$\$.*)?$/);
            if (!pers){
              act.val(act.val().trim() + ' $$n ');
            } else {
              if (pers[3] == undefined)
                act.val(pers[1] + '$$n ');
              else
                act.val(pers[1] + pers[3].trim() + ' $$n ');
            }
            act.trigger('change');
            act.autocomplete('search',act.val());
          }
        }
        break;
      case 80: // Ctrl-Alt-P Summenzeile neu berechnen
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown"){
            var lastEmpty;
            var tuSysHgs = new Array;
            var alteSys;
            $("[id^='MarcEditorPresenter.textArea.983'] textarea").each(function(i,e){
              var regs;
              debug(':'+e.value.trim()+':',4).then(function(m){console.log(m)});
              if (e.value.trim() == '$$a' || e.value.trim() == '' || !!e.value.match(/^\$\$a( [A-Z]{3}:)* *$/)){
                lastEmpty = e;
              } else {
                if (regs = e.value.match(/\$\$a ([A-Z]{3}):[A-Z0-9]{3}(\)?)/)){
                  debug(regs,4).then(function(m){console.log(m)});
                  tuSysHgs.push(regs[1]+':');
                  if (!!regs[2]) alteSys=e;
                }
              }
            });
            if (!!alteSys){
              $(alteSys).focus().click();
              browser.runtime.sendMessage({
                action: "toast",
                message: "Systematik soll nicht mehr, oder nur mit Zusatzcode verwendet werden! (löschen mit Strg-Alt-Backspace)",
                color: '#ff8f8f',
                duration: 20
              });
            } else if (lastEmpty != undefined){
              $(lastEmpty).parent().parent().get(0).dispatchEvent(click);
              $(lastEmpty).focus().click().val('$$a ' + Array.from(new Set(tuSysHgs)).sort().join(' ')).get(0).dispatchEvent(change);
            }
          }
        }
        break;
      case 81: // Ctrl-Alt-Q (Quer-)Verweis auf andere Hauptgruppen
        if (strgAlt){
          event.stopPropagation();
          event.preventDefault();
          if (event.type == "keydown"){
            var pers = act.val().match(/(.*?)\$\$t *(.*?) *(\$\$.*)?$/);
            if (!pers){
              act.val(act.val().trim() + ' $$t ');
            } else {
              if (pers[3] == undefined)
                act.val(pers[1] + '$$t ');
              else
                act.val(pers[1] + pers[3].trim() + ' $$t ');
            }
            act.trigger('change');
            act.autocomplete('search',act.val());
          }
        }
        break;
      case 73: // Strg-Alt-I isbn/titel konkordanzsuche
        if (strgAlt && event.type == "keyup"){
          konksuche = event.key;
          act.autocomplete('destroy');
          mkKonkDiv(autocomplete_configs.tuwsys);
          isbn_suche();
        }
        break;
      case 75: // Strg-Alt-K
        // konkordanzsuche
        if (strgAlt && event.type == "keyup"){
          konksuche = event.key;
          if (act.val().trim() == '$$a' || act.val().trim() == ''){
            var selectedTextArea = document.activeElement;
            var selection = (selectedTextArea != undefined && selectedTextArea.value != undefined)?selectedTextArea.value.substring(selectedTextArea.selectionStart, selectedTextArea.selectionEnd).trim():'';
            if (selection.length == 0)
              selection = document.getSelection().toString().trim();
            if (selection.length == 0)
              selection = getKeywords().trim();
            if (selection == ''){
              konksuche = '';
              browser.runtime.sendMessage({
                action: "toast",
                message: "Keine Schlagwörter vorhanden, bitte Begriffe zur Konkordanzsuche selektieren, oder im dialogfeld eingeben!",
                color: '#ffff8f',
                duration: 10
              });
            }
          } else
            selection = act.val();
          if (act.autocomplete("instance") != undefined){
            act.val('$$a ');
            act.autocomplete('destroy');
          }
          mkKonkDiv(autocomplete_configs.tuwsys);
          if (selection.length > 0){
            ksStarted = true;
            act.autocomplete('search',selection);
          } else
            browser.runtime.sendMessage({
              action: "toast",
              message: "Keine Schlagwörter vorhanden, bitte Begriffe zur Konkordanzsuche selektieren, oder im dialogfeld eingeben!",
              color: '#ffff8f',
              duration: 10
            });
        }
        break;
    }
  } else if (mde && strgAlt && !event.shiftKey && isTuw && !!settings.tuwsysUrl && event.type == "keyup" && (event.keyCode == 75 || event.keyCode == 73)){
    konksuche = event.key;
    debug(konksuche,2).then(function(m){console.log(m)});
    if (konksuche == 'i' || konksuche == 'I'){
      mkKonkDiv(autocomplete_configs.tuwsys);
      isbn_suche();
    } else {
      var selectedTextArea = document.activeElement;
      var selection = (selectedTextArea != undefined && selectedTextArea.value != undefined)?selectedTextArea.value.substring(selectedTextArea.selectionStart, selectedTextArea.selectionEnd).trim():'';
      if (selection.length == 0)
        selection = document.getSelection().toString().trim();
      if (selection.length == 0)
        selection = getKeywords();
      debug(selection,2).then(function(m){console.log(m)});
      // wenn wir das vorher machen ist die selection weg...
      mkKonkDiv(autocomplete_configs.tuwsys);
      if (selection.length > 0){
        act.val(selection);
        ksStarted = true;
        act.autocomplete('search',selection);
      } else {
        browser.runtime.sendMessage({
          action: "toast",
          message: "Keine Schlagwörter vorhanden, bitte Begriffe zur Konkordanzsuche selektieren, oder im dialogfeld eingeben!",
          color: '#ffff8f',
          duration: 10
        });
      }
    }
  } else if ($('#closelAmaKonkInput').length > 0 && event.keyCode == 27 && event.type == "keydown"){ 
    $('#closelAmaKonkInput').click();
  } else if (mde && isTuw && !!settings.tuwsysUrl && !event.shiftKey && strgAlt && [68,71,77,78,80,192,$.ui.keyCode.BACKSPACE].includes(event.keyCode)){
    event.stopPropagation();
    event.preventDefault();
    if (event.type == "keydown"){
      if (event.keyCode == 80){
        var lastEmpty;
        var tuSysHgs = new Array;
        var alteSys;
        $("[id^='MarcEditorPresenter.textArea.983'] textarea").each(function(i,e){
          var regs;
          debug(':'+e.value.trim()+':',4).then(function(m){console.log(m)});
          if (e.value.trim() == '$$a' || e.value.trim() == '' || !!e.value.match(/^\$\$a( [A-Z]{3}:)* *$/)){
            lastEmpty = e;
          } else {
            if (regs = e.value.match(/\$\$a ([A-Z]{3}):[A-Z0-9]{3}(\)?)/)){
              debug(regs,4).then(function(m){console.log(m)});
              tuSysHgs.push(regs[1]+':');
              if (!!regs[2]) alteSys=e;
            }
          }
        });
        if (!!alteSys){
          $(alteSys).focus().click();
          browser.runtime.sendMessage({
            action: "toast",
            message: "Systematik soll nicht mehr, oder nur mit Zusatzcode verwendet werden! (löschen mit Strg-Alt-Backspace)",
            color: '#ff8f8f',
            duration: 20
          });
        } else if (lastEmpty != undefined){
          $(lastEmpty).parent().parent().get(0).dispatchEvent(click);
          $(lastEmpty).focus().click().val('$$a ' + Array.from(new Set(tuSysHgs)).sort().join(' ')).get(0).dispatchEvent(change);
        }
      } else if (event.keyCode == 68 || event.keyCode == $.ui.keyCode.BACKSPACE){
        let et = $(event.target);
        et.val(et.val().substr(0,4));
        et.trigger('change');
      }
    }
    return false;
  } else if (mde && strgAlt && !!settings.acList && event.type == "keydown" && [65,66,68,71,73,75,77,78,80,81,192,219,222].includes(event.keyCode)){
    settings.acList.forEach(function(acl){
      if (!!acl.key && event.key == acl.key){
        konksuche = event.key;
        var selectedTextArea = document.activeElement;
        var selection = (selectedTextArea != undefined && selectedTextArea.value != undefined)?selectedTextArea.value.substring(selectedTextArea.selectionStart, selectedTextArea.selectionEnd).trim():'';
        if (selection.length == 0)
          selection = document.getSelection().toString().trim();
        if (!!acl.extSF){
          mkKonkDiv(autocomplete_configs.one4all);
          act.autocomplete("option", "acListConfig", acl);
          act.val(selection);
        } else if (!aci){
          if (!!acl.tag){
            var ttag = getMarc();
            ttag = ttag.rows.filter(function(i,n){
              return ($(n).find('[id^="FieldTagBox.tag"]').val()
                + ' ' + $(n).find('input[id^="FieldIndicatorBox.tag"]').eq(0).val()
                + $(n).find('input[id^="FieldIndicatorBox.tag"]').eq(1).val()).match(acl.tag);
            });
            if (ttag.length > 0) act = ttag.find('textarea').eq(0);
          }
          act.trigger("click",[true]);
          debug(act.autocomplete("instance"),4).then(function(m){console.log(m)});
          act.autocomplete(autocomplete_configs.one4all).close = function(e){
            this.cancelSearch = !0,
            this._close(t);
          };
          debug(act.autocomplete("instance"),4).then(function(m){console.log(m)});
          act.autocomplete("option", "acListConfig", acl);
        }
        ksStarted = true;
        if (!selection) selection = act.val();
        act.autocomplete('search',selection);
      }
    });
  } else if (mde && !!settings.acList && event.type == "keydown" && (event.keyCode == $.ui.keyCode.RIGHT || event.code == "ControlRight" || event.code == "OSRight")){
    if (!acwv){
      act.autocomplete('search');
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  }
}

function startAutocomplete(e, noac = false){
  debug(e,5).then(function(m){console.log(m)});
  if (noac) return;
  let target = $(e.target);
  activeAutoCompleteTarget = null;
  if (isTuw){
    if (target.closest("[id^='MarcEditorPresenter.textArea']").prop('id').startsWith("MarcEditorPresenter.textArea.971")
      && target.closest('tr').find("[ID^='FieldIndicatorBox.tag.971'][id$='.1']").val() == "5"){
      target.autocomplete(autocomplete_configs.tissou_971_5);
    } else if (!!settings.tissorcUrl && target.closest('[id^="editorTable"]').attr('lama_type') == 'gnd'
      && target.closest('[id^="editorTable"]').find("[id^='MarcEditorPresenter.textArea.075'] textarea").filter((i,n) => {return n.value.match(/\$\$b\s*p\s*\$\$2\s*gndgen/)}).length > 0
      && (target.closest("[id^='MarcEditorPresenter.textArea']").prop('id').startsWith("MarcEditorPresenter.textArea.100")
      || target.closest("[id^='MarcEditorPresenter.textArea']").prop('id').startsWith("MarcEditorPresenter.textArea.024"))){
        target.autocomplete(autocomplete_configs.gnd_tiss_orcid);
    } else if (target.closest("[id^='MarcEditorPresenter.textArea']").prop('id').startsWith("MarcEditorPresenter.textArea.983")){
      target.autocomplete(autocomplete_configs.tuwsys).close = function(e){
        this.cancelSearch = !0,
        this._close(t);
      };
    }
  }
  if (target.closest('[id^="editorTable"]').attr('lama_type') != 'gnd'
      && (!!settings.gndUrl && settings.gndUrl != '' || !!settings.lobidUrl && settings.lobidUrl != '')){
    let tAID = target.closest("[id^='MarcEditorPresenter.textArea']").prop('id');
    let ind1 = target.closest('tr').find("[ID^='FieldIndicatorBox.tag.971'][id$='.1']").val();
    if (!!settings.creatorAC && (tAID.startsWith("MarcEditorPresenter.textArea.100") || tAID.startsWith("MarcEditorPresenter.textArea.700"))
      || tAID.startsWith("MarcEditorPresenter.textArea.971") && (ind1 == 0 || ind1 == 1 || ind1 == 2)){
      target.autocomplete(autocomplete_configs.gnd_lobid_dnb);
    }
  }
  if (!!settings.acList) settings.acList.forEach(function(acl){
    let dcType = target.closest('[id^="editorTable"]').attr('lama_type');
    if (acl.hasOwnProperty(dcType) && !acl[dcType]) return;
    var tagnr = target.closest('tr').find("[ID^='FieldTagBox.tag.']").val();
    if (tagnr != 'LDR' && tagnr > '009'){
      tagnr += ' ' + target.closest('tr').find("[ID^='FieldIndicatorBox.tag.'][id$='.1']").val();
      tagnr += target.closest('tr').find("[ID^='FieldIndicatorBox.tag.'][id$='.2']").val();
    }
    if (tagnr.match(acl.tag)){
      if (target.autocomplete("instance") == undefined){
        debug({t:'start ac',on:target},4).then(function(m){console.log(m)});
        target.autocomplete(autocomplete_configs.one4all);
        target.autocomplete("option", "acListConfig", acl);
        target.autocomplete("option", "keepOpen", false );
        if (!!acl.fast) target.autocomplete("option", "delay", 700 );
        debug(target.autocomplete("instance"),4).then(function(m){console.log(m)});
      }
      return;
    }
  });
}

var selected=false;
var item = false;

function tuwsys(){

  window.addEventListener("keyup",    keyscan, true);
  window.addEventListener("keydown",    keyscan, true);
  // window.onKeydown = keyscan;
  window.addEventListener("keypress", keyscan, true);
}

function check852c(){
  var change = document.createEvent('HTMLEvents');
  change.initEvent('keyup', false, true);
  change.code = 37;
  change.keyCode = 37;
  change.which = 37;
  var f852_8 = $("[id^='MarcEditorPresenter.textArea.852'] textarea");
  if (f852_8.length == 0)
    f852_8 = $('iframe#yards_iframe').contents().find("[id^='MarcEditorPresenter.textArea.852'] textarea");
  var re = /^(.*)(\$\$c\s*)(.*?)(\$\$.*|$)/;
  var match = re.exec(f852_8.val());
  if (!!match && match[3] == ''){
    f852_8.val(match[1].trim() + ' $$c ' + settings.add852c + ' ' + match[4]);
    f852_8.click().focus().get(0).dispatchEvent(change);
    return true;
  }
  return false;
}

function checkbug00576546(){
  // MD_Editor wird geladen ein Datensatz ist schon geöffnet und er ist in einem Set
  // frage ob bei allen records in dem set der Ursprünglich Datensatz geladen werden soll -> lokale felder wieder da
  // sollte also nur kommen wenn man ein set zum katalogisieren neu geöffnet hat
  if (!settings.checkBug00576546){
    $('table.editorTable[lama_type="bib"]').each(function(i,n){
      if ($(n).find('[id^="FieldTagBox.tag.001"]').length > 0){
        var mmsid = $(n).find("div[ID^='MarcEditorPresenter.textArea.001'] textarea").val();
        var locfs = $(n).find('tr:has(table td.localFieldIndication) input[id^="FieldTagBox.tag"]').map(function() {
          return this.id.substr(16,3);
        }).get().join(' ');
        debug(mmsid + ': ' + locfs,2).then(function(m){console.log(m)});
        if (isTuw){
          $.post("https://almagw.ub.tuwien.ac.at/tulama/lfs.php",{MMSID: mmsid}, function(data){
            if (data.local_fields == undefined){
              browser.runtime.sendMessage({
                action: "toast",
                message: locfs + ' aktuell geladenen lokale Felder. Keine ältere Version zum Vergleichen gefunden!',
                color: '#ffff8f',
                duration: 20
              });
            } else if (data.local_fields == locfs){
              if (locfs != ''){
                browser.runtime.sendMessage({
                  action: "toast",
                  message: 'Lokale Felder i.o.: ' + locfs,
                  color: '#8fff8f',
                  duration: 5
                });
              } else {
                browser.runtime.sendMessage({
                  action: "toast",
                  message: 'Keine lokalen Felder, schaut aber OK aus.',
                  color: '#8fff8f',
                  duration: 5
                });
              }
            } else if (locfs == ''){
              browser.runtime.sendMessage({
                action: "toast",
                message: '<b>Achtung keine lokalen Felder! Ursprünglichen Datensatz neuladen.</b><br>Letzte bekannte Version mit lokalen Feldern vom ' + data.file_mod + ': ' + data.local_fields,
                color: '#ff8f8f',
                duration: 20
              });
            } else if (data.local_fields == ''){
              browser.runtime.sendMessage({
                action: "toast",
                message: locfs + ' Lokale Felder aktuell.<br>' + 'Noch keine lokalen Felder in der Version vom ' + data.file_mod,
                color: '#8fff8f',
                duration: 5
              });
            } else {
              browser.runtime.sendMessage({
                action: "toast",
                message: locfs + ' Unterschiedliche lokale Felder! Aktuell.<br>'+ data.local_fields +' Letzte bekannte Version vom ' + data.file_mod,
                color: '#ffff8f',
                duration: 20
              });
            }
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          });
        } else {
          let match = document.URL.match(/(https?:\/\/[^\/]*)\//);
          let check = function(data){
              let slocfs = $(data).find('datafield:has(subfield[code="9"])').filter((n,o) => {
                return $(o).find('subfield[code="9"]').text().toLowerCase() == 'local'
              }).map((i,x) => {
                return $(x).attr('tag');
              }).get().join(' ');
              if (slocfs != '' && locfs == ''){
                browser.runtime.sendMessage({
                  action: "toast",
                  message: '<b>Achtung! Keine lokalen Felder! Ursprünglichen Datensatz neuladen.</b><br>Lokale Felder in der zuletzt gespeicherten Version: "' + slocfs + '"',
                  color: '#ff8f8f',
                  duration: 20
                });
              } else if (slocfs != locfs){
                browser.runtime.sendMessage({
                  action: "toast",
                  message: 'Unterschiedliche lokale Felder!<br>Aktuell "'+ locfs + '" != "' + slocfs +'" gespeichert.',
                  color: '#ffff8f',
                  duration: 20
                });
              }
            };
          $.ajax({
            url:      match[1] + '/almaws/v1/bibs',
            type:     'GET',
            headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
            data:     { 'nz_mms_id': mmsid },
            success:  check,
            error: function(){
              $.ajax({
                url:      match[1] + '/almaws/v1/bibs/'+mmsid,
                type:     'GET',
                headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
                success:  check
              })
            }
          })
        }
      }
    });
  }
}

function sort_items(by){ // Description
  $("#pageBeansortSectionPropertiesroutine_hiddenSelect option[value='"+by+"']").prop('selected',true).trigger('change');
  setTimeout(function(){
    $('#widgetId_Left_sortroutine').removeClass('open');
    $('#TABLE_DATA_list').find("span[id$='_COL_arrivalDate'][title!='-']").get(0).scrollIntoView(false);
    window.scrollBy(0,200);
  },1000);
}

var almaConfig;
function getAlmaConfig(){
  return new Promise(function(resolv, reject){
    if (!!almaConfig)
      resolv(almaConfig);
    else {
      let domain = new URL(document.URL);
      $.ajax({
        url:      domain.origin + '/internal/airapi/apm/config?_=' + Date.now(),
        type:     'GET',
        success:  function(data){
          almaConfig = data;
          resolv(almaConfig);
        }
      });
    }
  });
}

var searchConfig;
function getSearchConfig(){
  return new Promise(function(resolv, reject){
    if (!!searchConfig)
      resolv(searchConfig);
    else {
      let domain = new URL(document.URL);
      $.ajax({
        url:      domain.origin + '/internal/airapi/persistentSearch/getSearchTypes?_=' + Date.now(),
        type:     'GET',
        success:  function(data){
          searchConfig = data.filter(function(i){return !i.hidden && i.value.endsWith('_NG')});
          $.ajax({
            url:      domain.origin + '/internal/airapi/persistentSearch/getSearchInfo?_=' + Date.now(),
            type:     'GET',
            success:  function(data){
              searchConfig.forEach(function(n,i){
                if (n.value == 'IEP_NG'){
                  n.searchGroups = data.ITEM.AdvancedSearch.SearchGroups;
                  n.fieldGroups  = data.ITEM.AdvancedSearch.fieldGroups;
                } else if (n.value == 'PO_LINE_NG'){
                  n.searchGroups = data.ORDERLINE.AdvancedSearch.SearchGroups;
                  n.fieldGroups  = data.ORDERLINE.AdvancedSearch.fieldGroups;
                } else if (!!data[n.value.substr(0,n.value.length-3)]){
                  n.searchGroups = data[n.value.substr(0,n.value.length-3)].AdvancedSearch.SearchGroups;
                  n.fieldGroups  = data[n.value.substr(0,n.value.length-3)].AdvancedSearch.fieldGroups;
                }
              });
              resolv(searchConfig);
            },
            error: function(e){
              console.log(e);
              reject(e);
            }
          });
        },
        error: function(e){
          console.log(e);
          reject(e);
        }
      });
    }
  })
}

function expandSearchValues(shift){
  let newui = $('#mainLayoutSearchWrapper .persistent-search-advanced-button:visible').length > 0;
  if (newui){

    getSearchConfig().then(function(searchConfig){

      function getSearchIndex(label){
        for (searchGroup in selectedSearchConfig.searchGroups){
          for (searchField in selectedSearchConfig.searchGroups[searchGroup].SearchFields){
            if (selectedSearchConfig.searchGroups[searchGroup].SearchFields[searchField].displayValue == label)
              return {value: searchField, conf: selectedSearchConfig.searchGroups[searchGroup].SearchFields[searchField]};
          }
        };
      }

      function getOperator(selectedSearchIndex, label = null){
        if (!!label){
          for (operator in selectedSearchIndex.conf.compareTypes){
            if (selectedSearchIndex.conf.compareTypes[operator] == label)
              return operator;
          }
        }
        if (!!selectedSearchIndex.conf.compareTypes.EQUAL)
          return 'EQUAL';
        else if (!!selectedSearchIndex.conf.compareTypes.OUTER_EQUAL)
          return 'OUTER_EQUAL';
        else if (!!selectedSearchIndex.conf.compareTypes.CONTAIN_ANY)
          return 'CONTAIN_ANY';
        else if (!!selectedSearchIndex.conf.compareTypes.CONTAIN)
          return 'CONTAIN';
      }
      let persistentSearch = $('alma-persistent-search,persistent-search');
      var searchKey, selectedSearchConfig, searchIndex, selectedSearchIndex, operator, sc, list;
      if ($('.advanced-search-wrapper:visible').length == 0){
        // simple search
        searchKey = persistentSearch.find('#ngSimpleSearchKeyButton').text();
        selectedSearchConfig = searchConfig.filter(function(i){return i.label == searchKey})[0];
        if (!!selectedSearchConfig.hasScope){
          let searchScope = persistentSearch.find('#filterScopeSelectBtn ex-icon i').prop('class');
          let selectedSearchScope = selectedSearchConfig.scopeOptions.filter(function(i){return searchScope.includes(i.icon)})[0];
          sc = selectedSearchScope.value;
        }
        searchIndex = persistentSearch.find('#ngSimpleSearchIndexes').text();
        selectedSearchIndex = getSearchIndex(searchIndex);
        operator = getOperator(selectedSearchIndex);
        list = $('search-history-list > input').val().replace(/[\s;,\|]/g,' ').split(' ');
      } else {
        // advanced search offen: index, operator und liste aus der ersten zeile (oder liste doch von oben)
        searchKey = persistentSearch.find('.advanced-search-wrapper ex-new-combobox.advanced-search-scope-element').text();
        selectedSearchConfig = searchConfig.filter(function(i){return i.label == searchKey})[0];
        if (!!selectedSearchConfig.hasScope){
          let searchScope = persistentSearch.find('.advanced-search-wrapper .advanced-search-zone-buttons mat-radio-button.mat-radio-checked').text().trim();
          let selectedSearchScope = selectedSearchConfig.scopeOptions.filter(function(i){return searchScope.includes(i.label)})[0];
          sc = selectedSearchScope.value;
        }
        searchIndex = persistentSearch.find('.advanced-search-wrapper hep-query-builder .ex-query-builder-row #categoryadvSearch\\.0').text();
        selectedSearchIndex = getSearchIndex(searchIndex);
        operator = getOperator(selectedSearchIndex, persistentSearch.find('.advanced-search-wrapper hep-query-builder .ex-query-builder-row [id^="operatoradvSearch.0"]').text());
        list = $('.advanced-search-wrapper input[id^="fieldadvSearch.0"]');
        if (list.length == 0)
          list = $('search-history-list > input');
        list = list.eq(0).val().replace(/[\s;,\|]/g,' ').split(' ');
      }
      let ty = selectedSearchConfig.value;
      let field = selectedSearchIndex.value;
      list = list.filter(function(val){ return !!val.trim(); });
      if (list.length > 50 && !confirm('Wirklich ' + list.length + ' Werte expandieren?')) return;
      if (list.length == 0) return false;
      let oldurl = new URL(document.URL);
      let newurl = oldurl.origin + selectedSearchConfig.url
        + '?se=qr:~-~(condition-~%27or-~rules-~(-~(field-~%27' + field + '-~value-~%27'
        + list.map(encodeURI).join('-~operator-~%27' + operator + '-~type-~%27string)-~(field-~%27' + field + '-~value-~%27')
        + '-~operator-~%27' + operator + '-~type-~%27string))),' + (!!sc?'~sc:~'+sc:'') + ',~ty:~' + ty + '&searchListPageMode=DEFAULT';
      debug(newurl,2).then(function(m){console.log(m)});
      $('body').append('<script>history.pushState({}, "", "' + newurl + '");</script>');
    });

  } else {
    if ($('#advancedSearchWrapper:visible').length == 0){
      $('#advancedLink').get(0).dispatchEvent(click);
      setTimeout(function(){
        $('#recentSearchesContainer').removeClass('open');
        if ($('.advSearchValueWrapper input').length > 1){
          $('.clearSearchBtn').get(0).dispatchEvent(click);
          setTimeout(function(){
            let actIndex = $('#simpleSearchIndexDisplay').text();
            $('#advancedSearchBody .advSearchFieldsWrapper input').last().val(actIndex);
            $('#advancedSearchBody .advSearchFieldsWrapper select').last().find('option:contains("'+actIndex+'")').prop('selected',true).trigger('change');
            $('.advSearchValueWrapper input').val($('#ALMA_MENU_TOP_NAV_Search_Text').val());
          },500);
        }
      },500);
    } else if ($('.advSearchValueWrapper input').length == 1){
      var list = $('.advSearchValueWrapper input').val().replace(/[\s;,\|]/g,' ').split(' ');
      list = list.filter(function(val){ return val.trim() != ''; });
      if (list.length > 100 && !confirm('Wirklich ' + list.length + ' Werte expandieren?')) return;
      debug(list,2).then(function(m){console.log(m)});
      list.forEach(function(val, i){
        $('.advSearchValueWrapper input').last().val(val);
        if (list.length > i+1){
          $('.duplicateRowBtn').last().get(0).dispatchEvent(click);
          if ($('#advancedSearchBody .advSearchFieldsWrapper input').last().val() != $('#advancedSearchBody .advSearchFieldsWrapper input').first().val()){
            let actIndex = $('#advancedSearchBody .advSearchFieldsWrapper input').first().val();
            $('#advancedSearchBody .advSearchFieldsWrapper input').last().val(actIndex);
            $('#advancedSearchBody .advSearchFieldsWrapper select').last().find('option:contains("'+actIndex+'")').prop('selected',true).trigger('change');
          }
          $('.advAndOrWrapper input[value="OR"]').last().click().get(0).dispatchEvent(click);
        }
      });
      setTimeout(function(){ $('#advSearchBtn').get(0).scrollIntoView(false); window.scrollBy(0, 100); },500);
      browser.runtime.sendMessage({
        action: "toast",
        message: list.length + ' Werte!',
        color: '#8fff8f',
        duration: 20
      });
    } else {
      browser.runtime.sendMessage({
        action: "toast",
        message: 'Bitte das Formular vorher löschen!',
        color: '#ffff8f',
        duration: 20
      });
    }
  }
}

function add_loans(what){
  if ((isTuw && !!settings.loansUrl) || document.URL.includes('ubtuw')){
    if (!settings.loansUrl) settings.loansUrl = 'https://almagw.ub.tuwien.ac.at/tulama/loans.php';
    if (what == 'itemlist'){
      var physiids = $("input[name='pageBean.selectedResultsList.values'][type='checkbox']").map(function() { return this.value; }).get();
      if (physiids.length == 0){
        toast('keine Item-IDs gefunden','#ff8f8f',10)
      } else {
        $.post(settings.loansUrl,
          {
            'ITEMID[]': physiids
          },
          function(data){
            $('#SELENIUM_ID_list_HEADER_accessionNumber').text('Entl./heuer/letzte');
            data.forEach(function(val){
              $("#recordContainerlist" + val.item_id + " span[id$='COL_accessionNumber']").text(val.loans + '/' + val.loans_this_year + '/' + val.last_loan);
            });
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          }
        );
      }
    } else if (what == 'holdinglist'){
      var holids = $("input[name='pageBean.selectedResultsList.values'][type='checkbox']").map(function() { return this.value; }).get();
      if (holids.length == 0){
        toast('keine Holding-IDs gefunden','#ff8f8f',10)
      } else {
        $.post(settings.loansUrl,
          {
            'HOLID[]': holids
          },
          function(data){
            $('#SELENIUM_ID_listWithFilters_HEADER_accessionNumber input[type="submit"]').val('Entl./heuer/letzte');
            data.forEach(function(val){
              $("#recordContainerlistWithFilters" + val.hol_id + " span[id$='COL_accessionNumber']").text(val.loans + '/' + val.loans_this_year + '/' + val.last_loan );
            });
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          }
        );
      }
    } else if (what == 'mmsresults'){
      var mms_ids = $('[id^="recordContainerresults"]').map(function() { return this.id.substr(22); }).get();
      if (mms_ids.length == 0){
        toast('keine MMS-IDs gefunden','#ff8f8f',10)
      } else {
        $.post(settings.loansUrl,
          {
            'MMSID[]': mms_ids
          },
          function(data){
            data.forEach(function(val){
              $("#recordContainerresults" + val.mms_id + " .fieldColumn1 div.row").append(`
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Entlehnungen:</span>
                <span class="spacer_after_1em" dir="auto">${val.loans}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Entlehnungen heuer:</span>
                <span class="spacer_after_1em" dir="auto">${val.loans_this_year}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Letzte Entlehnung:</span>
                <span class="spacer_after_1em" dir="auto">${val.last_loan}</span>
              </div>`);
            });
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          }
        );
      }
    } else if (what == 'holdingresults'){
      var mms_ids = $('[id$="mmsId"]').map(function() { return this.title; }).get();
      if (mms_ids.length == 0){
        toast('keine MMS-IDs gefunden','#ff8f8f',10)
      } else {
        $.post(settings.loansUrl,
          {
            'MMSID[]': mms_ids
          },
          function(data){
            data.forEach(function(val){
              $(".fieldColumn2:has([title='" + val.mms_id + "']) div.row").append(`
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Entlehnungen:</span>
                <span class="spacer_after_1em" dir="auto">${val.loans}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Entlehnungen heuer:</span>
                <span class="spacer_after_1em" dir="auto">${val.loans_this_year}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Letzte Entlehnung:</span>
                <span class="spacer_after_1em" dir="auto">${val.last_loan}</span>
              </div>`);
            });
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          }
        );
      }
    } else if (what == 'itemresults'){
      var item_ids = $('[id^="recordContainerresults"]').map(function() { return this.id.substr(22); }).get();
      if (item_ids.length == 0){
        toast('keine Item-IDs gefunden','#ff8f8f',10)
      } else {
        $.post(settings.loansUrl,
          {
            'ITEMID[]': item_ids
          },
          function(data){
            data.forEach(function(val){
              $("#recordContainerresults" + val.item_id + " .fieldColumn2 div.row").append(`
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Entlehnungen:</span>
                <span class="spacer_after_1em" dir="auto">${val.loans}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Entlehnungen heuer:</span>
                <span class="spacer_after_1em" dir="auto">${val.loans_this_year}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Letzte Entlehnung:</span>
                <span class="spacer_after_1em" dir="auto">${val.last_loan}</span>
              </div>
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Datensatznummer:</span>
                <span class="spacer_after_1em" dir="auto">${val.acnumber}</span>
              </div>`);
            });
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          }
        );
      }
    } else if (what == 'portfresults'){
      var mms_ids = $('[id$="LABEL_mmsIdmmsId"]').map(function() { return this.textContent; }).get();
      if (mms_ids.length == 0){
        toast('keine MMS-IDs gefunden','#ff8f8f',10)
      } else {
        $.post(settings.loansUrl,
          {
            'MMSID[]': mms_ids
          },
          function(data){
            data.forEach(function(val){
              $('.fieldColumn div.row:has(span[id$="LABEL_mmsIdmmsId"]:contains("'+val.mms_id+'"))').append(`
              <div class="col col-xs-12 marTopBottom3">
                <span class="fieldName">Datensatznummer:</span>
                <span class="spacer_after_1em" dir="auto">${val.acnumber}</span>
              </div>`);
            });
          },"json").fail(function(jqXHR, textStatus, errorThrown) {
            debug(textStatus,2).then(function(m){console.log(m)});
          }
        );
      }
    }
  }
}

function handleKeyEvent(e){
  var oe = e.originalEvent;
  debug(e,2).then(function(m){console.log(m)});
  let oekey = oe.shiftKey?oe.key.toUpperCase():oe.key.toLowerCase(); // ignore capslock
  if ((oekey != 's' && oekey != 'i' && (oe.altKey || oe.metaKey) && oe.ctrlKey
      || oekey == 'Escape'
      || oe.ctrlKey && oe.key == 's'
      || oe.ctrlKey && (oe.altKey || oe.metaKey) && oekey == 'r'
      || (oe.altKey || oe.metaKey) && !oe.ctrlKey && oekey == 'i')
    && e.data[oekey] != undefined)
    e.data[oekey].action(e.data[oekey].value);
}

function enable_key_shortcuts(){
  $(document).unbind('keydown.editPhysicalItem');
  $(document).unbind('keydown.PhysicalItemList');
  $(document).unbind('keydown.expandSearchValues');
  $(document).unbind('keydown.MmsResults');
  $(document).unbind('keydown.PhysicalTitleResults');
  $(document).unbind('keydown.PhysicalItemResults');
  $(document).unbind('keydown.ePortfolioResults');
  var kdevent = false;
  var keys = {
    y:{ value: 'expandSearchValues',
        action: expandSearchValues
      },
    L:{ value:  1,
        action: lamaTwinkle
      }
  };
  if ($('body').attr('id') == 'body_id_xml_file_resource_editor.physical.item_general.xml'){
    kdevent = 'keydown.editPhysicalItem';
    keys.b = { value: 'GG', action: protype };
    keys.B = { value: 'dummy', action: proTypeSettings };
    keys.p = { value: 'Null', action: set_item_policy };
    keys.P = { value: 'Null', action: itemPolicySettings };
    keys.t = { value: 'dummy', action: setItemTemplate };
    keys.T = { value: 'dummy', action: itemTemplateSettings };
    debug('add keydown event_handler for "edit physical item"',2).then(function(m){console.log(m)});
  } else if ($('body').attr('id') == 'body_id_xml_file_resource_editor.physical.items_list.xml'){
    kdevent = 'keydown.physicalItemList';
    keys.d = { value: 'Description', action: sort_items };
    if (isTuw){
      keys.l = { value: 'itemlist', action: add_loans };
      // keys.L = { value: 'itemlist', action: add_loans };
    }
    debug('inst strg-alt-d + l',2).then(function(m){console.log(m)});
  } else if ($('body').attr('id') == 'body_id_xml_file_resource_editor.physical.holdings_list.xml'){
    kdevent = 'keydown.physicalHoldingList';
    if (isTuw){
      keys.l = { value: 'holdinglist', action: add_loans };
    }
    debug('inst strg-alt-d + l',2).then(function(m){console.log(m)});
  } else if ($('body').attr('id') == 'body_id_xml_file_search.mms_results.xml'){
    kdevent = 'keydown.MmsResults';
    if (isTuw){
      keys.l = { value: 'mmsresults', action: add_loans };
    }
    debug('inst strg-alt-d + l',2).then(function(m){console.log(m)});
  } else if ($('body').attr('id') == 'body_id_xml_file_search.physical_ie_results.xml'){
    kdevent = 'keydown.PhysicalTitleResults';
    if (isTuw){
      keys.l = { value: 'holdingresults', action: add_loans };
    }
    debug('inst strg-alt-d + l',2).then(function(m){console.log(m)});
  } else if ($('body').attr('id') == 'body_id_xml_file_search.physical_item_results.xml'){
    kdevent = 'keydown.PhysicalItemResults';
    if (isTuw){
      keys.l = { value: 'itemresults', action: add_loans };
    }
    debug('inst strg-alt-d + l',2).then(function(m){console.log(m)});
  } else if ($('body').attr('id') == 'body_id_xml_file_search.electronic_portfolio_results.xml'){
    kdevent = 'keydown.ePortfolioResults';
    if (isTuw){
      keys.l = { value: 'portfresults', action: add_loans };
    }
    debug('inst strg-alt-d + l',2).then(function(m){console.log(m)});
  } else if ($('#persistentSearchWrapper').length == 1){
    kdevent = 'keydown.expandSearchValues';
    debug('add keydown event_handler for "expandSearchValues"',2).then(function(m){console.log(m)});
  }

  debug(kdevent,2).then(function(m){console.log(m)});
  debug(keys,2).then(function(m){console.log(m)});
  if (!!kdevent){
    $(document).bind(
      kdevent,
      keys,
      function(e) {
        handleKeyEvent(e);
      }
    );
  }
}

function checkHolding(){
  if (!!settings.m866sp) try {
    $('ex-side-by-side as-split as-split-area.ex-side-by-side-right #holdings_details_description:has(.mat-expansion-panel-header:contains("Bestandsübersicht")) .expandable-section-text p').each(function(i,n){
      let sfa = $(n);
      if (!sfa.html().match(/_lAma_blank/)){
        sfa.html(sfa.html().replace(/ /g,'<span class="_lAma_blank">&nbsp;</span>'));
      }
    });
  } catch(err){ console.log(err) }
}

// new title search
function checkWarnings(table){
  if (typeof(table) == 'string') table = $(table);
  if (table.hasClass('_lAma_checked') || table.find('hep-bib-record-view-row').length == 0) return;
  table.addClass('_lAma_checked');
  [0,1,2,3,4,5].forEach(function(level){$('body').removeClass('tu_lAma_Warning'+level);});
  try {
    settings.warningList.forEach(function(v){
      if (!v.hol && !v.bib && !v.gnd || !!v.bib){
        var local = '';
        if (v.local != undefined && v.local != null){
          if (!v.local)
            local = ':not(:has(#member-organizations))';
          else
            local = ':has(#member-organizations)';
        }
        let dubl = table.find('tr:has(hep-bib-record-view-tag:contains("'+v.tag+'"))' + local).filter(function(){
          let indi = $(this).find('.paintIndicators').text();
          var sfs = $(this).find('hep-bib-record-view-row').text().trim();
          if (!v.tag.startsWith('00')) sfs = sfs.substr(2).trim();
          return $(this).find('hep-bib-record-view-tag').text().startsWith(v.tag) // wenns kürzer ist
            && (!v.ind1 || indi.substr(0,1) == v.ind1)
            && (!v.ind2 || indi.substr(1,1) == v.ind2)
            && (!v.not && sfs.match(v.re) != null || !!v.not && sfs.match(v.re) == null)
        });
        if (dubl.length > 0){
          $('body').addClass('tu_lAma_Warning'+v.level);
          if (v.level <= 2){
            dubl.addClass('tu_lAma_Warning'+v.level);
            if (!!v.color) dubl.find('td, th').css('background-color', v.color+'80');
          }
          var color = (!!v.color)?` style="color: ${v.color} !important;"`:'';
          $('#all_titles_details_record_view mat-panel-title').append($(`<span class="tu_lAma_Warning${v.level}"${color}>${v.msg}</span>`));
        }
      }
    });
  } catch(err){ console.log(err) }

  if (!!settings.check689order){
    var lind1 = -1, lind2 = -1, err = false;
    table.find('tr:has(hep-bib-record-view-tag:contains("689"))').each(function(i,n){
      $(n).removeClass('tu_lAma_Warning_swf');
      let inds = $(n).find('.paintIndicators').text();
      if (parseInt(inds[0]) == lind1 +1 && parseInt(inds[1]) == 0
        || parseInt(inds[0]) == lind1 && parseInt(inds[1]) == lind2 + 1){
        lind1 = parseInt(inds[0]);
        lind2 = parseInt(inds[1]);
        return;
      } else if (parseInt(inds[0]) == lind1 && inds[1] == '_'){
        lind2 = 99;
        return;
      }
      $(n).addClass('tu_lAma_Warning_swf');
      lind1 = parseInt(inds[0]);
      lind2 = parseInt(inds[1]);
      err = true;
    });
    if (err) $('#all_titles_details_record_view mat-panel-title').append($(`<span style="color:red !important;margin-left:5px;">Fehler in einer Schlagwortfolge!</span>`));
  }

  if(!!settings.checktutat){
    table.find('tr:has(hep-bib-record-view-tag:contains("773")),tr:has(hep-bib-record-view-tag:contains("830"))').each(function(i,n){
      $(n).removeClass('tu_lAma_Warning_swf');
      let id = $(n).find('hep-bib-record-view-row').text().substr(2).trim().match(/\|w\s+(\((?:(?!\|).)*\))((?:(?!\|).)*)/);
      if (!!id && table.find('tr:has(hep-bib-record-view-tag:contains("035")) hep-bib-record-view-row:contains("'+id[1]+'")').length > 0)
        checkACinIZ((id[1]+id[2]).trim(),
          ()=>{
            $(n).addClass('tu_lAma_Warning_swf');
            $('#all_titles_details_record_view mat-panel-title').append($('<span style="color:red !important;margin-left:5px;">Übergeordneten Titel ' + (id[1]+id[2]).trim() + ' nicht in der IZ gefunden!</h2>'));
          },
          ()=>{
            $(n).addClass('tu_lAma_Warning_swf');
            $('#all_titles_details_record_view mat-panel-title').append($('<span style="color:red !important;margin-left:5px;">Übergeordneten Titel ' + (id[1]+id[2]).trim() + ' mehrmals in der IZ gefunden!</h2>'));
          }
        );
    });
  }

  if (!settings.createLinks){
    $('body').off('click.extlink');
    $('body').on('click.extlink', 'hep-bib-record-view-tag,hep-bib-record-view-row', function(e){
      let oE = e.originalEvent;
      if (oE.shiftKey + oE.altKey + oE.metaKey > 0){
        let match = $(e.target).closest('tr').find('hep-bib-record-view-row').text().match(/(https?:[^\s]*)/);
        if (match){
          var winName = '_blank';
          if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2 && !!settings.idLinks)
            for (isil in settings.idLinks){
              if (match[1].startsWith(settings.idLinks[isil])){
                winName = isil;
              }
            }
          window.open(match[1],winName);
          return false;
        }
      }
    });
    debug("extlink nts installed",5).then((m)=>{console.log(m)});
    $('body').off('click.idlink');
    $('body').on('click.idlink','hep-bib-record-view-tag,hep-bib-record-view-row',function(e){
      let oE = e.originalEvent;
      if (oE.shiftKey + oE.altKey + oE.metaKey > 0){
        var subcnt;
        let tag = $(e.target).closest('tr').find('hep-bib-record-view-tag').text();
        if (e.currentTarget.nodeName == "HEP-BIB-RECORD-VIEW-ROW" && (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey) < 1){
          subcnt = $(e.target).text();
        } else {
          subcnt = $(e.target).closest('tr').find('hep-bib-record-view-row').text();
        }
        var winOpend = false;
        if (!!subcnt){
          if (tag == '024'){
            let match = subcnt.match(/\|a\s*([^\s\|]+)\s*\|2\s*([^\s]*)/);
            if (match && !!settings.idLinks[match[2]]){
              if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                window.open(settings.idLinks[match[2]]+match[1],match[2]);
              else
                window.open(settings.idLinks[match[2]]+match[1],'_blank');
              winOpend = true;
            }
          } else if (tag == '776' || tag == '787'){
            if (!!settings.idLinks['hdl']){
              let match = subcnt.match(/\|o\s*(10\.[^\s]*)/);
              if (match){
                if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                  window.open(settings.idLinks['hdl']+match[1],'hdl');
                else
                  window.open(settings.idLinks['hdl']+match[1],'_blank');
                winOpend = true;
              }
            }
            if (!!settings.idLinks['doi']){
              let match = subcnt.match(/\|o\s*(20\.[^\s]*)/);
              if (match){
                if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                  window.open(settings.idLinks['doi']+match[1],'doi');
                else
                  window.open(settings.idLinks['doi']+match[1],'_blank');
                winOpend = true;
              }
            }
          } else {
            let amatch = subcnt.match(/\|[09]\s*\(([^)]*)\)([^\s]+)/g);
            !!amatch && amatch.forEach(function(m,i){
              let match = m.match(/\|[09]\s*\(([^)]*)\)([^\s]+)/);
              if (match && !!settings.idLinks[match[1]] && !subcnt.includes(settings.idLinks[match[1]]+match[2])){
                if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                  window.open(settings.idLinks[match[1]]+match[2],match[1]);
                else
                  window.open(settings.idLinks[match[1]]+match[2],'_blank');
                winOpend = true;
              }
            })
          }
        }
        return !winOpend;
      }
    });
    debug("idlinks nts installed",5).then((m)=>{console.log(m)});
  }
}

function addColorTemplate(){
  
  [0,1,2,3,4,5].forEach(function(level){$('body').removeClass('tu_lAma_Warning'+level);});
  try {
    settings.warningList.forEach(function(v){
      // keine andere möglichkeit im simple-view bib und hol zu unterscheiden? was ist mit gnd?
      if (!v.hol && !v.bib && !v.gnd || !!v.bib && $('#mmsRecordSimpleViewlabelmarc_span').length > 0
        || !!v.hol && $('#mmsRecordSimpleViewlabelmarc_span').length == 0 && $('#TABLE_DATA_marcFieldsList tr:has(span[title^="035"]) td[id$="_COL_value"]:contains("(DE-588)")').length == 0
        || !!v.gnd && $('#mmsRecordSimpleViewlabelmarc_span').length == 0 && $('#TABLE_DATA_marcFieldsList tr:has(span[title^="035"]) td[id$="_COL_value"]:contains("(DE-588)")').length > 0){
        var local = '';
        if (v.local != undefined && v.local != null){
          if (!v.local)
            local = ':not(:has(td[id$="localFieldIndicationrowIndex"] img))';
          else
            local = ':has(td[id$="localFieldIndicationrowIndex"] img)';
        }
        let dubl = $('#TABLE_DATA_marcFieldsList tr:has(span[title^="'+v.tag+'"])'+local+' td[id$="_COL_value"]').filter(function(){
          var sfs = this.textContent.trim();
          if (!v.tag.startsWith('00')) sfs = sfs.substr(2).trim();
          return (!v.ind1 || this.textContent.substr(0,1) == v.ind1) 
            && (!v.ind2 || this.textContent.substr(1,1) == v.ind2)
            && (!v.not && sfs.match(v.re) != null || !!v.not && sfs.match(v.re) == null)
        });
        if (dubl.length > 0){
          $('body').addClass('tu_lAma_Warning'+v.level);
          if (v.level <= 2){
            dubl.closest('tr').addClass('tu_lAma_Warning'+v.level);
            if (!!v.color) dubl.closest('tr').css('background-color', v.color+'80');
          }
          var color = (!!v.color)?` style="color: ${v.color} !important;"`:'';
          $('.upperActionsLeft .tableSearch').append($(`<span class="tu_lAma_Warning${v.level}"><h2${color}>${v.msg}</h2></span>`));
        }
      }
    });
  } catch(err){ console.log(err) }

  if (!!settings.check689order){
    var lind1 = -1, lind2 = -1, err = false;
    $('#TABLE_DATA_marcFieldsList tr:has(span[title^="689"]) td[id$="_COL_value"]').each(function(i,n){
      $(n).closest('tr').removeClass('tu_lAma_Warning_swf');
      let inds = $(n).text();
      if (parseInt(inds[0]) == lind1 +1 && parseInt(inds[1]) == 0
        || parseInt(inds[0]) == lind1 && parseInt(inds[1]) == lind2 + 1){
        lind1 = parseInt(inds[0]);
        lind2 = parseInt(inds[1]);
        return;
      } else if (parseInt(inds[0]) == lind1 && inds[1] == '_'){
        lind2 = 99;
        return;
      }
      $(n).closest('tr').addClass('tu_lAma_Warning_swf');
      lind1 = parseInt(inds[0]);
      lind2 = parseInt(inds[1]);
      err = true;
    });
    if (err) $('.upperActionsLeft .tableSearch').append($(`<h2 style="color:red !important;">Fehler in einer Schlagwortfolge!</h2>`));
  }

  if(!!settings.checktutat){
    $('#TABLE_DATA_marcFieldsList').find('tr:has(span[title^="773"]),tr:has(span[title^="830"])').find('td[id$="_COL_value"]').each(function(i,n){
      $(n).closest('tr').removeClass('tu_lAma_Warning_swf');
      let id = $(n).text().substr(2).trim().match(/\|w\s+(\((?:(?!\|).)+\))((?:(?!\|).)+)/);
      if (!!id && $('#TABLE_DATA_marcFieldsList tr:has(span[title^="035"]) td[id$="_COL_value"]:contains("'+id[1]+'")').length > 0)
        checkACinIZ((id[1]+id[2]).trim(),
          ()=>{
            $(n).closest('tr').addClass('tu_lAma_Warning_swf');
            $('.upperActionsLeft .tableSearch').append($('<h2 style="color:red !important;">Übergeordneten Titel ' + (id[1]+id[2]).trim() + ' nicht in der IZ gefunden!</h2>'));
          },
          ()=>{
            $(n).closest('tr').addClass('tu_lAma_Warning_swf');
            $('.upperActionsLeft .tableSearch').append($('<h2 style="color:red !important;">Übergeordneten Titel ' + (id[1]+id[2]).trim() + ' mehrmals in der IZ gefunden!</h2>'));
          }
        );
    });
  }

  if (settings.colorScheme == undefined) settings.colorScheme = 'rgb';
  if (!!settings.colorScheme){
    $("td[id$='_COL_value']").each(function(i,n){
      if (/^(..) (\|. )/.exec(n.outerText)){
        $(n).contents().each(function(j,m){
          if (j == 0 && m.nodeName=='#text'){
            $(m).replaceWith('<span class="paintIndicators">' + m.data + '</span>')
          } else if (m.nodeName=='SPAN' && /^\s*\|.\s*$/.exec(m.outerText)){
            $(m).addClass('paintSubfields')
          }
        })
      }
    })
  }

  if (!!settings.m866sp) try {
    $('#TABLE_DATA_marcFieldsList tr:has(span[title^="866"]):has(.paintIndicators:contains("30")) td[id$="_COL_value"] .paintSubfields').filter(function(i,n){
      return n.textContent.trim() == '|a';
    }).each(function(i,n){
      let sfa = $(n.nextElementSibling);
      sfa.html(sfa.html().replace(/ /g,'<span class="_lAma_blank">&nbsp;</span>'));
    });
  } catch(err){ console.log(err) }

  if (!settings.createLinks){
    $('body').off('click.extlink');
    $('body').on('click.extlink', '#TABLE_DATA_marcFieldsList tr span[id$="tag"],#TABLE_DATA_marcFieldsList tr td[id$="value"],hep-bib-record-view-tag,hep-bib-record-view-row', function(e){
      let oE = e.originalEvent;
      if (oE.shiftKey + oE.altKey + oE.metaKey > 0){
        var sfs;
        if (e.target.nodeName == 'SPAN')
          sfs = e.target.textContent;
        else
          sfs = $(e.target).closest('tr').find('td[id$="_COL_value"]').text();
        let match = sfs.match(/(https?:[^\s]*)/);
        var winName = '_blank';
        var winOpend = false;
        if (match){
          if (!!settings.idLinks && oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 1)
            for (isil in settings.idLinks){
              if (match[1].startsWith(settings.idLinks[isil])){
                winName = isil;
              }
            }
          window.open(match[1],winName);
          winOpend = true;
        }
        return !winOpend;
      }
    });
    debug("extlink simple-view installed",5).then((m)=>{console.log(m)});
    $('body').off('click.idlink');
    $('body').on('click.idlink','#TABLE_DATA_marcFieldsList tr span[id$="tag"],#TABLE_DATA_marcFieldsList tr td[id$="value"]',function(e){
      let oE = e.originalEvent;
      if (oE.shiftKey + oE.altKey + oE.metaKey > 0){
        var subcnt;
        var tagt = true;
        var tag;
        if (e.target.nodeName == 'SPAN' && !e.target.id.endsWith('tag')){
          subcnt = e.target.textContent;
          tag = $(e.target).closest('tr').find('td[id$="tag"]').text();
          tagt = false;
        } else {
          subcnt =  $(e.target).closest('tr').find('td[id$="_COL_value"]').text();
          tag = $(e.target).text()
        }
        var winOpend = false;
        if(!!oE && !!subcnt){
          if (tag == '024'){
            subcnt =  $(e.target).closest('tr').find('td[id$="_COL_value"]').text();
            let match = subcnt.match(/\|a\s*([^\s\|]+)\s*\|2\s*([^\s]*)/);
            if (match && !!settings.idLinks[match[2]]){
              if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                window.open(settings.idLinks[match[2]]+match[1],match[2]);
              else
                window.open(settings.idLinks[match[2]]+match[1],'_blank');
              winOpend = true;
            }
          } else if (tag == '776' || tag == '787'){
            if (!!settings.idLinks['hdl']){
              let match = tagt?subcnt.match(/\|o\s*(10\.[^\s]*)/):subcnt.match(/(10\.[^\s]*)/);
              if (match){
                if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                  window.open(settings.idLinks['hdl']+match[1],'hdl');
                else
                  window.open(settings.idLinks['hdl']+match[1],'_blank');
                winOpend = true;
              }
            }
            if (!!settings.idLinks['doi']){
              let match = tagt?subcnt.match(/\|o\s*(20\.[^\s]*)/):subcnt.match(/(20\.[^\s]*)/);
              if (match){
                if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                  window.open(settings.idLinks['doi']+match[1],'doi');
                else
                  window.open(settings.idLinks['doi']+match[1],'_blank');
                winOpend = true;
              }
            }
          } else {
            let ids = tagt?subcnt.match(/\|[09]\s*\(([^)]*)\)([^\s]+)/g):subcnt.match(/\(([^)]*)\)([^\s]+)/g);
            if (!!ids) ids.forEach(function(m,i){
              let match = m.match(/\(([^)]*)\)([^\s]+)/);
              if (match && !!settings.idLinks[match[1]] && !subcnt.includes(settings.idLinks[match[1]]+match[2])){
                window.open(settings.idLinks[match[1]]+match[2],match[1]);
                winOpend = true;
              }
            });
          }
        }
        return !winOpend;
      }
    });
    debug("idlinks simple-view installed",5).then((m)=>{console.log(m)});
  }
}

function checkACinIZ(acnr, neq0, ngt1){
  getAlmaConfig().then((config) => {
    let domain = new URL(document.URL);
    $.ajax({
      url:      domain.origin + '/view/sru/' + config.customContext.institutionCode + '?version=1.2&operation=searchRetrieve&query=alma.other_system_number_035_a_exact=' + acnr.trim(),
      type:     'GET',
      success:  function(data){
        let n = parseInt(data.getElementsByTagName('numberOfRecords').item(0).textContent);
        if (n == 0) neq0();
        if (n >1) ngt1();
      }
    });
  });
}

function checkMDEWarnings(warningList){
  [0,1,2,3,4,5].forEach(function(level){$('.marcEditor.mainContainer').removeClass('tu_lAma_Warning'+level);});
  warningList.forEach(function(v){
    var bibhol = '';
    if (!!v.bib && !v.hol && !v.gnd)
      bibhol = "table.editorTable[lama_type='bib'] ";
    else if (!!v.hol && !v.bib && !v.gnd)
      bibhol = "table.editorTable[lama_type='hol'] ";
    else if (!!v.gnd && !v.bib && !v.hol)
      bibhol = "table.editorTable[lama_type='gnd'] ";
    if (v.local != undefined && v.local != null){
      if (!v.local)
        bibhol += "tr:not(:has('td.localFieldIndication')) ";
      else
        bibhol += "tr:has('td.localFieldIndication') ";
    }
    var dubl = $(bibhol+"[ID^='MarcEditorPresenter.textArea."+v.tag+"'] textarea").filter(function(){
      var ind1 = $(this).closest('tr').find("[ID^='FieldIndicatorBox.tag."+v.tag+"'][ID$='.1']").val();
      var ind2 = $(this).closest('tr').find("[ID^='FieldIndicatorBox.tag."+v.tag+"'][ID$='.2']").val();
      return (!v.ind1 || ind1 == v.ind1 || v.ind1 == '_' && ind1 == '')
        && (!v.ind2 || ind2 == v.ind2 || v.ind2 == '_' && ind2 == '')
        && (!v.not && this.value.match(v.re) != null || !!v.not && this.value.match(v.re) == null)
    });
    if (dubl.length > 0){
      dubl.closest('.marcEditor.mainContainer').addClass('tu_lAma_Warning'+v.level);
      if (v.level <= 2){
        dubl.closest('tr').addClass('tu_lAma_Warning'+v.level);
        if (!!v.color) dubl.closest('tr').css('background-color', v.color).find('td, th').css('background-color', v.color);
      }
      browser.runtime.sendMessage({
        action: "toast",
        message: `<h3 style="color: black;">${v.msg}</h3>`,
        color: (!!v.color)?v.color:wcols[v.level],
        duration: v.level*5+5
      });
    }
  });

  if (!!settings.check689order){
    $('table.editorTable[lama_type="bib"]').each(function(i,n){
      var lind1 = -1, lind2 = -1, err = false;
      $(n).find('[ID^="MarcEditorPresenter.textArea.689"] textarea').each(function(i,n){
        $(n).closest('tr').removeClass('tu_lAma_Warning_swf');
        var ind1 = $(n).closest('tr').find("[ID^='FieldIndicatorBox.tag.'][ID$='.1']").val();
        var ind2 = $(n).closest('tr').find("[ID^='FieldIndicatorBox.tag.'][ID$='.2']").val();
        if (parseInt(ind1) == lind1 +1 && parseInt(ind2) == 0
          || parseInt(ind1) == lind1 && parseInt(ind2) == lind2 + 1){
          lind1 = parseInt(ind1);
          lind2 = parseInt(ind2);
          return;
        } else if (parseInt(ind1) == lind1 && ind2.trim() == ''){
          lind2 = 99;
          return;
        }
        $(n).closest('tr').addClass('tu_lAma_Warning_swf');
        lind1 = parseInt(ind1);
        lind2 = parseInt(ind2);
        err = true;
      });
      if (err) browser.runtime.sendMessage({
        action: "toast",
        message: `<h3 style="color: black;">Fehler in einer Schlagwortfolge!</h3>`,
        color: "lightcoral",
        duration: 20
      });
    });
  }

  if(!!settings.checktutat){
    $('table.editorTable[lama_type="bib"]').find('[ID^="MarcEditorPresenter.textArea.773"],[ID^="MarcEditorPresenter.textArea.830"]').find('textarea').each(function(i,n){
      let id = n.value.trim().match(/\$\$w (\((?:(?!\$\$).)+\))((?:(?!\$\$).)+)/);
      if (!!id && $('table.editorTable[lama_type="bib"] [ID^="MarcEditorPresenter.textArea.035"] textarea').filter((i,n)=>{return n.value.startsWith('$$a '+id[1])}).length > 0)
        checkACinIZ((id[1]+id[2]).trim(),
          ()=>{
            browser.runtime.sendMessage({
              action: "toast",
              message: '<h3 style="color: black;">Übergeordneten Titel ' + id[1]+id[2] + ' nicht in der IZ gefunden!</h3>',
              color: "lightcoral",
              duration: 20
            });
            $(n).closest('tr').addClass('tu_lAma_Warning_swf')
          },
          ()=>{
            browser.runtime.sendMessage({
              action: "toast",
              message: '<h3 style="color: black;">Übergeordneten Titel ' + id[1]+id[2] + ' mehrmals in der IZ gefunden!</h3>',
              color: "lightcoral",
              duration: 20
            });
            $(n).closest('tr').addClass('tu_lAma_Warning_swf');
          }
        );
    });
  }

  if (!!settings.m866sp) try {
    function replSpaces(){
      var asfs = $("table.editorTable[lama_type='hol'] tr").filter((i,n) => {
        return $(n).find("input[id^='FieldIndicatorBox.tag.866'][id$='1']").val() == '3'
        && $(n).find("input[id^='FieldIndicatorBox.tag.866'][id$='2']").val() == '0';
      }).find("[ID^='MarcEditorPresenter.textArea.866'] .hwt-highlights");
      asfs.each((i,n) => {
        let sfa = $(n);
        if (!sfa.html().match(/_lAma_blank/)){
          sfa.html(sfa.html().replaceAll(/<mark>\$\$a<\/mark>(.*)(<mark|$)/g,(n)=>{
            return n.replace(/ /g,'<span class="_lAma_blank">&nbsp;</span>');
          }));
        }
      });
    }

    replSpaces();
    $("table.editorTable[lama_type='hol'] [ID^='MarcEditorPresenter.textArea.866'] textarea").on("blur",function(){
      setTimeout(replSpaces, 500);
    })
  } catch(err){ console.log(err) }
}

var diffdiv = false;
let nbsp = String.fromCharCode(160);

function getMarc(active = true){
  var rows = $((active?".show":".hide") + "BorderExlibris table[id^='editorTable'] > tbody > tr:has(input[id^='FieldTagBox'])");
  if (rows.length == 0 && active) rows = $("table[id^='editorTable'] > tbody > tr:has(input[id^='FieldTagBox'])");
  var mms_id = rows.find("[id^='MarcEditorPresenter.textArea.001'] textarea").val();
  if (!mms_id) mms_id = rows.closest("table[id^='editorTable']").attr('lama_mms_id');
  let type = rows.closest("table[id^='editorTable']").attr('lama_type');
  return {
    mms_id: mms_id,
    type: type,
    rows: rows
  }
}

function getJsonMarc(rows){
  return rows.map((i,x) => {
    let r = $(x);
    let loc = (r.find('td.localFieldIndication').length > 0);
    let ind = r.find('input[id^="FieldIndicatorBox"]');
    var ind1;
    var ind2;
    if (ind.length == 2){
      ind1 = ((ind.eq(0).val().length==1)?ind.eq(0).val():' ');
      ind2 = ((ind.eq(1).val().length==1)?ind.eq(1).val():' ');
    }
    if (!!ind1)
      return {
        loc: loc,
        tag: r.find('input[id^="FieldTagBox"]').val(),
        ind1: ind1,
        ind2: ind2,
        cnt: r.find('textarea').val()
      }
    else
      return {
        loc: loc,
        tag: r.find('input[id^="FieldTagBox"]').val(),
        cnt: r.find('textarea').val()
      }
  }).get();
}

function createDiff(){
  
  let i18n = { de: {'left': 'links', 'right': 'rechts' }};

  let marc = getMarc();
  var rows = marc.rows;
  var mms_id = marc.mms_id;
  var type = marc.type;

  function getTextMarc(rows){
    return rows.map((i,x) => {
      let r = $(x);
      let loc = (r.find('td.localFieldIndication').length > 0)?'L\t':' \t';
      let ind = r.find('input[id^="FieldIndicatorBox"]');
      var inds;
      let sp = ' ';
      if (ind.length == 2){
        inds = ((ind.eq(0).val().length==1)?ind.eq(0).val():sp) + '\t'
             + ((ind.eq(1).val().length==1)?ind.eq(1).val():sp)
      } else {
        inds = sp + '\t' + sp;
      }
      return loc+r.find('input[id^="FieldTagBox"]').val() + '\t' + inds + '\t' + r.find('textarea').val(); 
    }).get().join('\n')
  }

  function getVersion(){
    return $('table.browseRecordTable tr').map((i,x)=>{
      let td = $(x).find('td');
      var i1 = td.eq(1).text();
      if (i1 == '' || i1 == nbsp) i1 = ' ';
      var i2 = td.eq(2).text();
      if (i2 == '' || i2 == nbsp) i2 = ' ';
      return ' \t'+td.eq(0).text() + '\t'+i1+'\t'+i2+'\t'+td.eq(3).text()
    }).get().join('\n')
  }

  function xMarc2tMarc(data, nz_mms_id){
    if (!!nz_mms_id){
      let nz = $(data).find('datafield[tag="035"]:has(subfield[code="a"]:contains("'+nz_mms_id+'"))');
      if (nz.length == 1){
        nz.remove();
        $(data).find('controlfield[tag="001"]').text(nz_mms_id);
      }
    }
    return $(data).find('leader, controlfield, datafield').map((i,x) => {
      let r=$(x);
      var i1 = r.attr('ind1');
      if (!i1 || i1 == ' ') i1 = ' ';
      var i2 = r.attr('ind2');
      if (!i2 || i2 == ' ') i2 = ' ';
      var text;
      var tag;
      var loc = ' \t';
      if (r.is('leader'))
        tag = 'LDR';
      else
        tag = r.attr('tag');
      if (r.is('controlfield') || r.is('leader')) text = r.text().replace(/ /g,'#');
      else {
        text = r.find('subfield').map((j,y) => {
          if ($(y).attr('code') == '9' && $(y).text().toUpperCase() == 'LOCAL'){
            loc = 'L\t';
            return '';
          } else
            return '$$' + $(y).attr('code') + ' ' + $(y).text();
        
        }).get().join(' ');
      }
      let ret = loc + tag + '\t' + i1 + '\t' + i2 + '\t' + text;
      return ret;
    }).get().join('\n');
  }

  function getHolding(holid,url){
    return new Promise(function(resolv, reject){
      let match = document.URL.match(/(https?:\/\/[^\/]*)\//);
      $.ajax({
        url:      match[1] + '/almaws/v1/bibs',
        type:     'GET',
        headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
        data: { holdings_id: holid, view: 'brief' },
        success:  function(data){
          let mms_id = $(data).find('mms_id').text();
          $.ajax({
            url:      match[1] + '/almaws/v1/bibs/'+mms_id+'/holdings/'+holid,
            type:     'GET',
            headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
            success:  function(data){resolv(data)},
            error: function(e){reject(e)}
          })
        },
        error: function(e){reject(e)}
      })
    })
  }

  function showDiff(old,act,tit){
    try {
      var dmp = new diff_match_patch();
      dmp.Diff_Timeout = 2;
      dmp.Diff_EditCost = 4;
      var diff = dmp.diff_main(old,act);
      dmp.diff_cleanupEfficiency(diff);
      var diffc = {...diff};
      debug(diffc,5).then((m)=>{console.log(m)});
      diffdiv = $('<div/>');
      for (var i=0; i < diff.length; i++) {
        if (diff[i][0] == -1) {
          if (diff[i+1] != undefined && diff[i+1][0] == 1){
            var t;
            while ((t=diff[i][1].indexOf('\t')) > -1 && diff[i+1][1].indexOf('\t') == t){
              diffdiv.append($('<del/>').html(diff[i][1].substr(0,t)));
              diff[i][1] = diff[i][1].substr(t+1);
              diffdiv.append($('<ins/>').html(diff[i+1][1].substr(0,t)));
              diff[i+1][1] = diff[i+1][1].substr(t+1);
              diffdiv.append(document.createTextNode('\t'));
            }
          }
          if (!!diff[i][1] && diff[i][1] != '\n' && diff[i][1] != '\n ') diffdiv.append($('<del/>').html(diff[i][1]));
        } else if (diff[i][0] == 1) {
          if (!!diff[i][1]) diffdiv.append($('<ins/>').html(diff[i][1]));
        } else {
          if (!!diff[i][1]) diffdiv.append(document.createTextNode(diff[i][1]));
        }
      }
      debug(diffdiv.html().replace(/\n/g,'<br/>\n'),4).then((m)=>{console.log(m)});
      diffdiv.html(diffdiv.html().replace(/\n/g,'<br/>\n').replace(/(\s|>)(\$\$(<[^>]*>)?[a-zA-Z0-9])/g,'$1<sf>$2</sf>')
        .replace(/(\n|^)([^\t]*)\t([^\t]*)\t([^\t]*)\t([^\t]*)\t/g,
          '$1<loc>$2</loc><tag>$3</tag><i1>$4</i1><i2>$5</i2>')
        .replace(/<(del|ins)>([^<]*)<\/(loc|tag|i1|i2|sf)>/g,'<$1>$2</$1></$3><$1>')
        .replace(/<(loc|tag|i1|i2|sf)>([^<]*)<\/(del|ins)>/g,'</$3><$1><$3>$2</$3>'));
    } catch(e) {console.log(e); }
    let dh3 = $('<h3/>').addClass('tuwLama_lang').attr('lang','de').text(tit.de);
    let eh3 = $('<h3/>').addClass('tuwLama_lang').attr('lang','en').text(tit.en);
    let close = $('<button/>').text('x').addClass('close').on('click',(e)=>{diffdiv.remove(); diffdiv=false; });
    diffdiv.prepend(close);
    diffdiv.prepend(dh3);
    diffdiv.prepend(eh3);
    diffdiv = $('<div/>').attr("id",'tu_lAma_diff_viewer').append(diffdiv);
    diffdiv.prepend($('<div/>').addClass('backdrop'));
    $('body').append(diffdiv);
    diffdiv.focus();
  }
  try {
    let act = getTextMarc(rows);
    if ($('table.browseRecordTable').length > 0){
      let ver = $('.navigationAndActionsBrowseSearchResults td').eq(4).text();
      let orig = ($('.navigationAndActionsBrowseSearchResults .actionPanel td').length > 0)?'':' original';
      showDiff(getVersion(),act,{ de: 'Diff zu'+orig+' Version '+ ver, en: 'Diff against'+orig+' version '+ver});
    } else if ($(".hideBorderExlibris table[id^='editorTable'] > tbody > tr:has(input[id^='FieldTagBox'])").length > 0
            && $(".hideBorderExlibris table[id^='editorTable']").attr('lama_type') == type) {
      aid = rows.closest('[id^="editorTable"]').attr('id').substr(12);
      daid = i18n.de[aid]?i18n.de[aid]:aid;
      let iamarc = getMarc(false);
      let iact = iamarc.rows;
      iaid = iact.closest('[id^="editorTable"]').attr('id').substr(12);
      diaid = i18n.de[iaid]?i18n.de[iaid]:iaid;
      showDiff(getTextMarc(iact),act,{ de: 'Diff zwischen '+daid+' und '+diaid, en: 'Diff of '+aid+' and '+iaid });
    } else {
      let match = document.URL.match(/(https?:\/\/[^\/]*)\//);
      if (type == 'hol'){
        getHolding(mms_id,match[1]).then((xml)=>{
          let old = xMarc2tMarc(xml);
          showDiff(old,act,{ de: 'Diff zur gespeicherten Version', en: 'Diff to saved version'});
        })
      } else {
        $.ajax({
          url:      match[1] + '/almaws/v1/bibs',
          type:     'GET',
          headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
          data:     { 'nz_mms_id': mms_id },
          success:  function(data){
            let old = xMarc2tMarc(data,mms_id);
            showDiff(old,act,{ de: 'Diff zur gespeicherten Version', en: 'Diff to saved version'});
          },
          error: function(){
            $.ajax({
              url:      match[1] + '/almaws/v1/bibs/'+mms_id,
              type:     'GET',
              headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
              success:  function(data){
                let old = xMarc2tMarc(data,mms_id);
                showDiff(old,act,{ de: 'Diff zur gespeicherten Version', en: 'Diff to saved version'});
              }
            })
          }
        })
      }
    }
  } catch(e) {console.log(e); }
}

function lamaTwinkle(active = false){
  
  $('body').toggleClass('tu_lAma_lb');
  browser.storage.local.set({ lamaLoadingBlocker: $('body').hasClass('tu_lAma_lb') });

  var nMdeW = $('iframe#yardsNgWrapper');
  if (nMdeW.length > 0){
    if ($('body').hasClass('tu_lAma_lb'))
      nMdeW.contents().find('body').addClass('tu_lAma_lb');
    else
      nMdeW.contents().find('body').removeClass('tu_lAma_lb');
  }
  $('#loadingBlocker').removeClass('hide');
  setTimeout(function(){$('#loadingBlocker').addClass('hide');},1500);
}

var loadingBlocker;

function showLoadingBlocker(){
  if (loadingBlocker == undefined){
    loadingBlocker = $(`<div style="z-index: 9999;" class="lAmaVisibility ng-star-inserted">
      <mat-spinner role="progressbar" tabindex="-1" color="primary" class="mat-progress-spinner
        mat-spinner mat-primary mat-progress-spinner-indeterminate-animation" mode="indeterminate" style="width: 100px; height: 100px;">
      </mat-spinner>
      <button class="closeButton ng-star-inserted">
        <i class="uxf-icon uxf-close"></i>
      </button>
    </div>`);

    $('body').append(loadingBlocker);
    loadingBlocker.find('button').on('click',function(){
      loadingBlocker.hide();
    })
  } else {
    loadingBlocker.show();
  }
}

function hideLoadingBlocker(){
  if (loadingBlocker != undefined)
    loadingBlocker.hide();
}

function showLaufzettel(e){
  e.preventDefault();
  let barcode = $(this).closest('tr, div.rowsContainer').find('input[id$="barcode"]').val();
  let match = document.URL.match(/(https?:\/\/[^\/]*)\//);
  var popupURL = browser.runtime.getURL('templates/processSlip.html?barcode='+encodeURIComponent(barcode)+'&insturl='+encodeURIComponent(match[1]));
  browser.runtime.sendMessage({
    action: "openPopup",
    popupURL: popupURL
  });
  return false;
}

function laufzettel(){
  if (!!settings.processSlip){
    if ($('body').attr('id') == 'body_id_xml_file_loan.fulfillment_patron_workspace_loan_new_ui.xml'
      || $('body').attr('id') == 'body_id_xml_file_resource_editor.physical.items_list.xml'
      || $('body').attr('id') == 'body_id_xml_file_po.poline_receiving_items_list.xml')
      $('td.listActionContainer ul:not(:has(li#processSlip))').append($('<li id="processSlip" class="clearfix"><a class="submitUrl" href="#" title="'+browser.i18n.getMessage('processSlip')+'">'+browser.i18n.getMessage('processSlip')+'</a></li>').on('click',showLaufzettel));
    if ($('body').attr('id') == 'body_id_xml_file_search.physical_item_results.xml')
      $('div.rowActionsContainer ul.internalRowActions:not(:has(li#processSlip))').append($('<li id="processSlip" class="rowAction internalRowAction"><a class="submitUrl" href="#" title="'+browser.i18n.getMessage('processSlip')+'">'+browser.i18n.getMessage('processSlip')+'</a></li>').on('click',showLaufzettel));
  }
}

function showlAmaNews(){
  var div = $('<div id="lamanews"></div>');
  div.load(browser.runtime.getURL('templates/lamaNews.html'));
  $('body').append(div);
  div.on("click",function(){div.remove()});
}

var initialized;
var newMde = false;
var newMDEWrapper = false;
var newLayout = false;

var mde = false;
var nmdeInit = false;

$(function(){

  if (document.URL.search('exlibrisgroup.com/view/uresolver') === -1
    && !document.URL.endsWith('exlibrisgroup.com/rep/yards.jsp?')
    && document.URL.search('ng/login') === -1){

    // enable tuw features
    if (!!document.URL.includes('obv-at')){
      isObv = true;
      browser.storage.local.set({ obvSeen: true });
      if (!!document.URL.includes('obv-at-ubtuw')){
        isTuw = true;
        browser.storage.local.set({ tuwSeen: true });
      }
    }

    browser.storage.local.get().then(function(result){
      settings = result;
      debug(result,3).then(function(m){console.log(m)});

      if (settings.colorScheme == undefined) settings.colorScheme = 'el';
      var idlch = false;
      if (!settings.idLinks || Object.keys(settings.idLinks).length === 0 ){
        settings.idLinks = {};
        settings.idLinks['DE-588'] = "https://lobid.org/gnd/";
        settings.idLinks.orcid = "https://orcid.org/";
        settings.idLinks.doi = "https://doi.org/";
        settings.idLinks.hdl = "http://hdl.handle.net/";
        browser.storage.local.set({ idLinks: settings.idLinks });
      }

      if (!!isObv){
        var local98 = false;
        var local99 = false;
        var local773 = false;
        settings.warningList.forEach(function(v){
          if (v.tag == '99' && v.local != undefined && v.local === false) local99 = true;
          if (v.tag == '98' && v.local != undefined && v.local === false) local98 = true;
          if (v.tag == '773' && v.ind1 != undefined && v.ind1 == '1' && v.ind2 != undefined && v.ind2 == '8'
           && v.local != undefined && v.local === false) local773 = true;
        });
        if (!local98) settings.warningList.unshift({
          bib: true, color: "#ff6666", hol: false, gnd: false, ind1: "", ind2: "", level: "2", local: false,
          msg: "Achtung! Lokales Feld auf NZ-Ebene!", not: false, re: /./, tag: "98"
        });
        if (!local99) settings.warningList.unshift({
          bib: true, color: "#ff6666", hol: false, gnd: false, ind1: "", ind2: "", level: "2", local: false,
          msg: "Achtung! Lokales Feld auf NZ-Ebene!", not: false, re: /./, tag: "99"
        })
        if (!local773) settings.warningList.unshift({
          bib: true, color: "#ff7777", hol: false, gnd: false, ind1: "1", ind2: "8", level: "2", local: false,
          msg: "Achtung! LKR-Verknüfung als lokales Feld anlegen!", not: false, re: /./, tag: "773"
        })
        if (!local98 || !local99 || !local773)
          browser.storage.local.set({ warningList: settings.warningList });
      }

      if (!document.URL.includes('/rep/yards.jsp') && document.URL.substr(-23) != 'alma.exlibrisgroup.com/'){
        if (!!settings.colorScheme && ($('title').text() != 'Md Editor' || document.URL.includes('/rep/MDEditor.jsp'))){
          debug('add class ' + settings.colorScheme + ' to body',2).then(function(m){console.log(m)});
          $('body').addClass('tu_lAma_marc_' + settings.colorScheme);
          if (!document.URL.includes('psb.alma') && !document.URL.includes('sandbox') && (!!settings.overwriteAlmaColors))
            $('body').addClass('tu_lAma_bg_' + settings.colorScheme);
        }
        if (!settings.messageToBottom)
          $('body').addClass('tu_lAma_msg_bottom');
        if (!!settings.messageCut)
          $('body').addClass('tu_lAma_msg_cut');
      }
      if (!!settings.lamaLoadingBlocker)
        $('body').addClass('tu_lAma_lb');
      if (!!settings.highContrast)
        $('body').addClass('tu_lAma_marc_hc');
      if (!!settings.markedBackg)
        $('body').addClass('tu_lAma_marked_'+settings.markedBackg);
      if (!!settings.hideLC)
        $('body').addClass('tu_lAma_hide_LC');
      if (!!settings.hideVLK)
        $('body').addClass('tu_lAma_hide_VLK');
      if (!!settings.hideRVK)
        $('body').addClass('tu_lAma_hide_RVK');
      if (!!settings.hideDC)
        $('body').addClass('tu_lAma_hide_DC');
      if (!!settings.hideVND)
        $('body').addClass('tu_lAma_hide_VND');
      if (!!settings.hideMESH)
        $('body').addClass('tu_lAma_hide_MESH');
    
      if ($('title').text() == 'Md Editor' && document.URL.includes('/rep/MDEditor.jsp')){
        debug('old mdeditor',2).then(function(m){console.log(m)});
        mde = true;
        /* da sollte wir nicht mehr herkommen */
      } else if ((document.URL.endsWith('exlibrisgroup.com/') || document.URL.includes('exlibrisgroup.com/rep/yards_ng.jsp')) && document.title == 'Md Editor'){
        debug('empty iframe?? ' + document.title,2).then(function(m){console.log(m)});
        debug(document,5).then(function(m){console.log(m)});
        if (document.title == 'Md Editor'){
          newMDEWrapper = true;
          debug('new mde wrapper in empty iframe',2).then(function(m){console.log(m)});
          // das wirkt nicht
          // window.addEventListener("keydown",    keyscan, true);
          if (!!settings.tuwsysUrl || !!settings.gndUrl || isTuw)
            $('body').addClass('tu_lAma_tuwsysac');

          $(document).on(
            'keydown.loadMdeTemplate',
            {t: { value: settings.templateName, action: function (){browser.runtime.sendMessage({action: "triggerLoadMdeTemplate"});}}},
            handleKeyEvent
          );
          $(document).on(
            'keydown.diffViewer',
            {y: { value: 'diffViewer', action: function (){browser.runtime.sendMessage({action: "diffViewer"});}},
             Escape: { value: 'closeDiffViewer', action: function (){browser.runtime.sendMessage({action: "closeDiffViewer"});}}},
            handleKeyEvent
          );
          $(document).on(
            'keydown.save',
            {s: { value: 'save', action: check852c },
             r: { value: 'saverelease', action: check852c },
             i: { value: 'newitem', action: check852c }},
            handleKeyEvent
          );

          $(document).on('click','#MenuItem_menu_records_save, #MenuItem_menu_records_addInventory, #save_dropdown',check852c);

          var gwtHeadObs = new MutationObserver(function(ms){
            ms.forEach(function(m) {
              if (m.type=='characterData'){
                let parent = $(m.target).parent();
                debug(parent,5).then(function(m){console.log(m)});
                if (!settings.keepCatLevel) checkCatlevel();
                $('.mmsIdContainer').each(link2search);
              }
            });
          });

          function link2search(i,node){
            node =$(node);
            let match = node.text().match(/\((\d+)\)/);
            if (!settings.addLinks){
              node.attr('title','Items/Exemplare');
              node.off('click.ItemSearch');
              node.on('click.ItemSearch',function(){browser.runtime.sendMessage({action: "search", what: "ITEM", id: match[1]});});
            }
            // holdings haben keinen 001
            let h1r = node.closest('[id$="header.firstRow"]');
            let holbib = h1r.parent().find('[id$="header.secondRow"]').text().match(/(Holdings|Bestand)|MARC21 (Bib)|(GND) \((Community|Gemeinschaft)\)/);
            if (!!holbib){
              let type = (!!holbib[3])?'gnd':((!!holbib[1])?'hol':'bib');
              browser.runtime.sendMessage({action: 'mms_id', value: match[1], tab: h1r.attr('id').substr(0,4), type: type });
            }
            debug(node,5).then(function(m){console.log(m)});
          }

          function checkCatlevel(){
            var matFormField = $('#gwt-headers mat-form-field.catalogerLevelCombo');
            matFormField.each((i,cl) => {
              jqcl = $(cl);
              if (jqcl.text().match(/^(\[[012][05]\]|gnd)/)){
                jqcl.removeClass('tu_lAma_catLevel');
              } else {
                jqcl.addClass('tu_lAma_catLevel');
              }
            });
          }

          var mdewobserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.removedNodes.length >0 && $(mutation.removedNodes).filter('div.gwtVisibility').length > 0 ){
                debug(mutation.removedNodes).then(function(m){console.log(m)});
                debug('habe nmde fertig',2).then(function(m){console.log(m)});
                let headhtml = $('#gwt-headers').html();
                browser.runtime.sendMessage({action: 'nMdeLoadingBlockerRemoved'});
                debug(headhtml,5).then(function(m){console.log(m)});
                setTimeout(function(){$('.mmsIdContainer').each(link2search)},1000);
                gwtHeadObs.disconnect();
                gwtHeadObs.observe($('#gwt-headers').get(0),{childList:true, subtree: true, characterData:true, characterDataOldValue:true });
                if (!settings.keepCatLevel) checkCatlevel();
              }
            });
          });

          var tries = 0;
          let mdewobserve = function(){
            if ($('mdng-layout').length == 0 && tries < 10){
              tries++;
              setTimeout(mdewobserve, 1000);
            } else if (tries == 10){
              debug("no mdng-layout in nmde wrapper",1).then(function(m){console.log(m)});
            } else {
              mdewobserver.observe($('mdng-layout').get(0), { childList:true, subtree:false });
            }
          }
          mdewobserve();
          if (!settings.keepCatLevel && $('#gwt-headers').length > 0)
            gwtHeadObs.observe($('#gwt-headers').get(0),{childList:true, subtree: true, characterData:true, characterDataOldValue:true });

          $('body').on('click',function(){
            browser.runtime.sendMessage({action: 'closeRecentSearches'});
          });
          browser.runtime.onMessage.addListener((request) => {
            debug(request,5).then(function(m){console.log(m)});
            if (request.action == 'lAmaSettingsChanged'){
              browser.storage.local.get().then(function(result){
                settings=result;
              });
            } else if (request.action == 'loadMdeTemplate'){
              debug($('div.cdk-overlay-container'),5).then(function(m){console.log(m)});
              var ltobserver = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  mutation.addedNodes.forEach(function(node) {
                    if (!!settings.templateName && $(node).find('input#search-text').length > 0){
                      ltobserver.disconnect();
                      $(node).find('input#search-text').attr("tabindex","1").val(settings.templateName).click();
                      $(node).find('button:contains(Ok)').attr("tabindex","2");
                    }
                  });
                });
              });
              if ($('div.cdk-overlay-container').length > 0){
                ltobserver.observe($('div.cdk-overlay-container').get(0), { childList:true, subtree:true });
              } else
                ltobserver.observe($('body').get(0), { childList:true, subtree:true });
            } else if (request.action == 'lang'){
              $('html').attr('lang',request.value);
            }
          });
          browser.runtime.sendMessage({action: 'getLang'});
        }

      } else if (document.URL.includes('/rep/yards_ng.jsp')){
        // gibt s das überhaupt???
        debug('new mde wrapper',2).then(function(m){console.log(m)});
        debug(document,5).then(function(m){console.log(m)});
        $('body').on('click',function(){
          browser.runtime.sendMessage({action: 'closeRecentSearches'});
        });
      } else if (document.URL.includes('/rep/yards.jsp')){
        var nmdeChanged = false;
        var nMdeChangedTimer;
        var mdeChangeObs = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (nmdeChanged) clearTimeout(nMdeChangedTimer);
              nmdeChanged = true;
              nMdeChangedTimer = setTimeout(function(){
                clearTimeout(nMdeChangedTimer);
                debug('changed nmde '+document.URL,2).then(function(m){console.log(m)});
                // gotoFirstEmpty();
                checkMDEWarnings(settings.warningList);
                tuwsys();
                nmdeChanged=false;
              },500);
          });
        });
        function observeChange(){
          mdeChangeObs.disconnect();
          nmdeChanged = false;
          try {
            mdeChangeObs.observe($('table[id^="editorTable"] > tbody').get(0),{childList:true,subtree:false});
          } catch(e){}
        }

        if (document.body.childElementCount > 0){
          // new MDE
          mde = newMde = true;
          debug('new mde',2).then(function(m){console.log(m)});
          debug(document,5).then(function(m){console.log(m)});
          if (!!settings.colorScheme){
            debug('add class ' + settings.colorScheme + ' to body',3).then(function(m){console.log(m)});
            $('body').addClass('tu_lAma_ng_marc_' + settings.colorScheme);
          }
          if (!settings.hideSH){
            $('body').addClass('tu_lAma_marc_hidesh');
          }
          if (!settings.createLinks){
            $('body').off('click.extlink');
            $('body').on('click.extlink','[id^="FieldTagBox.tag."],[id^="MarcEditorPresenter.textArea."]', function(e){
              let oE = e.originalEvent;
              var winOpend = false;
              if (!!oE && (oE.shiftKey || oE.altKey || oE.metaKey)){
                var sfu;
                if (e.currentTarget.id.startsWith("MarcEditorPresenter.textArea."))
                  sfu = $(e.currentTarget).find('textarea').val().trim();
                else
                  sfu = $(e.target).closest('table').closest('tr').find('textarea').val().trim();
                match = sfu.match(/(https?:\/\/[^\s]+)/);
                if (match){
                  var winName = '_blank';
                  if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2 && !!settings.idLinks) for (isil in settings.idLinks){
                    if (match[1].startsWith(settings.idLinks[isil])){
                      winName = isil;
                    }
                  }
                  window.open(match[1],winName);
                  winOpend = true;
                }
              }
              return !winOpend;
            });

            $('body').off('click.idlink');
            $('body').on('click.idlink','[id^="FieldTagBox.tag."],[id^="MarcEditorPresenter.textArea."]',function(e){
              let oE = e.originalEvent;
              var winOpend = false;
              if (!! oE && (oE.shiftKey || oE.altKey || oE.metaKey)){
                var sfu;
                var tag;
                var tagt = true;
                if (e.currentTarget.id.startsWith("MarcEditorPresenter.textArea.")){
                  tagt = false;
                  sfu = $(e.currentTarget).find('textarea').val().trim();
                  tag = $(e.target).closest('tr').find('[id^="FieldTagBox.tag."]').val().trim();
                } else {
                  target = 'tag';
                  sfu = $(e.target).closest('table').closest('tr').find('textarea').val().trim();
                  tag = $(e.target).val().trim();
                }
                if (tag == '024'){
                  let match = tagt?sfu.match(/\$\$a\s*([^\s\|]+)\s*\$\$2\s*([^\s]*)/):sfu.match(/([^\s\|]+)\s*\$\$2\s*([^\s]*)/);
                  if (match && !!settings.idLinks[match[2]]){
                    if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                      window.open(settings.idLinks[match[2]]+match[1],match[2]);
                    else
                      window.open(settings.idLinks[match[2]]+match[1],'_blank');
                    winOpend = true;
                  }
                } else if (tag == '776' || tag == '787'){
                  if (!!settings.idLinks['hdl']){
                    let match = tagt?sfu.match(/\$\$o\s*(10\.[^\s]*)/):sfu.match(/(10\.[^\s]*)/);
                    if (match){
                      if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                        window.open(settings.idLinks['hdl']+match[1],'hdl');
                      else
                        window.open(settings.idLinks['hdl']+match[1],'_blank');
                      winOpend = true;
                    }
                  }
                  if (!!settings.idLinks['doi']){
                    let match = tagt?sfu.match(/\$\$o\s*(20\.[^\s]*)/):sfu.match(/(20\.[^\s]*)/);
                    if (match){
                      if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                        window.open(settings.idLinks['doi']+match[1],'doi');
                      else
                        window.open(settings.idLinks['doi']+match[1],'_blank');
                      winOpend = true;
                    }
                  }
                } else {
                  let match = tagt?sfu.match(/\$\$[09]\s*\(([^)]*)\)([^\s]+)/g):sfu.match(/\(([^)]*)\)([^\s]+)/g);
                  !!match && match.forEach(function(m,i){
                    let match = tagt?m.match(/\$\$[09]\s*\(([^)]*)\)([^\s]+)/):m.match(/\(([^)]*)\)([^\s]+)/);
                    if (match && !!settings.idLinks[match[1]] && !sfu.includes(settings.idLinks[match[1]]+match[2])){
                      if (oE.shiftKey + oE.ctrlKey + oE.altKey + oE.metaKey < 2)
                        window.open(settings.idLinks[match[1]]+match[2],match[1]);
                      else
                        window.open(settings.idLinks[match[1]]+match[2],'_blank');
                      winOpend = true;
                    }
                  });
                }
              }
              return !winOpend;
            });
          }
          $('body').on('click',function(){
            browser.runtime.sendMessage({action: 'closeRecentSearches'});
          });
          $('body').on("focus","div[id^='MarcEditorPresenter.textArea'] textarea", startAutocomplete);
          // $('body').on("blur","div[id^='MarcEditorPresenter.textArea'] textarea", console.log);
          // enable MDE short-cuts
          window.addEventListener("keydown",  keyscan, true);
          browser.runtime.onMessage.addListener((request) => {
            debug(request,5).then(function(m){console.log(m)});
            if (request.action == 'lAmaSettingsChanged'){
              browser.storage.local.get().then(function(result){
                settings=result;
              });
            } else if (request.action == 'nMdeLoadingBlockerRemoved'){ // } || request.action == 'yardsMarcEditorServiceCompleted'){
              // kommen wir hier innerhalb 500 msec nochmal her starten wir den timer neu
              if (nmdeInit) clearInterval(nMdeInitTimer);
              nmdeInit = true;
              var delay = 0;
              nMdeInitTimer = setInterval(function(){
                // während ein bookmarklet läuft machen wir nichts
                // erst wenn sich 15s nichts mehr rührt
                // dann warnen, dass sich das bookmarklet aufgehängt hat und aufräumen???
                if (delay > 30 || $('#tu_lAma_blocker').length == 0){
                  if (delay > 0){
                    debug('bookmarklet-timeout nach '+(delay/2)+'sec',5).then(function(m){console.log(m)});
                    browser.runtime.sendMessage({action: 'bookmarkletTimeout'});
                    $('#tu_lAma_blocker').remove();
                  }
                  clearInterval(nMdeInitTimer);
                  debug('init nmde '+document.URL,2).then(function(m){console.log(m)});
                  gotoFirstEmpty();
                  tuwsys();
                  checkMDEWarnings(settings.warningList);
                  checkbug00576546();
                  nmdeInit=false;
                  if (isTuw && !!settings.tuwsysUrl && settings.tuwsysUrl != '' || !!settings.gndUrl) observeChange();
                }
                delay++;
              },500);
            } else if (request.action == 'triggerLoadMdeTemplate'){
              load_template(settings.templateName);
            } else if (request.action == 'lang'){
              $('html').attr('lang',request.value);
            } else if (request.action == 'diffViewer'){
              createDiff();
            } else if (request.action == 'closeDiffViewer'){
              $('#tu_lAma_diff_viewer').remove();
            } else if (request.action == 'mms_id'){
              $("[id^='editorTable-"+request.tab+"']").attr('lama_mms_id',request.value);
              $("[id^='editorTable-"+request.tab+"']").attr('lama_type',request.type);
            }
          });
          browser.runtime.sendMessage({action: 'getLang'});
        }
      } else {
        newLayout = (document.URL.search('.exlibrisgroup.com/ng') > 0);
        debug(newLayout?'new layout':'old layout',2).then(function(m){console.log(m)});

        function versionCompare(a, b) {
          if (a === b) return false;
          let a_components = a.split(".");
          let b_components = b.split(".");
          let len = Math.min(a_components.length, b_components.length);
          for (var i = 0; i < len; i++) {
              if (parseInt(a_components[i]) > parseInt(b_components[i])) return true;
              if (parseInt(a_components[i]) < parseInt(b_components[i])) return false;
          }
          if (a_components.length > b_components.length) return true;
          if (a_components.length < b_components.length) return false;
          return false;
        }

        if (newLayout && versionCompare(browser.runtime.getManifest().version,(!!settings.newsLevel?settings.newsLevel:"0"))){
          showlAmaNews();
          if (versionCompare('1.99.12',(!!settings.newsLevel?settings.newsLevel:"0"))){
            settings.checkBug00576546 = !isObv;
            browser.storage.local.set({ checkBug00576546: !isObv });
          }
          browser.storage.local.set({ newsLevel: browser.runtime.getManifest().version });
        }

        var idobserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.type == "attributes" && mutation.attributeName == "id") {
              debug(mutation,5).then(function(m){console.log(m)});
              enable_key_shortcuts();
              laufzettel();
              if ($('body').is('[id*="record_simple_view"]')){
                addRecordViewLinks();
                addColorTemplate();
              } else if (settings.gotoReceive && $('body').is('[id*="body_id_xml_file_invoice.invoice_summary_tab.xml"],[id*="body_id_xml_file_invoice.invoice_wizard_lines_tab.xml"]')){
                addSaveInvoiceAndGotoReceive();
              } else if (invoiceNR && $('body').is('[id*="body_id_xml_file_po.poline_receiving_list.xml"]')){
                $('#SEARCH_OPTION_ID_poLineList_INVOICE_NUMBER').prop('selected',true);
                $('#find_poLineList').val(invoiceNR);
                $('#search-go-button-poLineList').click();
                invoiceNR = false;
              } else {
                $('body').removeClass('tu_lAma_Dublette');
              }
              debug(mutation.target.id,4).then(function(m){console.log(m)});
            }
          });
        });

        idobserver.observe($('body').get(0), { attributes: true, childList:false, subtree:false });

        var atrdy_readyTimer;
        var atdrv_observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(m) {
            if (m.addedNodes.length == 1) debug(m.addedNodes[0].nodeName + '#' + m.addedNodes[0].id, 5).then(function(m){console.log(m)});
            if (m.addedNodes.length == 1 && m.addedNodes[0].nodeName == 'HEP-BIB-RECORD-VIEW-ROW'){
              clearTimeout(atrdy_readyTimer);
              atrdy_readyTimer = setTimeout(checkWarnings,500,'#all_titles_details_record_view');
            }
          });
        });

        var holdede_readyTimer;
        var holdede_observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(m) {
            if (m.addedNodes.length == 1 && m.addedNodes[0].nodeName == 'TR'){
              clearTimeout(holdede_readyTimer);
              holdede_readyTimer = setTimeout(checkHolding,500,$('#holdings_details_description table'));
            }
          });
        });
        // console.log($('app-container'));
        debug('outside ' + $('body').attr('id') + ' url: ' + document.URL, 2).then(function(m){console.log(m)});
        browser.runtime.onMessage.addListener((request) => {
          debug("Message from the background script:",2).then(function(m){console.log(m)});
          debug(request,2).then(function(m){console.log(m)});
          if (request.action == 'lAmaSettingsChanged'){
            browser.storage.local.get().then(function(result){
              settings=result;
            });
          } else if (request.action == 'shownews'){
            showlAmaNews();
          } else if (request.action == 'search'){
            setSimpleSearchKey(request.what);
            $('#ALMA_MENU_TOP_NAV_Search_Text').val(request.id).trigger('change');
            $('button#simpleSearchBtn').trigger('click');
          } else if (request.action == 'historyStateUpdated'){

            debug($('body').attr('id'),3).then(function(m){console.log(m)});
            if (invoiceNR && $('body').is('[id*="body_id_xml_file_invoice.invoice_list_including_tabs.xml"]') && document.URL.search('pageBean.listStatus%3DWAITING') > 0){
              gotoReceive(invoiceNR);
            } else if (invoiceNR && $('body').is('[id*="body_id_xml_file_invoice.invoice_list_including_tabs.xml"]') && document.URL.search('xmlFileName%3Dpo.poline_receiving_list.xml') < 0){
              invoiceNR = false;
            } else if (document.URL.indexOf('/ng/alma/rep/search/') > 0 && document.URL.indexOf('titles/simple/results') > 0){
              let atdrv = $('ex-side-by-side as-split as-split-area.ex-side-by-side-right .ex-items-layout-content');
              if (atdrv.length > 0){
                atdrv_observer.disconnect();
                atdrv_observer.observe(atdrv.get(0),{childList:true,subtree:true,attributes:false});
                clearTimeout(atrdy_readyTimer);
                atrdy_readyTimer = setTimeout(checkWarnings,500,'#all_titles_details_record_view');
              }
            } else if (document.URL.indexOf('/ng/alma/rep/search/') > 0 && document.URL.indexOf('holdings-ng/simple/results') > 0){
              let holdede = $('ex-side-by-side as-split as-split-area.ex-side-by-side-right .ex-list-layout-right');
              if (holdede.length > 0){
                holdede_observer.disconnect();
                holdede_observer.observe(holdede.get(0),{childList:true,subtree:true,attributes:false});
                clearTimeout(holdede_readyTimer);
                holdede_readyTimer = setTimeout(checkHolding,500,$('#holdings_details_description table'));
              }
            }
            enable_key_shortcuts();
            // laufzettel();
          } else if (request.action == 'toast'){
            toast(request.message, request.color, request.duration);
          } else if (request.action == 'closeRecentSearches'){
            $('#recentSearchesContainer').removeClass('open');
          } else if (request.action == 'checkLocation'){
            if (!!settings.locationIPURL && settings.selectedLocation != undefined && settings.selectedLocation[1] != undefined && $('location-pinable-menu button').first().text() != settings.selectedLocation[1]){
              toast('<h3 style="color: black;">Bitte den Standort auf '+ settings.selectedLocation[1] + ' ändern!</h3>', wcols[5],20);
              $('location-pinable-menu button').get(0).dispatchEvent(click);
            }
          } else if (request.action == 'getLang'){
            browser.runtime.sendMessage({action: 'lang', value: $('html').attr('lang')});
          }
        });
        enable_key_shortcuts();

        $('#MENU_LOCATION_LIST_hiddenSelect, #MENU_LOCATION_LIST').on('change',function(){
          debug(this.value,2).then(function(m){console.log(m)});
        });
        $('html').on('hashchange',function(e){
          debug(this,3).then(function(m){console.log(m)});
          debug(e,3).then(function(m){console.log(m)});
        });

        var lbsiobserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.target.className == 'hide' || mutation.target.className == 'hidden'){
              laufzettel();
              if ($('body').is('[id*="record_simple_view"]')){
                addRecordViewLinks();
                addColorTemplate();
              } else {
                $('body').removeClass('tu_lAma_Dublette');
              }
            }
          });
        });
        if ($('#loadingBlockerStatusIdentifier').length > 0)
          lbsiobserver.observe($('#loadingBlockerStatusIdentifier').get(0),{childList:false,subtree:false,attributes:true});
        else
          debug('no loading blocker!',4).then(function(m){console.log(m)});

        toast();
      }
    });
    debug('TU lAma loaded ' + document.URL,0).then(function(m){console.log(m)});
  } else {
    debug('primo iframe ignored',1).then(function(m){console.log(m)});
  }
});
