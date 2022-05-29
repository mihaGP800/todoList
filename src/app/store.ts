import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {
    TodosActionsType,
    todolistsReducer
} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {AppActionsType, appReducer} from './app-reducer'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

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
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

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
