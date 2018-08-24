const express = require('express')
const port = 8900
// sourced from, https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
const MongoClient = require('mongodb').MongoClient

let app = express();
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

app.listen(port);
console.log('app listening on port ' + port)
