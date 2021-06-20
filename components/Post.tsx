import React from 'react';
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

const Post = ({ title, excerpt, imageRef, date }) => {
    return (
        <CardBackground>
            <HorisontalFlexDiv>
                <Header>{title}</Header>
                <Date>{date}</Date>
            </HorisontalFlexDiv>
            <Image
                src={imageRef || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/2560px-Image_created_with_a_mobile_phone.png'}
                alt="image"
                width={500}
                height={500}
                layout="responsive"
            />
            <Excerpt>{excerpt}</Excerpt>
        </CardBackground>
    );
}

export default Post;
