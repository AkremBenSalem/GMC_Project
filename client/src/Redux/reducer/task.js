import { TASK_CREATE, TASK_DASH, TASK_DELETE, TASK_FAIL, TASK_LOAD, TASK_MANAGER, TASK_STATE, TASK_UPDATE, TASK_VALIDATE, TASK_WORKER } from "../constants/task";


const initialState={
    tasks:[],
    tasksManager:[],
    loading:false,
    errors:null,
};

const taskReducer = (state=initialState,{type, payload}) =>{
    switch (type) {
        case TASK_LOAD:
            return {...state, loading:true};
        case TASK_CREATE:
            return {...state, tasks:payload.Tasks, loading:false}
        case TASK_DASH:
            return {...state, tasks:payload.Tasks, loading:false}
        case TASK_WORKER:
            return {...state, tasks:payload.Tasks, loading:false}
        case TASK_MANAGER:
            return {...state, tasksManager:payload.Tasks, loading:false}
        case TASK_STATE:
            return {...state, tasks:payload.Tasks, loading:false}
        case TASK_UPDATE:
            if(payload.Tasks.sender === "MANAGER"){
                return {...state, tasksManager:payload.Tasks.theTasks,loading:false}   
            }
            else{
                return {...state, tasks:payload.Tasks.theTasks,loading:false}   
            }
        case TASK_VALIDATE:
            if(payload.Tasks.sender === "MANAGER"){
                return {...state, tasksManager:payload.Tasks.theTasks,loading:false}   
            }
            else{
                return {...state, tasks:payload.Tasks.theTasks,loading:false}   
            }
        case TASK_DELETE:
            if(payload.Tasks.sender === "MANAGER"){
                return {...state, tasksManager:payload.Tasks.theTasks,loading:false}   
            }
            else{
                return {...state, tasks:payload.Tasks.theTasks,loading:false}   
            }
            
        case TASK_FAIL:
            return {...state, errors: payload, loading:false};
        
    
        default:
            return state;
    }

}

export default taskReducer;
/*const taskSchema = new Schema({
    dashid:[String],//0 => ; 1 => title
    description:{ type: String, required:true},
    managerid:[String],//0 => ; 1 => name
    workerid:[String],//0 => ; 1 => name
    deadLine:{type:Date, required:true},
    state:{ type: String, required:true },
})*/