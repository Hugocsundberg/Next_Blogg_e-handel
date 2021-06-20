import { useRouter } from 'next/router'
import client from '../../client'
import { post } from '../../generalTypes'

const Post = ({ post }) => {
  const router = useRouter()
  const { slug } = router.query
  let _post:post
  if(post) {
    _post = JSON.parse(post) 
  }
  if (router.isFallback) {
    return <div>Loading...</div>
  } else if(_post.undefined) {
    return <h1>404</h1>
  }
  return (
    <>
    <p>Post: {slug}</p>
    <h1>{_post.title}</h1>
    <h1>hello</h1>
    </>
  )
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  console.log(params)
  const query = `*[slug.current == "${slug}"]{"created": _createdAt, excerpt, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url}`
  let data
  await client.fetch(query)
  .then(posts => data = posts[0])
   let postJson
   data ? postJson = JSON.stringify(data) : postJson = '{"undefined":"true"}'
   console.log(postJson)

  return {
    props: {
      post: postJson,
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]{"slug": slug.current}[0...50]`
  let data
  await client.fetch(query)
  .then(posts => data = posts)
  
  return {
    paths: data.map(post=> {
      return {params: {slug: post.slug}}
    })
    ,
    fallback: true
  };
}

export default Post