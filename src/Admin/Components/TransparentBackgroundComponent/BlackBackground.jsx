import React from 'react'

export default function BlackBackground({children}) {
  return (
    <div style={{display:"flex",justifyContent:"center",position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgb(0, 0, 0,0.25)",zIndex:5}}>{children}</div>
  )
}
