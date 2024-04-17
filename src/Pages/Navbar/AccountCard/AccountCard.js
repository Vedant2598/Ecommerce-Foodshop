import React, { useEffect } from 'react'
import { useState } from 'react'
import './AccountCard.css'
import { Link,useNavigate } from 'react-router-dom'
import {BsFillBoxFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {HiOutlineLogout} from 'react-icons/hi'
import { CgProfile } from 'react-icons/cg'
import { authCheck } from '../../../Methods/authHandler'

export default function AccountCard() {
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem("token")
    navigate("/")
    window.location.reload()
}
  return (

    <>
      <div className='account_card bg-dark'>
      <Link to="/Account" className='btn btn-primary'><span><CgProfile/></span> <text>My Account</text></Link>
      <Link to="/Orders" className='btn btn-primary mt-2'><span><BsFillBoxFill/> </span> <text>Orders</text></Link>
      <Link to="/Favourite" className='btn btn-primary mt-2'><span><AiFillHeart/></span> <text>Favourite</text></Link>
      <Link className='btn btn-danger mt-2' onClick={logout}><span><HiOutlineLogout/></span> <text>Logout</text></Link>
      </div>
    </>
  )
}
