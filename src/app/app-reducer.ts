import {authAPI, MeResponseType, ResponseType} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {
    handleServerAppError,
    handleServerAppErrorSaga,
    handleServerNetworkError, handleServerNetworkErrorSaga
} from '../utils/error-utils';
import {AxiosError, AxiosResponse} from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => ({
    type: 'APP/IS-INITIALIZED',
    isInitialized
} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


// saga
export function* initializeAppWorkerSaga() {
    yield put(setAppStatusAC('loading'))
    const data: ResponseType<MeResponseType> = yield call(authAPI.me)
    try {
        if (data.resultCode === 0) {
            yield put(setIsLoggedInAC(true));
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield* handleServerAppErrorSaga(data);
        }
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError)
    } finally {
        yield put(setAppIsInitializedAC(true))
    }
}

// action for saga
export const initializeApp = () => ({type: 'APP/INITIALIZED-APP'})

export function* appWatcher() {
    yield takeEvery('APP/INITIALIZED-APP', initializeAppWorkerSaga)
}

// thunk
// export const initializeAppTC = (): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     const res = await authAPI.me()
//     try {
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC(true));
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch);
//         }
//     } catch (error) {
//         handleServerNetworkError(error as AxiosError, dispatch)
//     } finally {
//         dispatch(setAppIsInitializedAC(true))
//     }
// }

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppIsInitializedAC>
