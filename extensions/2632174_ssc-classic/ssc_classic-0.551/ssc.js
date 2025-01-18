$(document).ready(function(){
 


setClassicThreadStyle();
classicIcons();
disableLazyload();


$(".california-message-cell").on("click", ".button--icon--preview", function(){
		
	pasteClassicIcons();
});



$(".california-message-cell").on("click", ".button--icon--save", function(){
		
	pasteClassicIcons();
});

$(".button--icon--preview").click(function(){
		
	pasteClassicIcons();
});

$(".button--icon--reply").click(function(){
		
	pasteClassicIcons();
});


function setClassicThreadStyle()
{

	$(".message-signature").removeClass("signature-collapsed");
	$(".message-signature").addClass("signature-expanded");

	$(".signature-expand").remove();
	$(".bbCodeBlock--expandable").addClass("is-expanded");

	$(".sidebar").remove();
	$(".california-recommended-reading-container").remove();
	
	$(".california-banner-ad-container").remove();
	
	$(".p-navSticky").removeAttr("data-xf-init");
	$(".contentRow-figure--fixedSmall").remove();

	if($("body").attr("data-template") === "thread_view")
	{
		$(".message-attribution").each(function(){
		$(this).prependTo($(this).parent().parent().parent().parent().parent());
		});
	}
	
	

	

	$(".node-title").each(function(){
		$(this).prependTo($(this).parent().parent().parent());
		});

	$(".userbit-info").each(function(){
		$(this).prependTo($(this).parent().parent());
		});

	$(".avatar-badge-wrapper > .avatar--default").remove();


}


function classicIcons()

	{

	$(".formButtonGroup").append("<div class='showClassicIcons'>Classic Emojis</>");


	$(".showClassicIcons").click(function(){

	if(!$(this).hasClass("classicIconsLoaded"))
	{
	
		$(".message--quickReply").append("<div class='classicIcons' style='width: 1400px; height: 430px; margin: 5px; border: 1px solid rgb(11, 25, 140)'><img src='https://i.postimg.cc/3kc9fLnM/007.gif'><img src='https://i.postimg.cc/QFt0bLgk/2cents.gif'><img src='https://i.postimg.cc/PLvygmRC/ancient.gif'><img src='https://i.postimg.cc/DJqgZ7FF/angel1.gif'><img src='https://i.postimg.cc/7JwNJjYz/angry.gif'><img src='https://i.postimg.cc/7b4vN653/angry2.gif'><img src='https://i.postimg.cc/fkfGqNd6/angryfire.gif'><img src='https://i.postimg.cc/HVWffh4j/applause.gif'><img src='https://i.postimg.cc/pp0gxJqC/apple.gif'><img src='https://i.postimg.cc/mPtKr1ns/awesome.gif'><img src='https://i.postimg.cc/jDmmndVJ/baaa.gif'><img src='https://i.postimg.cc/p9j7fbxc/baeh3.gif'><img src='https://i.postimg.cc/47T0wLxf/banana.gif'><img src='https://i.postimg.cc/KkrHWP1n/banned.gif'><img src='https://i.postimg.cc/2LkKN1Wg/bash.gif'><img src='https://i.postimg.cc/HjdKyhN3/bawling.gif'><img src='https://i.postimg.cc/bdg5HRcP/beer.gif'><img src='https://i.postimg.cc/8jC0yrN6/biggrin.gif'><img src='https://i.postimg.cc/1fYYb53Y/biggrin2.gif'><img src='https://i.postimg.cc/ZWGsK738/blahblah.gif'><img src='https://i.postimg.cc/cKf9KRMV/bleep.gif'><img src='https://i.postimg.cc/KkF9t104/boink.gif'><img src='https://i.postimg.cc/vgz0hGKh/bonk.gif'><img src='https://i.postimg.cc/0KycHLRs/booze.gif'><img src='https://i.postimg.cc/CdhP1fZQ/bow.gif'><img src='https://i.postimg.cc/87YcFWPB/bowtie.gif'><img src='https://i.postimg.cc/Z0wfyKpK/carrot.gif'><img src='https://i.postimg.cc/8j56XLcM/censored.gif'><img src='https://i.postimg.cc/ftmVQLs7/check1.gif'><img src='https://i.postimg.cc/ppysQbJQ/cheer.gif'><img src='https://i.postimg.cc/k6QghpNf/cheers.gif'><img src='https://i.postimg.cc/yk5vvQLM/cheesy.gif'><img src='https://i.postimg.cc/BjKNyTyX/chill.gif'><img src='https://i.postimg.cc/bGfLjGcL/closed.gif'><img src='https://i.postimg.cc/bDzTsKvt/club.gif'><img src='https://i.postimg.cc/9zHbkgHT/coffee.gif'><img src='https://i.postimg.cc/dk49d47S/colbert.gif'><img src='https://i.postimg.cc/BPbBCHHZ/confused.gif'><img src='https://i.postimg.cc/qztGhcpj/confused2.gif'><img src='https://i.postimg.cc/HVf9QJxH/cool.gif'><img src='https://i.postimg.cc/hXTbMSzm/cool2.gif'><img src='https://i.postimg.cc/DWhQMtLM/crazy.gif'><img src='https://i.postimg.cc/jWh60Zhd/cripes.gif'><img src='https://i.postimg.cc/njc4HBdK/cucumber.gif'><img src='https://i.postimg.cc/CnRb8Ypz/deadthread.gif'><img src='https://i.postimg.cc/R6scqh8k/dead-banana.gif'><img src='https://i.postimg.cc/jC2Hm6nt/devil2.gif'><img src='https://i.postimg.cc/dDf2Y7Gd/discoduck.gif'><img src='https://i.postimg.cc/8jKhTt9Z/dissy.gif'><img src='https://i.postimg.cc/m11FDw79/dj.gif'><img src='https://i.postimg.cc/ThKbCRBP/doh.gif'><img src='https://i.postimg.cc/WtxkyBPw/down.gif'><img src='https://i.postimg.cc/rKWr2fVX/drink.gif'><img src='https://i.postimg.cc/sMrZj5xB/drink2.gif'><img src='https://i.postimg.cc/yDy3kW3L/drool.gif'><img src='https://i.postimg.cc/p9Vh8xDR/duck.gif'><img src='https://i.postimg.cc/gwMwH5DR/dunno.gif'><img src='https://i.postimg.cc/k6B21c1H/eat.gif'><img src='https://i.postimg.cc/jwmLG7BS/eek.gif'><img src='https://i.postimg.cc/y3RkBNzX/eek2.gif'><img src='https://i.postimg.cc/s1GB5TZQ/eek5.gif'><img src='https://i.postimg.cc/7fv59SgB/emot-banjo.gif'><img src='https://i.postimg.cc/BXxXVtpJ/evil.gif'><img src='https://i.postimg.cc/Bj4X9s7H/eviltongue.gif'><img src='https://i.postimg.cc/Sndjm5H5/fart.gif'><img src='https://i.postimg.cc/67QqqcXQ/fiddle.gif'><img src='https://i.postimg.cc/8Fn56vpm/frown.gif'><img src='https://i.postimg.cc/xJw1sSbk/gaah.gif'><img src='https://i.postimg.cc/Zv6K2Drw/goodbye.gif'><img src='https://i.postimg.cc/14Ft84LD/goodnight.gif'><img src='https://i.postimg.cc/8jVCMNS9/grandpa.gif'><img src='https://i.postimg.cc/fJjRvpWL/grin.gif'><img src='https://i.postimg.cc/TpR9dyw3/grouphug.gif'><img src='https://i.postimg.cc/K1Gvpf45/grumpy.gif'><img src='https://i.postimg.cc/SngQB9Mb/guitar.gif'><img src='https://i.postimg.cc/hJh4cGLz/guitarred.gif'><img src='https://i.postimg.cc/WDKN3P89/guns1.gif'><img src='https://i.postimg.cc/S2MyYttm/gunz.gif'><img src='https://i.postimg.cc/V0PzqB3n/hahaha.gif'><img src='https://i.postimg.cc/GTPdqTCN/hahano.gif'><img src='https://i.postimg.cc/1fP94B0Z/headbang.gif'><img src='https://i.postimg.cc/SJrm99VY/heart.gif'><img src='https://i.postimg.cc/xX1n3dFx/hi.gif'><img src='https://i.postimg.cc/yDpBQzMV/hide.gif'><img src='https://i.postimg.cc/QBBDvyDc/hilarious.gif'><img src='https://i.postimg.cc/06Lvv05F/hm.gif'><img src='https://i.postimg.cc/gX8W2LnJ/hmm.gif'><img src='https://i.postimg.cc/tnbHZRxz/horse.gif'><img src='https://i.postimg.cc/m1SW-Qx3W/hug.gif'><img src='https://i.postimg.cc/WtmVRZBY/huh.gif'><img src='https://i.postimg.cc/QHX3jts8/jk.gif'><img src='https://i.postimg.cc/yDxCSbk2/kiss.gif'><img src='https://i.postimg.cc/Bjz95BFb/kneel.gif'><img src='https://i.postimg.cc/8Fr8ZfdH/laugh.gif'><img src='https://i.postimg.cc/LYdcw4NM/llama.gif'><img src='https://i.postimg.cc/cgQpSqbt/lockd.gif'><img src='https://i.postimg.cc/SYkwQZBT/lol.gif'><img src='https://i.postimg.cc/p5C3mfx2/love.gif'><img src='https://i.postimg.cc/hhnj7Kgw/lovethem.gif'><img src='https://i.postimg.cc/5jmtBD2t/lurker.gif'><img src='https://i.postimg.cc/BXYQyDD9/mad.gif'><img src='https://i.postimg.cc/tssCHTt1/mad2.gif'><img src='https://i.postimg.cc/gx1ccWNg/madwife.gif'><img src='https://i.postimg.cc/CZDhzQ2S/master.gif'><img src='https://i.postimg.cc/2bDzvxpv/naughty.gif'><img src='https://i.postimg.cc/q6B4DMvv/nixweiss.gif'><img src='https://i.postimg.cc/Yj8pGgdG/nono.gif'><img src='https://i.postimg.cc/qzRp8RFm/nono2.gif'><img src='https://i.postimg.cc/dLxwnFPJ/notacrook.gif'><img src='https://i.postimg.cc/87fD0YNM/nuts2.gif'><img src='https://i.postimg.cc/2qpmRxSJ/oh.gif'><img src='https://i.postimg.cc/jD1Q4ZhD/okay.gif'><img src='https://i.postimg.cc/KkfyTSDS/old.gif'><img src='https://i.postimg.cc/ftDNkTXf/omg.gif'><img src='https://i.postimg.cc/BtZ30bJq/oops.gif'><img src='https://i.postimg.cc/9zxhF2fy/pepper.gif'><img src='https://i.postimg.cc/YhhwvP4Z/pet.gif'><img src='https://i.postimg.cc/qzSHyGyR/picard.gif'><img src='https://i.postimg.cc/3kG5BDFZ/poke.gif'><img src='https://i.postimg.cc/rdL6YFh2/popcorn.gif'><img src='https://i.postimg.cc/WF2BTYL9/preach.gif'><img src='https://i.postimg.cc/tZ2LTd99/previous.gif'><img src='https://i.postimg.cc/sGfhrhcF/puke.gif'><img src='https://i.postimg.cc/K3jCgKYB/rant.gif'><img src='https://i.postimg.cc/GHBZLsV1/rcain.gif'><img src='https://i.postimg.cc/rKv7Kw2R/redxdance.gif'><img src='https://i.postimg.cc/gx8QRbGS/righton.gif'><img src='https://i.postimg.cc/LqS73QXH/rip.gif'><img src='https://i.postimg.cc/4K10Lv7p/rock.gif'><img src='https://i.postimg.cc/xJT4WkMh/rolleyes.gif'><img src='https://i.postimg.cc/62jmw9h3/rollin2.gif'><img src='https://i.postimg.cc/7J5QZpBN/runaway.gif'><img src='https://i.postimg.cc/6TqPcv9G/sad.gif'><img src='https://i.postimg.cc/WhJHLcqN/sad2.gif'><img src='https://i.postimg.cc/DSkY7p1q/sarcasm.gif'><img src='https://i.postimg.cc/rD1ZsG97/scouserdave.gif'><img src='https://i.postimg.cc/GBb7yB7t/screwit.gif'><img src='https://i.postimg.cc/jWv8QsmX/shake.gif'><img src='https://i.postimg.cc/TL4CFtR5/shifty.gif'><img src='https://i.postimg.cc/rRRQk5mn/shocked.gif'><img src='https://i.postimg.cc/vD4Pfwzr/siren.gif'><img src='https://i.postimg.cc/s1bTJH6t/skull.gif'><img src='https://i.postimg.cc/MvRd30gX/slap.gif'><img src='https://i.postimg.cc/G4CzW81K/sleepy.gif'><img src='https://i.postimg.cc/CRsJShhg/sly.gif'><img src='https://i.postimg.cc/PLfyqgJ8/smash.gif'><img src='https://i.postimg.cc/GBMQTXTg/smile.gif'><img src='https://i.postimg.cc/2bVxQn4k/smiley.gif'><img src='https://i.postimg.cc/R6yLXqRc/smug.gif'><img src='https://i.postimg.cc/K3TrVFqC/soapbox.gif'><img src='https://i.postimg.cc/nM9kMYFT/soon.gif'><img src='https://i.postimg.cc/ykqTRgWK/spam1.gif'><img src='https://i.postimg.cc/0bp00kJw/speech.gif'><img src='https://i.postimg.cc/21rFHs4X/stickdance.gif'><img src='https://i.postimg.cc/5Xg5Dsg9/storm.gif'><img src='https://i.postimg.cc/VSN9wXZq/stupid.gif'><img src='https://i.postimg.cc/DWYrwmRt/suicide.gif'><img src='https://i.postimg.cc/8JJhJNSs/suspicious.gif'><img src='https://i.postimg.cc/Kk6ttwGf/teeth-smile.gif'><img src='https://i.postimg.cc/302m11WT/tiasd.gif'><img src='https://i.postimg.cc/NLX6QsDz/toilet.gif'><img src='https://i.postimg.cc/mtGQDv62/tongue2.gif'><img src='https://i.postimg.cc/1fcDNvL0/tongue3.gif'><img src='https://i.postimg.cc/mPLC3Qsv/tongue4.gif'><img src='https://i.postimg.cc/bZmbmsYs/troll.gif'><img src='https://i.postimg.cc/R3qty4qG/tuschel.gif'><img src='https://i.postimg.cc/xk7mShzQ/tyty.gif'><img src='https://i.postimg.cc/KkMMcfPM/wallbash.gif'><img src='https://i.postimg.cc/1V1N8FBY/wave.gif'><img src='https://i.postimg.cc/ZvPvpqDY/weirdo.gif'><img src='https://i.postimg.cc/mh7H0d2x/wink.gif'><img src='https://i.postimg.cc/k6qVQbLV/wink2.gif'><img src='https://i.postimg.cc/qz0308zN/withstupid.gif'><img src='https://i.postimg.cc/Tp9WPpDC/wtf.gif'><img src='https://i.postimg.cc/4YxHHsvZ/Y2myNV0.gif'><img src='https://i.postimg.cc/FYCdj8GS/yawnee.gif'><img src='https://i.postimg.cc/mcccVj65/yes.gif'><img src='https://i.postimg.cc/DWtSNG9y/yuck.gif'></div>");

	$(this).addClass("classicIconsLoaded");
	}
	else
	{
		$(this).removeClass("classicIconsLoaded");
		$(".classicIcons").remove();
	}

	

	});

	}



function disableLazyload()
	{

		$(".bbWrapper img").each(function(){

			$(this).removeClass("lazyload");
			$(this).attr("src", $(this).attr("data-src"));
		
		});

	}


function pasteClassicIcons()

	{
		let icons = [{name: ":applause:", url: "https://i.postimg.cc/HVWffh4j/applause.gif"},
			{name: ":awesome:", url: "https://i.postimg.cc/mPtKr1ns/awesome.gif"},
			{name: ":banana:", url: "https://i.postimg.cc/47T0wLxf/banana.gif"},
			{name: ":bash:", url: "https://i.postimg.cc/2LkKN1Wg/bash.gif"},
			{name: ":cheers:", url: "https://i.postimg.cc/bdg5HRcP/beer.gif"},
			{name: ":discoduck:", url: "https://i.postimg.cc/dDf2Y7Gd/discoduck.gif"},
			{name: ":cripes:", url: "https://i.postimg.cc/jWh60Zhd/cripes.gif"},
			{name: ":dunno:", url: "https://i.postimg.cc/gwMwH5DR/dunno.gif"},
			{name: ":gaah:", url: "https://i.postimg.cc/xJw1sSbk/gaah.gif"},
			{name: ":lol:", url: "https://i.postimg.cc/SYkwQZBT/lol.gif"},
			{name: ":omg:", url: "https://i.postimg.cc/ftDNkTXf/omg.gif"},
			{name: ":madwife:", url: "https://i.postimg.cc/gx1ccWNg/madwife.gif"},
			{name: ":previous:", url: "https://i.postimg.cc/tZ2LTd99/previous.gif"},
			{name: ":wtf:", url: "https://i.postimg.cc/Tp9WPpDC/wtf.gif"},
			{name: ":rock:", url: "https://i.postimg.cc/4K10Lv7p/rock.gif"},
			{name: ":rofl:", url: "https://i.postimg.cc/62jmw9h3/rollin2.gif"},
			{name: ":troll:", url: "https://i.postimg.cc/bZmbmsYs/troll.gif"}];

		$(".fr-wrapper *").each(function(){
		let str = $(this).html();

			for(icon of icons)
			{
				if(str.search(icon.name) !== -1);
				{
					str = str.replace(new RegExp(icon.name, 'g'), "<img src=" + icon.url + ">");
					$(this).html(str);
					
				}

			}
		
		
		});
	}





});























