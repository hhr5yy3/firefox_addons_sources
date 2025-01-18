let csRows = [];

function injectChartJs() {
    const script = document.createElement('script');
    script.src = browser.runtime.getURL('chart.js'); 
    script.onload = function() {
        initLoad();
    };
    document.head.appendChild(script);

}


function insertStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        /* General Container Styles */
        #myDiv {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            position: relative;  /* Make sure the overlay positions correctly inside this container */
            background-color: #0d141c; /* Darker background for the container */
            border-radius: 8px; /* Rounded corners for the main container */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
        }

        /* Header Bar Styling */
        .header-bar {
            display: flex;
            justify-content: space-between;  /* Space between left and right sections */
            align-items: center;             /* Vertically center the content */
            padding: 10px 20px;
            background-color: #2a333f;  /* Darker background for header */
            border-bottom: 2px solid #444d56; /* Slightly lighter border */
            border-radius: 8px 8px 0 0; /* Rounded top corners */
            color: #e1e1e1;  /* Light text for better readability */
        }

        /* Button Container for Left Buttons */
        .button-container {
            display: flex;
            gap: 10px;  /* Space between buttons */
        }

        /* Button Styling */
        .header-button {
            padding: 8px 16px;
            font-size: 16px;
            background-color: #3b4d63;  /* Dark blue background */
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease; /* Smooth transition on hover */
        }

        .header-button:hover {
            background-color: #5e7586;  /* Slightly lighter blue on hover */
        }

        /* Fetch Data Button Styling (aligned to the right) */
        .fetch-data-button {
            padding: 8px 16px;
            font-size: 16px;
            background-color: #2a9d8f;  /* Green background */
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s ease; /* Smooth transition on hover */
        }

        .fetch-data-button:hover {
            background-color: #23867c;  /* Darker green on hover */
        }

        /* Content Container Styling */
        .content-container {
            display: flex;
            margin-top: 20px;
        }

        /* Left Column for Additional Data */
        .left-column {
            flex: 1;  /* Takes up available space */
            padding: 20px;
            background-color: #2c3e50;  /* Dark gray background */
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin-right: 20px;
            color: #ecf0f1;  /* Light text for better readability */
        }

        /* Right Column for Chart */
        .right-column {
            flex: 1.5;
            padding: 20px;
            background-color: #2c3e50;  /* Dark gray background */
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            color: #ecf0f1;  /* Light text for better readability */
        }

        /* Chart Styling */
        #myChart {
            width: 100%;
            height: 300px;
            border-radius: 8px; /* Rounded corners for the chart */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for the chart */
        }

        /* Loading Overlay Styles */
        #loadingOverlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7); /* Darker, less intense overlay */
            display: flex;
            flex-direction: column; /* Stack spinner and message vertically */
            justify-content: center; /* Center content vertically */
            align-items: center; /* Center content horizontally */
            z-index: 1000; /* Ensure it appears on top */
            visibility: hidden;  /* Hide by default */
            border-radius: 8px; /* Rounded corners for the overlay */
        }

        /* When the 'show' class is added, make the overlay visible */
        #loadingOverlay.show {
            visibility: visible;  /* Show the overlay when the class is added */
        }

        /* Spinner Styling */
        .spinner {
            border: 4px solid #f3f3f3;  /* Light gray spinner background */
            border-top: 4px solid #3498db; /* Blue spinner */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }

        /* Animation for Spinner */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Loading Message Styling */
        .loading-message {
            font-size: 18px;
            color: #ecf0f1;  /* Light text color */
            margin-top: 15px;
            text-align: center;
        }
        /* Footer Section Styling */
        .footer-section {
            display: flex;
            flex-direction: column;  /* Stack the header and images vertically */
            margin-top: 20px;
            padding: 20px;
            background-color: #2c3e50; /* Dark background like content area */
            border-radius: 8px;  /* Rounded corners */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* Light shadow */
            color: #ecf0f1; /* Light text color */
            position: relative; /* Position relative to align header */
            overflow: hidden; /* Ensures overflow content is hidden initially */
        }

        /* Footer header styling (title) */
        .footer-section h3 {
            font-size: 18px;
            font-weight: bold;
            color: #ecf0f1; /* Light color for readability */
            margin: 0;
            padding-bottom: 10px; /* Space between header and images */
        }

        /* Image container for dynamic images */
        .image-container {
            display: flex;  /* Horizontal layout for images */
            gap: 10px;  /* Space between images */
            flex-wrap: nowrap;  /* Prevent images from wrapping to the next line */
            overflow-x: auto; /* Horizontal scrolling if content overflows */
            padding-bottom: 10px; /* Padding for potential scrollbar */
            margin-top: 10px; /* Space between header and images */
            max-height: 256px;  /* Optional: Limit height to avoid excessive overflow */
            width: 100%; /* Make sure the container takes up the full width */
        }

        /* Image Styling inside the Footer */
        .image-container img {
            width: 64px;
            height: 64px;
            border-radius: 2px;  /* Rounded corners for a clean look */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* Light shadow on images */
            border: 1px solid #FFD700; /* Gold border for the images */
        }
    `;
    document.head.appendChild(style);
}

function insertDiv() {
    insertStyles();
    const targetRow = document.querySelector('.inventory_history_pagingrow');
    const newDiv = document.createElement("div");
    const builtDiv = `
    <div id="myDiv" class="tradehistoryrow">
        <div class="header-bar">
            <!-- Button Container (for Left Buttons) -->
            <div class="button-container">
                <button id="casesButton" class="header-button">Cases</button>
                <button id="souvenirButton" class="header-button">Souvenir Packages</button>
                <button id="anubisButton" class="header-button">Anubis</button>
                <button id="armoryButton" class="header-button">Armory Pass</button>
            </div>

            <!-- Fetch Data Button (aligned to the right) -->
            <button id="fetchDataButton" class="fetch-data-button">Fetch Data</button>
        </div>

        <div class="content-container">
            <div class="left-column" id="extraData">
                <h3>Additional Data</h3>
            </div>
            <div class="right-column">
                <h3></h3>
                <canvas id="myChart"></canvas>
            </div>
        </div>

        <!-- Loading Overlay (within the #myDiv) -->
        <div id="loadingOverlay">
            <div class="spinner"></div>
            <div class="loading-message" id="loadingMessage">Loading Data...</div>
        </div>
    </div>`;

    newDiv.innerHTML = builtDiv;

    if (targetRow) {
        targetRow.parentNode.insertBefore(newDiv, targetRow);
    } else {
        console.log('Target row not found.');
    }

    const fetchDataButton = document.getElementById("fetchDataButton");
    fetchDataButton.addEventListener("click", function() {
        toggleLoadingOverlay(true);
        fetchData();
        toggleLoadingOverlay(false);
    });

    const casesButton = document.getElementById("casesButton");
    casesButton.addEventListener("click", function() {
        toggleLoadingOverlay(true);
        fetchAndDisplayCaseData();
        toggleLoadingOverlay(false);
    });

    const souvenirButton = document.getElementById("souvenirButton");
    souvenirButton.addEventListener("click", function() {
        toggleLoadingOverlay(true);
        removeGoldsFooter();
        fetchAndDisplaySouvenirData();
        toggleLoadingOverlay(false);
    });  

    const anubisButton = document.getElementById("anubisButton");
    anubisButton.addEventListener("click", function() {
        toggleLoadingOverlay(true);
        removeGoldsFooter();
        fetchAndDisplayAnubisData();
        toggleLoadingOverlay(false);
    })

    const armoryButton = document.getElementById("armoryButton");
    armoryButton.addEventListener("click", function() {
        toggleLoadingOverlay(true);
        removeGoldsFooter();
        fetchAndDisplayArmoryData()
        toggleLoadingOverlay(false);
    });
}

function insertGoldsFooter(golds) {
    const myDiv = document.getElementById('myDiv');
    const contentContainer = myDiv.querySelector('.content-container');

    if (!document.getElementById('footerSection')) {

        const footerDiv = document.createElement('div');
        footerDiv.id = 'footerSection';
        footerDiv.className = 'footer-section';

        footerDiv.innerHTML = `
            <h3>Opened Golds</h3>
            <div class="image-container" id="imageContainer">
                <!-- Images will be dynamically inserted here -->
            </div>
        `;

        contentContainer.insertAdjacentElement('afterend', footerDiv);
        //testImg = ['Stuff', '2024-11-12', 'https://community.fastly.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJfwOP3dDNF5dKzq4SChePtDLfYkWNFppcn3O3H94mijgfh-UA5YWnzLICReg4-N1uB-lG6yerugJG-v57NynN9-n51rKiOfMw/120x40']

        if (golds.length !== 0){
            addImages(golds);
        }
    }
}


function removeGoldsFooter() {
    const footerSection = document.getElementById('footerSection');
    
    if (footerSection) {
        footerSection.remove();  
    }
}

function addImages(imageData) {
    const imageContainer = document.getElementById('imageContainer');

    imageData.forEach(data => {
        const [name, date, imageUrl] = data;


        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');


        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = name;
        img.classList.add('tooltip-image');

        const tooltipText = `${name}, ${date}`;

        img.setAttribute('title', tooltipText);

        imageWrapper.appendChild(img);

        imageContainer.appendChild(imageWrapper);
    });
}

// Toggle visibility of the loading overlay inside #myDiv
function toggleLoadingOverlay(show) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (show) {
        loadingOverlay.classList.add("show");
    } else {
        loadingOverlay.classList.remove("show");
    }
    return;
}


function injectChartCreationScript(chartData) {
    // Check if the script is already present
    const existingScript = document.getElementById('chartCreationScript');
    if (existingScript) {
        // Remove the existing script if it's found
        existingScript.remove();
    }

    // Create the new script content
    const chartCreationScript = `
        (function() {
            const canvas = document.getElementById('myChart');
            if (!canvas) {
                console.error('Canvas element with id "myChart" not found.');
                return;
            }

            // Ensure any previous chart is destroyed
            if (canvas && Chart.getChart(canvas)) {
                const existingChart = Chart.getChart(canvas); // Get the existing chart instance
                existingChart.destroy();  // Destroy the existing chart
            }

            // Clear any residual drawing or state from the canvas (Reset canvas)
            canvas.width = canvas.width; // Reset the canvas by clearing it

            const labels = ${JSON.stringify(chartData.labels)};
            const values = ${JSON.stringify(chartData.values)};
            const colors = ${JSON.stringify(chartData.colors)};
            const percentages = ${JSON.stringify(chartData.percentages)};

            const chartDataConfig = {
                labels: labels,
                datasets: [{
                    label: 'Rarity Distribution',
                    data: values,
                    backgroundColor: colors,
                    borderColor: colors.map(color => darkenColor(color)),
                    borderWidth: 1
                }]
            };

            const config = {
                type: 'bar',
                data: chartDataConfig,
                options: {
                    responsive: true,
                    scales: {
                        x: { 
                            beginAtZero: true,
                            grid: {
                                display: false  // Remove gridlines from the x-axis
                            },
                            ticks: {
                                color: '#d1d1d1'
                            },
                            borderColor: 'transparent',
                            borderWidth: 0
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                display: false  // Remove y-axis numbering
                            },
                            grid: {
                                display: false  // Remove gridlines from the y-axis
                            },
                            borderColor: 'transparent',
                            borderWidth: 0
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        intersect: false
                    },
                    animation: {
                        duration: 400,
                        easing: 'easeOutQuad'
                    },
                    plugins: {
                        legend: {
                            display: false  // Remove the legend (data toggles)
                        },
                        tooltip: {
                            enabled: true,
                            mode: 'index',
                            position: 'average',
                            callbacks: {
                                label: function(tooltipItem) {
                                    const index = tooltipItem.dataIndex;
                                    const percentage = percentages[index];
                                    return \`\${tooltipItem.label}: \${tooltipItem.raw} (\${percentage}%)\`;
                                }
                            }
                        }
                    }
                }
            };

            new Chart(canvas, config);

            function darkenColor(color) {
                const hex = color.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);

                const darken = (value) => Math.max(0, Math.floor(value * 0.8));
                const darkenedR = darken(r);
                const darkenedG = darken(g);
                const darkenedB = darken(b);

                return \`#\${darkenedR.toString(16).padStart(2, '0')}\${darkenedG.toString(16).padStart(2, '0')}\${darkenedB.toString(16).padStart(2, '0')}\`;
            }
        })();
    `;

    const script = document.createElement('script');
    script.id = 'chartCreationScript';
    script.textContent = chartCreationScript;

    document.head.appendChild(script);
}


//PREP BAR CHART DATA TO BE PUMPED INTO CHART.JS

function prepareBarChartData(collectionData) {
    const rarityDistribution = {};
    const colors = [];
    const percentages = [];
    const rarityColors = {
        "Consumer": "#afafaf", // White
        "Industrial": "#6496e1", // Light Blue
        "Mil-spec": "#4b69cd", // Blue
        "Restricted": "#8847ff", // Purple
        "Classified": "#d32ce6", // Pink
        "Covert": "#eb4b4b", // Red
        "Contraband": "#886a08", // Orange
        "Exceedingly Rare": "#FFD700" // Gold
    };

    // Calculate the rarity counts and colors for each rarity
    let totalCases = 0;
    for (const rarity in collectionData) {
        rarityDistribution[rarity] = collectionData[rarity];
        totalCases += collectionData[rarity];
    }

    // Calculate the percentage for each rarity
    for (const rarity in collectionData) {
        const count = collectionData[rarity];
        const percentage = ((count / totalCases) * 100).toFixed(2);
        percentages.push(percentage);

        // Get color based on the rarity
        if (rarityColors[rarity]) {
            colors.push(rarityColors[rarity]);
        } else {
            colors.push("#000000");
        }
    }

    // Prepare the chart data labels, values, percentages, and colors
    const labels = Object.keys(rarityDistribution);
    const values = Object.values(rarityDistribution);
    //console.log(labels, values, colors, percentages);
    return { labels, values, colors, percentages };
}

//END BAR CHART PREP ------------------------------------


//ARMORY PASS ------------------------------------

function fetchArmoryPassCount() {
    let numArmoryPass = 0;
    
    csRows.forEach(row => {
        const parsedRow = parseRow(row);

        if (parsedRow.event_description.includes('Purchased from the store') && parsedRow.item_name.includes('Armory Pass')) {
            numArmoryPass ++;
            //csRows.pop(row);
        }  
    });
    return numArmoryPass;
}


function calculateArmoryCollectionRarities(armorySkins) {
    let collectionRarities = {
        "Industrial": 0,
        "Mil-spec": 0,
        "Restricted": 0,
        "Classified": 0,
        "Covert": 0        
    };

    armorySkins.forEach(skin => {
        if (collectionRarities[skin.rarity] !== undefined) {
            collectionRarities[skin.rarity]++;
        }   
    })
    return collectionRarities;
}


function fetchArmorySkins() {
    let armorySkins = [];

    csRows.forEach(row => {
        const parsedRow = parseRow(row);

        if (parsedRow.event_description.includes('Mission reward') && !parsedRow.item_name.includes('Case')) {
            const skinInfo = fetchSkinInfo(parsedRow.item_name);
            if (skinInfo.collection.includes('The Overpass 2024 Collection') || skinInfo.collection.includes('The Graphic Design Collection') || skinInfo.collection.includes('The Sport & Field Collection')) {
                armorySkins.push(skinInfo);
                //csRows.pop(row);
            }
        }
    });
    return armorySkins;
}


function fetchAndDisplayArmoryData() {
    const extraData = document.getElementById('extraData');
    extraData.innerHTML = '<h3>Additional Data</h3><p></p>'

    const numArmoryPass = fetchArmoryPassCount();
    const armoryPassTotalCost = (numArmoryPass * 15.99).toFixed(2);

    let armorySkins = fetchArmorySkins();
    const armoryStats = calculateArmoryCollectionRarities(armorySkins);
    injectChartCreationScript(prepareBarChartData(armoryStats));

    const totalOpened = Object.values(armoryStats).reduce((sum, value) => sum + value, 0);

    if (extraData) {
        extraData.innerHTML += (`<p>Armory passes purchased: <strong>${numArmoryPass}</strong> </p>`);
        extraData.innerHTML += (`<p>Cost of passes in USD (before tax): <strong>\$${armoryPassTotalCost}</strong> </p>`);
        extraData.innerHTML += (`<p>Total collections opened: <strong>${totalOpened}</strong> </p>`);
    }

}

//END ARMORY ------------------------------------


//CASES SECTION------------------------------------

function fetchNumKeysPurchased() {
    let numKeysPurchased = 0;

    csRows.forEach(row => {
        const rowDetails = row.querySelector('.tradehistory_event_description') ? row.querySelector('.tradehistory_event_description').textContent.trim() : '';
        const rowNames = row.querySelectorAll('.history_item_name');
        
        if (rowDetails.includes('Purchased from the store')) {
            rowNames.forEach(nameElement => {
                const itemName = nameElement.textContent.trim();
    
                if (itemName.includes('Key')) {
                    numKeysPurchased ++;
                }
            })      
        }        
    })
    return numKeysPurchased
}


function fetchOpenedSkins() {
    let skinsOpened = [];

    csRows.forEach(row => {
        const parsedRow = parseRow(row);

        if (parsedRow.event_description.includes('Unlocked a container') && !parsedRow.item_name.includes('Sticker |') && !parsedRow.item_name.includes('Music Kit')) {
            const skinInfo = fetchSkinInfo(parsedRow.item_name);
            if (!(skinInfo == undefined)) {
                skinsOpened.push(skinInfo)
            }
            
        }
    });
    return skinsOpened;
}

function fetchOpenedGolds() {
    let goldsOpened = [];

    csRows.forEach(row => {
        const parsedRow = parseRow(row);

        if (parsedRow.event_description.includes('Unlocked a container') && parsedRow.item_name.includes('★')) {
            const skinInfo = [parsedRow.item_name, parsedRow.date, parsedRow.img_link];
            if (!(skinInfo == undefined)) {
                goldsOpened.push(skinInfo)
            }
            
        }
    });
    return goldsOpened;
}


function calculateCaseRarities(skinsOpened) {
    let caseRarities = {
        //"Consumer": 0,
        //"Industrial": 0,
        "Mil-spec": 0,
        "Restricted": 0,
        "Classified": 0,
        "Covert": 0,
        "Exceedingly Rare": 0,
        "Contraband": 0
    };

    skinsOpened.forEach(skin => {
        if (!skin.collection.includes("The Anubis Collection") && !skin.name.includes("Souvenir ")) {
            if (caseRarities[skin.rarity] !== undefined) {
                caseRarities[skin.rarity]++;
            }
        }   
    })
    return caseRarities;

}


function fetchAndDisplayCaseData() {
    const extraData = document.getElementById('extraData');
    extraData.innerHTML = '<h3>Additional Data</h3><p></p>'

    const numKeysPurchased = fetchNumKeysPurchased();
    const keyTotalCost = (numKeysPurchased * 2.49).toFixed(2);

    const openedSkins = fetchOpenedSkins();
    const rarityCounts = calculateCaseRarities(openedSkins);
    injectChartCreationScript(prepareBarChartData(rarityCounts));

    const totalOpened = Object.values(rarityCounts).reduce((sum, value) => sum + value, 0);


    const goldsOpened = fetchOpenedGolds();
    insertGoldsFooter(goldsOpened);


    if (extraData) {
        extraData.innerHTML += (`<p>Number of keys purchased from store: <strong>${numKeysPurchased}</strong> </p>`);
        extraData.innerHTML += (`<p>Cost of keys in USD (before tax): <strong>\$${keyTotalCost}</strong> </p>`);
        extraData.innerHTML += (`<p>Total cases opened: <strong>${totalOpened}</strong> </p>`);
    }
}

//END CASES ------------------------------------


//ANUBIS COLLECTTION ------------------------------------

function fetchAnubisPackagesPurchased() {
    let numPackagesPurchased = 0;

    csRows.forEach(row => {
        const rowDetails = row.querySelector('.tradehistory_event_description') ? row.querySelector('.tradehistory_event_description').textContent.trim() : '';
        const rowNames = row.querySelectorAll('.history_item_name');
        
        if (rowDetails.includes('Purchased from the store')) {
            rowNames.forEach(nameElement => {
                const itemName = nameElement.textContent.trim();
    
                if (itemName.includes('Anubis Collection Package')) {
                    numPackagesPurchased ++;
                }
            })      
        }        
    })
    return (numPackagesPurchased / 3);
}


function calculateAnubisRarities(skinsOpened) {
    let caseRarities = {
        "Consumer": 0,
        "Industrial": 0,
        "Mil-spec": 0,
        "Restricted": 0,
        "Classified": 0,
        "Covert": 0
        //"Exceedingly Rare": 0,
        //"Contraband": 0
    };

    skinsOpened.forEach(skin => {
        if (skin.collection.includes("The Anubis Collection") && !skin.name.includes('Souvenir')) {
            if (caseRarities[skin.rarity] !== undefined) {
                caseRarities[skin.rarity]++;
            }
        }   
    })
    return caseRarities;

}



function fetchAndDisplayAnubisData() {
    const extraData = document.getElementById('extraData');
    extraData.innerHTML = '<h3>Additional Data</h3><p></p>'


    const numPackagesPurchased = fetchAnubisPackagesPurchased();
    const packageTotalCost = (numPackagesPurchased * 1.99).toFixed(2);

    const openedSkins = fetchOpenedSkins();
    const rarityCounts = calculateAnubisRarities(openedSkins);
    injectChartCreationScript(prepareBarChartData(rarityCounts));

    const totalOpened = Object.values(rarityCounts).reduce((sum, value) => sum + value, 0);


    if (extraData) {
        extraData.innerHTML += (`<p>Number of Anubis Packages purchased: <strong>${numPackagesPurchased}</strong> </p>`);
        extraData.innerHTML += (`<p>Cost of packages in USD (before tax): <strong>\$${packageTotalCost}</strong> </p>`);
        extraData.innerHTML += (`<p>Total packages opened: <strong>${totalOpened}</strong> </p>`);
    }


}

//END ANUBIS ------------------------------------

//SOUVENIR PACKAGES ------------------------------------

function calculateSouvenirRarities(skinsOpened) {
    let caseRarities = {
        "Consumer": 0,
        "Industrial": 0,
        "Mil-spec": 0,
        "Restricted": 0,
        "Classified": 0,
        "Covert": 0
        //"Exceedingly Rare": 0,
        //"Contraband": 0
    };

    skinsOpened.forEach(skin => {
        if (skin.name.includes("Souvenir")) {
            if (caseRarities[skin.rarity] !== undefined) {
                caseRarities[skin.rarity]++;
            }
        }   
    })
    return caseRarities;

}


function fetchAndDisplaySouvenirData() {
    const extraData = document.getElementById('extraData');
    extraData.innerHTML = '<h3>Additional Data</h3><p></p>'


    /*const numPackagesPurchased = fetchAnubisPackagesPurchased();
    const packageTotalCost = (numPackagesPurchased * 1.99).toFixed(2);
    */
    const openedSkins = fetchOpenedSkins();
    const rarityCounts = calculateSouvenirRarities(openedSkins);
    injectChartCreationScript(prepareBarChartData(rarityCounts));

    const totalOpened = Object.values(rarityCounts).reduce((sum, value) => sum + value, 0);


    if (extraData) {
        //extraData.innerHTML += (`<p>Number of Anubis Packages purchased: <strong>${numPackagesPurchased}</strong> </p>`);
        //extraData.innerHTML += (`<p>Cost of packages in USD (before tax): <strong>\$${packageTotalCost}</strong> </p>`);
        extraData.innerHTML += (`<p>Total packages opened: <strong>${totalOpened}</strong> </p>`);
    }


}



//END SOUVENIR ------------------------------------


function fetchData() {
    loadAllHistory();
    findCsRows();
}



//Takes row and parses data returning dict of info
function parseRow(row) {

    //Info data structure
    let parsedRow = {
        event_description: '',
        item_name: '',
        date: '',
        timestamp: '',
        img_link: ''
    }
    
    parsedRow.event_description = row.querySelector('.tradehistory_event_description') ? row.querySelector('.tradehistory_event_description').textContent.trim() : '';

    const itemNames = row.querySelectorAll('.history_item_name');
    itemNames.forEach(nameElement => {
        parsedRow.item_name = nameElement.textContent.trim();
    })

    parsedRow.date = row.querySelector('.tradehistory_date') ? row.querySelector('.tradehistory_date').textContent.trim().split('\t')[0] : '';
    parsedRow.timestamp = row.querySelector('.tradehistory_timestamp') ? row.querySelector('.tradehistory_timestamp').textContent.trim() : '';

    const itemImgs = row.querySelectorAll('.tradehistory_received_item_img');
    itemImgs.forEach(imgs => {
        imglink = imgs.src.replace('/120x40', '').trim()
        parsedRow.img_link = imglink;
    })
    return parsedRow;
}


// Function to simulate clicking the "Load More History" button until no more items are available
function loadAllHistory() {
    toggleLoadingOverlay(true);
    const loadMoreButton = document.querySelector('#load_more_button');
    const loadingStatus = document.querySelector('#loadingMessage')
    if (loadMoreButton && loadMoreButton.offsetParent !== null) {
        //Display loading stat to user

        const currLoaded = document.querySelector('#inventory_history_count');
        if (currLoaded) {
            loadingStatus.textContent = 'Loading Data ' + currLoaded.textContent + '...';
        }
        


        loadMoreButton.click(); // Simulate clicking the button
        // Wait for new history to load
        setTimeout(() => {
        loadAllHistory();
        }, 2000);
    } else {
        const currLoaded = document.querySelector('#inventory_history_count');
        if (currLoaded) {
            loadingStatus.textContent = 'Loading Data ' + currLoaded.textContent + '...';
        }
        findCsRows();
        const casesButton = document.getElementById('casesButton');
        casesButton.click();
        toggleLoadingOverlay(false);
    }
    return;
}


//Return jsut cs2 entries appid 730
function findCsRows() {
    //Clear rows to ensure no duplicaiton
    csRows = [];

    //Get all rows
    const allRows = document.querySelectorAll('.tradehistoryrow');

    allRows.forEach(row => {
        // Check if the row contains an item with data-appid="730"
        const item = row.querySelector('a[data-appid="730"]');
        if (item) {
            csRows.push(row);
        }
    });
}


function fetchSkinInfo(skinName) {
    let skinInfo = {
        name: skinName,
        rarity: '',
        collection: ''
    }

    if (skinName.includes("★")) {
        skinInfo.rarity = "Exceedingly Rare"
        return skinInfo;
    }

    //sanitize skin name
    skinName = skinName.replace('| ', '').trim(); 
    skinName = skinName.replace('StatTrak™ ', '').trim();
    skinName = skinName.replace('Souvenir ', '').trim();
    //console.log(skinName);

    if (skinsDict[skinName]) {
        skinInfo.rarity = skinsDict[skinName].rarity;
        skinInfo.collection = skinsDict[skinName].collection;
        return skinInfo;
    } else {
        //Maybe handle error here? idk
        console.log(skinName + " not in skinDict");
    }
}


// Load the skins dictionary from the CSV file
function loadSkinsCSV() {
    fetch(chrome.runtime.getURL('skins.csv'))
        .then(response => response.arrayBuffer())
        .then(buffer => {
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(buffer);
        skinsDict = parseCSVToDictionary(csvText);
        //console.log('Skins dictionary loaded:', skinsDict);
        })
    .catch(error => console.error('Error loading skins.csv:', error));
}


// Parse the CSV into a dictionary format
function parseCSVToDictionary(csvText) {
    const skinsDict = {};
  
    const rows = csvText.trim().split('\n');
    rows.forEach(row => {
        const [skin, rarity, collection] = row.split(',');
        skinsDict[skin.trim()] = {
            rarity: rarity.trim(),
            collection: collection.trim()
        };
    });
  return skinsDict;
}


function initLoad() {
    console.log("Counter Strike Case Stats (v2.0) by TheJohnson")
    insertDiv();
    loadSkinsCSV();
    loadAllHistory();
}

//Inject chart, if cant then dont continue.
injectChartJs();