import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';


// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
// })

export default function configureAppStore(preloadedState?: AppRootStateType) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(thunkMiddleware),
        preloadedState,
        // enhancers: [monitorReducersEnhancer],
    })



    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
    }

    return store
}

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ReturnType<typeof configureAppStore>['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
// window.store = store;
