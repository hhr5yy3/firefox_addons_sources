$(function(){
  var url=new URL(document.URL);
  let barcode=url.searchParams.get("barcode");
  let almaurl=url.searchParams.get("insturl");

  $('body').addClass(browser.i18n.getUILanguage().substr(0,2));
  $('body #date').text(new Date().toLocaleString());
  $('head title').text(browser.i18n.getMessage('processSlip'));
  $.ajax({
    url:      almaurl + '/almaws/v1/items',
    type:     'GET',
    headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
    data:     { item_barcode: barcode, view: 'label', lang: 'de' },
    success:  function(data){
      // data = new DOMParser().parseFromString(data.lastItem, "application/xml");
      let ptype = $(data).find('item item_data process_type').text();
      $(data).find('item [desc]').each(function(i,j){$(j).text($(j).attr('desc'));});
      $(data).find('item bib_data author').appendTo($('div#tit'));
      let tit = $(data).find('item bib_data title').appendTo($('div#tit'));
      let abc = $(data).find('item item_data title_abcnph');
      if (abc.text() != '') $('div#tit').append($('<bcnph>' + abc.text().replace(tit.text(),'').replace('ausgef',' / ausgef') + '</bcnph>'));
      $(data).find('item bib_data place_of_publication').appendTo($('div#tit'));
      $(data).find('item bib_data date_of_publication').appendTo($('div#tit'));
      $(data).find('item bib_data complete_edition').appendTo($('div#tit'));
      let ac = $(data).find('item bib_data network_number:contains("(AT-OBV)")').text().replace('(AT-OBV)','');
      if (ac != '') $('<network_number>'+ac+'</network_number>').appendTo($('div#xml')).append('<div class="canvas"/>');
      let barcode = $(data).find('item item_data barcode').appendTo($('div#xml')).append('<div class="canvas"/>');
      let isbn = $(data).find('item bib_data isbn');
      if (isbn.text() != ''){
        isbn.appendTo($('div#xml')).append('<div class="canvas"/>');
        $('isbn div').barcode(isbn.text(),'code39', { barWidth: 1, barHeight: 40, output: "svg" });
      }
      let issn = $(data).find('item bib_data issn');
      if (issn.text() != ''){
        issn.appendTo($('div#xml')).append('<div class="canvas"/>');
        if (isbn.text() == '')
          $('issn div').barcode(issn.text(),'code39', { barWidth: 1, barHeight: 40, output: "svg" });
      }
      $(data).find('item item_data library').appendTo($('div#xml'));
      $(data).find('item item_data location').appendTo($('div#xml'));
      $(data).find('item holding_data call_number').appendTo($('div#xml'));
      let acn = $(data).find('item item_data alternative_call_number');
      if (acn.text() != '') acn.appendTo($('div#xml'));
      $(data).find('item item_data inventory_number').appendTo($('div#xml'));
      $(data).find('item item_data policy').appendTo($('div#xml'));
      let ptypeo = $(data).find('item item_data process_type')
      ptypeo.appendTo($('div#xml'));
      if (ptype == 'LOAN'){
        $.ajax({
          url:      almaurl + $(data).find('item').attr('link') + '/loans',
          type:     'GET',
          headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
          success:  function(ldata){
            let userid = $(ldata).find('user_id');
            userid.appendTo(ptypeo);
            ptypeo.find('user_id').on('click',function(e){$(e.target).remove();});
            $.ajax({
              url:      almaurl + '/almaws/v1/users/' + userid.text(),
              type:     'GET',
              headers:  { 'X-CloudApp-ID': 'tuwien/lAma' },
              success:  function(ldata){
                $(ldata).find('user > full_name').appendTo(ptypeo);
                ptypeo.find('full_name').on('click',function(e){$(e.target).remove();});
              }
            });
          }
        });
      }
      let pubnote = $(data).find('item item_data public_note');
      if (pubnote.text() != '') pubnote.appendTo($('div#xml'));
      let in1 = $(data).find('item item_data internal_note_1');
      if (in1.text() != '') in1.appendTo($('div#xml'));
      let in2 = $(data).find('item item_data internal_note_2');
      if (in2.text() != '') in2.appendTo($('div#xml'));
      let in3 = $(data).find('item item_data internal_note_3');
      if (in3.text() != '') in3.appendTo($('div#xml'));
      if (ac != '') $('network_number div').barcode(ac,'code39', { barWidth: 1, barHeight: 40, output: "svg" });
      $('barcode div').barcode(barcode.text(),'code39', { barWidth: 1, barHeight: 40, output: "svg" });
      if (ptype != 'LOAN') window.print();
    }
  });
});
