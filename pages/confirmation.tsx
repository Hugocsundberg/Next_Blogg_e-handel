import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AboutMe, settings } from '../generalTypes';
import Head from "next/head"
import client from '../client';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { getTopOverlayHeight, removeProductFromStorage, urlFor } from '../functions';
import { Message } from '../components/Message';
import { Spacer } from '../components/GlobalElements';
import { margin } from '../styles/globalStyleVariables';

const OuterFlex = styled.div<{topOverlayHeight:number}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - ${props=>props.topOverlayHeight}px);
    overflow: hidden;
    width: 100vw;
    flex-direction: column;
    gap: 2rem;
    @media (min-width:800px) {
        flex-direction: row;
    }
`

const RightFlex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const H1 = styled.h1`
    margin: 0.3rem;
    text-align: center;
`

const P = styled.p`
    margin: 0.3rem;
    text-align: center;
`

const confirmation = ({ settings }: {settings: string}) => {
    const _settings:settings = JSON.parse(settings)
    const [topOverlayHeight, settopOverlayHeight] = useState(0);
    const router = useRouter()

    //Send order to sold API
    useEffect(() => {
        const data = {
            orderId: router.query.order_id
        }
        if(process.browser && router.isReady) {
            window.fetch('/api/sold', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json' }})
            .catch((error)=>console.error(error))
        }
    }, [router.isReady]);

    useEffect(()=>{
        //Remove products in cart
        if(process.browser) {
            window.localStorage.removeItem('cart')
            window.dispatchEvent(new Event('updatecart'))
        }

        settopOverlayHeight(getTopOverlayHeight())
        //set body scroll
        document.body.style.overflow="hidden"
        
        return () => {
            document.body.style.overflow="initial"
        }
    }, [])
   
    return (
        <>  
            <Head>
                <title>Confirmation</title>
            </Head>
                <Nav aboutMe={_settings.aboutMe}></Nav>
                <Spacer height={`${margin}rem`}></Spacer>
                {_settings.message ? <Message imageLink={urlFor(_settings.messageImage._ref).width(128).url() || 'noImage.jpeg'} message={_settings.message} /> : ''}
                <OuterFlex topOverlayHeight={topOverlayHeight}>
                    <img src="/success.svg" alt="success check mark icon" />
                    <RightFlex>
                        <H1>Din order har mottagits</H1>
                        <P>order id: {process.browser ? router.query.order_id : '-'}</P>
                    </RightFlex>
                </OuterFlex>
        </>
    );
}

export async function getStaticProps() {
    let settingsData
    const settingsquery = '*[_type == "settings"][0]{"aboutMe": aboutme->{title, slug}, "message": messageConfirmation, "messageImage": messageImage.asset}'
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

export default confirmation;
