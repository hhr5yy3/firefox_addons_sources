importScripts("vendor/lame.all.js");

var engine = {
  "methods": {
    "blocks": [],
    "encoder": null,
    "blocksize": 1152,
    "amplitude": 32767.5,
    "channel": {
      "left": null, 
      "right": null
    },
    "subarray": {
      "left": null, 
      "right": null
    },
    "encode": function (o) {
      var e = o.data.e;
      var buffer = o.data.buffer;
      var bitrate = parseInt(o.data.bitrate);
      /*  */
      engine.methods.encoder = new lamejs.Mp3Encoder(buffer.numberOfChannels, buffer.sampleRate, bitrate);
      engine.methods.onprogress(e, buffer);
      /*  */
      var mp3buffer = engine.methods.encoder.flush();
      if (mp3buffer.length > 0) engine.methods.blocks.push(mp3buffer);
      /*  */
      postMessage({"e": e, "blocks": engine.methods.blocks});
    },
    "onprogress": function (e, buffer) {
      var L = buffer.numberOfChannels > 0;
      var R = buffer.numberOfChannels > 1;
      if (L) engine.methods.channel.left = buffer.channelData[0];
      if (R) engine.methods.channel.right = buffer.channelData[1];
      /*  */
      for (var i = 0; i < buffer.length; i += engine.methods.blocksize) {
        var ii = i + engine.methods.blocksize;
        if (L) engine.methods.subarray.left = engine.methods.channel.left.subarray(i, ii);
        if (R) engine.methods.subarray.right = engine.methods.channel.right.subarray(i, ii);
        /*  */
        if (L) {
          for (var j = 0; j < engine.methods.subarray.left.length; j++) {
            engine.methods.subarray.left[j] = engine.methods.subarray.left[j] * engine.methods.amplitude;
          }
        }
        /*  */
        if (R) {
          for (var k = 0; k < engine.methods.subarray.right.length; k++) {
            engine.methods.subarray.right[k] = engine.methods.subarray.right[k] * engine.methods.amplitude;
          }
        }
        /*  */
        var mp3buffer = [];
        if (R) mp3buffer = engine.methods.encoder.encodeBuffer(engine.methods.subarray.left, engine.methods.subarray.right);
        else if (L) mp3buffer = engine.methods.encoder.encodeBuffer(engine.methods.subarray.left);
        if (mp3buffer.length > 0) engine.methods.blocks.push(mp3buffer);
        /*  */
        var percent = Math.round((i / buffer.length) * 100) + '%';
        postMessage({"e": e, "message": " » encoding to mp3 " + percent + ", please wait..."});
      }
    }
  }
};

self.addEventListener("message", engine.methods.encode, false);
