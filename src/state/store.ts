import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;