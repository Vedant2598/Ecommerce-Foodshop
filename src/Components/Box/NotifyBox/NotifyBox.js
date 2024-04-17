import React, { useEffect,useState } from 'react'
import "./NotifyBox.css"
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { MdNotificationsActive } from "react-icons/md";



export default function NotifyBox(props) {

  const [exit, setexit] = useState(false)


  const closeBtn=()=>{
    setexit(true)
    setTimeout(() => {
      props.closeFunction()
    }, 90);
  }


  return (
    <>

            <div className={exit?'notify-box-close':'notify-box' }>
              <div className='notify-box-cross-div'>
                <span>{props.symbol}</span>
              </div>

              <div className='notify-box-message-div'>
                <b>{props.message}</b>
                {/* <label>{selector.message}</label> */}
              </div>

          
              <button className='notify-box-button-div' onClick={closeBtn}><RxCross2 /></button>
           

            </div>
    
    </>
  )
}
