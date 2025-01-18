(function() {
          
//include('https://code.jquery.com/jquery-3.2.1.min.js');
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

var check_id_aba_anexo = false;  
var str_def_conteiner_preview_toolbar = '#dropzone';
var str_def_preview_toolbar = '.dropzone-previews-toolbar';
var str_def_conteiner_lista_anexos = '.dz-preview';
var str_def_sucess_mark = '.dz-success-mark';
var str_def_sucess_ok = '.dz-success.dz-success';
var str_def_progress_bar_upload = '.dz-progress .dz-upload';
var str_def_input_filename = '.dz-colula-upload .dz-details .dz-filename span';
var str_def_input_descricao = '.dz-colula-dados table tbody tr:eq(1) .colunaEsquerda input';    
var str_def_textarea = 'textarea[id="anexarHtmlFormindividual:EditorDecoration:EditorTextArea"]';    
var flg_checksave = false;
var flg_donesave = false;
var id_ftime;

var txt_select_doc_padrao;
var html_opt_original_select = '';


/*
trf1 docPrincipalEditorTextArea
5a reg anexarHtmlFormindividual:EditorDecoration:EditorTextArea

alert($('textarea[id="docPrincipalEditorTextArea"]').text()) = ''
alert($(str_def_textarea).text()) = '&nbsp;'

*/

var checkObjTemplate = function() {

  
  //BA-TRF-1_REGIAO-1GRAU
  if($('#tbAnexar_lbl').hasClass('rich-tab-active') || $('#novoAnexo_lbl').hasClass('rich-tab-active')) { 
        
    txt_select_doc_padrao = 'Documento Comprobatório';    
    check_id_aba_anexo = true;

  }
  //PE-TRF-5_REGIAO-1GRAU
  else if($('#tabAnexarDocumentos_lbl').hasClass('rich-tab-active') || $('#abaEditarDocumentos_lbl').hasClass('rich-tab-active')) {
        
    txt_select_doc_padrao = 'Documento de Comprovação';        
    check_id_aba_anexo = true;
    flg_checksave = true;

  }
  //SP:TRT_2-1GRAU
  else if($('#tabAnexar_lbl').hasClass('rich-tab-active')) {
        
    txt_select_doc_padrao = 'Documento Diverso';
    str_def_conteiner_preview_toolbar = 'div[id="formularioUpload:dropzone"]';    
    check_id_aba_anexo = true;

  } 
  else check_id_aba_anexo = false;

  return check_id_aba_anexo;

}

var checkBoxControl = function() {

  var check_tpl = checkObjTemplate();  
 
  //VERSAO INCOMPATIVEL
  if(!check_tpl) {
  
    $('#pje_upload_box_control').remove();    
  
  }
  else {

    //CHECA SE DADOS FORAM SALVOS NA TELA
    flg_donesave = $(str_def_textarea).text()!='&nbsp;' ? true : false;    

    //WAIT_SAVE
    if(flg_checksave && !flg_donesave) {

      //OCULTA BTN DE ANEXO
      $(str_def_conteiner_preview_toolbar).hide();
      var check_box_exists = $('#pje_upload_box_control[id_ref="pje_upload_wait_save"]').length;       
      if(!check_box_exists) createBoxControl('WAIT_SAVE');
      setTimeout(function(){checkInit()},1000);
      return;

    }
    //WAIT_ATTACHMENT
    else if(!$(str_def_conteiner_lista_anexos).length) {

      var check_box_exists = $('#pje_upload_box_control[id_ref="pje_upload_wait_attachment"]').length;
      if(!check_box_exists) createBoxControl('WAIT_ATTACHMENT');
      setTimeout(function(){checkInit()},1000);
      return;   

    }
    //READY_START
    else if($(str_def_conteiner_lista_anexos).length){

      var check_box_exists = $('#pje_upload_box_control[id_ref="pje_upload_ready_start"]').length;
      if(!check_box_exists) createBoxControl('READY_START');      

    }    

  }
  setTimeout(function(){checkInit()},3000);

  return;

}

var createBoxControl = function(flg_type,flg_remove) {

  switch(flg_type) {

    case 'WAIT_ATTACHMENT':
        
      var conteudo = '<span style="color:#DBA207">Adicione os anexos antes de continuar. Aguardando...</span>';
      var attr_id = 'pje_upload_wait_attachment';

    break; 

    case 'WAIT_SAVE':
        
      var conteudo = '<span style="color:#F00">Salve os dados da página antes de continuar. Aguardando...</span>';
      var attr_id = 'pje_upload_wait_save';

    break;    

    case 'READY_START':

      //CHECA OPÇÕES DO SELECT ORIGINA
      $(str_def_conteiner_lista_anexos).each(function() {
        html_opt_original_select = $(this).find('select')[0].innerHTML;              
        return false;
      });
        
      //var conteudo = '<div><span style="color:#DBA207">Mudar todos os documentos para:</span></div><select id="pje_upload_select_doc_model"><option value="'+txt_select_doc_padrao+'">'+txt_select_doc_padrao+'</option></select><input id="pje_upload_btn_start" type="button" style="cursor:pointer;background-color:#89CC84;" value="Iniciar"><input id="pje_upload_btn_stop" style="display:none;cursor:pointer;background-color:#F00;" type="button" value="Parar">';
      var conteudo = '<div><span style="color:#DBA207">Mudar todos os documentos para:</span></div><select id="pje_upload_select_doc_model">'+html_opt_original_select+'</select><input id="pje_upload_btn_start" type="button" style="cursor:pointer;background-color:#89CC84;" value="Iniciar"><input id="pje_upload_btn_stop" style="display:none;cursor:pointer;background-color:#F00;" type="button" value="Parar">';
      var attr_id = 'pje_upload_ready_start';      

    break;    

  }
  
  var img_logo_src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwMCIgICBoZWlnaHQ9IjIwMCIgICB2aWV3Qm94PSIwIDAgNTIuOTE2NjY1IDUyLjkxNjY2OCIgICB2ZXJzaW9uPSIxLjEiICAgaWQ9InN2ZzgiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSIgICBzb2RpcG9kaTpkb2NuYW1lPSJwamVfdXBsb2FkLnN2ZyI+ICA8ZGVmcyAgICAgaWQ9ImRlZnMyIiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMS45NzAxNjEzIiAgICAgaW5rc2NhcGU6Y3g9IjE4MC43MTgzNiIgICAgIGlua3NjYXBlOmN5PSIxMjUuODQ0ODciICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0iZmFsc2UiICAgICB1bml0cz0icHgiICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE3IiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4gIDxtZXRhZGF0YSAgICAgaWQ9Im1ldGFkYXRhNSI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iQ2FtYWRhIDEiICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIiAgICAgaWQ9ImxheWVyMSIgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTI0NC4wODMzMikiPiAgICA8cGF0aCAgICAgICBzdHlsZT0iZmlsbDojMDA3YWI5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDowLjE2MDA2NzQ4IiAgICAgICBkPSJNIDEwMCAwIEwgNjUuNTMzMjAzIDQ2Ljk0NTMxMiBMIDg4LjQ3ODUxNiA0Ni45NDUzMTIgTCA4OC40Nzg1MTYgNjMuNTM5MDYyIEMgODUuNDI3NzA3IDYzLjc5NzU4MiA4Mi41MjkyMTQgNjQuMTg2OTY0IDc5LjM0NTcwMyA2NC43NSBDIDY3LjU1MjE3NSA2Ni44MzQwNjkgNTcuOTA2MDU5IDcwLjU5NDAyIDQ5LjU2NDQ1MyA3Ni4zNTc0MjIgQyA0Mi45NTIxNzMgODAuOTI1ODg4IDM2Ljg5ODk1NyA4Ny40MTg0NTMgMzIuOTQ5MjE5IDk0LjE3OTY4OCBDIDMwLjg3MDU2MSA5Ny43MzgwMzcgMjcuMjc5MDA2IDk5Ljk0MDE1OCAyNC42NDI1NzggMTAzLjAwMTk1IEwgMjQuNjQ4NDM4IDEwOS4zOTY0OCBMIDEyLjkwNjI1IDEwOS4zOTY0OCBDIDEyLjE2NDgxNiAxMDkuMzk2NDggMTEuNTY4MzU5IDEwOS45OTMzMiAxMS41NjgzNTkgMTEwLjczNDM4IEwgMTEuNTY4MzU5IDE0MS42MTEzMyBDIDExLjU2ODM1OSAxNDIuMzUyNzIgMTIuMTY0ODM2IDE0Mi45NDkyMiAxMi45MDYyNSAxNDIuOTQ5MjIgTCAyNC42NzM4MjggMTQyLjk0OTIyIEwgMjQuNjg5NDUzIDE2Mi45NTExNyBMIDI1LjEwOTM3NSAxNjQuNTgzOTggQyAyNi43NDI5MzEgMTcwLjkyMjgyIDI5LjMyNzc2MiAxNzUuNDU4NDkgMzQuMTc5Njg4IDE4MC41IEMgMzkuNzk1NzYgMTg2LjMzNTQ0IDQ2LjgxMjI2NSAxOTAuNTY5NjQgNTYuMzM1OTM4IDE5My44NzEwOSBDIDY2Ljc1Mjc4OCAxOTcuNDgyMTcgNzcuNjI4MjU2IDE5OS4yNjY0NSA5My40ODI0MjIgMTk5Ljk2NjggQyA5NS44NTk3NDUgMjAwLjA3MTg3IDEwOC44NzY5MSAxOTkuOTA4ODYgMTExLjM4NjcyIDE5OS43NDIxOSBDIDEzNC4wOTM3OCAxOTguMjM2MDUgMTUwLjA2MDgxIDE5My4zNjU2NSAxNjEuNTY0NDUgMTg0LjQzNzUgQyAxNjMuNzkyNTggMTgyLjcwODE4IDE2Ny44NjM4NCAxNzguNTIyODQgMTY5LjM3MzA1IDE3Ni40MTAxNiBDIDE3Mi4wNjY2OSAxNzIuNjM5MjUgMTczLjczNjYgMTY5LjA1OTk4IDE3NC44OTA2MiAxNjQuNTgyMDMgTCAxNzUuMzEwNTUgMTYyLjk1MTE3IEwgMTc1LjMyNjE3IDE0Mi45NDkyMiBMIDE4Ny4wOTM3NSAxNDIuOTQ5MjIgQyAxODcuODM1MTkgMTQyLjk0OTIyIDE4OC40MzE2NCAxNDIuMzUzMTQgMTg4LjQzMTY0IDE0MS42MTEzMyBMIDE4OC40MzE2NCAxMTAuNzM0MzggQyAxODguNDMxNjQgMTA5Ljk5Mjk4IDE4Ny44MzUyMSAxMDkuMzk2NDggMTg3LjA5Mzc1IDEwOS4zOTY0OCBMIDE3NS4zNTE1NiAxMDkuMzk2NDggTCAxNzUuMzU3NDIgMTAzLjAwMTk1IEMgMTcyLjQ1OTcxIDEwMC4xMzExOCAxNjkuMDYxNDIgOTcuNTQyMTY4IDE2Ni45MTQwNiA5My45NzA3MDMgQyAxNjQuNzg0OTMgOTAuMzQzNzkzIDE2Mi4xNzUgODYuOTU2MjQzIDE1OC45MTQwNiA4My41ODc4OTEgQyAxNDguMzM4MzkgNzIuNjYzODg0IDEzMy40NTgwMyA2Ni4wNTEyNzUgMTE0LjUyOTMgNjMuODY1MjM0IEMgMTEzLjQzMjA4IDYzLjczODI0MiAxMTIuNDU3NTYgNjMuNjM2ODkxIDExMS41MjE0OCA2My41NDg4MjggTCAxMTEuNTIxNDggNDYuOTQ1MzEyIEwgMTM0LjQ2NjggNDYuOTQ1MzEyIEwgMTAwIDAgeiBNIDEwMCA5NC43MzgyODEgQSA2MS44NjM0MjggMzQuMTM1NzM3IDAgMCAxIDE2MS44NjMyOCAxMjguODczMDUgQSA2MS44NjM0MjggMzQuMTM1NzM3IDAgMCAxIDEwMCAxNjMuMDA5NzcgQSA2MS44NjM0MjggMzQuMTM1NzM3IDAgMCAxIDM4LjEzNjcxOSAxMjguODczMDUgQSA2MS44NjM0MjggMzQuMTM1NzM3IDAgMCAxIDEwMCA5NC43MzgyODEgeiBNIDcxLjQxNDA2MiAxMTUuOTE0MDYgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDYxLjk4MjQyMiAxMjUuMzQ3NjYgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDcxLjQxNDA2MiAxMzQuNzgxMjUgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDgwLjg0NzY1NiAxMjUuMzQ3NjYgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDcxLjQxNDA2MiAxMTUuOTE0MDYgeiBNIDEyOC41ODU5NCAxMTUuOTE0MDYgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDExOS4xNTIzNCAxMjUuMzQ3NjYgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDEyOC41ODU5NCAxMzQuNzgxMjUgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDEzOC4wMTc1OCAxMjUuMzQ3NjYgQSA5LjQzMzEzMDggOS40MzMxMzA4IDAgMCAwIDEyOC41ODU5NCAxMTUuOTE0MDYgeiAiICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMjY0NTgzMzMsMCwwLDAuMjY0NTgzMzMsMCwyNDQuMDgzMzIpIiAgICAgICBpZD0icGF0aDQ1NDUiIC8+ICA8L2c+PC9zdmc+';

  //PEGA POSICAO E REMOVE
  var p_top = 'calc(100% - 250px)';
  var p_left = 'calc(100% - 450px)';
  if($('#pje_upload_box_control').length) {
    var p = $('#pje_upload_box_control');
    var position = p.position();    
    p_top = position.top+'px';
    p_left = position.left+'px';
    $('#pje_upload_box_control').remove();
  }
  
  $('body').append('<div id="pje_upload_box_control" id_ref="'+attr_id+'" style="position:fixed;z-index:99999;left:'+p_left+';cursor:move;top:'+p_top+';width:300px;padding:20px;;border:1px solid #999;background-color:#EEE;opacity:0.95;/*line-height:10px;*/background-color:#f2f7ff;font-weight:bold;font-size:15px;border-radius:10px"><div style="font-size:23px;color:#007ab9"><img style="height:35px;float:left;margin-right:10px" src="'+img_logo_src+'">Pje-Upload Plugin</div><br>'+conteudo+'&nbsp<span style="color:#5C9758;font-size:11px" id="pje_upload_label_process"></span><div style="position:relative;margin-top:20px;font-size:9px;width:auto;border-top:1px solid #333;height:30px;padding:5px">Dúvidas e sugestões: MPF/PRBA - pabloso@mpf.mp.br</div></div>');

  //$("#pje_upload_box_control").draggable();
   $('#pje_upload_box_control[id_ref="'+attr_id+'"]').draggable();

  $('#pje_upload_btn_start').click(function() {
    $('#pje_upload_btn_start').hide();
    $('#pje_upload_btn_stop').show();
    startProcess();
  });
  
  $('#pje_upload_btn_stop').click(function() {
    $('#pje_upload_label_process').html('<span style="color:#F00">PARADO!</span>');
    $('#pje_upload_btn_start').show();
    $('#pje_upload_btn_stop').hide();
    clearAllTimeOuts();
  });

  //MARCA PADRÃO E EXCLUI OPCOES INVÁLIDAS
  $("#pje_upload_select_doc_model option").each(function() {
    
    if(!$.isNumeric($(this).val())) $(this).remove();
    if($(this).text() == txt_select_doc_padrao) $(this).attr('selected',true);
    
  });

  return false;

}

var startProcess = function() {

  var img_ico_carregando = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iI2UxZTFlMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTM1IDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiNiZWJlYmUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA2NCA2NCkiLz48cGF0aCBkPSJNNzEgMzkuMlYuNGE2My42IDYzLjYgMCAwIDEgMzMuOTYgMTQuNTdMNzcuNjggNDIuMjRhMjUuNTMgMjUuNTMgMCAwIDAtNi43LTMuMDN6IiBmaWxsPSIjOTc5Nzk3IiB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgNjQgNjQpIi8+PHBhdGggZD0iTTcxIDM5LjJWLjRhNjMuNiA2My42IDAgMCAxIDMzLjk2IDE0LjU3TDc3LjY4IDQyLjI0YTI1LjUzIDI1LjUzIDAgMCAwLTYuNy0zLjAzeiIgZmlsbD0iIzZlNmU2ZSIgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDY0IDY0KSIvPjxwYXRoIGQ9Ik03MSAzOS4yVi40YTYzLjYgNjMuNiAwIDAgMSAzMy45NiAxNC41N0w3Ny42OCA0Mi4yNGEyNS41MyAyNS41MyAwIDAgMC02LjctMy4wM3oiIGZpbGw9IiMzYzNjM2MiIHRyYW5zZm9ybT0icm90YXRlKDMxNSA2NCA2NCkiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDY0IDY0OzQ1IDY0IDY0OzkwIDY0IDY0OzEzNSA2NCA2NDsxODAgNjQgNjQ7MjI1IDY0IDY0OzI3MCA2NCA2NDszMTUgNjQgNjQiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3MjBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iNjMuNjYiIGN5PSI2My4xNiIgcj0iMTIiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBkdXI9IjcyMG1zIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBrZXlUaW1lcz0iMDswLjU7MSIgdmFsdWVzPSIxOzA7MSIvPjwvZz48L3N2Zz4='; 

  //CHECA SE OS ANEXOS FORAM REMOVIDOS
  if(!$(str_def_conteiner_lista_anexos).length) {
    $('#pje_upload_box_control').remove();
    checkInit();    
    return false;
  }

  //VARRE OS ANEXOS
  $(str_def_conteiner_lista_anexos).each(function() {

    //CHECA MARCAÇÃO
    if($(this).find(str_def_sucess_mark).css('opacity')=='0') {
      
      //ITEM JA PROCESSADO  
      if($(this).attr('mark')=='on') {          
        id_ftime = setTimeout(function(){startProcess();},5000);
        return false;
      }
      
      //PROCESSAR ITEM
      if(parseInt($(this).find(str_def_progress_bar_upload).css('width'))==0) {  

        //DESCRICAO DO ITEM        
        var descricao = removeCaracterEspecial($(this).find(str_def_input_filename).text().replaceAll('_',' ').replaceAll('.pdf',''));        
        if($(this).find(str_def_input_descricao).val()=='') $(this).find(str_def_input_descricao).val(descricao);

        $(this).attr('mark','on');
        $('.mark').remove();
        $(this).css('border','3px solid #6CCD6E');
        $(this).css('background-color','#CAEAC8');

        //var cod_documento = $(this).find('select option:contains('+txt_select_doc_padrao+')').val();           
        var cod_documento = $('#pje_upload_select_doc_model').val()
        var id = $(this).find('select').attr('id');
        
    	  $(this).find('select').val(cod_documento);
    	  var evt = document.createEvent("HTMLEvents");
    	  evt.initEvent("change", false, true);
    	  ele = document.getElementById(id);
    	  ele.dispatchEvent(evt);

        $(this).before('<a id="mark" class="mark" href="#mark"></a>');
        $('#mark')[0].click();                  
        $(this).append('<p style="position:absolute;right:0px;top:0px;align:right;font-size:20px !important;color:#3E3EEE;font-weigth:bold">Carregando '+($(str_def_sucess_ok).length+1+'/'+$(str_def_conteiner_lista_anexos).length)+'</p>');
        $('#pje_upload_label_process').html('Processado '+($(str_def_sucess_ok).length+1+'/'+$(str_def_conteiner_lista_anexos).length)+'<img style="height:15px;margin-left:10px" src="'+img_ico_carregando+'">');

      }
      id_ftime = setTimeout(function(){startProcess();},5000);
      return false;    
    }
    else $(this).attr('mark','off');
      
  });

  //CHECA CONCLUSÃO  
  if($(str_def_sucess_ok).length==$(str_def_conteiner_lista_anexos).length) {
    $('#pje_upload_btn_start').show();
    $('#pje_upload_btn_stop').hide();    
    $('#pje_upload_label_process').text('');
    alert('CONCLUÍDO! Todos os ANEXOS foram carregados!');
  }

}

var clearAllTimeOuts = function() {
      
  clearTimeout(id_ftime);
  return false;                 

}  

function removeCaracterEspecial(txt){
  
  var texto = "";  
  var parts = txt.split("");                    
  for (var i = 0; parts.length > i ; i++){                
    if(parts[i].charCodeAt(0) < 256){
      texto += parts[i];
    } 
  }
  
  return texto;
  
}

function checkInit() {  

  try {      
    $('body').length;
    checkBoxControl();    
  }
  catch(e) {        
    setTimeout(function(){checkInit()},3000);
  }

}
 
checkInit();

})();

