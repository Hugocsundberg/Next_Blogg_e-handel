import React from 'react';
//@ts-ignore
import { Header, Date, CardBackground, Excerpt, HorisontalFlexDiv } from './elements'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { handleScroll } from '../../functions'

const Post = ({ title, excerpt, imageRef, date, imageHeight, imageWidth, url, altText }: {title:string, excerpt:string, imageRef:string, date: Date, imageHeight:number, imageWidth: number, url:string, altText?:string}, forwardedRef:any) => {
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
            <CardBackground ref={forwardedRef} onClick={route}>
                <HorisontalFlexDiv>
                    <Header>{title}</Header>
                    <Date>{formatDate(date)}</Date>
                </HorisontalFlexDiv>
                <Image
                    src={imageRef || '/noImage.jpeg'}
                    alt={altText ?? "image"}
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
