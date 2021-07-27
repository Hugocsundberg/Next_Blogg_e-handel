import React from 'react';
import styled from 'styled-components';
import { margin } from '../styles/globalStyleVariables';

const Background = styled.div<{right:boolean, fadeOut:boolean}>`
    opacity: ${(props) => props.fadeOut ? 0 : 0.3 };
    pointer-events: ${(props) => props.fadeOut ? 'none' : 'all' };;
    transition: .3s;
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
    transform: rotate(${props => props.right ? -90 : 90}deg) translate(${props => props.right ? '-' : '+'}50%, 0);
    z-index: 1000;
    right: ${props => props.right ? '1rem' : `calc(100% - 3rem - 10px)`} ;
    bottom: 50%;
    :hover {
        opacity: 1;
    }
    @media (max-width: 700px) {
        height: 2.8rem;
        width: 2.8rem;
    }
    @media (max-width: 600px) {
        height: 2.4rem;
        width: 2.4rem;
    }
    @media (max-width: 400px) {
        height: 2rem;
        width: 2rem;
    }
`

const Img = styled.img`
height: 50% !important;
width: 50% !important;
transform: translate(-2%, 7.5%);
filter: drop-shadow(0 0 10px #2d2d2db5);
@media (max-width: 768px) {
    visibility: none;
  }
`

const Arrow = ({ right, fadeOut }: { right: boolean, fadeOut:boolean }) => {
    return (
        <Background right={right} fadeOut={fadeOut}>
            <Img src="/chevronDown.svg"/>
        </Background>
    );
}

export default Arrow;
