var CONSTANTS = function () {
    return {
        DEFAULT_SEARCH_URL: "https://search.yahoo.com/search?p="
    }
};

var OTHERDimenesions = function () {
    return {
        searchComp: "searchComp"
    };
};

var HTMLUtil = function () {
    return {
        addEventListener: function (ele, event, fn) {
            ele.addEventListener(event, fn);
        },

        documentOnLoad: function (fn) {
            this.addEventListener(document, "DOMContentLoaded", fn);
        }
    }
};

const HtmlUtil = HTMLUtil();
const Constants = CONSTANTS();
const OtherDimensions = OTHERDimenesions();
const SEARCH_FORM_CLASS = ".search-form";
const SEARCH_TEXT_CLASS = ".search-text";
const SEARCH_BTN_CLASS = ".submit-btn";


function escapeHtml(text) {
    text = "" + (text || "");
    return text.replace(/[\"&\/<>]/g, function (a) {
        return {
            '"': '&quot;', '&': '&amp;', "'": '&#39;',
            '/': '&#47;', '<': '&lt;', '>': '&gt;'
        }[a];
    });
}

function search(searchBox) {
    var searchTerm = searchBox.val().trim();
    if (!searchTerm) return;
    var search = Constants.DEFAULT_SEARCH_URL + searchTerm;
    if (typeof specificConstants !== 'undefined' && !!specificConstants[OtherDimensions.searchComp]) {
        search = specificConstants[OtherDimensions.searchComp] + searchTerm + "&grd=1";
    }
    window.location.href = search;
}

// document.addEventListener("DOMContentLoaded",function () {
        const searchBox = $(SEARCH_TEXT_CLASS);
        const searchForm = $(SEARCH_FORM_CLASS);
        const searchBtn = $(SEARCH_BTN_CLASS);

        function handleWebSearch (e, searchBoxElement) {
            e.preventDefault();
            search(searchBoxElement);
        }

        function handleEnterKeyPress(event, searchBoxElement){
                if (event.which === 13) {
                handleWebSearch(event, searchBoxElement);
                }
        }

        function disableWebSearchFunctionality(){
            document.querySelectorAll('.search_icon_ff').forEach(function (element) {
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
            });
            document.querySelectorAll('.search-text').forEach(function (element) {
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
            });
        }

        function addWebSearchFunctionality(){
            searchBox.each(function (index) {
                var searchBoxElement = $(searchBox[index]);
                searchBoxElement.on('keypress', (e)=>handleEnterKeyPress(e, searchBoxElement));
                searchBoxElement.focus();
            });

            searchForm.each(function (index) {
                var searchFormElement = $(searchForm[index]);
                var searchBtnElement = searchFormElement.find(SEARCH_BTN_CLASS);
                var searchBoxElement = searchFormElement.find(SEARCH_TEXT_CLASS);
                searchBtnElement.on('click', (e)=>handleWebSearch(e, searchBoxElement));
            });
        }

        function removeWebSearchFunctionality() {
            searchBox.each(function (index) {
                var searchBoxElement = $(searchBox[index]);
                searchBoxElement.off('keypress');
            });
        
            searchForm.each(function (index) {
                var searchFormElement = $(searchForm[index]);
                var searchBtnElement = searchFormElement.find(SEARCH_BTN_CLASS);
                var searchBoxElement = searchFormElement.find(SEARCH_TEXT_CLASS);
                searchBtnElement.off('click');
            });
        }


        $('.search_manuals_ff').on('click', function(e) {
            e.preventDefault();
            if(!($('#search-text').data('ui-autocomplete'))) {
                addSearchSuggestion();
            }
            removeWebSearchFunctionality();
            
            $(this).addClass('active-option').removeClass('not-active-option');
            $('.web_search_ff').addClass('not-active-option').removeClass('active-option');
            $('.search_icon_ff').removeClass('submit-btn').addClass("search_manuals");
            addManualsSearch();
        });

        $('.web_search_ff').on('click', function(e) {
            e.preventDefault();
            
            if($('#search-text').data('ui-autocomplete')) {
                destroySearchSuggestion();
            }
            removeManualsSearch();
            $(this).addClass('active-option').removeClass('not-active-option');
            $('.search_manuals_ff').addClass('not-active-option').removeClass('active-option');
            $('.search_icon_ff').removeClass("search_manuals").addClass('submit-btn');
            addWebSearchFunctionality();
        });

    // });