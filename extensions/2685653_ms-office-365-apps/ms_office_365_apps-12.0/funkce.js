// pokud se jedná o Chrome nebo Firefoxu
if(!browser){
  var browser = chrome;
  var prohlizec = "chrome";
} else {
  var prohlizec = "firefox";
;};

var ms_business = [
  "Outlook::https://outlook.office.com::outlook.png", 
  "OneDrive::https://www.office.com/launch/onedrive::onedrive.png", 
  "Word::https://www.office.com/launch/word::word.png", 
  "Excel::https://www.office.com/launch/excel::excel.png", 
  "Visio::https://www.office.com/launch/visio::visio.png", 
  "PowerPoint::https://www.office.com/launch/powerpoint::powerpoint.png", 
  "OneNote::https://www.office.com/launch/onenote::onenote.png", 
  "Teams::https://teams.microsoft.com::teams.png", 
  "Stream::https://web.microsoftstream.com::stream.png", 
  "Project::https://project.microsoft.com::project.png", 
  "Office::https://www.office.com::office.png", 

  "Whiteboard::https://whiteboard.microsoft.com::whiteboard.png", 
  "SharePoint::https://www.office.com/launch/sharepoint::sharepoint.png", 
  "Yammer::https://www.yammer.com/office365::yammer.png", 
  "To Do::https://to-do.office.com/tasks::todo.png", 
  "Planner::https://tasks.office.com::planner.png", 
  "Sway::https://www.office.com/launch/sway::sway.png", 
  "Kaizala::https://manage.kaiza.la::kaizala.png", 
  "Forms::https://www.office.com/launch/forms::forms.png", 
  "Power Apps::https://make.powerapps.com::powerapps.png", 
  "Power Automate::https://flow.microsoft.com/manage::powerautomate.png", 
  "Admin::https://admin.microsoft.com::admincenter.png"
];


var ms_personal = [
  "Outlook::https://outlook.live.com/mail::outlook.png", 
  "Calendar::https://outlook.live.com/calendar/::calendar.png",
  "People::https://outlook.live.com/people/::people.png",
  "OneDrive::https://onedrive.live.com::onedrive.png", 
  "Word::https://www.office.com/launch/word?auth=1::word.png", 
  "Excel::https://www.office.com/launch/excel?auth=1::excel.png", 
  "Visio::https://www.office.com/launch/visio?auth=1::visio.png", 
  "PowerPoint::https://www.office.com/launch/powerpoint?auth=1::powerpoint.png", 
  "OneNote::https://www.onenote.com/notebooks?auth=1::onenote.png", 
  "Office::https://www.office.com?auth=1::office.png",
  "Family Safety::https://account.microsoft.com/family/::safety.png",
  "Teams::https://teams.live.com/_?utm_source=OfficeWeb::teams.png",
  "Kaizala::https://webapp.kaiza.la::kaizala.png"
];


//var msUrlList = ms_business;



var makeMsList = async function(msUrlList, msType) {

  if(!msType){msType="business"; msUrlList = ms_business;};

  // Return data to menu
  var msHtmlData = "";
  for (let i = 0; i < msUrlList.length; i++) {
    var msName = msUrlList[i].split("::")[0] || "";
    var msUrl = msUrlList[i].split("::")[1] || "";
    var msImage = msUrlList[i].split("::")[2] || "";
    //<a id='outlook' href='https://outlook.office.com'><img src='images/outlook.png'><BR>Outlook</a>
    msHtmlData += "<a class='link' href='"+msUrl+"' id='msHyperlink_"+i+"' target='_blank'><img src='images/"+msImage+"' /><BR>"+msName+"</a>";
    //console.log(i+": "+msName+" - "+msUrl);
  ;};
  if(document.getElementById("ms_list")){document.getElementById("ms_list").innerHTML = msHtmlData;};



  // After click close window
  if(prohlizec=="firefox"){
    var children = document.getElementById("ms_list").children;
    for (var i = 0; i < children.length; i++) {
      var childrenId = children[i].id;
      //console.log(childrenId);
      if(!childrenId){continue;};
      document.getElementById(childrenId).addEventListener("click", function(e) {
        //window.close();
        setTimeout(function(){ window.close() }, 100);
      ;});
    ;};
  ;};


  if(msType=="personal"){saveDataToFirefox("personal");};
  if(msType=="business"){saveDataToFirefox("business");};

;};





async function saveDataToFirefox(msTypeValueData){
  console.log('submit');
  await browser.storage.local.set({mstypevalue: msTypeValueData}, () => { console.log('msTypeValue updated'); });
;};



async function readDataFromFirefox() {  
  await browser.storage.local.get(['mstypevalue'], (result) => {

    if(!result.mstypevalue){result.mstypevalue="business";};

    if(result.mstypevalue){
      console.log(result.mstypevalue);
      
      
      if(result.mstypevalue=="business"){makeMsList(ms_business, "business"); document.getElementById("ms_type_business").checked=true;};
      if(result.mstypevalue=="personal"){makeMsList(ms_personal, "personal"); document.getElementById("ms_type_personal").checked=true;};
    ;};
  ;});
;};
//readAutoCloseTime();



document.getElementById("ms_type_business").addEventListener("click", function(){makeMsList(ms_business, "business");});
document.getElementById("ms_type_personal").addEventListener("click", function(){makeMsList(ms_personal, "personal");});


readDataFromFirefox();
//document.getElementById("addonClear").addEventListener("click", clearAddonForm);