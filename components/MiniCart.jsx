import { Fragment, useContext, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { CartContext } from '../context/shopContext'
import { formatter } from '../utils/helpers'

const MiniCart = ({ cartQuanity }) => {
  const cancelButtonRef = useRef()

  const { cart, cartOpen, setCartOpen, checkoutUrl, removeCartItem } = useContext(CartContext)

  let cartTotal = 0

  cart.map(item => {
    cartTotal += item?.variantPrice * item?.variantQuantity
  })

  return (
    <Transition.Root show={cartOpen} as={Fragment} className="z-50 font-montreallight">
      <Dialog initialFocus={cancelButtonRef} as="div" className="relative z-50" onClose={() => {setCartOpen(!cartOpen) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[645px]">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between text-[36px]">
                        <Dialog.Title className="font-medium text-gray-900">Cart ({cartQuanity})</Dialog.Title>
                        <div className="flex items-center">
                          <button
                            ref={cancelButtonRef}
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCartOpen(false)}
                          >
                            {/* <span className="sr-only">Close Panel</span> */}
                            <div className='font-medium text-gray-900'>Close</div>
                            {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root h-[160px] w-full">
                          {
                            cart.length > 0 
                            ?
                            <ul role="list" className="-my-6 divide-y divide-gray-200 h-full mt-1">
                              {cart.map((product) => (
                                <li key={product.id + Math.random()} className="flex py-6 h-full w-full">
                                  <div className="relative h-30 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <div className='w-[110px] sm:w-[110px] flex items-center justify-center ml-8 mr-8'>
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      className="object-cover object-center"
                                      width={110}
                                      height={110}
                                      />
                                    </div>
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-[15px] font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/product/${product.handle}`} passHref legacyBehavior>
                                            <a onClick={() => {setCartOpen(false)}}>{product.title}</a>
                                          </Link>
                                        </h3>
                                        <p className="ml-4">{formatter.format(product.variantPrice)}</p>
                                      </div>
                                      <p className="mt-1 text-[12px] text-gray-500">{product.variantTitle}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500 text-[15px]">Qty {product.variantQuantity}</p>

                                      <div className="flex">
                                        <button
                                        onClick={() => {removeCartItem(product.id)}}
                                          type="button"
                                          className="text-[15px] hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            : 
                            <div className="mt-12 flex justify-between text-[36px] font-medium text-gray-900">
                              <p>Nothing in your cart</p>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    { cart.length > 0 ?
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-[36px] font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{formatter.format(cartTotal)}</p>
                        </div>
                        <p className="mt-0.5 text-[12px] text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <a
                            href={checkoutUrl}
                            className="flex items-center justify-center bg-black h-[52px] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-90"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-[12px] text-gray-500">
                          <p>
                            <span className='mr-1'>or</span>
                            <button
                              type="button"
                              className="text-[16px] text-black hover:text-indigo-500"
                              onClick={() => setCartOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                      :
                      null
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MiniCart