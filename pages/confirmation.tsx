import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

const OuterFlex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    gap: 2rem;
    @media (min-width:800px) {
        flex-direction: row;
    }
`

const RightFlex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const H1 = styled.h1`
    margin: 0.3rem;
    text-align: center;
`

const P = styled.p`
    margin: 0.3rem;
    text-align: center;
`

const confirmation = () => {
    return (
        <OuterFlex>
            <img src="/success.svg" alt="success check mark icon" />
            <RightFlex>
                <H1>Din order har mottagits</H1>
                <P>order id: {process.browser ? router.query.order_id : '-'}</P>
            </RightFlex>
        </OuterFlex>
    );
}

export default confirmation;
