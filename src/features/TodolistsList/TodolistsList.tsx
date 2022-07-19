import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType, useAppSelector} from '../../app/store'
import {
    addTodolist, changeTodolist,
    changeTodolistFilterAC, fetchTodolists,
    FilterValuesType, removeTodolist,
    TodolistDomainType
} from './todolists-reducer'
import {addTask, removeTask, TasksStateType, updateTask} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {useNavigate} from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolists())
        } else navigate('/login')
    }, [isLoggedIn])

    const removeTaskHandle = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTask(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTaskHandle = useCallback(function (title: string, todolistId: string) {
        const thunk = addTask(title, todolistId)
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTask(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTask(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const removeTodolistHandle = useCallback(function (id: string) {
        const thunk = removeTodolist(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolist(id, title)
        dispatch(thunk)
    }, [])

    const addTodolistHandle = useCallback((title: string) => {
        dispatch(addTodolist(title))
    }, [dispatch])


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistHandle}/>
        </Grid>
        <Grid container spacing={3} style={{flexDirection: 'row'}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px', width: '300px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTaskHandle}
                                changeFilter={changeFilter}
                                addTask={addTaskHandle}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolistHandle}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
