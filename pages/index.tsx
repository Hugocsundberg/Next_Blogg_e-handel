import Head from 'next/head'
import client from '../client'
import { GetStaticProps } from 'next'
import { forwardRef, useEffect, useCallback, useRef, useState } from 'react'
import PostComponent from '../components/Post/Post'
import { Header } from '../components/GlobalElements'
import Nav from '../components/Nav'
import { AboutMe, Post as PostType, } from '../generalTypes'
import Masonry from '../components/Masonry'
import useLazyLoad from '../hooks/useLazyLoad'  
import { Background } from '../components/GlobalElements'
// @ts-ignore
import * as smoothScroll from 'smoothscroll'
const CURRENT_PRODUCT_INITIAL = 6;

export default function Home({ posts, aboutMe }: {posts: string, aboutMe: string}) {
  const incrementBy = 4
  const [currentProduct, setCurrentProduct] = useState(CURRENT_PRODUCT_INITIAL - incrementBy)
  const observer = useRef<IntersectionObserver>()
  const PostComponentWithRef = forwardRef(PostComponent)
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [cols, setCols] = useState<Array<Array<React.ReactNode>>>([]);
  const {result, loading, error, hasMore, setResult} = useLazyLoad<PostType>(query, incrementBy, JSON.parse(posts))
  const lastElementRef = useRef()

  const breakPoints = {
    S: 800,
    M: 1200,
    L: 1800
  };

  useEffect(()=>{
      if(observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((e)=>{
        if(e[0].isIntersecting) {
          setCurrentProduct(prevValue => prevValue + incrementBy)
        }
      });
      if(lastElementRef.current) {
        observer.current.observe(lastElementRef.current)
      }
  }, [cols])
  
  useEffect(()=>{
    if(currentProduct >= CURRENT_PRODUCT_INITIAL )
    setQuery(`*[_type == "post"]{"created": _createdAt, excerpt, body, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}[${currentProduct}...${currentProduct + incrementBy + 1}]`)
  }, [currentProduct])
  
  const scrollHandler = (e:any) => {
    if((e.currentTarget.location.pathname || 'null') === '/')
    window.sessionStorage.setItem('BloggScrollPosition', window.scrollY.toString())
  }
  
  useEffect(()=>{

    // ScrollPosition
    const previousScrollPosition:number = parseInt(window.sessionStorage.getItem('BloggScrollPosition') || '0')
    if(previousScrollPosition > 0)
    smoothScroll(previousScrollPosition)
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  
  return (
    <Background>
      <Nav aboutMe={_aboutMe}></Nav>
      <Head>
        <title>Blogg</title>
      </Head>
      <Header>BLOGG</Header>
      <Masonry 
        result={result}
        setCols={setCols}
        cols={cols}
        breakPoints={breakPoints}
        >
        {[]}
        { result.map((post, index)=>{
          if(index + 1 >= result.length) {
            return (
              <PostComponentWithRef
              ref={lastElementRef}
              key={index}
              excerpt={post.excerpt} 
              title={post.title} 
              imageRef={post.imageUrl || '/noImage.jpeg'} 
              date={post.created}
              imageHeight={post.imageHeight || 1300}
              imageWidth={post.imageWidth || 1950}
              url={`/post/${post.slug}`}
              />
            )
            }
        else 
        return (
          <PostComponentWithRef
              key={index}
              excerpt={post.excerpt} 
              title={post.title} 
              imageRef={post.imageUrl || '/noImage.jpeg'} 
              date={post.created}
              imageHeight={post.imageHeight || 1300}
              imageWidth={post.imageWidth || 1950}
              url={`/post/${post.slug}`}
              />
        )
        })}
      </Masonry>
    </Background>
  )
}

export const getStaticProps:GetStaticProps = async () : Promise<any> => {
    // let postsData:Array<PostType>
    let postsJson:string = '[]'

    const postsQuery = `*[_type == "post"]{"created": _createdAt, excerpt, body, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}[0...${CURRENT_PRODUCT_INITIAL}]`

    await client.fetch(postsQuery)
    .then((posts: Array<PostType>) => {
      postsJson = JSON.stringify(posts)
    })

    let settingsData
    const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
    await client.fetch(settingsquery)
    .then((settings: Array<AboutMe>) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)

  return {
    props: {
      posts: postsJson,
      aboutMe: settingsJson
    },
  }
}
