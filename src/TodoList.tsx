import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";
import ControlButtons from "./ControlButtons";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <AddTaskForm addTask={props.addTask}/>
            <TasksList tasks={props.tasks} removeTask={props.removeTask}
                // changeFilter={props.changeFilter}
            />
            <ControlButtons changeFilter={props.changeFilter}/>
            {/*<div>*/}
            {/*    <input/>*/}
            {/*    <button>+</button>*/}
            {/*</div>*/}
            {/*<h3>{props.title}</h3>*/}
            {/*<ul>*/}
            {/*    <Task {...props.tasks[0]} />*/}
            {/*    <Task {...props.tasks[1]} />*/}
            {/*    <Task {...props.tasks[2]} />*/}
            {/*<Task*/}
            {/*    id={props.tasks[0].id}*/}
            {/*    title={props.tasks[0].title}*/}
            {/*    isDone={props.tasks[0].isDone}*/}
            {/*/>*/}
            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            {/*</ul>*/}
            {/*<div>*/}
            {/*    <button>All</button>*/}
            {/*    <button>Active</button>*/}
            {/*    <button>Completed</button>*/}
            {/*</div>*/}
        </div>
    );
};

export default TodoList;