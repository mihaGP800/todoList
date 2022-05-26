import {AppRootStateType} from './store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'SUPER-ERROR' as string | null //don't forget to replace to null
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action:
    AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
        case 'APP/SET-ERROR':
            return {...state, ...action.payload}
        default:
            return state
    }
}
export type AppActionsType =
    ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>

// AC
export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', payload: {error}} as const)

//selectors

export const selectStatus = (state: AppRootStateType): RequestStatusType => state.app.status
export const selectError = (state: AppRootStateType): string | null => state.app.error