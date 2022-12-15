import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from './Nav'
import Footer from './Footer'
import Head from 'next/head'

const Layout = (props) => {

  const setOpenFalse = () => {
    props.setOpen()
  }

  return (
    <div className='font-grotesk'>
      <Head>
        <title>LifeLike®</title>
      </Head>

      <div className='overflow-hidden fixed left-0 top-0 w-full'>
        <Nav open={props.open} setOpen={setOpenFalse} />
      </div>

      <div className='flex justify-center items-center h-screen'>{props.children}</div>

      <div className='overflow-hidden fixed left-0 bottom-0 w-full'>
        <Footer setOpen={setOpenFalse} />
      </div>
    </div>
  )
}


export default Layout