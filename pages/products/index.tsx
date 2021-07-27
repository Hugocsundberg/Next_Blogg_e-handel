import client from "../../client"
import { AboutMe, Product as ProductType } from "../../generalTypes"
import { getCols } from "../../functions"
import { useEffect, useState} from "react"
import Masonry from 'react-masonry-css'
import Product from "../../components/Product"
import Nav from '../../components/Nav'
import styled from 'styled-components'
import { margin } from '../../styles/globalStyleVariables'
import Head from "next/head"
import Header from "../../components/GlobalElements/Header"

const Products = ({ products, aboutMe }: {products: string, aboutMe: string}) => {
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
    // const [cols, setCols] = useState<number>(0);
    // const sizeHandler = () => {
    //     setCols(getCols(window.innerWidth))
    // }
    // useEffect(() => {
    //     sizeHandler()
    //     window.addEventListener('resize', sizeHandler)
    //     return () => {
    //         window.removeEventListener('resize', sizeHandler)
    //     };
    // }, []);

    const _products: Array<ProductType> = JSON.parse(products)
    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };
    return (
      <>
        <Head>
        <title>Products</title>
        </Head>
        <Nav aboutMe={_aboutMe}></Nav>
        <Header>PRODUKTER</Header>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column">
          {_products.map((product, key)=>(
            <Product key={key} alt={product.alt || 'no alt text'} images={product.images} slug={product.slug.current}></Product>
          ))}
        </Masonry>
      </>
    ) 
  }

export async function getStaticProps({ params }: {params: any}) {
    const query = `*[_type == 'product']{_createdAt, productHeight, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`
    let productsData
    await client.fetch(query)
    .then((products: any) => productsData = products)
     let productJson: string
     productsData ? productJson = JSON.stringify(productsData) : productJson = '{}'

    let settingsData
    const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
    await client.fetch(settingsquery)
    .then((settings: Array<AboutMe>) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)
  
    return {
      props: {
        products: productJson,
        aboutMe: settingsJson
      },
      revalidate: 10
    }
  }

  export default Products