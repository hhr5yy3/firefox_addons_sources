var cur_page = 0;
var $ = window.jQuery;

const _getObjectFromSyncStorage = async function( key ) {
	return new Promise( ( resolve, reject ) => {
		try {
			browser.storage.sync.get(key, function( value ) {
				resolve( value[key] );
			});
		} catch ( ex ) {
			reject( ex );
		}
	});
};

function SetImageAppEarth( enabled ) 
{
	if ( enabled )
		$("#id_app_enabled" ).text( browser.i18n.getMessage( "popup_app_enabled"  ) );
	else
		$("#id_app_enabled" ).text( browser.i18n.getMessage( "popup_app_disabled" ) );
	
	if ( enabled )
		$("#id_app_earth" ).attr( 'src', "/images/app_earth.png" );
	else
		$("#id_app_earth" ).attr( 'src', "/images/app_earth_sleep.png" );	
}

$(document).ready( function() 
{
	browser.runtime.onMessage.addListener( function( response, sender, sendResponse )
	{
		if ( response.mes == "get_extension_settings_answer" )	start( response );
	});		
	browser.runtime.sendMessage( { mes : "get_extension_settings" } );
});

function start( data ) 
{
	if ( !data.native_is_available ) 
	{
		//document.getElementById( "id_test" ).textContent  = "e3";
		browser.runtime.sendMessage( { mes : "open_welcomer" } );
		window.close();
		return;
	}
	
	$( "#id_app_not_installed" ).hide();
	$( "#idSliders" ).show();

	var enabled = data.is_addon_enabled;
	if ( enabled ) enabled = data.native_is_available;	
	
	var videoEnabled = data.is_addon_video_enabled;
	if ( videoEnabled ) videoEnabled = enabled;	
	
  $( ".checkbox-slider" ).prop( "checked", enabled );
	$( ".checkbox-slider-video" ).prop( "checked", videoEnabled );
	SetImageAppEarth( enabled ); 
		
	if ( data.native_is_free )
	{
		$( "#id_app_earth" ).hide();
		$( ".buy" ).show();
	}
	
	if ( data.is_rate_it )
	{
		$( ".rateit" ).show();
		$( ".about"  ).hide();
	}
	else
	{
		$( ".rateit" ).hide();
		$( ".about"  ).show();
	}
	
	$(".rateit_text a" ).attr( 'href', "https://addons.mozilla.org/firefox/addon/antffw/reviews/" ).attr( "target", "_blank" );

	let version = "v." + data.native_version;
	$('#id_version' ).text( version );

	$( ".button_buy" ).attr( 'href', data.native_home_url + "buy"     	).attr( "target", "_blank" );
	$( ".a_index"    ).attr( 'href', data.native_home_url + "index"   	).attr( "target", "_blank" );
	$( ".a_download" ).attr( 'href', data.native_home_url + "download"	).attr( "target", "_blank" );
	$( ".a_contact"  ).attr( 'href', data.native_home_url + "contact" 	).attr( "target", "_blank" );
	$( ".button_buy" ).text( browser.i18n.getMessage( "popup_buy"      	) + " Pro" );
	$( ".buy p" 			).text( browser.i18n.getMessage( "popup_its_free" ) );
	$( ".a_index"    ).text( browser.i18n.getMessage( "popup_home"     	) );
	$( ".a_download" ).text( browser.i18n.getMessage( "popup_download" 	) );
	$( ".a_contact"  ).text( browser.i18n.getMessage( "popup_contact"  	) );
	$( "#vbtn span"  ).text( browser.i18n.getMessage( "video_button"   	) );
	$( "#vbox span"  ).text( browser.i18n.getMessage( "video_box"      	) );	
	$( ".rateit_text span" ).text( browser.i18n.getMessage( "rate_it"  	) );
	$( ".rateit_thank_you span" ).text( browser.i18n.getMessage( "thank_you" ) );
	$( "#id_auto_cap_dl" ).text( browser.i18n.getMessage( "capture_downloads_from_webplayers_automatically" ) );
	$( "#pdf" ).css( "background-image", data.is_capture_pdf ? "url( '/images/chk_green_62.png')" : "url( '/images/unchk_green_62.png')" );
	
	if ( data.vmode == 0 )
	{
		$( "#vbtn img" ).css( "background-image", "url( '/images/checked_62.png'   )" );
		$( "#vbox img" ).css( "background-image", "url( '/images/unchecked_62.png' )" );
	}
	else
	{
		$( "#vbtn img" ).css( "background-image", "url( '/images/unchecked_62.png' )" );
		$( "#vbox img" ).css( "background-image", "url( '/images/checked_62.png'   )" );
	}		
	
	$( "#footer span" ).text( data.native_copyright );
	$( "#footer a"    ).text( data.native_support_email );
	$( "#footer a"    ).prop( "href", "mailto:" + data.native_support_email );	
	
  $( ".checkbox-slider" ).change( function () 
	{
		let enabled = $(this).is(':checked');
		browser.runtime.sendMessage( { mes : "set_addon_enabled", bool_value : enabled } );
		SetImageAppEarth( enabled ); 
		if ( enabled == false )
			$('.checkbox-slider-video').prop('checked', enabled );
		else
			$( '.checkbox-slider-video' ).prop( 'checked', videoEnabled );//data.is_addon_video_enabled );
  });	

  $( ".checkbox-slider-video" ).change( function () 
	{
		let enabled = $(this).is(':checked');
		if ( $('.checkbox-slider').is(':checked') )
			browser.runtime.sendMessage( { mes : "set_addon_video_enabled", bool_value : enabled } );
		else
			$('.checkbox-slider-video').prop('checked', false );
  });	
	
	$( "#btn_next" ).click( function () 
	{
		if ( cur_page == 0 )
		{
			$( "#page_container article.page" ).css( "-webkit-transform", "translateX( -400px )" );
			$( "#page_container article.page" ).css( "transform", "translateX( -400px )" );
			$( "#btn_next img" ).css( "-webkit-transform", "scaleX(-1)" );
			$( "#btn_next img" ).css( "-moz-transform", "scaleX(-1)" );
			$( "#btn_next img" ).css( " -o-transform", "scaleX(-1)" );
			$( "#btn_next img" ).css( "transform", "scaleX(-1)" );
			cur_page++;
		}
		else
		if ( cur_page == 1 )
		{
			$( "#page_container article.page" ).css( "-webkit-transform", "translateX( 0 )" );
			$( "#page_container article.page" ).css( "transform", "translateX( 0 )" );		
			$( "#btn_next img" ).css( "-webkit-transform", "scaleX(-1)" );
			$( "#btn_next img" ).css( "-moz-transform", "scaleX(-1)" );
			$( "#btn_next img" ).css( " -o-transform", "scaleX(-1)" );
			$( "#btn_next img" ).css( "transform", "scaleX(-1)" );
			cur_page = 0;
		}
  });

  $( "#pdf" ).click( async function () 
	{
		let enabled = await _getObjectFromSyncStorage( "cap_pdf" );;
		$( '#pdf ').css( "background-image", enabled ? "url( '/images/unchk_green_62.png')" : "url( '/images/chk_green_62.png')" );
		browser.runtime.sendMessage( { mes : "set_capture_pdf", bool_value : !enabled } );
  });	
	
  $( "#vbtn" ).click( async function () 
	{
		if ( await _getObjectFromSyncStorage( "vmode" ) == 0 ) return;
		$( "#vbtn img" ).css( "background-image", "url( '/images/checked_62.png' )" );
		$( "#vbox img" ).css( "background-image", "url( '/images/unchecked_62.png' )" );
		browser.runtime.sendMessage( { mes : "set_vmode", value : 0 } );
  });		

	$( "#vbox" ).click( async function () 
	{
		if ( await _getObjectFromSyncStorage( "vmode" ) == 1 ) return;
		$( "#vbtn img" ).css( "background-image", "url( '/images/unchecked_62.png' )" );
		$( "#vbox img" ).css( "background-image", "url( '/images/checked_62.png' )" );
		browser.runtime.sendMessage( { mes : "set_vmode", value : 1 } );
  });
	
  $( ".rateit_close" ).click( function () 
	{
		$( ".about"  ).show();
		$( ".rateit" ).hide();
		browser.runtime.sendMessage( { mes : "set_rate_it", bool_value : false } );
  });	
	
	if ( document.getElementById("idCurYear") )	
		document.getElementById("idCurYear").innerHTML = (new Date()).getFullYear();
	
};

