import { useRouter } from 'next/router'
import client from '../../client'
import { AboutMe, Post as PostType } from '../../generalTypes'
// @ts-ignore
import PortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import { ContentContainer } from './elements'
import Image from 'next/image'
import FlexCenterCenter from '../../components/GlobalElements/FlexCenterCenter'
import { Paragraph } from './elements'
import Nav from '../../components/Nav'

const builder = imageUrlBuilder(client)

const urlFor = (source: string) => {
  return builder.image(source)
}

const Post = ({ post, aboutMe }: {post: string, aboutMe: string}) => {
  console.log(aboutMe)
  const _aboutMe:Array<AboutMe> = JSON.parse(aboutMe)
  const _post: PostType = JSON.parse(post)
  if(_aboutMe[0].Slug.current === _post.slug) {
    _aboutMe.pop()
  }
  console.log(_aboutMe)
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <>
        <FlexCenterCenter height="100vh">
          <div>Loading...</div>
        </FlexCenterCenter>
      </>
    )
  }
  
  const serializers = {
    types: {
      image: (props:any) => (
        <Image
          src={urlFor(props.node.asset).url() || '/noImage.jpg'}
          alt="image"
          width={(_post as PostType).imageWidth || 1950}
          height={(_post as PostType).imageHeight || 1300}
          layout="responsive"
        />
      )
    }
  }
  
  if(_post.title) {
    return (
      <>
        <Nav aboutMe={_aboutMe}></Nav>
        <ContentContainer>
          <PortableText
            blocks={(_post as PostType).body}
            serializers={serializers}
            projectId="9r33i0al"
            dataset="production"
          />
        </ContentContainer>
      </>
    )
  }
  else {
    return (
      <FlexCenterCenter height="100vh">
        <h1>404</h1>
        <Paragraph>Nånting finns inte</Paragraph>
      </FlexCenterCenter>
    ) 
  }
  
}

export async function getStaticProps({ params }: {params: any}) {
  const slug = params.slug
  const query = `*[_type == 'post' && slug.current == '${slug}']{"created": _createdAt, excerpt, body, title, "slug": slug.current, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}`
  let postData
  await client.fetch(query)
  .then((posts: Array<PostType>) => postData = posts[0])
  console.log(postData)
   let postJson: string
   postData ? postJson = JSON.stringify(postData) : postJson = '{"undefined":"true"}'

   let settingsData
    const settingsquery = '*[_type == "settings"]{"Slug": aboutme->slug,"Title": aboutme->title}'
    await client.fetch(settingsquery)
    .then((settings: Array<AboutMe>) => settingsData = settings)
    const settingsJson = JSON.stringify(settingsData)

  return {
    props: {
      post: postJson,
      aboutMe: settingsJson
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const query = `*[_type == "post"]{"slug": slug.current}[0...50]`
  let data:Array<PostType> = []
  await client.fetch(query)
  .then((posts: Array<PostType>) => data = posts)
  
  return {
    paths: data.map((post:PostType)=> {
      return {params: {slug: post.slug}}
    })
    ,
    fallback: true
  };
}

export default Post