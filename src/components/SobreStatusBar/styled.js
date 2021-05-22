import styled, { keyframes } from 'styled-components';

const StatusBarArea = styled.div`
    height: 21px;
    width: 70%;
    border: 1px solid #1bff06;
    border-radius:10px;
`;

const progress = keyframes`
    0% {width: 2px;}
    100% {width: calc(${props=>props.percentagem}% / 3)}
`;

const StatusBar = styled.div`
    display:flex;
    align-items:center;
    height: 100%;
    width: calc(${props=>props.percentagem}% / 3);
    background-color:#1bff06;
    border-radius: 10px;
    animation: ${progress} 3s;
`;

const Placeholder = styled.p`
    opacity: 0.5;
    margin-left: 8px;
    color: #000000;
`;

export { StatusBarArea, StatusBar, Placeholder };