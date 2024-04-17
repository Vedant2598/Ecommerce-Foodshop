import axios from "axios"
import { responseHandler } from "./ResponseHandler"

export const clientGetAxios=async(route,payload)=>{
    await axios.get(process.env.REACT_APP_BASEURL+`${route}`,payload)
    .then((response)=>{
        let result=responseHandler(response.data)
    })
    .catch((error)=>{
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Data:', error.response.data);
          } else if (error.request) {
            
            console.error('No response received');
            // window.location.reload()
          } else {
            
            console.error('Error:', error.message);
          }
    })
}


export const clientPostAxios=async(route,payload)=>{
    let data=false
    await axios.post(route,payload,{withCredentials:true})
    .then((response)=>{
        let result=responseHandler(response.data)
        if(result){
            data=response.data
        }
    })
    .catch((error)=>{
        if (error.response) {
            console.error('Status Code:', error.response.status);
            console.error('Response Data:', error.response.data);
          } else if (error.request) {
            
            console.error('No response received');
            // window.location.reload()
          } else {
            
            console.error('Error:', error.message);
          }
    })

    return data
}


export const adminAxiosPost=async(route,payload)=>{
    let results=false

    payload[process.env.REACT_APP_ADMIN_TOKEN_PAYLOAD]=localStorage.getItem(process.env.REACT_APP_ADMIN_TOKEN)

    await axios.post(route,payload)
    .then(async(response)=>{
        let result=responseHandler(response.data)
        if(result){
            results=response.data
        }
        
}).catch((e)=>{console.log(e)})

return results

}