import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('./Nav'))
const Footer = dynamic(() => import('./Footer'))

const Layout = (props) => {

  const setOpenFalse = () => {
    props.setOpen()
  }

  return (
    <div className='font-montreal flex items-center justify-center overflow-x-hidden'>
      <Head>
        <title>LifeLike®</title>
      </Head>

      <div className='overflow-hidden fixed left-0 top-0 w-full z-50'>
        <Nav open={props.open} setOpen={setOpenFalse} />
      </div>

      <div className='flex justify-center items-center items-center h-screen'>{props.children}</div>

      {/* <div className='overflow-hidden fixed left-0 bottom-0 w-full'>
        <Footer setOpen={setOpenFalse} />
      </div> */}
    </div>
  )
}


export default Layout