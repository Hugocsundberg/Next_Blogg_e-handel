import styled from 'styled-components'
import { blurPx, blurColor, margin, lineWidth, imageHeight, darken, lighten} from '../../styles/globalStyleVariables'
import { optionDivPadding, marginLogo, lineHeightLogo} from './styleVariables'
import { getOptionsHeight, getBottomNavHeight } from './functions'
import {  } from 'styled-components'
 
export const BlurDiv = styled.div<{isExpanded: boolean, optionsHeight: number}>`
    transform: translate(0, ${props =>props.isExpanded ? props.optionsHeight : 0}px);
    background: ${blurColor};
    width: 100%;
    backdrop-filter: blur(${blurPx}px);
    position: fixed;
    z-index: 10;
    top: -${props => props.optionsHeight}px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
    transition: 0.6s;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`

export const OptionDiv = styled.button<{noBorder?:boolean, isActive?:boolean}>`
    width: 100%;
    border: none;
    background: ${props=>props.isActive ? `${darken}` : 'none'};
    font-size: 1rem;
    border-bottom: #E0E0E0;
    border-bottom-width: ${lineWidth}px;
    border-bottom-style: solid;
    border: ${props => props.noBorder ? 'none' : ''};
    display: flex;
    cursor: pointer;
    justify-content: start;
    align-items: center;
    padding: ${optionDivPadding}rem ${margin}rem;
    transition: 0.6s;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover{
        background-color: ${darken};
    }
    &:active{
        background-color: ${lighten};
    }
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
    padding: 0 ${margin}rem;
`

export const HamburgerContainer = styled.button`
    height: 48px;
    width: 2rem;
    position: relative;
    appearance: none;
    border: none;
    background: none;
    --webkit-appearance: none;
    margin-left: ${1 - margin}rem;
`

export const Logo = styled.p`
    font-size: 1.5rem;
    cursor: pointer;
    width: 7rem;
    text-align: center;
    margin: ${marginLogo}rem;
    line-height: ${lineHeightLogo}rem;
`

export const RightSideContainer = styled.div`
display: flex;
`


export const Cart = styled.button`
    height: ${imageHeight}rem;
    width: 2rem;
    position: relative;
    appearance: none;
    border: none;
    background: none;
    --webkit-appearance: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    `

export const CartP = styled.p`
    font-size: 0.7rem;
    transform: translate(2px, -1px);
`

export const Spacer = styled.div`
    height: ${getBottomNavHeight()}px;
`