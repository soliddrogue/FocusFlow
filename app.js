const express = require("express")
const bodyParser = require("body-parser")
//user model

//password handler
const bcrypt= require('bcrypt');
const app = express()

const mongoose = require('mongoose');
const Schema = mongoose.Schema;




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



const userSchema = new Schema({
    email: String,
    password: String
});



const User = mongoose.model('User', userSchema);


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.render('homepage'); // Use res.render to render the EJS template
}).listen(3000);

    app.get("/login",function(req, res){
        res.render("login.ejs")
    });
    
    app.get("/signup", function(req, res){
        res.render("signup.ejs")
    });

    app.get("/UserPage", function(req, res){
        res.render("UserPage.ejs", {email:email})
    });
    
    app.get("/calender", function(req, res){
        res.render("calender.ejs")
    });
    
    app.get("/calenderevent", function(req, res){
        res.render("calenderevent.php")
    });
    
app.post('/signup', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();//trims white spaces
    if (email == "" || password == "") {
    res.json({
    status: "FAILED",
    message: "Empty input fields!"
    });
    
}else if(!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)){
    res.json({
        status:"FAILED",
        message: "Invalid name entered"
        }) 
}else if(password.length < 7){
    res.json({
        status:"FAILED",
        message: "Invalid name entered"
        })  
}else{
    User.find({email}).then(result => {
if(result.length){
res.json({
    status:"Failed",
    mssage:"User already exists"
})
}else{
        //try to create new user

        //password handling
        const count = 10;
        bcrypt.hash(password, count).then(hashedPassword =>{
            const newUser =  new User({
                email,
                password:hashedPassword
            });
            newUser.save().then(result=>{
                res.json({
                    status:"Success",
                    message:" Signup Successful",
                    data:result
                })
            })
            .catch(err=>{
                res.json({
                    status:"failed",
                    message:"An err occured while saving user"
            })
        })

    })
        .catch(err =>{
            res.json({
                status:"failed",
                message:"An err occured while hashing password"
            })
        })
    }

    }).catch(err =>{
        console.log(err);
        res.json({
            status:"Failed",
            message:"An error has ocured while checking for existing users"
        })
    })
}})

app.post('/login', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if(email=="" ||  password == ""){
        res.json({
            status:"Failed",
            message:"An error has ocured while checking for existing users" 
        })
    }else{
        User.find({email})
        .then(data =>{
            if(data.length){
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result =>{
                    if(result){
                        res.json({
                            status:"Failed",
                            message:"sign in successful",
                            data:data
                        })
                    }else{
                        res.json({
                            status:"Failed",
                            message:"invalid password"
                            
                    })
                    .catch(err =>{
                        res.json({
                            status:"Failed",
                            message:"error while comparing passwords"
                            
                    })

                    })
                    
                }
            })
        }else{
            res.json({
                status:"Failed",
                message:"invalid credntials"
            })
        }
    })
    .catch(err=>{
        res.json({
            status:"Failed",
            message:"An error occured while checking for existing user"
            
    })
})
    }
})