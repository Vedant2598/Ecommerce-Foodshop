import React from 'react'
import "./LoadingComponent.css"
import { useState } from 'react'

export default function LoadingComponent(props) {

    const [size, setsize] = useState(props.size)

  return (
    <div className='loading-parent'>
        <div style={{width:size,height:size,borderRadius:size}}></div>
    </div>
  )
}
