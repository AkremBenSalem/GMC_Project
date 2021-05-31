const jwt = require("jsonwebtoken");
const Dashboard = require("../models/Dashboard");

const User = require("../models/User");
const Member = require("../models/Member");
const Notif = require("../models/Notif");
const Task = require("../models/Task");


function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


exports.DashCreate= async (req,res) =>{
    try {
        const {title}=req.body;

        if(!title){
            return res.status(400).send({errors: [{msg : "every dashboard should have a title"}]});
        }
        //token creator verification
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        //new Dashboard
        const newDash = new Dashboard({title:title,creator:user._id, members:[]});
        //save
        await newDash.save();
        //affect dashboard ownership to user
        await User.findOne({
            _id: user._id,  // search query
          },function (error, theuser) {
            try {
                theuser.ownedDash.push(newDash._id)//affect the dash id to user owned dashes
                theuser.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to save dashboard"}]})
            }
        })
        //create new member
        const newMember = new Member({dashid:[newDash._id,title],memberid:[decoded.id,user.name] , state:"JOINED" , role:"Owner"});
        await newMember.save();
        //res
        res.status(200).send({msg:"new dashboard added", dashboard: newDash})
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to save dashboard"}]})
    }    
}

exports.DashLoad = async (req,res) => {
    try {
        const {dashID} = req.body;
        //token verification
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const dash = await Dashboard.findOne({_id:dashID})
        if(!dash){
            return res.status(401).send({errors : [{msg : "you are not authorized (owner)"}] });
        }
        res.status(200).send({msg:"Access granted", dashboard: dash})
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load dashoard"}]});
    }
}

exports.DashMemberAdd= async (req,res) =>{
    try {
        const token= req.headers["authorization"];
        const {email,dashID}=req.body;
        
        if(!email){
            return res.status(400).send({errors: [{msg : "bad request (member)"}]});
        }
        if(!dashID){
            return res.status(400).send({errors: [{msg : "bad request (dash)"}]});
        }
        
        //token creator verification
        
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findOne({_id:decoded.id}).select("-password");   
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const validUser = await User.findOne({email:email}).select("-password");   
        if(!validUser){
            return res.status(401).send({errors : [{msg : "ID not valid"}] });
        }
        //check if the request is asking for a valid id and the one sending it is the owner
        const dash = await Dashboard.findOne({_id:dashID, creator:decoded.id})
        if(!dash){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        //check if member allready exists
        const exisits = await Member.findOne({dashid:[dashID,dash.title], memberid:[validUser._id,validUser.name]})
        if(exisits){
            return res.status(401).send({errors : [{msg : "member exists"}] });
        }
        //create new member
        const newMember = new Member({dashid:[dashID,dash.title],memberid:[validUser._id,validUser.name] , state:"PENDING" , role:"Member"});
        await newMember.save();

        //edit Dashboard
        const updated = await Dashboard.findOne({
            _id:dashID  // search query
          },function (error, thedash) {
            try {
                thedash.members.push(newMember._id)//add member to member list
                thedash.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to save dashboard (dash find)"}]})
            }
        })
        //send notification (request) to user
        var d = new Date();
        const newNotif = new Notif({notifType:"JOIN_REQ",notifSender:[decoded.id,user.name],notifState:"UNOPENED",notifBody:[dashID,dash.title],date:d.getTime()});
        await newNotif.save();
        const added = await User.findOne({
            _id: validUser._id,  // search query
          },function (error, theuser) {
            try {
                theuser.alerts.push(newNotif._id)
                theuser.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to save dashboard (User find)"}]})
            }
        }).select("-password");
        //token
        //res
        
        res.status(200).send({msg:"member added to dashboard", dashboard: updated, notif:added})
    } catch (error) {
        console.log(error)
        res.status(500).send({errors: [{msg : "failed to save dashboard (fatal)"}]})
    }    
}

exports.DashMemberRemove = async (req,res) => {
    try {
        const {memberID,dashID}=req.body;
        
        if(!memberID){
            return res.status(400).send({errors: [{msg : "bad request (member)"}]});
        }
        if(!dashID){
            return res.status(400).send({errors: [{msg : "bad request (dash)"}]});
        }
        //check if dash id is valid
        const dashvalid = await Dashboard.findOne({_id:dashID})
        if(!dashvalid){
            return res.status(400).send({errors: [{msg : "bad request (dash not found)"}]});
        }
        //token creator verification
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        //check if member exists
        const exisits = await Member.findOne({dashid:dashID, memberid:memberID})
        if(!exisits){
            return res.status(401).send({errors : [{msg : "member or dashboard does not exisit"}] });
        }
        //check if the request is asking for a valid id and the one sending it is the owner
        const dashOwner = await Dashboard.findOne({_id:dashID, creator:decoded.id})
        if(!dashOwner){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const dashmember = await Member.findOne({dashid:dashID, memberid:memberID})
        
        if(!dashmember){
            return res.status(401).send({errors : [{msg : "member does not exist"}] });
        }
        const theMember = await User.findOne({_id:memberID}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        //remove Tasks
        await Task.deleteMany({dashid:{$eq:[dashID,dashvalid.title]},workerid:{$eq:[memberID,theMember.name]}}, function (err, docs) {
            if (err){
                console.error(err)
            }
            else{
                console.log("Removed User : ", docs);
            }
        });
        //remove member from dash member list
        const dash = await Dashboard.findOne({
            _id:dashID  // search query
          },function (error, thedash) {
            try {
                thedash.members= removeA(thedash.members, dashmember._id) 
                //remove member from member list
                thedash.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to remove member from dashboard (dash find)"}]})
            }
        })
        //remove member card
        await Member.deleteOne({_id:dashmember._id}, function (err, docs) {
        });
        const dashupdate = await Dashboard.findOne({_id:dashID})
        res.status(200).send({msg:"member removed from dashboard", dashboard: dashupdate})
        
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to remove member from dashboard (Fatal)"}]})
    }
}

exports.LeaveDash = async (req,res) => {
    try {
        const {dashID}=req.body;
        
        if(!dashID){
            return res.status(400).send({errors: [{msg : "bad request (dash)"}]});
        }
        //check if dash id is valid
        const dashvalid = await Dashboard.findOne({_id:dashID})
        if(!dashvalid){
            return res.status(400).send({errors: [{msg : "bad request (dash not found)"}]});
        }
        //token verification
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        //check if member exists
        const exisits = await Member.findOne({dashid:dashID, memberid:decoded.id})
        if(!exisits){
            return res.status(401).send({errors : [{msg : "you are not a member of this dashboard"}] });
        }
        //check if the request is asking for a valid id and the one sending it is the owner
        const dashOwner = await Dashboard.findOne({_id:dashID, creator:decoded.id})
        if(dashOwner){
            return res.status(401).send({errors : [{msg : "you can't leave a dashboard you created"}] });
        }
        const dashmember = await Member.findOne({dashid:dashID, memberid:decoded.id})
        if(!dashmember){
            return res.status(401).send({errors : [{msg : "member does not exist"}] });
        }
        //remove Tasks
        await Task.deleteMany({dashid:{$eq:[dashID,dashvalid.title]},workerid:{$eq:[user._id,user.name]}}, function (err, docs) {
            if (err){
                console.error(err)
            }
            else{
                console.log("Removed User : ", docs);
            }
        });
        //remove member from dash member list
        const dash = await Dashboard.findOne({
            _id:dashID  // search query
          },function (error, thedash) {
            try {
                thedash.members= removeA(thedash.members, dashmember._id)
                thedash.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to remove member from dashboard (dash find)"}]})
            }
        })
        //remove member doc
        await Member.deleteOne({_id:dashmember._id}, function (err, docs) {
        });
        res.status(200).send({msg:"member removed from dashboard", dashboard: dash})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({errors: [{msg : "failed to remove member from dashboard (Fatal)"}]})
    }
}

exports.DeleteDashboard = async (req,res) => {
    try {
        const {dashID} = req.body;
        //token verification
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const dash = await Dashboard.findOne({_id:dashID, creator:decoded.id})
        if(!dash){
            return res.status(401).send({errors : [{msg : "you are not authorized (owner)"}] });
        }
        //remove dashboard from owner
        await User.findOne({
            _id:decoded.id  // search query
          },function (error, theowner) {
            try {
                let removeIndex = theowner.ownedDash.indexOf(dashID);
                console.log(removeIndex)
                console.log(theowner.ownedDash)
                if(removeIndex === -1){
                    return res.status(401).send({errors : [{msg : "error association dashboard with owner"}] });
                }
                
                theowner.ownedDash.splice(removeIndex,1)//remove dashboard from owned list
                theowner.save()
                }  
            catch (error) {
                res.status(500).send({errors: [{msg : "failed to remove dashboard from creator"}]})
            }
        });
        console.log("removed from owner")
        //remove Tasks
        await Task.deleteMany({dashid:{$eq:[dashID,dash.title]}}, function (err, docs) {
            if (err){
                console.error(err)
            }
            else{
                console.log("Removed User : ", docs);
            }
        });
        //remove member doc
        await Member.deleteMany({dashid:{$eq:dashID}}, function (err, docs) {
            if (err){
                console.error(err)
            }
            else{
                console.log("Removed User : ", docs);
            }
        });
        //remove the dashboard
        await Dashboard.findByIdAndRemove(dashID, function (error) {
            try {
                
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to delete dashboard"}]});  
            }
            
        });
        res.status(200).send({msg:"dash removed"})
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load dashoard"}]});
    }
}