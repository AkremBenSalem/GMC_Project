import React from "react";
import { Toast, Button, Spinner } from "react-bootstrap";
import RemoveMember from "../RemoveMember/RemoveMember";
import TaskCreateModal from "../TaskCreateModal/TaskCreateModal";
import "./DashMemberCard.css"
const DashMemberCard = ({ member,isManager,user }) => {

  return (
    !(member) ? (<Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
    </Spinner> ) : (member.state === "JOINED" ? (
    <Toast className="memberCard">
      <Toast.Header closeButton={false} >
        <img src="" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{member.memberid[1]}</strong>
        <small>{member.role}</small>
      </Toast.Header>
      {isManager ? (
      <div style={{textAlign:"center", marginBottom:"5px",marginTop:"5px",display:"flex",justifyContent:"space-between",marginLeft:"5px",marginRight:"5px"}}>
      <TaskCreateModal workerid={member.memberid[0]} dashid={member.dashid[0]}/>
      {user === member.memberid[0] ? (null): (<RemoveMember memberID = {member.memberid[0]} dashID={member.dashid[0]} />)}
      
      </div>) : (null)}
      
    </Toast>) : ( null
     ))
  );
};

export default DashMemberCard;
/*const memberSchema = new Schema({
    dashid:[String],//0 => ID, 1 => title
    memberid:[String],//0 => ID, 1 => name
    role:{ type: String },
    state:{ type: String },

})*/