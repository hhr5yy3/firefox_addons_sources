var OpenWithPhotoshopOptions = {
	saveOptions:function(event){
		localStorage["pspath"] = document.getElementById("exe-path-textbox").value;
	},
	getDefaultPath: function(){
		if (localStorage["os"]=="win") {
			return OpenWithPhotoshopOptions.defaultPaths.win;
		}
		else if(localStorage["os"]=="mac"){
			return OpenWithPhotoshopOptions.defaultPaths.mac;
		}
		else if(localStorage["os"]=="linux"){
			return OpenWithPhotoshopOptions.defaultPaths.linux;
		}	
	},
	defaultPaths:{
		"win": "C:\\Program Files\\Adobe\\Adobe Photoshop CC 2014\\Photoshop.exe",
		"mac": "/Applications/Adobe Photoshop CC/Adobe Photoshop CC.app",
		"linux": "/usr/bin/photoshop"	
	}
}

function init(){

	$(function() {
		if (localStorage["os"]=="win") {
			$("#win_setup").show();
			$("#mac_setup").hide();
			$("#linux_setup").hide();			
		}
		else if (localStorage["os"]=="mac") {
			$("#win_setup").hide();
			$("#mac_setup").show();
			$("#linux_setup").hide();			
		}
		else if (localStorage["os"]=="linux") {
			$("#win_setup").hide();
			$("#mac_setup").hide();
			$("#linux_setup").show();			
		}
	
		$('#save-button').on('click', function(evt) {
			if (localStorage["os"]=="win") {
				if(document.getElementById("exe-path-textbox").value.search(/Photoshop\.exe$/)!=-1) {
					OpenWithPhotoshopOptions.saveOptions(event);
					$('#myModal').modal('show');
				}
				else $('#myModal2').modal('show');
			}
			else if(localStorage["os"]=="mac"){
				if(document.getElementById("exe-path-textbox").value.search(/\.app$/)!=-1) {
					OpenWithPhotoshopOptions.saveOptions(event);
					$('#myModal').modal('show');
				}
				else $('#myModal2').modal('show');
			}
			else if(localStorage["os"]=="linux"){
				if(document.getElementById("exe-path-textbox").value.search(/photoshop$/)!=-1) {
					OpenWithPhotoshopOptions.saveOptions(event);
					$('#myModal').modal('show');
				}
				else $('#myModal2').modal('show');
			}			
		});
		
		document.getElementById("exe-path-textbox").value = localStorage["pspath"] ? localStorage["pspath"] : OpenWithPhotoshopOptions.getDefaultPath();

		document.getElementById("win_exe_path").appendChild(document.createTextNode(OpenWithPhotoshopOptions.defaultPaths.win));
		document.getElementById("mac_exe_path").appendChild(document.createTextNode(OpenWithPhotoshopOptions.defaultPaths.mac));
		document.getElementById("linux_exe_path").appendChild(document.createTextNode(OpenWithPhotoshopOptions.defaultPaths.linux));		
	})
	
}

init();