import React from 'react';
import Image from 'next/dist/client/image';
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import { Image as ImageType, ImageHW } from '../generalTypes'
import styled from 'styled-components';
import Link from 'next/link'
import { margin } from '../styles/globalStyleVariables';

const builder = imageUrlBuilder(client)

const Border = styled.div`
    background: black;
    padding: 1.5%;
    margin-bottom: ${margin}rem;
    cursor: pointer;
`

const urlFor = (source: string) => {
  return builder.image(source)
}

const Product = ({alt, images, slug}:{alt:string, images: Array<ImageHW>, slug:string}) => {
    return (
        <Link href={`/product/${slug}`}>
            <Border>
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
