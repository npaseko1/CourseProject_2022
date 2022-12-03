import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import userReducer from "./userReducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>