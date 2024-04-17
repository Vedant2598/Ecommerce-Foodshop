import React, { useEffect, useState,createContext } from 'react'
import "./ListComponent.css"
import AdminImageProductDisplayer from '../AdminImageComponent/AdminImageProductDisplayer'

export const crossbtn=createContext()

export default function ListComponent(props) {
    const [edit, setedit] = useState(false)
   
    useEffect(()=>{
        let id=document.getElementById("cross-btn")
        if(id){
            id.addEventListener("click",()=>{
                setedit(false)
            })
        }
    })
   
  return (
    <>
    <div className='list-component-parent'>
        <div>
            <div className='list-component-image-div'><AdminImageProductDisplayer id={props.id}/></div>
            <button className='list-component-edit-btn' onClick={(e)=>{setedit(true)}}>Edit</button>
        </div>

        <div className='list-component-info'>

            <div>
                <b>{Object.keys(props.value)[0]}</b>
                <p>{Object.values(props.value)[0]}</p>
            </div>
            
         
            <div>
                <b>{Object.keys(props.value)[1]}</b>
                <p>{Object.values(props.value)[1]}</p>
            </div>
     
        </div>
    </div>
    {edit&&<>{props.editComponent}</>}
    </>
  )
}
