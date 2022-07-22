import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    ResetTodolistsActionType,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    GetTasksResponse, ResponseType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType, AppThunk} from '../../app/store'
import {
    initializeAppWorkerSaga,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {
    handleServerAppError, handleServerAppErrorSaga,
    handleServerNetworkError,
    handleServerNetworkErrorSaga
} from '../../utils/error-utils'
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {AxiosError, AxiosResponse} from 'axios';

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'RESET-TODOLISTS':
            return state = initialState
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

//sagas
export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<GetTasksResponse> = yield call(todolistsAPI.getTasks, action.todolistId)
    const tasks = res.data.items
    yield put(setTasksAC(tasks, action.todolistId))
    yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistId: string) =>
    ({type: 'TASKS/FETCH-TASKS', todolistId} as const)

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    const {taskId, todolistId} = action
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTask, todolistId, taskId)
    yield put(removeTaskAC(taskId, todolistId))
}

export const removeTask = (taskId: string, todolistId: string) =>
    ({type: 'TASKS/REMOVE-TASKS', taskId, todolistId} as const)

export function* addTaskWorkerSaga(action: ReturnType<typeof addTask>) {
    const {title, todolistId} = action
    yield put(setAppStatusAC('loading'))
    const data: ResponseType<{ item: TaskType }> = yield call(todolistsAPI.createTask, todolistId, title)
    try {
        if (data.resultCode === 0) {
            yield put(addTaskAC(data.data.item))
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield* handleServerAppErrorSaga(data);
        }
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError)
    }
}

export const addTask = (title: string, todolistId: string) =>
    ({type: 'TASKS/ADD-TASK', title, todolistId} as const)

export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {
    const {taskId, todolistId, domainModel} = action

    const state: AppRootStateType = yield select()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        console.warn('task not found in the state')
        return
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }

    const data: ResponseType<{ item: TaskType }> = yield call(todolistsAPI.updateTask, todolistId, taskId, apiModel)
    try {
        if (data.resultCode === 0) {
            yield put(updateTaskAC(taskId, domainModel, todolistId))
        } else {
            yield* handleServerAppErrorSaga(data);
        }
    } catch (error) {
        yield* handleServerNetworkErrorSaga(error as AxiosError)
    }
}

export const updateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'TASKS/UPDATE-TASK', taskId, todolistId, domainModel} as const)

export function* tasksWatcher() {
    yield takeEvery('TASKS/FETCH-TASKS', fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASKS', removeTaskWorkerSaga)
    yield takeEvery('TASKS/ADD-TASK', addTaskWorkerSaga)
    yield takeEvery('TASKS/UPDATE-TASK', updateTaskWorkerSaga)
}

// thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionsType | SetAppStatusActionType>) => {
//     dispatch(setAppStatusAC('loading'))
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             const tasks = res.data.items
//             dispatch(setTasksAC(tasks, todolistId))
//             dispatch(setAppStatusAC('succeeded'))
//         })
// }
// export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<TasksActionsType>) => {
//     todolistsAPI.deleteTask(todolistId, taskId)
//         .then(res => {
//             const action = removeTaskAC(taskId, todolistId)
//             dispatch(action)
//         })
// }
// export const addTaskTC = (title: string, todolistId: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     const res = await todolistsAPI.createTask(todolistId, title)
//     try {
//         if (res.data.resultCode === 0) {
//             const task = res.data.data.item
//             const action = addTaskAC(task)
//             dispatch(action)
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(res.data, dispatch);
//         }
//     } catch (error) {
//         handleServerNetworkError(error as AxiosError, dispatch)
//     }
// }
// export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
//     async (dispatch, getState) => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             //throw new Error("task not found in the state");
//             console.warn('task not found in the state')
//             return
//         }
//
//         const apiModel: UpdateTaskModelType = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             title: task.title,
//             status: task.status,
//             ...domainModel
//         }
//
//         const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
//         try {
//             if (res.data.resultCode === 0) {
//                 const action = updateTaskAC(taskId, domainModel, todolistId)
//                 dispatch(action)
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         } catch (error) {
//             handleServerNetworkError(error as AxiosError, dispatch);
//         }
//     }

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
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ResetTodolistsActionType


type ThunkDispatch = Dispatch<TasksActionsType | SetAppStatusActionType | SetAppErrorActionType>
