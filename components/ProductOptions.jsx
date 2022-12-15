import React from 'react'

const ProductOptions = ({ name, values, selectedOptions, setOptions }) => {

  const handleChange = event => {
    setOptions("Size", event.target.value)
  };

  return (
    <select id="sizes" className='text-[16px] w-[108px] h-[24px] border-[1px] border-black rounded-[3px] outline-none' onChange={handleChange}>
      {/* <option className='text-[14px]'>Select Size</option> */}
      {values.map(value => {
        const id = `option-${name}-${value}`

        return (
          <option 
            key={id} 
            id={id} 
            name={`option-${name}`} 
            value={value} 
          >
            {value}
          </option>
        )
      })}
    </select> 
  )
}

export default ProductOptions