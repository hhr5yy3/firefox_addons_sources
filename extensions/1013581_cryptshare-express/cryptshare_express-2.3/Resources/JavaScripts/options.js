function localize() {

    document.getElementById('labelSelectServer').innerHTML = browser.i18n.getMessage('labelSelectServer');
    document.getElementById('buttonSave').innerHTML = browser.i18n.getMessage('buttonSave');
    document.getElementById('buttonBack').innerHTML = browser.i18n.getMessage('buttonBack');

    //document.getElementById('csserver').options[0].textContent = browser.i18n.getMessage('optionServerSelect');

    document.getElementById('labelForCustomersFromWebapp').innerHTML = browser.i18n.getMessage('labelForCustomersFromWebapp');
    document.getElementById('labelForCustomersFromNl').innerHTML = browser.i18n.getMessage('labelForCustomersFromNl');

    document.getElementById('CountryGermany').innerHTML = browser.i18n.getMessage('optionServerGermany');
    document.getElementById('CountryAustria').innerHTML = browser.i18n.getMessage('optionServerAustria');
    document.getElementById('CountrySwitzerland').innerHTML = browser.i18n.getMessage('optionServerSwitzerland');
    document.getElementById('CountryNetherlands').innerHTML = browser.i18n.getMessage('optionServerNetherlands');
    document.getElementById('CountryBelgium').innerHTML = browser.i18n.getMessage('optionServerBelgium');
    document.getElementById('CountryBulgaria').innerHTML = browser.i18n.getMessage('optionServerBulgaria');
    document.getElementById('CountryCroatia').innerHTML = browser.i18n.getMessage('optionServerCroatia');
    document.getElementById('CountryCzechia').innerHTML = browser.i18n.getMessage('optionServerCzechia');
    document.getElementById('CountryCyprus').innerHTML = browser.i18n.getMessage('optionServerCyprus');
    document.getElementById('CountryEstonia').innerHTML = browser.i18n.getMessage('optionServerEstonia');
    document.getElementById('CountryFinland').innerHTML = browser.i18n.getMessage('optionServerFinland');
    document.getElementById('CountryFrance').innerHTML = browser.i18n.getMessage('optionServerFrance');
    document.getElementById('CountryGreek').innerHTML = browser.i18n.getMessage('optionServerGreek');
    document.getElementById('CountryHungary').innerHTML = browser.i18n.getMessage('optionServerHungary');
    document.getElementById('CountryIreland').innerHTML = browser.i18n.getMessage('optionServerIreland');
    document.getElementById('CountryItaly').innerHTML = browser.i18n.getMessage('optionServerItaly');
    document.getElementById('CountryLithuania').innerHTML = browser.i18n.getMessage('optionServerLithuania');
    document.getElementById('CountryLuxembourg').innerHTML = browser.i18n.getMessage('optionServerLuxembourg');
    document.getElementById('CountryLatvia').innerHTML = browser.i18n.getMessage('optionServerLatvia');
    document.getElementById('CountryPoland').innerHTML = browser.i18n.getMessage('optionServerPoland');
    document.getElementById('CountrySweden').innerHTML = browser.i18n.getMessage('optionServerSweden');
    document.getElementById('CountrySpain').innerHTML = browser.i18n.getMessage('optionServerSpain');
    document.getElementById('CountrySlowakia').innerHTML = browser.i18n.getMessage('optionServerSlowakia');
    document.getElementById('CountrySlovenia').innerHTML = browser.i18n.getMessage('optionServerSlovenia');
    document.getElementById('CountryTurkey').innerHTML = browser.i18n.getMessage('optionServerTurkey');
    document.getElementById('CountryPortugal').innerHTML = browser.i18n.getMessage('optionServerPortugal');
    document.getElementById('CountryRomania').innerHTML = browser.i18n.getMessage('optionServerRomania');
    document.getElementById('CountryUnitedKingdom').innerHTML = browser.i18n.getMessage('optionServerUnitedKingdom');
    document.getElementById('labelForCustomersShowMore').innerHTML = browser.i18n.getMessage('labelForCustomersShowMore');

}


function save_options() {

    var csserver = document.querySelector('input[name = "csserver"]:checked').value;

    if (csserver != 'none') {

        browser.storage.local.set({

            csserver: csserver

        }, function() {

            document.getElementById('status').innerHTML = '<div class="alert alert-success"><i class="fa fa-check"></i> ' + browser.i18n.getMessage('statusSaved') + '</div>';

            setTimeout(function() {

                document.getElementById('status').innerHTML = '';
                window.location.href = 'popup.html';

            }, 750);

        });

    } else {
        document.getElementById('status').innerHTML = browser.i18n.getMessage('statusSelectServer');
    }

}


function restore_options() {

    // Use default value
    browser.storage.local.get({

        csserver: 'none'

    }, function(items) {

        changeRadioSelect(items.csserver);

    });

}



function changeRadioSelect(csserver) {

    var options = document.getElementsByName('csserver');

    for (let i = 0; i < options.length; i++) {

        //console.log(options[i]);

        if (options[i].value == csserver) {
            options[i].checked = true;
        }
        console.log(options[i].value);

    }

}

function show_all_countries() {

    //var options = document.getElementsByClassName('d-none');
    var options = document.getElementById('CountriesOfWebapp').getElementsByTagName('li');

    document.getElementById('ShowAllCountries').remove();

    for (let i = 0; i < options.length; i++) {

        options[i].classList.remove('d-none');

    }

}

function init() {

    localize();

    restore_options();

}

document.addEventListener('DOMContentLoaded', init());
document.getElementById('buttonSave').addEventListener('click', save_options);
document.getElementById('ShowAllCountries').addEventListener('click', show_all_countries);