import { navHeight, blurColor, blurPx, margin, boxShadowBigElement, screenSizes } from "../../styles/globalStyleVariables"
import styled from "styled-components"

export const Background = styled.div`
    border-radius: 10px;
    background: ${blurColor};
    backdrop-filter: blur(${blurPx}px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: ${boxShadowBigElement};
    @media (min-width: ${screenSizes.L}px) {
        flex-direction: row;
        gap: 1rem;
    }
    `
export const ButtonContainer = styled.div<{ doubleMargin?:boolean }>`
    width: fit-content;
    left: 50%;
    transform: translate(-50%, 0);
    position: fixed;
    bottom: 0;
    max-width: 100%;
    padding: ${props => props.doubleMargin ? `${margin * 2}rem` : `${margin}rem` };
`

export const Button = styled.button<{bgcolor: string, color: string, disabled?:boolean}>`
    border-radius: 5px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin: ${margin / 2}rem;
    border: none;
    --webkit-appearance: none;
    height: 2.5rem;
    width: fit-content;
    font-weight: bold;
    background: ${props => props.bgcolor};
    color: ${props => props.color};
    cursor: ${props=>props.disabled ? 'initial' : 'pointer'};
`

export const Text = styled.p`
`