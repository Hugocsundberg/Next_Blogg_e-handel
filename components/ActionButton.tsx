import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { blurColor, blurPx, navHeight } from '../styles/globalStyleVariables';

const Background = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0px;
    height: ${navHeight}rem;
    background: ${blurColor};
    backdrop-filter: blur(${blurPx}px);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.25);
`

const Button = styled.button`
    border-radius: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;
    --webkit-appearance: none;
    height: 2.5rem;
    font-weight: normal;
    background: black;
    color: white;
    cursor: pointer;

`

const Text = styled.p`

`

const Spacer = styled.div`
    height: ${navHeight}rem;
    position: relative;
`

const ActionButton = ({ text, onClick }: {text:string, onClick:any}) => {
    return (
        <>
        <Spacer></Spacer>
        <Background onClick={onClick}>
            <Button>{text}</Button>
        </Background>
        </>
    );
}

export default ActionButton;
