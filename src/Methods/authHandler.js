
export const authCheck=()=>{
    if(localStorage.getItem("token")){
        return true
    }
    else{
        return false
    }
}

export const Adminlogout=()=>{
    localStorage.removeItem(process.env.REACT_APP_ADMIN_TOKEN)
    window.location.reload()
}


export const adminCheck=()=>{
    if(localStorage.getItem(process.env.REACT_APP_ADMIN_TOKEN)){
        return true
    }
    else{
        return false
    }
}
