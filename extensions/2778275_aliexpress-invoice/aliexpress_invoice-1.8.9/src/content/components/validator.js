function validateDataBeforeRequest(args, ignore) {

    if(ignore) {
        return args;
    }

    if(args.searchOrderNumber || args.searchProductName || args.searchSellerName || args.searchTrackingNumber || args.searchStatus || args.dateRangeStart || args.dateRangeEnd) {
        if(!window.confirm("You filled some filters on AliExpress. Invoice will include only filtered orders. Do you confirm it?")) {
            return false;
        } 
    }


    while(!args.pageSize || !checkIfItsInteger(args.pageSize)) {
        let inputPageSize = prompt("Enter number of orders per page(choose 10 or 30) or enter 0 if you want to exit.");

        if(checkIfItsInteger(inputPageSize)) {
            args.pageSize = Number(inputPageSize);
        }

        
        if(inputPageSize == 0) {
            return false;
        }
    }

    while(!args.currentPage || !checkIfItsInteger(args.currentPage)) {
        let inputCurrentPage = prompt('Please enter from which page you want to start?Or enter 0 to exit.');

        if(checkIfItsInteger(inputCurrentPage)) {
            args.currentPage = inputCurrentPage;
        }

        if(inputCurrentPage == 0) {
            return false;
        }
    }

    if(Number(args.currentPage) > Number(args.lastPage)) {
        return false;
    }

    while(!args.lastPage || !checkIfItsInteger(args.lastPage)) {
        let inputLastPage = prompt('Please enter last page of order list? Or enter 0 to exit.');

        if(checkIfItsInteger(Number(inputLastPage))) {
            args.lastPage = inputLastPage;
        }
    }

    return args;

}

function checkIfItsInteger(stringNumber) {

    if(!stringNumber) {
        return false;
    }

    if(Number.isInteger(parseInt(stringNumber))) {
        return true;
    } else {
        return false;
    }
} 