var express = require("express");
var app = express();
app.use(express.static("public"));
app.listen(4040);
console.log("Webserver unter http://localhost:" + 4040);
