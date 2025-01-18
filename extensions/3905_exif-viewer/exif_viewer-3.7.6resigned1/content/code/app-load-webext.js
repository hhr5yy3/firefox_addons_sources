ExifViewerApp.defer('main', 'mainWebExt');
if (true) {
	ExifViewerApp.load(['code/exifviewer']);
} else {
	ExifViewerApp.load([
		'code/constants',
		'code/exif',
		'code/exif-data',
		'code/globals', 
		'code/histogram',
		'code/html',
		'code/ike',
		'code/iptc',
		'code/logging',
		'code/main',
		'code/makers',
		'code/moz',
		'code/moz-utils',
		'code/tags',
		'code/utils',
		'code/xml',
		'code/makers/agfa',
		'code/makers/canon',
		'code/makers/casio',
		'code/makers/epson',
		'code/makers/fujifilm',
		'code/makers/konica-minolta',
		'code/makers/kyocera-contax',
		'code/makers/nikon',
		'code/makers/olympus',
		'code/makers/panasonic',
		'code/makers/pentax-asahi',
		'code/makers/sanyo',
		'code/makers/sony',
		'code/makers/generic'
	]);
}