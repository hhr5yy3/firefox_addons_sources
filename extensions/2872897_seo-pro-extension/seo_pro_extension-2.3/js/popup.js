let webVitals = {};
let svgs = {
    red: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.00004 0L12.0001 12.0001H0L6.00004 0Z" fill="#FD5049"/></svg>`,
    orange: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="12.0001" height="12.0001" fill="#FDA328"/></svg>`,
    green: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="12.0001" height="12.0001" rx="6.00004" fill="#24CD6F"/></svg>`,
    grey: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M6.00004 0L12.0001 12.0001H0L6.00004 0Z" fill="#6E6E6E"/></svg>`,
};

let colorCode = {
    red: "#EB0F00",
    orange: "#D04900",
    green: "#018642",
    grey: "#6E6E6E",
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.dataWebVitals) {
        if (request.error) {
            setWebVitalsError();
        } else {
            setWebVitals(request.webVitals);
        }
    }
});

let SEO;

document.addEventListener("DOMContentLoaded", function() {
    M.AutoInit();

    $(document).on("click", ".tabbing h3:not(.no-collapse)", function() {
        $(this).toggleClass("tabOpen");
        $(this).next(".textTabbing").slideToggle();
    });

    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, { action: "Get SEO Data", tabId: tabs[0].id },
            analizeSeoData
        );
    });

    function analizeSeoData(data) {
        SEO = JSON.parse(data);
        analize();
    }

    function setHighlightLinksButtonLabel(data) {
        var nofollow_status = data.status;
        if (nofollow_status == "disabled") {
            $("#highlight_nofollow_links").addClass("t");
            $("#highlight_nofollow_links").html("HIGHLIGHT NOFOLLOW LINKS");
        }

        if (nofollow_status == "enabled") {
            if (data.close) window.close();
            $("#highlight_nofollow_links").removeClass("t");
            $("#highlight_nofollow_links").html("DISABLE NOFOLLOW LINKS");
        }
    }

    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, { action: "Check Highlight Nofollow Links State", tabId: tabs[0].id },
            setHighlightLinksButtonLabel
        );
    });

    $("#export_headings").on("click", function() {
        const name = "Headings_" + SEO.hostname + ".csv";
        const rows = [
            ["Heading type", "Heading text"]
        ];

        for (const heading of SEO.headings) {
            rows.push([heading.type, '"' + heading.text + '"']);
        }

        createFileCsvAndDownload(name, rows);
    });

    $("#export_internal_links").on("click", function() {
        const name = "Internal_Links_" + SEO.hostname + ".csv";
        const rows = [
            ["Type", "URL", "Anchor", "Title"]
        ];

        const internal_links = SEO.links.filter(
            (l) => l.link.indexOf(SEO.hostname) !== -1
        );

        for (const internal_link of internal_links) {
            rows.push([
                "Internal Link",
                internal_link.link.replace(/#/g, "%23"),
                '"' + internal_link.anchor + '"',
                '"' + internal_link.title + '"',
            ]);
        }

        createFileCsvAndDownload(name, rows);
    });

    $("#export_all_links").on("click", function() {
        const name = "All_Links_" + SEO.hostname + ".csv";
        const rows = [
            ["Type", "URL", "Anchor", "Title"]
        ];

        const all_links = SEO.links.map((l) => {
            if (l.link.indexOf(SEO.hostname) !== -1) {
                l.type = "Internal Link";
            } else {
                l.type = "External Link";
            }

            return l;
        });

        for (const all_link of all_links) {
            rows.push([
                all_link.type,
                all_link.link.replace(/#/g, "%23"),
                '"' + all_link.anchor + '"',
                '"' + all_link.title + '"',
            ]);
        }

        createFileCsvAndDownload(name, rows);
    });

    $("#export_images").on("click", function() {
        const name = "Images_" + SEO.hostname + ".csv";
        const rows = [
            ["URL", "Alt", "Size (Width x Height)"]
        ];

        for (const image of SEO.images) {
            rows.push([
                image.link.replace(/#/g, "%23"),
                '"' + image.alt + '"',
                image.width + "x" + image.height,
            ]);
        }

        createFileCsvAndDownload(name, rows);
    });

    $("#export_page_copy").on("click", function() {
        const name = "Page_copy_" + SEO.hostname + ".txt";
        createFileTxtAndDownload(name, SEO.words);
    });

    $("#highlight_nofollow_links").on("click", function() {
        //chrome.runtime.sendMessage({ action: 'Highlight Nofollow Links' });
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id, { action: "Highlight Nofollow Links", tabId: tabs[0].id },
                setHighlightLinksButtonLabel
            );
        });
    });
});

function createFileCsvAndDownload(name, rows) {
    let csvContent =
        "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name);

    link.click();
}

function createFileTxtAndDownload(name, data) {
    let fileContent = "data:text/plain;charset=utf-8," + data;

    var encodedUri = encodeURI(fileContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", name);

    link.click();
}

function getTextSpan(colorCode, text) {
    return `<span style="color:${colorCode}; opacity: 1; font-size: 16px; font-weight: 600">${text}</span>`;
}

function getTextP(text) {
    return `<p style="display:inline; font-weight:600">${text}</p>`;
}

function getHTMLWV(webvKey, webval, suffix, color) {
    return `${svgs[color]} ${getTextP(webvKey)} ${getTextSpan(
    colorCode[color],
    webval + suffix
  )}`;
}

function setWebVitals(webVitals) {
    // LCP SVG & COLOR
    let LCP = "";

    if (webVitals.LCP > 4.0) {
        LCP = getHTMLWV("LCP", webVitals.LCP, "s", "red");
    } else if (webVitals.LCP >= 2.5 && webVitals.LCP <= 4.0) {
        LCP = getHTMLWV("LCP", webVitals.LCP, "s", "orange");
    } else if (webVitals.LCP < 2.5 && webVitals.LCP >= 0) {
        LCP = getHTMLWV("LCP", webVitals.LCP, "s", "green");
    } else if (webVitals.LCP < 0) {
        LCP = getHTMLWV("LCP", "-", "-", "grey");
    }
    $("#lcpDataExtension").html($(LCP));

    // INP SVG & COLOR
    let INP = "";

    if (webVitals.INP > 500) {
        INP = getHTMLWV("INP", webVitals.INP, "ms", "red");
    } else if (webVitals.INP >= 200 && webVitals.INP <= 500) {
        INP = getHTMLWV("INP", webVitals.INP, "ms", "orange");
    } else if (webVitals.INP < 200 && webVitals.INP >= 0) {
        INP = getHTMLWV("INP", webVitals.INP, "ms", "green");
    } else if (webVitals.INP < 0) {
        INP = getHTMLWV("INP", "-", "-", "grey");
    }
    $("#inpDataExtension").html($(INP));

    // INP SVG & COLOR
    let CLS = "";

    if (webVitals.CLS > 0.25) {
        CLS = getHTMLWV("CLS", webVitals.CLS, "", "red");
    } else if (webVitals.CLS >= 0.1 && webVitals.CLS <= 0.25) {
        CLS = getHTMLWV("CLS", webVitals.CLS, "", "orange");
    } else if (webVitals.CLS < 0.1 && webVitals.CLS >= 0) {
        CLS = getHTMLWV("CLS", webVitals.CLS, "", "green");
    } else if (webVitals.CLS < 0) {
        LCP = getHTMLWV("CLS", "-", "-", "grey");
    }
    $("#clsDataExtension").html($(CLS));
}

function setWebVitalsError() {
    $("#lcpDataExtension").html("No info available.");
}

function getWebVitals() {
    // let website = new URL(SEO.url).origin;
    chrome.runtime.sendMessage({ action: "Get Web Vitals", website: SEO.url },
        function(data) {
            // webVitals = data;
        }
    );
}

function analize() {
    getWebVitals();
    overview();
    headings();
    statusInfo();
    links();
    images();
    social();
    schema();
}

function overview() {
    $(".content-title").html(SEO.title);
    if (SEO.title != "N/A")
        $(".count-title").html(SEO.title.length + " characters");

    $(".content-description").html(SEO.description);
    if (SEO.description != "N/A")
        $(".count-description").html(SEO.description.length + " characters");

    $(".content-url").html(SEO.url);
    $(".content-url").attr("href", SEO.url);

    if (SEO.canonical !== "Not specified") {
        $(".content-canonical").html(SEO.canonical);
        $(".content-canonical").attr("href", SEO.canonical);
        if (SEO.canonical !== SEO.url) {
            $(".canonical-badge").html("&#9670;");
        }
    } else {
        $(".content-canonical-na").html(SEO.canonical);
    }

    $(".content-meta_robots").html(SEO.meta_robots);
    if (SEO.meta_robots.toLowerCase().includes("noindex")) {
        $(".metarobots-badge").html("&#9670;");
    }


    $(".content-word_count").html(
        SEO.words.replace(/\n/g, " ").split(" ").length.toString()
    );

    function setH1s(id, count){
        $(id).html(count);
        if(count != 1)
        {
            $(id.replace("count", "header")).css("color", "#D83220")
            $(id).css("color", "#D83220")
        }
    }

    function setH2toH6s(id, count){
        $(id).html(count);
        if(count == 0)
        {
            $(id.replace("count", "header")).css("opacity", "0.4")
            $(id).css("opacity", "0.4");
        }
    }

    setH1s(".count-h1", SEO.h1s.length);
    setH2toH6s(".count-h2", SEO.h2s.length);
    setH2toH6s(".count-h3", SEO.h3s.length);
    setH2toH6s(".count-h4", SEO.h4s.length);
    setH2toH6s(".count-h5", SEO.h5s.length);
    setH2toH6s(".count-h6", SEO.h6s.length);

    $(".count-links").html(SEO.links.length);
    $(".count-total_links").html(SEO.links.length);
    $(".count-images").html(SEO.images.length);
    $(".count-total_images").html(SEO.images.length);

    $(".url-sitemap").attr("href", SEO.origin + "/sitemap.xml");
    $(".url-robots").attr("href", SEO.origin + "/robots.txt");
}

function headings() {
    $("#headings .content").html("");

    for (const heading of SEO.headings) {
        const heading_html = `
        <div class="row">
            <div class="col s3 right-align">
                <${heading.type.toLowerCase()}>&lt;${
      heading.type
    }&gt;</${heading.type.toLowerCase()}>
            </div>

            <div class="col s9">
                <${heading.type.toLowerCase()}>${
      heading.text
    }</${heading.type.toLowerCase()}>
            </div>
        </div>
        `;

        $("#headings .content").append(heading_html);
    }
}

function statusInfo() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        chrome.runtime.sendMessage({ action: "Get Status Info", tabId: tabs[0].id },
            function(statusInfo) {
                const codes = {
                    100: "Continue",
                    101: "Switching Protocols",
                    102: "Processing",
                    200: "OK",
                    201: "Created",
                    202: "Accepted",
                    203: "Non-Authoritative Information",
                    204: "No Content",
                    205: "Reset Content",
                    206: "Partial Content",
                    207: "Multi-Status",
                    300: "Multiple Choices",
                    301: "Moved Permanently",
                    302: "Moved Temporarily",
                    303: "See Other",
                    304: "Not Modified",
                    305: "Use Proxy",
                    307: "Temporary Redirect",
                    400: "Bad Request",
                    401: "Unauthorized",
                    402: "Payment Required",
                    403: "Forbidden",
                    404: "Not Found",
                    405: "Method Not Allowed",
                    406: "Not Acceptable",
                    407: "Proxy Authentication Required",
                    408: "Request Time-out",
                    409: "Conflict",
                    410: "Gone",
                    411: "Length Required",
                    412: "Precondition Failed",
                    413: "Request Entity Too Large",
                    414: "Request-URI Too Large",
                    415: "Unsupported Media Type",
                    416: "Requested Range Not Satisfiable",
                    417: "Expectation Failed",
                    418: 'I"m a teapot',
                    422: "Unprocessable Entity",
                    423: "Locked",
                    424: "Failed Dependency",
                    425: "Unordered Collection",
                    426: "Upgrade Required",
                    428: "Precondition Required",
                    429: "Too Many Requests",
                    431: "Request Header Fields Too Large",
                    500: "Internal Server Error",
                    501: "Not Implemented",
                    502: "Bad Gateway",
                    503: "Service Unavailable",
                    504: "Gateway Time-out",
                    505: "HTTP Version Not Supported",
                    506: "Variant Also Negotiates",
                    507: "Insufficient Storage",
                    509: "Bandwidth Limit Exceeded",
                    510: "Not Extended",
                    511: "Network Authentication Required",
                };

                const separator_html = `<div class="redirect"><img src="images/redirect.png"></div>`;

                const info = statusInfo.statusInfo;

                let statusHeaderResponseCode = 0;

                for (const [i, data] of info.entries()) {
                    if (data) {
                        const statusCode = data.statusCode;
                        statusHeaderResponseCode = Math.max(
                            statusHeaderResponseCode,
                            statusCode
                        );
                        const statusCodeString = `${statusCode} (${codes[statusCode]})`;
                        const url = data.url;

                        const blackColorJS = `style="background-color: #6b6d76 !important"`;
                        const status_html = `
												<div class="load-status">
													<div class="header" ${
                            data.redirect ? blackColorJS : ""
                          } data-code="${statusCode}">
																	${data.redirect ? "JS" : statusCodeString}
																	</div>
													<div class="url">
														<a href="${url}" target="_blank">${url}</a>
													</div>
												</div>
												`;

                        $("#status .list-status").append(status_html);

                        if (i !== info.length - 1) {
                            $("#status .list-status").append(separator_html);
                        }
                    }
                }
                $("#status-header-status").attr(
                    "data-code",
                    `${statusHeaderResponseCode}`
                );
            }
        );
    });
}

function links() {
    const unique_links = [...new Set(SEO.links.map((l) => l.link))];
    const internal_links = SEO.links.filter(
        (l) => l.link && l.link.indexOf && l.link.indexOf(SEO.hostname) !== -1
    );
    const external_links = SEO.links.filter(
        (l) => l.link && l.link.indexOf && l.link.indexOf(SEO.hostname) === -1
    );

    $(".count-unique_links").html(unique_links.length);
    $(".count-internal_links").html(internal_links.length);
    $(".count-external_links").html(external_links.length);

    $(".internal-links").html("");
    $(".external-links").html("");

    for (const link of internal_links) {
        const link_html = `
        <div class="row">
            <div class="col s3">
                ANCHOR
                <br>
                LINK
            </div>

            <div class="col s9 text">
                ${link.anchor}
                <br>
                <a href="${link.link}" target="_blank">${link.link}</a>
            </div>
        </div>
        `;

        $(".internal-links").append(link_html);
    }

    for (const link of external_links) {
        const link_html = `
        <div class="row">
            <div class="col s3">
                ANCHOR
                <br>
                LINK
            </div>

            <div class="col s9 text">
                ${link.anchor}
                <br>
                <a href="${link.link}" target="_blank">${link.link}</a>
            </div>
        </div>
        `;

        $(".external-links").append(link_html);
    }
}

function images() {
    const with_alt_images = SEO.images.filter((i) => i.alt != "-");
    const without_alt_images = SEO.images.filter((i) => i.alt == "-");

    $(".count-with_alt_images").html(with_alt_images.length);
    $(".count-without_alt_images").html(without_alt_images.length);

    $("#images .list-images .textTabbing").html("");

    for (const image of SEO.images) {
        const image_html = `
        <div class="row">
            <div class="col s3">
                ALT
                <br>
                LINK
            </div>

            <div class="col s9 text">
                ${image.alt}
                <br>
                <a href="${image.link}" target="_blank">${image.link}</a>
            </div>
        </div>
        `;

        $("#images .list-images .textTabbing").append(image_html);
    }
}

function social() {
    let socialData = SEO.socialData;
    $("#social .social-preview-sitename").html(socialData.siteName);
    $("#social #social-og-title").html(socialData.ogTitle);
    $("#social #social-og-description").html(socialData.ogDescription);
    $("#social #social-og-image").attr("src", socialData.ogImage);

    $("#social #social-twitter-title").html(socialData.twitterTitle);
    $("#social #social-twitter-description").html(socialData.twitterDescription);
    if(socialData.twitterImage)
        $("#social #social-twitter-image").attr("src", socialData.twitterImage);
}

function schema() {
    $("#schema .tabbing").html("");

    $("#schema .tabbing").append(
        '<h1 class="center-align no-data-found">No Structured Data found.</h1>'
    );

    if (SEO.schema.length > 0) {
        let allSchema = SEO.schema.map((item) => JSON.parse(item));

        for (const data of SEO.schema) {
            if (data && data != "null" && data != "undefined") {
                // console.log(data);
                const schema = JSON.parse(data);
                let list_items;

                if (schema["@graph"]) {
                    const graph = schema["@graph"];
                    let index = -1;
                    let indexFinder = graph.find(function(item, i) {
                        if (Array.isArray(item["@type"])) {
                            index = i;
                            return i;
                        }
                    });
                    if (index === -1) {
                        index = graph.length - 1;
                    }
                    // list_items = setSchemaItem(graph[graph.length - 1], "", graph);

                    list_items = setSchemaItem(graph[index], "", graph);
                } else if (schema["@id"]) {
                    // let existingItems = SEO.schema.filter(
                    // 	(item) => item.indexOf(schema['@id']) > -1
                    // ).length;
                    // console.log(`"@id":${schema['@id']}`);
                    let existingItems = SEO.schema.filter(
                        (item) => item.indexOf(`"@id":"${schema["@id"]}"`) > -1
                    ).length;
                    if (existingItems === 1 || ATypes[schema["@type"]]) {
                        list_items = setSchemaItem(schema, "", allSchema);
                    }
                } else {
                    list_items = setSchemaItem(schema, "", allSchema);
                }

                let graph_html = `
            <div class="parent">
                ${list_items}
            </div>
            `;
                // graph_html = graph_html.replace('{{item}}', list_items);
                if (list_items) {
                    $(".no-data-found").remove();
                    $("#schema .tabbing").append(graph_html);
                }
            }
        }
    }
}

var depth = 0;

function setSchemaItem(item, backup_parent_name = "", graph = []) {
    if (depth > 100) return;
    ++depth;
    let list_items = "";
    let parent_html = "";

    if (typeof item == "string") {
        parent_html = "{{item}}";

        list_items += `
        <div class="row">
            <div class="col s3">${backup_parent_name}</div>
            <div class="col s9">${item}</div>
        </div>
        `;
    } else if (item) {
        if (item["@type"] && typeof item["@type"] == "string") {
            item["@type"] = item["@type"].replace("http://schema.org/", "");
            item["@type"] = item["@type"].replace("https://schema.org/", "");
        }
        parent_html = `
            <h3>${item["@type"] || item["caption"] || backup_parent_name}</h3>
            <div class="textTabbing">{{item}}</div>
        `;

        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const value = item[key];

                if (
                    typeof value == "string" ||
                    typeof value == "number" ||
                    typeof value == "boolean"
                ) {
                    list_items += `
                    <div class="row">
                        <div class="col s3">${key}</div>
                        <div class="col s9">${value}</div>
                    </div>
                    `;
                } else if (Array.isArray(value)) {
                    if (
                        typeof value[0] == "string" ||
                        typeof value[0] == "number" ||
                        typeof value[0] == "boolean"
                    ) {
                        let list_valueOf = "";

                        for (const valueOf of value) {
                            list_valueOf += valueOf + "<br/>";
                        }

                        list_items += `
							<div class="row">
									<div class="col s3">${key}</div>
									<div class="col s9">${list_valueOf}</div>
							</div>`;
                    } else {
                        list_items += `
							<div class="row">
									<div class="col s3">${key}</div>
									<div class="col s9"></div>
							`;

                        for (const new_parent of value) {
                            list_items += setSchemaItem(new_parent, key, graph);
                        }

                        list_items += "</div>";
                    }
                } else if (typeof value == "object") {
                    list_items += `
                        <div class="row">
                            <div class="col s3">${key}</div>
                            <div class="col s9"></div>
                        `;
                    if (value["@id"]) {
                        const id = value["@id"];

                        const new_parent = graph.filter((data) => {
                            if (data && data != "null" && data != "undefined")
                                return data["@id"] == id;
                            else return false;
                        })[0];

                        if (new_parent) {
                            list_items += setSchemaItem(new_parent, "", graph);
                        } else {
                            list_items += setSchemaItem(value, "", graph);
                        }
                    } else {
                        list_items += setSchemaItem(value, "", graph);
                    }

                    list_items += "</div>";
                }
            }
        }
    }

    parent_html = parent_html.replace("{{item}}", list_items);

    return parent_html;
}