import styled from "styled-components";
import { darkGray, margin } from '../../styles/globalStyleVariables'

export const Background = styled.div`
    position: relative;
    height: 100%;
    min-height: 100vh;
    background: #f7f7f7;
`

export const FlexCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface Props {
    height: string
}

export const FlexCenterCenter = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${(props:Props) : string => props.height};
`

export const Header = styled.h1<{noLeftMargin?: boolean}>`
    color: ${darkGray};
    font-weight: bold;
    font-size: 2.3rem;
    display: flex;
    justify-content: start;
    padding: ${props => props.noLeftMargin ? `${margin}rem 0rem` : `${margin}rem ${margin}rem`};
    margin: 0;
    align-items: center;
`

export const Paragraph = styled.p`
    color: ${darkGray};
    font-weight: normal;
    font-size: 2.3rem;
    display: flex;
    justify-content: start;
    padding: ${margin}rem ${margin}rem;
    margin: 0;
    align-items: center;
`