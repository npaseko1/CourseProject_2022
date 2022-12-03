import {createSlice} from "@reduxjs/toolkit";
import {TUser} from "../interfaces/interfaces";

interface IState {
    user: null | TUser,
    error: boolean
}

const initialState: IState = {
    user: null,
    error: false
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSuccess: (state, action) => {
            state.user = action.payload;
            state.error = false
        },
        userError: (state) => {
            state.user = null;
            state.error = true
        }
    }
})

export const { userSuccess, userError } = userReducer.actions
export default userReducer.reducer
