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
    <nav className="h-[106px] w-screen text-[14px] font-medium flex items-center justify-between px-[46px]">
      <Link href='/'>
        <div className='h-[100px] w-[180px]'>
          <Canvas camera={cameraSettings}>
            <Logo />
          </Canvas>
        </div>
      </Link>
      <div className="flex items-center font-montreallight font-bold">
        <Link href="/">
          <div className="mr-[15px] hover:underline">HOME</div>
        </Link>
        <Link href="/products">
          <div className="mr-[15px] hover:underline">SHOP</div>
        </Link>
        {open 
          ? <div onClick={() => {setOpen(), setCartOpen(!cartOpen)}} className="cursor-pointer hover:underline">CART {cartQuantity}</div>
          : <div onClick={() => {setCartOpen(!cartOpen)}} className="flex items-center justify-center cursor-pointer  hover:underline">CART <div className="flex items-center justify-center text-center ml-[3px] bg-black w-[15px] h-[15px] text-white rounded-full"><div className="text-[10px]">{cartQuantity}</div></div></div>
        }
        <MiniCart cartQuanity={cartQuantity} />
      </div>
    </nav>
  )
}