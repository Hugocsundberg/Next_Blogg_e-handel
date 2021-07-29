import React from 'react';
import ActionButtonCart from './components/ActionButtonCart';
import Head from "next/head"
import client from '../../client';
import { AboutMe, Product } from "../../generalTypes"
import Header from "../../components/GlobalElements/Header"
import Nav from '../../components/Nav'
import CartItem from './components/CartItem';
import { useState, useEffect } from 'react';
import { getFromStorage } from '../../functions';
import styled from 'styled-components';

const Background = styled.div`
    min-height: 100vh;
    background: #f7f7f7;
`

const index = ({ aboutMe }: {aboutMe: string}) => {
    const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
    const [inCart, setinCart] = useState<Array<Object>>([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [tax, settax] = useState(0);

    const updateCart = () => {
        const inCart:Array<Object> = getFromStorage('cart')
        setinCart(inCart) 
    }

    useEffect(() => {
        updateCart()
        window.addEventListener('updatecart', updateCart)
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
                <Header>CART</Header>
                {inCart.map((product: Object) => {
                    const _product = (product as Product);
                    return <CartItem product={_product}/>
                })}
                <ActionButtonCart price={totalPrice} tax={30}/>
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
