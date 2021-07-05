var http = require("http");
const path = require("path");
var app = require("./app");

// Port

var port = process.env.PORT || "5000";
app.set("port", port);

// Creating http server and listening

var server = http.createServer(app);

server.listen(port);
