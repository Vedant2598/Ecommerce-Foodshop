import React, { useEffect, useState } from 'react'
import OrdersTable from '../Components/OrdersTable/OrdersTable';
import "./css/order.css"
import InputWidget from '../Components/InputWidget/InputWidget';
import { adminAxiosPost, clientPostAxios } from '../../Methods/RequestHandler';
import { FaSearch } from 'react-icons/fa';
import { IoIosRefresh } from 'react-icons/io';

export default function Orders() {
  

    const [ordersData, setordersData] = useState([])
    const [show, setshow] = useState(false)
    const [search, setsearch] = useState('')

      const fetchData=async(e)=>{
        let search_=''
        if(e){
          search_=e.target.value
          setsearch(e.target.value)
        }
        let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/getOrders",{search:search_,category:"name"})
        if(result){
          setshow(false)
          setordersData(result.data)
          console.log(result.data)
          setshow(true)
        }
      }
      
      const refresh=async()=>{
        let search_=search
       
        let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/getOrders",{search:search_,category:"name"})
        if(result){
          setshow(false)
          setordersData(result.data)
          console.log(result.data)
          setshow(true)
        }
      }

      useEffect(()=>{
        fetchData()
      },[])

      return (
        <div className='order-panel-main'>
          <div style={{display:"flex",flexDirection:"row",padding:"0.2cm"}}>
          <h2>Orders</h2>
            <button className='btn btn-primary ml-2 h-100' onClick={refresh}>
                {/* <b
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.1cm",
                    fontSize: "0.5cm",
                  }}
                > */}
                  <IoIosRefresh />
                {/* </b> */}
            </button>
   
          </div>
          <InputWidget
              symbol={<FaSearch />}
              value={search}
              onChange={fetchData}
              placeholder="Search"
            />
          <div className='order-contents'>

          {show&&
            <OrdersTable orders={ordersData} />
          }
          </div>
        </div>
      );
}
 