import React,{useEffect, useState} from 'react'
import "./OrderCard.css"
import ImageDisplayer from '../ImageDisplayer/ImageDisplayer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function OrderCard(props) {
  
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const [deliveryDate, setDeliveryDate] = useState(props.orderDate);
  const [sizeIndex] = useState({Small:0,Medium:1,Large:2})

  const [price, setprice] = useState(Number(props.price))
  const [items, setitems] = useState(props.items)
  


  
    const view=()=>{
        dispatch({type:"TrackOrder",payload:{orderId:props.orderId,item:props.AllItems,totalPrice:price,address:props.address,orderDate:props.orderDate,orderTime:props.orderTime,status:props.status}})
        navigate("/OrderTrack")
    }

  return (
    <>
    
    <div className="orders-product-container" onClick={view}>
    {/* {JSON.stringify(props.orderId)} */}
      <div className="order-details">
        <div className='orders-product-image'>
            
            <ImageDisplayer productName={props.order.productName}/>
            {items>1&&
                <div className='orders-product-items-count'>+{items-1}</div>
            }
        </div>
        <div className="orders-product-info">
          <b>{props.order.productName}  {items>1&&`...+${items-1}`} </b>
          <label>Total Items : {items}</label>
          <label className='orders-product-info-price'>₹{price}</label>
          <p className="orders-product-delivery-date">Ordered on: {deliveryDate}</p>
          <p>{items>1&&
            <>
                +{items-1} more
            </>
            }</p>
        </div>
      </div>
    </div>
    </>
  )
}