
//*****************************************************************************}
//                                                                             }
//       Sticky Password manager & safe                                        }
//       Settings engine                                                       }
//                                                                             }
//       © 2001 - 2024 Lamantine Software. All rights reserved.                }
//                                                                             }
//*****************************************************************************}

// Microsoft Edge support
if (typeof browser != 'undefined')
  chrome = browser;

(function() {

'use strict';

var spLog = spRequire('spLog').spLog;
spLog.setProductName('spPrivacyServices');
var spPrivacyServices = spRequire('spPrivacyServices').spPrivacyServices;



// TspExtensionSettingsView ---------------------------------------------------

function TspExtensionSettingsView()
{
  this.PrivacyServices = spPrivacyServices.CreatePrivacyServices();
}

TspExtensionSettingsView.prototype.Initialize = function()
{
  this.Localize();
  this.PrivacyServices.GetPrivacyServicesState(this.ApplyPrivacySettings.bind(this));
};
  
TspExtensionSettingsView.prototype.Localize = function ()
{
  try
  {
    this.SetElementInnerText('txtSettings', 'Settings');
    this.SetElementInnerText('txtBrowserAutofill', 'BrowserAutofill');
    this.SetElementInnerText('txtBrowserAutofillDescription', 'BrowserAutofillDescription');
    this.SetElementInnerText('txtAutofillPassword', 'AutofillPassword');
    this.SetElementInnerText('txtAutofillPasswordUncontrolable', 'ControlledByOtherExtension');
    this.SetElementInnerText('txtAutofillCreditCard', 'AutofillCreditCard');
    this.SetElementInnerText('txtAutofillCreditCardUncontrolable', 'ControlledByOtherExtension');
    this.SetElementInnerText('txtAutofillAddress', 'AutofillAddress');
    this.SetElementInnerText('txtAutofillAddressUncontrolable', 'ControlledByOtherExtension');
    document.title = document.getElementById('divHeaderTitle').innerText;
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.Localize() Error: ' + ErrorMessage);
  }
};
  
TspExtensionSettingsView.prototype.SetElementInnerText = function(elementID, messageName)
{
  document.getElementById(elementID).innerText = chrome.i18n.getMessage(messageName);
};
  
TspExtensionSettingsView.prototype.ApplyPrivacySetting = function (serviceState, divBrowserAutofill, divService, chkService, lblService, lblServiceUncontrolable)
{
  try
  {
    if (!serviceState)
      throw '"serviceState" is undefined!';

    else if (serviceState.supported)
    {
      divBrowserAutofill.style.display = 'block';
      divService.style.display = 'block';
      if (!serviceState.controllable)
      {
        chkService.disabled = true;
        lblService.disabled = true;
        lblServiceUncontrolable.style.display = 'block';
      }
      chkService.checked = serviceState.value;
      chkService.addEventListener('change', function() {
        this.PrivacyServices.SetPrivacyServiceState(serviceState.serviceName, chkService.checked);
      }.bind(this));
    }
  }
  catch (ErrorMessage)
  {
    spLog.logError(this.constructor.name + '.ApplyPrivacySetting() Error: ' + ErrorMessage);
  }
};

TspExtensionSettingsView.prototype.ApplyPrivacySettings = function (servicesState)
{
  var divBrowserAutofill = document.getElementById('browserAutofill');
  this.ApplyPrivacySetting(servicesState.passwordSavingEnabled,
    divBrowserAutofill,
    document.getElementById('autofillPassword'),
    document.getElementById('chkAutofillPassword'),
    document.getElementById('txtAutofillPassword'),
    document.getElementById('txtAutofillPasswordUncontrolable')
  );
  this.ApplyPrivacySetting(servicesState.autofillCreditCardEnabled,
    divBrowserAutofill,
    document.getElementById('autofillCreditCard'),
    document.getElementById('chkAutofillCreditCard'),
    document.getElementById('txtAutofillCreditCard'),
    document.getElementById('txtAutofillCreditCardUncontrolable')
  );
  this.ApplyPrivacySetting(servicesState.autofillAddressEnabled,
    divBrowserAutofill,
    document.getElementById('autofillAddress'),
    document.getElementById('chkAutofillAddress'),
    document.getElementById('txtAutofillAddress'),
    document.getElementById('txtAutofillAddressUncontrolable')
  );
};



var spExtensionSettingsView = new TspExtensionSettingsView();

document.addEventListener('DOMContentLoaded', function () {
  spExtensionSettingsView.Initialize();  
});

})();