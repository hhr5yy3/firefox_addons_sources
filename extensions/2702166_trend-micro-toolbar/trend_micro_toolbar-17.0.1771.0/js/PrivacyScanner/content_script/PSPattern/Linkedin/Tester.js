(function() {
    "use strict";
    
    var Scanner = new LinkedinPScanner();
    var Fixer = new LinkedinPFixer();
    
    function scanSingleCallback(data){
        var str = JSON.stringify(data, undefined, 4);
        PSDebug.info(str)
    }
    
    // Scanner.scanSingle("11", scanSingleCallback)
    // Scanner.scanSingle("12", scanSingleCallback)
    // Scanner.scanSingle("13", scanSingleCallback)
    // Scanner.scanSingle("14", scanSingleCallback)
    // Scanner.scanSingle("16", scanSingleCallback)
    // Scanner.scan(scanSingleCallback)    
    
    // Fixer.fixSingle("11", 0, scanSingleCallback)
    // Fixer.fixSingle("12", 0, scanSingleCallback)
    // Fixer.fixSingle("13", 0, scanSingleCallback)   
    // Fixer.fixSingle("14", 1, scanSingleCallback)   
    // Fixer.fixSingle("16", 0, scanSingleCallback)
})();
