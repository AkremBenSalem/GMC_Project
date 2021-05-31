import { CURRENT_USER, FAIL_USER, LOAD_USER, LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "../constants/user";

const initialState={
    user:{},
    errors:null,
    isAuth:false,
    load:false,
};

const userReducer = (state=initialState,{type, payload}) =>{
    switch (type) {
        case LOAD_USER:
            return {...state, load:true}
        //payload : {token , msg , user}
        case REGISTER_USER:
            localStorage.setItem("token",payload.token);
            return{...state, user:payload.user, load:false, isAuth:true};
        case LOGIN_USER:
            localStorage.setItem("token",payload.token);
            return{...state, user:payload.user, load:false, isAuth:true};
        case CURRENT_USER:
            return {...state, user:payload.user, isAuth : true, load:false};
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return {...state, user:{}, isAuth:false};
        case FAIL_USER:
            return {...state, errors: payload, load:false};
        
    
        default:
            return state;
    }

}

export default userReducer;