import React from 'react';
import styled from 'styled-components';
import Image from 'next/dist/client/image';
import { boxShadowBigElement } from '../../styles/globalStyleVariables';
import Link from 'next/dist/client/link';

const Background = styled.div`
    background: white;
    opacity: 0.78;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    box-shadow: ${boxShadowBigElement};
`

const H1 = styled.h1`
`

const P = styled.p`
`

const Span = styled.span`
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
`

const ImageContainer = styled.div`
    height: 200px;
    width: 100%;
    position: relative;
`

const NothingInCart = () => {
    return (
        <Background>
            <H1>Här var det tomt</H1>
            <ImageContainer>
                <Image
                    src="/sadCart.svg"
                    alt="hamburger"
                    layout="fill"
                    objectFit="contain"
                />
            </ImageContainer>
            <Link href='/atelje'><P>Lägg till <Span>konst</Span> så kommer de synas här</P></Link>
        </Background>
    );
}

export default NothingInCart;
