

class SmdPag {
    constructor(options) {
        this.parent = options.parent || document.body;
        this.itemsCount = options.itemsCount || 1;
        this.perpage = options.perpage || this.itemsCount;
        this.tols = options.tols || "auto";
        this._radius = this.tols === "auto" ? 1 : parseInt(this.tols[0]);
        this._endRadius = this.tols === "auto" ? 1 : parseInt(this.tols[1]);
        this.maxWidth = options.maxWidth || 25;
        this.prefix = options.prefix || "smd";
        this.ellipsisText = options.ellipsisText || ". . .";
        this.prevText = options.prevText || "Prev";
        this.nextText = options.nextText || "Next";
        this.autoOverflow = this.tols === "auto" || (options.autoOverflow !== undefined ? options.autoOverflow : true);
        this.pageAction = options.pageAction || function () { };
        this.onPagesCountChange= options.onPagesCountChange|| function () { };
        this._currentPage = 1;
        this.auto = !!options.auto;

        this.name = options.name;
    }

    _findDims(){
        this.dims = {N:[]};
        this.dims.wparent = this.parent.getBoundingClientRect().width;
        this.dims.wnext = this.parent.querySelector(`.${this.prefix}-next`).getBoundingClientRect().width;
        this.dims.wprev = this.parent.querySelector(`.${this.prefix}-prev`).getBoundingClientRect().width;
        let inner = this.parent.querySelector(`.${this.prefix}-inner`);

        let L = [`${this.ellipsisText}`, "0", "00", "000", "0000", "00000", "000000", "0000000"];
        let that = this;
        L.forEach((x, i) => {
            let cls = i > 0 ? `${this.prefix}-label` : `${this.prefix}-ellipsis`;
            let unit = createElem({ tag: "DIV", text: x, attrs: { "class": cls } });
            inner.append(unit);
            if(i === 0) that.dims.wellipsis = unit.getBoundingClientRect().width;
            else that.dims.N.push(unit.getBoundingClientRect().width);
            unit.remove();
        });
        let N = this.dims.N;
        let d = N.length;
        let i = 0;
        let wc = 0;
        let w0 = this.dims.wparent - this.dims.wprev - this.dims.wnext;

        while(wc < w0){
            i = i + 1;
            let k = i.toString().length;
            k = k <= d ? k : d;
            wc = wc + N[k - 1];
        }
        this.dims.maxWidth = i; 
    }

    _setInternalParams() {
        let r = this.itemsCount % this.perpage;
        let q = (this.itemsCount - r) / this.perpage;
        let oldPagesCount = this._pagesCount;
        this._pagesCount = (r === 0 ? q : q + 1) || 1;

        if (this._pagesCount !== oldPagesCount) {
            if(this._pagesCount === 1) this.parent.classList.add(`${this.prefix}-one-page`);
            if(oldPagesCount === 1) this.parent.classList.remove(`${this.prefix}-one-page`);
            let onePage = this._pagesCount === 1;
            this.onPagesCountChange.call(this, onePage);
        }
        if (this.tols === "auto") {
            this._radius = Math.min(this.maxWidth, this.dims.maxWidth);
            this._endRadius = this._radius;
        }
    }

    _getVisibleLabelsFor(k, n, r, e) {
        if (n <= 0 || k > n || k < 1 || e < 1) return [];
        if (n <= 1 + 2 * r || n <= e) return range(1, n);

        let LS = e + r > k - 1 ? range(1, k - 1)
            : range(1, e).concat(["..."]).concat(range(k - r, k - 1));
        let i = LS.indexOf("...");
        if (i > -1) {
            if (LS[i + 1] - LS[i - 1] === 2) LS[i] = (LS[i + 1] + LS[i - 1]) / 2;
            else if (LS[i + 1] - LS[i - 1] === 1) LS.splice(i, 1);
        }

        let LR = e + r > n - k ? range(k + 1, n)
            : range(k + 1, k + r).concat(["..."]).concat(range(n - e + 1, n));
        let j = LR.indexOf("...");
        if (j > -1) {
            if (LR[j + 1] - LR[j - 1] === 2) LR[j] = (LR[j + 1] + LR[j - 1]) / 2;
            else if (LR[j + 1] - LR[j - 1] === 1) LR.splice(j, 1);
        }
        return LS.concat([k]).concat(LR);
    }

    _getEstimatedWidth(L){
        let result = this.dims.wprev + this.dims.wnext;
        for(let x of L){
            let int = Number.isInteger(x);
            if(int) {
                let k = x.toString().length;
                if(k <= this.dims.N.length) result = result + this.dims.N[k - 1];
                else result = result + this.dims[this.dims.N.length - 1];
            }
            else result = result + this.dims.wellipsis;
        }
        return result;
    }

    _buildUI(L){
        let labels_div = this.parent.querySelector(`.${this.prefix}-pag-wrapper .${this.prefix}-inner`);
        emptyElem(labels_div);
        let units = [];
        for (let x of L) {
            let int = Number.isInteger(x);
            let cls = int ? `${this.prefix}-label` : `${this.prefix}-ellipsis`;
            let label = int ? x.toString() : `${this.ellipsisText}`;
            let attrs = { "class": cls };
            if (int) attrs[`${this.prefix}-index`] = label;
            let unit = createElem({ tag: "DIV", text: label, attrs: attrs });
            units.push(unit);
        }
        labels_div.append(...units);       
        this._markCurrent();
    }

    _updateLabels(r, e) {             
        let L = this._getVisibleLabelsFor(this._currentPage, this._pagesCount, r, e);
        let wL = this._getEstimatedWidth(L);
        if(this.autoOverflow){
            if ((r >= 2 || e >= 2) && wL >= (99 / 100) * this.dims.wparent) {
                if (e >= 2 && e >= r) this._updateLabels(r, e - 1);
                else this._updateLabels(r - 1, e);
            }
            else this._buildUI(L);     
        }
        else this._buildUI(L); 
    }

    _markCurrent() {
        let old = this.parent.querySelector(`.${this.prefix}-current`);
        if (old) old.classList.remove(`${this.prefix}-current`);
        let nr = this._currentPage.toString();
        let elem = this.parent.querySelector(`[${this.prefix}-index="${nr}"`);
        if (elem) elem.classList.add(`${this.prefix}-current`);
    }

    getCurrentPage() { return this._currentPage; }

    getPagesCount() { return this._pagesCount; }

    setCurrentPage(k, info) {
        info = info || {};
        if(info.itemsCount !== undefined) this.itemsCount = info.itemsCount;
        if(info.perpage !== undefined) this.perpage = info.perpage;

        let oldPagesCount = this._pagesCount;
        this._setInternalParams();
        info.pagesCountChanged = this._pagesCount !== oldPagesCount;

        if(k === -1 ) k = this._pagesCount;
        if(k === 0) k = this._currentPage;
        if(k > this._pagesCount) k = this._pagesCount;
        info.pageChanged = this._currentPage !== k;
        this._currentPage = k;

        if(info.pageChanged || info.pagesCountChanged){        
            this._updateLabels(this._radius, this._endRadius);
        }

        if (info.activate) this.pageAction.call(this, this._currentPage, info);
    }

    resize(){
        this._findDims();
        this._setInternalParams();
        this._updateLabels(this._radius, this._endRadius);
    }

    init() {
        let parent = this.parent;
        while (parent.firstChild) parent.removeChild(parent.firstChild);
        let container = createElem({ tag: "DIV", attrs: { "class": `${this.prefix}-pag-wrapper` } });
        parent.append(container);
        let prev_div = createElem({ tag: "DIV", text: `${this.prevText}`, attrs: { "class": `${this.prefix}-prev` } });
        container.append(prev_div);
        let labels_div = createElem({ tag: "DIV", attrs: { "class": `${this.prefix}-inner` } });
        container.append(labels_div);
        let next_div = createElem({ tag: "DIV", text: `${this.nextText}`, attrs: { "class": `${this.prefix}-next` } });
        container.append(next_div);

        if(!this.dims) this._findDims();
        this._setInternalParams();
        this._updateLabels(this._radius, this._endRadius);

        let that = this;
        on({ type: "click", selector: `.${this.prefix}-label`, container: container }, function (e) {
            let n = parseInt(this.textContent);
            if(that._currentPage === n) return;
            that._currentPage = n;
            that._updateLabels(that._radius, that._endRadius);
            that.pageAction.call(that, n, {event:e, pageChanged: true});
        });

        on({ type: "click", selector: `.${this.prefix}-prev, .${this.prefix}-next`, container: container }, function (e) {
            let dir = this.classList.contains(`${that.prefix}-prev`) ? "prev" : "next";
            if (dir === "prev") {
                if (that._currentPage === 1) return;
                that._currentPage = that._currentPage - 1;
            }
            else {
                if (that._currentPage === that._pagesCount) return;
                that._currentPage = that._currentPage + 1;
            }
            that._updateLabels(that._radius, that._endRadius);
            that.pageAction.call(that, that._currentPage, {event:e, pageChanged: true});
        });
    }
}