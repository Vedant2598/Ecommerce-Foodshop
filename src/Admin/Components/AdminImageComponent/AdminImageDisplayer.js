import React,{useEffect,useState} from 'react'
import {responseHandler} from "../../../Methods/ResponseHandler"
import axios from 'axios'

export default function AdminImageDisplayer(props) {
    const [image, setimage] = useState()

    useEffect(()=>{
        axios.get(process.env.REACT_APP_ADMIN_ROUTE+`${props.route}?${process.env.REACT_APP_ADMIN_TOKEN_PAYLOAD}=${localStorage.getItem(process.env.REACT_APP_ADMIN_TOKEN)}&id=${props.id}`,{responseType:"arraybuffer"})
        .then((response)=>{
            let result=responseHandler(response.data)
            if(result){
                let blob=new Blob([response.data])
                let url=URL.createObjectURL(blob)
                setimage(url)
            }
        }).catch((e)=>{console.log(e)})
    },[])


    return (
        <img style={{width:"100%",height:"100%"}} src={image}/>
    )
}
