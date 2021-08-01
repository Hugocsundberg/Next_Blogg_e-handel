import React from 'react';
import ActionButtonCart from './components/ActionButtonCart';
import Head from "next/head"
import client from '../../client';
import { AboutMe, Product } from "../../generalTypes"
import Header from "../../components/GlobalElements/Header"
import Nav from '../../components/Nav'
import CartItem from './components/CartItem';
import { useState, useEffect } from 'react';
import { getFromStorage, getTopOverlayHeight } from '../../functions';
import styled from 'styled-components';
import { margin, screenSizes } from '../../styles/globalStyleVariables';
import { ButtonContainer } from '../../components/GlobalElements/ActionButtonElements';
import { Background } from '../../components/GlobalElements/Background';

const CartContainer = styled.div<{ topOverlayHeight: number }>`
    width: 100%;
    min-height: calc(100vh - ${props=>props.topOverlayHeight}px);
    padding: ${margin}rem;
    padding-top: 0;
    padding-bottom: 14rem;
    max-width: 800px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    @media (min-width: ${screenSizes.M}px) {
        padding-bottom: 6rem;
    }
`

const index = ({ aboutMe }: {aboutMe: string}) => {
    const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
    const [inCart, setinCart] = useState<Array<Object>>([]);
    const [topOverlayHeight, settopOverlayHeight] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);
    const [tax, settax] = useState(0);

    const updateCart = () => {
        const inCart:Array<Object> = getFromStorage('cart')
        setinCart(inCart) 
    }

    useEffect(() => {
        updateCart()
        window.addEventListener('updatecart', updateCart)
        settopOverlayHeight(getTopOverlayHeight())
    }, []);

    useEffect(() => {
        let totalPrice:number = 0
        inCart.forEach((product) => {
            totalPrice += (product as Product).price
        })
        settotalPrice(totalPrice)
    }, [inCart]);

    return (
        <>  
            <Head>
            <title>Cart</title>
            </Head>
            <Background>
                <Nav aboutMe={_aboutMe}></Nav>
                <CartContainer topOverlayHeight={topOverlayHeight}>
                <Header noLeftMargin={true}>CART</Header>
                    {inCart.map((product: Object) => {
                        const _product = (product as Product);
                        return <CartItem product={_product}/>
                    })}
                </CartContainer>
                <ButtonContainer>
                    <ActionButtonCart price={totalPrice} tax={30}/>
                </ButtonContainer>
            </Background>
        </>
    );
}

export async function getStaticProps() {
    let settingsData
    const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
    await client.fetch(settingsquery)
    .then((settings: Array<AboutMe>) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)
  
    return {
      props: {
        aboutMe: settingsJson
      },
      revalidate: 60
    }
  }

export default index;
