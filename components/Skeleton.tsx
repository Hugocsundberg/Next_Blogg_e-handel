import React from 'react';
import styled from 'styled-components';
import { margin } from '../styles/globalStyleVariables';
import { keyframes } from 'styled-components'

const pulse = keyframes`
 0% { opacity: .5 }
 50% { opacity: 1; }
 100% { opacity: .5 }
`

const fadeIn = keyframes`
    from {opacity: 0}
    to {opacity: 1}
`

const Border = styled.div`
    background: black;
    padding: 2%;
    margin-bottom: ${margin}rem;
`

const WhiteMiddle = styled.div`
    height: 100%;
    width: 100%;
    background: #313131;
    margin-bottom: 1rem;
    animation-name: ${fadeIn};
    animation-duration: .7s;
`

const OuterDiv = styled.div`
    width: 100%;
    height: 300px;
    background: #dddddd;
    animation-duration: 2s;
    animation-name: ${pulse};
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`

const Skeleton = (ref:any) => {
    return (
        // <Border ref={ref}>
            <WhiteMiddle>
                <OuterDiv/>
            </WhiteMiddle>
        /* </Border> */
    );
}

export default Skeleton;
