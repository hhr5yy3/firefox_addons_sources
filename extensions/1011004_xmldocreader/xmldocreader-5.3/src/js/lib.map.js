(function(XMLDocReader) {
   XMLDocReader.log = console.log.bind(console||window.console, '%c[XMLDocReader]', 'color: #2E8B57;');
   XMLDocReader.url = window.location.href;

   let observer = new MutationObserver(( mutations ) => {
      //* { https://stackoverflow.com/questions/384286/ }
      let isElement = (o) => { return (  typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"); }
      for(let mutation of mutations) {
         for(let node of mutation.addedNodes) {
            if (!isElement(node)) continue;
            if (node.tagName.toLowerCase() === 'script') {
               let code = node.innerHTML;
               let pattern = /(var\s+map_tile_url\s+=\s+)"http:\/\/map.land.gov.ua";/i;
               if (code.search(pattern) !== -1) {
                   let wkt = code.match(/var\s+wkt\s*=\s*('|")(?<poly>.*?)\1/);
                   if (wkt?.groups?.poly) {
                      const queryString = window.location.search;
                      const urlParams = new URLSearchParams(queryString);
                      const mode = urlParams.get('viewMode');
                      const polygon = urlParams.get('polygon');
                      if (mode==1) {
                         var vertex;
                         if (polygon) {
                            let coords = JSON.parse(polygon);
                            if (coords) {
                               a0 = '';
                               for (var i = 0; i < coords.length; i++) {
                                 var jl = coords[i].length;
                                 // jl = к-сть контурів
                                 a0 += '(';
                                 for (var j = 0; j < jl; j++) {
                                   var kl = coords[i][j].length;
                                   a1 = '(';
                                   for (var k = 0; k < kl; k++) {
                                     a1 += `${k===0?'':','}${coords[i][j][k][0]} ${coords[i][j][k][1]}`;
                                   }
                                   a1 += ')';
                                   a0 += `${a1})${j<jl-1?',':''}`;
                                 }
                               }
                            }
                            vertex = `POLYGON${a0}`;
                         } else {
                            vertex = 'POINT(2674640.00 6420040.00)';
                         }
                         code = code.replace(/(var\s+wkt\s*=\s*('|"))(?<poly>.*?)\2/, `$1${vertex}$2`);
                         if (!polygon)
                            code = code.replace('view.fit(feature.getGeometry(),map.getSize());', 'view.fit(feature.getGeometry(),map.getSize());map.getView().setZoom(9);');
                      }
                      // 1. map.land.gov.ua
                      code = code.replace(pattern, "$1\"https://m{1-3}.land.gov.ua\"");
                      // 2. overLayers
                      pattern = /(var\s+overlaysLayers\s*=\s*new\s+ol\.layer\.Group\s*\([^\[]*\[)([\s\S]*?)(\])/i;
                      let kliveMap = `new ol.layer.Tile({
                          title: 'Кадастровий поділ (Kadastr LIVE)',
                          source: new ol.source.XYZ({
                              url: 'https://kadastr.live/tiles/raster/styles/parcels/{z}/{x}/{y}.png'
                          }),
                          visible: false
                      })`;
                      if (code.search(pattern) !== -1) {
                         code = code.replace(pattern, `$1${kliveMap},$2$3`);
                      }
                      // 3. maxZoom
                      pattern = /(var\s+view\s*=\s*new\s+ol\.View\s*\(\{[\s\S]*?maxZoom\s*:\s*)(\d+)/i;
                      if (code.search(pattern) !== -1) {
                         let maxZoom = 16;
                         code = code.replace(pattern, `$1${maxZoom}`);
                      }
                      // 4. set dzk_overview visible=false
                      pattern = /('\/map\/dzk_overview\/\{z\}\/\{x\}\/\{-y\}\.png\'\s*\}\),\s*visible\:\s*)(\w+)/i;
                      if (code.search(pattern) !== -1) {
                         code = code.replace(pattern, "$1false");
                      }
                      // 5. set ortho10k_all visible=true and add new os.layers
                      let extMap = `new ol.layer.Tile({
                             title: 'OpenTopoMap',
                             type: 'base',
                             source: new ol.source.XYZ({
                                 url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                             }),
                             visible: false
                         }), new ol.layer.Tile({
                             title: 'Esri.WorldImagery',
                             type: 'base',
                             source: new ol.source.XYZ({
                                 url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                             }),
                             visible: false
                         }),`;
                      pattern = /('\/map\/ortho10k_all\/\{z\}\/\{x\}\/\{-y\}\.jpg\'\s*\}\),\s*visible\:\s*)(\w+)(\s*\}\),)/i;
                      if (code.search(pattern) !== -1) {
                         code = code.replace(pattern, `$1true$3${extMap}`);
                      }

                      // 6. restore selected map list to view from localStorage
                      const settings = JSON.parse(localStorage.getItem('XMLDocReader'));
                      if (settings?.maps) {
                      let func = `var visibleLayers = ${JSON.stringify(settings?.maps)};
                          map.getLayers().forEach(function(layer) {
                             if (layer instanceof ol.layer.Group) {
                                layer.getLayers().forEach(c=>{
                                   const title = c.getProperties()?.title||null;
                                   if (title && visibleLayers.includes(title)) {
                                      c.setVisible(true);
                                   } else {
                                      c.setVisible(false);
                                   }
                                });
                             }
                          });

                          let drawBtnClick = false;

                          window.addEventListener('message', function receiveMessage(event) {
                             if (event.origin !== 'https://e.land.gov.ua' || event.source !== window) return;
                             if(event.data.message === 'XDR_MAP_ONCLICK_BTN') {
                                drawBtnClick = event.data?.action?.detail?.buttonstate;
                                let deleteFeatures = () => {
                                   let features = vector.getSource().getFeatures();
                                   for(i=1;i<features.length;i++)
                                     vector.getSource().removeFeature(features[i]);
                                }
                                let OnEscapePressed=(e)=>{if(e.keyCode==27&&drawBtnClick){drawBtnClick=false;deleteFeatures();map.getInteractions().pop();window.dispatchEvent(new CustomEvent('XDR_MAP_DRAWEND_EVT',{'detail':{'coordinates':null}}));};}
                                let draw;
                                if (drawBtnClick) {
                                   window.addEventListener('keydown', OnEscapePressed);
                                
                                   //* { https://gis.stackexchange.com/questions/317272/how-to-draw-a-line-with-openlayers-by-clicking-two-points }
                                   draw = new ol.interaction.Draw({
                                     source: vector.getSource(),
                                     type: 'Polygon' // type: 'LineString', maxPoints: 2
                                   });
                                
                                   draw.on('drawstart',e=>{deleteFeatures()});
                                
                                   draw.on('drawend', (e) => {
                                     var style = new ol.style.Style({
                                        stroke: new ol.style.Stroke({
                                           color: '#0000FF',
                                           width: 3
                                        })
                                     });
                                     e.feature.setStyle(style);
                                     let lineString = e.feature.getGeometry();
                                     let coordinates = lineString.getCoordinates();
                                     window.dispatchEvent(new CustomEvent('XDR_MAP_DRAWEND_EVT', { 'detail': { 'coordinates': coordinates } } ));
                                   });
                                
                                   map.addInteraction(draw);
                                } else {
                                   window.removeEventListener('keydown', OnEscapePressed);
                                   deleteFeatures();
                                   map.getInteractions().pop();
                                }
                             }
                           }, false);
                      `;
                       code = code.replace('map.addControl(layerSwitcher);', `${func} map.addControl(layerSwitcher);`);

                       code = code.replace('map.on(\'singleclick\', function(evt) {', 'map.on(\'singleclick\', function(evt) { if (drawBtnClick) return;');
                      }
                   }
                   node.innerHTML = code;
                   observer.disconnect();
               }
            } else if (node.id == 'map') {
               // save the selected map list to localStorage
               let popupObserver = new MutationObserver(( mutations ) => {
                  let isPopup = false;
                  let isZoomCtrl = false;
                  let isCanvas = false;
                  for(let mutation of mutations) {
                     for(let popupNode of mutation.addedNodes) {
                        if (!isElement(popupNode)) continue;

                        // 1. POPUP WINDOW
                        let popup = popupNode.querySelector('div.panel');
                        let getCheckedList = (t) => {
                           let list = t.querySelectorAll('li.layer input');
                           let checked = t.querySelectorAll('li.layer input:checked');
                           let array = [];
                           for (var i = 0; i < checked.length; i++) {
                              for (var j = 0; j < list.length; j++) {
                                 if (checked[i] === list[j]) {
                                    const name = checked[i].closest('li').querySelector('label')?.textContent || '';
                                    array.push(name);
                                    continue;
                                 }
                              }
                           }
                           return array;
                        }

                        if (popup && !isPopup) {
                           isPopup = true;
                           popup.onclick = (e) => {
                              if (e.target.tagName.toLowerCase() !== 'input') return;
                              const list = getCheckedList(e.currentTarget);
                              localStorage.setItem('XMLDocReader', JSON.stringify({maps: list}));
                           }
                           popupObserver.disconnect();
                        }
                        // 2. DRAW BUTTON
                        let zoomCtrl = node.querySelector('div.ol-zoom.ol-unselectable.ol-control');
                        let ZoomCtrlOn = false;

                        if (zoomCtrl && !isZoomCtrl) {
                           //* { https://gist.github.com/sepulchered/6714835 }
                           let epsg_4326_to_900913=(point)=>{[lon,lat]=point;x=lon*20037508.34/180;y=(Math.log(Math.tan((90+lat)*Math.PI/360))/(Math.PI/180))*(20037508.34/180);return [x,y];}
                           let epsg_900913_to_4326=(point)=>{[x,y]=point;lon=x*180/20037508.34;lat=(360/Math.PI)*Math.atan(Math.exp(y*Math.PI/20037508.34))-90;return [lon,lat];}
                           //* { https://stackoverflow.com/questions/56827208/spilliting-polygon-into-square }
                           let tilePolygon = (points, tileSize) => {
                               let intersectionY = (edge, y) => {
                                   const [[x1, y1], [x2, y2]] = edge;
                                   const dir = Math.sign(y2 - y1);
                                   if (dir && (y1 - y)*(y2 - y) <= 0) return { x: x1 + (y-y1)/(y2-y1) * (x2-x1), dir };
                               }
                               const minY = Math.min(...points.map(p => p[1]));
                               const maxY = Math.max(...points.map(p => p[1]));
                               const minX = Math.min(...points.map(p => p[0]));
                               const gridPoints = [];
                               for (let y = minY; y <= maxY; y += tileSize) {
                                   // Collect x-coordinates where polygon crosses this horizontal line (y)
                                   const cuts = [];
                                   let prev = null;
                                   for (let i = 0; i < points.length; i++) {
                                       const cut = intersectionY([points[i], points[(i+1)%points.length]], y);
                                       if (!cut) continue;
                                       if (!prev || prev.dir !== cut.dir) cuts.push(cut);
                                       prev = cut;
                                   }
                                   if (prev && prev.dir === cuts[0].dir) cuts.pop(); 
                                   // Now go through those cuts from left to right toggling whether we are in/out the polygon
                                   let dirSum = 0;
                                   let startX = null;
                                   for (let cut of cuts.sort((a, b) => a.x - b.x)) {
                                       dirSum += cut.dir;
                                       if (dirSum % 2) { // Entering polygon
                                           if (startX === null) startX = cut.x;
                                       } else if (startX !== null) { // Exiting polygon
                                           // Genereate grid points on this horizontal line segement
                                           for (let x = minX + Math.ceil((startX - minX) / tileSize)*tileSize; x <= cut.x; x += tileSize) {
                                               gridPoints.push([x, y]);
                                           }
                                           startX = null;
                                       }
                                   }
                               }
                               return gridPoints;

                           }
                           let XDRMapInfoDialog = class { //* { https://github.com/NBTSolutions/Leaflet.Dialog }
                              options = {
                                size: [ 350, 400 ],
                                minSize: [ 200, 100 ],
                                maxSize: [ 1800, 1200 ],
                                anchor: [ 250, 250 ],
                                position: "topleft",
                                title: '',
                                initOpen: true
                              }
                            
                              constructor(options) {
                                 this.options = Object.assign(this.options, JSON.parse(JSON.stringify(options)));
                                 this._initLayout();
                              }
                            
                              open () {
                                this._container.style.visibility = "";
                                return this;
                              }
                            
                              close () {
                                this._container.style.visibility = "hidden";
                                return this;
                              }
                            
                              _initLayout () {
                                let css = `.xmldocreader-control-dialog-inner{display: flex; flex-direction: column;height: 100%;padding:1px;}
                                           .xmldocreader-control-dialog-contents{flex:1; background:#fff;user-select:text;overflow-y:auto;border-radius: 0 0 3px 3px;}
                                           .xmldocreader-control-dialog-grabber{height:25px;  background-color: rgba(0,60,136,.5);color: #ccc;border-radius: 3px 3px 0 0;}
                                           .xmldocreader-control-dialog-grabber:hover{background-color: rgba(0,60,136,.7);cursor: move;}
                                           .xmldocreader-control-dialog-grabber p{height:100%;margin:0;padding:1px;color: #ccc;}
                                           .xmldocreader-control-dialog-resizer{position: absolute;box-sizing: border-box;width: 20px;height: 20px;bottom: 0px;right: 0px;padding: 2px;font-size: 16px;line-height: 16px;color: #ccc;}
                                           .xmldocreader-control-dialog-resizer i{-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);color: #ccc}
                                           .xmldocreader-control-dialog-resizer i:hover{cursor: nwse-resize;}
                                           .xmldocreader-control-dialog-clipboard {position: absolute;box-sizing: border-box;width: 20px;height: 20px;bottom: 0px;top: 30px;padding: 2px;font-size: 20px;line-height: 20px;color: #244D67;}
                                           .xmldocreader-control-dialog-save {position: absolute;box-sizing: border-box;width: 20px;height: 20px;bottom: 0px;left: 30px;top: 30px;padding: 2px;font-size: 20px;line-height: 20px;color: #244D67;}
                                          `;
                                //* { https://stackoverflow.com/questions/11371550 }
                                let style = (this._style = document.createElement('style'));
                                if (style.styleSheet) { style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); }
                                document.getElementsByTagName('head')[0].appendChild(style);
                            
                                let className = 'xmldocreader-control-dialog';
                                let container = (this._container = document.createElement('div'));
                                container.classList.add(className, 'ol-unselectable','ol-control');
                                container.style.width = this.options.size[0] + 'px';
                                container.style.height = this.options.size[1] + 'px';
                            
                                container.style.top = this.options.anchor[0] + 'px';
                                container.style.left = this.options.anchor[1] + 'px';
                            
                                const stop = (e) => {e.stopPropagation();};
                                const addListenerMulti=(el,s,fn)=>{s.split(' ').forEach(e => el.addEventListener(e, fn, false));} //* { https://stackoverflow.com/questions/8796988 }
                                addListenerMulti(container,'click mousedown touchstart dblclick mousewheel contextmenu MozMousePixelScroll', stop);
                            
                                let innerContainer = (this._innerContainer = document.createElement('div'));
                                innerContainer.classList.add(className + '-inner');
                            
                                let contentNode = (this._contentNode = document.createElement('div'));
                                contentNode.classList.add(className + '-contents');
                            
                            
                                var grabberNode = (this._grabberNode = document.createElement('div'));
                                grabberNode.classList.add(className + '-grabber');
                                this._handleMoveStartBind = this._handleMoveStart.bind(this); //* { https://stackoverflow.com/questions/49091584/ }
                                grabberNode.addEventListener('mousedown', this._handleMoveStartBind);
                                var grabberNodeTile = document.createElement('p');
                                grabberNodeTile.innerText = this.options.title;
                                grabberNode.appendChild(grabberNodeTile);
                            
                                var resizerNode = (this._resizerNode = document.createElement('div'));
                                resizerNode.classList.add(className + '-resizer');
                                let resizeIcon = document.createElement('i');
                                resizeIcon.classList.add('fa','fa-arrows-h');
                                this._handleResizeStartBind = this._handleResizeStart.bind(this); //* { https://stackoverflow.com/questions/49091584/ }
                                resizerNode.addEventListener('mousedown', this._handleResizeStartBind);
                                resizerNode.appendChild(resizeIcon);
                            
                                let clipboardNode = (this._clipboardNode = document.createElement('div'));
                                clipboardNode.title='Скопіювати до буферу обміну';
                                clipboardNode.classList.add(className + '-clipboard');
                                let clipboardIcon = document.createElement('i');
                                clipboardIcon.classList.add('fa','fa-clipboard');
                                clipboardIcon.addEventListener('mousedown', (e)=>{ 
                                   navigator.clipboard.writeText(contentNode.innerText).then(()=>{e.target.style.color = '#008000'}).catch((r)=>{e.target.style.color='#FF0000';XMLDocReader.log("Помилка копіювання", r)}); 
                                }, false);
                                clipboardNode.appendChild(clipboardIcon);
                            
                                let saveNode = (this._saveNode = document.createElement('div'));
                                saveNode.classList.add(className + '-save');
                                saveNode.title='Зберегти до файлу';
                                let saveIcon = document.createElement('i');
                                saveIcon.classList.add('fa','fa-floppy-o');
                                saveIcon.addEventListener('mousedown', (e)=>{saveAs(new Blob([this.getContent({text: true})], { type: 'text/plain;charset=utf-8' }), 'result.txt');}, false);
                                saveNode.appendChild(saveIcon);
                            
                                container.appendChild(innerContainer);
                                innerContainer.appendChild(grabberNode);
                                innerContainer.appendChild(contentNode);
                                innerContainer.appendChild(clipboardNode);
                                innerContainer.appendChild(saveNode);
                                innerContainer.appendChild(resizerNode);
                                if (!this.options.initOpen) {
                                  this.close();
                                }
                            
                                this._oldMousePos = { x: 0, y: 0 };
                              }
                            
                              getContent (options) {
                                let asText = options?.text === true || false;
                                return this._content ? (asText ? this._contentNode.innerText : this._content) : '';
                              }
                            
                              setContent (content) {
                                this._content = content;
                                this._updateContent();
                                return this;
                              }
                            
                              _updateContent () {
                                if (!this._content) {
                                  return;
                                }
                            
                                var node = this._contentNode;
                                var content = typeof this._content === "function" ? this._content(this) : this._content;
                            
                                if (typeof content === "string") {
                                  node.innerHTML = content;
                                } else {
                                  while (node.hasChildNodes()) {
                                    node.removeChild(node.firstChild);
                                  }
                                  node.appendChild(content);
                                }
                              }
                            
                            
                              _resize (diffX, diffY) {
                                var newX = this.options.size[0] + diffX;
                                var newY = this.options.size[1] + diffY;
                                if (newX <= this.options.maxSize[0] && newX >= this.options.minSize[0]) {
                                  this.options.size[0] = newX;
                                  this._container.style.width = this.options.size[0] + "px";
                                  this._oldMousePos.x += diffX;
                                }
                            
                                if (newY <= this.options.maxSize[1] && newY >= this.options.minSize[1]) {
                                  this.options.size[1] = newY;
                                  this._container.style.height = this.options.size[1] + "px";
                                  this._oldMousePos.y += diffY;
                                }
                              }
                            
                              _move (diffX, diffY) {
                                var newY = this.options.anchor[0] + diffY;
                                var newX = this.options.anchor[1] + diffX;
                            
                                this.options.anchor[0] = newY;
                                this.options.anchor[1] = newX;
                            
                                this._container.style.top = this.options.anchor[0] + "px";
                                this._container.style.left = this.options.anchor[1] + "px";
                            
                                this._oldMousePos.y += diffY;
                                this._oldMousePos.x += diffX;
                              }
                            
                              _handleMoveStart (e) {
                                 e.preventDefault();
                                 this._oldMousePos.x = e.clientX;
                                 this._oldMousePos.y = e.clientY;
                            
                                 this._handleMouseMoveBind = this._handleMouseMove.bind(this); //* { https://stackoverflow.com/questions/49091584/ }
                                 window.addEventListener('mousemove', this._handleMouseMoveBind);
                                 this._handleMouseUpBind = this._handleMouseUp.bind(this); //* { https://stackoverflow.com/questions/49091584/ }
                                 window.addEventListener('mouseup', this._handleMouseUpBind);
                            
                                 this._moving = true;
                              }
                            
                              _handleResizeStart (e) {
                                 e.preventDefault();
                                 this._oldMousePos.x = e.clientX;
                                 this._oldMousePos.y = e.clientY;
                                 this._handleMouseMoveBind = this._handleMouseMove.bind(this); //* { https://stackoverflow.com/questions/49091584/ }
                                 window.addEventListener('mousemove', this._handleMouseMoveBind);
                                 this._handleMouseUpBind = this._handleMouseUp.bind(this); //* { https://stackoverflow.com/questions/49091584/ }
                                 window.addEventListener('mouseup', this._handleMouseUpBind);
                                 this._resizing = true;
                              }
                            
                              _handleMouseMove (e) {
                                 var diffX = e.clientX - this._oldMousePos.x,
                                     diffY = e.clientY - this._oldMousePos.y;
                                 // this helps prevent accidental highlighting on drag:
                                 if (e.stopPropagation) {
                                   e.stopPropagation();
                                 }
                                 if (e.preventDefault) {
                                   e.preventDefault();
                                 }
                              
                                 if (this._resizing) {
                                   this._resize(diffX, diffY);
                                 }
                              
                                 if (this._moving) {
                                   this._move(diffX, diffY);
                                 }
                              }
                            
                              _handleMouseUp (e) {
                                 window.removeEventListener('mousemove', this._handleMouseMoveBind);
                                 window.removeEventListener('mouseup', this._handleMouseUpBind);
                                 if (this._resizing) {
                                   this._resizing = false;
                                 }
                              
                                 if (this._moving) {
                                   this._moving = false;
                                 }
                              }
                            
                           };
                            
                           // клас діалогу
                           let customDialog = new XDRMapInfoDialog({size:[800,400], anchor:[120,10], title: 'Інформаційне вікно', initOpen: false});
                           zoomCtrl.parentNode.appendChild(customDialog._container);
                            
                           isZoomCtrl = true;
                           let customDrawButton = document.createElement('button');
                           customDrawButton.type = 'button';
                           customDrawButton.title = 'Draw';
                           customDrawButton.classList.add('fa','fa-object-group');
                           customDrawButton.style.cssText = 'font-weight: unset;';
                           let customDrawQuantity = document.createElement('input');
                           customDrawQuantity.type = 'number';
                           customDrawQuantity.id = 'quantity';
                           customDrawQuantity.min = '10';
                           customDrawQuantity.max = '100';
                           customDrawQuantity.step = '10';
                           customDrawQuantity.value = '20';
                           customDrawQuantity.style.cssText = 'font-size:14px;font-weight:bold;text-align:right;position:absolute;padding:0px;margin-left:3px;width:42px;border-radius:3px;border: 1px solid #7098A5;text-indent:5px;background:#fff;color: #000;';
                           customDrawQuantity.style.display = 'none';// 'unset' | 'none'

                           let Worker;
                           window.addEventListener('XDR_MAP_DRAWEND_EVT', function getMessage (e) {
                              let points = e.detail?.coordinates?.[0] || null;
                              const maxSideSize = 50000;
                              if (points) {
                                 Worker = true;
                                 let customDrawQuantity = document.querySelector('input#quantity');
                                 let stepTile = 20;
                                 if (customDrawQuantity) {
                                    stepTile = parseFloat(customDrawQuantity.value);
                                    stepTile = stepTile<1||stepTile>100?20:stepTile;
                                 }
                                 const gridPoints = tilePolygon(points, stepTile);
                                 if (gridPoints.length > maxSideSize) {alert(`Кількість запитів ${gridPoints.length} перевищує ліміт - ${maxSideSize}. Збільшіть крок або зменшіть область пошуку. Виконання функції припинене.`); return; }
                                 //* { https://stackoverflow.com/questions/21294302/ }
                                 let millisToMinutesAndSeconds=(m)=>{var t=Math.floor(m/60000);var s=((m%60000)/1000).toFixed(0);return t+":"+(s<10?'0':'')+s;}

                                 async function parseGridPoints(gridPoints) {
                                    async function getFDataPage(x, y) {
                                       var response;
                                       var formData = new FormData();
                                       formData.append('x', x );
                                       formData.append('y', y );
                                       formData.append('zoom','16' );
                                       formData.append('actLayers[]','kadastr');
                  
                                       let headers = new Headers({"User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0","X-Requested-With"  : "XMLHttpRequest"});
                                       response = await fetch('https://e.land.gov.ua/back/parcel_registration/get_feature_info', { method: 'POST', mode:'cors', credentials:'same-origin', body: formData, headers: headers }); 
                                       if (response.ok) { return await response.json();} 
                                       else {
                                          return {'error':'Помилка читання інформації зі сторінки'};
                                    }}
                                    cadnumArray = [];
                                    cadnumArray.inarray = (i)=>{let t=false,r=null;cadnumArray.forEach(e=>{if(!t&&e.content.parcel.cadnum===i){t=true;r=e;return;}});return r};

                                    window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'show', text: `Читання даних карти`, min: 0, max: gridPoints.length, position: 0 } } ));
                                    let count = 1;
                                    let totalDuration = 0;
                                    for(var point in gridPoints ) {
                                       if (!Worker) break;  // примусовий вихід
                                       let [y, x] = gridPoints[point];
                                       const startTime = performance.now();
                                       let response = await getFDataPage(x, y);
                                       const endTime = performance.now();
                                       totalDuration += endTime-startTime;
                                       let duration = millisToMinutesAndSeconds(totalDuration/count*(gridPoints.length-count));
                                       let lonlat = epsg_900913_to_4326(gridPoints[point]);
                                       if (parcels = response['Інфо про ділянку']) {
                                          for(var parcel in parcels ) {
                                             let cadnum = parcels[parcel]?.['Кадастровий номер'] || '';
                                             let use = parcels[parcel]?.['Вид використання'] || '';
                                             let area = parcels[parcel]?.['Площа'] || '';
                                             let unit_area = '';
                                             if (matches = area.match(/(?<area>\d+(\.\d+)?)\s?(?<unit>\S+)/)) {
                                                area = parseFloat(matches.groups.area).toFixed(4);
                                                unit_area = matches.groups.unit;
                                             }
                                             let ownership = parcels[parcel]?.['Тип власності'] || '';
                                             let purpose = parcels[parcel]?.['Цільове призначення'] || '';
                                             let row = {"content": {"parcel":{"cadnum": cadnum, "purpose": purpose,"use":use, "area":area, "unit_area":unit_area, "ownership":ownership, 'lonlat': lonlat } } };
                                             if (!cadnumArray.inarray(cadnum))
                                                cadnumArray.push(row);
                                          }
                                       }

                                       window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', text: `Читання даних карти (${cadnumArray.length}) ${duration}`, action: 'update', position: point } } ));
                                       count++;
                                    }
                                    window.dispatchEvent(new CustomEvent('XDR_CONTENT_MESSAGE', {detail: {type : 'dialog', action: 'hide'} } ));
                                    return cadnumArray;
                                 }

                                 parseGridPoints(gridPoints).then(r=>{ 
                                    const style='style="border: 1px solid;border-collapse: collapse"';
                                    let table=`<table width="100%" ${style}><caption style="font-weight: bold;text-align:center;">Координати області пошуку</caption>`;
                                    table+=`<tr><th ${style}></th><th ${style}>Latitude</th><th ${style}>Longitude</th></tr>`;
                                    let n=1;
                                    points.forEach(p=>{
                                       const [lon, lat] = epsg_900913_to_4326(p);
                                       table+=`<tr><td ${style}>${n}</td><td ${style}>${parseFloat(lat).toFixed(8)}</td><td ${style}>${parseFloat(lon).toFixed(8)}</td></tr>`;
                                       n++;
                                    });
                                    table+='</table><br>';

                                    table+=`<table width="100%" ${style}><caption style="font-weight: bold;text-align:center;">Відомості про земельні ділянки (${r.length})</caption>`;
                                    table+=`<tr><th ${style}></th><th ${style}>Latitude</th><th ${style}>Longitude</th><th ${style}>Кадастровий номер</th><th ${style}>Цільове призначення</th><th ${style}>Вид використання</th><th ${style} colspan="2">Площа</th><th ${style}>Форма власності</th></tr>`;
                                    n=1;
                                    r.forEach(e=>{
                                       [lon,lat]=e?.content?.parcel?.lonlat||[0,0];
                                       table+=`<tr><td ${style}>${n}</td><td ${style}>${parseFloat(lat).toFixed(8)}</td><td ${style}>${parseFloat(lon).toFixed(8)}</td><td ${style}>${e?.content?.parcel?.cadnum||''}</td><td ${style}>${e?.content?.parcel?.purpose||''}</td><td ${style}>${e?.content?.parcel?.use||''}</td><td ${style}>${e?.content?.parcel?.area||''}</td><td ${style}>${e?.content?.parcel?.unit_area||''}</td><td ${style}>${e?.content?.parcel?.ownership||''}</td></tr>`;
                                       n++;
                                    });
                                    table+='</table>';
                                    //customDialog.htmlBlock.innerHTML = table;
                                    customDialog.setContent(table);
                                    customDialog.open();
                                 });
                              } else {
                                 Worker = false;
                                 ZoomCtrlOn = false;
                                 let customDrawQuantity = document.querySelector('input#quantity');
                                 if (customDrawQuantity)
                                    customDrawQuantity.style.display = 'none';
                                 if (customDialog) customDialog.close();
                              }
                           })

                           customDrawButton.onclick = (e) => {
                              if (e.target.tagName.toLowerCase() !== 'button') return;
                              ZoomCtrlOn=!ZoomCtrlOn;
                              let customDrawQuantity = e.currentTarget?.firstChild;
                              if (customDrawQuantity)
                                 customDrawQuantity.style.display = ZoomCtrlOn?'unset':'none';
                              if (customDialog && !ZoomCtrlOn) customDialog.close();
                              window.postMessage({message: 'XDR_MAP_ONCLICK_BTN', action: { 'detail': { 'buttonstate': ZoomCtrlOn } } }, '*');
                           }

                           customDrawButton.appendChild(customDrawQuantity);
                           zoomCtrl.appendChild(customDrawButton);
                        }
                     }
                  }
               })
               popupObserver.observe(node, { childList: true, subtree: true });
            } else if (node.id == 'popup-content') {
               let popupObserver = new MutationObserver(( mutations ) => {
                  for(let mutation of mutations) {
                     for(let popupNode of mutation.addedNodes) {
                        if (!isElement(popupNode)) continue;
                        let dtTags = popupNode.querySelectorAll('dt');
                        for (var i = 0; i < dtTags.length; i++) {
                           if (dtTags[i].innerHTML == 'Кадастровий номер') {
                              let cnum = dtTags[i].nextElementSibling;
                              if (cnum.innerHTML.match(/^\d{10}:\d{2}:\d{3}:\d{4}$/)) {
                                 const inner = cnum.innerHTML;
                                 cnum.innerHTML = `<a href="https://e.land.gov.ua/back/cadaster/?cad_num=${inner}" target="_blank">${inner}</a>`;
                              }
                           }
                        }
                     }
                  }
               })
               popupObserver.observe(node, { childList: true, subtree: true, attributes: false, characterData: false }); //
            }
         }
      }
   });
   observer.observe(document.documentElement, { childList: true, subtree: true, attributes: false, characterData: false }); //
   XMLDocReader.log('Library map content is loaded successfully');
})({});
