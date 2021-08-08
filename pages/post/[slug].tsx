import { useRouter } from 'next/router'
import client from '../../client'
import { AboutMe, Post as PostType } from '../../generalTypes'
// @ts-ignore
import PortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
// import { ContentContainer, ImageContainer, CenterContent } from './elements'
import Image from 'next/image'
import { FlexCenterCenter } from '../../components/GlobalElements'
import Nav from '../../components/Nav'
import ActionButton from '../../components/ActionButton'
import styled from 'styled-components'
import { boxShadowBigElement, margin, screenSizes } from '../../styles/globalStyleVariables'
import { getTopOverlayHeight } from '../../functions'
import { useState, useEffect } from 'react'
import { getBottomOverlayHeight } from '../../functions'
import { ButtonContainer } from '../../components/GlobalElements/ActionButtonElements'
import { Background } from '../../components/GlobalElements'
import Head from 'next/head'

const CenterContent = styled.div<{overlayHeight: number}>`
    display: flex;
    justify-content: center;
    position: relative;
    padding: ${margin}rem 0;
    @media (min-width: ${screenSizes.M}px) {
      min-height: calc(100vh - ${props => props.overlayHeight}px);
    }
`

const ContentContainer = styled.div<{ hasProduct: boolean }>`
    width: 100%;
    height: fit-content;
    max-width: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: ${boxShadowBigElement};
    padding: ${margin}rem;
    padding-bottom: ${props => props.hasProduct ?' 6rem' : `0`};
    padding-top: 0;
`

const ImageContainer = styled.div`
  /* box-shadow: ${boxShadowBigElement}; */
  margin: 1.5rem 0;
  border-radius: 2px;
  overflow: hidden;
`

const Paragraph = styled.p`
    margin: ${margin / 4}rem;
`

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Post = ({ post, aboutMe }: {post: string, aboutMe: string}) => {
  console.log(aboutMe)
  const aboutMeStatic:Array<AboutMe> = JSON.parse(aboutMe)
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const _post: PostType = JSON.parse(post)
  const [navoverlayHeight, setnavoverlayHeight] = useState(0);

  useEffect(()=>{
    const topOverlayHeight:number = getTopOverlayHeight()
    const bottomOverlayHeight:number = getBottomOverlayHeight()

    setnavoverlayHeight(topOverlayHeight + bottomOverlayHeight)
  }, [])

  if(_aboutMe[0].slug.current === _post.slug) {
    _aboutMe.pop()
  }
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <>
        <FlexCenterCenter height="100vh">
          <div>Loading...</div>
        </FlexCenterCenter>
      </>
    )
  }

  console.log(_aboutMe)
  
  const serializers = {
    types: {
      image: (props:any) => (
        <ImageContainer>
          <Image
            src={urlFor(props.node.asset).url() || '/noImage.jpg'}
            alt="image"
            width={(_post as PostType).imageWidth || 1950}
            height={(_post as PostType).imageHeight || 1300}
            layout="responsive"
          />
        </ImageContainer>
      )
    }
  }

  const actionButtonHandler = () => {
    if(_post.productSlug)
    router.push(`/product/${_post.productSlug}`)
  }
  
  if(_post.title) {
    return (
      <>
        <Head>
        <title>Cart</title>
        </Head>
        <Background>
          <Nav aboutMe={aboutMeStatic}></Nav>
          <CenterContent overlayHeight={navoverlayHeight}>
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
            <ActionButton onClick={actionButtonHandler} text='Gå till produkt'></ActionButton>
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
        <Paragraph>Nånting finns inte</Paragraph>
      </FlexCenterCenter>
    ) 
  }
  
}

export async function getStaticProps({ params }: {params: any}) {
  const slug = params.slug
  const query = `*[_type == 'post' && slug.current == '${slug}']{"created": _createdAt, excerpt, body, "productSlug": product->slug.current, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}`
  let postData
  await client.fetch(query)
  .then((posts: Array<PostType>) => postData = posts[0])
  console.log(postData)
   let postJson: string
   postData ? postJson = JSON.stringify(postData) : postJson = '{"undefined":"true"}'

   let settingsData
   const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
   await client.fetch(settingsquery)
   .then((settings: Array<AboutMe>) => settingsData = settings)
   const settingsJson = JSON.stringify(settingsData)

  return {
    props: {
      post: postJson,
      aboutMe: settingsJson
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]{"slug": slug.current}[0...50]`
  let data:Array<PostType> = []
  await client.fetch(query)
  .then((posts: Array<PostType>) => data = posts)
  
  return {
    paths: data.map((post:PostType)=> {
      return {params: {slug: post.slug}}
    })
    ,
    fallback: true
  };
}

export default Post