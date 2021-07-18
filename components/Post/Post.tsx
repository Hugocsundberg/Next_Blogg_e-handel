import React from 'react';
//@ts-ignore
import { Header, Date, CardBackground, Excerpt, HorisontalFlexDiv } from './elements'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { handleScroll } from '../../functions'

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
