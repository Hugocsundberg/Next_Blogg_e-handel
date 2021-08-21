import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AboutMe } from '../generalTypes';
import Head from "next/head"
import client from '../client';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { getTopOverlayHeight } from '../functions';

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

const confirmation = ({ aboutMe }: {aboutMe: string}) => {
    const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
    const [topOverlayHeight, settopOverlayHeight] = useState(0);
    const router = useRouter()

    //Send order to sold API
    useEffect(() => {
        const data = {
            orderId: router.query.order_id
        }
        if(process.browser && router.isReady) {
            window.fetch('/api/sold', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json' }})
            .then((stream)=>stream.json())
            .then((data)=>console.log(data))
        }
    }, [router.isReady]);

    useEffect(()=>{
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
                <Nav aboutMe={_aboutMe}></Nav>
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

export default confirmation;
