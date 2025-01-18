class Invoice {
    constructor() {}

    static renderOrders(orders, options) {
        if (!orders) return false;

        let structure = "";

        orders.forEach((order) => {
            structure += this.renderOrder(order, options);
        });

        return structure;
    }

    static renderOrder(order, options) {
        if (!order) return;

        let fullShippingAddress = "";

        if (options?.multipleOrderInvoiceOptions?.customerInfo) {
            fullShippingAddress =
                (order?.contact?.name ? order?.contact?.name + "," : "") +
                (order?.contact?.address1
                    ? order?.contact?.address1 + " "
                    : "") +
                (order?.contact?.address2
                    ? order?.contact?.address2 + ","
                    : "") +
                (order?.contact?.zip ? order?.contact?.zip + "," : "") +
                (order?.contact?.city ? order.contact?.city + "," : "") +
                (order?.contact?.province
                    ? order?.contact?.province + ","
                    : "") +
                (order?.contact?.country ? order?.contact?.country : "");
        }

        let orderStructure = `<tbody class="order-item">`;

        order?.items.forEach(
            (item) =>
                (orderStructure += this.renderOrderItem(
                    item,
                    order?.currency,
                    options
                ))
        );

        orderStructure += `<tr class="order-head has-text-grey">
              <td>
                <p contenteditable>Order ID: ${
                    order?.orderId ? order.orderId : ""
                }</p>`;

        
        orderStructure += `<p class="order-date-element" contenteditable>Order date: ${
            order?.orderDatePrintFormat ? order.orderDatePrintFormat : "N/A"
        }</p>`;
        
        orderStructure += `<div class="is-flex"><div class="mr-3 store-name-element" contenteditable>Store name: ${
            order?.seller ? order?.seller : "N/A"
        };</div><div class="mr-3 store-number-element" contenteditable> Store number: ${order?.sellerId ? order.sellerId : "/"}</div></div>`;
        
        orderStructure += `<p class="order-status-element" contenteditable>Order status: ${
            order?.status ? order.status : "N/A"
        }</p>`;
        
        orderStructure += `<p class="customer-info-element" contenteditable>Ship to address: ${fullShippingAddress.length ? fullShippingAddress : 'N/A'}</p>`;

        if (order?.trackingNumber && order?.trackingNumber != 'false') {
            orderStructure += `<p class="tracking-number-element" contenteditable>Tracking number: ${order.trackingNumber}</p>`;
        } else {
            orderStructure += `<p class="tracking-number-element" contenteditable>Tracking number: N/A</p>`;
        }
        
        if (order?.paymentDetails && order?.paymentDetails[0]?.paymentMethod) {
            orderStructure += `<p class="payment-info-element" contenteditable>Payment Received: ${order.getPaymentDetails()}</p>`;
        } else {
            orderStructure += `<p class="payment-info-element" contenteditable>Payment Received: N/A</p>`;
        }
        

        orderStructure += `</td>
              <td class="is-vcentered">
                <p>Product Amount:<br/><span class="price-red">${
                    order?.currency +
                    " " +
                    (order?.total?.price ? order.total.price : "0.00")
                }</span></p>
              </td>
              <td class="is-vcentered">
                <p>Shipping Cost:<br /><span class="price-red">${
                    order?.currency +
                    " " +
                    (order?.total?.shippingCost
                        ? order.total.shippingCost
                        : "0.00")
                }</span></p>`;

        if (order?.total?.discount || order?.total?.adjustPrice) {
            let discount = order?.total?.discount ? order?.total?.discount : 0;
            discount += order?.total?.adjustPrice ? order?.total?.adjustPrice : 0;

            orderStructure += `<p style="border-top: 1px solid #dbdbdb">Discount:<br /><span class="price-red">- ${
                order?.currency + " " + discount
            }</span></p>`;
        }

        orderStructure += `</td>`;

        orderStructure += `<td class="is-vcentered tax-element">
                <p>Tax:<br/><span class="price-red">${
                    order?.currency +
                    " " +
                    (order?.total?.tax ? order.total.tax : "0.00")
                }</span></p>`;
            
        if (order?.total?.euTax) {
            orderStructure += `<p style="border-top: 1px solid #dbdbdb">VAT:<br /><span class="price-red">${
                order?.currency +
                    " " +
                order?.total?.euTax
            }</span></p>`;
        }
        
        orderStructure += `</td>`;

        orderStructure += `<td class="is-vcentered" style="position: relative">
                <p>Order Amount${order?.total?.euTax ? '<br>(Incl. VAT)' : ''}:<br /><span class="price-red">${
                    order?.currency +
                    " " +
                    (order?.total?.orderAmount
                        ? order.total.orderAmount
                        : "0.00")
                }</span></p>`

                orderStructure += `<button style="position:absolute;right:0;bottom: 10px;" class="button is-danger delete-order" data-order-id="${
                    order?.orderId
                }">X</button>
              </td>
            </tr>
          </tbody>`;

        return orderStructure;
    }

    static renderOrderItem(item, currency, options) {
        let htmlRaw = `
        <tr class="article-item">
          <td class="is-flex">`;

        htmlRaw += `<img src="${item?.productImageUrl}" class="product-image-element" />`;
        

        htmlRaw += `<p contenteditable>
              ${item?.productTitle}
              <br />
              <span class="has-text-grey"
                >Product properties: ${item.properties}</span
              >
            </p>
          </td>
          <td>${
              currency + " " + (item?.pricePerUnit ? item.pricePerUnit : "0.00")
          }</td>
          <td>${
              (item?.quantity ? item.quantity : "") +
              " " +
              (item?.unit ? item.unit : "")
          }</td>`;

        htmlRaw += `<td class="tax-element">${
            currency + " " + (item?.tax ? item.tax : "0.00")
        }</td>`;
        
        htmlRaw += `<td>${
            currency + " " + (item?.price ? item.price : "0.00")
        }</td>
        </tr>
      `;

        return htmlRaw;
    }

    static getSumByCurrency(orders) {
        if (!orders.length) {
            return false;
        }

        let currencies = [];
        let total = [];

        orders.forEach((order) => {
            if (order.currency) {
                if (currencies.indexOf(order.currency) == -1) {
                    currencies.push(order.currency);
                    total[currencies.indexOf(order.currency)] = {
                        currency: order.currency,
                        totalShipping: 0,
                        totalPrice: 0,
                        totalTax: 0,
                        totalAmount: 0,
                        totalDiscount: 0,
                        totalEuTax: 0,
                    };
                }

                if (order.hasOwnProperty("total")) {
                    if (order?.total?.price) {
                        total[currencies.indexOf(order?.currency)].totalPrice +=
                            order.total.price;
                        total[currencies.indexOf(order?.currency)].totalPrice =
                            parseFloat(
                                total[
                                    currencies.indexOf(order.currency)
                                ].totalPrice.toFixed(2)
                            );
                    }

                    if (order?.total?.shippingCost) {
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalShipping += order.total.shippingCost;
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalShipping = parseFloat(
                            total[
                                currencies.indexOf(order.currency)
                            ].totalShipping.toFixed(2)
                        );
                    }

                    if (order?.total?.tax) {
                        total[currencies.indexOf(order?.currency)].totalTax +=
                            order.total.tax;
                        total[currencies.indexOf(order?.currency)].totalTax =
                            parseFloat(
                                total[
                                    currencies.indexOf(order.currency)
                                ].totalTax.toFixed(2)
                            );
                    }
                    
                    if (order?.total?.euTax) {
                        total[currencies.indexOf(order?.currency)].totalEuTax +=
                            order.total.euTax;
                        total[currencies.indexOf(order?.currency)].totalEuTax =
                            parseFloat(
                                total[
                                    currencies.indexOf(order.currency)
                                ].totalEuTax.toFixed(2)
                            );
                    }

                    if (order?.total?.orderAmount) {
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalAmount += order.total.orderAmount;
                        total[currencies.indexOf(order?.currency)].totalAmount =
                            parseFloat(
                                total[
                                    currencies.indexOf(order.currency)
                                ].totalAmount.toFixed(2)
                            );
                    }

                    if (order?.total?.discount) {
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalDiscount += order.total.discount;
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalDiscount = parseFloat(
                            total[
                                currencies.indexOf(order.currency)
                            ].totalDiscount.toFixed(2)
                        );
                    }

                    if (order?.total?.adjustPrice) {
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalDiscount += order.total.adjustPrice;
                        total[
                            currencies.indexOf(order?.currency)
                        ].totalDiscount = parseFloat(
                            total[
                                currencies.indexOf(order.currency)
                            ].totalDiscount.toFixed(2)
                        );
                    }
                }
            }
        });

        return {
            currencies,
            total,
        };
    }

    static renderSums = (orders, options) => {
        if (!orders?.length) return;
        let sumByCurrency = this.getSumByCurrency(orders);

        let sumElement = `<tbody>
        <tr class="order-total has-text-grey">
          <td class="is-vcentered has-text-black-bis is-size-4">
            <p>Total:</p>
          </td>
          <td class="is-vcentered">
            <p>
            Product Amount:<br />
            <span class="price-red">`;

        sumByCurrency?.total?.forEach((item) => {
            sumElement += `${item?.currency ? item?.currency : ""} ${
                item?.totalPrice ? item?.totalPrice : "0.00"
            }<br/>`;
        });

        sumElement += `</p></td>     
          <td class="is-vcentered">
            <p>
              Shipping Cost:<br />
              <span class="price-red">`;

        sumByCurrency?.total?.forEach((item) => {
            sumElement += `${item?.currency ? item?.currency : ""} ${
                item?.totalShipping ? item?.totalShipping : "0.00"
            }<br/>`;
        });

        sumElement += `</span></p>`;

        if (
            sumByCurrency?.total[0]?.totalDiscount
        ) {
            sumElement += `<p style="border-top: 1px solid #dbdbdb">
                Discount:<br />
                <span class="price-red">`;
            sumByCurrency?.total?.forEach((item) => {
                sumElement += `- ${item?.currency ? item?.currency : ""} ${item?.totalDiscount}<br />`;
            });
            sumElement += `</span></p>`;
        }

        sumElement += `</td>`;

        sumElement += `<td class="is-vcentered tax-element">
            <p>
                Tax:<br />
                <span class="price-red">`;

                sumByCurrency?.total?.forEach((item) => {
                    sumElement += `${item?.currency ? item?.currency : ""} ${
                        item?.totalTax ? item?.totalTax : "0.00"
                    }<br />`;
                });

        sumElement += `</span></p>`;

        if (
            sumByCurrency?.total[0]?.totalEuTax
        ) {
            sumElement += `<p style="border-top: 1px solid #dbdbdb">
                VAT:<br />
                <span class="price-red">`;
            sumByCurrency?.total?.forEach((item) => {
                sumElement += `${item?.currency ? item?.currency : ""} ${item?.totalEuTax}<br />`;
            });
            sumElement += `</span></p>`;
        }
        
        sumElement += `</td>`;
        

        sumElement += `<td class="is-vcentered">
        <p>
          Order Amount:<br />
          <span class="price-red">`;

        sumByCurrency?.total?.forEach((item) => {
            sumElement += `${item?.currency ? item?.currency : ""} ${
                item?.totalAmount ? item?.totalAmount : "0.00"
            }<br />`;
        });

        sumElement += `</span></p>`;

        if (
            sumByCurrency?.total[0]?.totalEuTax
        ) {
            sumElement += `<p>VAT included</p>`;
        }

        sumElement += `</td></tr></tbody>`;

        return sumElement;
    };
}
