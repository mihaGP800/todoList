export {selectTasks, selectTodolists} from './selectors'
export {TodolistsList} from './TodolistsList'
export {
    // addTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC,
    // resetTodolistsAC,
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
} from './todolists-reducer'

export type {FilterValuesType, TodolistDomainType} from './todolists-reducer'

export {
    addTaskTC, removeTaskTC, fetchTasksTC, updateTaskTC
} from './tasks-reducer'
export type {TasksStateType, UpdateDomainTaskModelType} from './tasks-reducer'
