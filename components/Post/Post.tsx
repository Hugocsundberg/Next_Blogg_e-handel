import React from 'react';
//@ts-ignore
import { Header, Date, CardBackground, Excerpt, HorisontalFlexDiv } from './elements'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { handleScroll } from '../../functions'

const Post = ({ title, excerpt, imageRef, date, imageHeight, imageWidth, url }: {title:string, excerpt:string, imageRef:string, date: Date, imageHeight:number, imageWidth: number, url:string}, forwardedRef:any) => {
    const router = useRouter()
    const route = (e:any) => {
        e.preventDefault
        window.removeEventListener('scroll', handleScroll)
        router.push(url)
    }

    const formatDate = (date:Date) => {
        if(process.browser) {
            const newDate = new window.Date(date);  
            const then = newDate.getTime()
            const now = window.Date.now()
            const dif = now - then
            const inHours = dif / 1000 / 60 / 60
    
            if(inHours <= 1) {
                return 'Nyss'
            }
            else if(inHours < 24) {
            return `${Math.round(inHours)} timmar sedan`
            } 
            else {
                return `${Math.round(inHours / 24)} dagar sedan`
            }
        }
    }

    return (
            <CardBackground ref={forwardedRef} onClick={route}>
                <HorisontalFlexDiv>
                    <Header>{title}</Header>
                    <Date>{formatDate(date)}</Date>
                </HorisontalFlexDiv>
                <Image
                    src={imageRef || '/noImage.jpeg'}
                    alt="image"
                    width={imageWidth || 1950}
                    height={imageHeight|| 1300}
                    layout="responsive"
                    className='postImage'
                />
                <Excerpt>{excerpt}</Excerpt>
            </CardBackground>
    );
}

export default Post;
