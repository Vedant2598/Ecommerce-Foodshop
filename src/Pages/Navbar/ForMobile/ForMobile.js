import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Navbar.css"
import {BsList} from 'react-icons/bs'
import {BsCartFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import {BsSearch} from "react-icons/bs"
import {BsFillBoxFill} from "react-icons/bs"
import {BiLogIn} from "react-icons/bi"
import {HiOutlineLogout} from 'react-icons/hi'
import { authCheck} from '../../../Methods/authHandler'
import { CgProfile } from 'react-icons/cg'


export default function ForMobile() {

    const [drawerPage, setdrawerPage] = useState(false)
    const [auth, setauth] = useState(authCheck)
    const navigate=useNavigate()

    const logout=()=>{
        localStorage.removeItem("token")
        navigate("/")
        window.location.reload()
    }


    //FOR MOBILE SWITCH
    const pageSwitch=()=>{
        if(drawerPage===false)
        {
            setdrawerPage(true)
        }
        else if(drawerPage===true)
        {
            setdrawerPage(false)
        }
    }

  return (
    <>
          <div className='drawer_btn_div'>
              <Link to="/Search" className='search_btn btn btn-success'><BsSearch /></Link>
              <button className='drawer_btn' onClick={pageSwitch} ><BsList /></button>
          </div>

          {drawerPage &&
              <>
                  <div className='drawer_page_div'>
                      <div className='drawer_page_inner_div bg-dark'>


                          <a onClick={pageSwitch} style={{color:"wheat"}} className='navbars_item_cross'><RxCross2 /></a>
                          <br/><br/>
                          {!auth &&
                            <Link to="/Login" onClick={pageSwitch} className='navbars_item_'><b><span style={{fontSize:"0.66cm",marginLeft:'-0.13cm'}}><BiLogIn/></span> Sign in</b></Link>
                          }


                          <Link to="/" onClick={pageSwitch} className='navbars_item_'><b><span><AiFillHome /></span> Home</b></Link>

                          {auth &&
                              <>
                                  <Link to="/Account" onClick={pageSwitch} className='navbars_item_'><b><span><CgProfile /></span> Account</b></Link>
                                  <Link to="/Cart" onClick={pageSwitch} className='navbars_item_'><b><span><BsCartFill /></span> Cart</b></Link>
                                  <Link to="/Favourite" onClick={pageSwitch} className='navbars_item_'><b><span><AiFillHeart /></span> Favourite</b></Link>
                                  <Link to="/Orders" onClick={pageSwitch} className='navbars_item_'><b><span><BsFillBoxFill /></span> Orders</b></Link>
                                  <div>
                                    <Link onClick={logout} style={{display:"flex",flexDirection:"row",marginLeft:'0.4cm',width:'3.5cm'}} className='btn btn-danger mt-2 ' ><span className='mr-2'><HiOutlineLogout/></span><b>Logout</b></Link>
                                  </div>
                                  
                              </>
                          }
                      </div>
                  </div>
              </>
          }
    </>
  )
}
