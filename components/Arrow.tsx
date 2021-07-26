import React from 'react';
import styled from 'styled-components';

const Background = styled.div<{right:boolean}>`
    background: #ffffffbb;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    box-shadow: 0 0 15px -5px #585858d7;
    backdrop-filter:  blur(5px);
    transform: rotate(${props => props.right ? -90 : 90}deg) translate(-50%, 0);
    z-index: 1000;

    right: 10px;
    bottom: 50%;
`

const Img = styled.img`
height: 50%;
width: 50%;
transform: translate(0, 10%);
filter: drop-shadow(0 0 10px #2d2d2db5);
`

const Arrow = ({ right }: { right: boolean }) => {
    return (
        <Background right={right}>
            <Img src="/chevronDown.svg"/>
        </Background>
    );
}

export default Arrow;
