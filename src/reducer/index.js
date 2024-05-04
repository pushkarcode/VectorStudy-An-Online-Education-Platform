import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice"

const rootReducer = combineReducers({
   auth: authReducer,
    
})

export default rootReducer;

