import React from "react";
import styled from "styled-components";
import {
  boxShadowBigElement,
  margin,
  rem,
  screenSizes,
} from "../styles/globalStyleVariables";

const BackGround = styled.div<{ left?: boolean }>`
  min-height: 5.4rem;
  background: white;
  box-shadow: ${boxShadowBigElement};
  border-radius: 35px;
  margin-right: ${margin}rem;
  margin-left: ${margin}rem;
  margin-bottom: 1rem;
  max-width: 800px;
  position: relative;
  left: 0;
  transform: translate(0);
  flex-direction: column;
  padding: 0.7rem;
  gap: 0rem;
  transition: 0.7s;
  @media (min-width: 854px) {
    left: ${(props) => (props.left ? 0 : "50%")};
    transform: ${(props) => (props.left ? "translate(0)" : "translate(-50%)")};
    margin-right: 0;
    margin-left: ${(props) => (props.left ? `${margin}rem` : 0)};
  }
`;

const Image = styled.img`
  position: relative;
  border-radius: 25px;
  height: 4rem;
  min-width: 4rem;
  max-width: 4rem;
  object-fit: cover;
  margin-right: 0.7rem;
  float: left;
`;

const P = styled.p`
  position: relative;
  margin: 5px;
`;

export const Message = ({
  left,
  imageLink,
  message,
}: {
  left?: boolean;
  imageLink: string;
  message: string;
}) => {
  return (
    <BackGround left={left}>
      <Image src={imageLink} />
      <P>{message}</P>
    </BackGround>
  );
};
