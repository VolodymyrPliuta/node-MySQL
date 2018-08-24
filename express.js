const express = require('express')
const port = 8900
// sourced from, https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
const MongoClient = require('mongodb').MongoClient

let pg = require('pg');
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

app.get('/postgresinsert', function(req, res){
  let name = 'King Kong';
  let coordinateArray = [
    {
      name: 'King',
      lat: 54.123456,
      lng: -89.123456
    },
    {
      name: 'Kong',
      lat: 54.123456,
      lng: -89.123456
    }
  ]
  const insertValues = coordinateArray.map(({name, lat, lng}) => {return `(DEFAULT,'${name}', ${lat}, ${lng})`}).join(',')
  const queryString = `INSERT INTO newtravel VALUES ` + insertValues;
  console.log(queryString);
  res.json(queryString)

})

app.get('/postgrescreate', function(req, res){

const queryString = `CREATE TABLE newtravel(
  ID SERIAL,
  NAME CHAR(35) NOT NULL,
  LAT FLOAT NOT NULL,
  LNG FLOAT NOT NULL);
`
  res.json(queryString)
})

app.get('/postgresdrop', function(req, res){
  const queryString = `DROP TABLE newtravel;`
  res.json(queryString)
})

app.get('/postgresalter', function(req, res){
  const queryString = ` ALTER TABLE newtravel ALTER COLUMN id`
  res.json(queryString)
})
