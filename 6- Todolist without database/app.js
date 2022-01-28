const express = require("express");
let items = ["Malzeme al", "Yemek pişir", "Yemek ye"];
let worklist = [];
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const d = new Date();
  const options = { weekday: "long", day: "2-digit", month: "long" };
  const day = d.toLocaleString("tr-TR", options);
  res.render("list", { headerTitle: day, todolar: items });
});

app.get("/:route", (req, res) => {
  console.log(req.params.route);
});

app.post("/", (req, res) => {
  let gelenVeri = req.body.veri;
  let button = req.body.button;
  // if (gelenVeri !== "") {
  //   items.push(gelenVeri);
  // }
  if (button === "Work List") {
    if (gelenVeri !== "") {
      worklist.push(gelenVeri);
      res.redirect("/work");
    } else res.redirect("/work");
  } else {
    if (gelenVeri !== "") {
      items.push(gelenVeri);
      res.redirect("/");
    } else res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server started on 3000 port");
});
