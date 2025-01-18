var config = {};

config.args = {"win": [''], "mac": [''], "linux": ['']};
config.temporarily = {"id": null, "url": null, "args": []};
config.platform = {"mac": '', "linux": '', "win": "C:\\Program Files (x86)\\Adobe\\Acrobat Reader DC\\Reader\\AcroRd32.exe"};

config.browser = {
  "default": '',
  set args (val) {app.storage.write("browser-args", val)},
  set path (val) {app.storage.write("browser-path", val)},
  set clear (val) {app.storage.write("browser-clear", val)},
  get path () {return app.storage.read("browser-path") || config.browser.default},
  get args () {return app.storage.read("browser-args") !== undefined ? app.storage.read("browser-args") : ['']},
  get clear () {return app.storage.read("browser-clear") !== undefined ? app.storage.read("browser-clear") : true}
};
