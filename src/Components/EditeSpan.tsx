import React, {useState, KeyboardEvent, ChangeEvent} from 'react';

type EditeSpanType = {
    title: string
    editeTask: (newTitle: string)=>void
}

export const EditeSpan: React.FC<EditeSpanType> = ({title,editeTask}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle,setNewTitle] = useState(title)

    const onBlur = () => {
        setEdit(false)
        editeTask(newTitle)
    }

    const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && setEdit(false)
        editeTask(newTitle)
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClick = () => {
        setEdit(true)
    }
    return (
        edit
            ? <input value={newTitle} onChange={onChange} onBlur={onBlur} autoFocus onKeyPress={onKeyPress}/>
            : <span onDoubleClick={onDoubleClick}>{title}</span>
    );
}