import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialized: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => builder
        .addCase(initializeAppTC.fulfilled, state => {
            state.isInitialized = true
        })
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (arg, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    } finally {
        // dispatch(setAppIsInitializedAC({isInitialized: true}))
        return
    }
})



