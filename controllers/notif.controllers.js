const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Member = require("../models/Member");
const Notif = require("../models/Notif");

//Global functions
const deleteNotif = async (notifID) => {
    await Notif.findByIdAndRemove(notifID, function (error) {
        try {
            
        } catch (error) {
            res.status(500).send({errors: [{msg : "failed to delete notification"}]});  
        }
        
    });
}
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

//controllers
exports.GetNotifications = async (req,res) =>{
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
        //const mynotifs = Notif.find({_id:{$in: user.alerts}})
        const mynotifs = []
        for(let i=0;i<user.alerts.length; i++){
            mynotifs[i] = await Notif.findById(user.alerts[i]);
        }
        
        res.status(200).send({msg:"Access granted", notifications: mynotifs});
    } catch (error) {
        console.log(error)
        res.status(500).send({errors: [{msg : "failed to load notifications (fatal)"}]});
    }
}


exports.AcceptReq = async (req,res) =>{
    try {
        const {notifID}=req.body;
        console.log(notifID)
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const findAlert = user.alerts.find((e) => e == notifID)
        console.log(findAlert)
        if(!findAlert){
            return res.status(401).send({errors : [{msg : "you are not authorized (token)"}] });
        }
        const fullNotif = await Notif.findOne({_id:notifID})
        if(fullNotif.notifType !== "JOIN_REQ" ){
            return res.status(401).send({errors : [{msg : "invalid req"}] });
        }
        //join the dashboard
        const memberJoin = await Member.findOneAndUpdate({dashid:{$eq:fullNotif.notifBody},memberid:{$eq:[decoded.id,user.name]}},{$set:{state:"JOINED"}},{ returnNewDocument: true })
        //send notification to dashboard owner
        //send notification (request) to user
        var d = new Date();
        const newNotif = new Notif({notifType:"Request accepted",notifSender:[decoded.id,user.name],notifState:"UNOPENED",notifBody:fullNotif.notifBody,date:d.getTime()});
        await newNotif.save();
        const added = await User.findOne({
            _id: fullNotif.notifSender[0],  // search query
          },function (error, theuser) {
            try {
                theuser.alerts.push(newNotif._id)
                theuser.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to add notification to sender (User find)"}]})
            }
        }).select("-password");
        //remove notification from user alerts table
        //remove member from dash member list
        const removeNotifFromUser = await User.findOne({
            _id:decoded.id  // search query
          },function (error, theuser) {
            try {
                theuser.alerts = removeA(theuser.alerts, notifID)
                theuser.save()    
            } catch (error) {
                console.log(error)
                res.status(500).send({errors: [{msg : "failed to remove notification from alerts"}]})
            }
        })
        deleteNotif(notifID);
        const updatedUser = await User.findOne({_id:decoded.id}).select("-password");
        console.log("got to here")
        var mynotifs = []
        for(let i=0;i<user.alerts.length; i++){
            mynotifs[i] = await Notif.findById(updatedUser.alerts[i]);
            console.log(mynotifs[i])
        }
        console.log(mynotifs)
        const notifFilter = mynotifs.filter(e => e !== null)
        console.log(notifFilter)
        res.status(200).send({msg:"Request accepted", notifications:notifFilter});  
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to join dashboard"}]});
    }
}

exports.DeclineReq = async (req,res) => {
    try {
        console.log("from dec req")
        const {notifID}=req.body;
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const findAlert = user.alerts.find((e) => e == notifID)
        
        if(!findAlert){
            return res.status(401).send({errors : [{msg : "you are not authorized (token)"}] });
        }
        const fullNotif = await Notif.findOne({_id:notifID})
        if(fullNotif.notifType !== "JOIN_REQ" ){
            return res.status(401).send({errors : [{msg : "invalid req"}] });
        }
        
        const dashmember = await Member.findOne({dashid:fullNotif.notifBody, memberid:[decoded.id,user.name]})
        if(!dashmember){
            console.log(dashmember)
            return res.status(401).send({errors : [{msg : "member does not exist"}] });
        }
        var d = new Date();
        const newNotif = new Notif({notifType:"Request declined",notifSender:[decoded.id,user.name],notifState:"UNOPENED",notifBody:fullNotif.notifBody,date:d.getTime()});
        await newNotif.save();
        const added = await User.findOne({
            _id: fullNotif.notifSender[0],  // search query
          },function (error, theuser) {
            try {
                theuser.alerts.push(newNotif._id)
                theuser.save()  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to add notification to sender (User find)"}]})
            }
        }).select("-password");
        //delete member from members
        await Member.deleteOne({_id:dashmember._id}, function (err, docs) {
        });
        //delete member from dashboard
        const dash = await Dashboard.findOne({
            _id:fullNotif.notifBody[0]  // search query
          },function (error, thedash) {
            try {
                thedash.members= removeA(thedash.members, dashmember._id)
                thedash.save() 
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to remove member from dashboard (dash find)"}]})
            }
        })
        //remove notification from user alerts table
        //remove member from dash member list
        const removeNotifFromUser = await User.findOne({
            _id:decoded.id  // search query
          },function (error, theuser) {
            try {
                theuser.alerts = removeA(theuser.alerts, notifID)
                theuser.save()    
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to remove notification from alerts"}]})
            }
        })
        deleteNotif(notifID);
        const updatedUser = await User.findOne({_id:decoded.id}).select("-password");
        console.log("got to here")
        var mynotifs = []
        for(let i=0;i<user.alerts.length; i++){
            mynotifs[i] = await Notif.findById(updatedUser.alerts[i]);
            console.log(mynotifs[i])
        }
        console.log(mynotifs)
        const notifFilter = mynotifs.filter(e => e !== null)
        console.log(notifFilter)
        res.status(200).send({msg:"Request declined", notifications:notifFilter});  
    } catch (error) {
        console.log(error)
        res.status(500).send({errors: [{msg : "unable to remove request (fatal)"}]});
    }    
}

exports.RemoveNotif = async (req,res) =>{
    try {
        const {notifID}=req.body;
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const findAlert = user.alerts.find((e) => e == notifID)
        if(!findAlert){
            return res.status(401).send({errors : [{msg : "you are not authorized (token)"}] });
        }
        const removeNotifFromUser = await User.findOne({
            _id:decoded.id  // search query
          },function (error, theuser) {
            try {
                theuser.alerts = removeA(theuser.alerts, notifID);//remove member from member list
                theuser.save();  
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to remove notification from alerts"}]})
            }
        })
        
        await deleteNotif(notifID);
        
        const updatedUser = await User.findOne({_id:decoded.id}).select("-password");
        console.log("got to here")
        var mynotifs = []
        for(let i=0;i<user.alerts.length; i++){
            mynotifs[i] = await Notif.findById(updatedUser.alerts[i]);
            console.log(mynotifs[i])
        }
        console.log(mynotifs)
        const notifFilter = mynotifs.filter(e => e !== null)
        console.log(notifFilter)
        res.status(200).send({msg:"Notification removed", notifications:notifFilter});    
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load membership"}]});
        
    }
}

