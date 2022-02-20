import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: false},
    ])


    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
        // setTasks([...tasks])
    }

    const addTask = (title: string) => {
        // const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const updatedTasks = [newTask, ...tasks]
        // setTasks(updatedTasks)
        // setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
        if (title !== '') {
            setTasks([{id: v1(), title, isDone: false}, ...tasks])
        }
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilterTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone === true)
            case "active":
                return tasks.filter(t => t.isDone === false)
            default:
                return tasks
        }
    }

    const filteredTasksForRender = getFilterTasksForRender()

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={filteredTasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
            {/*<TodoList title={'What to game'} tasks={tasks_2}/>*/}
            {/*<TodoList title={'What to ride'} tasks={tasks_3}/>*/}
        </div>
    );
}

export default App;
