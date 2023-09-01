import styled from "styled-components";
import { darkGray, margin } from "../../styles/globalStyleVariables";

export const Header = styled.h2`
  color: ${darkGray};
  font-size: 1.2rem;
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

export const Date = styled.p`
  font-size: 0.9rem;
  color: ${darkGray};
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

export const CardBackground = styled.div<{ aspectRatio: number }>`
  background: white;
  aspect-ratio: ${(props) => props.aspectRatio};
  width: 100%;
  margin-bottom: ${margin}rem;
  cursor: pointer;
  box-shadow: 4px 4px 15px -5px darkgray;
  border-radius: 10px;
`;

export const HorisontalFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-right: ${margin}rem;
  padding-left: ${margin}rem;
`;

export const Excerpt = styled.p`
  padding: ${margin}rem;
  font-family: "Trirong", serif;
  margin: 0;
  text-align: center;
  color: ${darkGray};
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;
