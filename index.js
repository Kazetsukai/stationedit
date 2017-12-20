const express = require('express');
const app = express();

app.use(express.static('docs'));

app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

app.listen(3003, function () {
  console.log('Stationedit running - http://localhost:3003/');
})