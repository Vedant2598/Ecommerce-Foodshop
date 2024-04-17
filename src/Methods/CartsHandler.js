import { clientPostAxios } from "./RequestHandler"

export const cartCheck=(arr)=>{
    let flag=true
    Array(arr).map((item)=>{
        if(item===null || item===undefined || item===''){
            flag=false
        }
        if(Object.keys(item[0])[0]!=="_id"  &&  Object.keys(item[0])[2]!=="Quantity"){
            flag=false
            console.log("flag got triggered",Object.keys(item[0])[0],Object.keys(item[0])[1])
            localStorage.removeItem("cart")
        }
    })

    return flag
}

export const returnData=async()=>{
    if(localStorage.getItem("token") && localStorage.getItem("cart")){
      try{
        let cart=(JSON.parse(localStorage.getItem("cart")))
        if(cartCheck(cart)){

          let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/cartUpdate",{token:localStorage.getItem("token"),data:cart})
          if(result){
            localStorage.removeItem("cart")
          }
        }else{
            localStorage.removeItem("cart")
        }
      }catch(e){
        localStorage.removeItem("cart")
      }
    }
  }