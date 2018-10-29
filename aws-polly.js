var AWS = require("aws-sdk");
var Speaker = require("speaker");
var Stream = require("stream");
var fs = require("fs");
var Polly = new AWS.Polly({
  region: "ap-south-1",
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

var getPlayer = function() {
  return new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
  });
};

var params = { OutputFormat: "mp3", VoiceId: "Aditi" };
var speak = function(text) {
  var name = "polly.mp3";
  params.Text = text;
  Polly.synthesizeSpeech(params, function(err, res) {
    if (err) {
      console.log("err", err);
    } else if (res && res.AudioStream instanceof Buffer) {
      var bufferStream = new Stream.PassThrough();
      bufferStream.end(res.AudioStream);
      var stream = fs.createWriteStream("./public/" + name);
      bufferStream.pipe(stream);
    }
  });
  return name;
};
module.exports = { Speak: speak };
