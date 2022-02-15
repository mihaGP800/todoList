import React from 'react';
import {FilterValuesType} from "./App";

type ControlButtonsType = {
    changeFilter: (filter: FilterValuesType) => void
}

const ControlButtons = (props: ControlButtonsType) => {

    const onclickSetFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <button onClick={onclickSetFilter("all")}>All</button>
            <button onClick={onclickSetFilter("active")}>Active</button>
            <button onClick={onclickSetFilter("completed")}>Completed</button>
        </div>
    );
};

export default ControlButtons;