if (!XTChecker) var XTChecker = {};
if (!XTChecker.Capcha) XTChecker.Capcha =
{
    _capchaID : "",
	_apikey : "",
	_type : "",
	_antigate_no_alerts : false,
	_checkUrl : "",
	_threadIndex : -1,
	_mode : -1,
	_buttonUrl : "",
	_key : "",
	_key2 : "",
	_imgSrc : "",
	_retPath : "",
	_formAction : "",
	_encanswer : "",
	_ig : "",
	_query: "",
	_attempt : 0,
	_textResult : "",
	_recognizing : false,
	_stopAll : false,
	_stage : "",
	_result : "",
	_answer : "",
	_resultCode : -1,
	
} 


if (!XMLHttpRequest.prototype.sendAsBinary) {
	XMLHttpRequest.prototype.sendAsBinary = function (sData) {
	  var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
	  for (var nIdx = 0; nIdx < nBytes; nIdx++) {
		ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
	  }
	  /* send as ArrayBufferView...: */
	  this.send(ui8Data);
	  /* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
	};
  }

XTChecker.Capcha._modes = {"Google" : 0, "Yandex" : 1, "YandexW" : 2, "GoogleW" : 3, "Bing" : 4};

XTChecker.Capcha.ClearAll = function ()
{
	var cpt = XTChecker.Capcha;
	cpt._capchaID = "";
	cpt._type = "";
	cpt._apikey = "";
	cpt._antigate_no_alerts = false;
	cpt._checkUrl = "";
	cpt._mode = -1;
	cpt._key = "";
	cpt._key2 = "";
	cpt._threadIndex = -1;
	cpt._attempt = 0;
	cpt._imgSrc = "";
	cpt._retPath = "";
	cpt._encanswer = "";
	//cpt._answer = "";
	cpt._ig = "";
	cpt._query = "";
	cpt._formAction = "";
	cpt._textResult = "";
	cpt._recognizing = false;
	cpt._stopAll = false;
	cpt._stage = "";
	cpt._result = "";
	cpt._resultCode = -1;
}
/*
XTChecker.Capcha.ProcessCapcha = function (url, apikey)
{
	var cpt = XTChecker.Capcha;
	
	if (cpt._stopAll)
	{
		//cpt._stopAll = false;
		return;
	}
	XToolChecker.DebugMsg("ProcessCapcha");
	var cpt = XTChecker.Capcha;
	XToolChecker.DebugMsg(cpt);
	if (!cpt._recognizing)
	{
		XToolChecker._stopWait = false;
		cpt._recognizing = true;
		cpt._checkUrl = url;
		
		cpt._isGoogleW = (cpt._checkUrl.indexOf("google.com/webmasters") != -1);
		cpt._isGoogle = (cpt._checkUrl.indexOf("google.com") != -1);
		cpt._isYandexW = (cpt._checkUrl.indexOf("webmaster.yandex.ru") != -1);
		cpt._isYandex = (cpt._checkUrl.indexOf("yandex.") != -1);//ru
		
		cpt._apikey = apikey;
		// получаем путь к картинке
		cpt.Check();
	}

}*/

XTChecker.Capcha.ProcessCapcha = function (url, type, apikey,  antigate_no_alerts, threadIndex)
{
	var cpt = XTChecker.Capcha;
	
	if (cpt._stopAll)
	{
		//cpt._stopAll = false;
		return;
	}
	console.log(threadIndex);
	cpt._threadIndex = threadIndex;
	cpt._type = type;
	XToolChecker.DebugMsg("ProcessCapcha");
	XToolChecker.DebugMsg(cpt);
	if (!cpt._recognizing)
	{
		XToolChecker._stopWait = false;
		cpt._recognizing = true;
		cpt._checkUrl = url;
		
		if (cpt._checkUrl.indexOf("google.com/webmasters") != -1)
			cpt._mode = cpt._modes.GoogleW;
		else if (cpt._checkUrl.indexOf("google.com") != -1)
			cpt._mode = cpt._modes.Google;
		else if (cpt._checkUrl.indexOf("webmaster.yandex.ru") != -1)
			cpt._mode = cpt._modes.YandexW;
		else if (cpt._checkUrl.indexOf("yandex.") != -1)
			cpt._mode = cpt._modes.Yandex;
		else
			XToolChecker.DebugMsg("Url is not recognized " + cpt._checkUrl );
		cpt._apikey = apikey;
		cpt._antigate_no_alerts = antigate_no_alerts;
		// получаем путь к картинке
		cpt.Check();

	}

}

XTChecker.Capcha.SetStage = function(text)
{
	var cpt = XTChecker.Capcha;
	cpt._stage = text;
	XToolChecker.DebugMsg(cpt._stage);
	XToolChecker.updateStage(0, 0, false, false);
}

XTChecker.Capcha.Check = function ()
{
	XToolChecker.DebugMsg("Check");
	var cpt = XTChecker.Capcha;
	if (cpt._checkUrl != "")
	{
	 
		if (cpt._mode == cpt._modes.GoogleW)
			cpt.SetStage("Открытие страницы/обход капчи...");
		else
			cpt.SetStage("Загрузка картинки капчи...");
		if ((cpt._mode == cpt._modes.GoogleW) || (cpt._mode == cpt._modes.Google))
		{
			XToolChecker.OpenUrlInBrowser(cpt._checkUrl, false);
			return;
		}	
		
		var req = new XMLHttpRequest();  
		var actionStr = cpt._checkUrl;
		
		req.open('GET', actionStr, true);  
		req.onreadystatechange = cpt.CheckResult;
		req.send(null);  

	}
}


XTChecker.Capcha.CheckResult = function (aEvt)
{
	if(this.readyState == 4) 
	{
		var cpt = XTChecker.Capcha;
		if (( this.status == 200) || ( this.status == 503))
		{			
			XToolChecker.DebugMsg(this.responseText);
			cpt._imgSrc = "";
			var actionStr = this.responseURL;
			switch (cpt._mode)
			{
			  case cpt._modes.GoogleW:
				cpt.ProcessResultGW(this.responseText);
				if (cpt._text != "")
				{
					cpt._recognizing = false;
					cpt._error = false;
					return;
				}
				break
			  case cpt._modes.Google:
				cpt.ProcessResultG(this.responseText);
				break
			  case cpt._modes.YandexW:
				cpt.ProcessResultYndW(this.responseText);
				break
			  case cpt._modes.Yandex:
				cpt.ProcessResultYnd(this.responseText, actionStr);
				break
			  case cpt._modes.Bing:
				cpt.ProcessResultB(this.responseText, actionStr);
				break
			  default:
				cpt.ProcessResultY(this.responseText);
			}
			
			
				
			if (cpt._imgSrc != "")
			{
				if (cpt._imgSrc == "#")
				{
					cpt._imgSrc = "";
					return;
				}
				cpt.Recognize();
			}
			else
			{
				if (cpt._mode == cpt._modes.YandexW)
				{
					cpt.SetStage("Не найдена картинка капчи");
					cpt._resultCode = -1;
					cpt._text = "Не найдена картинка капчи";
					cpt._textResult = "Не найдена картинка капчи";
					cpt._recognizing = false;						
					cpt._error = true;
				}
				else
				{
					cpt._textResult = "Не найдена картинка, или ввод капчи не требуется";
					cpt._recognizing = false;						
					cpt._error = false;
				}
			}
		}
		else
		{	
			cpt.SetStage("Ошибка: Статус ответа " + this.status + ".");
			cpt._recognizing = false;
			cpt._textResult = cpt._stage;
			cpt._error = true;
		}
	}
}

XTChecker.Capcha.GetRegCombo = function(text, start, a ,b, c)
{
	var res = 0;
	res = text.match(new RegExp(start + a + b + c));
	if (res)
		return res;
	res = text.match(new RegExp(start + a + c + b));
	if (res)
		return res;
	res = text.match(new RegExp(start + c + a + b));
	if (res)
		return res;
	res = text.match(new RegExp(start + c + b + a));
	if (res)
		return res;
	res = text.match(new RegExp(start + b + a + c));
	if (res)
		return res;
	res = text.match(new RegExp(start + b + c + a));
	return res;
	
}


XTChecker.Capcha.ProcessResultY = function(text)
{
	var cpt = XTChecker.Capcha;
	if (XToolChecker.HasCapcha(text))
	{
			var start = "<input";
			var a = "[^\>]+name=\"key\"";
			var b = "[^\>]+value=\"([^\'\"\>]*)\"";
			var c = "[^\>]+type=\"hidden\"";
		
			var res = cpt.GetRegCombo(text, start, a ,b, c);
			
			if ((res) && (res.length > 1))
			{
				cpt._key = res[1];
			}
			else
			{
				XToolChecker.DebugMsg(text);
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}
		
			var res1 = text.match(/<img[^\>]+src=\"(https{0,1}\:\/\/yandex\.[a-z]{2,3}\/captchaimg\?[^\'\"\>]*)\"/i);
			if ((res1) && (res1.length > 1))
			{
				cpt._imgSrc = res1[1];
			}
			else
			{

				// нет картинки ищем чекбокс:
				XToolChecker.DebugMsg("Clicking checkbox");
				if (cpt.FindAndClickCheckbox(text, cpt))
				{
					cpt._imgSrc = "#";
					return;
				}
				XToolChecker.DebugMsg(text);
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}

		if (cpt._imgSrc != "")
		{
			//cpt.SetStage("Введите текст с картинки.");

		}
		else
			cpt.SetStage("Невозможно получить путь к картинке");
	}
	else
	{
		//CloseDlg();
		//cpt.SetStage("Capcha не найдена на странице.";
	}
}


XTChecker.Capcha.FindAndClickCheckbox = function (text, cpt)
{
	if (text.match(/\<input[^\>]+type=\"submit\"[^\>]+class=\"CheckboxCaptcha-Button\"[^\>]*\>/i))
	{
		//<input name="d" value="RCEs7R0KjWBYx9BhQDzh6NfvOPe+wpa3HZeXnvsQeb0=" hidden="">
		//<input name="k" value="1_1615917991_9207440900108531014_db9758a6fedce356128e9ea6ca205733" hidden=""></form>
	/*	var d = text.match(/\<input[^\>]+name=\"d\"[^\>]+value=\"([^\'\"\>]*)\"[^\>]*>/i);
		var k = text.match(/\<input[^\>]+name=\"d\"[^\>]+value=\"([^\'\"\>]*)\"[^\>]*>/i);*/
		var d = text.match(/\<input[^\>]+name=\"aesKey\"[^\>]+value=\"([^\'\"\>]*)\"[^\>]*>/i);
		var k = text.match(/\<input[^\>]+name=\"signKey\"[^\>]+value=\"([^\'\"\>]*)\"[^\>]*>/i);
		if (d && k && d.length > 1 && k.length > 1)
		{
			var actionStr = cpt._formAction/*"http://yandex.ru/checkcaptcha?"*/ /*+ "?"*/ +
			//	"key=" + cpt._key +
				"&rdata="+
				"&aesKey=" + encodeURIComponent(d[1]) +
				"&signKey=" + encodeURIComponent(k[1]);
			XToolChecker.DebugMsg(actionStr);
			var req = new XMLHttpRequest();  
			req.open('GET', actionStr, true);  
			req.onreadystatechange = cpt.CheckResult;
			req.send(null);
	
			return true;
		}
	}
	return false;
}

XTChecker.Capcha.ProcessResultGW = function (text, imgSrc)
{

XToolChecker.DebugMsg(text);
	try{
	var cpt = XTChecker.Capcha;
	if ((imgSrc !== undefined ) && (text  !== undefined))
	{
		cpt._imgSrc = imgSrc;
		cpt._textResult = text;
		XTChecker.Capcha.Recognize();
		/*cpt._error = true;
		cpt._text = "Автоматическое добавление невозможно: требуется ручной выбор картинок";
		cpt.SetStage(cpt._text);
		cpt._resultCode = -3;
		cpt._recognizing = false;
		return;*/
	}
	if (text == '-')
	{
		cpt._attempt++;
		if  ((cpt._attempt > 2) && (cpt._type == "antigate"))
		{
			cpt._stopAll = true;
			cpt._error = true;
			console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
			//XToolChecker.ShowMessage("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
			cpt._recognizing = false;
			return;
		}
		if  ((cpt._attempt > 2) && (cpt._type == "xtool"))
		{
			cpt._stopAll = true;
			cpt._error = true;
			//XToolChecker.ShowMessage("3 неправильных попытки распознавания на xtool.ru. Проверка будет остановлена. ");
			console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
			cpt._recognizing = false;
			return;
		}
		cpt.Check();
		/*//Неправильно введена капчпа
		cpt._text= "Неправильно введена капчпа";
		cpt.SetStage(cpt._text);
		cpt._resultCode = -1;
		cpt._recognizing = false;						
		cpt._error = true;
		return;*/
	}
	var res = text.match(/\<form [^>]*id=\"gaia_loginform\"[^>]*\>/ig);
	if ((res) && (res.length > 0))
	{
		cpt._text = "Необходимо войти в учетную запись google";
		cpt.SetStage(cpt._text);
		cpt._resultCode = -3;
		cpt._recognizing = false;						
		cpt._error = true;
	
		return;
	}
	var res = text.match(/\<span [^>]*class=\"status-message-text\"\>[^<]*Ваш запрос получен и вскоре будет обработан/ig);
	if (!((res) && (res.length > 0)))
		res = text.match(/\<span [^>]*class=\"status-message-text\"\>[^<]*Ваш запит отримано. Незабаром його буде оброблено/ig);
	if ((res) && (res.length > 0))
	{
		// успешно !!!!
		cpt._text = "Ваш запрос получен и вскоре будет обработан";
		cpt.SetStage(cpt._text);
		cpt._resultCode = 1;
		cpt._recognizing = false;						
		cpt._error = false;
		return;
	}
	
	var res = text.match(/\<div class=\"errormsg\"\>/ig);
	if ((res) && (res.length > 0))
	{
		// ошибка.
		var res1 = text.match(/\<div class=\"errormsg\"\>([^\<\>]*)\<\/div\>/i);
		if ((res1) && (res1.length > 1))
		{
			cpt._text = res1[1];
			cpt.SetStage(cpt._text);
			cpt._recognizing = false;						
			cpt._error = true;
			return;
		}
		
	}
	var frs = text.match(/\<iframe/i);
	if ((frs) && (frs.length > 0))
	{
		XToolChecker.ApplyCodeGW(cpt._buttonUrl, "");
	}
	else
	{
	
		var res = text.match(/\<form [^>]*name=\"unverified-add-url\"[^>]*\>/ig);
		if ((res) && (res.length > 0))
		{
				/*var res =text.match(/<input name=\"recaptcha_challenge_field\" [^>]*value=\"([^\"\']*)\"[^>]*>/ig);
				if ((res) && (res.length > 1))
				{
					cpt._key = res[1];
				}
				else
				{
					XToolChecker.DebugMsg(text);
					XToolChecker.DebugMsg("id");
					cpt.SetStage("Ошибка загрузки картинки.");
					return;
				}*/
				
				var res1 = text.match(/<img[^\>]+src=\"(https\:\/\/www\.google\.com\/recaptcha\/api\/image\?[^\'\"\>]*)\"[^\>]*>/i);
				if ((res1) && (res1.length > 1))
				{
					cpt._imgSrc = res1[1];
				}
				else
				{
					
					XToolChecker.DebugMsg(text);
					XToolChecker.DebugMsg("img");
					cpt._resultCode = -1;
					cpt.SetStage("Ошибка загрузки картинки.");
					return;
				}
				if (cpt._imgSrc != "")
				{
					cpt.Recognize();
				}
				else
				{
					cpt.SetStage("Не найдена картинка капчи");
					cpt._resultCode = -1;
					cpt._text = "Не найдена картинка капчи";
					cpt._textResult = "Не найдена картинка капчи";
					cpt._recognizing = false;						
					cpt._error = true;
				
				}
		}
	}
	}
	catch(e) 
	{
		XToolChecker.DebugMsg(e);
		cpt.SetStage(e);
	}
}

XTChecker.Capcha.ProcessResultYndW = function(text)
{
	try{
	var cpt = XTChecker.Capcha;
	var res = text.match(/<input [^>]*value=\"\" [^>]*name=\"url\"[^>]*>/ig);
	if ((res) && (res.length > 0))
	{
			var start = "<input";
			var a = "[^\>]+name=\"key\"";
			var b = "[^\>]+value=\"([^\'\"\>]*)\"";
			var c = "[^\>]+type=\"hidden\"";
		
			var res = XTChecker.Capcha.GetRegCombo(text, start, a ,b, c);
		
			if ((res) && (res.length > 1))
			{
				cpt._key = res[1];
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg("id");
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}
			var res1 = text.match(/<img[^\>]+src=\"([^\"]+.captcha.yandex.net\/[^\'\"\>]*)\"/i);
			if ((res1) && (res1.length > 1))
			{
				if (res1[1].indexOf ('http:') !=0)
					cpt._imgSrc = 'http:' + res1[1];
				else
					cpt._imgSrc = res1[1];
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg("img");
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}
			start = "<input";
			a = "[^\>]+name=\"sk\"";
			b = "[^\>]+value=\"([^\'\"\>]*)\"";
			c = "[^\>]+type=\"hidden\"";
		
			var res2 = XTChecker.Capcha.GetRegCombo(text, start, a ,b, c);
			if ((res2) && (res2.length > 1))
			{
				cpt._key2 = res2[1];
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg("sk");
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}
	}
	}
	catch(e) 
	{
		XToolChecker.DebugMsg(e);
		cpt.SetStage(e);
	}
}

XTChecker.Capcha.ProcessResultYnd = function(text, action)
{
	var cpt = XTChecker.Capcha;
	var res0 = action.match(/(https{0,1}:\/\/yandex.[a-z]{2,3})\//i);
	
	
	XToolChecker.DebugMsg(domain);
	var res = text.match(/<form [^\<\>]*action=\"(https{0,1}:\/\/yandex.[a-z]{2,3}\/checkcaptcha)/i);
	//var res1 = text.match(/<form [^\<\>]*action=\"(\/checkcaptcha)/i);
	var res1 = text.match(/<form [^\<\>]*action=\"(\/checkcaptcha[^"]*)/i);
	if (((res) && (res.length > 1)) || ((res1) && (res1.length > 1)))
	{
		var domain = "http://yandex.ru";
		if ((res1) && (res1.length > 1))
			cpt._formAction = domain + res1[1];
		else if ((res) && (res.length > 0))
			cpt._formAction = res[1];
		
		var start = "<input";
		var a = "[^\>]+name=\"key\"";
		var b = "[^\>]+value=\"([^\'\"\>]*)\"";
		var c = "[^\>]+type=\"hidden\"";
	
		if (cpt._formAction.indexOf('key=') == -1)
		{
			var res = cpt.GetRegCombo(text, start, a ,b, c);
			//var res = text.match(/<input[\s]+name=\"key\"[\s]+type=\"hidden\"[\s]+value=\"([^\'\"\>]*)\"/i);
			if ((res) && (res.length > 1))
			{
				cpt._key = res[1];
			}
			else
			{
				XToolChecker.DebugMsg(res);
				XToolChecker.DebugMsg("key");
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}
		}
		
		var res3 = text.match(/<img[^\>]+src=\"(https{0,1}\:\/\/yandex.[a-z]{2,3}\/captchaimg?[^\'\"\>]*)\"/i);
		if ((res3) && (res3.length > 1))
		{
			cpt._imgSrc = res3[1];
		}
		else
		{
			// нет картинки ищем чекбокс:
			XToolChecker.DebugMsg("Clicking checkbox");
			if (cpt.FindAndClickCheckbox(text, cpt))
			{
				cpt._imgSrc = "#";
				return;
			}
			XToolChecker.DebugMsg(text);
			XToolChecker.DebugMsg("img");
			cpt.SetStage("Ошибка загрузки картинки.");
			return;
		}
		
		if (cpt._formAction.indexOf('retpath=') == -1)
		{
			var start1 = "<input";
			var a1 = "[^\>]+name=\"retpath\"";
			var b1 = "[^\>]+value=\"([^\'\"\>]*)\"";
			var c1 = "[^\>]+type=\"hidden\"";
			var res2 = cpt.GetRegCombo(text, start1, a1 ,b1, c1);
		/*	var res2 = text.match(/<input[\s]+type=\"hidden\"[\s]+name=\"retpath\"[\s]+value=\"([^\'\"\>]*)\"/i);*/
			if ((res2) && (res2.length > 1))
			{
				cpt._retPath = res2[1].replace(/\&amp\;/ig, "\&");
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg("retpath");
				cpt.SetStage("Ошибка загрузки картинки.");
				
				return;
			}
		}
		if (cpt._imgSrc != "")
		{
			cpt.SetStage("Ввод текста с картинки.");

		}
		else
			cpt.SetStage("Невозможно получить путь к картинке");
	}
	else
	{
		cpt.SetStage("Capcha не найдена на странице.");
	}

	XToolChecker.DebugMsg("img: " + cpt._imgSrc);
	if (cpt._imgSrc != "")
		domain = cpt.GetDomainFromUrl(cpt._imgSrc);
	else if ((res0) && (res0.length > 1))
		domain = res0[1];
	
	XToolChecker.DebugMsg(cpt._formAction);
}


XTChecker.Capcha.ProcessResultG = function(url, text)
{
	var cpt = XTChecker.Capcha;
	cpt._imgSrc = "";
	var res_rc1 = text.match(/<div [^>]*id=\"recaptcha\" [^>]*class=\"g-recaptcha\" [^>]*data-sitekey=\"([^\'\"\>]*)\"/i);
	if ((res_rc1) && (res_rc1.length > 1))
	{
		console.log(res_rc1[1]);
		cpt._key=res_rc1[1];
		XToolChecker.DebugMsg("Остановка пользователем");
		cpt.SetStage("Остановка пользователем");
		cpt._error = false;
		cpt._recognizing = false;
		cpt._result = "";
		return;
	}
	var res = text.match(/<form [^\<\>]*action=\"Captcha/ig);
	var res_i = text.match(/<form [^\<\>]*action=\"index/ig);
	var res1 = text.match(/<form [^\<\>]*action=\"http:\/\/yandex.[a-z]{2,3}\/checkcaptcha\"/ig);
	if (((res) && (res.length > 0)) ||((res1) && (res1.length > 0)) ||((res_i) && (res_i.length > 0)))
	{

			cpt._attempt++;
			if  ((cpt._attempt > 2) && (cpt._type == "antigate"))
			{
				cpt._stopAll = true;
				cpt._error = true;
				//XToolChecker.ShowMessage("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
				console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
				cpt._recognizing = false;
				return;
			}
			if  ((cpt._attempt > 2) && (cpt._type == "xtool"))
			{
				cpt._stopAll = true;
				cpt._error = true;
				//XToolChecker.ShowMessage("3 неправильных попытки распознавания на xtool.ru. Проверка будет остановлена. ");
				console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
				cpt._recognizing = false;
				return;
			}
			
		
			var start = "<input";
			var a = "[^\>]+name=\"q\"";
			var b = "[^\>]+value=\"([^\'\"\>]*)\"";
			var c = "[^\>]+type=\"hidden\"";
		
			var res = cpt.GetRegCombo(text, start, a ,b, c);
			//var res = text.match(/<input[\s]+type=\"hidden\"[\s]+name=\"id\"[\s]+value=\"([^\'\"\>]*)\"/i);
			if ((res) && (res.length > 1))
			{
				cpt._key = res[1];
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg(res);
				XToolChecker.DebugMsg("id");
				cpt.SetStage("Ошибка загрузки картинки.");
				cpt._recognizing = false;						
				cpt._error = true;
				return;
			}
			var res1 = text.match(/<img[^\>]+src=\"(\/sorry\/image\?[^\'\"\>]*)\"/i);
			if ((res1) && (res1.length > 1))
			{
				var domain = cpt.GetDomainFromUrl(url);
				cpt._imgSrc = domain + res1[1].replace(/\&amp\;/ig, "\&");;
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg("img");
				cpt.SetStage("Ошибка загрузки картинки.");
				cpt._recognizing = false;						
				cpt._error = true;
				return;
			}
			//--------------------------------------------
			
			//---------------------------------------------
			var res = text.match(/\<form [^>]*name=\"unverified-add-url\"[^>]*\>/ig);
		if ((res) && (res.length > 0))
		{
				
				//<div id="recaptcha" class="g-recaptcha" data-sitekey="6LfwuyUTAAAAAOAmoS0fdqijC2PbbdH4kjq62Y1b">
				var res_rc = text.match(/<div [^>]*id=\"recaptcha\" [^>]*class=\"g-recaptcha\"/i);
				if ((res_rc) && (res_rc.length > 1))
				{
					cpt._imgSrc = res1[1];
				}
				else
				{
					
					XToolChecker.DebugMsg(text);
					XToolChecker.DebugMsg("img");
					cpt._resultCode = -1;
					cpt.SetStage("Ошибка загрузки картинки.");
					return;
				}
				if (cpt._imgSrc != "")
				{
					cpt.Recognize();
				}
				else
				{
					cpt.SetStage("Не найдена картинка капчи");
					cpt._resultCode = -1;
					cpt._text = "Не найдена картинка капчи";
					cpt._textResult = "Не найдена картинка капчи";
					cpt._recognizing = false;						
					cpt._error = true;
				
				}
		}
			
			
			//-----------------------------------------------
		XToolChecker.DebugMsg("imgSrc=  "+cpt._imgSrc);
			if (cpt._imgSrc != "")
			{
				cpt.SetStage("Ввод текста с картинки.");
				cpt.Recognize();
			}
			else
			{
				cpt.SetStage("Не найдена картинка капчи");
				cpt._resultCode = -1;
				cpt._text = "Не найдена картинка капчи";
				cpt._textResult = "Не найдена картинка капчи";
				cpt._recognizing = false;						
				cpt._error = true;
			
			}
	}
	else
	{
		/*cpt.SetStage("Capcha не найдена на странице.");
		cpt._recognizing = false;						
		cpt._error = true;*/
		
		XToolChecker.DebugMsg("Код принят.");
		cpt.SetStage("Код принят.");
		cpt._answer = this.responseText;
		XToolChecker.DebugMsg(cpt._answer);
		cpt._answer = "";
		cpt._error = false;
		var timeout = XToolChecker._timeout_g_max + 500;
		if (timeout < 1000)
			timeout = 1000;
		setTimeout(
			function() 
			{ 
				XTChecker.Capcha._recognizing = false;
				XTChecker.Capcha.ClearAll();
			}, timeout
		);
	
	}
}

XTChecker.Capcha.ProcessResultB = function(text)
{
	var cpt = XTChecker.Capcha;
	if (XToolChecker.HasCapchaB(text))
	{
/*			<input type="hidden" value="399B550D9E5B9F5956ACEF766873A4F7EFB7230059E07A8049FFC3415EE8D9A69B166B887F971BB75C0277938E7FF890" name="encanswer"></input>
			<input type="hidden" value="%2fchallenge%3fquery%3d%252fsearch%253fq%253dsite%25253Asape.ru" name="query"></input>
			<input type="hidden" value="feeaa03bed1642e9aa7173c584f75d66" name="IG"></input>*/
			{
				var res = text.match(/<input[\s]+type=\"hidden\"[\s]+value=\"([^\'\"\>]*)[\s]+name=\"encanswer\"\"/i);
				if ((res) && (res.length > 1))
				{
					cpt._encanswer = res[1];
				}
				else
				{
					XToolChecker.DebugMsg(res);
					XToolChecker.DebugMsg("encanswer");
					cpt.SetStage("Ошибка загрузки картинки.");
					return;
				}
			}
			{
				var res = text.match(/<input[\s]+type=\"hidden\"[\s]+value=\"([^\'\"\>]*)[\s]+name=\"IG\"\"/i);
				if ((res) && (res.length > 1))
				{
					cpt._query = res[1];
				}
				else
				{
					XToolChecker.DebugMsg(res);
					XToolChecker.DebugMsg("query");
					cpt.SetStage("Ошибка загрузки картинки.");
					return;
				}
			}
			{
				var res = text.match(/<input[\s]+type=\"hidden\"[\s]+value=\"([^\'\"\>]*)[\s]+name=\"query\"\"/i);
				if ((res) && (res.length > 1))
				{
					cpt._ig = res[1];
				}
				else
				{
					XToolChecker.DebugMsg(res);
					XToolChecker.DebugMsg("ig");
					cpt.SetStage("Ошибка загрузки картинки.");
					return;
				}
			}
			var res1 = text.match(/<img[^\>]+src=\"(\/challengepic?encanswer\=[^\'\"\>]*)\"/i);
			if ((res1) && (res1.length > 1))
			{
				cpt._imgSrc = "http://www.bing.com" + res1[1];
			}
			else
			{
				XToolChecker.DebugMsg(text);
				XToolChecker.DebugMsg("img");
				cpt.SetStage("Ошибка загрузки картинки.");
				return;
			}

		if (cpt._imgSrc != "")
		{
			cpt.SetStage("Ввод текста с картинки.");

		}
		else
			cpt.SetStage("Невозможно получить путь к картинке");
	}
	else
	{
		cpt.SetStage("Capcha не найдена на странице.");
	}
}

XTChecker.Capcha.Recognize = function ()
{
	var cpt = XTChecker.Capcha;
	cpt._result = "";
	cpt.SetStage("Распознавание.");
	if (cpt._type == "antigate")//(cpt._apikey != "")
	{
		cpt.RecognizeAntigate(cpt._imgSrc);
	}
	else if (cpt._type == "xtool")
	{
		cpt.RecognizeXTool(cpt._imgSrc);
	}
	else
	{
		//_imgSrc
		cpt._refreshImage = false;
		cpt._stopAll = false;
		if (XToolChecker._capcha_sound)
			XToolChecker.playSound();
			console.log(cpt._threadIndex);
			console.log(XToolCheckerThreads._threads);
		XTBrowserTools.ShowCapchaDialog(XToolCheckerThreads._threads[cpt._threadIndex]._doc, XToolCheckerThreads._threads[cpt._threadIndex]._tabID, cpt);
	/*	window.openDialog("chrome://xtool_checker/content/capcha.xul", "CapchaDlg", "dialog, chrome, modal, centerscreen", 
			cpt,
			cpt._imgSrc
			);
		if (cpt._stopAll)
		{
			XToolChecker.DebugMsg("Остановка пользователем");
			cpt.SetStage("Остановка пользователем");
			cpt._error = false;
			cpt._recognizing = false;
			cpt._result = "";
			return;
		}
		else if (cpt._refreshImage)
		{
			cpt.SetStage("Обновление картинки");
			cpt.Check();
			return;
		}
		else if (cpt._result == "")
		{
			cpt.SetStage("Обновление картинки");
			cpt.Check();
			return;
		}*/
	}
	/*
	if (cpt._result != "")
	{
		cpt.SetStage("Отправка результата распознавания.");
		cpt.SendCapcha();
	}
	*/


}

XTChecker.Capcha.DialogResult = function (res)
{

	var cpt = XTChecker.Capcha;
	cpt._stopAll = res._stopAll;
	cpt._error = res._error;
	cpt._recognizing = res._recognizing;
	cpt._result = res._result;

	if (cpt._stopAll)
	{
		XToolChecker.DebugMsg("Остановка пользователем");
		cpt.SetStage("Остановка пользователем");
		cpt._error = false;
		cpt._recognizing = false;
		cpt._result = "";
		return;
	}
	else if (cpt._refreshImage)
	{
		cpt.SetStage("Обновление картинки");
		cpt.Check();
		return;
	}
	else if (cpt._result == "")
	{
		cpt.SetStage("Обновление картинки");
		cpt.Check();
		return;
	}


	if (cpt._result != "")
	{
		cpt.SetStage("Отправка результата распознавания.");
		cpt.SendCapcha();
	}
}


XTChecker.Capcha.SendCapcha = function (imageUrl)
{
	var cpt = XTChecker.Capcha;
	var capcha_code = cpt._result;

	//SetStage("Отправка данных...", "", true);
	switch (cpt._mode)
	{
	  case cpt._modes.GoogleW:
		XToolChecker.ApplyCodeGW(cpt._buttonUrl, capcha_code);
		break;
	  case cpt._modes.Google:
		{
			/*var actionStr = "https://ipv4.google.com/sorry/CaptchaRedirect?" +	
			"continue=" + encodeURIComponent(cpt._checkUrl) +
			"&id=" + cpt._key +
			"&captcha=" + capcha_code + 
			"&submit=" + encodeURIComponent("Отправить");
			XToolChecker.DebugMsg(actionStr);
			var req = new XMLHttpRequest();  
			
			req.open('GET', actionStr, true);  
			req.channel.QueryInterface(Components.interfaces.nsIHttpChannel).redirectionLimit = 10;
			req.onreadystatechange = cpt.CapchaResponse;
			req.send(null);*/
			cpt._imgSrc = '';
			XToolChecker.ApplyCodeG(capcha_code); 
		}
		break;
	  case cpt._modes.YandexW:
		{
			var req = new XMLHttpRequest();  
			
			var params = "url=" + encodeURIComponent(cpt._buttonUrl) +
			"&rep=" + capcha_code +
			"&key=" + encodeURIComponent(cpt._key) +		
			"&do=add" +
			"&sk=" + encodeURIComponent(cpt._key2);
			req.open("GET", cpt._checkUrl+"?"+params, true);
			req.onreadystatechange = cpt.CapchaResponse;
			XToolChecker.DebugMsg(cpt._checkUrl+"?"+params);
			req.send(null);//req.send(params)
		}	
		break;
	  case cpt._modes.Yandex:
		{
			if (cpt._formAction == "") cpt._formAction = "http://yandex.ru/checkcaptcha"
			if (cpt._formAction.indexOf('key=')!=-1)
			{
				var actionStr = cpt._formAction+ "&" +
				"rep=" + capcha_code ;
				XToolChecker.DebugMsg(actionStr);
				var req = new XMLHttpRequest();  
				req.open('GET', actionStr, true);  
				req.onreadystatechange = cpt.CapchaResponse;
				req.send(null);

			}
			else {
				var actionStr = cpt._formAction/*"http://yandex.ru/checkcaptcha?"*/ + "?" +
				"rep=" + capcha_code +
				"&key=" + encodeURIComponent(cpt._key) +
				"&retpath=" + encodeURIComponent(cpt._retPath);
				XToolChecker.DebugMsg(actionStr);
				var req = new XMLHttpRequest();  
				req.open('GET', actionStr, true);  
				req.onreadystatechange = cpt.CapchaResponse;
				req.send(null);
			}
		}
		break;
	  case cpt._modes.Bing:
		{
			if (cpt._formAction == "") cpt._formAction = "http://bing.com/challenge"
			var actionStr = cpt._formAction + "?" +
			"encanswer=" + cpt._encanswer +
			"&query=" + encodeURIComponent(cpt._query) +
			"&IG=" + encodeURIComponent(cpt._ig) + 
			"&useranswer=" + capcha_code;
			XToolChecker.DebugMsg(actionStr);
			var req = new XMLHttpRequest();  
			req.open('GET', actionStr, true);  
			req.onreadystatechange = cpt.CapchaResponse;
			req.send(null);
		}
		break;
	  default:
	
		{
		/*	var actionStr = "http://search.tut.by/?" +	 
			"captcha_code=" + capcha_code +
			"&key=" + encodeURIComponent(cpt._key) +
			"&captcha=1";
			XToolChecker.DebugMsg(actionStr);
			var req = new XMLHttpRequest();  
			req.open('GET', actionStr, true);  
			req.onreadystatechange = cpt.CapchaResponse;
			req.send(null);*/
		}
		
	}
}

XTChecker.Capcha.CapchaResponse = function()
{
	try
	{
	var cpt = XTChecker.Capcha;
	if(this.readyState == 4) 
	{
		if (( this.status == 200) ||( this.status == 503))
		{
		 	var text = this.responseText;
			XToolChecker.DebugMsg(text);
			if  ((cpt._mode == cpt._modes.Google) || (cpt._mode == cpt._modes.GoogleW))
			{
				var res = text.match(/<form [^\<\>]*action=\"Captcha/ig);
				var res_i = text.match(/<form [^\<\>]*action=\"index/ig);
				var res1 = text.match(/<form [^\<\>]*action=\"http:\/\/yandex.[a-z]{2,3}\/checkcaptcha\"/ig);
				if (((res) && (res.length > 0)) || ((res_i) && (res_i.length > 0))  ||((res1) && (res1.length > 0)))
				{
					cpt._attempt++;
					if  ((cpt._attempt > 2) && (cpt._type == "antigate"))
					{
						cpt._stopAll = true;
						cpt._error = true;
						console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
						//XToolChecker.ShowMessage("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
						cpt._recognizing = false;
						return;
					}
					if  ((cpt._attempt > 2) && (cpt._type == "xtool"))
					{
						cpt._stopAll = true;
						cpt._error = true;
						console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
						//XToolChecker.ShowMessage("3 неправильных попытки распознавания на xtool.ru. Проверка будет остановлена. ");
						cpt._recognizing = false;
						return;
					}
					cpt.Check();
				}
				else
				{
					/*var res = text.match(/\<meta[\s]+http\-equiv\=\"refresh\"[\s]+content\=\"1\;[\s]*url=([^\"]*)\"[^\>]*>/ig);
					if ((res) && (res.length > 1))
					{
						var redir = res[1];
						redir = redir.replace(/\&amp\;/ig, "\&");
						
						XToolChecker.DebugMsg("Код принят");
						cpt.SetStage("Код принят");
						
					
						XToolChecker.DebugMsg(redir);
						var req = new XMLHttpRequest();  
						
						req.open('GET', redir, true);  
						req.channel.QueryInterface(Components.interfaces.nsIHttpChannel).redirectionLimit = 10;
						req.onreadystatechange = cpt.CapchaResponse;
						req.send(null);
					}
					else*/
					{
						XToolChecker.DebugMsg("Код принят.");
						cpt.SetStage("Код принят.");
						cpt._answer = this.responseText;
						XToolChecker.DebugMsg(cpt._answer);
						cpt._answer = "";
						cpt._error = false;
						var timeout = XToolChecker._timeout_g_max + 500;
						if (timeout < 1000)
							timeout = 1000;
						setTimeout(
							function() 
							{ 
								XTChecker.Capcha._recognizing = false;
								XTChecker.Capcha.ClearAll();
							}, timeout
						);
					}
					
				}
			}
			else if (cpt._mode == cpt._modes.YandexW)
			{
				//XToolChecker.DebugMsg(this.responseText);
				var text = this.responseText;
				text = text.replace(/\r\n/img, "");
				text = text.replace(/\n/img, "");
				var res = text.match(/<div class=\"attention ([^\"\'\>]*)\">.*?<div[\s]+class=\"error-message b-static-text\">(.*?)<\/div>/i);
				if ((res) && (res.length > 1))
				{	
					var messageClass = res[1];
					XToolChecker.DebugMsg(messageClass);
					text = res[2];
					text = text.replace(/<[^>]*>/g, " ");
					
					XToolChecker.DebugMsg(text);
					if (messageClass.indexOf("attention_info") != -1)
					{	
						// успешно
						//XToolCheckerThreads.SetCurrentButton(cpt._threadIndex, "", text, "", "green");
						cpt._resultCode = 1;
						cpt._text = text;
						cpt.SetStage("Успешно.");
					}
					else if (messageClass.indexOf("attention_error") != -1)
					{
						if (text.indexOf("Вы неверно указали цифровой код") != -1)
						{
							cpt._attempt++;
							if  ((cpt._attempt > 2) && (cpt._type != "antigate"))
							{
								cpt._stopAll = true;
								cpt._error = true;
								console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
								//XToolChecker.ShowMessage("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
								cpt._recognizing = false;
								cpt._resultCode = -1;
								cpt._text = "Error";
								return;
							}
							if  ((cpt._attempt > 2) && (cpt._type != "xtool"))
							{
								cpt._stopAll = true;
								cpt._error = true;
								console.log("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
								//XToolChecker.ShowMessage("3 неправильных попытки распознавания на antigate.com. Проверка будет остановлена. ");
								cpt._recognizing = false;
								cpt._resultCode = -1;
								cpt._text = "Error";
								return;
							}
							cpt.Check();
							
						}
						else
						{
							//XToolCheckerThreads.SetCurrentButton(cpt._threadIndex, "", text, "", "green");
							cpt._resultCode = 0;
							cpt._text = text;
							cpt.SetStage("Выполнено с ошибкой.");
						}
					}
					else
					{
						//XToolCheckerThreads.SetCurrentButton(cpt._threadIndex, "ER", text, "", "green");
						cpt.SetStage("Ошибка.");
						cpt._resultCode = -1;
						cpt._text = text;
					}
					cpt._recognizing = false;
					
				}
			
				else
				{
					cpt._resultCode = -1;
					cpt._text = "Error";
					cpt._error = true;
					cpt._recognizing = false;
					cpt.ClearAll();
					
				}
				
			}
			else if (cpt._mode == cpt._modes.Yandex)
			{
				if (!XToolChecker.HasCapchaYnd(text))
				{
					XToolChecker.DebugMsg("Код принят.");
					cpt.SetStage("Код принят.");
					cpt._error = false;
					cpt._recognizing = false;
					cpt.ClearAll();
				}
				else
				{
					cpt.Check();
				}
			}
			else if (cpt._mode == cpt._modes.Bing)
			{
				if (!XToolChecker.HasCapchaB(text))
				{
					XToolChecker.DebugMsg("Код принят.");
					cpt.SetStage("Код принят.");
					cpt._error = false;
					cpt._recognizing = false;
					cpt.ClearAll();
				}
				else
				{
					cpt.Check();
				}
			}
			else
			{
				
				
				if (!XToolChecker.HasCapcha(text))
				{
					XToolChecker.DebugMsg("Код принят.");
					cpt.SetStage("Код принят.");
					cpt._error = false;
					cpt._recognizing = false;
					cpt.ClearAll();
				}
				else
				{
					cpt.Check();
				}
			}
						
		}
		else
		{	
			cpt.SetStage("Ошибка: Статус ответа " + this.status + ".");
			cpt._recognizing = false;
			cpt._textResult = cpt._stage;
			cpt._error = true;
		}	
	}
	}catch(e)
	{
		XToolChecker.DebugMsg("CapchaResponse: "+ e);
	}
}


XTChecker.Capcha.RecognizeAntigate = function (imageUrl)
{
	var cpt = XTChecker.Capcha;
	if (cpt._apikey == '')
	{
		cpt._error = false;
		cpt._recognizing = false;
		return false;
	}	
	if (!imageUrl)
	{
		
		XTChecker.Capcha.RecognizeAntigateRC();
	}
		
	XTChecker.Capcha.ReadImageDataCB(imageUrl, null, null, null, XTChecker.Capcha.RecognizeAntigateCB) ;
}

XTChecker.Capcha.RecognizeAntigateRC = function()
{
	
/*
	var tmpObj = {};
	tmpObj.clientKey = cpt._apikey
	{
		"clientKey": "dce6bcbb1a728ea8d563de6d169a2057",
		"task": {
			"type": "NoCaptchaTaskProxyless",
			"websiteURL": "http:\/\/mywebsite.com\/recaptcha\/test.php",
			"websiteKey": "6Lc_aCMTAAAAABx7u2N0D1XnVbI_v6ZdbM6rYf16"
		}
	}

	tmpObj.softId=307
task
	*/
    XToolChecker.DebugMsg("Соединение...");
	
	var req = new XMLHttpRequest();
	req.open("POST", "http://antigate.com/in.php", true);
	req.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);
	req.setRequestHeader("Host", "antigate.com");
	req.setRequestHeader("Content-Length", content.length);
	req.onreadystatechange = XTChecker.Capcha.ResponseAdd;
	

	cpt.SetStage("Отправка картинки на antigate.com");
    try 
	{
		req.sendAsBinary(content);
	} 
	catch(e) 
	{
		cpt.SetStage(e);
		cpt._recognizing = false;
	}
	return true;



}


XTChecker.Capcha.b64EncodeUnicode = function (str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

XTChecker.Capcha.RecognizeAntigateCB = function (doc, tabId, info, b64)
{
	var cpt = XTChecker.Capcha;
	if (b64 == "")
	{
		XToolChecker.DebugMsg("Не могу загрузить содержимое картинки-капчи");
		cpt.SetStage("Невозможно загрузить содержимое картинки-капчи");
		cpt._error = true;
		cpt._recognizing = false;
		return false;
	}
	var conttype = "image/gif";
	var ext ="";// imageUrl.substring(imageUrl.lastIndexOf("."),imageUrl.length - 1).toLowerCase();
	if ((cpt._mode == cpt._modes.Google) || (cpt._mode == cpt._modes.GoogleW))
	{
		ext = "jpg";
		conttype="image/pjpeg";
	}
	else if  ((cpt._mode == cpt._modes.Yandex) || (cpt._mode == cpt._modes.YandexW))
	{
		ext = "jpg";
		conttype="image/jpeg";
	}
	else
	{
		ext = "gif"; 
		conttype="image/gif";
	}
	b64 = b64.replace("data:"+conttype+";base64,", "");

	
	var boundary="---------qxJ1LEQFHQAM29qb1jBD";
    var content = "--" + boundary + "\r\n";
    content += "Content-Disposition: form-data; name=\"method\"\r\n";
    content += "\r\n";
    content += "post\r\n";
	content += "--" + boundary + "\r\n";
    content += "Content-Disposition: form-data; name=\"soft_id\"\r\n";
    content += "\r\n";
    content += "307\r\n";
    content += "--" + boundary + "\r\n";
    content += "Content-Disposition: form-data; name=\"key\"\r\n";
    content += "\r\n";
    content += cpt._apikey + "\r\n"; 
	content += "--" + boundary + "\r\n";
	content += "Content-Disposition: form-data; name=\"is_russian\"\r\n";
	content += "\r\n";
	if ((cpt._mode == cpt._modes.YandexW) || (cpt._mode == cpt._modes.Yandex))
		content += "1\r\n";
	else
		content += "0\r\n";	
    content += "--" + boundary + "\r\n";
    content += "Content-Disposition: form-data; name=\"file\"; filename=\"capcha." + ext + "\"\r\n";
    content += "Content-Type: " + conttype + "\r\n";
	content += "\r\n";

	//XToolChecker.DebugMsg(b64);

    content += /*cpt.b64EncodeUnicode(b64)*/atob(b64) + "\r\n"; //тело файла
    content += "--" + boundary + "--";
     XToolChecker.DebugMsg(content);

	
    XToolChecker.DebugMsg("Соединение...");
	
	var req = new XMLHttpRequest();
	req.open("POST", "http://antigate.com/in.php", true);
	req.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary);
	req.setRequestHeader("Host", "antigate.com");
	req.setRequestHeader("Content-Length", content.length);
	req.onreadystatechange = XTChecker.Capcha.ResponseAdd;
	

	cpt.SetStage("Отправка картинки на antigate.com");
    try 
	{
		req.sendAsBinary(content);
	} 
	catch(e) 
	{
		cpt.SetStage(e);
		cpt._recognizing = false;
	}
	return true;

}

XTChecker.Capcha.RecognizeXTool = function (imageUrl)
{
	var cpt = XTChecker.Capcha;
	XTChecker.Capcha.ReadImageDataCB(imageUrl, null, null, null, XTChecker.Capcha.RecognizeXToolCB) ;
}


XTChecker.Capcha.RecognizeXToolCB = function (doc, tabId, info, b64) {
	var cpt = XTChecker.Capcha;
	if (b64 == "")
	{
		XToolChecker.DebugMsg("Не могу загрузить содержимое картинки-капчи");
		cpt.SetStage("Невозможно загрузить содержимое картинки-капчи");
		cpt._error = true;
		cpt._recognizing = false;
		return false;
	}

	var sts = XTSettings;
	console.log("sts: "+sts);
	XToolChecker.DebugMsg(content);
    XToolChecker.DebugMsg("Соединение...");
	var req = new XMLHttpRequest();
	req.open('PUT', XToolCheckerConst._xtoolAPI, true); 
	var tmpObj = {};
	tmpObj.type='captcha-set';
	tmpObj.referrer=1;
	tmpObj.login=sts._loginValue;
	console.log("login: "+tmpObj.login);
	tmpObj.pass=sts._passwordValue;
	console.log("pass: "+tmpObj.pass);
	console.log(b64);
	b64 = b64.replace("data:image/gif;base64,","");
	tmpObj.captcha_data=b64;
	console.log(tmpObj.captcha_data);
	if ((cpt._mode == cpt._modes.YandexW) || (cpt._mode == cpt._modes.Yandex))
		tmpObj.language = 1;
	else if ((cpt._mode == cpt._modes.GoogleW) || (cpt._mode == cpt._modes.Google))
		tmpObj.language = 2;
	else 
		tmpObj.language = 0;
	
	var params = JSON.stringify(tmpObj);
	XToolChecker.DebugMsg("params: " + params);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);


	
	req.onreadystatechange = XTChecker.Capcha.ResponseAddXTool;
	

	cpt.SetStage("Отправка картинки на xtool.ru");
    try 
	{
		req.send(params);
	} 
	catch(e) 
	{
		cpt.SetStage(e);
		cpt._recognizing = false;
	}
	return true;

}

XTChecker.Capcha.ResponseAddXTool = function() 
{
	var cpt = XTChecker.Capcha;
	if(this.readyState == 4) 
	{
		if (this.status == 200)
		{
			try {
			
			var response = this.responseText;
			XToolChecker.DebugMsg(response);
			response = response.replace(/\\\\\"/g, "####quote####");
			response = response.replace(/\\\"/g, "####quote####");
			var result = JSON.parse(response);
			XToolChecker.ProcessJSONObject(result);
			
			if (result.balance !== undefined )
			{
				XToolChecker.UpdateLoginInfo2(XToolChecker.login, result.balance);
			}
			
			if ((result.ErrorCode !== undefined) && (result.ErrorCode != 200))
			{
				XToolChecker.DebugMsg(result.Error);
	
				var text = JSON.parse('"' + result.Error + '"');
				XToolChecker.DebugMsg(text);
				cpt._recognizing = false;
				cpt._textResult = text;
				cpt._error = true;
				console.log("[XTool.ru] Ошибка: " + text);
				//XToolChecker.ShowMessage("[XTool.ru] Ошибка: " + text);
				cpt._recognizing = false;
				if (cpt._mode == cpt._modes.YandexW)
				{
					cpt._text = "[XTool.ru] Ошибка: " + text;
					cpt._resultCode  = -1;
				}
				return;
			}
			else
			{
	   			if (result.captcha_id !== undefined)
				{
					cpt._capchaID = result.captcha_id;
					setTimeout(function() { XTChecker.Capcha.RequestResultXTool(); }, 10000);
					return;
				}
				else
				{
					cpt._recognizing = false;
					cpt._textResult = text;
					cpt._error = true;
					console.log("[XTool.ru] Ошибка: " + text);
					//XToolChecker.ShowMessage("[XTool.ru] Ошибка: " + text);
					cpt._recognizing = false;
					return;
				}
			}
			}catch(e) 
			{
				cpt.SetStage(e);
				cpt._recognizing = false;
			}
		}
		else 
		{
			XToolChecker.MsgToConsole("Ответ сервера XTool.ru: " + this.status);		
			cpt.SetStage("Ответ сервера XTool.ru: " + this.status);
			cpt._error = true;
			cpt._recognizing = false;
			return;
		}
	}
}

XTChecker.Capcha.RequestResultXTool = function ()
{
	var cpt = XTChecker.Capcha;
	if (cpt._capchaID == '')
		return;
	var sts = XTSettings;
	var req = new XMLHttpRequest();
	req.open('PUT', XToolCheckerConst._xtoolAPI, true); 
	var tmpObj = {};
	tmpObj.type='captcha-get';
	tmpObj.referrer=1;
	tmpObj.login=sts._loginValue;
	console.log("login: "+tmpObj.login);
	tmpObj.pass=sts._passwordValue;
	tmpObj.captcha_id=cpt._capchaID;
	
	
	var params = JSON.stringify(tmpObj);
	XToolChecker.DebugMsg("params: " + params);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);


	
	req.onreadystatechange = XTChecker.Capcha.ResponseRequestXTool;
	

	cpt.SetStage("Ожидание результата xtool.ru");
    try 
	{
		req.send(params);
	} 
	catch(e) 
	{
		cpt.SetStage(e);
		cpt._recognizing = false;
	}
}

XTChecker.Capcha.ResponseRequestXTool = function() 
{
	var cpt = XTChecker.Capcha;
	if (this.readyState == 4) 
	{
		if (this.status == 200)
		{
			try{
			 var response = this.responseText;
			 XToolChecker.DebugMsg(response);
			 response = response.replace(/\\\\\"/g, "####quote####");
			 response = response.replace(/\\\"/g, "####quote####");
			 var result = JSON.parse(response);
			 XToolChecker.ProcessJSONObject(result);
			 
			 if ((result.ErrorCode !== undefined) && (result.ErrorCode != 200))
			 {
				 if (result.ErrorCode == 307)
				 {
					cpt.SetStage("XTool.ru: капча еще не готова...");
					setTimeout(function() { XTChecker.Capcha.RequestResultXTool(); }, 5000);
					return;					 
				 }
				 else
				 {
					var text = JSON.parse('"' + result.Error + '"');
					cpt._recognizing = false;
					cpt._textResult = text;
					cpt._error = true;
					cpt._recognizing = false;
					console.log("[XTool.ru] Ошибка: " + text);
					//XToolChecker.ShowMessage("[XTool.ru] Ошибка: " + text);
					return;
				 }
			 }
			 else if (result.captcha_response !== undefined)
			 {
				cpt._result = result.captcha_response;
				
				cpt.SetStage("XTool.ru: результат готов");
				if (cpt._result != "")
				{
					cpt.SendCapcha();
				}
				return;
			 }
			 else
			 {
				
				cpt._recognizing = false;
				cpt._textResult = response;
				cpt._error = true;
				cpt._recognizing = false;
				console.log("[XTool.ru] Ошибка: " + text);
				//XToolChecker.ShowMessage("[XTool.ru] Ошибка: " + response);
				return;
			 }
			 
			 }catch(e) 
			{
				cpt.SetStage(e);
				cpt._recognizing = false;
			}

		}
		else 
		{
			XToolChecker.MsgToConsole("Ответ сервера XTool.ru: " + this.status);		
			cpt._textResult = "Ответ сервера XTool.ru: " + this.status;
			console.log("[XTool.ru] Ошибка: " + text);
			//XToolChecker.ShowMessage("[XTool.ru] Ошибка: " + cpt._textResult);
			cpt._error = true;
			cpt._recognizing = false;
			return;
		}
	}
}

XTChecker.Capcha.ResponseAdd = function() 
{
	var cpt = XTChecker.Capcha;
	if(this.readyState == 4) 
	{
	
		if (this.status == 200)
		{
			var text = this.responseText;
			XToolChecker.DebugMsg(text);

			 if ((text.indexOf("ERROR") != -1) || ( text.indexOf("<HTML>") != -1))
			 {
				if (cpt._antigate_no_alerts)
				{
					if ((text.indexOf('ERROR_NO_SLOT_AVAILABLE') != -1))
					{
						cpt.Check();
						return;
					}
				}
				cpt._recognizing = false;
				cpt._textResult = text;
				cpt._error = true;
				console.log("[Antigate.com] Ошибка: " + text);
				//XToolChecker.ShowMessage("[Antigate.com] Ошибка: " + text);
				cpt._recognizing = false;
				if (cpt._mode == cpt._modes.YandexW)
				{
					cpt._text = "[Antigate.com] Ошибка: " + text;
					cpt._resultCode  = -1;
				}
				return;
			 }
			 else
			 {
	   			if (text.indexOf("OK|") == 0)
				{
					var parts = text.split("|");
					if (parts.length > 1)
					{
						cpt._capchaID = parts[1];
					}
					setTimeout(function() { XTChecker.Capcha.RequestResult(); }, 10000);
					return;
					
				}
				else
				{
					if (cpt._antigate_no_alerts)
					{
						if ((text.indexOf('ERROR_NO_SLOT_AVAILABLE') != -1))
						{
							cpt.Check();
							return;
						}
					}
					
					cpt._recognizing = false;
					cpt._textResult = text;
					cpt._error = true;
					console.log("[XTool.ru] Ошибка: " + text);
					//XToolChecker.ShowMessage("[Antigate.com] Ошибка: " + text);
					cpt._recognizing = false;
					return;
				}
			}
		}
		else 
		{
			XToolChecker.MsgToConsole("Ответ сервера antigate.com: " + this.status);		
			cpt.SetStage("Ответ сервера antigate.com: " + this.status);
			cpt._error = true;
			cpt._recognizing = false;
			return;
		}
	}
}

XTChecker.Capcha.RequestResult = function ()
{
	var cpt = XTChecker.Capcha;
	if (cpt._apikey == '')
	{
		cpt._error = false;
		cpt._recognizing = false;
		return false;
	}
	var req = new XMLHttpRequest();
	var actionStr = "http://antigate.com/res.php?key=" + cpt._apikey + "&action=get&id=" + cpt._capchaID;
	XToolChecker.DebugMsg("Запрос: " + actionStr);
	req.open('GET', actionStr, true);  
	req.onreadystatechange = XTChecker.Capcha.ResponseRequest;	
	cpt.SetStage("Ожидание результата antigate.com");
	req.send(null); 
}

XTChecker.Capcha.ResponseRequest = function() 
{
	var cpt = XTChecker.Capcha;
	if(this.readyState == 4) 
	{
		if (this.status == 200)
		{
			 var text = this.responseText;
			 XToolChecker.DebugMsg(text);
			 if ((text.indexOf("ERROR") != -1) || ( text.indexOf("<HTML>") != -1))
			 {
				if (cpt._antigate_no_alerts)
				{
					if ((text.indexOf('ERROR_NO_SLOT_AVAILABLE') != -1))
					{
						cpt.Check();
						return;
					}
				}
				cpt._recognizing = false;
				cpt._textResult = text;
				cpt._error = true;
				cpt._recognizing = false;
				console.log("[XTool.ru] Ошибка: " + text);
				//XToolChecker.ShowMessage("[Antigate.com] Ошибка: " + text);
				return;
			 }
			 else if (text.indexOf("CAPCHA_NOT_READY") != -1)
			 {
				cpt.SetStage("antigate.com: капча еще не готова...");
				setTimeout(function() { XTChecker.Capcha.RequestResult(); }, 5000);
				return;
			 }
			 else if (text.indexOf("OK|") == 0)
			 {
				var parts = text.split("|");
				if (parts.length > 1)
				{
					cpt._result = parts[1];
				}
				cpt.SetStage("antigate.com: результат готов");
				if (cpt._result != "")
				{
					cpt.SendCapcha();
				}
				return;
			 }
			 else
			 {
				if (cpt._antigate_no_alerts)
				{
					if ((text.indexOf('ERROR_NO_SLOT_AVAILABLE') != -1))
					{
						cpt.Check();
						return;
					}
				}
				cpt._recognizing = false;
				cpt._textResult = text;
				cpt._error = true;
				cpt._recognizing = false;
				console.log("[XTool.ru] Ошибка: " + text);
				//XToolChecker.ShowMessage("[Antigate.com] Ошибка: " + text);
				return;
			 }

		}
		else 
		{
			XToolChecker.MsgToConsole("Ответ сервера antigate.com: " + this.status);		
			cpt._textResult = "Ответ сервера antigate.com: " + this.status;
			console.log("[XTool.ru] Ошибка: " + text);
			//XToolChecker.ShowMessage("[Antigate.com] Ошибка: " + cpt._textResult);
			cpt._error = true;
			cpt._recognizing = false;
			return;
		}
	}
}

XTChecker.Capcha.ReadImageData = function (imageUrl)
{
	try 
	{
		var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
		var channel = ioService.newChannel2(imageUrl, 0, null, null, null, null, null, null);//newChannel(imageUrl, 0, null);
		var stream = channel.open();
		
		var bIStream = Components.classes["@mozilla.org/binaryinputstream;1"].createInstance(Components.interfaces.nsIBinaryInputStream);
		bIStream.setInputStream(stream);
		var result = "";
		while (1)
		{
			var countBytes = bIStream.available();
			if (countBytes == 0)
				break;
			result += bIStream.readBytes(countBytes);
		}
		return result;
	}
	catch (e)
	{
		return "";
	}

}

XTChecker.Capcha.ReadImageDataCB= function (imageUrl, doc, tabId, info, callback)
{

var oReq = new XMLHttpRequest();
oReq.open("GET", imageUrl, true);
oReq.responseType = "blob";
console.log(imageUrl);
oReq.onload = function (oEvent) {
  var arrayBuffer = oReq.response; // Note: not oReq.responseText
 
	var fr = new FileReader();
    
	fr.onload = function(){
	  //callback(this.result);

	  callback(doc, tabId, info, this.result);
	};
  
	fr.readAsDataURL(oReq.response); // async call
	
  }

oReq.send(null);

}



XTChecker.Capcha.GetDomainFromUrl = function(href)
{
	var start = href.indexOf("://");
	if (start != -1) 
	{
		start += 4;
		var endOfDomain = href.indexOf("/", start);
		if (endOfDomain != -1)
		{
			return href.substring(0, endOfDomain).toLowerCase();
		}
	
	}
	else
	{
		return href.toLowerCase();
	}
}