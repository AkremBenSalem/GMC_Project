import axios from "axios";
import { MEMBER_DASH, MEMBER_FAIL, MEMBER_GET, MEMBER_LOAD } from "../constants/member";


export const getMember=()=>async (dispatch) =>{
    dispatch({type:MEMBER_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.get("/api/user/membership",config);
    dispatch({type:MEMBER_GET,payload: result.data});
    
    } catch (error) {
        dispatch({type:MEMBER_FAIL,payload: error.response.data});  
    }
}


export const getMembersDash=(dashid)=>async (dispatch) =>{
    dispatch({type:MEMBER_LOAD});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    console.log("from action",dashid)
    let result = await axios.post("/api/user/membersdash",dashid,config);
    dispatch({type:MEMBER_DASH,payload: result.data});
    
    } catch (error) {
        dispatch({type:MEMBER_FAIL,payload: error.response.data});  
    }
}