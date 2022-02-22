import React from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";
import ControlButtons from "./ControlButtons";
import {FilterValuesType} from "./App";


type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean) => void

}

const TasksList = (props: TasksListPropsType) => {
    const tasksComponentsList = props.tasks.map(task => {
        return (
            <Task
                key={task.id}
                {...task}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
        )
    })
    const tasksList = tasksComponentsList.length
        ? <ul className='taskList'>{tasksComponentsList}</ul>
        : <div className='emptymessage'>{props.filter} tasksList is empty</div>

    return (
        <>
            {tasksList}
            <ControlButtons changeFilter={props.changeFilter} filter={props.filter}/>
        </>

    );
};

export default TasksList;