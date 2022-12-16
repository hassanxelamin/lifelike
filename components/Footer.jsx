import React, { useState } from 'react'
import Marquee from './Marquee'
import dynamic from 'next/dynamic'

const FooterForm = dynamic(() => import('./FooterForm'))

export default function Footer({ setOpen }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className='overflow-hidden'>
      { clicked 
        ? 
        <footer className="overflow-hidden h-[44px] bg-black text-white flex items-center text-[16px]">
          <FooterForm setClicked={setClicked} />
        </footer>
        :  
        <footer onClick={() => {setClicked(true)}} className="cursor-pointer relative overflow-hidden h-[44px] bg-black text-white flex items-center text-[16px]">
          <Marquee />
        </footer>
      }
    </div>
  )
}
