import React,{useState} from 'react'
import "./PlaceOrderProductCard.css"
import ImageDisplayer from '../ImageDisplayer/ImageDisplayer'

export default function PlaceOrderProductCard(props) {
  const [sizeIndex] = useState({Small:0,Medium:1,Large:2})
  const [sizePrice, setsizePrice] = useState(parseInt(Object.values(props.sizeOptions[sizeIndex[props.size]])))
  const [price, setprice] = useState(parseInt(props.price))

  return (
  <>
    <div className='place-order-component-parent'>
        <div className='place-order-component-image'>
            <ImageDisplayer productName={props.title}/>
        </div>
        <div className='place-order-component-info'>
            <label className='place-order-component-title'>{props.title}</label>
            <label className='place-order-component-size'>Size | {props.size}</label>
            <label className='place-order-quantity'>Quantity : {props.quantity}</label>
            <label className='place-order-price'> <b>₹ {((price)-parseInt(((price)*(props.discount/100))))*parseInt(props.quantity)}.00</b></label>
        </div>
    </div>
  </>
  )
}
