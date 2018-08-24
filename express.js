const express = require('express')
const port = 8900

let app = express();
app.get('/', function(req,res){
  res.json('hello world')
})

app.listen(port);
console.log('app listening on port ' + port)
