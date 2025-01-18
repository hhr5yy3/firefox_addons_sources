class OrderItem {

    constructor(args) {
        this.productTitle = args.productTitle ? args.productTitle : null;
        this.productImageUrl = args.productImageUrl ? args.productImageUrl : null,
        this.price = args.price ? args.price : null;
        this.quantity = args.quantity ? args.quantity : null;
        this.properties = args.properties ? args.properties : null;
        this.orderItemStatus = args.orderItemStatus ? args.orderItemStatus : null;
        this.unit = args.unit ? args.unit : null;
        this.tax = args.tax ? args.tax : null;
        this.pricePerUnit = args.pricePerUnit ? args.pricePerUnit : null;
        this.shippingType = args.shippingType ? args.shippingType : null;
    
        this.transactionScreenshot = args.transactionScreenshot ? args.transactionScreenshot : null;
        this.productUrl = args.productUrl ? args.productUrl : null;

        this.calculatePrice();
    }

    update(args) {
        
        args.productTitle ? this.productTitle = args.productTitle : '';
        args.productImageUrl ? this.productImageUrl = args.productImageUrl : '';
        args.price ? this.price = args.price : '';
        args.quantity ? this.quantity = args.quantity : '';
        args.properties ? this.properties = args.properties : '';
        args.orderItemStatus ? this.orderItemStatus = args.orderItemStatus : '';
        args.unit ? this.unit = args.unit : '';
        args.tax ? this.tax = args.tax : '';
        args.pricePerUnit ? this.pricePerUnit = args.pricePerUnit : '';
        args.shippingType ? this.shippingType = args.shippingType : '';

        args.transactionScreenshot ? this.transactionScreenshot = args.transactionScreenshot : null;
        args.productUrl ? this.productUrl = args.productUrl : null;

        this.calculatePrice();
    }

    isAliExpressPocket() {
        if(this.productTitle && this.productTitle.toLowerCase().includes('aliexpress pocket')) {
            return true;
        }
        return false;
    }

    calculatePrice() {
        if(!this.price) {
            if(this.quantity && this.pricePerUnit) {
                this.price = Number((this.quantity * this.pricePerUnit).toFixed(2));
                if(this.tax) {
                    this.price = Number((this.price + this.tax).toFixed(2)); 
                }
            }
        }
    }

}