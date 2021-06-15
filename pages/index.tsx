import Head from 'next/head'
import client from '../client'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import Post from '../components/post'
import Header from '../components/elements/Header'
import Nav from '../components/Nav'

export default function Home({ posts }) {
  useEffect(() => {
    document.body.style.background="#F7F7F7"
  }, []);

  const _posts = JSON.parse(posts)
  return (
    <>
    <Head>
      <title>Blogg</title>
    </Head>
      <Nav></Nav>
      <Header>BLOGG</Header>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      { _posts.map((post, index)=> <h1 key={index}>{post.title}</h1>)}
    
    </>
  )
}

export const getStaticProps:GetStaticProps = async (context) => {
    let _data
    const query = '*[_type == "post"]'
    await client.fetch(query)
    .then(posts => _data = posts)
    const postsJson = JSON.stringify(_data)

  return {
    props: {posts: postsJson}, // will be passed to the page component as props
  }
}
