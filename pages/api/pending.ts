import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../generalTypes';
import client from '../../client';
const fetch = require('node-fetch');
require('dotenv').config()
import { ProductWithId } from '../../generalTypes';
import { countDown } from '../cart/functions';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const product:Product = req.body
    let newProduct:ProductWithId
    
    const query = `*[_type == 'product' && slug.current == '${product.slug.current}']{_createdAt, productHeight, productWidth, "id": _id, productDept, sold, pending, _updatedAt, slug, "alt":image.alt, "images": images[]{asset, alt, "imageHeight": asset->metadata.dimensions.height, "imageWidth": asset->metadata.dimensions.width}, price, desc, title, "imageHeight": metadata.dimensions.height, "imageWidth": image.asset->metadata.dimensions.width}`

    await client.fetch(query)
    .then((data:any)=>{
        newProduct = data[0]
        
        if(newProduct.sold || newProduct.pending) { // If sold or pending
            res.send('false')
            console.log('already sold or pending')
        } else { 
            
            //Send pending state to sanity 
            const mutations = [{
                patch: {
                  id: newProduct.id,
                  set: {
                    pending: Date.now()
                  }
                }
              }]

            console.log('starting pending countdown')
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

            //Start countdown to remove pending state
            countDown((30 * 60) + 5).then(()=>{
                const mutations = [{
                    patch: {
                      id: newProduct.id,
                      unset: ['pending']
                    }
                  }]
                  fetch(`https://9r33i0al.api.sanity.io/v2021-06-13/data/mutate/production`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${process.env.PRODUCT_PENDING_SANITY_TOKEN}`
                    },
                    body: JSON.stringify({mutations})
                }).then((data:any)=>{console.log(data)})
            })
        }
    })
}