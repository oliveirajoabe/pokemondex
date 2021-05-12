import React from 'react';
import { StatusBarArea, StatusBar } from './styled';

export default ({percentageBar}) =>{
    return (
        <StatusBarArea>
            <StatusBar percentagem={percentageBar}/>
        </StatusBarArea>
    )
}