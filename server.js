const express = require('express');
const calculateFinalAmount = require('./utils');

const app = express();

const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.json());

app.use(express.static(__dirname + '/site_files'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/site_files/index.html');
  });

app.get('/history.html', (req, res) => {
    res.sendFile(__dirname + '/site_files/history.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/site_files/styles.css');
});

app.post('/calculateFinalAmount', (req, res) => {
    const checkBasePrice = parseFloat(req.body.checkBasePrice);
    const taxRate = parseFloat(req.body.taxRate);

    const finalAmount = calculateFinalAmount(checkBasePrice, taxRate, 0);//The tip rate is set to 0 as the website does not have a tip rate input
    // Send the result as JSON
    res.json({finalAmount});
});


app.all('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});