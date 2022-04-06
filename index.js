const express = require("express");
const mongoose =  require("mongoose");
const ejs = require("ejs");


// Declaration of the application
const app = express();

//Using ejs as the frobnt end template
app.set('view engine', 'ejs');

//Connect to database WhatNext
mongoose.connect("mongodb+srv://admin-ubald:Ubald1998@cluster0.iwqad.mongodb.net/WhatNext");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/test", (_req, res) =>  {
  res.status(200).send("Hello world")
})



module.exports = app;