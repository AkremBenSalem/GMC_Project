import React from "react";
import { Toast, Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadDash } from "../../Redux/actions/dashboard";
import "./MemberCard.css"
const MemberCard = ({ member, history}) => {
  const dispatch = useDispatch();
    const handlegotodash = () =>{
        dispatch(loadDash({dashID:member.dashid[0]},history))
    }
  return (
    !(member) ? (<Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
    </Spinner> ) : (member.state === "JOINED" ? (
    <Toast className="memberCardStyle">
      <Toast.Header closeButton={false} style={{paddingBottom:"10px",paddinTop:"10px"}}>
        <img src="" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{member.dashid[1]}</strong>
        <small>{member.role}</small>
      </Toast.Header>
      
      <Toast.Body className="Toastbdy">
      <Button variant="primary" onClick={handlegotodash} className="toastBtn">go to dashboard</Button>
      </Toast.Body>
      
    </Toast>) : ( null
     ))
  );
};

export default MemberCard;
/*const memberSchema = new Schema({
    dashid:{ type: String },
    memberid:{ type: String },
    role:{ type: String },
    state:{ type: String },

})*/