import store from "../redux/ReduxStore"

export const responseHandler=(response)=>{
    if(response.status==="failed"){
        switch(response.message){
            case "Login Failed":
                store.dispatch({type:"AlertBoxDisplay",payload:{title:'Login Failed',message:"Invalid Credentials"}})
                return false
            
            case "Invalid Token":
                localStorage.removeItem("token")
                localStorage.removeItem(process.env.REACT_APP_ADMIN_TOKEN)
                window.location.reload()
                break

            case "Too many requests":
                alert("Too Many Requests please try again later")
                break

            case "Account Already Exist":
                store.dispatch({type:"AlertBoxDisplay",payload:{title:'Failed',message:"Account Already Exist"}})
                return false

            case "Wrong OTP":
                store.dispatch({type:"AlertBoxDisplay",payload:{title:'Wrong OTP',message:"Please Enter Valid OTP"}})
            // case "User Not Found":
            //     localStorage.removeItem("token")
            //     window.location.reload()
            //     return false
            default:
                return false
        }
    }
    else{
        return true
    }
}