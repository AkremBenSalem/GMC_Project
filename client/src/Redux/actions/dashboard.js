import axios from "axios";
import { DASH_ADD, DASH_CREATE, DASH_DELETE, DASH_FAIL, DASH_INFO, DASH_LEAVE, DASH_LOAD, DASH_LOADING, DASH_REMOVE_MEMBER } from "../constants/dashboard";

export const createDash=(title)=>async (dispatch) =>{
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/dashcreate",title,config);
    dispatch({type:DASH_CREATE,payload: result.data});
    console.log(result.data)  
    } catch (error) {
        console.log(error)
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}

export const loadDash=(dashID,history)=>async (dispatch) =>{
    dispatch({type:DASH_LOADING});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/dashboard",dashID,config);
    dispatch({type:DASH_LOAD,payload: result.data});
    history.push("/dashboard")
    
    } catch (error) {
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}

export const leaveDash=(dashID,history)=>async (dispatch) =>{
    dispatch({type:DASH_LOADING});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/dashleave",dashID,config);
    dispatch({type:DASH_LEAVE,payload: result.data});
    history.push("/profile")
    
    } catch (error) {
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}

export const deleteDash=(dashID,history)=>async (dispatch) =>{
    dispatch({type:DASH_LOADING});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/removedash",dashID,config);
    dispatch({type:DASH_DELETE,payload: result.data});
    history.push("/profile")
    
    } catch (error) {
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}

export const infoDash=(dashID)=>async (dispatch) =>{
    dispatch({type:DASH_LOADING});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/dashboard",dashID,config);
    dispatch({type:DASH_INFO,payload: result.data});
    
    } catch (error) {
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}

export const removeMemberDash=(dashID,memberID)=>async (dispatch) =>{
    dispatch({type:DASH_LOADING});
    try {
    const body={
        dashID:dashID,
        memberID:memberID
    }
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/removemember",body,config);
    dispatch({type:DASH_REMOVE_MEMBER,payload: result.data});
    
    } catch (error) {
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}

export const addMemberDash=(addContent)=>async (dispatch) =>{
    dispatch({type:DASH_LOADING});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    console.log(addContent)
    let result = await axios.post("/api/user/addmember",addContent,config);
    console.log(result.data)
    dispatch({type:DASH_ADD,payload: result.data});
    
    } catch (error) {
        dispatch({type:DASH_FAIL,payload: error.response.data});  
    }
}