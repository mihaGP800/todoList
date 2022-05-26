import {setErrorAC, setStatusAC} from '../app/app-reducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolists-api';

export const handleServerAppError =<T> (dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setErrorAC(data.messages.length
        ? data.messages[0]
        : 'Some error occurred'))
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setErrorAC(message))
    dispatch(setStatusAC('idle'))
}