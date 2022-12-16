import Link from 'next/link'
import React, { useContext } from 'react'
import { CartContext } from '../context/shopContext'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'

const MiniCart = dynamic(() => import('./MiniCart'))
const Logo = dynamic(() => import('./Logo'))

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [ 0, -0.5, 4.5 ]
}

export default function Nav({ open, setOpen }) {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0

  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })
  
  return (
    <nav className="h-[106px] w-screen text-[26px] flex items-center justify-between px-[46px]">
      <Link href='/'>
        <div className='h-[100px] w-[180px]'>
          <Canvas camera={cameraSettings}>
            <Logo />
          </Canvas>
        </div>
      </Link>
      <div className="flex items-center">
        {/* <div onClick={() => {setOpen()}} className='cursor-pointer'>Brand</div> */}
        {open 
          ? <div onClick={() => {setOpen(), setCartOpen(!cartOpen)}} className="ml-[23px] cursor-pointer">Cart ({cartQuantity})</div>
          : <div onClick={() => {setCartOpen(!cartOpen)}} className="ml-[20px] sm:ml-[23px] cursor-pointer">Cart ({cartQuantity})</div>
        }
        <MiniCart cartQuanity={cartQuantity} />
      </div>
    </nav>
  )
}