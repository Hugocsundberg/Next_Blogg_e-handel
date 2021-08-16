import React from 'react';
import styled from 'styled-components';
import Head from 'next/head'
import { Header } from '../components/GlobalElements'
import { darkGray, margin } from '../styles/globalStyleVariables';

const Container = styled.div`
    width: 100%;
    max-width: 500px;
`

const Flex = styled.div`
    display: flex;
    justify-content: center;
`

const P = styled.p`
    color: ${darkGray};
    margin-left: ${margin}rem;

`

const terms = () => {
    return (
        <Flex>
            <Container>
                <Head>
                <title>TERMS</title>
                </Head>
                <Header>TERMS</Header>
                <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum atque ipsum ad, quas corporis nemo facilis alias dolor sint unde nesciunt officiis? Recusandae esse dolorum debitis et accusamus molestias vel.</P>    
            </Container>
        </Flex>

    );
}

export default terms;
