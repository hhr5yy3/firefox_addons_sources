var dialog;

function itemTemplateSettings(){
  if (dialog != undefined) dialog.remove();
  dialog = $(`
    <style>
      #itemTemplateSettings .extStatNotes .right, #itemTemplateSettings .extStatNotes.right { margin-left: 250px; }
      #itemTemplateSettings .right { margin-left: 42px; }
      #itemTemplateSettings br { clear: both; }
      #itemTemplateSettings label { margin-bottom: 0; }
      #itemTemplateSettings select, #itemTemplateSettings input { margin-top: 8px; }
      #itemTemplateSettings button { margin-left: 100px; }
      #itemTemplateSettings { position: fixed; bottom: 20px; display: none; width: 100%; z-index: 10000; }
      #itemTemplateSettings span.de, #itemTemplateSettings span.en  { display: none; }
      .extStatNotes, .extIntNotes { display: none; }
      #innerItemTemplateSettings label { clear: both; }
      html[lang='de'] #itemTemplateSettings span.de { display: inline; }
      html[lang='en'] #itemTemplateSettings span.en { display: inline; }
    </style>
    <div id='itemTemplateSettings'>
      <div id='innerItemTemplateSettings' style='width: 900px; margin: auto; background: white; padding: 5px; border: solid #666 1px; border-radius: 4px;'>
        <div class="row">
          <label><input type='checkbox' id='tu_lAma_itemTemplMoveStatNote' name='tu_lAma_itemTemplMoveStatNote' checked="checked"/></label>
          <span class="control-label height34 displayTable lineHeight35 padSides5 fontReg">
            <span class='de'>Statistiknotizen verschieben bzw. an Notiz 3 anhängen</span>
            <span class='en'>Move statistics notes down and collect in note 3</span>
          </span>
        </div>
        <div class="row">
          <label for='tu_lAma_itemTemplStatNote1'>
            <span class='de displayTableCell verticalMiddle'>Statistiknotiz 1</span>
            <span class='en displayTableCell verticalMiddle'>Statistics note 1</span>
          </label>
          <div class="col"><input type='text' id='tu_lAma_itemTemplStatNote1' name='tu_lAma_itemTemplStatNote1' placeholder='Stat Note 1' size='9'/>
            <span class="extStatNotes right">
              prepend <input type="radio" id="tu_lAma_itemTemplStatNote1Beha" name="tu_lAma_itemTemplStatNote1Beha" value="prepend" checked="checked">&nbsp;&nbsp;
              append <input type="radio" id="tu_lAma_itemTemplStatNote1Beha" name="tu_lAma_itemTemplStatNote1Beha" value="append">&nbsp;&nbsp;
              replace <input type="radio" id="tu_lAma_itemTemplStatNote1Beha" name="tu_lAma_itemTemplStatNote1Beha" value="replace">
            </span>
          </div>
        </div>
        <div class="extStatNotes">
          <div class="row">
            <label for='tu_lAma_itemTemplStatNote2'>
              <span class='de displayTableCell verticalMiddle'>Statistiknotiz 2</span>
              <span class='en displayTableCell verticalMiddle'>Statistics note 2</span>
            </label>
            <div class="col"><input type='text' id='tu_lAma_itemTemplStatNote2' name='tu_lAma_itemTemplStatNote2' placeholder='Stat Note 2' size='9'/>
              <span class="right">
                prepend <input type="radio" id="tu_lAma_itemTemplStatNote2Beha" name="tu_lAma_itemTemplStatNote2Beha" value="prepend" checked="checked">&nbsp;&nbsp;
                append <input type="radio" id="tu_lAma_itemTemplStatNote2Beha" name="tu_lAma_itemTemplStatNote2Beha" value="append">&nbsp;&nbsp;
                replace <input type="radio" id="tu_lAma_itemTemplStatNote2Beha" name="tu_lAma_itemTemplStatNote2Beha" value="replace">
              </span>
            </div>
          </div>
          <div class="row">
            <label for='tu_lAma_itemTemplStatNote3'>
              <span class='de displayTableCell verticalMiddle'>Statistiknotiz 3</span>
              <span class='en displayTableCell verticalMiddle'>Statistics note 3</span>
            </label>
            <div class="col"><input type='text' id='tu_lAma_itemTemplStatNote3' name='tu_lAma_itemTemplStatNote3' placeholder='Stat Note 3' size='9'/>
              <span class="right">
                prepend <input type="radio" id="tu_lAma_itemTemplStatNote3Beha" name="tu_lAma_itemTemplStatNote3Beha" value="prepend" checked="checked">&nbsp;&nbsp;
                append <input type="radio" id="tu_lAma_itemTemplStatNote3Beha" name="tu_lAma_itemTemplStatNote3Beha" value="append">&nbsp;&nbsp;
                replace <input type="radio" id="tu_lAma_itemTemplStatNote3Beha" name="tu_lAma_itemTemplStatNote3Beha" value="replace">
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <label><input type='checkbox' id='tu_lAma_itemTemplMoveIntNote' name='tu_lAma_itemTemplMoveIntNote' checked="checked"/></label>
          <span class="control-label height34 displayTable lineHeight35 padSides5 fontReg">
            <span class='de'>Interne Notizen verschieben bzw. an Notiz 3 anhängen</span>
            <span class='en'>Move internal notes down and collect in note 3</span>
          </span>
        </div>
        <div class="row">
          <label for='tu_lAma_itemTemplIntNote1'>
            <span class='de displayTableCell verticalMiddle'>Interne Notiz 1</span>
            <span class='en displayTableCell verticalMiddle'>Internal note 1</span>
          </label>
          <div class="col">
            <input type='text' id='tu_lAma_itemTemplIntNote1' name='tu_lAma_itemTemplIntNote1' placeholder='Internal Note 1 created on {DATE}' size='35'/>
            <span class="extIntNotes right">
              prepend <input type="radio" id="tu_lAma_itemTemplIntNote1Beha" name="tu_lAma_itemTemplIntNote1Beha" value="prepend" checked="checked">&nbsp;&nbsp;
              append <input type="radio" id="tu_lAma_itemTemplIntNote1Beha" name="tu_lAma_itemTemplIntNote1Beha" value="append">&nbsp;&nbsp;
              replace <input type="radio" id="tu_lAma_itemTemplIntNote1Beha" name="tu_lAma_itemTemplIntNote1Beha" value="replace">
            </span>
          </div>
        </div>
        <div class="extIntNotes">
          <div class="row">
            <label for='tu_lAma_itemTemplIntNote2'>
              <span class='de displayTableCell verticalMiddle'>Interne Notiz 2</span>
              <span class='en displayTableCell verticalMiddle'>Internal note 2</span>
            </label>
            <div class="col"><input type='text' id='tu_lAma_itemTemplIntNote2' name='tu_lAma_itemTemplIntNote2' placeholder='Internal Note 2 created on {DATE}' size='35'/>
              <span class="right">
                prepend <input type="radio" id="tu_lAma_itemTemplIntNote2Beha" name="tu_lAma_itemTemplIntNote2Beha" value="prepend" checked="checked">&nbsp;&nbsp;
                append <input type="radio" id="tu_lAma_itemTemplIntNote2Beha" name="tu_lAma_itemTemplIntNote2Beha" value="append">&nbsp;&nbsp;
                replace <input type="radio" id="tu_lAma_itemTemplIntNote2Beha" name="tu_lAma_itemTemplIntNote2Beha" value="replace">
              </span>
            </div>
          </div>
          <div class="row">
            <label for='tu_lAma_itemTemplIntNote3'>
              <span class='de displayTableCell verticalMiddle'>Interne Notiz 3</span>
              <span class='en displayTableCell verticalMiddle'>Internal note 3</span>
            </label>
            <div class="col"><input type='text' id='tu_lAma_itemTemplIntNote3' name='tu_lAma_itemTemplIntNote3' placeholder='Internal Note 3 created on {DATE}' size='35'/>
              <span class="right">
                prepend <input type="radio" id="tu_lAma_itemTemplIntNote3Beha" name="tu_lAma_itemTemplIntNote3Beha" value="prepend" checked="checked">&nbsp;&nbsp;
                append <input type="radio" id="tu_lAma_itemTemplIntNote3Beha" name="tu_lAma_itemTemplIntNote3Beha" value="append">&nbsp;&nbsp;
                replace <input type="radio" id="tu_lAma_itemTemplIntNote3Beha" name="tu_lAma_itemTemplIntNote3Beha" value="replace">
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <label for='itu_lAma_itemTemplGetHolCallNumber'>
            <span class='de displayTableCell verticalMiddle lineHeight16'>Signatur aus der Holding übernehmen</span>
            <span class='en displayTableCell verticalMiddle lineHeight16'>Copy holding call number</span>
          </label>
          <input type='checkbox' id='tu_lAma_itemTemplGetHolCallNumber' name='tu_lAma_itemTemplGetHolCallNumber'/>
          </div>
        <div class="row">
          <label for='itu_lAma_itemTemplSetInvNum' class='col-md-4'>
            <span class='de displayTableCell verticalMiddle lineHeight16'>Inventarnummer Zuweisen: Sequenzname</span>
            <span class='en displayTableCell verticalMiddle lineHeight16'>Allocate inventory number: Sequence Name</span>
          </label>
          <input type='text' id='tu_lAma_itemTemplSetInvNum' name='tu_lAma_itemTemplSetInvNum' placeholder='inv-alt' size='6'/>
        </div>
        <div class="row">
          <label for='tu_lAma_itemTemplSetInvDate'>
            <span class='de displayTableCell verticalMiddle'>Inventardatum setzen</span>
            <span class='en displayTableCell verticalMiddle'>Set inventory date</span>
          </label>
          <input type='checkbox' id='tu_lAma_itemTemplSetInvDate' name='tu_lAma_itemTemplSetInvDate'/>
        </div>
        <div class="row">
          <label for='tu_lAma_itemTemplInvPrice'>
            <span class='de displayTableCell verticalMiddle'>Rechnungspreis übernehmen</span>
            <span class='en displayTableCell verticalMiddle'>Take invoice price</span>
          </label>
          <input type='checkbox' id='tu_lAma_itemTemplInvPrice' name='tu_lAma_itemTemplInvPrice'/>
        </div>
        <div class="row">
          <label for='tu_lAma_itemTemplGotoNotes'>
            <span class='de displayTableCell verticalMiddle'>Immer zum Notes-Tab wechseln</span>
            <span class='en displayTableCell verticalMiddle'>Go always to notes tab</span>
          </label>
          <input type='checkbox' id='tu_lAma_itemTemplGotoNotes' name='tu_lAma_itemTemplGotoNotes'/>
        </div>
        <div class="row">
          <label for='tu_lAma_itemTemplNotNewOnly'>
            <span class='de displayTableCell verticalMiddle lineHeight16'>Nur auf neue Exemplare anwenden</span>
            <span class='en displayTableCell verticalMiddle'>Apply to new items only</span>
          </label>
          <input type='checkbox' id='tu_lAma_itemTemplNotNewOnly' name='tu_lAma_itemTemplNotNewOnly'/>
        </div>
        <button id='close_settings' style='margin-left: 150px;'>
          <span class='de'>Abbrechen</span>
          <span class='en'>Cancel</span>
        </button>
        <button id='save_settings'>
          <span class='de'>Speichern</span>
          <span class='en'>Save</span>
        </button>
        <button id='apply_settings'>
          <span class='de'>Speichern und Anwenden</span>
          <span class='en'>Save and Apply</span>
        </button>
      </div>
    </div>`);
  dialog.find('label').addClass($("[for='pageBeanpermanentLocationId']").prop('class'));
  dialog.find('div#innerItemTemplateSettings')
    .prepend($("<div class='row'></div>")
            .prepend($("#pageBeanpermanentLocationId_hiddenSelect").clone().attr('id','tu_lAma_itemTemplPermLoc').off().removeAttr('onchange').show().removeClass('hide'))
            .prepend($("[for='pageBeanpermanentLocationId']").clone().attr('for','tu_lAma_itemTemplPermLoc'))
    );
  dialog.find('div#innerItemTemplateSettings')
    .prepend($("<div class='row'></div>")
            .prepend($("#pageBeanselectedProcessType_hiddenSelect").clone().attr('id','tu_lAma_itemTemplProcType').off().removeAttr('onchange').removeAttr('disabled').show().removeClass('hide'))
            .prepend($("[for='pageBeanselectedProcessType']").clone().attr('for','tu_lAma_itemTemplProcType'))
    );
  dialog.find('div#innerItemTemplateSettings')
    .prepend($("<div class='row'></div>")
            .prepend($("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect").clone().attr('id','tu_lAma_itemTemplPolicy').off().removeAttr('onchange').show().removeClass('hide'))
            .prepend($("[for='pageBeanitemMddnxphysicalItemTableitemPolicy']").clone().attr('for','tu_lAma_itemTemplPolicy'))
    );
  dialog.find('div#innerItemTemplateSettings')
    .prepend($("<div class='row'></div>")
            .prepend($("#pageBeanitemMddnxphysicalItemTablematerialType_hiddenSelect").clone().attr('id','tu_lAma_itemTemplMatType').off().removeAttr('onchange').show().removeClass('hide'))
            .prepend($("[for='pageBeanitemMddnxphysicalItemTablematerialType']").clone().attr('for','tu_lAma_itemTemplMatType'))
    );
  if ($("#pageBeanselectedProcessType_hiddenSelect option").length == 1)
    dialog.find('div#innerItemTemplateSettings').prepend($("<h5 style='text-align: center;'><span class='de'>Einstellungen gegebenenfalls bei einem schon gespeichterten Exemplar vornehmen</span><span class='en'>Change unavailable settings with an already saved item</span></h5>"));
  dialog.find('div#innerItemTemplateSettings').prepend($("<h3 style='text-align: center;'><span class='de'>Exemplar Template Einstellungen</span><span class='en'>Item Template Settings</span></h3>"));
  dialog.find("#tu_lAma_itemTemplPermLoc").prepend($("<option value=''>" + browser.i18n.getMessage('unchanged') + "</option>"));
  dialog.find("#tu_lAma_itemTemplPolicy").prepend($("<option value=''>" + browser.i18n.getMessage('unchanged') + "</option>"));
  dialog.find("#tu_lAma_itemTemplProcType").prepend($("<option value='keep'>" + browser.i18n.getMessage('unchanged') + "</option>"));
  dialog.find("#tu_lAma_itemTemplMatType").prepend($("<option value='keep'>" + browser.i18n.getMessage('unchanged') + "</option>"));
  
  $('body').append(dialog);
  dialog.show().find('button#close_settings').click(function(){
    dialog.stop(true).remove();
  });
  dialog.find('button#save_settings').click(function(){
    saveItemTemplateSettings(dialog).then(function(){
      dialog.stop(true).remove();
    });
  });
  dialog.find('button#apply_settings').click(function(){
    saveItemTemplateSettings(dialog).then(function(){
      dialog.stop(true).remove();
      setItemTemplate();
    });
  });
  dialog.find('#tu_lAma_itemTemplMoveStatNote').on('change',function(){
    dialog.find('.extStatNotes').toggle(!this.checked);
  });
  dialog.find('#tu_lAma_itemTemplMoveIntNote').on('change',function(){
    dialog.find('.extIntNotes').toggle(!this.checked);
  });

  browser.storage.local.get().then(function(result){  
    dialog.find('#tu_lAma_itemTemplPolicy').val(!!result.itemTemplPolicy?result.itemTemplPolicy:'');
    dialog.find('#tu_lAma_itemTemplMatType').val(!!result.itemTemplMatType?result.itemTemplMatType:'keep');
    dialog.find('#tu_lAma_itemTemplMoveStatNote').prop("checked",!result.itemTemplMoveStatNote).trigger('change');
    if (!!result.itemTemplStatNote1) dialog.find('#tu_lAma_itemTemplStatNote1').val(result.itemTemplStatNote1);
    if (!!result.itemTemplStatNote1Beha) dialog.find('#tu_lAma_itemTemplStatNote1Beha[value="'+result.itemTemplStatNote1Beha+'"]').prop("checked",true);
    if (!!result.itemTemplStatNote2) dialog.find('#tu_lAma_itemTemplStatNote2').val(result.itemTemplStatNote2);
    if (!!result.itemTemplStatNote2Beha) dialog.find('#tu_lAma_itemTemplStatNote2Beha[value="'+result.itemTemplStatNote2Beha+'"]').prop("checked",true);
    if (!!result.itemTemplStatNote3) dialog.find('#tu_lAma_itemTemplStatNote3').val(result.itemTemplStatNote3);
    if (!!result.itemTemplStatNote3Beha) dialog.find('#tu_lAma_itemTemplStatNote3Beha[value="'+result.itemTemplStatNote3Beha+'"]').prop("checked",true);
    dialog.find('#tu_lAma_itemTemplMoveIntNote').prop("checked",!result.itemTemplMoveIntNote).trigger('change');
    if (!!result.itemTemplIntNote1) dialog.find('#tu_lAma_itemTemplIntNote1').val(result.itemTemplIntNote1);
    if (!!result.itemTemplIntNote1Beha) dialog.find('#tu_lAma_itemTemplIntNote1Beha[value="'+result.itemTemplIntNote1Beha+'"]').prop("checked",true);
    if (!!result.itemTemplIntNote2) dialog.find('#tu_lAma_itemTemplIntNote2').val(result.itemTemplIntNote2);
    if (!!result.itemTemplIntNote2Beha) dialog.find('#tu_lAma_itemTemplIntNote2Beha[value="'+result.itemTemplIntNote2Beha+'"]').prop("checked",true);
    if (!!result.itemTemplIntNote3) dialog.find('#tu_lAma_itemTemplIntNote3').val(result.itemTemplIntNote3);
    if (!!result.itemTemplIntNote3Beha) dialog.find('#tu_lAma_itemTemplIntNote3Beha[value="'+result.itemTemplIntNote3Beha+'"]').prop("checked",true);
    if (!!result.itemTemplProcType && dialog.find(`#tu_lAma_itemTemplProcType option[value='${result.itemTemplProcType}']`).length == 0){
      dialog.find("#tu_lAma_itemTemplProcType").prepend($(`<option value='${result.itemTemplProcType}'>${result.itemTemplProcType}</option>`));
    }
    dialog.find('#tu_lAma_itemTemplProcType').val(!!result.itemTemplProcType?result.itemTemplProcType:'keep');
    dialog.find('#tu_lAma_itemTemplSetInvDate').prop("checked",!!result.itemTemplSetInvDate);
    if (!!result.itemTemplSetInvNum) dialog.find('#tu_lAma_itemTemplSetInvNum').val(result.itemTemplSetInvNum);
    dialog.find('#tu_lAma_itemTemplPermLoc').val(!!result.itemTemplPermLoc?result.itemTemplPermLoc:'');
    dialog.find('#tu_lAma_itemTemplNotNewOnly').prop("checked", !result.itemTemplNotNewOnly);
    dialog.find('#tu_lAma_itemTemplInvPrice').prop("checked", !!result.itemTemplInvPrice);
    dialog.find('#tu_lAma_itemTemplGotoNotes').prop("checked", !!result.itemTemplGotoNotes);
    dialog.find('#tu_lAma_itemTemplGetHolCallNumber').prop("checked", !!result.itemTemplGetHolCallNumber);
  });
}
  
function saveItemTemplateSettings(dialog){
  return browser.storage.local.set({
    itemTemplPolicy: dialog.find('#tu_lAma_itemTemplPolicy').val(),
    itemTemplMatType: dialog.find('#tu_lAma_itemTemplMatType').val(),
    itemTemplMoveStatNote: !dialog.find('#tu_lAma_itemTemplMoveStatNote').prop("checked"),
    itemTemplStatNote1: dialog.find('#tu_lAma_itemTemplStatNote1').val(),
    itemTemplStatNote1Beha: dialog.find('#tu_lAma_itemTemplStatNote1Beha:checked').val(),
    itemTemplStatNote2: dialog.find('#tu_lAma_itemTemplStatNote2').val(),
    itemTemplStatNote2Beha: dialog.find('#tu_lAma_itemTemplStatNote2Beha:checked').val(),
    itemTemplStatNote3: dialog.find('#tu_lAma_itemTemplStatNote3').val(),
    itemTemplStatNote3Beha: dialog.find('#tu_lAma_itemTemplStatNote3Beha:checked').val(),
    itemTemplMoveIntNote: !dialog.find('#tu_lAma_itemTemplMoveIntNote').prop("checked"),
    itemTemplIntNote1: dialog.find('#tu_lAma_itemTemplIntNote1').val(),
    itemTemplIntNote1Beha: dialog.find('#tu_lAma_itemTemplIntNote1Beha:checked').val(),
    itemTemplIntNote2: dialog.find('#tu_lAma_itemTemplIntNote2').val(),
    itemTemplIntNote2Beha: dialog.find('#tu_lAma_itemTemplIntNote2Beha:checked').val(),
    itemTemplIntNote3: dialog.find('#tu_lAma_itemTemplIntNote3').val(),
    itemTemplIntNote3Beha: dialog.find('#tu_lAma_itemTemplIntNote3Beha:checked').val(),
    itemTemplProcType: dialog.find('#tu_lAma_itemTemplProcType').val(),
    itemTemplSetInvDate: dialog.find('#tu_lAma_itemTemplSetInvDate').prop("checked"),
    itemTemplSetInvNum: dialog.find('#tu_lAma_itemTemplSetInvNum').val(),
    itemTemplPermLoc: dialog.find('#tu_lAma_itemTemplPermLoc').val(),
    itemTemplNotNewOnly: !dialog.find('#tu_lAma_itemTemplNotNewOnly').prop("checked"),
    itemTemplInvPrice: dialog.find('#tu_lAma_itemTemplInvPrice').prop("checked"),
    itemTemplGotoNotes: dialog.find('#tu_lAma_itemTemplGotoNotes').prop("checked"),
    itemTemplGetHolCallNumber: dialog.find('#tu_lAma_itemTemplGetHolCallNumber').prop("checked")
  });
}
  

function setItemTemplate(){
  debug("setItemTemplate").then(function(m){console.log(m)});
  debug(this,2).then(function(m){console.log(m)});
  var ST = {
    Start: 1,
    Material: 2,
    OpenInventoryNumber: 3,
    AddInventoryNumber: 4,
    SaveAndEdit: 5,
    PermLoc: 6,
    ProcType: 7,
    ItemPol: 8,
    InvPrice: 9,
    CallNumber: 10,
    GotoNotes: 11,
    AllDone: 255,
  }

  var state = ST.Start;
  var msg = '';
  var col = '#f8fff8';
  var obstimer;
  var date = createDate();
  var observer;


  function createDate(){
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth()+1;
    var t = d.getDate();
    if (m<10) m='0' + m;
    if (t<10) t='0' + t;
    return t+'.'+m+'.'+y;
    $('#pageBeandataObjectinventoryDate').val(t+'.'+m+'.'+y);
  }

  function openInveroryNumber(){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.OpenInventoryNumber;
    $('[id^="cresource_editorpitem_generalallocate"]').click();
  }

  function clickInveroryNumber(label){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.AddInventoryNumber;
    $('#sequenceRows span.labelField').filter(function(){
      return $(this).text() == label;
    }).closest('tr').find('input').click();
    $('#PAGE_BUTTONS_cresource_editorpitem_generalpopupselect').click();
  }

  function saveAndEdit(result){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.SaveAndEdit;
    if ($("#pageBeanselectedProcessType_hiddenSelect option").length == 1)
      $('#PAGE_BUTTONS_cresource_editorpitem_generalsave_and_edit').click();
    else if (!!result.itemTemplNotNewOnly && result.itemTemplProcType != undefined && result.itemTemplProcType != 'keep')
      protype(result.itemTemplProcType);
    else if (!!result.itemTemplNotNewOnly)
      invPrice(result);
    else
      allDone();
  }

  function permloc(pl){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.PermLoc;
    debug('change permanent loc to ' + pl,2).then(function(m){console.log(m)});
    var plocsel = $("#pageBeanpermanentLocationId_hiddenSelect option[value='"+pl+"']");
    plocsel.prop('selected',true);
    $("#pageBeanpermanentLocationId_hiddenSelect").get(0).onchange();
  }

  function protype(pt){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.ProcType;
    debug('change process type to ' + pt,2).then(function(m){console.log(m)});
    var ptype = $("#pageBeanselectedProcessType_hiddenSelect option[value='"+pt+"']");
    ptype.prop('selected',true);
    $("#pageBeanselectedProcessType_hiddenSelect").get(0).onchange();
  }

  function invPrice(result){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.InvPrice;
    let poline = $('#pageBeanpoLineRef').val();
    let match = document.URL.match(/(https?:\/\/[^\/]*)\//);
    if (poline != '' && !!result.itemTemplInvPrice){
      $.ajax({
        url:      match[1] + '/almaws/v1/acq/invoices?q=pol_number~' + poline,
        type:     'GET',
        headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
        success:  function(invoice){
          let invoices = $(invoice).find('invoices');
          if (invoices.length == 0 || invoices.attr('total_record_count') == '0'){
            col = '#ff8f8f';
            msg += 'Keine Rechnung zu ' + poline + ' gefunden! ';
          } else {
            let price = parseFloat(invoices.find('invoice_lines:has(po_line:contains("'+ poline +'")) total_price').text());
            $('input#pageBeanitemMddnxphysicalItemTableinventoryPrice').val(price.toFixed(2).toString().replace('.',','));
            col = '#8fff8f';
            msg += 'Preis aus der Rechnung: ' + price;
          }
          $.ajax({
            url:      match[1] + '/almaws/v1/acq/po-lines/' + poline,
            type:     'GET',
            headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
            success:  function(po_line){
              polv = po_line.querySelector('vendor');
              invv = invoice.querySelector('vendor');
              if (polv.outerHTML != invv.outerHTML){
                msg += '<br/><b>Unterschiedliche Lieferanten: '+ polv.attributes['desc'].value + '('+polv.textContent+') != '
                    + invv.attributes['desc'].value + '('+invv.textContent+')</b>';
                col = '#ff8000';
              }
            },
            complete: function(){ getHolCallNumber(result);}
          });
        },
        error: function(xhr){
          if (xhr.status == 401){
            col = '#ff8f8f';
            msg += 'Fehlende Berechtigung! ';
          } else {
            col = '#ff8f8f';
            msg += 'Fehler '+ xhr.status+' '+ $(xhr.responseText).text();
          }
          getHolCallNumber(result);
        }
      });
    } else {
      if (!!result.itemTemplInvPrice){
        col = '#ff8f8f';
        msg += 'Keine Bestellposten vorhanden! ';
      }
      getHolCallNumber(result);
    }
  }

  function getHolCallNumber(result){
    debug(state,3).then(function(m){console.log(m)});
    state = ST.CallNumber;
    let barcode = $('#pageBeanitemMddnxphysicalItemTablebarcode').val();
    if (barcode != '' && !!result.itemTemplGetHolCallNumber){
      let match = document.URL.match(/(https?:\/\/[^\/]*)\//);
      $.ajax({
        url:      match[1] + '/almaws/v1/items',
        type:     'GET',
        headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
        data:     { item_barcode: barcode, view: 'label', lang: 'de', format: 'json' },
        success:  function(data){
          $('#pageBeanitemMddnxphysicalItemTablealternativeCallNumber').focus().val($(data).find('call_number').text());
          gotonotes(result);
        },
        error: function(){
          gotonotes(result);
        }
      });
    } else {
      gotonotes(result);
    }
  }

  function gotonotes(result){
    debug(state,3).then(function(m){console.log(m)});
    if (!!result.itemTemplStatNote1 || !!result.itemTemplIntNote1 || !!result.itemTemplGotoNotes){
      state = ST.GotoNotes;
      $("#cresource_editornotes_span").click();
    } else {
      allDone();
    }
  }

  function addStatNote(result){
    var note = new Array();
    note[1] = $('#pageBeanitemMddnxphysicalItemTablestatisticsNote_1');
    note[2] = $('#pageBeanitemMddnxphysicalItemTablestatisticsNote_2');
    note[3] = $('#pageBeanitemMddnxphysicalItemTablestatisticsNote_3');
    if (note[1].length == 0 || note[2].length == 0 || note[3].length == 0){
      col = '#ff8f8f';
      msg += 'Statistiknotiz nicht gefunden! ';
    } else {
      if ($('#pageBeanitemMddnxphysicalItemTablestatisticsNote_1_hiddenSelect').length > 0){
        for (i = 1; i < 4; i++){
          let setId = 'itemTemplStatNote'+i;
          let selId = '#pageBeanitemMddnxphysicalItemTablestatisticsNote_' + i + '_hiddenSelect';
          if (!!result[setId+'Beha'] && !!result[setId] && (result[setId+'Beha'] == 'replace' || note[i].val().trim() == '')){
            $(selId).val(result[setId]);
            note[i].val($(selId+' option:selected').text());
          }
        }
      } else if (!result.itemTemplMoveStatNote){
        if (!!result.itemTemplStatNote1){
          if (note[3].val().trim() != '' && note[3].val().trim() != ';'){
            note[3].val(note[2].val() + '; ' + note[3].val());
          } else {
            note[3].val(note[2].val());
          }
          note[2].val(note[1].val());
          note[1].val(result.itemTemplStatNote1.replace('{DATE}',date));
        }
      } else {
        for (i = 1; i < 4; i++){
          let setId = 'itemTemplStatNote'+i;
          if (!!result[setId+'Beha'] && !!result[setId]){
            if (result[setId+'Beha'] == 'replace' || note[i].val().trim() == '') note[i].val(result[setId]);
            else if (result[setId+'Beha'] == 'prepend') note[i].val((result[setId]+' '+note[i].val()).trim());
            else if (result[setId+'Beha'] == 'append') note[i].val((note[i].val()+' '+result[setId]).trim());
          }
        }
      }
    }
  }

  function addIntNote(result){
    var note = new Array();
    note[1] = $("#pageBeanitemMddnxphysicalItemTableinternalNote_1");
    note[2] = $("#pageBeanitemMddnxphysicalItemTableinternalNote_2");
    note[3] = $("#pageBeanitemMddnxphysicalItemTableinternalNote_3");
    if (note[1].length == 0 || note[2].length == 0 || note[3].length == 0){
      col = '#ff8f8f';
      msg += 'Notiz nicht gefunden! ';
    } else {
      if (!result.itemTemplMoveIntNote){
        if (!!result.itemTemplIntNote1){
          if (note[3].val().trim() != '' && note[3].val().trim() != ';'){
            note[3].val(note[2].val() + '; ' + note[3].val());
          } else {
            note[3].val(note[2].val());
          }
          note[2].val(note[1].val());
          note[1].val(result.itemTemplIntNote1.replace('{DATE}',date));
        }
      } else {
        for (i = 1; i < 4; i++){
          let setId = 'itemTemplIntNote'+i;
          if (!!result[setId+'Beha'] && !!result[setId]){
            if (result[setId+'Beha'] == 'replace' || note[i].val().trim() == '') note[i].val(result[setId]);
            else if (result[setId+'Beha'] == 'prepend') note[i].val((result[setId]+'; '+note[i].val()).trim());
            else if (result[setId+'Beha'] == 'append') note[i].val((note[i].val()+'; '+result[setId]).trim());
          }
        }
      }
    }
  }

  function allDone(){
    debug(state,2).then(function(m){console.log(m)});
    clearTimeout(obstimer);
    state = ST.AllDone;
    observer.disconnect();
    browser.runtime.sendMessage({
      action: "toast",
      message: msg,
      color: col,
      duration: (col!='#8fff8f')?20:10
    });
    window.tulama_busy = false;
  }

  browser.storage.local.get().then(function(result){
    if ($("#pageBeanselectedProcessType_hiddenSelect option").length > 1 && !result.itemTemplNotNewOnly){
      browser.runtime.sendMessage({
        action: "toast",
        message: "laut Einstellungen nur bei neuen Exemplaren",
        color: '#ff8f8f',
        duration: 20
      });
      return;
    }

    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        debug(mutation,4).then(function(m){console.log(m)});
        if (mutation.attributeName = "class" && $(mutation.target).hasClass("hide")){
          switch (state){
            case ST.OpenInventoryNumber:
              clickInveroryNumber(result.itemTemplSetInvNum);
              break;
            case ST.AddInventoryNumber:
              saveAndEdit(result);
              break;
            case ST.SaveAndEdit:
              if (result.itemTemplProcType != undefined && result.itemTemplProcType != 'keep'){
                protype(result.itemTemplProcType);
                break;
              }
            case ST.ProcType:
              if (result.itemTemplPermLoc != undefined && result.itemTemplPermLoc != ''){
                permloc(result.itemTemplPermLoc);
                break;
              }
            case ST.PermLoc:
              invPrice(result);
              break;
            case ST.GotoNotes:
              addStatNote(result);
              addIntNote(result);
              $("#pageBeanitemMddnxphysicalItemTableinternalNote_1").focus();
              allDone();
          }
        }
      });
    });

    if (!!result.itemTemplPolicy){
      $("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect option[value='"+ result.itemTemplPolicy +"']").prop('selected',true).trigger('change');
      $("#pageBeanitemMddnxphysicalItemTableitemPolicy").val($("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect option:selected").text());
    }
    if (result.itemTemplMatType != undefined && result.itemTemplMatType != 'keep'){
      $("#pageBeanitemMddnxphysicalItemTablematerialType_hiddenSelect option[value='"+ result.itemTemplMatType +"']").prop('selected',true).trigger('change');
      $("#pageBeanitemMddnxphysicalItemTablematerialType").val($("#pageBeanitemMddnxphysicalItemTablematerialType_hiddenSelect option:selected").text());
    }
    if (!!result.itemTemplSetInvDate){
      $('#pageBeandataObjectinventoryDate').val(date);
    }
    window.tulama_busy = true;
    observer.observe($('#loadingBlocker').get(0),{childList:true,subtree:true,attributes:true});
    obstimer = setTimeout(function(){
      debug(state + ' main observer timed out!').then(function(m){console.log(m)});
      msg += 'Main observer timed out in state '+state+'!';
      col = '#ff8f8f';
      allDone();
    },30000);
    if (!!result.itemTemplSetInvNum){
      if (!$('#pageBeanitemMddnxphysicalItemTableinventoryNumber').val()){
        openInveroryNumber();
      } else {
        msg += 'Inventarnummer schon vorhanden! ';
        col = '#ffff8f';
        saveAndEdit(result);
      }
    } else {
      saveAndEdit(result);
    }
  });
}

function protype(pt){
  browser.storage.local.get().then(function(result){
    if (result.processType != undefined || isTuw && pt == 'GG'){
      if (pt == 'GG' && result.processType != undefined) pt = result.processType.trim();
      if ($("#pageBeanselectedProcessType_hiddenSelect option").length == 1){
        var obstimer;
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.attributeName = "class" && $(mutation.target).hasClass("hide")){
              clearTimeout(obstimer);
              observer.disconnect();
              protype(pt);
            }
          });
        });
        observer.observe($('#loadingBlocker').get(0),{childList:true,subtree:true,attributes:true});
        obstimer = setTimeout(function(){
          debug('main observer timed out!').then(function(m){console.log(m)});
          observer.disconnect();
        },30000);
        $('#PAGE_BUTTONS_cresource_editorpitem_generalsave_and_edit').click();
      } else {
        debug('change process type to ' + pt,2).then(function(m){console.log(m)});
        var ptype = $("#pageBeanselectedProcessType_hiddenSelect option[value='"+pt+"']");
        ptype.prop('selected',true);
        $("#pageBeanselectedProcessType_hiddenSelect").get(0).onchange();
      }
    }
  });
}
  
function proTypeSettings(){
  if (dialog != undefined) dialog.remove();
  dialog = $(`
    <style>
      #itemTemplateSettings br { clear: both; }
      #itemTemplateSettings select, #itemTemplateSettings input { margin-top: 8px; }
      #itemTemplateSettings button { margin-left: 100px; }
      #itemTemplateSettings { position: fixed; top: 200px; display: none; width: 100%; z-index: 10000; }
      #itemTemplateSettings span.de,#itemTemplateSettings span.en  { display: none; }
      html[lang='de'] #itemTemplateSettings span.de { display: inline; }
      html[lang='en'] #itemTemplateSettings span.en { display: inline; }
    </style>
    <div id='itemTemplateSettings'>
      <div style='width: 900px; margin: auto; background: white; padding: 5px; border: solid #666 1px; border-radius: 4px;'>
        <br/>
        <button id='close_settings' style='margin-left: 150px;'>
          <span class='de'>Abbrechen</span>
          <span class='en'>Cancel</span>
        </button>
        <button id='save_settings'>
          <span class='de'>Speichern</span>
          <span class='en'>Save</span>
        </button>
        <button id='apply_settings'>
          <span class='de'>Speichern und Anwenden</span>
          <span class='en'>Save and Apply</span>
        </button>
      </div>
    </div>`);
  let odiv = dialog.find('div')
    .prepend($("<div class='row'></div>")
            .prepend($("#pageBeanselectedProcessType_hiddenSelect").clone().attr('id','tu_lAma_itemTemplProcType').off().removeAttr('onchange').removeAttr('disabled').show().removeClass('hide'))
            .prepend($("[for='pageBeanselectedProcessType']").clone().attr('for','tu_lAma_itemTemplProcType'))
    );
  if ($("#pageBeanselectedProcessType_hiddenSelect option").length == 1)
    odiv.prepend($("<h5 style='text-align: center;'><span class='de'>Einstellungen bei einem schon gespeichterten Exemplar vornehmen</span><span class='en'>Change unavailable settings with an already saved item</span></h5>"));
  odiv.prepend($("<h3 style='text-align: center;'><span class='de'>Prozesstyp Einstellungen</span><span class='en'>Process Type Settings</span></h3>"));

  $('body').append(dialog);
  dialog.show().find('button#close_settings').click(function(){
    dialog.stop(true).remove();
  });
  dialog.find('button#save_settings').click(function(){
    browser.storage.local.set({
      processType: dialog.find('#tu_lAma_itemTemplProcType').val()
    }).then(function(){
        dialog.stop(true).remove();
    });
  });
  dialog.find('button#apply_settings').click(function(){
    browser.storage.local.set({
      processType: dialog.find('#tu_lAma_itemTemplProcType').val()
    }).then(function(){
      dialog.stop(true).remove();
      protype(dialog.find('#tu_lAma_itemTemplProcType').val());
    });
  });

  browser.storage.local.get().then(function(result){
    if (!!result.processType) dialog.find('#tu_lAma_itemTemplProcType').val(result.processType);
  });
}
  
function set_item_policy(pol){
  browser.storage.local.get().then(function(result){
    var sel = false;
    if (!!result.itemPolicy)
      sel = $("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect option[value='"+result.itemPolicy+"']");
    else if (isTuw)
      sel = $("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect option[value='"+pol+"']");
    if (!!sel && sel.length > 0){
      $("#pageBeanitemMddnxphysicalItemTableitemPolicy").val(sel.text());
      sel.prop('selected',true).trigger('change');
    }
  });
}

function itemPolicySettings(){
  if (dialog != undefined) dialog.remove();
  dialog = $(`
    <style>
      #itemTemplateSettings br { clear: both; }
      #itemTemplateSettings select, #itemTemplateSettings input { margin-top: 8px; }
      #itemTemplateSettings button { margin-left: 100px; }
      #itemTemplateSettings { position: fixed; top: 200px; display: none; width: 100%; z-index: 10000; }
      #itemTemplateSettings span.de,#itemTemplateSettings span.en  { display: none; }
      html[lang='de'] #itemTemplateSettings span.de { display: inline; }
      html[lang='en'] #itemTemplateSettings span.en { display: inline; }
    </style>
    <div id='itemTemplateSettings'>
      <div style='width: 900px; margin: auto; background: white; padding: 5px; border: solid #666 1px; border-radius: 4px;'>
        <br/>
        <button id='close_settings' style='margin-left: 150px;'>
          <span class='de'>Abbrechen</span>
          <span class='en'>Cancel</span>
        </button>
        <button id='save_settings'>
          <span class='de'>Speichern</span>
          <span class='en'>Save</span>
        </button>
        <button id='apply_settings'>
          <span class='de'>Speichern und Anwenden</span>
          <span class='en'>Save and Apply</span>
        </button>
      </div>
    </div>`);
  let odiv = dialog.find('div')
    .prepend($("<div class='row'></div>")
            .prepend($("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect").clone().attr('id','tu_lAma_itemTemplPolicy').off().removeAttr('onchange').show().removeClass('hide'))
            .prepend($("[for='pageBeanitemMddnxphysicalItemTableitemPolicy']").clone().attr('for','tu_lAma_itemTemplPolicy'))
    );
  if ($("#pageBeanitemMddnxphysicalItemTableitemPolicy_hiddenSelect option").length == 1)
    odiv.prepend($("<h5 style='text-align: center;'><span class='de'>Einstellungen gegebenenfalls bei einem schon gespeichterten Exemplar vornehmen</span><span class='en'>Change unavailable settings with an already saved item</span></h5>"));
  odiv.prepend($("<h3 style='text-align: center;'><span class='de'>Exemplar-Richtlinie Einstellungen</span><span class='en'>Item Policy Settings</span></h3>"));

  $('body').append(dialog);
  dialog.show().find('button#close_settings').click(function(){
    dialog.stop(true).remove();
  });
  dialog.find('button#save_settings').click(function(){
    browser.storage.local.set({
      itemPolicy: dialog.find('#tu_lAma_itemTemplPolicy').val()
    }).then(function(){
      dialog.stop(true).remove();
    });
  });
  dialog.find('button#apply_settings').click(function(){
    browser.storage.local.set({
      itemPolicy: dialog.find('#tu_lAma_itemTemplPolicy').val()
    }).then(function(){
      dialog.stop(true).remove();
      set_item_policy(dialog.find('#tu_lAma_itemTemplPolicy').val());
    });
  });

  browser.storage.local.get().then(function(result){
    if (!!result.itemPolicy) dialog.find('#tu_lAma_itemTemplPolicy').val(result.itemPolicy);
  });
}
  