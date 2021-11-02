import client from "../client"
import { AboutMe, Product as ProductType } from "../generalTypes"
// import Masonry from 'react-masonry-css'
import Product from "../components/Product"
import Nav from '../components/Nav'
import { screenSizes } from '../styles/globalStyleVariables'
import Head from "next/head"
import { Header } from "../components/GlobalElements"
import { useCallback, useEffect, useRef, useState } from "react"
import useLazyLoad from "../hooks/useLazyLoad"
import Skeleton from "../components/Skeleton"
import { motion } from "framer-motion"
import React from "react"
import Masonry from "../components/Masonry"

const MasonryComponent = React.forwardRef(Masonry)
const MotionMasonry = motion(MasonryComponent)

// const SkeletonComponent = React.forwardRef(Skeleton)
// const MotionSkeleton = motion(SkeletonComponent)

const Products = ({ aboutMe }: { aboutMe: string}) => {
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const incrementBy = 4
  const [query, setQuery] = useState(`*[_type == 'product']{_createdAt, productHeight, "id": _id, lastReservedAt, sold, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}[0...${incrementBy}]`);
  const {result, loading, error, hasMore, setResult} = useLazyLoad<ProductType>(query, incrementBy)
  const [skeletonArray, setSkeletonArray] = useState<Array<object>>([])
  const [currentProduct, setCurrentProduct] = useState(0);
  const [cols, setCols] = useState<Array<Array<React.ReactNode>>>([]);

  const breakPoints = {
    S: screenSizes.S,
    M: screenSizes.M,
    L: screenSizes.L
  };
  
  const containerVariants = {
    fade: {
      transition: {
          staggerChildren: 0.5
      }
  }, 
  }
  const itemVariants = {
    fade: {
      opacity: 0.2,
      transition: {
          repeat: Infinity
      }
  }, 
  }

useEffect(() => {
  if(error) console.log(error)
}, [error]);

  const observableCallback = (update:any) => {
        let object:ProductType = update.result
        const productArray = [...result]

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
              const productArray = [...result]
              productArray.splice(updatePosition, 1, object)
              setResult(productArray)
          })
        }, 2500);

      return () => {
        observable.current.unsubscribe()
      }
  }

  const observer = useRef<IntersectionObserver>()
  const observable = useRef(client.listen(query, {}, {includeResult: true}))

  useEffect(() => {
    const subscription = observable.current.subscribe(observableCallback)
    return () => {
      subscription.unsubscribe()
    }
  }, [result]);

  const lastElementRef = useCallback(node=>{
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((e)=>{
        if(e[0].isIntersecting) {
            setCurrentProduct(prevValue => prevValue + incrementBy - 1)
        }
      });
      if(node) observer.current.observe(node)
  }, [])

  useEffect(() => {
    if(!hasMore) observer.current?.disconnect()
  }, [hasMore]);

  useEffect(()=>{
    setQuery(`*[_type == 'product']{_createdAt, productHeight, "id": _id, lastReservedAt, sold, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}[${currentProduct}...${currentProduct + incrementBy}]`)
  }, [currentProduct])

  useEffect(()=>{
    if(loading && hasMore) {
      let _skeletonArray = [];
      for(let i = 0; i < incrementBy - 1; i++) {
        _skeletonArray.push({})
      }
      setSkeletonArray(_skeletonArray)
    }
    if(!loading) {
      setSkeletonArray([])
    }
  }, [loading])
  

  
  return (
    <>
        <Head>
        <title>Products</title>
        </Head>
        <Nav aboutMe={_aboutMe}></Nav>
        <Header>PRODUKTER</Header>
        <MotionMasonry
          variants={containerVariants}
          animate={'fade'}
          cols={cols}
          setCols={setCols}
          breakPoints={breakPoints}

          result={result}
          skeleton={skeletonArray}
          > 
          {result.map((product:ProductType, i)=>{
            
            if(i + 1 >= result.length) 
            return <Product lastElementRef={lastElementRef} sold={product.sold} lastReserved={product.lastReservedAt} key={i} alt={product.alt || 'no alt text'} images={product.images} slug={product.slug.current} hasShadow={true}></Product>
            
            else 
            return <Product sold={product.sold} lastReserved={product.lastReservedAt} key={i} alt={product.alt || 'no alt text'} images={product.images} slug={product.slug.current} hasShadow={true}></Product>
          })
        }
        {skeletonArray.map(()=>(
        <Skeleton></Skeleton>
        ))}
        </MotionMasonry>
      </>
    ) 
  }
  
  export async function getStaticProps() {
    
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