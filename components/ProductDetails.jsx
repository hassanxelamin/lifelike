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
    <div className='flex flex-col justify-center h-[465px] overflow-hidden sm:ml-7'>
      <h1 className='font-bold text-[18px] md:text-[30px]'>{title}</h1>
      <h1 className='font-bold sm:w-[421px] text-[10px] md:text-[14px] mt-5'>{formatter.format(price)} USD</h1>
      <div className='flex justify-between sm:justify-start gap-[25px] mt-8'>
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
                className="text-[16px] py-[9px] px-[15px] border-[1px] border-black border-solid"
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
      <div className='flex flex-col gap-y-5 font-montreallight font-bold sm:w-[650px] text-[15px] mt-8' >
        <div>AN INVERTIBLE DOUBLE SIDED SHIRT THAT FEATURES GRAPHICS ON BOTH INSIDE AND OUT. THE OUT SIDE READS “INSANE INSANE” WHILE THE INSIDE READS “GENIUS GENIUS”.</div>
        <div>A BOXY FITTING SHIRT THAT UTILIZES MORE THAN JUST USUAL 50% OF ITS MATERIAL. GRAPHICS ON BOTH SIDES ALLOWS 100% OF ITS USAGE. AND 100% IS ABSOLUTE WITH A CAPITAL A.</div>
        <div>6.5 OZ 100% COTTON.</div>
      </div>
    </div>
  )
}

export default ProductDetails