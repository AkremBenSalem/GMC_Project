import React, { useState } from 'react'
import { ListGroup,Badge} from "react-bootstrap";
import TaskEdit from '../TaskEdit/TaskEdit';
import TaskEditState from '../TaskEditState/TaskEditState';


const Task = ({task,isManager,thisUser,sender}) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleState = () => {
        setShow(true);
    }
    const handleEdit = () => {
      setShowEdit(true);
    }
    return (
      <ListGroup horizontal>
        <ListGroup.Item >{task.description}</ListGroup.Item>
        <ListGroup.Item>{task.managerid[1]}</ListGroup.Item>
        <ListGroup.Item>{task.workerid[1]}</ListGroup.Item>
        
        <ListGroup.Item>{
          task.deadLine.substring(0,10)
        } at  {
          task.deadLine.substring(11,16)
        }</ListGroup.Item>
        {!(thisUser === task.workerid[0]) ? (
        <ListGroup.Item style={{width:"110px",alignItems:"center"}}>
          {task.state === "ASSIGNED" ? (<Badge variant="info" style={{textAlign:"center"}}>{task.state}</Badge>
            ) :(
          task.state === "STUCK" ? (<Badge variant="danger" style={{textAlign:"center"}}>{task.state}</Badge>
            ) :(
              task.state === "VALIDATED" ? (<Badge variant="success" style={{textAlign:"center"}}>{task.state}</Badge>
                ) : (<Badge variant="primary" style={{textAlign:"center"}}>{task.state}</Badge>) ) ) }
        </ListGroup.Item>
        ) : (
        <ListGroup.Item action onClick={handleState} style={{width:"110px",alignItems:"center"}}>
          {task.state === "ASSIGNED" ? (<Badge variant="info" style={{textAlign:"center"}}>{task.state}</Badge>
            ) :(
          task.state === "STUCK" ? (<Badge variant="danger" style={{textAlign:"center"}}>{task.state}</Badge>
            ) :(
              task.state === "VALIDATED" ? (<Badge variant="success" style={{textAlign:"center"}}>{task.state}</Badge>
                ) : (<Badge variant="primary" style={{textAlign:"center"}}>{task.state}</Badge>) )) }
        </ListGroup.Item>)}
        {task.state === "VALIDATED" ? (null) : (<TaskEditState show={show} setShow={setShow} taskID={task._id} sender={sender}/>)}
        
        {isManager ? (<ListGroup.Item action onClick={handleEdit} style={{maxWidth:"70px"}}>Update</ListGroup.Item>): (null)}
        <TaskEdit showEdit={showEdit} setShowEdit={setShowEdit} task={task} sender={sender}/> 
      </ListGroup>
    );
}

export default Task
