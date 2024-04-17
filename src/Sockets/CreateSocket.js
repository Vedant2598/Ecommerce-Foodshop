import {io} from "socket.io-client"


// export const createSocket=(token)=>{
//     if(token){
//         const socket=io(process.env.REACT_APP_BASEURL,{query:token})
//         return socket
//     }
// }
let Socket=()=>{
    let token=null
    return (param)=>{   
       
        if(!token){
            token=param
        }
        if(token){
            let socket=io(process.env.REACT_APP_BASEURL,{query:{token:token}})
            
            return socket
        }
    }
}

export const createSocket=Socket()


