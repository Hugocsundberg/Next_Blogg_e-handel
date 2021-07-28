import React from 'react';
import { Background, Text, Button } from '../../../components/GlobalElements/ActionButtonElements';
import { darkGray } from '../../../styles/globalStyleVariables';
import styled from 'styled-components';

const H = styled.p`
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 2rem;
    color: ${darkGray};
`
const P = styled.p`
    margin: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: ${darkGray};
`

const ActionButtonCart = ({price, tax}: {price: number, tax: number}) => {
    return (
        <Background>
            <H>Total</H>
            <P>{`${price}SEK`}</P>
            <P>{`(includes ${tax}SEK Tax)`}</P>
            <Button color="black" bgcolor="rgb(245,106,141)">Checka ut med klarna</Button>
        </Background>
    );
}

export default ActionButtonCart;
