import axios from "axios";
import { CURRENT_USER, FAIL_USER, LOAD_USER,  LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../constants/user";



export const register= (user, history)=> async (dispatch)=>{
    dispatch({type:LOAD_USER});
    try {
        let result = await axios.post("/api/user/register",user);
        dispatch({type:REGISTER_USER, payload:result.data});
        history.push("/profile");
    } catch (error) {
        dispatch({type:FAIL_USER,payload: error.response.data});
    }
};



export const login=(user,history)=> async (dispatch)=>{
  dispatch({type:LOAD_USER});
  try {
      let result = await axios.post("/api/user/login",user);
      dispatch({type:LOGIN_USER, payload:result.data});
      history.push("/profile")
  } catch (error) {
      dispatch({type:FAIL_USER,payload: error.response.data});
  }
};

export const current=()=>async (dispatch) =>{
    console.log("dispatching current")
    dispatch({type:LOAD_USER});
    try {
    const config={
        headers: {
            authorization:localStorage.getItem("token")
        }
    }
    let result = await axios.get("/api/user/current",config);
    dispatch({type:CURRENT_USER,payload: result.data});  
    } catch (error) {
        dispatch({type:FAIL_USER,payload: error.response.data});  
    }
}





//logout
export const logout=()=>{
    return{
        type:LOGOUT_USER
    }
}