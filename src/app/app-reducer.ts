import {AppRootStateType, AppThunk} from './store';
import {authAPI} from '../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setAuthAC} from './auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isAuthorized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-AUTHORIZED':
            return {...state, ...action}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAuthorizedAC = (isAuthorized: boolean) =>
    ({type: 'APP/SET-AUTHORIZED', isAuthorized} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAuthorizedAC>

// TC

export const setAuthorizedTC = (): AppThunk => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
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
        .finally(() => dispatch(setAuthorizedAC(true)))
}

//selectors
export const selectIsAuthorized = (state: AppRootStateType): boolean =>
    state.app.isAuthorized
