// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var resList = [
 {
  "customerName": "Mr. Snarf",
  "phoneNumber": "123-4567",
  "customerEmail": "snarf@snarf.coj",
  "customerID": "Snarf"
  } 
];

var waitList = [
 {
  "customerName": "Bob",
  "phoneNumber": "971-8781",
  "customerEmail": "bob@bob.com",
  "customerID": "Bob"
  }
];

var both = [resList, waitList]

// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    if (chosen === "waitlist") {
      return res.json(waitList);
    } else {
      return res.json(resList);
    }

  }

  return [res.json(both)];

});

app.post("/api/clear", function() {

  resList = [];
  waitList = [];
  both = [resList, waitList];

  console.log()
});

app.post("/api/new", function(req, res) {

  var newReservation = req.body;

  // newReservation.customerID = newReservation.customerID.replace(/\s+/g, "").toLowerCase();
  
  console.log(newReservation);

  if (resList.length < 5) {
    
    resList.push(newReservation);

  } else {

    waitList.push(newReservation);

  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
