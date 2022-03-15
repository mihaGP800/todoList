import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {InputBlock} from "./Components/InputBlock";
import {EditeSpan} from "./Components/EditeSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editeTask: (todolistId: string, id: string, newTitle: string) => void
    editTodoListTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const callBackForInputBlock = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    const editeTaskWithIds = (tID: string, newTitle: string) => {
        props.editeTask(props.id, tID, newTitle)
    }

    const editTDHandler = (newTitle: string) => {
      props.editTodoListTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditeSpan title={props.title} editeTask={editTDHandler}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <InputBlock callBack={callBackForInputBlock}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditeSpan title={t.title} editeTask={(newTitle) => editeTaskWithIds(t.id, newTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


