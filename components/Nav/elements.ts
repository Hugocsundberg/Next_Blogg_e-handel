import styled from 'styled-components'
import { blurPx, blurColor, margin, lineWidth, optionDivPadding, imageHeight, marginLogo, lineHeightLogo } from '../../styles/styleVariables'
import { getOptionsHeight, getBottomNavHeight } from './functions'
 
export const BlurDiv = styled.div`
    transform: translate(0, ${props=>props.isExpanded ? getOptionsHeight : 0}px);
    background: ${blurColor};
    background: rgba(255, 255, 255, 0.78);
    width: 100%;
    backdrop-filter: blur(${blurPx}px);
    position: fixed;
    z-index: 10;
    top: -${getOptionsHeight}px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
    transition: .3s;
`

export const OptionDiv = styled.button`
    width: 100%;
    border: none;
    background: none;
    font-size: 1rem;
    border-bottom: #E0E0E0;
    border-bottom-width: ${lineWidth}px;
    border-bottom-style: solid;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: ${optionDivPadding}rem ${margin}rem;
`

export const ImageDiv = styled.div`
    height: ${imageHeight}rem;
    width: 2rem;
    position: relative;
`

export const OptionText = styled.p`
    margin-left: .5rem;
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
`

export const BottomContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Hamburger = styled.button`
    height: ${imageHeight}rem;
    width: 2rem;
    position: relative;
    appearance: none;
    border: none;
    background: none;
    --webkit-appearance: none;
    margin-left: ${margin}rem;
`

export const Logo = styled.p`
    font-size: 1.5rem;
    width: 7rem;
    text-align: center;
    margin: ${marginLogo}rem;
    line-height: ${lineHeightLogo}rem;
`


export const Cart = styled.button`
    height: ${imageHeight}rem;
    width: 2rem;
    position: relative;
    appearance: none;
    border: none;
    background: none;
    --webkit-appearance: none;
    margin-right: ${margin}rem;
    `

export const Spacer = styled.div`
    height: ${getBottomNavHeight()}px;
`