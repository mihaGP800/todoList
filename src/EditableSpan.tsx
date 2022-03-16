import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?
        // <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} id="standard-basic" label="edit task" variant="standard" />
        : <span onDoubleClick={activateEditMode} title={'do double click for edit'}>{props.value}</span>
}
