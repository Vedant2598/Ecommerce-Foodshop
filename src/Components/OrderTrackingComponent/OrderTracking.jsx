import React, { useEffect, useState } from 'react'
import "./OrderTracking.css"
import { GiHotMeal } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client"

const socket=io(process.env.REACT_APP_BASEURL,{query:{token:localStorage.getItem("token")}})



export default function OrderTracking(props) {

    const selector=useSelector((state)=>state.TrackOrderReducer)
    
    const [stepName, setstepName] = useState(['Ordered','Out for Delivery','Delivered'])
    const [symbols, setsymbols] = useState([<TiClipboard />,<MdDeliveryDining />,<GiHotMeal />])
    const [step, setstep] = useState(stepName.indexOf(selector.status)+1)

    


  return (
    <div className='order-tracking-container'>
        <div>
            {stepName.map((name,index)=>(
                <>
                    <OrderTrackingSteps orderId={''} index={index+1} symbol={symbols[index]} name={name} step={step} nodeDisabled={index+1===stepName.length}/>
                </>
            ))

            }
        </div>
        <div className='order-tracking-status'>
            <div>
                <p>Status : 
                    {/* {stepName[step-1]} */}
                {selector.status}
                </p>
                <p>Ordered on : {selector.orderDate}, {selector.orderTime}</p>
                <p>Delivered on : N/A</p>
                <p>Deliverey Charges: Free</p>
            </div>
        </div>
    </div>
  )
}


const OrderTrackingSteps=(props)=>{

    const selector=useSelector((state)=>state.TrackOrderReducer)
    const [index, setindex] = useState(props.index)
    const [stepName, setstepName] = useState(['Ordered','Out for Delivery','Delivered'])
    const [step, setstep] = useState(props.step)

    const dispatch=useDispatch()

    useEffect(()=>{
        socket.on("TrackEmitClient",(payload)=>{

            if(payload.orderId===selector.orderId){

                setstep(stepName.indexOf(payload.message)+1)
                // console.log(stepName.indexOf(payload.message))
                dispatch({type:"TrackStatusChange",payload:{status:payload.message}})
                
            }

          })

          return ()=>{
            socket.off("TrackEmitClient")
          }
    })

    return(
        <>
        <div style={{display:'flex'}}>
            <div className={index<=step?'order-tracking-steps steps-active':'order-tracking-steps steps-inactive'}>
                <span>
                    {props.symbol}
                </span>
            </div>
            <div className='order-tracking-steps-description'>
                {props.name}
            </div>
        </div>
          
        {!props.nodeDisabled&&

        <div className={index<step?'order-tracking-node steps-active':'order-tracking-node steps-inactive'}>
           
        </div>
        }
        </>
    )
}
