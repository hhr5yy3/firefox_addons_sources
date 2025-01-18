"use strict";
	 
	/* jshint esversion: 6, strict: global, scripturl: true */
	/* globals chrome */
	 
	function redirect(requestDetails)
	{
	    let redirect_url = _alter_uri(requestDetails.url);
	    if (redirect_url)
	    {
	        return { redirectUrl: redirect_url };
	    }
	}
	 
	// alter uri to force safe search
	function _alter_uri(uri)
	{
		// Don't correct anything starting with javascript: or data:
		if (uri.indexOf("javascript:") === 0 || uri.indexOf("data:") === 0)
		{
		    return false;
		}

		// If there's a space before a /, or no / at all, don't correct it.
		// It's probably a quicksearch.
		var firstSpace = uri.indexOf(" ");
		var firstSlash = uri.indexOf("/");
	
		if (firstSpace !== -1 && firstSlash === -1)
		{
			return false;
		}

	    if (uri.indexOf("google.") !== -1)
	    {
	        if (/q=/.test(uri))
	        {
	            return _add_uri_parameter(uri, "safe=strict");
	        }
	    }
	    else if (uri.indexOf("search.yahoo.") !== -1)
	    {
	        if (/(\/search)/.test(uri))
	        {
	            return _add_uri_parameter(uri, "vm=r");
	        }
	    }
	    else if (uri.indexOf("bing.") !== -1)
	    {
	        if (/(\/search|\/videos|\/images|\/news)/.test(uri))
	        {
	            return _add_uri_parameter(uri, "adlt=strict");
	        }
	    }
	    else if (uri.indexOf("yandex.") !== -1)
	    {
                if (uri.indexOf("/search") !== -1)
				{
                    return _add_uri_parameter(uri, "fyandex=1");
                }
	    }
	    else if (uri.indexOf("duckduckgo.") !== -1)
	    {
	        if (uri.indexOf("q=") !== -1)
	        {
	            return _add_uri_parameter(uri, "kp=1");
	        }
	    }
	    else if (uri.indexOf("reddit.") !== -1)
	    {
	        if ((uri.indexOf("q=") !== -1) && (uri.indexOf("nsfw%3Ano") === -1))
	        {
				var uriObj = new Url(uri);
				if (/self:/.test(uriObj.query.q))
				{
					uriObj.query.q = uriObj.query.q.replace(/\bnsfw\S+/ig,"");
				}

				uriObj.query.q += " nsfw:no";
				uri = String(uriObj);
				return uri;
	        }
	    }
	    
	    //TODO block Vimeo SSL and set content-rating cookie
	    //TODO block imgur, giphy, gfycat
	    
	    return false;
	}
	 
	function _add_uri_parameter(uri, parameter)
	{
	    if (uri.indexOf(parameter) === -1)
	    {
	        return uri + "&" + parameter;
	    }
	    
	    return false;
	}
	
	function _add_to_uri(uri, addition)
	{
	    if (uri.indexOf(addition) === -1)
	    {
	        return uri + addition;
	    }
	    
	    return false;
	}

	function replaceQueryParam(param, newval, search)
	{
	    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
	    var query = search.replace(regex, "$1").replace(/&$/, '');

	    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
	}

	// thanks to cookie api test extension, via stackoverflow
	function _removeCookie(cookie)
	{
            let url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
            chrome.cookies.remove({
        	"url": url,
        	"name": cookie.name
            });
	}

	chrome.cookies.onChanged.addListener(
	    function(changeInfo)
	    {
	        if (changeInfo.removed)
	        {
	            return;
	        }

	        if (changeInfo.cookie.name === "preferences" &&
	            (changeInfo.cookie.domain === ".ixquick.com" ||
		    	changeInfo.cookie.domain === ".startpage.com"))
			{
	            _removeCookie(changeInfo.cookie);
	        }

	        if (changeInfo.cookie.name === "ws_prefs" &&
	            (changeInfo.cookie.domain === "www.dogpile.com"))
			{
	            _removeCookie(changeInfo.cookie);
	        }
        }
	);

	chrome.webRequest.onBeforeRequest.addListener(
	    redirect,
	    {urls: ["<all_urls>"], types: ["main_frame", "sub_frame"]},
	    ["blocking"]
	);
	 
	// copied and adjusted from chrome.webRequest docs
	chrome.webRequest.onBeforeSendHeaders.addListener(
	    function(details)
	    {
	        for (let i = 0; i < details.requestHeaders.length; ++i)
	        {
	            if (details.requestHeaders[i].name === 'YouTube-Restrict')
	            {
	                details.requestHeaders.splice(i, 1);
	                break;
	            }
	        }
	        details.requestHeaders.push({"name": "YouTube-Restrict",
	                                     "value": "Strict"});
	                                     //"value": "Moderate"});
	        return {requestHeaders: details.requestHeaders};
	    },
	    {urls: ["*://*.youtube.com/*","*://*.googleapis.com/*","*://*.youtube-nocookie.com/*"], types: ["main_frame", "sub_frame"]},
	    ["blocking", "requestHeaders"]
	);
