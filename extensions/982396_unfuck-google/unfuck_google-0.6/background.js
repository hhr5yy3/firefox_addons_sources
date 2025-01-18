var pattern = '*://*/search*'

function redirect(requestDetails) {
  var url = new URI(requestDetails.url);

  if(!url.hostname().includes('google.')) {
    return {}
  }
  

  var queryParams = url.search(true);

  if (queryParams['unfucked'] == 'ftfy:1') {
    return {}
  }
  
  var tbs = queryParams['tbs'];   

  // For news, sort by date. Otherwise add verbatim param.
  if(queryParams['tbm'] == 'nws') {
    
    tbs = (tbs) ? tbs.concat(',sbd:1') :  'sbd:1';   

  } else {   
    
    tbs = (tbs) ? tbs :  'li:1';    

  }

  url.setSearch('tbs', tbs);
  url.setSearch('unfucked', 'ftfy:1');     
  var redirectUrl = url.toString();

  return {
    redirectUrl: redirectUrl
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:[pattern], types:["main_frame"]},
  ["blocking"]
);