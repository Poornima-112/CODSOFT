const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const fs = require("fs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/static', express.static('static'));

// Set view engine and views directory
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Handle GET requests to the home page
app.get('/', (req, res) => {
    res.status(200).render('index');
});

// Handle POST requests to /submit-form
app.post('/submit-form', (req, res) => {
    const { name, age, profession } = req.body;
    let outputToWrite = `The name of client is ${name}, ${age}, ${profession}`;
    
    fs.writeFileSync('output.txt', outputToWrite); // Write form data to a file

    console.log(req.body); // Log form data to the console

    // Render the index page with a success message
    const params = { message: 'Your form has been submitted successfully' };
    res.status(200).render('index', params);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
