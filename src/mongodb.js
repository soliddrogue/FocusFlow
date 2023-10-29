const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/FocusFlow")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect");

})


const LoginSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    }
})


const collection=new mongoose.model("Users", LoginSchema)


module.exports=collection