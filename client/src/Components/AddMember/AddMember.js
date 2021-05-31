import React ,{useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addMemberDash } from '../../Redux/actions/dashboard';

const AddMember = ({dashID}) => {
        //modal handlers
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        //Redux
        const [memberEmail,setmemberEmail] = useState({})
        const dispatch = useDispatch();
        const handleCreateDash = (e) =>{
        e.preventDefault()
        const addContent = {
          dashID:dashID,
          email:memberEmail.email
        }
        dispatch(addMemberDash(addContent));
        handleClose();
        }
        const handleChange = (e) =>{
          setmemberEmail({...memberEmail,[e.target.name]:e.target.value});  
        }
        return (
          <>
    
            <Button variant="secondary" onClick={handleShow}>
            <i class="fas fa-user-plus" style={{ fontSize: "1em" }} />
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a Member</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Group onSubmit = {handleCreateDash}>
                <Form.Control type="text" placeholder="Member Email" name="email" onChange={handleChange}/>
              </Form.Group>
                  </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateDash}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
}

export default AddMember
