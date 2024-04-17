import React from 'react'
import "./AdminLogin.css"
import CustomInputWidget from '../Components/CustomInputWidget/CustomInputWidget'
import { FaRegCreditCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import { useState } from 'react';
import axios from 'axios';

export default function AdminLogin() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const symbolColor="whitesmoke"
    const symbolBackground="black"

    const login=async()=>{
        await axios.post(process.env.REACT_APP_BASEURL+"/adminAuth",{username:username,password:password})
        .then((response)=>{
          if(response.data.status==="success"){
            localStorage.setItem(process.env.REACT_APP_ADMIN_TOKEN,response.data.token)
            localStorage.setItem("dd_",response.data.token)
            window.location.reload()
          }else{
            alert("Wrong credentials")
          }
        })
    }

  return (
    <div className='admin-login-parent'>
        <div className='admin-login-main'>
            <CustomInputWidget type="text" placeholder="Username" value={username} changeFunction={(e)=>{setusername(e.target.value)}} symbol={<FaRegCreditCard />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
            <CustomInputWidget type="password" placeholder="Password" value={password} changeFunction={(e)=>{setpassword(e.target.value)}} symbol={<RiLockPasswordFill />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
            <button className='btn btn-dark' onClick={login}>Login</button>
        </div>
    </div>
  )
}
