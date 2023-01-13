import React from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Logo = dynamic(() => import('../components/Logo'))

export default function Landing() {

  const cameraSettings = {
    fov: 16,
    near: 0.1,
    far: 200,
    position: [ 0, 0, 16]
  }

  console.log("WE ALREADY WON !")
  console.log("WAW.WW")

  return (
    <div className="font-montreal h-full w-full absolute left-0 top-0 overflow-hidden flex flex-col items-center justify-center">
      <Head>
        <title>LifeLike®</title>
      </Head>
      <div className='h-[180px] sm:h-[200px] w-[500px]'>
        <Canvas camera={cameraSettings}>
          <Logo />
        </Canvas>
      </div>
      <Link href='/products'>
        <button className="font-montreallight text-[17px] font-bold py-[9px] px-[50px] border-[2px] border-black border-solid">Enter</button>
      </Link>
    </div>
  )
}