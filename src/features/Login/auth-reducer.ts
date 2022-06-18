import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldErr, LoginParamsType, todolistsAPI} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {resetTodolistsAC} from '../TodolistsList/todolists-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, state => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, state => {
                state.isLoggedIn = false
            })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions


// thunks
export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErr> } }>
('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({
                errors: res.data.messages,
                fieldsErrors: res.data.fieldsErrors
            })
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({
            errors: [error.message],
            fieldsErrors: undefined
        })
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(resetTodolistsAC())
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

export const _loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const _logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(resetTodolistsAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



