// Import required modules
const express = require('express');
const router = express.Router();
const bcrypt= require('bcrypt');
const app = express()
const User = require('../models/userModel');
const Event = require('../models/eventModel');
const CreditCard = require('../models/creditcardModel');
const Notes = require('../models/notesModel');
const Subscriptions = require('../models/subscriptionModel');
const crypto = require('crypto');
const {isLoggedIn} = require('../middleware/auth');
const path = require('path');
const { utimesSync } = require('fs');

// Set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static('public'))

// Define routes and corresponding views
router.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.render('homepage');
});

router.get("/login", function(req, res) {
    res.render("login.ejs");
});

router.get("/signup", function(req, res) {
    res.render("signup.ejs");
});

router.get("/calendar", function(req, res) {
    res.render("calendar.ejs");
});

router.get("/creditcard", function(req, res) {
    res.render("creditcard.ejs");
});

router.get("/subscriptions", function(req, res) {
    res.render("subscriptions.ejs");
});

router.get("/notes", function(req, res) {
    res.render("notes.ejs");
});


// ... (similarly for other routes)

// User authentication middleware
router.get("/userpage", isLoggedIn, function(req, res) {
    // If the code reaches here, the user is authenticated
    if (req.session.user) {
        res.render('userpage.ejs', { user: req.session.user });
    } else {
        res.send("Unauthorized User");
    }
});

// Route to handle signup
router.post('/signup', async (req, res) => {
    try {
        // Extract email and password from request body
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        // Validate input
        if (email === "" || password === "") {
            return res.json({
                status: "FAILED",
                message: "Empty input fields!"
            });
        } else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            return res.json({
                status: "FAILED",
                message: "Invalid email entered"
            });
        } else if (password.length < 7) {
            return res.json({
                status: "FAILED",
                message: "Password entered is too short"
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                status: "FAILED",
                message: "User already exists"
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new User({
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Optionally, you can log the savedUser to the console for debugging purposes
        console.log('User saved to database:', savedUser);

        // Redirect or render the login page after successful signup
        res.render('login.ejs');
    } catch (error) {
        console.error(error);
        res.json({
            status: "FAILED",
            message: "An error occurred"
        });
    }
});

// Route to handle login
router.post('/login', (req, res) => {
    // Extract email and password from request body
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    // Validate input
    if (email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty Credentials"
        });
    } else {
        // Check if the user exists in the database
        User.find({ email })
            .then(data => {
                if (data.length) {
                    const hashedPassword = data[0].password;
                    // Compare hashed password with the provided password
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if (result) {
                            // If passwords match, render userpage.ejs and store user data in session
                            res.render('userpage.ejs');
                            req.session.user = {
                                id: data[0]._id,
                                email: data[0].email,
                            };
                        } else {
                            res.json({
                                status: "FAILED",
                                message: "Invalid password"
                            });
                        }
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "Error while comparing passwords"
                        });
                    });

                } else {
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials"
                    });
                }
            })
            .catch(err => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while checking for an existing user"
                });
            });
    }
});

// Route to handle logout
router.get('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
        if (err) {
            return res.json({
                status: 'FAILED',
                message: 'Logout failed',
            });
        }
        res.redirect('/');
    });
});

// Route to save event data to the database
router.post('/saveEvent', async (req, res) => {
    const { title, start, end } = req.body;

    try {
        // Save the event to the database
        const newEvent = new Event({
            title,
            start,
            end
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to delete an event from the database
router.post('/deleteEvent', async (req, res) => {
    const { title, userId } = req.body;

    try {
        // Delete the event from the database based on the user and event title
        await Event.deleteOne({ title, user: userId });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.post('/submitCC', async (req, res) => {
    try {
        let { cardNumber, cardHolder, expirationMonth, expirationYear, cvv } = req.body;

        // Validate input
        if (cardNumber === "" || cardHolder === "" || expirationMonth === "" || expirationYear === "" || cvv === "" ) {
            return res.json({
                status: "FAILED",
                message: "Empty input fields!"
            });
        } else if (cardNumber.length !== 16) {
            return res.json({
                status: "FAILED",
                message: "Enter 16 characters"
            });
        }

// Check if the credit card already exists
        const existingCC = await CreditCard.findOne({ cardNumber });

 if (existingCC) {
            return res.json({
                status: "FAILED",
                message: "Card already exists"
            });
        }

        // Create a new CreditCard instance
        const newCC = new CreditCard({
            cardNumber,
            cardHolder,
            expirationMonth,
            expirationYear,
            cvv
        });

        // Save the new credit card to the database
        const savedCC = await newCC.save();

        console.log('Credit Card saved to database:', savedCC);

        // Optionally, you can respond with a success message or redirect
        res.json({
            status: "SUCCESS",
            message: "Credit Card saved successfully"
        });

    } catch (error) {
        console.error(error);
        res.json({
            status: "FAILED",
            message: "An error occurred"
        });
    }
});

// Route to save subscription data to the database
router.post('/subscriptions', async (req, res) => {
    try {
        // Create a new Subscriptions instance
        const subscription = new Subscriptions(req.body);
        // Save the new subscription to the database
        await subscription.save();
        // Respond with a success message and the saved subscription data
        res.status(201).send(subscription);
    } catch (error) {
        // Respond with an error message if saving fails
        res.status(400).send(error);
    }
});

// Export the router to use in other parts of the application

  module.exports = router;


    
