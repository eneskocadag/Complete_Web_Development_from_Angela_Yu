// Önce değişken tanımlanır.
const mongoose = require("mongoose");
//Veritabanı serverıyla bağlantı kurulur.
mongoose.connect("MONGO URL");

// Veritabanında kaydedilecek verilerin şeması oluşturulur
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

// Veri belgelerini saklamak için koleksiyon oluşturulur buna mongoose da model denir (mongoose otomatik olarak tekil collection adlarını cogul yapar)
const Fruit = mongoose.model("Fruit", fruitSchema);

// Veri girişi yapılmaya başlanır
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "İyi",
});

// Girilen veri modele kaydedilir.
// fruit.save();

const peopleSchema = new mongoose.Schema({
  name: { type: String, minlength: 1 },
  age: Number,
});

const People = mongoose.model("People", peopleSchema);

const ahmet = new People({
  name: "Ahmet",
  age: 32,
});
const mehmet = new People({
  age: 22,
});

People.insertMany([ahmet, mehmet], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfull");
  }
});

People.find((err, people) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    people.forEach(function (element) {
      console.log(element.name);
    });
  }
});
