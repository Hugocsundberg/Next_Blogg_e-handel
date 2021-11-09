import styled from 'styled-components'
import { blurPx, blurColor, animationTiming, margin, lineWidth, imageHeight, darken, lighten} from '../../styles/globalStyleVariables'
import { optionDivPadding, marginLogo, lineHeightLogo} from './styleVariables'
import { getOptionsHeight, getBottomNavHeight } from './functions'
 
export const BlurDiv = styled.div<{isExpanded: boolean, optionsHeight: number, componentIsLoaded:boolean}>`
    transform: translate(0, ${props =>props.isExpanded ? props.optionsHeight : 0}px);
    background: ${blurColor};
    width: 100%;
    backdrop-filter: blur(${blurPx}px);
    position: fixed;
    z-index: 30;
    top: -${props => props.optionsHeight}px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
    transition: ${props=>props.componentIsLoaded ? '0.6s' : '0s'};
    transition-timing-function: ${animationTiming};
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
    transition-timing-function: ${animationTiming};
    border-radius: 0;
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
    font-family: 'Open Sans', sans-serif;
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
    font-family: 'Open Sans', sans-serif;
    font-size: 1.5rem;
    cursor: pointer;
    width: fit-content;
    text-align: center;
    margin: ${marginLogo}rem;
    line-height: ${lineHeightLogo}rem;
`

export const RightSideContainer = styled.div`
display: flex;
gap: 10px
`

export const Spacer = styled.div`
    height: ${getBottomNavHeight()}px;
`