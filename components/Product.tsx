import React from 'react';
import Image from 'next/dist/client/image';
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import { Image as ImageType, ImageHW } from '../generalTypes'
import styled from 'styled-components';
import Link from 'next/link'
import { margin } from '../styles/globalStyleVariables';

const builder = imageUrlBuilder(client)

const Border = styled.div<{removeMargin: boolean}>`
    background: black;
    padding: 2%;
    margin-bottom: ${props => props.removeMargin ? '0px' : `${margin}rem`};
    cursor: pointer;
    box-shadow: 6px 6px 15px -5px #272727c4;
`

const urlFor = (source: string) => {
  return builder.image(source)
}

export const Product = ({alt, images, slug, removeMargin = false}:{alt:string, images: Array<ImageHW>, slug:string, removeMargin?: boolean}) => {
    return (
        <Link href={`/product/${slug}`}>
            <Border removeMargin={removeMargin}>
                <Image
                    src={urlFor(images[0].asset._ref).url() || '/noImage.jpg'}
                    alt={alt}
                    width={images[0].imageWidth}
                    height={images[0].imageHeight}
                    layout="responsive"
                />
            </Border>
        </Link>
    );
}

export default Product;
