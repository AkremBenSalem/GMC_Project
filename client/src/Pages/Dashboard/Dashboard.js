import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashHeader from '../../Components/DashHeader/DashHeader';
import SideBarDash from '../../Components/SideBarDash/SideBarDash';
import TaskList from '../../Components/TaskList/TaskList';
import {current} from "../../Redux/actions/user"
import "./Dashboard.css"
import { Spinner, Card} from "react-bootstrap";
const Dashboard = ({history}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(current())
    }, [])
    const user = useSelector((state) => state.userReducer.user);
    const dash = useSelector((state) => state.dashboardReducer);
    const isLoading = useSelector((state) => state.dashboardReducer.loading);
    
   
    return (
        !(isLoading) ? (
            <div>
            <SideBarDash dashid={[dash.dashID,dash.title]} user={user} manager={dash.creator} history={history}/>
            <DashHeader dash={dash} history={history} user={user} manager={dash.creator} />
            <br />
            <Card body className="DashTaskStyle">
                <TaskList dashid={dash.dashID} user={user} manager={dash.creator}/>
            </Card>
            </div>  )  
        : (
        <div className="spinnerStyle">
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner>
        </div>)
        
        
    )
}

export default Dashboard
