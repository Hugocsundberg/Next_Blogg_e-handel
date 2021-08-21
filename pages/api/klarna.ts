import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../generalTypes';
const fetch = require('node-fetch');
const btoa = require('btoa');
require('dotenv').config()

export default (req: NextApiRequest, res: NextApiResponse) => {
  const productArray:Array<Product> = req.body
  const klarnaBody = {
          locale: "sv-se",
          purchase_country: "SE",
          purchase_currency: "SEK",
          order_amount: productArray.reduce((acc, cur) => acc + cur.price, 0) * 100,
          order_tax_amount: 0,
          order_lines: req.body.map((product:Product)=>{
            return {
              name: product.title,
              quantity: 1,
              merchant_data: JSON.stringify({id: product.id}),
              unit_price: product.price * 100,
              tax_rate: 0,
              total_amount: product.price * 100,
              total_tax_amount: 0
            }
          }),
          merchant_urls: {
            terms: `${process.env.BASE_URL}/terms`, 
            checkout: `${process.env.BASE_URL}/cart`,
            confirmation: `${process.env.BASE_URL}/confirmation?order_id={checkout.order.id}`,
            push: `${process.env.BASE_URL}/api/push?order_id={checkout.order.id}`
        }
      }
  
     const klarnaOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(process.env.KLARNA_AUTH)}`
        },
        body: JSON.stringify(klarnaBody),
      };
      fetch('https://api.playground.klarna.com/checkout/v3/orders', klarnaOptions)
      .then((stream:any)=>stream.json())
      .then((data:any)=>{
        res.json({htmlSnippet: data.html_snippet})
      })
}