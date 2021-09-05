import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../generalTypes';
const fetch = require('node-fetch');
require('dotenv').config()

export default (req: NextApiRequest, res: NextApiResponse) => {
    const product:Product = req.body
        
          //Send unreserved state to sanity 
          const mutations = [{
            patch: {
              id: product.id,
              unset: ['lastReservedAt']
            }
          }]

          fetch(`https://9r33i0al.api.sanity.io/v2021-06-13/data/mutate/production`, {
            method: 'post',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${process.env.PRODUCT_PENDING_SANITY_TOKEN}`
            },
            body: JSON.stringify({mutations})
          })
          .then((stream:any) => stream.json())
          .then((data:any) => res.json({success: true, message: data}))
    // })
}