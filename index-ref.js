var port = process.env.PORT || 8000;
var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app).listen(port);
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(express.static(__dirname + "/public"));

server.listen(port, function() {
  console.log("Listening on port " + port + "...");
});

app.post("/polly", function(req, res) {
  console.log(req.body);
  var fileName = Polly.Speak("Hello Sandeep Charan, majamachho?");
  res.send(fileName);
});
