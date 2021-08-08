import Head from 'next/head'
import client from '../client'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import PostComponent from '../components/Post/Post'
import { Header } from '../components/GlobalElements'
import Nav from '../components/Nav'
import { AboutMe, Post as PostType, ScrollEvent } from '../generalTypes'
import { ScrollPositionObjectType } from '../generalTypes'
import Masonry from 'react-masonry-css'
import { Background } from '../components/GlobalElements'
// @ts-ignore
import * as smoothScroll from 'smoothscroll'

export default function Home({ posts, aboutMe }: {posts: string, aboutMe: string}) {
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const _posts:Array<PostType> = JSON.parse(posts)

  const breakpointColumnsObj = {
    default: 4,
    [1800]: 3,
    [1400]: 2,
    [800]: 1
  };

const scrollHandler = (e:Event) => {
  const URLstring:string = (e as ScrollEvent).path[0].URL
  const regex = new RegExp('(?<!\/)\/[^\/].*')
  if(!URLstring.match(regex))
  window.sessionStorage.setItem('BloggScrollPosition', window.scrollY.toString())
}

useEffect(()=>{
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
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
        >
        { _posts.map((post, index)=>(
          <PostComponent 
          key={index}
          excerpt={post.excerpt} 
          title={post.title} 
          imageRef={post.imageUrl || '/noImage.jpeg'} 
          date={post.created}
          imageHeight={post.imageHeight || 1300}
          imageWidth={post.imageWidth || 1950}
          url={`/post/${post.slug}`}
          />
        ))}
      </Masonry>
    </Background>
  )
}

export const getStaticProps:GetStaticProps = async (context) : Promise<any> => {
    let postsData
    const postsQuery = '*[_type == "post"]{"created": _createdAt, excerpt, body, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}'
    await client.fetch(postsQuery)
    .then((posts: Array<PostType>) => postsData = posts)
    const postsJson = JSON.stringify(postsData)

    let settingsData
    const settingsquery = '*[_type == "settings"]{"slug": aboutme->slug,"title": aboutme->title}'
    await client.fetch(settingsquery)
    .then((settings: Array<AboutMe>) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)

  return {
    props: {
      posts: postsJson,
      aboutMe: settingsJson
    }, // will be passed to the page component as props
  }
}
