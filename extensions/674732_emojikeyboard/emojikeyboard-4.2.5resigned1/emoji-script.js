var NUMBER_OF_VISITTED_KEY="NUMBER_OF_VISITTED";
var NUMBER_OF_EMOJI_CLICKED_KEY = "NUMBER_OF_EMOJI_CLICKED_KEY";
var OTHER_PRODUCT_INTRODUCED_KEY = "OTHER_PRODUCT_INTRODUCED_KEY";
var OTHER_PRODUCT_VISITED_KEY = "OTHER_PRODUCT_VISITED_KEY";
var is_presenting_copied_effect=false;


var SKIN_BUTTON_OPTION_CLICKED="";
var introducedAtThisVisit=false;

function search_emojis(){
  $("#search-emojis-results").empty();
  var emoji_keyword=$("#search-emojis-input").val().toLowerCase().trim();  

  var num_emojis=0;

  if(emoji_keyword.length>0){
    $("#emojis-content-container .emoji-content .emoji_span_container").each(function(){
      
      var emoji_word_for_search = ($(this).attr('title')+" "+$(this).data('emoji-keywords'));
      if($(this).attr("data-original-title"))
        emoji_word_for_search=$(this).attr('data-original-title')+ ' ' + emoji_word_for_search;

      if(emoji_word_for_search.toLowerCase().indexOf(emoji_keyword)>=0){
        $("#search-emojis-results").append($(this).clone());  
        num_emojis++;      
      }
      else if($(this).attr('data-emoji')==emoji_keyword.trim()){
        $("#search-emojis-results").append($(this).clone());
        var emoji_description_str="<span>&nbsp;&nbsp; - "+$(this).attr('title')+"</span>";
        if($(this).attr("data-original-title"))
          emoji_description_str="<span>&nbsp;&nbsp; - "+$(this).attr('data-original-title')+"</span>";
        $("#search-emojis-results").append(emoji_description_str);
        num_emojis++;
        // $(this).mouseover();
      }
    });
  }
  else{
    $("#emojis-content-container .emoji-content .emoji_span_container").each(function(){
      $("#search-emojis-results").append($(this).clone());
      num_emojis++;
    });      
  }
  var MATCH_STR="MATCH";
  if(num_emojis>=2)
    MATCH_STR="MATCHES";

  var num_emojis_str="<br/><span><em>"+num_emojis+" " + MATCH_STR+"</em></span>";
  $("#search-emojis-results").append(num_emojis_str);
  $(".emoji_span_container").tooltip({placement : 'top'});
}


function setAutoCopyEmoji(){
  emojiAutoCopy= new Clipboard('.emoji_span_container');
    emojiAutoCopy.on('success', function(event) {
        event.clearSelection();              
    });
}

$(document).ready(function(){

  $("#emojis-content-container").on('click','.emoji_span_container',function(){

    var the_emoji=$(this).data('emoji');

    insertAtCaret("emoji-message",the_emoji);

    var class_value=$(this).attr('class');
    
    var title=$(this).attr('title');
    if(title.length==0 && $(this).attr("data-original-title"))
      title=$(this).attr('data-original-title');

    var emoji_object={"class":class_value,"title":title,"emoji":the_emoji};
    
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        //emoji: emoji
        emoji_object: emoji_object
      }, function (response) {
      });
    });

    copy_notif_div=$("#copied_notif_msg_2");
    the_element=$(this);
    thisPos=$(this).position(); 
    topPos=thisPos.top+ ($(this).outerHeight(true)-copy_notif_div.outerHeight(true))/2;
    leftPos=thisPos.left+ ($(this).outerWidth(true)-copy_notif_div.outerWidth(true))/2;    
    copy_notif_div.css('top',topPos-9);  
    copy_notif_div.css('left',leftPos);

    is_presenting_copied_effect=true;

    copy_notif_div.addClass("disappearing");


    
    setTimeout(function () {
      copy_notif_div.css('top',-5000); 
      copy_notif_div.removeClass("disappearing"); 
      is_presenting_copied_effect=false;   
    }, 500);
    

  });

  

  $("#emojis-content-container").on('mouseenter','.emoji_span_container',function(){
    var emoji=$(this).data('emoji');
    var emoji_title=$(this).attr('title');
    
    $(this).css('border-color','#ff3300');
    $(this).css('margin-top','-9px');
  });

  $("#emojis-content-container").on('mouseleave','.emoji_span_container',function(){
    if(is_presenting_copied_effect)
        return;


    $(this).css('border-color','#000000');
    $(this).css('margin-top','0px');
  });
  

  var search_box=$("#search-emojis-input");
  search_box.on('input propertychange updateInfo',search_emojis);
  search_box.on('paste', function () {
    setTimeout(function () {
      search_emojis();
    }, 10);
  });


  var copyButton= new Clipboard('#copy-btn');
  copyButton.on('success', function(event) {
      event.clearSelection();
      document.getElementById("copy_text").textContent = "Copied";


      window.setTimeout(function() {
          document.getElementById("copy_text").textContent = "Copy message";
      }, 3000);            

  });
  copyButton.on('error', function(event) { 
      event.trigger.textContent = 'Press "Ctrl + C" to copy';
      window.setTimeout(function() {
          // event.trigger.textContent = 'Copy';
          document.getElementById("copy_text").textContent = "Copy";
      }, 2000);
  });

  //Auxilary useful functions
  function insertAtCaret(areaId, text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    // txtarea.focus();
    txtarea.scrollTop = scrollPos;
  }
  //For the link to web version
  $("body").on('click','a',function(){
    if($(this).attr('class')=="web_version_link"){
      chrome.tabs.create({url:$(this).attr('href')});
      return false;
    }    
  });
  // For tab event
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    $("#emoji-message-box").show();
    $("#copy-btn-container").show();
    // $("#current_emoji_title").show(); 
    $("#web_version_introduction").show();

    var target = $(e.target).attr("href") // activated tab
    if(target=="#search-emojis"){
      //search_emojis();
      $("#search-emojis-input").focus();
      $("#search_area").height($("#smileys_people").height());
      $("#search-emojis-results").height($("#smileys_people").height() - $("#search-emojis-input").outerHeight(true)-20);
    

      // $("#option-emojis").height($("#smileys_people").height());
      $("#emoji-message-box").hide();
      $("#copy-btn-container").hide();
      // $("#current_emoji_title").hide();   
      $("#web_version_introduction").hide();            

    }
    else if(target=="#recent_emojis"){
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          "request": "get_recent_emojis_list"
        }, function (response) {
          if(response){
            var recent_emojis_list=response.recent_emojis_list_response;
            update_recent_emojis_list(recent_emojis_list);
          }
        });
      });
    }
  });


  //If there is recent emojis, go to recent emoji tabs
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      "request": "get_recent_emojis_list"
    }, function (response) {
      if(response)
        var recent_emojis_list=response.recent_emojis_list_response;
      if(!recent_emojis_list || recent_emojis_list.length==0)
        $("#people_ahref").click();
      else{
        update_recent_emojis_list(recent_emojis_list);
      }
    });
  });


  //Set auto copy 
  setAutoCopyEmoji();


  $("#skin_button_option_container").on('click','.skin_button_option',function(){
    if(SKIN_BUTTON_OPTION_CLICKED!=$(this).data("tone")){
      $("#skin_button_option_container .skin_button_option").css('width','22px');
      $(this).css('width','30px');
      show_tones($(this).data("tone"));
      SKIN_BUTTON_OPTION_CLICKED=$(this).data("tone");
    }
    else{
      $("#skin_button_option_container .skin_button_option").css('width','22px');
      show_tones($(this).data("all_tones"));
      SKIN_BUTTON_OPTION_CLICKED="";
    }
  });

  $(".emoji_span_container").tooltip({placement : 'top'});

});


function show_tones(the_tone){
  $("#skin_tones .emoji_span_container").hide();

  switch (the_tone) {
    case "tone1_white":
      $("#skin_tones .tone1_white").show();
      break;
    case "tone2_lightbrown":   
      $("#skin_tones .tone2_lightbrown").show();   
      break;
    case "tone3_olive":      
      $("#skin_tones .tone3_olive").show();
      break;
    case "tone4_deeper_brown":    
      $("#skin_tones .tone4_deeper_brown").show();  
      break;
    case "tone5_black":  
      $("#skin_tones .tone5_black").show();    
      break;
    default:
      $("#skin_tones .emoji_span_container").show();
      break;
  }
}

function update_recent_emojis_list(recent_emojis_list){
  var recent_emojis_html="";

  var arrayLength = recent_emojis_list.length;
  for (var i = 0; i < arrayLength; i++) {
    var current_emoji=recent_emojis_list[i];
    recent_emojis_html=recent_emojis_html+'<span class="'+current_emoji["class"]+
        ' recent_emoji"     data-emoji="'+current_emoji["emoji"]+
        '"     title="'+current_emoji["title"]+
        '" data-clipboard-text="'+current_emoji["emoji"]+'"></span>';
  }

  $("#recent_emojis").html(recent_emojis_html);
  $(".emoji_span_container").tooltip({placement : 'top'});
}