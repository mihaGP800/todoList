import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../features/Auth/auth-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;
