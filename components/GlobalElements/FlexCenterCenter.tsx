//@ts-ignore
import styled from 'styled-components'
import { CSSProp } from 'styled-components';

interface Props {
    height: string
}

const FlexCenterCenter = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${(props:Props) : string => props.height};
`

export default FlexCenterCenter