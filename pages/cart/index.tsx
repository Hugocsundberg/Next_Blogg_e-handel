import React from 'react';
import ActionButtonCart from './components/ActionButtonCart';
import Head from "next/head"
import client from '../../client';
import { AboutMe, KlarnaCheckoutSnippetResponse, Product } from "../../generalTypes"
import { Header } from "../../components/GlobalElements"
import Nav from '../../components/Nav'
import CartItem from './components/CartItem';
import { useState, useEffect } from 'react';
import { getFromStorage, getTopOverlayHeight } from '../../functions';
import styled from 'styled-components';
import { blurColor, blurPx, boxShadowBigElement, darkGray, margin, rem, screenSizes } from '../../styles/globalStyleVariables';
import { ButtonContainer } from '../../components/GlobalElements/ActionButtonElements';
import { Background } from '../../components/GlobalElements';
import { useRouter } from 'next/router'
import { renderSnippet } from './functions';
import { CardBackground } from '../../components/Post/elements';


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

const ExitKlarna = styled.div`
    background: white;
    height: 3rem;
    display: flex;
    border-radius: 10px 10px 0 0;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-shadow: ${boxShadowBigElement};
    width: 88%;
    max-width: 550px;
    @media (min-width: ${screenSizes.S}px) {
        width: 80%;
    }
`

const KlarnaImg = styled.img`
    height: 40px;
    transform: translate(-6px);
`

const Img = styled.img`
    cursor: pointer;
`  

const CheckoutContainerContainer = styled.div<{ topOverlayHeight: number, isVisible:boolean }>`
    width: 100vw;
    max-height: 100%;
    background: transparent;
    backdrop-filter: blur(4px);
    position: fixed;
    top: 0;
    padding-top: ${props=>props.topOverlayHeight / rem + margin}rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: ${margin}rem;
    visibility: ${props => props.isVisible ? 'initial' : 'hidden'};
    `

const CheckoutContainer = styled.div`
    max-width: 550px;
    box-shadow: ${boxShadowBigElement};
    overflow-y: scroll;
    width: 88%;
    @media (min-width: ${screenSizes.S}px) {
        width: 80%;
        border-radius: 0 0 10px 10px;
    }
`

const index = ({ aboutMe }: {aboutMe: string}) => {
    const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
    const [inCart, setinCart] = useState<Array<Object>>([]);
    const [KlarnaCheckout, setKlarnaCheckout] = useState<KlarnaCheckoutSnippetResponse>();
    const [topOverlayHeight, settopOverlayHeight] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);

    const updateCart = () => {
        const inCart:Array<Object> = getFromStorage('cart')
        setinCart(inCart) 
    }

    const purchaseHandler = () => {
        if(process.browser) {
            window.fetch('/api/klarna', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(inCart)
              })
            .then(stream => stream.json()) 
            .then((data) => setKlarnaCheckout(data))
        }
    }

    const exitKlarnaHandler = () => {
        setKlarnaCheckout(undefined)
    }

    useEffect(() => {
        //Update cart
        if(process.browser) {
            updateCart()
            window.addEventListener('updatecart', updateCart)
            settopOverlayHeight(getTopOverlayHeight())
        }
    }, []);

    useEffect(() => {
        let totalPrice:number = 0
        inCart.forEach((product) => {
            totalPrice += (product as Product).price
        })
        settotalPrice(totalPrice)
    }, [inCart]);

    useEffect(()=>{
        if(KlarnaCheckout)
        renderSnippet(KlarnaCheckout.htmlSnippet)  
    }, [KlarnaCheckout])

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
                <CheckoutContainerContainer isVisible={KlarnaCheckout ? true : false} topOverlayHeight={topOverlayHeight}>
                    <ExitKlarna>
                        {/* <Paragraph>Betalning</Paragraph> */}
                        <KlarnaImg src='/klarna.svg'/>
                        <Img onClick={exitKlarnaHandler} src='/cross.svg'/>
                    </ExitKlarna>
                    <CheckoutContainer className="checkout-container"/>
                </CheckoutContainerContainer>
                {
                    KlarnaCheckout ? '' :
                    <ButtonContainer>
                        <ActionButtonCart onClick={purchaseHandler} price={totalPrice} tax={30}/>
                    </ButtonContainer>
                }
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
