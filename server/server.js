// ««««««««« modules »»»»»»»»»
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// ««««««««« configuration »»»»»»»»»
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// ««««««««« routes »»»»»»»»»
app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.get('/query', function(req, res) {
  
});

// ««««««««« start app  »»»»»»»»»
app.listen(port, function() {
  console.log('Listening on port ', process.env.PORT);
});
