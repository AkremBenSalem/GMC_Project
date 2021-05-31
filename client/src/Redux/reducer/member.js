import { MEMBER_GET, MEMBER_LOAD, MEMBER_FAIL, MEMBER_DASH } from "../constants/member";

const initialState={
    member:[],
    loading:false,
    errors:null,
};

const memberReducer = (state=initialState,{type, payload}) =>{
    switch (type) {
        case MEMBER_LOAD :
            return {...state, loading:true}
        //payload : {token , msg , user}
        case MEMBER_GET :
            return {...state, member:payload.membership, loading:false}
        case MEMBER_DASH :
            return {...state, member:payload.membership, loading:false}
        case MEMBER_FAIL:
            return {...state, errors: payload, loading:false};

        default:
            return state;
    }

}

export default memberReducer;