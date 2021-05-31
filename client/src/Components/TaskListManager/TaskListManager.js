import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasksManager} from '../../Redux/actions/task';
import Task from '../Task/Task';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import "./TaskListManager.css"

const TaskListManager = ({user}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTasksManager())
    }, [])
    const isManager = true;
    
    const isLoading = useSelector((state) => state.taskReducer.loading);
    const temp = useSelector((state) => state.taskReducer.tasksManager);
    
    return (
        (isLoading) ?( 
            <Segment style={{marginLeft:"25%",marginRight:"100%",marginTop:"20px",marginBottom:"20px"}}>
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>

                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
            ) :(temp.length === 0 ? (<h6>No tasks</h6>) : (
                <>
                <h5>Tasks You manage</h5> <br/> 
                <div className="TaskListManager">
                {temp.map(e => <Task task={e} isManager={isManager} thisUser={user._id} key={e._id} sender="MANAGER"/>) }
                </div>
                </>))
    )
}

export default TaskListManager
