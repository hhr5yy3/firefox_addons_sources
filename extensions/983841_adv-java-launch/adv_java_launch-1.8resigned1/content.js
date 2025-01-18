/* This script is injected into pages matching the extention's manifest content_scripts filter */
(function () {
    console.log("AdvJavaStart Content Script Start");
    
    /*
    * Listen for messages from the page script.
    */
    window.addEventListener("message", (event) => {    
        if( event.source == window && event.data && event.data.direction === 'from-page-script')
        {
            var data = event.data;
            if( data.action === 'ping' )
                window.postMessage( { direction:'from-content-script', action:'ping' }, '*' )
            else if( data.action === 'launch')
                sendToExtension( event.data.message );            
        }
    });
      
    window.postMessage( {direction:'from-content-script', action:'ping'}, '*' );

    var myPort = browser.runtime.connect({name:"port-from-cs"});
    
    myPort.onMessage.addListener(function(m) {
        console.log("In content script, received message from background script: ");
        console.log(JSON.stringify(m));
        window.postMessage( { direction:'from-content-script', action:'msg', msg:m }, '*' );
    });
    
    function sendToExtension( msg )
    {
        myPort.postMessage({msg:msg});
    }
    
    console.log("AdvJavaStart Content Script End");      
}());
