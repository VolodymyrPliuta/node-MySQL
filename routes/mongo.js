

  let app = require('express').Router();
  const MongoClient = require('mongodb').MongoClient

  app.get('/check', function(req,res){
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
      res.json('record added')
    });
  })
  // db.newtravel.insert({ name:'Jurasic Park',lat: 25.745555, lng: -80.123456 })
  // db.collection('newtravel').insert({ name:'Jurasic Park',lat: 25.745555, lng: -80.123456 })

  app.get('/delete', function (req, res) {
    MongoClient.connect("mongodb://localhost:27017/travel", function (err, db) {
      console.log('connected successfully to server')
      let count = 1
      removeSingleRecord(db, count)
      res.json('record removed')
    });
  })
  function removeSingleRecord(db, count){
    db.collection('newtravel').aggregate([ { $skip: count}, { $limit: 1} ]).toArray()
    .then((result) => { db.collection('newtravel').remove(result[0]) })
  }

module.exports = { mongoRoutes: app }
