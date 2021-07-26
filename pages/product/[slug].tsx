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

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Header  = styled.h1`

`

const Product = ({ product, aboutMe }: {product: string, aboutMe: string}) => {
  console.log(product)
  const _aboutMe: Array<AboutMe> = JSON.parse(aboutMe)
  const _product: ProductType = JSON.parse(product)
  console.log(JSON.parse(product))
  console.log(`_product: ${_product}`)
  console.log(`_aboutMe: ${_aboutMe}`)
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
  
  if(_product.title) {
    return (
      <>
        <Nav aboutMe={_aboutMe}></Nav>
        <Header>{_product.title}</Header>
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
  const query = `*[_type == 'product' && slug.current == '${slug}']{_createdAt, _updatedAt, image, price, slug, title}`
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