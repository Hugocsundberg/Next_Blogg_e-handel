import React from "react";
import styled from "styled-components";
import { boxShadowBigElement, margin, rem, screenSizes } from "../styles/globalStyleVariables";

const BackGround = styled.div<{left?:boolean}>`
    background: white;
    box-shadow: ${boxShadowBigElement};
    border-radius: 35px;
    margin-right: ${margin}rem;
    margin-left: ${margin}rem;
    margin-bottom: 1rem;
    display: flex;
    max-width: 800px;
    position: relative;
    left: 0;
    transform: translate(0);
    flex-direction: column;
    padding: .7rem;
    gap: 0rem;
    transition: .7s;
    @media (min-width: ${screenSizes.S}px) {
        gap: 1rem;
        flex-direction: row;
    }
    @media (min-width: 854px) {
        left: ${props=>props.left ? 0 : '50%'};
        transform: ${props=>props.left ? 'translate(0)' : 'translate(-50%)'};
        margin-right: 0;
        margin-left: ${props=>props.left ? `${margin}rem` : 0};
    }
`

const Image = styled.img`
    border-radius: 25px;
    height: 4rem;
    min-width: 4rem;
    max-width: 4rem;
    object-fit: cover;
`

const P = styled.p`

`

export const Message = ({left, imageLink, message}: {left?:boolean, imageLink:string, message:string}) => {

    return (
        <BackGround left={left}>
            <Image src={imageLink}/>
            <p>{message}</p>
        </BackGround>   
    )
}