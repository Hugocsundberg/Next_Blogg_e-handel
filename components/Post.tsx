import React from 'react';
import styled from 'styled-components'
import Image from 'next/image'
import { darkGray, margin } from '../styles/styleVariables'

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

const Post = () => {
    return (
        <CardBackground>
            <HorisontalFlexDiv>
                <Header>Hello</Header>
                <Date>Date</Date>
            </HorisontalFlexDiv>
            <Image
                src="/img.jpeg"
                alt="image"
                width={500}
                height={500}
                layout="responsive"
            />
            <Excerpt>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe unde quam sint id consequuntur quidem ad ea reiciendis facilis quis! Quisquam aliquam repellendus labore ab eveniet eaque laborum reprehenderit cupiditate.</Excerpt>
        </CardBackground>
    );
}

export default Post;
