import styled from "styled-components"
import { darkGray, margin } from '../../styles/globalStyleVariables'

export const Header = styled.h2`
color: ${darkGray};
`

export const Date = styled.p`
color: ${darkGray};
`

export const CardBackground = styled.div`
background: white;
width: 100%;
margin-bottom: 1rem;
cursor: pointer;
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
text-align: center;
color: ${darkGray}
`