let app = require('express').Router();

app.get('/insert', function(req, res){
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

app.get('/create', function(req, res){

const queryString = `CREATE TABLE newtravel(
  ID SERIAL,
  NAME CHAR(35) NOT NULL,
  LAT FLOAT NOT NULL,
  LNG FLOAT NOT NULL);
`
  res.json(queryString)
})

app.get('/drop', function(req, res){
  const queryString = `DROP TABLE newtravel;`
  res.json(queryString)
})

app.get('/alter', function(req, res){
  const queryString = ` ALTER TABLE newtravel ALTER COLUMN id`
  res.json(queryString)
})

module.exports = { postgresRoutes: app }
