import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import "./ProductCard.css"
import "./ProductCardBtn.css"
import {BsCartFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {GoStarFill} from 'react-icons/go'
import ImageDisplayer from '../ImageDisplayer/ImageDisplayer'


export default function ProductCard(props) {

  const navigate=useNavigate()
  const [heart, setheart] = useState(props.favourite)
  const [discount, setdiscount] = useState(props.product_discount)
  const [price, setprice] = useState(props.product_price)
  
  const ProductClick=()=>{
     navigate(`/Product/${props.product_name}`)
  }

  

  return (
    <>
      <div className="product-card" onClick={ProductClick}>

        <div className='product_image_div'>
          <ImageDisplayer productName={props.product_name}/>
        </div>

        
        <div className="product-info">
          <h2 className="product-title">{props.product_name}</h2>
          <p className="product-description">{props.product_description}</p>
          {discount>0?
          <>
            <text className="product-price-cut">₹ {price}.00</text>
            <text className="product-price">₹{price-parseInt(price*(discount/100 ))}.00</text>
            <br/><b className='product-discount'>{discount}% Off</b>
          </>
          :
            <p className="product-price">₹ {price}.00 </p>
          }
       
          <div className='product-btns'>
          <span className='rating '><GoStarFill/><b>{props.rating}</b></span>
          
          </div>
        </div>
      
          
      </div>

    </>
  )
}
