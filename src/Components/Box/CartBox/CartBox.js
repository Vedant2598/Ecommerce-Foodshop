import React, { useEffect,useState } from 'react'
import "./CartBox.css"
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";


export default function CartBox({closeFunction}) {

  const [exit, setexit] = useState(false)


  const closeBtn=()=>{
    setexit(true)
    setTimeout(() => {
      closeFunction()
    }, 90);
  }


  return (
    <>

            <div className={exit?'cart-box-close':'cart-box' }>
              <div className='cart-box-cross-div'>
                <span><BsFillCartCheckFill /></span>
              </div>

              <div className='cart-box-message-div'>
                <b>Item added in Cart</b>
                {/* <label>{selector.message}</label> */}
              </div>

          
              <button className='cart-box-button-div' onClick={closeBtn}><RxCross2 /></button>
           

            </div>
    
    </>
  )
}
