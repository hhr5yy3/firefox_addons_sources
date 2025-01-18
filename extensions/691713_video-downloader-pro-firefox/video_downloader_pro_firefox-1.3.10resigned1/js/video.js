const Video = class {
    constructor(title = 'no title', url, quality = '', type = 'video/mp4', size = 0) {
        if(!url) { console.error('video must have url'); return; }

        this.title   = title;
        this.url     = url;
        this.type    = type;
        this.quality = quality;
        this.size    = size;

        if(!this.size) this.getFileSize();
    }

    set title(str) { this._title = str.replace(/[↵\n\t]/g, '').trim(); }

    get title() { return this._title; }

    get filename() { return this.title.slice(0, 100) + '.mp4'; }

    get formattedSize () {
        if(!this.size) return '';

        let measurement = 'B';
        let size = this.size;

        if (size > 1024) { size = Math.round(size / 1024 * 100) / 100; measurement = 'KB'; }
        if (size > 1024) { size = Math.round(size / 1024 * 100) / 100; measurement = 'MB'; }
        if (size > 1024) { size = Math.round(size / 1024 * 100) / 100; measurement = 'GB'; }
        return size + measurement;
    }

    getFileSize() {
        var x = new XMLHttpRequest();
        x.open('HEAD', this.url, true);
        x.timeout = 60000;
        x.onload = () => {
            if(x.status === 200){
                this.size = x.getResponseHeader('Content-Length');
                this.type = x.getResponseHeader('Content-Type');
            }
        };
        x.send();
    }

    get data() {
        return {
            title:         this.title,
            url:           this.url,
            filename:      this.filename,
            quality:       this.quality,
            formattedSize: this.formattedSize,
        };
    }

};
