import React from 'react';
import { Background, Button } from '../GlobalElements/ActionButtonElements';
import { darkGray, screenSizes } from '../../styles/globalStyleVariables';
import styled from 'styled-components';
import { getFromStorage } from '../../functions';

const H = styled.p`
    margin: 0.5rem 1rem;
    font-size: 1.8rem;
    color: ${darkGray};
    @media (min-width: ${screenSizes.L}px) {
        margin: 1rem;
    }
`
const P = styled.p`
    margin: 0.5rem 1rem;
    margin-top: 0rem;
    font-weight: bold;
    font-size: 1.8rem;
    color: ${darkGray};
    @media (min-width: ${screenSizes.L}px) {
        margin: 1rem;
    }
`

const FlexDiv = styled.div`
    display: flex;
    align-items: center; 
    gap: .5rem;
    height: 2rem;
    margin: 0 1rem;
    `

const Input = styled.input`
    height: 2rem;
    `

const FlexColDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin-bottom: .5rem;
    @media (min-width: ${screenSizes.L}px) {
        align-items: flex-start; 
    }
`


const ActionButtonCart = ({price, deliveryActivate, deliveryDeactivate, delivery, deliveryPrice, onClick}: {deliveryPrice:number, deliveryDeactivate:()=>void, deliveryActivate:()=>void, price: number,  delivery:number, setDelivery:React.Dispatch<React.SetStateAction<number>>, tax: number, onClick:()=>void}) => {
    
    return (
        <>
        <Background className="bottomOverlay">
            <FlexColDiv>
                <FlexDiv>
                    <p><b>Hämta upp</b> <i>Gratis</i></p>
                    <Input checked={!delivery ? true : false} type='radio' name="delivery" onChange={deliveryDeactivate}/>
                </FlexDiv>
                <FlexDiv>
                    <p><b>Skicka med posten</b> <i>{`${deliveryPrice * getFromStorage('cart').length} kr`}</i></p>
                    <Input checked={delivery ? true : false} type='radio' name="delivery" onChange={deliveryActivate}/>
                </FlexDiv>
            </FlexColDiv>
            <P>{`Total ${price} kr`}</P>
            <Button onClick={onClick} color="white" bgcolor="rgb(245,106,141)">Checka ut med Klarna</Button>
        </Background>
        </>
    );
}

export default ActionButtonCart;
