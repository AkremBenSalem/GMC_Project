import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { taskEditState } from '../../Redux/actions/task';
const TaskEditState = ({show,setShow,taskID,sender}) => {
    const handleClose = () => setShow(false);
    const dispatch = useDispatch()
    const handleInProgress = () =>{
      console.log(sender)
      dispatch(taskEditState(taskID,"IN PROGRESS",sender))
    }
    const handleStuck = () =>{
      dispatch(taskEditState(taskID,"STUCK",sender))
    }
    const handleFinished = () =>{
      dispatch(taskEditState(taskID,"FINISHED",sender))
    }
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Task State</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="secondary" size="lg" block onClick={handleInProgress}>
              IN PROGRESS
            </Button>
            <Button variant="danger" size="lg" block onClick={handleStuck}>
              STUCK
            </Button>
            <Button variant="warning" size="lg" block onClick={handleFinished}>
              FINISHED
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default TaskEditState
