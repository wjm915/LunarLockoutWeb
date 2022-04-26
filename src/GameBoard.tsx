import React from "react";
import { myData } from './DataSingleton';
import { buttonInterface } from './ButtonInterface'
import { GameBoardBtn } from './GameBoardBtn'

let gbData = myData.getInstance().gameBoard

interface Props {}

const buildRow = (r: buttonInterface[]) => {
    return(r.map((item) => {return(<td key={item.index} >
                                        <GameBoardBtn id={item.index}
                                            label={item.label} 
                                            color={item.color} 
                                            onClickCB={item.onClickCB}/>
                                    </td>)}))
} 

export const GameBoard: React.FC<Props> = () => {
    return (
        <table>
            <thead></thead>

            <tbody>
                {gbData.map((r, index) => {return(<tr key={index*73}>{buildRow(r)}</tr>)})}
            </tbody>

            <tfoot></tfoot>
        </table>    
    )
}
