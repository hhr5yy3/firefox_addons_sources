var XHR = (function() {
	const NON_MOZ_ANON_DOMAIN_LIST = ["dailymotion.com"];

	class XHR {
		constructor(params = { mozAnon: true }) {
			let { mozAnon } = params;
			this.xhr = new XMLHttpRequest({ mozAnon });
			this.callback = null;
		}

		getParamsString(params) {
			let paramsString = null;

			if (!params) { return paramsString; }

			if (params) {
				paramsString = "";
				for (let key in params) {
					paramsString += key + "=" + params[key] + "&";
				}
				paramsString = paramsString.substr(0, paramsString.length-1);
			}

			return paramsString;
		}

		isUrlInNonMozAnonDomainList(url) {
			let anchor = document.createElement("a");

			anchor.href = url;

			return NON_MOZ_ANON_DOMAIN_LIST.find(
				domain => anchor.host.includes(domain)
			) ? true : false;
		}

		setOnreadystatechange() {
			var deferred = new Deferred();

			this.xhr.onreadystatechange = function() {
				if (this.readyState == 4) {
				    if (this.status == 200) {
						deferred.resolve(this);
				    } else {
				    	deferred.reject(new Error(this.statusText));
				    }
				}
			};

			return deferred;
		}

		send(options) {
			let { method = "GET", url, params, responseType = null } = options;

			if (this.isUrlInNonMozAnonDomainList(url)) {	// recreate xhr without mozAnon
				this.xhr = new XMLHttpRequest();
			}

			if (responseType !== null) {
				this.xhr.responseType = responseType;
			}

			method = method.toUpperCase();
			this.xhr.abort();

			let paramsString = this.getParamsString(params);
			if (paramsString && method === "GET") {
				url += "?" + paramsString;
			}

			this.xhr.open(method, url, true);

			if (method === "POST") {
				this.xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			}

			this.xhr.setRequestHeader('Cache-Control', 'no-cache');
			
			let deferred = this.setOnreadystatechange();
			this.xhr.send(paramsString);

			return deferred.promise;
		};	
	}

	return XHR;
})();


let RecursiveXHR = (function() {
    class RecursiveXHR {
        constructor() { }

        getXHR(xhrType) {
            if (xhrType === RecursiveXHR.XHR) { return new XHR(); }
            if (xhrType === RecursiveXHR.FILE_DATA_RESPONSE_HEADER_XHR) { return new FileDataResponseHeaderXHR(); }

            return null;
        }

        /*
            xhrType - will be the xhr object when this method is called recursively (and not the type)

            requestData -
                url - the request url
                callback - the callback function to call to, when the response has been received
                    callback param - responseData - will contain the response data (according to the XHR type)
                data - other optional data to pass to the callback function
        */
        async send(requestData, xhrType, index) {
            try {
                index = index === undefined ? 0 : index;
                let xhr = typeof(xhrType) === "object" ? xhrType : this.getXHR(xhrType);
                
                if (index === requestData.length) { return; }

                let url = requestData[index].url;
                let callback = requestData[index].callback;
                let data = requestData[index].data;
                let responseData = await xhr.send(url);
                
                callback.bind(requestData[index])(responseData, data);
                this.send(requestData, xhr, index + 1);
            } catch(ex) {
                error(ex);
            }
        }
    }

    RecursiveXHR.XHR = 1;
    RecursiveXHR.FILE_DATA_RESPONSE_HEADER_XHR = 2;

    return RecursiveXHR;
})();

var FileDataListContentLengthUpdater = (function() {
	const NUM_OF_RECURSIVE_XHR = 5;

	class FileDataListContentLengthUpdater extends Observer {
		constructor() {
			super();
		}

	    updateContentLengthForUrlFileData(currentUrlFileData) {
	    	// var currentUrlFileData = this.getUrlFileDataOfSelectedTab();
	    	if (!currentUrlFileData) { return null; }

	    	let filesDataList = this.getFilesDataListForRecursiveXHR(currentUrlFileData);
	    	if (!filesDataList) { return; }
	    	let splitFilesDataList = this.getSplitArray(filesDataList, NUM_OF_RECURSIVE_XHR);
	    	log("split array");
	    	log(splitFilesDataList);
	    	this.sendMultipleRecursiveXHRs(splitFilesDataList);
	    }

	    getFilesDataListForRecursiveXHR(currentUrlFileData) {
	    	log(currentUrlFileData);
	    	let self = this;

	    	let filesDataList = [];
	    	for (let i in currentUrlFileData.FilesData) { 
	    		let fileData = currentUrlFileData.FilesData[i];
	    		if (!fileData.ContentLength.isEmpty()) { continue; }

	    		let item = {
	    			url: fileData.Url,
	    			callback: function(responseData) {
	    				log(responseData);
	    				this.data.ContentLength = responseData.contentLength;
	    				self.notify(
	    					EVENTS.BACKGROUND.FILE_DATA_CONTENT_LENGTH_UPDATED, 
	    					{ fileData: this.data, urlFileData: currentUrlFileData } 	// fileData
	    				);
	    			},
	    			data: fileData
	    		};
	    		
	    		filesDataList.push(item);
	    	}
	    	
	    	return filesDataList;
	    }

	    getSplitArray(source, numOfXHRs) {
	    	let indexesArray = this.getIndexesArray(source, numOfXHRs);
	    	return this.getChunksArray(source, indexesArray);
	    }

		getIndexesArray(source, numOfArrays) {
			let indexesArray = [];
			let lengthOfEachArray = Math.floor(source.length / numOfArrays);
			let remainder = source.length % numOfArrays;
			for (let i = 0; i < numOfArrays; i++) {
				indexesArray.push(lengthOfEachArray);
			}
			for (let i = 0; i < remainder; i++) {
				indexesArray[i]++;
			}
			for (let i = 0; i < indexesArray.length;) {
				if (indexesArray[i] === 0) {
					indexesArray.splice(i, 1);
				} else {
					i++;
				}
			}

			return indexesArray;
		}

		getChunksArray(source, indexesArray) {
			let getPositions = function(currentIndex, indexesArray) {
				let startPos = 0;
				let endPos = indexesArray[0];

				for (let i = 0; i < currentIndex; i++) {
					startPos += indexesArray[i];
					endPos += indexesArray[i+1];
				}

				return { 
					start: startPos, 
					end: endPos
				};
			};			

			let chunksArray = [];
			let numOfArrays = indexesArray.length;
			for (let i = 0; i < numOfArrays; i++) {
				let positions = getPositions(i, indexesArray);

				let item = source.slice(positions.start, positions.end);
				chunksArray.push(item);
			};

			return chunksArray;
		}

		sendMultipleRecursiveXHRs(splitFilesDataList) {
			for (let i in splitFilesDataList) {
				splitFilesDataList[i].recursiveXHR = new RecursiveXHR();
				splitFilesDataList[i].recursiveXHR.send(
					splitFilesDataList[i], 
					RecursiveXHR.FILE_DATA_RESPONSE_HEADER_XHR
				);
			}
		}
	}

	return FileDataListContentLengthUpdater;
})();

var FileDataResponseHeaderXHR = function(fileUrl) {
	this.init(fileUrl);
};

FileDataResponseHeaderXHR.prototype = new function() {
	this.init = function(fileUrl) {
		this.xhr = new XHR();
		this.overrideXHROnreadystatechange();
		this.fileUrl = fileUrl || null;
	};

	this.send = function(fileUrl) {
		var deferred = new Deferred();
		fileUrl = this.fileUrl || fileUrl;
		if (!fileUrl) { 
			deferred.reject(new Error("No URL specified"));
			return deferred.promise; 
		}

		log("getting fileUrl " + fileUrl);
		this.xhr.send({ method: "head", url: fileUrl})
		.then(function(responseHeaders) {
			deferred.resolve(responseHeaders);
		}).catch(error);

		return deferred.promise;
	};
	
	this.overrideXHROnreadystatechange = function() {
		this.xhr.setOnreadystatechange = function() {
			var deferred = new Deferred();
			this.xhr.onreadystatechange = function() {
				try {
					if (this.readyState == 3) {
						var contentLength = this.getResponseHeader("Content-Length");
						var contentType = this.getResponseHeader("Content-Type");
						if (contentLength && contentType) {
							deferred.resolve({
								readyState: 3,
								contentLength: contentLength,
								contentType: contentType
							});
						}
						this.abort();
					}

					if (this.readyState == 4) {
					    if (this.status == 200) {
							var contentLength = this.getResponseHeader("Content-Length");
							var contentType = this.getResponseHeader("Content-Type");					    	
							deferred.resolve({
								readyState: 4,
								contentLength: contentLength,
								contentType: contentType
							});
					    } else {
					    	deferred.reject(new Error(this.statusText));
					    }
					}
				} catch(ex) { }
			};

			return deferred;
		};		
	};
};