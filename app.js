const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/mongooseCollectiondb");

const Planet = require("./models/planet.js");

mongoose.connection.on("open", function() {
  console.log("mongodb is connected!!");
});


let newPlanet = new Planet({ name: "Venus", inhabitable: false, diameter: 1 });

newPlanet
  .save()
  .then(function() {
    //
    console.log("a planet has been added to the database");
  })
  .catch(function() {
    //  error mitigation
    console.log("Venus Create Didnt work");
  });

Planet.create({ name: "Mercury" })
  .then(function(newPlanet) {
    console.log("planet CREATed");
    console.log(newPlanet);
  })
  .catch(function() {
    console.log("Mercury Creat didnt work");
  });

Planet.findOne({ name: "Earth" })
  .then(function(result) {
    console.log("Here's what gets queried");
    console.log(result);
  })
  .catch(function() {
    console.log("It didnt work");
  });

//items to update

Planet.updateOne(
  { name: "Mars" },
  {
    $push: {
      orbit: {
        period: 687.0,
        velocity: 24.1,
        eccentricity: 0.094
      }
    }
  }
).catch(function(error, affected, resp) {
  // it wont work without this catch!!
  console.log(error);
});

//finds all
Planet.find().then(function(users) {
  console.log(users);
});

app.get("/", function(req, res) {
  //req.body.params
  res.render("index", { add: true });
});

app.post("/", function(req, res) {
  let newName = req.body.name;
  let newInhab = req.body.inhabitable;
  let newDiam = req.body.diameter;

  console.log("New name is: " + newName);
  console.log("New inhab is: " + newInhab);
  console.log("New new diameter is: " + newDiam);

  Planet.create({ name: newName, inhabitable: newInhab, diamter: newDiam })
    .then(function() {
      console.log("planet added to document");
      res.redirect("/");
    })
    .catch(function() {
      console.log("It didn't work for some reason");
    });
});

// create new planet entry ***********

// Planet.create({name: "Mercury", inhabitable: false}).then(function(){
//   console.log("planet added to document");
// }).catch(function(){
//   console.log("It didn't work for some reason");
// })

// update planet entry ***********
/*
Planet.updateOne({name: "Venus"}, {inhabitable: true}).then(function(){
  console.log('planet edited maybe?');
}).catch(function(error, affected, resp){
  console.log(error);
});
*/

//delete planet entry ************
/*
Planet.deleteOne({name: "Mercury"}).then(function(){
  console.log('planet deleted maybe?');
}).catch(function(error, affected, resp){
  console.log(error);
})
*/

app.listen("3000", function(req, res) {
  console.log("You're connected!");
});
