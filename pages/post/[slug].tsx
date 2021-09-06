import { useRouter } from 'next/router'
import client from '../../client'
import { AboutMe, Post as PostType } from '../../generalTypes'
// @ts-ignore
import PortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import { FlexCenterCenter } from '../../components/GlobalElements'
import Nav from '../../components/Nav'
import ActionButton from '../../components/ActionButton'
import styled from 'styled-components'
import { boxShadowBigElement, margin } from '../../styles/globalStyleVariables'
import { ButtonContainer } from '../../components/GlobalElements/ActionButtonElements'
import { Background } from '../../components/GlobalElements'
import Head from 'next/head'
import SquareLoader from "react-spinners/SquareLoader";
import { isReserved } from '../../functions'

const CenterContent = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    padding: ${margin}rem;
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
  console.log('_aboutMe')
  console.log(_aboutMe)
  const _post: PostType = JSON.parse(post)

  if(_aboutMe[0].slug.current === _post.slug) {
    _aboutMe.pop()
  }
  const router = useRouter()
  
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
    if(_post.productSlug && (!_post.productSold && !isReserved(_post.productReserved) ? true : false) )
    router.push(`/product/${_post.productSlug}`)
  }
  
  if(_post.title) {
    const _isReserved:(number | false) = isReserved(_post.productReserved || null)
    let ProductButtonContent:string = 'Gå till produkt'
    if(_isReserved) ProductButtonContent = `Reserverad av någon i ${_isReserved} min`
    if(_post.productSold) ProductButtonContent = `Såld`

    return (
      <>
        <Head>
        <title>Cart</title>
        </Head>
        <Background>
          <Nav aboutMe={aboutMeStatic}></Nav>
          <CenterContent>
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
            <ActionButton disabled={(_isReserved || _post.productSold) ? true : false} onClick={actionButtonHandler} text={ProductButtonContent}></ActionButton>
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
        <Paragraph>Sidan finns inte 🥲</Paragraph>
      </FlexCenterCenter>
    ) 
  }
  
}

export async function getStaticProps({ params }: {params: any}) {
  const slug = params.slug
  let postJson
  const query = `*[_type == 'post' && slug.current == '${slug}']{"created": _createdAt, excerpt, body, "productSlug": product->slug.current, "productReserved": product->lastReservedAt, "productSold": product->sold, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}`
  await client.fetch(query)
  .then((posts: Array<PostType>) => {
    const postData = posts[0]
    postJson = JSON.stringify(postData)
  })

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
    revalidate: 60
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