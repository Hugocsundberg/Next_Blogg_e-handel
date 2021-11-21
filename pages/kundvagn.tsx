import React from 'react';
import NothingInCart from '../components/CartComponents/NothingInCart';
import ActionButtonCart from '../components/CartComponents/ActionButtonCart';
import Head from "next/head"
import client from '../client';
import { AboutMe, KlarnaCheckoutSnippetResponse, Product, settings } from "../generalTypes"
import { Header } from "../components/GlobalElements"
import Nav from '../components/Nav'
import CartItem from '../components/CartComponents/CartItem';
import { useState, useEffect } from 'react';
import { getFromStorage, getTopOverlayHeight, urlFor } from '../functions';
import styled from 'styled-components';
import { blurColor, blurPx, boxShadowBigElement, darkGray, margin, rem, screenSizes } from '../styles/globalStyleVariables';
import { ButtonContainer } from '../components/GlobalElements/ActionButtonElements';
import { Background } from '../components/GlobalElements';
import { renderSnippet } from '../functions';
import { Message } from '../components/Message';
import { Spacer } from '../components/GlobalElements';

const DELIVERY_PRICE = 50

const CartContainer = styled.div<{ stuffInCart:boolean, topOverlayHeight: number, settings:settings }>`
    width: 100%;
    min-height: ${props=>props.settings.message ? 'initial' : "calc(100vh - ${props=>props.topOverlayHeight}px)"};
    padding: ${margin}rem;
    padding-top: 0;
    padding-bottom: ${props=>props.stuffInCart ? '14rem' : '2rem'};
    max-width: 800px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    @media (min-width: ${screenSizes.L}px) {
        padding-bottom: ${props=>props.stuffInCart ? '6rem' : '2rem'};
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

const index = ({ settings }: {settings: string}) => {
    const _settings:settings = JSON.parse(settings)
    const [inCart, setinCart] = useState<Array<Object>>([]);
    const [KlarnaCheckout, setKlarnaCheckout] = useState<KlarnaCheckoutSnippetResponse>();
    const [topOverlayHeight, settopOverlayHeight] = useState(0);
    const [totalPrice, settotalPrice] = useState(0);
    const [delivery, setDelivery] = useState(false)
    const [deliveryPrice, setDeliveryPrice] = useState(0)

    const updateCart = () => {
        const inCart:Array<Object> = getFromStorage('cart')
        setinCart(inCart) 
    }

    const deliveryActivate = () => {
        setDelivery(true)
    }

    const deliveryDeactivate = () => {
        setDelivery(false)
    }

    const updateDeliveryPrice = () => {
        setDeliveryPrice(DELIVERY_PRICE * getFromStorage('cart').length)
    }

    const purchaseHandler = () => {
        if(process.browser) {
            window.fetch('/api/klarna', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({inCart, delivery})
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
        updateDeliveryPrice()
    }, [inCart]);

    useEffect(() => {
        let totalPrice:number = 0
        inCart.forEach((product) => {
            totalPrice += (product as Product).price
        })
        settotalPrice(totalPrice + (delivery ? deliveryPrice : 0))
    }, [deliveryPrice, delivery]);

    useEffect(()=>{
        if(KlarnaCheckout)
        renderSnippet(KlarnaCheckout.htmlSnippet)  
    }, [KlarnaCheckout])

    return (
        <>  
            <Head>
            <title>Kundvagn</title>
            </Head>
            <Background>
                <Nav aboutMe={_settings.aboutMe}></Nav>
                <Spacer height={`${margin}rem`}></Spacer>
                {_settings.message ? <Message imageLink={urlFor(_settings.messageImage._ref).width(128).url() || 'noImage.jpeg'} message={_settings.message} /> : ''}
                <CartContainer stuffInCart={inCart.length > 0} settings={_settings} topOverlayHeight={topOverlayHeight}>
                    {inCart.length > 0 ? inCart.map((product: Object) => {
                        const _product = (product as Product);
                        return <CartItem product={_product}/>
                    })
                    :
                    <NothingInCart/>
                    }
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
                inCart.length > 0 ? 
                    KlarnaCheckout ? '' :
                    <ButtonContainer>
                        <ActionButtonCart deliveryPrice={DELIVERY_PRICE} totaldeliveryPrice={deliveryPrice} deliveryActivate={deliveryActivate} deliveryDeactivate={deliveryDeactivate} delivery={delivery} setDelivery={setDelivery} onClick={purchaseHandler} price={totalPrice} tax={30}/>
                    </ButtonContainer>
                : ''
                }
            </Background>
        </>
    );
}

export async function getStaticProps() {
    let settingsData
    const settingsquery = '*[_type == "settings"][0]{"aboutMe": aboutme->{title, slug}, "message": messageCart, "messageImage": messageImage.asset}'
    await client.fetch(settingsquery)
    .then((settings: settings) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)
  
    return {
      props: {
        settings: settingsJson
      },
      revalidate: 60
    }
  }

export default index;
