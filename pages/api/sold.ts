import type { NextApiRequest, NextApiResponse } from "next";
import { KlarnaOrder, KlarnaResponseProduct } from "../../generalTypes";
require("dotenv").config();
const fetch = require("node-fetch");
const btoa = require("btoa");

export default (req: NextApiRequest, res: NextApiResponse) => {
  const orderId = req.body.orderId;
  let products: Array<KlarnaResponseProduct>;

  // Get products from order
  fetch(`https://api.playground.klarna.com/checkout/v3/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(process.env.KLARNA_AUTH)}`,
    },
  })
    .then((stream: any) => stream.json())
    .then((data: KlarnaOrder) => {
      products = data.order_lines;

      //Filter out shipping / non-products
      const filteredProducts = products.filter(
        (product) => "merchant_data" in product
      );

      //Update products on sanity
      const mutations = filteredProducts.map((product) => {
        return {
          patch: {
            id: JSON.parse(product.merchant_data).id,
            set: {
              sold: true,
            },
          },
        };
      });

      // Mutate products
      fetch(
        `https://9r33i0al.api.sanity.io/v2021-06-13/data/mutate/production`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.PRODUCT_PENDING_SANITY_TOKEN}`,
          },
          body: JSON.stringify({ mutations }),
        }
      )
        .then((stream: any) => stream.json())
        .then((data: any) => console.log(data));
    })
    .catch((error: any) => console.log(error));
};
