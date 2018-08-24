const express = require('express')
const port = 8900
// sourced from, https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
const MongoClient = require('mongodb').MongoClient

let app = express();

app.listen(port);
console.log('app listening on port ' + port)

app.get('/', function(req,res){

  MongoClient.connect("mongodb://localhost:27017/travel", function(err, db) {
    console.log('connected successfully to server')
    db.collection('newtravel').aggregate([ ]).toArray()
      .then(result => {
        db.close();
        res.json(result)
      })
  });
})

app.get('/insert', function(req,res){
  MongoClient.connect("mongodb://localhost:27017/travel", function(err, db) {
    console.log('connected successfully to server')
    let name = 'King Kong';
    let lat = 54.123456;
    let lng = -89.123456;
    db.collection('newtravel').insert({ name,lat, lng })
  });
})

// db.newtravel.insert({ name:'Jurasic Park',lat: 25.745555, lng: -80.123456 })
// db.collection('newtravel').insert({ name:'Jurasic Park',lat: 25.745555, lng: -80.123456 })
