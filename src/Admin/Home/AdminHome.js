import React, { useState } from 'react'
import "./AdminHome.css"
import { BsList } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { BsFillBoxFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";


import Users from '../Panels/Users';
import Products from '../Panels/Products';
import Admins from '../Panels/Admins';
import Orders from '../Panels/Orders';
import Category from '../Panels/Category';



export default function AdminHome() {

    const [page, setpage] = useState(0)
    const [drawer, setdrawer] = useState(false)

    const drawerPage=()=>{
        if(drawer){
            setdrawer(false)
        }else{setdrawer(true)}
    }
    const logout=()=>{
        localStorage.removeItem(process.env.REACT_APP_ADMIN_TOKEN)
        window.location.reload()
    }

  return (
    <div className='admin-home-div'>
        <nav className='admin-navbar bg-dark'>
            <span className='admin-navbar-drawer-icon ' onClick={drawerPage}><BsList /></span>
            ADMIN PANEL
        </nav>
        {drawer&&<>
            <div className='admin-drawer bg-dark'>
                <div style={{color:"whitesmoke",cursor:"pointer"}}  onClick={drawerPage}>x</div>
                <div>
                    <div className='admin-drawer-heading'>Models <span><FaDatabase /></span></div>
                    <div className='admin-drawer-btn' onClick={(e)=>{setpage(0);setdrawer()}}><span><FaUser /></span>Users</div>
                    <div className='admin-drawer-btn' onClick={(e)=>{setpage(1);setdrawer()}}><span><FaUnlockAlt /></span>Admin</div>
                    <div className='admin-drawer-btn' onClick={(e)=>{setpage(2);setdrawer()}}><span><IoBag /></span>Products</div>
                    <div className='admin-drawer-btn' onClick={(e)=>{setpage(3);setdrawer()}}><span><BsFillBoxFill /></span>Orders</div>
                    <div className='admin-drawer-btn' onClick={(e)=>{setpage(4);setdrawer()}}><span><TbCategoryFilled /></span>Categories</div>
                </div>

                <div>
                    <div className='admin-drawer-heading'>Settings</div>
                    
                    <div className='admin-drawer-btn' onClick={logout}><span><FaPowerOff /></span>Logout</div>
              
                </div>
            </div>   
        </>
        }
        <div className='admin-main-screen'>
            {page===0?
                <Users/>
            :page===1?
                <Admins/>
            :page===2?
                <Products/>
            :page===3?
                <Orders/>
            :page===4&&
                <Category/>
            }
        </div>
    </div>
  )
}
