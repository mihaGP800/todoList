import {AppRootStateType} from './store';

export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized;
export const selectStatus = (state: AppRootStateType) => state.app.status;