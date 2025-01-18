function pad(indent) {
  return new Array(indent * 2 + 1).join(' ');
}

// импортирует закладки из браузера
var bookmarksImporter = {
	// xhr запрос текущего импорта
	currentRequest: null,
	// идентификатор таба с текущим импортом
	currentImportTabId: null,
	// флаг, показывает, запущен ли импорт
	importInProcess: false,

	// конвертирует и загружает закладки на сервер
	// dataConverted - функция, вызывается после конвертации закладок
	// progress - функция, вызывается в процессе загрузки данных для отображения прогресса загрузки
	// complete - вызывается после загрузки данных на сервер,
	// tabId - идентификатор таба страницы импорта
	import: function(dataConverted, progress, complete, tabId) {
		bookmarksImporter.importInProcess = true;
		bookmarksImporter.currentImportTabId = tabId;

		this.updateHtml(function(html) {
			dataConverted();

			var request = new XMLHttpRequest();

			request.upload.onprogress = function(event) {
				progress(event.loaded / event.total);
			}

			request.upload.onload = function() {
				progress(1);
			}

			request.open('POST', 'https://' + z_domains.popup_domain + '/___ajax___/import-export/import.php', true);
		    request.onreadystatechange = function() {  
		        if (request.readyState == 4) {
		        	bookmarksImporter.currentRequest = null;

		            // если запрос отработал без ошибок
		            if (request.status == 200) {
		            	var responseJson = JSON.parse(request.responseText);

		            	if (responseJson.error) {
		            		complete(false);
		            	}
		            	else {
		            		complete(true);
		            	}		                
		            } else {
		            	complete(false);
		                console.log('error ' + request.response);
		            }
		        }     
		    };
		    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		    var params = 'import_from_extension=true&data=' + encodeURIComponent(html);

		    request.send(params);
		    bookmarksImporter.currentRequest = request;
		});
	},

	// делает вкладку с текущим импортом активной
	goToCurrentImport: function() {
		browser.tabs.update(parseInt(bookmarksImporter.currentImportTabId), {active: true});
        browser.tabs.get(parseInt(bookmarksImporter.currentImportTabId), function(tab) {
            // Make window active too.
            if(tab && tab.windowId)
                browser.windows.update(tab.windowId, {focused: true});
        }); 
	},

	// проверяет, идет ли уже импорт
	checkImportPosability: function() {
		return !bookmarksImporter.importInProcess;
	},

	// останавливает импорт
	stopImport: function() {
		if (!bookmarksImporter.importInProcess) return;

		// закрывает вкладку
		// browser.tabs.remove(bookmarksImporter.currentImportTabId);		

		// прерывает запрос
		if (bookmarksImporter.currentRequest) {
			bookmarksImporter.currentRequest.abort();	
		}	

		// меняет флаг
		bookmarksImporter.importInProcess = false;
	},

	// должна быть вызвана при завершении импорта
	importComplete: function() {
		bookmarksImporter.importInProcess = false;
		bookmarksImporter.currentRequest = null;
		bookmarksImporter.currentImportTabId = null;
	},

	// калбек на закрытие вкладки
	checkRemovedTab: function(tabId) {
		if (bookmarksImporter.importInProcess && bookmarksImporter.currentImportTabId == tabId) {
			bookmarksImporter.stopImport();
		}
	},


	// заголовок для html отображения закладок
	header: [
		'<!DOCTYPE NETSCAPE-Bookmark-file-1>',
		'<!--This is an automatically generated file.',
		'    It will be read and overwritten.',
		'    Do Not Edit! -->',
		'<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
		'<Title>Bookmarks</Title>',
		'<H1>Bookmarks</H1>',
		''
	].join('\n'),

	// html закладок
	bookmarksHttp: '',

	// заполняет bookmarksHttp закладками, при завершении вызывает callback
	updateHtml: function(callback) {
		browser.bookmarks.getTree((function(node) {
			this.bookmarksHttp = this.header;

			this.bookmarksHttp += this.processNodes(node[0].children);

			//console.log(node[0]);
			//console.log(this.bookmarksHttp);

			callback(this.bookmarksHttp);
		}).bind(this));
	},

	processNodes: function(nodes, indent, folderName) {
		indent = indent || 0;

		var s = [];

		if (folderName)
    		s.push(pad(indent) + '<DT><H3>' + folderName + '</H3>');

    	s.push(pad(indent) + '<DL><p>');

        //console.log(nodes);
    	if (nodes.length) {
	    	for (var i = 0; i < nodes.length; i++) {
	    		var node = nodes[i];

	    		var isFolder = typeof(node["children"]) == "object" ? true : false;
	    		
	    		if (isFolder) {
	    			s.push(this.processNodes(node.children, indent + 1, node.title));
	    		}	
	    		else {
	    			var link = '<A HREF="' + node.url + '"';

	    			if (node.dateAdded) {
	    				link += ' add_date="' + node.dateAdded + '"';
	    			}

	    			link += '>' + node.title + '</a>';

	    			s.push(pad(indent) + '<DT>' + link);
	    		}
	    	}	
    	}

    	s.push(pad(indent) + '</DL><p>');	

    	return s.join('\n');
	}
};