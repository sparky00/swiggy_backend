const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async(req, res)=>{
const{userName, email, password} = req.body;
try {
   const existingUser = await User.findOne({email});
   if(existingUser) return res.status(400)
    .json({message:"User already exist"});

   const hashedPassword = await bcrypt.hash(password, 12)

   const newUser = await User.create({userName, email, password:hashedPassword});
// const newUser = await User.create({userName:"Harshit", email:"harshit@gmail.com", password:"123456"});
   res.status(201).json({message:"User created successfully.", statusCode: 200});

} catch (error) {
    res.status(500)
    .json({message:"Something went wrong."})
}  
};

const login =async(req,res)=>{
    const{email, password} = req.body;

    try {
        const user = await User.findOne({email});
        console.log("User:",user)
        if(!user) return res.status(404).json({message:"User not found!"})
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Password Incorrect"});
    
        const token = jwt.sign({email:user.email, id:user._id}, process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({data: user, token});
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }

   
}


module.exports = {register, login};
