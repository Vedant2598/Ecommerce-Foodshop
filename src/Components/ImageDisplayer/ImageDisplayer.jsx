import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { responseHandler } from '../../Methods/ResponseHandler'

export default function ImageDisplayer(props) {
    const [image, setimage] = useState('')

    let imageUrl=async()=>{
        await axios.get(process.env.REACT_APP_BASEURL+`/users/getProductImage?name=${props.productName}`,{responseType:"arraybuffer"})
        .then((response)=>{
            let result=responseHandler(response.data)
            if(result){
                let blob=new Blob([response.data])
                let url=URL.createObjectURL(blob)
                setimage(url)
            }
        }).catch((e)=>{console.log(e)})
    }
    useEffect(()=>{
        imageUrl()
    },[])
  return (
    <img style={{height:"99%",width:"99%"}} src={image} loading='lazy'/>
  )
}
