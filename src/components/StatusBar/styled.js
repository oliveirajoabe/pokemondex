import styled from 'styled-components';

const StatusBarArea = styled.div`
    height: 10px;
    width: 200px;
    border: 1px solid #1bff06;
    border-radius:10px;
`;

const StatusBar = styled.div`
    height: 100%;
    width: ${props=>props.percentagem}px;
    background-color:#1bff06;
    border-radius:10px;
`

export { StatusBarArea, StatusBar };