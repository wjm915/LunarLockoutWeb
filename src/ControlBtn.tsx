import React from "react";

interface Props {
    label:string,
    color:string
    onClickCB: () => void,
}


export const ControlBtn: React.FC<Props> = ({label, color, onClickCB}) => {

    return(
            <input className="controlButton" type="button" style={{backgroundColor:color}} value={label} onClick={onClickCB}></input>
    )
}