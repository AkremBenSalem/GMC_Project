import axios from "axios";
import { NOTIF_ACCEPT, NOTIF_DECLINE, NOTIF_FAIL, NOTIF_GET, NOTIF_LOAD, NOTIF_REMOVE } from "../constants/notification";



export const getNotification=()=>async (dispatch) =>{
    dispatch({type:NOTIF_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.get("/api/user/getnotifications",config);
    dispatch({type:NOTIF_GET,payload: result.data});  
    } catch (error) {
        dispatch({type:NOTIF_FAIL,payload: error.response.data});  
    }
}


export const acceptRequest=(notifID)=>async (dispatch) =>{
    dispatch({type:NOTIF_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/acceptjoinreq",notifID,config);
    dispatch({type:NOTIF_ACCEPT,payload: result.data}); 
    } catch (error) {
        dispatch({type:NOTIF_FAIL,payload: error.response.data});  
    }
}


export const declineRequest=(notifID)=>async (dispatch) =>{
    dispatch({type:NOTIF_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/declinereq",notifID,config);
    dispatch({type:NOTIF_DECLINE,payload: result.data});  
    } catch (error) {
        dispatch({type:NOTIF_FAIL,payload: error.response.data});  
    }
}

export const removeNotif=(notifID)=>async (dispatch) =>{
    dispatch({type:NOTIF_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/removenotif",notifID,config);
    dispatch({type:NOTIF_REMOVE,payload: result.data});
    } catch (error) {
        dispatch({type:NOTIF_FAIL,payload: error.response.data});  
    }
}