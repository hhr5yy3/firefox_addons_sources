var silentLogin = {
    httpRequest : null,
    url: null,
    uuid: null,

    login: function (config, uuid) {


        this.url = "https://" + config.url;
        this.uuid = uuid;
        this.config = config;
        this.authMethod = config.authMethod;
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.open("POST",this.getLoginURL() );
        this.httpRequest.onreadystatechange = this.onReadyStateChange;
        this.httpRequest.send();
    },
    async onReadyStateChange(e){
        if (e.target.readyState === XMLHttpRequest.DONE && e.target.status === 200) {
            let authFailed = false;
            try {
                let response = JSON.parse(silentLogin.httpRequest.responseText);


                if(!response.success){
                    authFailed = true;
                } else {
                    if (!background.reasoner) {
                        background.requestReasoner();
                    } else {
                        if (trackingWebSocket.isReady()) {
                            background.reasoner.active = true;
                        }
                    }
                }
            } catch (e) {
                authFailed = true;
            }

            if(authFailed){

                if(background.reconnect){

                    background.reconnect = false;
                    background.logoutUser("Lost connection!");

                }else{

                    let optionsPage = await background.getActiveOptionsPage();

                    if(optionsPage){
                        console.log("silent login:");
                        console.log(silentLogin.getLoginURL());
                        optionsPage.silentLoginFailed(silentLogin.getLoginURL());
                    }else{
                        await browser.runtime.openOptionsPage();
                        let optionsPage = await background.getActiveOptionsPage();

                        if(optionsPage) {
                            console.log("silent login:");
                            console.log(silentLogin.getLoginURL());
                            optionsPage.silentLoginFailed(silentLogin.getLoginURL());
                        }

                    }
                }

                if (background.reasoner) {
                    background.reasoner.active = false;
                }

            }else{
                background.reconnect = false;
            }

        }else{
            console.log("ERROR-Login");
            console.log(e);
        }
    },

    getLoginURL: function () {

        if(this.authMethod === "google"){

            return this.url+"/client/login?token="+this.uuid;
        }else if(this.authMethod === "fb"){
            return this.url+"/client/login/facebook?token="+this.uuid;
        }else if(this.authMethod === "anonym"){
            return this.url+"/client/login/anonym?token="+this.uuid+"&lang="+this.config.lang;
        }
    }
};
