import React from 'react';
import Image from 'next/dist/client/image';
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import { ImageHW } from '../generalTypes'
import styled from 'styled-components';
import Link from 'next/link'
import { margin, animationTiming } from '../styles/globalStyleVariables';
import { isReserved } from '../functions';

const builder = imageUrlBuilder(client)

const Border = styled.div<{hasShadow:boolean, removeMargin: boolean}>`
    background: black;
    padding: 2%;
    position: relative;
    margin-bottom: ${props => props.removeMargin ? '0px' : `${margin}rem`};
    cursor: pointer;
    box-shadow: ${props => props.hasShadow ? '6px 6px 15px -5px #272727c4' : ''};
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
    height: .5rem;
    width: .5rem;
    z-index: 20;
`

const Container = styled.div`
    position: relative;
`

const urlFor = (source: string) => {
  return builder.image(source)
}

export const Product = ({alt, images, slug, removeMargin = false, hasShadow = true, sold, lastReserved}:{alt:string, images: Array<ImageHW>, slug:string, removeMargin?: boolean, hasShadow?:boolean, sold:boolean, lastReserved: number | null}) => {
    const _isReserved = isReserved(lastReserved)
    let dotColor:('red' | 'transparent' | 'yellow') = 'transparent'
    if(_isReserved) dotColor = 'yellow'
    if(sold) dotColor = 'red'

    return (
        <Link href={`/product/${slug}`}>
            <Border hasShadow={hasShadow} removeMargin={removeMargin}>
                <Dot sold={sold} reserved={_isReserved} color={dotColor}></Dot>
                <Overlay active={(_isReserved || sold) ? true : false}>
                    <OverlayText>{sold ? 'Såld' : `Reserverad av någon i ${_isReserved ? _isReserved : 'false'} minuter till.`}</OverlayText>
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
        </Link>
    );
}

export default Product;
