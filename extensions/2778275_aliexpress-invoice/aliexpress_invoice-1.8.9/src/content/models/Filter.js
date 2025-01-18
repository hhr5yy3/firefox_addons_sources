class Filter {
    static removeDuplicates(orders) {
        if (!orders) return false;

        for (let i = 0; i < orders.length - 1; i++) {
            for (let j = i + 1; j < orders.length; j++) {
                if (
                    orders[i].hasOwnProperty("orderId") &&
                    orders[j].hasOwnProperty("orderId")
                ) {
                    if (orders[i].orderId == orders[j].orderId) {
                        console.log("Deleted duplicate -> ", orders[i]);
                        delete orders[i];
                        break;
                    }
                }
            }
        }

        orders = orders.filter((order) => order);

        return orders;
    }

    static deleteOrderById(orderId, orders) {
        if (!orderId || !orders) return;

        orders = orders.filter((order) => order?.orderId !== orderId);

        return orders;
    }

    static filterOrdersByDateRange(orders, dateFrom, dateTo) {
        if (!orders) return;

        if (dateFrom)
            orders = orders.filter(
                (order) => new Date(order?.orderDateRaw) >= dateFrom
            );
        if (dateTo)
            orders = orders.filter(
                (order) => new Date(order?.orderDateRaw) <= dateTo
            );

        return orders;
    }

    static filterOrdersBySearchInput(orders, value) {
        if (!orders) return;
        let filteredOrders = [];

        orders = orders.forEach((order) => {
            let productFound = false;
            let addressMatch = false;
            let datumMatch = false;
            let statusMatch = false;

            if (order.items.length) {
                productFound = order.items?.some((item) =>
                    item.productTitle?.toLowerCase().includes(value)
                );
            };
            if (order.contact?.specific) {
                addressMatch = order.contact.specific
                    .toLowerCase()
                    .includes(value);
            };
            if (order.orderDatePrintFormat) {
                datumMatch = order.orderDatePrintFormat
                    .toLowerCase()
                    .includes(value);
            }
            if (order.status) {
                statusMatch = order.status.toLowerCase().includes(value);
            }

            if (productFound || addressMatch || datumMatch || statusMatch)
                filteredOrders.push(order);
        });

        return filteredOrders;
    }
}
