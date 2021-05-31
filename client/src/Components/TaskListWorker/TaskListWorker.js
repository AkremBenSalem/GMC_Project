import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "react-bootstrap";
import { getTasksDash, getTasksWorker } from '../../Redux/actions/task';
import Task from '../Task/Task';
import "./TaskListWorker.css"

const TaskListWorker = ({user}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasksWorker())
    }, [])
    const isManager = false;
    
    const isLoading = useSelector((state) => state.taskReducer.loading);
    const temp = useSelector((state) => state.taskReducer.tasks);
    
    return (
        (isLoading) ?( 
            <Spinner animation="border" role="status" style={{marginLeft:"50%",marginRight:"100%",marginTop:"20px",marginBottom:"20px"}}>
            <span className="sr-only">Loading...</span>
            </Spinner> 
            ) :(temp.length === 0 ? (<h6>No tasks</h6>) : (
                <>
                <h5>Tasks assigned to you</h5> <br/>
                <div className="TaskListWorker">
                {temp.map(e => <Task task={e} isManager={isManager} thisUser={user._id} key={e._id} sender="WORKER"/>) }
                </div> 
                </>))
    )
}

export default TaskListWorker
