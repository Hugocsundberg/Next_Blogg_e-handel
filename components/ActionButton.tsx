import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { blurColor, blurPx, navHeight } from '../styles/globalStyleVariables';
import { Background, Button, Text } from './GlobalElements/ActionButtonElements';

const Spacer = styled.div`
    height: ${navHeight}rem;
    position: relative;
`

const ActionButton = ({ text, onClick }: {text:string, onClick:any}) => {
    return (
        <>
        <Spacer></Spacer>
        <Background onClick={onClick}>
            <Button color="white" bgcolor="black">{text}</Button>
        </Background>
        </>
    );
}

export default ActionButton;
