var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:2717/FocusFlow',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/create",(req,res)=>{

    var email = req.body.email;
    
    var password = req.body.password;

    var data = {
       
        "email" : email,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('success.ejs')

})


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.render('homepage'); // Use res.render to render the EJS template
}).listen(3000);

    app.get("/login", function(req, res){
        res.render("login.ejs")
    });
    
    app.get("/create", function(req, res){
        res.render("create.ejs")
    });
    
