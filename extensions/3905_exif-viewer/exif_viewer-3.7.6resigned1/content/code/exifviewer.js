;ExifViewerApp.add('constants', function _constants() {
	'use strict';
	var isMoz = true,
		fileName = '',
		kml = '',
		basicTags = {
			0x010F: 'Make',
			0x0110: 'Model',
			0x0112: 'Orientation',
			0x0132: 'DateTime',
			0x829A: 'ExposureTime',
			0x829D: 'FNumber',
			0x8827: 'ISOSpeedRatings',
			0x9003: 'DateTimeOriginal',
			0x9201: 'ShutterSpeedValue',
			0x9202: 'ApertureValue',
			0x9204: 'ExposureBias',
			0x9209: 'Flash',
			0x920A: 'FocalLength',
			0xA002: 'Image Width',
			0xA003: 'Image Height'
		},
		constants = {
			isMoz: isMoz,
			fileName: fileName,
			kml: kml,
			basicTags: basicTags,
			
			INTEL: 0,
			MOTOROLA: 1,
			
			// only really care about 0 and < 0
			NO_DIRECTORY_ENTRIES: +1,
			OK: 0,
			INVALID: -1,
			BAD_JPEG_HEADER: -2,	// was -1
			EXIF_TOO_SMALL: -3,		// was -2
			IFD_LENGTH_ERROR: -4,
			INVALID_BYTE_ORDER: -5,
			INVALID_TAG_MARK: -6,
			EXIF_NOT_DETECTED: -7,	// was -3
			INVALID_IFD0_OFFSET: -8,
			OFFSET_POINTS_OUTSIDE: -9,
			BEYOND_END: -11,
			UNABLE_OPEN_IMAGE_FILE: -100,
			FILE_DOESNT_EXIST: -101,
			UNABLE_OPEN_REMOTE_FILE: -102,
			UNABLE_OPEN_LOCAL_FILE: -103,
			UNABLE_OPEN_ATTACHMENT: -104,
			INVALID_MAKER_FORMAT: -1000
		};
	
	return constants;
}, []);;ExifViewerApp.add('exif', function _exif(globals, constants, utils, exifdata, moz, mozutils, iptcm, xml, tags, ike, logging) {
	'use strict';

	var getOrientation, getSlideshowInfo, startDisplay, _handleExifImagePicked, processFile, getTestData, readByteAsText,
		dumpFileInfo, readByteMoz, readByteURLMoz, getExifData, handleApp1, handleApp13, handleCOM, dumpJPEGcomment,
		dumpExifData, getFileInformation, parseExifTagData, getKMLString, getThumbnailAsDataURL,
		fileIO, fileReady = false;
	
	getOrientation = function _getOrientation(fileName, testFileName, divName) {
		var status, ifd0 = {}, conversion = {};
		
		ifd0.type = 'IFD0';

		if (constants.isMoz) {
			status = constants.OK;
		} else {
			status = getTestData(testFileName, conversion);
		}
		if (status === 0) {
			status = getExifData(fileName, divName, true, conversion, null, ifd0, null, null, null, null, null, null);
			if (status === 0  &&  ifd0.x0112) {
				return ifd0.x0112;	//	orientation!
			} else {
				logging.alert('Unable to extract the orientation information from the Exif data.');
			}
		} else {
	//		logging.alert('Unable to open the test file as a text stream.');
		}
		return 1;	// assume it's "normal"
	};	// getOrientation()

	getSlideshowInfo = function _getSlideshowInfo(fileName, testFileName, output, divName) {
		var status,  ifd0 = {}, subifd = {}, conversion = {};

		ifd0.type = 'IFD0';
		subifd.type = 'SubIFD';

		if (constants.isMoz) {
			status = constants.OK;
		} else {
			status = getTestData(testFileName, conversion);
		}
		if (status === 0) {
			status = getExifData(fileName, divName, true, conversion, null, ifd0, subifd, null, null, null, null, null);
			if (status === 0) {
				output.orientation = ifd0.x0112;
				output.width = subifd.xa002;
				output.height = subifd.xa003;
			} else {
				logging.alert('Unable to extract the orientation information from the Exif data.');
			}
		} else {
	//		logging.alert('Unable to open the test file as a text stream.');
		}
		return;
	};	// getSlideshowInfo()

	startDisplay = function _startDisplay() {
		var fileName, handled, location, message,
	//		document = ExifViewerOverlay.window.document,
			sb = document.getElementById('statusbar'),
			pb = document.getElementById('progressbar'),
			re1 = new RegExp('^file://(localhost|127.0.0.1)?', ''),
			re2 = new RegExp('/', 'g'),
			re3 = new RegExp('^/([a-zA-Z]:)', ''); 

		if (pb) {
			pb.setAttribute('mode', 'undetermined');
		}
		utils.clearTexts('outputDiv');
		if (document.getElementById('remote-file').value !== '') {
			if (sb) {
				sb.setAttribute('label', mozutils.getPString('processingRemoteURL')); 
			}
			fileName = document.getElementById('remote-file').value;
		} else {
			if (sb) {
				sb.setAttribute('label', mozutils.getPString('processingLocalFile')); 
			}
			fileName = document.getElementById('local-file').value;
		}

		if (fileName.indexOf('file://') === 0) {
			if (!globals.directorySeparator) {
				moz.setExifDirectorySeparator();
			}
			fileName = window.decodeURI(fileName.replace(re1, '').replace(re3, '$1').replace(re2, globals.directorySeparator));
		}

		try {
			processFile(fileName, null, 'outputDiv', !document.getElementById('maker').checked, document.getElementById('image').checked, document.getElementById('basic').checked, document.getElementById('tables').checked, document.getElementById('tagid').checked);
		} catch (e) {
			handled = false;
			if (e.name === 'NS_ERROR_FAILURE'  &&  e.location) {
				location = e.location.toString();
				if (location.indexOf('read8') !== -1) {
					logging.alert(mozutils.getPString('networkError'));
					handled = true;
				} else if (location.indexOf('readByteURLMoz') !== -1) {
					logging.alert(mozutils.getPString('connectionError'));
					handled = true;
				}
			} 
			if (!handled) {
				logging.alert(mozutils.getPString('errorNotification'));
				message = '' 
						+ (e.result			? 'Result:        ' + '0x' + e.result.toString(16) + '\n' : '')
						+ (e.name			? 'Name:          ' + e.name + '\n' : '')
						+ (e.message		? 'Message:       ' + e.message + '\n' : '')
						+ (e.fileName		? 'File name:     ' + e.fileName + '\n' : '')
						+ (e.filename		? 'File name:     ' + e.filename + '\n' : '')
						+ (e.lineNumber		? 'Line number:   ' + e.lineNumber + '\n' : '')
						+ (e.linenumber		? 'Line number:   ' + e.linenumber + '\n' : '')
						+ (e.columnNumber	? 'Column number: ' + e.columnNumber + '\n' : '')
						+ (e.columnnumber	? 'Column number: ' + e.columnnumber + '\n' : '')
						+ (e.location		? 'Location:      ' + e.location + '\n' : '')
						+ (e.data			? 'Data:          ' + e.data + '\n' : '')
						+ (e.inner			? 'Inner:         ' + e.inner + '\n' : '')
						+ (e.stack			? 'Stack:         ' + e.stack + '\n' : '');
				if (logging.confirm(message + '\n' + mozutils.getPString('copyToClipboard'))) {
					moz.copyToClipboard(message);
				}
			} else {
				logging.log(e);
			}
		}
	//	resizeOutputDiv()
		if (sb) {  
			sb.setAttribute('label', mozutils.getPString('done')); 
		}
		if (pb) {
			pb.setAttribute('mode', 'determined');
			pb.setAttribute('value', '0');
		}
		if (constants.isMoz) {
			moz.fixDivs('outputDiv');
		}
	};	// startDisplay()

	_handleExifImagePicked = function __handleExifImagePicked(url, overlay) {
		var re1 = new RegExp('^file://(localhost|127.0.0.1)?', ''),
			re2 = new RegExp('/', 'g'),
			re3 = new RegExp('^/([a-zA-Z]:)', ''); 

		if (overlay) {
			globals.overlay = overlay;
		}
		if (url.indexOf('file://') == 0) {
			if (!globals.directorySeparator) {
				moz.setExifDirectorySeparator();
			}
			url = window.decodeURI(url.replace(re1, '').replace(re3, '$1').replace(re2, globals.directorySeparator));
			document.getElementById('local-file').value = url;
			moz.clearURL();
		} else {
			moz.saveURL();
			document.getElementById('remote-file').value = url;
			moz.clearFile();
		}
		utils.clearText('fileDiv');
		utils.displayText(utils.cleanExifStringData(url), 'fileDiv');
		startDisplay();
	};	// _handleExifImagePicked()
	
	utils.export('_handleExifImagePicked', _handleExifImagePicked);
	//utils.export('startDisplay', startDisplay);

	processFile = function _processFile(fileName, testFileName, divName, suppressMakerNote, suppressImage, 
										basicTags, useTables, displayTagID) {
		var status, isURL,
			conversion = {},
			fileInfo = {}, ifd0 = {}, ifd1 = {}, subifd = {}, interop = {}, gps = {},
			iptc = {}, iptc_core = {}, jpeg = {};

		fileInfo.type = 'File';
		ifd0.type = 'IFD0';			ifd0.status = -1;		ifd0.gpsifd_offset = -1;
		subifd.type = 'SubIFD';		subifd.status = -1;		subifd.iopifd_offset = -1;
		ifd1.type = 'IFD1';			ifd1.status = -1;
		interop.type = 'IOP';		interop.status = -1;
		gps.type = 'GPS';			gps.status = -1;
		iptc.type = 'IPTC';			iptc.status = -1;
		iptc_core.type = 'IPTC Core';	iptc_core.status = -1;

		constants.fileName = fileName;

		isURL = (fileName.indexOf('http://') === 0  ||  fileName.indexOf('https://') === 0  ||  fileName.indexOf('ftp://') === 0);

		if (globals.isWebExt  &&  !fileReady) {
			if (isURL) {
				fileIO.get(fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID);
				return;
			} else {
				fileIO.getLocal(fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID);
				return;
			}
		}

		if (globals.isLegacy  &&  constants.isMoz) {
			moz.addToHistory(isURL ? 'rem' : 'loc' , fileName);
		}
	//	var isMailbox = (fileName.indexOf('mailbox://') == 0);

		utils.displayText('<h1>' + utils.cleanExifStringData(fileName) + '</h1>', divName + '_head');
		
		if (constants.isMoz) {
			status = constants.OK;
		} else {
			status = getTestData(testFileName, conversion);
		}
		if (status === 0) {
			status = getExifData(fileName, divName, suppressMakerNote, conversion, fileInfo, ifd0, subifd, ifd1, interop, gps, iptc, iptc_core, jpeg);
			if (!suppressImage) {
				if (globals.isLegacy  ||  (globals.isWebExt  &&  isURL)) {
					utils.displayText('<img src="' + (isURL ? '' : 'file://') + fileName.replace(/&/g, '&amp;') + '" width="200">', divName + '_img');
				}
			}

			if (!constants.isMoz) {
				dumpFileInfo(fileInfo, divName);
			}

			if (status === 0, true) {
				dumpJPEGcomment(divName, jpeg);
				dumpExifData(divName, ifd0, subifd, ifd1, interop, gps, basicTags, useTables, displayTagID);
				if (constants.isMoz) {
					moz.fixDivs(divName);
				}
				if (!basicTags) {
					iptcm.dumpIptcData(divName, iptc, useTables);
					xml.dumpIptcCoreData(divName, iptc_core);
				}
			}

			if (status !== 0  ||  ifd0.status === -1) {
				utils.displayText('<p>' + mozutils.getPString('unableToExtract') + '</p>', divName + '_err');
			}
		} else {
			utils.displayText('<p>' + mozutils.getPString('unableToOpenTestFile') + '</p>', divName + '_err');
		}
	//	if (status !== 0  &&  constants.isMoz) { moz.disableMainButton(true, fileName); }
	};	// processFile()

	getTestData = function _getTestData(fileName, conversion) {	// IE only
		var status = constants.OK, i, c, c2, 
			ok = {},
			fso = new ActiveXObject('Scripting.FileSystemObject'),
			file = fso.GetFile(fileName),
			textStream = file.OpenAsTextStream();

		if (!textStream) { return constants.INVALID; }

		for (var i = 0 ; i < 256 ; i++) {
			c = textStream.Read(1);
			c2 = c.charCodeAt(0);
			if (i === c2) {
				ok['x' + c2] = 'y';
			} else {
				if (ok['x' + c2]  ||  conversion['x' + c2]) {
					status = -1;
				} else {
					conversion['x' + c2] = i;
				}
			}
		}
		textStream.Close();
		return status;
	};	// getTestData()

	readByteAsText = function _readByteAsText(textStream, conversion) {
		var tmp1 = textStream.Read(1),
			tmp2 = tmp1.charCodeAt(0);

		if (conversion  &&  conversion['x' + tmp2]) { 
			tmp2 = conversion['x' + tmp2];
		}
		return tmp2;
	};	// readByteAsText()

	dumpFileInfo = function _dumpFileInfo(fileInfo, divName) {
		var a,
			attrib = [], output = [];

		for (a in fileInfo) {
			attrib.push(a + ' = ' + fileInfo[a]);
		}
		output.push('<h2>' + mozutils.getPString('fileInformation') + '</h2>');
		output.push('<ul>');
		output.push('<li>' + attrib.join('</li>\n<li>') + '</li>');
		output.push('</ul>');
		utils.displayText(output.join(''), divName + '_err');
	};	// dumpFileInfo()

	readByteMoz = function _readByteMoz(sis) {
	//	try {
			var c = sis.read(1);	// sis.available()
			return (c === '' ? 0 : c.charCodeAt(0));
	//	} catch (e) {
	//		return 0;
	//	}
	};	// readByteMoz()

	readByteURLMoz = function _readByteURLMoz(bis) {
	//	try {
			return bis.read8();
	//	} catch (e) {
	//		return 0;
	//	}
	};	// readByteURLMoz()
	
	fileIO = (function () {
		var idx, bytes;

		function get(fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', fileName, true);
			xhr.responseType = 'arraybuffer';
			xhr.onload = function (err) {
				bytes = new Uint8Array(xhr.response);
				idx = -1;
				processFile(fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID);
				fileReady = true;
			};
			xhr.send();
		}	// get()
		
		function getLocal(fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID) {
			fetch(fileName, {mode: 'same-origin'})   // <-- important

			.then(function (result) {
				return result.blob();
			})

			.then(function (blob) {
				var reader = new FileReader();

				reader.addEventListener('loadend', function () {
					bytes = new Uint8Array(this.result);
					idx = -1;
					processFile(fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID);
					fileReady = true;
				});

				reader.readAsArrayBuffer(blob); 
			});
		}	// getLocal()
		
		function read() {
			if (bytes) {
				idx += 1;
				if (idx < bytes.length) {
					return bytes[idx];
				} else {
					return undefined;
				}
			} else {
				return undefined;
			}
		}	// read()
		
		function rewind() {
			idx = -1;
		}	// rewind()

		return {
			get: get,
			read: read,
			getLocal: getLocal,
			rewind: rewind
		};
	})();

	getExifData = function _getExifData(fileName, divName, suppressMakerNote, conversion, fileInfo, ifd0, subifd, ifd1, interop, gps, iptc, iptc_core, jpeg) {
		var output = [], exif_data = [],
			error_num = constants.OK, status, i, mp_length, app,
			debug = false,
			isURL = (fileName.indexOf('http://') === 0  ||  fileName.indexOf('https://') === 0  ||  fileName.indexOf('ftp://') === 0),
	//		isMailbox = (fileName.indexOf('mailbox://') === 0), ph,
			readByteFunction, readByteStream,
			ios, uri, channel, bis,
			file, is, sis,
			fso, textStream;

		if (globals.isLegacy) {
			if (constants.isMoz) {
				if (isURL) {
					try {
						ios = Components.classes['@mozilla.org/network/io-service;1']
									.getService(Components.interfaces.nsIIOService);
						uri = ios.newURI(fileName, null, null);
						channel = ios.newChannelFromURI(uri);
		//				channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
		//				channel.loadFlags |= Components.interfaces.nsIRequest.INHIBIT_CACHING;
		//				channel.loadFlags |= Components.interfaces.nsIRequest.INHIBIT_PERSISTENT_CACHING;
						channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_FROM_CACHE;
						bis = Components.classes['@mozilla.org/binaryinputstream;1']
									.createInstance(Components.interfaces.nsIBinaryInputStream);
						bis.setInputStream(channel.open());
						readByteFunction = readByteURLMoz;
						readByteStream = bis;
					} catch (e) {
						logging.log(e);
						output.push(mozutils.getPString('unableOpenRemoteFile'));
						error_num = constants.UNABLE_OPEN_REMOTE_FILE;
					}
		//		} else if (isMailbox) {
		//			try {
		//				ph = Components.classes['@mozilla.org/network/protocol;1?name=mailbox']
		//							.getService(Components.interfaces.nsIIOService);	// nsIProtocolHandler
		//				uri = ph.newURI(fileName, null, null);
		//				alert(uri.spec);
		//				channel = ph.newChannelFromURI(uri);
		//				alert(channel);
		//				bis = Components.classes["@mozilla.org/binaryinputstream;1"]
		//							.createInstance(Components.interfaces.nsIBinaryInputStream);
		//				bis.setInputStream(channel.open());
		//				readByteFunction = readByteURLMoz;
		//				readByteStream = bis;
		//			} catch (e) {
		//				alert(e);
		//				output.push('Unable to open the attachment.');
		//				error_num = constants.UNABLE_OPEN_ATTACHMENT;
		//			}
				} else {
					try {
						file = Components.classes['@mozilla.org/file/local;1']
									.createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath(fileName);
						if (!file.exists()) {
							output.push(mozutils.getPString('fileDoesntExist'));
							error_num = constants.FILE_DOESNT_EXIST;
						} else {
							is = Components.classes['@mozilla.org/network/file-input-stream;1']
										.createInstance( Components.interfaces.nsIFileInputStream );
							is.init(file, 0x01, 4, 0);	// was 00004
							sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
										.createInstance( Components.interfaces.nsIScriptableInputStream );
							sis.init(is);
							readByteFunction = readByteMoz;
							readByteStream = sis;
						}
					} catch (e) {
						logging.log(e);
						output.push(mozutils.getPString('unableOpenLocalFile'));
						error_num = constants.UNABLE_OPEN_LOCAL_FILE;
					}
				}
			} else {
				fso = new ActiveXObject('Scripting.FileSystemObject');
				file = fso.GetFile(fileName);
				textStream = file.OpenAsTextStream();
				if (!textStream) {
					output.push('<p>' + mozutils.getPString('unableOpenImageFile') + '</p>');
					error_num = constants.UNABLE_OPEN_IMAGE_FILE;
				}

				if (fileInfo) {
					getFileInformation(fileInfo, file);
				}
				readByteFunction = readByteAsText;
				readByteStream = textStream;
			}
		} else if (globals.isWebExt) {
			readByteFunction = fileIO.read;
			readByteStream = null;
			// webext todo
		}

		if (error_num === constants.OK) {
	// 		Read file head, check for JPEG SOI
			for (i = 0 ; i < 2 ; i += 1) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}
	//		if ((exif_data[0] == 0xFF  &&  exif_data[1] == 0xD8)  ||  (exif_data[0] == 0x3C  &&  exif_data[1] == 0x21)) {
	//		} else {
			if (exif_data[0] !== 0xFF  ||  exif_data[1] !== 0xD8) {
	//    		output.push('Bad JPEG file head, SOI marker not found: 0x' + exif_data[0].toString(16)
	//						+ ' 0x' + exif_data[1].toString(16));
				output.push(mozutils.getFormattedPString('badJpegFile', [exif_data[0].toString(16) , exif_data[1].toString(16)]));
				error_num = constants.BAD_JPEG_HEADER;
			}
		}

		if (error_num === constants.OK) {
	// 		Read file head, check for APPx
			for (i = 0 ; i < 4 ; i += 1) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}


	//		go through all the APPx data blocks (e.g. APP0: JPEG FIF (JFIF)), looking for the Exif (APP1), 
	//		IPTC Core (APP1), or IPTC (APP13) segment
			while (exif_data[0] === 0xFF  &&  exif_data[1] >= 0xE0  &&  exif_data[1] <= 0xFE) {	// E0 and FE
	//			output.push('Handling APPx (0x' + exif_data[1].toString(16) + ') block');
				output.push(mozutils.getFormattedPString('handlingAPPx', [exif_data[1].toString(16)]));

	//			Get the marker parameter length count
				mp_length = exif_data[3] + 256 * exif_data[2];
	//			if (debug) { output.push('APPx (0x' + exif_data[1].toString(16) + ') Length = ' + mp_length); }
				if (debug) { output.push(mozutils.getFormattedPString('appx', [exif_data[1].toString(16)], mp_length)); }

	// 			Read and handle APPx data
				app = exif_data[1];
				exif_data.length = 0;
				for (i = 0 ; i < mp_length - 2 ; i += 1) {
					exif_data[i] = readByteFunction(readByteStream, conversion);
				}

				switch (app) {
				case 0xE1:	// Exif or IPTC Core
					error_num = handleApp1(ifd0, subifd, ifd1, interop, gps, iptc_core, exif_data, suppressMakerNote, debug, output);
					break;
				case 0xED:	// possibly IPTC
					handleApp13(iptc, exif_data);
					break;
				case 0xFE: // COM (JPEG Comment)
					handleCOM(jpeg, exif_data);
					break;
				}

	// 			Read file head, check next APPx
				for (i = 0 ; i < 4 ; i += 1) {
					exif_data[i] = readByteFunction(readByteStream, conversion);
				}
			}
			output.push(mozutils.getPString('endOfAPPx'));

	//		if (exif_data[0] !== 0xFF  ||  exif_data[1] !== 0xE1) {
	////    		output.push('Bad JPEG file head, APP1 (Exif) marker not found: 0x' + exif_data[0].toString(16) + ' 0x' + exif_data[1].toString(16));
	//			output.push(mozutils.getFormattedPString('badJpegHead', [exif_data[0].toString(16) , exif_data[1].toString(16)]));
	//			error_num = constants.BAD_JPEG_HEADER;
	//		}
		}


	//	if (error_num === constants.OK) {
		if (globals.isLegacy) {
			if (constants.isMoz) {
				if (isURL) {	//   ||  isMailbox
					try {
						bis.close();
						channel.suspend();
					} catch (e) {
	//					logging.log(e);
	//					do nothing...
					}
				} else {
					try {
						sis.close();
						is.close();
					} catch (e) {
						logging.log(e);
	//					do nothing...
					}
				}
			} else {
				textStream.Close();
			}
		}

		if (error_num !== constants.OK  ||  ifd0.status === constants.INVALID) {
	//		output.push('Status = ' + error_num);
			output.push(mozutils.getFormattedPString('status', [error_num]));
			utils.displayText('<pre>' + output.join('\n') + '</pre>', divName + '_err');
		} else {
			utils.displayText('<pre>' + mozutils.getPString('completeWithoutErrors') + '</pre>', divName + '_err');
		}

		return error_num;
	};	// getExifData()

	handleApp1 = function _handleApp1(ifd0, subifd, ifd1, interop, gps, iptc_core, exif_data, suppressMakerNote, debug, output) {
		var is_motorola = constants.INVALID,
			error_num = constants.OK, status, offset, xml, i,
			mp_length = exif_data.length;

	//	if (debug) { output.push(mozutils.getFormattedPString('app1', [mp_length])); }

	//	Length includes itself, so must be at least 2
	//	Following Exif data length must be at least 6
		if (mp_length < 8) {
			output.push(mozutils.getPString('exifTooSmall'));
			error_num = constants.EXIF_TOO_SMALL;
		}

		if (error_num === constants.OK) {
			// Read Exif head, check for "Exif"
			if (exif_data[0] === 0x45  &&  exif_data[1] === 0x78  &&  exif_data[2] === 0x69  &&  exif_data[3] === 0x66
					&&  exif_data[4] === 0  &&  exif_data[5] === 0)	{ // "Exif"
				if (mp_length < 12) {
					output.push(mozutils.getPString('ifdLengthError'));
					error_num = constants.IFD_LENGTH_ERROR;
				}
				exif_data = exif_data.slice(6);	// remove the leading Exif00 bytes
				mp_length -= 6;

				if (error_num === constants.OK) {
	//				Discover byte order
					if (exif_data[0] === 0x49  &&  exif_data[1] === 0x49) {	// 'II' ==> Intel
						is_motorola = constants.INTEL;
					} else if (exif_data[0] === 0x4D && exif_data[1] === 0x4D) {	// 'MM' ==> Motorola
						is_motorola = constants.MOTOROLA;
					}
					if (is_motorola === constants.INVALID) {
						output.push(mozutils.getPString('invalidByteOrder'));
						error_num = constants.INVALID_BYTE_ORDER;
					} else {
	//					output.push('Endian = ' + (is_motorola ? 'Motorola' : 'Intel'));
						output.push(mozutils.getFormattedPString('endian', [(is_motorola ? 'Motorola' : 'Intel')]));
						ifd0.is_motorola = is_motorola;
					}
				}

				if (error_num === constants.OK) {
	//				Check Tag Mark
					if (is_motorola === constants.MOTOROLA) {
						if (exif_data[2] !== 0x00  ||  exif_data[3] !== 0x2A) {
							output.push(mozutils.getPString('invalidTagMark'));
							error_num = constants.INVALID_TAG_MARK;
						}
					} else if (is_motorola === constants.INTEL) {
						if (exif_data[3] !== 0x00  ||  exif_data[2] !== 0x2A){
							output.push(mozutils.getPString('invalidTagMark'));
							error_num = constants.INVALID_TAG_MARK;
						}
					} else {
						output.push(mozutils.getPString('invalidTagMark'));
						error_num = constants.INVALID_TAG_MARK;
					}
				}

				if (error_num === constants.OK) {
			//		Get first IFD offset (offset to IFD0)
					offset = utils.getLong(exif_data, 4, is_motorola);
					if (offset > 0x0000FFFF) {
						output.push(mozutils.getPString('invalidIFD0Offset'));
						error_num = constants.INVALID_IFD0_OFFSET;
					}
				}
			
				if (ifd0  &&  error_num == constants.OK) {
					output.push(mozutils.getPString('parsingIFD0'));
					status = exifdata.parseIFD(ifd0, mp_length, exif_data, offset, is_motorola, debug, output);
					ifd0.status = status;
					if (status < constants.OK) {
						output.push(mozutils.getPString('ifd.parseIFDerrorIFD0'));
						error_num = status;
					}
				}
			
				if (ifd0  &&  subifd  &&  error_num === constants.OK  &&  ifd0.subifd_offset  &&  ifd0.subifd_offset > 0) {
					offset = ifd0.subifd_offset;
					output.push(mozutils.getPString('parsingSubIFD'));
					if (ifd0  &&  ifd0.x010f  &&  !suppressMakerNote) {
						exifdata.initializeMaker(ifd0.x010f, ifd0.x0110, subifd);
					}
					status = exifdata.parseIFD(subifd, mp_length, exif_data, offset, is_motorola, debug, output);
					subifd.status = status;
					if (status < 0) {
						output.push(mozutils.getPString('ifd.parseIFDerrorSubIFD'));
						error_num = status;
					}
				}
			
				if (ifd0  &&  ifd1  &&  error_num === constants.OK  &&  ifd0.ifd1_offset  &&  ifd0.ifd1_offset > 0) {
					offset = ifd0.ifd1_offset;
					output.push(mozutils.getPString('parsingIFD1'));
					status = exifdata.parseIFD(ifd1, mp_length, exif_data, offset, is_motorola, debug, output);
					ifd1.status = status;
					if (status < constants.OK) {
						output.push(mozutils.getPString('parseIFDerrorIFD1'));
						error_num = status;
					}
				}
				if (subifd  &&  interop  &&  error_num === constants.OK  &&  subifd.iopifd_offset > 0) {
					offset = subifd.iopifd_offset;
					output.push(mozutils.getPString('parsingInterop'));
					status = exifdata.parseIFD(interop, mp_length, exif_data, offset, is_motorola, debug, output);
					interop.status = status;
					if (status < 0) {
						output.push(mozutils.getPString('parseIFDerrorInterop'));
						error_num = status;
					}
				}
			
				if (ifd0  &&  gps  &&  error_num === constants.OK  &&  ifd0.gpsifd_offset > 0) {
					offset = ifd0.gpsifd_offset;
					output.push(mozutils.getPString('parsingGPS'));
					status = exifdata.parseIFD(gps, mp_length, exif_data, offset, is_motorola, debug, output);
					gps.status = status;
					if (status < constants.OK) {
						output.push(mozutils.getPString('parseIFDerrorGPS'));
						error_num = status;
					}
				}
			} else if (iptc_core  &&  exif_data[0] === 0x68  &&  exif_data[1] === 0x74  &&  exif_data[2] === 0x74  &&  exif_data[3] === 0x70
					&&  exif_data[4] === 0x3A  &&  exif_data[5] === 0x2F  &&  exif_data[6] === 0x2F  &&  exif_data[7] === 0x6E
					&&  exif_data[8] === 0x73  &&  exif_data[9] === 0x2E  &&  exif_data[10] === 0x61  &&  exif_data[11] === 0x64 
					&&  exif_data[12] === 0x6F  &&  exif_data[13] === 0x62  &&  exif_data[14] === 0x65  &&  exif_data[15] === 0x2E 
					&&  exif_data[16] === 0x63  &&  exif_data[17] === 0x6F  &&  exif_data[18] === 0x6D  &&  exif_data[19] === 0x2F 
					&&  exif_data[20] === 0x78  &&  exif_data[21] === 0x61  &&  exif_data[22] === 0x70  &&  exif_data[23] === 0x2F 
					&&  exif_data[24] === 0x31  &&  exif_data[25] === 0x2E  &&  exif_data[26] === 0x30  &&  exif_data[27] === 0x2F
					&&  exif_data[28] === 0x00) {	// namespace = "http://ns.adobe.com/xap/1.0/" ==> IPTC Core
													// reference: http://partners.adobe.com/public/developer/en/xmp/sdk/XMPspecification.pdf
				xml = '';
				for (i = 29 ; i < mp_length /*- 31*/ ; i += 1) {	// don't recall why -31 but it caused bad XML for one image
	//				if (exif_data[i] == 0) { break; }
					xml += String.fromCharCode(exif_data[i]);
				}
				iptc_core.xml = xml;
				iptc_core.status = constants.OK;
			} else {
	//			output.push('Exif string not detected: 0x' + exif_data[0].toString(16)
	//						+ ' 0x' + exif_data[1].toString(16) + ' 0x' + exif_data[2].toString(16)
	//						+ ' 0x' + exif_data[3].toString(16) + ' 0x' + exif_data[4].toString(16)
	//						+ ' 0x' + exif_data[5].toString(16));
				output.push(mozutils.getFormattedPString('exifNotDetected', [exif_data[0].toString(16) , exif_data[1].toString(16) ,
								exif_data[2].toString(16) , exif_data[3].toString(16) , exif_data[4].toString(16) ,
								exif_data[5].toString(16)]));
				error_num = constants.EXIF_NOT_DETECTED;
			}
		}

		return error_num;
	};	// handleApp1()

	handleApp13 = function _handleApp13(iptc, exif_data) {
		if (iptc) {
			iptc.status = iptcm.parseIPTC(iptc, exif_data);
		}
	};	// handleApp13()

	handleCOM = function _handleCOM(jpeg, exif_data) {
		var i, text = [];

		for (i = 0 ; i < exif_data.length ; i += 1) {
			text.push(String.fromCharCode(exif_data[i]));
		}
		jpeg.comment = text.join('');
	};	// handleCOM()

	dumpJPEGcomment = function _dumpJPEGcomment(divName, jpeg) {
		if (jpeg.comment) {
			utils.displayText('<h2>' 
				+ mozutils.getPString('jpegComment') + '</h2>' + '<p>' + jpeg.comment.replace(/\0/g, ' ').replace(/&/g, '&amp;') + '</p>', divName + '_jpeg');
		}
	};	// dumpJPEGcomment()

	dumpExifData = function _dumpExifData(divName, ifd0, subifd, ifd1, interop, gps, basic, table, tagid) {
		var is_motorola = constants.INVALID,
			output = [];

		document.getElementById(divName).className = (basic ? 'basic' : '');

		if (ifd0  &&  ifd0.status === constants.OK) {
			is_motorola = ifd0.is_motorola;
			utils.displayText('<a name="ifd0" id="a_ifd0"></a>', divName + '_ifd0');
			utils.displayText('<h2>' + mozutils.getPString('exifIFD0') + '</h2>', divName + '_ifd0');
			parseExifTagData(ifd0, output, is_motorola, basic, tagid);
			utils.dumpAssembledExifData(output, divName + '_ifd0', table);
			output.length = 0;
		}
		if (subifd  &&  subifd.status === 0) {
			utils.displayText('<a name="sub" id="a_sub"></a>', divName + '_subifd');
			utils.displayText('<h2>' + mozutils.getPString('exifSubIFD') + '</h2>', divName + '_subifd');
			parseExifTagData(subifd, output, is_motorola, basic, tagid);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName + '_subifd');
			utils.dumpAssembledExifData(output, divName + '_subifd', table);
			output.length = 0;
			if (ifd0  &&  ifd0.x010f  &&  subifd.maker) {
				utils.displayText('<a name="maker" id="a_maker"></a>', divName + '_mn');
				if (!basic) {
					exifdata.dumpExifMakerTagData(subifd.maker, output, is_motorola, divName + '_mn', table);
				}
			}
		}
		if (ifd1  &&  ifd1.status === 0  &&  !basic) {
			utils.displayText('<a name="ifd1" id="a_ifd1"></a>', divName + '_ifd1');
			utils.displayText('<h2>' + mozutils.getPString('exifIFD1') + '</h2>', divName + '_ifd1');
			parseExifTagData(ifd1, output, is_motorola, basic, tagid);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName + '_ifd1');
			utils.dumpAssembledExifData(output, divName + '_ifd1', table);
			output.length = 0;
		}
		if (interop  &&  interop.status === 0  &&  !basic) {
			utils.displayText('<a name="iop" id="a_iop"></a>', divName + '_iop');
			utils.displayText('<h2>' +  mozutils.getPString('exifInterop') + '</h2>', divName + '_iop');
			parseExifTagData(interop, output, is_motorola, basic, tagid);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName + '_iop');
			utils.dumpAssembledExifData(output, divName + '_iop', table);
			output.length = 0;
		}
		if (gps  &&  gps.status === 0  &&  !basic) {
			utils.displayText('<a name="gps" id="a_gps"></a>', divName + '_gps');
			utils.displayText('<h2>' + mozutils.getPString('exifGPS') + '</h2>', divName + '_gps');
			parseExifTagData(gps, output, is_motorola, basic, tagid);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName);
	//		utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName + '_gps');
			utils.dumpAssembledExifData(output, divName + '_gps', table);
			output.length = 0;
		}
	};	// dumpExifData()

	getFileInformation = function _getFileInformation(fileInfo, file) {	// IE only
		var tmp = [];

		fileInfo.attributes = file.Attributes;
		fileInfo.dateCreated = file.DateCreated;
		fileInfo.dateLastAccessed = file.dateLastAccessed;
		fileInfo.DateLastModified = file.DateLastModified;
		fileInfo.drive = file.Drive;
		fileInfo.name = file.Name;
		fileInfo.path = file.Path;
		fileInfo.shortName = file.ShortName;
		fileInfo.shortPath = file.ShortPath;
		fileInfo.size = file.Size;
		fileInfo.type = file.Type;
		if (fileInfo.attributes & 0x0001) {
			tmp.push('read-only');
		}
		if (fileInfo.attributes & 0x0002) {
			tmp.push('hidden');
		}
		if (fileInfo.attributes & 0x0004) {
			tmp.push('system');
		}
		if (fileInfo.attributes & 0x0020) {
			tmp.push('archive');
		}
		if (fileInfo.attributes & 0x0040) {
			tmp.push('alias/shortcut');
		}
		if (fileInfo.attributes & 0x0800) {
			tmp.push('compressed');
		}
		if (tmp.length === 0) {
			tmp.push('normal');
		}
		fileInfo.interpretedAttributes = tmp.join('; ');
	};	// getFileInformation()

	parseExifTagData = function _parseExifTagData(ifd, output, is_motorola, basic, tagid) {
		var data, t, tagnum, out,
			gpsdata, lat, lon, alt, style, href;

		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				if (basic  &&  !constants.basicTags[tagnum]) { continue; }
				data = ifd[t];
	//			utils.displayText('Tagnum = ' + tagnum + '  ===>  data = ' + data + '  type = ' + ifd.type);
				switch (tagnum) {
				case 0x8769:	// Exif IFD: pointer to Exif SubIFD in IFD0
				case 0x8825:	// GPS Info IFD Pointer
				case 0xA005:	// Interoperability IFD Pointer
				case 0x0201:	// JPEG Interchange Format Offset (offset of embedded thumbnail image)
				case 0x0202:	// JPEG Interchange Format Byte Count (size of thumbnail)
					// no need to dump this internal data!
					break;
				case 0x927C:	// MakerNote
					out = tags.getExifInterpretedTagData(tagnum, data, ifd.type, tagid);
					output.push(out);
					ifd.makerNote = data;
					if (ifd.model  &&  ifd.model === 'ikeGPS') {	// make == 'Surveylab Ltd (www.ikegps.com)'
						ike.processIKEdata(data, output);
					}
					break;
				case 0x0004:
					if (ifd.type === 'GPS') {
						lat = (ifd.x0002 ? utils.formatLatLong2(ifd.x0002, 6) : '?');
						lon = (ifd.x0004 ? utils.formatLatLong2(ifd.x0004, 6) : '?');
						alt = ifd.x0006 ? utils.formatRational(ifd.x0006, 2) : 0;
						if (ifd.x0001  &&  ifd.x0001.substring) {
							switch (ifd.x0001.substring(0, 1).toLowerCase()) {
							case 'south':
							case 's':
								lat = -lat;
								break;
							case 'north':
							case 'n':
							default:
								break;
							}
						}
						if (ifd.x0003  &&  ifd.x0003.substring) {
							switch (ifd.x0003.substring(0, 1).toLowerCase()) {
							case 'west':
							case 'w':
								lon = -lon;
								break;
							case 'east':
							case 'e':
							default:
								break;
							}
						}
						output.push(tags.getExifInterpretedTagData(tagnum, data, ifd.type, tagid));
						style = 'style="text-decoration:underline;cursor:pointer"';
						out = [];
						if (lat !== '?'  &&  lon !== '?') {
							// Photograph%20Location@
							href = 'http://maps.google.com/maps?q=' + lat + ',' + lon + '&z=15';
							out.push('<a href="' + utils.cleanExifStringData(href) + '" target="exif" ' + style + '>' + mozutils.getPString('google') + '</a>');
		//					href = 'http://maps.yahoo.com/index.php#mvt=m&trf=0&lon=' + lon + '&lat=' + lat + '&mag=8';
		//					href = 'http://maps.yahoo.com/#q1=++&mvt=m&trf=0&lon=' + lon + '&lat=' + lat + '&zoom=13';
		//					out.push('<a href="' + utils.cleanExifStringData(href) + '" target="exif" ' + style + '>' + mozutils.getPString('yahoo') + '</a>');
		//					href = 'http://maps.msn.com/map.aspx?C=' + lat + ',' + lon + '&A=50&S=405,320';
							href = 'http://www.bing.com/maps/?cp=' + lat + '%7e' + lon + '&lvl=16';
							out.push('<a href="' + utils.cleanExifStringData(href) + '" target="exif" ' + style + '>' + mozutils.getPString('msn') + '</a>');
							href = 'http://www.mapquest.com/maps/map.adp?searchtype=address&formtype=latlong&latlongtype=decimal&latitude=' + lat + '&longitude=' + lon;
							out.push('<a href="' + utils.cleanExifStringData(href) + '" target="exif" ' + style + '>' + mozutils.getPString('mapquest') + '</a>');
						}
						gpsdata = [];
						if (ifd.x0002) {
							gpsdata.push(mozutils.getFormattedPString('x02x01b', [(ifd.x0001 ? ifd.x0001 : '') , 
											utils.formatLatLong(ifd.x0002, 5)]));	// GPSLatitude (GPS IFD)
						}
						if (ifd.x0004) {
							gpsdata.push(mozutils.getFormattedPString('x04x03b', [(ifd.x0003 ? ifd.x0003 : '') , utils.formatLatLong(ifd.x0004, 5)]));	// GPSLongitude (GPS IFD)
						}
	//					if (ifd.x0006) {
	//						gpsdata.push(mozutils.getFormattedPString('x06x05b', [formatRational(ifd.x0006, 2) , constants.GPSAltitudeRefs[ifd.x0005] || ifd.x0005]));	// GPSAltitude (GPS IFD)
	//					}
						if (ifd.x0006) {
							gpsdata.push(mozutils.getFormattedPString('x06', [ifd.x0006 , utils.formatRational(ifd.x0006, 2)]));	// GPSAltitude (GPS IFD)
						}
						if (ifd.x0005) {
							gpsdata.push(mozutils.getFormattedPString('x05', [constants.GPSAltitudeRefs[ifd.x0005] || ifd.x0005]));	// GPSAltitudeRef (GPS IFD)
						}
						if (ifd.x001D) {
							gpsdata.push(mozutils.getFormattedPString('x1D', [ifd.x001D]));	// GPSDateStamp (GPS IFD)
						}
						if (ifd.x0007) {
							gpsdata.push(mozutils.getFormattedPString('x07b', [utils.formatTimestamp(ifd.x0007, 2)]));	// GPSTimeStamp (GPS IFD)
						}
						if (ifd.x0012) {
							gpsdata.push(mozutils.getFormattedPString('x12', [ifd.x0012]));	// GPSMapDatum (GPS IFD)
						}
						if (ifd.x0011) {
							gpsdata.push(mozutils.getFormattedPString('x11', [ifd.x0011]));	// GPSImgDirection (GPS IFD)
						}
						if (ifd.x0010) {	// GPSImgDirectionRef (GPS IFD)
							gpsdata.push(mozutils.getFormattedPString('x10', [constants.GPSImgDirectionRefs[data] ? mozutils.getPString(constants.GPSImgDirectionRefs[data]) : data]));
							//gpsdata.push(mozutils.getFormattedPString('x10', [ifd.x0010]));
							//console.log(ifd.x0010);
						}
	/*
						if (ifd.x0000) {
							gpsdata.push(mozutils.getFormattedPString('x00', [ifd.x0000]));	// GPSVersionID (GPS IFD)
						}
						if (ifd.x0001) {
							gpsdata.push(mozutils.getFormattedPString('x01', [ifd.x0001]));	// GPSLatitudeRef (GPS IFD) 
						}
						if (ifd.x0002) {
							gpsdata.push(mozutils.getFormattedPString('x02', [ifd.x0002 , formatLatLong(ifd.x0002, 5)]));	// GPSLatitude (GPS IFD)
						}
						if (ifd.x0003) {
							gpsdata.push(mozutils.getFormattedPString('x03', [ifd.x0003]));	// GPSLongitudeRef (GPS IFD)
						}
						if (ifd.x0004) {
							gpsdata.push(mozutils.getFormattedPString('x04', [ifd.x0004 , formatLatLong(ifd.x0004, 5)]));	// GPSLongitude (GPS IFD)
						}
						if (ifd.x0008) {
							gpsdata.push(mozutils.getFormattedPString('x08', [ifd.x0008]));	// GPSSatellites (GPS IFD)
						}
						if (ifd.x0009) {	// GPSStatus (GPS IFD)
							var GPSStatuses = {};
							GPSStatuses.A = 'measurement in progress';
							GPSStatuses.V = 'measurement interoperability';
							gpsdata.push(mozutils.getFormattedPString('x09', [mozutils.getPString(GPSStatuses[ifd.x0009])]));
						}
						if (ifd.x000A) {	// GPSMeasureMode (GPS IFD)
							var GPSMeasureModes = ['n/a (0)', '2-dimensional (1)', '3-dimensional (2)'];
							gpsdata.push(mozutils.getFormattedPString('x0A', [mozutils.getPString(GPSMeasureModes[ifd.x000A])]));
						}
						if (ifd.x000B) {
							gpsdata.push(mozutils.getFormattedPString('x0A', [ifd.x000B]));	// GPSDOP (GPS IFD)
						}
						if (ifd.x000C) {	// GPSSpeedRef (GPS IFD)
							var GPSSpeedRefs = {};
							GPSSpeedRefs.K = 'kilometers per hour';
							GPSSpeedRefs.M = 'miles per hour';
							GPSSpeedRefs.N = 'knots';
							gpsdata.push(mozutils.getFormattedPString('x0C', [mozutils.getPString(GPSSpeedRefs[ifd.x000C])]));
						}
						if (ifd.x000D) {
							gpsdata.push(mozutils.getFormattedPString('x0D', [ifd.x000D , formatRational(ifd.x000D, 2)]));	// GPSSpeed (GPS IFD)
						}
						if (ifd.x000E) {	// GPSTrackRef (GPS IFD)
							var GPSTrackRefs = {};
							GPSTrackRefs.T = 'true direction';
							GPSTrackRefs.M = 'magnetic direction';
							gpsdata.push(mozutils.getFormattedPString('x0E', [mozutils.getPString(GPSTrackRefs[ifd.x000E])]));
						}
						if (ifd.x000F) {
							gpsdata.push(mozutils.getFormattedPString('x0F', [ifd.x000F]));	// GPSTrack (GPS IFD)
						}
						if (ifd.x0013) {
							gpsdata.push(mozutils.getFormattedPString('x13', [ifd.x0013]));	// GPSDestLatitudeRef (GPS IFD)
						}
						if (ifd.x0014) {
							gpsdata.push(mozutils.getFormattedPString('x14', [ifd.x0014 , formatLatLong(ifd.x0014, 5)]));	// GPSDestLatitude (GPS IFD)
						}
						if (ifd.x0015) {
							gpsdata.push(mozutils.getFormattedPString('x15', [ifd.x0015]));	// GPSDestLongitudeRef (GPS IFD)
						}
						if (ifd.x0016) {
							gpsdata.push(mozutils.getFormattedPString('x16', [ifd.x0016 , formatLatLong(ifd.x0016, 5)]));	// GPSDestLongitude (GPS IFD)
						}
						if (ifd.x0017) {	// GPSDestBearingRef (GPS IFD)
							var GPSDestBearingRefs = {};
							GPSDestBearingRefs.T = 'true direction';
							GPSDestBearingRefs.M = 'magnetic direction';
							gpsdata.push(mozutils.getFormattedPString('x17', [mozutils.getPString(GPSDestBearingRefs[ifd.x0017])]));
						}
						if (ifd.x0018) {
							gpsdata.push(mozutils.getFormattedPString('x18', [ifd.x0018]));	// GPSDestBearing (GPS IFD)
						}
						if (ifd.x0019) {	// GPSDestDistanceRef (GPS IFD)
							var GPSDestDistanceRefs = {};
							GPSDestDistanceRefs.K = 'kilometers';
							GPSDestDistanceRefs.M = 'miles';
							GPSDestDistanceRefs.N = 'knots';
							gpsdata.push(mozutils.getFormattedPString('x19', [mozutils.getPString(GPSDestDistanceRefs[ifd.x0019])]));
						}
						if (ifd.x001A) {
							gpsdata.push(mozutils.getFormattedPString('x1A', [ifd.x001A]));	// GPSDestDistance (GPS IFD)
						}
						if (ifd.x001B) {
							gpsdata.push(mozutils.getFormattedPString('x1B', [ifd.x001B]));	// GPSProcessingMethod (GPS IFD)
						}
						if (ifd.x001C) {
							gpsdata.push(mozutils.getFormattedPString('x1C', [ifd.x001C]));	// GPSAreaInformation (GPS IFD)
						}
						if (ifd.x001E) {
							gpsdata.push(mozutils.getFormattedPString('x1E', [(ifd.x001E == 0 ? mozutils.getPString('no differential correction (0)') : mozutils.getPString('differential correction applied (1)'))]));	// GPSDifferential (GPS IFD)
						}
	/**/
						if (lat !== '?'  &&  lon !== '?') {
							if (globals.isLegacy) {
								constants.kml = getKMLString(constants.fileName, gpsdata.join('<br>\n'), lat, lon, alt);
								if (constants.isMoz) {
			//						out.push('<span ' + style + ' onclick="moz.copyKMLtoClipboard()">' + mozutils.getPString('copyKMLtoClipboard') + '</span>');
									out.push('<span ' + style + ' onclick="moz.launchKML()">' + mozutils.getPString('launchKMLGE') + '</span>');
									out.push('<span ' + style + ' onclick="moz.saveKMLtoFile(false)">' + mozutils.getPString('saveKMLtoFile') + '</span>');
									out.push('<span ' + style + ' onclick="moz.saveKMLtoFile(true)">' + mozutils.getPString('saveKMLtoFileGE') + '</span>');
								}
							}
							if (out.length > 0) {
								output.push(mozutils.getPString('onlineMappingLinks') + '<ul><li>' + out.join('</li><li>') + '</li></ul>');
							}
						}
					}
					break;
				default:
					output.push(tags.getExifInterpretedTagData(tagnum, data, ifd.type, tagid));
					break;
				}
			}
		}
		if (constants.isMoz  &&  ifd.type === 'IFD1'  &&  ifd.thumbnail) {
			output.push(mozutils.getPString('thumbnail') + '<img src="' + getThumbnailAsDataURL(ifd.thumbnail) + '" class="thumbnail">'); //></img>');
		}
	};	// parseExifTagData()

	getKMLString = function _getKMLString(name, desc, lat, lon, alt) {
		var out = [];
		out.push('<?xml version="1.0" encoding="UTF-8"?>');
		out.push('<kml xmlns="http:\/\/www.opengis.net\/kml\/2.2">');
		out.push('<Document>');
		out.push('	<name>KML file generated by Exif Viewer</name>');
		out.push('	<Style id="sh_camera">');
		out.push('		<IconStyle>');
		out.push('			<scale>1.4</scale>');
		out.push('			<Icon>');
		out.push('				<href>http:\/\/maps.google.com\/mapfiles\/kml\/shapes\/camera.png</href>');
		out.push('			</Icon>');
		out.push('			<hotSpot x="0.5" y="0" xunits="fraction" yunits="fraction"\/>');
		out.push('		</IconStyle>');
	//	out.push('		<ListStyle>');
	//	out.push('		</ListStyle>');
		out.push('	</Style>');
		out.push('	<StyleMap id="msn_camera">');
		out.push('		<Pair>');
		out.push('			<key>normal</key>');
		out.push('			<styleUrl>#sn_camera</styleUrl>');
		out.push('		</Pair>');
		out.push('		<Pair>');
		out.push('			<key>highlight</key>');
		out.push('			<styleUrl>#sh_camera</styleUrl>');
		out.push('		</Pair>');
		out.push('	</StyleMap>');
		out.push('	<Style id="sn_camera">');
		out.push('		<IconStyle>');
		out.push('			<scale>1.2</scale>');
		out.push('			<Icon>');
		out.push('				<href>http:\/\/maps.google.com\/mapfiles\/kml\/shapes\/camera.png</href>');
		out.push('			</Icon>');
		out.push('			<hotSpot x="0.5" y="0" xunits="fraction" yunits="fraction"\/>');
		out.push('		</IconStyle>');
	//	out.push('		<ListStyle>');
	//	out.push('		</ListStyle>');
		out.push('	</Style>');
		out.push('	<Placemark>');
		out.push('		<name>' + name + '</name>');
		out.push('		<description>');
		out.push('<![CDATA[');
		out.push(desc);
		out.push(']]>');
		out.push('		</description>');
		out.push('		<styleUrl>#msn_camera</styleUrl>');
		out.push('		<Point>');
		out.push('			<altitudeMode>clampToGround</altitudeMode>');
		out.push('			<coordinates>' + lon + ',' + lat + ',' + alt + '</coordinates>');
		out.push('		</Point>');
		out.push('	</Placemark>');
		out.push('</Document>');
		out.push('</kml>');
		return out.join('\n');
	};	// getKMLString()

	getThumbnailAsDataURL = function _getThumbnailAsDataURL(buffer) {
		// Convert the data to a URL-encoded string
		var i, ch, encodedString, tmp = [];

		for (i = 0 ; i < buffer.length ; i += 1) {
			ch = window.parseInt(buffer[i], 10).toString(16);
			tmp.push(('0' + ch).substr(ch.length - 1, 2));
		}
		encodedString = '%' + tmp.join('%');

		// And return it all as a data: URL
		return 'data:image/png,' + encodedString;
	};	// getThumbnailAsDataURL()

	return {
		getOrientation: getOrientation,
		getSlideshowInfo: getSlideshowInfo,
		startDisplay: startDisplay,
		_handleExifImagePicked: _handleExifImagePicked,
		processFile: processFile,
		getTestData: getTestData,
		getExifData: getExifData,
		dumpExifData: dumpExifData,
		rewind: fileIO.rewind
	};
}, ['globals', 'constants', 'utils', 'exif-data', 'moz', 'moz-utils', 'iptc', 'xml', 'tags', 'ike', 'logging']);
;ExifViewerApp.add('exif-data', function _exif_data(constants, utils, mozutils, makers, logging) {
	'use strict';

	var getExifTagData, getExifStringData, getExifByteData, getExifSignedByteData, getExifLongData, getExifSignedLongData, 
		getExifRationalData, getExifSignedRationalData, getExifShortData, getExifSignedShortData, offsetError, 
		parseIFD, initializeMaker, parseMaker, dumpExifMakerTagData;

	getExifTagData = function _getExifTagData(ifd, mp_length, exif_data, offset, is_motorola, debug, output) {
		var data, makerNoteOffset,
			tagFormats = ['n/a (0)', 'unsigned byte (1)', 'ascii string (2)', 'unsigned short (3)',
									'unsigned long (4)', 'unsigned rational (5)', 'signed byte (6)',
									'undefined (7)', 'signed short (8)', 'signed long (9)',
									'signed rational (10)', 'single float (11)', 'double float (12)'],
			//	Get tag number, format, and component count
			tagnum = utils.getShort(exif_data, offset, is_motorola),
			format = utils.getShort(exif_data, offset+2, is_motorola),
			number_of_components = utils.getShort(exif_data, offset+4, is_motorola),
			hash = utils.zeroPad(tagnum);

		switch (format) {
		case 1:
			data = getExifByteData(exif_data, offset, is_motorola, debug);
			break;
		case 2:
			data = getExifStringData(exif_data, offset, is_motorola, debug);
			break;
		case 3:
			data = getExifShortData(exif_data, offset, is_motorola, debug);
			break;
		case 4:
			data = getExifLongData(exif_data, offset, is_motorola, debug);
			break;
		case 5:
			data = getExifRationalData(exif_data, offset, is_motorola, debug);
			break;
		case 6:
			data = getExifSignedByteData(exif_data, offset, is_motorola, debug);
			break;
		case 7:
			data = getExifByteData(exif_data, offset, is_motorola, debug);
			break;
		case 8:
			data = getExifSignedShortData(exif_data, offset, is_motorola, debug);
			break;
		case 9:
			data = getExifSignedLongData(exif_data, offset, is_motorola, debug);
			break;
		case 10:
			data = getExifSignedRationalData(exif_data, offset, is_motorola, debug);
			break;
		case 11:
			data = '(' + tagFormats[format] + ')';
			break;
		case 12:
			data = '(' + tagFormats[format] + ')';
			break;
		default:
			data = '(' + format + ')';
			break;
		}
		if (tagnum === 0x927C) {	// MakerNote
			makerNoteOffset = utils.getLong(exif_data, offset+8, is_motorola);
			if (ifd.maker) {
				parseMaker(ifd.maker, exif_data, mp_length, is_motorola, makerNoteOffset, data, debug, output);
			}
		}
		if (debug) {
	//		output.push('Tag number 0x' + tagnum.toString(16).toUpperCase() + ' detected');
			output.push(mozutils.getFormattedPString('tagNumber', [tagnum.toString(16).toUpperCase()]));
	//		output.push('Tag format = ' + format + ' (' + TagFormats[format] + ')');
			output.push(mozutils.getFormattedPString('tagFormat', [format , mozutils.getPString(format < TagFormats.length ? TagFormats[format] : 'other')]));
	//		output.push('Tag count = ' + number_of_components);
			output.push(mozutils.getFormattedPString('tagCount', [number_of_components]));
	//		output.push('Tag data = ' + data);
			output.push(mozutils.getFormattedPString('tagData', [data]));
		}

		ifd['x' + hash] = data;
		switch (tagnum) {
		case 0x8769:	// Exif IFD: pointer to Exif SubIFD in IFD0
			ifd.subifd_offset = data;
			break;
		case 0x8825:	// GPS Info IFD Pointer
			ifd.gpsifd_offset = data;
			break;
		case 0xA005:	// Interoperability IFD Pointer
			ifd.iopifd_offset = data;
			break;
		}
		return;
	};	// getExifTagData()

	// 0 and 1 are the tag
	// 2 and 3 are the data type (0x0002 ==> ==> ascii string)
	// 4 through 7 are the number of components
	// 8 through 11 are the data if the # of components * component size <= 4
	// otherwise, they form a pointer to the site of the actual data
	getExifStringData = function _getExifStringData(exif_data, offset, is_motorola, debug) {
		var i, data = '', data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);
	/*
		if (debug) {
			utils.displayText('getExifStringData: # of components = ' + number_of_components);
			for (i = 4 ; i < 8 ; i += 1) {
				utils.displayText('getExifStringData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
			}
		}
	*/
		if (number_of_components <= 4) {
			for (i = 8 ; i <= 11 ; i += 1) {
				data += (exif_data[offset+i] !== 0 ? String.fromCharCode(exif_data[offset+i]) : '');	// was ';'
			}
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//		utils.displayText('getExifStringData: Data offset = ' + data_offset + '\n' + exif_data.length);
			if (data_offset + number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'String');
				return '???';
			}
			for (i = data_offset ; i < data_offset + 1 * number_of_components ; i += 1) {
	//			if (debug) { utils.displayText('getExifStringData: ' + i + ' ==> ' + exif_data[i].toString(16)); }
				if (exif_data[i] === 0) {
					data += '';	// was ';';
				} else {
					data += String.fromCharCode(exif_data[i]);
				}
	//			if (debug) { utils.displayText('getExifStringData: ' + data); }
			}
		}
		return utils.cleanExifStringData(data);
	};	// getExifStringData()

	getExifByteData = function _getExifByteData(exif_data, offset, is_motorola, debug) {
		var i, data = [], data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);
	/*
		if (debug) {
			utils.displayText('getExifByteData: # of components = ' + number_of_components);
			for (i = 4 ; i < 8 ; i += 1) {
				utils.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
			}
		}
	*/
		if (number_of_components <= 4) {
			data.push(utils.byteToHex(exif_data[offset+8]));
			data.push(utils.byteToHex(exif_data[offset+9]));
			data.push(utils.byteToHex(exif_data[offset+10]));
			data.push(utils.byteToHex(exif_data[offset+11]));
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
			if (data_offset + number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'Byte');
				return '0x21,0x21';
			}
	//		utils.displayText('getExifByteData: Data offset = ' + data_offset + '\n' + exif_data.length);
	//		if (data_offset >= exif_data.length) { return ['-1']; }
			for (i = data_offset ; i < data_offset + 1 * number_of_components ; i += 1) {
	//			if (debug) { utils.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[i].toString(16)); }
				data.push(utils.byteToHex(exif_data[i]));
	//			if (debug) { utils.displayText('getExifByteData: ' + data); }
			}
		}
		return data.join(',');
	};	// getExifByteData()

	getExifSignedByteData = function _getExifSignedByteData(exif_data, offset, is_motorola, debug) {
		var i, data = [], data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);
	/*
		if (debug) {
			utils.displayText('getExifByteData: # of components = ' + number_of_components);
			for (var i = 4 ; i < 8 ; i++) {
				utils.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
			}
		}
	*/
		if (number_of_components <= 4) {
			data.push(signedByte(exif_data[offset+8]));
			data.push(signedByte(exif_data[offset+9]));
			data.push(signedByte(exif_data[offset+10]));
			data.push(signedByte(exif_data[offset+11]));
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
			if (data_offset + number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'SignedByte');
				return '0x21,0x21';
			}
	//		utils.displayText('getExifSignedByteData: Data offset = ' + data_offset + '\n' + exif_data.length);
	//		if (data_offset >= exif_data.length) { return ['-1']; }
			for (i = data_offset ; i < data_offset + 1 * number_of_components ; i += 1) {
	//			if (debug) { utils.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[i].toString(16)); }
				data.push(signedByte(exif_data[i]));
			//	if (debug) { utils.displayText('getExifByteData: ' + data); }
			}
		}
		return data.join(',');
	};	// getExifSignedByteData()

	getExifLongData = function _getExifLongData(exif_data, offset, is_motorola, debug) {
		var i, data = [], data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);

		if (number_of_components === 1) {
			 return utils.getLong(exif_data, offset+8, is_motorola);
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//		utils.displayText('getExifLongData: Data offset = ' + data_offset + '\n' + exif_data.length);
			if (data_offset + 4 * number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'Long');
				return '0x01,0x01';
			}
			for (i = 0 ; i < number_of_components ; i += 1) {
				data.push(utils.getLong(exif_data, data_offset, is_motorola));
				data_offset += 4;
			}
		}
		return data.join(',');
	};	// getExifLongData()

	getExifSignedLongData = function _getExifSignedLongData(exif_data, offset, is_motorola, debug) {
		var i, data = [], data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);

		if (number_of_components === 1) {
			 return utils.getSignedLong(exif_data, offset+8, is_motorola);
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//		utils.displayText('getExifSignedLongData: Data offset = ' + data_offset + '\n' + exif_data.length);
			if (data_offset + 4 * number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'SignedLong');
				return '0x01,0x01';
			}
			for (i = 0 ; i < number_of_components ; i += 1) {
				data.push(utils.getSignedLong(exif_data, data_offset, is_motorola));
				data_offset += 4;
			}
		}
		return data.join(',');
	};	// getExifSignedLongData()

	getExifRationalData = function _getExifRationalData(exif_data, offset, is_motorola, debug) {
		var i, data = [], numerator, denominator,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola),
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//	if (debug) { utils.displayText('getExifRationalData: # of components = ' + number_of_components); }
	//	utils.displayText('getExifRationalData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + 8 * number_of_components > exif_data.length) {
			offsetError(data_offset, number_of_components, exif_data.length, 'Rational');
			return '-1/1';
		}
		for (i = 0 ; i < number_of_components ; i++) {
			numerator = utils.getLong(exif_data, data_offset, is_motorola);
			denominator = utils.getLong(exif_data, data_offset+4, is_motorola);
			data.push(numerator + '/' + denominator);
			data_offset += 8;
		}
		return data.join(',');
	};	// getExifRationalData()

	getExifSignedRationalData = function _getExifSignedRationalData(exif_data, offset, is_motorola, debug) {
		var i, data = [], numerator, denominator,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola),
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//	if (debug) { utils.displayText('getExifRationalData: # of components = ' + number_of_components); }
	//	utils.displayText('getExifSignedRationalData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + 8 * number_of_components > exif_data.length) {
			offsetError(data_offset, number_of_components, exif_data.length, 'SignedRational');
			return '-1/1';
		}
		for (i = 0 ; i < number_of_components ; i += 1) {
			numerator = utils.getSignedLong(exif_data, data_offset, is_motorola);
			denominator = utils.getSignedLong(exif_data, data_offset+4, is_motorola);
			data.push(numerator + '/' + denominator);
			data_offset += 8;
		}
		return data.join(',');
	};	// getExifSignedRationalData()

	getExifShortData = function _getExifShortData(exif_data, offset, is_motorola, debug) {
		var i, data = [], data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);

		if (number_of_components === 1) {
			 return utils.getShort(exif_data, offset+8, is_motorola);
		} else if (number_of_components === 2) {
			data.push(utils.getShort(exif_data, offset+8, is_motorola));
			data.push(utils.getShort(exif_data, offset+10, is_motorola));
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//		utils.displayText('getExifShortData: Data offset = ' + data_offset + '\n' + exif_data.length);
			if (data_offset + 2 * number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'Short');
				return '-1';
			}
			for (i = 0 ; i < number_of_components ; i += 1) {
				data.push(utils.getShort(exif_data, data_offset, is_motorola));
				data_offset += 2;
			}
		}
		return data.join(',');
	};	// getExifShortData()

	getExifSignedShortData = function _getExifSignedShortData(exif_data, offset, is_motorola, debug) {
		var i, data = [], data_offset,
			number_of_components = utils.getLong(exif_data, offset+4, is_motorola);

		if (number_of_components == 1) {
			 return utils.getSignedShort(exif_data, offset+8, is_motorola);
		} else if (number_of_components == 2) {
			data.push(utils.getSignedShort(exif_data, offset+8, is_motorola));
			data.push(utils.getSignedShort(exif_data, offset+10, is_motorola));
		} else {
			data_offset = utils.getLong(exif_data, offset+8, is_motorola);
	//		utils.displayText('getExifSignedShortData: Data offset = ' + data_offset + '\n' + exif_data.length);
			if (data_offset + 2 * number_of_components > exif_data.length) {
				offsetError(data_offset, number_of_components, exif_data.length, 'SignedShort');
				return '-1';
			}
			for (i = 0 ; i < number_of_components ; i += 1) {
				data.push(utils.getSignedShort(exif_data, data_offset, is_motorola));
				data_offset += 2;
			}
		}
		return data.join(',');
	};	// getExifSignedShortData()

	offsetError = function _offsetError(data_offset, number_of_components, buffer_length, routine) {
		// too many "spurious" error messages
		//logging.log(routine + '\nOffset = 0x' + data_offset.toString(16) + '\nComponents = 0x' + number_of_components.toString(16) + '\nLength = ' + buffer_length);
	};	// offsetError()

	parseIFD = function _parseIFD(ifd, mp_length, exif_data, offset, is_motorola, debug, output) {
		var error_num = constants.OK, number_of_tags,
			tn_offset, tn_length;

	//	if (debug)  output.push('IFD scan starting: ' + ifd.type);
		if (debug) { output.push(mozutils.getFormattedPString('ifdScan', [ifd.type])); }

		if (offset > mp_length - 2) {
			output.push(mozutils.getPString('offsetPointsOutside'));
			error_num = constants.OFFSET_POINTS_OUTSIDE;
		}
		if (debug) { output.push('parseIFD: offset = ' + offset); }

		if (error_num === 0) {
	//		Get the number of directory entries contained in this IFD
			number_of_tags = utils.getShort(exif_data, offset, is_motorola);
			ifd.number_of_tags = number_of_tags;
			if (number_of_tags === 0  ||  number_of_tags > 1000) {	// second part is a work-around for some JPEGs rotated by MS Photo Viewer 
				output.push(mozutils.getPString('noDirectoryEntries'));
				error_num = constants.NO_DIRECTORY_ENTRIES;
			} else {
	//			output.push(number_of_tags + ' directory entries (tags) found');
				output.push(mozutils.getFormattedPString('numberOfTags', [number_of_tags]));
				offset += 2;
			}
		}

		if (error_num === constants.OK) {
			while (error_num === constants.OK) {
				if (offset > mp_length - 12) {
					output.push(mozutils.getPString('beyondEnd'));
					error_num = constants.BEYOND_END;
				} else {
	//				alert(mp_length + '\n' + exif_data.length + '\n' + offset);
					getExifTagData(ifd, mp_length, exif_data, offset, is_motorola, debug, output);
					offset += 12;
					number_of_tags -= 1;
					if (number_of_tags === 0) {
						if (debug) { output.push(mozutils.getPString('noMoreDirectories')); }
						if (ifd.type === 'IFD0') { ifd.ifd1_offset = utils.getLong(exif_data, offset, is_motorola); }
					//	if (debug) { output.push('IFD1 offset = ' + ifd.ifd1_offset); }
						if (debug) { output.push(mozutils.getFormattedPString('ifd1Offset', [ifd.ifd1_offset]));}
						break;
					}
				}
			}
		}
		if (constants.isMoz  &&  ifd.type === 'IFD1'  &&  ifd.x0103  &&  ifd.x0201  &&  ifd.x0202) {
			if (ifd.x0103 === 6) {	// compression ==> thumbnail is JPEG image
				tn_offset = ifd.x0201;
				tn_length = ifd.x0202;
				if (tn_offset + tn_length <= exif_data.length) {
					ifd.thumbnail = exif_data.slice(tn_offset, tn_offset + tn_length);
				}
			}
		}
		if (debug) { output.push(mozutils.getPString('ifdScanCompleted')); }
		ifd.status = error_num;
		return error_num;
	};	// parseIFD()
	
	initializeMaker = function _initializeMaker(make, model, subifd) {
		var makeTitles = {
				'AGFA' : 'Agfa' , 'ASAHI' : 'Asahi' , 
				'CANON' : 'Canon' , 'CASIO' : 'Casio', 'CONTAX' : 'Contax' , 
				'EPSON' : 'Epson' , 
				'FUJIFILM' : 'Fujifilm' , 
				'HEWLETT-PACKARD' : 'Hewlett-Packard' , 'HP' : 'Hewlett-Packard' , 
				'JVC' : 'JVC' , 
				'KODAK' : 'Kodak' , 'KONICA' : 'Konica' , 'KYOCERA' : 'Kyocera' , 
				'MINOLTA' : 'Minolta' , 
				'NIKON' : 'Nikon' ,
				'OLYMPUS' : 'Olympus' , 
				'PANASONIC' : 'Panasonic' , 'PENTAX' : 'Pentax' ,
				'RICOH' : 'Ricoh' , 
				'SAMSUNG' : 'Samsung' , 'SANYO' : 'Sanyo' , 'SIGMA' : 'Sigma' , 'SONY' : 'Sony' , 
				'TOSHIBA' : 'Toshiba'
			},
			parseFunctions = {
				'AGFA' : 		makers.dumpAgfaTagData ,
				'ASAHI' :		makers.dumpPentaxAsahiTagData ,
				'CANON' : 		makers.dumpCanonTagData ,
				'CASIO' : 		makers.dumpCasioTagData ,
				'CONTAX' :		makers.dumpKyoceraContaxTagData ,
				'EPSON' : 		makers.dumpEpsonTagData ,
				'FUJIFILM' : 	makers.dumpFujifilmTagData , 
				'KONICA' :		makers.dumpKonicaMinoltaTagData ,
				'KYOCERA' :		makers.dumpKyoceraContaxTagData ,
				'MINOLTA' :		makers.dumpKonicaMinoltaTagData ,
				'NIKON' : 		makers.dumpNikonTagData ,
				'OLYMPUS' : 	makers.dumpOlympusTagData ,
				'PANASONIC' : 	makers.dumpPanasonicTagData ,
				'PENTAX' :		makers.dumpPentaxAsahiTagData,
				'SANYO' :		makers.dumpSanyoTagData,
				'Surveylab Ltd (www.ikegps.com)': utils.dumpIKETagData
			},
			make_match = make.replace(/ .*$/, '').toUpperCase();

		subifd.make = make;
		subifd.model = model;

		switch (make_match) {
	//	case 'AGFA':
	//	case 'ASAHI':
		case 'CANON':
		case 'CASIO':
	//	case 'CONTAX':
	//	case 'EPSON':
		case 'FUJIFILM':
	//	case 'KONICA':
	//	case 'KYOCERA':
	//	case 'MINOLTA':
		case 'NIKON':	// also 'NIKON CORPORATION'
		case 'OLYMPUS': // also 'OLYMPUS IMAGING CORP.  '
		case 'PANASONIC':
	//	case 'PENTAX':
	//	case 'RICOH':
		case 'SANYO':
	//	case 'SONY':
			subifd.maker = {};
			subifd.maker.type = 'Maker';
			subifd.maker.format = 'IFD';
			subifd.maker.make = make;
			subifd.maker.make_match = make_match;
			subifd.maker.make_title = makeTitles[make_match];
			subifd.maker.model = model;
			subifd.maker.parseFunction = parseFunctions[make_match];
			break;
		default:
			// nothing to do
			break;
		}
	};	 // initializeMaker()

	parseMaker = function _parseMaker(maker, exif_data, mp_length, is_motorola, makerNoteOffset, data, debug, output) {
		var mn_buffer_length, data_buffer, makerNoteStartOffset, is_motorola_mn, status;

		switch (maker.make_match) {
		case 'AGFA':
			if (data.indexOf('0x41,0x47,0x46,0x41,0x00,0x01') === 0) { // 'AGFA' at start
				makerNoteStartOffset = makerNoteOffset + 8; // skip label
			} else {
				output.push('Agfa label not found');
				logging.alert('An unrecognized Agfa maker-note format was found.');
				maker = null;
			}
			break;
		case 'ASAHI':
		case 'PENTAX':
			if (data.indexOf('0x41,0x4f,0x43,0x00') === 0) { // 'AOC' at start
				makerNoteStartOffset = makerNoteOffset + 6; // skip label + 2 bytes
				maker.maker_type = 2;
			} else {
				makerNoteStartOffset = makerNoteOffset + 0;
				maker.maker_type = 1;
			}
			break;
		case 'CANON':
			makerNoteStartOffset = makerNoteOffset + 0;
			break;
		case 'CASIO':
			if (data.indexOf('0x51,0x56,0x43,0x00,0x00,0x00') === 0) { // 'QVC' at start
				makerNoteStartOffset = makerNoteOffset + 6; // skip label
				maker.maker_type = 2;
			} else {
				makerNoteStartOffset = makerNoteOffset + 0;
				maker.maker_type = 1;
			}
			break;
		case 'EPSON':
			if (data.indexOf('0x45,0x50,0x53,0x4f,0x4e,0x00,0x01,0x00') === 0) { // 'EPSON' at start
				makerNoteStartOffset = makerNoteOffset + 8; // skip label
			} else {
				output.push('Epson label not found');
				logging.alert('An unrecognized Epson maker-note format was found.');
				maker = null;
			}
			break;
		case 'KONICA':
		case 'MINOLTA':
			if (data.indexOf('0x4d,0x4c,0x59') === 0  ||  data.indexOf('0x4b,0x43') === 0  
					||  data.indexOf('0x2b,0x4d,0x2b,0x4d,0x2b,0x4d,0x2b,0x4d') === 0  ||  data.indexOf('0x4d,0x49,0x4e,0x4f,0x4c') === 0) {
				output.push('Unknown Konica/Minolta maker note format');			// types 1 (MLY), 2 (KC), 3 (+M+M+M+M), and 4 (MINOL), respectively
				logging.alert('An unrecognized Konica/Minolta maker-note format was found.');
				maker = null;
			} else {
				makerNoteStartOffset = makerNoteOffset + 0;
				maker.maker_type = 5;
			}
			break;
		case 'KYOCERA':
		case 'CONTAX':
			if (data.indexOf('0x4b,0x59,0x4f,0x43,0x45,0x52,0x41,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x00,0x00,0x00') === 0) { // 'KYOCERA            ' at start
				makerNoteStartOffset = makerNoteOffset + 22; // skip label
			} else {
				output.push('Kyocera label not found');
				logging.alert('An unrecognized Kyocera maker-note format was found.');
				maker = null;
			}
			break;
		case 'NIKON':
			if (data.indexOf('0x4e,0x69,0x6b,0x6f,0x6e,0x00,0x01,0x00') === 0) {	// 'Nikon' at start? 
				makerNoteStartOffset = makerNoteOffset + 8;	// skip label
				maker.maker_type = 1;
			} else if (data.indexOf('0x4e,0x69,0x6b,0x6f,0x6e,0x00,0x02,0x00,0x00,0x00') == 0
					||  data.indexOf('0x4e,0x69,0x6b,0x6f,0x6e,0x00,0x02,0x10,0x00,0x00') === 0) {	// 'Nikon' at start?
	//			alert('3: ' + data.replace(/,/g, ' ').substr(0, 4000));
	//			makerNoteStartOffset = makerNoteOffset + 18;	// skip label and TIFF header stuff
				makerNoteStartOffset = 8;
				maker.maker_type = 3;
			} else {
				makerNoteStartOffset = makerNoteOffset + 0;
				maker.maker_type = 2;
			}
			break;
		case 'OLYMPUS':
			if (data.indexOf('0x4f,0x4c,0x59,0x4d,0x50,0x00,0x01') !== 0  &&  data.indexOf('0x4f,0x4c,0x59,0x4d,0x50,0x00,0x02') !== 0) {	// 'OLYMP' at start?
				output.push('Olympus label not found');
				logging.alert('An unrecognized Olympus maker-note format was found.');
				maker = null;
			} else {
				makerNoteStartOffset = makerNoteOffset + 8;
			}
			break;
		case 'FUJIFILM':
			if (data.indexOf('0x46,0x55,0x4a,0x49,0x46,0x49,0x4c,0x4d') !== 0) {	// 'FUJIFILM' at start
				output.push('Fujifilm label not found');
				logging.alert('An unrecognized Fujifilm maker-note format was found.');
				maker = null;
			} else {
				makerNoteStartOffset = -1;	// see below
			}
			break;
		case 'PANASONIC':
			if (data.indexOf('0x50,0x61,0x6e,0x61,0x73,0x6f,0x6e,0x69,0x63,0x00,0x00,0x00') !== 0) {	// 'Panasonic' at start
				output.push('Panasonic label not found');		// e.g. 'MKED'
				logging.alert('An unrecognized Panasonic maker-note format was found.');
				maker = null;
			} else {
				makerNoteStartOffset = makerNoteOffset + 12;
			}
			break;
		case 'RICOH':
			if (data.indexOf('0x52,0x49,0x43,0x4f,0x48') === 0  ||  data.indexOf('0x52,0x69,0x63,0x6f,x68') === 0) {	// 'RICOH' or 'Ricoh'
				maker.maker_type = 3;
				makerNoteStartOffset = makerNoteOffset + 8;
			} else if (data.indexOf('0x52,0x76') === 0) {	// Rv
				maker.maker_type = 1;
				maker.format = 'text';
				maker.text = utils.bytesToString(data.substr(2 * 5))
			} else if (data.indexOf('0x52,0x65,0x76') === 0) {	// Rev
				maker.maker_type = 1;
				maker.format = 'text';
				maker.text = utils.bytesToString(data.substr(3 * 5))
			} else {
				output.push('Ricoh maker note cannot be parsed');	// 'Rv' or 'Rev' for type 1, nothing for type 2 
				logging.alert('An unrecognized Ricoh maker-note format was found.');
				maker = null;
			}
			break;
		case 'SANYO':
			makerNoteStartOffset = makerNoteOffset + 8;
			break;
		case 'SONY':
			if (data.indexOf('0x53,0x4f,0x4e,0x59,0x20,0x43,0x41,0x4d,0x20,0x00,0x00,0x00') !== 0  &&  data.indexOf('0x53,0x4f,0x4e,0x59,0x20,0x44,x53,0x43,0x20,0x00,0x00,0x00') !== 0) {	// 'SONY CAM ' or 'SONY DSC ' at start?
				output.push('Sony label not found');
				logging.alert('An unrecognized Sony maker-note format was found.');
				maker = null;
			} else {
				makerNoteStartOffset = makerNoteOffset + 12;
			}
			break;
		}
		
		if (!maker)  return;

		switch (maker.make_match) {
		case 'CASIO':
			data_buffer = exif_data;
			mn_buffer_length = mp_length;
			is_motorola_mn = 1;	// Motorola
			break;
		case 'KYOCERA':
		case 'CONTAX':
			data_buffer = [];
			utils.hexBytesToBuffer(data.substr(22 * 5), data_buffer);
			mn_buffer_length = data_buffer.length;
			is_motorola_mn = is_motorola;
			break;
		case 'NIKON':
			if (maker.maker_type == 3) {
				data_buffer = [];
				utils.hexBytesToBuffer(data.substr(10 * 5), data_buffer);
				mn_buffer_length = data_buffer.length;
				if (data.indexOf('0x49,0x49') === 10 * 5) {
					is_motorola_mn = 0;	// Intel
				} else if (data.indexOf('0x4d,0x4d') === 10 * 5) {
					is_motorola_mn = 1;	// Motorola
				} else {
					is_motorola_mn = is_motorola;
				}
			} else {
				data_buffer = exif_data;
				mn_buffer_length = mp_length;
				is_motorola_mn = is_motorola;
			}
			break;
		case 'RICOH':
			if (maker.maker_type === 3) {
				data_buffer = exif_data;
				mn_buffer_length = mp_length;
				is_motorola_mn = 1; // Motorola
			} else {
				maker = null;
			}
			break;
		case 'ASAHI':	// offsets are relative to start of IFD!
		case 'PENTAX':
			data_buffer = [];
			if (maker.maker_type === 1) {
				utils.hexBytesToBuffer(data, data_buffer);
			} else {
				utils.hexBytesToBuffer(data.substr(6 * 5), data_buffer);
			}
			mn_buffer_length = data_buffer.length;
			is_motorola_mn = is_motorola;
			break;
		case 'AGFA':
		case 'CANON':
		case 'EPSON':
		case 'KONICA':
		case 'MINOLTA':
		case 'OLYMPUS':
		case 'PANASONIC':
		case 'SANYO':
		case 'SONY':
			data_buffer = exif_data;
			mn_buffer_length = mp_length;
			is_motorola_mn = is_motorola;
			break;
		case 'FUJIFILM':	// offsets are relative to start of Maker Note!
			data_buffer = [];
			utils.hexBytesToBuffer(data, data_buffer);
			mn_buffer_length = data_buffer.length;
			is_motorola_mn = 0;	// Intel
			makerNoteStartOffset = utils.getLong(data_buffer, 8, is_motorola_mn);
			break;
		}
		if (maker) {
			switch (maker.format) {
			case 'IFD':
				status = parseIFD(maker, mn_buffer_length, data_buffer, makerNoteStartOffset, is_motorola_mn, debug, output);
				maker.status = status;
				break;
			case 'text':
				break;
			default:
				maker.status = constants.INVALID_MAKER_FORMAT;
				break;
			}
		}
	};	// parseMaker()

	dumpExifMakerTagData = function _dumpExifMakerTagData(maker, output, is_motorola, divName, bTable) {
		var header;

		switch (maker.make_match) {
		case 'AGFA':
		case 'ASAHI':
		case 'CANON':
		case 'CONTAX':
		case 'CASIO':
		case 'EPSON':
		case 'FUJIFILM':
		case 'KONICA':
		case 'KYOCERA':
		case 'MINOLTA':
		case 'NIKON':
		case 'OLYMPUS':
		case 'PANASONIC':
		case 'PENTAX':
		case 'RICOH':
		case 'SANYO':
		case 'SONY':
			header = '<h2>' + maker.make_title + ' Maker Note' 
						+ (maker.maker_type && maker.maker_type > 0 ? ' (type ' + maker.maker_type + ')': '') + '</h2>';
			switch (maker.format) {
			case 'IFD':
				maker.parseFunction(maker, output, is_motorola);
				if (output.length > 0)  {
					utils.displayText(header, divName);
	//				utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName);
					utils.dumpAssembledExifData(output, divName, bTable);
				}
				break;
			case 'text':
				if (maker.text) {
					utils.displayText(header, divName);
					utils.displayText('<p>' + maker.text + '</p>');
				}
				break;
			}
			output.length = 0;
			break;
		}
	};	// dumpExifMakerTagData()
	
	return {
		getExifTagData: getExifTagData,
		parseIFD: parseIFD,
		initializeMaker: initializeMaker,
		dumpExifMakerTagData: dumpExifMakerTagData
	};
}, ['constants', 'utils', 'moz-utils', 'makers', 'logging']);;ExifViewerApp.add('globals', function _globals() {
	'use strict';
	var globals = {};
	
	return globals;
}, []);;ExifViewerApp.add('histogram', function _histogram(globals, mozutils, logging) {
	'use strict';

	var canvasRGB, canvasHue, canvasSat, canvasLum, contextRGB, contextHue, contextSat, contextLum,
		image = document.createElement('img'),
		imageData, iMaxHue,
		red = [], green = [], blue = [], grey = [], 
		hue = [], sat = [], lum = [],
		N_RGB = 255, N_HUE = 360, N_SAT = 100, N_LUM = 100,
		SCALEX_RGB = 2, SCALEY_RGB = 2, 
		SCALEX_HUE = 1.5, SCALEY_HUE = 2,
		SCALEX_SAT = 2.5, SCALEY_SAT = 2,
		SCALEX_LUM = 2.5, SCALEY_LUM = 2,
		MAX_HUE = N_HUE * SCALEX_HUE,
		MAX_SAT = N_SAT * SCALEX_SAT,
		MAX_LUM = N_LUM * SCALEX_LUM;
		
	image.setAttribute('crossOrigin', 'Anonymous');	// needed to avoid canvas tainting for Basilisk 2018.01.05
	
	function incrColour(colour, index) {
		colour[imageData[index]] += 1;
	}	// incrColour()
	
	function incrGrey(grey, i) {
		var r = imageData[i],
			g = imageData[i+1],
			b = imageData[i+2];
			
		if (r === g  &&  g === b) {
			grey[r] += 1;
		}
	}	// incrGrey();

	function incrHSL(hue, sat, lum, index) {
		var r = imageData[index],
			g = imageData[index + 1],
			b = imageData[index + 2],
			M = Math.max(r, g, b), 
			m = Math.min(r, g, b), 
			c = M - m,
			l = (M + m) / 2 / N_RGB,
			s = (l === 1  ||  l === 0 ? 0 : c / N_RGB / (1 - Math.abs(2 * l - 1))),
			h, hp;

		if (c === 0) {	// greys
			hp = 6;
		} else if (M === r) {
			hp = ((g - b) / c + 6) % 6;
		} else if (M === g) {
			hp = (b - r) / c + 2;
		} else {	// M === b
			hp = (r - g) / c + 4;
		}
		h = Math.round(MAX_HUE * hp / 6);
		l = Math.round(MAX_LUM * l);
		s = Math.round(MAX_SAT * s);
		hue[h] += 1;
		sat[s] += 1;
		lum[l] += 1;
	}	// incrHSL()
	
	function drawColour(colour, style) {
		var i;
		for (i = 0 ; i <= N_RGB ; i += 1) {
			contextRGB.beginPath();
			contextRGB.fillStyle = style;
			contextRGB.fillRect(SCALEX_RGB * i, canvasRGB.height, SCALEX_RGB, - canvasRGB.height * colour[i]);
		}		
	}	// drawColour()

	function drawHue(hue) {
		var i;
		for (i = 0 ; i <= MAX_HUE ; i += 1) {
			contextHue.beginPath();
			if (i !== MAX_HUE) {
				contextHue.fillStyle = 'hsl(' + i/SCALEX_HUE + ', 100%, 50%)';
			} else {
				contextHue.fillStyle = '#ffffff';
			}
			contextHue.fillRect(/*SCALEX_HUE * */ i, canvasHue.height, 1/*SCALEX_HUE*/,  - canvasHue.height * hue[i]);
		}		
	}	// drawHue()
	
	function drawSat(sat, styleHue) {
		var i;
		for (i = 0 ; i <= MAX_SAT ; i += 1) {
			contextSat.beginPath();
			contextSat.fillStyle = 'hsl(' + styleHue + ', ' + (i/SCALEX_SAT) + '%, 50%)';
			contextSat.fillRect(/*SCALEX_SAT **/ i, canvasSat.height, 1/*SCALEX_SAT*/,  - canvasSat.height * sat[i]);
		}		
	}	// drawSat()
	
	function drawLum(lum, styleHue) {
		var i;
		for (i = 0 ; i <= MAX_LUM ; i += 1) {
			contextLum.beginPath();
			contextLum.fillStyle = 'hsl(' + styleHue + ', 100%, ' + (i/SCALEX_LUM) + '%)';
			contextLum.fillRect(/*SCALEX_LUM **/ i, canvasLum.height, 1/*SCALEX_LUM*/,  - canvasLum.height * lum[i]);
		}		
	}	// drawLum()

	function init() {
		var i, imax;
		for (i = 0 ; i <= N_RGB ; i += 1) {
			red[i] = 0;
			green[i] = 0;
			blue[i] = 0;
			grey[i] = 0;
		}
		for (i = 0 ; i <= MAX_HUE ; i += 1) {
			hue[i] = 0;
		}

		for (i = 0 ; i <= MAX_SAT ; i += 1) {
			sat[i] = 0;
		}
		for (i = 0 ; i <= MAX_LUM ; i += 1) {
			lum[i] = 0;
		}
		
		canvasRGB.title = mozutils.getPString('rgbTitle');
		canvasHue.title = mozutils.getPString('hueTitle');
		canvasSat.title = mozutils.getPString('satTitle');
		canvasLum.title = mozutils.getPString('lumTitle');
		document.getElementById('rgbHistogram').appendChild(canvasRGB);
		document.getElementById('hslHistogram').appendChild(canvasHue);
		document.getElementById('hslHistogram').appendChild(document.createElement('br'));
		document.getElementById('hslHistogram').appendChild(canvasSat);
		//document.getElementById('hslHistogram').appendChild(document.createTextNode(' '));
		document.getElementById('hslHistogram').appendChild(canvasLum);
	}	// init()

	function analyseImage() {
		var canvas = document.createElement('canvas'),	// for binning (always hidden)
			context = canvas.getContext('2d'),
			maxColour = 0, maxHue = 0, maxSat = 0, maxLum = 0,
			size, i, imax;

		canvas.width = image.width;
		canvas.height = image.height;
		size = canvas.width * canvas.height * 4;
		context.drawImage(image, 0, 0);
		
		imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
		for (i = 0 ; i < size ; i += 4) {
			incrColour(red, i);
			incrColour(green, i + 1);
			incrColour(blue, i + 2);
			incrGrey(grey, i);
			incrHSL(hue, sat, lum, i);
		}

		for (i = 0 ; i <= N_RGB ; i += 1) {
			if (red[i] > maxColour) { maxColour = red[i]; }
			if (green[i] > maxColour) { maxColour = green[i]; }
			if (blue[i] > maxColour) { maxColour = blue[i]; }
			if (grey[i] > maxColour) { maxColour = grey[i]; }
		}
		for (i = 0 ; i <= N_RGB ; i += 1) {
			red[i] /= maxColour;
			green[i] /= maxColour;
			blue[i] /= maxColour;
			grey[i] /= maxColour;
		}

		for (i = 0 ; i <= MAX_HUE ; i += 1) {
			if (hue[i] > maxHue) {
				maxHue = hue[i];
				iMaxHue = i;
			}
		}
		for (i = 0 ; i <= MAX_HUE ; i += 1) {
			hue[i] /= maxHue;
		}

		for (i = 0 ; i <= MAX_SAT ; i += 1) {
			if (sat[i] > maxSat) { maxSat = sat[i]; }
		}
		for (i = 0 ; i <= MAX_SAT ; i += 1) {
			sat[i] /= maxSat;
		}

		for (i = 0 ; i <= MAX_LUM ; i += 1) {
			if (lum[i] > maxLum) { maxLum = lum[i]; }
		}
		for (i = 0 ; i <= MAX_LUM ; i += 1) {
			lum[i] /= maxLum;
		}
	}	// analyseImage()
			
	function drawHistograms() {
		canvasRGB.width = SCALEX_RGB * (N_RGB + 1);
		canvasRGB.height = 100 * SCALEY_RGB;
		contextRGB.fillStyle = '#000000';
		contextRGB.fillRect(0, 0, canvasRGB.width, canvasRGB.height);

		contextRGB.globalCompositeOperation = 'lighter';
		drawColour(red, '#FF0000');
		drawColour(green, '#00FF00');
		drawColour(blue, '#0000FF');

		contextRGB.globalCompositeOperation = 'source-over';
		drawColour(grey, '#7F7F7F');
		
		canvasHue.width = MAX_HUE + 1;
		canvasHue.height = 100 * SCALEY_HUE;
		contextHue.fillStyle = '#000000';
		contextHue.fillRect(0, 0, canvasHue.width, canvasHue.height);
		drawHue(hue);

		canvasSat.width = MAX_SAT + 1;
		canvasSat.height = 100 * SCALEY_SAT;
		contextSat.fillStyle = '#000000';
		contextSat.fillRect(0, 0, canvasSat.width, canvasSat.height);
		drawSat(sat, iMaxHue / SCALEX_HUE);

		canvasLum.width = MAX_LUM + 1;
		canvasLum.height = 100 * SCALEY_LUM;
		contextLum.fillStyle = '#000000';
		contextLum.fillRect(0, 0, canvasLum.width, canvasLum.height);
		drawLum(lum, iMaxHue / SCALEX_HUE);

		logging.log('Histogram: done');
	}	// drawHistograms()
	
	function start(url)  {
		if (!globals.isWebExt) { return; }

		logging.log('Histogram: starting');
		init();
		image.addEventListener('load', function () {
			analyseImage();
			drawHistograms();
		});
		image.addEventListener('error', function () {
			logging.log('Histogram: image error');
		});
		image.src = url;
	}	// start()
	
	canvasRGB = document.createElement('canvas');
	canvasHue = document.createElement('canvas');
	canvasSat = document.createElement('canvas');
	canvasLum = document.createElement('canvas');
	
	if (canvasRGB  &&  canvasRGB.getContext) {
		contextRGB = canvasRGB.getContext('2d');
	}
	if (canvasHue  &&  canvasHue.getContext) {
		contextHue = canvasHue.getContext('2d');
	}
	if (canvasSat  &&  canvasSat.getContext) {
		contextSat = canvasSat.getContext('2d');
	}
	if (canvasLum  &&  canvasLum.getContext) {
		contextLum = canvasLum.getContext('2d');
	}

	return {
		start: start,
		draw: drawHistograms
	};
}, ['globals', 'moz-utils', 'logging']);;ExifViewerApp.add('html', function _html() {
	'use strict';

	function tn(text) {
		return document.createTextNode(text);
	}	// tn()
	
	function ul() {
		return document.createElement('ul');
	}	// ul()

	function li(text) {
		var li = document.createElement('li');
			
		li.appendChild(tn(text));
		return li;
	}	// li()
	
	function table() {
		var t = document.createElement('table');
		
		return t;
	}	// table()

	function trow_dd(text1, text2) {
		var tr = document.createElement('tr'),
			td1 = document.createElement('td'),
			td2 = document.createElement('td');
		
		td1.appendChild(tn(text1));
		td2.appendChild(tn(text2));
		tr.appendChild(td1);
		tr.appendChild(td2);
		return tr;
	}	// trow_dd()
	
	function trow_hd(text1, text2) {
		var tr = document.createElement('tr'),
			th = document.createElement('th'),
			td = document.createElement('td');
		
		th.appendChild(tn(text1));
		td.appendChild(tn(text2));
		tr.appendChild(th);
		tr.appendChild(td);
		return tr;
	}	// trow_hd()
	
	function link(text, href, id, name, target) {
		var a = document.createElement('a');
		
		a.setAttribute('href', href);
		if (id) {
			a.setAttribute('id', id);
		}
		if (name) {
			a.setAttribute('name', name);
		}
		if (target) {
			a.setAttribute('target', target);
		}
		a.appendChild(tn(text));
		return a;
	}	// link()
	
	function h2(text) {
		var h2 = document.createElement('h2');
			
		h2.appendChild(tn(text));
		return h2;
	}	// h2()

	function p(text) {
		var p = document.createElement('p');
			
		p.appendChild(tn(text));
		return p;
	}	// p()
	
	function img(url) {
		var img = document.createElement('img');
		
		img.setAttribute('src', url);
		return img;
	}	// img()
	
	function pre(text) {
		var pre = document.createElement('pre');
			
		pre.appendChild(tn(text));
		return pre;
	}	// pre()
	
	function span(text) {
		var span = document.createElement('span');
			
		span.appendChild(tn(text));
		return span;
	}	// span()

	function br() {
		return document.createElement('br');
	}	// br()
	
	function b(text) {
		var b = document.createElement('b');
			
		b.appendChild(tn(text));
		return b;
	}	// b()
	
	return {
		b: b,
		br: br,
		h2: h2,
		img: img,
		li: li,
		link: link,
		p: p,
		pre: pre,
		span: span,
		table: table,
		tn: tn,
		trow_dd: trow_dd,
		trow_hd: trow_hd,
		ul: ul,
	};
}, []);;ExifViewerApp.add('ike', function _ike(constants, utils) {
	'use strict';
	function processIKEdata(data, output) {
		var ikedata, tmp, 
			out = ['Maker Note (ikeGPS)'];

		function dopStatus(dop) {
			dop = window.parseFloat(dop);
			if (dop < 1)  return 'invalid';
			else if (dop === 1) { return 'ideal'; }
			else if (dop <= 2) { return 'excellent'; }
			else if (dop <= 5) { return 'good'; }
			else if (dop <= 10) { return 'moderate'; }
			else if (dop <= 20) { return 'fair'; }
			else return 'poor';
		}	// dopStatus()
	
		ikedata = utils.bytesToString(data);

		if (ikedata) {
			tmp = ikedata.split(',');
			// ikeDataV2,title,pitch,roll,PDOP,HDOP,DestinationAltitude
			// ikeDataV3,title,pitch,roll,PDOP,HDOP,DestinationAltitude,MeasuredHeight
			if (tmp[0] === 'ikeDataV2'  ||  tmp[0] === 'ikeDataV3') {
				out.push('Version = ' + tmp[0]);
				out.push('Title = ' + tmp[1].replace(/_/g, ','));
				out.push('Pitch = ' + tmp[2] + '&#176;');
				out.push('Roll = ' + tmp[3] + '&#176;');
				out.push('PDOP = ' + tmp[4] + ' (' + dopStatus(tmp[4]) + ')');
				out.push('HDOP = ' + tmp[5] + ' (' + dopStatus(tmp[5]) + ')');
				out.push('Destination Altitude = ' + tmp[6] + ' m');
			}
			if (tmp[0] === 'ikeDataV3') {
				out.push('Measured Height = ' + tmp[7] + (tmp[7] === ' '  ||  tmp[7].indexOf("'") !== -1 ? '' : ' m'));
			}
			output.push(out.join('<br>'));
		}
	}	// processIKEdata()
	
	return {
		processIKEdata: processIKEdata
	};
}, ['constants', 'utils']);;ExifViewerApp.add('iptc', function _iptc(constants, utils, moz, mozutils) {
	'use strict';

	function parseIPTC(iptc, buffer) {
		var recnum, dataset, len, len_len, key,
			//tagsfound = 0,
			i = 0, j, 
			mp_length = buffer.length;

		while (i < mp_length) {	// find first tag
			if (buffer[i] === 0x1C  &&  buffer[i+1] < 0x0F) { 
				break;
			} else {
				i += 1;
			}
		}

		while (i < mp_length) {
			if (buffer[i] !== 0x1C) {	// check tag marker
				break;	 // found data which does not conform to IPTC, so stop
			} 
			i += 1;
			if (i + 4 >= mp_length) {
				break;	// missing data, so stop
			}
	 
			recnum = buffer[i];
			i += 1;
			dataset = buffer[i];
			i += 1;
			if (buffer[i] & 0x80) {	// it's an extended tag
	//			var len2 = (buffer[i+2] << 24) + (buffer[i+3] << 16) + 
	//						(buffer[i+4] <<  8) + (buffer[i+5]);
	//			i += 6;
				len_len = ((buffer[i] & 0x7F) << 8) | buffer[i+1];
				i += 2;
				len = 0;

				if (i + len_len > mp_length) {
					break; 
				}
				for (j = 0 ; j < len_len ; j += 1) {
					len = (len << 8) | buffer[i+j]; 
				}
				i += len_len;
			} else { // it's a standard tag
				len = (buffer[i] << 8) | buffer[i+1];
				i += 2;
			}
			key = recnum + 'x' + dataset;
			if (i + len > mp_length) {
	//			iptc[key] = mozutils.getPString('lengthError');
				break;
			} else {
				if (iptc[key]) {
					iptc[key] += ' / ';
				} else {
					iptc[key] = '';
				}
				for (j = 0 ; j < len ; j++) {
					if (buffer[i+j] !== 0) {
						iptc[key] += String.fromCharCode(buffer[i+j]);
					}
				}
				i += len;
	//			tagsfound += 1;
			}
		}
		return 0;
	}	// parseIPTC()

	function dumpIptcData(divName, iptc, useTables) {
		var key,
			output = [];
		
		if (iptc.type !== 'IPTC'  ||  iptc.status !== 0) { return; }
		if (iptc.status !== 0) {
	//		utils.displayText('<p>' + mozutils.getPString('noIPTCdata') + '</p>', divName + '_iptc');
		} else {
			for (key in iptc) {
				switch (key) {
				case 'status':
				case 'type':
					// ignore
					break;
				//	output.push(mozutils.getFormattedPString(key, [window.escape(iptc[key])]));
				//	break;
				// string:
				case '1x5':
				case '1x30':
				case '1x40':
				case '1x50':
				case '1x60':
				case '1x100':
				case '2x3':
				case '2x4':
				case '2x5':
				case '2x7':
				case '2x8':
				case '2x10':
				case '2x12':
				case '2x15':
				case '2x20':
				case '2x22':
				case '2x25':
				case '2x26':
				case '2x27':
				case '2x40':
				case '2x42':
				case '2x45':
				case '2x50':
				case '2x65':
				case '2x70':
				case '2x75':
				case '2x80':
				case '2x85':
				case '2x90':
				case '2x92':
				case '2x95':
				case '2x100':
				case '2x101':
				case '2x103':
				case '2x105':
				case '2x110':
				case '2x115':
				case '2x116':
				case '2x118':
				case '2x120':
				case '2x122':
				case '2x130':
				case '2x131':
				case '2x135':
				case '2x150':
				case '2x151':
				case '2x152':
				case '2x153':
				case '2x154':
				case '7x10':
					//if (iptc['1x90']  &&  formatIPTC_binaryS(iptc['1x90']) === '27, 37, 71') {	// UTF-8
						output.push(mozutils.getFormattedPString(key, [utils.cleanUTF8StringData(iptc[key])]));
					//} else {
						//output.push(mozutils.getFormattedPString(key, [utils.cleanExifStringData(iptc[key])]));
					//}
					break;
				// CCYYMMDD (date):
				case '1x70':
				case '2x30':
				case '2x37':
				case '2x47':
				case '2x55':
				case '2x62':
					output.push(mozutils.getFormattedPString(key, [formatIPTC_CCYYMMDD(iptc[key])]));
					break;
				// HHMMSS_HHMM (time):
				case '1x80':
				case '2x35':
				case '2x38':
				case '2x60':
				case '2x63':
					output.push(mozutils.getFormattedPString(key, [formatIPTC_HHMMSS_HHMM(iptc[key])]));
					break;
				// binary (number):
				case '1x0':
				case '1x20':
				case '1x22':
				case '1x120':
				case '1x122':
				case '2x0':
				case '2x200':
				case '2x201':
				case '7x20':
				case '7x90':
				case '7x95':
				case '9x10':
					output.push(mozutils.getFormattedPString(key, [formatIPTC_binaryN(iptc[key])]));
					break;
				// binary (stream):
				case '1x90':
				case '2x125':
				case '2x202':
				case '8x10':
					output.push(mozutils.getFormattedPString(key, [formatIPTC_binaryS(iptc[key])]));
					break;
				default:
					output.push(mozutils.getFormattedPString('unknownIPTC', [key.replace(/x/, '/') , window.escape(iptc[key])]));
					break;
				}
			}
			if (output.length > 0) {
				utils.displayText('<a name="iptc" id="a_iptc"></a>', divName + '_iptc');
				utils.displayText('<h2>' + mozutils.getPString('IPTC') + '</h2>', divName + '_iptc');
				utils.dumpAssembledExifData(output, divName + '_iptc', useTables);
	//			utils.displayText('<ul><li>' + output.join('</li><li>') + '</li></ul>', divName + '_iptc');
			}
		}
	}	// dumpIptcData()

	function formatIPTC_CCYYMMDD(str) {
		return str.substr(0, 4) + '/' + str.substr(4, 2) + '/' + str.substr(6, 2);
	}	// formatIPTC_CCYYMMDD()

	function formatIPTC_HHMMSS_HHMM(str) {
		return str.substr(0, 2) + ':' + str.substr(2, 2) + ':' + str.substr(4, 2) + 
			   str.charAt(6) + str.substr(7, 2) + ':' + str.substr(9, 2);
	}	// formatIPTC_HHMMSS_HHMM()

	function formatIPTC_binaryS(str) {
		var i, t = [];

		if (!str) { return '';  }
		for (i = 0 ; i < str.length ; i += 1) {
			t.push(str.charCodeAt(i));
		}
		return t.join(', ');
	}	// formatIPTC_binaryS()

	function formatIPTC_binaryN(str) {
		var j, n = 0;

		for (j = 0 ; j < str.length ; j += 1) {
			n = (n << 8) + str.charCodeAt(j); 
		}
		return n;
	}	// formatIPTC_binaryN()

	return {
		parseIPTC: parseIPTC,
		dumpIptcData: dumpIptcData
	};
}, ['constants', 'utils', 'moz', 'moz-utils']);;ExifViewerApp.add('logging', function _logging() {
	'use strict';

	function trace() {
		var stack;
		if (window.console.trace  &&  typeof window.console.trace === 'function') {
			window.console.trace();
		} else {
			stack = (new Error()).stack || '';
			stack = stack.split('\n').map(function (line) { return line.trim(); });
			window.console.log(stack.splice(stack[0] === 'Error' ? 2 : 1));
		}
	}	// trace()

	function log(msgs) {
		trace();
		window.console.log.apply(window.console, arguments);
	}	// log()
	
	function alert(msg) {
		window.alert(msg);
	}	// alert()
	
	function confirm(msg) {
		return window.confirm(msg);
	}	// confirm()
	
	return {
		alert: alert,
		confirm: confirm,
		log: log,
		trace: trace
	};
}, []);;ExifViewerApp.add('main', function _main(globals, constants, utils, exif, moz, mozutils, logging, html, storage, histogram) {
	'use strict';
	
	function alert() {
		logging.alert(this.getAttribute('data-text').replace(/\\n/g, '\n'));
	}	// alert()
	
	function setRelativeFontSize() {
		moz.setRelativeFontSize(this.getAttribute('data-text'));
	}	// setRelativeFontSize()
 	
	function setFontSize() {
		moz.setFontSize(this.getAttribute('data-text'));
	}	// setFontSize()
	
	function clearHistory() {
		moz.clearHistory(this.getAttribute('data-text'));
	}	// clearHistory()
	
	function exifScrollTo() {
		moz.exifScrollTo(this.getAttribute('data-text'));
	}	// exifScrollTo()
	
	function exifPageUpDown() {
		moz.exifPageUpDown(this.getAttribute('data-text'));
	}	// exifPageUpDown()
	
	function pickLocalHistory() {
		moz.pickLocalHistory(this.label);
		exif.startDisplay();
	}	// pickLocalHistory()

	function pickRemoteHistory() {
		moz.pickRemoteHistory(this.label);
		exif.startDisplay();
	}	// pickRemoteHistory()
	
	function exifViewDiv() {
		this.checked = !this.checked;
		moz.exifViewDiv(this.checked, this.getAttribute('data-text'))
	}	// exifViewDiv()

	function addEventListeners() {
		var key_cmds = ['home', 'end', 'up', 'down', 
					'about', 'console', 'copy', 'copyhtml', 'enlarge', 'exif', 'exit', 'filepick', 'help', 
					'languages', 'maker', 'normal', 'print', 'reduce', 'releasenotes', 'reset', 'saveimage', 
					'clear-rem', 'clear-loc'];
		
		// needed as bug workaround so keys work: https://bugzilla.mozilla.org/show-bug.cgi?id=371900
		key_cmds.forEach(function (item) {
			document.getElementById('cmd-' + item).setAttribute('oncommand', 'var x = 1;');
		});

		document.getElementById('cmd-about').addEventListener('command', alert);
		document.getElementById('cmd-console').addEventListener('command', moz.toJavaScriptConsole);
		document.getElementById('cmd-copy').addEventListener('command', function () {
			moz.copyToClipboard(window.getSelection().toString());
		});
		document.getElementById('cmd-copyhtml').addEventListener('command', function () {
			moz.copyToClipboard(document.getElementById('outputDiv').innerHTML);
		});
		document.getElementById('cmd-enlarge').addEventListener('command', setRelativeFontSize);
		document.getElementById('cmd-exif').addEventListener('command', exif.startDisplay);
		document.getElementById('cmd-exit').addEventListener('command', function () {
			window.close();
		});
		document.getElementById('cmd-filepick').addEventListener('command', moz.pickFile);
		document.getElementById('cmd-help').addEventListener('command', alert);
		document.getElementById('cmd-languages').addEventListener('command', alert);
		document.getElementById('cmd-maker').addEventListener('command', alert);
		document.getElementById('cmd-normal').addEventListener('command', setFontSize)
		document.getElementById('cmd-print').addEventListener('command', moz.simplePrint);
		document.getElementById('cmd-reduce').addEventListener('command', setRelativeFontSize);
		document.getElementById('cmd-releasenotes').addEventListener('command', moz.showReleaseNotes);
		document.getElementById('cmd-reset').addEventListener('command', moz.restoreURL);
		document.getElementById('cmd-saveimage').addEventListener('command', moz.saveExifAsImage);
		document.getElementById('cmd-clear-rem').addEventListener('command', clearHistory);
		document.getElementById('cmd-clear-loc').addEventListener('command', clearHistory);

		document.getElementById('cmd-home').addEventListener('command', exifScrollTo);
		document.getElementById('cmd-end').addEventListener('command', exifScrollTo);
		document.getElementById('cmd-up').addEventListener('command', exifPageUpDown);
		document.getElementById('cmd-down').addEventListener('command', exifPageUpDown);
		
		utils.range(1, 10).forEach(function (i) {
			document.getElementById('history-loc-' + i).addEventListener('command', pickLocalHistory);
			document.getElementById('history-rem-' + i).addEventListener('command', pickRemoteHistory);
		});
		
		document.getElementById('menu-toggle').addEventListener('command', moz.toggleControls);

		['ifd0', 'subifd', 'ifd1', 'interop', 'gpsifd', 'iptc', 'iptccore', 'mn'].forEach(function (item) {
			document.getElementById('menu-view-' + item).addEventListener('command', exifViewDiv);
			document.getElementById('menu-scroll-' + item).addEventListener('command', exifScrollTo);
			document.getElementById('popup-scroll-' + item).addEventListener('command', exifScrollTo);
		});
		
		utils.range(0, 4).forEach(function (i) {
			document.getElementById('menu-size-' + i).addEventListener('command', setFontSize);
		});
		
		document.getElementById('copypopup').addEventListener('popupshown', function () {
			// blur() needed to prevent div from expanding vertically below edge of window
			document.getElementById('outputDiv').blur();
		});

		document.getElementById('local-file').addEventListener('focus', function () {
			this.select(0);
		});
		document.getElementById('local-file').addEventListener('change', function () {
			moz.handleLocalChanged(this.value);
		});
		document.getElementById('remote-file').addEventListener('focus', function () {
			this.select(0);
		});
		document.getElementById('remote-file').addEventListener('change', function () {
			moz.handleRemoteChanged(this.value);
		});

		window.addEventListener('unload', function () {
			if (globals.overlay) {
				globals.overlay.window = null;
			}
		});
		//document.getElementById('menu-').addEventListener('command', );
	}	// addEventListeners()
	
	function parseQuery(query) {
		var i, tmp = query.split('&'), options = {};

		tmp.forEach(function (item) {
			var tmp = item.split('=');
			options[tmp[0]] = tmp[1];
		});
		return options;
	}	// parseQuery()

	function mainLegacy() {
		logging.log('executing legacy main');
		globals.isLegacy = true;
		globals.isWebExt = false;
		addEventListeners();
	}	// mainLegacy()
	
	function setText(id, key) {	// text node doesn't handle character entities properly
		var div = document.createElement('div');
		div.innerHTML = mozutils.getPString(key);
		document.getElementById(id).appendChild(
			html.tn(div.innerHTML)
		);
	}	// setText()
	
	function onWindowResize() {
		storage.set({
			exif_viewer_width: window.innerWidth,
			exif_viewer_height: window.innerHeight
		});
	}	// onWindowResize()
		
	function onUpdated(windowInfo) {
		logging.log('Updated window: ' + windowInfo.id);
	}	// onUpdated()

	function setWindowSize() {
		storage.get(['exif_viewer_width', 'exif_viewer_height'], function (data) {
			var updateInfo = {width: 720, height: 720};
			if (data.exif_viewer_width) {
				updateInfo.width = data.exif_viewer_width;
			}
			if (data.exif_viewer_height) {
				updateInfo.height = data.exif_viewer_height;
			}
			if (globals.isMozilla) {
				browser.windows.getCurrent().then(function (windowInfo) {
					browser.windows.update(windowInfo.id, updateInfo).then(onUpdated);
				});
			} else if (globals.isChrome) {
				chrome.windows.getCurrent({}, function (windowInfo) {
					chrome.windows.update(windowInfo.id, updateInfo, onUpdated);
				});
			}
		});
	}	// setWindowSize()
	
	function setWindowPosition() {
		storage.get(['exif_viewer_left', 'exif_viewer_top'], function (data) {
			var updateInfo = {/*focused: true*/};
			if (data.exif_viewer_left) {
				updateInfo.left = data.exif_viewer_left;
			}
			if (data.exif_viewer_top) {
				updateInfo.top = data.exif_viewer_top;
			}
			logging.log('Setting window position: ', updateInfo.left, updateInfo.top);
			if (globals.isMozilla) {
				browser.windows.getCurrent().then(function (windowInfo) {
					browser.windows.update(windowInfo.id, updateInfo).then(onUpdated);
				});
			} else if (globals.isChrome) {
				chrome.windows.getCurrent({}, function (windowInfo) {
					chrome.windows.update(windowInfo.id, updateInfo, onUpdated);
				});
			}
		});
	}	// setWindowPosition()

	function test() {
		// Fixes dual-screen position, Most browsers, Firefox
/*		var dualScreenLeft = (window.screenLeft != undefined ? window.screenLeft : window.screen.left);
		var dualScreenTop = (window.screenTop != undefined ? window.screenTop : window.screen.top);
		window.console.log('Dual screen left: ' + dualScreenLeft);
		window.console.log('Dual screen top: ' + dualScreenTop);*/
/*		window.console.log('Avail height = ' + window.screen.availHeight);
		window.console.log('Avail width = ' + window.screen.availWidth);
		window.console.log('Height = ' + window.screen.height);
		window.console.log('Width = ' + window.screen.width);
		window.console.log('Top = ' + window.screen.top);
		window.console.log('Left = ' + window.screen.left);*/
	}	// test()
	

	function setupControls(url, callback) {
		var all = document.getElementById('allControl'), 
			basic = document.getElementById('basicControl'), 
			list = document.getElementById('listControl'), 
			table = document.getElementById('tableControl'),
			tagid = document.getElementById('tagControl'),
			mnote = document.getElementById('mnoteControl'),
			hist = document.getElementById('histControl');
	
		function handleControlChange() {
			utils.clearTexts('outputDiv');
			exif.rewind();
			exif.processFile(url, null, 'outputDiv', !mnote.checked, false, basic.checked, table.checked, tagid.checked);
			storage.set({
				exif_viewer_basic: (basic.checked ? 'true' : 'false'),
				exif_viewer_table: (table.checked ? 'true' : 'false'),
				exif_viewer_tagid: (tagid.checked ? 'true' : 'false'),
				exif_viewer_mnote: (mnote.checked ? 'true' : 'false')
			});
		}	// handleControlChange()

		storage.get(['exif_viewer_basic', 'exif_viewer_table', 'exif_viewer_tagid', 'exif_viewer_mnote'], function (data) {
			if (data.exif_viewer_basic  &&  data.exif_viewer_basic === 'true') {
				basic.checked = true;
			}
			if (data.exif_viewer_table  &&  data.exif_viewer_table === 'true') {
				table.checked = true;
			}
			tagid.checked = (!data.exif_viewer_tagid  ||  data.exif_viewer_tagid === 'true')
			mnote.checked = (!data.exif_viewer_mnote  ||  data.exif_viewer_mnote === 'true');

			callback();
		});

		setText('infoLegend', 'infoLegend');
		setText('formatLegend', 'formatLegend');
		setText('otherLegend', 'otherLegend');
		setText('allText', 'allText');
		setText('basicText', 'basicText');
		setText('listText', 'listText');
		setText('tableText', 'tableText');
		setText('tagText', 'tagText');
		setText('mnoteText', 'mnoteText');
		
		setText('histText', 'histText');
		setText('histHeaderText', 'histHeaderText');
		setText('rgbHistText', 'rgbHistText');
		setText('hslHistText', 'hslHistText');

//		setText('', '');
		
		all.addEventListener('change', handleControlChange);
		basic.addEventListener('change', handleControlChange);
		list.addEventListener('change', handleControlChange);
		table.addEventListener('change', handleControlChange);
		tagid.addEventListener('change', handleControlChange);
		mnote.addEventListener('change', handleControlChange);
		hist.addEventListener('change', function () {
			document.getElementById('histograms').style.display = (this.checked ? 'block' : 'none');
		});
	}	// setupControls()
	
	function setupLinks() {
		setText('aboutLink', 'aboutLink');		// menu.help.about.label "About Exif Viewer"
		setText('closeLink', 'closeLink');
		setText('iptcLink', 'iptcLink');		// menu.view.iptc.label "IPTC">
		setText('iptccoreLink', 'iptccoreLink');	// menu.view.iptc_core.label "IPTC Core">
		setText('ifd0Link', 'ifd0Link');		// menu.view.ifd0.label "IFD0">
		setText('subifdLink', 'subifdLink');	// menu.view.subifd.label "Sub IFD">
		setText('ifd1Link', 'ifd1Link');		// menu.view.ifd1.label "IFD1">
		setText('mnLink', 'mnLink');			// menu.view.maker.label "Maker Note">
		setText('iopLink', 'iopLink');			// menu.view.interop.label "Interop IFD">
		setText('gpsLink', 'gpsLink');			// menu.view.gpsifd.label "GPS IFD">
	}	// setupLinks()
	
	
	function mainWebExt() {
		var options = parseQuery(document.location.search.substr(1)),
			url = window.decodeURIComponent(options.url);

		globals.isLegacy = false;
		globals.isWebExt = true;

		logging.log('executing webext main', options);

		// save and restore window dimensions
		window.addEventListener('resize', onWindowResize);
		setWindowSize();
		// save and restore window position
		(function () {
			var screenX, screenY;

			function checkWindowPosition() {
				var dualScreenLeft = (window.screenX !== undefined ? window.screenX : 
						(window.screenLeft !== undefined ? window.screenLeft : window.screen.left)
					),
					dualScreenTop = (window.screenY !== undefined ? window.screenY : 
						(window.screenTop !== undefined ? window.screenTop : window.screen.top)
					);

				if (dualScreenLeft !== screenX  ||  dualScreenTop !== screenY) {
					storage.set({
						exif_viewer_left: dualScreenLeft,
						exif_viewer_top: dualScreenTop
					});
					
					screenX = dualScreenLeft;
					screenY = dualScreenTop;
					//logging.log('Saved new position:', screenX, screenY);
				}
			}	// checkWindowPosition()

			window.setInterval(checkWindowPosition, 500);
		})();
		setWindowPosition();

		setupLinks();

		// initialize controls before continuing
		setupControls(url, function () {
			utils.clearTexts('outputDiv');
			
			document.getElementById('closeLink').addEventListener('click', function () {
				if (globals.isMozilla) {
					browser.windows.getCurrent().then(function (windowInfo) {
						browser.windows.remove(windowInfo.id);
					});
				} else if (globals.isChrome) {
					chrome.windows.getCurrent({}, function (windowInfo) {
						chrome.windows.remove(windowInfo.id);
					});
				}
			});

			// fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID
			if (options.basic === 'null') {
				exif.processFile(url, null, 'outputDiv', !document.getElementById('mnoteControl').checked, 
									false, document.getElementById('basicControl').checked, document.getElementById('tableControl').checked, 
									document.getElementById('tagControl').checked);
			} else {
				exif.processFile(url, null, 'outputDiv', false, false, options.basic === 'true', options.table === 'true', true);
			}
			if (constants.isMoz) {
				moz.fixDivs('outputDiv');
			}
			window.setTimeout(function () {
				histogram.start(url)
			}, 100);
		});
	}	// mainWebExt()
	
	return {
		mainLegacy: mainLegacy,
		mainWebExt: mainWebExt
	}
}, ['globals', 'constants', 'utils', 'exif', 'moz', 'moz-utils', 'logging', 'html', 'storage', 'histogram']);

;ExifViewerApp.add('makers', function _makers() {
	'use strict';
	// placeholder object: will be populated by individual maker modules
	return {
	};
}, []);;ExifViewerApp.add('moz', function _moz(globals, utils, mozutils, logging) {
	'use strict';

	var resizeOutputDiv, pickFileLegacy, copyToClipboardLegacy, handleLocalChanged, handleRemoteChanged, 
		saveURL, restoreURL, 
		clearURL, clearFile, exifViewDiv, setFontSize, setRelativeFontSize, toJavaScriptConsole, toOpenWindowByType, 
		toOpenWindowByTypeLegacy, toOpenWindowByTypeWebExt,
		showReleaseNotes, exifScrollTo, exifPageUpDown, exifLineUpDown, saveExifAsImage, simplePrint, 
		copyKMLtoClipboard, 
		saveKMLtoFileLegacy, launchKMLLegacy, fixDiv, fixDivs, disableMainButton, getAppVersionLegacy, getExtensionVersionLegacy, toggleControls,
		pickRemoteHistory, pickLocalHistory, clearHistory, addToHistory,
		setExifDirectorySeparator,
		setExifDirectorySeparatorLegacy, setExifDirectorySeparatorWebExt,
		savedURL = (globals.isLegacy ? document.getElementById('remote-file').value : '');

	setExifDirectorySeparatorLegacy = function _setExifDirectorySeparatorLegacy() {
		var l,
			profD = Components.classes['@mozilla.org/file/directory_service;1']
						.getService(Components.interfaces.nsIProperties)
						.get('ProfD', Components.interfaces.nsIFile);

		profD.append('abc');
		profD.append('abc');
		l = profD.path.length;
		globals.directorySeparator = profD.path.substr(l - ('abc'.length) - 1 , 1);
	/*
		try {
			const id = 'exif_viewer@mozilla.doslash.org';
			var ext = Components.classes["@mozilla.org/extensions/manager;1"]
						.getService(Components.interfaces.nsIExtensionManager)
						.getInstallLocation(id)
						.getItemLocation(id); 
			// ext is an instance of nsIFile, so ext.path contains the directory as a string

			// determine the file-separator
			if (ext.path.search(/\\/) != -1) {
				globals.directorySeparator = '\\';		// Windows
			} else if (ext.path.search(/\//) != -1) {
				globals.directorySeparator = '/';		// Unix
			} else {
				globals.directorySeparator = ':';		// Mac
			}
		} catch (e) {
			globals.directorySeparator = '\\';
		}
	*/
	};	// setExifDirectorySeparatorLegacy()
	
	setExifDirectorySeparatorWebExt = function _setExifDirectorySeparatorWebExt() {
		// webext todo?
		globals.directorySeparator = '/';
	};	// setExifDirectorySeparatorWebExt()
	
	setExifDirectorySeparator = function _setExifDirectorySeparator() {
		if (globals.isLegacy) {
			setExifDirectorySeparatorLegacy();
		} else if (globals.isWebExt) {
			setExifDirectorySeparatorWebExt();
		}
	};	// setExifDirectorySeparator()

	resizeOutputDiv = function _resizeOutputDiv() {	// needed for FF3?
		var ele = document.getElementById('outputDiv');
		ele.style.display = 'none';
		ele.style.height = (window.innerHeight - ele.offsetTop - 45) + 'px';
		ele.style.display = 'block';
	};     // resizeOutputDiv()

	//window.onresize = resizeOutputDiv;

	pickFileLegacy = function _pickFileLegacy() {
		var res, thefile, 
			nsIFilePicker = Components.interfaces.nsIFilePicker,
			fp = Components.classes['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);

		fp.init(window, mozutils.getPString('selectFile'), nsIFilePicker.modeOpen);
		fp.appendFilter(mozutils.getPString('jpegFiles'), mozutils.getPString('jpegExtensions'));
		fp.appendFilters(nsIFilePicker.filterImages);	// filterHTML / filterImages / filterText / filterAll
		res = fp.show();
		if (res === nsIFilePicker.returnOK) {
			thefile = fp.file;
			document.getElementById('local-file').value = thefile.path;
			utils.clearText('fileDiv');
			utils.displayText(utils.cleanExifStringData(thefile.path), 'fileDiv');
			saveURL();
			clearURL();
	//		disableMainButton(false);
		}
	};	// pickFileLegacy()

	//utils.export('pickFile', pickFileLegacy);

	/*
	printOutputLegacy = function _printOutputLegacy() {
		var frame = document.getElementById('outputDiv'),
			req = frame.QueryInterface(Components.interfaces.nsIInterfaceRequestor),
			wbprint = req.getInterface(Components.interfaces.nsIWebBrowserPrint),
			settings = PrintUtils.getPrintSettings(); // from chrome://global/content/printUtils.js
		
		wbprint.print(settings, null);
	}	// printOutputLegacy()
	*/

	copyToClipboardLegacy = function _copyToClipboardLegacy(text) {
		var gClipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1']
								.getService(Components.interfaces.nsIClipboardHelper);
		//gClipboardHelper.copyString(text.replace(/<html:/gi, '<').replace(/</html:/gi, '</').replace(/ xmlns:html="http:\/\/www.w3.org\/1999\/xhtml"/g, ''));
		gClipboardHelper.copyString(text);
	};	// copyToClipboardLegacy()
	
	//utils.export('copyToClipboard', copyToClipboardLegacy);

	handleLocalChanged = function _handleLocalChanged(value) {
		utils.clearText('fileDiv');
		utils.displayText(utils.cleanExifStringData(value), 'fileDiv');
		saveURL();
		clearURL();
	//	disableMainButton(false);
	};	// handleLocalChanged()

	handleRemoteChanged = function _handleRemoteChanged(value) {
		utils.clearText('fileDiv');
		utils.displayText(utils.cleanExifStringData(value), 'fileDiv');
		clearFile();
	//	disableMainButton(false);
	};	// handleRemoteChanged()

	saveURL = function _saveURL() {
		var s = document.getElementById('remote-file').value;
		if (s !== '') { savedURL = s; }
	};	// saveURL()

	restoreURL = function _restoreURL() {
		document.getElementById('remote-file').value = savedURL;
		clearFile();
		utils.clearText('fileDiv');
		utils.displayText(utils.cleanExifStringData(savedURL), 'fileDiv');
	};	// restoreURL()

	clearURL = function _clearURL() {
		document.getElementById('remote-file').value = '';
	};	// clearURL()

	clearFile = function _clearFile() {
		document.getElementById('local-file').value = '';
	};	// clearFile()

	//utils.export('toJavaScriptConsole', toJavaScriptConsole);
	//utils.export('handleLocalChanged', handleLocalChanged);
	//utils.export('handleRemoteChanged', handleRemoteChanged);

	exifViewDiv = function _exifViewDiv(checked, divExt) {
		var div = document.getElementById('outputDiv_' + divExt);
		if (div) {
			div.style.display = (checked ? 'none' : '');
		}
	};	// exifViewDiv()
	
	//utils.export('exifViewDiv', exifViewDiv);

	setFontSize = function _setFontSize(n) {
		var sizes = ['66%', '83%', '100%', '120%', '150%'],
			o = document.getElementById('outputDiv');

		if (!o  ||  !o.style  ||  n < 0  ||  n >= sizes.length) { return; }
		o.style.overflow = 'hidden';
		o.style.fontSize = sizes[n];
		window.setTimeout(function () {
			document.getElementById('outputDiv').style.overflow = 'scroll';
		}, 2);
	};	// setFontSize()

	//utils.export('setFontSize', setFontSize);

	setRelativeFontSize = function _setRelativeFontSize(t) {
		var s,
			factor = 1.10, 
			o = document.getElementById('outputDiv');

		if (!o  ||  !o.style) { return; }
		x = window.parseInt(o.style.fontSize, 10);
		switch (t) {
		case '+':
			x *= factor;
			break;
		case '-':
			x /= factor;
			break;
		default:
			break;
		}

		o.style.overflow = 'hidden';
		o.style.fontSize = x + '%';
		window.setTimeout(function () {
			document.getElementById('outputDiv').style.overflow = 'scroll';
		}, 2);
	};	// _setRelativeFontSize()

	//utils.export('setRelativeFontSize', setRelativeFontSize);

	/*
	showLocaleLegacy = function _showLocaleLegacy() {
		var ps_cls = Components.classes['@mozilla.org/preferences-service;1'],
			ps = ps_cls.getService(Components.interfaces.nsIPrefService),
			branch = ps.getBranch('general.useragent.');

		return branch.getCharPref('locale'));
	//	branch.setCharPref('locale', 'fr')
	};	// showLocaleLegacy()
	*/

	// from Mozilla/Firefox's browser.js
	toJavaScriptConsole = function _toJavaScriptConsole() {
		toOpenWindowByType('global:console', 'chrome://global/content/console.xul');
	};	// toJavaScriptConsole()

	toOpenWindowByTypeLegacy = function _toOpenWindowByTypeLegacy(inType, uri, features) {
		var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(),
			windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator),
			topWindow = windowManagerInterface.getMostRecentWindow(inType);

		if (topWindow) {
			topWindow.focus();
			return topWindow;
		} else if (features) {
			return window.open(uri, '_blank', features);
		} else {
			return window.open(uri, '_blank', 'chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar');
		}
	};	// toOpenWindowByTypeLegacy()
	
	toOpenWindowByTypeWebExt = function _toOpenWindowByTypeWebExt(uri, features) {
		if (features) {
			return window.open(uri, '_blank', features);
		} else {
			return window.open(uri, '_blank', 'chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar');
		}
	};	// toOpenWindowByTypeWebExt()
	
	toOpenWindowByType = function _toOpenWindowByType(inType, uri, features) {
		if (globals.isLegacy) {
			toOpenWindowByTypeLegacy(inType, uri, features);
		} else if (globals.isWebExt) {
			toOpenWindowByTypeWebExt(uri, features);
		}
	};	// toOpenWindowByType()

	showReleaseNotes = function _showReleaseNotes() {
		toOpenWindowByType('exif:notes', 'chrome://exif/content/notes.xul');
	};	// showReleaseNotes()
	
	//utils.export('showReleaseNotes', showReleaseNotes);

	exifScrollTo = function _exifScrollTo(eleID) {
		var ele = document.getElementById(eleID);
		if (ele  &&  ele.scrollIntoView) { ele.scrollIntoView(); }
	};	// exifScrollTo()
	
	//utils.export('exifScrollTo', exifScrollTo);

	exifPageUpDown = function _exifPageUpDown(u_or_d) {
		var ele = document.getElementById('outputDiv');
			t = ele.scrollTop + (u_or_d === 'u' ? -ele.clientHeight : + ele.clientHeight);

		if (t < 0) {
			t = 0;
		} else if (t >= ele.scrollHeight) {
			t = ele.scrollHeight - 1;
		}
		ele.scrollTop = t;
	};	// exifPageUpDown()

	exifLineUpDown = function _exifLineUpDown(u_or_d) {	// messes up the scroll bar
		var ele = document.getElementById('outputDiv'),
			t = ele.scrollTop + (u_or_d === 'u' ? -10 : +10);

		if (t < 0) {
			t = 0;
		} else if (t >= ele.scrollHeight) {
			t = ele.scrollHeight - 1;
		}
		ele.scrollTop = t;
	};	// exifLineUpDown()
	
	//utils.export('exifPageUpDown', exifPageUpDown);
	//utils.export('exifLineUpDown', exifLineUpDown);

	saveExifAsImage = function _saveExifAsImage() {
		toOpenWindowByType('exif:capture', 'chrome://exif/content/capture.xul');
	};	// saveExifAsImage()
	
	//utils.export('saveExifAsImage', saveExifAsImage);

	simplePrint = function _simplePrint() {
		var win, out = [];
		try {
			win = window.open('empty.html', '_blank', 'chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar');
		} catch (e) {
			logging.log(e);
			logging.alert(mozutils.getPString('simplePrintError'));
			return;
		}
		self.focus();

		out.push('<!DOCTYPE html>');
		out.push('<html><head>');
		out.push('<meta charset="utf-8">');
		out.push('<title>Exif Image Metadata</title>');
		out.push('<style>');
		out.push('body { font-family: serif; font-size: 100%; }');
		out.push('.no_print { display: none; }');
		out.push('</style>');
		out.push('<base href="chrome://exif/content/">');
		out.push('</head><body>');
		out.push(document.getElementById('outputDiv').innerHTML.replace(/html:/gi, ''));
		out.push('</body></html>');

		win.document.open();
		win.document.write(out.join('\r\n'));
		win.document.close();
		win.print();
		win.close();

	};	// simplePrint()


	//utils.export('simplePrint', simplePrint);

	copyKMLtoClipboard = function _copyKMLtoClipboard() {
		copyToClipboard(utils.kml);
		logging.alert(mozutils.getPString('copyKMLtoClipboardResponse'));
	};	// copyKMLtoClipboard()

	saveKMLtoFileLegacy = function _saveKMLtoFileLegacy(launch) {
		var res, savefile, file, outputStream, output,
			nsIFilePicker = Components.interfaces.nsIFilePicker,
			fp = Components.classes['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);

		fp.init(window, mozutils.getPString('selectFile'), nsIFilePicker.modeSave);
		fp.appendFilter(mozutils.getPString('kmlFiles'), mozutils.getPString('kmlExtensions'));
		fp.defaultExtension = 'kml';
		fp.defaultString = utils.fileName.match(/(\w*)\.(\w*)$/)[1];	// use the image filename as the default KML filename
	//	fp.appendFilters(nsIFilePicker.filterHTML | nsIFilePicker.filterImages | nsIFilePicker.filterText | nsIFilePicker.filterAll);
		res = fp.show();
		if (res !== nsIFilePicker.returnCancel) {
			savefile = fp.file;
			file = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
			file.initWithPath(savefile.path);
			if (!file.exists()) {
				file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
			}
			outputStream = Components.classes['@mozilla.org/network/file-output-stream;1']
								.createInstance( Components.interfaces.nsIFileOutputStream );
			outputStream.init(file, 0x02 | 0x08 | 0x20, 420, 0 );	// (write-only | create-file | truncate)
			result = outputStream.write(constants.kml, constants.kml.length );
			outputStream.close();
			if (launch) { file.launch(); }		// open file in Google Earth!?!
			logging.alert(mozutils.getPString('saveKMLtoFileResponse') + ' ' + savefile.path);
		}
	};	// saveKMLtoFileLegacy()

	launchKMLLegacy = function _launchKMLLegacy() {
		var tempDir, file, outputStream, result;

		if (!globals.directorySeparator) {
			setExifDirectorySeparator();
		}
		tempDir = Components.classes['@mozilla.org/file/directory_service;1']
					.getService(Components.interfaces.nsIProperties)
					.get('TmpD', Components.interfaces.nsIFile);
		file = Components.classes['@mozilla.org/file/local;1']
					.createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath(tempDir.path + globals.directorySeparator + 'utils.kml');
		if (!file.exists()) {
			file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
		}
		outputStream = Components.classes['@mozilla.org/network/file-output-stream;1']
							.createInstance( Components.interfaces.nsIFileOutputStream );
		outputStream.init(file, 0x02 | 0x08 | 0x20, 420, 0 );	// (write-only | create-file | truncate)
		result = outputStream.write(utils.kml, utils.kml.length );
		outputStream.close();
		file.launch();		// open file in Google Earth!?!
	}	// launchKMLLegacy()

	fixDiv = function _fixDiv() {
		fixDivs('outputDiv');
	};	// fixDiv()

	//window.onresize = function () {fixDiv();};
	//window.onload = function () {fixDiv();};
	window.addEventListener('load', function () {fixDiv();}, false);
	window.addEventListener('resize', function () {fixDiv();}, false);

	fixDivs = function _fixDivs(divName) {
	//	var version = getAppVersion();	// needed for FF 10 *sigh*
	//	if (/^[12]\.*/.test(version))  return;	// the following code is only needed for FF 3

	//	for some reason, in FF3 and 10 the outer div tries to display the full content within 
	//	it, by widening indefinitely and lengthening to cover the status bar;
	//	hence, we need to manually adjust the widths of the inner divs and the height
	//	of the outer div

	//	step 1: adjust inner widths

		var i, div, win_h, div_t, h,
			sb_h = 45,		// height of statusbar, was 40
			subdivs = ['iptc', 'iptc_core', 'ifd0', 'ifd1', 'iop', 'gps', 'subifd', 'mn'],
			tmp = window.innerWidth - 35;

		if (tmp < 300)  tmp = 300;
		for (i = 0 ; i < subdivs.length ; i += 1) {
			div = document.getElementById(divName + '_' + subdivs[i]);
			if (div) {
				div.style.width = tmp + 'px';
				div.style.overflow = 'auto';
			}
		}

	//	step 2: adjust outer height

		win_h = window.innerHeight;
		div = document.getElementById(divName);
		
		if (div) {
			div_t = div.offsetTop;
			
			h = win_h - div_t - sb_h; 
			if (h >= 0) { div.style.height = h + 'px'; }
		}
	};	// fixDivs()

	disableMainButton = function _disableMainButton(t_or_f, fileName) {
	/*
		if (t_or_f) {
			var cache = Components.classes['@mozilla.org/network/cache-service;1']
							.getService(Components.interfaces.nsICacheService),
				id = 'test',
				storagePolicy = cache.STORE_ANYWHERE,
				streamBased = cache.STREAM_BASED,
				session = cache.createSession(id, storagePolicy, streamBased),
				accessRequested = cache.ACCESS_READ,
				blockingMode = cache.NON_BLOCKING;

			try {
				var entry = session.openCacheEntry(fileName, accessRequested, blockingMode);
			} catch (e) {
				alert('failure');
				return;
			}
			entry.doom();
		}
		return;
	*/
		var btn = document.getElementById('mainBtn');
		if (btn) {
			btn.disabled = t_or_f;
		}
	};	// disableMainButton()

	getAppVersionLegacy = function _getAppVersion() {
		var info = Components.classes['@mozilla.org/xre/app-info;1']
							.getService(Components.interfaces.nsIXULAppInfo);
		// info.name: "Firefox"
		// info.version: "2.0.0.1"
		// info.ID: "{ex8040...}"
		// info.appBuildID: "2007112718"
		// info.platformBuildID: "2007112718"
		// info.platformVersion: "1.8.1.11"
		// info.vendor: "Mozilla"
		return info.version;
	};	// getAppVersionLegacy()

	/*
	getExtensionVersionLegacy = function _getExtensionVersionLegacy() {
		var interpretedType,
			extmgr = Components.classes['@mozilla.org/extensions/manager;1']
							.getService(Components.interfaces.nsIExtensionManager),
			addon = extmgr.getItemForID('exif_viewer@mozilla.doslash.org');
		// addon.iconURL:  'chrome:/mozapps/skin/xpinstall/xpinstallItemGeneric.png'
		// addon.id: 'exif_viewer@mozilla.doslash.org'
		// addon.installLocationKey: 'app-profile'
		// addon.maxAppVersion: '2.0.0.*'
		// addon.minAppVersion: '1.5'
		// addon.name: 'Exif Viewer'
		// addon.type
		// if (addon.type === 1)  interpretedType = 'app';
		// if (addon.type === 2)  interpretedType = 'extension';  
		// if (addon.type === 4)  interpretedType = 'theme';  
		// if (addon.type === 8)  interpretedType = 'locale';  
		// if (addon.type === 16)  interpretedType = 'plugin';  
		// if (addon.type === 32)  interpretedType = 'multi xpi';  
		// addon.updateRDF: ''
		// addon.version: '1.36'
		// addon.xpiHash: ''
		// addon.xpiURL: 'none'
		return addon.version;
	};	// getExtensionVersionLegacy()
	*/

	toggleControls = function _toggleControls() {
		var e = document.getElementById('mainControls');
		e.style.display = (e.style.display !== 'none' ? 'none' : 'block');
	};	// toggleControls()
	
	//utils.export('toggleControls', toggleControls);

	pickRemoteHistory = function _pickRemoteHistory(url) {
		document.getElementById('remote-file').value = url;
		clearFile();
		utils.clearText('fileDiv');
		utils.displayText(utils.cleanExifStringData(url), 'fileDiv');
	};	// pickRemoteHistory()

	pickLocalHistory = function _pickLocalHistory(file) {
		document.getElementById('local-file').value = file;
		clearURL();
		utils.clearText('fileDiv');
		utils.displayText(utils.cleanExifStringData(file), 'fileDiv');
	};	// pickLocalHistory()
	
	//utils.export('pickRemoteHistory', pickRemoteHistory);
	//utils.export('pickLocalHistory', pickLocalHistory);

	clearHistory = function _clearHistory(rem_or_loc) {
		var i, menuitems, 
			menu = document.getElementById('history-' + rem_or_loc + '-popup');
		if (menu) {
			menuitems = menu.getElementsByTagName('menuitem');
			for (i = 0 ; i < menuitems.length - 1 ; i += 1) {
				menuitems[i].label = i;
				menuitems[i].hidden = 'true';
			}
		}
	};	// clearHistory()

	//utils.export('clearHistory', clearHistory);

	addToHistory = function _addToHistory(rem_or_loc, url) {
		// bug workaround regarding unset attributes: https://bugzilla.mozilla.org/show_bug.cgi?id=15232
		var i, menuitems,
			menu = document.getElementById('history-' + rem_or_loc + '-popup');
		if (menu) {
			menuitems = menu.getElementsByTagName('menuitem');
			for (i = 0 ; i < menuitems.length - 1 ; i += 1) {
				if (!menuitems[i].hidden  &&  menuitems[i].label === url) { return; }	// already in list
			} 
			for (i = menuitems.length - 2 ; i >= 1  ; i -= 1) {
				menuitems[i].label = menuitems[i-1].label;
				menuitems[i].setAttribute('hidden', menuitems[i-1].hidden);
			}
			menuitems[0].label = url;
			menuitems[0].setAttribute('hidden', 'false');
		}
	};	// addToHistory()

	return {
		addToHistory: addToHistory,
		clearFile: clearFile,
		clearHistory: clearHistory,
		clearURL: clearURL,
		copyToClipboard: copyToClipboardLegacy,
		exifPageUpDown: exifPageUpDown,
		exifScrollTo: exifScrollTo,
		exifViewDiv: exifViewDiv,
		fixDivs: fixDivs,
		handleLocalChanged: handleLocalChanged,
		handleRemoteChanged: handleRemoteChanged,
		pickFile: pickFileLegacy,
		pickLocalHistory: pickLocalHistory,
		pickRemoteHistory: pickRemoteHistory,
		restoreURL: restoreURL,
		toggleControls: toggleControls,
		saveExifAsImage: saveExifAsImage,
		saveURL: saveURL,
		setFontSize: setFontSize,
		setRelativeFontSize: setRelativeFontSize,
		showReleaseNotes: showReleaseNotes,
		simplePrint: simplePrint,
		toJavaScriptConsole: toJavaScriptConsole,
		setExifDirectorySeparator: setExifDirectorySeparator
	};
}, ['globals', 'utils', 'moz-utils', 'logging']);
;ExifViewerApp.add('moz-utils', function _moz_utils(globals, logging) {
	'use strict';
	var strbundle = document.getElementById('strings'),	// legacy
		bc = (window.chrome  ||  window.browser),		// webext
		RESTRICTED = true;								// chrome has limited charset for keys

	function getPStringLegacy(key) {
		var value;
		
		key = '' + key;
		try {
			value = strbundle.getString(key);
			
			if (value) {
				return value.replace(/&#([0-9]+);/g, function (str, p1) { return String.fromCharCode(p1); });
			} else {
				return key;
			}
		} catch (e) {
			logging.log(key, e);
			return key;
		}
	}	// getPStringLegacy()
	
	function getPStringWebExt(key) {
		var value;
		
		key = '' + key;
		if (RESTRICTED) { key = key.replace(/[^a-zA-Z0-9_@]/g, '_'); }
		try {
			value = bc.i18n.getMessage(key);
			
			if (value !== '') {
				return value;
			} else {
				return key;
			}
		} catch (e) {
			logging.log(key, e);
			return key;
		}
	}	// getPStringWebExt()

	function getPStringOldLegacy(key) {
		try {
			return strbundle.getString(key);
		} catch (e) {
			logging.log(e);
			return key;
		}
	}	// getPStringOldLegacy()

	function getFormattedPStringLegacy(key, inserts) {
		key = '' + key;
		try {
			return strbundle.getFormattedString(key, inserts);
		} catch (e) {
			logging.log(key, e);
			return key + ' [' + inserts.join(' / ') + ']';
		}
	}	// getFormattedPStringLegacy()
	
	function getFormattedPStringWebExt(key, inserts) {
		var value;
		
		key = '' + key;
		if (RESTRICTED) { key = key.replace(/[^a-zA-Z0-9_@]/g, '_'); }
		try {
			value = bc.i18n.getMessage(key, inserts);
			
			if (value !== '') {
				return value;
			} else {
				return key;
			}
		} catch (e) {
			logging.log(key, e);
			return key + ' [' + inserts.join(' / ') + ']';
		}
	}	// getFormattedPStringWebExt()

	function getPString(key) {
		if (globals.isLegacy) {
			return getPStringLegacy(key);
		} else if (globals.isWebExt) {
			return getPStringWebExt(key);
		} else {
			return key;
		}
	}	// getPString()

	function getFormattedPString(key, inserts) {
		if (globals.isLegacy) {
			return getFormattedPStringLegacy(key, inserts);
		} else if (globals.isWebExt) {
			return getFormattedPStringWebExt(key, inserts);
		} else {
			return key;
		}
	}	// getFormattedPString()

	return {
		getPString: getPString,
		getFormattedPString: getFormattedPString	
	};
}, ['globals', 'logging']);;ExifViewerApp.add('storage', function _storage(globals) {
	'use strict';
	var localStorage;
	
	globals.isMozilla = (window.browser ? true : false);
	globals.isChrome = (window.chrome  &&  !globals.isMozilla);
	//globals.bc = (window.chrome  ||  window.browser),	// FF defines both, Chrome only chrome
		

	if (globals.isMozilla) {
		localStorage = browser.storage.local;
	} else if (globals.isChrome) {
		localStorage = chrome.storage.local;
	}
	
	function set(obj) {
		localStorage.set(obj);
	}	// set()
	
	function get(arr, callback) {
		if (globals.isMozilla) {
			localStorage.get(arr).then(callback);
		} else if (globals.isChrome) {
			localStorage.get(arr, callback);
		}
	}	// get()
	
	return {
		set: set,
		get: get
	};
}, ['globals']);;ExifViewerApp.add('tags', function _tags(constants, utils, mozutils) {
	'use strict';
	
	var getExifInterpretedTagData, getExifTagNumber, getExifIOPTagNumber, getExifGPSTagNumber,
	
		GPSLatitudeRefs = {
			N: 'north latitude',
			S: 'south latitude'
		},
		GPSLongitudeRefs = {
			E: 'east longitude',
			W: 'west longitude',
			'E ': 'east longitude',
			'W ': 'west longitude'
		},
		GPSAltitudeRefs = ['sea level (0)', 'sea level reference (negative value) (1)'],
		GPSStatuses = {
			A: 'measurement in progress',
			V: 'measurement interoperability'
		},
		GPSMeasureModes = ['n/a (0)', 'n/a (1)', '2-dimensional (2)', '3-dimensional (3)'],
		GPSSpeedRefs = {
			K: 'kilometers per hour',
			M: 'miles per hour',
			N: 'knots'
		},
		GPSImgDirectionRefs = {
			T: 'true direction',
			M: 'magnetic direction'
		},
		GPSTrackRefs = {
			T: 'true direction',
			M: 'magnetic direction'
		},
		GPSDestLatitudeRefs = {
			N: 'north latitude',
			S: 'south latitude'
		},
		GPSDestLongitudeRefs = {
			E: 'east longitude',
			W: 'west longitude'
		},
		GPSDestBearingRefs = {
			T: 'true direction',
			M: 'magnetic direction'
		},
		GPSDestDistanceRefs = {
			K: 'kilometers',
			M: 'miles',
			N: 'knots'
		},
		Compressions = ['n/a (0)', 'uncompressed (1)', 'n/a (2)', 'n/a (3)', 'n/a (4)', 'n/a (5)', 'JPEG compression (6)'],
		PhotometricInterpretations = ['n/a (0)', 'n/a (1)', 'RGB (2)', 'n/a (3)', 'n/a (4)', 'n/a (5)', 'YCbCr (6)'],
		OrientationFlags = ['undefined (0)', 'normal (1)', 'flipped horizontal (2)', 'rotated 180&#176; (3)', 'flipped vertical (4)',
							 'transposed (5)', 'rotated 90&#176; (6)', 'transversed (7)', 'rotated 270&#176; (8)'],   
		PlanarConfigurations = ['n/a (0)', 'chunky format (1)', 'planar format (2)'],
		ResolutionUnits = ['n/a (0)', 'none (1)', 'inch (2)', 'cm (3)'],
		YCbCrPos = ['n/a (0)', 'centered / center of pixel array (1)', 'co-sited / datum point (2)'],
		ExpProgs = ['n/a (0)', 'manual control (1)', 'normal program (2)', 'aperture priority (3)', 
					'shutter priority (4)', 'creative program (slow program, depth of field) (5)', 
					'action program (high-speed program, fast shutter speed) (6)', 'portrait mode (7)', 
					'landscape mode (8)'],
		SensTypes = ['unknown (0)', 'standard output sensitivity (1)', 'recommended exposure index (2)',
					 'ISO speed (3)', 'SOS and REI (4)', 'SOS and ISO speed (5)', 'REI and ISO speed (6)',
					 'SOS, REI and ISO speed (7)'],
		MeteringModes = ['unknown (0)', 'average (1)', 'center weighted average (2)', 
						 'spot (3)', 'multi-spot (4)', 'pattern / multi-segment (5)', 'partial (6)'],
		LightSources = ['unknown (0)', 'daylight (1)', 'fluorescent (2)', 'tungsten / incandescent (3)', 'flash (4)',
						'n/a (5)', 'n/a (6)', 'n/a (7)', 'n/a (8)', 'fine weather (9)', 'cloudy weather (10)', 'shade(11)', 
						'daylight fluorescent (12)', 'day white fluorescent (13)', 'cool white fluorescent (14)', 
						'white fluorescent (15)', 'warm white fluorescent (16)', 'standard light A (17)',
						'standard light B (18)', 'standard light C (19)', 'D55 (20)', 'D65 (21)', 'D75 (22)', 'D50 (23)',
						'ISO studio tungsten (24)'],
		Flashes = {
			'0x00': 'flash00',				
			'0x01': 'flash01',
			'0x05': 'flash05',				
			'0x07': 'flash07',
			'0x09': 'flash09',				
			'0x0D': 'flash0D',
			'0x0F': 'flash0F',				
			'0x10': 'flash10',
			'0x18': 'flash18',				
			'0x19': 'flash19',
			'0x1D': 'flash1D',				
			'0x1F': 'flash1F',
			'0x20': 'flash20',				
			'0x41': 'flash41',
			'0x45': 'flash45',				
			'0x47': 'flash47',
			'0x49': 'flash49',				
			'0x4D': 'flash4D',
			'0x4F': 'flash4F',				
			'0x59': 'flash59',
			'0x5D': 'flash5D',				
			'0x5F': 'flash5F',
			'0xFF': 'flashFF'
//			'flash did not fire (0)', 'flash fired (1)', 'n/a (2)',
//			'n/a (3)', 'n/a (4)', 'flash fired but strobe return light not detected (5)', 
//			'n/a (6)', 'flash fired and strobe return light detected (7)'],
		},
		Counts = ['n/a (0)', 'n/a (1)', 'x/y coordinates of main subject (2)',
							'x/y coordinates of center and radius of circle (3)', 
							'x/y coordinates of center and width/height of rectangle (4)'],
		ColorSpaces = {
			'-1': 'uncalibrated (-1)',
			1: 'sRGB (1)',
			255: 'uncalibrated (255)',
			65535: 'uncalibrated (65535)',
			4294967295: 'uncalibrated (4294967295)'
		},
		FPUnits = ['n/a (0)', 'none (1)', 'inch (2)', 'centimeter (3)'], 
		SensingMethods = ['n/a (0)', 'n/a (1)', 'one-chip color area sensor (2)',
						  'two-chip color area sensor (3)', 'three-chip color area sensor (4)',
						  'color sequential area sensor (5)', 'n/a', 'trilinear sensor (7)',
						  'color sequential linear sensor (8)'],
		FileSources = ['other (0)', 'transmitting scanner (1)',
					   'reflecting scanner (2)', 'digital still camera (DSC) (3)'],
		SceneCaptureTypes = ['standard (0)', 'landscape (1)', 'portrait (2)', 'night scene (3)'],
		GainControls = ['n/a (0)', 'low gain up (1)', 'high gain up (2)', 
								'low gain down (3)', 'high gain down (4)'],  
		Contrasts = ['normal (0)', 'soft (1)', 'hard (2)'],
		Saturations = ['normal (0)', 'low (1)', 'high (2)'],
		Sharpnesses = ['normal (0)', 'soft (1)', 'hard (2)'],
		SubjectDistanceRanges = ['unknown (0)', 'macro (1)', 'close view (2)', 'distant view (3)'],
		CustomRenders = ['normal process (0)', 'custom process (1)'],
		ExposureModes = ['auto exposure (0)', 'manual exposure (1)', 'auto bracket (2)'],
		WhiteBalances = ['auto (0)', 'manual (1)'],
		ExifTags = {
			'ImageWidth': 					0x0100,
			'ImageLength': 					0x0101,
			'BitsPerSample': 				0x0102,
			'Compression': 					0x0103,
			'PhotometricInterpretation':	0x0106,
			'FillOrder': 					0x010A,
			'DocumentName': 				0x010D,
			'ImageDescription': 			0x010E,
			'Make': 						0x010F,
			'Model': 						0x0110,
			'StripOffsets': 				0x0111,
			'Orientation': 					0x0112,
			'SamplesPerPixel': 				0x0115,
			'RowsPerStrip': 				0x0116,
			'StripByteCounts': 				0x0117,
			'XResolution': 					0x011A,
			'YResolution': 					0x011B,
			'PlanarConfiguration': 			0x011C,
			'ResolutionUnit': 				0x0128,
			'TransferFunction': 			0x012D,
			'Software': 					0x0131,
			'DateTime': 					0x0132,
			'Artist': 						0x013B,
			'HostComputer': 				0x013C,
			'WhitePoint': 					0x013E,
			'PrimaryChromaticities': 		0x013F,
			'ColorMAP': 					0x0140,
			'TransferRange': 				0x0156,
			'JPEGProc': 					0x0200,
			'JPEGInterchangeFormat': 		0x0201,
			'JPEGInterchangeFormatLength': 	0x0202,
			'YCbCrCoefficients': 			0x0211,
			'YCbCrSubSampling': 			0x0212,
			'YCbCrPositioning': 			0x0213,
			'ReferenceBlackWhite': 			0x0214,
			'BatteryLevel': 				0x828F,
			'Copyright': 					0x8298,
			'ExposureTime': 				0x829A,
			'FNumber': 						0x829D,
			'IPTC/NAA': 					0x83BB,
			'ExifIFDPointer': 				0x8769,
			'InterColorProfile': 			0x8773,
			'ExposureProgram': 				0x8822,
			'SpectralSensitivity': 			0x8824,
			'GPSInfoIFDPointer': 			0x8825,
			'ISOSpeedRatings': 				0x8827,
			'OECF': 						0x8828,
			'SensitivityType': 				0x8830,
			'StandardOutputSensitivity':	0x8831,
			'RecommendedExposureIndex':		0x8832,
			'ISOSpeed': 					0x8833,
			'ISOSpeedLatitudeyyy': 			0x8834,
			'ISOSpeedLatitudezzz': 			0x8835,
			'ExifVersion': 					0x9000,
			'DateTimeOriginal': 			0x9003,
			'DateTimeDigitized': 			0x9004,
			'ComponentsConfiguration': 		0x9101,
			'CompressedBitsPerPixel': 		0x9102,
			'ShutterSpeedValue': 			0x9201,
			'ApertureValue': 				0x9202,
			'BrightnessValue': 				0x9203,
			'ExposureBiasValue': 			0x9204,
			'MaxApertureValue': 			0x9205,
			'SubjectDistance': 				0x9206,
			'MeteringMode': 				0x9207,
			'LightSource': 					0x9208,
			'Flash': 						0x9209,
			'FocalLength': 					0x920A,
			'SubjectArea': 					0x9214,
			'MakerNote': 					0x927C,
			'UserComment': 					0x9286,
			'SubSecTime': 					0x9290,
			'SubSecTimeOriginal': 			0x9291,
			'SubSecTimeDigitized': 			0x9292,
			'FlashpixVersion': 				0xA000,
			'ColorSpace': 					0xA001,
			'PixelXDimension': 				0xA002,
			'PixelYDimension': 				0xA003,
			'RelatedSoundFile': 			0xA004,
			'InteroperabilityIFDPointer': 	0xA005,
			'FlashEnergy': 					0xA20B,	// 0x920B in TIFF/EP
			'SpatialFrequencyResponse':		0xA20C,	// 0x920C    -  -
			'FocalPlaneXResolution': 		0xA20E,	// 0x920E    -  -
			'FocalPlaneYResolution': 		0xA20F,	// 0x920F    -  -
			'FocalPlaneResolutionUnit': 	0xA210,	// 0x9210    -  -
			'SubjectLocation': 				0xA214,	// 0x9214    -  -
			'ExposureIndex': 				0xA215,	// 0x9215    -  -
			'SensingMethod': 				0xA217,	// 0x9217    -  -
			'FileSource': 					0xA300,
			'SceneType': 					0xA301,
			'CFAPattern': 					0xA302,	// 0x828E in TIFF/EP
			'CustomRendered': 				0xA401,
			'ExposureMode': 				0xA402,
			'WhiteBalance': 				0xA403,
			'DigitalZoomRatio': 			0xA404,
			'FocalLengthIn35mmFilm': 		0xA405,
			'SceneCaptureType': 			0xA406,
			'GainControl': 					0xA407,
			'Contrast': 					0xA408,
			'Saturation': 					0xA409,
			'Sharpness': 					0xA40A,
			'DeviceSettingDescription': 	0xA40B,
			'SubjectDistanceRange': 		0xA40C,
			'ImageUniqueID': 				0xA420,
			'CameraOwnerName': 				0xA430,
			'BodySerialNumber': 			0xA431,
			'LensSpecification': 			0xA432,
			'LensMaker': 					0xA433,
			'LensModel': 					0xA434,
			'LensSerialNumber': 			0xA435,
			'Lens':							0xFDEA
		},
		IopTags = {
			'InteroperabilityIndex': 		0x0001,
			'InteroperabilityVersion':		0x0002,
			'RelatedImageFileFormat': 		0x1000,
			'RelatedImageWidth': 			0x1001,
			'RelatedImageLength': 			0x1002
		},
		GpsTags = {
			'GPSVersionID': 		0x00,
			'GPSLatitudeRef': 		0x01,
			'GPSLatitude': 			0x02,
			'GPSLongitudeRef': 		0x03,
			'GPSLongitude': 		0x04,
			'GPSAltitudeRef': 		0x05,
			'GPSAltitude': 			0x06,
			'GPSTimeStamp': 		0x07,
			'GPSSatellites': 		0x08,
			'GPSStatus': 			0x09,
			'GPSMeasureMode': 		0x0A,
			'GPSDOP': 				0x0B,
			'GPSSpeedRef': 			0x0C,
			'GPSSpeed': 			0x0D,
			'GPSTrackRef': 			0x0E,
			'GPSTrack': 			0x0F,
			'GPSImgDirectionRef':	0x10,
			'GPSImgDirection': 		0x11,
			'GPSMapDatum': 			0x12,
			'GPSDestLatitudeRef': 	0x13,
			'GPSDestLatitude': 		0x14,
			'GPSDestLongitudeRef':	0x15,
			'GPSDestLongitude': 	0x16,
			'GPSDestBearingRef': 	0x17,
			'GPSDestBearing': 		0x18,
			'GPSDestDistanceRef': 	0x19,
			'GPSDestDistance': 		0x1A,
			'GPSProcessingMethod':	0x1B,
			'GPSAreaInformation': 	0x1C,
			'GPSDateStamp': 		0x1D,
			'GPSDifferential': 		0x1E,
			'GPSHPositioningError':	0x1F 
		};

	MeteringModes[255] = 'other (255)';
	LightSources[255] = 'other (255)';
	
	constants.GPSAltitudeRefs = GPSAltitudeRefs;
	constants.GPSImgDirectionRefs = GPSImgDirectionRefs;

	// Exif 2.2
	getExifInterpretedTagData = function _getExifInterpretedTagData(tagnum, data, dtype, tagid) {
		var ids, out, output = '', tmp, val, data2, char_code;

		switch (tagnum) {
		case 0x0000:	// GPSVersionID (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x00', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;			
		case 0x0001:	// InteroperabilityIndex (Iop IFD), GPSLatitudeRef (GPS IFD) 
			if (dtype === 'GPS') {
//				output = mozutils.getFormattedPString('x01', [data]);	// North or South latitude
				output = mozutils.getFormattedPString('x01', [mozutils.getPString(GPSLatitudeRefs[data] || data)]);
			} else { 
				output = mozutils.getFormattedPString('x0001', [utils.cleanExifStringData(data)]);
			}
			break;
		case 0x0002:	// (Iop IFD?), GPSLatitude (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x02', [data , utils.formatLatLong(data, 5)]);
			} else {
				output = mozutils.getFormattedPString('x0002', [utils.cleanExifStringData(utils.bytesToString(data))]);
			}
			break;
		case 0x0003:	// GPSLongitudeRef (GPS IFD)
			if (dtype === 'GPS') {
//				output = mozutils.getFormattedPString('x03', [data]);	// East or West
				output = mozutils.getFormattedPString('x03', [mozutils.getPString(GPSLongitudeRefs[data] || data)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0004:	// GPSLongitude (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x04', [data , utils.formatLatLong(data, 5)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0005:	// GPSAltitudeRef (GPS IFD)
			if (dtype === 'GPS') {
//				output = mozutils.getFormattedPString('x05', [(data == 0 ? 'sea level' : 'sea level reference (negative value)')]);
				output = mozutils.getFormattedPString('x05', [GPSAltitudeRefs[data] ? mozutils.getPString(GPSAltitudeRefs[data]) : data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0006:	// GPSAltitude (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x06', [data , utils.formatRational(data, 2)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0007:	// GPSTimeStamp (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x07', [data , utils.formatTimestamp(data, 2)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0008:	// GPSSatellites (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x08', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0009:	// GPSStatus (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x09', [mozutils.getPString(GPSStatuses[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x000A:	// GPSMeasureMode (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x0A', [mozutils.getPString(GPSMeasureModes[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x000B:	// GPSDOP (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x0B', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x000C:	// GPSSpeedRef (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x0C', [mozutils.getPString(GPSSpeedRefs[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x000D:	// GPSSpeed (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x0D', [data , utils.formatRational(data, 2)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x000E:	// GPSTrackRef (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x0E', [mozutils.getPString(GPSTrackRefs[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x000F:	// GPSTrack (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x0F', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0010:	// GPSImgDirectionRef (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x10', [mozutils.getPString(GPSImgDirectionRefs[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0011:	// GPSImgDirection (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x11', [data , utils.formatRational(data, 2)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0012:	// GPSMapDatum (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x12', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0013:	// GPSDestLatitudeRef (GPS IFD)
			if (dtype === 'GPS') {
//				output = mozutils.getFormattedPString('x13', [data]);	// North or South
				output = mozutils.getFormattedPString('x13', [mozutils.getPString(GPSDestLatitudeRefs[data] || data)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0014:	// GPSDestLatitude (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x14', [data , utils.formatLatLong(data, 5)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0015:	// GPSDestLongitudeRef (GPS IFD)
			if (dtype === 'GPS') {
//				output = mozutils.getFormattedPString('x15', [data]); // East or West
				output = mozutils.getFormattedPString('x15', [mozutils.getPString(GPSDestLongitudeRefs[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0016:	// GPSDestLongitude (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x16', [data , utils.formatLatLong(data, 5)]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0017:	// GPSDestBearingRef (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x17', [mozutils.getPString(GPSDestBearingRefs[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0018:	// GPSDestBearing (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x18', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x0019:	// GPSDestDistanceRef (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x19', [mozutils.getPString(GPSDestDistanceRefs[data])]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x001A:	// GPSDestDistance (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x1A', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x001B:	// GPSProcessingMethod (GPS IFD)
			if (dtype === 'GPS') {
//				output = mozutils.getFormattedPString('x1B', [data]);
				output = mozutils.getFormattedPString('x1B', [String.fromCharCode.apply(String, data.split(','))]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x001C:	// GPSAreaInformation (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x1C', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x001D:	// GPSDateStamp (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x1D', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x001E:	// GPSDifferential (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x1E', [(data == 0 ? mozutils.getPString('no differential correction (0)') : mozutils.getPString('differential correction applied (1)'))]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x001F:	// GPSHPositioningError (GPS IFD)
			if (dtype === 'GPS') {
				output = mozutils.getFormattedPString('x1F', [data]);
			} else {
				output = mozutils.getFormattedPString('invalidGPStag', [utils.zeroPad(tagnum) , data]);
			}
			break;
		case 0x00FE:	// (Iop IFD?)
			output = mozutils.getFormattedPString('x00FE', [data]);
			break; 	
		case 0x00FF:	// (Iop IFD?)
			output = mozutils.getFormattedPString('x00FF', [data]);
			break;
		case 0x0100:	// ImageWidth
			output = mozutils.getFormattedPString('x0100', [data]);
			break;
		case 0x0101:	// ImageLength
			output = mozutils.getFormattedPString('x0101', [data]);
			break;
		case 0x0102:	// BitsPerSample  
			output = mozutils.getFormattedPString('x0102', [data]);
			break;
		case 0x0103:	// Compression
			output = mozutils.getFormattedPString('x0103', [mozutils.getPString(Compressions[data])]);
			break;
		case 0x0106:	// PhotometricInterpretation 
			output = mozutils.getFormattedPString('x0106', [mozutils.getPString(PhotometricInterpretations[data])]);
			break;
		case 0x010E:	// ImageDescription 
			output = mozutils.getFormattedPString('x010E', [data]);
			break;
		case 0x010F:	// Make
			output = mozutils.getFormattedPString('x010F', [data]);
			break;
		case 0x0110:	// Model
			output = mozutils.getFormattedPString('x0110', [data]);
			break;
		case 0x0111:	// StripOffsets
			output = mozutils.getFormattedPString('x0111', [data]);
			break;
		case 0x0112:	// Orientation 
			output = mozutils.getFormattedPString('x0112', [mozutils.getPString(data >= 0 &&  data <= 8 ? OrientationFlags[data] : '(invalid value)')]);
			break;
		case 0x0115:	// SamplesPerPixel 
			output = mozutils.getFormattedPString('x0115', [data]);
			break;
		case 0x0116:	// RowsPerStrip 
			output = mozutils.getFormattedPString('x0116', [data]);
			break;
		case 0x0117:	// StripByteCounts 
			output = mozutils.getFormattedPString('x0117', [data]);
			break;
		case 0x011A:	// XResolution
			output = mozutils.getFormattedPString('x011A', [data , utils.formatRational(data, 2)]);
			break;
		case 0x011B:	// YResolution
			output = mozutils.getFormattedPString('x011B', [data , utils.formatRational(data, 2)]);
			break;
		case 0x011C:	// PlanarConfiguration
			output = mozutils.getFormattedPString('x011C', [mozutils.getPString(PlanarConfigurations[data])]);
			break;
		case 0x0128:	// ResolutionUnit 
			output = mozutils.getFormattedPString('x0128', [mozutils.getPString(ResolutionUnits[data])]);
			break;
		case 0x012D:	// Transfer
			output = mozutils.getFormattedPString('x012D', [data]);
			break; 	
		case 0x0131:	// Software
			output = mozutils.getFormattedPString('x0131', [data]);
			break;
		case 0x0132:	// DateTime
			output = mozutils.getFormattedPString('x0132', [data]);
			break;
		case 0x013B:	// Artist
			output = mozutils.getFormattedPString('x013B', [data]);
			break;	
		case 0x013C:	// Host Computer
			output = mozutils.getFormattedPString('x013C', [data]);
			break;	
		case 0x013D:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x013D', [data]);
			break; 	
		case 0x013E:	// WhitePoint 
			output = mozutils.getFormattedPString('x013E', [data , utils.formatRationals(data, 3)]);
			break;
		case 0x013F:	// PrimaryChromaticities
			output = mozutils.getFormattedPString('x013F', [data , utils.formatRationals(data, 2)]);
			break;
		case 0x0140:	// Color MAP
			output = mozutils.getFormattedPString('x0140', [data]);
			break;	
		case 0x0142:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x0142', [data]);
			break; 	
		case 0x0143:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x0143', [data]);
			break; 	
		case 0x0144:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x0144', [data]);
			break;	
		case 0x0145:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x0145', [data]);
			break;	
		case 0x014A:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x014A', [data]);
			break;	
		case 0x015B:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x015B', [data]);
			break;	
		case 0x0201:	// JPEGInterchangeFormat 
			output = mozutils.getFormattedPString('x0201', [data]);
			break;
		case 0x0202:	// JPEGInterchangeFormatLength
			output = mozutils.getFormattedPString('x0202', [data]);
			break;
		case 0x0211:	// YCbCrCoefficients 
			output = mozutils.getFormattedPString('x0211', [data , utils.formatRationals(data, 3)]);
			break;
		case 0x0212:	// YCbCrSubSampling 
			// 2,1 = YCbCr4:2:2 
			// 2,2 = YCbCr4:2:0 
			output = mozutils.getFormattedPString('x0212', [data]);
			break;
		case 0x0213:	// YCbCrPositioning
			output = mozutils.getFormattedPString('x0213', [mozutils.getPString(YCbCrPos[data])]);
			break;
		case 0x0214:	// ReferenceBlackWhite 
			output = mozutils.getFormattedPString('x0214', [data]);
			break;
		case 0x1000:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x1000', [data]);
			break;
		case 0x1001:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x1001', [data]);
			break;
		case 0x1002:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x1002', [data]);
			break;
		case 0x828D:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x828D', [data]);
			break; 	
		case 0x828E:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x828E', [data]);
			break;	
		case 0x828F:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x828F', [data]);
			break; 	
		case 0x8298:	// Copyright (Exif IFD)
			output = mozutils.getFormattedPString('x8298', [data]);
			break;
		case 0x829A:	// ExposureTime (Exif IFD)
			if (data  &&  data.split) {
				tmp = data.split('/');
				if (tmp.length != 2  ||  tmp[0] == '1'  ||  (val = tmp[0] / tmp[1]) > 1) {
					output = mozutils.getFormattedPString('x829A', [data , utils.formatRational(data, 5)]);
				} else {
					data2 = utils.roundValue(1 / val, 5); 
					output = mozutils.getFormattedPString('y829A', [data , data2, utils.formatRational(data, 5)]);
				}
			} else {
				output = mozutils.getFormattedPString('x829A', [data , '1/?']);
			}
			break;
		case 0x829D:	// FNumber (Exif IFD)
			output = mozutils.getFormattedPString('x829D', [data , utils.formatRational(data, 2)]);
			break;
		case 0x83BB:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x83BB', [data]);
			break;	
		case 0x8773:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x8773', [data]);
			break;	
		case 0x8822:	// ExposureProgram (Exif IFD)
			output = mozutils.getFormattedPString('x8822', [mozutils.getPString(ExpProgs[data])]);
			break;
		case 0x8824:	// SpectralSensitivity (Exif IFD)
			output = mozutils.getFormattedPString('x8824', [data]);
			break;	
		case 0x8827:	// ISOSpeedRatings (Exif IFD)
			output = mozutils.getFormattedPString('x8827', [data]);
			break;
		case 0x8828:	// OECF (Exif IFD)
			// similar to 0xA302
			output = mozutils.getFormattedPString('x8828', [data]);
			break;	
		case 0x8829:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x8829', [data]);
			break; 	
		case 0x8830:	// SensitivityType
			output = mozutils.getFormattedPString('x8830', [mozutils.getPString(SensTypes[data])]);
			break; 	
		case 0x8831:	// StandardOutputSensitivity
			output = mozutils.getFormattedPString('x8831', [data]);
			break; 	
		case 0x8832:	// RecommendedExposureIndex
			output = mozutils.getFormattedPString('x8832', [data]);
			break; 	
		case 0x8833:	// ISOSpeed
			output = mozutils.getFormattedPString('x8833', [data]);
			break; 	
		case 0x8834:	// ISOSpeedLatitudeyyy
			output = mozutils.getFormattedPString('x8834', [data]);
			break; 	
		case 0x8835:	// ISOSpeedLatitudezzz
			output = mozutils.getFormattedPString('x8835', [data]);
			break; 	
		case 0x882A:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x882A', [data]);
			break; 	
		case 0x882B:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x882B', [data]);
			break; 	
		case 0x9000:	// ExifVersion (Exif IFD)
			output = mozutils.getFormattedPString('x9000', [utils.bytesToString(data)]);
			break;
		case 0x9003:	// DateTimeOriginal (Exif IFD)
			output = mozutils.getFormattedPString('x9003', [data]);
			break;
		case 0x9004:	// DateTimeDigitized (Exif IFD)
			output = mozutils.getFormattedPString('x9004', [data]);
			break;
		case 0x9101:	// ComponentsConfiguration (Exif IFD)
			if (typeof data === 'number') {
				out = [];
				tmp = data;
				while (tmp !== 0) {
					out.push(utils.byteToHex(tmp % 256));
					tmp >>= 8;
				}
				data2 = out.join(',');
			} else {
				data2 = data
			}
			if (data2  &&  data2.replace) {
				output = mozutils.getFormattedPString('x9101', [data ,
								data2.replace(/0x01/g, 'Y').replace(/0x02/g, 'Cb').replace(/0x03/g, 'Cr')
									 .replace(/0x04/g, 'R').replace(/0x05/g, 'G').replace(/0x06/g, 'B')
									 .replace(/0x00/g, '').replace(/,/g, '')]);
			} else {
				output = mozutils.getFormattedPString('x9101', [data , '?']);
			}
			break;
		case 0x9102:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9102', [data , utils.formatRational(data, 2)]);
			break;
		case 0x9201:	// ShutterSpeedValue (Exif IFD)
			tmp = data.split('/');
			output = mozutils.getFormattedPString('x9201', [data , '<br>' ,
								utils.roundValue(Math.pow(2, tmp[0]/tmp[1]), 2)]);
			break;
		case 0x9202:	// ApertureValue (Exif IFD)
			tmp = data.split('/');
			output = mozutils.getFormattedPString('x9202', [data , '<br>' ,
								utils.roundValue(Math.pow(2, tmp[0]/tmp[1]/2), 2)]);
			break;
		case 0x9203:	// BrightnessValue (Exif IFD)
			tmp = data.split('/');
			output = mozutils.getFormattedPString('x9203', [data , '<br>' ,
								utils.roundValue(Math.pow(2, tmp[0]/tmp[1]), 2)]);
			break;
		case 0x9204:	// ExposureBiasValue (Exif IFD)
			output = mozutils.getFormattedPString('x9204', [data , utils.formatRational(data, 2)]);
			break;
		case 0x9205:	// MaxApertureValue (Exif IFD)
			tmp = data.split('/');
			output = mozutils.getFormattedPString('x9205', [data , utils.formatRational(data, 2) , '<br>' ,
								utils.roundValue(Math.pow(2, tmp[0]/tmp[1]/2), 2)]);
			break;
		case 0x9206:	// SubjectDistance (Exif IFD)
			output = mozutils.getFormattedPString('x9206', [data]);
			break;
		case 0x9207:	// MeteringMode (Exif IFD)
			output = mozutils.getFormattedPString('x9207', [(MeteringModes[data] ? mozutils.getPString(MeteringModes[data]) : mozutils.getPString('n/a') + ' (' + data + ')')]);
			break;
		case 0x9208:	// LightSource (Exif IFD)
			output = mozutils.getFormattedPString('x9208', [(LightSources[data] ? mozutils.getPString(LightSources[data]) : mozutils.getPString('n/a') + ' (' + data + ')')]);
			break;
		case 0x9209:	// Flash (Exif IFD)
			output = mozutils.getFormattedPString('x9209', [Flashes[data] ? mozutils.getPString(Flashes[data]) : mozutils.getPString('n/a') + ' (' + data + ')']);
			break;
		case 0x920A:	// FocalLength (Exif IFD)
			output = mozutils.getFormattedPString('x920A', [data , utils.formatRational(data, 2)]);
			break;
		case 0x920B:	// FlashEnergy (Exif IFD) ???
			output = mozutils.getFormattedPString('x920B', [data]);
			break; 	
		case 0x920C:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x920C', [data]);
			break;	
		case 0x920D:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x920D', [data]);
			break;	
		case 0x9211:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9211', [data]);
			break; 	
		case 0x9212:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9212', [data]);
			break; 	
		case 0x9213:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9213', [data]);
			break;	
		case 0x9214:	// SubjectArea (Exif IFD)
			if (data  &&  data.split) {
				tmp = data.split(',');
				output = mozutils.getFormattedPString('x9214_1', [data , mozutils.getPString(Counts[tmp.length])]);
			} else {
				output = mozutils.getFormattedPString('x9214_2', [data ? data : mozutils.getPString('n/a')]);
			}
			break; 	
		case 0x9215:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9215', [data]);
			break; 	
		case 0x9216:	// (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9216', [data]);
			break; 	
		case 0x927C:	// MakerNote (Exif IFD)
			output = mozutils.getFormattedPString('x927C', [data]);
			break;
		case 0x9286:	// UserComment (Exif IFD)
			char_code = 'unknown';
			if (data) {
				if (data.indexOf) {
					if (data.indexOf('0x41,0x53,0x43,0x49,0x49,0x00,0x00,0x00') === 0) {
						char_code = 'ASCII';
					} else if (data.indexOf('0x4a,0x49,0x53,0x00,0x00,0x00,0x00,0x00') === 0) {
						char_code = 'JIS';
					} else if (data.indexOf('0x55,0x4e,0x49,0x43,0x4f,0x44,0x45,0x00') === 0) {
						char_code = 'Unicode';
					} else if (data.indexOf('0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00') === 0) {
						if (/^(0x00,)*0x00$/.test(data)) {
							char_code = 'not defined';
						} else {
							char_code = 'ASCII';
						}
					}
				}
				output = mozutils.getFormattedPString('x9286_1', [data , '<br>' , mozutils.getPString(char_code)]);
				if (char_code === 'ASCII') {
					tmp = mozutils.getFormattedPString('x9286_2', ['<br>' , utils.bytesToString(data.substr(8*5))]);
					tmp = utils.cleanExifHTML(tmp);
					if (tmp.match(/^[\x00-\x7F\r\n]+$/)) {
						output += tmp;
					} else { 
						output += '<br>' + mozutils.getPString('nonASCII');
					}
				} else if (char_code === 'Unicode') {
					output += mozutils.getFormattedPString('x9286_2', ['<br>' , utils.cleanUTF8StringData(utils.bytesToString(data.substr(8*5)))]);
					//console.log('unicode detected');
				}
			}
			break;
		case 0x9290:	// SubsecTime (Exif IFD)
			output = mozutils.getFormattedPString('x9290', [data]);
			break;
		case 0x9291:	// SubsecTimeOriginal (Exif IFD)
			output = mozutils.getFormattedPString('x9291', [data]);
			break;
		case 0x9292:	// SubsecTimeDigitized (Exif IFD)
			output = mozutils.getFormattedPString('x9292', [data]);
			break;
		case 0xA000:	// FlashpixVersion (Exif IFD)
			output = mozutils.getFormattedPString('xA000', [utils.bytesToString(data)]);
//			output = mozutils.getFormattedPString('xA000', [window.escape(data)]);
			break;
		case 0xA001:	// ColorSpace (Exif IFD)
			output = mozutils.getFormattedPString('xA001', [ColorSpaces[data] ? mozutils.getPString(ColorSpaces[data]) : data]);
			break;
		case 0xA002:	// PixelXDimension (Exif IFD)
			output = mozutils.getFormattedPString('xA002', [data]);
			break;
		case 0xA003:	// PixelYDimension (Exif IFD)
			output = mozutils.getFormattedPString('xA003', [data]);
			break;
		case 0xA004:	// RelatedSoundFile (Exif IFD)
			output = mozutils.getFormattedPString('xA004', [data]);
			break;
		case 0xA20B:	// FlashEnergy (Exif IFD)
			output = mozutils.getFormattedPString('xA20B', [data]);
			break; 	
		case 0xA20C:	// SpatialFrequencyResponse (Exif IFD)
			// like 0xA302
			output = mozutils.getFormattedPString('xA20C', [data]);
			break; 	
		case 0xA20E:	// FocalPlaneXResolution (Exif IFD)
			output = mozutils.getFormattedPString('xA20E', [data , utils.formatRational(data, 2)]);
			break; 
		case 0xA20F:	// FocalPlaneYResolution (Exif IFD)
			output = mozutils.getFormattedPString('xA20F', [data , utils.formatRational(data, 2)]);
			break;
		case 0xA210:	// FocalPlaneResolutionUnit (Exif IFD)
			output = mozutils.getFormattedPString('xA210', [mozutils.getPString(FPUnits[data])]);
			break;
		case 0xA214:	// SubjectLocation (Exif IFD)
			output = mozutils.getFormattedPString('xA214', [data]);
			break;
		case 0xA215:	// ExposureIndex (Exif IFD)
			output = mozutils.getFormattedPString('xA215', [data]);
			break;
		case 0xA217:	// SensingMethod (Exif IFD)
			output = mozutils.getFormattedPString('xA217', [SensingMethods[data] ? mozutils.getPString(SensingMethods[data]) : data]);
			break;
		case 0xA300:	// FileSource (Exif IFD)
//			output = mozutils.getFormattedPString('xA300', [data == '0x03,0x00,0x00,0x00'  ||  data == '3' ? mozutils.getPString('digital still camera (DSC)') : data]);
			output = mozutils.getFormattedPString('xA300', [FileSources[data] ? mozutils.getPString(FileSources[data]) : data]);
			break;
		case 0xA301:	// SceneType (Exif IFD)
			output = mozutils.getFormattedPString('xA301', [data == '0x01,0x00,0x00,0x00'  ||  data == '1' ? mozutils.getPString('directly photographed image') : data]);
			break;
		case 0xA302:	// CFAPattern (Exif IFD)
			// 1st 2 bytes = horizontal array length
			// 2nd 2 bytes = vertical array length
			// next bytes are the color values, row by row (123456 => Red/Green/Blue/Cyan/Magenta/Yellow/White)
			output = mozutils.getFormattedPString('xA302', [data]);
			break;
		case 0xA401:	// CustomRendered (Exif IFD)
			output = mozutils.getFormattedPString('xA401', [CustomRenders[data] ? mozutils.getPString(CustomRenders[data]) : data]);
			break;
		case 0xA402:	// ExposureMode (Exif IFD)
			output = mozutils.getFormattedPString('xA402', [mozutils.getPString(ExposureModes[data])]);
			break;
		case 0xA403:	// WhiteBalance (Exif IFD)
			output = mozutils.getFormattedPString('xA403', [mozutils.getPString(WhiteBalances[data])]);
			break; 
		case 0xA404:	// DigitalZoomRatio (Exif IFD)
			output = mozutils.getFormattedPString('xA404', [data , utils.formatRational(data, 2)]);
			break;
		case 0xA405:	// FocalLengthIn35mmFilm (Exif IFD)
			output = mozutils.getFormattedPString('xA405', [data]);
			break;
		case 0xA406:	// SceneCaptureType (Exif IFD)
			output = mozutils.getFormattedPString('xA406', [mozutils.getPString(SceneCaptureTypes[data])]);
			break;
		case 0xA407:	// GainControl (Exif IFD)
			output = mozutils.getFormattedPString('xA407', [mozutils.getPString(GainControls[data])]);
			break;
		case 0xA408:	// Contrast (Exif IFD)
			output = mozutils.getFormattedPString('xA408', [mozutils.getPString(Contrasts[data])]);
			break;
		case 0xA409:	// Saturation (Exif IFD)
			output = mozutils.getFormattedPString('xA409', [mozutils.getPString(Saturations[data])]);
			break;
		case 0xA40A:	// Sharpness (Exif IFD)
			output = mozutils.getFormattedPString('xA40A', [mozutils.getPString(Sharpnesses[data])]);
			break;
		case 0xA40B:	// DeviceSettingDescription (Exif IFD)
			// like 0xA302 
			output = mozutils.getFormattedPString('xA40B', [data]);
			break;
		case 0xA40C:	// SubjectDistanceRange (Exif IFD)
			output = mozutils.getFormattedPString('xA40C', [mozutils.getPString(SubjectDistanceRanges[data])]);
			break;
		case 0xA420:	// ImageUniqueID (Exif IFD)
			output = mozutils.getFormattedPString('xA420', [data]);
			break;
		case 0xA430:	// CameraOwnerName (Exif IFD)
			output = mozutils.getFormattedPString('xA430', [data]);
			break;
		case 0xA431:	// BodySerialNumber (Exif IFD)
			output = mozutils.getFormattedPString('xA431', [data]);
			break;
		case 0xA432:	// LensSpecification (Exif IFD)
			if (data) {
				out = utils.formatRationals(data, 3);
				tmp = out.split(',', 4);
				if (tmp.length === 4) {
					output = mozutils.getFormattedPString('xA432', [tmp[0].replace(/\s+/g, '') + '-' + tmp[1].replace(/\s+/, '') + 'mm F' + tmp[2].replace(/\s+/, '') + '-' + tmp[3].replace(/\s+/g, '')]);
				} else {
					output = mozutils.getFormattedPString('xA432', [data]);
				}
			} else {
				output = mozutils.getFormattedPString('xA432', [data]);
			}
			break;
		case 0xA433:	// LensMaker (Exif IFD)
			output = mozutils.getFormattedPString('xA433', [data]);
			break;
		case 0xA434:	// LensModel (Exif IFD)
			output = mozutils.getFormattedPString('xA434', [data]);
			break;
		case 0xA435:	// LensSerialNumber (Exif IFD)
			output = mozutils.getFormattedPString('xA435', [data]);
			break;
/*		case 0xFDEA:	// Lens
			output = data;
			break;*/
		case 0xA500:	// Gamma (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('xA500', [data , utils.formatRational(data, 2)]);
			break;
		case 0xC4A5:	// Print Image Matching
			if (data) {
				tmp = data.split('0x00', 2);
				if (tmp.length === 2) {
					output = mozutils.getFormattedPString('xC4A5_1', [String.fromCharCode.apply(String, tmp[0].replace(/^,|,$/g, "").split(',')) , '<br>' , String.fromCharCode.apply(String, tmp[1].replace(/^,|,$/g, "").split(','))]);
				} else {
					output += mozutils.getFormattedPString('xC4A5_2', [data]);
				}
			} else
				output = mozutils.getFormattedPString('xC4A5_2', [data]);
			break;
		case 0x9C9B:	// Microsoft.XP.Title (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9C9B', [utils.bytesToString(data)]);
			break;
		case 0x9C9C:	// Microsoft.XP.Comment (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9C9C', [utils.bytesToString(data)]);
			break;
		case 0x9C9D:	// Microsoft.XP.Author (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9C9D', [utils.bytesToString(data)]);
			break;
		case 0x9C9E:	// Microsoft.XP.Keywords (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9C9E', [utils.bytesToString(data)]);
			break;
		case 0x9C9F:	// Microsoft.XP.Subject (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('x9C9F', [utils.bytesToString(data)]);
			break;
		case 0xEA1C:	// Microsoft.Padding (Not in Exif 2.2 specifications)
			output = mozutils.getFormattedPString('xEA1C', [utils.bytesToString(data)]);
			break;
		default:
			output = mozutils.getFormattedPString('unknownTag', [utils.zeroPad(tagnum) , data]);
			break;
		}
		if (tagid) {
			ids = tagnum.toString(16).toUpperCase();
			ids = '0000'.substr(0, (dtype == 'GPS' ? 2 : 4) - ids.length) + ids;
			output = output.replace(/=/, ' {0x' + ids + '} =');
		}
		return output; 
	};	// getExifInterpretedTagData()

	getExifTagNumber = function _getExifTagNumber(text) {
		return ExifTags[text]; 
	};	// getExifTagNumber()

	getExifIOPTagNumber = function _getExifIOPTagNumber(text) {
		return IopTags[text];
	};	// getExifIOPTagNumber()

	getExifGPSTagNumber = function _getExifGPSTagNumber(text) {
		return GpsTags[text];
	};	// getExifGPSTagNumber()

	return {
		getExifInterpretedTagData: getExifInterpretedTagData
	};
}, ['constants', 'utils', 'moz-utils']);;ExifViewerApp.add('utils', function _utils(constants, mozutils, logging, html) {
	'use strict';
	var parser = new DOMParser();
	
	function bytesToAscii(bytes) {
		var i, out = [],
			abytes = bytes.split(',');

		for (i = 0 ; i < abytes.length ; i += 1) {
			out.push(String.fromCharCode(abytes[i]));
		}
		return out.join('');
	}	// bytesToAscii()

	function formatNumber(num, inDec, outDec, outSep) {
		var dpos, numEnd,
			rgx = /(\d+)(\d{3})/;
		// taken from http://www.mredkj.com/javascript/nfbasic.html
		inDec = inDec || '.';
		outDec = outDec || '.';
		outSep = outSep || ',';
		num += '';
		dpos = num.indexOf(inDec);
		numEnd = '';
		if (dpos !== -1) {
			numEnd = outDec + num.substring(dpos + 1, num.length);
			num = num.substring(0, dpos);
		}
		while (rgx.test(num)) {
			num = num.replace(rgx, '$1' + outSep + '$2');
		}
		return num + numEnd;
	}	// formatNumber()

	function formatLatLong(data, digits) {
		var output = '', value = 0, sign = +1,
			symbols = ['&#176;' , '&#8242;' , '&#8243;'],	// degree, minute, second
			pairs, tmp, x;

		if (!data.split) {
			return data + ': ' + mozutils.getPString('invalidData');
		}
		pairs = data.split(',');
		switch (pairs.length) {
		case 3:
			tmp = pairs[0].split('/');
			output += roundValue(tmp[0] / tmp[1], 0) + symbols[0] + ' ';
			value += tmp[0] / tmp[1];
			if (value < 0) {
				sign = -1;
				value = -value;
			}
			tmp = pairs[1].split('/');
			x = tmp[0] / tmp[1];
			if (tmp[1] !== '1') {
				output += roundValue(x, digits) + symbols[1];
				value += x / 60;
			} else {
				output += roundValue(x, 0) + symbols[1] + ' ';
				value += x / 60;
				tmp = pairs[2].split('/');
				x = tmp[0] / tmp[1];
				output += roundValue(x, digits) + symbols[2];
				value += x / 3600;
			}
			output += ' == ' + roundValue(sign*value, 6) + symbols[0];
			break;
		case 2:
			output = pairs[0] + symbols[0] + ' ' + pairs[1].substr(0, pairs[1].length-1) + symbols[1] +
						' ' + pairs[1].substr(pairs[1].length-1); 
			break;
		default:
			output = data;
			break;
		} 
		return output;
	}	// formatLatLong()

	function formatLatLong2(data, digits) {
		var pairs, tmp,
			output = 0;

		if (!data) { 
			return mozutils.getPString('invalidData'); 
		}
		if (!data.split) { 
			return data + ': ' + mozutils.getPString('invalidData'); 
		}
		pairs = data.split(',');
		if (pairs.length !== 3) { 
			return data + ': ' + mozutils.getPString('invalidData'); 
		}
		tmp = pairs[0].split('/');
		output += tmp[0] / tmp[1];
		if (pairs[1] !== '0/0') {
			tmp = pairs[1].split('/');
			output += tmp[0] / tmp[1] / 60;
		}
		if (pairs[2] !== '0/0') {
			tmp = pairs[2].split('/');
			output += tmp[0] / tmp[1] / 3600;
		}
		return roundValue(output, digits);
	}	// formatLatLong2()

	function formatTimestamp(data, digits) {
		var output = '',
			symbols = ['h' , 'm' , 's'],
			pairs, i, tmp;

		if (!data.split) {
			return data + ': ' + mozutils.getPString('invalidData');
		}
		pairs = data.split(',');
		if (pairs.length !== 3) {
			return data + mozutils.getPString('invalidData');
		}
		for (i = 0 ; i < 3 ; i += 1) {
			tmp = pairs[i].split('/');
			output += roundValue(tmp[0] / tmp[1], (i !== 2 ? 0 : digits)) + symbols[i] + ' ';
		}
		return output;
	}	// formatTimestamp()

	function formatRational(data, digits) {
		var tmp;
		if (!data.split) {
			return data + ': ' + mozutils.getPString('invalidData');
		}
		tmp = data.split('/');
		return roundValue(tmp[0] / tmp[1], digits);
	}	// formatRational()

	function formatRationals(data, digits) {
		var pairs, i, tmp,
			output = '';

		if (!data.split) {
			return data + ': ' + mozutils.getPString('invalidData');
		}
		pairs = data.split(',');
		for (i = 0 ; i < pairs.length ; i += 1) {
			tmp = pairs[i].split('/');
			output += roundValue(tmp[0] / tmp[1], digits) + ', ';
		}
		return output;
	}	// formatRationals()

	function cleanValue(x) {
		return (x === '0' ? '0' : (x.indexOf('.') === -1 ? x : x.replace(/\.?0*$/, '')));
	}	// cleanValue()
/*
	logging.alert(cleanValue('50.01'));
	logging.alert(cleanValue('50.10'));
	logging.alert(cleanValue('50.0'));
	logging.alert(cleanValue('50.'));
	logging.alert(cleanValue('50'));
	logging.alert(cleanValue('0'));
	logging.alert(cleanValue('.0'));
	logging.alert(cleanValue('0.0'));
	logging.alert(cleanValue('0.'));
*/

	function displayText(text, divName) {
		var i, doc, div;

		if (!divName) {
			logging.alert(mozutils.getPString('noDivSpecified') + '\n\n' + text);
			return;
		}
		div = document.getElementById(divName);
		if (!div) { return; }
		
		doc = parser.parseFromString(text, 'text/html');
		if (doc) {
			doc = doc.getElementsByTagName('body')[0];
			for (i = 0 ; i < doc.childElementCount ; i += 1) {
				try {
					div.appendChild(doc.children[i]);
					// generates a spurious "Security Error: Content at moz-nullprincipal" for <img> tags
					// for local (file:) images
				} catch (e) {
					logging.log(e);
				}
			}
		} else {
			logging.alert(mozutils.getPString('domParsingError'));
			div.appendChild(html.tn(mozutils.getPString('noDivSpecified')));
		}

/*
		//text = text.replace(/\<html:/g, '\r\n<html:');//.replace(/[^\x00-\x7F]/g, '?');
		//console.log(text.length, text);
		//text = text.replace(/[^\x20-\x7E\r\n]+/g, '?')
			//		.replace(/& /g, '&amp; ')
			//		.replace(/&0/g, '&amp;0');	// printable characters
		try {
			div.innerHTML += text + '\r\n';
		} catch (e) {
			logging.log(e);
			//console.log(text.length, text);
			try {
				div.innerHTML += cleanExifHTML(text);
			} catch (e2) {
				logging.log(e2);
				div.innerHTML += mozutils.getPString('unableDisplayText');
				//logging.log(text.replace(/</g, '&lt;'));
			}
		}
*/
	}	// displayText()
	
	function clearDiv(div) {
		if (div) {
			while (div.firstChild) {
				div.removeChild(div.firstChild);
			}
		}
	}	// clearDiv()

	function clearText(divName) {
		var div;
		if (!divName) { return; }
		clearDiv(document.getElementById(divName));
	}	// clearText()

	function clearTexts(divName) {
		clearText(divName + '_head');
		clearText(divName + '_img');
		clearText(divName + '_err');
		clearText(divName + '_ifd0');
		clearText(divName + '_subifd');
		clearText(divName + '_ifd1');
		clearText(divName + '_mn');
		clearText(divName + '_iop');
		clearText(divName + '_gps');
		clearText(divName + '_iptc');
		clearText(divName + '_iptc_core');
		clearText(divName + '_msg');
		clearText(divName + '_jpeg');
		clearText(divName + '_msg');
	}	// clearTexts()

	function cleanExifHTML(text) {
		var text2;

		if (!(text instanceof String)) { text = String(text); }
		text2 = text.replace(/[\x00-\x1F]/g, function (item) { 
			var x = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 
					 'BS',  'TAB', 'LF',  'VT',  'FF',	'CR',  'SO',  'SI', 
					 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 
					 'CAN', 'EM',  'SUB', 'ESC', 'FS',  'GS',  'RS',  'US']; 
			return '{{' + x[item.charCodeAt(0)] + '}}';
		});
		return text2;
/*
	var c, i, text3 = '';
	for (i = 0 ; i < text2.length ; i++) {
		c = text2.charCodeAt(i);
		text3 += (c < 128 ? text2.substr(i, 1) : '&#' + c + ';');
	}
	return '<![CDATA[' + text2 + ']]>';
*/
	}	// cleanExifHTML()

	function cleanExifStringData(text) {
		var text2, text3;
		if (!(text instanceof String)) {
			text = String(text);
		}
		//return cleanUTF8StringData(text);	
/**/
		text2 = text.replace(/;*$/, '').replace(/\</g, '&#60;').replace(/\>/g, '&#62;')
	//				.replace(/\&copy;/g, '©').replace(/\&reg;/g, '®')
					.replace(/\&/g, '&#38;');
		text3 = text2.replace(/[\x00-\x1F]/g, function () { 
			var x = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 
					 'BS',  'TAB', 'LF',  'VT',  'FF',	'CR',  'SO',  'SI', 
					 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 
					 'CAN', 'EM',  'SUB', 'ESC', 'FS',  'GS',  'RS',  'US']; 
			return '{{' + x[arguments[0].charCodeAt(0)] + '}}';
		});
		return text3;
/**/
/*
	var c, i, text3 = '';
	for (i = 0 ; i < text2.length ; i++) {
		c = text2.charCodeAt(i);
		text3 += (c < 128 ? text2.substr(i, 1) : '&#' + c + ';');
	}
	return '<![CDATA[' + text2 + ']]>';
/**/
	}	// cleanExifStringData()

	function roundValue(value, digits) {
		return cleanValue(Number.prototype.toFixed ? value.toFixed(digits) : roundDecimals(value, digits));
	}	// roundValue()

	function roundDecimals(value, n) {
		var poten = Math.pow(10, n);
		return Math.round(poten * value) / poten;
	}	// roundDecimals()

	function cleanUTF8StringData(inbytes) {
		var i, idx = 0,
			bytes = [], txt = [];

		for (i = 0 ; i < inbytes.length ; i += 1) {
			bytes.push(inbytes.charCodeAt(i));
		}
		while (idx < bytes.length) {
			if ((bytes[idx] & 0xF0) === 0xE0  &&  (bytes[idx+1] & 0xC0) === 0x80  &&  (bytes[idx+2] & 0xC0) === 0x80) {
				txt.push('&#' + (((bytes[idx] & 0x0F) << 12) | ((bytes[idx+1] & 0x3F) << 6) |(bytes[idx+2] & 0x3F)) + ';');
				idx += 3;
			} else if ((bytes[idx] & 0xE0) === 0xC0  &&  (bytes[idx+1] & 0xC0) === 0x80) {
				txt.push('&#' + (((bytes[idx] & 0x1F) << 6) | (bytes[idx+1] & 0x3F)) + ';');
				idx += 2;
			} else if ((bytes[idx] & 0x80) === 0x00) {
				txt.push('&#' + (bytes[idx] & 0x7F) + ';');
				idx += 1;
			}
		}
		return txt.join('');
	}	// cleanUTF8StringData() 

	function dumpAssembledExifData(output, divName, bTables) {
		var re = new RegExp('<br>', 'gi');

		if (bTables) {
			displayText('<table class="exif_output" cellspacing="0" id="table_' + divName + '">'
						+ '<tr><td class="first">' 
						+ output.join('</td></tr><tr><td>').replace(/( = |:&#160;)/g, '</td><td>').replace(re, '</td></tr><tr><td class="first">')
						+ '</td></tr></table>', divName);
		} else {	/* list */
			displayText('<ul><li>' 
						+ output.join('</li><li>') 
						+ '</li></ul>', divName);
		}
	}	// dumpAssembledExifData()
	
	function bytesToString(data) {
		var bytes, code, i,
			output = '';

		if (!data  ||  !data.split  ||  data.indexOf('0x') === -1) {
			return data;
		}
		bytes = data.split(',');
		output = '';
		for (i = 0 ; i < bytes.length ; i += 1) {
			if (bytes[i] === '0x00') {	// was 0
				output += ''; // was ';';
			} else {
				code = window.parseInt(bytes[i], 16);
				output += (code >= 32 ? String.fromCharCode(code) : bytes[i]);
			}
		}
		return output;
	}	// bytesToString()

	function bytesToBuffer(data, buffer) {
		var i, bytes;
			
		if (!data  ||  !data.split) {
			return;
		}
		bytes = data.split(',');
		for (i = 0 ; i < bytes.length ; i += 1) {
			buffer[i] = window.parseInt(bytes[i], (bytes[i].match(/^0x/i) ? 16 : 10));
		}
	}	// bytesToBuffer()

	function hexBytesToBuffer(data, buffer) {
		var i,
			bytes = data.split(',');

		for (i = 0 ; i < bytes.length ; i += 1) {
			buffer[i] = window.parseInt(bytes[i], 16);
		}
	}	// bytesToBuffer()

	function signedByte(b) {
		if (b & 0x80) {
			return -((~b & 0xFF) + 1);
		} else {
			return b;
		}
	}	// signedByte()

	function byteToHex(b) {
		if (isNaN(b)) { return '????'; }
		if (b === 0) {
			return '0x00'
		} else if (b < 0x10) {
			return '0x0' + b.toString(16);
		} else {
			return '0x' + b.toString(16);
		}
	}	// byteToHex()

	function getLong(buffer, offset, is_motorola) {
		var data;
		if (is_motorola) {
			data = buffer[offset+3]
					| (buffer[offset+2] << 8)
					| (buffer[offset+1] << 16)
					| (buffer[offset] << 24);
		} else {
			data = buffer[offset]
					| (buffer[offset+1] <<  8)
					| (buffer[offset+2] <<  16)
					| (buffer[offset+3] <<  24);
		}
		return data;
	}	// getLong()

	function getSignedLong(buffer, offset, is_motorola) {
		var data;
		if (is_motorola) {
			data = buffer[offset+3]
					| (buffer[offset+2] << 8)
					| (buffer[offset+1] << 16)
					| (buffer[offset] << 24);
		} else {
			data = buffer[offset]
					| (buffer[offset+1] << 8)
					| (buffer[offset+2] << 16)
					| (buffer[offset+3] << 24);
		}
		if (data & 0x80000000) {
			data = -((~data & 0xFFFFFFFF) + 1);
		}
		return data;
	}	// getSignedLong()

	function getShort(buffer, offset, is_motorola) {
		var data;
		if (is_motorola) {
			data = buffer[offset];
			data <<= 8;
			data |= buffer[offset+1];
		} else {
			data = buffer[offset+1];
			data <<= 8;
			data |= buffer[offset];
		}
		return data;
	}	// getShort()

	function getSignedShort(buffer, offset, is_motorola) {
		var data;
		if (is_motorola) {
			data = buffer[offset];
			data <<= 8;
			data |= buffer[offset+1];
		} else {
			data = buffer[offset+1];
			data <<= 8;
			data |= buffer[offset];
		}
		if (data & 0x8000) {
			data = -((~data & 0xFFFF) + 1);
		}
		return data;
	}	// getSignedShort()

	function zeroPad(tagnum) {
		var result;
		if (tagnum < 0x0010) {
			result = '000' + tagnum.toString(16);
		} else if (tagnum < 0x0100) {
			result = '00' + tagnum.toString(16);
		} else if (tagnum < 0x1000) {
			result = '0' + tagnum.toString(16);
		} else {
			result = tagnum.toString(16);
		}
		
		return result;
	}	// zeroPad()

	function reduceRational(str) {	// returns the fraction reduced to its simplest form (e.g. '10/600' ==> '1/60')
		var a, b, g0, g1, g2,
			tmp = str.split('/');

		if (tmp.length !== 2) { return str; }
		a = window.parseInt(tmp[0], 10);
		if (a === 0) {
			return '0/1';
		}
		b = window.parseInt(tmp[1], 10);

		if (a > b) {
			g0 = a;
			g1 = b;
		} else {
			g0 = b;
			g1 = a;
		}

		while (g1 > 0) {
			g2 = g0 % g1;
			g0 = g1;
			g1 = g2;
		}

		return (a / g0) + '/' + (b / g0);
	}	// reduceRational()
	
	function range(start, end, incr) {
		var i, result = [];

		if (incr) {
			if (start > end  &&  incr > 0) {
				incr = -incr;
			} else if (start < end  &&  incr < 0) {
				incr = -incr;
			}
		} else {
			incr = (start < end ? 1 : -1);
		}

		for (i = start ; i <= end ; i += incr) {
			result.push(i);
		}
		
		return result;
	}	// range()
	
	function exportFcn(name, fcn) {
		ExifViewerApp.export(name, fcn);
	}	// export()

	return {
		bytesToAscii: bytesToAscii,
		bytesToBuffer: bytesToBuffer,
		bytesToString: bytesToString,
		byteToHex: byteToHex,
		cleanExifHTML: cleanExifHTML,
		cleanExifStringData: cleanExifStringData,
		cleanUTF8StringData: cleanUTF8StringData,
		cleanValue: cleanValue,
		clearText: clearText,
		clearTexts: clearTexts,
		displayText: displayText,
		dumpAssembledExifData: dumpAssembledExifData,
		'export': exportFcn,
		formatLatLong: formatLatLong,
		formatLatLong2: formatLatLong2,
		formatNumber: formatNumber,
		formatRational: formatRational,
		formatRationals: formatRationals,
		formatTimestamp: formatTimestamp,
		getLong: getLong,
		getShort: getShort,
		getSignedLong: getSignedLong,
		getSignedShort: getSignedShort,
		hexBytesToBuffer: hexBytesToBuffer,
		range: range,
		reduceRational: reduceRational,
		roundDecimals: roundDecimals,
		roundValue: roundValue,
		signedByte: signedByte,
		zeroPad: zeroPad
	};
}, ['constants', 'moz-utils', 'logging', 'html']);;ExifViewerApp.add('xml', function _xml(globals, constants, utils, logging, mozutils, tags) {
	'use strict';
	
	//if (window.ActiveXObject) {
		var Node = {
				ELEMENT_NODE: 1 , ATTRIBUTE_NODE: 2 , TEXT_NODE: 3 , CDATA_SECTION_NODE: 4 ,
				ENTITY_REFERENCE_NODE: 5 , ENTITY_NODE: 6 , PROCESSING_INSTRUCTION_NODE: 7 ,
				COMMENT_NODE: 8 , DOCUMENT_NODE: 9 , DOCUMENT_TYPE_NODE: 10 ,
				DOCUMENT_FRAGMENT_NODE: 11 , NOTATION_NODE: 12
		};
	//}

	var exifTags = {
		'exif:GPSVersionID' : 			0x00 ,
		'exif:GPSLatitudeRef' : 		0x01 ,
		'exif:GPSLatitude' : 			0x02 ,
		'exif:GPSLongitudeRef' : 		0x03 ,
		'exif:GPSLongitude' : 			0x04 ,
		'exif:GPSAltitudeRef' : 		0x05 ,
		'exif:GPSAltitude' : 			0x06 ,
		'exif:GPSTimeStamp' : 			0x07 ,
		'exif:GPSSatellites' : 			0x08 ,
		'exif:GPSStatus' : 				0x09 ,
		'exif:GPSMeasureMode' : 		0x0A ,
		'exif:GPSDOP' : 				0x0B ,
		'exif:GPSSpeedRef' : 			0x0C ,
		'exif:GPSSpeed' : 				0x0D ,
		'exif:GPSTrackRef' : 			0x0E ,
		'exif:GPSTrack' : 				0x0F ,
		'exif:GPSImgDirectionRef' :		0x10 ,
		'exif:GPSImgDirection' : 		0x11 ,
		'exif:GPSMapDatum' : 			0x12 ,
		'exif:GPSDestLatitudeRef' : 	0x13 ,
		'exif:GPSDestLatitude' : 		0x14 ,
		'exif:GPSDestLongitudeRef' :	0x15 ,
		'exif:GPSDestLongitude' : 		0x16 ,
		'exif:GPSDestBearingRef' : 		0x17 ,
		'exif:GPSDestBearing' : 		0x18 ,
		'exif:GPSDestDistanceRef' : 	0x19 ,
		'exif:GPSDestDistance' : 		0x1A ,
		'exif:GPSProcessingMethod' :	0x1B ,
		'exif:GPSAreaInformation' : 	0x1C ,
		'exif:GPSDateStamp' : 			0x1D ,
		'exif:GPSDifferential' : 		0x1E , 
		'exif:GPSHPositioningError' : 	0x1F , 

		'tiff:ImageWidth' : 				0x0100 ,
		'tiff:ImageLength' : 				0x0101 ,
		'tiff:BitsPerSample' : 				0x0102 ,
		'tiff:Compression' : 				0x0103 ,
		'tiff:PhotometricInterpretation' :	0x0106 ,
		'FillOrder' : 						0x010A ,
		'DocumentName' : 					0x010D ,
		'tiff:ImageDescription' : 			0x010E ,
		'tiff:Make' : 						0x010F ,
		'tiff:Model' : 						0x0110 ,
		'StripOffsets' : 					0x0111 ,
		'tiff:Orientation' : 				0x0112 ,
		'tiff:SamplesPerPixel' : 			0x0115 ,
		'RowsPerStrip' : 					0x0116 ,
		'StripByteCounts' : 				0x0117 ,
		'tiff:XResolution' : 				0x011A ,
		'tiff:YResolution' : 				0x011B ,
		'tiff:PlanarConfiguration' : 		0x011C ,
		'tiff:ResolutionUnit' : 			0x0128 ,
		'tiff:TransferFunction' : 			0x012D ,
		'tiff:Software' : 					0x0131 ,
		'tiff:DateTime' : 					0x0132 ,
		'tiff:Artist' : 					0x013B ,
		'tiff:HostComputer' : 				0x013C ,
		'tiff:WhitePoint' : 				0x013E ,
		'tiff:PrimaryChromaticities' : 		0x013F ,
		'tiff:ColorMAP' : 					0x0140 ,
		'TransferRange' : 					0x0156 ,
		'JPEGProc' : 						0x0200 ,
		'JPEGInterchangeFormat' : 			0x0201 ,
		'JPEGInterchangeFormatLength' :		0x0202 ,
		'tiff:YCbCrCoefficients' : 			0x0211 ,
		'tiff:YCbCrSubSampling' : 			0x0212 ,
		'tiff:YCbCrPositioning' : 			0x0213 ,
		'tiff:ReferenceBlackWhite' : 		0x0214 ,
		'BatteryLevel' : 					0x828F ,
		'tiff:Copyright' : 					0x8298 ,
		'exif:ExposureTime' : 				0x829A ,
		'exif:FNumber' : 					0x829D ,
		'IPTC/NAA' : 						0x83BB ,
		'ExifIFDPointer' : 					0x8769 ,
		'InterColorProfile' : 				0x8773 ,
		'exif:ExposureProgram' : 			0x8822 ,
		'exif:SpectralSensitivity' : 		0x8824 ,
		'GPSInfoIFDPointer' : 				0x8825 ,
		'exif:ISOSpeedRatings' : 			0x8827 ,
		'exif:OECF' : 						0x8828 ,
		'exif:SensitivityType' : 			0x8830 ,
		'exif:StandardOutputSensitivity' :	0x8831 ,
		'exif:RecommendedExposureIndex' :	0x8832 ,
		'exif:ISOSpeed' : 					0x8833 ,
		'exif:ISOSpeedLatitudeyyy' : 		0x8834 ,
		'exif:ISOSpeedLatitudezzz' : 		0x8835 ,
		'exif:ExifVersion' : 				0x9000 ,
		'exif:DateTimeOriginal' : 			0x9003 ,
		'exif:DateTimeDigitized' : 			0x9004 ,
		'exif:ComponentsConfiguration' : 	0x9101 ,
		'exif:CompressedBitsPerPixel' : 	0x9102 ,
		'exif:ShutterSpeedValue' : 			0x9201 ,
		'exif:ApertureValue' : 				0x9202 ,
		'exif:BrightnessValue' : 			0x9203 ,
		'exif:ExposureBiasValue' : 			0x9204 ,
		'exif:MaxApertureValue' : 			0x9205 ,
		'exif:SubjectDistance' : 			0x9206 ,
		'exif:MeteringMode' : 				0x9207 ,
		'exif:LightSource' : 				0x9208 ,
		'exif:Flash' : 						0x9209 ,
		'exif:FocalLength' : 				0x920A ,
		'exif:SubjectArea' : 				0x9214 ,
		'MakerNote' : 						0x927C ,
		'exif:UserComment' : 				0x9286 ,
		'SubSecTime' : 						0x9290 ,
		'SubSecTimeOriginal' : 				0x9291 ,
		'SubSecTimeDigitized' : 			0x9292 ,
		'exif:FlashpixVersion' : 			0xA000 ,
		'exif:ColorSpace' : 				0xA001 ,
		'exif:PixelXDimension' : 			0xA002 ,
		'exif:PixelYDimension' : 			0xA003 ,
		'exif:RelatedSoundFile' : 			0xA004 ,
		'InteroperabilityIFDPointer' : 		0xA005 ,
		'exif:FlashEnergy' : 				0xA20B ,	// 0x920B in TIFF/EP
		'exif:SpatialFrequencyResponse' :	0xA20C ,	// 0x920C    -  -
		'exif:FocalPlaneXResolution' : 		0xA20E ,	// 0x920E    -  -
		'exif:FocalPlaneYResolution' : 		0xA20F ,	// 0x920F    -  -
		'exif:FocalPlaneResolutionUnit' : 	0xA210 ,	// 0x9210    -  -
		'exif:SubjectLocation' : 			0xA214 ,	// 0x9214    -  -
		'exif:ExposureIndex' : 				0xA215 ,	// 0x9215    -  -
		'exif:SensingMethod' : 				0xA217 ,	// 0x9217    -  -
		'exif:FileSource' : 				0xA300 ,
		'exif:SceneType' : 					0xA301 ,
		'exif:CFAPattern' : 				0xA302 ,	// 0x828E in TIFF/EP
		'exif:CustomRendered' : 			0xA401 ,
		'exif:ExposureMode' : 				0xA402 ,
		'exif:WhiteBalance' : 				0xA403 ,
		'exif:DigitalZoomRatio' : 			0xA404 ,
		'exif:FocalLengthIn35mmFilm' : 		0xA405 ,
		'exif:SceneCaptureType' : 			0xA406 ,
		'exif:GainControl' : 				0xA407 ,
		'exif:Contrast' : 					0xA408 ,
		'exif:Saturation' : 				0xA409 ,
		'exif:Sharpness' : 					0xA40A ,
		'exif:DeviceSettingDescription' : 	0xA40B ,
		'exif:SubjectDistanceRange' : 		0xA40C ,
		'exif:ImageUniqueID' : 				0xA420 ,
		'exif:CameraOwnerName' : 			0xA430 ,
		'exif:BodySerialNumber' : 			0xA431 ,
		'exif:LensSpecification' : 			0xA432 ,
		'exif:LensMaker' : 					0xA433 ,
		'exif:LensModel' : 					0xA434 ,
		'exif:LensSerialNumber' : 			0xA435 ,
		'PrintImageMatching' : 				0xC4A5
	};

	function getXMPExifTagNumber(text) {
		return (exifTags[text] ? exifTags[text] : undefined); 
	}	// getXMPExifTagNumber()

	function showHideListItems(e, li) {
		var i, uls, image, display;

		if ((e.srcElement  &&  e.srcElement !== li) ||  (e.target  &&  e.target !== li)) {
			cancelEvent(e);
			return;
		}

		if (li.className === 'openImage') {
			image = 'close';
			display = 'block';
		} else if (li.className === 'closeImage') {
			image = 'open';
			display = 'none';
		}

		if (!image) {
			cancelEvent(e);
			return;
		}
		li.className = image + 'Image';
		uls = li.getElementsByTagName('ul');
		if (uls.length === 0) {
			uls = li.getElementsByTagName('ul');
		}
		for (i = 0 ; i < uls.length ; i += 1) {
			if (uls[i].parentNode === li) {
				uls[i].style.display = display;
			}
		}
		cancelEvent(e);
		//li.blur();
		window.focus();
	}	// showHideListItems()
	
	function showHideAllListItems(show) {
		var i, uls, lis, 
			div = document.getElementById('outputDiv_iptc_core');

		if (!div) { return; }

		uls = div.getElementsByTagName('ul');
		if (uls.length === 0) { 
			uls = div.getElementsByTagName('ul'); 
		}
		lis = div.getElementsByTagName('li');
		if (lis.length === 0) {
			lis = div.getElementsByTagName('li');
		}
		for (i = 1 ; i < uls.length ; i += 1) {	// skip top level
			uls[i].style.display = (show ? 'block' : 'none');
		}
		for (i = 0 ; i < lis.length ; i += 1) {
			if (lis[i].className !== 'fileImage') {
				lis[i].className = (show ? 'closeImage' : 'openImage');
			}
		}
	}	// showHideAllListItems()

	function cancelEvent(e) {
		if (e) {
			e.cancelBubble = true;
			if (e.stopPropagation) {
				e.stopPropagation();
			}
		}
	}	// cancelEvent()

	function showHideSource(divname) {
		var div = document.getElementById(divname);
		if (div) {
			div.style.display = (div.style.display !== 'block' ? 'block' : 'none'); 
		}
	}	//	showHideSource()
/*
	utils.export('showHideListItems', showHideListItems);
	utils.export('showHideAllListItems', showHideAllListItems);
	utils.export('showHideSource', showHideSource);
*/
	function addEvents() {
		var ele, eles;
		
		ele = document.getElementById('iptcShowAll');
		if (ele) {
			ele.addEventListener('click', function () {
				showHideAllListItems(true);
			});
		}
		ele = document.getElementById('iptcHideAll');
		if (ele) {
			ele.addEventListener('click', function () {
				showHideAllListItems(false);
			});
		}
		ele = document.getElementById('iptcShowSource');
		if (ele) {
			ele.addEventListener('click', function () {
				showHideSource('xmp_source');
			});
		}
		ele = document.getElementById('iptcShowLegend');
		if (ele) {
			ele.addEventListener('click', function () {
				showHideSource('xmp_legend');
			});
		}
		
		eles = document.querySelectorAll('.openImage');
		Array.from(eles).forEach(function (ele) {
			ele.addEventListener('click', function (event) {
				showHideListItems(event, this);
			});
		});
	}	// addEvents()

	function handleNode(node, output) {
		var attrib_list, text_value, cnode, whitespace, down, i;

		function getNodeValue(node) {
			return node.value  ||  node.nodeValue;
		}	// getNodeValue()

		switch(node.nodeType) {
		case Node.ELEMENT_NODE:
			attrib_list = node.attributes;
			text_value = '';
			if (node.childNodes.length == 1) {
				cnode = node.childNodes[0];
				switch (cnode.nodeType) {
				case Node.TEXT_NODE:
				case Node.CDATA_SECTION_NODE:
				case Node.COMMENT_NODE:
					text_value = cnode.nodeValue;
					break;
//				case Node.ELEMENT_NODE	// not implemented
//					if (cnode.nodeName === 'rdf:Bag'  ||  cnode.nodeName === 'rdf:Seq'  ||  cnode.nodeName === 'rdf:Alt') {
//						text_value = getRDFArrayText(cnode);
//					}
//					break;
				}
			}
			whitespace = /^\s*$/.test(text_value);
			down = (attrib_list.length > 0  ||  node.childNodes.length > 1  ||  (node.childNodes.length === 1  &&  whitespace));

			if (attrib_list.length === 0  &&  node.childNodes.length === 0) {
				output.push('<li class="fileImage">' + node.nodeName);
			} else if (!whitespace  &&  !down) {
				output.push('<li class="fileImage">' + node.nodeName + ' ==> "' + utils.cleanUTF8StringData(text_value) + '"' + getXMPInterpretedData(node.nodeName, text_value));
			} else {
				output.push('<li class="openImage" data-onclick="ExifViewerApp.exports.showHideListItems(event, this)">' + node.nodeName + (!whitespace ? ' ==> "' + text_value + '"' : ''));
			}
			if (down) {
				output.push('<ul style="display:none">');
			}
			for (i = 0 ; i < attrib_list.length ; i += 1) {
				handleNode(attrib_list[i], output);
			}
			if (whitespace) {
				handleNodeChildren(node, output);
			}
			if (down) {
				output.push('</ul>');
			}
			output.push('</li>');
			break;
		case Node.ATTRIBUTE_NODE:
			output.push('<li class="fileImage">' + node.nodeName 
							+ ' = "' + node.value + '"' + getXMPInterpretedData(node.nodeName, node.value));	// was node.nodeValue
//							+ (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/) ? ' = ' + node.nodeValue : ''));
/*
			if (node.childNodes.length === 0) {
				output.push('<li class="fileImage">' + node.nodeName 
								+ (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/) ? ' = ' + node.nodeValue : ''));
			} else {
				output.push('<li class="openImage" onclick="ExifViewerApp.exports.showHideListItems(event, this)">' 
								 + node.nodeName + (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/) ? ' = ' + node.nodeValue : ''));
			}
			if (node.childNodes.length > 0) {
				output.push('<ul style="display:none">');
				handleNodeChildren(node, output);
				output.push('</ul>');
			}
/**/
			output.push('</li>');
			break;
		case Node.TEXT_NODE:
		case Node.CDATA_SECTION_NODE:
		case Node.COMMENT_NODE:
			if (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/)) {
				output.push('<li class="fileImage">(text) = "' + node.nodeValue + '"</li>');
			}
			break;
		case Node.ENTITY_REFERENCE_NODE: 
		case Node.ENTITY_NODE:
			if (node.childNodes.length == 0) { 
				output.push('<li class="fileImage">' + node.nodeName);
			} else {
				output.push('<li class="openImage" data-onclick="ExifViewerApp.exports.showHideListItems(event, this)">' + node.nodeName);
			}
			if (node.childNodes.length > 0) {
				output.push('<ul style="display:none">');
				handleNodeChildren(node, output);
				output.push('</ul>');
			}
			output.push('</li>');
			break;
		case Node.PROCESSING_INSTRUCTION_NODE: 
			output.push('<li class="fileImage">'
						+ node.nodeName + ' = ' + node.nodeValue + '</li>'); // name = target
			break;
		case Node.DOCUMENT_NODE: 
		case Node.DOCUMENT_FRAGMENT_NODE: 
			if (node.childNodes.length > 0) {
				output.push('<ul>');
				handleNodeChildren(node, output);
				output.push('</ul>');
			}
			break;
		case Node.DOCUMENT_TYPE_NODE: 
		case Node.NOTATION_NODE: 
			output.push('<li>' + node.nodeName + '</li>');
			break;
		default:
			output.push('<li>Invalid node type: ' + node.nodeType + '</li>');
		}
	}	// handleNode()

	function parseXML(xml) {
		var parser, doc, roottag,
			output = [];

	//	if (!constants.isMoz) {
	//		return '<pre>' + xml.replace(/\s*$/, '').replace(/</g, '[').replace(/>/g, ']') + '</pre>';
	//	}
	/*
		if (window.ActiveXObject) {
			doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.async = false;
			doc.loadXML(xml);
		} else {
		*/
			parser = new DOMParser();
			xml = xml.replace(/\s+$/, '');
			try {
				doc = parser.parseFromString(xml, 'text/xml');	
				// example: "<items><item name='Apple'/><item name='Banana' colour='yellow'>Ha!</item></items>"
			} catch (e) {	// never get here, unfortunately
				logging.log(xml);
				return 'Parsing Error!';
			}
		//}
		roottag = doc.documentElement;
		if (roottag.tagName === 'parserError'  ||  roottag.namespaceURI === 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
			return 'Parsing Error!';
		} else {
		//	showProperties(doc);
			handleNode(doc, output);
			return output.join('\r\n');
		}
	}	// parseXML()

	function handleNodeChildren(node, output) {
		var n = node.firstChild;
		while (n != null) {
			handleNode(n, output);
			n = n.nextSibling;
		}
	}	// handleNodeChildren()

	function dumpIptcCoreData(divName, iptc_core) {
		var legend;

		if (iptc_core.type !== 'IPTC Core'  ||  iptc_core.status !== 0) { return; }

		if (iptc_core.status !== 0) {
	//		utils.displayText('<p>' + mozutils.getPString('noIPTCCoredata') + '</p>', divName + '_iptc_core');
		} else {
			utils.displayText('<a name="iptc_core" id="a_iptc_core"></a>', divName + '_iptc_core');
			utils.displayText('<h2>' + mozutils.getPString('IPTCcore') + '</h2>', divName + '_iptc_core');
	//		utils.displayText('<html:pre>' + utils.parseXML(iptc_core.xml).replace(/</g, '[') + '</html:pre>', divName + '_iptc_core');
			utils.displayText('<p class="no_print"><span id="iptcShowAll" data-onclick="ExifViewerApp.exports.showHideAllListItems(true)" class="link">' + mozutils.getPString('expandAll') + '</span> / '
						+ '<span id="iptcHideAll" data-onclick="ExifViewerApp.exports.showHideAllListItems(false)" class="link">' + mozutils.getPString('collapseAll') + '</span> / '
						+ '<span id="iptcShowSource" data-onclick="ExifViewerApp.exports.showHideSource(\'xmp_source\')" class="link">' + mozutils.getPString('showHideSource') + '</span> / ' 
						+ '<span id="iptcShowLegend" data-onclick="ExifViewerApp.exports.showHideSource(\'xmp_legend\')" class="link">' + mozutils.getPString('showHideLegend') + '</span></p>', 
						divName + '_iptc_core');
			legend = [
				'<table border="1" cellpadding="2" cellspacing="0" id="xmp_legend">',
				'<tr><th>Namespace Prefix</th><th>Meaning</th></tr>',
				'<tr><td>aux</td><td>Additional EXIF schema</td></tr>',
				'<tr><td>crs</td><td>Camera Raw Schema</td></tr>',
				'<tr><td>dc</td><td>Dublin Core schema</td></tr>',
				'<tr><td>exif</td><td>EXIF schema</td></tr>',
				'<tr><td>pdf</td><td>Adobe Portable Document Format schema</td></tr>',
				'<tr><td>photoshop</td><td>Adobe Photoshop schema</td></tr>',
				'<tr><td>rdf</td><td>Resource Description Framework schema</td></tr>',
				'<tr><td>tiff</td><td>EXIF schema for TIFF</td></tr>',
				'<tr><td>xap</td><td>(obsolete designation for XMP)</td></tr>',
				'<tr><td>xmp</td><td>Extensible Metadata Platform Basic schema</td></tr>',
				'<tr><td>xmpBJ</td><td>XMP Basic Job Ticket schema</td></tr>',
				'<tr><td>xmpDM</td><td>XMP Dynamic Media schema</td></tr>',
				'<tr><td>xmpMM</td><td>XMP Media Management schema</td></tr>',
				'<tr><td>xmpRights</td><td>XMP Rights Management schema</td></tr>',
				'<tr><td>xmpTPg</td><td>XMP Paged-Text schema</td></tr>',
	//			'<tr><td></td><td></td></tr>',
				'</table>'
			];
			utils.displayText(legend.join('\n'), divName + '_iptc_core');
			utils.displayText('<pre id="xmp_source" style="display:none">' + iptc_core.xml.replace(/\s*$/, '').replace(/</g, '&#60;').replace(/>/g, '&#62;') + '</pre>', 'outputDiv_iptc_core');
			utils.displayText(parseXML(iptc_core.xml), divName + '_iptc_core');
								
			addEvents();
		}
	}	//dumpIptcCoreData()

	function getXMPInterpretedData(name, value) {
		var output,
			exifTag = getXMPExifTagNumber(name);

		if (exifTag !== undefined) {
			return ' / ' + tags.getExifInterpretedTagData(exifTag, value, (exifTag > 0x1E ? 'n/a' : 'GPS'));
		} else {
			switch (name) {
			case 'crs:CropUnits':
				output = mozutils.getPString(['pixels', 'inches', 'cm'][value]);
				break;
			default:
				return '';
				break;
			}
			return ' (' + output + ')';
		}
	}	// getXMPInterpretedData()

	return {
		parseXML: parseXML,
		dumpIptcCoreData: dumpIptcCoreData,
		getXMPInterpretedData: getXMPInterpretedData,
		getXMPExifTagNumber: getXMPExifTagNumber
	};
}, ['globals', 'constants', 'utils', 'logging', 'moz-utils', 'tags']);;ExifViewerApp.add('agfa', function _agfa(makers) {
	'use strict';
	
	function getAgfaInterpretedTagData(tagnum, data) {
		return makers.getOlympusInterpretedTagData(tagnum, data);
	}	// getAgfaInterpretedTagData()

	function dumpAgfaTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getAgfaInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpAgfaTagData()

	makers.dumpAgfaTagData = dumpAgfaTagData;
}, ['makers']);;ExifViewerApp.add('canon', function _canon(constants, utils, makers) {
	'use strict';
	
	var MacroModes = ['n/a', 'macro (1)', 'normal (2)'],
		Qualities = ['n/a (0)', 'economy (1)', 'normal (2)', 'fine (3)', 'RAW (4)', 'superfine (5)'],
		FlashModes = ['off / flash not fired (0)', 'auto (1)', 'on (2)', 'red-eye reduction (3)', 'slow synchro (4)',
					  'auto + red-eye reduction (5)', 'on + red-eye reduction (6)'],
		CDModes = ['single frame or timer mode (0)', 'continuous (1)', 'movie (2)',
					'continuous, speed priority (3)', 'continuous, low (4)',
					'continuous, high (5)'],
		FocusModes = ['one-shot auto-focus (0)', 'AI servo auto focus (1)', 'AI focus auto focus (2)',
						'manual focus (3)', 'single (4)', 'continuous (5)', 'manual focus (6)'],
		RecordModes = ['n/a (0)', 'JPEG (1)', 'CRW+THM (2)', 'AVI+THM (3)', 'TIF (4)', 
						'TIF+JPEG (5)', 'CR2 (6)', 'CR2+JPEG (7)'],
		ImageSizes = ['large (0)', 'medium (1)', 'small (2)', 'n/a (3)', 'n/a (4)',
						'medium 1 (5)', 'medium 2 (6)', 'medium 3 (7)',	'postcard (8)', 'widescreen (9)'],
		ShootingModes = ['full auto (0)', 'manual (1)', 'landscape (2)', 'fast shutter (3)', 'slow shutter (4)', 'night (5)',
						 'black &amp; white / gray scale (6)', 'sepia (7)', 'portrait (8)', 'sports (9)', 'macro / close-up (10)', 
						 'pan focus / black &amp; white (11)', 'pan focus (12)', 'vivid (13)', 'neutral (14)', 'flash off (15)',
						 'long shutter (16)', 'super macro (17)', 'foliage (18)', 'indoor (19)', 'fireworks (20)', 'beach (21)', 
						 'underwater (22)', 'snow (23)', 'kids &amp; pets (24)', 'night snapshot (25)',	'digital macro (26)', 
						 'My Colors (27)', 'still image (28)', 'n/a (29)', 'color accent (30)', 'color swap (31)', 'aquarium (32)',
						 'ISO 3200 (33)'],
		DigitalZooms = ['no digital zoom (0)', '2x (1)', '4x (2)', 'other (3)'],
		Contrasts = ['normal (0)', 'high (1)'],
		Saturations = ['normal (0)', 'high (1)'],
		Sharpnesses = ['normal (0)', 'high (1)'],
		ISOs = ['use Exif ISOSpeedRatings (0)'],
		MeteringModes = ['default (0)', 'spot (1)', 'average (2)', 'evaluative (3)',
						 'partial (4)', 'center-weighted averaging (5)'],
		FocusTypes = ['manual (0)', 'auto (1)', 'not known (2)', 'close-up (macro) (3)',
					  'very close (4)', 'close (5)', 'middle range (6)', 'far range (7)',
					  'locked (pan mode) (8)', 'super macro (9)', 'infinity (10)'],
		APPoints = {
			0x2005: 'manual AF point selection', 
			0x3000: 'none (manual focus)',
			0x3001: 'auto-selected / auto AF point selection',
			0x3002: 'right',
			0x3003: 'center',
			0x3004: 'left',
			0x4001: 'auto AF point selection',
			0x4006: 'face detect'
		},
		ExposureModes = ['&#8220;easy shooting&#8221; (0)', 'program AE (1)',
						 'Tv-priority / shutter speed priority AE (2)', 
						 'Av-priority / aperture-priority AE (3)',
						 'manual (4)', 'A-DEP / depth-of-field AE (5)', 'M-DEP (6)'],
		LensTypes = ['n/a (0)', 'Canon EF 50mm f/1.8', 'Canon EF 28mm f/2.8', 'Canon EF 135mm f/2.8 Soft',
					 'Sigma UC Zoom 35-135mm f/4-5.6', 'n/a (5)', 
					 'Sigma 18-125mm F3.5-5.6 DC IF ASP or Tokina AF193-2 19-35mm f/3.5-4.5',
					 'Canon EF 100-300mm F5.6L'],
		FlashActivities = ['flash did not fire (0)', 'flash fired (1)'],
		FocusModes = ['single (0)', 'continuous (1)'],
		AESettings = ['normal AE (0)', 'exposure compensation (1)', 'AE lock (2)',
						'AE lock + exposure compensation (3)', 'no AE (4)'],
		ImageStabilizations = ['off (0)', 'on, continuous (1)', 'on, shot only (2)', 'on, panning (3)'],
		PhotoEffects = ['off (0)', 'vivid (1)', 'neutral (2)', 'smooth (3)', 'sepia (4)', 'black &amp; white (5)',
						'custom (6)'],
		FlashOutputs = [],
		FocalTypes = ['n/a (0)', 'fixed (1)', 'zoom (2)'],
		WhiteBalances = ['auto (0)', 'sunny / daylight (1)', 'cloudy (2)', 'tungsten (3)',
						 'flourescent (4)', 'flash (5)', 'custom (6)', 'black &amp; white (7)',
						 'shade (8)', 'manual temperature (Kelvin) (9)', 'PC set1 (10)',
						 'PC set2 (11)', 'PC set3 (12)', 'n/a (13)', 'daylight fluorescent (14)',
						 'custom 1 (15)', 'custom 2 (16)', 'underwater (17)'],
		SlowShutters = ['off (0)', 'night scene (1)', 'on (2)', 'none (3)'],
		FlashBiases = {
			0xffc0: -2,
			0xffcc: -1.67,
			0xffd0: -1.50,
			0xffd4: -1.33,
			0xffe0: -1,
			0xffec: -0.67,
			0xfff0: -0.50,
			0xfff4: -0.33,
			0x0000: 0,
			0x000c: 0.33,
			0x0010: 0.50,
			0x0014: 0.67,
			0x0020: 1,
			0x002c: 1.33,
			0x0030: 1.50,
			0x0034: 1.67,
			0x0040: 2
		},
		AutoExposureBracketings = ['off (0)', 'on (shot 1) (1)', 'on (shot 2) (2)', 'on (shot 3) (3)'],
		WhiteBalances = ['auto (0)', 'sunny / daylight (1)', 'cloudy (2)', 'tungsten (3)',
						 'flourescent (4)', 'flash (5)', 'custom (6)', 'black &amp; white (7)',
						 'shade (8)', 'manual temperature (Kelvin) (9)', 'PC set1 (10)',
						 'PC set2 (11)', 'PC set3 (12)', 'n/a (13)', 'daylight fluorescent (14)',
						 'custom 1 (15)', 'custom 2 (16)', 'underwater (17)'],
		CameraTypes = {
			248: 'EOS high-end (248)',
			250: 'compact (250)',
			252: 'EOS mid-range (252)',
			255: 'DV Camera (255)'
		},
		AutoRotates = ['none (0)', 'rotate 90 CW (1)', 'rotate 180 (2)', 'rotate 270 CW (3)'],
		NDFilters = ['off (0)', 'on (1)'],
		PanoramaDirections = ['left-to-right (0)', 'right-to-left (1)',	'bottom-to-top (2)', 'top-to-bottom (3)', 
							  '2x2 matrix (clockwise) (4)'],
		CameraModels = {
			0x1010000: 'PowerShot A30',
			0x1040000: 'PowerShot S300 / Digital IXUS 300 / IXY Digital 300',
			0x1060000: 'PowerShot A20',
			0x1080000: 'PowerShot A10',
			0x1090000: 'PowerShot S110 / Digital IXUS v / IXY Digital 200',
			0x1100000: 'PowerShot G2',
			0x1110000: 'PowerShot S40',
			0x1120000: 'PowerShot S30',
			0x1130000: 'PowerShot A40',
			0x1140000: 'EOS D30',
			0x1150000: 'PowerShot A100',
			0x1160000: 'PowerShot S200 / Digital IXUS v2 / IXY Digital 200a',
			0x1170000: 'PowerShot A200',
			0x1180000: 'PowerShot S330 / Digital IXUS 330 / IXY Digital 300a',
			0x1190000: 'PowerShot G3',
			0x1210000: 'PowerShot S45',
			0x1230000: 'PowerShot SD100 / Digital IXUS II / IXY Digital 30',
			0x1240000: 'PowerShot S230 / Digital IXUS v3 / IXY Digital 320',
			0x1250000: 'PowerShot A70',
			0x1260000: 'PowerShot A60',
			0x1270000: 'PowerShot S400 / Digital IXUS 400 / IXY Digital 400',
			0x1290000: 'PowerShot G5',
			0x1300000: 'PowerShot A300',
			0x1310000: 'PowerShot S50',
			0x1340000: 'PowerShot A80',
			0x1350000: 'PowerShot SD10 / Digital IXUS i / IXY Digital L',
			0x1360000: 'PowerShot S1 IS',
			0x1370000: 'PowerShot Pro1',
			0x1380000: 'PowerShot S70',
			0x1390000: 'PowerShot S60',
			0x1400000: 'PowerShot G6',
			0x1410000: 'PowerShot S500 / Digital IXUS 500 / IXY Digital 500',
			0x1420000: 'PowerShot A75',
			0x1440000: 'PowerShot SD110 / Digital IXUS IIs / IXY Digital 30a',
			0x1450000: 'PowerShot A400',
			0x1470000: 'PowerShot A310',
			0x1490000: 'PowerShot A85',
			0x1520000: 'PowerShot S410 / Digital IXUS 430 / IXY Digital 450',
			0x1530000: 'PowerShot A95',
			0x1540000: 'PowerShot SD300 / Digital IXUS 40 / IXY Digital 50',
			0x1550000: 'PowerShot SD200 / Digital IXUS 30 / IXY Digital 40',
			0x1560000: 'PowerShot A520',
			0x1570000: 'PowerShot A510',
			0x1590000: 'PowerShot SD20 / Digital IXUS i5 / IXY Digital L2',
			0x1640000: 'PowerShot S2 IS',
			0x1650000: 'PowerShot SD430 / IXUS Wireless / IXY Wireless',
			0x1660000: 'PowerShot SD500 / Digital IXUS 700 / IXY Digital 600',
			0x1668000: 'EOS D60',
			0x1700000: 'PowerShot SD30 / Digital IXUS i zoom / IXY Digital L3',
			0x1740000: 'PowerShot A430',
			0x1750000: 'PowerShot A410',
			0x1760000: 'PowerShot S80',
			0x1780000: 'PowerShot A620',
			0x1790000: 'PowerShot A610',
			0x1800000: 'PowerShot SD630 / Digital IXUS 65 / IXY Digital 80',
			0x1810000: 'PowerShot SD450 / Digital IXUS 55 / IXY Digital 60',
			0x1870000: 'PowerShot SD400 / Digital IXUS 50 / IXY Digital 55',
			0x1880000: 'PowerShot A420',
			0x1890000: 'PowerShot SD900 / Digital IXUS 900 Ti',
			0x1900000: 'PowerShot SD550 / Digital IXUS 750 / IXY Digital 700',
			0x1920000: 'PowerShot A700',
			0x1940000: 'PowerShot SD700 IS / Digital IXUS 800 IS / IXY Digital 800 IS',
			0x1950000: 'PowerShot S3 IS',
			0x1960000: 'PowerShot A540',
			0x1970000: 'PowerShot SD600 / Digital IXUS 60 / IXY Digital 70',
			0x1980000: 'PowerShot G7',
			0x1990000: 'PowerShot A530',
			0x2000000: 'PowerShot SD800 IS / Digital IXUS 850 IS',
			0x2010000: 'PowerShot SD40 / Digital IXUS i7 zoom',
			0x2020000: 'PowerShot A710 IS',
			0x2030000: 'PowerShot A640',
			0x2040000: 'PowerShot A630',
			0x3010000: 'PowerShot Pro90 IS',
			0x4040000: 'PowerShot G1',
			0x6040000: 'PowerShot S100 / Digital IXUS / IXY Digital',
			0x4007d675: 'HV10',
			0x80000001: 'EOS-1D',
			0x80000167: 'EOS-1DS',
			0x80000168: 'EOS 10D',
			0x80000170: 'EOS Digital Rebel / 300D / Kiss Digital',
			0x80000174: 'EOS-1D Mark II',
			0x80000175: 'EOS 20D',
			0x80000188: 'EOS-1Ds Mark II',
			0x80000189: 'EOS Digital Rebel XT / 350D / Kiss Digital N',
			0x80000213: 'EOS 5D',
			0x80000232: 'EOS-1D Mark II N',
			0x80000234: 'EOS 30D',
			0x80000236: 'EOS Digital Rebel XTi / 400D / Kiss Digital X'
		},
		DateStamps = ['off (0)', 'date (1)', 'date and time (2)'],
		ColourSpaces = ['n/a (0)', 'sRGB (1)', 'Adobe RGB (2)'];
	
	FlashModes[16] = 'external flash (16)';
	FocusModes[16] = 'pan focus (16)';
	Contrasts[0xFFFF] = 'low (-1)';
	Saturations[0xFFFF] = 'low (-1)';
	Sharpnesses[0xFFFF] = 'low (-1)';
	ISOs[15] = 'auto (15)';
	ISOs[16] = '50 (16)';
	ISOs[17] = '100 (17)';
	ISOs[18] = '200 (18)';
	ISOs[19] = '400 (19)';
	LensTypes[10] = 'Canon EF 50mm f/2.5 Macro or Sigma';
	LensTypes[11] = 'Canon EF 35mm f/2';
	LensTypes[13] = 'Canon EF 15mm f/2.8';
	LensTypes[21] = 'Canon EF 80-200mm f/2.8L';
	LensTypes[22] = 'Tokina AT-X280AF PRO 28-80mm F2.8 ASPHERICAL';
	LensTypes[26] = 'Canon EF 100mm f/2.8 Macro or Cosina 100mm f/3.5 Macro AF or Tamron';
	LensTypes[28] = 'Tamron AF Aspherical 28-200mm f/3.8-5.6 or 28-75mm f/2.8 or 28-105mm f/2.8';
	LensTypes[29] = 'Canon EF 50mm f/1.8 MkII';
	LensTypes[31] = 'Tamron SP AF 300mm f/2.8 LD IF';
	LensTypes[32] = 'Canon EF 24mm f/2.8 or Sigma 15mm f/2.8 EX Fisheye';
	LensTypes[39] = 'Canon EF 75-300mm f/4-5.6';
	LensTypes[40] = 'Canon EF 28-80mm f/3.5-5.6';
	LensTypes[43] = 'Canon EF 28-105mm f/4-5.6';
	LensTypes[45] = 'Canon EF-S 18-55mm f/3.5-5.6';
	LensTypes[124] = 'Canon MP-E 65mm f/2.8 1-5x Macro Photo';
	LensTypes[125] = 'Canon TS-E 24mm f/3.5L';
	LensTypes[126] = 'Canon TS-E 45mm f/2.8';
	LensTypes[127] = 'Canon TS-E 90mm f/2.8';
	LensTypes[130] = 'Canon EF 50mm f/1.0L';
	LensTypes[131] = 'Sigma 17-35mm f2.8-4 EX Aspherical HSM';
	LensTypes[134] = 'Canon EF 600mm f/4L IS';
	LensTypes[135] = 'Canon EF 200mm f/1.8L';
	LensTypes[136] = 'Canon EF 300mm f/2.8L';
	LensTypes[137] = 'Canon EF 85mm f/1.2L';
	LensTypes[139] = 'Canon EF 400mm f/2.8L';
	LensTypes[141] = 'Canon EF 500mm f/4.5L';
	LensTypes[142] = 'Canon EF 300mm f/2.8L IS';
	LensTypes[143] = 'Canon EF 500mm f/4L IS';
	LensTypes[149] = 'Canon EF 100mm f/2';
	LensTypes[150] = 'Canon EF 14mm f/2.8L or Sigma 20mm EX f/1.8';
	LensTypes[151] = 'Canon EF 200mm f/2.8L';
	LensTypes[152] = 'Sigma Lens (various models)';
	LensTypes[153] = 'Canon EF 35-350mm f/3.5-5.6L or Tamron or Sigma Bigma';
	LensTypes[155] = 'Canon EF 85mm f/1.8 USM';
	LensTypes[156] = 'Canon EF 28-105mm f/3.5-4.5 USM';
	LensTypes[160] = 'Canon EF 20-35mm f/3.5-4.5 USM';
	LensTypes[161] = 'Canon EF 28-70mm f/2.8L or Sigma 24-70mm EX f/2.8 or Tamron 90mm f/2.8';
	LensTypes[165] = 'Canon EF 70-200mm f/2.8 L';
	LensTypes[166] = 'Canon EF 70-200mm f/2.8 L + x1.4';
	LensTypes[167] = 'Canon EF 70-200mm f/2.8 L + x2';
	LensTypes[168] = 'Canon EF 28mm f/1.8 USM';
	LensTypes[169] = 'Canon EF17-35mm f/2.8L or Sigma 15-30mm f/3.5-4.5 EX DG Aspherical';
	LensTypes[170] = 'Canon EF 200mm f/2.8L II';
	LensTypes[173] = 'Canon EF 180mm Macro f/3.5L or Sigma 180mm F3.5 or 150mm f/2.8 Macro';
	LensTypes[174] = 'Canon EF 135mm f/2L';
	LensTypes[176] = 'Canon EF 24-85mm f/3.5-4.5 USM';
	LensTypes[177] = 'Canon EF 300mm f/4L IS';
	LensTypes[178] = 'Canon EF 28-135mm f/3.5-5.6 IS';
	LensTypes[180] = 'Canon EF 35mm f/1.4L';
	LensTypes[181] = 'Canon EF 100-400mm f/4.5-5.6L IS + x1.4';
	LensTypes[182] = 'Canon EF 100-400mm f/4.5-5.6L IS + x2';
	LensTypes[183] = 'Canon EF 100-400mm f/4.5-5.6L IS';
	LensTypes[184] = 'Canon EF 400mm f/2.8L + x2';
	LensTypes[186] = 'Canon EF 70-200mm f/4L';
	LensTypes[190] = 'Canon EF 100mm f/2.8 Macro';
	LensTypes[191] = 'Canon EF 400mm f/4 DO IS';
	LensTypes[197] = 'Canon EF 75-300mm f/4-5.6 IS';
	LensTypes[198] = 'Canon EF 50mm f/1.4 USM';
	LensTypes[202] = 'Canon EF 28-80 f/3.5-5.6 USM IV';
	LensTypes[211] = 'Canon EF 28-200mm f/3.5-5.6';
	LensTypes[213] = 'Canon EF 90-300mm f/4.5-5.6';
	LensTypes[214] = 'Canon EF-S 18-55mm f/3.5-4.5 USM';
	LensTypes[224] = 'Canon EF 70-200mm f/2.8L IS USM';
	LensTypes[225] = 'Canon EF 70-200mm f/2.8L IS USM + x1.4';
	LensTypes[226] = 'Canon EF 70-200mm f/2.8L IS USM + x2';
	LensTypes[229] = 'Canon EF 16-35mm f/2.8L';
	LensTypes[230] = 'Canon EF 24-70mm f/2.8L';
	LensTypes[231] = 'Canon EF 17-40mm f/4L';
	LensTypes[232] = 'Canon EF 70-300mm f/4.5-5.6 DO IS USM';
	LensTypes[234] = 'Canon EF-S 17-85mm f4-5.6 IS USM';
	LensTypes[235] = 'Canon EF-S10-22mm F3.5-4.5 USM';
	LensTypes[236] = 'Canon EF-S60mm F2.8 Macro USM';
	LensTypes[237] = 'Canon EF 24-105mm f/4L IS';
	LensTypes[238] = 'Canon EF 70-300mm f/4-5.6 IS USM';
	LensTypes[239] = 'Canon EF 85mm f/1.2L II USM';
	LensTypes[240] = 'Canon EF-S 17-55mm f/2.8 IS USM';
	LensTypes[241] = 'Canon EF 50mm f/1.2L USM';
	LensTypes[242] = 'Canon EF 70-200mm f/4L IS USM';
	LensTypes[0x7FFF] = LensTypes[65535] = 'n/a';	
	PhotoEffects[100] = 'My Color data (100)';
	AutoExposureBracketings[0xFFFF] = 'on (-1)';
	AutoRotates[0xFFFF] = 'rotated by software (-1)';

	// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html
	// http://www.ozhiker.com/electronics/pjmt/jpeg_info/canon_mn.html
	// http://www.burren.cx/david/canon.html
	// http://translate.google.com/translate?hl=en&sl=ja&u=http://homepage3.nifty.com/kamisaka/makernote/makernote_canon.htm&sa=X&oi=translate&resnum=5&ct=result&prev=/search%3Fq%3Dcanon%2Bmakernote%26hl%3Den%26hs%3DzDF%26lr%3D%26client%3Dfirefox-a%26rls%3Dorg.mozilla:en-US:official
	// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Canon.html

	function getCanonInterpretedTagData(tagnum, data) {
		var tmp, length, i, image, out, output = [];

		switch (tagnum) {
		case 0x0000:
			output.push('Unknown (0x0000) = ' + data);
			break;
		case 0x0001:
			output.push('<b>Camera Settings</b>');
			tmp = [];
			utils.bytesToBuffer(data, tmp);
//			if (tmp[0] !== 2 * tmp.length) {
//				output.push('Tag length = ' + tmp[0] + ' bytes');
//				output.push('Buffer length = ' + tmp.length + ' shorts'); 
//			}
			length = tmp.length;
			if (length === 1) { break; }
			output.push('Macro Mode = ' + (MacroModes[tmp[1]] ? MacroModes[tmp[1]] : tmp[1]));
			if (length === 2) { break; }
			output.push('Self-Timer = ' + (tmp[2] !== 0 ? tmp[2] + ' tenths of a second' : 'n/a'));
			if (length === 3) { break; }
			output.push('Quality = ' + (Qualities[tmp[3]] ? Qualities[tmp[3]] : tmp[3]));
			if (length === 4) { break; }
			output.push('Flash Mode = ' + (FlashModes[tmp[4]] ? FlashModes[tmp[4]] : tmp[4]));
			if (length === 5) { break; }
			output.push('Continuous Drive Mode = ' + (CDModes[tmp[5]] ? CDModes[tmp[5]] : tmp[5]));
			if (length === 6) { break; }
			output.push('Unknown (0x0001.6) = ' + tmp[6]);
			if (length === 7) { break; }
			output.push('Focus Mode = ' + (FocusModes[tmp[7]] ? FocusModes[tmp[7]] : tmp[7]));
			if (length === 8) { break; }
			output.push('Unknown (0x0001.8) = ' + tmp[8]);
			if (length === 9) { break; }
			output.push('Record Mode = ' + (RecordModes[tmp[9]] ? RecordModes[tmp[9]] : tmp[9]));
			if (length === 10) { break; }
			output.push('Image Size = ' + (ImageSizes[tmp[10]] ? ImageSizes[tmp[10]] : tmp[10]));
			if (length === 11) { break; }
			output.push('&#8220;Easy Shooting&#8221; Mode = ' + (ShootingModes[tmp[11]] ? ShootingModes[tmp[11]] : tmp[11]));
			if (length === 12) { break; }
			output.push('Digital Zoom = ' + (DigitalZooms[tmp[12]] ? DigitalZooms[tmp[12]] : tmp[12]));
			if (length === 13) { break; }
			output.push('Contrast = ' + (Contrasts[tmp[13]] ? Contrasts[tmp[13]] : tmp[13]));
			if (length === 14) { break; }
			output.push('Saturation = ' + (Saturations[tmp[14]] ? Saturations[tmp[14]] : tmp[14]));
			if (length === 15) { break; }
			output.push('Sharpness = ' + (Sharpnesses[tmp[15]] ? Sharpnesses[tmp[15]] : tmp[15]));
			if (length === 16) { break; }
			output.push('ISO Speed = ' + (ISOs[tmp[16]] ? ISOs[tmp[16]] : tmp[16]));
			if (length === 17) { break; }
			output.push('Metering Mode = ' + (MeteringModes[tmp[17]] ? MeteringModes[tmp[17]] : tmp[17]));
			if (length === 18) { break; }
			output.push('Focus Type = ' + (FocusTypes[tmp[18]] ? FocusTypes[tmp[18]] : tmp[18]));
			if (length === 19) { break; }
			output.push('Auto Focus Point Selected = ' + (APPoints[tmp[19]] ? APPoints[tmp[19]] : '0x' + tmp[19] /*.toString(16)*/));
			if (length === 20) { break; }
			output.push('Exposure Mode = ' + (ExposureModes[tmp[20]] ? ExposureModes[tmp[20]] : tmp[20]));
			if (length === 21) { break; }
			output.push('Unknown (0x0001.21) = ' + tmp[21]);
			if (length === 22) { break; }
			output.push('Lens Type = ' + (LensTypes[tmp[22]] ? LensTypes[tmp[22]] : tmp[22]));
			if (length === 23) { break; }
			output.push('&#8220;Long&#8221; Focal Length of Lens = ' + tmp[23] + ' focal units');
			if (length === 24) { break; }
			output.push('&#8220;Short&#8221; Focal Length of Lens = ' + tmp[24] + ' focal units');
			if (length === 25) { break; }
			output.push('Focal Units = ' + tmp[25] + ' per mm');
			if (length === 26) { break; }
			output.push('Maximum Aperture = ' + tmp[26]);
			if (length === 27) { break; }
			output.push('Minimum Aperture = ' + tmp[27]);
			if (length === 28) { break; }
			output.push('Flash Activity = ' + (FlashActivities[tmp[28]] ? FlashActivities[tmp[28]] : tmp[28]));
			if (length === 29) { break; }
			out = [];
			if (tmp[29] & (1 << 14)) { out.push('external E-TTL (bit 14)'); }
			if (tmp[29] & (1 << 13)) { out.push('internal / built-in flash (bit 13)'); }
			if (tmp[29] & (1 << 11)) { out.push('FP sync used (bit 11)'); }
			if (tmp[29] & (1 <<  4)) { out.push('FP sync enabled (bit 4)'); }
			if (tmp[29] & (1 <<  0)) { out.push('manual (bit 0)'); }
			if (tmp[29] & (1 <<  1)) { out.push('TTL (bit 1)'); }
			if (tmp[29] & (1 <<  2)) { out.push('A-TTL (bit 2)'); }
			if (tmp[29] & (1 <<  3)) { out.push('E-TTL (bit 3)'); }
			if (tmp[29] & (1 <<  7)) { out.push('second-curtain sync used (bit 7)'); }
//			out.push('0x' + tmp[29].toString(16));
			output.push('Flash Details = ' + out.join(' / '));
			if (length === 30) { break; }
			output.push('Unknown (0x0001.30) = ' + tmp[30]);
			if (length === 31) { break; }
			output.push('Unknown (0x0001.31) = ' + tmp[31]);
			if (length === 32) { break; }
			output.push('Focus Continuous Mode = ' + (FocusModes[tmp[32]] ? FocusModes[tmp[32]] : tmp[32]));
			if (length === 33) { break; }
			output.push('AE Setting = ' + (AESettings[tmp[33]] ? AESettings[tmp[33]] : tmp[33]));
			if (length === 34) { break; }
			output.push('Image Stabilization = ' + (ImageStabilizations[tmp[34]] ? ImageStabilizations[tmp[34]] : tmp[34]));
			if (length === 35) { break; }
			output.push('Display Aperture = ' + tmp[35]);
			if (length === 36) { break; }
			output.push('Zoom Source Width = ' + tmp[36]);
			if (length === 37) { break; }
			output.push('Zoom Target Width = ' + tmp[37]);
			if (length === 38) { break; }
			output.push('Unknown (0x0001.38) = ' + tmp[38]);
			if (length === 39) { break; }
			output.push('Unknown (0x0001.39) = ' + tmp[39]);
			if (length === 40) { break; }
			output.push('Photo Effect = ' + (PhotoEffects[tmp[40]] ? PhotoEffects[tmp[40]] : tmp[40]));
			if (length === 41) { break; }
			output.push('Manual Flash Output = ' + (FlashOutputs[tmp[41]] ? FlashOutputs[tmp[41]] : tmp[41]));
			if (length === 42) { break; }
			output.push('Color Tone = ' + tmp[42]);
			for (i = 43 ; i < length ; i += 1) {
				output.push('Unknown (0x0001.' + i + ') = ' + tmp[i]);
			} 
			break;
		case 0x0002:
			output.push('<b>Focal Length</b>');
			tmp = [];
			utils.bytesToBuffer(data, tmp);
//			if (tmp[0] !== 2 * tmp.length) {
//				output.push('Tag length = ' + tmp[0] + ' bytes');
//				output.push('Buffer length = ' + tmp.length + ' shorts'); 
//			}
			length = tmp.length;
			if (length === 0) { break; }
			output.push('Focal Type  = ' + (FocalTypes[tmp[0]] ? FocalTypes[tmp[0]] : tmp[0]));
			if (length === 1)  { break; }
			output.push('(Scaled) Focal Length = ' + tmp[1]);
			if (length === 2)  { break; }
			output.push('Focal Plane X Size = ' + tmp[2]);
			if (length === 3)  { break; }
			output.push('Focal Plane Y Size = ' + tmp[3]);
			for (i = 4 ; i < tmp.length ; i += 1) {
				output.push('Unknown (0x0002.' + i + ') = ' + tmp[i]);
			} 
			break;
		case 0x0003:
			output.push('Unknown / Flash Information? (0x0003) = ' + data);
			break;
		case 0x0004:
			output.push('<b>Shot Information</b>');
			tmp = [];
			utils.bytesToBuffer(data, tmp);
//			if (tmp[0] !== 2 * tmp.length) {
//				output.push('Tag length = ' + tmp[0] + ' bytes');
//				output.push('Buffer length = ' + tmp.length + ' shorts'); 
//			}
			length = tmp.length;
			if (length === 1)  { break; }
			output.push('Auto ISO = ' + tmp[1]);
			if (length === 2)  { break; }
			output.push('Base ISO = ' + tmp[2]);
//			output.push('Actual ISO = ' + (tmp[1] * tmp[2] / 100000));
			if (length === 3)  { break; }
			output.push('Measured EV = ' + tmp[3]);
			if (length === 4)  { break; }
			output.push('Target Aperture = ' + tmp[4]);
			if (length === 5)  { break; }
			output.push('Target Exposure Time = ' + tmp[5]);
			if (length === 6)  { break; }
			output.push('Exposure Compensation = ' + tmp[6]);
			if (length === 7)  { break; }
			output.push('White Balance = ' + (WhiteBalances[tmp[7]] ? WhiteBalances[tmp[7]] : tmp[7]));
			if (length === 8)  { break; }
			output.push('Slow Shutter = ' + (SlowShutters[tmp[8]] ? SlowShutters[tmp[8]] : tmp[8]));
			if (length === 9)  { break; }
			output.push('Sequence Number = ' + tmp[9]);
			if (length === 10)  { break; }
			output.push('Optical Zoom Code = ' + tmp[10]);
			if (length === 11)  { break; }
			output.push('Unknown (0x0004.11) = ' + tmp[11]);
			if (length === 12)  { break; }
			output.push('Unknown (0x0004.12) = ' + tmp[12]);
			if (length === 13)  { break; }
			output.push('Flash Guide Number = ' + tmp[13]);
			if (length === 14)  { break; }
			out = [];
			if (tmp[14] & (1 << 2)) { out.push('left (bit 2)'); }
			if (tmp[14] & (1 << 1)) { out.push('center (bit 1)'); }
			if (tmp[14] & (1 << 0)) { out.push('right (bit 0)'); }
			if (out.length === 0) { out.push('none / manual focus'); }
			out.push((tmp[14] >> 12) + ' available focus points (bits 15-12)');
			output.push('AF Points In Focus (Used) = ' + out.join(' / '));
			if (length === 15)  { break; }
			output.push('Flash Bias /Exposure Compensation = ' + (FlashBiases[tmp[15]] ? FlashBiases[tmp[15]] + ' EV' : tmp[15]));
			if (length === 16)  { break; }
			output.push('Auto Exposure Bracketing = ' + (AutoExposureBracketings[tmp[16]] ? AutoExposureBracketings[tmp[16]] : tmp[16]));
			if (length === 17)  { break; }
			output.push('AEB Bracket Value = ' + tmp[17]);
			if (length === 18)  { break; }
			output.push('Unknown (0x0004.18) = ' + tmp[18]);
			if (length === 19)  { break; }
			output.push('Subject Distance (Focus Distance Upper) = ' + tmp[19] + ' (in units of 0.01 or 0.001 m)');
			if (length === 20)  { break; }
			output.push('(Focus Distance Lower) = ' + tmp[20]);
			if (length === 21)  { break; }
			output.push('F Number = ' + tmp[21]);
			if (length === 22)  { break; }
			output.push('Exposure Time = ' + tmp[22]);
			if (length === 23)  { break; }
			output.push('Unknown (0x0004.23) = ' + tmp[23]);
			if (length === 24)  { break; }
			output.push('Bulb Duration = ' + tmp[24]);
			if (length === 25)  { break; }
			output.push('Unknown (0x0004.25) = ' + tmp[25]);
			if (length === 26)  { break; }
			output.push('Camera Type = ' + (CameraTypes[tmp[26]] ? CameraTypes[tmp[26]] : tmp[26]));
			if (length === 27)  { break; }
			output.push('Auto Rotate = ' + (AutoRotates[tmp[27]] ? AutoRotates[tmp[27]] : tmp[27]));
			if (length === 28)  { break; }
			output.push('ND Filter = ' + (NDFilters[tmp[28]] ? NDFilters[tmp[28]] : tmp[28]));
			if (length === 29)  { break; }
			output.push('Self Timer 2 = ' + tmp[29]);
			if (length === 30)  { break; }
			output.push('Unknown (0x0004.30) = ' + tmp[30]);
			if (length === 31)  { break; }
			output.push('Unknown (0x0004.31) = ' + tmp[31]);
			if (length === 32)  { break; }
			output.push('Unknown (0x0004.32) = ' + tmp[32]);
			if (length === 33)  { break; }
			output.push('Flash Output = ' + tmp[33]);
			for (i = 34 ; i < tmp.length ; i += 1) {
				output.push('Unknown (0x0004.' + i + ') = ' + tmp[i]);
			} 
			break;
		case 0x0005:
			output.push('<b>Panorama</b>');
			tmp = [];
			utils.bytesToBuffer(data, tmp);
			length = tmp.length;
			if (length === 1)  { break; }
			output.push('Unknown (0x0005.1) = ' + tmp[1]);
			if (length === 2)  { break; }
			output.push('Panorama Frame = ' + tmp[2]);
			if (length === 3)  { break; }
			output.push('Unknown (0x0005.3) = ' + tmp[3]);
			if (length === 4)  { break; }
			output.push('Unknown (0x0005.4) = ' + tmp[4]);
			if (length === 5)  { break; }
			output.push('Panorama Direction = ' + (PanoramaDirections[tmp[5]] ? PanoramaDirections[tmp[5]] : tmp[5]));
			for (i = 6 ; i < tmp.length ; i += 1) {
				output.push('Unknown (0x0005.' + i + ') = ' + tmp[i]);
			} 
			break;
		case 0x0006:
			output.push('Image Type = ' + data);
			break;
		case 0x0007:
			output.push('Firmware Version = ' + data);
			break;
		case 0x0008:
			image = data.toString(10);
			output.push('Image/File Number = ' + image.substr(0, 3) + '-' + image.substr(3, 4)); 
			break;
		case 0x0009:
			output.push('Owner Name = ' + utils.cleanExifStringData(data));
			break;
		case 0x000A:
			output.push('Color Information (D30) (0x000A) = ' + data);
			break;
		case 0x000B:
			output.push('Unknown (0x000B) = ' + data);
			break;
		case 0x000C:
			out = '';
			out += ((data & 0xFFFF0000) >> 16).toString(16);	// 4-digit hex number
			out += '-';
			out += (data & 0xFFFF);	// 5-digit decimal number 
			output.push('Camera Serial Number = ' + out);
			break;
		case 0x000D:
			output.push('<b>Camera Information</b>');	// multiple formats
			tmp = [];
			utils.bytesToBuffer(data, tmp);
//			if (tmp[0] !== 2 * tmp.length) {
//				output.push('Tag length = ' + tmp[0] + ' bytes');
//				output.push('Buffer length = ' + tmp.length + ' shorts'); 
//			}
			(function () {
				var i, cnt = 0;
				for (i = 0 ; i < tmp.length ; i += 1) {
					if (tmp[i] !== 0) {
						output.push('Unknown (0x000D.' + i + ') = ' + tmp[i]);
					} else {
						cnt += 1;
					}
				}
				if (cnt !== 0) { output.push(cnt + ' zero values omitted out of ' + tmp.length + ' values provided.'); }
			})();
			break;
		case 0x000E:
			output.push('File Length = ' + data);
			break;
		case 0x000F:
			output.push('Custom Functions = ' + data);	// multiple formats
			break;
		case 0x0010:
			if (data < 0) { data += 0xFFFFFFFF + 1; }
			output.push('Camera Model = ' + (CameraModels[data] ? CameraModels[data] : '0x' + data.toString(16)));
			break;
		case 0x0011:
			output.push('Unknown (0x0011) = ' + data);
			break;
		case 0x0012:
			output.push('<b>Picture / AutoFocus Information</b>');
			tmp = [];
			utils.bytesToBuffer(data, tmp);
//			if (tmp[0] !== 2 * tmp.length) {
//				output.push('Tag length = ' + tmp[0] + ' bytes');
//				output.push('Buffer length = ' + tmp.length + ' shorts'); 
//			}
			length = tmp.length;
			if (length === 0)  { break; }
			output.push('Number AF Points = ' + tmp[0]);
			if (length === 1)  { break; }
			output.push('Number Valid AF Points = ' + tmp[1]);
			if (length === 2)  { break; }
			output.push('Image Width = ' + tmp[2]);
			if (length === 3)  { break; }
			output.push('Image Height = ' + tmp[3]);
			if (length === 4)  { break; }
			output.push('AF Image Width (as Shot) = ' + tmp[4]);
			if (length === 5)  { break; }
			output.push('AF Image Height (as Shot) = ' + tmp[5]);
			if (length === 6)  { break; }
			output.push('AF Area Width = ' + tmp[6]);
			if (length === 7)  { break; }
			output.push('AF Area Height = ' + tmp[7]);
			if (length === 8)  { break; }
			output.push('AF Area X Positions = ' + tmp[8]);
			if (length === 9)  { break; }
			output.push('AF Area Y Positions = ' + tmp[9]);
			if (length === 10)  { break; }
			output.push('AF Points In Focus = ' + tmp[10]);
			if (length === 11)  { break; }
			output.push('Primary AF Point  ' + tmp[11]);
			if (length === 12)  { break; }
			output.push('Primary AF Point = ' + tmp[12]);
			if (length === 13)  { break; }
			output.push('Unknown (0x0012.13) = ' + tmp[13]);
			if (length === 14)  { break; }
			output.push('Unknown (0x0012.14) = ' + tmp[14]);
			if (length === 15)  { break; }
			output.push('Unknown (0x0012.15) = ' + tmp[15]);
			if (length === 16)  { break; }
			output.push('Unknown (0x0012.16) = ' + tmp[16]);
			if (length === 17)  { break; }
			output.push('Unknown (0x0012.17) = ' + tmp[17]);
			if (length === 18)  { break; }
			output.push('Unknown (0x0012.18) = ' + tmp[18]);
			if (length === 19)  { break; }
			output.push('Unknown (0x0012.19) = ' + tmp[19]);
			if (length === 20)  { break; }
			output.push('Unknown (0x0012.20) = ' + tmp[20]);
			if (length === 21)  { break; }
			output.push('Unknown (0x0012.21) = ' + tmp[21]);
			if (length === 22)  { break; }
			output.push('AF Points Used = ' + tmp[22]);
			if (length === 23)  { break; }
			output.push('Unknown (0x0012.23) = ' + tmp[23]);
			if (length === 24)  { break; }
			output.push('Unknown (0x0012.24) = ' + tmp[24]);
			if (length === 25)  { break; }
			output.push('Unknown (0x0012.25) = ' + tmp[25]);
			if (length === 26)  { break; }
			output.push('AF Points Used = ' + tmp[26]);
			for (var i = 27 ; i < length ; i++) {
				output.push('Unknown (0x0012.' + i + ') = ' + tmp[i]);
			}
			break;
		case 0x0015:
			// 0x90000000 = Format 1
			// 0xa0000000 = Format 2
			output.push('Serial Number Format = ' + data);
			break;
		case 0x001C:
			output.push('Date Stamp Mode = ' + (DateStamps[data] ? DateStamps[data] : data));
			break;
		case 0x001D:
			output.push('My Colors = ' + data);
			break;
		case 0x001E:
			output.push('Firmware Revision = ' + data);
			break;
		case 0x0024:
			output.push('Face Detect 1 = ' + data);
			break;
		case 0x0025:
			output.push('Face Detect 2 = ' + data);
			break;
		case 0x0026:
			output.push('AF Information 2 = ' + data);
			break;
		case 0x0083:
			output.push('Original Decision Data = ' + data);
			break; 	 
		case 0x0090:
			output.push('Custom Functions 1D = ' + data);
			break;
		case 0x0091:
			output.push('Personal Functions = ' + data);
			break;
		case 0x0092:
			output.push('Personal Function Values = ' + data);
			break;
		case 0x0093:
			output.push('File Information = ' + data);
			break;
		case 0x0094:
			output.push('AF Points Used (in Focus) 1D = ' + data);
			break;
		case 0x0095:
			output.push('Lens Type = ' + data);
			break; 	 
		case 0x0096:
			output.push('Internal Serial Number? = ' + data);
			break; 	 
		case 0x0097:
			output.push('Dust Removal Data = ' + data);
			break; 	 
		case 0x0099:
			output.push('Custom Functions 2 = ' + data);
			break;
		case 0x00A0:
			output.push('Proccessing Information = ' + data);
			break;
		case 0x00A1:
			output.push('Tone Curve Table = ' + data);
			break; 	 
		case 0x00A2:
			output.push('Sharpness Table = ' + data);
			break; 	 
		case 0x00A3:
			output.push('Sharpness Frequency Table = ' + data);
			break; 	 
		case 0x00A4:
			output.push('White Balance Table = ' + data);
			break; 	 
		case 0x00A9:
			output.push('Colour Balance = ' + data);
			break;
		case 0x00AE:
			output.push('Color Temperature = ' + data);
			break; 	 
		case 0x00B0:
			output.push('Canon Flags = ' + data);
			break;
		case 0x00B1:
			output.push('Modified Information = ' + data);
			break;
		case 0x00B2:
			output.push('Tone Curve Matching = ' + data);
			break; 	 
		case 0x00B3:
			output.push('White Balance Matching = ' + data);
			break; 	 
		case 0x00B4:
			output.push('Color Space = ' + (ColourSpaces[data] ? ColourSpaces[data] : data));
			break;
		case 0x00B6:
			output.push('Preview Image Information = ' + data);
			break;
		case 0x00E0:
			output.push('Sensor Information = ' + data);
			break;
		case 0x4001:
			output.push('Color Balance Information = ' + data);
			break;
		case 0x4002:
			output.push('Unknown Block 1? = ' + data);
			break; 	 
		case 0x4003:
			output.push('Color Information = ' + data);
			break;
		case 0x4005:
			output.push('Unknown Block 2? = ' + data);
			break;
		case 0x4008:
			output.push('Black Level? = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getCanonInterpretedTagData()

	function dumpCanonTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getCanonInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpCanonTagData()

	makers.dumpCanonTagData = dumpCanonTagData;
}, ['constants', 'utils', 'makers']);;ExifViewerApp.add('casio', function _casio(constants, makers) {
	'use strict';
	
	var RecordingModes = ['n/a (0)', 'single shutter (1)', 'panorama (2)', 
						  'night scene (3)', 'portrait (4)', 'landscape (5)'],
		Qualities = ['n/a (0)', 'economy (1)', 'normal (2)', 'fine (3)'],
		FocusingModes = ['n/a (0)', 'n/1 (1)', 'macro (2)', 'auto focus (3)', 
						 'manual focus (4)', 'infinity (5)', 'n/a (6)', 'spot AF (7)'],
		FlashModes = ['n/a (0)', 'auto (1)', 'on (2)', 'off (3)', 'off OR red-eye reduction (4)', 
					  'red-eye reduction (5)'],
		FlashIntensities = {
			11: 'weak (11)',
			12: 'low (12)',
			13: 'normal (13)',
			14: 'high (14)',
			15: 'strong (15)'
		},
		WhiteBalances = ['n/a (0)', 'auto (1)', 'tungsten (2)', 'daylight (3)', 
						 'fluorescent (4)', 'shade (5)'],
		DigitalZooms = {
			0x10000: 'off',
			0x10001: '2X',
			0x19999: '1.6X',
			0x20000: '2X',
			0x33333: '3.2X',
			0x40000: '4X'
		},
		Sharpnesses = ['normal (0)', 'soft (1)', 'hard (2)'],
		Contrasts = ['normal (0)', 'low (1)', 'high (2)'],
		Saturations = ['normal (0)', 'low (1)', 'high (2)'],
		CCDSensitivities = {
			64: 'normal (64)',
			80: 'normal (80)',
			100: 'high (100)',
			125: '+1.0 (125)',
			250: '+2.0 (250)',
			244: '+3.0 (244)'
		},
		Enhancements = ['n/a (0)', 'off (1)', 'red (2)', 'green (3)', 
						'blue (4)', 'flesh tones (5)'],
		Filters = ['n/a (0)', 'off (1)', 'black &amp; white (2)', 'sepia (3)',
				   'red (4)', 'green (5)', 'blue (6)', 'yellow (7)', 'pink (8)',
				   'purple (9)'],
		AFPoints = ['n/a (0)', 'center (1)', 'upper left (2)', 'upper right (3)',
					 'near left/right of center (4)', 'far left/right of center (5)',
					 'far left/right of center/bottom (6)', 'top near-left (7)',
					 'near upper/left (8)', 'top near-right (9)', 'top left (10)',
					 'top center (11)', 'top right (12)', 'center left (13)',
					 'center right (14)', 'bottom left (15)', 'bottom center (16)',
					 'bottom right (17)'],
		FlashIntensities = ['n/a (0)', 'normal (1)', 'weak (2)', 'strong (3)'];

	RecordingModes[7] = 'panorama (7)';
	RecordingModes[10] = 'night scene (10)';
	RecordingModes[15] = 'portrait (15)';
	RecordingModes[16] = 'landscape (16)';
	WhiteBalances[129] = 'manual (129)';
	Sharpnesses[16] = 'normal (16)';
	Sharpnesses[17] = '+1 (17)';
	Sharpnesses[18] = '-1 (18)';
	Contrasts[16] = 'normal (16)';
	Contrasts[17] = '+1 (17)';
	Contrasts[18] = '-1 (18)';
	Saturations[16] = 'normal (16)';
	Saturations[17] = '+1 (17)';
	Saturations[18] = '-1 (18)';

	// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html#APP3
	// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Casio.html
	function getCasioInterpretedTagData1(tagnum, data) {
		var output = [];
		switch (tagnum) {
		case 0x0001:
			output.push('Recording Mode = ' + (RecordingModes[data] ? RecordingModes[data] : data));
			break;
		case 0x0002:	
			output.push('Quality = ' + (Qualities[data] ? Qualities[data] : data));
			break;
		case 0x0003:
			output.push('Focusing Mode = ' + (FocusingModes[data] ? FocusingModes[data] : data));
			break;
		case 0x0004:	
			output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x0005:	
			output.push('Flash Intensity = ' + (FlashIntensities[data] ? FlashIntensities[data] : data));
			break;
		case 0x0006:
			output.push('Object Distance = ' + data + ' mm');
			break;
		case 0x0007:	
			output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
			break;
		case 0x000A:
			output.push('Digital Zoom = ' + (DigitalZooms[data] ? DigitalZooms[data] : data));
			break;
		case 0x000B:
			output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
			break;
		case 0x000C:
			output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
			break;
		case 0x000D:
			output.push('Saturation = ' + (Saturations[data] ? Saturations[data] : data));
			break;
		case 0x0014:   
			output.push('CCD Sensitivity = ' + (CCDSensitivities[data] ? CCDSensitivities[data] : data));
			break;
		case 0x0016:
			output.push('Enhancement = ' + (Enhancements[data] ? Enhancements[data] : data));
			break;
		case 0x0017:
			output.push('Filter = ' + (Filters[data] ? Filters[data] : data));
			break;
		case 0x0018:
			output.push('AF Point = ' + (AFPoints[data] ? AFPoints[data] : data));
			break;
		case 0x0019:
			output.push('Flash Intensity = ' + (FlashIntensities[data] ? FlashIntensities[data] : data));
			break;
		case 0x0E00:
			output.push('Print IM = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getCasioInterpretedTagData1()

	function getCasioInterpretedTagData2(tagnum, data) {
		var output = [];
		switch (tagnum) {
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getCasioInterpretedTagData2()

	function dumpCasioTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				switch (ifd.maker_type) {
				case 1:
					output.push(getCasioInterpretedTagData1(tagnum, data));
					break;
				case 2:
					output.push(getCasioInterpretedTagData2(tagnum, data));
					break;
				}
			}
		}
	}	// dumpCasioTagData()

	makers.dumpCasioTagData = dumpCasioTagData;
}, ['constants', 'makers']);;ExifViewerApp.add('epson', function _epson(makers) {
	'use strict';
	
	function getEpsonInterpretedTagData(tagnum, data) {
		return makers.getOlympusInterpretedTagData(tagnum, data);
	}	// getEpsonInterpretedTagData()

	function dumpEpsonTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getEpsonInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpEpsonTagData()

	makers.dumpEpsonTagData = dumpEpsonTagData;
}, ['makers']);;ExifViewerApp.add('fujifilm', function _fujifilm(constants, utils, makers) {
	'use strict';
	
	var Sharpnesses = ['n/a (0)', 'soft (1)', 'soft (2)', 'normal (3)', 'hard (4)', 'hard (5)'],
		WhiteBalances = {
			0: 'auto (0)',
			256: 'daylight (256)',
			512: 'cloudy (512)',
			768: 'daylight color - fluorescent (768)',
			769: 'day white color - fluorescent (769)',
			770: 'white - fluorescent (770)',
			1024: 'incandenscent (1024)',
			3840: 'custom white balance (3840)'
		},
		Colours = {
			0: 'normal (STD) (0)', 
			256: 'high (256)', 
			512: 'low (ORG) (512)',
			768: 'none (black&amp,white) (768)'
		},
		Tones = {
			0: 'normal (STD) (0)', 
			256: 'high (HARD) (256)', 
			512: 'low (ORG) (512)'
		},
		FlashModes = ['auto (0)', 'on (1)', 'off (2)', 'red-eye reduction (3)'],
		MacroModes = ['off (0)', 'on (1)'],
		FocusModes = ['auto (0)', 'manual (1)'],
		SlowSyncs = ['off (0)', 'on (1)'],
		PictureModes = ['auto (0)', 'portrait scene (1)', 'landscape scene (2)',
						'n/a (3)', 'sports scene (4)', 'night scene (5)', 'program AE (6)',
						'natural light (7)', 'anti-blur (8)', 'n/a (9)', 'sunset (10)', 
						'museum (11)', 'party (12)', 'flower (13)', 'text (14)', 
						'natural light &amp, flash (15)', 'beach (16)', 'snow (17)',
						'fireworks (18)', 'underwater (19)'],
		ColourModes = {
			0: 'standard (0)',
			16: 'chrome (16)',
			48: 'black &amp, white (48)'
		},
		ContTakes = ['off (0)', 'on (1)', 'no flash &amp, flash (2)'],
		BlurWarnings = ['no (0)', 'yes (1)'],
		FocusWarnings = ['auto-focus good (0)', 'out of focus (1)'],
		ExposureWarnings = ['AE good (0)', 'bad/over exposure (>1/1000s, F11) (1)'],
		DynamicRanges = ['n/a (0)', 'standard (1)', 'n/a (2)', 'wide (3)'],
		FilmModes = {
			0: 'F0/Standard (0)',
			256: 'F1/Studio Portrait (256)',
			512: 'F2/Fujichrome (512)',
			768: 'F3/Studio Portrait Ex (768)',
			1024: 'F4/Velvia (1024)'
		},
		DynamicRangeSettings = {
			0: 'auto (100-400%) (0)',
			1: 'RAW (1)',
			256: 'standard (100%) (256)',
			512: 'wide1 (230%) (512)',
			513: 'wide2 (400%) (513)',
			0x8000: 'film simulation mode (0x8000)'
		};

	PictureModes[256] = 'aperture priority AE (256)';
	PictureModes[512] = 'shutter speed priority AE (512)';
	PictureModes[768] = 'manual exposure (768)';

	// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html#APP4
	// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/FujiFilm.html
	function getFujifilmInterpretedTagData(tagnum, data) {
		var output = [];
		switch (tagnum) {
		case 0x0000:
			output.push('Version = ' + utils.bytesToString(data));
			break;
		case 0x1010:
			output.push('Internal Serial Number = ' + data);
			break;
		case 0x1000:
			output.push('Quality = ' + data);
			break;
		case 0x1001:
			output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
			break;
		case 0x1002:
			output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
			break;
		case 0x1003:
			output.push('Colour / Chroma Saturation = ' + (Colours[data] ? Colours[data] : data));
			break;
		case 0x1004:
			output.push('Tone / Contrast = ' + (Tones[data] ? Tones[data] : data));
			break;
		case 0x1010:
			output.push('Flash Firing Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x1011:
			output.push('Flash Firing Strength Compensation = ' + data + ' (APEX(EV))');
			break;
		case 0x1020:
			output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
			break;
		case 0x1021:
			output.push('Focusing Mode = ' + (FocusModes[data] ? FocusModes[data] : data));
			break;
		case 0x1023:
			output.push('Focus Pixel = ' + data);
			break;
		case 0x1030:
			output.push('Slow Sync = ' + (SlowSyncs[data] ? SlowSyncs[data] : data));
			break;
		case 0x1031:
			output.push('Picture Mode = ' + (PictureModes[data] ? PictureModes[data] : data));
			break;
		case 0x1100:
			output.push('Continuous Taking / Auto Bracketing Mode = ' + (ContTakes[data] ? ContTakes[data] : data));
			break;
		case 0x1101:
			output.push('Sequence Number = ' + data);
			break;
		case 0x1210:
			output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
			break;
		case 0x1300:
			output.push('Blur Warning = ' + (BlurWarnings[data] ? BlurWarnings[data] : data));
			break;
		case 0x1301:
			output.push('Auto Focus Warning = ' + (FocusWarnings[data] ? FocusWarnings[data] : data));
			break;
		case 0x1302:
			output.push('Auto Exposure Warning = ' + (ExposureWarnings[data] ? ExposureWarnings[data] : data));
			break;
		case 0x1400:
			output.push('Dynamic Range = ' + (DynamicRanges[data] ? DynamicRanges[data] : data));
			break;
		case 0x1401:
			output.push('Filem Mode = ' + (FilmModes[data] ? FilmModes[data] : data));
			break;
		case 0x1402:
			output.push('Dynamic Range Setting = ' + (DynamicRangeSettings[data] ? DynamicRangeSettings[data] : data));
			break;
		case 0x1403:
			output.push('Development Dynamic Range = ' + data);
			break;
		case 0x1404:
			output.push('Minimum Focal Length = ' + data);
			break;
		case 0x1405:
			output.push('Maximum Focal Length = ' + data);
			break;
		case 0x1406:
			output.push('Maximum Aperture at Minimum Focal Length = ' + data);
			break;
		case 0x1407:
			output.push('Maximum Aperture at Maximum Focal Length = ' + data);
			break;
		case 0x8000:
			output.push('File Source = ' + data);
			break;
		case 0x8002:
			output.push('Order Number = ' + data);
			break;
		case 0x8003:
			output.push('Frame Number = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getFujifilmInterpretedTagData()

	function dumpFujifilmTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getFujifilmInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpFujifilmTagData()

	makers.dumpFujifilmTagData = dumpFujifilmTagData;
}, ['constants', 'utils', 'makers']);;ExifViewerApp.add('konica-minolta', function _konica_minolta(makers) {
	'use strict';

	function getKonicaMinoltaInterpretedTagData(tagnum, data) {
		return makers.getOlympusInterpretedTagData(tagnum, data);
	}	// getKonicaMinoltaInterpretedTagData()
	
	function dumpKonicaMinoltaTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getKonicaMinoltaInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpKonicaMinoltaTagData()

	makers.dumpKonicaMinoltaTagData = dumpKonicaMinoltaTagData;
}, ['makers']);;ExifViewerApp.add('kyocera-contax', function _kyocera_contax(constants, makers) {
	'use strict';
	
	function getKyoceraContaxInterpretedTagData(tagnum, data) {
		var output = [];
		switch (tagnum) {
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getKyoceraContaxInterpretedTagData()

	function dumpKyoceraContaxTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getKyoceraContaxInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpKyoceraContaxTagData()

	makers.dumpKyoceraContaxTagData = dumpKyoceraContaxTagData;
}, ['constants', 'makers']);;ExifViewerApp.add('nikon', function _nikon(constants, utils, makers) {
	'use strict';
	
	var QualitySettings = ['n/a (0)', 'VGA Basic - 640x480 (1/16) (1)', 'VGA Normal - 640x480 (1/8) (2)', 'VGA Fine - 640x480 (1/4) (3)', 
							'SXGA Basic - 1280x960 (1/16) (4)', 'SXGA Normal - 1280x960 (1/8) (5)', 'SXGA Fine - 1280x960 (1/4) (6)',
							'XGA Basic - 1024x768 (1/16) (7)', 'XGA Normal - 1024x768 (1/8) (8)', 'XGA Fine - 1024x768 (1/4) (9)',
							'UXGA Basic - 1600x1200 (1/16) (10)', 'UXGA Normal - 1600x1200 (1/8) (11)', 'UXGA Fine - 1600x1200 (1/4) (12)'],
		ColourModes = ['n/a (0)', 'colour (1)', 'monochrome (2)'],
		ImageAdjustments = ['normal (0)', 'bright+ (1)', 'bright- (2)', 'contrast+ (3)', 'contrast- (4)', 'auto? (5)'],
		CCDSensitivities = ['ISO 80 (0)', 'n/a (1)', 'ISO 160 (2)', 'n/a (3)', 'ISO 320 (4)', 'ISO 100 (5)'],
		WhiteBalances = ['auto (0)', 'preset (1)', 'daylight (2)', 'incandescent (3)', 'fluorescent (4)', 
						 'cloudy (5)', 'SpeedLight (flash) (6)'],
		Converters = ['no/none (0)', 'yes/fisheye (1)'],
		ISOSettings = {
			'0,0': 'auto',
			'0,100': 'ISO 100',
			'0,200': 'ISO 200',
			'0,400': 'ISO 400',
			'0,800': 'ISO 800',
			'0,1600': 'ISO 1600'
		},
		FlashCompensations = {0x06:+1.0 , 0x04:+0.7 , 0x03:+0.5 , 0x02:+0.3 , 0x00:+0.0 , 0xfe:-0.3 , 0xfd:-0.5 ,
							  0xfc:-0.7 , 0xfa:-1.0 , 0xf8:-1.3 , 0xf7:-1.5 , 0xf6:-1.7 , 0xf4:-2.0 , 0xf2:-2.3 ,
							  0xf1:-2.5 , 0xf0:-2.7 , 0xee:-3.0},
		ISOSpeedRequests = {
			'0,0': 'auto',
			'0,100': 'ISO 100',
			'0,200': 'ISO 200',
			'0,400': 'ISO 400',
			'0,800': 'ISO 800',
			'0,1600': 'ISO 1600'
		},
		FlashBracketCompensations = {0x06:+1.0 , 0x04:+0.7 , 0x03:+0.5 , 0x02:+0.3 , 0x00:+0.0 , 0xfe:-0.3 , 0xfd:-0.5 ,
									 0xfc:-0.7 , 0xfa:-1.0 , 0xf8:-1.3 , 0xf7:-1.5 , 0xf6:-1.7 , 0xf4:-2.0 , 0xf2:-2.3 ,
									 0xf1:-2.5 , 0xf0:-2.7 , 0xee:-3.0},
		ColourSpaces = ['n/a (0)', 'sRGB (1)', 'Adobe RGB (2)'],
		ImageAuthentications = ['off (0)', 'on (1)'],
		ActiveDLightings = ['off (0)', 'low (1)', 'n/a (2)', 'normal (3)', 'n/a (4)', 'high (5)', 'n/a (6)', 'extra high (7)'],
		VignetteControls = ['off (0)', 'low (1)', 'n/a (2)', 'normal (3)', 'n/a (4)', 'high (5)'],
		FlashModes = ['did not fire (0)', 'fired, manual (1)'],
	/*
		// 0x0088
		AFFocusPositions = {
			'0x00,0x00,0x00,0x00': 'center',
			'0x00,0x01,0x00,0x00': 'top',
			'0x00,0x02,0x00,0x00': 'bottom',
			'0x00,0x03,0x00,0x00': 'left',
			'0x00,0x04,0x00,0x00': 'right'
		},
		output.push('AF Focus Position = ' + (AFFocusPositions[data] ? AFFocusPositions[data] : data));
	*/
		AFAreaModes = ['single area (0)', 'dynamic area (1)',
						'dynamic area, closest subject (2)', 'group dynamic (3)',
						'single area (wide) (4)', 'dynamic area (wide) (5)'],
		AFPoints = ['center (0)', 'top (1)', 'bottom (2)', 'left (3)', 'right (4)',
					'upper-left (5)', 'upper-right (6)', 'lower-left (7)',
					'lower-right (8)', 'far left (9)', 'far right (10)'],
		AutoBracketReleases = ['none (0)', 'auto release (1)', 'manual release (2)'],
		ColourModes2 = {'1a': 'Portrait sRGB (1a)', '2': 'Adobe RGB (2)', '3a': 'Landscape sRGB (3a)'},
		SaturationAdjustments = {
			'-3': 'black and white (-3)',
			'-2': '-2',
			'-1': '-1',
			'0': 'normal (0)',
			'1': '+1',
			'2': '+2'
		},
		TouchupHistories = ['none', 'n/a', 'n/a', 'black and white', 'sepia', 'trim', 'small picture',
							'D-lighting', 'red-eye', 'cyanotype', 'sky light', 'warm tone', 'colour custom', 'image overlay', 
							'red intensifier', 'green intensifier', 'blue intensifier', 'cross screen', 'quick retouch', 
							'NEF processing', 'n/a', 'n/a', 'n/a', 'distortion control', 'n/a', 'fisheye', 'straighten', 'n/a', 
							'n/a', 'perspective control', 'colour outline', 'soft filter', 'n/a', 'miniature effect'],
		NoiseReductions = ['off (0)', 'on for ISO 1600/3200 / minimal (1)', 'weak / low (2)',
							'n/a (3)', 'normal (4)', 'n/a (5)', 'strong / high (6)'],
	/*
		// 0x0089
		Bracketings = ['none-0 (0)', 'none-a (1)'],
		Bracketings[17] = 'exposure (17)';
		Bracketings[81] = 'white balance (81)';
		output.push('Bracketing = ' + (Bracketings[data] ? Bracketings[data] : data));
	*/
		Bits01 = ['single frame (0)', 'continuous (1)', 'timer? (2)', 'remote? (3)'];
			
	QualitySettings[20] = '1600x1200 - Hi (1/1) (20)';
	ActiveDLightings[65535] = 'auto (65535)';
	FlashModes[7] = 'fired, external (7)';
	FlashModes[8] = 'fired, commander mode (8)';
	FlashModes[9] = 'fired, TTL mode / on camera (9)';

	// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Nikon.html
	// http://gvsoft.homedns.org/exif/makernote-nikon.html
	// http://www.ozhiker.com/electronics/pjmt/jpeg_info/nikon_mn.html
	function getNikonInterpretedTagDataFormat1(tagnum, data) {
		var output = [];

		switch (tagnum) {
		case 0x0002:
			output.push('Family ID / Version = ' + data);
			break;
		case 0x0003:
			output.push('Quality Setting = ' + (QualitySettings[data] ? QualitySettings[data] : data));
			break;
		case 0x0004:
			output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
			break;
		case 0x0005:
			output.push('Image Adjustment = ' + (ImageAdjustments[data] ? ImageAdjustments[data] : data));
			break;
		case 0x0006:
			output.push('ISO Speed / CCD Sensitivity = ' + (CCDSensitivities[data] ? CCDSensitivities[data] : data));
			break;
		case 0x0007:
			output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
			break;
		case 0x0008:
			output.push('Focus = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x000A:
			output.push('Digital Zoom = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x000B:
			output.push('Fisheye Converter = ' + (Converters[data] ? Converters[data] : data));
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getNikonInterpretedTagDataFormat1()

	function getNikonInterpretedTagDataFormat23(tagnum, data) {
		var i, data2, tmp, output = [];

		switch (tagnum) {
		case 0x0001:
			output.push('Version = ' + utils.bytesToAscii(data));
			break;
		case 0x0002:
			output.push('ISO Setting = ' + (ISOSettings[data] ? ISOSettings[data] : data));
			break;
		case 0x0003:
			output.push('Colour Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x0004:
			output.push('Quality = ' + utils.cleanExifStringData(data));
			break;
		case 0x0005:
			output.push('White Balance = ' + utils.cleanExifStringData(data));
			break;
		case 0x0006:
			output.push('Sharpness / Image Sharpening = ' + utils.cleanExifStringData(data));
			break;
		case 0x0007:
			output.push('Focus Mode = ' + data);
			break;
		case 0x0008:
			output.push('Flash Setting = ' + utils.cleanExifStringData(data));
			break;
		case 0x0009:
			output.push('Flash Type / Auto Flash Mode = ' + data);
			break;
		case 0x000A:
			output.push('Unknown = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x000B:
			output.push('White Balance Fine Tuning / Bias Value = ' + data);	// Units Approx: 100 Mired per increment
			break;
		case 0x000C:
			output.push('White Balance Red, Blue Coefficients = ' + data + ' = ' + utils.formatRationals(data, 5));
			break;
		case 0x000D:
			output.push('Program Shift = ' + data);
			break;
		case 0x000E:
			output.push('Exposure Difference = ' + data);
			break;
		case 0x000F:
			output.push('ISO Selection = ' + utils.cleanExifStringData(data));
			break;
		case 0x0010:
			output.push('Data Dump = ' + data);
			break;
		case 0x0011:
			output.push('Nikon Preview / Skip / Thumbnail IFD Offset = ' + data);
			break;
		case 0x0012:
			output.push('Flash Exposure Compensation = ' + (FlashCompensations[data] ? FlashCompensations[data] + ' EV' : data));
			break;
		case 0x0013:
			output.push('ISO Setting / ISO Speed Requested = ' + (ISOSpeedRequests[data] ? ISOSpeedRequests[data] : data));
			break;
		case 0x0014:
			output.push('Colour Balance A / NRW Data = ' + data);
			break;
		case 0x0016:
			output.push('Image Boundary / Photo Corner Coordinates = ' + data);
			break;
		case 0x0018:
		case 0x0018:
			output.push('Flash Exposure Bracket Value / Flash Bracket Compensation Applied / External Flash Exposure Compensation = ' + (FlashBracketCompensations[data] ? FlashBracketCompensations[data] + ' EV' : data));
			break;
		case 0x0019:
			output.push('Exposure Bracket Value / AE Bracket Compensation Applied = ' + data + ' = ' + utils.formatRational(data, 5) + ' EV');
			break;
		case 0x001A:
			output.push('Image Processing = ' + data);
			break;
		case 0x001B:
			output.push('Crop High Speed = ' + data);
			break;
		case 0x001C:
			output.push('Exposure Tuning = ' + data);
			break;
		case 0x001D:
			output.push('Serial Number = ' + data);
			break;
		case 0x001E:
			output.push('Colour Space = ' + (ColourSpaces[data] ? ColourSpaces[data] : data));
			break;
		case 0x001F:
			output.push('VR Information = ' + data);
			break;
		case 0x0020:
			output.push('Image Authentication = ' + (ImageAuthentications[data] ? ImageAuthentications[data] : data));
			break;
		case 0x0021:
			output.push('Face Detection = ' + data);
			break;
		case 0x0022:
			output.push('Active D Lighting = ' + (ActiveDLightings[data] ? ActiveDLightings[data] : data));
			break;
		case 0x0023:
			output.push('Picture Control Data = ' + data);
			break;
		case 0x0024:
			output.push('World Time = ' + data);
			break;
		case 0x0025:
			output.push('ISO Information = ' + data);
			break;
		case 0x002a:
			output.push('Vignette Control = ' + (VignetteControls[data] ? VignetteControls[data] : data));
			break;
		case 0x002b:
			output.push('Distortion Information = ' + data);
			break;
		case 0x0039:
			output.push('Location Information = ' + data);
			break;
		case 0x0080:
			output.push('Image Adjustment = ' + utils.cleanExifStringData(data));
			break;
		case 0x0081:
			output.push('Tone Compensation (Contrast) = ' + data);
			break;
		case 0x0082:
			output.push('Lens Adapter / Auxiliary Lens = ' + utils.cleanExifStringData(data));
			break;
		case 0x0083:
			data2 = '';
			data2 += (data & 0x01 ? 'MF ' : ''); 
			data2 += (data & 0x02 ? 'D ' : ''); 
			data2 += (data & 0x04 ? 'G ' : ''); 
			data2 += (data & 0x08 ? 'VR ' : ''); 
			output.push('Lens Type = ' + data2);
			break;
		case 0x0084:
			tmp = utils.formatRationals(data, 5).split(', ');
			output.push('Lens Minimum and Maximum Focal Lengths and Maximum Aperture F-Stop at these Focal Lengths = ' + data + ' = ' + tmp[0] + ' mm, ' + tmp[1] + ' mm, f/' + tmp[2] + ', f/' + tmp[3]);
			break;
		case 0x0085:
			tmp = data.split('/');
			output.push('Manual Focus Distance = ' + (tmp[1] == '0' ? '(not applicable)' : data + ' = ' + utils.formatRational(data, 5) + ' m'));
			break;
		case 0x0086:
			output.push('Digital Zoom Factor = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x0087:
			output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x0088:
			tmp = [];
			if (typeof data === 'number') {	// sometimes it's a number such as 0x1000000
				tmp[0] = data & 0xFF;
				tmp[1] = (data >> 8) & 0xFF;
				tmp[2] = (data >> 16) & 0xFFFF;
			} else {
				utils.bytesToBuffer(data, tmp);
				if (tmp.length === 4) {
					tmp[2] |= (tmp[3] << 8);
					tmp[3] = 0;
				}
			}
			if (tmp.length < 3) { break; }
			output.push('AF Area Mode = ' + (AFAreaModes[tmp[0]] ? AFAreaModes[tmp[0]] : data));
			output.push('AF Point = ' + (AFPoints[tmp[1]] ? AFPoints[tmp[1]] : data));
			data2 = '';
			data2 += (tmp[2] & 0x001 ? 'center ' : ''); 
			data2 += (tmp[2] & 0x002 ? 'top ' : ''); 
			data2 += (tmp[2] & 0x004 ? 'bottom ' : ''); 
			data2 += (tmp[2] & 0x008 ? 'left ' : ''); 
			data2 += (tmp[2] & 0x010 ? 'right ' : ''); 
			data2 += (tmp[2] & 0x020 ? 'upper-left ' : ''); 
			data2 += (tmp[2] & 0x040 ? 'upper-right ' : ''); 
			data2 += (tmp[2] & 0x080 ? 'lower-left ' : ''); 
			data2 += (tmp[2] & 0x100 ? 'lower-right ' : ''); 
			data2 += (tmp[2] & 0x200 ? 'far-left ' : ''); 
			data2 += (tmp[2] & 0x400 ? 'far-right ' : ''); 
			output.push('AF Points Used = ' + data2); 
			break;
		case 0x0089:
			data2 = '';
			data2 += (data & 0x01 ? 'continuous ' : ''); 
			data2 += (data & 0x02 ? 'delay / timer' : ''); 
			data2 += (data & 0x04 ? 'PC-control / remote ' : ''); 
			data2 += (data & 0x08 ? '? ' : ''); 
			data2 += (data & 0x10 ? 'exposure-bracketing ' : ''); 
			data2 += (data & 0x20 ? 'unused-LE-NR-slowdown ' : ''); 
			data2 += (data & 0x40 ? 'white-balance-bracketing ' : ''); 
			data2 += (data & 0x80 ? 'IR-control ' : ''); 
			output.push('Bracketing and Shooting Mode = ' + data2);
			break;
		case 0x008A:
			output.push('Auto Bracket Release = ' + (AutoBracketReleases[data] ? AutoBracketReleases[data] : data));
			break;
		case 0x008B:
			output.push('Lens F-Stops = ' + data);
			break;
		case 0x008C:
			output.push('NEF Curve 1 (Contrast Curve) = ' + data);
			break;
		case 0x008D:
			output.push('Colour Hue/Mode = ' + (ColourModes2[data] ? ColourModes2[data] : utils.cleanExifStringData(data)));
			break;
		case 0x008E:
			output.push('Scene Mode = ' + data + ' = ' + utils.formatRationals(data, 5));
			break;
		case 0x008F:
			output.push('Scene Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x0090:
			output.push('Lighting Type /Light Source = ' + utils.cleanExifStringData(data));
			break;
		case 0x0091:
			output.push('Shot Information = ' + data);
			break;
		case 0x0092:
			output.push('Hue Adjustment = ' + data + ' degrees');
			break;
		case 0x0094:
			output.push('Saturation Adjustment = ' + (SaturationAdjustments[data] ? SaturationAdjustments[data] : data));
			break;
		case 0x0095:
			output.push('Noise Reduction = ' + utils.cleanExifStringData(data));
			break;
		case 0x0096:
			output.push('NEF Curve 2 (Linearization Table) = ' + data);
			break;
		case 0x0097:
			output.push('Colour Balance = ' + data);
			break;
		case 0x0098:
			output.push('Lens Data = ' + data);
			break;
		case 0x0099:
			output.push('Raw Image Center = ' + data);
			break;
		case 0x009A:
			output.push('Sensor Pixel Size = ' + utils.formatRationals(data, 5));
			break;
		case 0x009E:
			tmp = data.split(',');
			data2 = (tmp[0] == 0 ? 'none' : '');
			i = 0;
			while (tmp[i] != 0 &&  i < tmp.length) {
				data2 += ', ' + (TouchupHistories[tmp[i]] ? TouchupHistories[i] : '?');
				i += 1;
			}
			output.push('Touch Up History = ' + data2 + ' (' + data + ')');
			break;
		case 0x00A0:
			output.push('Serial Number = ' + data);
			break;
		case 0x00A2:
			output.push('Image Data Size = ' + utils.formatNumber(data) + ' bytes');
			break;
		case 0x00A5:
			output.push('Image Count = ' + utils.formatNumber(data));
			break;
		case 0x00A6:
			output.push('Deleted Image Count = ' + data);
			break;
		case 0x00A7:
			output.push('Shutter Count / Total Number of Shutter Releases for Camera = ' + utils.formatNumber(data));
			break;
		case 0x00A8:
			output.push('Flash Information = ' + data);
			break;
		case 0x00A9:
			output.push('Image Optimization = ' + utils.cleanExifStringData(data));
			break;
		case 0x00AA:
			output.push('Saturation = ' + utils.cleanExifStringData(data));
			break;
		case 0x00AB:
			output.push('Digital Vari-Program = ' + utils.cleanExifStringData(data));
			break;
		case 0x00AC:
			output.push('Image Stabilization = ' + utils.cleanExifStringData(data));
			break;
		case 0x00AD:
			output.push('AF Response = ' + utils.cleanExifStringData(data));
			break;
		case 0x00B1:
			output.push('High ISO Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
			break;
		case 0x00B3:
			output.push('Toning Effect = ' + data);
			break; 	 
		case 0x00B6:
			output.push('Power Up Date/Time = ' + data);
			break; 	 
		case 0x00B7:
			output.push('AF Information 2 = ' + data);
			break; 	 
		case 0x00B8:
			output.push('File Information = ' + data);
			break; 	 
		case 0x00B9:
			output.push('AF Tune = ' + data);
			break; 	 
		case 0x00BD:
			output.push('Picture Control Data = ' + data);
			break; 	 
		case 0x0E00:
			output.push('Print IM Flags = ' + data);
			break;
		case 0x0E01:
			output.push('Nikon Capture Data = ' + data);
			break;
		case 0x0E09:
			output.push('Nikon Capture Version = ' + data);
			break;
		case 0x0E0E:
			output.push('Nikon Capture Offsets = ' + data);
			break;
		case 0x0E10:
			output.push('Nikon Scan IFD = ' + data);
			break;
		case 0x0E13:
			output.push('Nikon Capture Edit Versions = ' + data);
			break;
		case 0x0E1D:
			output.push('Nikon ICC Profile = ' + data);
			break;
		case 0x0E1E:
			output.push('Nikon Capture Output = ' + data);
			break;
		case 0x0E22:
			output.push('NEF Bit Depth = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getNikonInterpretedTagDataFormat23()

	function getNikonInterpretedTagDataFormat2(tagnum, data) {
		var data2, tmp, output = [];

		switch (tagnum) {
		case 0x0001:
			output.push('Version = ' + data);
			break;
		case 0x0002:
			output.push('ISO Setting = ' + (ISOSettings[data] ? ISOSettings[data] : data));
			break;
		case 0x0003:
			output.push('Colour Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x0004:
			output.push('Quality = ' + utils.cleanExifStringData(data));
			break;
		case 0x0005:
			output.push('White Balance = ' + utils.cleanExifStringData(data));
			break;
		case 0x0006:
			output.push('Sharpness / Image Sharpening = ' + utils.cleanExifStringData(data));
			break;
		case 0x0007:
			output.push('Focus Mode = ' + data);
			break;
		case 0x0008:
			output.push('Flash Setting = ' + utils.cleanExifStringData(data));
			break;
		case 0x0009:
			output.push('Flash Type / Auto Flash Mode = ' + data);
			break;
		case 0x000A:
			output.push('Unknown = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x000B:
			output.push('White Balance Fine Tuning / White Bias = ' + data);
			break;
		case 0x000C:
			output.push('Colour Balance 1 = ' + data);
			break;
		case 0x000D:
			output.push('Program Shift = ' + data);
			break;
		case 0x000E:
			output.push('Exposure Difference = ' + data);
			break;
		case 0x000F:
			output.push('ISO Selection = ' + utils.cleanExifStringData(data));
			break;
		case 0x0010:
			output.push('Data Dump = ' + data);
			break;
		case 0x0011:
			output.push('Nikon Preview / Skip = ' + data);
			break;
		case 0x0012:
			output.push('Flash Exposure Compensation = ' + data);
			break;
		case 0x0013:
			output.push('ISO Setting = ' + data);
			break;
		case 0x0016:
			output.push('Image Boundary = ' + data);
			break;
		case 0x0018:
			output.push('Flash Exposure Bracket Value = ' + data);
			break;
		case 0x001A:
			output.push('Image Processing = ' + data);
			break;
		case 0x001B:
			output.push('Crop High Speed = ' + data);
			break;
		case 0x001D:
			output.push('Serial Number = ' + data);
			break;
		case 0x001E:
			output.push('Colour Space = ' + (ColourSpaces[data] ? ColourSpaces[data] : data));
			break;
		case 0x0080:
			output.push('Image Adjustment = ' + utils.cleanExifStringData(data));
			break;
		case 0x0081:
			output.push('Tone Compensation = ' + data);
			break;
		case 0x0082:
			output.push('Lens Adapter / Auxiliary Lens = ' + utils.cleanExifStringData(data));
			break;
		case 0x0083:
			data2 = '';
			data2 += (data & 0x01 ? 'MF ' : ''); 
			data2 += (data & 0x02 ? 'D ' : ''); 
			data2 += (data & 0x04 ? 'G ' : ''); 
			data2 += (data & 0x08 ? 'VR ' : ''); 
			output.push('Lens Type = ' + data2);
			break;
		case 0x0084:
			output.push('Lens = ' + data);
			break;
		case 0x0085:
			tmp = data.split('/');
			output.push('Manual Focus Distance = ' + (tmp[1] == '0' ? '(not applicable)' : data + ' = ' + utils.formatRational(data, 5) + ' m'));
			break;
		case 0x0086:
			output.push('Digital Zoom = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x0087:
			output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x0088:
			tmp = [];
			if (typeof data === 'number') {	// sometimes it's a number such as 0x1000000
				tmp[0] = data & 0xFF;
				tmp[1] = (data >> 8) & 0xFF;
				tmp[2] = (data >> 16) & 0xFFFF;
			} else {
				utils.bytesToBuffer(data, tmp);
				if (tmp.length == 4) {
					tmp[2] |= tmp[3] << 8;
					tmp[3] = 0;
				}
			}
			if (tmp.length < 3) { break; }
			output.push('AF Area Mode = ' + (AFAreaModes[tmp[0]] ? AFAreaModes[tmp[0]] : data));
			output.push('AF Point = ' + (AFPoints[tmp[1]] ? AFPoints[tmp[1]] : data));
			data2 = '';
			data2 += (tmp[2] & 0x001 ? 'center ' : ''); 
			data2 += (tmp[2] & 0x002 ? 'top ' : ''); 
			data2 += (tmp[2] & 0x004 ? 'bottom ' : ''); 
			data2 += (tmp[2] & 0x008 ? 'left ' : ''); 
			data2 += (tmp[2] & 0x010 ? 'right ' : ''); 
			data2 += (tmp[2] & 0x020 ? 'upper-left ' : ''); 
			data2 += (tmp[2] & 0x040 ? 'upper-right ' : ''); 
			data2 += (tmp[2] & 0x080 ? 'lower-left ' : ''); 
			data2 += (tmp[2] & 0x100 ? 'lower-right ' : ''); 
			data2 += (tmp[2] & 0x200 ? 'far-left ' : ''); 
			data2 += (tmp[2] & 0x400 ? 'far-right ' : ''); 
			output.push('AF Points Used = ' + data2); 

			break;
		case 0x0089:
			data2 = '';
			data2 += (data & 0x01 ? 'continuous ' : ''); 
			data2 += (data & 0x02 ? 'delay ' : ''); 
			data2 += (data & 0x04 ? 'PC-control ' : ''); 
			data2 += (data & 0x08 ? '? ' : ''); 
			data2 += (data & 0x10 ? 'exposure-bracketing ' : ''); 
			data2 += (data & 0x20 ? 'unused-LE-NR-slowdown ' : ''); 
			data2 += (data & 0x40 ? 'white-balance-bracketing ' : ''); 
			data2 += (data & 0x80 ? 'IR-control ' : ''); 
			output.push('Shooting Mode = ' + data2);
			break;
		case 0x008A:
			output.push('Auto Bracket Release = ' + (AutoBracketReleases[data] ? AutoBracketReleases[data] : data));
			break;
		case 0x008B:
			output.push('Lens F-Stops = ' + data);
			break;
		case 0x008C:
			output.push('NEF Curve 1 = ' + data);
			break;
		case 0x008D:
			output.push('Colour Hue/Mode = ' + data);
			break;
		case 0x008F:
			output.push('Scene Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x0090:
			output.push('Light Source = ' + data);
			break;
		case 0x0092:
			output.push('Hue Adjustment = ' + data);
			break;
		case 0x0094:
			output.push('Saturation Adjustment = ' + data);
			break;
		case 0x0095:
			output.push('Noise Reduction = ' + utils.cleanExifStringData(data));
			break;
		case 0x0096:
			output.push('NEF Curve 2 = ' + data);
			break;
		case 0x0097:
			output.push('Colour Balance = ' + data);
			break;
		case 0x0098:
			output.push('Lens Data = ' + data);
			break;
		case 0x0099:
			output.push('Raw Image Center = ' + data);
			break;
		case 0x009A:
			output.push('Sensor Pixel Size = ' + data);
			break;
		case 0x00A0:
			output.push('Serial Number = ' + data);
			break;
		case 0x00A2:
			output.push('Image Data Size = ' + data);
			break;
		case 0x00A5:
			output.push('Image Count = ' + data);
			break;
		case 0x00A6:
			output.push('Deleted Image Count = ' + data);
			break;
		case 0x00A7:
			output.push('Shutter Count = ' + data);
			break;
		case 0x00A9:
			output.push('Image Optimization = ' + data);
			break;
		case 0x00AA:
			output.push('Saturation = ' + data);
			break;
		case 0x00AB:
			output.push('Vari Program = ' + data);
			break;
		case 0x00AC:
			output.push('Image Stabilization = ' + data);
			break;
		case 0x00AD:
			output.push('AF Response = ' + data);
			break;
		case 0x00B1:
			output.push('High ISO Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
			break;
		case 0x0E00:
			output.push('Print IM Flags = ' + data);
			break;
		case 0x0E01:
			output.push('Nikon Capture Data = ' + data);
			break;
		case 0x0E09:
			output.push('Nikon Capture Version = ' + data);
			break;
		case 0x0E0E:
			output.push('Nikon Capture Offsets = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getNikonInterpretedTagDataFormat2()

	function getNikonInterpretedTagDataFormat3(tagnum, data) {
		var data2, tmp, output = [];

		switch (tagnum) {
		case 0x0001:
			output.push('Version = ' + data);
			break;
		case 0x0002:
			output.push('ISO Setting = ' + (ISOSettings[data] ? ISOSettings[data] : data));
			break;
		case 0x0003:
			output.push('Colour Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x0004:
			output.push('Quality = ' + utils.cleanExifStringData(data));
			break;
		case 0x0005:
			output.push('White Balance = ' + utils.cleanExifStringData(data));
			break;
		case 0x0006:
			output.push('Sharpening = ' + utils.cleanExifStringData(data));
			break;
		case 0x0007:
			output.push('Focus Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x0008:
			output.push('Flash Setting = ' + utils.cleanExifStringData(data));
			break;
		case 0x0009:
			output.push('Auto Flash Mode = ' + utils.cleanExifStringData(data));
			break;
		case 0x000B:
			output.push('White Balance Bias Value = ' + data);	// Units Approx: 100 Mired per increment
			break;
		case 0x000C:
			output.push('White Balance Red, Blue Coefficients? = ' + data + ' = ' + utils.formatRationals(data, 5));
			break;
		case 0x000E:
			output.push('Exposure Difference = ' + data);
			break;
		case 0x000F:
			output.push('ISO Selection = ' + utils.cleanExifStringData(data));
			break;
		case 0x0011:
			output.push('Thumbnail IFD Offset = ' + data);
			break;
		case 0x0012:
			output.push('Flash Compensation = ' + (FlashCompensations[data] ? FlashCompensations[data] + ' EV' : data));
			break;
		case 0x0013:
			output.push('ISO Speed Requested = ' + (ISOSpeedRequests[data] ? ISOSpeedRequests[data] : data));
			break;
		case 0x0016:
			output.push('Photo Corner Coordinates = ' + data);
			break;
		case 0x0018:
			output.push('Flash Bracket Compensation Applied = ' + (FlashBracketCompensations[data] ? FlashBracketCompensations[data] + ' EV' : data));
			break;
		case 0x0019:
			output.push('AE Bracket Compensation Applied = ' + data + ' = ' + utils.formatRational(data, 5) + ' EV');
			break;
		case 0x0080:
			output.push('Image Adjustment = ' + utils.cleanExifStringData(data));
			break;
		case 0x0081:
			output.push('Tone Compensation (Contrast) = ' + utils.cleanExifStringData(data));
			break;
		case 0x0082:
			output.push('Auxiliary Lens (Adapter) = ' + utils.cleanExifStringData(data));
			break;
		case 0x0083:
			data2 = '';
			data2 += (data & 0x01 ? 'MF ' : 'AF '); 
			data2 += (data & 0x02 ? 'D-series ' : ''); 
			data2 += (data & 0x04 ? 'G-series ' : ''); 
			data2 += (data & 0x08 ? 'VR ' : ''); 
			output.push('Lens Type = ' + data2);
			break;
		case 0x0084:
			tmp = utils.formatRationals(data, 5).split(', ');
			output.push('Lens Minimum and Maximum Focal Lengths and Maximum Aperture F-Stop at these Focal Lengths = ' + data + ' = ' + tmp[0] + ' mm, ' + tmp[1] + ' mm, f/' + tmp[2] + ', f/' + tmp[3]);
			break;
		case 0x0085:
			tmp = data.split('/');
			output.push('Manual Focus Distance = ' + (tmp[1] == '0' ? '(not applicable)' : data + ' = ' + utils.formatRational(data, 5) + ' m'));
			break;
		case 0x0086:
			output.push('Digital Zoom Factor = ' + data + ' = ' + utils.formatRational(data, 5));
			break;
		case 0x0087:
			output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x0088:
			tmp = [];
			if (typeof data === 'number') {	// sometimes it's a number such as 0x1000000
				tmp[0] = data & 0xFF;
				tmp[1] = (data >> 8) & 0xFF;
				tmp[2] = (data >> 16) & 0xFFFF;
			} else {
				utils.bytesToBuffer(data, tmp);
				if (tmp.length === 4) {
					tmp[2] |= (tmp[3] << 8);
					tmp[3] = 0;
				}
			}
			if (tmp.length < 3) { break; }
			output.push('AF Area Mode = ' + (AFAreaModes[tmp[0]] ? AFAreaModes[tmp[0]] : data));
			output.push('AF Point (Area Selected) = ' + (AFPoints[tmp[1]] ? AFPoints[tmp[1]] : data));
			
			data2 = '';
			data2 += (tmp[2] & 0x001 ? 'center ' : ''); 
			data2 += (tmp[2] & 0x002 ? 'top ' : ''); 
			data2 += (tmp[2] & 0x004 ? 'bottom ' : ''); 
			data2 += (tmp[2] & 0x008 ? 'left ' : ''); 
			data2 += (tmp[2] & 0x010 ? 'right ' : ''); 
			data2 += (tmp[2] & 0x020 ? 'upper-left ' : ''); 
			data2 += (tmp[2] & 0x040 ? 'upper-right ' : ''); 
			data2 += (tmp[2] & 0x080 ? 'lower-left ' : ''); 
			data2 += (tmp[2] & 0x100 ? 'lower-right ' : ''); 
			data2 += (tmp[2] & 0x200 ? 'far-left ' : ''); 
			data2 += (tmp[2] & 0x400 ? 'far-right ' : ''); 
			output.push('AF Points Used = ' + data2); 
			break;
		case 0x0089:
			data2 = '';
			data2 += Bits01[data & 0x03] + ' ';
			data2 += (data & 0x10 ? 'bracketing on (1) ' : 'bracketing off (0) ');
			data2 += (data & 0x40 ? 'white balance bracketing on (1) ' : 'white balance bracketing off (0) ');
			output.push('Bracketing and Shooting Mode = ' + data2);
			break;
		case 0x008D:
			output.push('Colour Mode = ' + (ColourModes2[data] ? ColourModes2[data] : utils.cleanExifStringData(data)));
			break;
		case 0x008E:
			output.push('Scene Mode = ' + data + ' = ' + utils.formatRationals(data, 5));
			break;
		case 0x0090:
			output.push('Lighting Type = ' + utils.cleanExifStringData(data));
			break;
		case 0x0092:
			output.push('Hue Adjustment = ' + data + ' degrees');
			break;
		case 0x0094:
			output.push('Saturation Adjustment = ' + (SaturationAdjustments[data] ? SaturationAdjustments[data] : data));
			break;
		case 0x0095:
			output.push('Noise Reduction = ' + utils.cleanExifStringData(data));
			break;
		case 0x009A:
			output.push('Unknown (0x9a) = ' + data + ' = ' + utils.formatRationals(data, 5));
			break;
		case 0x00A7:
			output.push('Total Number of Shutter Releases for Camera = ' + data);
			break;
		case 0x00A9:
			output.push('Image Optimisation = ' + utils.cleanExifStringData(data));
			break;
		case 0x00AA:
			output.push('Saturation = ' + utils.cleanExifStringData(data));
			break;
		case 0x00AB:
			output.push('Digital Vari-Program = ' + utils.cleanExifStringData(data));
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getNikonInterpretedTagData3()

	function dumpNikonTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				switch (ifd.maker_type) {
				case 1:
					output.push(getNikonInterpretedTagDataFormat1(tagnum, data));
					break;
				case 2:
					output.push(getNikonInterpretedTagDataFormat2(tagnum, data));
					break;
				case 3:
					output.push(getNikonInterpretedTagDataFormat23(tagnum, data));
					break;
				default:
					output.push(getGenericInterpretedTagData(tagnum, data));
					break;
				}
			}
		}
	}	// dumpNikonTagData()

	makers.dumpNikonTagData = dumpNikonTagData;
}, ['constants', 'utils', 'makers']);;ExifViewerApp.add('olympus', function _olympus(constants, utils, makers) {
	'use strict';
	
	var ColourModes = ['natural color (0)', 'black&amp;white (1)', 'vivid color (2)',
						'solarization (3)', 'Adobe RGB (4)'],
		MinoltaQualities = ['raw (0)', 'superfine (1)', 'fine (2)', 'normal (3)',
										'economy (4)', 'extra fine (5)'],
		SpecialModes1 = ['normal (0)', 'unknown (1)', 'fast (2)', 'panorama (3)'],
		SpecialModes3 = ['n/a (0)', 'left to right (1)', 'right to left (2)', 
						 'bottom to top (3)', 'top to bottom (4)'],
		JpegQualities = ['n/a (0)', 'SQ (1)', 'HQ (2)', 'SHQ (3)'],
		MacroModes = ['normal (0)', 'macro (1)', 'super macro (2)'],
		BWmodes = ['off (0)', 'on (1)'],
//		DigitalZooms = ['normal (0)', 'n/a (1)', 'digital 2x zoom (2)'],
		OneTouchWBs = ['off (0)', 'on (1)', 'on (preset) (2)'],
		FlashModes = ['n/a (0)', 'n/a (1)', 'on (2)', 'off (3)'],
		FlashDevices = ['none (0)', 'internal (1)', 'n/a (2)', 'n/a (3)',
								'external (4)', 'internal + external (5)'],
		FocusModes = ['auto (0)', 'manual (1)'],
		Sharpnesses = ['normal (0)', 'hard (1)', 'soft (2)'],
		WBModes = {
			'0x01': 'auto',
			'0x01,0x00': 'auto',
			'0x01,0x02': 'auto (2)',
			'0x01,0x04': 'auto (4)',
			'0x02,0x02': '3000 Kelvin',
			'0x02,0x03': '3700 Kelvin',
			'0x02,0x04': '4000 Kelvin',
			'0x02,0x05': '4500 Kelvin',
			'0x02,0x06': '5500 Kelvin',
			'0x02,0x07': '6500 Kelvin',
			'0x02,0x08': '7500 Kelvin',
			'0x03,0x00': 'one-touch'
		},
		ExternalFlashBounces = ['no (0)', 'yes (1)'],
		Contrasts = ['high (0)', 'normal (1)', 'low (2)'],
		PreviewImageValids = ['no (0)', 'yes (1)'],
		CCDScanModes = ['interlaced (0)', 'progressive (1)'],
		NoiseReductions = ['off (0)', 'on (1)'];

	// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html#APP1
	// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Olympus.html
	function getOlympusInterpretedTagData(tagnum, data) {
		var tmp, output = [];
		switch (tagnum) {
		case 0x0000:
			output.push('Maker Note Version = ' + data);
			break;
		case 0x0001:
			output.push('Minolta Camera Settings (old) = ' + data);
			break;
		case 0x0003:
			output.push('Minolta Camera Settings = ' + data);
			break;
		case 0x0040:
			output.push('Compressed Image Size = ' + data);
			break;
		case 0x0081:
			output.push('Preview Image Data = ' + data);
			break;
		case 0x0088:
			output.push('Preview Image Start = ' + data);
			break;
		case 0x0089:
			output.push('Preview Image Length = ' + data);
			break;
		case 0x0100:
			output.push('Thumbnail Image = ' + data);
			break;
		case 0x0101:
			output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
			break;
		case 0x0102:
		case 0x0103:
			output.push('Minolta Quality = ' + (MinoltaQualities[data] ? MinoltaQualities[data] : data));
			break;
		case 0x0200:
			var tmp = new Array();
			utils.bytesToBuffer(data, tmp);
			output.push('Special Mode:<br>Picture Taking Mode = ' + (SpecialModes1[tmp[0]] ? SpecialModes1[tmp[0]] : data)
						+ '<br>Sequence Number = ' + tmp[1] + '<br>Panorama Direction = ' + (SpecialModes3[tmp[2]] ? SpecialModes3[tmp[2]] : data));
			break;
		case 0x0201:
			output.push('JPEG Quality = ' + (JpegQualities[data] ? JpegQualities[data] : data));
			break;
		case 0x0202:
			output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
			break;
		case 0x0203:
			output.push('B&amp;W Mode = ' + (BWmodes[data] ? BWmodes[data] : data));
			break;
		case 0x0204:
	//		output.push('Digital Zoom = ' + (DigitalZooms[data] ? DigitalZooms[data] : data));
			output.push('Digital Zoom = ' + data);
			break;
		case 0x0205:
			output.push('Focal Plane Diagonal = ' + data);
			break;
		case 0x0206:
			output.push('Lens Distortion Parameters = ' + data);
			break;
		case 0x0207:
			output.push('Software Release / Firmware Version / Camera Type = ' + data);
			break;
		case 0x0208:
			output.push('Picture/Text Information = ' + data);
			break;
		case 0x0209:
			output.push('Camera ID = ' + data);
			break;
		case 0x020B:
			output.push('Epson Image Width = ' + data);
			break;
		case 0x020C:
			output.push('Epson Image Height = ' + data);
			break;
		case 0x020D:
			output.push('Epson Software = ' + data);
			break;
		case 0x0280:
			output.push('Preview Image = ' + data);
			break;
		case 0x0300:
			output.push('Pre-Capture Frames = ' + data);
			break;
		case 0x0302:
			output.push('One Touch WB = ' + (OneTouchWBs[data] ? OneTouchWBs[data] : data));
			break;
		case 0x0404:
			output.push('Serial Number = ' + data);
			break;
		case 0x0E00:
			output.push('Print IM = ' + data);
			break;
		case 0x0F00:
			output.push('Data Dump = ' + data);
			break;
		case 0x0F01:
			output.push('Data Dump 2 = ' + data);
			break;
		case 0x1000:
			output.push('Shutter Speed Value = ' + data);
			break;
		case 0x1001:
			output.push('ISO Value = ' + data);
			break;
		case 0x1002:
			output.push('Aperture Value = ' + data);
			break;
		case 0x1003:
			output.push('Brightness Value = ' + data);
			break;
		case 0x1004:
			output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x1005:
			output.push('Flash Device = ' + (FlashDevices[data] ? FlashDevices[data] : data));
			break;
		case 0x1006:
			output.push('Exposure Compensation = ' + data);
			break;
		case 0x1007:
			output.push('Sensor Temperature = ' + data);
			break;
		case 0x1008:
			output.push('Lens Temperature = ' + data);
			break;
		case 0x100B:
			output.push('Focus Mode = ' + (FocusModes[data] ? FocusModes[data] : data));
			break;
		case 0x100C:
			output.push('Manual Focus Distance = ' + data);
			break;
		case 0x100D:
			output.push('Zoom Step Count = ' + data);
			break;
		case 0x100E:
			output.push('Focus Step Count = ' + data);
			break;
		case 0x100F:
			output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
			break;
		case 0x1010:
			output.push('Flash Charge Level = ' + data);
			break;
		case 0x1011:
			output.push('Colour Matrix = ' + data);
			break;
		case 0x1012:
			output.push('Black Level = ' + data);
			break;
		case 0x1015:
			output.push('WB Mode = ' + (WBModes[data] ? WBModes[data] : data));
			break;
		case 0x1017:
			output.push('Red Balance = ' + data);
			break;
		case 0x1018:
			output.push('Blue Balance = ' + data);
			break;
			string 	 
		case 0x101A:
			output.push('Serial Number = ' + data);
			break;
		case 0x1023:
			output.push('Flash Exposure Comp = ' + data);
			break;
		case 0x1026:
			output.push('External Flash Bounce = ' + (ExternalFlashBounces[data] ? ExternalFlashBounces[data] : data));
			break;
		case 0x1027:
			output.push('External Flash Zoom = ' + data);
			break;
		case 0x1028:
			output.push('External Flash Mode = ' + data);
			break;
		case 0x1029:
			output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
			break;
		case 0x102A:
			output.push('Sharpness Factor = ' + data);
			break;
			int16u[6] 	 
		case 0x102B:
			output.push('Colour Control = ' + data);
			break;
		case 0x102C:
			output.push('Valid Bits = ' + data);
			break;
		case 0x102D:
			output.push('Coring Filter = ' + data);
			break;
		case 0x102E:
			output.push('Olympus Image Width = ' + data);
			break;
		case 0x102f:
			output.push('Olympus Image Height = ' + data);
			break;
		case 0x1034:
			output.push('Compression Ratio = ' + data);
			break;
		case 0x1035:
			output.push('Preview Image Valid = ' + (PreviewImageValids[data] ? PreviewImageValids[data] : data));
			break;
		case 0x1036:
			output.push('Preview Image Start = ' + data);
			break;
		case 0x1037:
			output.push('Preview Image Length = ' + data);
			break;
		case 0x1039:
			output.push('CCD Scan Mode = ' + (CCDScanModes[data] ? CCDScanModes[data] : data));
			break;
		case 0x103A:
			output.push('Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
			break;
		case 0x103B:
			output.push('Infinity Lens Step = ' + data);
			break;
		case 0x103c:
			output.push('Near Lens Step = ' + data);
			break;
		case 0x2010:
			output.push('Equipment = ' + data);
			break;
		case 0x2020:
			output.push('Camera Settings = ' + data);
			break;
		case 0x2030:
			output.push('Raw Development = ' + data);
			break;
		case 0x2040:
			output.push('Image Processing = ' + data);
			break;
		case 0x2050:
			output.push('Focus Information = ' + data);
			break;
		case 0x3000:
			output.push('Raw Information = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getOlympusInterpretedTagData()

	function dumpOlympusTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getOlympusInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpOlympusTagData()

	makers.dumpOlympusTagData = dumpOlympusTagData;
}, ['constants', 'utils', 'makers']);;ExifViewerApp.add('panasonic', function _panasonic(constants, makers) {
	'use strict';
	
	// may also apply for Leica

	var ImageQualities = ['n/a (0)', 'n/a (1)', 'high (2)', 'normal (3)',
						  'n/a (4)', 'n/a (5)', 'very high (6)', 'raw (7)', 'n/a (8)', 'motion picture (9)'],
		WhiteBalances = ['n/a (0)', 'auto (1)', 'daylight (2)', 'cloudy (3)', 'incandescent/halogen (4)',
						 'manual (5)', 'n/a (6)', 'n/a (7)', 'flash (8)', 'n/a (9)',
						 'black &amp; white (10)', 'manual (11)', 'shade (12)', 'n/a (13)'],
		FocusModes = ['n/a (0)', 'auto (1)', 'manual (2)', 'n/a (3)', 'auto, focus button (4)',
					  'auto, continuous (5)', 'n/a (6)', 'n/a (7)'],
		SpotModes = {
			'0x00,0x01': 'on (DMC-FZ10), 9-area (other)',
			'0x00,0x10': 'off (DMC-FZ10), 3-area (high speed) (other)',
			'0x01,0x00': 'spot focusing',
			'0x01,0x01': '5-area',
			'0x10,0x00': '1-area',
			'0x10,0x10': '1-area (high speed)',
			'0x20,0x00': 'auto or face detect',
			'0x20,0x01': '3-area (left)?',
			'0x20,0x02': '3-area (center)?',
			'0x20,0x03': '3-area (right)?',
			'0x40,0x00': 'face detect'
		},
		ImageStabilizers = ['n/a (0)', 'n/a (1)', 'on, mode 1 (2)', 'off (3)', 'on, mode 2 (4)'],
		MacroModes = ['n/a (0)', 'on (1)', 'off (2)'],
		ShootingModes = ['n/a (0)', 'normal (1)', 'portrait (2)', 'scenery (3)',
						  'sports (4)', 'night portrait (5)', 'program (6)',
						  'aperture priority (7)', 'shutter priority (8)', 'macro (9)',
						  'spot (10)', 'manual (11)', 'movie preview (12)', 'panning (13)', 'simple (14)',
						  'colour effects (15)', 'self-portrait (16)', 'economy (17)', 'fireworks (18)', 'party (19)',
						  'snow (20)', 'night scenery (21)', 'food (22)', 'baby (23)', 'soft skin (24)', 'candlelight (25)',
						  'starry night (26)', 'high sensitivity (27)', 'panorama assist (28)', 'underwater (29)', 
						  'beach (30)', 'aerial photo (31)', 'sunset (32)', 'pet (33)', 'intelligent ISO (34)', 
						  'clipboard (35)', 'high speed continuous shooting (36)', 'intelligent auto (37)', 'n/a (38)', 
						  'multi-aspect (39)', 'n/a (40)', 'transform (41)', 'flash burst (42)', 'pin hole (43)', 
						  'film grain (44)', 'my colour (45)', 'photo frame (46)'],
		Audios = ['n/a (0)', 'yes (1)', 'no (2)'],
		ColourEffects = ['n/a (0)', 'off (1)', 'warm (2)', 'cool (3)',
						 'black &amp, white (4)', 'sepia (5)', 'happy (6)'],
		BurstModes = ['off (0)', 'on (low/high quality?) (1)', 'infinite (2)', 'n/a (3)', 'unlimited (4)'],
		//Contrasts = ['normal [Panasonic] (0)', 'low [Panasonic] (1)', 'high [Panasonic] (2)'],
		NoiseReductions = ['standard (0)', 'low(-1) (1)', 'high(+1) (2)', 'lowest(-2) (3)', 'highest(+2) (4)'],
		SelfTimers = ['n/a (0)', 'off (1)', '10s (2)', '2s (3)'],
		Rotations = ['n/a (0)', 'horizontal (normal) (1)', 'n/a (2)', 'rotate 180 (3)',
					 'n/a (4)', 'n/a (5)', 'rotate 90 CW (6)', 'n/a (7)',
					 'rotate 270 CW (8)'],
		AFAssistLamps = ['n/a (0)', 'fired (1)', 'enabled but not used (2)', 'disabled but required (3)', 
						 'disabled and not required (4)'],
		ColourModes = ['normal (0)', 'natural (1)', 'vivid (2)'],
		OpticalZoomModes = ['n/a (0)', 'standard (1)', 'extended (2)'],
		ConversionLens = ['n/a (0)', 'off (1)', 'wide (2)', 'telephoto (3)', 'macro (4)'],
		Contrasts = ['normal (0)'],
		WorldTimeLocations = ['n/a (0)', 'home (1)', 'destination (2)'],
		TextStamps3 = ['n/a (0)', 'off (1)', 'on (2)'],
		ProgramISOs = {
			65534: 'intelligent ISO (65534)',
			65535: 'n/a (65535)'
		},
		AdvancedSceneModes = ['n/a (0)', 'normal (1)', 'outdoor/illuminations/flower/HDR art (2)', 
							  'indoor/architecture/objects/HDR B&amp,W (3)', 'creative (4)', 'auto (5)',
							  'n/a (6)', 'expressive (7)', 'retro (8)', 'pure (9)', 'elegant (10)', 'n/a (11)',
							  'monochrome (12)', 'dynamic art (13)', 'silhouette (14)'],
		TextStamps4 = ['n/a (0)', 'off (1)', 'on (2)'],
		Saturations = ['normal (0)'],
		Sharpnesses = ['normal (0)'],
		FilmModes = ['n/a (0)', 'standard (colour) (1)', 'dynamic (colour) (2)', 'nature (colour) (3)', 'smooth (colour) (4)',
					 'standard (B&amp,W) (5)', 'dynamic (B&amp,W) (6)', 'smooth (B&amp,W) (7)', 'n/a (8)', 'n/a (9)', 
					 'nostalgic (10)', 'vibrant (11)'],
		Transforms = {
			'0xFF,0x01': 'slim low',	// -1
			'0xFD,0x02': 'slim high',	// -3
			'0x00,0x00': 'off',
			'0x01,0x01': 'stretch low',
			'0x03,0x02': 'stretch high'
		},
		IntelligentExposures = ['off (0)', 'low (1)', 'standard (2)', 'high (3)'],
		FlashWarnings = ['no (0)', 'yes (flash required but disabled) (1)'],
		IntelligentResolutions = ['off (0)', 'low (1)', 'standard (2)', 'high (3)', 'extended (4)'],
		IntelligentDRanges = ['off (0)', 'low (1)', 'standard (2)', 'high (3)'],
		SceneModes = ['off (0)', 'normal (1)', 'portrait (2)', 'scenery (3)',
					  'sports (4)', 'night portrait (5)', 'program (6)',
					  'aperture priority (7)', 'shutter priority (8)', 'macro (9)',
					  'spot (10)', 'manual (11)', 'movie preview (12)', 'panning (13)', 'simple (14)',
					  'colour effects (15)', 'self-portrait (16)', 'economy (17)', 'fireworks (18)', 'party (19)',
					  'snow (20)', 'night scenery (21)', 'food (22)', 'baby (23)', 'soft skin (24)', 'candlelight (25)',
					  'starry night (26)', 'high sensitivity (27)', 'panorama assist (28)', 'underwater (29)', 
					  'beach (30)', 'aerial photo (31)', 'sunset (32)', 'pet (33)', 'intelligent ISO (34)', 
					  'clipboard (35)', 'high speed continuous shooting (36)', 'intelligent auto (37)', 'n/a (38)', 
					  'multi-aspect (39)', 'n/a (40)', 'transform (41)', 'flash burst (42)', 'pin hole (43)', 
					  'film grain (44)', 'my colour (45)', 'photo frame (46)'],
		FlashFireds = ['n/a (0)', 'no (1)', 'yes (2)'],
		TextStamps = ['n/a (0)', 'off (1)', 'on (2)'],
		TextStamps2 = ['n/a (0)', 'off (1)', 'on (2)'];

	ImageStabilizers[257] = 'tele-macro (257)';
	ImageStabilizers[513] = 'macro zoom (513)';
	MacroModes[257] = 'tele-macro (257)';
	MacroModes[513] = 'macro zoom (513)';
	ShootingModes[51] = 'HDR (51)';
/*
	Contrasts[0x100] = 'low [Leica] (0x100)';
	Contrasts[0x110] = 'normal [Leica] (0x110)';
	Contrasts[0x120] = 'high [Leica] (0x120)';
*/
	SceneModes[51] = 'HDR (51)'; 	

	// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
	function getPanasonicInterpretedTagData1(tagnum, data) {
		var output = [];
		switch (tagnum) {
		case 0x0001:
			output.push('Image Quality = ' + (ImageQualities[data] ? ImageQualities[data] : data));
			break;
		case 0x0002:
			output.push('Production Firmware Version = ' + data);
			break;
		case 0x0003:
			output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
			break;
		case 0x0007:
			output.push('Focus Mode = ' + (FocusModes[data] ? FocusModes[data] : data));
			break;
		case 0x000F:
			output.push('Spot/AF Mode = ' + (SpotModes[data] ? SpotModes[data] : data));
			break;
		case 0x001A:
			output.push('Image Stabilizer = ' + (ImageStabilizers[data] ? ImageStabilizers[data] : data));
			break;
		case 0x001C:
			output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
			break;
		case 0x001F:
			output.push('Shooting Mode = ' + (ShootingModes[data] ? ShootingModes[data] : data));
			break;
		case 0x0020:
			output.push('Audio = ' + (Audios[data] ? Audios[data] : data));
			break;
		case 0x0021:
			output.push('Data Dump = ' + data);
			break;
		case 0x0023:
			output.push('White Balance Bias = ' + data);
			break;
		case 0x0024:
			output.push('Flash Bias = ' + data);
			break;
		case 0x0025:
			output.push('Internal Serial Number = ' + data);
			break;
		case 0x0026:
			output.push('Panasonic Exif Version = ' + data);
			break;
		case 0x0028:
			output.push('Colour Effect = ' + (ColourEffects[data] ? ColourEffects[data] : data));
			break;
		case 0x0029:
			output.push('Time Since Power On = ' + (data/100) + ' seconds');
			break;
		case 0x002A:
			output.push('Burst Mode = ' + (BurstModes[data] ? BurstModes[data] : data));
			break;
		case 0x002B:
			output.push('Sequence Number = ' + data);
			break;
		case 0x002C:
			//output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
			output.push('Contrast = ' + data + ' (too model-dependent to interpret)');
			break;
		case 0x002D:
			output.push('Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
			break;
		case 0x002E:
			output.push('Self Timer = ' + (SelfTimers[data] ? SelfTimers[data] : data));
			break;
		case 0x0030:
			output.push('Rotation = ' + (Rotations[data] ? Rotations[data] : data));
			break;
		case 0x0031:
			output.push('AF Assist Lamp = ' + (AFAssistLamps[data] ? AFAssistLamps[data] : data));
			break;
		case 0x0032:
			output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
			break;
		case 0x0033:
			output.push('Baby/Pet Age = ' + data);
			break;
		case 0x0034:
			output.push('Optical Zoom Mode = ' + (OpticalZoomModes[data] ? OpticalZoomModes[data] : data));
			break;
		case 0x0035:
			output.push('Conversion Lens = ' + (ConversionLens[data] ? ConversionLens[data] : data));
			break;
		case 0x0036:
			output.push('Travel Day = ' + data);
			break;
		case 0x0039:
			output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
			break;
		case 0x003A:
			output.push('World Time Location = ' + (WorldTimeLocations[data] ? WorldTimeLocations[data] : data));
			break;
		case 0x003B:
			output.push('Text Stamp = ' + (TextStamps3[data] ? TextStamps3[data] : data));
			break;
		case 0x003C:
			output.push('Program ISO = ' + (ProgramISOs[data] ? ProgramISOs[data] : data));
			break;
		case 0x003D:
			output.push('Advanced Scene Mode = ' + (AdvancedSceneModes[data] ? AdvancedSceneModes[data] : data));
			break;
		case 0x003E:
			output.push('Text Stamp = ' + (TextStamps4[data] ? TextStamps4[data] : data));
			break;
		case 0x003F:
			output.push('Faces Detected = ' + data);
			break; 	 
		case 0x0040:
			output.push('Saturation = ' + (Saturations[data] ? Saturations[data] : data));
			break;
		case 0x0041:
			output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
			break;
		case 0x0042:
			output.push('Film Mode = ' + (FilmModes[data] ? FilmModes[data] : data));
			break;
		case 0x0046:
			output.push('WB Adjust AB = ' + data + ' (positive is a shift toward blue)');
			break;
		case 0x0047:
			output.push('WB Adjust GM = ' + data + ' (positive is a shift toward green)');
			break;
		case 0x004B:
			output.push('Panasonic Image Width = ' + data + ' pixels');
			break;  	 
		case 0x004C:
			output.push('Panasonic Image Height = ' + data + ' pixels');
			break;
		case 0x004D:
			output.push('AF Point Position = ' + data);//	rational64u[2] 	(X Y coordinates of primary AF area center, in the range 0.0 to 1.0)
			break;
		case 0x004E:
			output.push('Face Detection Information = ' + data);
			break;
		case 0x0051:
			output.push('Lens Type = ' + data);
			break; 	 
		case 0x0052:
			output.push('Lens Serial Number = ' + data);
			break; 	 
		case 0x0053:
			output.push('Accessory Type = ' + data);
			break;
		case 0x0059:
			output.push('Transform = ' + (Transforms[data] ? Transforms[data] : data));
			break;
		case 0x005D:
			output.push('Intelligent Exposure = ' + (IntelligentExposures[data] ? IntelligentExposures[data] : data));
			break;
		case 0x0061:
			output.push('Face Recognition Information = ' + data);
			break;
		case 0x0062:
			output.push('Flash Warning = ' + (FlashWarnings[data] ? FlashWarnings[data] : data));
			break;
		case 0x0063:
			output.push('Recognized Face Flags? = ' + data);
			break; 	 
		case 0x0065:
			output.push('Title = ' + data);
			break; 	 
		case 0x0066:
			output.push('Baby/Pet Name = ' + data);
			break;
		case 0x0067:
			output.push('Location = ' + data);
			break; 	 
		case 0x0069:
			output.push('Country = ' + data);
			break; 	 
		case 0x006B:
			output.push('State = ' + data);
			break; 	 
		case 0x006D:
			output.push('City = ' + data);
			break; 	 
		case 0x006F:
			output.push('Landmark = ' + data);
			break; 	 
		case 0x0070:
			output.push('Intelligent Resolution = ' + (IntelligentResolutions[data] ? IntelligentResolutions[data] : data));
			break;
		case 0x0079:
			output.push('Intelligent D-Range = ' + (IntelligentDRanges[data] ? IntelligentDRanges[data] : data));
			break;
		case 0x0E00:
			output.push('Print IM = ' + data);
			break;
		case 0x8000:
			output.push('Maker Note Version = ' + data);
			break;
		case 0x8001:
			output.push('Scene Mode = ' + (SceneModes[data] ? SceneModes[data] : data));
			break;
		case 0x8004:
			output.push('WB Red Level = ' + data);
			break; 	 
		case 0x8005:
			output.push('WB Green Level = ' + data);
			break; 	 
		case 0x8006:
			output.push('WB Blue Level = ' + data);
			break;
		case 0x8007:
			output.push('Flash Fired = ' + (FlashFireds[data] ? FlashFireds[data] : data));
			break;
		case 0x8008:
			output.push('Text Stamp = ' + (TextStamps[data] ? TextStamps[data] : data));
			break;
		case 0x8009:
			output.push('Text Stamp = ' + (TextStamps2[data] ? TextStamps2[data] : data));
			break;
		case 0x8010:
			output.push('Baby/Pet Age = ' + data);
			break;
		case 0x8012:
			output.push('Transform = ' + (Transforms[data] ? Transforms[data] : data));
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getPanasonicInterpretedTagData1()

	function dumpPanasonicTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getPanasonicInterpretedTagData1(tagnum, data));
			}
		}
	}	// dumpPanasonicTagData()

	makers.dumpPanasonicTagData = dumpPanasonicTagData;
}, ['constants', 'makers']);;ExifViewerApp.add('pentax-asahi', function _pentax_asahi(constants, makers) {
	'use strict';
	
	function getPentaxAsahiInterpretedTagData1(tagnum, data) {
		var output = [];
		switch (tagnum) {
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getPentaxAsahiInterpretedTagData1()

	function getPentaxAsahiInterpretedTagData2(tagnum, data) {
		return makers.getCasioInterpretedTagData2(tagnum, data);
	}	// getPentaxAsahiInterpretedTagData2()

	function dumpPentaxAsahiTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				switch (ifd.maker_type) {
				case 1:
					output.push(getPentaxAsahiInterpretedTagData1(tagnum, data));
					break;
				case 2:
					output.push(getPentaxAsahiInterpretedTagData2(tagnum, data));
					break;
				}
			}
		}
	}	// dumpPentaxAsahiTagData()

	makers.dumpPentaxAsahiTagData = dumpPentaxAsahiTagData;
}, ['constants', 'makers']);;ExifViewerApp.add('sanyo', function _sanyo(constants, utils, makers) {
	'use strict';
	
	var SpecialModes1 = ['normal (0)', 'unknown (1)', 'fast (2)', 'panorama (3)'],
		SpecialModes3 = ['n/a (0)', 'left to right (1)', 'right to left (2)', 
						 'bottom to top (3)', 'top to bottom (4)'],
		JpegQualities = {
			'0x0000': 'normal(very low) (0)',
			'0x0001': 'normal(low) (1)',
			'0x0002': 'normal(medium low) (2)',
			'0x0003': 'normal(medium) (3)',
			'0x0004': 'normal(medium high) (4)',
			'0x0005': 'normal(high) (5)',
			'0x0006': 'normal(very high) (6)',
			'0x0007': 'normal(super high) (7)',
			'0x0100': 'fine(very low) (256)',
			'0x0101': 'fine(low) (257)',
			'0x0102': 'fine(medium low) (258)',
			'0x0103': 'fine(medium) (259)',
			'0x0104': 'fine(medium high) (260)',
			'0x0105': 'fine(high) (261)',
			'0x0106': 'fine(very high) (262)',
			'0x0107': 'fine(super high) (263)',
			'0x0200': 'super fine(very low) (512)',
			'0x0201': 'super fine(low) (513)',
			'0x0202': 'super fine(medium low) (514)',
			'0x0203': 'super fine(medium) (515)',
			'0x0204': 'super fine(medium high) (516)',
			'0x0205': 'super fine(high) (517)',
			'0x0206': 'super fine(very high) (518)',
			'0x0207': 'super fine(super high) (519)'
		},
		MacroModes = ['normal (0)', 'macro (1)', 'view (2)', 'manual (3)'],
		SequentialShotMethods = ['none (0)', 'standard (1)', 'best (2)', 'adjust exposure (3)'],
		WideRanges = ['off (0)', 'on (1)'],
		ColourAdjustmentModes = ['off (0)', 'colour adjustment mode used (1)'],
		QuickShots = ['off (0)', 'on (1)'],
		SelfTimers = ['off (0)', 'on (1)'],
		VoiceMemos = ['off (0)', 'on (1)'],
		RecordShutterReleases = ['record whilst held (0)', 'press to start, press to stop (1)'],
		FlickerReduces = ['off (0)', 'on (1)'],
		OpticalZooms = ['disabled (0)', 'enabled (1)'],
		DigitalZooms = ['disabled (0)', 'enabled (1)'],
		LightSourceSpecials = ['off (0)', 'on (1)'],
		Resaveds = ['no (0)', 'yes (1)'],
		SceneSelects = ['off (0)', 'spot (1)', 'TV (2)', 'night (3)', 'user 1 (4)', 'user 2 (5)'],
		SequentialShotIntervals = ['5 frames/sec (0)', '10 frames/sec (1)', '15 frames/sec (2)', '20 frames/sec (3)'],
		FlashModes = ['auto (0)', 'force (1)', 'disabled (2)', 'red eye (3)'];

	// http://www.exif.org/makernotes/SanyoMakerNote.html
	function getSanyoInterpretedTagData(tagnum, data) {
		var tmp, output = [];

		switch (tagnum) {
		case 0x0100:
			output.push('Thumbnail Image = ' + data);
			break;
		case 0x0200:
			tmp = [];
			utils.bytesToBuffer(data, tmp);
			output.push('Special Mode:<br>Picture Taking Mode = ' + (SpecialModes1[tmp[0]] ? SpecialModes1[tmp[0]] : data)
						+ '<br>Sequence Number = ' + tmp[1] + '<br>Panorama Direction = ' + (SpecialModes3[tmp[2]] ? SpecialModes3[tmp[2]] : data));
			break;
		case 0x0201:
			output.push('JPEG Quality = ' + (JpegQualities[data] ? JpegQualities[data] : data));
			break;
		case 0x0202:
			output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
			break;
		case 0x0204:
			output.push('Digital Zoom = ' + data);
			break;
		case 0x0207:
			output.push('Software Release = ' + data);
			break;
		case 0x0208:
			output.push('Picture/Text Information = ' + data);
			break;
		case 0x0209:
			output.push('Camera ID = ' + data);
			break;
		case 0x020E:
			output.push('Sequential Shot Method = ' + (SequentialShotMethods[data] ? SequentialShotMethods[data] : data));
			break;
		case 0x020F:
			output.push('Wide Range = ' + (WideRanges[data] ? WideRanges[data] : data));
			break;
		case 0x0210:
			output.push('Colour Adjustment Mode = ' + (ColourAdjustmentModes[data] ? ColourAdjustmentModes[data] : data));
			break;
		case 0x0213:
			output.push('Quick Shot = ' + (QuickShots[data] ? QuickShots[data] : data));
			break;
		case 0x0214:
			output.push('Self Timer = ' + (SelfTimers[data] ? SelfTimers[data] : data));
			break;
		case 0x0216:
			output.push('Voice Memo = ' + (VoiceMemos[data] ? VoiceMemos[data] : data));
			break;
		case 0x0217:
			output.push('Record Shutter Release = ' + (RecordShutterReleases[data] ? RecordShutterReleases[data] : data));
			break;
		case 0x0218:
			output.push('Flicker Reduce = ' + (FlickerReduces[data] ? FlickerReduces[data] : data));
			break;
		case 0x0219:
			output.push('Optical Zoom = ' + (OpticalZooms[data] ? OpticalZooms[data] : data));
			break;
		case 0x021B:
			output.push('Digital Zoom = ' + (DigitalZooms[data] ? DigitalZooms[data] : data));
			break;
		case 0x021D:
			output.push('Light Source Special = ' + (LightSourceSpecials[data] ? LightSourceSpecials[data] : data));
			break;
		case 0x021E:
			output.push('Resaved = ' + (Resaveds[data] ? Resaveds[data] : data));
			break;
		case 0x021F:
			output.push('Scene Select = ' + (SceneSelects[data] ? SceneSelects[data] : data));
			break;
		case 0x0224:
			output.push('Sequential Shot Interval = ' + (SequentialShotIntervals[data] ? SequentialShotIntervals[data] : data));
			break;
		case 0x0224:
			output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
			break;
		case 0x0E00:
			output.push('Print IM = ' + data);
			break;
		case 0x0F00:
			output.push('Data Dump = ' + data);
			break;
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getSanyoInterpretedTagData()

	function dumpSanyoTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getSanyoInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpSanyoTagData()

	makers.dumpSanyoTagData = dumpSanyoTagData;
}, ['constants', 'utils', 'makers']);;ExifViewerApp.add('sony', function _sony(constants, makers) {
	'use strict';
	
	function getSonyInterpretedTagData(tagnum, data) {
		var output = [];
		switch (tagnum) {
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getSonyInterpretedTagData()

	function dumpSonyTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getSonyInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpSonyTagData()

	makers.dumpSonyTagData = dumpSonyTagData;
}, ['constants', 'makers']);;ExifViewerApp.add('generic', function _generic(constants, makers) {
	'use strict';
	
	function getGenericInterpretedTagData(tagnum, data) {
		var output = [];
		switch (tagnum) {
		default:
			output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
			break;
		} 
		return output.join('<br>');
	}	// getGenericInterpretedTagData()

	function dumpGenericTagData(ifd, output, is_motorola) {
		var data, t, tagnum;
		for (t in ifd) {
			if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
				tagnum = window.parseInt('0' + t, 16);
				data = ifd[t];
				output.push(getGenericInterpretedTagData(tagnum, data));
			}
		}
	}	// dumpGenericTagData()

	makers.dumpGenericTagData = dumpGenericTagData;
}, ['constants', 'makers']);