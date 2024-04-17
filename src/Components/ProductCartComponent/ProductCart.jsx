import React, { useEffect, useState } from 'react'
import "./ProductCart.css"
import ImageDisplayer from '../ImageDisplayer/ImageDisplayer'
import QuantityComponent from '../QuantityComponent/QuantityComponent'
import { clientPostAxios } from '../../Methods/RequestHandler'
import { useDispatch,useSelector } from 'react-redux'
import { useSocket } from '../../Sockets/SocketWrapper'
import { batch } from 'react-redux'
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


export default function ProductCart(props) {
  const [show, setshow] = useState(true)

  const dispatch=useDispatch()
  const selector=useSelector((state)=>state.cartItemsReducers)
  const navigate=useNavigate()

  // const {socket}=useSocket()
  const [name, setname] = useState(props.productName)
  const [quantity, setquantity] = useState(props.quantity)
  const [price, setprice] = useState(Number(props.price)+Number(props.sizeValue))
  const [discount, setdiscount] = useState(props.discount)
  const [discountedPrice, setdiscountedPrice] = useState(((Number(props.price)+Number(props.sizeValue))-parseInt((Number(props.price)+Number(props.sizeValue))*(props.discount/100 ))))

  

  const increment=async()=>{
    if(quantity<10){
      //NORMAL INCREMENT IS TO UPDATE TOTAL PRICE DETAILS
      // dispatch({type:'increment',payload:{price:discountedPrice,savedPrice:parseInt(props.price*(props.discount/100))}})
      
      // incrementItem is to store the items in the redux
      // dispatch({type:'incrementItem',payload:{productName:name,Quantity:quantity}})
      
        setquantity(quantity+1)
        batch(()=>{
          dispatch({type:'increment',payload:{price:discountedPrice,savedPrice:parseInt(props.price*(props.discount/100))}})
          dispatch({type:'incrementItem',payload:{id:props.id,Quantity:quantity}})
          dispatch({type:"setlocalStorage"})
        })

    }
}

const decrement=async()=>{
    if(quantity>1){
        setquantity(quantity-1)
        // dispatch({type:'decrement',payload:{price:discountedPrice,savedPrice:parseInt(props.price*(props.discount/100))}})
        // dispatch({type:'decrementItem',payload:{productName:name,Quantity:quantity}})
        batch(()=>{
          dispatch({type:'decrement',payload:{price:discountedPrice,savedPrice:parseInt(props.price*(props.discount/100))}})
          dispatch({type:'decrementItem',payload:{id:props.id,Quantity:quantity}})
          dispatch({type:"setlocalStorage"})
        })
       
  
      }
}

const removeItem=async()=>{
  let payload={token:localStorage.getItem("token"),id:props.id}
  let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/removeFromCart",payload)
  if(result){
    batch(()=>{
    dispatch({
      type: "removeItem",
      payload: {
        price: discountedPrice,
        quantity: quantity,
        savedPrice: parseInt(props.price * (props.discount / 100)),
      },
    });
    dispatch({type:"removeFromCart",payload:{index:props.index}})
    dispatch({type:'setlocalStorage'})
  })
    setshow(false)
  }
}

const BuyProduct=()=>{
  dispatch({type:"BuyNowStore",payload:{item:{productName:name,Quantity:quantity,size:props.size,details:[{price:price,discount:discount,size_options:props.sizeOptions}]},
  totalPrice:((price-parseInt(price*(discount/100)))*quantity)}})
  navigate("/Buy")
}

  return (
    <>
    {show&&
      
      <div className='product-cart-parent'>
        <div className='product-cart-left-column'>
        {/* {JSON.stringify(props.productName)} */}
          <div className='product-cart-image-displayer'>
              <ImageDisplayer productName={name}/>
          </div>
          <div>
              <button onClick={removeItem} className='btn btn-danger w-100 mt-2'>Remove Item</button>
              <button className='btn btn-success mt-1 w-100' onClick={BuyProduct}>Buy</button>
          </div>
        </div>


        <div className='product-cart-description'>
            <h3 className='product-cart-title'>{name}</h3>
            
            <div className='product-cart-price'>
            {discount>0?
                    <>
                    <div style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>
                        <text className="product-price-cut">₹ {price*quantity}.00</text>
                        <div style={{display:"flex",alignItems:"center",marginTop:"-0.45cm"}}>
                          <text className="product-price">₹ {(price-parseInt(price*(discount/100 )))*quantity}.00</text>
                          <b style={{fontSize:"0.35cm",marginLeft:"0.2cm"}} className='product-discount'>{discount}% Off</b>
                        </div>
                    </div>
                    </>
                    :
                        <text style={{fontSize:"0.5cm"}} className="product-price">₹ {price * quantity}.00 </text>
              }
            </div>
            <div className='product-cart-extra-price'>
             <text> Size | {props.size} </text>
              {props.size!=="Small"?<b>Extra ₹{props.sizeValue}</b>:""}
            </div>
            
            <div className='product-cart-quantity'><QuantityComponent quantity={quantity} increment={increment} decrement={decrement}/></div>
        
            {/* <div style={{position:"absolute",display:"flex",justifyContent:"flex-end",right:"0.2cm",bottom:"0.1cm",cursor:"pointer",width:"75%",border:"0mm solid red"}} onClick={(e)=>{navigate(`/product/${name}`)}}><FaChevronRight /></div> */}
        </div>
      </div>
  }
    </>
  )
}
