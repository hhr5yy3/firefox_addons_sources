$(document).ready(function() {
    var page = {
        'title' : {
            'text' : $('title').text().trim()
        },
        'meta' : {
            // 'charset' : $('meta[name=charset]').length > 0 ? $('meta[charset]').attr("content") : '',
            'description' : $('meta[name=description]').length > 0 ? $('meta[name=description]').attr("content") : '',
            'keywords' : $('meta[name=keywords]').length > 0 ? $('meta[name=keywords]').attr("content") : '',
            'author' : $('meta[name=author]').length > 0 ? $('meta[name=author]').attr("content") : '',
            'viewport' : $('meta[name=viewport]').length > 0 ? $('meta[name=viewport]').attr("content") : ''
        },
        'h1' : {
            'list' : [],
            'count' : $('h1').length
        }
    };
    $('h1').each(function() {
        page['h1']['list'].push($(this).text())
    })
    var style = $('<style> .seo-highlighter { border-color: red; border-width: 5px; border-style: solid; border-radius: 18px; }</style>')
    $('html > head').append(style);

    chrome.storage.local.get('highlight-h1', function (result) {
        if (result['highlight-h1'])
        {
            $('h1').addClass('seo-highlighter');
        }
    });
    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
                case "scrapePage":
                    sendResponse(page);
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        }
    );
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes['highlight-h1'] !== undefined) 
        {
            if (changes['highlight-h1']['newValue'])
            {
                $('h1').addClass('seo-highlighter');
            }
            else
            {
                $('h1').removeClass('seo-highlighter');
            }
        }
      });
})