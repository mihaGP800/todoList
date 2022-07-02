import React, {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from './todolists-reducer'
import {addTaskTC, removeTaskTC, updateTaskTC} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {useNavigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth';
import {selectTasks, selectTodolists} from './selectors';

type PropsType = {
}

export const TodolistsList: React.FC<PropsType> = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistsTC())
        } else navigate('/login')
    }, [isLoggedIn])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(removeTaskTC({taskId, todolistId}))
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC({title, todolistId}))
    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC({taskId, model: {status}, todolistId}))
    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        dispatch(updateTaskTC({taskId, model: {title}, todolistId}))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: value}))
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC({id, title}))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={5}>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]

                return <Todolist key={tl.id}
                                 todolist={tl}
                                 tasks={allTodolistTasks}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 removeTodolist={removeTodolist}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodolistTitle={changeTodolistTitle}/>
            })
            }
        </Grid>
    </>
}
