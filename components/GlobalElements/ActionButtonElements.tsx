import { navHeight, blurColor, blurPx, margin } from "../../styles/globalStyleVariables"
import styled from "styled-components"

export const Background = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0px;
    background: ${blurColor};
    backdrop-filter: blur(${blurPx}px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.25);
`

export const Button = styled.button<{bgcolor: string, color: string}>`
    border-radius: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: ${margin / 2}rem;
    border: none;
    --webkit-appearance: none;
    height: 2.5rem;
    font-weight: bold;
    background: ${props => props.bgcolor};
    color: ${props => props.color};
    cursor: pointer;
`

export const Text = styled.p`
`