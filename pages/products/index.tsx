import client from "../../client"
import { AboutMe, Product as ProductType } from "../../generalTypes"
import Masonry from 'react-masonry-css'
import Product from "../../components/Product"
import Nav from '../../components/Nav'
import { screenSizes } from '../../styles/globalStyleVariables'
import Head from "next/head"
import { Header } from "../../components/GlobalElements"
import { useEffect, useState } from "react"

const Products = ({ aboutMe }: { aboutMe: string}) => {
  let suscriptionHasRun:boolean = false;
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const [_products, set_products] = useState<Array<ProductType>>([]);
  const productsQuery = `*[_type == 'product']{_createdAt, productHeight, "id": _id, lastReservedAt, sold, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`

  useEffect(()=>{
    if(process.browser) {
      client.fetch(productsQuery)
      .then((data:Array<ProductType>)=> {
        set_products([...data])
      })
    }
  }, [])

  useEffect(()=>{
    if(!suscriptionHasRun) {
      suscriptionHasRun = true
      const subscription = client.listen(productsQuery, {}, {includeResult: true})
        .subscribe((update:any) => {
          let object:ProductType = update.result
          const productArray = [..._products]
  
          let updatePosition:number = 0;
          
          for(let i:number = 0; i < productArray.length; i++) {
            if(productArray[i].slug.current === object.slug.current) {
              updatePosition = i
              break
            }
          }

          setTimeout(() => {
            client.fetch(`*[_type == 'product' && slug.current == '${object.slug.current}']{_createdAt, lastReservedAt, productHeight, productWidth, productDept, sold, pending, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`)
            .then((data:Array<ProductType>)=>{
              object = data[0]
              productArray.splice(updatePosition, 1, object)
              set_products([...productArray])
            })
          }, 2500);
        })  
  
        return () => {
          subscription.unsubscribe()
        }
    }
  }, [_products])

    const breakpointColumnsObj = {
      default: 4,
      [screenSizes.L]: 3,
      [screenSizes.M]: 2,
      [screenSizes.S]: 1
    };
    console.log(_products)
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
          {_products.map((product:ProductType, key:any)=>(
            <Product sold={product.sold} lastReserved={product.lastReservedAt} key={key} alt={product.alt || 'no alt text'} images={product.images} slug={product.slug.current} hasShadow={true}></Product>
          ))}
        </Masonry>
      </>
    ) 
  }

export async function getStaticProps() {
    // const query = `*[_type == 'product']{_createdAt, productHeight, "id": _id, lastReservedAt, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`
    // let productsData
    // await client.fetch(query)
    // .then((products: any) => productsData = products)
    //  let productJson: string
    //  productsData ? productJson = JSON.stringify(productsData) : productJson = '{}'

    let settingsData
    const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
    await client.fetch(settingsquery)
    .then((settings: Array<AboutMe>) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)
  
    return {
      props: {
        // products: productJson,
        aboutMe: settingsJson
      },
      revalidate: 10
    }
  }

  export default Products