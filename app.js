const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require("./routes/pages");




app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded() for parsing URL-encoded data
app.use(session({ secret: 'key000', resave: true, saveUninitialized: true }));
app.use("/", routes);


mongoose.connect('mongodb://localhost:2717/FocusFlow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

