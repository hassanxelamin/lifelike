import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { formatter } from '../utils/helpers'
import uuid from 'react-uuid';

const ProductList = ({ products }) => {

  // const { handle, title } = products[0].node;

  // const { altText, url } = products[0].node.images.edges[0].node
  
  // const price = products[0].node.priceRange.minVariantPrice.amount

  return (
    <div className='flex items-center h-screen w-screen gap-[50px] justify-center flex-wrap mt-[400px] mb-[100px] md:mt-[500px] lg:mt-0 lg:mb-0'>
    {
      products.map((product) => {

        const { handle, title } = product.node;

        const { altText, url } = product.node.images.edges[0].node
        
        const price = product.node.priceRange.minVariantPrice.amount

        return (
          <Link key={uuid()} href={`/product/${handle}`} passHref legacyBehavior>
            <a className='group'>
              <div className='w-[350px] h-[400px] sm:w-[456px] sm:h-[456px] bg-gray-200 overflow-hidden flex items-center justify-center hover:rounded-3xl hover:transition-all'>
                <div className='relative hover:transition-all group-hover:opacity-90 w-[300px] h-[400px] sm:w-[400px] sm:h-[456px]'>
                  <Image src={url} alt={altText} width={465} height={465} />
                </div>
              </div>
              <h3 className='mt-4 text-[20px] font-medium text-gray-900'>{title}</h3>
              <p className="mt-1 text-[14px] text-gray-700">{formatter.format(price)}</p>
            </a>
          </Link>
        )
      })
    }
    </div>
  )
}

export default ProductList