/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2021 OpenLink Software
 *
 *  This project is free software; you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License as published by the
 *  Free Software Foundation; only version 2 of the License, dated June 1991.
 *
 *  This program is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 */

class Fix_Nano {
  constructor(start_id) 
  {
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this._tokens = 0;
    this._bad_data = false;
  }


  async parse(textData) 
  {
    var output = [];

    for(var i=0; i < textData.length; i++) 
    {
      var str = await this._parse_1(textData[i]);
      if (str)
        output.push(str);
    }
    return output;
  }


  _fix_quoted_string(str)
  {
    var j = 0;
    var quote = 0;
    var out = [];

    while (j < str.length) {
        var ch = str[j++];
        if (quote == 0) {
          out.push(ch);
          if (ch === '"') 
            quote++;
        }
        else {  // in quote
          if (ch === '"') {
            quote--;
            out.push(ch);
          } else if (ch !== '\n' && ch !== '\r') {
            out.push(ch);
          }
        }
    }

    return out.join('');
  }


  async _parse_1(textData) 
  {
    var self = this;
    var _output = '';

    textData = this._fix_quoted_string(textData);

    return new Promise(function (resolve, reject) {
      try {
        var lexer = new N3.Lexer({ lineMode: false });
        var ttl_data = textData;
        var tok0;
        var tok1;

        lexer.tokenize(ttl_data, function (error, token) {
          if (token) {
            if (self._tokens == 0) {
              tok0 = token;
            } else if (self._tokens == 1) {
              tok1 = token;
            }
          }

          if (token && self._tokens ==0 &&
              !(token.type==="IRI"
                || token.type==="abbreviation"
                || token.type==="prefixed"
                || token.type==="prefix"
                || token.type==="PREFIX"
                || token.type[0]==="@"
                || token.type==="["
               )) {
            self._bad_data = true;
          }
          if (token && self._tokens ==1 &&
              !(token.type==="IRI"
                || token.type==="abbreviation"
                || token.type==="prefixed"
                || token.type==="prefix"
                || token.type==="PREFIX"
                || token.type===","
                || token.type===";"
                || token.type==="]"
               )) {
            self._bad_data = true;
          }

          if (token && self._tokens==1) {
            if ( (tok0.type === "prefixed" 
                 || tok0.type==="IRI" 
                 || tok0.type==="abbreviation"
                 )
                && 
                 (tok1.type==="," 
                 || tok1.type===";" 
                 || tok1.type==="]" 
                 || tok1.type==="PREFIX"
                 || tok1.type==="prefix"
                 )) {
              self._bad_data = true;
            }
          }

          if (self._tokens==2 && !self._bad_data) {
              _output = textData;
          }

          if (token && !error && !self._bad_data)
            self._tokens++;

          if (error || (token && token.type==="eof")) {
            self._tokens = 0;
            self._bad_data = false;
            resolve(_output);
          }
        });

      } catch (ex) {
        resolve('');
      }
    });
  }

}



class Handle_Microdata {
  constructor(make_ttl) {
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
  }

  async parse(jsonData, docURL, bnode_types) 
  {
    var self = this;
    var ret_data = null;
    var setting = new Settings();
    var uimode = await setting.getValue("ext.osds.uiterm.mode");

    try
    {
      var conv = new MicrodataJSON_Converter();
      var out_data = conv.transform(jsonData, docURL);

      if (self._make_ttl)
        ret_data = new TTL_Gen(docURL, false, bnode_types).load(out_data);
      else
        ret_data = new HTML_Gen(docURL, bnode_types, uimode).load(out_data);

      return {data:ret_data, errors:[]};
    }
    catch (ex) {
      return {data:null, errors:[ex.toString()]};
    }
  }

}


class Handle_Turtle {
  constructor(start_id, make_ttl, for_query, bnode_types, skip_docpref) 
  {
    this.baseURI = null;
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this.ns = new Namespace();
    this.ns_pref = null;
    this.ns_pref_size = 0;
    this.skip_error = true;
    this.skipped_error = [];
    this._pattern = /([0-9]*).$/gm;
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
    this.for_query = for_query;
    this.bnode_types = bnode_types || {};
    this.skip_docpref = skip_docpref;
  }

  async parse_nano(textData, docURL) {
    this.ns_pref = this.ns.get_ns_desc();
    this.ns_pref_size = this.ns.get_ns_size();
    this.skip_error = true;

    this.baseURI = docURL;
    var output = this._make_ttl ? [] : '';
    var srcData = [];

    for(var i=0; i < textData.length; i++)
    {
      try {
        var data = await this._parse_1(textData[i], docURL);
        if (this._make_ttl)
          output.push(data);
        else
          output += data;
        srcData.push(textData[i]);
      } catch(e) {
        console.log(e);
      }
    }
    return {data:output, errors: this.skipped_error, text:srcData};

  }

  async parse_nano_curly(textData, docURL) {
    this.ns_pref = this.ns.get_ns_desc();
    this.ns_pref_size = this.ns.get_ns_size();
    this.skip_error = false;

    this.baseURI = docURL;
    var output = this._make_ttl ? [] : '';
    var srcData = [];

    for(var i=0; i < textData.length; i++)
    {
      try {
        var data = await this._parse_1(textData[i], docURL);
        if (this._make_ttl)
          output.push(data);
        else
          output += data;
        srcData.push(textData[i]);
      } catch(e) {
        console.log(e);
      }
    }
    return {data:output, errors: [], text:srcData};

  }

  async parse(textData, docURL) 
  {
    this.baseURI = docURL;
    var output = this._make_ttl ? [] : '';

    for(var i=0; i < textData.length; i++)
    {
      var data = await this._parse_1(textData[i], docURL);
      if (this._make_ttl)
        output.push(data);
      else
        output += data;
    }
    return {data:output, errors: this.skipped_error};
  }

  async _parse_1(textData, docURL) 
  {
    this.baseURI = docURL;
    var self = this;
    var setting = new Settings();
    var uimode = await setting.getValue("ext.osds.uiterm.mode");

    return new Promise(function (resolve, reject) {
      try {
        var store = new N3DataConverter();
        var parser = new N3.Parser({baseIRI:self.baseURI, format:'text/n3'});
        var ttl_data = textData;

        if (self.ns_pref!==null)
          ttl_data = self.ns_pref + ttl_data;

        parser.parse(ttl_data,
          function (error, tr, prefixes) {
            if (error) {
              error = ""+error;
              error = sanitize_str(error);
              if (self.ns_pref_size>0) { // fix line in error message
                try {
                  var m = self._pattern.exec(error);
                  if (m!==null)
                    error = error.substr(0,m.index)+(parseInt(m[1])-self.ns_pref_size-1);
                } catch(e) {}
              }

              if (self.skip_error) {
                self.skipped_error.push(error);

                resolve('');
              }
              else
              {
                self.error = error;
                reject(self.error);
              }

            }
            else if (tr) {
              store.addTriple(tr.subject,
                              tr.predicate,
                              tr.object);
            }
            else {

              var triples = store.output;
              var output;

              if (self._make_ttl) {
                var ttl_data = new TTL_Gen(docURL, self.for_query, self.bnode_types, self.skip_docpref).load(triples);
                output = ttl_data==null?'':ttl_data;
              }
              else
              {
                var html_str = new HTML_Gen(docURL, self.bnode_types, uimode).load(triples, self.start_id, this._base);
                output = html_str==null?'':html_str;
              }

              if (triples!==null && triples.length!==undefined)
                self.start_id+= triples.length;

              resolve(output);
            }
          });
      } catch (ex) {
        if (self.skip_error)  {
          self.skipped_error.push(""+ex.toString());
          resolve('');
        }
        else 
          reject(ex.toString());
      }
    });
  }

}



class Handle_Quads {
  constructor(start_id, make_ttl, for_query, bnode_types, skip_docpref) 
  {
    this.baseURI = null;
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this.skip_error = true;
    this.skipped_error = [];
    this._pattern = /([0-9]*).$/gm;
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
    this.for_query = for_query;
    this.bnode_types = bnode_types || {};
    this.skip_docpref = skip_docpref;
  }

  async parse(textData, docURL) 
  {
    this.baseURI = docURL;
    var output = this._make_ttl ? [] : '';

    for(var i=0; i < textData.length; i++)
    {
      var data = await this._parse_1(textData[i], docURL);
      if (this._make_ttl)
        output = output.concat(data);
      else
        output += data;
    }
    return {data:output, errors: this.skipped_error};
  }

  async _parse_1(textData, docURL) 
  {
    this.baseURI = docURL;
    var self = this;
    var setting = new Settings();
    var uimode = await setting.getValue("ext.osds.uiterm.mode");

    return new Promise(function (resolve, reject) {
      try {
        var stores = {};
        var parser = new N3.Parser({baseIRI:self.baseURI, format:'N-Quads'});
        var ttl_data = textData;

        parser.parse(ttl_data,
          function (error, tr, prefixes) {
            if (error) {
              error = ""+error;
              error = sanitize_str(error);

              if (self.skip_error) {
                self.skipped_error.push(error);

                resolve('');
              }
              else
              {
                self.error = error;
                reject(self.error);
              }

            }
            else if (tr) {
              var id = tr.graph.id;
              if (!id)
                id = '#def#';

              var s = stores[id];
              if (!s) {
                s = new N3DataConverter();
                stores[id] = s;
              }

              s.addTriple(tr.subject,
                          tr.predicate,
                          tr.object);
            }
            else {

              var output = (self._make_ttl) ? [] : '';

              for(var id in stores) {
                var store = stores[id];
                var triples = store.output;

                if (self._make_ttl) {
                  var ttl_data = new TTL_Gen(docURL, self.for_query, self.bnode_types, self.skip_docpref).load(triples);
                  if (ttl_data)
                    output.push(ttl_data);
                }
                else {
                  var html_str = new HTML_Gen(docURL, self.bnode_types, uimode).load(triples, self.start_id, this._base);
                  if (html_str)
                    output += html_str;
                }

                if (triples!==null && triples.length!==undefined)
                  self.start_id+= triples.length;
              }

              resolve(output);
            }
          });
      } catch (ex) {
        if (self.skip_error)  {
          self.skipped_error.push(""+ex.toString());
          resolve('');
        }
        else 
          reject(ex.toString());
      }
    });
  }

}



class Handle_JSONLD {
  constructor(make_ttl) 
  {
    this.start_id = 0;
    this.skip_error = true;
    this.skipped_error = [];
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
  }


  fix_json(v)
  {
    var ret = [];
    var inStr = false;
    for(var i=0; i < v.length; i++) {
      var ch = v[i];
      if (inStr) {
        switch(ch) {
          case '"': inStr = false; break;
          case '\n': ch = '\\n'; break;
          case '\t': ch = '    '; break;
          case '\r': ch = '\\r'; break;
          case '\f': ch = '\\f'; break;
          case '\b': ch = '\\b'; break;
        }
        if (ch === '"') 
          inStr = false;
        
      } else {
        if (ch === '"')
          inStr = true;
      }
      ret.push(ch);
    }
    return ret.join('');
  }


  async parse(textData, docURL, bnode_types)
  {
    var output = this._make_ttl ? [] : '';

    for(var i=0; i < textData.length; i++)
    {
      try {
        var json_str = textData[i].trim();
        var jsonld_data = null;
        try {
          jsonld_data = JSON.parse(json_str);
        } catch (ex) {
          json_str = this.fix_json(json_str);
          jsonld_data = JSON.parse(json_str);
        }

        if (jsonld_data != null) {
          try {
            var txt = JSON.stringify(jsonld_data, null, 2);
            if (txt)
              textData[i] = txt;
          } catch (e) {}

          var _base = docURL;

          if (jsonld_data["@context"] && jsonld_data["@context"]["@base"])
            _base = jsonld_data["@context"]["@base"];
          else if (jsonld_data["@base"])
            _base = jsonld_data["@base"];

          var expanded = await jsonld.expand(jsonld_data, {base:_base});
          var nquads = await jsonld.toRDF(expanded, {base:_base, format: 'application/nquads', includeRelativeUrls: true});

          var handler = new Handle_Quads(this.start_id, this._make_ttl, false, bnode_types);
          handler.skip_error = false;
          var ret = await handler.parse([nquads], _base);
          if (ret.errors.length > 0) {
            this.skipped_error = this.skipped_error.concat(ret.errors);
          } else {
            if (this._make_ttl) {
              output = output.concat(ret.data);
            } else {
              output += ret.data;
              output += "\n\n";
            }

            this.start_id = handler.start_id;
          }
        }
      } catch (ex) {
        if (textData[i].replace(/\s/g, '').length > 1) {
          if (this.skip_error)
            this.skipped_error.push(""+ex.toString());
          else 
            throw ex;
        }
      }
    }
    return {data:output, errors: this.skipped_error};
  }

}




class Handle_RDFa {
  constructor()
  {
  }

  async parse(data, docURL, bnode_types) 
  {
    var setting = new Settings();
    var uimode = await setting.getValue("ext.osds.uiterm.mode");

    var str = new HTML_Gen(docURL, bnode_types, uimode).load(data);
    return {data:str, errors: []};
  }
}



//Convert N3 data to internal format
class N3DataConverter {
  constructor(options) 
  {
    this._LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;
    this.RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    this.RDF_TYPE   = this.RDF_PREFIX + 'type';
    this.xsdString  = 'http://www.w3.org/2001/XMLSchema#string',
    this.output = [];
  }

  _IriOrBlank(entity) {
    // A blank node or list is represented as-is
    if (entity.termType !== 'NamedNode')
      return 'id' in entity ? entity.id : '_:' + entity.value;
    // Escape special characters
    return entity.value;
  }

  addTriple(n_subj, n_pred, n_obj)
  {
    var s = null;
    var o = null;
    var subj = this._IriOrBlank(n_subj);
    var pred = this._IriOrBlank(n_pred);
    var obj = (n_obj.termType==="Literal") ? n_obj.value : this._IriOrBlank(n_obj);

    for(var i=0; i < this.output.length; i++)
      if (this.output[i].s === subj) {
        s = this.output[i];
        break;
      }

    if (s == null) {
      s = {s:subj, n: this.output.length+1};
      this.output.push(s);
    }

    if (s.props === undefined)
      s.props = new Object();
    if (s.props_obj === undefined)
      s.props_obj = new Object();

    var p = s.props[pred];
    var p_obj = s.props_obj[pred];
    if  (p === undefined) {
       s.props[pred] = [];
       s.props_obj[pred] = {};
    }

    p = s.props[pred];
    p_obj = s.props_obj[pred];

    if (!p_obj[obj])
    {
      p_obj[obj]=1;

      if (n_obj.termType==="Literal") {
        p.push({
           value:n_obj.value,
           type: (n_obj.datatypeString!==this.xsdString) ? n_obj.datatypeString : "",
           lang: n_obj.language
          });
      } else {
        p.push({iri :obj});
      }
    }
  }

}



//Convert Microdata JSON to internal format
class MicrodataJSON_Converter {
  constructor(options) 
  {
    this._LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;
    this.RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    this.RDF_TYPE   = this.RDF_PREFIX + 'type';
    this.output = [];
    this.last_Bnode = 0;
    this.baseURI;
  }

  transform(json, baseURI)
  {
    this.baseURI = baseURI;
    this.baseURL = new URL(baseURI);
    var self = this;
    var out = [];

    for(var i=0; i < json.items.length; i++)
    {
      var item = json.items[i];
      var rc = this.expand_item(item);
      out.push(rc.data);
      out = out.concat(rc.data_add);
    }

    for(var i=0; i < out.length; i++)
    {
      out[i]["n"] = i+1;
      if (!out[i].s) {
        var bnode = self.new_bnode();
        out[i]["s"] = bnode;
      }
    }

    return out;
  }

  new_bnode()
  {
    this.last_Bnode++;
    return "_:bb"+this.last_Bnode;
  }

  expand_item(item)
  {
    var self =this;
    var out = { };
    var out_add = [];
    var retVal = { id:null, data:{}, data_add:[] };
    var i_props = null;
    var props = {};
    var id_ns = null;
    var id_type = this.baseURI.toString();

    retVal.data = out;
    retVal.data_add = out_add;
    out["props"] = props;

    //try get current NS
    if (item.type!==undefined) {
      id_type = fix_url(String(item.type));
      var namespace = new Namespace();
      if ($.isArray(item.type)) {
        for(var i=0; i<item.type.length; i++) {
          var v_type = fix_url(String(item.type[i]));
          id_ns = namespace.has_known_ns(v_type);
          if (id_ns)
            break;
        }
        if (!id_ns && item.type.length > 0)
          id_type = fix_url(String(item.type[0]));
      } else {
        var v_type = fix_url(String(item.type));
        id_ns = namespace.has_known_ns(fix_url(v_type));
        id_type = v_type;
      }
    }

    $.each(item, function(key, val)
     {
       if (key==="properties") {
         i_props = val;
       }
       else if (key==="id")
       {
         var v_val = fix_url(val);
         if (v_val.indexOf(':') === -1)
           v_val = ":"+v_val;
         out["s"]=v_val;
         retVal.id = v_val;
       }
       else if (key==="type")
       {
         if ($.isArray(val)) {
           for(var i=0; i<val.length; i++) {
             var v_val = fix_url(val[i]);
             if (v_val.indexOf(':') === -1)
               val[i] = { "iri" : ":"+v_val, typeid:1};
             else
               val[i] = { "iri" : v_val, typeid:1};
           }
         }
         else {
           var v_val = fix_url(val);
           if (v_val.indexOf(':') === -1)
               val = [{ "iri" : ":"+v_val, typeid:1}];
           else
               val = [{ "iri" : v_val, typeid:1}];
         }
         props[self.RDF_TYPE] = val;
       }
       else
       {
         var v_key = fix_url(key);
         if (v_key.indexOf(':') === -1)
            v_key = ":"+v_key;

         if ($.isArray(val))
           props[v_key]=val;
         else
           props[v_key]=[val];
       }
     });

      function fix_url(v) 
      {
        if (v?.length > 1 && v.startsWith('//') && v.indexOf(':') === -1)
          return self.baseURL.protocol + v;
        else
          return v;
      }

      function expand_sub_item(parent, val)
      {
         var rc = self.expand_item(val);
         if (!rc.id) {
           var bnode = self.new_bnode();
           rc.id = bnode;
           rc.data.s = bnode;
         }
         parent.push({ "iri" : rc.id });
         out_add.push(rc.data);
         for(var i=0; i<rc.data_add.length; i++)
           out_add.push(rc.data_add[i]);
      }

      function handle_val(v_lst, val)
      {
         if (String(val).indexOf('[object Object]') === 0)
           expand_sub_item(v_lst, val);
         else if (val.substring(0,7) ==="http://")
           v_lst.push({ "iri" : val});
         else if (val.substring(0,8) ==="https://")
           v_lst.push({ "iri" : val});
         else if (val.substring(0,9) ==="nodeid://")
           v_lst.push({ "iri" : val});
         else
           v_lst.push({ "value" : val}); //??todo parse literal
/**
      else {
        var match = this._LiteralMatcher.exec(obj);
        if (!match) throw new Error('Invalid literal: ' + obj);
        p.push({
             value:match[1],
             type:match[2],
             llang:match[3]});
      }
****/
      }


    if (i_props) {
      $.each(i_props, function(key, val)
      {
        if (key.indexOf(':') === -1) {
          if (id_ns) {
            key = id_ns.link+key;
          }
          else {
            var last = id_type[id_type.length-1];
            if (last==='#' || last==='/') {
              key = id_type + key;
            } else {
              var u = new URL(fix_url(id_type));
              if (u.hash) {
                u.hash = key;
                key = u.toString();
              } else if (u.pathname === '/') {
                u.pathname = key;
                key = u.toString();
              } else {
                var lst = u.pathname.split('/');
                lst[lst.length-1] = key;
                u.pathname = lst.join('/');
                key = u.toString();
              }
            }
          }
        }

       var v = [];
/**
       if (!$.isArray(val) && String(val).indexOf('[object Object]') === 0)
       {
           expand_sub_item(v, val);
       }
       else {
         for(var i=0; i<val.length; i++) {
           if (String(val[i]).indexOf('[object Object]') === 0) //isArray lenght=1, el == Object
             expand_sub_item(v, val[i]);
           else if (val[i].substring(0,7) ==="http://")
             v.push({ "iri" : val[i]});
           else if (val[i].substring(0,8) ==="https://")
             v.push({ "iri" : val[i]});
           else
             v.push({ "value" : val[i]});
         }
       }
**/
       if ($.isArray(val))
       {
         for(var i=0; i<val.length; i++)
           handle_val(v, val[i]);
       }
       else
       {
         handle_val(v, val);
       }

       if (key!==":unnamed")
         props[key] = v;

      });
    }

    return retVal;
  }

}



class Handle_RDF_XML {
  constructor(start_id) 
  {
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this.skip_error = true;
    this.skipped_error = [];
  }

  async parse(textData, baseURL, bnode_types) 
  {
    var baseURL = new URL(baseURL);
    baseURL.search = '';
    baseURL.hash = ''

    baseURL = baseURL.href;

    var self = this;
    var output = '';

    for(var i=0; i < textData.length; i++)
    {
      try {
        var store=$rdf.graph();
        var rdf_data = textData[i];

        $rdf.parse(rdf_data, store, baseURL, 'application/rdf+xml');

        var ttl = $rdf.serialize(undefined, store, baseURL, "text/turtle");

        var handler = new Handle_Turtle(0, false, false, bnode_types);
        handler.skip_error = false;
        var ret = await handler.parse([ttl], baseURL);
        if (ret.errors.length > 0) {
          self.skipped_error = self.skipped_error.concat(ret.errors);
        } else {
          output += ret.data;
          output += "\n\n";

          self.start_id = handler.start_id;
        }

      } catch (ex) {
        if (self.skip_error)
          self.skipped_error.push(""+ex.toString());
        else 
          throw ex;
      }
    }
    return {data:output, errors: this.skipped_error};
  }

}




