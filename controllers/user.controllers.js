const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt =require("jsonwebtoken")

exports.Register= async(req,res)=>{
    try {
        //test for email
        const {email,password}=req.body;
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(400).send({errors: [{msg : "Email should be unique"}]});
        }
        //new user
        const newUser = new User({...req.body});
        //hash function
        const hashedpassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedpassword;
        //save
        await newUser.save();
        //token
        const token = jwt.sign({
            id: newUser._id
          }, process.env.SECRET_KEY, 
          { expiresIn: '3h' }
        );
        //res
        res.status(200).send({msg:"new user added", user: newUser, token})
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to save user"}]})
    }    
}

exports.Login = async(req,res) => {
    try {
        const {email, password} = req.body;
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(400).send({errors: [{msg : "bad login credentials"}]});    
        }
        const comparePw = await bcrypt.compare(password,findUser.password);
        if(!comparePw){
            return res.status(400).send({errors: [{msg : "bad login credentials"}]});    
        }
        //token
        const token = jwt.sign({
            id: findUser._id
          }, process.env.SECRET_KEY, 
          { expiresIn: '3h' }
        );
        res.status(200).send({msg:"login successful",user:findUser,token})
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to login"}]})
    }
}


exports.GetUserFromId = async(req,res) => {
    try {
        
        const {userID} = req.body;
        console.log(userID)
        const findUser = await User.findOne({_id:userID}).select("-password");
        if(!findUser){
            return res.status(400).send({errors: [{msg : "No user matches the ID"}]});    
        }
        res.status(200).send({msg:"userFound",user:findUser});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed while getting user (Fatal)"}]})
    }
}

