let waitForItemToShow = (selector) => {
    return new Promise((resolve, reject) => {
        let counter = 0;

        let intervalId = setInterval(() => {
            let element = $(selector);

            counter++;

            if (element.length) {
                clearInterval(intervalId);
                resolve(true);
            }

            if (counter > 5) {
                clearInterval(intervalId);
                resolve(false);
            }
        }, 1000);
    });
};

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

const extractPriceFromString = (priceString) => {
    priceString = priceString.replace(/[^\d\.\,]/g, '');

    let sliced = priceString.slice(0, -2);

    if (sliced.split('').pop() == '.')
        return accounting.unformat(priceString, '.'); // 21.03
    if (sliced.split('').pop() == ',')
        return accounting.unformat(priceString, ','); // 21,03

    sliced = sliced.slice(0, -1);

    if (sliced.split('').pop() == ',')
        return accounting.unformat(priceString, '.'); // 21,403
    if (sliced.split('').pop() == '.')
        return accounting.unformat(priceString, ','); // 21.403

    return accounting.unformat(priceString); // 21403
};

const extractCurrencyFromPriceNew = (string) => {
    let final = false;

    if (!string) return false;

    let splitStringBySpace = string.split(" ");

    if (!splitStringBySpace) return false;

    let newArray = string.split("").filter((letter, index) => {
        if (letter == " ") {
            return letter;
        }
        if (
            !(
                !isNaN(letter) ||
                letter == "." ||
                letter == "," ||
                letter == ":" ||
                letter == ";"
            )
        ) {
            return letter;
        }
    });

    let newString = newArray.join("").trim();
    let splitNewString = newString.split(" ");
    let maxLength = 0;

    for (let i = 0; i < splitNewString.length; i++) {
        if (splitNewString[i].length == 1) {
            final = splitNewString[i];
            break;
        } else {
            if (splitNewString[i].length > maxLength) {
                maxLength = splitNewString[i].length;
                final = splitNewString[i];
            }
        }
    }

    return final;
};

const translateDate = (dateString) => {
    const months = [
        // portugalski, spanski, francuski, italijanski, nemacki
        ["jan", "ene", "janv.", "gen", "Jan"], // januar
        ["fev", "feb", "févr.", "feb", "Feb"], // februar
        ["mar", "mar", "mars", "mar", "Mär"], // mart
        ["abr", "abr", "avr.", "apr", "Apr"], // april
        ["mai", "may", "mai", "mag", "Mai"], // maj
        ["jun", "jun", "juin", "giu", "Jun"], // jun
        ["jul", "jul", "juil.", "lug", "Jul"], // jul
        ["ago", "ago", "août", "ago", "Aug"], // avgust
        ["set", "sept", "sept.", "set", "Sep"], // septembar
        ["out", "oct", "oct.", "ott", "Okt"], // oktobar
        ["nov", "nov", "nov.", "nov", "Nov"], // november
        ["dez", "dic", "déc.", "dic", "Dez"], // decembar
    ];

    months.map((month, index) =>
        month.map((monthName) => {
            if (dateString.includes(monthName)) {
                switch (index) {
                    case 0:
                        dateString = dateString.replace(monthName, "Jan");
                        break;
                    case 1:
                        dateString = dateString.replace(monthName, "Feb");
                        break;
                    case 2:
                        dateString = dateString.replace(monthName, "Mar");
                        break;
                    case 3:
                        dateString = dateString.replace(monthName, "Apr");
                        break;
                    case 4:
                        dateString = dateString.replace(monthName, "May");
                        break;
                    case 5:
                        dateString = dateString.replace(monthName, "Jun");
                        break;
                    case 6:
                        dateString = dateString.replace(monthName, "Jul");
                        break;
                    case 7:
                        dateString = dateString.replace(monthName, "Aug");
                        break;
                    case 8:
                        dateString = dateString.replace(monthName, "Sep");
                        break;
                    case 9:
                        dateString = dateString.replace(monthName, "Oct");
                        break;
                    case 10:
                        dateString = dateString.replace(monthName, "Nov");
                        break;
                    case 11:
                        dateString = dateString.replace(monthName, "Dec");
                        break;
                }
            }
        })
    );

    // korejski i sklanjanje svega osim slova, brojeva i razmaka
    dateString = dateString.replace(/[^\w\s]/g, "");

    return dateString;
};

$(document).ready(() => {
    if (location.href.includes("/item/") && location.href.includes("scrape=1")) {
        $("body").append(modal());
        showModal();
        changeModalMessage({
            message:
                "Do not close this tab. Please wait, it will close it self.",
        });

        (async () => {
            let flag = await waitForItemToShow(".product-main-wrap");
            if (!flag) {
                chrome.runtime.sendMessage({
                    messageType: "CLOSE_PREVIOUS_OPENED_TAB",
                });
                return;
            }

            getProductDetails();
        })();
    }
});

const getProductDetails = async () => {
    const tempProduct = await getProductFromLocal();
    
    if (tempProduct) {
        const e_title = $('.product-title-text');
        if (e_title) tempProduct.productTitle = e_title.text().trim();
        
        const e_imageUrl = $('.image-view-magnifier-wrap img');
        if (e_imageUrl) tempProduct.productImageUrl = e_imageUrl.attr('src');

        const e_price = $('.product-price-current span');
        if (e_price) {
            let price = e_price.text().trim();
            if (price.includes('-')) price = price.split('-')[0].trim();

            tempProduct.pricePerUnit = extractPriceFromString(price);
            
            const split_price = price.split(':');
            tempProduct.currency = extractCurrencyFromPriceNew(
                split_price[split_price.length - 1]
            );
        };

        const e_sellerContact = $('.store-name a');
        if (e_sellerContact) {
            tempProduct.seller = e_sellerContact.text().trim();

            if (e_sellerContact.attr("href").split("?")[0]) {
                let tmpSellerId = e_sellerContact
                    .attr("href")
                    .split("?")[0]
                    .split("/");

                if (tmpSellerId.length) {
                    tempProduct.sellerId = tmpSellerId[tmpSellerId.length - 1];
                }
            }
        }
    }

    chrome.storage.local.set({
        tempProduct,
    }, () => {
        if(chrome?.runtime?.lastError) {
            console.log(chrome?.runtime?.lastError);
            return;
        }
    })

    chrome.runtime.sendMessage({
        messageType: "CLOSE_PREVIOUS_OPENED_TAB"
    });
}