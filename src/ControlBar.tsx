import React from "react";
import { ControlBtn } from './ControlBtn';
import { myData } from './DataSingleton';

interface Props {}

export const ControlBar: React.FC<Props> = () => {
    let rData = myData.getInstance().controls

    return(
        <table>
            <thead></thead>
            <tbody>
            <tr>
            {rData.map((item) => { 
                return (<td key={item.index}> <ControlBtn label={item.label} color={item.color} onClickCB={item.onClickCB}/> </td>)
            })}
            </tr>
            </tbody>
            <tfoot></tfoot>
        </table>    
    )
}