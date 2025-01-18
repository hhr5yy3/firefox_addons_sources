class getfvidButton {
    constructor(e) {
        this.sourceUrl = e, this.guava = ""
    }
    search() {
        if (this.sourceUrl.includes("/stories/") && this.sourceUrl.includes("#GetFVid_")) {
            const e = /#GetFVid_([0-9]+)_/.exec(this.sourceUrl);
            
        } else {
            if((this.sourceUrl.includes("#GetFVid") && "" === this.guava) || this.sourceUrl.includes("/videos/")) {
            this.searchVideo()
        }

        const e = document.body;
        new MutationObserver(e => {
            if (this.sourceUrl !== document.URL) 
                {
                    this.removeButton();
                    this.sourceUrl = document.URL;
                    setTimeout(() => {
                        if(this.sourceUrl.includes("#GetFVid") && "" === this.guava) this.searchVideo()
                        if(this.sourceUrl.includes("/videos/")) this.linkButton()
                    }, 1e3);
            }    
        }).observe(e, {
            childList: !0,
            subtree: !0
        })
        }
    }
    removeButton() {
        const e = document.querySelectorAll("a.FVD");
        for (const t of e) 
            {
                t.remove()
            }
    }
    linkButton() {
        const e = document.querySelector("div[data-pagelet='TahoeVideo']");
        if (e) {
            const t = e.getElementsByTagName("span");
            for (const e of t)
                if ("LIVE" === e.innerText) return
        }
        let t = "";
        const o = /\/videos\/([0-9]+)/.exec(this.sourceUrl);
        if (o && o.length > 1 && (t = o[1]), "" !== t) {
            const e = `https://www.facebook.com/watch/?v=${t}#GetFVid`;
            this.addButton(e)
        }
    }
    changeCssBtn1(e) {
        const t = this.createButton(e);
        document.createElement("span");
        if(t){
            t.setAttribute("style", "margin-right: 8px; padding: 5px 15px; border-radius: 20px; height: 30px; line-height: 30px; font-weight: 600; font-size: 12px; background-color: #2ecc71; color: #fff; text-decoration: none;");
            return t
        }
    }
    changeCssBtn2(e) {
        const t = this.createButton(e);
        document.createElement("span");
        if(t){
            t.setAttribute("style", "margin-left: 60px; padding: 5px 15px; border-radius: 20px; height: 30px; line-height: 30px; font-weight: 600; font-size: 12px; background-color: #2ecc71; color: #fff; text-decoration: none;");
            return t
        }
    }
    changeCssBtn3(e) {
        const t = this.createButton(e);
        document.createElement("span");
        if(t){
            t.setAttribute("style", "padding: 5px 15px; border-top-left-radius: 20px; border-bottom-left-radius: 20px; height: 30px; line-height: 30px; font-weight: 600; font-size: 12px; background-color: #2ecc71; color: #fff; text-decoration: none; position: fixed; top: 75px; right: 0;");
            return t
        }
        
    }
    addButton(e) {
        const t = document.querySelector("div[role='banner']");
        if (t) {
            const o = t.getElementsByTagName("div");
            if (o && o.length > 0) {
                o[0].appendChild(this.changeCssBtn2(e))
            }
        }
    }
    async searchVideo() {
        const e = document.getElementsByTagName("video");
        for (const t of e) t.remove();
        const t = this.hd_link(document.body.innerHTML);
        if (t.length > 0 && !t[0].includes("blob:")) {
            this.guava = t[0];
            let e = await this.watermelon(this.guava);
            if (e) {
                window.location.replace(this.getfvidLink(this.guava));
                chrome.runtime.sendMessage({
                            todo: "download",
                            url: this.guava,
                            name: "video.mp4"
                        });
            }
            else {
                const o = this.sd_link(document.body.innerHTML);
                if(o.length > 0 && !o[0].includes("blob:")){
                    this.guava = o[0];
                    e = await this.watermelon(this.guava);
                    if(e) {
                        window.location.replace(this.getfvidLink(this.guava));
                        chrome.runtime.sendMessage({
                            todo: "download",
                            url: this.guava,
                            name: "video.mp4"
                        });
                    }
                } else alert("Video source can't be found.")
            }
        } else {
            const e = this.sd_link(document.body.innerHTML);
            if (e.length > 0 && !e[0].includes("blob:")) {
                this.guava = e[0];
                j = await this.watermelon(this.guava);

                if(j) {
                    window.location.replace(this.getfvidLink(this.guava));
                    chrome.runtime.sendMessage({
                            todo: "download",
                            url: this.guava,
                            name: "video.mp4"
                    });
                }
            } else alert("Video source can't be found.")
        }
    }
    createButton(e) {
        if ("#" === e) return null;
        const t = document.createElement("a");
        t.className = "FVD";
        t.href = e;
        t.target = "_blank";
        const o = document.createElement("div");
        o.innerText = "Download";
        t.appendChild(o);
        return t;
    }
    hd_link(e) {
        const t = [],
            o = /"playable_url_quality_hd":"(.*?)"/gm.exec(e);
        if (o)
            for (const e of o) {
                const o = /"playable_url_quality_hd":"(.*?)"/.exec(e);
                if (o && o.length > 1) {
                    const e = o[1].replaceAll("\\/", "/");
                    t.includes(e) || t.push(e)
                }
            }
        return t
    }
    sd_link(e) {
        const t = [],
            o = /"playable_url":"(.*?)"/gm.exec(e);
        if (o)
            for (const e of o) {
                const o = /"playable_url":"(.*?)"/.exec(e);
                if (o && o.length > 1) {
                    const e = o[1].replaceAll("\\/", "/");
                    t.includes(e) || t.push(e)
                }
            }
        return t
    }
    getfvidLink(e) {
        return `https://www.getfvid.com/downloading/?u=` + btoa(e);
    }
    hd_sd(e, t) {
        if (t - 1 < e.length && e[t - 1]) {
            const o = JSON.stringify(e[t - 1]);
            let n = /"playable_url_quality_hd":"(.*?)"/m,
                i = n.exec(o);
            if (i && i.length > 1) return this.getfvidLink(i[1]);
            if ((i = (n = /"playable_url":"(.*?)"/m).exec(o)) && i.length > 1) return this.getfvidLink(i[1])
        }
        return !1
    }
    undefindVideo() {
        alert("Video source can't be found.");
    }
    async watermelon(e) {
        try {
            const t = await fetch(e, {
                method: "HEAD"
            });
            return 404 !== t.status && 403 !== t.status
        } catch (e) {}
    }
}
const o = document.URL;

function loadButton() {
	if (o.includes("www.facebook.com")){
        new getfvidButton(o).search()
    } 
}
window.addEventListener("load", loadButton, !1);