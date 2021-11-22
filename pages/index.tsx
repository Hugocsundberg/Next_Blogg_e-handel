import Head from "next/head";
import client from "../client";
import { GetStaticProps } from "next";
import { forwardRef, useEffect, useRef, useState } from "react";
import PostComponent from "../components/Post/Post";
import Nav from "../components/Nav";
import { PostLight, settings } from "../generalTypes";
import Masonry from "../components/Masonry";
import useLazyLoad from "../hooks/useLazyLoad";
import { margin, windowHeight } from "../styles/globalStyleVariables";
import { Spacer } from "../components/GlobalElements";
import React from "react";
import { Background } from "../components/GlobalElements";
import { Message } from "../components/Message";
import { scrollToPosition, urlFor } from "../functions";

const breakPoints = {
  S: 800,
  M: 1200,
  L: 1800,
};

// Sets the initial number of posts to be prerendered.
const CURRENT_PRODUCT_INITIAL = 6;

export default function Home({
  posts,
  settings,
}: {
  posts: string;
  settings: string;
}) {
  // Increment for lazy loading
  const incrementBy = 4;
  const [currentProduct, setCurrentProduct] = useState(
    CURRENT_PRODUCT_INITIAL - incrementBy
  );
  const observer = useRef<IntersectionObserver>();
  const PostComponentWithRef = forwardRef(PostComponent);
  const _settings: settings = JSON.parse(settings);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [cols, setCols] = useState<Array<Array<React.ReactNode>>>([]);
  const { result, loading, hasMore } = useLazyLoad(
    query,
    incrementBy,
    JSON.parse(posts)
  );

  // Element to be triggered by intersection observer for lazy loading
  const lastElementRef = useRef<Element | undefined>();

  // Reset intersectionobserver to current latest element when cols update.
  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((e) => {
      // Increase currentproduct on intersection.
      if (e[0].isIntersecting) {
        setCurrentProduct((prevValue) => prevValue + incrementBy);
      }
    });
    if (lastElementRef.current != undefined) {
      console.log(lastElementRef.current);
      observer.current.observe(lastElementRef.current);
    }
  }, [cols]);

  // Update query on currentProduct change.
  useEffect(() => {
    if (currentProduct >= CURRENT_PRODUCT_INITIAL)
      // Query is being consumed by 'useLazyLoad' hook.
      setQuery(
        `*[_type == "post"] | order(_createdAt desc){"created": _createdAt, excerpt, title, "slug": slug.current, "altText": body[_type match 'image'][0].altText, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}[${currentProduct}...${
          // One extra item is fetched to check if there are more items to be fetched. useLazyLoad removes extra items.
          currentProduct + incrementBy + 1
        }]`
      );
  }, [currentProduct]);

  useEffect(() => {
    scrollToPosition();
  }, []);

  return (
    <Background>
      <Nav aboutMe={_settings.aboutMe}></Nav>
      <Head>
        <title>Marinas Ateljé</title>
      </Head>
      <Spacer height={`${margin}rem`}></Spacer>
      {_settings.message ? (
        <Message
          left={true}
          imageLink={
            urlFor(_settings.messageImage._ref).width(128).url() ||
            "noImage.jpeg"
          }
          message={_settings.message}
        />
      ) : (
        ""
      )}
      <Masonry
        result={result}
        setCols={setCols}
        cols={cols}
        breakPoints={breakPoints}
      >
        {(result as Array<PostLight>).map((post, index) => {
          return (
            <PostComponentWithRef
              aspectRatio={post.aspectRatio}
              breakPoints={breakPoints}
              // Set ref to last element
              ref={index + 1 >= result.length ? lastElementRef : null}
              key={index}
              altText={post.altText}
              excerpt={post.excerpt}
              title={post.title}
              imageRef={
                post.imageUrl ||
                "image-2946cbfff3374e1751d92c4059ec5406f107ea40-1950x1300-jpg"
              }
              date={post.created}
              url={`/${post.slug}`}
            />
          );
        })}
      </Masonry>
      {hasMore ? (
        <Spacer
          suppressHydrationWarning
          height={`${windowHeight - 10}px`}
        ></Spacer>
      ) : (
        ""
      )}
    </Background>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let postsJson: string = "[]";

  const postsQuery = `*[_type == "post"] | order(_createdAt desc){"created": _createdAt, excerpt, title, "slug": slug.current, "altText": body[_type match 'image'][0].altText, "imageUrl": body[_type == "image"][0].asset->url, "imageHeight": body[_type == "image"][0].asset->metadata.dimensions.height, "imageWidth": body[_type == "image"][0].asset->metadata.dimensions.width, "aspectRatio": body[_type == "image"][0].asset->metadata.dimensions.aspectRatio}[0...${CURRENT_PRODUCT_INITIAL}]`;

  const posts: Array<PostLight> = await client.fetch(postsQuery);
  postsJson = JSON.stringify(posts);

  const settingsquery =
    '*[_type == "settings"][0]{"aboutMe": aboutme->{title, slug}, "message": messageBlog, "messageImage": messageImage.asset}';

  const settings: settings = await client.fetch(settingsquery);
  const settingsJson = JSON.stringify(settings);

  return {
    props: {
      posts: postsJson,
      settings: settingsJson,
    },
  };
};
