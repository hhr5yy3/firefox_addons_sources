/* 
  TU lAma - let Alma be more adroit

  extends jquery.ui.autocomplete.html
 
  Copyright (C) 2019 Leo Zachl, Technische Universität Wien, Bibliothek

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

(function( $ ) {

  var proto = $.ui.autocomplete.prototype;

  $.extend( proto, {

    _renderMenu: function(ul, items){
      var self = this;

      if (items.length > 0){
        if (!!items[0].link && items[0].counts != undefined){
          $("<li class='autocomplete_title'><b><a target='KonkordanzSuche' href='"+items[0].link + "'>"+items[0].counts.limit
          +" Treffer von ("+items[0].counts.count+(!!items[0].counts.titles?"/"+items[0].counts.titles:'')+")</a></b></li>").appendTo(ul);
          try {
            var query = new URL(items[0].link).searchParams.get('query');
            if (self.element[0].nodeName == 'TEXTAREA' && self.element[0].value == '')
              self.element[0].value = query;
          } catch (e) { console.log(e); }
        } else if (!!items[0].links){
          $.each(items[0].links, function(i, link){
            $("<li class='autocomplete_title tuwsub'><b><a target='KonkordanzSuche' href='"+link.url + "'>"+link.text+"</a></b></li>").appendTo(ul);
          });
        } else if (items[0].counts != undefined){
          $("<li class='autocomplete_title'><b>"+items[0].counts.limit+" Titel von ("
           +items[0].counts.count+(!!items[0].counts.titles?"/"+items[0].counts.titles:'')+")</b></li>").appendTo(ul);
        }
      }
      $.each(items, function (index, item) {
        if (item.sub != undefined){
          $.each(item.sub, function (index, sub) {
            sub.isSub = true;
            self._renderItemData(ul, sub);
          });
        }
        self._renderItemData(ul, item);
      });
    }
  });

  jQuery.widget( "ui.autocomplete", jQuery.ui.autocomplete, {
    _close: function( event ) {
        if(event!== undefined && !!this.options.keepOpen) {
            return true;
        }
        //otherwise invoke the original
        return this._super( event );
    }
  });

})( jQuery );

let autocomplete_configs = {
  copy_marc: function (item,event){
    var marc;
    if (!!item.sub)
      marc = item.sub;
    else
      marc = [item];
    // debug(tuwsys).then(function(m){console.log(m)});

    marc.forEach(function(ts,i){
      if (!!ts.target.uniq && $("div[id^='MarcEditorPresenter.textArea."+ ts.target.tag +"']").closest('tr').filter(function(){
            return (!ts.target.ind1 || $(this).find("[id^='FieldIndicatorBox.tag."+ts.target.tag+"'][id$='.1']").val() == ts.target.ind1)
              && (!ts.target.ind2 || $(this).find("[id^='FieldIndicatorBox.tag."+ts.target.tag+"'][id$='.1']").val() == ts.target.ind2)
              && ($(this).find('textarea').val().trim() == ts.value)
          }).length > 0)
        return;
      target = $("div[id^='MarcEditorPresenter.textArea."+ ts.target.tag +"']").closest('tr').filter(function(){
        var matchempty;
        try {
          matchempty = !(ts.target.match)?/^(\$\$a(\s*\$.*)?)?$/:(new RegExp(ts.target.match.re,ts.target.match.flag));
        } catch(error){
          matchempty = /^(\$\$a(\s*\$.*)?)?$/;
          browser.runtime.sendMessage({
            action: "toast",
            message: "fehler beim matchen mit RegExp: "+ts.target.match.re,
            color: '#ff8f8f',
            duration: 20
          });
        }
        return (!ts.target.ind1 || $(this).find("[id^='FieldIndicatorBox.tag."+ts.target.tag+"'][id$='.1']").val() == ts.target.ind1)
          && (!ts.target.ind2 || $(this).find("[id^='FieldIndicatorBox.tag."+ts.target.tag+"'][id$='.1']").val() == ts.target.ind2)
          && $(this).find('textarea').val().trim().match(matchempty);
      }).find('textarea');
      if (target.length < 1){
        browser.runtime.sendMessage({
          action: "toast",
          message: "kein leeres "+ts.target.tag+"er Feld!",
          color: '#ffff8f',
          duration: 20
        });
        return false;
      }
      if (typeof(ts.value) == "object"){
        var j = 0;
        // 689 Schlagwortketten: bis zum ersten 689_x0 spingen
        if (ts.target.tag == '689'){
          while (j<target.length && $(target[j]).closest('tr').find('[id^="FieldIndicatorBox.tag.689"][id$="2"]').val() != '0')
            j++;
        }
        var origEvent = event;
        while (origEvent.originalEvent != undefined) origEvent = origEvent.originalEvent;
        let origTarget = $(origEvent.target);
        if (origEvent.target.nodeName == 'SPAN' && $(origEvent.target).hasClass('sub')){
          let valNum = parseInt(origEvent.target.attributes["num"].value);
          if (ts.target.tag == '689' && j>0){
            let swn = target.eq(j-1).closest('tr').find('[id^="FieldIndicatorBox.tag.689"][id$="1"]').val();
            while (j>0 && target.eq(j-1).closest('tr').find('[id^="FieldIndicatorBox.tag.689"][id$="1"]').val() == swn)
              j--;
          }
          if (ts.value[valNum] != undefined){
            target[j].value = ts.value[valNum];
            target[j].dispatchEvent(change);
            target[j].dispatchEvent(input);
            $(target[j]).blur().focus();
            j++;
          } else {
            browser.runtime.sendMessage({
              action: "toast",
              message: "kein Wert zu Element #" + valNum + " im " +ts.target.tag+"er Feld!",
              color: '#ffff8f',
              duration: 20
            });
            return false;
          }
        } else {
          ts.value.forEach(function(val,k){
            if (!target[j]){
              browser.runtime.sendMessage({
                action: "toast",
                message: "kein leeres "+ts.target.tag+"er Feld!",
                color: '#ffff8f',
                duration: 20
              });
              return false;
            }
            target[j].value = val;
            target[j].dispatchEvent(change);
            target[j].dispatchEvent(input);
            $(target[j]).blur().focus();
            j++;
          });
        }
      } else {
        target[0].value = ts.value;
        target[0].dispatchEvent(change);
        target[0].dispatchEvent(input);
        $(target[0]).blur().focus();
        j++;
      }
    });
  },
  tuwsys : {
    source: function (request, response) {
      debug(request.term.substr(-4).trim(),2).then(function(m){console.log(m)});
      if (request.term.substr(-4).trim() == '$$n'){
        // Personen und Körperschaften aus der Verschlagwortung
        var pbs = new Array();
        $("[id^='MarcEditorPresenter.textArea.689'] textarea, [id^='MarcEditorPresenter.textArea.600'] textarea, [id^='MarcEditorPresenter.textArea.610'] textarea").filter(function(){
          return this.parentNode.parentNode.id.startsWith('MarcEditorPresenter.textArea.610')
              || this.parentNode.parentNode.id.startsWith('MarcEditorPresenter.textArea.600')
              || !!this.value.match(/\$\$D [bp]/);
        }).each(function(){
          var gnd = this.value.match(/\$\$a *(.*?) *(\$\$|$)/);
          var tus = request.term.trim().match(/\$\$a *(...:...)( .*?) *(\$\$.*|$)/);
          debug(tus,2).then(function(m){console.log(m)});
          pbs.push({
            'value': '$$a ' + tus[1] + ' ' + gnd[1].substr(0,3).toUpperCase() + ' ' + tus[3] + ' ' + gnd[1],
            'label': '<b>' + this.parentNode.parentNode.id.substr(-3) + '</b> ' + $('<span/>').text(this.value.substr(4).replace(/\$\$/g,'|')).html()
          });
        });
        // doppelte einträge löschen
        response(pbs.filter(function (value, index, self){
          var fi = self.findIndex(function(val){
            return val.value === value.value;
          });
          return index === fi;
        }));
      } else if (request.term.substr(-4).trim() == '$$o'){
        // Geographikum
        var geos = new Array();
        var tus = request.term.trim().match(/\$\$a *(.*?) (.{3})(:.{3})?( (.{3})?(:.{3})? *)(\$\$.*)$/);
        debug(tus,2).then(function(m){console.log(m)});
        if (tus[1] == ''){
          tus[1] = tus[2] + tus[3];
          tus[2] = '---';
        }
        $("[id^='MarcEditorPresenter.textArea.689'] textarea, [id^='MarcEditorPresenter.textArea.651'] textarea, [id^='MarcEditorPresenter.textArea.662'] textarea").filter(function(){
          return this.parentNode.parentNode.id.startsWith('MarcEditorPresenter.textArea.651')
              || this.parentNode.parentNode.id.startsWith('MarcEditorPresenter.textArea.662')
              || !!this.value.match(/\$\$D g/);
        }).each(function(){
          var gnd = this.value.match(/\$\$a *(.*?)( \$\$.*)?$/);
          var gndnr = gnd[2].match(/\$\$0 *\(DE-588\)(.*?)( \$\$|$)/);
          debug(gnd,2).then(function(m){console.log(m)});
          geos.push({
            'value': '$$a ' + tus[1] + ' ' + tus[2] + ':' + gnd[1].substr(0,3).toUpperCase() + tus[4] + tus[7].trim() + ' ' + gnd[1],
            'label': '<b>' + this.parentNode.parentNode.id.substr(-3) + '</b> ' + $('<span/>').text(this.value.substr(4).replace(/\$\$/g,'|')).html(),
            'gndnr': !!gndnr?gndnr[1]:undefined
          });
        });
        // doppelte einträge löschen
        response(geos.filter(function (value, index, self){
          return index === self.findIndex(function(val){
            return val.value === value.value;
          });
        }));
      } else {
        // debug(request.term).then(function(m){console.log(m)});
        // debug(this).then(function(m){console.log(m)});
        showLoadingBlocker();
        debug({ac: 'tuwsys search', q: request.term},4).then(function(m){console.log(m)});
        jQuery.post(settings.tuwsysUrl, {
          QUERY: request.term,
          TIT: $("[id^='MarcEditorPresenter.textArea.245'] textarea").val(),
          KONK: konksuche,
          ACT: getJsonMarc(getMarc().rows),
          MMSID: $("[id^='MarcEditorPresenter.textArea.001'] textarea").val(),
          CURPOS: this.element.get(0).selectionStart
        },
        function (data) {
          hideLoadingBlocker();
          // debug(data).then(function(m){console.log(m)});
          if (konksuche != '' && data.length == 0){
            browser.runtime.sendMessage({
              action: "toast",
              message: konksuche + " suche nach »" + request.term + "« hat nichts ergeben",
              color: '#ffff8f',
              duration: 10
            });
          }
          if (data.length > 0 && data[0].tuwsys != undefined){
            var ndata = new Array;
            var bk = '';
            var sws = '';
            data.forEach(function(item){
              if (!!item.bk)
                bk = '<br/>' + item.bk.replace(/\n/g,'<br/>');
              else
                bk = '';
              if (!!item.sws)
                sws = item.sws.replace(/\n/g,'<br/>');
              else
                sws = '';
              ndata.push({label: '<b>'+ (item.title+' / '+item.autor).replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</b>', class: 'titlesub fullline', ignore: true});
              ndata.push({label: '<p class="sub">'+item.ac+'</p> ', value: item.tusyss, sub: item.marc});
            });
            if (!!data[0].limit) ndata[0].counts = { limit: data[0].limit, count: data[0].count, titles: data[0].titles };
            if (!!data[0].link) ndata[0].link = data[0].link;
            response(ndata);
          } else
            response(data);
        }).fail(function(xhr,msg,err){
          hideLoadingBlocker();
          console.log(xhr);
        });
      }
    },
    select: function( event, ui ) {
      debug(ui,4).then(function(m){console.log(m)});
      debug(event,4).then(function(m){console.log(m)});
      item = ui.item;
      if (!!item.ignore) return false;
      if (item.value != undefined){
        if (!!item && (item.sub != undefined || !!item.isSub)){
          $(this).autocomplete( "option", "keepOpen", true );
          autocomplete_configs.copy_marc(item,event);
        } else {
          $(this).autocomplete( "option", "keepOpen", false );
        }
        if (typeof(ui.item.value)=="object")
          selected = ui.item.value[0].match(/\$\$a *(.*?) *(\$\$.*|$)/);
        else
          selected = ui.item.value.match(/\$\$a *(.*?) *(\$\$.*|$)/);
        debug(selected,4).then(function(m){console.log(m)});
        if (!!item && (item.sub != undefined || !!item.isSub)) return false;
      }
    },
    close:  function( event, ui ) {
      item = ui.item;
      $(this).autocomplete( "option", "keepOpen", false );
      if (!!item && item.sub != undefined){
        debug(event,4).then(function(m){console.log(m)});
      } else if (!!item && item.gndnr != undefined && this.value.substr(12,3) == '---'){
        var that = this;
        jQuery.post(settings.tuwsysUrl, {
          QUERY: item.gndnr,
          KONK: 'G'
        },
        function(data){
          var cur = that.value.match(/\$\$a *(.*?) *(\$\$g .*?)? *(\$\$o .*)?( *\$\$[^dego].*?)?$/);
          if (cur && data[0] != undefined){
            if (cur[4] == undefined) cur[4] = '';
            if (data[0].code.length == 3){
              if (cur[1].substr(0,3) == 'ALL') data[0].code += ':---';
              that.value = "$$a " + cur[1].substr(0,8) + data[0].code + cur[1].substr(15) + " $$g " + data[0].g + cur[4];
            } else
              that.value = "$$a " + cur[1].substr(0,8) + data[0].code + cur[1].substr(15) + " $$g " + data[0].g + " $$o " + data[0].o + cur[4];
            that.dispatchEvent(change);
            $(that).trigger("change");
          } else {
            debug(that,2).then(function(m){console.log(m)});
            debug(data,2).then(function(m){console.log(m)});
          }
        });
      } else {
        this.dispatchEvent(change);
        $(this).trigger("change");
        if (selected != undefined && !!selected && (selected[1].length < 8 && (selected[1][3] == ':' || selected[1].trim().length < 4) || selected[0].substr(-4).trim().substr(0,2) == '$$')){
          $(this).autocomplete('search',selected[0]);
        }
      }
      item = false;
      selected=false;
    },
    open: function(){
      $(this).autocomplete("widget").find('li.autocomplete_title a').on('click',function(){
        konkWin = window.open(this.href,this.target);
        return false;
      });
      activeAutoCompleteTarget = $(this);
      debug('ac opened',2).then(function(m){console.log(m)});
    },
    classes: { "ui-autocomplete": "tulama-tuwsys" },
    html: true,
    delay: 700,
    position: { my: "left top", at: "right bottom", collision: "fit" }
  },
  tissou_971_5 : {
    source: function (request, response) {
      let subs = request.term.match(/\$\$a(.*?)(?:\$\$b(.*?))?(?:\$\$c(.*?))?(?:\$\$d(.*?))?(?:\$\$0(.*?))?(?:\$\$e(.*?))?$/);
      if (!!subs[4] && subs[4].trim() != ''){
        search_term = subs[4].trim();
        if (search_term.length > 4 && search_term[4] == '-')
          search_term = search_term.substr(0,4);
      } else if (!!subs[3] && subs[3].trim() != '')
        search_term = subs[3].trim();
      else if (!!subs[2] && subs[2].trim() != '')
        search_term = subs[2].trim();
      else if (!!subs[1] && subs[1].trim() != '')
        search_term = subs[1].trim();
      else
        search_term = 'Fakultät';
      debug({ac: 'tissou', q: search_term},4).then(function(m){console.log(m)});
      jQuery.get('https://tiss.tuwien.ac.at/api/orgunit/v22/osuche', {
        q: search_term,
        max_treffer: 100
      },
      function (data) {
        var ndata = [];
        data.results.forEach(function(res){
          if (res.type == 'INS' || res.type == 'ABT' || res.type == 'OOG' || res.type == 'GKI' || res.type == 'EXT')
            ndata.push({
              value: '$$a Technische Universität Wien $$b ' + res.parent_org_ref.name_de + ' $$c ' + res.name_de + ' $$d '+ res.code,
              label: '<b>' + res.code + ' - ' + res.name_de + '</b>',
              childs: res.child_orgs_refs,
              base: '$$a Technische Universität Wien $$b ' + res.parent_org_ref.name_de + ' $$c ' + res.name_de
            });
          else if (res.type == 'FAK' || res.type == 'VIR' || res.type == 'REK' || res.type == 'GRU')
            ndata.push({
              value: '$$a Technische Universität Wien $$b ' + res.name_de + ' $$d '+ res.code,
              label: '<b>' + res.code + ' - ' + res.name_de + '</b>',
              childs: res.child_orgs_refs,
              base: '$$a Technische Universität Wien $$b ' + res.name_de
            });
        });
        if (ndata.length == 1){
          ndata[0].childs.forEach(function(res){
            if (res.type == 'INS' || res.type == 'ABT' || res.type == 'OOG' || res.type == 'GKI' || res.type == 'EXT')
              ndata.push({
                value: ndata[0].base + ' $$c ' + res.name_de + ' $$d '+ res.code,
                label: '&nbsp;&nbsp;<b>' + res.code + ' - ' + res.name_de + '</b>'
              });
            else if (res.type == 'FOB' || res.type == 'FAB' || res.type == 'DEK')
            ndata.push({
              value: ndata[0].base + ' $$d '+ res.code + ' $$e ' + res.name_de,
              label: '&nbsp;&nbsp;<b>' + res.code + ' - ' + res.name_de + '</b>'
            });
          });
        }
        if (ndata.length > 0){
          ndata[0].counts = { limit: ndata.length, count: data.total_results };
          ndata[0].link = "https://tiss.tuwien.ac.at" + data.query_uri
        } else {
          ndata.push({
            value: request.term, // $$2 gnd??
            label: 'nichts gefunden!',
            counts: {limit: 0, count: data.total_results},
            link: "https://tiss.tuwien.ac.at" + data.query_uri
          });
        }
        response(ndata);
      }).fail(function(xhr,msg,err){
        console.log(xhr);
      })
    },
    change: function (){
      this.dispatchEvent(change1);
    },
    open: function(){
//      activeAutoCompleteTarget = $(this);
      debug('ac tissou opened',2).then(function(m){console.log(m)});
    },
    classes: { "ui-autocomplete": "tulama-tuwsys" },
    html: true,
    delay: 700,
    position: { my: "left top", at: "right bottom", collision: "fit" }
  },
  gnd_tiss_orcid: {
    source: function (request, response) {
      var query;
      let subs = request.term.match(/\$\$a\s*(.*?)\s*(\$\$|$)/);
      if (!!subs && !!subs[1] && subs[1].trim() != ''){
        query = {
          q: subs[1].trim(),
          max_treffer: 100
        };
      } else if (request.term.startsWith('id')){
        query = {
          id: request.term.substr(3),
          max_treffer: 100
        };
      }
      let f375 = $("div[id^='MarcEditorPresenter.textArea.375'] textarea").val();
      if (!!f375){
        let gen = f375.match(/\$\$a\s*([12])/);
        if (!!gen) query.gen=gen[1];
      }
      debug({ac: 'tiss_orcid', q: query},4).then(function(m){console.log(m)});
      jQuery.get(settings.tissorcUrl, query,
      function (data) {
        response(data);
      }).fail(function(xhr,msg,err){
        console.log(xhr);
      })
    },
    select: function(event, ui){
      if (!!ui.item.search){
        this.dataset.selectedItem = ui.item.search;
        return false;
      } else {
        this.dataset.selectedItem = false;
        if (ui.item.value != undefined){
          if (!!ui.item && (ui.item.sub != undefined || !!ui.item.isSub)){
            $(this).autocomplete( "option", "keepOpen", true );
            autocomplete_configs.copy_marc(ui.item,event);
            return false;
          } else {
            $(this).autocomplete( "option", "keepOpen", false );
          }
        }
      }
    },
    open: function(){
      $(this).autocomplete("widget").find('li.autocomplete_title a').on('click',function(){
        konkWin = window.open(this.href,this.target);
        return false;
      });
      activeAutoCompleteTarget = $(this);
      debug('ac opened',2).then(function(m){console.log(m)});
    },
    close: function(event, ui){
      if (!!this.dataset.selectedItem){
        $(this).autocomplete('search',this.dataset.selectedItem);
      }
      activeAutoCompleteTarget = false;
    },
    change: function (){
      this.dispatchEvent(change1);
    },
    classes: { "ui-autocomplete": "tulama-tuwsys" },
    html: true,
    delay: 10000,
    position: { my: "left top", at: "right bottom", collision: "fit" }
  },
  gnd_lobid_dnb: {
    source: function (request, response) {
      var subs = request.term.match(/\$\$[^a].*/); // alles außer $$a
      let search_term = request.term.replace(/\$\$a|\$\$[^a].*|,/g,'').trim();
      if (search_term.length < 3) return false;
      if (subs) subs = subs[0].replace(/\$\$0[^\$]*/,'').trim(); // $$0 löschen
      else subs='';
      if (subs != '') subs = ' '+subs.trim();
      showLoadingBlocker();
      debug({ac: 'lobid_dnb', q: search_term},4).then(function(m){console.log(m)});
      if (!!settings.gndUrl && settings.gndUrl != '')
        jQuery.get(settings.gndUrl, {
            version: '1.1',
            operation: 'searchRetrieve',
            query: 'PER="'+search_term+'" and BBG=Tp*',
            recordSchema: 'MARC21-xml',
            maximumRecords: 100
          },
          function (data) {
            hideLoadingBlocker();
            let xml = $(data);
            let rec = xml.find('recordData record');
            var ndata = [];
            if (rec.length > 0){
              rec.each(function(i,r){
                let e=$(r);
                let name = e.find('datafield[tag="100"] subfield[code="a"]');
                let gnd = e.find('controlfield[tag="001"]');
                if (name.length > 0 && gnd.length > 0){
                  var view = '';
                  var ext = '';
                  e.find('datafield[tag="042"] subfield[code="a"]').each(function(j,d){
                    view += ' '+d.textContent;
                  });
                  e.find('datafield[tag="548"] subfield[code="a"]').each(function(j,d){
                    view += ' '+d.textContent;
                  });
                  var delim = ' ';
                  e.find('datafield[tag="550"] subfield[code="a"]').each(function(j,d){
                    view += delim+d.textContent;
                    delim = '/';
                  });
                  delim = ' ORCID:';
                  e.find('datafield[tag="024"]:has(subfield[code="2"]:contains("orcid")) subfield[code="a"]').each(function(j,d){
                    view += delim+d.textContent;
                    delim = ',';
                  });
                  delim = '<b>Geo-Area:</b> ';
                  e.find('datafield[tag="043"] subfield[code="c"]').each(function(j,d){
                    ext += delim+d.textContent+'<br/>';
                    delim = '&nbsp;&nbsp;';
                  });
                  delim = '<b>Affiliation:</b> ';
                  e.find('datafield[tag="510"] subfield[code="a"]').each(function(j,d){
                    ext += delim+d.textContent+'<br/>';
                    delim = '&nbsp;&nbsp;';
                  });
                  delim = '<b>Bio:</b> ';
                  e.find('datafield[tag="678"] subfield[code="b"]').each(function(j,d){
                    ext += delim+d.textContent+'<br/>';
                    delim = '&nbsp;&nbsp;';
                  });
                  if (ext != '') view += '<div class="tuwsys-tooltip">'+ext+'</div>';
                  ndata.push({
                    value: '$$a '+ name.get(0).textContent.trim().replace('\u0098','<<').replace('\u009c','>>') + subs + ' $$0 (DE-588)'+gnd.get(0).textContent.trim(), // $$2 gnd??
                    label: '<b>' + name.get(0).textContent.trim().replace('\u0098','&lt;&lt;').replace('\u009c','&gt;&gt;') + '</b>' + view
                  });
                }
              });
              ndata[0].counts = {limit: ndata.length, count: xml.find('numberOfRecords').get(0).textContent };
              ndata[0].link = "https://portal.dnb.de/opac/moveDown?currentResultId=per%3D"+encodeURIComponent(search_term)+"%26any&categoryId=persons";
            } else
              ndata.push({
                value: request.term, // $$2 gnd??
                label: 'nichts gefunden!',
                counts: {limit: ndata.length, count: xml.find('numberOfRecords').get(0).textContent },
                link: "https://portal.dnb.de/opac/moveDown?currentResultId=per%3D"+encodeURIComponent(search_term)+"%26any&categoryId=persons"
              })    
            response(ndata);
          }
        ).fail(function(xhr,msg,err){
          hideLoadingBlocker();
          console.log(xhr);
        })
      else
        jQuery.get(settings.lobidUrl, {
          q: search_term,
          format: 'json',
          filter: '+(type:Person)',
          size: 100
        },
        function (data) {
          hideLoadingBlocker();
          var ndata = [];
          if (data.totalItems > 0)
            data.member.forEach(function(member){
              if (!!member.preferredName && !!member.gndIdentifier)
                var view = '';
                var ext = '';
                if (!!member.gndLevel) view += ' '+member.gndLevel;
                if (!!member.dateOfBirth) view += ' '+member.dateOfBirth.join('?')+'-';
                if (!!member.dateOfDeath) view += ' '+member.dateOfDeath.join('?');
                if (!!member.academicDegree) view += ' '+member.academicDegree.join(' ');
                if (!!member.professionOrOccupation) view += ' '+member.professionOrOccupation.map(p => p.label).join('/');
                if (!!member.geographicAreaCode) ext += '<b>Geo-Area:</b> '+member.geographicAreaCode.map(p => p.label).join('<br/>&nbsp;&nbsp;')+'<br/>';
                if (!!member.affiliation) ext += '<b>Affiliation:</b> '+member.affiliation.map(p => p.label).join('<br/>&nbsp;&nbsp;')+'<br/>';
                if (!!member.biographicalOrHistoricalInformation) ext += '<b>Bio:</b> '+member.biographicalOrHistoricalInformation.join('<br/>&nbsp;&nbsp;')+'<br/>';
                if (ext != '') view += '<div class="tuwsys-tooltip">'+ext+'</div>';
                ndata.push({
                  value: '$$a '+ member.preferredName.trim() + subs + ' $$0 (DE-588)'+member.gndIdentifier, // $$2 gnd??
                  label: '<b>' + member.preferredName+'</b>'+view
                });
                ndata[0].counts = {limit: ndata.length, count: data.totalItems};
                ndata[0].link = data.id.replace('format=json','format=html');
            })
          else
            ndata.push({
              value: request.term, // $$2 gnd??
              label: 'nichts gefunden!',
              counts: {limit: 0, count: 0},
              link: settings.lobidUrl+'?q='+encodeURIComponent(search_term)
                +'&filter='+encodeURIComponent('+(type:Person)')
            });
          response(ndata);
        }).fail(function(xhr,msg,err){
          hideLoadingBlocker();
          console.log(xhr);
        })
    },
    open: function(){
//      activeAutoCompleteTarget = $(this);
      debug('ac lobid_dnb opened',2).then(function(m){console.log(m)});
    },
    change: function (){
      this.dispatchEvent(change1);
    },
    classes: { "ui-autocomplete": "tulama-tuwsys" },
    html: true,
    delay: 10000,
    position: { my: "left top", at: "right bottom", collision: "fit" }
  },
  one4all:{
    source: function (request, response) {
      let conf = this.options.acListConfig
      debug(conf,5).then(function(m){console.log(m)});
      var query;
      var q = request.term.trim();
      if (request.term.startsWith('id=')){
        query = {
          id: request.term.substr(3),
          max_treffer: 100
        };
      } else {
        if (!!conf.sfOnly){
          let subs = request.term.match(new RegExp('\\$\\$' + conf.sfOnly + '\\s*(.*?)\\s*(\\$\\$|$)'));
          if (!!subs && (subs[1].trim() != '' || !!conf.fast)) q = subs[1].trim();
        }
        query = {
          q: q,
          max_treffer: 100
        };
        if (!!conf.all || !!conf.both){
          query.act = getMarc();
          query.act.rows = getJsonMarc(query.act.rows);
          if (!!conf.both){
            query.psv = getMarc(false);
            query.psv.rows = getJsonMarc(query.psv.rows);
          }
        }
      }
      debug({ac: 'one4all search', q: query},4).then(function(m){console.log(m)});
      showLoadingBlocker();
      jQuery.post(conf.url, query,
      function (data) {
        hideLoadingBlocker();
        response(data);
      }).fail(function(xhr,msg,err){
        hideLoadingBlocker();
        console.log(xhr);
      })
    },
    select: function(event, ui){
      if (!!ui.item.search){
        this.dataset.selectedItem = ui.item.search;
        return false;
      } else {
        this.dataset.selectedItem = ''; // false creates the string "false" which is not false
        if (ui.item.value != undefined){
          if (!!ui.item && (ui.item.sub != undefined || !!ui.item.isSub)){
            $(this).autocomplete( "option", "keepOpen", true );
            autocomplete_configs.copy_marc(ui.item,event);
            return false;
          } else {
            $(this).autocomplete( "option", "keepOpen", false );
          }
        }
      }
    },
    open: function(){
      $(this).autocomplete("widget").find('li.autocomplete_title a').on('click',function(){
        konkWin = window.open(this.href,this.target);
        return false;
      });
      activeAutoCompleteTarget = $(this);
      debug('ac opened',2).then(function(m){console.log(m)});
    },
    close: function(event, ui){
      if (!!this.dataset.selectedItem){
        $(this).autocomplete('search',this.dataset.selectedItem);
      }
      activeAutoCompleteTarget = false;
    },
    change: function (){
      this.dispatchEvent(change1);
    },
    classes: { "ui-autocomplete": "tulama-tuwsys" },
    html: true,
    delay: 10000,
    position: { my: "left top", at: "right bottom", collision: "fit" }
  }
}
