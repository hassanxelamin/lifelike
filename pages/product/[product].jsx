import React from 'react'
import { ProductPageContent } from '../../components/ProductPageContent.jsx'
import { getAllProducts, getProduct } from "../../libs/shopify"

export default function ProductPage({ product }) {

  return (
    <div className='-z-50'>
      <ProductPageContent product={product} />
    </div>
  )
}

/*
* Gets Dynamic Handles
*/
export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map(item => {
    const handle = String(item.node.handle)

    return {
      params: { product: handle }
    }
  })

  return{
    paths,
    fallback: false
  }
}

/*
* Gets Single Product using dynamic handles
*/
export async function getStaticProps({ params }) {
  const product = await getProduct(params.product)

  return {
    props: {
      product
    }
  }
}