import React from 'react';
import { StatusBarArea, StatusBar, Placeholder } from './styled';

export default ({percentageBar}) =>{
    return (
        <StatusBarArea>
            <StatusBar percentagem={percentageBar}>
                <Placeholder>{percentageBar}</Placeholder>
            </StatusBar>
        </StatusBarArea>
    )
}