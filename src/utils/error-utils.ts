import {Dispatch} from 'redux';
import {AppActionsType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';

export const handleServerNetworkError =
    (dispatch: Dispatch<AppActionsType>, message: string) => {
        dispatch(setAppErrorAC(message))
        dispatch(setAppStatusAC('failed'))
    }


export const handleServerAppError =
    <T>(dispatch: Dispatch<AppActionsType>, data: ResponseType<T>) => {
        dispatch(
            setAppErrorAC(data.messages.length ? data.messages[0] : 'same error'))
    }