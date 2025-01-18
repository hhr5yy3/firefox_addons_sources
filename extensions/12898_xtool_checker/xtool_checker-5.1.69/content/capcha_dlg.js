var _cpt = 0;
var _threadIndex = -1;
var _checkUrl = "";
var _action = "";
var _key = "";
var _retpath = "";
var _imgSrc = "";
var _isGoogle = 0;

window.onload = function() 
{ 
	if (window.dialogArguments)
	{
		
		_imgSrc = (window.dialogArguments.imgSrc);
		_cpt  = (window.dialogArguments.CPT);
	}
	document.getElementById('image_cpt').src = _imgSrc;

	SetStage("Введите текст с картинки", "", false );
	var okBtn = document.getElementById("submit");
	okBtn.addEventListener("click", SendInfo);
	var cancelBtn = document.getElementById("stopCheck");
	cancelBtn.addEventListener("click", StopAndClose);
	
	var refreshBtn = document.getElementById("refresh");
	refreshBtn.addEventListener("click", Refresh);
	
	var cptCode = document.getElementById("capchaCode");
	cptCode.addEventListener("keydown", OnKeyDown);
};

function OnKeyDown(event)
{
	if (event.keyCode == 13) 
		SendInfo();
}

function SendInfo()
{
	_cpt._result =  document.getElementById('capchaCode').value.trim();
	if (_cpt._result == "")
	{
		console.log("Ошибка: Пустой код.");
		return;
	}
	CloseDlg();
}

function Refresh()
{
	_cpt._refreshImage = true;
	close();
}


function CloseDlg()
{
	_cpt._stopAll = false;
	close();
}

function StopAndClose()
{
	_cpt._stopAll = true;
	_cpt._textResult = "Отмена проверки.";
	_cpt._error = false;
	_cpt._recognizing = false;
	close();
}
function SetStage(text, text2, progress, color)
{
	document.getElementById('stageLabel').value = text;
	document.getElementById('stageLabel2').value = text2;

	//document.getElementById('progress_cpt').hidden = !progress;
	if (color)
	{
		document.getElementById('stageLabel').style.color = color;
		document.getElementById('stageLabel2').style.color = color;
	}
	else
	{
		document.getElementById('stageLabel').style.color = "#000000";
		document.getElementById('stageLabel2').style.color = "#000000";
	}
}