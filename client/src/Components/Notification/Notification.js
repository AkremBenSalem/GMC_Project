import React from "react";
import { Toast, Button} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { acceptRequest, declineRequest, removeNotif } from "../../Redux/actions/notification";
import "./Notification.css"

const Notification = ({ notif}) => {
  const dispatch = useDispatch();

  const handledecline = () =>{
    
    dispatch(declineRequest({notifID:notif._id}))
  }
  const handleaccept = () =>{
    
    dispatch(acceptRequest({notifID:notif._id}))
  }
  const handleremove = () =>{
    
    dispatch(removeNotif({notifID:notif._id}))
  }

  return (
    
    <Toast onClose={handleremove} >
      {/*Notification header -----------------*/}
      {notif.notifType === "JOIN_REQ"? (
      <Toast.Header closeButton={false}>
        <img src="" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Join Request</strong>
        <small>{
          notif.date.substring(0,10)
        } at  {
        notif.date.substring(11,16)
        }
        </small>
        </Toast.Header>):(<Toast.Header>
        <img src="" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{notif.notifType}</strong> 
        <small>{
          notif.date.substring(0,10)
        } at  {
        notif.date.substring(11,16)
        }
        </small>
      </Toast.Header>)} 
      {/*Notification body ----------------- Task assigned*/}
      {notif.notifType === "JOIN_REQ"? (
      <Toast.Body> 
          <b>{notif.notifSender[1]} </b> has invited you to join his dashboard <b>{notif.notifBody[1]}</b>
      </Toast.Body>) :(
      notif.notifType === "Request accepted"? (
        <Toast.Body> 
          <b>{notif.notifSender[1]}</b> accepted your request to join the dashboard <b>{notif.notifBody[1]}</b>
      </Toast.Body>
      ) :(notif.notifType === "Task assigned"?(
      <Toast.Body> 
        <b>{notif.notifSender[1]}</b> has assiged a new task to you <br/> <b>Dashboard: </b>  {notif.notifBody[1]}
      </Toast.Body>
      ) : notif.notifType === "Task update"?(
        <Toast.Body> 
          <b>{notif.notifSender[1]}</b> has updated a task assiged to you <br/> <b>Description: </b>  {notif.notifBody[1]}
          <br/> <b>DeadlLine: </b>  {notif.notifBody[2].substring(0,10)} at  {notif.notifBody[2].substring(11,16)}
        </Toast.Body>
        ) : (notif.notifType === "Task Validated"? (
          <Toast.Body> 
          <b>{notif.notifSender[1]}</b> has validated your task <br/> <b>Description: </b>  {notif.notifBody[1]}
        </Toast.Body>
        ) : (notif.notifType === "Task state update"? (
          <Toast.Body> 
          <b>{notif.notifSender[1]}</b> has updated his task's state <br/> <b>Description: </b>  {notif.notifBody[1]}
          <br/> <b>New State: </b>  {notif.notifBody[2]} 
        </Toast.Body>
        ): (notif.notifType === "Request declined"? (
          <Toast.Body> 
           <b>{notif.notifSender[1]}</b> has declined your request to join <b>{notif.notifBody[1]}</b>  
           </Toast.Body>) : (notif.notifType === "Task removed"? (
             <Toast.Body>
           <b>{notif.notifSender[1]}</b> has removed a task assiged to you  from <b>{notif.notifBody[2]}</b>  <br/>
           <b>Task Description : </b> {notif.notifBody[1]}
           </Toast.Body>) : (null)
          ))))
      ))}

      {/*Notification btns -----------------*/}
      {notif.notifType === "JOIN_REQ"? (
      <div style={{textAlign:"center", marginBottom:"10px"}}>
      <Button variant="success" style={{maxHeight:"40px"}} onClick={handleaccept}>Accept</Button>
      <Button variant="danger"style={{marginLeft:"5px",maxHeight:"40px"}} onClick={handledecline}>Decline</Button>
      </div>
      ) : (null)}
    </Toast>
  );
};

export default Notification;
/*
    notifType:{ type: String },
    notifSender:{ type: String },
    notifState:{ type: String },
    notifBody:{ type: String },
    date:{type:Date},//exact date of alert
    */
