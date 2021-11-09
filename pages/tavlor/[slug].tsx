import { useRouter } from 'next/router'
import client from '../../client'
import { AboutMe, Product as ProductType } from '../../generalTypes'
// @ts-ignore
import imageUrlBuilder from '@sanity/image-url'
import Image from 'next/image'
import { FlexCenterCenter } from '../../components/GlobalElements'
import Nav from '../../components/Nav'
import { Paragraph } from '../../components/GlobalElements'
import styled from 'styled-components'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { SmallParagraph } from '../../components/GlobalElements'
import { margin } from '../../styles/globalStyleVariables'
import Arrow from '../../components/Arrow'
import ActionButton from '../../components/ActionButton'
import { addObjectToStorage, getFromStorage, getTopOverlayHeight } from '../../functions'
import { screenSizes } from '../../styles/globalStyleVariables'
import { useEffect, useState } from 'react'
import { ButtonContainer } from '../../components/GlobalElements/ActionButtonElements'
import SquareLoader from "react-spinners/SquareLoader";

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Header  = styled.h1`
margin-bottom: 0;
`

const P = styled.p`
margin-top: 0.5rem;
margin-bottom: 2rem;
font-weight: light;
`

const ThumbContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2rem;
`

const ContentContainer = styled.div<{overlayHeight: number}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${props => props.overlayHeight}px);
  padding-left: ${margin}rem;
  padding-right: ${margin}rem;
  padding-bottom: 6rem;
  @media (min-width: ${screenSizes.M}px) {
    justify-content: center;
    position: relative;
  }
`

const CenterContent = styled.div`
width: 100%;
@media (min-width: ${screenSizes.M}px) {
  width: unset;
  display: flex;
  justify-content: center;
  }
`

const ArrowContainer = styled.div`
`

const H3 = styled.h3`
font-weight: bold;
margin: 0;
margin-top: 2rem;
`

const Block1 = styled.div`
  flex-grow: 8;
  `
const Block2 = styled.div`
  flex-grow: 1;
  position: relative;
  margin-top: 2%;
  @media (min-width: ${screenSizes.M}px) {
    max-width: 40%;
  }
`

const BlockContainer = styled.div`
  @media (min-width: ${screenSizes.M}px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width:80%;
    min-width: 700px;
  }
`



const Product = ({ product, aboutMe }: {product: string, aboutMe: string}) => {

  if(!product) {
    return (
      <FlexCenterCenter height="100vh">
        <h1>418</h1>
        <Paragraph>Problem 🫖</Paragraph>
      </FlexCenterCenter>
    )
  }
  const _aboutMe: Array<AboutMe> = JSON.parse(aboutMe)
  const _product: ProductType = JSON.parse(product)
  const [isDesktop, setisDesktop] = useState(false);
  const [navoverlayHeight, setnavoverlayHeight] = useState(0);
  const router = useRouter()
  
  const resizeHandler = () => {
      if(window.innerWidth >= 700)
        setisDesktop(true)
      else 
        setisDesktop(false)
  }

  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    const topOverlayHeight:number = getTopOverlayHeight()

    setnavoverlayHeight(topOverlayHeight) 
    return ()=>{
      window.removeEventListener('resize', resizeHandler)
    }
  }, []);
  
  const renderThumbs = () => {
    return _product.images.map((image)=> (
      <ThumbContainer>
        <Image
            src={urlFor(image.asset._ref).url() || '/noImage.jpg'}
            alt={image.alt || 'no alt text'}
            layout={'fill'}
            objectFit={'cover'}
        />
      </ThumbContainer>
    ))
  }

  const renderArrowNext = (clickHandler:any , another:boolean) => {
    return (
      another ? 
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={true} fadeOut={false}/>
      </ArrowContainer>
      : 
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={true} fadeOut={true}/>
      </ArrowContainer>
      )
  }
  const renderArrowPrev = (clickHandler:any , another:boolean) => {
    return (
      another ? 
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={false} fadeOut={false}/>
      </ArrowContainer>
      : 
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={false} fadeOut={true}/>
      </ArrowContainer>
      )
  }

  const handleAddToCart = () => {
    //Add to local storage
    const cart = getFromStorage('cart')
    const __product = {..._product}
    __product.lastReservedAt = Date.now()
    if(!cart.find((product => (product as ProductType).slug.current === _product.slug.current)))
    addObjectToStorage('cart', __product)
    else alert('Product already added to cart')
    //Send pending request
    if(process.browser)
    window.fetch('/api/reserve', {method: 'POST', body: product, headers: {'Content-Type': 'application/json' }})
    .then((stream)=>stream.json())
    .then((data)=>console.log(data))
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
  
  if(_product.title) {
    return (
      <>
        <Nav aboutMe={_aboutMe}></Nav>
        <ContentContainer overlayHeight={navoverlayHeight}>
          <CenterContent>
            {!isDesktop ? <Header>{_product.title}</Header> : ''} 
            <BlockContainer>
              <Block1>
                <Carousel width={'100%'} stopOnHover transitionTime={300} renderArrowPrev={renderArrowPrev} renderArrowNext={renderArrowNext} showIndicators={false} thumbWidth={60} autoPlay={false} interval={1000000} renderThumbs={renderThumbs} showThumbs useKeyboardArrows emulateTouch={true} dynamicHeight={true} autoFocus={true} showArrows={true}>
                        {_product.images.map((image, i)=>(
                          <Image
                          key={i}
                          src={urlFor(image.asset._ref).url() || '/noImage.jpg'}
                          alt={image.alt || 'no alt text'}
                          width={image.imageWidth}
                          height={image.imageHeight}
                          layout="responsive"
                          className="image-border"
                          />
                          ))}
                </Carousel>
              </Block1>
              <Block2>
              {isDesktop ? <Header>{_product.title}</Header> : ''}
                <H3>Beskrivning</H3>
                <SmallParagraph>{_product.desc}</SmallParagraph>
                <H3>Storlek</H3>
                <SmallParagraph>{`${_product.productWidth} x ${_product.productHeight}${_product.productDept ? ` x ${_product.productDept}` : ''}`} cm</SmallParagraph>
                <H3>Pris</H3>
                <SmallParagraph>{_product.price} kr</SmallParagraph>
              </Block2>
            </BlockContainer>
          </CenterContent>
        </ContentContainer>
        <ButtonContainer>
          <ActionButton onClick={handleAddToCart} text='Lägg till i kundvagn'></ActionButton>
        </ButtonContainer>
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
  const query = `*[_type == 'product' && slug.current == '${slug}']{_createdAt, sold, lastReservedAt, "id": _id, productHeight, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`
  let productData
  await client.fetch(query)
  .then((products: Array<ProductType>) => productData = products[0])
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
    }
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