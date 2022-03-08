import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    oldTitle: string
    callBack:(title:string)=>void
}

export const EditableSpan: React.FC<EditableSpanType> = ({...props}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        props.callBack(newTitle)
        setEdit(false)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input value={newTitle} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus />
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    );
}