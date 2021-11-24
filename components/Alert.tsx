import { useEffect, useState } from "react";
import styled from "styled-components";
import React from "react";
import { animationTiming, blurPx } from "../styles/globalStyleVariables";

const Container = styled.div`
  position: absolute;
  right: 0px;
  top: 4rem;
  z-index: 1;
  padding: 1rem 0 1rem 1rem;
  overflow: hidden;
`;

const Message = styled.div<{ active: boolean }>`
  height: 3rem;
  min-width: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  color: white;
  transform: ${(props) => (props.active ? "translate(0)" : "translate(110%)")};
  background: rgb(239 71 25 / 80%);
  box-shadow: 0 0 8px rgb(239 71 25 / 100%);
  backdrop-filter: blur(${blurPx}px);
  transition-timing-function: ${animationTiming};
  transition-duration: 0.7s;
  border-radius: 30px 0 0 30px;
`;

const Alert = ({ message }: { message: string }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (message.length > 0) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 7000);
    }
  }, [message]);

  return (
    <Container>
      <Message active={active}>
        <p>{message}</p>
      </Message>
    </Container>
  );
};

export default Alert;
