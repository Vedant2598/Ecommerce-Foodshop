import React from 'react'
import "./QuantityComponent.css"

export default function QuantityComponent({increment,decrement,quantity}) {
  return (
    <div className='product-quantity-div'>
        <span className='product-quantity-div-title' >Quantity</span>
        <div className='product-quantity-div-btns'>
            <button className='quantity-left-btn' onClick={decrement}>-</button>
            <text>{quantity}</text>
            <button className="quantity-right-btn" onClick={increment}>+</button>
        </div>
    </div>
  )
}
