// Team Password Manager Browser Extension password saver script
// (c) 2016-2022 Ferran Barba

// Data to save
var savePwdName = "";
var savePwdUrl = "";
var savePwdUsername = "";
var savePwdPassword = "";
var savePwdProjectId = 0;
var saveWhere = "tpm_shared"; // other value: tpm_my

$(document).ready(function(){

	localizeHtmlPage();

	// Check if personal passwords are allowed, if so show selector (#tpm_select_where)
	chrome.runtime.sendMessage({id: "TPM_MY_COUNT"}, function(response) {
		if ( response ) {
			$("#tpm_select_where").show();
		} // if response
	}); // TPM_MY_COUNT

	// Get data to save
	chrome.runtime.sendMessage({id: "TPM_GET_SAVER_DATA"}, function(response) {
		if ( response ) {
			savePwdUrl = response[0];
			savePwdUsername = response[1];
			savePwdPassword = response[2];
		} else {
			
		}
	}); // TPM_GET_SAVER_DATA

	$("#tpm_pwd_name").focus();

	// Disable enter on name (because it requeries the tree)
    $("#tpm_pwd_name").keypress(function(e){
    	if ( e.which == 13 ) e.preventDefault();
	});

    // Does the selector change?
	$("#tpm_select_where").on('change', function() {
  		saveWhere = this.value;
  		if ( saveWhere == "tpm_my" ) {
  			$("#tpm_shared_passwords_div").hide();
  		} else {
  			$("#tpm_shared_passwords_div").show();
  		}
	});

	// Save password
	$("#tpm_saver_submit").click(function() {

		// Validate
		var errorMessage = "";
		
		// Do we have a name?
		savePwdName = $("#tpm_pwd_name").val();
		if ( ! savePwdName ) {
			errorMessage = chrome.i18n.getMessage("savErrEnterName"); // You need to enter a name for the password.
		}

		// Do we have a selected project?
		if ( saveWhere == "tpm_shared" ) {
			var selectedNode = $('#tree_container').jstree("get_selected");
			var savePwdProjectId = selectedNode[0];
			if ( ! savePwdProjectId ) {
				if ( errorMessage ) {
					errorMessage += "<br/>";
				}
				errorMessage += chrome.i18n.getMessage("savErrSelectProject"); // You need to select a project to save the password in.
			}	
		}		
		
		if ( errorMessage ) {
			$("#tpm_errors_group").show();
			$("#tpm_errors").html(errorMessage);
		} else {
			$("#tpm_errors_group").hide();
			$("#tpm_errors").html("");
			var idSave = "TPM_SAVE_PASSWORD";
			if ( saveWhere == "tpm_my" ) {
  				idSave = "TPM_SAVE_MY_PASSWORD"
  			}
			chrome.runtime.sendMessage({id: idSave, name: savePwdName, url:savePwdUrl, username:savePwdUsername, password:savePwdPassword, project_id:savePwdProjectId}, function(response) {
					if ( response ) {
						var errorSaving = chrome.i18n.getMessage("savErrorSaving"); // Error saving
						var obj = JSON.parse(response);
						if ( obj ) {
							if ( obj.message ) {
								errorSaving += ": " + obj.message;
							}
						} else {
							errorSaving += " - " + response;	
						}
						$("#tpm_errors_group").show();
						$("#tpm_errors").html(errorSaving);
					} else {
						window.close();
					}
			});
		}
   	});

	// Close window (cancel button or ESC)
	$("#tpm_saver_cancel").click(function() {
   		window.close();
   	});
   	$(window).keyup(function(e) {
        if ( e.keyCode == 27 ) {
      		window.close();  	
        }
    });

    // Tree
    $('#tree_container').jstree({
		"core" : {
			"data": function (obj, cb) {
				var pid = 0;
				if ( obj ) {
					pid = obj.id;
					if ( pid == "#" ) {
						pid = 0;
					}
				}
				chrome.runtime.sendMessage({id: "TPM_LIST_SUBPROJECTS", project_id:pid}, function(response) {
					if ( response ) {
						cb.call(this,response);
					}
				});
			},
			"worker": false, // T#465
			"check_callback" : true, // for the state plugin
			"multiple" : false,
			"themes" : {
				"responsive" : false,
				"icons" : true,
				"dots" : true
			}												
		}, // core
	}); // jstree (tree_container)

}); // document.ready

function localizeHtmlPage() {
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++)
    {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if(valNewH != valStrH)
        {
            obj.innerHTML = valNewH;
        }
    }
}