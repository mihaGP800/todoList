import {ResponseType, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
// import {fetchTasksTC} from './tasks-reducer';
import {fetchTasks} from './tasks-reducer';
import {call, put, takeEvery} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodosActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {
                ...tl,
                title: action.title
            } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {
                ...tl,
                filter: action.filter
            } : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {
                ...tl,
                entityStatus: action.status
            } : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        case 'RESET-TODOLISTS':
            return state = initialState
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const)
export const resetTodolistsAC = () => ({type: 'RESET-TODOLISTS'} as const)


// sagas
export function* fetchTodolistsWorkerSaga() {
    yield put(setAppStatusAC('loading'))

    const res: AxiosResponse<TodolistType[]> = yield call(todolistsAPI.getTodolists)
    yield put(setTodolistsAC(res.data))
    yield put(setAppStatusAC('succeeded'))

    const todos: TodolistType[] = yield res.data
    for (let i = 0; i < todos.length; i++) {
        yield put(fetchTasks(todos[i].id))
    }
}

export const fetchTodolists = () => ({type: 'TODOLIST/FETCH-TODOLISTS'})

export function* removeTodolistWorkerSaga(action: ReturnType<typeof removeTodolist>) {
    const {todolistId} = action

    yield put(setAppStatusAC('loading'))
    yield put(changeTodolistEntityStatusAC(todolistId, 'loading'))
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTodolist, todolistId)
    yield put(removeTodolistAC(todolistId))
    yield put(setAppStatusAC('succeeded'))
}

export const removeTodolist = (todolistId: string) =>
    ({type: 'TODOLIST/REMOVE-TODOLIST', todolistId} as const)

export function* addTodolistWorkerSaga(action: ReturnType<typeof addTodolist>) {
    const {title} = action

    yield put(setAppStatusAC('loading'))
    const res: AxiosResponse<ResponseType<{ item: TodolistType }>> = yield call(todolistsAPI.createTodolist, title)
    yield put(addTodolistAC(res.data.data.item))
    yield put(setAppStatusAC('succeeded'))
}

export const addTodolist = (title: string) =>
    ({type: 'TODOLIST/ADD-TODOLIST', title} as const)

export function* changeTodolistTitleWorkerSaga({id, title}: ReturnType<typeof changeTodolist>) {
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.updateTodolist, id, title)
    yield put(changeTodolistTitleAC(id, title))
}

export const changeTodolist = (id: string, title: string) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST', id, title} as const)

export function* todolistsWatcher() {
    yield takeEvery('TODOLIST/FETCH-TODOLISTS', fetchTodolistsWorkerSaga)
    yield takeEvery('TODOLIST/REMOVE-TODOLIST', removeTodolistWorkerSaga)
    yield takeEvery('TODOLIST/ADD-TODOLIST', addTodolistWorkerSaga)
    yield takeEvery('TODOLIST/CHANGE-TODOLIST', changeTodolistTitleWorkerSaga)
}

// thunks
// export const fetchTodolistsTC = (): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     const res = await todolistsAPI.getTodolists()
//     dispatch(setTodolistsAC(res.data))
//     dispatch(setAppStatusAC('succeeded'))
//
//     const todos = await res.data
//     // @ts-ignore
//     todos.forEach(todo => dispatch(fetchTasks(todo.id)))
// }
// export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
//     //изменим глобальный статус приложения, чтобы вверху полоса побежала
//     dispatch(setAppStatusAC('loading'))
//     //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
//     dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
//     const res = await todolistsAPI.deleteTodolist(todolistId)
//     dispatch(removeTodolistAC(todolistId))
//     //скажем глобально приложению, что асинхронная операция завершена
//     dispatch(setAppStatusAC('succeeded'))
// }
// export const addTodolistTC = (title: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     const res = await todolistsAPI.createTodolist(title)
//     dispatch(addTodolistAC(res.data.data.item))
//     dispatch(setAppStatusAC('succeeded'))
// }
// export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
//     const res = await todolistsAPI.updateTodolist(id, title)
//     dispatch(changeTodolistTitleAC(id, title))
// }

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ResetTodolistsActionType = ReturnType<typeof resetTodolistsAC>;

export type TodosActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ResetTodolistsActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
