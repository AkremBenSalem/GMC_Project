const jwt = require("jsonwebtoken");
const Dashboard = require("../models/Dashboard");
const Member = require("../models/Member");
const Task = require("../models/Task");
const User = require("../models/User");


//Global functions
const CreateNotif  = async(destination, type, sender, body) =>{
    var d = new Date();
    const newNotif = new Notif({notifType:type,notifSender:sender,notifState:"UNOPENED",notifBody:body,date:d.getTime()});
    await newNotif.save();
    await User.findOne({
        _id: destination,  // search query
      }, function (error, theuser) {
            try {
                theuser.alerts.push(newNotif._id);
                theuser.save();
            } catch (error) {
                
                res.status(500).send({ errors: [{ msg: "failed while creating notification" }] });
            }
        }).select("-password");
}

//Controllers
exports.CreateTask = async(req,res) =>{
    try {
        const {dashid,description,workerid,deadLine}=req.body;
        if(!(dashid) || !(description) || !(workerid) || !(deadLine)){
            return res.status(400).send({errors : [{msg : "bad request (missing params)"}] });  
        }
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const worker = await User.findOne({_id:workerid}).select("-password");
        if(!worker){
            return res.status(401).send({errors : [{msg : "invalid member (worker)"}] });
        }
        const dash = await Dashboard.findOne({_id:dashid})
        if(!dash){
            return res.status(401).send({errors : [{msg : "dash does not exist"}] });
        }
        const CheckDashOwner = user.ownedDash.indexOf(dashid)
        if(CheckDashOwner === -1){
            return res.status(401).send({errors : [{msg : "you are not authorized (ownership)"}] }); 
        }
        const exisits = await Member.findOne({dashid:[dashid,dash.title], memberid:[workerid,worker.name], state:"JOINED"})
        if(!exisits){
            return res.status(401).send({errors : [{msg : "user is not in the dashboard member list"}] });
        }
        //new task
        const newTask = new Task({dashid:[dashid,dash.title],description:description, managerid:[decoded.id,user.name],workerid:[workerid,worker.name],deadLine:deadLine,state:"ASSIGNED"});
        //save
        await newTask.save();
        //get the updated tasks
        const dashTasks = await Task.find({dashid:{$eq:[dashid,dash.title]}})
        await CreateNotif(workerid,"Task assigned",[decoded.id,user.name],[dashid,dash.title]);
        res.status(200).send({msg:"task created", Tasks: dashTasks})
    } catch (error) {
        
        res.status(500).send({errors: [{msg : "failed to create task (fatal)"}]})
        
    }
}

exports.LoadTasksWorker = async(req,res) =>{
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
        const myTasks = await Task.find({workerid:{$eq:[decoded.id,user.name]}})
        res.status(200).send({msg:"Worker Tasks", Tasks: myTasks});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load Tasks"}]});
    }
}

exports.LoadTasksManager = async(req,res) =>{
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
        const myTasks = await Task.find({managerid:{$eq:[decoded.id,user.name]}})
        res.status(200).send({msg:"Manager Tasks", Tasks: myTasks});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load Tasks"}]});
    }
}

exports.LoadTasksDash = async(req,res) =>{
    try {
        
        const {dashID}=req.body;
        
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
            return res.status(401).send({errors : [{msg : "dash does not exist"}] });
        }
        const dashTasks = await Task.find({dashid:{$eq:[dashID,dash.title]}})
        
        res.status(200).send({msg:"Dashboard Tasks", Tasks: dashTasks});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to load Tasks"}]});
    }
}

exports.EditTask = async(req,res) => {
    try {
        const {taskID,description,workerid,deadLine,state,sender}=req.body;
        
        if(!(taskID) || !(description) || !(workerid) || !(deadLine) || !(state)){
            return res.status(400).send({errors : [{msg : "bad request (missing params)"}] });  
        }
        const token= req.headers["authorization"];
        
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        
        const isManager = await Task.find({_id:{$eq:taskID},managerid:{$eq:[decoded.id,user.name]}});
        
        if(!isManager){
            return res.status(401).send({errors : [{msg : "you are not authorized (manager)"}] }); 
        }
        const worker = await User.findOne({_id:workerid[0]}).select("-password");
        
        if(!worker){
            return res.status(401).send({errors : [{msg : "invalid member (worker)"}] });
        }
        
        const editedTask = await Task.findOneAndUpdate(
            {_id:{$eq:taskID}},
            {$set:{description:description,workerid:workerid,deadLine:deadLine,state:state}},
            { returnNewDocument: true });      
        await CreateNotif(workerid[0],"Task update",[decoded.id,user.name],[taskID,description,deadLine]);
        var dashTasks =[];
        if(sender === "DASH"){
            dashTasks = await Task.find({dashid:{$eq:isManager[0].dashid}})
        }
        if(sender === "MANAGER"){
            dashTasks = await Task.find({managerid:{$eq:isManager[0].managerid}})
        }
        
        res.status(200).send({msg:"Task updated", Tasks: {theTasks:dashTasks,sender:sender}});
    } catch (error) {
        
        res.status(500).send({errors: [{msg : "failed to update Task (fatal)"}]});
    }
}

exports.EditTaskState = async(req,res) => {
    try {
        const {taskID,state,sender}=req.body;
        if(!(taskID)  || !(state)){
            return res.status(400).send({errors : [{msg : "bad request (missing params)"}] });  
        }
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const isWorker = await Task.findOne({_id:{$eq:taskID},workerid:{$eq:[decoded.id,user.name]}});
        
        if(!isWorker){
            return res.status(401).send({errors : [{msg : "you are not authorized (assigned)"}] }); 
        }
        
        const editedTask = await Task.findOneAndUpdate(
            {_id:{$eq:taskID}},
            {$set:{state:state}},
            { returnNewDocument: true });
            
        await CreateNotif(isWorker.managerid[0],"Task state update",[decoded.id,user.name],[taskID,isWorker.description,state]);//task ID , description of the task , the updated state
        var dashTasks = []
        if(sender === "DASH"){
            
            dashTasks = await Task.find({dashid:{$eq:isWorker.dashid[0]}})
             
        }
        if(sender === "WORKER"){
            console.log(isWorker.workerid)
            dashTasks = await Task.find({workerid:{$eq:isWorker.workerid}}) 
        }
        
        res.status(200).send({msg:"Task state updated", Tasks: dashTasks});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to update Task (fatal)"}]});
    }
}

exports.ValidateTask = async(req,res) => {
    try {
        const {taskID,sender}=req.body;
        if(!(taskID)){
            return res.status(400).send({errors : [{msg : "bad request (missing params)"}] });  
        }
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const isManager = await Task.findOne({_id:{$eq:taskID},managerid:{$eq:[decoded.id,user.name]}});
        if(!isManager){
            return res.status(401).send({errors : [{msg : "you are not authorized (manager)"}] }); 
        }
        const editedTask = await Task.findOneAndUpdate(
            {_id:{$eq:taskID}},
            {$set:{state:"VALIDATED"}},
            { returnNewDocument: true });
        await CreateNotif(isManager.workerid[0],"Task Validated",[decoded.id,user.name],[taskID,isManager.description]);
        
        var dashTasks =[];
        if(sender === "DASH"){
            dashTasks = await Task.find({dashid:isManager.dashid})
           
        }
        if(sender === "MANAGER"){
            dashTasks = await Task.find({managerid:isManager.managerid}) 
        }
        res.status(200).send({msg:"Task has been validated", Tasks: {theTasks:dashTasks,sender:sender}});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to update Task (fatal)"}]});
    }
}

exports.RemoveTask = async(req,res) => {
    try {
        const {taskID,sender}=req.body;
        if(!(taskID)){
            return res.status(400).send({errors : [{msg : "bad request (missing params)"}] });  
        }
        const token= req.headers["authorization"];
        if(!token){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });        
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:decoded.id}).select("-password");
        if(!user){
            return res.status(401).send({errors : [{msg : "you are not authorized"}] });
        }
        const isManager = await Task.findOne({_id:{$eq:taskID},managerid:{$eq:[decoded.id,user.name]}});
        if(!isManager){
            return res.status(401).send({errors : [{msg : "you are not authorized (manager)"}] }); 
        }
        const editedTask = await Task.findByIdAndRemove(taskID, function (error) {
            try {
                
            } catch (error) {
                res.status(500).send({errors: [{msg : "failed to delete task"}]});  
            }
            
        });
        await CreateNotif(isManager.workerid[0],"Task removed",[decoded.id,user.name],[taskID,isManager.description,isManager.dashid[1]]);
        
        var dashTasks =[];
        if(sender === "DASH"){
            dashTasks = await Task.find({dashid:isManager.dashid})
           
        }
        if(sender === "MANAGER"){
            dashTasks = await Task.find({managerid:isManager.managerid})
        }
        
        res.status(200).send({msg:"Task removed", Tasks: {theTasks:dashTasks,sender:sender}});
    } catch (error) {
        res.status(500).send({errors: [{msg : "failed to delete Task (fatal)"}]});
    }
}