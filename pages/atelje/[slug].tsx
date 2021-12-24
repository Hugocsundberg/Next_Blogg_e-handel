import { useRouter } from "next/router";
import client from "../../client";
import {
  AboutMe,
  productSanityReturn,
  Product as ProductType,
} from "../../generalTypes";
// @ts-ignore
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import React from "react";
import { Background, FlexCenterCenter } from "../../components/GlobalElements";
import Nav from "../../components/Nav";
import { Paragraph } from "../../components/GlobalElements";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { SmallParagraph } from "../../components/GlobalElements";
import { margin } from "../../styles/globalStyleVariables";
import Arrow from "../../components/Arrow";
import ActionButton from "../../components/ActionButton";
import {
  addObjectToStorage,
  getFromStorage,
  getTopOverlayHeight,
  isInCart,
  removeProductFromStorage,
} from "../../functions";
import { screenSizes } from "../../styles/globalStyleVariables";
import { useEffect, useState } from "react";
import { ButtonContainer } from "../../components/GlobalElements/ActionButtonElements";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const builder = imageUrlBuilder(client);

const urlFor = (source: string) => {
  return builder.image(source);
};

const Header = styled.h1`
  margin-bottom: 0;
`;

const A = styled.a`
  text-decoration: underline;
`;

const ImageContainerDiv = styled.div`
  box-shadow: 0px 0px 10px -5px rgba(70, 70, 70, 0.4);
  overflow: hidden;
  border-radius: 25px;
  position: relative;
  height: 230px;
  width: 230px;
  transition: 0.5s;
`;

const ThumbContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2rem;
`;

const ContentContainer = styled.div<{ overlayHeight: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${(props) => props.overlayHeight}px);
  padding-left: ${margin}rem;
  padding-right: ${margin}rem;
  padding-bottom: 6rem;
  @media (min-width: ${screenSizes.M}px) {
    justify-content: center;
    position: relative;
  }
`;

const CenterContent = styled.div`
  width: 100%;
  @media (min-width: ${screenSizes.M}px) {
    width: unset;
    display: flex;
    justify-content: center;
  }
`;

const ArrowContainer = styled.div``;

const H3 = styled.h3`
  font-weight: bold;
  margin: 0;
  margin-top: 2rem;
`;

const Block1 = styled.div`
  flex-grow: 8;
`;
const Block2 = styled.div`
  flex-grow: 1;
  position: relative;
  margin-top: 2%;
  @media (min-width: ${screenSizes.M}px) {
    max-width: 40%;
  }
`;

const BlockContainer = styled.div`
  @media (min-width: ${screenSizes.M}px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    min-width: 700px;
  }
`;

const Product = ({
  product,
  settings,
}: {
  product: string;
  settings: string;
}) => {
  if (!product) {
    return <Loading />;
  }
  const _aboutMe: AboutMe = JSON.parse(settings).aboutme;
  const _settings: productSanityReturn = JSON.parse(settings);
  const _product: ProductType = JSON.parse(product);
  const [isDesktop, setisDesktop] = useState(false);
  const [navoverlayHeight, setnavoverlayHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const router = useRouter();

  const resizeHandler = () => {
    if (window.innerWidth >= 700) setisDesktop(true);
    else setisDesktop(false);
  };

  const checkIfInCart = () => {
    if (isInCart(_product)) {
      setAlreadyInCart(true);
    } else {
      setAlreadyInCart(false);
    }
  };

  useEffect(() => {
    checkIfInCart();
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    const topOverlayHeight: number = getTopOverlayHeight();

    setnavoverlayHeight(topOverlayHeight);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // render elements for carousel
  const renderThumbs = () => {
    return _product.images.map((image, i) => (
      <ThumbContainer key={i}>
        <Image
          src={urlFor(image.asset._ref).url() || "/noImage.jpg"}
          alt={image.alt || "no alt text"}
          layout={"fill"}
          objectFit={"cover"}
        />
      </ThumbContainer>
    ));
  };
  // render elements for carousel
  const renderArrowNext = (clickHandler: any, another: boolean) => {
    return another ? (
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={true} fadeOut={false} />
      </ArrowContainer>
    ) : (
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={true} fadeOut={true} />
      </ArrowContainer>
    );
  };
  // render elements for carousel
  const renderArrowPrev = (clickHandler: any, another: boolean) => {
    return another ? (
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={false} fadeOut={false} />
      </ArrowContainer>
    ) : (
      <ArrowContainer onClick={clickHandler}>
        <Arrow right={false} fadeOut={true} />
      </ArrowContainer>
    );
  };

  const handleAddToCart = () => {
    //Add to local storage
    const cart = getFromStorage("cart");
    const __product = { ..._product };
    __product.lastReservedAt = Date.now();
    if (
      !cart.find(
        (product) =>
          (product as ProductType).slug.current === _product.slug.current
      )
    )
      addObjectToStorage("cart", __product);
    else setMessage("Product already added to cart");
    //Send pending request
    if (process.browser)
      window
        .fetch("/api/reserve", {
          method: "POST",
          body: product,
          headers: { "Content-Type": "application/json" },
        })
        .then((stream) => stream.json())
        .then((data) => {
          if (data.success === false) {
            removeProductFromStorage("cart", __product);
            setMessage(data.message);
          }
        });
    checkIfInCart();
  };

  if (router.isFallback) {
    return <Loading></Loading>;
  }

  if (_product.title) {
    return (
      <>
        <Nav aboutMe={_aboutMe}></Nav>
        <Alert message={message}></Alert>
        <Background>
          <ContentContainer overlayHeight={navoverlayHeight}>
            <CenterContent>
              {!isDesktop ? <Header>{_product.title}</Header> : ""}
              <BlockContainer>
                <Block1>
                  <Carousel
                    width={"100%"}
                    stopOnHover
                    transitionTime={300}
                    renderArrowPrev={renderArrowPrev}
                    renderArrowNext={renderArrowNext}
                    showIndicators={false}
                    thumbWidth={60}
                    autoPlay={false}
                    renderThumbs={renderThumbs}
                    showThumbs
                    useKeyboardArrows
                    emulateTouch={true}
                    dynamicHeight={true}
                    autoFocus={true}
                    showArrows={true}
                  >
                    {_product.images.map((image, i) => (
                      <picture key={i}>
                        <source
                          media={`(min-width:700px)`}
                          srcSet={
                            urlFor(image.asset._ref).width(808).url() ||
                            undefined
                          }
                        />
                        <img
                          className="image-border"
                          src={
                            urlFor(image.asset._ref).width(1260).url() ||
                            undefined
                          }
                        ></img>
                      </picture>
                    ))}
                  </Carousel>
                </Block1>
                <Block2>
                  {isDesktop ? <Header>{_product.title}</Header> : ""}
                  <H3>Beskrivning</H3>
                  <SmallParagraph>{_product.desc}</SmallParagraph>
                  <H3>Köp det här konstverket</H3>
                  <SmallParagraph>
                    <p>
                      Kontakta mig gärna på{" "}
                      <A
                        target="_blank"
                        href={`mailto:marina.k.sundberg@gmail.com?subject=Tavla: ${_product.title}`}
                      >
                        marina.k.sundberg@gmail.com
                      </A>{" "}
                      ifall du är intresserad av att köpa konstverket eller har
                      frågor.
                    </p>
                  </SmallParagraph>
                  <H3>Storlek</H3>
                  <SmallParagraph>
                    {`${_product.productWidth} x ${_product.productHeight}${
                      _product.productDept ? ` x ${_product.productDept}` : ""
                    }`}{" "}
                    cm
                  </SmallParagraph>
                  <H3>Pris</H3>
                  <SmallParagraph>{_product.price} kr</SmallParagraph>
                  {/* <ImageContainerDiv>
                    <Image
                      src={
                        urlFor(_settings.swishImage.asset._ref)
                          .width(740)
                          .url() || "/noImage.jpg"
                      }
                      layout="fill"
                    ></Image>
                  </ImageContainerDiv> */}
                </Block2>
              </BlockContainer>
            </CenterContent>
          </ContentContainer>
        </Background>
        <ButtonContainer>
          {/* <ActionButton
            disabled={alreadyInCart}
            onClick={handleAddToCart}
            text={message.length > 0 ? message : "Lägg till i kundvagn"}
          ></ActionButton> */}
        </ButtonContainer>
      </>
    );
  } else {
    return (
      <FlexCenterCenter height="100vh">
        <h1>404</h1>
        <Paragraph>Sidan finns inte 🥲</Paragraph>
      </FlexCenterCenter>
    );
  }
};

export async function getStaticProps({ params }: { params: any }) {
  const slug = params.slug;
  const query = `*[_type == 'product' && slug.current == '${slug}']{_createdAt, sold, lastReservedAt, "id": _id, productHeight, productWidth, productDept, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`;
  const products: Array<ProductType> = await client.fetch(query);
  const productData = products[0];
  let postJson: string;
  productData
    ? (postJson = JSON.stringify(productData))
    : (postJson = '{"undefined":"true"}');

  const settingsquery =
    '*[_type == "settings"][0]{aboutme->{title, slug}, purchaseDescription, swishImage}';
  const settings: productSanityReturn = await client.fetch(settingsquery);
  const settingsJson = JSON.stringify(settings);

  return {
    props: {
      product: postJson,
      settings: settingsJson,
    },
  };
}

export async function getStaticPaths() {
  const query = `*[_type == "product"]{"slug": slug.current}[0...20]`;
  const products: Array<ProductType> = await client.fetch(query);

  return {
    paths: products.map((product: ProductType) => {
      return { params: { slug: product.slug } };
    }),
    fallback: true,
  };
}

export default Product;
