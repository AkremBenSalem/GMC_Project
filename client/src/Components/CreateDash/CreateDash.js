import React ,{useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createDash } from '../../Redux/actions/dashboard';

const CreateDash = () => {
    //modal handlers
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Redux
    const [title,setTitle] = useState({})
    const dispatch = useDispatch();
    const handleCreateDash = (e) =>{
    e.preventDefault()
    dispatch(createDash(title));
    handleClose();
    }
    const handleChange = (e) =>{
        setTitle({...title,[e.target.name]:e.target.value});  
    }
    return (
      <>

        <Button variant="primary" onClick={handleShow}>
          Create a Dashboard
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Dashboard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group onSubmit = {handleCreateDash}>
            <Form.Control type="text" placeholder="Dashboard Title" name="title" onChange={handleChange}/>
          </Form.Group>
              </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateDash}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default CreateDash
