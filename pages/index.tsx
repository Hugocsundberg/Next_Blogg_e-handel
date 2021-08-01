import Head from 'next/head'
import client from '../client'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import PostComponent from '../components/Post/Post'
import Header from '../components/GlobalElements/Header'
import Nav from '../components/Nav'
import { AboutMe, Post as PostType, ScrollEvent } from '../generalTypes'
import { ScrollPositionObjectType } from '../generalTypes'
import Masonry from 'react-masonry-css'
import { screenSizes } from '../styles/globalStyleVariables'

export default function Home({ posts, aboutMe }: {posts: string, aboutMe: string}) {
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const _posts:Array<PostType> = JSON.parse(posts)
  useEffect(() => {
    //Scroll to last position or top
    window.scrollTo(0, parseInt(window.sessionStorage.getItem('scrollPosition') || '0'))
    
    //Set background color to light gray
    document.body.style.background="#F7F7F7"

    const handleScroll = (e: Event) => {
      //Get scrollData JSON
      let scrollPositionObject:ScrollPositionObjectType = JSON.parse(window.sessionStorage.getItem('scrollPosition') || '{}') 
      //Set current page scroll position
      scrollPositionObject['./'] = window.pageYOffset
      //Check if page is correct
      const URLstring:string = (e as ScrollEvent).path[0].URL
      const regex = new RegExp('(?<!\/)\/[^\/].*')
      if(!URLstring.match(regex))
      //Update Sessionstorage
      window.sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPositionObject))
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.background="#FFF"
    }
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    [1400]: 3,
    [screenSizes.L]: 2,
    [screenSizes.M]: 1
  };

  return (
    <>
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
    </>
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
