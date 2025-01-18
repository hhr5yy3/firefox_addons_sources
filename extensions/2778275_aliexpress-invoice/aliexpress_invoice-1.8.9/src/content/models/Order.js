class Order {
    constructor(args) {
        
        this.orderId = args.orderId ? args.orderId : null;
        this.orderDatePrintFormat = args.orderDatePrintFormat ? args.orderDatePrintFormat : null;
        this.orderDateRaw = null;
        
        if(args.orderDatePrintFormat) {
            let _orderDate = Date.parse(args.orderDatePrintFormat);
            this.orderDateRaw = _orderDate ? _orderDate : null;
        }

        this.orderDetailsUrl = args.orderDetailsUrl ? args.orderDetailsUrl : null;
        this.seller = args.seller ? args.seller : null;
        this.status = args.status ? args.status : null;

        this.refund = args.refund ? args.refund : false;
        this.refundOrders = args.refundOrders ? args.refundOrders : null;

        if(args.total) {
            this.total = {
                orderAmount: args.total.orderAmount ? args.total.orderAmount  : null,
                price: args.total.price ? args.total.price : null,
                tax: args.total.tax ? args.total.tax : null,
                shippingCost: args.total.shippingCost ? args.total.shippingCost : null,
                adjustPrice: args.total.adjustPrice ? args.total.adjustPrice : null,
                discount: args.total.discount ? args.total.discount : null,
                euTax: args.total.euTax ? args.total.euTax : null,
            }
        } else {
            this.total = {
                orderAmount: null,
                price: null,
                tax: null,
                shippingCost: null,
                adjustPrice: null,
                discount: null,
                euTax: null,
            }
        }
        
        this.currency = args.currency ? args.currency : null;

        this.trackingNumber = args.trackingNumber ? args.trackingNumber : null;
        this.paymentDetails = args.paymentDetails ? args.paymentDetails : null;

        if(args.contact) {
            this.contact = {
                name: args.contact.name ? args.contact.name : null,
                address1: args.contact.address1 ? args.contact.address1 : null,
                address2: args.contact.address2 ? args.contact.address2 : null,
                city: args.contact.city ? args.contact.city : null,
                zip: args.contact.zip ? args.contact.zip : null,
                province: args.contact.province ? args.contact.province : null,
                country: args.contact.country ? args.contact.country : null,
                phone: args.contact.phone ? args.contact.phone : null,
                tel: args.contact.tel ? args.contact.tel : null,
            }
        } else {
            this.contact = {
                name: null,
                address1: null,
                address2: null,
                city: null,
                zip: null,
                province: null,
                country: null,
                phone: null,
                tel: null,
            }
        }

        this.items = [];

        this.sellerId = args.sellerId ? args.sellerId : null;
    }

    setOrderItems(items) {
        if(!items.length) {
            return false;
        }

        items.forEach(item => {
            this.items.push(new OrderItem(item));
        });

        if(!this.total.price) {
            this.calculateTotalPrice();
        } 
    }

    getPaymentMethodString() {
        if(!this.paymentDetails) {
            return false;
        }

        let paymentMethod = '';

        this.paymentDetails.forEach(payment => {
            if(payment.paymentMethod) {
                paymentMethod += ',' + payment.paymentMethod;
            }
        });
        return paymentMethod;
    }

    getPaymentDateString() {
        if(!this.paymentDetails) {
            return false;
        }

        let paymentDateTime = '';

        this.paymentDetails.forEach(payment => {
            if(payment.dateReceived) {
                paymentDateTime += ',' + payment.dateReceived;
            }
        });
        return paymentDateTime;
    }

    getPaymentDetails() {
        if(!this.paymentDetails) {
            return '';
        }
        
        let paymentDetails = '';

        this.paymentDetails.forEach(payment => { 
            paymentDetails += payment?.paymentMethod + '<br>';
        })

        return paymentDetails;
    }

    calculateTotalPrice() {

        let totalPrice = 0;

        if(this.items.length) {
            this.items.forEach(item => {
                if(item.price) {
                    totalPrice = Number((totalPrice + item.price).toFixed(2));
                }
            });
        }

        this.total.price = totalPrice;
    }

    updateOrderWithDetailInfo(args) {
        if(args.contact) {
            args.contact.name ? this.contact.name = args.contact.name : null;
            args.contact.address1 ? this.contact.address1 = args.contact.address1 : null;
            args.contact.address2 ? this.contact.address2 = args.contact.address2 : null;
            args.contact.city ? this.contact.city = args.contact.city : null;
            args.contact.zip ? this.contact.zip = args.contact.zip : null;
            args.contact.province ? this.contact.province = args.contact.province : null;
            args.contact.country ? this.contact.country = args.contact.country : null;
            args.contact.phone ? this.contact.phone = args.contact.phone : null;
            args.contact.tel ? this.contact.tel = args.contact.tel : null;
        }

        args.refund ? this.refund = args.refund : false;
        args.refundOrders ? this.refundOrders = args.refundOrders : null;

        args.status ? this.status = args.status : null;
        args.paymentDetails ? this.paymentDetails = args.paymentDetails : null;
        args.trackingNumber ? this.trackingNumber = args.trackingNumber : null;

        args.total.price ? this.total.price = args.total.price : null;
        args.total.shippingCost ? this.total.shippingCost = args.total.shippingCost : null;
        args.total.adjustPrice ? this.total.adjustPrice = args.total.adjustPrice : null;
        args.total.discount ? this.total.discount = args.total.discount : null;
        args.total.tax ? this.total.tax = args.total.tax : null;
        args.total.orderAmount ? this.total.orderAmount = args.total.orderAmount : null;
        args.total.euTax ? this.total.euTax = args.total.euTax : null;

        args.userId ? this.userId = args.userId : null;
    }

    updateOrderWithRawData(data) {
        if(data.contact) {
            data.contact.name ? this.contact.name = data.contact.name : null;
            data.contact.address1 ? this.contact.address1 = data.contact.address1 : null;
            data.contact.address2 ? this.contact.address2 = data.contact.address2 : null;
            data.contact.city ? this.contact.city = data.contact.city : null;
            data.contact.zip ? this.contact.zip = data.contact.zip : null;
            data.contact.province ? this.contact.province = data.contact.province : null;
            data.contact.country ? this.contact.country = data.contact.country : null;
            data.contact.phone ? this.contact.phone = data.contact.phone : null;
            data.contact.tel ? this.contact.tel = data.contact.tel : null;
        }

        if(data.total) {
            this.total = {
                orderAmount: data.total.orderAmount ? data.total.orderAmount : null,
                price: data.total.price ? data.total.price : null,
                tax: data.total.tax ? data.total.tax : null,
                shippingCost: data.total.shippingCost ? data.total.shippingCost : null,
                adjustPrice: data.total.adjustPrice ? data.total.adjustPrice : null,
                discount: data.total.discount ? data.total.discount : null,
                euTax: data.total.euTax ? data.total.euTax : null,
            }
        }

        this.currency = data.currency ? data.currency : null;
        this.trackingNumber = data.trackingNumber ? data.trackingNumber : null;
        this.paymentDetails = null;

        data.refund ? this.refund = data.refund : false;
        data.refundOrders ? this.refundOrders = data.refundOrders : null;

        data.status ? this.status = data.status : null;
        data.paymentDetails ? this.paymentDetails = data.paymentDetails : null;
        data.trackingNumber ? this.trackingNumber = data.trackingNumber : null;

        if(data.items && this.items && data.items.length == this.items.length) {
            data.items.forEach((item, index) => {
                this.items[index].update(item);
            });
        }

        data.rawHtml ? this.rawHtml = data.rawHtml : null;

    }
}