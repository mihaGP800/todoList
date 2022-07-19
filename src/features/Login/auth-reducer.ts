import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {authAPI, LoginParamsType, ResponseType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {resetTodolistsAC} from '../TodolistsList/todolists-reducer';
import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosError, AxiosResponse} from 'axios';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// sagas

export function* loginWorkerSaga({data}: ReturnType<typeof login>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType<{ userId: number }>> = yield call(authAPI.login, data)
    try {
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(true))
            yield put(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        handleServerNetworkError(error as AxiosError, yield put)
    }
}

export const login = (data: LoginParamsType) =>
    ({type: 'AUTH/LOGIN', data})

export function* logoutWorkerSaga() {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType> = yield call(authAPI.logout)
    try {
        if (res.data.resultCode === 0) {
            yield put(setIsLoggedInAC(false))
            yield put(setAppStatusAC('succeeded'))
            yield put(resetTodolistsAC())
        } else {
            handleServerAppError(res.data, yield put)
        }
    } catch (error) {
        handleServerNetworkError(error as AxiosError, yield put)
    }
}

export const logout = () => ({type: 'AUTH/LOGOUT'})

export function* authWatcher() {
    yield takeEvery('AUTH/LOGIN', loginWorkerSaga)
    yield takeEvery('AUTH/LOGOUT', logoutWorkerSaga)
}

// thunks
// export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     const res = await authAPI.login(data)
//     try {
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         handleServerNetworkError(error as AxiosError, dispatch)
//     }
// }
// export const logoutTC = (): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     const res = await authAPI.logout()
//     try {
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC(false))
//             dispatch(setAppStatusAC('succeeded'))
//             dispatch(resetTodolistsAC())
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         handleServerNetworkError(error as AxiosError, dispatch)
//     }
// }

// types
export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
