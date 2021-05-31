import { DASH_ADD, DASH_CREATE, DASH_DELETE, DASH_FAIL, DASH_INFO, DASH_LEAVE, DASH_LOAD,DASH_LOADING, DASH_REMOVE_MEMBER } from "../constants/dashboard";


const initialState={
    title:"",
    creator:"",
    members:[],
    dashID:"",
    errors:null,
    loading:false,
};

const dashboardReducer = (state=initialState,{type, payload}) =>{
    switch (type) {
        case DASH_LOADING:
            return {...state, loading: true};
        case DASH_CREATE:
            return{...state,title:payload.dashboard.title, creator:payload.dashboard.creator, members:payload.dashboard.members, dashid:payload.dashboard._id,loading:false};
        case DASH_LOAD:
            return{...state,title:payload.dashboard.title, creator:payload.dashboard.creator, members:payload.dashboard.members, dashID:payload.dashboard._id,loading:false};
        case DASH_INFO:
            return{...state,title:payload.dashboard.title, creator:payload.dashboard.creator, members:payload.dashboard.members, dashID:payload.dashboard._id,loading:false};    
        case DASH_ADD:
            return {...state, loading: false};
        case DASH_LEAVE:
            return {...state, loading: false};
        case DASH_DELETE:
            return {...state, loading: false};
        case    DASH_REMOVE_MEMBER:
            return {...state, members:payload.dashboard.members, loading: false};
        case DASH_FAIL:
            return {...state, errors: payload};
        default:
            return state;
    }

}

export default dashboardReducer;