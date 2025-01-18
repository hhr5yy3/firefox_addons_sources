if (!Blob.prototype.arrayBuffer) {
    Blob.prototype.arrayBuffer = function () {
        return new Response(this).arrayBuffer();
    };
}
export {};
