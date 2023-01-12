import React, { useState } from 'react'
import Image from 'next/image';
import dynamic from 'next/dynamic'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'

const ProductDetails = dynamic(() => import('./ProductDetails'))
const Layout = dynamic(() => import('./Layout'))

const ProductPageContent = ({ product }) => {
  const [disable, setDisabled] = useState(false);
  
  const goToPrevious = () => {
    let activeSlide = document.querySelector('.slide.translate-x-0');
    activeSlide.classList.remove('-translate-x-full');
    activeSlide.classList.add('translate-x-full');
    setDisabled(false)

    let previousSlide = activeSlide.previousElementSibling;
    previousSlide.classList.remove('-translate-x-full');
    previousSlide.classList.add('translate-x-0');
  };

  const goToNext = () => {
    let activeSlide = document.querySelector('.slide.translate-x-0');
    activeSlide.classList.remove('translate-x-0');
    activeSlide.classList.add('-translate-x-full');
    setDisabled(true)
    
    let nextSlide = activeSlide.nextElementSibling;
    nextSlide.classList.remove('translate-x-full');
    nextSlide.classList.add('-translate-x-full');
  };

  const products = product.images.edges
  const imageNode1 = product.images.edges[0].node
  const imageNode2 = product.images.edges[1].node
  const url1 = imageNode1.url;
  const url2 = imageNode2.url;
  // const alt = product.altText;

  return (
    <Layout>
      <div className='flex flex-col mt-[325px] mx-[800px] lg:mt-0 w-[350px] md:w-[auto] lg:flex-row md:flex-col items-center justify-center'>

        <div className='relative flex items-center justify-center sm:w-[600px] w-[380px] sm:w-[600px] overflow-hidden'>

          {disable ? (
            <div onClick={goToPrevious} className="absolute left-[20px] sm:top-[250px] visible cursor-pointer z-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[30px] h-[30px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
          ): (
            <div className="absolute left-[20px] sm:top-[250px] visible cursor-pointer z-50" disabled={true}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[30px] h-[30px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
          )}

          <div className='object-cover flex overflow-hidden'>
            <Image className='transition-all ease-in-out duration-1000 transform translate-x-0 slide' src={url2} alt="product" width={600} height={465} />
            <Image className='transition-all ease-in-out duration-1000 transform translate-x-0 slide' src={url1} alt="product" width={600} height={465} />
          </div>

          {disable ? (
            <div className="visible absolute right-[20px] sm:top-[250px] cursor-pointer z-50" disabled={true}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[30px] h-[30px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          ): (
            <div onClick={goToNext} className="visible absolute right-[20px] sm:top-[250px] cursor-pointer z-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[30px] h-[30px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          )}

        </div> 

        <div className="sm:pl-[60px]">
          <ProductDetails product={product} />
        </div>

      </div>
    </Layout>
  )
}

export default ProductPageContent