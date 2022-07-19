import {
    fetchTasksWorkerSaga, removeTaskWorkerSaga,
    TasksActionsType,
    tasksReducer, tasksWatcher
} from '../features/TodolistsList/tasks-reducer';
import {
    TodosActionsType,
    todolistsReducer, todolistsWatcher
} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {
    AppActionsType,
    appReducer,
    appWatcher,
    initializeAppWorkerSaga
} from './app-reducer'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AuthActionsType, authReducer, authWatcher} from '../features/Login/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import {all, put, takeEvery} from 'redux-saga/effects'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware)));

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield all([
        appWatcher(),
        tasksWatcher(),
        todolistsWatcher(),
        authWatcher()
    ])
}

// function* rootWorker() {
//     alert('rootWorker')
// }
// setTimeout(() => {
//     // @ts-ignore
//     store.dispatch({type: 'ACTIVATOR-ACTION-TYPE'})
// }, 2000)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


type ProjectActionsType =
    TodosActionsType
    | TasksActionsType
    | AppActionsType
    | AuthActionsType


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    ProjectActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
