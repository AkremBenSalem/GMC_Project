import axios from "axios";
import { TASK_CREATE, TASK_DASH, TASK_DELETE, TASK_FAIL, TASK_LOAD, TASK_MANAGER, TASK_STATE, TASK_UPDATE, TASK_VALIDATE, TASK_WORKER } from "../constants/task";

export const getTasksDash=(dashid)=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/dashtasks",{dashID:dashid},config);
    dispatch({type:TASK_DASH,payload: result.data});  
    } catch (error) {
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const getTasksWorker=()=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.get("/api/user/workertasks",config);
    dispatch({type:TASK_WORKER,payload: result.data});  
    } catch (error) {
        console.log(error);
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const getTasksManager=()=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.get("/api/user/managertasks",config);
    dispatch({type:TASK_MANAGER,payload: result.data});  
    } catch (error) {
        console.log(error);
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const taskCreate=(task)=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/createtask",task,config);
    dispatch({type:TASK_CREATE,payload: result.data});  
    } catch (error) {
        console.log(error);
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const taskEditState=(taskID,taskState,sender)=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const body = {
        taskID:taskID,
        state:taskState,
        sender:sender
    }
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/updatetaskstate",body,config);
    dispatch(getTasksManager())
    dispatch({type:TASK_STATE,payload: result.data});  
    } catch (error) {
        console.log(error);
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const taskUpdateOne=(task)=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.post("/api/user/updatetask",task,config);
    dispatch({type:TASK_UPDATE,payload: result.data});
    dispatch(getTasksWorker());    
    } catch (error) {
        console.log(error);
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const taskValidate=(taskID,sender)=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const body = {
        taskID:taskID,
        sender:sender
    }
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    console.log(body)
    let result = await axios.post("/api/user/validate",body,config);
    dispatch(getTasksWorker());
    dispatch({type:TASK_VALIDATE,payload: result.data});
        
    } catch (error) {
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}

export const taskRemove=(taskID,sender)=>async (dispatch) =>{
    dispatch({type:TASK_LOAD});
    try {
    const body = {
        taskID:taskID,
        sender:sender
    }
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    
    let result = await axios.post("/api/user/removetask",body,config);

    dispatch({type:TASK_DELETE,payload: result.data});
    dispatch(getTasksWorker());  
    } catch (error) {
        dispatch({type:TASK_FAIL,payload: error.response.data});  
    }
}