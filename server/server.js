const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(process.env.PORT, function() {
  console.log('Listening on port ', process.env.PORT);
});