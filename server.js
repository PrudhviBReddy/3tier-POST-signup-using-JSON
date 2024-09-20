const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String,
});

let User = new mongoose.model("user", userSchema);

app.post("/signup", async (req,res)=>{
    console.log(req.body);

   try{
    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age,
        email:req.body.email,
        password:req.body.password,
        mobileNo:req.body.mobileNo,
    });

    await User.insertMany([newUser]);
    
    res.json({status:"Success", msg:"User created successfully"});
   }catch(err){
    res.json({status:"failure", msg:"Unable to create user"});
   }
});

app.listen(4567,()=>{
    console.log("Listening to port 4567");
});

let connectToMDB = async ()=>{
    try{
        mongoose.connect("mongodb+srv://prudhvireddy:prudhvireddy@prudhvib.jwu4g.mongodb.net/Players?retryWrites=true&w=majority&appName=PrudhviB")
        console.log("Successfully connected to MDB");
    }catch(err){
        console.log("Unable to connect to MDB");
    }
    };

    connectToMDB();