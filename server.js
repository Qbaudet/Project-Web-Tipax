
const calculateFinalAmount = require('./utils');
const { addToHistory, getHistoryRecords, getCheckDetailsByFA, checkIfFAExists, checkIfIdExists, deleteCheck } = require('./services/checks.js');
const { addRestaurant, getRestaurantNames } = require('./services/restaurants.js');
const { addUser, login } = require('./services/users.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 

//Setting up the express
const express = require('express');
const {getRestaurantNameById} = require("./services/restaurants");
const app = express();


app.use(express.urlencoded({ extended: true }));


//Set port number
const port = 3000;


app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(__dirname + '/site_files'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/site_files/index.html');
  });

// Serve the history.html file
app.get('/history', (req, res) => {
    res.sendFile(__dirname + '/site_files/history.html');
});

app.get('/getRestaurantNames', async (req, res) => {
    try {
        const restaurantNames = await getRestaurantNames(); // Fetch restaurant names from the database
        res.json(restaurantNames);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching restaurant names from the database' });
    }
});

// Fetch and send the records as JSON
app.get('/history/data', async (req, res) => {
    try {
        const records = await getHistoryRecords();
        res.json(records);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching records from the database');
    }
});

// Route to validate if a check ID exists
app.get('/history/check/validate/:finalAmount', async (req, res) => {
    const finalAmount = req.params.finalAmount;
    try {
        const checkExists = await checkIfFAExists(finalAmount); // Implement this function to check if ID exists
        res.json(checkExists);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error checking if final amount exists');
    }
});

app.get('/restaurant/:id', async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await getRestaurantNameById(restaurantId);
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching restaurant data' });
    }
});



// Fetch and send the check details for a specific ID as JSON
app.get('/history/check/:finalAmount', async (req, res) => {
    const finalAmount = req.params.finalAmount;
    try {
    const checkDetails = await getCheckDetailsByFA(finalAmount);
    res.json(checkDetails);
    } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error fetching check details from the database');
    }
});

app.post('/history/check/delete/:id_check', async (req, res) => {
    const id_check = req.params.id_check;
    try {
        const deleteResult = await deleteCheck(id_check);
        res.json(deleteResult);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error deleting the check');
    }
});

app.post('/history/check/update/:id_check/:newRestaurantName', async (req, res) => {
    const id_check = req.params.id_check;
    const newRestaurantName = req.params.newRestaurantName;
    try {
        const updateResult = await updateCheck(id_check, newRestaurantName);
        res.json(updateResult);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error updating the check');
    }
});




app.post('/calculateFinalAmount', (req, res) => {
    const checkBasePrice = parseFloat(req.body.checkBasePrice);
    const taxRate = parseFloat(req.body.taxRate);
    const tipRate = parseFloat(req.body.tipRate);
    const finalAmount = calculateFinalAmount(checkBasePrice, taxRate, tipRate);
    // Send the result as JSON
    res.json({checkBasePrice, finalAmount});
});


app.post('/add-to-history', async (req, res) => {
    const { checkBasePrice, taxRate, tipRate, finalAmount, restaurantName } = req.body;
    
    const result = await addToHistory({ checkBasePrice, taxRate, tipRate, finalAmount, restaurantName });
    
    if (result.success) {
        res.status(200).json({ message: result.message, record: result.record });
    } else {
        res.status(500).json({ message: result.message });
    }
});



app.post('/add-restaurant', async (req, res) => {
    const restaurantInfo = req.body;
    try {   
        await addRestaurant({ restaurantInfo });
        // If successful, send a success response
        res.status(200).json({ success: true, message: "Your restaurant was successfully added!" });
    } catch (error) {
        // If there was an error, send an error response
        res.status(500).json({ success: false, message: "There was an error while adding your restaurant." });
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const loginResult = await login({ username, password });
        if (loginResult.success) {
            // Successful login, redirect to a dashboard or another page
            res.redirect('/');
        } else {
            // Incorrect login, send an error response
            res.status(401).json({ success: false, message: "Incorrect login" });
        }
    } catch (error) {
        // Handle other errors, e.g., database connection issues
        console.error('Error:', error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.post('/add-user', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    // Insert the user into the database using Knex
    try {
        const result = await addUser({ username, hash });
        if (result.success){
            // User added successfully, redirect to the root ("/") route
            res.redirect('/');
        } else {
            res.status(200).json({ success: false, message: "There was an error while adding your user." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.all('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});