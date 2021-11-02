import styled from "styled-components"
import { darkGray, margin } from '../../styles/globalStyleVariables'
import { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`

export const Header = styled.h2`
color: ${darkGray};
font-size: 1.3rem;
`

export const Date = styled.p`
color: ${darkGray};
`

export const CardBackground = styled.div`
animation-duration: .7s;
animation-name: ${fadeIn};
background: white;
width: 100%;
margin-bottom: ${margin}rem;
cursor: pointer;
box-shadow: 4px 4px 15px -5px darkgray;
border-radius: 10px;
`

export const HorisontalFlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-right: ${margin}rem;
    padding-left: ${margin}rem;
`

export const Excerpt = styled.p`
padding: ${margin}rem;
margin: 0;
text-align: center;
color: ${darkGray}
`