import { configureStore } from "@reduxjs/toolkit";
import { tempDatareducer } from "../slice/TempData";


export const store=configureStore({
    reducer:{
        tempdata:tempDatareducer,
    }
})

// console.log(store.getState());