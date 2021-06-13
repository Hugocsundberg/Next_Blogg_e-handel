import '../styles/globals.css'
import client from '../client'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('hello')
    const query = '*[_type == "post"]'
    client.fetch(query)
    .then(data => console.log(data))
  }, []);

  return <Component  {...pageProps} />
}

export default MyApp
