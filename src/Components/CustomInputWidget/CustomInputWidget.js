import React, { useState } from 'react'
import "./CustomInputWidget.css"
import { useDispatch,  } from 'react-redux'


export default function CustomInputWidget(props) {
  const dispatch=useDispatch()
  const [requires] = useState(props.requires || false)
  const [disabled] = useState(props.disabled || false)

  /*
    WIDGET props :-
 
      NORMAL INPUTS:
        heading= The title of the input
        type= text/password/email

      REDUX INPUTS:
        dispatchType= enter type parameter for redux
       

  */
  return (
   <>
   <div className="input-div-client-parent">
        <b style={{color:`${props.headingColor}`}}>{props.heading} {requires&&<span style={{color:"red"}}>*</span>}</b>
        <div className='input-div-client'>
          <span style={{color:`${props.symbolColor}`,backgroundColor:`${props.symbolBackground}`}}>{props.symbol}</span>
          {disabled?
          <input className='input-div-client-display-only' type={props.type} value={props.value}  placeholder={props.placeholder} disabled/>
          :
          <input value={props.value} type={props.type} placeholder={props.placeholder} onChange={props.changeFunction}  required/>
          }
        </div>
    </div>
   </>
  )
}
