(()=>{
    const __log=(...args) => {
        void 0;
    };
    let p=null;
    const s = () => {
        webpackChunkproton_mail.push([[99999],{99999:function(...args){void 0;}}])
        try {
            __log(0,"GOT IT",webpackChunkproton_mail);
            webpackChunkproton_mail.push = (...args) => {
                __log(0,"PUSH CALLED", "TYPEOF THIS="+typeof this, "THIS=",this, "ARGS=", ...args);
                p(...args);
            }
        } catch(e) {
            __log("GOT EXCEPTION",e);
        }
    };
    let t=setInterval(()=>{
        window.hasOwnProperty("webpackChunkproton_mail") ? (p=webpackChunkproton_mail.push, clearInterval(t) , s()) : __log(0,"NOT FOUND");
    },100);
    __log(0,"LOADED");
})();
