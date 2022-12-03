import {IGetUser} from "../interfaces/interfaces";
import fetchWrapper from "../helpers/fetchWrapper";
import {userError, userSuccess} from "./userReducer";

export const storageUserRequest = (action: {id: string}) => {
    return (dispatch: any) => {
        fetchWrapper.post<{id: string}>('current', {id: action.id})
            .then(resp => dispatch(userSuccess(resp.user)))
    }
}

export const userRequest = (action: IGetUser) => {
    return (dispatch: any) => {
        fetchWrapper.post<IGetUser>('authorization',
            {login: action.login, password: action.password}
        )
            .then(resp => {
                localStorage.setItem('user', resp.user.id)
                dispatch(userSuccess(resp.user))
            })
            .catch(() => dispatch(userError()))
    }
}

