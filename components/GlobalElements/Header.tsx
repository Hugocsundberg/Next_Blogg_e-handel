//@ts-ignore
import styled from 'styled-components'
import { darkGray, margin } from '../../styles/globalStyleVariables'

const Header = styled.h1<{noLeftMargin?: boolean}>`
    color: ${darkGray};
    font-weight: bold;
    font-size: 2.3rem;
    display: flex;
    justify-content: start;
    padding: ${props => props.noLeftMargin ? `${margin}rem 0rem` : `${margin}rem ${margin}rem`};
    margin: 0;
    align-items: center;
`

export default Header