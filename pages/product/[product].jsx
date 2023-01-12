import React from 'react'
import { getAllProducts, getProduct } from "../../libs/shopify"
import dynamic from 'next/dynamic'

const ProductPageContent = dynamic(() => import('../../components/ProductPageContent'))

export default function ProductPage({ product }) {

  return (
    <>
      <ProductPageContent product={product} />
      <div className='mt-[40px]'></div>
    </>
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