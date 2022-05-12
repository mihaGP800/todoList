import {AppRootStateType} from './store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
        case 'APP/SET-ERROR':
            // return {...state, status: action.payload.status}
            return {...state, ...action.payload}
        default:
            return state
    }
}
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

export type AppActionsType = setAppStatusACType | setAppErrorACType

//AC

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}} as const)

export const setAppErrorAC = (error: ErrorType) =>
    ({type: 'APP/SET-ERROR', payload: {error}} as const)

//selectors

export const selectStatus = (state: AppRootStateType): RequestStatusType => state.app.status
export const selectError = (state: AppRootStateType): ErrorType => state.app.error