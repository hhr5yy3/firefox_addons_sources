Caman.Plugin.register("flipHorizontal", function () {
  var canvas, ctx;
  var width = this.canvas.width;
  var height = this.canvas.height;

  // Support NodeJS by checking for exports object
  if (typeof exports !== "undefined" && exports !== null) {
    canvas = new Canvas(width, height);
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  }

  ctx = canvas.getContext('2d');
  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(this.canvas, 0, 0);

  canvas.id = this.canvas.id;
  canvas.style.display = this.canvas.style.display;
  this.replaceCanvas(canvas);
  return this;
});

Caman.Filter.register("flipHorizontal", function () {
  // Here we call processPlugin so CamanJS knows how to handle it
  this.processPlugin("flipHorizontal");
});

Caman.Plugin.register("flipVertical", function () {
  var canvas, ctx;
  var width = this.canvas.width;
  var height = this.canvas.height;

  // Support NodeJS by checking for exports object
  if (typeof exports !== "undefined" && exports !== null) {
    canvas = new Canvas(width, height);
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  }

  ctx = canvas.getContext('2d');
  ctx.translate(0, height);
  ctx.scale(1, -1);
  ctx.drawImage(this.canvas, 0, 0);
  canvas.id = this.canvas.id;
  canvas.style.display = this.canvas.style.display;
  this.replaceCanvas(canvas);
  return this;
});

Caman.Filter.register("flipVertical", function () {
  // Here we call processPlugin so CamanJS knows how to handle it
  this.processPlugin("flipVertical");
});

Caman.Plugin.register("resize", function (width, height) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  // Set the new canvas dimensions
  canvas.width = width;
  canvas.height = height;

  // Draw the image onto the resized canvas
  ctx.drawImage(this.canvas, 0, 0, width, height);
  canvas.id = this.canvas.id;
  canvas.style.display = this.canvas.style.display;

  // Replace the current canvas with the resized canvas
  this.replaceCanvas(canvas);
  return this;
});

Caman.Filter.register("resize", function (width, height) {
  // Here we call processPlugin with the width and height
  this.processPlugin("resize", [width, height]);
});



Caman.Plugin.register("reset", function (resetCanvas) {
  resetCanvas.id = this.canvas.id;
  resetCanvas.style.display = this.canvas.style.display;

  // Replace the current canvas with the reset canvas
  this.replaceCanvas(resetCanvas);
  return this;
});

Caman.Filter.register("reset", function (resetCanvas) {
  this.processPlugin("reset", [resetCanvas]);
});

Caman.Plugin.register("crop", function (cropCanvas) {
  cropCanvas.id = this.canvas.id;
  cropCanvas.style.display = this.canvas.style.display;

  // Replace the current canvas with the reset canvas
  this.replaceCanvas(cropCanvas);
  return this;
});

Caman.Filter.register("crop", function (cropCanvas) {

  this.processPlugin("crop", [cropCanvas]);
});

Caman.Plugin.register("reInitializeCanvas", function () {
  var canvas, ctx;
  var width = this.canvas.width;
  var height = this.canvas.height;

  // Support NodeJS by checking for exports object
  if (typeof exports !== "undefined" && exports !== null) {
    canvas = new Canvas(width, height);
  } else {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
  }

  ctx = canvas.getContext('2d');
  ctx.drawImage(this.canvas, 0, 0);
  canvas.id = this.canvas.id;
  canvas.style.display = this.canvas.style.display;
  this.replaceCanvas(canvas);
  return this;
});

Caman.Filter.register("reInitializeCanvas", function () {
  // Here we call processPlugin so CamanJS knows how to handle it
  this.processPlugin("reInitializeCanvas");
});