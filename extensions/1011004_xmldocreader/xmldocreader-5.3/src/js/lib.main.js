(function(XMLDocReader) {
   XMLDocReader.log = console.log.bind(console||window.console, '%c[XMLDocReader]', 'color: #2E8B57;');
   XMLDocReader.url = window.location.href;
   XMLDocReader.eventset = { body: false, mapbutton: false, timerbox: false, groopsearch: false };
   XMLDocReader.classes = {
      modalDialog : class {
         constructor (options) {
            this.tile = 'Модальний діалог...';
            this.min = 0;
            this.max = 100;
            this.position = 0;
            this.init();
         }
         setTile(t) { this.dialog.querySelector('h3').innerText = this.tile = t; }
         setMin(m) { this.min = m; }
         setMax(m) { this.max = m; }
         setPosition (p) { this.position = Math.round(p * 100 / this.max);  this.dialog.querySelector('div.progress-bar').style.width  = this.position + '%'; };
         show() {
            if (this.dialog) {
               this.setPosition(this.position);
               this.dialog.style.display = 'block'; 
               this.dialog.classList.remove('fade'); 
            }
         }
         hide() {
            if (this.dialog) {
               this.setPosition(this.max);
               this.dialog.style.display = 'none'; 
               this.dialog.classList.add('fade');
            }
         }
         init() {
            try {
               let div = document.createElement('div');
               this.dialog = div;
               div.id = 'custom_addon_dialod';
               div.classList.add('modal', 'fade');
               div.setAttribute('data-backdrop', 'static');
               div.setAttribute('data-keyboard', 'false');
               div.setAttribute('tabindex', '-1');
               div.setAttribute('role', 'dialog');
               div.setAttribute('aria-hidden', 'true');
               div.style.cssText = 'padding-top: 15%; overflow-y: visible; display: none;';
               let div_dialog = document.createElement('div');
               div_dialog.classList.add('modal-dialog', 'modal-m');
               div.appendChild(div_dialog);
               let div_content = document.createElement('div')
               div_content.classList.add('modal-content');
               div_dialog.appendChild(div_content);
               let div_header = document.createElement('div')
               div_header.classList.add('modal-header');
               div_header.style.display = 'block';
               let h3 = document.createElement('h3');
               h3.style.margin = '0px';
               h3.innerText = this.tile;
               div_header.appendChild(h3);
               div_content.appendChild(div_header);
               
               let div_body = document.createElement('div')
               div_body.classList.add('modal-body');
               let div_progress = document.createElement('div')
               div_progress.classList.add('progress','progress-striped','active');
               div_progress.style.cssText = 'margin-bottom: 0;';
               div_body.appendChild(div_progress);
               let div_progressBar = document.createElement('div');
               div_progressBar.classList.add('progress-bar');
               div_progressBar.style.width = '50%';
               div_progress.appendChild(div_progressBar);
               div_content.appendChild(div_body);
               document.body.appendChild(div);
            } catch(e) {
               throw e;
            }
         }
      }
   };


   ((f)=>{
      if (!f) return;
      let addControlItem = (control) => {
         let li = document.createElement('li');
         li.classList.add('treeview');
         let a = document.createElement('a');
         a.onclick = async (e) => {
            e.preventDefault();

            let url = 'https://e.land.gov.ua/back/parcel_registration';
            let headers = new Headers({'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Content-Type': 'text/html; charset=UTF-8'});
            const response = await fetch(url, { method : 'GET', mode:'cors', credentials:'same-origin', headers : headers });
            let html = await response.text();

            let matches = html.match(/<select id="parcel_registration_xml".*?<option value="(?<id>[0-9a-f]{24})"/im);
            if (matches?.groups?.id) {
               const href = `/back/parcel_registration/project_to_map/${matches.groups.id}?requestType=29&viewMode=1`;
               window.location.href = href;
            }
         }
         a.href = "/back/parcel_registration/map/";
         let i = document.createElement('i');
         i.classList.add('fa','fa-map');
         let span = document.createElement('span');
         span.innerHTML = 'Карта';
         a.appendChild(i);
         a.appendChild(document.createTextNode(' '));
         a.appendChild(span);
         li.appendChild(a);
         control.appendChild(li);
      }

      // додавання пункту меню до головної панелі (MutationObserver) та інше :)
      let observer = new MutationObserver(( mutations ) => {
         //* { https://stackoverflow.com/questions/384286/ }
         let isElement = (o) => { return (  typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"); }
         for(let mutation of mutations) {
            for(let node of mutation.addedNodes) {
               if (!isElement(node)) continue;
               if (node.tagName.toLowerCase() === 'body' && !XMLDocReader.eventset.body) {
                  XMLDocReader.eventset.body = true;
                  document.body.style.border = '3px solid red';
                  break;
               }
               // пункт меню 'карта'
               let control = node.querySelector('aside.main-sidebar>section>ul.sidebar-menu');
               if (control && !XMLDocReader.eventset.mapbutton) {
                  if (control.lastChild.nodeName === '#text') {
                     XMLDocReader.eventset.mapbutton = true;
                     addControlItem(control);
                  }
                  break;
               }
               // таймер-бокс
               if (node.tagName.toLowerCase() === 'header' && !XMLDocReader.eventset.timerbox) {
                  let hdr_containers = node.querySelector("header a.logo");
                  if (hdr_containers) {
                      XMLDocReader.eventset.timerbox = true;
                      // таймер
                      var timerDiv = document.createElement('div');
                      timerDiv.id = 'XMLDocReaderTimer';
                      timerDiv.style.cssText = 'position: absolute;width: 20px;height:20px;background-image: conic-gradient(#FFA500 0deg, #808080 0deg);border-radius: 50%;margin:1px;';
                      timerDiv.style.display = 'none';
                      var timerChildDiv = document.createElement('div');
                      timerChildDiv.style.cssText = 'position: relative;background-color: #244D67;border-radius: 50%;width: 80%;height: 80%;left: 10%;top: 10%;color:#FF0000;text-align:center;font-size: .8em;font-weight:bold;';
                      timerDiv.appendChild(timerChildDiv);
                      hdr_containers.parentElement.insertBefore(timerDiv, hdr_containers);
                      break;
                  }
               }
               //
               if (XMLDocReader.url.startsWith('https://e.land.gov.ua/back/cadaster/') && node.tagName.toLowerCase() === 'input' && node.id === 'cadastr_find_by_cadnum_cadNum' && !XMLDocReader.eventset.groopsearch) {
                  XMLDocReader.eventset.groopsearch = true;
                  let input = document.createElement('input');
                  input.type = 'checkbox';
                  input.id = 'cadastr_group_find_by_cadnum_cadNum';
                  let label = document.createElement('label');
                  label.setAttribute('for', input.id);
                  label.style.fontWeight = 'normal';
                  label.innerText = 'Пошук інформації за списком кадастрових номерів';

                  let container = document.createElement('div');
                  container.id = 'cadastr_group_list_container';
                  container.style.width = '100%';
                  container.style.display = 'none';

                  let textarea = document.createElement('textarea');
                  textarea.id = 'cadastr_group_list';
                  textarea.style.width = '100%';
                  textarea.style.height = '250px';
                  //* { https://stackoverflow.com/questions/3211505 }
                  function getTextAreaSelection(textarea) {
                     var start = textarea.selectionStart, end = textarea.selectionEnd;
                     return {
                        start: start,
                        end: end,
                        length: end - start,
                        text: textarea.value.slice(start, end)
                     };
                  }

                  textarea.onpaste = (e) => {
                     e.preventDefault();
                     const selection = {start: textarea.selectionStart, end: textarea.selectionEnd };
                     var val = textarea.value;
                     let paste = (e.clipboardData || window.clipboardData).getData("text");
                     let list = paste.match(/\d{10}:?\d{2}:?\d{3}:?\d{4}/g);
                     if (list?.length) {
                        textarea.value = val.slice(0, selection.start);
                        for (var i=0;i<list.length;i++) {
                           let elm = list[i].replace(/[^0-9]/g, '');
                           elm = `${elm.substr(0, 10)}:${elm.substr(10, 2)}:${elm.substr(12, 3)}:${elm.substr(15, 4)}\r\n`;
                           textarea.value+=elm;
                        }
                        textarea.value+=val.slice(selection.end);
                     }
                  };
/*                  
                  let buttons = document.createElement('div');
                  buttons.style.float = 'right';

                  let buttonStart = document.createElement('div');
                  buttonStart.classList.add('btn', 'btn-primary', 'fa', 'fa-play');
                  buttonStart.style.cssText = 'pointer-events: auto;background-color:#3C8DBC;';

                  let buttonPause = document.createElement('div');
                  buttonPause.classList.add('btn', 'btn-primary', 'fa', 'fa-pause');
                  buttonPause.style.cssText = 'pointer-events: none;background-color:#C0C0C0;';

                  let buttonStop = document.createElement('div');
                  buttonStop.classList.add('btn', 'btn-primary', 'fa', 'fa-stop');
                  buttonStop.style.cssText = 'pointer-events: auto;background-color:#3C8DBC;';

                  buttons.appendChild(buttonStart);
                  buttons.appendChild(buttonPause);
                  buttons.appendChild(buttonStop);
*/
                  let buttonStart = document.createElement('div');
                  buttonStart.classList.add('btn', 'btn-primary');
                  buttonStart.style.float = 'right';
                  buttonStart.textContent = 'Пошук';
                  // table
                  let table = document.createElement('table');
                  table.classList.add('table', 'table-bordered', 'table-hover', 'dataTable', 'no-footer', 'dtr-inline');
                  table.style.width = '100%';
                  table.id = 'cadastr_group_list_table';
                  let table_thead = document.createElement('thead');
                  table.appendChild(table_thead);
                  table.appendChild(document.createElement('tbody'));
                  let tr = document.createElement('tr');
                  table_thead.appendChild(tr);

                  let th = document.createElement('th');
                  th.classList.add('text-center','all');
                  th.rowspan = 1; th.colspan = 1;
                  th.style.cssText = 'width: 200px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px;';
                  let th_div = document.createElement('div');
                  th_div.classList.add('dataTables_sizing');
                  th_div.style.cssText = 'overflow: hidden;';
                  th_div.innerText = 'Кадастровий номер';
                  th.appendChild(th_div);
                  tr.appendChild(th);

                  th = document.createElement('th');
                  th.classList.add('text-center','all');
                  th.rowspan = 1; th.colspan = 1;
                  th.style.cssText = 'width: 200px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px;';
                  th_div = document.createElement('div');
                  th_div.classList.add('dataTables_sizing');
                  th_div.style.cssText = 'overflow: hidden;';
                  th_div.innerText = 'Статус';
                  th.appendChild(th_div);
                  tr.appendChild(th);

                  th = document.createElement('th');
                  th.classList.add('text-center','all');
                  th.rowspan = 1; th.colspan = 1;
                  th.style.cssText = 'width: 400px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px;';
                  th_div = document.createElement('div');
                  th_div.classList.add('dataTables_sizing');
                  th_div.style.cssText = 'overflow: hidden;';
                  th_div.innerText = 'Інформація';
                  th.appendChild(th_div);
                  tr.appendChild(th);

                  th = document.createElement('th');
                  th.classList.add('text-center','not-mobile');
                  th.rowspan = 1; th.colspan = 1;
                  th.style.cssText = 'width: 200px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px;';

                  th_div = document.createElement('div');
                  th_div.classList.add('dataTables_sizing');
                  th_div.style.cssText = 'overflow: hidden;';
                  th_div.innerText = 'Дії';
                  // downloadItem container
                  //* { https://stackoverflow.com/questions/11371550 }
                  let css = '.dropbtn{position: relative;float: right;color: coral;}.dropbtn:hover{color: red;}.dropbtn:focus{color: red;} .dropdown { position: relative; display: inline-block; }.dropdown-content {display: none;cursor: pointer; position: absolute;background-color: #f1f1f1;min-width: 200px;font-size: 12px;font-weight:100;text-align: left;overflow: auto;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);z-index: 1;}.dropdown-content a {color: black;padding: 4px 16px;text-decoration: none;display: block;}.dropdown-content a:hover {background-color: #ddd;}.show {display: block;}';
                  let style = document.createElement('style');
                  if (style.styleSheet) {
                     style.styleSheet.cssText = css;
                  } else {
                     style.appendChild(document.createTextNode(css));
                  }
                  document.getElementsByTagName('head')[0].appendChild(style);

                  let a = document.createElement('a');
                  a.classList.add('dropbtn');
                  a.title="Завантажити"
                  a.style.display = 'none';

                  let ObjectsArray = [];
                  window.onclick = function(e) {
                     if (!e.target.parentNode.matches('.dropbtn')) {
                        var dropdowns = document.getElementById("dropdownMenu");
                        if (dropdowns) dropdowns.style.display = 'none';
                     }
                  }

                  a.onclick = (e) => {
                     e.preventDefault();
                     var dropdowns = document.getElementById("dropdownMenu");
                     if (dropdowns) dropdowns.style.display = dropdowns.style.display === 'block' ? 'none' : 'block';
                  }

                  let i = document.createElement('i');
                  i.classList.add('fa','fa-fw','fa-file-archive-o');
                  th_div.appendChild(a).appendChild(i);

                  let dropdownMenuClick = (e) => {
                     e.preventDefault();
                     if (e.target.innerHTML.match(/\s+PDF\s+/m)) {
                        if (ObjectsArray.length > 0) {
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'download_pdf_files_zip', objects: ObjectsArray } } );
                           window.dispatchEvent(event);
                        }
                     } else if (e.target.innerHTML.match(/\s+JSON\s+/m)) {
                        if (ObjectsArray.length > 0) {
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'download_json_files_zip', objects: ObjectsArray } } );
                           window.dispatchEvent(event);
                        }
                     } else if (e.target.innerHTML.match(/\s+IN4\s+/m)) {
                        if (ObjectsArray.length > 0) {
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'download_in4_files_zip', objects: ObjectsArray } } );
                           window.dispatchEvent(event);
                        }
                     }
                  }
                  let div_drop = document.createElement('div');
                  div_drop.id = 'dropdownMenu';
                  div_drop.classList.add('dropdown-content');
                  a = document.createElement('a');
                  a.onclick = dropdownMenuClick;
                  a.innerText = 'Завантажити всі PDF (ZIP)';
                  div_drop.appendChild(a);
                  a = document.createElement('a');
                  a.onclick = dropdownMenuClick;
                  a.innerText = 'Завантажити всі JSON (ZIP)';
                  div_drop.appendChild(a);
                  a = document.createElement('a');
                  a.onclick = dropdownMenuClick;
                  a.innerText = 'Завантажити всі IN4 (ZIP)';
                  div_drop.appendChild(a);
                  th_div.appendChild(div_drop);

                  th.appendChild(th_div);
                  tr.appendChild(th);

                  container.appendChild(textarea);
                  container.appendChild(buttonStart);
                  container.appendChild(table);

                  node.parentElement.appendChild(document.createElement('br'));
                  node.parentElement.appendChild(input);
                  node.parentElement.appendChild(document.createTextNode(' '));
                  node.parentElement.appendChild(label);
                  node.parentElement.appendChild(container);

                  // забрити addFooter з addTableRow()
                  let addTableRow = ( options ) => {
                     let mode = options.mode ?? 'addRow'; // addRow | addFooter
                     let text = options.text ?? '';

                     const tbody = document.querySelector('table[id="cadastr_group_list_table"]>tbody');
                     if (tbody) {
                        let id = tbody.childElementCount;
                        let tr = document.createElement('tr');
                        tr.setAttribute('value', id);
                        tbody.appendChild(tr);
      
                        let td = document.createElement('td');
                        td.classList.add('text-center','all', 'dtr-control');
                        if (mode === 'addFooter') {
                           td.innerText = text;
                        } else {
                           let a = document.createElement('a');
                           a.target = '_blank';
                           a.href = `https://e.land.gov.ua/back/cadaster/?cad_num=${text}`;
                           a.innerText = text;
                           td.appendChild(a);
                        }
                        tr.appendChild(td);

                        td = document.createElement('td');
                        td.classList.add('text-center', 'desktop');
                        span = document.createElement('span');
                        span.classList.add('status', 'label-info'); // 'label-success'
                        span.innerText = 'В обробці';
                        span.style.display = mode === 'addFooter' ? 'none' : '';
                        tr.appendChild(td).appendChild(span);

                        // info
                        td = document.createElement('td');
                        td.classList.add('text-center', 'desktop');
                        td.appendChild(document.createElement('div'));
                        tr.appendChild(td);

                        td = document.createElement('td');
                        td.classList.add('desktop');
                        let div = document.createElement('div');
                        div.classList.add('btn-group');

                        a = document.createElement('a');
                        a.style.display = 'none';
                        a.classList.add('btn','btn-default','btn-flat','fancy-view-request','fancybox.ajax');
                        a.title="Переглянути на карті"
                        a.type = 'button';
                        a.href = '';
                        let i = document.createElement('i');
                        i.classList.add('fa','fa-fw','fa-map');
                        div.appendChild(a).appendChild(i);

                        a = document.createElement('a');
                        a.style.display = mode === 'addFooter' ? '' : 'none';
                        a.classList.add('btn','btn-default','btn-flat','fancy-view-request','fancybox.ajax');
                        a.title = 'Завантажити PDF';
                        a.type = 'button';
                        a.href = '';
                        i = document.createElement('i');
                        i.classList.add('fa','fa-fw','fa-file-pdf-o');
                        div.appendChild(a).appendChild(i);

                        a = document.createElement('a');
                        a.style.display = mode === 'addFooter' ? '' : 'none';
                        a.classList.add('btn','btn-default','btn-flat','fancy-view-request','fancybox.ajax');
                        a.title = 'Завантажити JSON';
                        a.type = 'button';
                        a.href = '';
                        i = document.createElement('i');
                        i.classList.add('fa','fa-fw','fa-file-code-o');
                        div.appendChild(a).appendChild(i);

                        a = document.createElement('a');
                        a.style.display = mode === 'addFooter' ? '' : 'none';
                        a.classList.add('btn','btn-default','btn-flat','fancy-view-request','fancybox.ajax');
                        a.title = 'Завантажити In4';
                        a.type = 'button';
                        a.href = '';
                        i = document.createElement('i');
                        i.classList.add('fa','fa-fw','fa-file-text-o');
                        div.appendChild(a).appendChild(i);

                        td.appendChild(div);
                        tr.appendChild(td);
                     }
                  }

                  let changeStatus = (options) => {
                     const status = ['В обробці', 'Готово', 'Помилка'];
                     const types = ['label-info', 'label-success', 'label-warning'];
                     const index = options?.index || null;
                     const message = options?.msg || '';
                     const html = options?.html || '';

                     const pdf  = options?.pdf || '';
                     const json = options?.json || '';

                     let type = types.indexOf(options?.type || 'label-info');
                     type = type === -1 ? 0 : type;
                     if (!index) return;
                     const row = document.querySelector(`table[id="cadastr_group_list_table"]>tbody>tr:nth-of-type(${index})`);

                     const info = row.querySelector(`td:nth-of-type(${3})>div`);
                     if (info) info.innerText = message;

                     const mapTag = row.querySelector(`td:nth-of-type(${4})>div>a:nth-of-type(1)`);
                     const pdfTag = row.querySelector(`td:nth-of-type(${4})>div>a:nth-of-type(2)`);
                     const jsonTag = row.querySelector(`td:nth-of-type(${4})>div>a:nth-of-type(3)`);
                     const in4Tag = row.querySelector(`td:nth-of-type(${4})>div>a:nth-of-type(4)`);
                     if (pdfTag && pdf) { 
                        pdfTag.style.display = ''; pdfTag.href = pdf; 
                        pdfTag.onclick = (e) => {
                           e.preventDefault();
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'download_pdf_file', url: e.currentTarget.href, html: html } } );
                           window.dispatchEvent(event);
                           //window.location.href = e.currentTarget.href;
                           //window.open(e.currentTarget.href);
                        }
                     }
                     if (jsonTag && json) { 
                        jsonTag.style.display = ''; jsonTag.href = json;
                        jsonTag.onclick = (e) => {
                           e.preventDefault();
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'download_json_file', url: e.currentTarget.href, html: html } } );
                           window.dispatchEvent(event);
                        }
                     }
                     if (in4Tag && json) {
                        in4Tag.style.display = ''; in4Tag.href = json;
                        in4Tag.onclick = (e) => {
                           e.preventDefault();
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'download_in4_file', url: e.currentTarget.href, html: html } } );
                           window.dispatchEvent(event);
                        }
                     }
                     if (mapTag && json) { 
                        mapTag.style.display = ''; mapTag.href = json; 
                        mapTag.onclick = (e) => {
                           e.preventDefault();
                           const event = new CustomEvent('XDR_MAIN_MESSAGE', {detail: { action: 'view_json_on_map', url: e.currentTarget.href } } );
                           window.dispatchEvent(event);
                        }
                     }

                     const statusBtn = row.querySelector(`td:nth-of-type(${2})>span`);
                     if (!statusBtn) return;
                     types.forEach(e=>{ statusBtn.classList.remove(e) });
                     statusBtn.classList.add(types[type]);
                     statusBtn.innerText = status[type];
                  }
                  input.onclick = (e) => {
                     const checked = e.target.checked;
                     let group_cadnum = document.getElementById('cadastr_group_list');
                     if (group_cadnum) {
                        container.style.display = checked ? '' : 'none';
                     }
                  }

                  let stopSearch = false;
                  buttonStart.onclick = async (e) => {
                     e.preventDefault();
                     stopSearch = e.target.textContent === 'Стоп';
                     e.target.textContent = stopSearch ? 'Пошук' : 'Стоп';
                     if (stopSearch) return;
                     ObjectsArray = [];   // clear global html array

                     let tbody = document.querySelector(`table[id="cadastr_group_list_table"]>tbody`);
                     while(tbody.hasChildNodes()) {
                        tbody.removeChild(tbody.firstChild);
                     }

                     const checked = document.getElementById('cadastr_group_find_by_cadnum_cadNum')?.checked;
                     if (checked) {
                        let getToken = async ()=> {
                           return await new Promise((res, rej) => {
                              window.postMessage({message: 'XDR_RECAPTCHA_GET', action: 'parcel_info'}, '*');
                              window.addEventListener('XDR_RECAPTCHA_TOKEN', function getMessage (e) {
                                 res(e?.detail?.token);
                              })
                              setTimeout(()=>{ res(false); }, 3000);
                           })
                        }

                        let getPage = async (url, method='GET', formData={}) => {
                              const _url = new URL(url);
                              let headers = new Headers({'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 
                                                         'X-Requested-With'  : 'XMLHttpRequest'
                                                        });
                              let response = method==='GET' ? await fetch(_url) : await fetch(_url, { method: method, mode:'cors', credentials:'same-origin', body: formData, headers: headers });
                              if (response.ok) { 
                                 let data = await response.text();
                                 return {success: data};
                              } else {
                                 try {
                                    let message = await response.text();
                                    if (json = JSON.parse(message)) {
                                       return json.error ? json : { error : json };
                                    } else {
                                       return {error : response.status };
                                    }
                                 } catch(error) {
                                    return {error : response.status };
                                 }
                              }
                        }

                        let delay = (ms) => {return new Promise((res,rej) => setTimeout(res,ms)); }
                        let group_cadnum = document.getElementById('cadastr_group_list');
                        if (group_cadnum) {
                           let list = textarea.value.match(/\d{10}:\d{2}:\d{3}:\d{4}/g);
                           if (list?.length) {
                              const downloadBtn = document.querySelector('a.dropbtn');
                              downloadBtn.style.display = '';
                              // 1 прохід
                              for (element in list) {
                                 const cadnum = list[element];
                                 addTableRow({mode: 'addRow', text: cadnum } );
                              }

                              for (let element = 0; element < list.length; element++) {
                                 if (stopSearch) {
                                    changeStatus({index: (element + 1), type: 'label-warning', msg: 'Зупинено користувачем'});
                                    continue;
                                 }
                                 await delay(2000);
                                 let request = await getPage('https://e.land.gov.ua/back/cadaster/');
                                 if (request.success) {
                                    let data = request.success;
                                    const t1 = data.match(/name="cadastr_find_by_cadnum\[token\]"\s+value="([^"]*)"/,"im")?.[1];
                                    const t2 = data.match(/name="cadastr_find_by_cadnum\[recaptcha\]"\s+value="([^"]*)"/,"im")?.[1];
                                    const t3 = data.match(/name="cadastr_find_by_cadnum\[_token\]"\s+value="([^"]*)"/,"im")?.[1];
                                    
                                    if (t1 && t3) {

                                       const cadnum = list[element];

                                       let token = await getToken();
                                       if (token) {
                                          var formData = new FormData();
                                          formData.append('cadastr_find_by_cadnum[cadNum]', cadnum );
                                          formData.append('cadastr_find_by_cadnum[token]', t1);
                                          formData.append('cadastr_find_by_cadnum[recaptcha]', t2 );
                                          formData.append('cadastr_find_by_cadnum[_token]', t3 );
                                          formData.append('cadastr_find_by_cadnum[recaptcha]', 'parcel_info;' + token );

                                          getPage('https://e.land.gov.ua/back/cadaster/', 'POST', formData).then((request) => {
                                             if (request.success) {
                                                try {
                                                   let data = request.success;
                                                   data = data.replace(/(?:\r\n|\r|\n)/g,'');
                                                   let matches = data.match(/(?:(?:<td>\s*Місце розташування\s*<\/td>\s*<td>\s*(?<address>.*?)\s*<\/td>)[\s\S]*)?class="box-footer"[\s\S]*?<a href="(?<pdf>[^"]*)[\s\S]*?<a href="(?<json>[^"]*)/im);
                                                   let specrep = (e) => {return e?e.replace(/(&nbsp;|<br>|&#160;)/g,'').replace(/(&amp;|&#038;|&#38;)/g, '&').replace(/(&gt;|&#062;|&#62;)/g, '>').replace(/(&lt;|&#060;|&#60;)/g, '<').replace(/(&quot;|&#034;|&#34;)/g, '"').replace(/(&apos;|&#039;|&#39;)/g, '\''):''};
                                                   matches.groups.address = specrep(matches.groups.address);

                                                   ObjectsArray.push({cadnum: cadnum, id: element, html: data}); // масив для загального завантаження
                                                   changeStatus({index: (element + 1), type: 'label-success', html: data, pdf: matches.groups.pdf||'', json: matches.groups.json||'', msg: matches.groups.address||''});
                                                } catch(e) { throw e };
                                             } else {
                                                changeStatus({index: (element + 1), type: 'label-warning', msg: request?.error?.msg || 'Невідома помилка'});
                                             }
                                          }).catch( e => { 
                                             XMLDocReader.log('.getPage error', e);
                                             changeStatus({index: (element + 1), type: 'label-warning', msg: e.message});
                                          });
                                    
                                       } else {
                                          XMLDocReader.log('.getToken function error.');
                                          changeStatus({index: (element + 1), type: 'label-warning', msg: 'Помилка отримання токену'});
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                     e.target.textContent = 'Пошук';
                  }
                  break;
               } else if (XMLDocReader.url.startsWith('https://e.land.gov.ua/back/cadaster/requests/list')) {
                  let ip = node.querySelector('td.not-mobile');
                  let inArray=(a,e)=>{let t=false,r=null;a.forEach(i=>{if(!t&&i.ip===e){t=true;r=i;}});return r;}
                  let getPage=async(url)=>{const _url=new URL(url);let response=await fetch(_url);if(response.ok){let data=await response.json();return{success:data};}else{return{error:response.status};}}
                  if (ip) {
                     let checkIpFunc = async (addressIP) => {
                        let element = inArray(listIP, addressIP);
                        if (!element) {
                           let total = listIP.push({ip: addressIP, status: 'download', elements: [ip], data: {}});
                           total--;
                           let url = `https://ipwho.is/${addressIP}`;
                           await getPage(url).then(response=>{
                              if (json=response.success) {
                                 listIP[total].status = 'success';
                                 listIP[total].data = json;
                                 listIP[total].elements.forEach(i=>{
                                    i.textContent = `${json.ip} (${json?.region||''} - ${json?.city||''})`;
                                 });
                              } else {
                                 listIP[total].status = 'error';
                                 console.error("Error:", response?.error || 'unknown');
                              }
                           });
                        } else {
                           element.elements.push(ip);
                           if (element.data) {
                              if (element.status === 'success') { //  
                                 ip.textContent = `${addressIP} (${element.data?.region||''} - ${element.data?.city||''})`;
                              } else {
                                 ip.textContent = `${addressIP} (...)`;
                              }
                           }
                        }
                     }
                     const regex=/(\d{1,3}\.){3}\d{1,3}/m;if(regex.test(ip.textContent)){addressIP=ip.textContent.match(/(\d{1,3}\.){3}\d{1,3}/m)[0];checkIpFunc(addressIP);}
                  }
               }
            }
         }
      });
      let listIP = []; // address array
      observer.observe(document.documentElement, { childList: true, subtree: true }); //

      document.addEventListener("DOMContentLoaded", (e) => {
         XMLDocReader.dialog = new XMLDocReader.classes.modalDialog();
         window.addEventListener('XDR_CONTENT_MESSAGE', async (e) => {
            if (e?.detail?.type === 'dialog') {
               if (!XMLDocReader.dialog) return;
               const action = ['show','hide','update'].includes(e.detail?.action) ? e.detail.action: 'hide';
               const text = e.detail?.text ? e.detail.text: '';
               const min = e.detail?.min ? e.detail.min: 0;
               const max = e.detail?.max ? e.detail.max: 100;
               const position = e.detail?.position ? e.detail.position: 0;
               switch (action) {
                  case 'show':
                    XMLDocReader.dialog.setTile(text);
                    XMLDocReader.dialog.setMin(min);
                    XMLDocReader.dialog.setMax(max);
                    XMLDocReader.dialog.setPosition(position);
                    XMLDocReader.dialog.show();
                    break;
                  case 'update':
                    if (text) XMLDocReader.dialog.setTile(text);
                    XMLDocReader.dialog.setPosition(position);
                    break;
                  case 'hide':
                    XMLDocReader.dialog.hide();
                    break;
               }
            } else {
               XMLDocReader.log('.XDR_CONTENT_MESSAGE unknown message:', e);
            }
         })
         XMLDocReader.log("DOM content fully loaded and parsed");
      });
   })(true);
})({});

