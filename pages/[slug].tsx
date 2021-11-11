import { useRouter } from 'next/router'
import client from '../client'
import { AboutMe, aboutMeSetting, Post as PostType } from '../generalTypes'
// @ts-ignore
import PortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import { FlexCenterCenter, SmallParagraph } from '../components/GlobalElements'
import Nav from '../components/Nav'
import ActionButton from '../components/ActionButton'
import styled from 'styled-components'
import { boxShadowBigElement, margin } from '../styles/globalStyleVariables'
import { ButtonContainer } from '../components/GlobalElements/ActionButtonElements'
import { Background } from '../components/GlobalElements'
import Head from 'next/head'
import SquareLoader from "react-spinners/SquareLoader";
import { isReserved } from '../functions'
import { useEffect, useState } from 'react'
const BlockContent = require('@sanity/block-content-to-react')

const CenterContent = styled.div<{hasProduct: boolean}>`

    display: flex;
    justify-content: center;
    position: relative;
    padding: ${margin}rem;
    padding-bottom: ${props => props.hasProduct ? '8rem' : `2rem`};
`

const ContentContainer = styled.div<{ hasProduct: boolean }>`
    width: 100%;
    height: fit-content;
    max-width: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: ${boxShadowBigElement};
    padding: ${margin}rem;
    padding-top: 0;
    padding-bottom: 0rem;
`

const ImageContainer = styled.div`
  margin: 1.5rem 0;
  border-radius: 2px;
  overflow: hidden;
`

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Post = ({ post, aboutMe }: {post: string, aboutMe: string}) => {
  if(!post) {
    return (
      <FlexCenterCenter height="100vh">
        <h1>418</h1>
        <SmallParagraph>Problem 🫖</SmallParagraph>
      </FlexCenterCenter>
    )
  }
  const aboutMeStatic:Array<AboutMe> = JSON.parse(aboutMe)
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const _post: PostType = JSON.parse(post)
  const [isReservedState, setIsReserevedState] = useState<number | false>(isReserved(_post.productReserved))
  const router = useRouter()

  useEffect(()=>{
    const interval = setInterval(()=>{
      setIsReserevedState(isReserved(_post.productReserved))
    }, 1000 * 60)

    return () => clearInterval(interval)
  })

  if(_aboutMe[0].slug.current === _post.slug) {
    _aboutMe.pop()
  }
  
  if (router.isFallback) {
    return (
      <>
        <FlexCenterCenter height="100vh">
          <SquareLoader/>
        </FlexCenterCenter>
      </>
    )
  }
  
  const serializers = {
    types: {
      image: (props:any) => (
        <ImageContainer>
          <Image
            src={urlFor(props.node.asset).url() || '/noImage.jpg'}
            alt={_post.altText ?? 'image'}
            width={(_post as PostType).imageWidth || 1950}
            height={(_post as PostType).imageHeight || 1300}
            layout="responsive"
          />
        </ImageContainer>
        
      ),
      block: (props:any) => {
        if(props.node.style === 'normal') return (
          <SmallParagraph>{props.children[0]}</SmallParagraph>
        )

        else return BlockContent.defaultSerializers.types.block(props)
      },
    }
  }

  const actionButtonHandler = () => {
    if(_post.productSlug && (!_post.productSold && !isReserved(_post.productReserved) ? true : false) )
    router.push(`/atelje/${_post.productSlug}`)
  }
  
  if(_post.title) {
    let ProductButtonContent:string = 'Gå till produkt'
    if(isReservedState) ProductButtonContent = `Reserverad av någon i ${isReservedState} min`
    if(_post.productSold) ProductButtonContent = `Såld`

    return (
      <>
        <Head>
        <title>Kundvagn</title>
        </Head>
        <Background>
          <Nav aboutMe={aboutMeStatic}></Nav>
          <CenterContent hasProduct={_post.productSlug ? true : false}>
            <ContentContainer hasProduct={_post.productSlug ? true : false}>
              <PortableText
                blocks={(_post as PostType).body}
                serializers={serializers}
                projectId="9r33i0al"
                dataset="production"
              />
            </ContentContainer>
          </CenterContent>
          {_post.productSlug ? 
          <ButtonContainer doubleMargin={true}>
            <ActionButton disabled={(isReservedState || _post.productSold) ? true : false} onClick={actionButtonHandler} text={ProductButtonContent}></ActionButton>
          </ButtonContainer>
          : '' }
        </Background>
      </>
    )
  }
  else {
    return (
      <FlexCenterCenter height="100vh">
        <h1>404</h1>
        <SmallParagraph>Sidan finns inte 🥲</SmallParagraph>
      </FlexCenterCenter>
    ) 
  }
  
}

export async function getStaticProps({ params }: {params: any}) {
  const slug = params.slug
  let postJson
  const query = `*[_type == 'post' && slug.current == '${slug}']{"created": _createdAt, excerpt, body, "altText": body[_type match 'image'][0].altText, "productSlug": product->slug.current, "productReserved": product->lastReservedAt, "productSold": product->sold, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}`
  await client.fetch(query)
  .then((posts: Array<PostType>) => {
    const postData = posts[0] || []
    postJson = JSON.stringify(postData)
  })

   let settingsJson
   const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
   await client.fetch(settingsquery)
   .then((settings: Array<AboutMe>) => {
    settingsJson = JSON.stringify(settings)
   })

  return {
    props: {
      post: postJson,
      aboutMe: settingsJson
    }
  }
}

export async function getStaticPaths() {

  // Get 20 first posts except aboutme post. Then add about me post to make sure it is always prerendered even if older than 20.
  const data:Array<PostType> = []

  // Get 'aboutme' post slug
  const aboutMePostQuery = `*[_type == "settings"]{aboutme->{slug}}`
  const aboutMeSettings:Array<aboutMeSetting> = await client.fetch(aboutMePostQuery)
  const aboutMePostSlug = aboutMeSettings[0].aboutme.slug.current

  // Get all posts except 'aboutme' post
  const postsQueryWithoutAboutMe = `*[_type == "post" && slug.current != "${aboutMePostSlug}"]{"slug": slug.current}[0...20]`
  const postsWithoutAboutMe:Array<PostType> =  await client.fetch(postsQueryWithoutAboutMe)

  // Get about me post
  const aboutMePosts:Array<PostType> = await client.fetch(`*[_type == "post" && slug.current == "${aboutMePostSlug}"]{"slug": slug.current}`)

  data.push(...postsWithoutAboutMe, ...aboutMePosts)

  return {
    paths: data.map((post:PostType)=> {
      return {params: {slug: post.slug}}
    })
    ,
    fallback: true
  };
}

export default Post