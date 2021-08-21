import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../generalTypes';
import client from '../../client';
import { isReserved } from '../../functions';
const fetch = require('node-fetch');
require('dotenv').config()

export default (req: NextApiRequest, res: NextApiResponse) => {
    const product:Product = req.body
    let newProduct:Product
    
    const query = `*[_type == 'product' && slug.current == '${product.slug.current}']{_createdAt, productHeight, productWidth, "id": _id, productDept, sold, lastReservedAt, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`

    client.fetch(query)
    .then((data:any)=>{
        newProduct = data[0]
        
        if(newProduct.sold || isReserved(newProduct)) { // If sold or pending
            res.json({success: false, message: 'already sold or reserved'})
        } else { 
          //Send reserved state to sanity 
          const mutations = [{
            patch: {
              id: newProduct.id,
              set: {
                lastReservedAt: Date.now()
              }
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
        }
    })
}