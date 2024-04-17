import React, { useEffect ,useState} from 'react'
import "./OrderTrackingPage.css"
import { useNavigate } from 'react-router-dom'
import PlaceOrderProductCard from '../../Components/PlaceOrderProductCard/PlaceOrderProductCard'
import { useSelector } from 'react-redux'
import { clientPostAxios } from '../../Methods/RequestHandler'
import { validateCredentials } from '../../Methods/SignupValidators'
import OrderTracking from '../../Components/OrderTrackingComponent/OrderTracking'

export default function OrderTrackingPage() {

    const navigate=useNavigate()
    const selector=useSelector((state)=>state.TrackOrderReducer)

    useEffect(()=>{
        if(selector.items.length===0){
            navigate("/Orders")
        }
    },[])

  return (
    <>
    <div className='track-orders-parent'>
        <div className='track-orders-navbar'>
           <text>Orders</text>
        </div>

        <div className='track-orders-list'> 
        
            <div className='track-orders-list-card'>
                <div>
                    <PlaceOrderHeader title="Products"/>
                    {selector.items.length>0&&
                        <>
                        {selector.items.map((item)=>(
                            <PlaceOrderProductCard title={item.productName} price={item.details[0].price} discount={item.details[0].discount} quantity={item.Quantity} 
                            sizePrice={item.sizePrice} size={item.size} sizeOptions={item.details[0].size_options}/>
                            ))
                        }
                    </>
                    }
         
                </div>
                <div className='track-orders-final-price'>
         
                    <div>
                        <label>Total Price</label>
                        <label style={{display:"flex",justifyContent:"right",paddingRight:"0.8cm"}}>₹ {selector.items.length>0&&selector.totalPrice}</label>
                    </div>

                </div>

                <div>
                    <PlaceOrderHeader title="Address"/>
                    {selector.items.length>0&&
                    <>
                        <div className='track-orders-address'>
                            <label>State : {selector.address.state}</label>
                            <label>City : {selector.address.city}</label>
                            <label>Landmark : {selector.address.landmark}</label>
                            <label>Address : {selector.address.address}</label>
                        </div>
                    </>
                    }   
                </div>
                
                <div>
                <PlaceOrderHeader title="Track"/>
                    <div className='track-orders-tracking-div'>
                        <OrderTracking/>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    </>
  )
}

const PlaceOrderHeader=(props)=>{
    return(
        <>
           <div className='track-orders-heading'>
                <b>{props.title}</b>
            </div>
        </>
    )
}

