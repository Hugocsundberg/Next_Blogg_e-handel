//@ts-ignore
import styled from 'styled-components'
import { darkGray, margin } from '../../styles/globalStyleVariables'

const Paragraph = styled.p`
    color: ${darkGray};
    font-weight: normal;
    font-size: 2.3rem;
    display: flex;
    justify-content: start;
    padding: ${margin}rem ${margin}rem;
    margin: 0;
    align-items: center;
`

export default Paragraph