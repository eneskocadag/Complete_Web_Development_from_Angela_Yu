const { urlencoded } = require("express");
const express = require("express");

const app = express();
app.use(urlencoded({ extended: true }));

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  var boy = Number(req.body.height);
  var kilo = Number(req.body.weight);
  var bmi = 10000 * (kilo / Math.pow(boy, 2));
  res.send("<h1>Your BMI is </h1>" + bmi.toFixed(2));
});

app.listen(3000, () => {
  console.log("Server started for 3000 port");
});
