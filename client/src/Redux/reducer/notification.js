import { NOTIF_ACCEPT, NOTIF_DECLINE, NOTIF_FAIL, NOTIF_GET, NOTIF_LOAD, NOTIF_REMOVE } from "../constants/notification";

const initialState={
    notifications:[],
    loading:false,
    errors:null,
};

const notificationReducer = (state=initialState,{type, payload}) =>{
    switch (type) {
        case NOTIF_LOAD :
            
            return {...state, loading:true}
        //payload : {token , msg , user}
        case NOTIF_GET :
            return {...state, notifications:payload.notifications, loading:false}

        case NOTIF_ACCEPT:
            return {...state , notifications:payload.notifications, loading:false}
        case NOTIF_DECLINE:
            return {...state , notifications:payload.notifications, loading:false}
        case NOTIF_REMOVE:
            return {...state , notifications:payload.notifications, loading:false}         
        case NOTIF_FAIL:
            return {...state, errors: payload, loading:false};
        
    
        default:
            return state;
    }

}

export default notificationReducer;