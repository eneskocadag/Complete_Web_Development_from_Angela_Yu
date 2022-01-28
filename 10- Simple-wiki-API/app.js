const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

// app.get("/articles", (req, res) => {
//   Article.find((err, results) => {
//     if (!err) {
//       res.send(results);
//     } else res.send(err);
//   });
// });
// app.post("/articles", (req, res) => {
//   const newContent = new Article({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   newContent.save();
// });

// app.delete("/articles", (req, res) => {
//   Article.deleteMany((err) => {
//     if (!err) res.send("Veriler silindi");
//     else res.send(err);
//   });
// });
// requestlerdeki yolları her request türü için tekrar tekrar yazmak yerine tek yol için rotaları yazarak kolaylık saglamak
app
  .route("/articles")
  .get((req, res) => {
    Article.find((err, results) => {
      if (!err) {
        res.send(results);
      } else res.send(err);
    });
  })
  .post((req, res) => {
    const newContent = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newContent.save();
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) res.send("Veriler silindi");
      else res.send(err);
    });
  });
////////////////// Başka
app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, results) => {
      if (results) res.send(results);
      else res.send("Bulamadım");
    });
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (!err) res.send("Silindi");
      else res.send("Hata oluştu");
    });
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body },
      (err) => {
        if (err) res.send(err);
        else res.send("Herhalde updatelendi");
      }
    );
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      (err) => {
        if (err) res.send(err);
        else res.send("Herhalde putlendi");
      }
    );
  });
app.listen(3000, () => {
  console.log("Server started on 3000 port...");
});
