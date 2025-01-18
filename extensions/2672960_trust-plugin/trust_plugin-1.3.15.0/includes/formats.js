class Module {
     constructor( type, version ) {
          this.type = type;
          this.version = version;
     }
};

class FileInfo {
     constructor( content, path, contentEncoding, id, name, contentFormat ) {
          this.content = content;
          this.path = path;

          this.id = id || "";
          this.name = name || "";

          this.contentEncoding = contentEncoding || "";
          this.contentFormat = contentFormat || "";
     }
};

class Method {
     constructor( type, data, result ) {
          this.type = type;
          this.data = data;
          this.result = result || "";
     }
};

class Format {
     constructor( type, version, category ) {
          this.type = type;
          this.version = version;
          this.category = category;
     }
};

class Content {
     constructor( type, charset, transferEncoding ) {
          this.type = type;
          this.charset = charset;
          this.transferEncoding = transferEncoding;
     }
};

class Route {
     constructor( node, time, transfer = "" )  {
          this.node = node;
          this.time = time;
          this.transfer = transfer;
     }
};

class Meta {
     constructor( format, content ) {
          this.format = format;
          this.content = content;
          this.routes = [];
          this.userAgent = window.navigator.userAgent;
          this.chunk = "";
          this.chunks = "";
     }
};

class Dependency {
     constructor( type, version  ) {
          this.type = type;
          this.version = version;
     }
};

class Config {
     constructor() {
          this.type = "";
          this.description = "";
          this.state = "";

          this.format = new Format("", "", "");

          this.dependencies = [];
          this.methods = [];
     }
};

class NameInfo {
     constructor() {
          this.name ="";
          this.lastName ="";
          this.firstAndMiddleName ="";
          this.email ="";
          this.snils ="";
          this.companyName ="";
          this.organizationName ="";
          this.inn ="";
          this.kpp ="";
          this.ogrn ="";
          this.ogrnip ="";
          this.post ="";
          this.street ="";
          this.region ="";
          this.city ="";
          this.country ="";
     }
};

class Message {
     constructor( owner, module, func, data, result, mode ) {

          this.id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c ) {
               var r = Math.random() * 16 | 0, v = c == "x" ? r : ( r & 0x3 | 0x8 );
               return v.toString(16);
          } );

          this.node = "";
          this.error = "";

          this.mode = mode || "";

          this.module = new Module( module, "0.0.0.0" );
          this.method = new Method( func, data, result );

          this.meta = new Meta (
               new Format("message", "0.0.0.0", "trust.plugin"),
               new Content( "application/json", "utf8", "" )
          );

          this.meta.routes.push( new Route( owner, new Date().toLocaleString() ) );
     }
};
