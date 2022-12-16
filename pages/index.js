import React from 'react'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

const Logo = dynamic(() => import('../components/Logo'))

export default function Landing() {

  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 0, -0.5, 4.5 ]
  }

  return (
    <div className="font-grotesk h-full w-full absolute left-0 top-0 overflow-hidden flex flex-col items-center justify-center">
        <div className='h-[170px] sm:h-[200px] w-[400px]'>
          <Canvas camera={cameraSettings}>
            <Logo />
          </Canvas>
        </div>
        <Link href='/home'>
          <button className='text-[15px] text-bold w-[150px] h-[50px] border-black border-1 border-solid'>Enter</button>
        </Link>
    </div>
  )
}