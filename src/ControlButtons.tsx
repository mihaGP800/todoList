import React from 'react';
import {FilterValuesType} from "./App";

type ControlButtonsType = {
    changeFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
}

const ControlButtons = (props: ControlButtonsType) => {

    const onclickSetFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <button
                className={props.filter === 'all' ? 'button-active' : 'button-passive'}
                onClick={onclickSetFilter("all")}>All
            </button>
            <button
                className={props.filter === 'active' ? 'button-active' : 'button-passive'}
                onClick={onclickSetFilter("active")}>Active
            </button>
            <button
                className={props.filter === 'completed' ? 'button-active' : 'button-passive'}
                onClick={onclickSetFilter("completed")}>Completed
            </button>
        </div>
    );
};

export default ControlButtons;