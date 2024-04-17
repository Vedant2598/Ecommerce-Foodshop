import React from 'react'
import { useEffect,useState } from 'react'
import {BsFillBoxFill} from "react-icons/bs"
import "./Order.css"
import { clientPostAxios } from '../../Methods/RequestHandler';
import OrderCard from '../../Components/OrderProductComponent/OrderCard';

// let arr=[1,2,3,4,5,6,7,8]
export default function Order() {
  const [show, setshow] = useState(false)
  const [arr, setarr] = useState([])

  let fetchOrders=async()=>{
    setshow(false)
    let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getOrders",{token:localStorage.getItem("token")})
    if(result){
      // console.log(result.data)
      setarr(result.data.reverse())
    }
    setshow(true)
  }

  useEffect(()=>{
    fetchOrders()
  },[])

  return (
    <>
    <div className='orders-parent-div'>
    <h3 className="order-tracking-title"><span><BsFillBoxFill/></span><b>Order Tracking</b></h3>
    <div className='orders-search-div'>
        <input className="form-control"  type="text"  placeholder="Search Orders" aria-label="Search" />
    </div>
    {/* {JSON.stringify(arr)} */}
      <div className='orders-parent-container'>
      {show&&
      <>
      {arr.length>0?
        <>
          {arr.map((order)=>(
            <>
            <OrderCard orderId={order._id} order={order.products[0]} items={order.products.length} orderDate={order.orderDate} orderTime={order.orderTime} 
            status={order.status} 
             price={order.cost} address={order.address} AllItems={order.products}/>
             </>
            )
            )}
        </>
        :
        <OrderEmpty/>
      }
      </>
      }
      
      </div>
    
    </div>
    </>
  )
}


const OrderEmpty=()=>{
  return (
    <div className='order-empty-div'>
      <img src={require("./Checklist-rafiki.png")}/>
      <label style={{fontSize:"0.55cm"}}>No Orders Found</label>
    </div>
  )
}
