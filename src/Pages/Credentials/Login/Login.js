import React from 'react'
import { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import {clientPostAxios} from "../../../Methods/RequestHandler"
import {RxCross2} from 'react-icons/rx'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { responseHandler } from '../../../Methods/ResponseHandler'
import { useDispatch } from 'react-redux'

export default function Login() {

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const login=async(e)=>{
        e.preventDefault()
        if(email && pass)
        {
            if(email.substring(email.length-10,email.length)==="@gmail.com")
            {
               let result = await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/login",{email:email,password:pass})
               if(result){
                    localStorage.setItem("token",result.token)
                    navigate("/")
                    window.location.reload()
               }
            }
            else
            {
                dispatch({type:"AlertBoxDisplay",payload:{title:"Invalid Email",message:"Please enter correct mail"}})
            }
        }

    }

    return (
        <>
            <div className='black_background_'>
                <div className='login-container-parent'>

                <div className='login_container'>
                   
                    <form method='dialog' onSubmit={login}>


                        <div className='login_heading'>
                           <text>LOGIN</text>
                        </div>
                        


                        <div className="form-group">
                            <input type="email" value={email} onChange={(e)=>{setemail(e.target.value)}} className="form-control h-25"  aria-describedby="emailHelp" placeholder="Enter email" required="required" /> 
                        </div>
                        <br/>


                        <div className="form-group">
                            <input type="password" value={pass} onChange={(e)=>{setpass(e.target.value)}} className="form-control h-25"  placeholder="Password" required="required" />
                        </div>
                       <br/>


                       <div style={{width:'100%'}}>
                        <button className="btn btn-dark w-100">Sign in</button>
                       </div><br/>

                       <div style={{display:"flex",color:"black",justifyContent:"center",padding:"0.1cm 0cm"}}>
                          <text>Forgot password ? <Link to="">click here</Link></text>
                      </div>
                        

                    </form>
                </div>
                <SignUpLinkDiv/>


            </div>

            </div>
        </>
    )
}


const SignUpLinkDiv=()=>{
    return(
        <>
          <div className='credentials-links-div'>
                      <span className='credentials-break-line'></span>
  
                        <Link to='/Register'>
                        <div>
                            <text>Create Your Account</text>
                        </div>
                        </Link>
            </div>
        </>
    )
  }