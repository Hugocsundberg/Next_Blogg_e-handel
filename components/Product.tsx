import React from 'react';
import Image from 'next/dist/client/image';
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import { Image as ImageType } from '../generalTypes'
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

const Product = ({imageHeight, imageWidth, alt, image, slug}:{imageHeight:number, imageWidth: number, alt:string, image: ImageType, slug:string}) => {
    return (
        <Link href={`/product/${slug}`}>
            <Border>
                <Image
                    src={urlFor(image._ref).url() || '/noImage.jpg'}
                    alt={alt}
                    width={imageWidth}
                    height={imageHeight}
                    layout="responsive"
                />
            </Border>
        </Link>
    );
}

export default Product;
