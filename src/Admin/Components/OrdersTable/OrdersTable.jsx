import React,{useRef, useState} from 'react'
import "./OrdersTable.css"
import SelectComponent from '../SelectComponent/SelectComponent';
import { FaCircle } from "react-icons/fa";
import io from "socket.io-client"
import { adminAxiosPost } from '../../../Methods/RequestHandler';

const socket=io(process.env.REACT_APP_BASEURL,{query:`token=${localStorage.getItem("dd_")}`})

export default function OrdersTable({orders}) {
    return (
        <table className="orders-table">
          <thead>
            <tr>
              <OrderHeader/>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
              
              <OrderRow key={order._id} order={order} />
              </>
            ))}
          </tbody>
        </table>
      );
};

const OrderHeader = () => {
  return(
    <>
      <th style={{width:"3px"}}>Order ID</th>
      <th style={{width:"5cm"}}>Customer</th>
      <th style={{width:"10cm"}}>Product</th>
      <th style={{width:"10cm"}}>Address</th>
      <th style={{width:"5cm"}}>Price</th>
      <th style={{width:"5cm"}}>Status</th>
      <th  style={{width:"4cm"}}>Actions</th>
    </>
  )
}

const OrderRow = ({ order }) => {

  const [orderId, setorderId] = useState(order._id)
  const [userId, setuserId] = useState(order.userId)
  const [products, setproducts] = useState(order.products)
  const [status, setstatus] = useState(order.status)
  const [actionName, setactionName] = useState(order.status)

  const update=async()=>{
    setstatus(actionName)
    let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/updateOrder",{orderId:orderId,action:actionName})
    if(result){
      // if(actionName==="Out for Delivery"){
        socket.emit("TrackEmit",{message:actionName,orderId:orderId,userId:userId})
      // }
    }
  }

  const actionChange=(e)=>{
    setactionName(e.target.value)
  }

    return (
      <tr>
        {/* ORDER ID */}
        <td>{orderId}</td>

        {/* USER ID */}
        <td>{order.userEmail}</td>

        {/* PRODUCTS */}
        <td><OrderProductList products={products}/>
        {/* {JSON.stringify(order.products)} */}
        </td>

        {/* ADDRESS */}
        <td>{order.address.state} {order.address.city},
        <p> {order.address.address}, {order.address.landmark}</p></td>

        {/* TOTAL COST  */}
        <td>₹ {order.cost}</td>

        {/* STATUS */}
        <td>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <span style={{display:"flex",alignItems:"center"}} className={status==="Ordered"?"status-ordered":status==="Out for Delivery"?"status-out-for-delivery":status==="Delivered"&&"status-delivered"}><FaCircle /></span>{status}
          </div>
          
        </td>


        {/* UPDATE ACTIONS BUTTONS */}
        <td style={{display:"flex",flexDirection:"column"}}>

          <SelectComponent options={["Ordered","Out for Delivery","Delivered"]} selectedOption={status} selectFunction={actionChange}/>
          <button onClick={update} className='btn btn-danger' style={{marginTop:"0.1cm"}}>Update</button>
         
        </td>
      </tr>
    );
};

export function OrderProductList({products}) {
  return (
    <div className='order-product-list_'>
      {products.map((item,index)=>(
        <div>
          <b>{item.productName}</b>
          <label>Size | {item.size}</label>
          <label>Quantity: {item.Quantity}</label>
        </div>
    ))}
    </div>
  )
}
