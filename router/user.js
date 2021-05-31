const express = require("express");
const isAuth = require("../middleware/isAuth");
const { DashCreate, DashLoad, DashMemberAdd, DashMemberRemove, DeleteDashboard, LeaveDash } = require("../controllers/dashboard.controllers");
const { Register, Login, GetUserFromId } = require("../controllers/user.controllers");
const { dashCreateValidate, validationDash } = require("../middleware/validateDash");
const { validation, registerValidate, loginValidate } = require("../middleware/validateUser");
const { GetMemberCard, GetMemberDash } = require("../controllers/member.controllers");
const { AcceptReq, RemoveNotif, DeclineReq, GetNotifications } = require("../controllers/notif.controllers");
const { CreateTask, LoadTasksWorker, LoadTasksManager, LoadTasksDash, EditTask, EditTaskState, ValidateTask, RemoveTask } = require("../controllers/task.controllers");


const router = express.Router();

router.get("/",(req,res) => {
    res.send("testing router");
});
/*
@ method: POST
@ path:http:localhost:5000/api/user/register
@ params: req.body 
public
*/
router.post("/register",registerValidate(), validation, Register);

/*
@ method: GET
@ path:http:localhost:5000/api/user/current
@ params: req.headers
private
*/
router.get("/current",isAuth, (req,res)=>{
    res.send({msg:"authorized",user:req.user})
});
//get user with user ID
router.post("/getuserbyid", GetUserFromId );
//dashCreateValidate(),validationDash,
router.post("/dashcreate", DashCreate );
//Load Dashboard
router.post("/dashboard", DashLoad );
//Add Member
router.post("/addmember", DashMemberAdd );
//remove member
router.post("/removemember", DashMemberRemove );

//remove dashboard
router.post("/removedash", DeleteDashboard );
//login
router.post("/login", loginValidate(),validation, Login);

//Leave Dashboard
router.post("/membersdash", GetMemberDash);


//get membersCard
router.get("/membership", GetMemberCard);
//get dash members
router.post("/dashleave", LeaveDash);

//get requests
router.get("/getnotifications",GetNotifications);
//accept join req
router.post("/acceptjoinreq", AcceptReq);
//decline join req
router.post("/declinereq",DeclineReq);
//remove notification
router.post("/removenotif",RemoveNotif);

//create task
router.post("/createtask",CreateTask);

//get worker tasks
router.get("/workertasks",LoadTasksWorker);

//get manager tasks
router.get("/managertasks",LoadTasksManager);


//get Dashboard tasks
router.post("/dashtasks",LoadTasksDash);

//update task
router.post("/updatetask",EditTask);

//update task state (workers)
router.post("/updatetaskstate",EditTaskState);

//validate task
router.post("/validate", ValidateTask);

//remove task
router.post("/removetask",RemoveTask);



module.exports = router;

