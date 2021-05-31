import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from "react-bootstrap";
import { getTasksDash } from '../../Redux/actions/task';
import Task from '../Task/Task';
import "./TaskList.css"

const TaskList = ({dashid,manager,user}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasksDash(dashid))
    }, [])
    var isManager = false;
    if(manager === user._id){
        isManager=true;
    }
    const isLoading = useSelector((state) => state.taskReducer.loading);
    const temp = useSelector((state) => state.taskReducer.tasks);
    
    return (
        (isLoading) ?( 
            <div className="spinnerStyle">
                <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            ) :(temp.length === 0 ? (<h6>No tasks</h6>) : (
                <>
                <h5>Tasks</h5> <br/>  
            <div className="TaskListDash">
                { temp.map(e => <Task task={e} isManager={isManager} thisUser={user._id} key={e._id} sender="DASH" />) } 
            </div> 
            </>))
    )
}

export default TaskList
