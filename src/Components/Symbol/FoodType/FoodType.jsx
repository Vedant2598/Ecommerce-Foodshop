import React, { useEffect, useState } from 'react'
import { FaCircle } from "react-icons/fa";
import "./FoodType.css"


export default function FoodType(props) {

    const [veg, setveg] = useState()
    const [display, setdisplay] = useState(true)

    useEffect(()=>{
        if(props.type==="Veg"){
            setveg(true)
        }else if(props.type==="Non Veg"){
            setveg(false)
        }else if(props.type==="None"){
            setdisplay(false)
        }
    },[])

  return (
    <>
    {display&&
        <div className='food-type-border' style={veg?{border:"0.2mm solid green",color:"green"}:{border:"0.2mm solid red",color:"red"}}><FaCircle /></div>
    }
    </>
  )
}
