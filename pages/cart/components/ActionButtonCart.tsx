import React from 'react';
import { Background, Button } from '../../../components/GlobalElements/ActionButtonElements';
import { darkGray, lightGray, screenSizes } from '../../../styles/globalStyleVariables';
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
    font-size: 1.2rem;
    color: ${darkGray};
    @media (min-width: ${screenSizes.M}px) {
        margin: 1rem;
    }
`
const PTax = styled.p`
    margin: 0.5rem 1rem;
    margin-bottom: 0rem;
    font-size: 0.8rem;
    color: ${lightGray};
    @media (min-width: ${screenSizes.M}px) {
        margin: 1rem;
    }
`

const ActionButtonCart = ({price, tax}: {price: number, tax: number}) => {
    return (
        <>
        <Background className="bottomOverlay">
            <H>Total</H>
            <P>{`${price} SEK`}</P>
            <PTax>{`(includes ${tax} SEK Tax)`}</PTax>
            <Button color="white" bgcolor="rgb(245,106,141)">Checka ut med klarna</Button>
        </Background>
        </>
    );
}

export default ActionButtonCart;
