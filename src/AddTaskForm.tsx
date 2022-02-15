import React, {ChangeEvent, useState,KeyboardEvent} from 'react';

type AddTaskFormPropsType = {
    addTask: (title: string) => void
}

const AddTaskForm: React.FC<AddTaskFormPropsType> = ({addTask}) => {
    const [title, setTitle] = useState('')
    const onchangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onclickAddTask = () => {
        addTask(title)
        setTitle('')
    }

    const onkeypressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
      // if(e.key === 'Enter'){
      //     onclickAddTask()
      // }
        e.key === 'Enter' && onclickAddTask()
    }

    return (
        <>
            <input value={title}
                   onChange={onchangeSetTitle}
                   onKeyPress={onkeypressSetTitle}
            />
            <button onClick={onclickAddTask}>+</button>
        </>
    );
};

export default AddTaskForm;