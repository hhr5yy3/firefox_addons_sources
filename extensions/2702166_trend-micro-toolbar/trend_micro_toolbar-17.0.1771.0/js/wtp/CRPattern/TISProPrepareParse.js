/*
 *
 * This file is only used by Firefox & Chrome plugin as a result of refactor.
 * It is a callback which will be set in plugin js and then inner handler will be triggered periodically, as
 * some page may have tiny refresh.
 *
 */

var g_fnRatingURL = null;
var g_CallbackInterval = null;
var g_timeOut = 0;

function TSRPrepareParse(fnRatingURL, bPeriodically){
    if (fnRatingURL){
        g_fnRatingURL = fnRatingURL;
    }

    try{
        var TSRInnerParse = function(){
            if (g_timeOut > 3000){
                //Performance, once function runs over 3s, stop it.
                return;
            }
            
            var startTime = (new Date()).getTime();
            if (g_fnRatingURL){
                g_fnRatingURL(document);
            }
            var endTime = (new Date()).getTime();
            g_timeOut = endTime - startTime;
        }
        
        //1. Call once to fast response
        TSRInnerParse();
        
        //2. SetInterval callback
        if (bPeriodically && !g_CallbackInterval){
            g_CallbackInterval = setInterval(TSRInnerParse, 3000);
        }
    }catch(e){
    }
}
