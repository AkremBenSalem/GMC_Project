import React, { useState } from "react";
import { Card , Button,Badge} from "react-bootstrap"
import TaskEdit from '../TaskEdit/TaskEdit';
import TaskEditState from '../TaskEditState/TaskEditState';
import "./Task.css"
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
    <div>
      <Card className="TaskCard">
      <Card.Header>
        <small>
            Deadline : {
            task.deadLine.substring(0,10)
            } at  {
             task.deadLine.substring(11,16)
            }     </small>
            {task.state === "ASSIGNED" ? (<Badge variant="info" style={{marginLeft:"27px"}}>{task.state}</Badge>
            ) :(
          task.state === "STUCK" ? (<Badge variant="danger" style={{marginLeft:"47px"}}>{task.state}</Badge>
            ) :(
              task.state === "VALIDATED" ? (<Badge variant="success" style={{marginLeft:"22px"}}>{task.state}</Badge>
                ) : task.state === "FINISHED" ? (<Badge variant="warning" style={{marginLeft:"30px"}}>{task.state}</Badge>
                ) : (<Badge variant="primary" style={{marginLeft:"9px"}}>{task.state}</Badge>) ) ) }
        </Card.Header>
        <Card.Body>
        
          <Card.Title>Dashboard : {task.dashid[1]} </Card.Title>
          <Card.Text>
              Description :
          {task.description}
          </Card.Text>
          {task.state === "VALIDATED" ? (isManager ? (<Button variant="primary" onClick={handleEdit}> <i class="fas fa-edit" style={{ fontSize: "1em" }}/> </Button>) : (null)
          ) : (isManager ? (<Button variant="primary" onClick={handleEdit}> <i class="fas fa-edit" style={{ fontSize: "1em" }}/> </Button>) : (
            thisUser === task.workerid[0] ? (
          <>
            <Button variant="primary" onClick={handleState}> Update Progress </Button>
            <TaskEditState show={show} setShow={setShow} taskID={task._id} sender={sender}/>
          </>) : (null))
          
          )}
          
        </Card.Body>
        <Card.Footer className="taskFooter">
          <small className="text-muted">Manager: {task.managerid[1]} </small>
          <small className="text-muted">Worker: {task.workerid[1]} </small>       
        </Card.Footer>
        <TaskEdit showEdit={showEdit} setShowEdit={setShowEdit} task={task} sender={sender}/> 
      </Card>
    </div>
  );
};

export default Task;
