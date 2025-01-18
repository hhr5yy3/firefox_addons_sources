
//*****************************************************************************}
//                                                                             }
//       Sticky Password manager & safe                                        }
//       PrivacyServices for WebBrowsers                                       }
//                                                                             }
//       © 2001 - 2024 Lamantine Software. All rights reserved.                }
//                                                                             }
//*****************************************************************************}

(function() {

'use strict';

var spLog = spRequire('spLog').spLog;



const serviceName_passwordSavingEnabled = 'passwordSavingEnabled';
const serviceName_autofillAddressEnabled = 'autofillAddressEnabled'; // Chrome 70+
const serviceName_autofillCreditCardEnabled = 'autofillCreditCardEnabled'; // Chrome 70+
const serviceName_autofillEnabled = 'autofillEnabled'; // deprecated since Chrome 70

// TspPrivacyServices ----------------------------------------------------------

function TspPrivacyServices()
{
  // empty
}

TspPrivacyServices.prototype.GetPrivacyServiceState = function (serviceName, response)
{
  try
  {
    if (!response)
      throw '"response" is undefined!';
      
    var serviceState = {};
    serviceState.serviceName = serviceName;
    serviceState.supported = false;
    serviceState.controllable = false;
    serviceState.value = false;
    
    if (!chrome.privacy || !chrome.privacy.services)
    {
      spLog.logMessage(this.constructor.name + '.DisablePrivacyService(' + serviceName + ') No access to privacy API.');
      response(serviceState);
      return;
    }
    var service = chrome.privacy.services[serviceName];
    if (!service)
    {
      spLog.logMessage(this.constructor.name + '.DisablePrivacyService(' + serviceName + ') Unable to find the required privacy service.');
      response(serviceState);
      return;
    }
  
    service.get({}, function(details) {
      serviceState.supported = true;
      serviceState.controllable =
        details.levelOfControl === 'controllable_by_this_extension' ||
        details.levelOfControl === 'controlled_by_this_extension';
      serviceState.value = details.value;
      response(serviceState);
    });
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.GetPrivacyServiceState(' + serviceName + ') Error: ' + ErrorMessage);
  } 
};

TspPrivacyServices.prototype.SetPrivacyServiceState = function (serviceName, serviceValue, forceSet, response)
{
  this.GetPrivacyServiceState(serviceName, 
    function (serviceState)
    {
      if (serviceState.supported &&
          serviceState.controllable &&
          (forceSet || serviceState.value != serviceValue)
         )
      {
        var service = chrome.privacy.services[serviceName];
        if (!service)
        {
          spLog.logMessage(this.constructor.name + '.SetPrivacyServiceState(' + serviceName + ') Unable to find the required privacy service.');
          return;
        }

        service.set({ value: serviceValue }, function() {
          if (chrome.runtime.lastError)
          {
            error = chrome.runtime.lastError;
            var errorMessage = 'Unknown error';
            if (error && typeof error.message != 'undefined')
              errorMessage = error.message;
            spLog.logError(this.constructor.name + '.SetPrivacyServiceState(' + serviceName + ') Error setting privacy service state: ' + errorMessage);
          }
          else
          {
            if (response)
              response();
          }
        }.bind(this));
      }
    }
  );  
};

TspPrivacyServices.prototype.GetPrivacyServicesState = function (response)
{
  if (!response)
    throw '"response" is undefined!';
  
  var states = {};
  states.passwordSavingEnabled = {};
  states.autofillAddressEnabled = {};
  states.autofillCreditCardEnabled = {};
  this.GetPrivacyServiceState(serviceName_passwordSavingEnabled,
    function (serviceState)
    {
      states.passwordSavingEnabled = serviceState;
      
      this.GetPrivacyServiceState(serviceName_autofillAddressEnabled,
        function (serviceState)
        {
          states.autofillAddressEnabled = serviceState;
          
          this.GetPrivacyServiceState(serviceName_autofillCreditCardEnabled,
            function (serviceState)
            {
              states.autofillCreditCardEnabled = serviceState;
            
              if (response)
                response(states);
            }.bind(this)
          );
        }.bind(this)
      );
    }.bind(this)
  );
};
  
TspPrivacyServices.prototype.DisablePrivacyService = function (ExtensionStorage, serviceName)
{
  var settingName = 'privacyService.' + serviceName;
  ExtensionStorage.get(settingName, function (settingValue) {
    if (typeof settingValue == 'undefined')
    {
      this.SetPrivacyServiceState(serviceName, false, true,
        function ()
        {
          ExtensionStorage.set(settingName, true);
        }
      );
    }
  }.bind(this));
};

TspPrivacyServices.prototype.DisableInternalPasswordManager = function (ExtensionStorage)
{
  if (!ExtensionStorage)
    throw '"ExtensionStorage" is undefined!';
    
  this.DisablePrivacyService(ExtensionStorage, serviceName_passwordSavingEnabled);
  this.DisablePrivacyService(ExtensionStorage, serviceName_autofillAddressEnabled);
  this.DisablePrivacyService(ExtensionStorage, serviceName_autofillCreditCardEnabled);
  this.DisablePrivacyService(ExtensionStorage, serviceName_autofillEnabled);
};




const spPrivacyServices = {
  CreatePrivacyServices: function ()
  {
    return new TspPrivacyServices();
  }
};

var __exports = {};
__exports.spPrivacyServices = spPrivacyServices;

if (typeof exports !== 'undefined')
  exports = __exports;
else
  spDefine('spPrivacyServices', __exports);

})();