const express = require("express");

var app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  console.log(req.body);
  var numara1 = Number(req.body.num1);
  var numara2 = Number(req.body.num2);
  var total = numara1 + numara2;
  res.send("cevap" + total);
});

app.listen(3000, function () {
  console.log("Server is started on 3000 port");
});
