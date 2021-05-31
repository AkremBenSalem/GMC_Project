import React, {useEffect, useState} from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getNotification } from '../../Redux/actions/notification';
import Notification from '../Notification/Notification';
import { Spinner } from "react-bootstrap";
const NotificationList = () => {
    const dispatch = useDispatch()
    const temp = useSelector((state) => state.notificationReducer.notifications);
    const isLoading = useSelector((state) => state.notificationReducer.loading);
    
    useEffect(() => {
      dispatch(getNotification())
    }, [])
    console.log(temp)
    
    return (
        (isLoading) ?( 
            <Spinner animation="border" role="status" style={{marginLeft:"150px",marginRight:"150px",marginTop:"20px"}}>
            <span className="sr-only">Loading...</span>
            </Spinner> 
            ) :(temp.length == 0 ? (<h6>No notifications</h6>) : ( temp.map(e => <Notification notif={e} key={e._id}/>) ))
    )
}

export default NotificationList
