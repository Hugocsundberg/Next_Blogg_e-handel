import Head from 'next/head'
import client from '../client'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import PostComponent from '../components/Post'
import Header from '../components/elements/Header'
import Nav from '../components/Nav'
import { PostType } from '../generalTypes'
import { title } from 'process'
// @ts-ignore
import BlockContent from '@sanity/block-content-to-react'
import { imageHeight } from '../styles/globalStyleVariables'

export default function Home({ posts }: {posts: string}) {
  useEffect(() => {
    document.body.style.background="#F7F7F7"
  }, []);

  const _Posts:Array<PostType> = JSON.parse(posts)

  return (
    <>
    <Head>
      <title>Blogg</title>
    </Head>
    <Header>BLOGG</Header>
    { _Posts.map((post, index)=>(
      <PostComponent 
      key={index}
      excerpt={post.excerpt} 
      title={post.title} 
      imageRef={post.imageUrl || '/noImage.jpeg'} 
      date={post.created}
      imageHeight={post.imageHeight || 1300}
      imageWidth={post.imageWidth || 1950}
      />
    ))}
    </>
  )
}

export const getStaticProps:GetStaticProps = async (context) => {
    let data
    const query = '*[_type == "post"]{"created": _createdAt, excerpt, body, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}'
    await client.fetch(query)
    .then((posts: Array<PostType>) => data = posts)
    const postsJson = JSON.stringify(data)

  return {
    props: {posts: postsJson}, // will be passed to the page component as props
  }
}
