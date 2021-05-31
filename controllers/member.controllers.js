const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Member = require("../models/Member");

exports.GetMemberCard = async (req,res) =>{
    try {
        
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const mymember = await Member.find({memberid:{$eq:[decoded.id,user.name]}})
        res.status(200).send({msg:"Access granted", membership: mymember});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load membership"}]});
    }
}

exports.GetMemberDash = async (req,res) =>{
    try {
        const {dashid} = req.body;
        console.log(dashid)
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const isMember = await Member.find({dashid:{$eq:dashid},memberid:{$eq:[decoded.id,user.name]}})
        if(!isMember){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const allmembers = await Member.find({dashid:{$eq:dashid}})
        res.status(200).send({msg:"Access granted", membership: allmembers});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load membership"}]});
    }
}