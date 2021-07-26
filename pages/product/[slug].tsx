import { useRouter } from 'next/router'
import client from '../../client'
import { AboutMe, Post as PostType, Product as ProductType } from '../../generalTypes'
// @ts-ignore
import PortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import FlexCenterCenter from '../../components/GlobalElements/FlexCenterCenter'
import Nav from '../../components/Nav'
import Paragraph from '../../components/GlobalElements/Paragraph'
import styled from 'styled-components'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { margin } from '../../styles/globalStyleVariables'
import ArrowNext from '../../components/Arrow'
import Arrow from '../../components/Arrow'

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Header  = styled.h1`
`

const P = styled.p`
`

const ThumbContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2rem;
`

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  padding-left: ${margin}rem;
  padding-right: ${margin}rem;
`


const Product = ({ product, aboutMe }: {product: string, aboutMe: string}) => {
  console.log(product)
  const _aboutMe: Array<AboutMe> = JSON.parse(aboutMe)
  const _product: ProductType = JSON.parse(product)
  console.log(JSON.parse(product))
  console.log(`_product: ${_product}`)
  console.log(_product)
  console.log(`_aboutMe: ${_aboutMe}`)
  const router = useRouter()
  
  const renderThumbs = (props:any) => {
    console.log(props)
    return _product.images.map((image)=> (
      <ThumbContainer>
        <Image
            src={urlFor(image.asset._ref).url() || '/noImage.jpg'}
            alt={image.alt || 'no alt text'}
            // width={image.imageWidth}
            // height={image.imageHeight}
            layout={'fill'}
            objectFit={'cover'}
        />
      </ThumbContainer>
    ))
  }

  const renderArrowNext = (props:any) => <Arrow right={true}/>
  
  if (router.isFallback) {
    return (
      <>
        <FlexCenterCenter height="100vh">
          <div>Loading...</div>
        </FlexCenterCenter>
      </>
    )
  }
  
  if(_product.title) {
    return (
      <>
        <Nav aboutMe={_aboutMe}></Nav>
        <ContentContainer>
          {/* <ArrowNext right={true}/> */}
          <Header>{_product.title}</Header>
          <Carousel renderArrowNext={renderArrowNext} showIndicators={false} thumbWidth={60} autoPlay={false} renderThumbs={renderThumbs} showThumbs useKeyboardArrows emulateTouch={true} dynamicHeight={true} autoFocus={true} showArrows={true}>
                  {_product.images.map(image=>(
                      <>
                      <Image
                          src={urlFor(image.asset._ref).url() || '/noImage.jpg'}
                          alt={image.alt || 'no alt text'}
                          width={image.imageWidth}
                          height={image.imageHeight}
                          layout="responsive"
                      />
                      </>
                  ))}
          </Carousel>
          <P>{_product.desc}</P>
        </ContentContainer>
      </>
    )
  }
  else {
    return (
      <FlexCenterCenter height="100vh">
        <h1>404</h1>
        <Paragraph>Produkt finns inte</Paragraph>
      </FlexCenterCenter>
    ) 
  }
  
}

export async function getStaticProps({ params }: {params: any}) {
  const slug = params.slug
  const query = `*[_type == 'product' && slug.current == '${slug}']{_createdAt, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`
  let productData
  await client.fetch(query)
  .then((products: Array<ProductType>) => productData = products[0])
  console.log(productData)
   let postJson: string
   productData ? postJson = JSON.stringify(productData) : postJson = '{"undefined":"true"}'

   let settingsData
   const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
   await client.fetch(settingsquery)
   .then((settings: Array<AboutMe>) => settingsData = settings)
   const settingsJson = JSON.stringify(settingsData)

  return {
    props: {
      product: postJson,
      aboutMe: settingsJson
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const query = `*[_type == "product"]{"slug": slug.current}[0...10]`
  let data:Array<any> = []
  await client.fetch(query)
  .then((products: Array<any>) => data = products)
  
  return {
    paths: data.map((product:any)=> {
      return {params: {slug: product.slug}}
    })
    ,
    fallback: true
  };
}

export default Product