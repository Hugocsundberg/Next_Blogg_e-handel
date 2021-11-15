import React from 'react';
//@ts-ignore
import { Header, Date, CardBackground, Excerpt, HorisontalFlexDiv } from './elements'
import { useRouter } from 'next/router'
import { handleScroll } from '../../functions'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../client';
import styled from 'styled-components';
import { breakPoints } from '../../generalTypes';
import { animationTiming, boxShadowBigElement } from '../../styles/globalStyleVariables';

const builder = imageUrlBuilder(client)

const Image = styled.img<{aspectRatio: number}>`
    width: 100%;
    aspect-ratio: ${props=>props.aspectRatio};
    position: relative;
    transition-timing-function: ${animationTiming};
    transition-duration: 1s;
    &:hover {
        transform: scale(1.04);
        box-shadow: ${boxShadowBigElement};
    }
`

const urlFor = (source: string) => {
    return builder.image(source)
  }

const Post = ({ title, excerpt, imageRef, date, breakPoints, url, altText, aspectRatio }: {title:string, excerpt:string, imageRef:string, date: Date, breakPoints:breakPoints, url:string, altText?:string, aspectRatio: number}, forwardedRef:any) => {
    const router = useRouter()
    const route = (e:any) => {
        e.preventDefault    
        window.removeEventListener('scroll', handleScroll)
        router.push(url)
    }

    const formatDate = (date:Date) :string => {
        if(process.browser) {
            const newDate = new window.Date(date);  
    
            const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
            const formattedSEDate = newDate.toLocaleDateString('sv-SE', options)

            const then = newDate.getTime()
            const now = window.Date.now()
            const dif = now - then
            const inHours = dif / 1000 / 60 / 60
    
            if(inHours <= 1) {
                return 'Nyss'
            }
            else if(inHours < 24) {
                const hours = Math.round(inHours)
                return `${hours} ${hours === 1 ? 'timme' : 'timmar'} sedan`
            } 
            else if (inHours < 24 * 7) {
                const days = Math.round(inHours / 24)
                return `${days} ${days === 1 ? 'dag' : 'dagar'} sedan`
            }
            else if(inHours < 24 * 365) {
                const weeks = Math.round(inHours / 24 / 7)
                return `${Math.round(inHours / 24 / 7)} ${weeks === 1 ? 'vecka' : 'veckor'} sedan`
            }
            else {
                return formattedSEDate
            }
        }
        return ''
    }

    return (
            <CardBackground aspectRatio={aspectRatio} ref={forwardedRef} onClick={route}>
                <HorisontalFlexDiv>
                    <Header>{title}</Header>
                    <Date>{formatDate(date)}</Date>
                </HorisontalFlexDiv>
                <picture>
                    <source media={`(min-width:${breakPoints.L}px)`} srcSet={urlFor(imageRef).width(700).url() || undefined}/>
                    <source media={`(min-width:${breakPoints.M}px)`} srcSet={urlFor(imageRef).width(560).url() || undefined}/>
                    <source media={`(min-width:${breakPoints.S}px)`} srcSet={urlFor(imageRef).width(560).url() || undefined}/>
                    <Image aspectRatio={aspectRatio} src={urlFor(imageRef).width(740).url() || undefined}/>
                </picture>
                <Excerpt>{excerpt}</Excerpt>
            </CardBackground>
    );
}

export default Post;
