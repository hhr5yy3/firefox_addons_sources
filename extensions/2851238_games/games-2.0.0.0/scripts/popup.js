'use strict'


document.addEventListener('DOMContentLoaded', function()
{	
	localizeHtmlPage()
	
	document.getElementById("platformer").onclick = onPlatformer
	document.getElementById("puzzle").onclick = onPuzzle
	document.getElementById("racing").onclick = onRacing
	document.getElementById("shooter").onclick = onShooter
	document.getElementById("sports").onclick = onSports
	document.getElementById("back_platformer").onclick = onBack
	document.getElementById("back_puzzle").onclick = onBack
	document.getElementById("back_racing").onclick = onBack
	document.getElementById("back_shooter").onclick = onBack
	document.getElementById("back_sports").onclick = onBack
	document.getElementById("rate_us").onclick = onRate
	
	//
	
	readSetting("rated", function(fRated)
	{
		readSetting("install_date", function(install_date)
		{
			if ( install_date )
			{
				var dateInstall = new Date(install_date)
				var dateCurrent = new Date()
				var dateDifDays = Math.floor((dateCurrent.getTime() - dateInstall.getTime()) / 1000 / 60 / 60 / 24)

				if ( !fRated )
				{
					if ( dateDifDays > 1 )
					{
						document.getElementById("rate_us_block").style.display = "block"
					}
				}
				
				//
				
				if ( dateDifDays > 3 )
				{
					document.getElementById("ad_block").style.display = "block"
				}
			}
		})
	})
})

function onRate()
{
	saveSetting("rated", true)
}

function onPlatformer()
{
	document.getElementById("menu_main").style.display = "none"
	document.getElementById("menu_platformer").style.display = "block"
	
	return false
}

function onPuzzle()
{
	document.getElementById("menu_main").style.display = "none"
	document.getElementById("menu_puzzle").style.display = "block"
	
	return false
}

function onRacing()
{
	document.getElementById("menu_main").style.display = "none"
	document.getElementById("menu_racing").style.display = "block"
	
	return false
}

function onShooter()
{
	document.getElementById("menu_main").style.display = "none"
	document.getElementById("menu_shooter").style.display = "block"
	
	return false
}

function onSports()
{
	document.getElementById("menu_main").style.display = "none"
	document.getElementById("menu_sports").style.display = "block"
	
	return false
}

function onBack()
{
	document.getElementById("menu_platformer").style.display = "none"
	document.getElementById("menu_puzzle").style.display = "none"
	document.getElementById("menu_racing").style.display = "none"
	document.getElementById("menu_shooter").style.display = "none"
	document.getElementById("menu_sports").style.display = "none"
	document.getElementById("menu_main").style.display = "block"
}

function saveSetting(key, value)
{
	chrome.storage.local.set({[key]: value}, function()
	{
		;//console.log('The "' + key + '" value is set to ' + value)
	})
}

function readSetting(key, callback)
{
	chrome.storage.local.get([key], function(data)
	{
		callback(data[key])
	})
}

function localizeHtmlPage()
{
    // Localize by replacing __MSG_***__ meta tags
	// https://stackoverflow.com/questions/25467009/internationalization-of-html-pages-for-my-google-chrome-extension
	
    var objects = document.getElementsByTagName('html')
    for ( var j = 0; j < objects.length; j++ )
    {
        var obj = objects[j]

        var valStrH = obj.innerHTML.toString()
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : ""
        })

        if ( valNewH != valStrH )
        {
            obj.innerHTML = valNewH
        }
    }
}
