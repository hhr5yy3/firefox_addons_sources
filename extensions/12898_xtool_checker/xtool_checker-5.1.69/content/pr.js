if (!XTChecker) var XTChecker = {};
if (!XTChecker.PR) XTChecker.PR ={}; 


XTChecker.PR.ord = function (str,index)
{
	var a = str.charCodeAt(index);
	if (a>0xFF) 
		a-=0x350;
	return a;
}

XTChecker.PR.StrToNum = function (str, check, magic)
{
	var int32unit = 4294967296;

	var length = str.length;
	for (var i = 0; i < length; i++)
	{
		check *= magic;
		if (check >= int32unit)
		{
			check = (check - int32unit * Math.floor(check / int32unit));
			check = (check < -2147483648) ? (check + int32unit) : check;
		}
		check += XTChecker.PR.ord(str[i]);
	}
	return check;
}

XTChecker.PR.HashURL = function (string)
{
	var check1 = XTChecker.PR.StrToNum(string, 0x1505, 0x21);
	var check2 = XTChecker.PR.StrToNum(string, 0, 0x1003F);

	check1 >>= 2;
	check1 = ((check1 >> 4) & 0x3FFFFC0 ) | (check1 & 0x3F);
	check1 = ((check1 >> 4) & 0x3FFC00 ) | (check1 & 0x3FF);
	check1 = ((check1 >> 4) & 0x3C000 ) | (check1 & 0x3FFF);
	var t1 = ((((check1 & 0x3C0) << 4) | (check1 & 0x3C)) <<2 ) | (check2 & 0xF0F );
	var t2 = ((((check1 & 0xFFFFC000) << 4) | (check1 & 0x3C00)) << 0xA) | (check2 & 0xF0F0000 );
	return (t1 | t2);
}

XTChecker.PR.CheckHash = function (hashnum)
{
	var int32unit = 4294967296;
	var checkByte = 0;
	var flag = 0;
	var hashStr = hashnum >= 0 ? hashnum : (int32unit + hashnum );
	hashStr = hashStr.toString();
	var length = hashStr.length;

	for (var i = length - 1;  i >= 0;  i--)
	{
		var re = parseInt(hashStr[i]);
		if (re == "NaN") 
			re = 0;
		if (1 === (flag % 2))
		{
			re +=  re;
			re = Math.floor(re / 10) + (re % 10);
		}
		checkByte += re;
		flag++;
	}

	checkByte %= 10;
	if (0 !== checkByte)
	{
		checkByte = 10 - checkByte;
		if (1 === (flag % 2) )
		{
			if (1 === (checkByte % 2))
			{
				checkByte += 9;
			}
			checkByte >>= 1;
		}
	}
	return '7' + checkByte + hashStr;
}

XTChecker.PR.getch = function (url)
{
	return XTChecker.PR.CheckHash(XTChecker.PR.HashURL(url));
}

XTChecker.PR.getAction = function (url)
{
	var ch = XTChecker.PR.getch(url);
	url = encodeURIComponent(url).replace(/\+/g,"%2B").replace(/\//g,"%2F")
	var action = "http://toolbarqueries.google.com/tbr?client=navclient-auto&ch=" + ch + "&features=Rank&q=info:" + url;
	return action;
}

XTChecker.PR.getRank = function (response)
{
	var res = response.match(/Rank_.*?:.*?:(\d+)/i);
    return res ? res[1] : "";	
}