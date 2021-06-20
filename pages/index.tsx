import Head from 'next/head'
import client from '../client'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import Post from '../components/post'
import Header from '../components/elements/Header'
import Nav from '../components/Nav'
import { post } from '../generalTypes'
import { title } from 'process'
import BlockContent from '@sanity/block-content-to-react'

export default function Home({ posts }) {
  useEffect(() => {
    document.body.style.background="#F7F7F7"
  }, []);

  const parsedPosts:Array<post> = JSON.parse(posts)
  return (
    <>
    <Head>
      <title>Blogg</title>
    </Head>
    <Nav></Nav>
    <Header>BLOGG</Header>
    { parsedPosts.map((post, index)=>(
      <Post 
      key={index}
      excerpt={post.excerpt} 
      title={post.title} 
      imageRef={post.imageUrl} 
      date={post.created}
      />
    ))}
    </>
  )
}

export const getStaticProps:GetStaticProps = async (context) => {
    let data
    const query = '*[_type == "post"]{ "created": _createdAt, excerpt, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url}'
    await client.fetch(query)
    .then(posts => data = posts)
    const postsJson = JSON.stringify(data)

  return {
    props: {posts: postsJson}, // will be passed to the page component as props
  }
}
