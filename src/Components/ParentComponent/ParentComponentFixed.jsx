import React from 'react'

export default function ParentComponentFixed({children}) {
  return (
    <div style={{position:'fixed',flexDirection:"column",top:0,left:0,height:"100%",width:"100%",backgroundColor:"rgb(225, 225, 225)",zIndex:6,display:"flex",justifyContent:"center",alignItems:"center",overflowY:"auto"}}>
        {children}
    </div>
  )
}
