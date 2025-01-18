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
    return this.processPlugin("flipHorizontal");
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
    return this.processPlugin("flipVertical");
});
