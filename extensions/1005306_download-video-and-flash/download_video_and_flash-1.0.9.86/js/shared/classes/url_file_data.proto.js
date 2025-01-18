function UrlFileData(params) {
    var self = this;

    this.docUrl = null;
    this.filesData = null; // an array of FileData
    this.tabId = null;

    this.init(params);
};

UrlFileData.stringify = function(target) {
    if (!target) { return ""; }

    return JSON.stringify(target);
}

UrlFileData.parse = function(target) {
    target = JSON.parse(target);
    let docUrl = target.docUrl;
    let tabId = target.tabId;
    let filesData = [];

    for (fileData of target.filesData) {
        filesData.push(new FileData(fileData));
    }

    return new UrlFileData({ docUrl, filesData, tabId });
};

UrlFileData.prototype = new function() {
    this.init = function(params) {
        if (!params) { 
            throw "Exception: UrlFileData: 'params' is undefined";
        }

        this.docUrl = params.docUrl || null;
        this.filesData = params.filesData || [];
        this.tabId = params.tabId || null;

        if (params.fileData) {
            this.filesData.push(params.fileData);
        }

        if (!this.docUrl) {
            throw "Exception: UrlFileData: 'docUrl' is null";
        }
    };

    this.clearFilesData = function() {
        this.filesData = null;
    };

    this.addFileData = function(fileData) {
        if (this.isFileDataExist(fileData)) { return false; }
        this.filesData.push(fileData);
        return true;
    };

    this.isFileDataExist = function(fileData) {
        for (var i in this.filesData) {
            if (this.filesData[i].Url === fileData.Url) {
                return true;
            }
        }
        return false;
    };

    this.hasCategory = function(category) {
        if (this.filesData.length === 0) { return false; }
        for (var i in this.filesData) {
            if (this.filesData[i].Category === category) {
                return true;
            }
        }
        return false;
    };

    // return true if at least one FileData is of category "VIDEO"
    this.hasVideo = function() {
        return this.hasCategory(FileData.CATEGORY.VIDEO);
    };

    // return true if at least one FileData is of category "FLASH"
    this.hasFlash = function() {
        return this.hasCategory(FileData.CATEGORY.FLASH);
    };

    this.getFlashFilesData = function() {
        this.filterAllDuplicates();
        return this.getFilesDataByCategory(FileData.CATEGORY.FLASH);
    };

    this.getVideoFilesData = function() {
        this.filterAllDuplicates();
        return this.getFilesDataByCategory(FileData.CATEGORY.VIDEO);
    };    

    this.getFilesDataByCategory = function(category) {
        this.filterAllDuplicates();
        var filesData = [];
        for (var i in this.filesData) {
            var fileData = this.filesData[i];
            if (fileData.Category === category) {
                filesData.push(fileData);
            }
        }        
        return filesData.length > 0 ? filesData : null;
    };

    // incase "isFileDataExist" missed when added a new fileData
    this.filterDuplicates = function() {
        for (var i = 0; i < this.filesData.length; i++) {
            var fileData_i = this.filesData[i];
            for (var j = 0; j < this.filesData.length; j++) {
                var fileData_j = this.filesData[j];
                if (i != j && fileData_i.Url === fileData_j.Url) {
                    this.filesData.splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    };

    this.filterAllDuplicates = function() {
        while (true) {
            if (!this.filterDuplicates()) { return; }
        }
    };

    Object.defineProperty(this, "DocUrl", { 
        get: function() { return this.docUrl; },
        set: function(value) { this.docUrl = value; }
    });

    Object.defineProperty(this, "TabId", { 
        get: function() { return this.tabId; },
        set: function(value) { this.tabId = value; }
    });    

    Object.defineProperty(this, "FilesData", { 
        get: function() { 
            this.filterDuplicates();
            return this.filesData;
        },
        set: function(value) {
            this.filesData = value;
        }
    });

    this.stringify = function() {
        return UrlFileData.stringify.call(null, this);
    };
};