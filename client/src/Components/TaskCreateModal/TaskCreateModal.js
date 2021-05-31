import React ,{useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { taskCreate } from '../../Redux/actions/task';
const TaskCreateModal = ({workerid,dashid}) => {
    //date time picker
    const [startDate, setStartDate] = useState(new Date());
    //modal handlers
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Redux
    const [task,setTask] = useState({workerid:workerid,dashid:dashid})
    const dispatch = useDispatch();
    const handleAssignTask = (e) =>{
    e.preventDefault()
    dispatch(taskCreate(task));
    handleClose();
    }
    function onChange(date, dateString) {
      console.log(date, dateString);
    }
    const handleChange = (e) =>{
        setTask({...task,[e.target.name]:e.target.value});  
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
         ASSIGN 
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Task description"
                name="description"
                onChange={handleChange}
              />
              
              
              <input type="datetime-local" name="deadLine" onChange={handleChange} />
            </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAssignTask}>
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default TaskCreateModal
