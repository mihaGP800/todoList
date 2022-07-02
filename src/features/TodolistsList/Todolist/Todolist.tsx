import React, {useCallback} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer'
import {Grid, Paper} from '@mui/material';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

type colorType =
    'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'

export const Todolist = React.memo(function (props: PropsType) {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    // const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    // const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    // const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])

    const onClickButtonFilterHandler = useCallback((buttonFilter: FilterValuesType) => props.changeFilter(buttonFilter, props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const renderButton = (buttonFilter: FilterValuesType, text: string, color: colorType) => {
        return <Button
            variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
            onClick={() => onClickButtonFilterHandler(buttonFilter)}
            color={color}
        >{text}
        </Button>
    }

    return <Grid item style={{width: '350px'}}>
        <Paper style={{width: '100%', padding: '10px', position: "relative"}}>
            <h3><EditableSpan value={props.todolist.title}
                              onChange={changeTodolistTitle}/></h3>
            <IconButton onClick={removeTodolist}
                        size={'small'}
                        disabled={props.todolist.entityStatus === 'loading'}
                        style={{position: "absolute", top: '0', right: '0'}}>
                <Delete/>
            </IconButton>
            <AddItemForm addItem={addTask}
                         disabled={props.todolist.entityStatus === 'loading'}/>
            {tasksForTodolist.map(t => <Task key={t.id} task={t}
                                             todolistId={props.todolist.id}
                                             removeTask={props.removeTask}
                                             changeTaskTitle={props.changeTaskTitle}
                                             changeTaskStatus={props.changeTaskStatus}
            />)}
            {tasksForTodolist.length
                ? <div style={{paddingTop: '10px'}}>
                    {renderButton('all', 'All', 'inherit')}
                    {renderButton('active', 'Active', 'primary')}
                    {renderButton('completed', 'Completed', 'secondary')}
                </div>

                : <span style={{display: 'inline-block', padding: '10px', color: 'grey'}}>no tasks</span>
            }


            {/*<Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}*/}
            {/*        onClick={onAllClickHandler}*/}
            {/*        color={'inherit'}*/}
            {/*>All*/}
            {/*</Button>*/}
            {/*<Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}*/}
            {/*        onClick={onActiveClickHandler}*/}
            {/*        color={'primary'}>Active*/}
            {/*</Button>*/}
            {/*<Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}*/}
            {/*        onClick={onCompletedClickHandler}*/}
            {/*        color={'secondary'}>Completed*/}
            {/*</Button>*/}
        </Paper>
    </Grid>
})


