
function I(i){return document.getElementsByClassName(i);}
function ID(i){return document.getElementById(i);}
////Speedtest initialization
var s=new Speedtest(); //create speedtest object

function mbpsToAmount(s){
    return 1-(1/(Math.pow(1.3,Math.sqrt(s))));
}
function format(d){
    d=Number(d);
    if(d<10) return d.toFixed(2);
    if(d<100) return d.toFixed(1);
    return d.toFixed(0);
}

function clearOldTestResults(){
    if (!uiData)
    return;
    uiData.dlStatus = ""; 
    uiData.ulStatus = ""; 
    uiData.pingStatus = ""; 
    uiData.jitterStatus = ""; 
    uiData.dlProgress = 0;
    uiData.ulProgress = 0;
    uiData.pingProgress = 0;
}

//UI CODE
var uiData=null;
function startStop(){
    
    clearOldTestResults();

    if(s.getState()==3){
        s.abort();
        uiData=null;
        ID("speed_chk_start_id").className="";
        initUI();
    }else{    // called periodically
        //test is not running, begin
        ID("speed_chk_start_id").className="running";
        s.onupdate=function(data){
            uiData=data;
        };
        s.onend=function(aborted){  // at the end of the test.
            ID("speed_chk_start_id").className="";
            updateUI(true);
            if (s.getState()==4){
            setAnimationUtils && setAnimationUtils.resetAnimationFlag();}
            if(!aborted){
                //if testId is present, show sharing panel, otherwise do nothing
                try{
                    // var testId=uiData.testId;
                    // if(testId!=null){
                    //     var shareURL=window.location.href.substring(0,window.location.href.lastIndexOf("/"))+"/results/?id="+testId;
                    // I("resultsImg").src=shareURL;
                    // I("resultsURL").value=shareURL;
                    // I("testId").innerHTML=testId;
                    // I("shareArea").style.display="";
                    // }
                }catch(e){}
            }
        };
        s.start();  // Running the test  again other than destroying s
        
    }
}
//this function reads the data sent back by the test and updates the UI
function updateUI(forced) {

    if (!forced && s.getState() != 3) return;
    if (uiData == null) return;
    var status = uiData.testState;
    // I("ip").textContent=uiData.clientIp;
    // if (uiData.pingProgress ==1 ){
    setTimeout(function () {
        $('#download-content').removeClass('download-dashed');
    }, 0);
 //}
    ping=I("pn_spd");
    for(var i = 0; i < ping.length; i++){
        var ping_value = (status==3&&uiData.pingStatus==0)?"----":format(uiData.pingStatus);
        if (uiData.ulProgress ==1 ){
        ping[i].innerText=ping_value;    // Change the content
        }}
    
    jitter=I("jtr_spd");
    for(var i = 0; i < jitter.length; i++){
        var jit_value = (status==3&&uiData.jitterStatus==0)?"----":format(uiData.jitterStatus);
        if (uiData.ulProgress ==1 ){
        jitter[i].innerText=jit_value;    // Change the content
    }}
    
    x=I("dw_spd");
    for(var i = 0; i < x.length; i++){
        var val = (status==1&&uiData.dlStatus==0)?"----":format(uiData.dlStatus);
        if ( val!= 0.00 ){
        x[i].innerText=val; }   // Change the content
        setAnimationUtils && setAnimationUtils.downloadProgress(val);
        }
    xx=I("up_spd");
    for(var i = 0; i < xx.length; i++){
        var value = (status==3&&uiData.ulStatus==0)?"----":format(uiData.ulStatus);
        if ( uiData.dlProgress==1 ){
        xx[i].innerText=value;  }  // Change the content
        if (uiData.ulStatus)
        setAnimationUtils && setAnimationUtils.uploadProgress(value);
        }
}
//update the UI every frame
window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||(function(callback,element){setTimeout(callback,1000/60);});
function frame(){
    requestAnimationFrame(frame);
    updateUI();
}
frame(); //start frame loop
//function to (re)initialize UI
function initUI(){
    I("dw_spd").textContent="";
    I("up_spd").textContent="";
    I("pn_spd").textContent="";
    I("jtr_spd").textContent="";
}

