function grid(request, sender, sendResponse) {


  addGrid(request);
  browser.runtime.onMessage.removeListener(grid);
}

function create_str(){

    var grid = document.getElementById("grid-addon");

    if (grid===null){

      /*  $("body").append('<div id="grid-addon"><button class="close_grid">X</button>' +
            '<div id="container-addon" class="container-addon set_padding">' +
            '<div class="bg skin_bg"></div>' +
            ' <div class="row-addon" id="row-addon"></div>' +
            '</div></div>');
*/

        grid = document.createElement("div");
        grid.setAttribute('id', 'grid-addon');

        var close_btn = document.createElement("button");
        var close_text = document.createTextNode("x");
        close_btn.setAttribute('class', 'close_grid');

        close_btn.appendChild(close_text);

        var container =  document.createElement("div");
        container.setAttribute('id', 'container-addon');
        container.setAttribute('class', 'container-addon set_padding');

        var row =  document.createElement("div");
        row.setAttribute('id', 'row-addon');
        row.setAttribute('class', 'row-addon');

        var skin_bg =  document.createElement("div");
        skin_bg.setAttribute('class', 'bg skin_bg');

        container.appendChild(skin_bg);
        container.appendChild(row);

        grid.appendChild(close_btn);
        grid.appendChild(container);

        document.body.appendChild(grid);


        close_btn.addEventListener('click',function () {
            document.body.removeChild(grid);
        });

    }
}
function addGrid(config) {


    create_str();

    var container = document.getElementById("container-addon");
    var row  = document.getElementById("row-addon");
    var gutter = config.gutter/2;
    var width;
    var maxwidth;
    var prevcols = 0;
    var prevskin='000000';
    var prev_padding = 0;



    if (config.vtype=='percent'){
        width = config.width+"%";
        maxwidth = '100%';
    }else{
        width = '100%';
        maxwidth = (config.width)+"px";
    }


    container.style.width = width;
    container.style.maxWidth = maxwidth;



    if (prevcols!=config.columns){
        prevcols = config.columns;

        while (row.firstChild) {
            row.removeChild(row.firstChild);
        }
        var cols = '';
        for (i = 0; i < prevcols; i++) {
            var col = document.createElement("div");
            var bg = document.createElement("div");

            bg.setAttribute('class', 'skin_bg');
            col.setAttribute('class', 'col-addon set_padding');
            col.style.width = (100/prevcols)+'%';
            col.appendChild(bg);
            row.appendChild(col);
        }

    }

    if (prev_padding!=config.gutter){
        prev_padding = gutter;

        var nodepadding = document.querySelectorAll(".set_padding");
        var i;
        for (i = 0; i < nodepadding.length; i++) {
            nodepadding[i].style.padding = "0 "+prev_padding + 'px';
        }

        row.style.margin = '0 -'+gutter+'px';
    }


    if (prevskin!=config.skin){
        prevskin = config.skin;
        var nodeskin = document.querySelectorAll(".skin_bg");
        var c;
        for (c = 0; c < nodeskin.length; c++) {
            nodeskin[c].style.backgroundColor = '#'+prevskin;
        }
    }


}

browser.runtime.onMessage.addListener(grid);
