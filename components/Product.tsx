import React from 'react';
import Image from 'next/dist/client/image';
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import { ImageHW } from '../generalTypes'
import styled from 'styled-components';
import Link from 'next/link'
import { margin, animationTiming } from '../styles/globalStyleVariables';
import { isReserved } from '../functions';
import { useEffect, useState } from 'react';
import { keyframes } from 'styled-components'

const builder = imageUrlBuilder(client)
const fromGray = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`

const GrayOverlay = styled.div`
    background: gray;
    height: 100%;
    width: 100%;
`

const Border = styled.div<{hasShadow:boolean, removeMargin: boolean, pointer:boolean}>`
    background: black;
    padding: 2%;
    position: relative;
    margin-bottom: ${props => props.removeMargin ? '0px' : `${margin}rem`};
    cursor: ${props=>props.pointer ? 'pointer' : 'auto'};
    box-shadow: ${props => props.hasShadow ? '6px 6px 15px -5px #272727c4' : ''};
    animation-duration: .7s;
    animation-name: ${fromGray};
`


const Overlay = styled.div<{active?:boolean}>`
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    transform: translate(-2%, -2%);
    display: ${props=> props.active ? 'block' : 'none'};
    transition-timing-function: ${animationTiming};
    transition-duration: 300ms;
    &:hover {
        background: #000000a9;
  }
`

const OverlayText = styled.h2`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-size: large;
    height: 100%;
    width: 100%;
    padding: 1rem;
    margin: 0;
    transition-timing-function: ${animationTiming};
    opacity: 0;
    transition-duration: 1.5s;
    &:hover {
        opacity: 1;
    }

`

const Dot = styled.div<{color: 'red' | 'yellow' | 'transparent', sold:boolean, reserved:(number | false)}>`
    border-radius: 50%;
    background: ${(props)=> {
        if(props.color === 'red') 
            return 'red'
        else if(props.color === 'yellow') {
            return '#f4e800'
        }
    }};
    position: absolute;
    bottom: 1rem;
    box-shadow: ${(props)=>(props.sold || props.reserved) ? '1px 1px 10px' : 'none'} ;
    right: 1rem;
    height: .6rem;
    width: .6rem;
    z-index: 20;
`

const Container = styled.div`
    position: relative;
    transition-timing-function: ${animationTiming};
    transition-duration: 1s;
    &:hover {
        transform: scale(1.1);
    }
`

const urlFor = (source: string) => {
  return builder.image(source)
}

export const Product = ({lastElementRef, alt, images, slug, removeMargin = false, hasShadow = true, sold, lastReserved}:{lastElementRef?:any, alt:string, images: Array<ImageHW>, slug:string, removeMargin?: boolean, hasShadow?:boolean, sold?:boolean, lastReserved?: number | null}) => {
    const [_isReserved, set_isReserved] = useState(isReserved(lastReserved));

    //update reserved time left once every minute for minute countdown.
    useEffect(()=>{
        set_isReserved(isReserved(lastReserved))

        const timeOut = setInterval(() => {
            set_isReserved(isReserved(lastReserved))
        }, 60 * 1000);
        
        return () => {
            clearInterval(timeOut)
        }
    }, [lastReserved])

    let dotColor:('red' | 'transparent' | 'yellow') = 'transparent'
    if(_isReserved) dotColor = 'yellow'
    if(sold) dotColor = 'red'

    return (
        <div ref={lastElementRef || null}>
            <Link scroll={(sold || _isReserved) ? false : true} href={(sold || _isReserved) ? '' :`/product/${slug}`}>
                <GrayOverlay>
                    <Border pointer={(!sold && !_isReserved)} hasShadow={hasShadow} removeMargin={removeMargin}>
                        <Dot sold={sold ? true : false} reserved={_isReserved} color={dotColor}></Dot>
                        <Overlay active={(_isReserved || sold) ? true : false}>
                            <OverlayText>{sold ? 'Såld' : `Reserverad av någon i ${_isReserved ? _isReserved : 'false'} ${_isReserved === 1 ? 'minut' : 'minuter'} till.`}</OverlayText>
                        </Overlay>
                        <Container> 
                            <Image
                                src={urlFor(images[0].asset._ref).url() || '/noImage.jpg'}
                                alt={alt}
                                width={images[0].imageWidth}
                                height={images[0].imageHeight}
                                layout="responsive"
                            />
                        </Container>
                    </Border>
                </GrayOverlay>
            </Link>
        </div>
    );
}

export default Product;
