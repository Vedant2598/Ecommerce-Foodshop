export const validateCredentials=(payload)=>{
    for(let i=0;i<Object.values(payload).length;i++){
        if(Object.values(payload)[i]===null || Object.values(payload)[i]===""){
            console.log(Object.keys(payload)[i])
          return false
        }
      }
      return true
}

export const validateFileExtension=(fileExtension)=>{
    if(fileExtension){

        let result=false
        let extension=String(fileExtension).toLowerCase()
        let ValidExtensions=["jpg","png","jpeg"]
        
        ValidExtensions.forEach(x=>{
            if(x===extension){
                result=true
            }
        })
        if(result===false){
            alert("Invalid Image Format")
        }
        return result
    }
}

export const validateSignUpCredentials=(payload)=>{
    let valid=false
    for(let i=0;i<Object.values(payload).length;i++){
        switch(Object.keys(payload)[i]){
            case "email":
                let email=Object.values(payload)[i]
                let isEmailValid=(String(email).substring(email.length-10,email.length)==="@gmail.com")
                if(!isEmailValid){
                    alert("Invalid Email")
                }
                valid=isEmailValid
                break

            case "phone":
                let phone=Object.values(payload)[i]
                let isPhoneValid=(phone.length===10 && Number(phone))
                if(!isPhoneValid){
                    alert("Invalid Phone Number")
                }
                valid=isPhoneValid
                break

            default:
                break
        }
    }

    return valid
}