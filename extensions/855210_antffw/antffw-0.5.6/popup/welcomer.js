var background = chrome.extension.getBackgroundPage();
$(document).ready( function () 
{
	$("#id_welcome_to_antdm"  ).text( chrome.i18n.getMessage( "welcome_to_antdm"  ) );
	$("#id_description_1" ).text( chrome.i18n.getMessage( "description_1"  ) );
	$("#id_description_2" ).text( chrome.i18n.getMessage( "description_2"  ) );
	$("#id_warning"  			).text( chrome.i18n.getMessage( "warning"  ) );
	$("#id_wearehere" ).text( chrome.i18n.getMessage( "we_are_here"     ) );
	//$("#id_dlsoft" 		).text( chrome.i18n.getMessage( "download_software"     ) );
	$("#id_download" 	).text( chrome.i18n.getMessage( "download_software" ) );
	$("#id_uninstall" ).text( chrome.i18n.getMessage( "uninstall_extension"  ) );	
	$("#id_contactus" ).text( chrome.i18n.getMessage( "contact_us"     ) );
	$("#id_home" ).text( chrome.i18n.getMessage( "home"     ) );
	$("#id_news" ).text( chrome.i18n.getMessage( "download" ) );
	$("#id_cont" ).text( chrome.i18n.getMessage( "contact"  ) );	
	$("#id_cur_year" ).html( (new Date()).getFullYear() );	

	var oDownload = document.getElementById( "id_download" );
	if ( oDownload ) oDownload.addEventListener( "click", function() {	window.open( "http://antdownloadmanager.com/cgi/download.cgi" ); });

	var oUninstall = document.getElementById( "id_uninstall" );
	if ( oUninstall ) oUninstall.addEventListener( "click", function() {	background.window.DLHCH_UninstallSelf(); });
});
