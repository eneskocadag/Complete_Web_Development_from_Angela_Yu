const express = require("express");

var app = express();

app.get("/", function (req, res) {
  res.send("<h1>Hello Bayım</h1>");
});

app.listen(3000, function () {
  console.log("Server started on 3000 port");
});

app.get("/contact", function (req, res) {
  res.send(
    "if you contact me, send a message to <em>eneskocadag5e@gmail.com</em>"
  );
});
app.get("/about", function (req, res) {
  res.send(
    "<h4><p>24 yaşına girmek üzereyim. Kocaelide ailemle birlikte yaşıyorum. İşe girme cesaretimi kırmak için bişeyler yapıyorum. Mesela bunun gibi.</p></h4>"
  );
});
