﻿// * Software:	Add-on "TRANSLITERUSSIAN" for Mozilla Firefox 
// * Version:	0.8
// * Date:	2020-07-24
// * Author:	Vlad Koutsenok (www.koutsenok.de)
// * File:	default.js

var element = document.activeElement;
element.style.border = "2px dotted #ff0000";

var vorlastchar = "";

function translate(e){
	
	var is2char = null;
	var flag = 1;
	var flag2 = 0;
	var text = element.value;
	var latinchar = e.data;
	var translatechar = "";
	var position = e.target.selectionStart;
	
	switch(latinchar) {
		
		// Cases [a, ja, h, ch, sh, zh]
		case "A":
			if(vorlastchar == String.fromCharCode(1081)){ 			// "j"
				translatechar = String.fromCharCode(1103);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1049)){		// "J"
				translatechar = String.fromCharCode(1071);
				is2char = true;
			} 
			else translatechar = String.fromCharCode(1040);
			break;
		case "a":
			if(vorlastchar == String.fromCharCode(1081)){			// "j"
				translatechar = String.fromCharCode(1103);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1049)){		// "J"
				translatechar = String.fromCharCode(1071);
				is2char = true;
			} 
			else translatechar = String.fromCharCode(1072);
			break;
		case "h":
			if(vorlastchar == String.fromCharCode(1079)){			// "c"
				translatechar = String.fromCharCode(1095);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1047)){		// "C"
				translatechar = String.fromCharCode(1063);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1089)){		// "s"
				translatechar = String.fromCharCode(1096);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1057)){		// "S"
				translatechar = String.fromCharCode(1064);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1094)){		// "z"
				translatechar = String.fromCharCode(1078);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1062)){		// "Z"
				translatechar = String.fromCharCode(1046);
				is2char = true;
			}
			else translatechar = String.fromCharCode(1093);
			break;
		case "H":
			if(vorlastchar == String.fromCharCode(1079)){			// "c"
				translatechar = String.fromCharCode(1095);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1047)){		// "C"
				translatechar = String.fromCharCode(1063);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1089)){		// "s"
				translatechar = String.fromCharCode(1096);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1057)){		// "S"
				translatechar = String.fromCharCode(1064);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1094)){		// "z"
				translatechar = String.fromCharCode(1078);
				is2char = true;
			} 
			else if(vorlastchar == String.fromCharCode(1062)){		// "Z"
				translatechar = String.fromCharCode(1046);
				is2char = true;
			}
			else translatechar = String.fromCharCode(1061);
			break;
		case "B":
			translatechar = String.fromCharCode(1041);
			break;
		case "b":
			translatechar = String.fromCharCode(1073);
			break;
		case "C":
			translatechar = String.fromCharCode(1047);
			break;			
		case "c":
			translatechar = String.fromCharCode(1079);
			break;
		case "D":
			translatechar = String.fromCharCode(1044);
			break;
		case "d":
			translatechar = String.fromCharCode(1076);
			break;
		case "E":
			translatechar = String.fromCharCode(1045);
			break;			
		case "e":
			translatechar = String.fromCharCode(1077);
			break;
		case "F":
			translatechar = String.fromCharCode(1060);
			break;
		case "f":
			translatechar = String.fromCharCode(1092);
			break;
		case "G":
			translatechar = String.fromCharCode(1043);
			break;			
		case "g":
			translatechar = String.fromCharCode(1075);
			break;
		case "I":
			translatechar = String.fromCharCode(1048);
			break;
		case "i":
			translatechar = String.fromCharCode(1080);
			break;
		case "J":
			translatechar = String.fromCharCode(1049);
			break;			
		case "j":
			translatechar = String.fromCharCode(1081);
			break;
		case "K":
			translatechar = String.fromCharCode(1050);
			break;
		case "k":
			translatechar = String.fromCharCode(1082);
			break;
		case "L":
			translatechar = String.fromCharCode(1051);
			break;			
		case "l":
			translatechar = String.fromCharCode(1083);
			break;
		case "M":
			translatechar = String.fromCharCode(1052);
			break;
		case "m":
			translatechar = String.fromCharCode(1084);
			break;
		case "N":
			translatechar = String.fromCharCode(1053);
			break;			
		case "n":
			translatechar = String.fromCharCode(1085);
			break;
		case "O":
			translatechar = String.fromCharCode(1054);
			break;
		case "o":
			translatechar = String.fromCharCode(1086);
			break;
		case "P":
			translatechar = String.fromCharCode(1055);
			break;			
		case "p":
			translatechar = String.fromCharCode(1087);
			break;
		case "R":
			translatechar = String.fromCharCode(1056);
			break;
		case "r":
			translatechar = String.fromCharCode(1088);
			break;
		case "S":
			translatechar = String.fromCharCode(1057);
			break;			
		case "s":
			translatechar = String.fromCharCode(1089);
			break;
		case "T":
			translatechar = String.fromCharCode(1058);
			break;
		case "t":
			translatechar = String.fromCharCode(1090);
			break;
		case "U":
			translatechar = String.fromCharCode(1059);
			break;			
		case "u":
			translatechar = String.fromCharCode(1091);
			break;
		case "V":
			translatechar = String.fromCharCode(1042);
			break;
		case "v":
			translatechar = String.fromCharCode(1074);
			break;
		case "W":
			translatechar = String.fromCharCode(1065);
			break;			
		case "w":
			translatechar = String.fromCharCode(1097);
			break;
		case "X":
			translatechar = String.fromCharCode(1061);
			break;
		case "x":
			translatechar = String.fromCharCode(1093);
			break;
		case "Y":
			translatechar = String.fromCharCode(1067);
			break;			
		case "y":
			translatechar = String.fromCharCode(1099);
			break;
		case "Z":
			translatechar = String.fromCharCode(1062);
			break;
		case "z":
			translatechar = String.fromCharCode(1094);
			break;
		case "Ä":
			translatechar = String.fromCharCode(1069);
			break;			
		case "ä":
			translatechar = String.fromCharCode(1101);
			break;
		case "Ö":
			translatechar = String.fromCharCode(1025);
			break;
		case "ö":
			translatechar = String.fromCharCode(1105);
			break;
		case "Ü":
			translatechar = String.fromCharCode(1070);
			break;			
		case "ü":
			translatechar = String.fromCharCode(1102);
			break;
		case "#":
			translatechar = String.fromCharCode(1098);
			break;
		case "'":
			translatechar = String.fromCharCode(1100);
			break;
		default:
			if(latinchar == null){
				flag = 0;
			}
			else{
				translatechar = latinchar;
				flag = 1;
			}
	} 
	
	vorlastchar = translatechar;
	
	if(is2char){
		flag = 2;
		flag2 = 1;
	}
	
	element.value = text.substring(0, position - flag) + translatechar + text.substring(position);
	element.setSelectionRange(position - flag2, position - flag2);
	is2char = false;
}
element.addEventListener("input", translate);