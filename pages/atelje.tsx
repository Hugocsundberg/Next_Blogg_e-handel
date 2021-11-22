import client from "../client";
import { AboutMe, Product as ProductType, settings } from "../generalTypes";
import Product from "../components/Product";
import Nav from "../components/Nav";
import { margin, rem, screenSizes } from "../styles/globalStyleVariables";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import useLazyLoad from "../hooks/useLazyLoad";
import { motion } from "framer-motion";
import { windowHeight } from "../styles/globalStyleVariables";
import React from "react";
import { Background, Spacer } from "../components/GlobalElements";
import Masonry from "../components/Masonry";
import { PostLight } from "../generalTypes";
import { Message } from "../components/Message";
import { urlFor } from "../functions";
import styled, { keyframes } from "styled-components";
import SquareLoader from "react-spinners/SquareLoader";

const MasonryComponent = React.forwardRef(Masonry);
const MotionMasonry = motion(MasonryComponent);

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`;

export const breakPoints = {
  S: screenSizes.S,
  M: screenSizes.M,
  L: screenSizes.L,
  XL: screenSizes.XL,
};

const LoadingIconContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: ${margin}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-duration: 0.7s;
  animation-name: ${fadeIn};
  z-index: 15;
`;

const Products = ({ settings }: { settings: string }) => {
  const _settings: settings = JSON.parse(settings);
  const incrementBy = 4;
  const [query, setQuery] = useState(
    `*[_type == 'product'] | order(_createdAt desc){_createdAt, productHeight, "id": _id, lastReservedAt, sold, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}[0...0]`
  );
  const { result, loading, errors, hasMore, setResult } = useLazyLoad(
    query,
    incrementBy
  );
  const [currentProduct, setCurrentProduct] = useState(0);
  const [cols, setCols] = useState<Array<Array<React.ReactNode>>>([]);

  useEffect(() => {
    if (errors) console.log(errors);
  }, [errors]);

  const observableCallback = (update: any) => {
    console.log("Hello");
    let object: ProductType = update.result;
    const productArray = [...result];

    let updatePosition: number = 0;

    for (let i: number = 0; i < productArray.length; i++) {
      if (
        (productArray[i] as ProductType).slug.current === object.slug.current
      ) {
        updatePosition = i;
        break;
      }
    }

    setTimeout(() => {
      client
        .fetch(
          `*[_type == 'product' && slug.current == '${object.slug.current}']{_createdAt, lastReservedAt, productHeight, productWidth, productDept, sold, pending, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`
        )
        .then((data: Array<ProductType>) => {
          object = data[0];
          const productArray: Array<ProductType> | Array<PostLight> | [] = [
            ...result,
          ];
          productArray.splice(updatePosition, 1, object);
          setResult(productArray);
        });
    }, 2500);

    return () => {
      observable.current.unsubscribe();
    };
  };

  const observer = useRef<IntersectionObserver>();
  const observable = useRef(
    client.listen("*[_type == 'product']", {}, { includeResult: true })
  );
  const options: IntersectionObserverInit = {
    rootMargin: "200px",
  };

  useEffect(() => {
    const subscription = observable.current.subscribe(observableCallback);
    return () => {
      subscription.unsubscribe();
    };
  }, [result]);

  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setCurrentProduct((prevValue) => prevValue + incrementBy);
      }
    }, options);
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (!hasMore) observer.current?.disconnect();
  }, [hasMore]);

  useEffect(() => {
    setQuery(
      `*[_type == 'product'] | order(_createdAt desc){_createdAt, productHeight, "id": _id, lastReservedAt, sold, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, 'Asset':asset->, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title}[${currentProduct}...${
        currentProduct + incrementBy + 1
      }]`
    );
  }, [currentProduct]);

  return (
    <>
      <Head>
        <title>Ateljé</title>
      </Head>
      <Background>
        <Nav aboutMe={_settings.aboutMe}></Nav>
        {loading ? (
          <LoadingIconContainer>
            <SquareLoader></SquareLoader>
          </LoadingIconContainer>
        ) : (
          ""
        )}
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
        <MotionMasonry
          cols={cols}
          setCols={setCols}
          breakPoints={breakPoints}
          result={result}
        >
          {[
            ...(result as Array<ProductType>).map((product: ProductType, i) => {
              if (i + 1 >= result.length)
                return (
                  <Product
                    imageHeight={product.images[0].imageHeight}
                    imageWidth={product.images[0].imageWidth}
                    key={i}
                    lastElementRef={lastElementRef}
                    sold={product.sold}
                    lastReserved={product.lastReservedAt}
                    alt={product.alt || "no alt text"}
                    images={product.images}
                    slug={product.slug.current}
                    hasShadow={true}
                  ></Product>
                );
              else
                return (
                  <Product
                    imageHeight={product.images[0].imageHeight}
                    imageWidth={product.images[0].imageWidth}
                    key={i}
                    sold={product.sold}
                    lastReserved={product.lastReservedAt}
                    alt={product.alt || "no alt text"}
                    images={product.images}
                    slug={product.slug.current}
                    hasShadow={true}
                  ></Product>
                );
            }),
          ]}
        </MotionMasonry>
        {hasMore ? (
          <Spacer
            suppressHydrationWarning
            height={`${windowHeight - 10}px`}
          ></Spacer>
        ) : (
          ""
        )}
      </Background>
    </>
  );
};

export async function getStaticProps() {
  let settingsData;
  const settingsquery =
    '*[_type == "settings"][0]{"aboutMe": aboutme->{title, slug}, "message": messageProducts, "messageImage": messageImage.asset}';
  await client
    .fetch(settingsquery)
    .then((settings: settings) => (settingsData = settings));
  const settingsJson = JSON.stringify(settingsData);

  return {
    props: {
      // products: productJson,
      settings: settingsJson,
    },
    revalidate: 10,
  };
}

export default Products;
