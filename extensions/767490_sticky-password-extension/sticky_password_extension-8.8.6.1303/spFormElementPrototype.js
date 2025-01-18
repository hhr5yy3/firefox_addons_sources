(function() {

var spFormElementPrototype =
{
  GetHTMLFormElementPrototype: function()
  {
    // FormElementPrototype script >> WARNING: Do not remove/modify this comment!
    try
    {
      let sp_old_HTMLFormElementPrototype_submit = null;
      let sp_HTMLFormElementPrototype_submit = function()
      {
        try
        {
          var spEvent = document.createEvent('Event');
          spEvent.initEvent('sp_submit', true, true);
          this.dispatchEvent(spEvent);
        }
        catch(ErrorMessage)
        {
          console.error('spFormElementPrototype() Error sending "sp_submit" event from HTMLFormElement.prototype.submit: ' + ErrorMessage);
        }
        sp_old_HTMLFormElementPrototype_submit.apply(this);
      };
      if (HTMLFormElement.prototype.submit.name != sp_HTMLFormElementPrototype_submit.name)
      {
        sp_old_HTMLFormElementPrototype_submit = HTMLFormElement.prototype.submit;
        HTMLFormElement.prototype.submit = sp_HTMLFormElementPrototype_submit;
      }
    }
    catch(ErrorMessage)
    {
      console.error('spFormElementPrototype() Error attaching to HTMLFormElement.prototype.submit: ' + ErrorMessage);
    }

    try
    {
      if (typeof __doPostBack == 'function')
      {
        // attach to function only with 2 arguments!
        if (__doPostBack.length == 2)
        {
          var sp_old__doPostBack = __doPostBack;
          __doPostBack = function(eventTarget, eventArgument)
          {
            try
            {
              var spEvent = document.createEvent('Event');
              spEvent.initEvent('sp_submit', true, true);
              window.dispatchEvent(spEvent);
            }
            catch(ErrorMessage)
            {
              console.error('spFormElementPrototype() Error sending "sp_submit" event from __doPostBack(): ' + ErrorMessage);
            }
            sp_old__doPostBack(eventTarget, eventArgument);
          };
        }
      }
    }
    catch(ErrorMessage)
    {
      console.error('spFormElementPrototype() Error attaching to __doPostBack(): ' + ErrorMessage);
    }
    // FormElementPrototype script << WARNING: Do not remove/modify this comment!
  }
};

if (typeof exports !== 'undefined')
  exports.spFormElementPrototype = spFormElementPrototype;
else
{
  var __exports = {};
  __exports.spFormElementPrototype = spFormElementPrototype;
  spDefine('spFormElementPrototype', __exports);
}

})();