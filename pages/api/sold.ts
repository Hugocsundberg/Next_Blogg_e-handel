import type { NextApiRequest, NextApiResponse } from 'next'
import { KlarnaOrder, KlarnaResponseProduct, Product } from '../../generalTypes';
require('dotenv').config()
const fetch = require('node-fetch');
const btoa = require('btoa');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const orderId = req.body.orderId
    let products:Array<KlarnaResponseProduct>

    fetch(`https://api.playground.klarna.com/checkout/v3/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(process.env.KLARNA_AUTH)}`
          },
      })
    .then((stream:any)=>stream.json())
    .then((data:KlarnaOrder)=>{
        products = data.order_lines

        //Update products on sanity 
        const mutations = products.map((product)=>{
             return {
                patch: {
                  id: JSON.parse(product.merchant_data).id,
                  set: {
                    sold: true
                  }
                }
              }
            })

              fetch(`https://9r33i0al.api.sanity.io/v2021-06-13/data/mutate/production`, {
                method: 'post',
                headers: {
                  'Content-type': 'application/json',
                  Authorization: `Bearer ${process.env.PRODUCT_PENDING_SANITY_TOKEN}`
                },
                body: JSON.stringify({mutations})
              })
              .then((stream:any) => stream.json())
              .then((data:any) => console.log(data))
              res.json({success: true})
    })

}