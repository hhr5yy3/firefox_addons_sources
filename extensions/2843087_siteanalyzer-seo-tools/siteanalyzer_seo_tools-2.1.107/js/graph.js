const seoExtensionAPI = typeof browser !== "undefined" ? browser : chrome;

const translations = {
  ru: {
    showHorizontal: "Показать горизонатально",
    showVertical: "Показать вертикально",
    pageDepth: "Уровень вложенности",
    status: "Код ответа",
    savePNG: "Сохранить в PNG",
    expandAllNodes: "Развернуть все узлы",
    collapseAllNodes: "Свернуть все узлы",
    outLinksCount: "Исходящие ссылки",
    internalLinksCount: "Внутренние страницы",
  },
  en: {
    showHorizontal: "Show Horizontally",
    showVertical: "Show Vertically",
    pageDepth: "Depth Level",
    status: "Status Code",
    savePNG: "Save as PNG",
    expandAllNodes: "Expand All Nodes",
    collapseAllNodes: "Collapse All Nodes",
    outLinksCount: "Outgoing links",
    internalLinksCount: "Internal pages",
  },
  es: {
    showHorizontal: "Mostrar Horizontalmente",
    showVertical: "Mostrar Verticalmente",
    pageDepth: "Nivel de Profundidad",
    status: "Código de Respuesta",
    savePNG: "Guardar como PNG",
    expandAllNodes: "Expandir Todos los Nodos",
    collapseAllNodes: "Contraer Todos los Nodos",
    outLinksCount: "Enlaces salientes",
    internalLinksCount: "Páginas internas",
  },
  uk: {
    showHorizontal: "Показати горизонтально",
    showVertical: "Показати вертикально",
    pageDepth: "Рівень вкладеності",
    status: "Код відповіді",
    savePNG: "Зберегти як PNG",
    expandAllNodes: "Розгорнути всі вузли",
    collapseAllNodes: "Згорнути всі вузли",
    outLinksCount: "Вихідні посилання",
    internalLinksCount: "Внутрішні сторінки",
  },
};

let tree = {};
let isVertical = false;
let isCollapsed = false;
let hostname;
let graphName = "";
let currentLocale;

seoExtensionAPI.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "renderGraph") {
      const treeObj = request.tree;
      const locale = request.locale;

      tree = treeObj;
      currentLocale = locale;
      hostname = request.hostname;

      initHtmlElements(locale);
      configureShowGraphButton();
      renderGraph(treeObj);
    }
  }
);

function getSVGString(svgNode, attrs) {
  const clone = svgNode.cloneNode(true);

  clone.setAttribute("xlink", "http://www.w3.org/1999/xlink");
  clone.setAttribute("width", attrs.width);
  clone.setAttribute("height", attrs.height);
  clone.setAttribute("viewBox", `0 0 ${attrs.width} ${attrs.height}`);

  const whiteRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  whiteRect.setAttribute("width", "100%");
  whiteRect.setAttribute("height", "100%");
  whiteRect.setAttribute("fill", "white");
  clone.insertBefore(whiteRect, clone.firstChild);

  const logoImage = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "image"
  );
  logoImage.setAttribute("x", 10);
  logoImage.setAttribute("y", 10);
  logoImage.setAttribute("width", 100);
  logoImage.setAttribute("height", 40);
  logoImage.setAttribute("href", "./res/logo_site.png");

  clone.insertBefore(logoImage, clone.firstChild);

  const serializer = new XMLSerializer();
  let svgString = serializer.serializeToString(clone);
  svgString = svgString.replace(/(\w+)?:?xlink=/g, "xmlns:xlink=");
  svgString = svgString.replace(/NS\d+:href/g, "xlink:href");

  return svgString;
}

function svgString2Image(svgString, width, height, format, callback) {
  format = format || "png";

  const imgsrc =
    "data:image/svg+xml;base64," +
    btoa(unescape(encodeURIComponent(svgString)));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const scaleKoef = 1;

  canvas.width = width * scaleKoef;
  canvas.height = height * scaleKoef;

  context.scale(scaleKoef, scaleKoef);

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const image = new Image();
  image.onload = function () {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    canvas.toBlob(function (blob) {
      const filesize = Math.round(blob.length / 1024) + " KB";
      if (callback) callback(blob, filesize);
    });
  };

  image.src = imgsrc;
}

function initHtmlElements(locale) {
  const logoLink = document.querySelector(".logo-link");
  const showGraphButton = document.querySelector("#show-graph-button");
  const expandButton = document.querySelector("#expand-button");
  const savePngButton = document.querySelector("#save-png-button");

  showGraphButton.innerHTML = translations[locale].showHorizontal;
  expandButton.innerHTML = translations[locale].collapseAllNodes;
  savePngButton.innerHTML = translations[locale].savePNG;

  logoLink.href = `https://site-analyzer.${locale === "ru" ? "ru" : "pro"}/`;
}

function changeGraphOrientation(e) {
  isVertical = !isVertical;
  renderGraph(tree, isVertical);

  e.target.innerHTML = isVertical
    ? translations[currentLocale].showVertical
    : translations[currentLocale].showHorizontal;
}

function configureShowGraphButton() {
  const showGraphButton = document.querySelector("#show-graph-button");
  showGraphButton.addEventListener("click", changeGraphOrientation);
}

function configureExpandButton(root, updateTree) {
  const expandButton = document.querySelector("#expand-button");
  expandButton.addEventListener("click", () => {
    expandButton.innerHTML = isCollapsed
      ? translations[currentLocale].collapseAllNodes
      : translations[currentLocale].expandAllNodes;

    function expandAllNodes(node) {
      if (node.collapsedChildren) {
        node.children = node.collapsedChildren;
        node.collapsedChildren = null;
      }

      if (node.children) {
        node.children.forEach(expandAllNodes);
      }
    }

    function collapseAllNodes(node) {
      if (node.id) {
        if (node.children) {
          node.collapsedChildren = node.children;
          node.children = null;
        }
  
        if (node.collapsedChildren) {
          node.collapsedChildren.forEach(collapseAllNodes);
        }
      } else {
        if (node.children) {
          node.children.forEach(collapseAllNodes);
        }
      }
    }

    if (isCollapsed) expandAllNodes(root)
    else collapseAllNodes(root);

    isCollapsed = !isCollapsed;

    updateTree(root);
  });
}

function configureSavePngButton(g, svg) {
  let savePngButton = document.querySelector("#save-png-button");

  savePngButton.replaceWith(savePngButton.cloneNode(true));

  savePngButton = document.querySelector("#save-png-button");

  savePngButton.addEventListener("click", () => downloadGraph(g, svg));
}

function downloadGraph(g, svg) {
  const loader = document.querySelector(".loader-container");
  loader.style.display = "flex";
  let initTranform = g.attr("transform");
  g.attr("transform", `translate(0, 0)  scale(1)`);

  const svgNode = svg.node();
  const bbox = svgNode.getBBox();
  const height = bbox.height;
  const width = bbox.width;
  const roundedHeight = Math.ceil(height / 100) * 100 + 100;
  const roundedWidth = Math.ceil(width / 100) * 100 + 40;

  const gattrs = {
    width: roundedWidth,
    height: roundedHeight,
    top: 0,
  };

  const gBBox = g.node().getBBox();
  const verticalShift = (roundedHeight - gBBox.height) / 2 - gBBox.y;
  const horizontalShift = (roundedWidth - gBBox.width) / 2 - gBBox.x;

  g.attr("transform", `translate(${horizontalShift}, ${verticalShift})`);

  const save = (dataBlob, filesize) =>
    saveAs(dataBlob, `${hostname}_visualisation.png`);
  const svgString = getSVGString(svgNode, gattrs);
  console.log(svgString);

  svgString2Image(svgString, gattrs.width, gattrs.height, "png", save);

  g.attr("transform", initTranform);

  setTimeout(() => {
    loader.style.display = "none";
  }, 3000);
}

function renderGraph(treeObj, isVertical = false) {
  const mainSvg = document.querySelector(".main-svg");

  mainSvg.innerHTML = "";
  graphName = treeObj.name;

  const width = document.querySelector("#border").clientWidth;
  const height = document.querySelector("#border").clientHeight;
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const nodeHeight = isVertical ? 330 : 50;
  const nodeWidth = isVertical ? 1400 : 900;

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("box-shadow", "0px 4px 10px rgba(0, 0, 0, 0.2)")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "14px")
    .style("display", "none")
    .style("z-index", "1000");

  let isInsideTooltip = false;

  tooltip
    .on("mouseenter", () => {
      isInsideTooltip = true;
    })
    .on("mouseleave", () => {
      isInsideTooltip = false;
      tooltip.style("display", "none");
    });

  const svg = d3.select("svg");
  const g = svg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const gLinks = g.append("g").attr("class", "links");
  const gNodes = g.append("g").attr("class", "nodes");

  const zoom = d3.zoom().on("zoom", function () {
    g.attr("transform", d3.zoomTransform(this));
  });

  svg.call(zoom);

  svg.call(zoom.transform, d3.zoomIdentity.scale(0.3));

  const treeLayout = d3
    .tree()
    .size([innerHeight, innerWidth])
    .nodeSize([nodeHeight, nodeWidth]);
  const root = d3.hierarchy(treeObj);

  let nodeId = 0;
  root.each((d) => {
    d.id = nodeId++;
  });

  function updateTree(source) {
    const links = treeLayout(root).links();
    const nodes = root.descendants();

    const linkSelection = gLinks
      .selectAll("path")
      .data(links, (d) => d.target.id);

    linkSelection
      .enter()
      .append("path")
      .attr("d", (d) => {
        const o = { x: source.x0 || d.source.x, y: source.y0 || d.source.y };
        return isVertical
          ? d3
              .linkVertical()
              .x(() => o.x)
              .y(() => o.y)(d)
          : d3
              .linkHorizontal()
              .x(() => o.y)
              .y(() => o.x)(d);
      })
      .style("fill", "none")
      .style("stroke-width", "2px")
      .style("stroke", "#c2bfbf")
      .merge(linkSelection)
      .transition()
      .duration(500)
      .attr(
        "d",
        isVertical
          ? d3
              .linkVertical()
              .x((d) => d.x)
              .y((d) => d.y)
          : d3
              .linkHorizontal()
              .x((d) => d.y)
              .y((d) => d.x)
      );

    linkSelection
      .exit()
      .transition()
      .duration(500)
      .style("stroke-opacity", 0)
      .remove();

    const nodeSelection = gNodes.selectAll(".node").data(nodes, (d) => d.id);

    const nodeEnter = nodeSelection
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => {
        const o = { x: source.x0 || d.x, y: source.y0 || d.y };
        return `translate(${isVertical ? `${o.x},${o.y}` : `${o.y},${o.x}`})`;
      })
      .on("click", (event, d) => {
        if (d.id) {
          if (d.children) {
            d.collapsedChildren = d.children;
            d.children = null;
          } else {
            d.children = d.collapsedChildren;
            d.collapsedChildren = null;
          }

          d3.select(event.currentTarget)
          .select("text")
          .text(d.children ? "-" : "+");
        }
        updateTree(d);
      });

    if (isVertical) {
      nodeEnter
        .append("foreignObject")
        .attr("x", isVertical ? -150 : 20)
        .attr("y", isVertical ? 8 : -12)
        .attr("width", isVertical ? 300 : nodeWidth - 80)
        .attr("height", 50)
        .append("xhtml:div")
        .style("border", "1px solid black")
        .style("padding", "5px")
        .style("font-size", "14px")
        .style("color", "#333")
        .style("font-family", "Arial, sans-serif")
        .style("background-color", "white")
        .style("border-radius", "5px")
        .style("text-align", "left")
        .style("display", "-webkit-box")
        .style("-webkit-line-clamp", "2")
        .style("-webkit-box-orient", "vertical")
        .style("overflow", "hidden")
        .style("text-overflow", "ellipsis")
        .style("line-height", "19.2px")
        .style("height", "36px")
        .text((d) => `${d.data.h1 || "H1 - N/A"}`);
    } else {
      nodeEnter
        .append("foreignObject")
        .attr("x", 20)
        .attr("y", -12)
        .attr("width", nodeWidth - 80)
        .attr("height", 25)
        .append("xhtml:div")
        .style("overflow", "hidden")
        .attr("class", "node-text")
        .style("font-size", "22px")
        .style("color", "black")
        .style("font-family", "Arial, sans-serif")
        .style("text-align", "left")
        .style("display", "-webkit-box")
        .style("-webkit-line-clamp", "1")
        .style("-webkit-box-orient", "vertical")
        .style("overflow", "hidden")
        .style("text-overflow", "ellipsis")
        .text((d) => `${d.data.h1 || "H1 - N/A"}`);
    }

    nodeEnter
      .append("circle")
      .attr("r", 12)
      .style("fill", (d) => (d.data.status !== 200 ? "#df2a4a" : "#81bf38"))
      .attr("stroke", (d) =>
        d.children || d.collapsedChildren ? "#547656" : "transparent"
      )
      .style("stroke-width", 4);

    nodeEnter
      .append("text")
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => {
        if (d.collapsedChildren && d.id) {
          return "+";
        }

        if (d.children && d.id) {
          return "-";
        }

        return "";
      })
      .style("fill", "#000")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("transform", "translateY(-2px)")
      .style("color", "white")
      .style("fill", "white");

    nodeEnter
      .append("rect")
      .attr("x", -50)
      .attr("y", -15)
      .attr("width", isVertical ? 100 : nodeWidth - 40)
      .attr("height", isVertical ? 40 : nodeHeight - 20)
      .style("fill", "transparent");

    nodeEnter
      .on("mouseenter", function (event, d) {
        const tooltipX = event.pageX + 10;
        const tooltipY = event.pageY + 10;

        tooltip
          .html(
            `
              <div class="tooltip-row">
              <strong>URL:</strong> <a href="${d.data.link}" target="_blank">${
              d.data.link || "N/A"
            }</a>
              </div>
              <div class="tooltip-row">
              <strong>Title:</strong> ${d.data.name || "N/A"}
              </div>
              <div class="tooltip-row">
              <strong>H1:</strong> ${d.data.h1 || "N/A"}
              </div>
              <div class="tooltip-row">
               <strong>${translations[currentLocale].pageDepth}:</strong> ${
              d.data.level || "N/A"
            }
               </div>
               <div class="tooltip-row">
              <strong>${translations[currentLocale].status}:</strong> ${
              d.data.status || "N/A"
            }
              </div>
              <div class="tooltip-row">
              <strong>${translations[currentLocale].outLinksCount}:</strong> ${
              d.data.outgoingLinks?.length || "0"
            } 
              </div>
               </div>
              <div class="tooltip-row">
              <strong>${
                translations[currentLocale].internalLinksCount
              }:</strong> ${
              d.children?.length || d.collapsedChildren?.length || "0"
            } 
              </div>
            `
          )
          .style("left", `${tooltipX}px`)
          .style("top", `${tooltipY}px`)
          .style("z-index", "1000")
          .style("font-size", "16px")
          .style("max-width", "430px")
          .style("width", "430px")
          .style("display", "block");
      })
      .on("mouseleave", function () {
        setTimeout(() => {
          if (!isInsideTooltip) {
            tooltip.style("display", "none");
          }
        }, 200);
      });

    const nodeUpdate = nodeEnter.merge(nodeSelection);

    nodeUpdate
      .transition()
      .duration(500)
      .attr(
        "transform",
        (d) => `translate(${isVertical ? `${d.x},${d.y}` : `${d.y},${d.x}`})`
      );

    nodeUpdate.select("text").text((d) => {
      if (d.collapsedChildren && d.id) {
        return "+";
      }

      if (d.children && d.id) {
        return "-";
      }

      return "";
    });

    nodeSelection
      .exit()
      .transition()
      .duration(500)
      .attr("transform", (d) => {
        const o = { x: source.x0 || d.x, y: source.y0 || d.y };
        return `translate(${isVertical ? `${o.x},${o.y}` : `${o.y},${o.x}`})`;
      })
      .style("opacity", 0)
      .remove();

    nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // const { horizontalShift, verticalShift } = getCenterShifts();

  // g.attr(
  //   "transform",
  //   `translate(${horizontalShift}, ${verticalShift}) scale(0.4)`
  // );
  // function getCenterShifts() {
  //   const svgNode = svg.node();
  //   const bbox = svgNode.getBBox();
  //   const gBBox = g.node().getBBox();
  //   const verticalShift = (bbox.height + 40 - gBBox.height) / 2 - gBBox.y;
  //   const horizontalShift = (bbox.width + 40 - gBBox.width) / 2 - gBBox.x;

  //   return { horizontalShift, verticalShift };
  // }

  updateTree(root);
  configureExpandButton(root, updateTree);
  centerGraphManually();

  function centerGraphManually() {
    const gBBox = g.node().getBBox();
    const svgBBox = svg.node().getBBox();

    const verticalShift = svgBBox.height / 2;
    const horizontalShift = svgBBox.width / 2;

    g.attr(
      "transform",
      `translate(${horizontalShift}, ${verticalShift}) scale(0.3)`
    );
  }

  configureSavePngButton(g, svg, isVertical);
}
