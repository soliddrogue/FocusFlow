const express = require('express');
const router = express.Router();

const bcrypt= require('bcrypt');
const app = express()
const User = require('../models/userModel');
const Event = require('../models/calenderModel');
const {isLoggedIn} = require('../middleware/auth');
const path = require('path');


app.set('view engine', 'ejs');

app.use(express.static('public'))



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


router.get("/homepage", function(req, res) {
    res.render("homepage.ejs");
});

router.get("/index", function(req, res) {
    res.render("index.ejs");
});

router.get("/post", function(req, res) {
    res.render("Post.ejs");
});

router.get("/userpage", function(req, res) {
    res.render("userpage.ejs");
});


router.get("/subscriptions", function(req, res) {
    res.render("subscriptions.ejs");
});

router.get("/creditcards", function(req, res) {
    res.render("creditcards.ejs");
});

router.get("/*", function(req, res) {
    res.render("404.ejs");
});






router.get("/userage", isLoggedIn, function(req, res) {
    // If the code reaches here, the user is authenticated
    if (req.session.user) {
        res.render('userpage', { user: req.session.user });
    } else {
        res.send("Unauthorized User");
    }
});


router.post('/signup', (req, res) => {
    let { email, password } = req.body;
    email = email.trim(); // trim the email
    password = password.trim(); // trim the password

    if (email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        });
    } else if (password.length < 7) {
        res.json({
            status: "FAILED",
            message: "Password entered is too short"
        });
    } else {
        // check if user exists
        User.find({ email }).then(result => {
            if (result.length) {
                res.json({
                    status: "FAILED",
                    message: "User already exists"
                });
            } else {
                // try to create a new user

                // password handling
                const count = 10;
                bcrypt.hash(password, count).then(hashedPassword => {
                    const newUser = new User({
                        email,
                        password: hashedPassword
                    });
                    newUser.save().then(result => {
                    
                       
                        res.render('login.ejs');
                    })
                        .catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "An error occurred"
                            });
                        });

                });

            }

        });
    }
});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    email = email.trim(); // trim the email
    password = password.trim(); // trim the password

    if (email === "" || password === "") {
        res.json({
            status: "FAILED",
            message: "Empty Credentials"
        });
    } else {
        User.find({ email })
            .then(data => {
                if (data.length) {
                    const hashedPassword = data[0].password;
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if (result) {
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

module.exports = router;