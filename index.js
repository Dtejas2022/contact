const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();

mongoose.connect("mongodb://atlas-sql-652f6f1ef30f77480719340c-cojzm.a.query.mongodb.net/myVirtualDatabase?ssl=true&authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bd = mongoose.connection;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {

  res.set({
    "Allow-access-Allow-Origin": "*",
});

  return res.redirect('/index.html');
});

app.post("/formFillUp", (req, res) => {
  const name = req.body.name;
  const reason = req.body.reason;
  const email = req.body.email;
  const phone = req.body.phone;
  const city = req.body.city;
  const state = req.body.state;
  const addressline = req.body.addressline;

  const data = {
    name: name,
    reason: reason,
    email: email,
    phone: phone,
    city: city,
    state: state,
    addressline: addressline,
  };

  bd.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("inserted successfully");
    res.redirect('/formSubmitted.html');
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});