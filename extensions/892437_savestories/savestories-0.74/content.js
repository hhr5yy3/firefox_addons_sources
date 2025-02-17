var makeBody=function(){
  console.log('[storysaver]:','document: script run');
  var stories=[], count=0;

  if(!('Stories' in window)){
    if(!('storiesPreloadAttempt' in window)){
      window.storiesPreloadAttempt = 1;
    }
    window.storiesPreloadStatic();

    if(window.storiesPreloadAttempt < 10){
      console.log('[storysaver]:','document: storiesPreloadAttempt ' + window.storiesPreloadAttempt);
      window.storiesPreloadAttempt += 1;
      setTimeout(() => {window.savestoriesMakeBody();}, 100);
      return;
    }
  } else {
    console.log('[storysaver]:','document: storiesPreloadStatic');
    if(!('storiesFetchListPromise' in window)){
      if('oid' in cur && cur.oid > 0 && (!('user_id' in cur) || cur.user_id != cur.oid)){
        window.storiesFetchListPromise = window.Stories.fetchList('owner_feed'+cur.oid);
        window.storiesFetchListPromise.then(
          ()=>{
            console.log('[storysaver]:','document: storiesFetchListPromise success');
            window.savestoriesMakeBody();
          },
          ()=>{
            console.log('[storysaver]:','document: storiesFetchListPromise failure: ', window.storiesFetchListPromise);
            window.savestoriesMakeBody();
          });
        return;
      }
    }
  }

  for(var i in cur){
    if(Object.keys(cur)[count].indexOf("stories_list")!=-1){
      stories.push.apply(stories,cur[i]);
      console.log('[storysaver]:','document: found stories in cur.' + i);
    }
    ++count;
  }

  if(stories.length){
    var popupBody=document.createElement('body');
    var settings=document.createElement('div');
    settings.className='settings';
    settings.title='Настройки';
    popupBody.appendChild(settings);
    for(var i=0; i<stories.length; ++i){
      try {
        if(stories[i]?.grouped){
          var groupedStories = stories[i].grouped;
          stories.splice(i);
          stories = stories.concat(groupedStories);
          --i;
        }
      }catch (e) {
        console.error('[storysaver]:',e, stories[i]);
      }
    }
    for(var i in stories){
      try {
        var story = stories[i];
        var aPerson = document.createElement('button');
        aPerson.id = '';
        var dPerson = document.createElement('div');
        aPerson.title = 'Сохранить все истории пользователя';

        var aPersonImage = story.author.photo.indexOf('http') != -1 ? story.author.photo : 'https://vk.com/images/icons/msg_error.png';
        aPerson.setAttribute('style', 'background-image: url(' + aPersonImage + ');');

        var pPerson = document.createElement('span');
        pPerson.innerText = story.author.name.split(' ')[0];
        aPerson.appendChild(pPerson);
        dPerson.appendChild(document.createElement('hr'));

        for (var j in story.items) {
          var item = story.items[j];
          var aItem = document.createElement('button');
          var sItem = document.createElement('span');
          if (item.type == `photo`) {
            aItem.id = item.photo_url;
            sItem.className = 'photo';
            sItem.setAttribute('style', 'background-image:url(' + item.photo_url + ');');
          } else {
            aItem.id = item.video_url;
            sItem.className = 'video';
            sItem.setAttribute('style', 'background-image:url(' + item.first_frame + ');');
          }
          aPerson.id += aItem.id + ',';
          aItem.className = 'story';
          aItem.setAttribute('style', 'background-image: url(' + item.preview_url + ');');
          aItem.appendChild(sItem);
          dPerson.appendChild(aItem);
        }
        dPerson.insertBefore(aPerson, dPerson.firstChild);
        popupBody.appendChild(dPerson);
        popupBody.appendChild(document.createElement('p'));
      } catch (e) {
        console.error('[storysaver]:',e, stories[i]);
      }
    }
    var aHome=document.createElement('a');
    aHome.href='https://vk.com/savestories';
    aHome.innerText='🏠';
    aHome.target='_blank';
    popupBody.appendChild(aHome);
    window.postMessage({from:'document savestories', popupBody:popupBody.innerHTML}, '*');
  }
  else {
    window.postMessage({from:'document savestories', popupBody:'none'}, '*');
  }
  document.head.removeChild(document.getElementById('savestories'));
  if('storiesPreloadAttempt' in window) delete window.storiesPreloadAttempt;
  if('storiesFetchListPromise' in window) delete window.storiesFetchListPromise;
  delete window.savestoriesMakeBody;
};


function contentListen(request, sender){
  console.log('[storysaver]:','received message in content listener');
  if(request.from=='background savestories'){
    console.log('[storysaver]:','content listener: from background');
    //sendResponse({"name":"Петя"});
    var script=document.createElement('script');
    script.type='text/javascript';
    script.async=true;
    script.text='window.savestoriesMakeBody=' + String(makeBody) + '; window.savestoriesMakeBody();';
    script.id='savestories';
    document.head.appendChild(script);
  }
}

chrome.runtime.onMessage.addListener(contentListen);

window.addEventListener("message", function(event) {
  if (event.source == window) {
    console.log('[storysaver]:','received message in content event listener');
    if(event.data.from=='document savestories'){
      console.log('[storysaver]:',"content event listener: from document");
      chrome.runtime.sendMessage({from:'content savestories', popupBody:event.data.popupBody, links:event.data.links});
    }
  }
});
