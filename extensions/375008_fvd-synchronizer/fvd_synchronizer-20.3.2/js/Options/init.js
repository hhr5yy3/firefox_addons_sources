var tab_account = null;
var tab_speeddial = null;
var tab_bookmarks = null;
var tab_backups = null;

// get sections
var login_section = null;
var manual_speed = null;
var manual_bookmarks = null;
var restore_section = null;

var backup_frame_src = null; // Task #2000

//account open
function account_open() {
	tab_account.className += ' tab_pressed';
	login_section.className = 'section_open';

	tab_speeddial.className = 'tab tab_blue tab_speeddial';
	tab_bookmarks.className = 'tab tab_green tab_bookmarks';
	tab_backups.className = 'tab tab_yellow tab_backups';

	manual_speed.className = '';
	manual_bookmarks.className = '';
	restore_section.className = '';
    
    fvdSynchronizer.Options.loadAccountFrame(); // Task #2000
}

//speed dial open
function speeddial_open() {
	tab_speeddial.className += ' tab_pressed';
	manual_speed.className = 'section_open';

	tab_account.className = 'tab tab_violet tab_account';
	tab_bookmarks.className = 'tab tab_green tab_bookmarks';
	tab_backups.className = 'tab tab_yellow tab_backups';

	login_section.className = '';
	manual_bookmarks.className = '';
	restore_section.className = '';
}

//bookmarks open
function bookmarks_open() {
	tab_bookmarks.className += ' tab_pressed';
	manual_bookmarks.className = 'section_open';

	tab_account.className = 'tab tab_violet tab_account';
	tab_speeddial.className = 'tab tab_blue tab_speeddial';
	tab_backups.className = 'tab tab_yellow tab_backups';

	login_section.className = '';
	manual_speed.className = '';
	restore_section.className = '';
}

//backups open
function backups_open(sub) { // Task #2000
	console.info(sub);

	tab_backups.className += ' tab_pressed';
	restore_section.className = 'section_open';

	tab_account.className = 'tab tab_violet tab_account';
	tab_speeddial.className = 'tab tab_blue tab_speeddial';
	tab_bookmarks.className = 'tab tab_green tab_bookmarks';

	login_section.className = '';
	manual_speed.className = '';
	manual_bookmarks.className = '';

	var subsectionServer = document.getElementById('subsectionBackupsServer');
	var subsectionLocal = document.getElementById('subsectionBackupsLocal');

	console.info(sub);

	if(sub !== 'backups_local'){
		console.info('subsectionServer');
		subsectionLocal.setAttribute( "hidden", 1 );
		subsectionServer.removeAttribute( "hidden" );
		setBackupFrameSrc();
	}else{//backups_local
		console.info('subsectionLocal');
		subsectionServer.setAttribute( "hidden", 1 );
		subsectionLocal.removeAttribute( "hidden" );
	}

}

function setBackupFrameSrc() {// Task #2000
	var srcAuth = 'https://everhelper.pro/client/stats?addon=chrome_sync';
	var srcBackups = 'https://everhelper.pro/client/settings_inc?tab=backups&no_close=true&no_tab_navigation=true&no_pro_button=true&no_dialog=true&backup_type=bookmarks';

	var iframe = document.getElementById('backupFrame');

	fvdSynchronizer.Server.Sync.getAuthState( function( error, authorized ){
		var src = authorized ? srcBackups : srcAuth;

		if(src != backup_frame_src){
			iframe.setAttribute('src', src);
			backup_frame_src = src;
		}
	});
}

document.addEventListener( "DOMContentLoaded", function(){
	// get tabs buttons
	tab_account = document.getElementById('tabHeadAccount');
	tab_speeddial = document.getElementById('tabHeadSync');
	tab_bookmarks = document.getElementById('tabHeadSyncBookmarks');
	tab_backups = document.getElementById('tabHeadBackupHistory');
    
	tab_backups_server = document.getElementById('serverBackupsLink');// Task #2000
	tab_backups_local = document.getElementById('localBackupsLink');// Task #2000

    var tabName = String(fvdSynchronizer.Prefs.get( "sd.sync-tab" ));
    
    if(['account','speeddial','bookmarks','backups'].indexOf(tabName) !== -1) {
        fvdSynchronizer.Prefs.set( "sd.sync-tab", false );
        
        setTimeout(()=>{
            fvdSynchronizer.Options.setTab( tabName );
            
        }, 150);
    }

	tab_account.addEventListener( "click", function(){
		fvdSynchronizer.Options.setTab( "account" );
	}, false );
	tab_speeddial.addEventListener( "click", function(){
		fvdSynchronizer.Options.setTab( "speeddial" );
	}, false );
	tab_bookmarks.addEventListener( "click", function(){
		fvdSynchronizer.Options.setTab( "bookmarks" );
	}, false );
	tab_backups.addEventListener( "click", function(){
		fvdSynchronizer.Options.setTab( "backups" );
	}, false );
    
	tab_backups_server.addEventListener( "click", function(){// Task #2000
		fvdSynchronizer.Options.setTab( "backups_server" );
	}, false );
	tab_backups_local.addEventListener( "click", function(){// Task #2000
		fvdSynchronizer.Options.setTab( "backups_local" );
	}, false );
    

	// get sections
	login_section = document.getElementById('login_section');
	manual_speed = document.getElementById('manual_speed');
	manual_bookmarks = document.getElementById('manual_bookmarks');
	restore_section = document.getElementById('restore_section');

  var howToUseBtn = document.querySelector("#topButtons .how-to-use-button");
  howToUseBtn.addEventListener("click", function() {
		var url = "https://nimbusweb.me/s/share/3610278/z38gs6ke4x29wfbv9iw7";
    if(
			fvdSynchronizer.Utils.browserLocaleIs("ru")
			|| fvdSynchronizer.Utils.browserLocaleIs("uk")
			|| fvdSynchronizer.Utils.browserLocaleIs("ua")
			|| fvdSynchronizer.Utils.browserLocaleIs("kz")
			|| fvdSynchronizer.Utils.browserLocaleIs("uz")
			|| fvdSynchronizer.Utils.browserLocaleIs("by")
		) {
      url = "https://nimbusweb.me/s/share/3624488/22fcw5loqfl7yl3v1vm2";
		}
    window.open(url);
  }, false);
}, false );