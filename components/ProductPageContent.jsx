import React from 'react'
import Image from 'next/image';
import dynamic from 'next/dynamic'

const ProductDetails = dynamic(() => import('./ProductDetails'))
const Layout = dynamic(() => import('./Layout'))

const ProductPageContent = ({ product }) => {
  const imageNode = product.images.edges[0].node
  const url = imageNode.url;
  const alt = product.altText;

  return (
    <Layout>
      <div className='flex flex-col mt-[325px] lg:mt-0 w-[350px] md:w-[auto] lg:flex-row md:flex-col items-center justify-center'>
        <div className='flex items-center justify-center sm:w-[465px] sm:h-[465px] bg-gray-200 w-[350px] h-[400px]'>
          <div className='w-[300px] h-[400px] sm:w-[400px] sm:h-[456px]'>
            <Image src={url} alt={alt} width={465} height={465} />
          </div>
        </div>
        <div>
          <ProductDetails product={product} />
        </div>
      </div>
    </Layout>
  )
}

export default ProductPageContent