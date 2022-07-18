const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


mongoose
  .connect('mongodb://127.0.0.1:27017/Final_Full_Stack_Project')
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true,
  },
  age:{
    type:Number,
    required: true
  },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    age: req.body.age,
  });

  newUser
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  User.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  User.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.listen(9000, function () {
  console.log("server is running");
});
