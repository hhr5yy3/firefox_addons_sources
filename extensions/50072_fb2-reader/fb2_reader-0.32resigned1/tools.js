const FB2_NS = 'http://www.gribuser.ru/xml/fictionbook/2.0'
const XLink_NS = 'http://www.w3.org/1999/xlink'
const HTML_NS = 'http://www.w3.org/1999/xhtml'

function nsResolver() {
    return FB2_NS
}

// see https://developer.mozilla.org/en/Xml/id
// and http://bit.ly/24gZUo for a reason why it is needed
function getElements(doc, query, resultType) {
    if (resultType == null)
        resultType = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE

    // could use: namespace-uri()='"+FB2_NS+"' and ..
    return doc.evaluate("//fb2:"+query, doc.documentElement, nsResolver, resultType, null)
}

function getSingleElement(doc, query) {
    return getElements(doc, query, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue
}

function getHrefVal(elem) { // returns id of element XLink ponts to, like l:href="#note1"
    return elem.getAttributeNS(XLink_NS, 'href').slice(1)
}

var fb2 = {
    tooltip: function(event) {
        const SCROLLBAR = 24 // I wonder if there is a reliable way to get it

        var a = event.target
        var doc = event.target.ownerDocument
        if (a.nodeName=='a'){

            try { // move it here if not yet
                var note = getSingleElement(doc, "section[@id='" + getHrefVal(a) + "']")
                a.appendChild(note)
            } catch(e) { // just get it
                var note = a.firstChild
                while (note.nodeName != 'section')
                    note = note.nextSibling
            }

            // alters the note's box position_h to keep it on screen
            if ( note.getBoundingClientRect().right > window.innerWidth - SCROLLBAR)
                note.setAttribute('position_h', 'left')
            if ( note.getBoundingClientRect().left < 0 )
                note.setAttribute('position_h', '')

            // alters the note's box position_v to keep it on screen
            if ( note.getBoundingClientRect().bottom > window.innerHeight - SCROLLBAR)
                note.setAttribute('position_v', 'up')
            if ( note.getBoundingClientRect().top < 0 )
                note.setAttribute('position_v', '')
        }
    },

    init: function(doc) {
        // for each fb2 image we will create xHTML one
        var images = getElements(doc, "image")
        for ( var i=0 ; i < images.snapshotLength; i++ ) {
            try { // ignore malformed images
                var img = images.snapshotItem(i)
                // we get corresponding binary node
                var bin = getSingleElement(doc, "binary[@id='" + getHrefVal(img) + "']")
                // create xhtml image and set src to its base64 data
                var ximg = doc.createElementNS(HTML_NS, 'img')
                ximg.src='data:' + bin.getAttribute('content-type') + ';base64,' + bin.textContent
                img.parentNode.insertBefore(ximg, img)
            } catch(e) {
                console.log(e)
            }
        }

        // add listener to all footnote links
        var notelinks = getElements(doc, "a[@type='note']")
        for ( var i=0 ; i < notelinks.snapshotLength; i++ ) {
            var note = notelinks.snapshotItem(i)
            note.addEventListener("mouseover", fb2.tooltip, true)
        }

        // build index
        var body = getSingleElement(doc, "body[@name!='notes' or not(@name)]")
        var div = doc.getElementById('contents')
        var ul = doc.createElementNS(HTML_NS, 'ul')
        div.appendChild(ul)

        var title_counter = 1;
        var walk_sections = function(start, ul) {
            var sections = doc.evaluate("./fb2:section", start,
                    nsResolver,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null
                    );
            for ( var i=0 ; i < sections.snapshotLength; i++ ) {
                var section = sections.snapshotItem(i)
                var title = doc.evaluate("./fb2:title", section,
                        nsResolver,
                        XPathResult.FIRST_ORDERED_NODE_TYPE, null
                        ).singleNodeValue;
                if (title) {
                    var title_copy = title.cloneNode(true)

                    // cleanse ids of copied intitle elements
                    var kids = doc.evaluate("//fb2:*", title_copy,
                            nsResolver,
                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null
                            );
                    for(var j=0; j<kids.snapshotLength; j++ )
                        kids.snapshotItem(j).setAttribute("id", "")

                    var a = doc.createElementNS(HTML_NS, 'a')
                    a.appendChild(title_copy)

                    // for usual local href navigation, no hacks
                    var span = doc.createElementNS(HTML_NS, 'span')
                    span.id = "zz_" + title_counter++;
                    title.insertBefore(span, title.firstChild)
                    a.href= "#"+span.id;

                    var li = doc.createElementNS(HTML_NS, 'li')
                    li.appendChild(a)
                    ul.appendChild(li)
                    var sub_ul = doc.createElementNS(HTML_NS, 'ul')
                    li.appendChild(sub_ul)
                    walk_sections(section, sub_ul)
                }
            }
        }

        if (body)
            walk_sections(body, ul)

        // documents without proper sectioning are not that unusual
        if (!ul.hasChildNodes()){
            div.parentNode.removeChild(div)
        }

        // replace FB2 links with xHTML ones
        var extlinks = getElements(doc, "a[@type!='note' or not(@type)]")
        for ( var i=0 ; i < extlinks.snapshotLength; i++ ) {
            var link = extlinks.snapshotItem(i)
            var href = link.getAttributeNS(XLink_NS, 'href')
            var xlink= doc.createElementNS(HTML_NS, 'a')
            xlink.href = href
            link.parentNode.insertBefore(xlink, link)
            // move contents
            while(link.firstChild)
                xlink.appendChild(link.firstChild)

            // for local links to FB2 elements we will create HTML anchors
            if (href.slice(0,1) == '#') {
                var id = href.slice(href.indexOf("#")+1)
                var elem = getSingleElement(doc, "*[@id='"+id+"']")
                if (elem) {
                    elem.setAttribute("id", "")
                    var span = doc.createElementNS(HTML_NS, 'span')
                    span.id = id
                    elem.parentNode.insertBefore(span, elem)
                }
            } else {
                xlink.target = "_blank"
            }
        }
    } // onPageLoad end
}
