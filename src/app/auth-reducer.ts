import {AppRootStateType, AppThunk} from './store';
import {authAPI, LoginDataType} from '../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setAppStatusAC} from './app-reducer';
import {resetTodosAC} from '../features/TodolistsList/todolists-reducer';

const initialState = {
    isAuthenticated: false
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export type SetAuthActionType = ReturnType<typeof setAuthAC>

export type AuthActionsType = SetAuthActionType

// AC
export const setAuthAC = (isAuthenticated: boolean) =>
    ({type: 'AUTH/SET-AUTH', payload: {isAuthenticated}} as const)

// TC
export const setAuthTC = (loginData: LoginDataType): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthAC(true))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => dispatch(setAppStatusAC('succeeded')))
}

export const removeAuthTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthAC(false))
                dispatch(resetTodosAC())
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => dispatch(setAppStatusAC('succeeded')))
}




//selectors

export const selectIsAuthenticated = (state: AppRootStateType): boolean =>
    state.auth.isAuthenticated


