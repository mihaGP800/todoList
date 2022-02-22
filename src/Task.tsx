import React, {ChangeEvent} from 'react';
import {TaskType} from "./TodoList";


// type TaskPropsType = {
//     id: number
//     title: string
//     isDone: boolean
// }
type TaskPropsType = TaskType & {
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

const Task = (props: TaskPropsType) => {
    const taskClass = `task ${props.isDone ? 'task-completed' : ''}`          //className: string

    // const classes  = ['task']
    // if(props.isDone) {
    //     classes.push('task-completed')
    // }

    const onClick = () => props.removeTask(props.id);

    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.id, e.currentTarget.checked)

    return (
        <li>
            <input type="checkbox" checked={props.isDone} onChange={onChangeChecked}/>
            <span className={taskClass}>{props.title}</span>
            <button onClick={onClick}>x</button>
        </li>
    );
};

export default Task;