import React from 'react';
import { Background, Button } from '../GlobalElements/ActionButtonElements';
import { darkGray, lightGray, screenSizes } from '../../styles/globalStyleVariables';
import styled from 'styled-components';

const H = styled.p`
    margin: 0.5rem 1rem;
    font-size: 1.8rem;
    color: ${darkGray};
    @media (min-width: ${screenSizes.M}px) {
        margin: 1rem;
    }
`
const P = styled.p`
    margin: 0.5rem 1rem;
    margin-top: 0rem;
    font-weight: bold;
    font-size: 1.8rem;
    color: ${darkGray};
    @media (min-width: ${screenSizes.M}px) {
        margin: 1rem;
    }
`

const ActionButtonCart = ({price, tax, onClick}: {price: number, tax: number, onClick:()=>void}) => {
    return (
        <>
        <Background className="bottomOverlay">
            <H>Total</H>
            <P>{`${price} kr`}</P>
            <Button onClick={onClick} color="white" bgcolor="rgb(245,106,141)">Checka ut med Klarna</Button>
        </Background>
        </>
    );
}

export default ActionButtonCart;
