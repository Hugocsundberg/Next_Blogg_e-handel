import styled from 'styled-components'
import { darkGray, margin } from '../../styles/styleVariables'

const BackgroundContainer = styled.h1`
    color: ${darkGray};
    font-weight: bold;
    font-size: 2.3rem;
    display: flex;
    justify-content: start;
    padding: ${margin}rem ${margin}rem;
    margin: 0;
    align-items: center;
`

export default BackgroundContainer