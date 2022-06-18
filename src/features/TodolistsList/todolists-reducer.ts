import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC,} from '../../app/app-reducer'
import {fetchTasksTC} from './tasks-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        // removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
        //     return state.filter(tl => tl.id !== action.payload.id)
        // },
        // addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
        //     state.unshift({
        //         ...action.payload.todolist,
        //         entityStatus: 'idle',
        //         filter: 'all'
        //     })
        // },
        // changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
        //     const {id, title} = action.payload
        //     const index = state.findIndex(tl => tl.id === id)
        //     state[index].title = title
        // },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const {id, filter} = action.payload
            const index = state.findIndex(tl => tl.id === id)
            state[index].filter = filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const {id, status} = action.payload
            const index = state.findIndex(tl => tl.id === id)
            state[index].entityStatus = status
        },
        resetTodolistsAC(state, action: PayloadAction) {
            return []
        },
    },
    extraReducers: builder => builder
        .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists
                .map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        .addCase(removeTodolistTC.fulfilled, (state, action) => {
            return state.filter(tl => tl.id !== action.payload.id)
        })
        .addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({
                ...action.payload.todolist,
                entityStatus: 'idle',
                filter: 'all'
            })
        })
        .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const {id, title} = action.payload
            const index = state.findIndex(tl => tl.id === id)
            state[index].title = title
        })
})


export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC, changeTodolistEntityStatusAC, resetTodolistsAC
} = slice.actions

// thunks

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (arg, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        // dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))

        const todos = await res.data
        todos.forEach(todo => dispatch(fetchTasksTC(todo.id)))
        console.log(res.data)
        return {todolists: res.data}

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: todolistId}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',
    async (arg: { id: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await todolistsAPI.updateTodolist(arg.id, arg.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return arg
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({})
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({})
        }
    })

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
