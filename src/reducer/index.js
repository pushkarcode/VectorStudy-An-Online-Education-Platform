import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice"
import profileSlice from "../slice/profileSlice";
import cartSlice from "../slice/cartSlice";

const rootReducer = combineReducers({
   auth: authReducer,
   profile:profileSlice,
   cart:cartSlice
    
})

export default rootReducer;

