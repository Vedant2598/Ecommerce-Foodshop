import React,{useEffect,useState} from 'react'
import {responseHandler} from "../../../Methods/ResponseHandler"
import axios from 'axios'

export default function AdminImageProductDisplayer(props) {
    const [image, setimage] = useState()

    let fetchImage=async()=>{
        await axios.get(process.env.REACT_APP_ADMIN_ROUTE+`/getProductImage?id=${props.id}`,{responseType:"arraybuffer"})
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
        fetchImage()
    },[])


    return (
        <img style={{width:"100%",height:"100%"}} src={image}/>
    )
}
