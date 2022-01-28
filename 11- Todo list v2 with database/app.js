///// Hiiii
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("MONGO_URI");

const itemSchema = new mongoose.Schema({
  name: String,
});
const listSchema = new mongoose.Schema({
  listName: String,
  items: [itemSchema],
});
const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "--Kendi To Do List'inizi oluşturmaya başladınız--",
});
const item2 = new Item({
  name: "<-- Buradan öğe silebilirsiniz",
});
const item3 = new Item({
  name: "Aşağıdan yeni öğe ekleyebilirsiniz",
});
const defaultItems = [item1, item2, item3];
//      GET METHOD
app.get("/", function (req, res) {
  Item.find((err, results) => {
    if (err) console.log(err);
    else {
      if (results.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Veriler veritabanına eklendi...");
          }
        });
        res.redirect("/");
      } else res.render("list", { listTitle: "Today", newListItems: results });
    }
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, (err, results) => {
    if (!err) {
      if (results) {
        res.render("list", {
          listTitle: results.name,
          newListItems: results.items,
        });
      } else {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      }
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});
//      POST METHOD
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.post("/:postList", function (req, res) {
  const postList = req.params.postList;
  const newsItem = new postList({
    name: req.body.newItem,
  });
  newsItem.save();
  res.redirect("/" + postList);
});

app.post("/delete", (req, res) => {
  let silinecek = req.body.checkbox;
  console.log(silinecek);
  Item.findByIdAndRemove(silinecek, (err) => {
    if (err) console.log(err);
    else {
      console.log("Silindi");
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
