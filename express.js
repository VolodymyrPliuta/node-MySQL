const express = require('express')
const port = 8900
// sourced from, https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html

let pg = require('pg');
let app = express();
let { postgresRoutes } = require('./routes/postgres.js');
let { mongoRoutes } = require('./routes/mongo.js');

app.listen(port);
console.log('app listening on port ' + port)

app.get('/', function(req,res){
  res.redirect('/mongo/check')
})
app.use('/mongo', mongoRoutes);
app.use('/postgres', postgresRoutes);

// currently implemented:
// mongo/check
// mongo/insert
// mongo/delete
//
// postgres/insert
// postgres/create
// postgres/alter
// postgres/drop
//
// not currently implemented:
//
// mongo/create
// mongo/alter
// mongo/drop
//
// postgres/delete
// postgres/check
//
// expectation for a database?
// /check
// /create
// /insert
// /delete
// /alter
// /drop
