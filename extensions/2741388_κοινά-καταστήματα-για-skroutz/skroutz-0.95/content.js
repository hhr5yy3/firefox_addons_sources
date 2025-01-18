console.log("Common shops for skroutz extension was started!");

let slcList = 'ol[id="prices"]';
let shopNames = [];
let shopPrices = {};
let shopRatingsObj = {};
let aboutToRun=false;
let topOffset = 0;
let commonShopsObj = {};
let addToCartTries = 4;
let currentAddTry = 0;
let allShopsSaved=false;

if(localStorage.skroutzMasterCart===undefined)
    localStorage.skroutzMasterCart = [];


let resizeUpdate;
window.onresize = function(){
    clearTimeout(resizeUpdate);
    resizeUpdate = setTimeout(updateButtons, 200);
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse("Got the message!");
        if (request.method == "skroutzRefreshed2") {
			pr("Skroutz common shops extension was refreshed!");
            setTimeout(()=>{updateButtons();}, 500);
            setTimeout(()=>{updateButtons();}, 1000);
        } 
    }
);  

document.addEventListener('visibilitychange', function(){
    if(document.visibilityState==='visible'){
        //update buttons
        updateButtons();
    }
});

addButtons();

function updateButtons(){
    pr("Updating buttons...");
    removeButtons();
    addButtons();
}


function addButtons(){
    //if page is not a product page, exit
    if(!getProductName())
        return

    pr("Adding buttons...");
    let addButton = document.createElement("button");
    addButton.innerText = "Προσθήκη";
    addButton.addEventListener("click", ()=>{currentAddTry = 0;shopNames.length=0;expandShops();addToCart();updateButtons();});
    addButton.title = 'Πρόσθεσε αυτό το προϊόν στο καλάθι';
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Αφαίρεση";
    deleteButton.addEventListener("click", ()=>{removeFromCart();updateButtons();});
    deleteButton.title = 'Διέγραψε αυτό το προϊόν από το καλάθι';
    let viewButton = document.createElement("button");
    viewButton.innerText = "Προβολή";
    viewButton.addEventListener("click", ()=>{viewCommonShops();updateButtons();});
    viewButton.title = 'Δες ποια καταστήματα έχουν όλα τα προϊόντα που πρόσθεσες στο καλάθι';
    let clearButton = document.createElement("button");
    clearButton.innerText = "Εκκαθάριση";
    clearButton.addEventListener("click", ()=>{resetCart();updateButtons();});
    clearButton.title = 'Σβήσε όλα τα προϊόντα που έχεις στο καλάθι';
    let totalProducts = document.createElement("button");
    totalProducts.id = 'totalproducts';
    totalProducts.innerText = "🛒: 0";
    totalProducts.addEventListener("click", ()=>{createProductTable();})
    totalProducts.title = "Το σύνολο των προϊόντων που έχεις στο καλάθι αυτή τη στιγμή";
    let donation = document.createElement("button");
    donation.innerText = "☕";
    donation.style.fontSize = '1.2em';
    donation.style.verticalAlign = "middle";
    // donation.innerText = "🍵";
    donation.addEventListener("click",()=>{donate()});
    donation.title = "Αν σου άρεσε αυτό το δωρεάν extension, μπορείς να μου κάνεις μια δωρεά";

    [addButton, deleteButton, viewButton, clearButton, totalProducts, donation].forEach(i=>{
        i.classList.add('masterCartButtons');
        i.style.boxShadow = '10px 10px 15px #00000066';
        i.style.position = 'fixed';
        i.style.zIndex = '170';
        i.style.width = '100px';
        i.style.padding = '10px';
        i.style.borderRadius = '10px';
        i.style.color = 'black';
        i.style.background = 'white';
        // i.style.margin = '10px';
        i.style.border = '1px solid';
        document.body.appendChild(i);
    });
    totalProducts.style.width = '';
    donation.style.width = '';
    donation.style.padding = '';
    donation.style.background = "#f68b24";

    let margin = 5;
    let startY = window.innerHeight;
    startY -= margin*5;

    //account for mobile phones to not cover the lowest price banner on bottom
    if(window.innerHeight>window.innerWidth)
        startY -= margin*10

    startY -= totalProducts.clientHeight;
    totalProducts.style.top=startY + "px";
    totalProducts.style.left=margin + 'px';
    donation.style.top=startY + "px";
    donation.style.left = margin + margin/2 + totalProducts.clientWidth + "px";
    donation.style.height = totalProducts.offsetHeight + "px";
    donation.style.width = clearButton.offsetWidth - totalProducts.offsetWidth - margin/2 + "px";
    // donation.style.width = 
    startY -= margin;
    startY -= clearButton.clientHeight;
    clearButton.style.top=startY + "px";
    clearButton.style.left=margin + 'px';
    startY -= margin;
    startY -= viewButton.clientHeight;
    viewButton.style.top=startY + "px";
    viewButton.style.left=margin + 'px';
    startY -= margin;
    startY -= deleteButton.clientHeight;
    addButton.style.top=startY + 'px';
    addButton.style.left=margin + 'px';
    deleteButton.style.top=startY + 'px';
    deleteButton.style.left=margin + 'px';

    //determin which button should be visible, depending on if the product is already in cart or not
    let mode = getProductState();
    if(mode===1){
        deleteButton.style.display = 'none';
    }else{
        addButton.style.display = 'none';
    }

    //set the counter in the cart div, bellow the buttons
    //also set the bg color of the button if >0 items in cart
    if(localStorage.skroutzMasterCart==="" || JSON.parse(localStorage.skroutzMasterCart)){
        let tempLength = 0;
        if(localStorage.skroutzMasterCart){
            tempLength = JSON.parse(localStorage.skroutzMasterCart).length;
        }
        totalProducts.innerText = `🛒: ${tempLength}`;
        if(tempLength>0){
            totalProducts.style.background = '#f68b24';
        }else{
            totalProducts.style.background = 'white';
        }
        if(tempLength>=2){
            // viewButton.style.borderColor = '#f68b24';
            // viewButton.style.borderWidth = '3px';
            viewButton.style.background = '#f68b24';
            viewButton.style.color = '#black';
        }
    }
}

function donate(){
    donatePopup();
}

function donatePopup(){
    pr("Creating donate popup...");

    document.querySelector('#donateButtonStyle')?.remove?.();

    let myPopup = createBanner();
    let myBG = document.querySelector('#mybg');
    if(myBG){
        myBG.addEventListener("click", ()=>{
            removeBanner();
        })
    }
    // myPopup.style.wordBreak = 'break-all';
    // myPopup.style.overflow = 'wrap';
    myPopup.style.fontSize = '1.8em';
    myPopup.style.padding = '20px';
    myPopup.style.lineHeight = '';
    myPopup.style.textAlign = 'left';
    myPopup.style.alignContent = 'center';
    // myPopup.style.overflow = 'auto';
    myPopup.innerText = "Ξόδεψα πολύ χρόνο και κόπο για τη δημιουργία αυτής της δωρεάν επέκτασης.\n\nΧωρίς διαφημίσεις και χωρίς περιορισμούς.\n\nΑν σου άρεσε και θέλεις να με υποστηρίξεις, μπορείς να το κάνεις με μια δωρεά.\n\nΘα ήθελες να μου κάνεις μια δωρεά;";
    let donateDiv = document.createElement('div');
    donateDiv.style.width = "100%";
    donateDiv.style.textAlign = 'center';
    donateDiv.style.verticalAlign = 'center';
    let donateButton = document.createElement('button');
    donateButton.id = 'donateButton';
    donateButton.innerText = "Πολύ ευχαρίστως!";
    donateButton.addEventListener("click",()=>{
        removeBanner();
        myPopup = createBanner();
        myPopup.innerHTML = 'Ευχαριστώ πάρα πολύ!';
        setTimeout(()=>{
            removeBanner();
            window.open("https://www.paypal.com/donate/?hosted_button_id=BTK97P92ZF29U", "_blank");
        }, 1500);
    });
    let br = document.createElement('br');
    let br2 = document.createElement('br');
    myPopup.appendChild(br);
    myPopup.appendChild(br2);
    donateDiv.appendChild(donateButton);
    myPopup.appendChild(donateDiv);
    let myStyle = document.createElement('style');
    myStyle.id = 'donateButtonStyle';
    myStyle.innerHTML = `
    #donateButton {
        font-size: 1.5em;
        margin: auto;
        border-radius: 15px;
        border: none;
        padding: 10px;
        background: #ccccff;
        transition: all .5s;
    }
    #donateButton:hover {
        color: white;
        background: #0000aa;
        transition: all .5s;
    }
    `;
    document.head.appendChild(myStyle);
}

function donatePopup2(){
    pr("Creating donate2 popup...");

    document.querySelector('#donateButtonStyle')?.remove?.();

    let myDonationPopup = createBanner(true);
    let myBG = document.querySelector('#mydonationbg');
    if(myBG){
        myBG.addEventListener("click", ()=>{
            removeBanner(true);
        });
    }
    // myDonationPopup.style.wordBreak = 'break-all';
    // myDonationPopup.style.overflow = 'wrap';
    myDonationPopup.style.fontSize = '1.8em';
    myDonationPopup.style.padding = '20px';
    myDonationPopup.style.lineHeight = '';
    myDonationPopup.style.textAlign = 'left';
    myDonationPopup.style.alignContent = 'center';
    // myDonationPopup.style.overflow = 'auto';
    myDonationPopup.innerText = "Αυτή είναι μια νέα λειτουργία που μόλις πρόσθεσα!\n\nΈχω ξοδέψει πολύ χρόνο για να έχεις αυτήν την επέκταση εντελώς δωρεάν.\n\nΑν σου είναι χρήσιμη και θέλεις να με υποστηρίξεις, μπορείς να το κάνεις με μια μικρή δωρεά (π.χ. έναν καφέ).\n\nΘα ήθελες να μου κάνεις μια δωρεά;";
    let donateDiv = document.createElement('div');
    donateDiv.style.width = "100%";
    donateDiv.style.textAlign = 'center';
    donateDiv.style.verticalAlign = 'center';
    let donateButton = document.createElement('button');
    donateButton.id = 'donateButton';
    donateButton.innerText = "Πολύ ευχαρίστως!";
    donateButton.addEventListener("click",()=>{
        removeBanner(true);
        myDonationPopup = createBanner(true);
        myDonationPopup.innerHTML = 'Ευχαριστώ πάρα πολύ!';
        setTimeout(()=>{
            removeBanner(true);
            window.open("https://www.paypal.com/donate/?hosted_button_id=BTK97P92ZF29U", "_blank");
        }, 1500);
    });
    let br = document.createElement('br');
    let br2 = document.createElement('br');
    myDonationPopup.appendChild(br);
    myDonationPopup.appendChild(br2);
    donateDiv.appendChild(donateButton);
    myDonationPopup.appendChild(donateDiv);
    let myStyle = document.createElement('style');
    myStyle.id = 'donateButtonStyle';
    myStyle.innerHTML = `
    #donateButton {
        font-size: 1.5em;
        margin: auto;
        border-radius: 15px;
        border: none;
        padding: 10px;
        background: #ccccff;
        transition: all .5s;
    }
    #donateButton:hover {
        color: white;
        background: #0000aa;
        transition: all .5s;
    }
    `;
    document.head.appendChild(myStyle);
}

function createBanner(donation = false){
    pr("Creating banner...");

    if(donation){
        //if popup already exists, don't create it again
        if(document.querySelector('#mydonation'))
            return;
    }else{
        //if popup already exists, don't create it again
        if(document.querySelector('#mypopup'))
            return;
    }

    let myBG = document.createElement('div');
    if(donation){
        myBG.id = 'mydonationbg';
        myBG.style.zIndex = '4999948';
    }else{
        myBG.id = 'mybg';
        myBG.style.zIndex = '435';
    }
    myBG.style.position = 'fixed';
    myBG.style.padding = '0';
    myBG.style.margin = '0';
    myBG.style.top = '0';
    myBG.style.left = '0';
    myBG.style.width = '100%';
    myBG.style.height = '100%';
    myBG.style.background = '#00000099';//document.body.style.backgroundColor;

    document.body.appendChild(myBG);
    
    let myStyle = document.createElement("style");
    myStyle.innerHTML = `
    #mypopup, #mydonation{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        width: 80%;
        min-height: 20%;
        // max-height: 50%;
        // height: 50%;
        z-index: 4999940;
        box-shadow: 20px 20px 30px #00000066;
        border-radius: 10px;
        color: black;
        font-size: 2.3em;
        text-align: center;
        min-width: 440px;
        max-width: 750px;
        max-height: 80%;
    }
    #mydonation{
        z-index: 4999950;
    }
    `;
    document.head.appendChild(myStyle);
    let myPopup = document.createElement('div');
    if(donation)
        myPopup.id = "mydonation";
    else
        myPopup.id = "mypopup";

    //hide in order to set lineHeight first
    myPopup.style.display = 'none';
    
    myPopup.innerText = "Περίμενε...";
    document.body.appendChild(myPopup);
    
    myPopup.style.display = '';
    myPopup.style.lineHeight = myPopup.clientHeight + "px";
    return myPopup;
}

function removeBanner(donation = false){
    pr("Removing banner...");
    if(donation){
        document.querySelector('#mydonation')?.remove?.();
        document.querySelector('#mydonationbg')?.remove?.();
    }else{
        document.querySelector('#mypopup')?.remove?.();
        document.querySelector('#mybg')?.remove?.();
    }

}

function removeButtons(){
    pr("Removing buttons...");
    [...document.querySelectorAll('.masterCartButtons')]?.forEach?.(i=>i?.remove());
}

function getProductState(){
    //1===product not in cart
    //2===product is already in cart
    //Determins if current product is already in cart or not
    if(localStorage.skroutzMasterCart!=="" && localStorage.skroutzMasterCart && arrayColumn(JSON.parse?.(localStorage.skroutzMasterCart),0)?.includes(getProductName())){
        return 2;
    }else{
        return 1;
    }
}

function expandShops(){
    if(document.querySelector('div.cards-expanded')===null && document.querySelector('div.cards-show-more > button')!==null){
        document.querySelector('div.cards-show-more > button').click();
    }
}

function viewCommonShops(){
    pr("Viewing common shops...");
    let masterArray = [];
    commonShopsObj = {};
    shopPrices = {};
    let shopsAvailability = {};
    let shopsCarts = {};
    let shopProductLinks = [];
    if(localStorage.skroutzMasterCart==="" || !localStorage.skroutzMasterCart || JSON.parse(localStorage.skroutzMasterCart).length<2){
        alert("Αρχικά πρέπει να προσθέσεις τουλάχιστον δύο προϊόντα!\n\nΓια να ξεκινήσεις, πήγαινε σε ένα προϊόν και πάτα το κουμπί \"Προσθήκη\"!");
        return
    }
    masterArray = JSON.parse(localStorage.skroutzMasterCart);
    // console.table(masterArray);

    //for every product
    for(let i=0; i<masterArray.length; i++){

        //get an array of the shop names
        let productShops = arrayColumn(masterArray[i][1],0);

        //get an array of the shop prices
        let productPrices = arrayColumn(masterArray[i][1],1);

        //get an array of the shop availabilities
        let productAvailabilities = arrayColumn(masterArray[i][1],2);

        //get an array of the links of every shop
        let productLinks = arrayColumn(masterArray[i][1],3);

        //get an array of hasSkroutzCart of every shop
        let shopHasSkroutzCart = arrayColumn(masterArray[i][1],4);

        //get an array of hasExternalCart of every shop
        let shopHasExternalCart = arrayColumn(masterArray[i][1],5);



        if(productShops.length !== productPrices.length || productPrices.length !== productAvailabilities.length || productAvailabilities.length !== shopHasSkroutzCart.length || shopHasSkroutzCart.length !== shopHasExternalCart.length){
            alert("Κάτι πήγε στραβά!");
            return;
        }

        //for every shop of every product
        for(let k=0; k<productShops.length; k++){
            let currentShop = productShops[k];

            //for every product in cart, get its shops add 1 to its value each time it appears
            if(commonShopsObj[currentShop]!==undefined)
                commonShopsObj[currentShop]++;
            else
                commonShopsObj[currentShop] = 1;

            //create the sum price (price for all products)
            if(shopPrices[currentShop]!==undefined)
                shopPrices[currentShop]+=productPrices[k];
            else
                shopPrices[currentShop]=productPrices[k];
            // pr(shopPrices[currentShop]);

            //find availability for each shop
            if(shopsAvailability[currentShop]===undefined){
                shopsAvailability[currentShop] = productAvailabilities[k];
            }else if(shopsAvailability[currentShop]===true && productAvailabilities[k]===false){ //if it is true and current is false, false
                shopsAvailability[currentShop] = false;
            }

            //find hasSkroutzCart for each shop
            // if(shopsCarts[currentShop]===undefined){
                shopsCarts[currentShop] = [shopHasSkroutzCart[k], shopHasExternalCart[k]];
            // }else if(shopsCarts[currentShop]===true && shopHasSkroutzCart[k]===false){ //if it is true and current is false, false
            //     shopsCarts[currentShop] = false;
            // }


            //create array with product names and links for every shop. This way, for every shop we can get all the products and their links. So with shopProductLinks[nameOfShop].length we get the number of products of this shop, with shopProductLinks[nameOfShop][3][0] we get the name of the 4rth product, and with shopProductLinks[nameOfShop][3][1] we get the link of the 4rth product...
            if(shopProductLinks[currentShop]===undefined){
                shopProductLinks[currentShop] = [];
            }
            shopProductLinks[currentShop].push([masterArray[i][0], productLinks[k]]);

        }
    }

    //converting obj to array in order to sort it
    let commonShopsWithPricesArray = [];
    for (let shop in commonShopsObj) {
        commonShopsWithPricesArray.push([shop, commonShopsObj[shop], shopPrices[shop], shopsAvailability[shop], shopProductLinks[shop], shopsCarts[shop]]);
    }

    //get only shops with all products
	let shopsWithAllProducts = commonShopsWithPricesArray.filter(e => e[1] === masterArray.length);

    //sort them by price
    let shopsWithAllProductsSorted = shopsWithAllProducts.sort((a,b)=>{
        return a[2]-b[2];
    });

    if(shopsWithAllProductsSorted && shopsWithAllProductsSorted.length>0){
        createTable(shopsWithAllProductsSorted);
    }else{
        let pop = createBanner();
        pop.innerText = 'Δε βρέθηκαν κοινά καταστήματα!';
        document.querySelector('#mybg').addEventListener("click", ()=>{
            removeBanner();
        });
    }
}


function createProductTable(){  
    pr("Creating product table...");  
    if(localStorage.skroutzMasterCart==="" || !localStorage.skroutzMasterCart || JSON.parse(localStorage.skroutzMasterCart).length<1){
        alert("Αρχικά πρέπει να προσθέσεις τουλάχιστον ένα προϊόν!\n\nΓια να ξεκινήσεις, πήγαινε σε ένα προϊόν και πάτα το κουμπί \"Προσθήκη\"!");
        return
    }
    let myPopup = createBanner();


    masterArray = JSON.parse(localStorage.skroutzMasterCart);

    let table = document.createElement('table');
    table.classList.add('myTable');
    let thead = table.createTHead();
    let tbody = table.createTBody();

    // //Color odd/even rows differently
    // document.querySelector('style.tableStyling')?.remove?.(); //if the styling already exists, remove it
    // let myStyle = document.createElement('style');
    // myStyle.classList.add("tableStyling");
    // myStyle.innerHTML = `
    // table.myTable > tbody:nth-child(odd) {background: red}
    // `;
    // document.head.appendChild(myStyle);

    let headRow = thead.insertRow();
    headRow.style.height='2em';


    pr("Creating header...");
    //generate the head of the table ▲▼
    ["Προϊόν", "Καταστήματα", "Ενέργεια"].forEach(i=>{
        let th = document.createElement("th");
        th.style.verticalAlign = 'middle';
        th.style.textAlign = 'left';
        th.style.paddingLeft = '1em';
        th.style.paddingRight = '1em';
        th.style.fontWeight = 'bold';
        th.appendChild(document.createTextNode(i));
        headRow.appendChild(th);
    });

    pr("Creating body...");
    //generate the body of the table
    let coloredRow = false;
    masterArray.forEach(i=>{
        //color even/odd rows differently
        let row = tbody.insertRow();
        if(coloredRow)
            row.style.background = "#DDD";
        else
            row.style.background = "#FAFAFA";

        coloredRow=!coloredRow;
        let cell;
        let text;
        cell = row.insertCell();
        cell.style.textAlign = 'left';
        cell.style.paddingLeft = '1em';
        cell.style.paddingRight = '1em';
        text = document.createElement('a');
        text.innerText=i[0]; //name of product
        text.href=i[2]; //set link of product
        text.target = '_blank'; //open link in new tab
        text.title = "Πάτα για να πας στη σελίδα του προϊόντος";
        cell.appendChild(text);

        cell = row.insertCell();
        cell.style.textAlign = 'left';
        cell.style.paddingLeft = '1em';
        cell.style.paddingRight = '1em';
        text = document.createTextNode(`${i[1].length}`); //number of shops
        cell.appendChild(text);

        cell = row.insertCell();
        cell.style.textAlign = 'left';
        cell.style.paddingLeft = '1em';
        cell.style.paddingRight = '1em';
        del = document.createElement('button'); //action
        del.innerText = 'Αφαίρεση';
        del.style.background = '#aa0000';
        del.style.color = 'white';
        // del.style.marginTop = '0';
        del.style.display = 'block';
        // del.style.width = '100%';
        // del.style.height = '100%';
        del.style.borderRadius = '5px';
        (function(){
            let nameOfProd = i[0];
            del.addEventListener("click", ()=>{
                removeProductFromMasterArray(nameOfProd);
                removeProductFromTable(nameOfProd);
                updateButtons();
            });
        }())
        // cell.style.verticalAlign = 'middle';
        cell.appendChild(del);
    });

    pr("Adding style & adding to div");
    thead.style.borderBottom = '2px solid black';
    table.style.width = '100%';
    table.style.border = 'none';

    // let myPopup = document.querySelector('#mypopup');
    myPopup.innerText='';
    myPopup.style.lineHeight = '1.4';
    myPopup.style.overflow = 'auto';
    // myPopup.style.overflowX = 'auto';
    myPopup.style.fontSize = '1.5em';
    myPopup.appendChild(table);

    //how to exit
    document.querySelector('#mybg')?.addEventListener("click", ()=>{
        removeTable();
    });
}

function createTable(shopsArray){
    //getting shop ratings from local storage
    if(localStorage.skroutzShopRatings!=="" && localStorage.skroutzShopRatings){
        shopRatingsObj = JSON.parse(localStorage.skroutzShopRatings);
    }

    pr(`shopRatingsObj: ${shopRatingsObj}`);

    let myPopup = createBanner();
    pr("Creating filters...");
    //generate the filters above the table
    let tableFilters = document.createElement('div');
    tableFilters.style.marginTop = '10px';
    tableFilters.style.marginBottom = '0px';
    tableFilters.style.paddingBottom = '0px';
    tableFilters.appendChild(document.createTextNode('Εμφάνισε: '));
    let filterButtonAll = document.createElement('button');
        filterButtonAll.appendChild(document.createTextNode('Όλα'));
        tableFilters.appendChild(filterButtonAll); 
        styleFilterButton(filterButtonAll);
        filterButtonAll.addEventListener("click", ()=>{
            localStorage.setItem("activateShopFilter", 1);activateShopFilter(true);
        });
    let filterButtonSkroutzOnly = document.createElement('button');
        filterButtonSkroutzOnly.appendChild(document.createTextNode('Καλάθι του Skroutz'));
        tableFilters.appendChild(filterButtonSkroutzOnly); 
        styleFilterButton(filterButtonSkroutzOnly);
        filterButtonSkroutzOnly.addEventListener("click", ()=>{
            localStorage.setItem("activateShopFilter", 2);activateShopFilter(true);
        });
    let filterButtonNotSkroutz = document.createElement('button');
        filterButtonNotSkroutz.appendChild(document.createTextNode('Εξωτερικά Καταστήματα'));
        tableFilters.appendChild(filterButtonNotSkroutz); 
        styleFilterButton(filterButtonNotSkroutz);
        filterButtonNotSkroutz.addEventListener("click", ()=>{
            localStorage.setItem("activateShopFilter", 3);activateShopFilter(true);
        });
    
    if(localStorage.activateShopFilter===undefined)
        localStorage.setItem("activateShopFilter", 1);

    tableFilters.appendChild(document.createElement('hr')); 

    pr("Creating table...");
    let table = document.createElement('table');
    table.classList.add('commonShopsTable');
    table.style.marginTop = "0px";
    table.style.paddingTop = "0px";
    table.classList.add('myTable');
    let thead = table.createTHead();
    let tbody = table.createTBody();

    let headRow = thead.insertRow();
    headRow.style.height='2em';

    pr("Creating header...");
    //generate the head of the table ▲▼
    ["Κατάστημα", "Τιμή ▲", "Βαθμολογία"].forEach(i=>{
        let th = document.createElement("th");
        th.style.verticalAlign = 'middle';
        th.style.textAlign = 'left';
        th.style.paddingLeft = '1em';
        th.style.paddingRight = '1em';
        th.style.fontWeight = 'bold';
        th.appendChild(document.createTextNode(i));
        headRow.appendChild(th);
    });

    pr("Creating body...");
    let coloredRow=false;
    //generate the body of the table
    shopsArray.forEach(i=>{
        //color even/odd rows differently
        let row = tbody.insertRow();
        if(coloredRow)
            row.style.background = "#CCC";
        else
            row.style.background = "#FAFAFA";

        coloredRow=!coloredRow;
        let cell;
        let text;
        cell = row.insertCell();
        cell.style.textAlign = 'left';
        cell.style.paddingLeft = '1em';
        cell.style.paddingRight = '1em';
        let availSpan;
        availSpan = document.createElement('span');
        availSpan.innerText = '•';
        availSpan.title = "Σύμφωνα με το skroutz.gr, το συγκεκριμένο κατάστημα έχει σε stock όλα τα προϊόντα σου";
        availSpan.style.color = '#50b64a';
        if(i[3]){
            cell.appendChild(availSpan);
        }else{
            let notAvail = document.createTextNode('\xa0');
            cell.appendChild(notAvail);
        }
        // text = document.createTextNode(i[0]); //name of shop
        text = document.createElement('a');
        text.innerText = i[0]; //name of shop
        text.style.cursor = 'pointer';
        text.title = "Πάτα για να ανοίξεις όλα τα προϊόντα στο κατάστημα " + i[0];
        //i[4][0][1]; //link of first product of  this shop
        (function(){
            let shopLinks=i[4];
            text.addEventListener("click", ()=>{
                // console.clear();
                shopLinks.forEach(l=>{
                    window.open(l[1], "_blank");
                    // console.log(l[1]);
                });
            });
        }());

        // console.table(i[4]);
        cell.appendChild(text);

        cell = row.insertCell();
        cell.style.textAlign = 'left';
        cell.style.paddingLeft = '1em';
        text = document.createTextNode(`${fixNumber(i[2])}€`); //price of shop
        cell.appendChild(text);

        if(i[5][0]){ //if current shop supports skroutz cart
            cell.classList.add("sc");
        }

        if(i[5][1]) //if current shop supports external cart
            cell.classList.add("ec");

        cell = row.insertCell();
        cell.style.textAlign = 'left';
        cell.style.paddingLeft = '1em';
        // <a href="${shopRatingsObj[i[0]][2]}"></a>
        text = document.createTextNode(`${parseFloat(shopRatingsObj[i[0]][0]).toFixed(1)}⭐(`);
        let ratingLink = document.createElement('a');
        ratingLink.href = shopRatingsObj[i[0]][2];
        ratingLink.title = "View user ratings";
        ratingLink.target = '_blank'
        let text2 = document.createTextNode(`${shopRatingsObj[i[0]][1]}`);
        let text3 = document.createTextNode(`)`); //rating of shop
        cell.appendChild(text);
        if(ratingLink.href!==""){
            ratingLink.appendChild(text2);
            cell.appendChild(ratingLink);
        }else{
            cell.appendChild(text2);
        }
        cell.appendChild(text3);
    });

    pr("Adding style & adding to div");
    thead.style.borderBottom = '2px solid black';
    table.style.width = '100%';
    table.style.border = 'none';

    // let myPopup = document.querySelector('#mypopup');
    myPopup.innerText='';
    myPopup.style.lineHeight = '1.4';
    myPopup.style.overflow = 'auto';
    // myPopup.style.overflowX = 'auto';
    myPopup.style.fontSize = '1.5em';
    myPopup.appendChild(tableFilters);
    activateShopFilter();
    myPopup.appendChild(table);

    activateShopFilter();
    

    //how to exit
    document.querySelector('#mybg')?.addEventListener("click", ()=>{
        removeTable();
    });
}

function removeTable(){
    document.querySelector('table.myTable')?.remove?.();
    removeBanner();
}

function removeProductFromMasterArray(nameOfProd){
    if(localStorage.skroutzMasterCart==="" || !localStorage.skroutzMasterCart || JSON.parse(localStorage.skroutzMasterCart).length<1){
        alert("Σφάλμα!");
        return;
    }
    masterArray = JSON.parse(localStorage.skroutzMasterCart);
	let filteredArr = masterArray.filter(i => {
        if(i[0]===nameOfProd)
		    return false;
        else
            return true;
	});
    localStorage.skroutzMasterCart = JSON.stringify(filteredArr);
}

function removeProductFromTable(nameOfProd){
    //for every row/product
    let names = document.querySelectorAll('table.myTable > tbody > tr');
    [...names].forEach(i=>{
        let currentName = i.querySelector('td')?.textContent; //get the name of the product
        if(currentName && currentName===nameOfProd){
            i?.remove?.();
        }
    });
    if(!document.querySelector('table.myTable > tbody > tr')){
        removeTable();
    }else{
        setTableRowStyling(); //because we removed row(s) from the table, the styling (even/odds differentiation) will be wrong. So we have to re-do it
    }
}

function setTableRowStyling(){
    pr("Setting table styling...");
    let rows = document.querySelectorAll("table.myTable > tbody > tr");
    let coloredRow = false;
    [...rows].forEach((i)=>{
        if(coloredRow)
            i.style.background = "#CCC";
        else
            i.style.background = "#FAFAFA";

        coloredRow=!coloredRow;
    });
}

function getShopRatingAndCount(sh){
    let count = sh?.querySelector('div.rating-with-count > a > div > div.actual-rating')?.textContent;
    let stars = sh?.querySelector('div.rating-with-count > a > div > span')?.textContent;
    let link = sh?.querySelector('div.rating-with-count > a')?.href;
    if(!count)
        count = '?';
    if(!stars)
        stars = '?';
    if(!link)
        link = "";
    return [stars,count,link];
}

function addToCart(){
    pr("Adding product to cart...");
    try{
        if(getProductState()===2){
            alert("This item is already in your cart!");
            return
        }
        currentAddTry++;

        //Check if no shops have this product
        if(!getShopCount()){
            removeBanner();
            alert("Product is not available!");
            return;
        }

        createBanner();
        if(document.querySelector(slcList)?.children){
            bindShops();
            findShops();
            topOffset = window.scrollY;
            scroll(0,document.body.scrollHeight);
            scroll(0,0);
            let firstShop = document.querySelector('#prices')?.children?.[0];
            if(firstShop)
                firstShop.scrollIntoView();
            setTimeout(()=>{
                scrollToNextSibling(firstShop);
            }, 200);
        }else{
            pr("No shops found!");
        }
    }catch(e){
        console.log(e);
    }
}


function bindShops(){
    let olList = document.querySelector(slcList);
    unBindShops();

    var observer = new MutationObserver(function () {
        if(!aboutToRun){
            aboutToRun=true;
            setTimeout(()=>{
                findShops();
                aboutToRun=false;
            }, 400);
        }
    });
    observer.observe(olList, { childList: true });

    // $(olList).bind('DOMNodeInserted', function(event){
    //     if(!aboutToRun){
    //         aboutToRun=true;
    //         setTimeout(()=>{
    //             findShops();
    //             aboutToRun=false;
    //         }, 400);
    //     }
    // });
}

function findShops(){
    if(localStorage.skroutzShopRatings!=="" && localStorage.skroutzShopRatings){
        shopRatingsObj = JSON.parse(localStorage.skroutzShopRatings);
        // console.table(shopRatingsObj);
    }
    [...document.querySelector(slcList)?.children].forEach(i=>{
        let shopName = i.querySelector(".shop-name")?.textContent?.trim();
        let rating = getShopRatingAndCount(i);
        let availability = (i.querySelector('span[class="availability instock"]')!==null || i.querySelector('i.express-icon')!==null);
        let link = i.querySelector('div.item > h3 > a')?.href;
        let hasSkroutzCart = i.querySelector('button.add-to-cart-btn.btn-green')!==null;
        let hasExternalCart = i.querySelector('a.btn-blue.redirection-btn')!==null;

        //save all shop names
        if(shopName && !arrayColumn(shopNames,0).includes(shopName) && shopName!==""){
            // pr(`shopName: ${shopName}`);
            shopNames.push([shopName, getPriceOf(i), availability, link, hasSkroutzCart, hasExternalCart]);
        }

        //save the rating of every shop
        shopRatingsObj[shopName] = rating;
            
    });
    localStorage.skroutzShopRatings = JSON.stringify(shopRatingsObj);
}

function scrollToNextSibling(shop){
    expandShops();
    if(shopNames.length===getShopCount()){
        allShopsSaved=true; //we are already finished! Dont search for any more shops
    }
    if(shopNames.length>getShopCount()){
        alert("Error!!!");
    }

    let next = shop.nextElementSibling;
    // let next = shop?.parentNode?.children?.[shop?.parentNode?.children?.length-1];
    if(next && !allShopsSaved){
        // pr("Scrolled to next shop");
        next.scrollIntoView();
        setTimeout(()=>{
            scrollToNextSibling(next);
        }, 30);
    }else{
        pr("No more shops were found!");
        // pr(`shopNames: ${shopNames}`);
        // pr(`shopNames.length: ${shopNames.length}`);
        unBindShops();
        scrollTo(0, topOffset);
        if(shopNames.length<getShopCount() && addToCartTries>currentAddTry){
            pr(`Found ${shopNames.length} shops out of ${getShopCount()}... Trying again(${currentAddTry}/${addToCartTries})...`);
            addToCart();
            return
        }
        if(shopNames.length===0 && addToCartTries>currentAddTry){
            console.log("No shops found, trying again...");
            addToCart();
            return;
        }else if(shopNames.length===0){
            alert("Σφάλμα! Δε βρέθηκε κανένα κατάστημα!");
            removeBanner();
            return;
        }
        currentAddTry=0;
        removeBanner();
        pr(`Βρέθηκαν ${shopNames.length} καταστήματα!`);

        let finalArray = [getProductName(), shopNames, getProductUrl()];
        //Get masterArray from localStorage
        let masterArray = [];
        if(localStorage.skroutzMasterCart){
            masterArray = JSON.parse(localStorage.skroutzMasterCart);
        }
        //masterArray.push(finalArray);
        masterArray.push(finalArray);
        // pr(masterArray);
        //save/update masterArray to localStorage
        localStorage.skroutzMasterCart = JSON.stringify(masterArray);
        shopNames.length=0;
        updateButtons();
        allShopsSaved=false;
        // pr("resetting shopNames!");
    }
}

function removeFromCart(){
    pr("Removing product from cart...");
    if(!arrayColumn?.(JSON.parse?.(localStorage?.skroutzMasterCart),0)?.includes?.(getProductName())){
        alert("This item is not in your cart!");
        return
    }
    let masterArray = [];
    if(localStorage.skroutzMasterCart){
        masterArray = JSON.parse(localStorage.skroutzMasterCart);
        let listOfProductNames = arrayColumn(masterArray, 0);
        if(listOfProductNames.includes(getProductName())){
            let indexToRemove = listOfProductNames.indexOf(getProductName());
            let newMasterArray = [];
            for(k=0; k<masterArray.length; k++){
                if(k!==indexToRemove){
                    newMasterArray.push(masterArray[k]);
                }
            }
            //save/update masterArray to localStorage
            localStorage.skroutzMasterCart = JSON.stringify(newMasterArray);
            pr("Product was successfully removed from cart!");
        }
    }
}

function resetCart(){
    pr("Reseting cart...");
    if(localStorage.skroutzMasterCart!=="" && localStorage.skroutzMasterCart && JSON.parse(localStorage.skroutzMasterCart).length>0){
        if(!window.confirm("Σίγουρα θες να διαγράψεις όλα τα προϊόντα απ' το καλάθι;"))
            return
    }

    localStorage.removeItem("skroutzMasterCart");
    //reseting shop ratings obj
    localStorage.removeItem("skroutzShopRatings");
}

function pr(s){
    //console.log(s);
}

function getPriceOf(p){
    let tempPrice = parseFloat?.(p?.querySelector('.dominant-price')?.textContent?.trim?.()?.replace(".","")?.replace(",", ".")?.match(/^[.\d]+/)?.[0]);
    return fixNumber(tempPrice);
}

function unBindShops(){
    let olList = document.querySelector(slcList);
    $(olList).unbind();
}

function getProductName(){
    return document.querySelector('div.sku-title > h1.page-title')?.textContent?.trim();
}

function getProductUrl(){
    return document.querySelector('meta[itemprop="url"]')?.getAttribute?.("content");
}

function arrayColumn(arr, n){
    return arr.map(x => x[n]);
}

function fixNumber(num){
    return Math.round(num*100)/100;
}

function styleFilterButton(btn, bgColor = 'white', textColor = 'black', width = '100px'){
    btn.classList.add('skroutzFilterButton');
    btn.style.boxShadow = '2px 2px 2px #00000066';
    // btn.style.position = 'fixed';
    btn.style.zIndex = '170';
    // btn.style.width = '100px';
    btn.style.padding = '10px';
    btn.style.borderRadius = '10px';
    btn.style.color = textColor;
    btn.style.background = bgColor;
    btn.style.fontSize = '.8em';
    // btn.style.marginBottom = '100px';
    btn.style.marginLeft = '10px';
    // btn.style.margin = '10px';
    btn.style.border = '1px solid';
    // btn.style.whiteSpace = 'nowrap'; 
}

//reset first time donation
// localStorage.removeItem("firstTimeFiltering");

function activateShopFilter(userClicked = false){
    //check if its the first time filtering...
    if(userClicked && localStorage.firstTimeFiltering===undefined){
        localStorage.setItem("firstTimeFiltering", "false");
        donatePopup2();
    }

    let filterButtons = document.querySelectorAll('button.skroutzFilterButton');
    let counter = 0;
    [...filterButtons].forEach(i=>{
        if(counter===parseInt(localStorage.activateShopFilter-1)){
            i.style.background = "#f68b24";
        }else{
            i.style.background = 'white';
        }
        counter++;
    });
    filterTable();
    alternateRowColor();
}

function filterTable(){
    removeFilters(); //restores hidden rows
    let currentFilter = parseInt(localStorage.activateShopFilter);
    if(currentFilter===1)
        return;
    let rows = document.querySelectorAll('table.commonShopsTable > tbody > tr');
    [...rows].forEach(i=>{
        //if skroutzcart selector doesn't exist and localStorage.activateShopFilter===2 then hide
        //if externalCart selector doesn't exist and localStorage.activateShopFilter===3 then hide
        if(parseInt(localStorage.activateShopFilter)===2 && i.querySelector('td.sc')===null){
            i.classList.add('filterOutShop');
        }

        if(parseInt(localStorage.activateShopFilter)===3 && i.querySelector('td.ec')===null){
            i.classList.add('filterOutShop');
        }
    });
}

function alternateRowColor(){
    let rows = document.querySelectorAll('table.commonShopsTable > tbody > tr:not(.filterOutShop)');
    let counter = 0;
    [...rows].forEach(i=>{
        if(counter%2===0){
            i.style.background = '#FAFAFA';
        }else{
            i.style.background = '#DDD';
        }
        counter++;
    });
}

function removeFilters(){
    let filteredRows = document.querySelectorAll('table.commonShopsTable > tbody > tr.filterOutShop');
    [...filteredRows].forEach(i=>{
        i.classList.remove("filterOutShop");
    });
}

function getShopCount(){
    // return parseInt?.(document.querySelector('span[itemprop="offerCount"]')?.textContent?.trim?.()); 0.93
    return parseInt?.(document.querySelector('a[href="#shops"] > span > span')?.textContent?.trim?.());
}