import React from 'react';
//@ts-ignore
import styled from 'styled-components'
import Image from 'next/image'
import { darkGray, margin } from '../styles/globalStyleVariables'
import { useRouter } from 'next/router'
import { handleScroll } from '../functions'

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
cursor: pointer;
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

const Post = ({ title, excerpt, imageRef, date, imageHeight, imageWidth, url }: {title:string, excerpt:string, imageRef:string, date: string, imageHeight:number, imageWidth: number, url:string}) => {
    const router = useRouter()
    const route = (e:any) => {
        e.preventDefault
        window.removeEventListener('scroll', handleScroll)
        router.push(url)
    }
    return (
            <CardBackground onClick={route}>
                <HorisontalFlexDiv>
                    <Header>{title}</Header>
                    <Date>{date}</Date>
                </HorisontalFlexDiv>
                <Image
                    src={imageRef || '/noImage.jpeg'}
                    alt="image"
                    width={imageWidth || 1950}
                    height={imageHeight|| 1300}
                    layout="responsive"
                />
                <Excerpt>{excerpt}</Excerpt>
            </CardBackground>
    );
}

export default Post;
