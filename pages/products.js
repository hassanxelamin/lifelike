import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'


const Layout = dynamic(() => import('../components/Layout'))
const ProductList = dynamic(() => import('../components/ProductList'))
const EmailPopup = dynamic(() => import('../components/EmailPopup'))

import { getProductsInCollection } from "../libs/shopify";

export default function Home({ products }) {
  const [open, setOpen] = useState();

  const setOpenState = () => {
    setOpen(false)
  }

  useEffect(()=>{
    let pop_status = localStorage.getItem('pop_status');
    if(!pop_status){
      setOpen(true)
      localStorage.setItem('pop_status', 1);
    }

    setTimeout(()=>{ 
      localStorage.removeItem('pop_status', 1);
    }, 1000 * 60 * 60)

  },[])

  console.log("WE ALREADY WON !")
  console.log("WAW.WW")

  return (
    <Layout open={open} setOpen={setOpenState}>
      {/* <EmailPopup open={open} setOpen={setOpenState}/> */}
      <div onClick={() => {setOpen(false)}} className="flex items-center justify-center overflow-hidden">
        <ProductList products={products} /> 
      </div>
    </Layout>
  )
}


export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: { products },
  }
}