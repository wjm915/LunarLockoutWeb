import React from "react";
import { RobotBtn } from './RobotBtn';
import { myData } from './DataSingleton';

interface Props {}

export const RobotBar: React.FC<Props> = () => {
    let rData = myData.getInstance().robots

    return(
        <table>
            <thead></thead>
            <tbody>
            <tr>
            {rData.map((item) => { 
                return (<td key={item.index}> <RobotBtn label={item.label} color={item.color} onClickCB={item.onClickCB}/> </td>)
            })}
            </tr>
            </tbody>
            <tfoot></tfoot>
        </table>    
    )
}