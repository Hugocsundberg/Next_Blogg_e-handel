import React from "react";
import styled from "styled-components";
import { boxShadowBigElement, margin, rem, screenSizes } from "../styles/globalStyleVariables";

const BackGround = styled.div`
    background: white;
    box-shadow: ${boxShadowBigElement};
    border-radius: 35px;
    margin-right: ${margin}rem;
    margin-left: ${margin}rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    padding: .7rem;
    gap: 0rem;
    @media (min-width: ${screenSizes.S}px) {
        gap: 1rem;
        flex-direction: row;
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

export const Message = ({imageLink, message}: {imageLink:string, message:string}) => {

    return (
        <BackGround>
            <Image src={imageLink}/>
            <p>{message}</p>
        </BackGround>   
    )
}