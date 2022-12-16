import React, { useState, useContext, useEffect } from 'react'
import { formatter } from '../utils/helpers'
import { CartContext } from "../context/shopContext"
import useSWR from 'swr';
import axios from 'axios';
import dynamic from 'next/dynamic'

const ProductOptions = dynamic(() => import('./ProductOptions'))

const fetcher = (url, id) => (
  axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => res.data)
)


const ProductDetails = ({ product }) => {

  
  const { data: productInventory } = useSWR(
    [`/api/inventory?id=${product.handle}`],
    (url, id) => fetcher(url, id),
    { errorRetryCount: 3 }
  )

  const [productLimit, setProductLimit] = useState(false)

  const [available, setAvailable] = useState(true)

  const { cart, addToCart } = useContext(CartContext)


  const title = product.title;
  const description = product.description;
  const price = product.variants.edges[0].node.price.amount;

  const allVariantOptions = product.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1
    }
  })

  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState()

  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value}
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  useEffect(() => {
    if(productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)
      const selectedCount = cart?.filter(item => item.handle === product.handle && item.options.Size === selectedVariant.options.Size)

      if(selectedCount.length > 0) {
        if (selectedCount[0].variantQuantity === checkAvailable[0].node.quantityAvailable) {
          setProductLimit(true)
        } 
      } else {
        setProductLimit(false)
      }

      if(checkAvailable[0].node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant, cart, product.handle])

  return (
    <div className='h-[465px] overflow-hidden sm:ml-7'>
      <h1 className='sm:w-[421px] text-[30px] md:text-[38px]'>{title}</h1>
      <h1 className='sm:w-[421px] text-[25px] md:text-[35px] mt-5'>{formatter.format(price)} USD</h1>
      <div className='flex gap-[25px] mt-8'>
      {
        product.options.map(({ name, values }) => (
          <ProductOptions 
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
          />
        ))
      }
      {
        available 
        ? 
          <>
            {
              productLimit ?
              <button 
                className="text-[16px] w-[108px] h-[24px] cursor-not-allowed"
              >
                Out of stock!
              </button>
              :
              <button 
                onClick={() => {
                  addToCart(selectedVariant)
                }}
                className="text-[16px] w-[108px] h-[24px] border-[1px] border-black rounded-[3px] border-solid"
              >
                Add To Cart 
              </button>
            }
          </>
        : 
          <button className='text-[16px] w-[108px] h-[24px] cursor-not-allowed'>
            Sold Out!
          </button>
      }
      </div>
      <p className='sm:w-[350px] text-[15px] mt-8' >{description}</p>
    </div>
  )
}

export default ProductDetails