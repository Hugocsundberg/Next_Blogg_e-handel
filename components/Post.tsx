import React from 'react';
//@ts-ignore
import styled from 'styled-components'
import Image from 'next/image'
import { darkGray, margin } from '../styles/globalStyleVariables'

const Header = styled.h2`
color: ${darkGray};
`

const Date = styled.p`
color: ${darkGray};
`

const CardBackground = styled.div`
background: white;
width: 100%;
margin-bottom: 1rem;
`

const HorisontalFlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-right: ${margin}rem;
    padding-left: ${margin}rem;
`

const Excerpt = styled.p`
padding: ${margin}rem;
text-align: center;
color: ${darkGray}
`

const Post = ({ title, excerpt, imageRef, date, imageHeight, imageWidth }: {title:string, excerpt:string, imageRef:string, date: string, imageHeight:number, imageWidth: number}) => {
    return (

        <CardBackground>
            <HorisontalFlexDiv>
                <Header>{title}</Header>
                <Date>{date}</Date>
            </HorisontalFlexDiv>
            <Image
                src={imageRef || '/noImage.jpeg'}
                alt="image"
                width={imageWidth || 500}
                height={imageHeight|| 500}
                layout="responsive"
            />
            <Excerpt>{excerpt}</Excerpt>
        </CardBackground>
    );
}

export default Post;
