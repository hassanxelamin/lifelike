import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { formatter } from '../utils/helpers'
import uuid from 'react-uuid';

const ProductList = ({ products }) => {

  return (
    <div className='
      flex items-center h-screen w-screen gap-[50px] justify-center flex-wrap 
      mt-[500px] mb-[200px] 
      md:mt-[600px] md:mb-[300px] 
      lg:mt-0 lg:mb-0'>
    {
      products.map((product) => {

        const { handle, title } = product.node;

        const { altText, url } = product.node.images.edges[0].node
        
        const price = product.node.priceRange.minVariantPrice.amount

        return (
          <Link key={uuid()} href={`/product/${handle}`} passHref legacyBehavior>
            <a className="flex flex-col items-center justify-center">
              <div className='w-[435px] h-[300px] sm:w-[500px] sm:h-[456px] bg-gray-200 overflow-hidden flex items-center justify-center hover:rounded-3xl hover:transition-all'>
                <div className='relative hover:transition-all group-hover:opacity-90 object-cover'>
                  <Image src={url} alt={altText} width={575} height={600} />
                </div>
              </div>
              <div className="flex items-center justify-center mt-[15px]">
                <h3 className='mt-4 text-[14px] font-bold text-gray-900'>{title}</h3>
                {/* <p className="mt-1 text-[14px] text-gray-700">{formatter.format(price)}</p> */}
              </div>
            </a>
          </Link>
        )
      })
    }
    </div>
  )
}

export default ProductList