import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { blurColor, blurPx, navHeight } from '../styles/globalStyleVariables';
import { Background, Button, Text } from './GlobalElements/ActionButtonElements';

const Spacer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;   
    bottom: 0;
    opacity: 0;
`

const ActionButton = ({ spacer = true, text, onClick }: {spacer?: boolean, text:string, onClick:any}) => {
    return (
        <>
        {spacer ? 
        <Spacer>
            <Button color="white" bgcolor="black">S</Button>
        </Spacer>
        : ''}
        <Background className="bottomOverlay" onClick={onClick}>
            <Button color="white" bgcolor="black">{text}</Button>
        </Background>
        </>
    );
}

export default ActionButton;
