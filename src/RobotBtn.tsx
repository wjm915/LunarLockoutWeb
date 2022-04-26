import React from "react";

interface Props {
    label:string,
    color:string
    onClickCB: () => void,
}


export const RobotBtn: React.FC<Props> = ({label, color, onClickCB}) => {

    return(
            <input className="robotButton" type="button" style={{backgroundColor:color}} value={label} onClick={onClickCB}></input>
    )
}