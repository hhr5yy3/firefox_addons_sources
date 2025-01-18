var text = '';
text = text + 'var Cc = Components.classes;\n';
text = text + 'if (typeof(Cc) == "undefined") {\n';
text = text + '	alert("cannot run in this environment, try error console");\n';
text = text + '	throw "exit";\n';
text = text + '}		\n';
text = text + '\n';
text = text + 'var Ci = Components.interfaces;\n';
text = text + 'var tokendb = Cc["@mozilla.org/security/pk11tokendb;1"].createInstance(Ci.nsIPK11TokenDB);\n';
text = text + 'var token = tokendb.getInternalKeyToken();\n';
text = text + 'try {token.login(true);} catch (e) {}\n';
text = text + 'var pwdmanager;\n';
text = text + 'if (!token.needsLogin()||token.isLoggedIn()){\n';
text = text + '	pwdmanager = Cc["@mozilla.org/login-manager;1"].getService(Ci.nsILoginManager);\n';
text = text + '} else {\n';
text = text + '	alert("cannot get login token");\n';
text = text + '	throw "exit";\n';
text = text + '}\n';
text = text + 'var signons = await pwdmanager.getAllLogins(true);\n';
text = text + '\n';
text = text + 'if ( !confirm(\n';
text = text + '	"This script will search through saved passwords"+\n';
text = text + '	" and will replace old password entries with new ones. "+\n';
text = text + '	"\\n\\nNote: password prompts are unencrypted")) throw "exit";\n';
text = text + '\n';
text = text + 'var oldp=prompt("Enter old password", "");\n';
text = text + 'if ( oldp == null ) throw "exit";\n';
text = text + '\n';
text = text + 'var i;\n';
text = text + 'var found="";\n';
text = text + 'var count=0;\n';
text = text + 'for (i=0;i<signons.length;i++) {\n';
text = text + '	try {\n';
text = text + '		if (signons[i].password != oldp) continue;\n';
text = text + '		if ( count++ < 20 )\n';
text = text + '			found += signons[i].hostname + "\\n";\n';
text = text + '	}\n';
text = text + '	catch(e) {\n';
text = text + '	}\n';
text = text + '}\n';
text = text + 'if ( count > 20 ) {\n';
text = text + '	found += "... and " + (count - 20) + "more";\n';
text = text + '} else if (count==0) {\n';
text = text + '	alert("No entries with this password found");\n';
text = text + '	throw "exit";\n';
text = text + '}\n';
text = text + '\n';
text = text + 'if (!confirm( "Found the following URLs\\n\\n"+found+"\\nProceed?"))\n';
text = text + '	throw "exit";\n';
text = text + '\n';
text = text + 'var newp=prompt("Enter new password to change them, or click Cancel to stop", "");\n';
text = text + 'if ( newp == null ) throw "exit";\n';
text = text + 'var found = "";\n';
text = text + 'var changed = 0;\n';
text = text + 'for (i=0;i<signons.length;i++) {\n';
text = text + '	try {\n';
text = text + '		if (signons[i].password != oldp) continue;\n';
text = text + '		var old_entry = signons[i].clone();\n';
text = text + '		signons[i].password = newp;\n';
text = text + '		pwdmanager.modifyLogin(old_entry,signons[i]);\n';
text = text + '		changed++;\n';
text = text + '	}\n';
text = text + '	catch(e) {\n';
text = text + '	}\n';
text = text + '}\n';
text = text + 'alert("Changed " + changed + " URLs ok");\n';
function oncopy(event) {
	document.removeEventListener("copy", oncopy, true);
	// Hide the event from the page to prevent tampering.
	event.stopImmediatePropagation();
	// Overwrite the clipboard content.
	event.preventDefault();
	event.clipboardData.setData("text/plain", text);
}

function saveOptions()
{
	document.addEventListener("copy", oncopy, true);
	// Requires the clipboardWrite permission
	document.execCommand("copy");
} 

document.querySelector("#button").addEventListener("click", saveOptions);
