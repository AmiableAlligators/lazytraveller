const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/public'));


// ««««««««« start app  »»»»»»»»»
app.listen(port, function() {
  console.log('Listening on port ', port);
});
