const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  const ad = req.body.first_name;
  const soyad = req.body.last_name;
  const mail = req.body.email;
  console.log("Ad:" + ad + "\tSoyad:" + soyad + "\tMail:" + mail);
  // Bültene üye işlemi
  const data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: ad,
          LNAME: soyad,
        },
      },
    ],
  };

  const url = "Mail-chimp URI";
  const options = {
    method: "POST",
    auth: "",
  };
  const dataJson = JSON.stringify(data);
  const request = https.request(url, options, (response) => {
    response.statusCode === 200
      ? res.sendFile(__dirname + "/success.html")
      : res.sendFile(__dirname + "/failure.html");
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(dataJson);
  request.end();
});
app.post("/failure.html", (req, res) => {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on 3000 port.");
});
