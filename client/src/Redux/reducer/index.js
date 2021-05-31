import {combineReducers} from "redux"
import userReducer from "./user"
import dashboardReducer from "./dashboard"
import notificationReducer from "./notification"
import memberReducer from "./member"
import taskReducer from "./task"

const rootReducer= combineReducers({userReducer,dashboardReducer,notificationReducer,memberReducer,taskReducer})

export default rootReducer;