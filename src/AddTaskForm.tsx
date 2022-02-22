import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddTaskFormPropsType = {
    addTask: (title: string) => void
}

const AddTaskForm: React.FC<AddTaskFormPropsType> = ({addTask}) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onchangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onclickAddTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            addTask(trimTitle)

        }else {
            setError(true)
        }
        setTitle('')

    }

    const onkeypressSetTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        // if(e.key === 'Enter'){
        //     onclickAddTask()
        // }
        e.key === 'Enter' && onclickAddTask()
        setError(false)
    }

    const errorMessage = error ? <div className='errorMessage'>title is require</div> :null
    // const errorMessage = error && <div className='errorMessage'>title is require</div>

    const errorInputClass = error? 'input-error':''
    return (
        <>
            <input value={title}
                   onChange={onchangeSetTitle}
                   onKeyPress={onkeypressSetTitle}
                   className={errorInputClass}
            />
            <button onClick={onclickAddTask}>+</button>
            {errorMessage}
        </>
    );
};

export default AddTaskForm;