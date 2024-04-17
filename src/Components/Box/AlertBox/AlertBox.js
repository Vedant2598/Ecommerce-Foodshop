import React, { useEffect,useState } from 'react'
import "./AlertBox.css"
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";


export default function AlertBox(props) {

  const selector=useSelector((state)=>state.AlertBoxReducer)
  const dispatch=useDispatch()
  const [exit, setexit] = useState(false)


  // useEffect(()=>{
  //     if(!exit && selector.display){
  //       setTimeout(() => {
  //           setexit(true)
  //           setTimeout(() => {

  //           dispatch({type:"AlertBoxClose"})
  //           setexit(false)
  //           }, 100);
  //       }, 3000);
  //     }
  // },[])

  const closeBtn=()=>{
    setexit(true)
    setTimeout(() => {

      dispatch({type:"AlertBoxClose"})
      setexit(false)
    }, 100);
    
  }

  return (
    <>

            <div className={exit?'alert-box-close':'alert-box' }>
              <div className='alert-box-cross-div'>
                <span><ImCross /></span>
              </div>

              <div className='alert-box-message-div'>
                <b>{selector.title}</b>
                <label>{selector.message}</label>
              </div>

          
              <button className='alert-box-button-div' onClick={closeBtn}><RxCross2 /></button>
           

            </div>
    
    </>
  )
}
