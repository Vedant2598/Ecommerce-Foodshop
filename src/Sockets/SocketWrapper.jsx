import React, { useEffect, useState } from 'react'
import { createContext,useContext } from 'react'
import { createSocket } from './CreateSocket'
import { clientPostAxios } from '../Methods/RequestHandler'

const socketContext=createContext()

export default function SocketWrapper({children}) {
    const [socket, setsocket] = useState(null)

    let fetchToken=async()=>{
        if(!socket){

            if(localStorage.getItem("token")){
                let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getToken",{token:localStorage.getItem("token")})
                if(result){
                    // console.log(result.token)
                    let newSocket=createSocket(String(result.token))
                    setsocket(newSocket)
                    return newSocket
                }
            }else{
                return socket
            }
        }
        return socket

    }
useEffect(()=>{
    fetchToken()
},[])
  
  return (
    <>
    <socketContext.Provider value={{socket}}>
        {children}
    </socketContext.Provider>
    </>
  )
}

export const useSocket=()=>{
    return useContext(socketContext)
}
