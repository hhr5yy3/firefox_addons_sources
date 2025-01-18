/**
 * Copyright (C) 2017 Aeropost. All Rights Reserved.
 */

var GoogleTranslateApi = {

    translateLanguage : function(config, aCallback) {

        var sourceText = encodeURIComponent(config.text); // escape
        var url = ConfigSettings.GOOGLE_TRANSLATE_API.replace('%S1',config.api_key).replace('%S2', (config.target || 'es')).replace('%S3', (config.source || 'en')).replace('%S4',sourceText);

        $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        timeout: 60 * 1000,
        }).done(function(aData) {
          if (aData.data && aData.data.translations[0] && aCallback) {
                var translate = new Object();
                translate.text = aData.data.translations[0].translatedText;
                aCallback(translate);
                return;
            }

            if (aData.error) {
                var translate = new Object();
                translate.error = aData.error.message;
                aCallback(translate);
                return;
            }
        }).fail(function(aXHR, aTextStatus, aError) {
          Logger.error("GoogleTranslateApi Error: Unable to contact the server.") ;
          //console.log(aError);
          if (aCallback) {
            aCallback();
          }
        });


    }

}
