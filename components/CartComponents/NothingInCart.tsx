import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/dist/client/image";
import { boxShadowBigElement } from "../../styles/globalStyleVariables";
import Link from "next/dist/client/link";

const Background = styled.div`
  background: white;
  opacity: 0.78;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  box-shadow: ${boxShadowBigElement};
`;

const H1 = styled.h1`
  text-align: center;
`;

const P = styled.p``;

const Span = styled.span`
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
`;

const ImageContainer = styled.div<{ fadeIn: boolean }>`
  height: 200px;
  width: 100%;
  position: relative;
  transition: 0.7s;
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
`;

const NothingInCart = () => {
  const [fadeIn, setFadeIn] = useState(false);

  return (
    <Background>
      <H1>Kundvagnen är tom</H1>
      <ImageContainer fadeIn={fadeIn}>
        <Image
          onLoad={() => setFadeIn(true)}
          src="/sadCart.svg"
          alt="hamburger"
          layout="fill"
          objectFit="contain"
        />
      </ImageContainer>
      <Link href="/atelje">
        <P>
          Lägg till <Span>konst</Span> så kommer de synas här
        </P>
      </Link>
    </Background>
  );
};

export default NothingInCart;
