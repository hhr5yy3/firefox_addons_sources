var config = {
    vinRegex: /^[A-HJ-NPR-Z\d]{8}[\dXZ][A-HJ-NPR-Z\d]{8}$/gi,
    passwordField: [
        { whitelistRegex: /tyre24\.alzura\.com/ },
        { whitelistRegex: /postshop\.autoteile-post\.de\/catalog\/login\.php/ },
        { whitelistRegex: /d-store\.ch\/dch-ax\/login/ },
        { whitelistRegex: /web([1-9]|1[0-2])\.carparts-cat\.com/ },
        {
            whitelistRegex: [/plus\.wmkat\.(de|at)/, /tm2\.carparts-cat\.com/],
            toggleStyleModifier: { backgroundColor: '#f6f6f6' },
        },
    ],
    productDetail: [
        {
            // ##################################################
            // ## PARTSLINK 24
            // ##################################################
            whitelistRegex: /partslink24\.com/,
            vehicleIdentificationNumber: [
                '.p5_vehicle_info_vin',
                'input#vin',
                'input#direct_entry',
            ],
            manufacturerArticleNumber: [
                '[class*="p5_table_rec"] [class*="partno"] .p5_cell_content',
                'tbody .tc-lcell.buttons + .tc-mcell.finis',
                'tbody .tc-lcell.buttons + .tc-mcell.partno',
                'tbody .tc-mcell.pos + .tc-mcell.partno',
                'tbody .tc-mcell.portnoFormatted',
                'tbody .tc-mcell.bomPartno',
                'tbody .tc-mcell.gmNo',
                'tbody .tc-mcell.partnoHtml .dblWrap',
                '.partinfoTable tbody td.partinfoPartnoCol',
                '.partinfoTable tbody td.partinfoFinisCol',
            ],
            manufacturerArticleNumberRegex: /[* ]*(?<value>[\w\s][^()]+)/,
            manufacturerArticleNumberStyleModifier: {},
            quantity: [
                '[class*="p5_table_rec"] [class*="qty"] .p5_cell_content',
                '[class*="p5_table_rec"] [class*="qty"] .p5_qty_select',
                'tbody .tc-mcell.qty',
                'tbody .partinfoQtyInput',
            ],
            category: [
                '.p5_table_cell[class*="_description"] .p5_cell_content',
                '.tc-mcell.caption',
            ],
        },
        {
            // ##################################################
            // ## REPDOC
            // ##################################################
            whitelistRegex: /repdoc\.com/,
            vehicleIdentificationNumber: '.p5_vehicle_info_vin',
            orderReference: '.articles-navigation-vehicleinfo .title',
            manufacturerArticleNumber: [
                '.articles_Row .posHeader .articles_hoverunderline',
                '.articles_Row .article-no',
                '.articles_details_HeaderTable tbody td[title*="Interne"] + td .articles_hoverunderline',
                '.articles_details_HeaderTable tbody td[title*="Interne"] + td .lx-hover-underline',
            ],
            manufacturerArticleNumberRegex: /[* ]*(?<value>[\w\s][^()]+)/,
            manufacturerArticleNumberStyleModifier: {
                padding: '0px',
                margin: '0px',
                height: '17px',
            },
            category: ['.article-text', '.articles_titleHeader .article-text'],
            quantity: ['.articles_Pos_Quantity input', '.article-cart-control input'],
        },
        {
            // ##################################################
            // ## - STAHLGRUBER
            // ## - WMKAT+
            // ## - Stakis
            // ## - Dolphin
            // ##################################################
            whitelistRegex: [
                /tm[1-5]\.carparts-cat\.com/,
                /plus\.wmkat\.(de|at)/,
                /www\.stakis\.(de|at)/,
                /dolphin\.coparts-online\.de/,
            ],
            portalIdentifier: {
                wmkat: 'link[href*="/wmkatplus/"]',
                aag: 'link[href*="/aagonline/"]',
                coparts: 'link[href*="/coparts/"]',
                elekat: 'link[href*="/elekat/"]',
                texkat: 'link[href*="/texkat/"]',
                stakis: 'img.brand-image[src*="STAkis-Logo"]',
                klein: 'img.brand-image[src*="klein"]',
            },
            orderReference: [
                '.overflowMenu .selected div[class*="title"] .value',
                '.overflowMenu .selected div[class*="title"]:not([title*="Artikelnummer"]):not([title*="Artikelsuche"])',
                '.overflowMenu .selected div[class*="info"]:not([info*="Artikelnummer"]):not([title*="Artikelsuche"])',
            ],
            orderReferenceRegex: /(?<value>[^"]+)/,
            vehicleIdentificationNumber: '.details-link .info-content .copyable',
            manufacturerArticleNumber: [
                {
                    firstMatchingSelector: [
                        '.article-details__info__item + div .article-details__info__item .headline h1.MuiTypography-root',
                        '.article-details__info__item .headline h1.MuiTypography-root',
                    ],
                },
                {
                    firstMatchingSelector: [
                        '[data-auteon-portal="klein"] .article-list .article-list__item .article__cell--numbers > div > div:nth-child(2) button p.MuiTypography-root',
                        '.article-list .article-list__item .article__cell--numbers > div > div button .MuiTypography-body2',
                        '.article-list .article-list__item .article__cell--numbers > div > div:nth-child(2) button p.MuiTypography-root',
                        '.article__cell--numbers button.MuiButtonBase-root > p.MuiTypography-body2',
                        '.article__cell--numbers button.MuiButtonBase-root > p.MuiTypography-body1',
                        '.MuiGrid-root .MuiGrid-container .MuiGrid-item div > div button .MuiTypography-body2',
                        '.MuiGrid-root .MuiGrid-container .MuiGrid-item div > div:nth-child(2) button p.MuiTypography-root',
                        '.MuiGrid-root .MuiGrid-container .MuiGrid-item button.MuiButtonBase-root > p.MuiTypography-body2',
                        '.MuiGrid-root .MuiGrid-container .MuiGrid-item button.MuiButtonBase-root > p.MuiTypography-body1',
                        // '[data-auteon-portal="aag"] .article__cell--numbers button.MuiButtonBase-root > p.MuiTypography-body1',
                    ],
                },
            ],
            manufacturerArticleNumberRegex: /[* ]*(?<value>[\w\s][^()]+)/,
            manufacturerArticleNumberStyleModifier: {},
            category: '.ArticleGroupHeader .MuiTypography-root',
            categoryRegex: /[* ]*(?<value>[\W\w\s][^()]+)/,
            quantity: [
                '.add-to-basket button.MuiButtonBase-root > div.MuiBox-root',
                '.addToBasket input',
            ],
        },
        {
            // ##################################################
            // ## - PVKompass
            // ##################################################
            whitelistRegex: [/www\.pvkompass40\.de/],
            orderReference: [
                '.overflowMenu .selected div[class*="title"] .value',
                '.overflowMenu .selected div[class*="title"]',
            ],
            orderReferenceRegex: /(?<value>[^"]+)/,
            vehicleIdentificationNumber: '.details-link .info-content .copyable',
            manufacturerArticleNumber: [
                '.article-details__info__item + div .article-details__info__item .headline h1.MuiTypography-root',
                '.article__cell--numbers button.MuiButtonBase-root > p.MuiTypography-body1',
                '.MuiGrid-root .MuiGrid-container .MuiGrid-item button.MuiButtonBase-root > p.MuiTypography-body1',
            ],
            manufacturerArticleNumberRegex: /[* ]*(?<value>[\w\s][^()]+)/,
            manufacturerArticleNumberStyleModifier: {},
            category: '.ArticleGroupHeader .MuiTypography-root',
            categoryRegex: /[* ]*(?<value>[\W\w\s][^()]+)/,
            quantity: [
                '.add-to-basket button.MuiButtonBase-root > div.MuiBox-root',
                '.addToBasket input',
            ],
        },
        {
            // ##################################################
            // ## PartsFinder
            // ##################################################
            whitelistRegex: /partsfinder\.de/,
            orderReference: '.car-history-displayName p',
            manufacturerArticleNumber: [
                '.articles .list-table .list-table-content > div:nth-child(2) .row > div:nth-child(1) > .lead.color-highlight-3 b',
                '.article-details .box .collapse .row > div:nth-child(1) > .lead > .fw-600 > .color-highlight-3',
            ],
            category: [
                '.list-table-content > div:nth-child(2) .row > div:nth-child(1) > .text-gray',
                '.article-details .box .collapse .row > div:nth-child(1) > .text-gray',
                '.ArticleGroupHeader .MuiTypography-root',
            ],
            quantity: [
                '.quantity-input input',
                '.add-to-basket .amount-field button > div.MuiBox-root',
            ],
        },
        {
            // ##################################################
            // ## AutoteilePilotPlus
            // ##################################################
            whitelistRegex: /autoteilepilotplus\.de/,
            orderReference: '.vehicle-section #main_vehicleInfo[title*=":"]',
            manufacturerArticleNumber: [
                '#articles_classicList .articles_Position td:nth-child(2) .no',
                '#articles_classicDetailsContent .articles_details_HeaderTable .articles_hoverunderline',
            ],
            category: [
                '.articles_Position td:nth-child(2) .txt',
                '#articles_classicDetailsContent.articles_detailsTitle',
            ],
            quantity: '.articles_Pos_Quantity input',
        },
        {
            // ##################################################
            // ## Centro Digital
            // ##################################################
            whitelistRegex: /centrodigital\.online/,
            orderReference: '.cart-container .cart-name',
            manufacturerArticleNumber: [
                '.article-list-container .search-results-row .article-number-container strong',
                '.article-list-container .virtual-scroll-item .left-column div > strong',
            ],
            category: '.genart-header > span:nth-child(1)',
            quantity: '.quantity-input-group input',
        },
        {
            // ##################################################
            // ## DERENDINGER
            // ## D-STORE
            // ## TECHNO-STORE
            // ## NORMAUTO
            // ## SAG-GH
            // ## SAG-SERVICES
            // ##################################################
            whitelistRegex: [
                /shop\.derendinger\.at/,
                /d-store\.ch/,
                /techno-store\.ch/,
                /shop\.normauto\.ch/,
                /shop\.sag-gh\.at/,
                /connect\.sag\.services/,
            ],
            vehicleIdentificationNumber: [
                'sag-in-context-vehicle-info section > p:last-of-type',
                'sag-in-context-vehicle-detail-info section > div > div:first-child > p:last-of-type',
            ],
            vehicleIdentificationNumberRegex: / ?(VIN:) ?(?<value>.*)/,
            manufacturerArticleNumber: 'sag-article-list sag-article-detail sag-article-detail-description .part-detail-artnr-wrapper .part-detail-description-art',
            manufacturerArticleNumberRegex: [
                / ?(Art\. Nr\.|) ?(?<value>.*)/,
                / ?(OE Nr\.|) ?(?<value>.*)/,
            ],
            category: 'sag-article-detail sag-article-detail-description .part-name',
            quantity: [
                'sag-article-detail .article-amount-input',
                'sag-article-detail .part-col.part-de-amount',
            ],
        },
        {
            // ##################################################
            // ## DAT / SilverDAT
            // ##################################################
            whitelistRegex: /dat\.de/,
            orderReference: [
                '#calculation-info td.field-referenceNumber',
                '#widget-vehicle-registration td.field-registrationNumber',
            ],
            manufacturerArticleNumber: '#tab-list-spareParts tbody tr .field-spNumber',
            category: '#tab-list-spareParts tbody tr .field-description',
            quantity: '#tab-list-spareParts tbody tr .field-amount',
        },
    ],
    cart: [
        {
            // ##################################################
            // ## PARTSLINK 24
            // ##################################################
            whitelistRegex: /partslink24\.com/,
            toolbarStyleModifier: { position: 'sticky', top: 0 },
            domStyleModifier: {
                'body > .contentOuter': { top: '100px' },
                'body > .p5_navbar, body > .p5_companion_and_content': {
                    marginTop: 'var(--auteon-toolbar-height)',
                },
            },
            vehicleIdentificationNumber: [
                '.header .header__vin .vin-text',
                {
                    selector: '.cartTable .cartTableInnerContainer tbody .mcell.cell-vin .vinInfo[title]',
                    attribute: 'title',
                },
            ],
            vehicleIdentificationNumberUrlRegex: /~(?<value>[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{8})~/i,
            orderReference: [
                '.header .header__facts #cart-ref-input',
                '.contentOuter .contentTitle .contentTitleText',
                '.p5_cart_name_container .p5_cart_name',
                '#companion_embedded_cart /deep/ .cart-name .cart-name-input',
            ],
            manufacturerArticleNumber: [
                '.table .table__row .table__cell.col-amount + .table__cell > .table__cell-item',
                '.cartTable .cartTableInnerContainer tbody .mcell.cell-tnr',
                '.p5_cartpreview .p5_cartpreview_item_partno',
                '#companion_embedded_cart /deep/ .table .table__row .table__cell--select + .table__cell > .table__cell-item .no-white-space-trim',
            ],
            quantity: [
                '.table__cell.col-amount .table__cell-item select',
                '.mcell.cell-quantity input',
                '.p5_table_cell_comp .p5_qty_select',
                '#companion_embedded_cart /deep/ .table .table__row .table__cell--select select',
            ],
        },
        {
            // ##################################################
            // ## - Stahlgruber
            // ## - WMKAT+
            // ## - Stakis
            // ## - Dolphin
            // ##################################################
            whitelistRegex: [
                /tm[1-5]\.carparts-cat\.com\/.*\/basket/,
                /plus\.wmkat\.(de|at)\/.*\/basket/,
                /www\.stakis\.(de|at)\/.*\/basket/,
                /dolphin\.coparts-online\.de\/.*\/basket/,
            ],
            target: '#app',
            vehicleIdentificationNumber: '.details-link .info-content .copyable',
            orderReference: [
                '.tk-basket .collapsible__content .MuiBox-root.css-0 > .MuiBox-root > .MuiTextField-root .MuiInputBase-input',
                '.overflowMenu .selected div[class*="title"]',
                '.overflowMenu__main .selected .value',
                '.overflowMenu__main .selected .info',
            ],
            orderReferenceRegex: /(?<value>[^"]+)/,
            manufacturerArticleNumber: [
                '.tk-basket .list__item .manufacturer + div[class*="css"] > button:last-child > p',
                '.basket .row div[class*="css"] > button:last-child > p',
                '.basket .row > span[class*="nx"] div[class*="nx"] > button:last-child > p',
            ],
            brand: [
                '.manufacturer .text',
                '.basket .row span[class*="css"] > .MuiBox-root[aria-label] > p',
                '.basket .row span[class*="css"]:nth-child(2) p.MuiTypography-root',
                '.basket .row > span[class*="nx"]:nth-child(2) p.MuiTypography-root',
            ],
            category: [
                '.basket .row > span[class*="nx"]:nth-child(4) p.MuiTypography-root:nth-child(1)',
            ],
            quantity: [
                '.quantity button .MuiBox-root',
                '.basket .row span[class*="css"] > div > button.MuiButtonBase-root > div.MuiBox-root',
                '.basket .row span[class*="nx"] .basketAmountField input',
                '.MuiFormControl-root  .MuiInputBase-input',
            ],
        },
        {
            // ##################################################
            // ## - PVKompass
            // ##################################################
            whitelistRegex: /www\.pvkompass40\.de\/.*\/basket/,
            target: '#app',
            vehicleIdentificationNumber: '.details-link .info-content .copyable',
            orderReference: [
                '.tk-basket .collapsible__content .MuiBox-root.css-0 > .MuiBox-root > .MuiTextField-root .MuiInputBase-input',
                '.overflowMenu .selected div[class*="title"]',
            ],
            orderReferenceRegex: /(?<value>[^"]+)/,
            manufacturerArticleNumber: '.basket .row div[class*="css"] > button:last-child > p',
            brand: '.basket .row span[class*="css"]:nth-child(2) p.MuiTypography-root',
            quantity: '.basket .row span[class*="css"]:nth-child(2) > div > button.MuiButtonBase-root > div.MuiBox-root',
        },
        {
            // ##################################################
            // ## REPDOC
            // ##################################################
            whitelistRegex: /repdoc\.com/,
            toolbarStyleModifier: { position: 'fixed', top: 0, width: '100%' },
            domStyleModifier: {
                body: { marginTop: 'var(--auteon-toolbar-height)' },
            },
            manufacturerArticleNumber: [
                {
                    selector: '.sc_Doc_PosContentPositions .sc_docPos[data-posno]',
                    attribute: 'data-posno',
                },
                {
                    selector: '.sc-doc-positions .sc_docPos[data-posno]',
                    attribute: 'data-posno',
                },
            ],
            brand: { selector: '.sc_docPos[data-poshlk]', attribute: 'data-poshlk' },
            category: '.art-txt .lx-hover-underline',
            quantity: ['.sc_docPos_quantity input', '.sc-doc-pos__quantity input'],
        },
        {
            // ##################################################
            // ## PartsFinder
            // ##################################################
            whitelistRegex: /partsfinder\.de/,
            orderReference: [
                '#reference',
                '.car-history-displayName p',
                '.order .box .box-header .pficon-basket + span',
            ],
            manufacturerArticleNumber: [
                '.cart .list-table .list-table-content > div:nth-child(1) .row .col > div:nth-child(2)',
                '.order .list-table .list-table-content > div:nth-child(1) div:nth-child(2) span',
            ],
            brand: [
                '.list-table-content > div:nth-child(1) .row .col > div:nth-child(1)',
                '.list-table-content > div:nth-child(1) div:nth-child(1) .fw-600',
            ],
            category: '.list-table-content > div:nth-child(2) > div > span',
            quantity: [
                '.quantity-input input',
                '.list-table-content > div:nth-child(4) > div > span.fw-600',
            ],
        },
        {
            // ##################################################
            // ## AutoteilePilotPlus
            // ##################################################
            whitelistRegex: /autoteilepilotplus\.de/,
            orderReference: '.vehicle-section #main_vehicleInfo[title*=":"]',
            manufacturerArticleNumber: '#sc_ShoppingCardView .sc_Position .sc_Number .no',
            brand: '.sc_Position .sc_Number .man',
            category: '.sc_Position .sc_Text .pos-text .sc_HoverLink',
            quantity: '.sc_Quantity input',
        },
        {
            // ##################################################
            // ## Centro Digital
            // ##################################################
            whitelistRegex: /centrodigital\.online/,
            vehicleIdentificationNumber: 'input[vin]',
            orderReference: [
                '.cart-container .cart-name',
                'input[formcontrolname="licensePlate"]',
                'input[formcontrolname="lastName"]',
            ],
            manufacturerArticleNumber: '.cart-positions-container .position-row nc-cart-article-position .cell-number > span:nth-child(1)',
            category: '.cell-designation span',
            quantity: '.cell-quantity input',
        },
        {
            // ##################################################
            // ## DERENDINGER
            // ## D-STORE
            // ## TECHNO-STORE
            // ## NORMAUTO
            // ## SAG-GH
            // ## SAG-SERVICES
            // ##################################################
            whitelistRegex: [
                /shop\.derendinger\.at/,
                /d-store\.ch/,
                /techno-store\.ch/,
                /shop\.normauto\.ch/,
                /shop\.sag-gh\.at/,
                /connect\.sag\.services/,
            ],
            orderReference: 'sag-article-list  .basket-item-title',
            orderReferenceRegex: /^(?!.*Weitere Artikel).*/,
            manufacturerArticleNumber: 'connect-shopping-cart sag-article-list sag-article-detail sag-article-detail-description .part-detail-artnr-wrapper .part-detail-description-art',
            manufacturerArticleNumberRegex: [
                / ?(Art\. Nr\.|) ?(?<value>.*)/,
                / ?(OE Nr\.|) ?(?<value>.*)/,
            ],
            brand: 'sag-article-detail sag-article-detail-description .part-name + span',
            category: 'sag-article-detail sag-article-detail-description .part-name',
            quantity: [
                'sag-article-detail sag-currency-amount-input input',
                'sag-article-detail .article-amount-input',
                'sag-article-detail .part-col.part-de-amount',
            ],
        },
        {
            // ##################################################
            // ## DAT / SilverDAT
            // ##################################################
            whitelistRegex: /dat\.de/,
            vehicleIdentificationNumber: '.field-vin.identifiedByVin',
            orderReference: [
                '#calculation-info td.field-referenceNumber',
                '#widget-vehicle-registration td.field-registrationNumber',
            ],
            manufacturerArticleNumber: '#tab-list-spareParts tbody tr .field-spNumber',
            category: '#tab-list-spareParts tbody tr .field-description',
            quantity: '#tab-list-spareParts tbody tr .field-amount',
        },
    ],
};

export { config as c };
