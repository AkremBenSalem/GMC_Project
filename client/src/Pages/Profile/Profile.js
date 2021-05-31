import React from 'react'
import { useSelector} from "react-redux";
import CreateDash from '../../Components/CreateDash/CreateDash'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import SideBarComp from '../../Components/SideBar/SideBarComp'
import './Profile.css'
import { Spinner, Card} from "react-bootstrap";
import TaskListWorker from '../../Components/TaskListWorker/TaskListWorker';
import TaskListManager from '../../Components/TaskListManager/TaskListManager';
const Profile = ({history}) => {
    

    const user = useSelector((state) => state.userReducer.user); 
    const isLoading = useSelector((state) => state.userReducer.load);
    return (
        isLoading && user  ? (<Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner> ) : (
        <>
            <SideBarComp className="SideBar" history={history} user={user}/>
        <>  
            <div className="ProfileAndCreate">
                <div className="ProfileCardStyle">
                    <ProfileCard/>
                </div>
                <div className="CreateDashbtn">
                    <CreateDash />
                </div>
            </div>
            <div className="Tasks">
            <Card body>
                <TaskListWorker user={user}/>
                
            </Card>
            <Card body >
                <TaskListManager user={user}/>
            </Card>
            </div>
            
            {/*<MyDashList user={user} history={history}/> Updated with sidebar dashs*/}
        </>     
        </>)
    )
}

export default Profile
