const MAX_INLINE_LEN = 400;
let data = build_response(null);

seoExtensionAPI.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  // count html, scripts, css
  data = build_response(request);
  sendResponse(data);
});

// builds response object
function build_response(request) {
  const htmlArr = [];
  const jsArr = [];
  const cssArr = [];
  const jsonArr = [];
  const otherArr = [];

  var is_initial = !request;

  try {
    get_js(
      jsArr,
      htmlArr,
      jsonArr,
      otherArr,
      is_initial,
      request ? request.showonclick : false
    );
    var response = {
      url: location.href,
      js: jsArr,
      css: cssArr,
      json: jsonArr,
      other: otherArr,
    };

    // get html body + template scripts
    if (request) {
      get_css(cssArr, is_initial);

      response.html = [
        { inline: get_dom(), count: document.getElementsByTagName("*").length },
      ];
      for (var i = 0; i < htmlArr.length; i++) {
        response.html.push(htmlArr[i]);
      }
    }
  } catch (e) {
    return { err: "" + e };
  }

  return response;
}

// get body as string
function get_dom() {
  //    return document.documentElement.outerHTML;

  // truncate long scripts+styles in HTML, they are listed separately

  var dupNode = document.documentElement.cloneNode(true);

  function truncate(nodes) {
    var i, s;
    for (i = 0; i < nodes.length; i++) {
      s = nodes[i].innerHTML;
      if (s && s.length > MAX_INLINE_LEN)
        nodes[i].innerHTML =
          s.substr(0, MAX_INLINE_LEN) + " truncated " + s.length + "bytes...";
    }
  }

  truncate(dupNode.getElementsByTagName("script"));
  truncate(dupNode.getElementsByTagName("style"));

  return dupNode.outerHTML;
}

// enumerate JS scripts in page
// returns 2 arrays: js and html content
function get_js(jsArr, htmlArr, jsonArr, otherArr, mark_initial, show_onclick) {
  var i, node;

  var nodes = document.getElementsByTagName("script");
  for (i = 0; i < nodes.length; i++) {
    node = nodes[i];
    if (
      !node.type ||
      node.type === "text/javascript" ||
      node.type === "application/javascript"
    )
      pick_node(node, jsArr, mark_initial);
    else if (
      node.type === "application/json" ||
      node.type === "application/ld+json"
    )
      pick_node(node, jsonArr, mark_initial);
    else if (
      node.type === "text/template" ||
      node.type === "text/x-template" ||
      node.type === "text/html"
    )
      pick_node(node, htmlArr, mark_initial);
    else pick_node(node, otherArr, mark_initial);
  }
  // inline onclick-handlers
  if (show_onclick) {
    nodes = document.getElementsByTagName("*");
    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      if (node.getAttribute("onclick")) {
        var item = pick_node(node, jsArr, mark_initial);
        var s = "/* " + node.tagName.toLowerCase();
        if (node.id) s += "#" + node.id;
        if (node.className) s += "." + node.className;
        s += ".onclick = */\n";
        item.inline = s + node.getAttribute("onclick");
        item.src = null;
        item.dynamic = false;
        item.onclick = true;
      }
    }
  }
}

// enumerate CSS in page
function get_css(a, mark_initial) {
  var i;

  var csslist = document.styleSheets;
  for (i = 0; i < csslist.length; i++) {
    var css = csslist[i];

    pick_node(css.ownerNode, a, mark_initial);

    parse_cssrules(css, a, mark_initial, 0);
  }

  /*
  var styles = document.getElementsByTagName("link");
  for(i=0; i<styles.length; i++){
      node = styles[i];
      if (node.rel == "stylesheet" || node.type == "text/css")
          pick_node(node, a, mark_initial);
  }

  styles = document.getElementsByTagName("style");
  for(i=0; i<styles.length; i++){
      node = styles[i];
      pick_node(node, a, mark_initial);
  }*/
}

// parse "@import file.css" declarations in given css file
function parse_cssrules(cssNode, a, mark_initial, depth) {
  if (depth > 10 || !cssNode) return;

  try {
    var rules = cssNode.cssRules;
  } catch (e) {
    // can't access all cssRules - Chrome 64 returns SecurityError
    // just ignore these items, they seem duplicates anyway
    //var item = {"src":"error "+cssNode.href};
    //a.push(item);
    return;
  }

  if (rules) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];

      if (rule instanceof CSSImportRule) {
        var s = rule.styleSheet;
        var item = pick_node({ href: s.href }, a, mark_initial);
        item.imported = true;
        parse_cssrules(rule.styleSheet, a, mark_initial, depth + 1);
      }
    }
  }
}

// picks element's src-url or inline content
function pick_node(node, array, mark_initial) {
  // skip extension scripts
  var src = node.href || node.src;
  if (src && startsWith("" + src, "chrome-extension:")) return null;

  var item;
  if (src) item = { src: src };
  else item = { inline: node.innerText || node.text || "" + node };

  // mark initially loaded elems
  if (mark_initial) node._xinit = true;

  if (!node._xinit) item["dynamic"] = true;

  array.push(item);
  return item;
}

function startsWith(s, sub) {
  return s.indexOf(sub) === 0;
}
