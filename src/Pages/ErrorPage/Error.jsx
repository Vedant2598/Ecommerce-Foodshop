import React from 'react'
import NotifyBox from '../../Components/Box/NotifyBox/NotifyBox';
import { GiScooter } from "react-icons/gi";
import { MdNotificationsActive } from 'react-icons/md';

export default function Error() {
  return (
    <>
    
    <div style={{
        position:"absolute",
        top:"0",
        left:"0",
        width:"100%",
        height:"100%",
        backgroundColor:"whitesmoke",
        display:"flex",
        justifyContent:"center",
    
    }}  
    >
       
        <div style={{
            display:"flex",
            justifyContent:"center",
            boxShadow:"0px 2px 8px rgb(2,2,2,0.35)",
            fontSize:"0.55cm",
            padding:"0.4cm 0.8cm",
            height:"fit-content",
            marginTop:"2.5cm"
        }}>Error 404 Page Not Found</div>
          

    </div>
    </>
  )
}
