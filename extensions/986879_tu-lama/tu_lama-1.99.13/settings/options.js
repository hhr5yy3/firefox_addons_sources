/* 
  TU lAma - let Alma be more adroit

  settings script
 
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

function saveOptions(e) {
  $('body').css({opacity: 0.5});
  e.preventDefault();

  var warningValues = $('tbody.warningValues');
  var warningList = new Array;
  warningValues.each(function(i,e){
    if ($(e).find('#warningRegExp').val() != ''){
      try {
        var re=new RegExp($(e).find('#warningRegExp').val(), $(e).find('#warningReFlag').val());
        warningList.push({
          local: $(e).find('#warningNotLocal').prop("checked")?false:($(e).find('#warningLocal').prop("checked")?true:null),
          tag: $(e).find('#warningTag').val(),
          ind1: $(e).find('#warningInd1').val(),
          ind2: $(e).find('#warningInd2').val(),
          re: re,
          level: $(e).find('#warningLevel').val(),
          msg: $(e).find('#warningMsg').val(),
          color: $(e).find('#warningColor').val(),
          not: $(e).find('#warningNot').prop("checked"),
          bib: $(e).find('#warningBib').prop("checked"),
          hol: $(e).find('#warningHol').prop("checked"),
          gnd: $(e).find('#warningGND').prop("checked")
        });
      } catch(e){
        alert("Fehler in der Regular Expression!\n\n"+e);
        console.log(e);
        return false;
      }
    }
  });

  var acListValues = $('tbody.acListValues');
  var acList = new Array;
  acListValues.each(function(i,e){
    if ($(e).find('#acListTag').val() != ''){
      try {
        var re=new RegExp('^(' + $(e).find('#acListTag').val() + ')');
        acList.push({
          tag: re,
          url: $(e).find('#acListUrl').val(),
          sfOnly: $(e).find('#acListSfOnly').val(),
          bib: $(e).find('#acListBib').prop("checked"),
          hol: $(e).find('#acListHol').prop("checked"),
          gnd: $(e).find('#acListGND').prop("checked"),
          all: $(e).find('#acListAll').prop("checked"),
          both: $(e).find('#acListBoth').prop("checked"),
          extSF: $(e).find('#acListExtra').prop("checked"),
          fast: $(e).find('#acListFast').prop("checked"),
          key: $(e).find('#acListKey').val()
        });
      } catch(e){
        alert("Fehler in der Regular Expression!\n\n"+e);
        console.log(e);
        return false;
      }
    }
  });

  var idLinksValues = $('tbody.idLinksValues');
  var idLinks = new Object;
  idLinksValues.each(function(i,e){
    if ($(e).find('#idLinksISIL').val() != '' && $(e).find('#idLinksLink').val() != ''){
      let isil = $(e).find('#idLinksISIL').val();
      idLinks[isil] = $(e).find('#idLinksLink').val();
    }
  });

  let locationIPURL = document.querySelector('#locationIPURL').value.trim();

  browser.storage.local.set({
    loansUrl: document.querySelector('#loansUrl').value.trim(),
    bmsUrl: document.querySelector('#bmsUrl').value.trim(),
    tuwsysUrl: document.querySelector('#tuwsysUrl').value.trim(),
    gndUrl: $('#gndUrl').prop("checked")?$('#gndUrl').val().trim():false,
    lobidUrl: $('#lobidUrl').val().trim(),
    creatorAC: $('#creatorAC').prop("checked"),
    tissorcUrl: $('#tissorcUrl').prop("checked")?$('#tissorcUrl').val().trim():false,
    processSlip: $('#processSlip').prop("checked"),
    lockPriKey: document.querySelector('#lockPriKey').value,
    unlockPriKey: document.querySelector('#unlockPriKey').value,
    disabledBmlsCats: $('#bmsCats').val(),
    keepCatLevel: !$('#keepCatLevel').prop("checked"),
    checkBug00576546: !$('#checkBug00576546').prop("checked"),
    goto1stEmpty: !$('#goto1stEmpty').prop("checked"),
    goto001: !$('#goto001').prop("checked"),
    addLinks: !$('#addLinks').prop("checked"),
    addPortfolio: !!$('#addPortfolio').prop("checked"),
    templateName: document.querySelector('#templateName').value,
    add852c: document.querySelector('#add852c').value,
    locationIPURL: locationIPURL,
    colorScheme: $('#colorScheme').val(),
    markedBackg: $('#markedBackg').val(),
    overwriteAlmaColors: $('#overwriteAlmaColors').prop("checked"),
    highContrast: $('#highContrast').prop("checked"),
    m866sp: $('#m866sp').prop("checked"),
    check689order: $('#check689order').prop("checked"),
    checktutat: $('#checktutat').prop("checked"),
    messageToBottom: !$('#messageToBottom').prop("checked"),
    messageCut: $('#messageCut').prop("checked"),
    hideLC: $('#hideLC').prop("checked"),
    hideVLK: $('#hideVLK').prop("checked"),
    hideRVK: $('#hideRVK').prop("checked"),
    hideDC: $('#hideDC').prop("checked"),
    hideVND: $('#hideVND').prop("checked"),
    hideMESH: $('#hideMESH').prop("checked"),
    hideSH: !$('#hideSH').prop("checked"),
    gotoReceive: $('#gotoReceive').prop("checked"),
    debugLevel: $('#debugLevel').val(),
    warningList: warningList,
    createLinks: !$('#createLinks').prop("checked"),
    idLinks: idLinks,
    acList: acList
  }).then(function(){
    // check origins permissions
    // and open permissions tab if needed, requesting new permissions is not working in about:addons
    var permissions = [];
    var origins = [];
    for (let urlId of ['bmsUrl','loansUrl','tuwsysUrl','locationIPURL','gndUrl','lobidUrl','tissorcUrl','acListUrl']){
      var origin = document.querySelector('[id="'+urlId+'"]').value.trim();
      if (origin != '' && (urlId != 'gndUrl' || $('#gndUrl').prop("checked"))
          && (urlId != 'tissorcUrl' || $('#tissorcUrl').prop("checked"))){
        if (origin.substr(-1) != '/') origin = origin + '/';
        origins.push(origin);
        // if (urlId == 'locationIPURL') permissions.push("webRequestBlocking");
      }
    }
    if (tuwSeen) origins.push('https://tiss.tuwien.ac.at/');
    if (origins.length > 0){
      try{
        browser.permissions.contains({origins: origins,permissions: permissions}).then((result) => {
          if (!result){
            browser.tabs.create({
              url: browser.runtime.getURL("permissions.html")
            });
          }
        });
      } catch(err){alert(err)}
    }
  });

  if (locationIPURL != undefined && locationIPURL != ''){
    if (locationIPURL == 'https://almagw.ub.tuwien.ac.at/tulama/locMap.json' || locationIPURL == 'https://almagw.ub.tuwien.ac.at/tulama/locMapName.json'){
      locationIPURL = 'https://almagw.ub.tuwien.ac.at/tulama/locMap.php'
      browser.storage.local.set({locationIPURL:locationIPURL});
    }
    var xhrlm = new XMLHttpRequest();
    console.log('loaded IP to Location map from ' + locationIPURL);
    xhrlm.responseType = 'json';
    xhrlm.open("GET", locationIPURL + "?nocache_"+(new Date()).getTime());
    xhrlm.onreadystatechange = function () {
      if (xhrlm.readyState === 4 && xhrlm.status === 200) {
        console.log(xhrlm.response);
        browser.storage.local.set({selectedLocation: xhrlm.response});
      }
    };
    xhrlm.send(null);
  }
  browser.tabs.query({url: "*://*.exlibrisgroup.com/*"}).then(
    function (tabs) {
      for (let tab of tabs) {
        browser.tabs.sendMessage(
          tab.id,
          { action: 'lAmaSettingsChanged' }
        );
      }
    }
  );
  $('body').delay(500).animate({opacity: 1});
}

var tuwSeen;

function restoreOptions() {
  
  var warningList = $('tbody.warningValues').first().clone();
  $('#addWarningRule').on('click',addWarningRule);
  function clearWarningRule(){
    console.log(this);
    $(this).closest('tbody').remove();
  }
  function addWarningRule(){
    $('table#warningList').append(warningList.clone());
    $('table#warningList #clearWarningRule').on('click',clearWarningRule);
  }

  var idLinks = $('tbody.idLinksValues').first().clone();
  $('#addIdLink').on('click',addIdLink);
  function addIdLink(){
    $('table#idLinksList').append(idLinks.clone());
    $('table#idLinksList #clearIdLink').on('click',clearWarningRule);
  }

  var acList = $('tbody.acListValues').first().clone();
  $('#addAcList').on('click',addAcEntry);
  function addAcEntry(){
    $('table#acList').append(acList.clone());
    $('table#acList #clearAcEntry').on('click',clearWarningRule);
  }
  function setCurrentChoice(result) {
    tuwSeen = !!result.tuwSeen;
    if (!!result.tuwSeen) $('body').removeClass('tuw');
    if (!result.bmsUrl && !!result.tuwSeen || result.bmsUrl == 'https://almagw.ub.tuwien.ac.at/ubintern/bmls/')
      result.bmsUrl = 'https://almagw.ub.tuwien.ac.at/tulama/bmls/';
    document.querySelector('#loansUrl').value = result.loansUrl || '';
    document.querySelector('#bmsUrl').value = result.bmsUrl || '';
    document.querySelector('#tuwsysUrl').value = result.tuwsysUrl || '';
    $('#gotoReceive').prop("checked", !!result.gotoReceive).trigger('change');
    $('#processSlip').prop("checked", !!result.processSlip).trigger('change');
    document.querySelector('#lockPriKey').value = result.lockPriKey || '';
    document.querySelector('#unlockPriKey').value = result.unlockPriKey || '';
    // document.querySelector('#').value = result. || '';
    document.querySelector('#templateName').value = result.templateName || '0_SE-3-SYS';
    document.querySelector('#add852c').value = result.add852c || 'UNASSIGNED';
    $('#selectLocation').prop("checked",!result.selectLocation).trigger('change');
    $('#hideSH').prop("checked",!result.hideSH).trigger('change');
    $('#createLinks').prop("checked",!result.createLinks).trigger('change');
    $('#m866sp').prop("checked",!!result.m866sp).trigger('change');
    $('#check689order').prop("checked",!!result.check689order).trigger('change');
    $('#checktutat').prop("checked",!!result.checktutat).trigger('change');
    
    if (!!result.idLinks){
      var wlTable = $('table#idLinksList');
      var idLinksValues = $('tbody.idLinksValues');
      var line = $(idLinksValues.get(0));
      for(i in result.idLinks){
        line.find('#idLinksISIL').val(i);
        line.find('#idLinksLink').val(result.idLinks[i]);
        wlTable.append(line = idLinks.clone());
      };
      $('table#idLinksList #clearIdLink').on('click',clearWarningRule);
    }

    if (!!result.acList){
      var wlTable = $('table#acList');
      var acListValues = $('tbody.acListValues');
      var line = $(acListValues.get(0));
      for(acl of result.acList){
        line.find('#acListTag').val(acl.tag.source.substr(2,acl.tag.source.length-3));
        line.find('#acListUrl').val(acl.url);
        line.find('#acListSfOnly').val(acl.sfOnly);
        line.find('#acListBib').prop("checked",!!acl.bib);
        line.find('#acListHol').prop("checked",!!acl.hol);
        line.find('#acListGND').prop("checked",!!acl.gnd);
        line.find('#acListAll').prop("checked",!!acl.all);
        line.find('#acListBoth').prop("checked",!!acl.both);
        line.find('#acListExtra').prop("checked",!!acl.extSF);
        line.find('#acListFast').prop("checked",!!acl.fast);
        line.find('#acListKey').val(acl.key)
        wlTable.append(line = acList.clone());
      };
      $('table#acList #clearAcEntry').on('click',clearWarningRule);
    }

    if (!!result.warningList){
      var wlTable = $('table#warningList');
      for (var i=0; i<result.warningList.length; i++){
        wlTable.append(warningList.clone());
      }
      var warningValues = $('tbody.warningValues');
      for (var i=0; i<result.warningList.length; i++){      
        var line = $(warningValues.get(i));
        var vals = result.warningList[i];
        if(vals.local != undefined && vals.local != null){
          if (!vals.local)
            line.find('#warningNotLocal').prop("checked",true);
          else
            line.find('#warningLocal').prop("checked",true);
        }
        line.find('#warningTag').val(vals.tag);
        line.find('#warningInd1').val(vals.ind1);
        line.find('#warningInd2').val(vals.ind2);
        line.find('#warningRegExp').val(vals.re.source);
        line.find('#warningReFlag').val(vals.re.flags);
        line.find('#warningColor').val(vals.color);
        line.find('#warningLevel').val(vals.level);
        line.find('#warningMsg').val(vals.msg);
        line.find('#warningNot').prop("checked",!!vals.not);
        line.find('#warningBib').prop("checked",!!vals.bib);
        line.find('#warningHol').prop("checked",!!vals.hol);
        line.find('#warningGND').prop("checked",!!vals.gnd);
      }
      $('table#warningList #clearWarningRule').on('click',clearWarningRule);
    }
    var cats = "<select multiple='multiple' id='bmsCats' name='bmsCats' size='1'>\n";
    if (!!result.bmlsCats){
      result.bmlsCats.forEach(function(cat){ cats += "<option id='" + cat.cat + "' title='"+cat.tit+"' value='" + cat.cat + "'>"+ cat.cat + "</option>\n"; });
    }
    var msel = $(cats + "</select>");
    $('#bmsCatsTd').empty().append(msel);
    if (!result.disabledBmlsCats){ result.disabledBmlsCats = [ 'onetime','hss','stb','erw' ]; }
    if (!!result.bmlsCats){
      result.disabledBmlsCats.forEach(function(cat){$('option#'+cat).prop('selected',true).trigger('change');});
    }
    if (!!result.colorScheme){
      $('#colorScheme option#'+result.colorScheme).prop('selected',true).trigger('change');
    }
    if (!!result.markedBackg){
      $('#markedBackg option#'+result.markedBackg).prop('selected',true).trigger('change');
    }
    if (!!result.debugLevel){
      $('#debugLevel option#'+result.debugLevel).prop('selected',true).trigger('change');
    }
    $('#overwriteAlmaColors').prop("checked",!!result.overwriteAlmaColors).trigger('change');
    $('#highContrast').prop("checked",!!result.highContrast).trigger('change');
    $('#keepCatLevel').prop("checked",!result.keepCatLevel).trigger('change');
    $('#checkBug00576546').prop("checked",!result.checkBug00576546).trigger('change');
    $('#goto1stEmpty').prop("checked",!result.goto1stEmpty).trigger('change');
    $('#goto001').prop("checked",!result.goto001).trigger('change');
    $('#addLinks').prop("checked",!result.addLinks).trigger('change');
    $('#addPortfolio').prop("checked",!!result.addPortfolio).trigger('change');
    $('#messageToBottom').prop("checked",!result.messageToBottom).trigger('change');
    $('#messageCut').prop("checked",!!result.messageCut).trigger('change');
    $('#hideLC').prop("checked",!!result.hideLC).trigger('change');
    $('#hideVLK').prop("checked",!!result.hideVLK).trigger('change');
    $('#hideRVK').prop("checked",!!result.hideRVK).trigger('change');
    $('#hideDC').prop("checked",!!result.hideDC).trigger('change');
    $('#hideVND').prop("checked",!!result.hideVND).trigger('change');
    $('#hideMESH').prop("checked",!!result.hideMESH).trigger('change');
    $('#gndUrl').prop("checked",!!result.gndUrl).trigger('change');
    $('#tissorcUrl').prop("checked",!!result.tissorcUrl).trigger('change');
    document.querySelector('#lobidUrl').value = result.lobidUrl || '';
    if (!result.lobidUrl && !result.gndUrl) $('#creatorAC').attr('disabled','disabled');
    else $('#creatorAC').prop("checked",!!result.creatorAC).trigger('change');
    document.querySelector('#locationIPURL').value = result.locationIPURL || '';

    $('#gndUrl,#lobidUrl').on('change',function(){
      $('#creatorAC').prop('disabled', !$('#gndUrl').prop("checked") && !$('#lobidUrl').val());
    });
  }
  function onError(error) {
    console.log('Error: ${error}')
  }
  var getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError)
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
$('[data-i18n]').each(function () {
  var dataI18n = $(this).data('i18n');
  // var innerHtml = $(this).html();
  $(this).html(browser.i18n.getMessage(dataI18n))
});
