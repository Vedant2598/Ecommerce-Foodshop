import React from 'react'
import "./ProductSizeComponent.css"

// CHECK BOX COMPONENT WITH TITLE,CHECKBOX AND AMOUNT INPUT
export default function ProductSizeComponent({title,change,value,amountChange,amountValue}) {

  return (
    <div className='product-size-component'>
        <div>
            <b>{title}</b>
        </div>
        <div>
            <input className='product-size-component-check' type='checkbox' onChange={change} checked={value} />
        </div>
        {value&&
            <div>
                <input value={amountValue} className='product-size-component-input'  type='number' placeholder='Amount' onChange={amountChange} />
            </div>
        }
    </div>
  )
}
