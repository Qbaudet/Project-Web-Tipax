const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css');
});



app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});