import React from 'react';
import Task from "./Task";
import {TaskType} from "./TodoList";

type TasksListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
}

const TasksList = (props: TasksListPropsType) => {
    const tasksComponentsList = props.tasks.map(task => {
        return (
            <Task
                key={task.id}
                {...task}
                removeTask={props.removeTask}
            />
        )
    })

    return (
        <>
            <ul>
                {/*{props.tasks.map(task => <Task {...task}/>)}*/}

                {tasksComponentsList}

                {/*<Task {...props.tasks[0]} />*/}
                {/*<Task {...props.tasks[1]} />*/}
                {/*<Task {...props.tasks[2]} />*/}
            </ul>

        </>
    );
};

export default TasksList;