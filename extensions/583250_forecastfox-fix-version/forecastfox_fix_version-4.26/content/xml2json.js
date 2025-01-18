/*
 ### jQuery XML to JSON Plugin v1.0 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
*//*
 # INSPIRED BY: http://www.terracoder.com/
           AND: http://www.thomasfrank.se/xml_to_json.html
*//*
 This simple script converts XML (document of code) into a JSON object. It is the combination of 2
 'xml to json' great parsers (see below) which allows for both 'simple' and 'extended' parsing modes.
*/

s3forecast.xml2json = function(xml, extended) {
	if(!xml) return {}; // quick fail
	//### PARSER LIBRARY
	// Core function
	function parseXML(node, simple){
		if (!node) { return null; }
		var txt = '', obj = null, att = null;
		var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
		var nv = node.text || node.nodeValue || '';
		if (node.childNodes) {
			if (node.childNodes.length>0) {
				for (var n=0; n<node.childNodes.length; n++) {
					var cn = node.childNodes[n];
					var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
					var cnv = cn.text || cn.nodeValue || '';
					if (cnt == 8) {
						continue; // ignore comment node
					}
					else if (cnt == 3 || cnt == 4 || !cnn) {
						// ignore white-space in between tags
						if (cnv.match(/^\s+$/)) {
							continue;
						};
						txt += cnv.replace(/^\s+/,'').replace(/\s+$/,'');
						// make sure we ditch trailing spaces from markup
					}
					else {
						obj = obj || {};
						if (obj[cnn]) {
							if (obj[cnn].constructor != Array) { obj[cnn] = myArr(obj[cnn]); }
							obj[cnn][ obj[cnn].length ] = parseXML(cn, true/* simple */);
							obj[cnn].length = obj[cnn].length;
						}
						else {
							obj[cnn] = parseXML(cn);
						}
					}
				}
			}; //node.childNodes.length>0
		}; //node.childNodes

		if (node.attributes) {
			if (node.attributes.length>0) {
				att = {}; obj = obj || {};
				for (var a=0; a<node.attributes.length; a++) {
					var at = node.attributes[a];
					var atn = jsVar(at.name), atv = at.value;
					att[atn] = atv;
					if (obj[atn]) {
						if (obj[atn].constructor != Array) {
							obj[atn] = myArr(obj[atn]);//[ obj[ atn ] ];
						}
						obj[atn][ obj[atn].length ] = atv;
						obj[atn].length = obj[atn].length;
					}
					else {
						obj[atn] = atv;
					}
				}
				//obj['attributes'] = att;
			} //node.attributes.length>0
		} //node.attributes

		if (obj) {
			if (txt!='') {
				obj.text = txt;
			}
			txt = (obj.text) ? obj.text : txt;
			if (txt) { obj.text = txt; }
			txt = '';
		}
		var out = obj || txt;
		if (extended) {
			if (txt) { out = {}; } //new String(out);
			txt = out.text || txt || '';
			if (txt) { out.text = txt; }
			if (!simple) { out = myArr(out); }
		}

		return out;
	};  // parseXML
	// Core Function End
	// Utility functions

	var jsVar = function(s) { return String(s || '').replace(/-/g,"_"); };
	var isNum = function(s) {
		return (typeof s == "number") || String((s && typeof s == "string") ? s : '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/); 
	};
	var myArr = function(o) {
		if (o.constructor != Array) o = [ o ]; o.length=o.length;
		// here is where you can attach additional functionality, such as searching and sorting...
		return o;
	};
	// Utility functions End
	//### PARSER LIBRARY END

	// Convert plain text to xml
	if (typeof xml=='string') { xml = s3forecast.text2xml(xml); }

	// Quick fail if not xml (or if this is a node)
	if (!xml.nodeType) { return; }
	if (xml.nodeType == 3 || xml.nodeType == 4) { return xml.nodeValue; }

	// Find xml root node
	var root = (xml.nodeType == 9) ? xml.documentElement : xml;

	// Convert xml to json
	var out = parseXML(root, true /* simple */);
   
	// Clean-up memory
	xml = null; root = null;

	// Send output
	return out;
}
  
// Convert text to XML DOM
s3forecast.text2xml = function(str) {
	// NOTE: I'd like to use jQuery for this, but jQuery makes all tags uppercase
	//return $(xml)[0];
	var out;
	try {
		var xml = new DOMParser();
		xml.async = false;
	} catch(e){ throw new Error("XML Parser could not be instantiated") };
	try {
		out = xml.parseFromString(str, "text/xml");
	} catch(e){ throw new Error("Error parsing XML string") };

	return out;
}
