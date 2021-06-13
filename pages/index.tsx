import Head from 'next/head'
import styled from 'styled-components';

const Text = styled.h1`
  color: greenyellow;
`

export default function Home() {
  return (
    <>
    <Head>
      <title>Blogg</title>
    </Head>
    <Text>Hello World</Text>
    </>
  )
}
