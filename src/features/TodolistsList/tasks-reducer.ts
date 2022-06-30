import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from './todolists-reducer'
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {AppRootStateType} from '../../app'
import {setAppStatusAC,} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
    }
})

export const tasksReducer = slice.reducer

// thunks

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    const res = await todolistsAPI.getTasks(todolistId);
    const tasks = res.data.items
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks, todolistId}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask',
    async (param: { taskId: string, todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {...param}
    })

export const addTaskTC = createAsyncThunk('tasks/addTask', async (arg: { title: string, todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(arg.todolistId, arg.title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return task
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (arg: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, {
    dispatch,
    getState, rejectWithValue
}) => {
    const {taskId, model, todolistId} = arg
    const state = getState() as AppRootStateType
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        // console.warn('task not found in the state')
        return rejectWithValue({})
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...model
    }

    try {
        const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
        if (res.data.resultCode === 0) {
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue({})
    }
})

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
