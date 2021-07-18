import React from 'react';
import Image from 'next/dist/client/image';
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import { Image as ImageType } from '../generalTypes'
import styled from 'styled-components';

const builder = imageUrlBuilder(client)

const Border = styled.div`
    background: black;
    padding: 1.5%;
`

const urlFor = (source: string) => {
  return builder.image(source)
}

const Product = ({imageHeight, imageWidth, alt, image}:{imageHeight:number, imageWidth: number, alt:string, image: ImageType}) => {
    return (
        <Border>
            <Image
                src={urlFor(image._ref).url() || '/noImage.jpg'}
                alt={alt}
                width={imageWidth}
                height={imageHeight}
                layout="responsive"
            />
        </Border>
    );
}

export default Product;
