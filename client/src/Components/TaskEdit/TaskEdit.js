import React, { useState } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import {taskRemove, taskUpdateOne, taskValidate} from "../../Redux/actions/task"

const TaskEdit = ({showEdit,setShowEdit,task,sender}) => {
    const handleClose = () => setShowEdit(false);
    const dispatch = useDispatch()
    
    const [taskUpdate, setTaskUpdate] = useState({
        taskID:task._id,
        description:task.description,
        deadLine:task.deadLine,
        workerid:task.workerid,
        state:task.state,
        sender:sender
    })
    const handleChange= (e) =>{
        setTaskUpdate({...taskUpdate,[e.target.name]:e.target.value});      
    }
    const handleValidate = ()=> {
      dispatch(taskValidate(task._id,sender));
    }
    const handleDelete = () => {
      
      dispatch(taskRemove(task._id,sender))
    }
    const handleUpdate = () => {
        dispatch(taskUpdateOne(taskUpdate))
    }
    return (
      <>
        <Modal show={showEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group>
            <Form.Control defaultValue={taskUpdate.description} name="description"  onChange={handleChange}/>
            <br/>
            <input type="datetime-local" name="deadLine" onChange={handleChange} defaultValue={taskUpdate.deadLine} />
            
          </Form.Group>
            <div style={{textAlign:"center"}}>
            
                <Button variant="success" onClick={handleValidate}>Validate</Button>
                <Button variant="danger" style={{marginLeft:"10px"}} onClick={handleDelete}>Delete</Button>
                
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default TaskEdit
