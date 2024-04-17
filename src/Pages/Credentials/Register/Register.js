import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RxCross2} from 'react-icons/rx'
import './Register.css'
import axios from 'axios'
import CustomInputWidget from '../../../Components/CustomInputWidget/CustomInputWidget'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { validateCredentials } from '../../../Methods/SignupValidators'
import { clientPostAxios } from '../../../Methods/RequestHandler'
import { useDispatch } from 'react-redux'
import { MdOutlinePassword } from "react-icons/md";
import {FaCheck} from "react-icons/fa"
import LoadingComponent from '../../../Components/LoadingComponent/LoadingComponent'


export default function Register() {

    const [page, setpage] = useState(0)
    const [loading, setloading] = useState(false)
    const [registerContainerDisplay, setregisterContainerDisplay] = useState(true)

    const dispatch=useDispatch()
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [confpass, setconfpass] = useState('')

    const [otp, setotp] = useState(null)
    const navigate=useNavigate()  

    let symbolColor="whitesmoke"
    let symbolBackground="rgb(50, 50, 50)"
    let headingColor="rgb(51, 51, 51)"


  const register=async()=>{

    let payload={name:name,phone:phone,email:email,password:pass}
    let areCredentialsValid=validateCredentials(payload)
    console.log(payload)
    if(areCredentialsValid){
      if(String(phone).length===10){
      if (email.substring(email.length - 10, email.length) === '@gmail.com') {
      if (pass === confpass) {
          let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/register",payload)
          if(result){
            alert('register successful')
            navigate('/Login')
          }
        }
          else{
            dispatch({type:"AlertBoxDisplay",payload:{title:"Password MisMatched",message:"Passwords are not the same"}})
          }
      }
      else{
        dispatch({type:"AlertBoxDisplay",payload:{title:"Invalid Email",message:"Please enter correct mail"}})
      }
    }
    else{
      dispatch({type:"AlertBoxDisplay",payload:{title:"Invalid Number",message:"Please enter correct Phone Number"}})
    }
    }
    
  }



  // WITH OTP FUNCTIONS
  const registerStep1=async()=>{
    let payload={name:name,phone:phone,email:email,password:pass}
    let areCredentialsValid=validateCredentials(payload)
    console.log(payload)
    if(areCredentialsValid){
      if(String(phone).length===10){
      if (email.substring(email.length - 10, email.length) === '@gmail.com') {
      if (pass === confpass) {
        
          setloading(true)
          let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/registerStep1",payload)
          if(result.status==="success"){
            setpage(1)
            setloading(false)
          }
          else if(result.status==="failed" && result.message==="Account Already Exist"){
            dispatch({type:"AlertBoxDisplay",payload:{title:"Failed",message:"Account Already Exist"}})
          }
          setloading(false)
          // else{
          //   dispatch({type:"AlertBoxDisplay",payload:{title:"Failed",message:"Something Went Wrong"}})
          // }
        }
          else{
            dispatch({type:"AlertBoxDisplay",payload:{title:"Password MisMatched",message:"Passwords are not the same"}})
          }
      }
      else{
        dispatch({type:"AlertBoxDisplay",payload:{title:"Invalid Email",message:"Please enter correct email"}})
      }
    }
    else{
      dispatch({type:"AlertBoxDisplay",payload:{title:"Invalid Number",message:"Please enter correct Phone Number"}})
    }
    }
  }

  const registerStep2=async()=>{
    let payload={name:name,phone:phone,email:email,password:pass,otp:otp}
    let areCredentialsValid=validateCredentials(payload)
    if(areCredentialsValid){
      setloading(true)
      let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/registerStep2",payload)
      if(result.status==="success"){
        setloading(false)
        setregisterContainerDisplay(false)
        setpage(2)
      }
      else if(result.status==="failed" && result.message==="Wrong OTP"){
        setloading(false)
        dispatch({type:"AlertBoxDisplay",payload:{title:"Invalid OTP",message:"Please enter correct Phone Number"}})
      }
    }
  }

  return (

    <>
    <div className='black_background'>
      {registerContainerDisplay&&
 
      <div className='register_container'>


        {page===0?
          <form  method='dialog'>
          {/* <b className='test'>a</b> */}
          <CustomInputWidget value={name} changeFunction={(e)=>{setname(e.target.value)}} symbol={<MdOutlineDriveFileRenameOutline />} symbolColor={symbolColor} symbolBackground={symbolBackground} placeholder="FullName" heading="Enter Full Name" headingColor={headingColor} disabled={false}/>
          <CustomInputWidget value={phone} changeFunction={(e)=>{if(String(e.target.value).length<=10){setphone(e.target.value)}}} symbol={<FaAddressCard />} symbolColor={symbolColor} symbolBackground={symbolBackground} placeholder="Phone" heading="Enter Phone No" headingColor={headingColor}   type="number"/>
          <CustomInputWidget value={email} changeFunction={(e)=>{setemail(e.target.value)}} symbol={<MdAlternateEmail />} symbolColor={symbolColor} symbolBackground={symbolBackground} placeholder="Email" heading="Enter Email Address" headingColor={headingColor}  type="email" />
          <CustomInputWidget value={pass} changeFunction={(e)=>{setpass(e.target.value)}} symbol={<MdOutlineDriveFileRenameOutline />} symbolColor={symbolColor} symbolBackground={symbolBackground} placeholder="Password" heading="Enter Password" headingColor={headingColor}   type="password" />
          <CustomInputWidget value={confpass} changeFunction={(e)=>{setconfpass(e.target.value)}} symbol={<MdOutlineDriveFileRenameOutline />} symbolColor={symbolColor} symbolBackground={symbolBackground} placeholder="Confirm Password" heading="Confirm Password" headingColor={headingColor} type="password" />
          
         {loading?
         <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
            <LoadingComponent size={"1.2cm"}/>
         </div>
          :
           <button className='btn btn-success w-100' onClick={registerStep1}>Next</button>
         } 
        <label className='note-info mt-2'>
          Please ensure you provide a valid email address during registration.
          A One-Time Password (OTP) will be sent to your mobile for verification.
        </label>
        </form>


        :page===1&&
        <form method='dialog'>
          <CustomInputWidget type="number" value={otp} changeFunction={(e)=>{if(String(e.target.value).length<=6){setotp(e.target.value)}}} symbol={<MdOutlinePassword />} symbolColor={symbolColor} symbolBackground={symbolBackground} placeholder="OTP" heading="Enter OTP" headingColor={headingColor}  disabled={false}/>
          <label className='note-info'>
          Almost there! To complete your registration, we've sent a One-Time Password (OTP) to your registered mobile number.
           Please enter the OTP below to verify and activate your account.
          </label>
          {loading?
            <div style={{display:"flex",justifyContent:"center",width:"100%"}}>
              <LoadingComponent size={"1.2cm"}/>
            </div>
          :
            <button className='btn btn-success w-100 mt-2' onClick={registerStep2}>SignUp</button>
          }
        </form>
        }
      </div>
      }

      {page===2&&
        <RegisterSuccessPage/>
      }
    </div>
    </>
  )
}


const RegisterSuccessPage=()=>{

  const navigate=useNavigate()

  return(
    <>
    <div className='order-success-page-parent'>
    <div className='order-success-page'>
        <div>
            <span className='check-icon'>
                <FaCheck />
            </span>
            <h3 style={{textAlign:"center"}}>Your account has been Created. </h3>
            <p>Thank you for creating an account with us! We're excited to have you on board and look forward to serving you.</p>
            <button className='order-success-button' onClick={()=>{navigate("/login")}}>Return to Login</button>
        </div>
    </div>
</div>
</>
  )
}