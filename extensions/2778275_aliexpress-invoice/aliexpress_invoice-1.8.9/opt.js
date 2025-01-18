var liElements = document.querySelectorAll('.tabs > ul > li');

document.querySelector('.close-modal').addEventListener('click', function() {
    document.querySelector('.modal').style.display = "none";
});

document.querySelector('.save-settings').addEventListener('click', function() {

    var seller = {
        name: document.querySelector('.seller-name')?.value ? document.querySelector('.seller-name').value : '',
        logo: document.querySelector('.seller-logo')?.value ? document.querySelector('.seller-logo').value : null,
        logoUrl: document.querySelector('.seller-logo-url')?.value ? document.querySelector('.seller-logo-url').value : null,
        address: document.querySelector('.seller-address')?.value ? document.querySelector('.seller-address').value : '',
        address2: document.querySelector('.seller-full-address')?.value ? document.querySelector('.seller-full-address').value : '',
        vat: document.querySelector('.seller-vat')?.value ? document.querySelector('.seller-vat').value : '',
    }

    var company = {
        name: document.querySelector('.company-name')?.value ? document.querySelector('.company-name').value : '',
        address: document.querySelector('.company-address')?.value ? document.querySelector('.company-address').value : '',
        address2: document.querySelector('.company-full-address')?.value ? document.querySelector('.company-full-address').value : '',
        vat: document.querySelector('.company-vat')?.value ? document.querySelector('.company-vat').value : '',
        regNumber: document.querySelector('.company-reg-number')?.value ? document.querySelector('.company-reg-number').value : '',
    }

    var singleInvoiceOptions = {
        contactTable: document.querySelector('.contact-checkbox')?.checked ? true: false,
        totalAmount: document.querySelector('.total-amount-checkbox')?.checked ? true: false,
        paymentDetails: document.querySelector('.payment-checkbox')?.checked ? true: false,
        logisticsInfo: document.querySelector('.logistics-checkbox')?.checked ? true: false,
    }

    var multipleOrderInvoiceOptions = {
        productImage: document.querySelector('.product-image')?.checked ? true : false,
        orderDateTime: document.querySelector('.order-datetime')?.checked ? true: false,
        storeName: document.querySelector('.store-name')?.checked ? true: false,
        storeNumber: document.querySelector('.store-number')?.checked ? true: false,
        trackingNumber: document.querySelector('.tracking-number')?.checked ? true: false,
        customerInfo: document.querySelector('.customer-info')?.checked ? true: false,
        paymentInfo: document.querySelector('.payment-info')?.checked ? true: false,
        orderStatus: document.querySelector('.order-status')?.checked ? true: false,
        taxInfo: document.querySelector('.tax-info')?.checked ? true: false,
    }

    chrome.storage.local.set({ 
        seller,
        company,
        singleInvoiceOptions,
        multipleOrderInvoiceOptions
    }, function() {
        showModal("Successfully saved!");
    });

});

for(var i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener('click', function(e) {

        var classList = e.currentTarget.classList;

        if(classList.length > 0) {
            for(var j = 0; j < classList.length; j++) {
                if(classList[j] == 'is-active') {
                    return;
                }
            }
        }

        var dataLinkAttr = e.currentTarget.getAttribute('data-link');
        var tabContainers = document.querySelectorAll('.tab-list > .tab-container');

        if(dataLinkAttr) {
            changeTab(tabContainers, liElements, dataLinkAttr);
        }

    });
}

chrome.storage.local.get(null, function(data) {

    try {

        console.log("Data ", data);

        if(data?.seller) {
            document.querySelector('.seller-name').value = data?.seller?.name ? data.seller.name : '';
            document.querySelector('.seller-logo-url').value = data?.seller?.logoUrl ? data.seller.logoUrl : '';
            document.querySelector('.seller-address').value = data?.seller?.address ? data.seller.address : '';
            document.querySelector('.seller-full-address').value = data?.seller?.address2 ? data.seller.address2 : '';
            document.querySelector('.seller-vat').value = data?.seller?.address2 ? data.seller.vat : '';
        }
    
        if(data?.company) {
            document.querySelector('.company-name').value = data.company?.name;
            document.querySelector('.company-address').value = data.company?.address;
            document.querySelector('.company-full-address').value = data.company?.address2;
            document.querySelector('.company-vat').value = data.company?.vat;
            document.querySelector('.company-reg-number').value = data.company?.regNumber;
        }
    
        if(data?.singleInvoiceOptions) {
            document.querySelector('.contact-checkbox').checked = data.singleInvoiceOptions?.contactTable;
            document.querySelector('.total-amount-checkbox').checked = data.singleInvoiceOptions?.totalAmount;
            document.querySelector('.payment-checkbox').checked = data.singleInvoiceOptions?.paymentDetails;
            document.querySelector('.logistics-checkbox').checked = data.singleInvoiceOptions?.logisticsInfo;
        }

        if(data?.multipleOrderInvoiceOptions) {
            document.querySelector('.product-image').checked = data.multipleOrderInvoiceOptions?.productImage;
            document.querySelector('.order-datetime').checked = data.multipleOrderInvoiceOptions?.orderDateTime;
            document.querySelector('.store-name').checked = data.multipleOrderInvoiceOptions?.storeName;
            document.querySelector('.store-number').checked = data.multipleOrderInvoiceOptions?.storeNumber;
            document.querySelector('.tracking-number').checked = data.multipleOrderInvoiceOptions?.trackingNumber;
            document.querySelector('.customer-info').checked = data.multipleOrderInvoiceOptions?.customerInfo;
            document.querySelector('.payment-info').checked = data.multipleOrderInvoiceOptions?.paymentInfo;
            document.querySelector('.order-status').checked = data.multipleOrderInvoiceOptions?.orderStatus;
            document.querySelector('.tax-info').checked = data.multipleOrderInvoiceOptions?.taxInfo;
        }

    } catch(exception) {
        console.log("Exception ", exception);
    }
    
});

function hasClass(element, name) {
    var classList = element.classList;

    if(classList.length) {
        for(var i = 0; i < classList.length; i++) {
            if(classList[i] == name) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

function changeTab(tabs, links, dataLink) {
    if(tabs.length && links.length) {
        
        for(var i = 0; i < tabs.length; i++) {
            if(tabs[i].getAttribute('data-name') == dataLink) {
                tabs[i].classList.add('active-tab');
            } else {
                tabs[i].classList.remove('active-tab');
            }
        }

        for(var i = 0; i < links.length; i++) {
            if(links[i].getAttribute('data-link') == dataLink) {
                links[i].classList.add('is-active');
            } else {
                links[i].classList.remove('is-active');
            }
        }
    }
}

function showModal(text) {
    document.querySelector('.modal').style.display = "block";
    document.querySelector('.modal-message').innerHTML = text;
}

const exportLocalStorage = () => {
    chrome.storage.local.get("orders", (data) => {
        if (!data.orders) {
            alert('No order data in local storage.');
        }
        console.log(data);

        if ($('.hide-personal-info').prop('checked')) {
            data.orders.map((order) => {
                order.contact.address1 = 'address1';
                order.contact.address2 = 'address2';
                order.contact.city = 'city';
                order.contact.country = 'country';
                order.contact.name = 'name';
                order.contact.phone = 'phone';
                order.contact.province = 'province';
                order.contact.specific = 'specific';
                order.contact.tel = 'tel';
                order.contact.zip = 'zip';
            });
        }
        exportStorageJson(data, 'orders-local-storage.json');
    });
};

const importLocalStorage = () => {
    let uploadButton = $(
        '<input id="uploadJson" style="display: none;" type="file">'
    );
    uploadButton.change(function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            let importedStorageData = JSON.parse(e.target.result);
            console.log('Imported data: ', importedStorageData);
            let importedDataForSave = {};

            if (importedStorageData.hasOwnProperty('orders'))
                importedDataForSave.orders = importedStorageData.orders;
            if ($.isEmptyObject(importedDataForSave)) {
                alert('Imported file not valid.');
                return;
            }

            const randomOrderIndex = Math.floor(
                Math.random() * importedStorageData.orders.length
            );
            const randomOCName =
                importedStorageData.orders[randomOrderIndex].contact.name;
            const randomOCAddress1 =
                importedStorageData.orders[randomOrderIndex].contact.address1;
            console.log(randomOCName);

            if (randomOCName == 'name' || randomOCAddress1 == 'address1') {
                const confirmation = confirm(
                    'Customer data from orders is dummy data. Are you sure you want to proceed with the import?'
                );

                if (!confirmation) {
                    return;
                }
            }

            chrome.storage.local.set(importedDataForSave, () => {
                if (chrome.runtime.lastError) {
                    console.log('Error ' + chrome.runtime.lastError);
                    alert('Can not save imported file');
                }

                alert('Order data successfully imported');
            });
        };
        reader.readAsText(uploadButton[0].files[0]);
        $('body').find('input#uploadJson').remove();
    });
    $('body').append(uploadButton);
    uploadButton.click();
};

const updateLocalStorage = () => {
    let uploadButton = $(
        '<input id="uploadJson" style="display: none;" type="file">'
    );
    uploadButton.change(function () {
        var reader = new FileReader();
        reader.onload = async (e) => {
            let importedStorageData = JSON.parse(e.target.result);
            console.log('Imported data: ', importedStorageData);
            if (!importedStorageData.orders?.length) {
                alert('Imported file not valid.');
                return;
            }
            let importedOrders = importedStorageData.orders;

            const randomOrderIndex = Math.floor(
                Math.random() * importedOrders.length
            );
            if (!importedOrders[randomOrderIndex].hasOwnProperty('contact')) {
                alert('Imported file not valid.');
                return;
            }
            if (
                !importedOrders[randomOrderIndex].hasOwnProperty(
                    'orderDetailsUrl'
                )
            ) {
                alert('Imported file not valid.');
                return;
            }

            await updateOrdersWithImportedData(importedOrders);
        };
        reader.readAsText(uploadButton[0].files[0]);
        $('body').find('input#uploadJson').remove();
    });
    $('body').append(uploadButton);
    uploadButton.click();
};

const exportStorageJson = (data, filename) => {
    let blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    chrome.downloads.download(
        {
            url: URL.createObjectURL(blob),
            filename,
        },
        () => {
            if (chrome.runtime.lastError) {
                console.log('Error ', chrome.runtime.lastError);
            }

            console.log('Exported data:', data);
        }
    );
};

$('.export-orders').click(async () => {
    const permissionCheck = await checkPermissionForDownloads();
    if (!permissionCheck) return;

    exportLocalStorage();
});
$('.import-orders').click(importLocalStorage);
$('.update-orders').click(updateLocalStorage);

const checkPermissionForDownloads = () => {
    return new Promise((resolve, reject) => {
        chrome.permissions.request({
            permissions: ['downloads']
        }, (granted) => {
            if (granted) {
                return resolve(true);
            } else {
                alert("Warning: AliBill won't be able to export orders if you don't grant permission.");
                return resolve(false);
            }
        });
    })
};