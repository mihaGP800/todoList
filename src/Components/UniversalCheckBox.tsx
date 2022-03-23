import React, {ChangeEvent} from 'react';

type UniversalCheckBoxType = {
    callBack: (eventValue: boolean) => void
    isDone:boolean
}

export const UniversalCheckBox: React.FC<UniversalCheckBoxType> = ({callBack,isDone, ...props}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked);
    }
    return (
        <div>
            <input type="checkbox" onChange={onChangeHandler} checked={isDone}/>
        </div>
    );
}