import React from "react";

interface Props {
    id: number,
    label:string,
    color:string
    onClickCB: () => void,
}


export const GameBoardBtn: React.FC<Props> = ({id, label, color, onClickCB}) => {
    return(
            <input id={"tile_"+id.toString()} 
                   className="gameBoardButton"
                   type="button"
                   style={{backgroundColor:color}}
                   value={label}
                   onClick={onClickCB}>
            </input>
    )
}