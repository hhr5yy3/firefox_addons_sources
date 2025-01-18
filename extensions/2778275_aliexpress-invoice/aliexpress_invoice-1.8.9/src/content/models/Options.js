class Options {
    constructor() {
        this.seller = null;
        this.company = null;
        this.singleInvoiceOptions = null;
        this.multipleOrderInvoiceOptions = null;
        this.orders = null;
    }

    init() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(null, data => {
                if(!data) reject(false);

                this.seller = data.seller;
                this.company = data.company;
                this.singleInvoiceOptions = data.singleInvoiceOptions;
                this.multipleOrderInvoiceOptions = data.multipleOrderInvoiceOptions;

                this.orders = data?.orders ? data.orders : null;
                resolve(true);
            })
        })
    }

    getMultipleInvoiceOptions() {
        if(this.multipleOrderInvoiceOptions) return this.multipleOrderInvoiceOptions;
        return null;
    }

    scrapeOrderDetails() {
        if(!this.multipleOrderInvoiceOptions) return false;

        if(this.multipleOrderInvoiceOptions?.trackingNumber || this.multipleOrderInvoiceOptions?.customerInfo || this.multipleOrderInvoiceOptions?.paymentInfo || this.multipleOrderInvoiceOptions?.taxInfo) return true;

        return false;
    }
}