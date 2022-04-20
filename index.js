const express = require("express");
const mongoose =  require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require('request');


// Declaration of the application
const app = express();

//Using ejs as the frobnt end template
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

//Connect to database WhatNext
mongoose.connect("mongodb+srv://admin-ubald:Ubald1998@cluster0.iwqad.mongodb.net/db_what_next");

const trackSchema = mongoose.Schema( {
  id_track: String,
  name_track: String,
  genres : [String],
  url_youtube: String,
  duration_ms: Number,
  cluster : Number
});

const artistsSchema =mongoose.Schema( {
  id_artist: String,
  name_artist :String
});

const MusicSchema = mongoose.Schema({
artists : artistsSchema,
track : trackSchema,
item :Number

});

const MusicModel = mongoose.model("music", MusicSchema, "collection_what_next");

 musics = [];
 musicsAll = [];

app.get("/", function(req, res) {

  res.render("home", {musics :musics, musicsAll :musicsAll});
});

app.get("/music", function(req, res) {
  MusicModel.find(function(err, results) {
    if (!err) {
      res.send(results);
    } else {
      console.log(err);
    }
  })
});

app.get("/ML", function(req, res) {
    request('http://127.0.0.1:5000/ML', function (error, response, body) {
      res.send(body); //Display the response on the website
      });
});

cluster = -1;
app.post("/music", function(req, res) {
const searchItem = req.body.searchItem;

if (searchItem != "") {
  MusicModel.find({ "track.id_track": searchItem  },function(err, results) {
    if (!err) {
      musics = results;
      clusterSearch = results[0].track.cluster;
      MusicModel.find({ "track.cluster": clusterSearch  },function(err, results) {
        if (!err) {
          musicsAll = results;
        } else {
          console.log(err);
        }
      })
    } else {
      console.log(err);
    }
  })

}

  res.redirect('/');
});

app.get("/test", (_req, res) =>  {
  res.status(200).send("Hello world")
})

let port = process.env.PORT;
if  ( port == null ||  port ==""){
  port = 3000;
}

app.listen(port, () =>
  console.log('App listening on port 3000!'),
);

module.exports = app;
