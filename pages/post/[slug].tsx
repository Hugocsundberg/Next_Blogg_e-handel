import { useRouter } from 'next/router'
import client from '../../client'
import { post } from '../../generalTypes'
// @ts-ignore
import PortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import ContentContainer from './elements/ContentContainer'
import Image from 'next/image'

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Post = ({ post }: {post: string}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const _post: any = JSON.parse(post)

  const serializers = {
    types: {
      image: (props:any) => (
        <Image
          src={urlFor(props.node.asset).url()}
          alt="image"
          width={500}
          height={500}
          layout="responsive"
        />
      )
    }
  }
  
  if(_post.title) {
    return (
      <ContentContainer>
        <PortableText
          blocks={(_post as post).body}
          serializers={serializers}
          projectId="9r33i0al"
          dataset="production"
        />
      </ContentContainer>
    )
  }
  else {
    return <h1>404</h1>
  }
  
}

export async function getStaticProps({ params }: {params: any}) {
  const slug = params.slug
  const query = `*[_type == 'post' && slug.current == '${slug}']{"created": _createdAt, excerpt, body, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}`
  let data
  await client.fetch(query)
  .then((posts: Array<post>) => data = posts[0])
  console.log(data)
   let postJson: string
   data ? postJson = JSON.stringify(data) : postJson = '{"undefined":"true"}'

  return {
    props: {
      post: postJson,
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]{"slug": slug.current}[0...50]`
  let data:any
  await client.fetch(query)
  .then((posts: Array<post>) => data = posts)
  
  return {
    paths: data.map((post:any)=> {
      return {params: {slug: post.slug}}
    })
    ,
    fallback: true
  };
}

export default Post