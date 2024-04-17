import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Navbar.css'
import { Link } from 'react-router-dom'
import {BsList} from 'react-icons/bs'
import {BsCartFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBookmarkPlusFill} from 'react-icons/bs'
import {RxCross2} from 'react-icons/rx'
import {RiArrowDropDownLine} from "react-icons/ri"
import {CgProfile} from "react-icons/cg"
import {BsSearch} from "react-icons/bs"
import {BiLogIn} from "react-icons/bi"
import { useState } from 'react'
import AccountCard from './AccountCard/AccountCard'
import ForMobile from './ForMobile/ForMobile'
import { authCheck } from '../../Methods/authHandler'
import { useSelector } from 'react-redux'

export default function Navbar() {

    const selector=useSelector((state)=>state.cartItemsReducers)
    const [auth, setauth] = useState(authCheck)
    const [account, setaccount] = useState(false)

    // TO SWITCH THE PAGE TO ACCOUNT
    const account_fn=()=>{
        if(account)
        {
            setaccount(false)
        }
        else
        {
            setaccount(true)
        }
    }

    return (
        <>
            {/* FOR PC NAVBAR */}
           <div className='navbars bg-dark'>
           <a className='navbars_brand' style={{color:'whitesmoke'}}><b>STORES</b></a>
         


            <div className='navbars_items'>
                <Link to="/Search" className='search_btn btn btn-success'><BsSearch/></Link>
                <Link to="/" className='navbars_item_'><span><AiFillHome/> </span> Home</Link>
                {/* <b style={{color:"red"}}>{selector.totalItems}</b> */}
                {auth?
                    <>
                    <Link to="/Cart" className='navbars_item_'><span><BsCartFill/></span>Cart</Link>
                    <Link onClick={account_fn} className='navbars_item_'><span style={{fontSize:'0.6cm'}}><CgProfile/></span>Account<span><RiArrowDropDownLine/></span></Link>
                    {account&&
                        <AccountCard/>
                    }
                    </>
                :
                    <>
                    <Link to="/Login" className='navbars_item_'><span style={{fontSize:'0.55cm'}}><BiLogIn/></span> Sign in</Link>
                    </>
                }

            </div>

           {/* PC NAVBAR END */}




        {/* FOR MOBILE WORK (RESPONSIVE) */}

                <ForMobile/>
           
        {/* MOBILE WORK END */}

           </div>
        </>
    )
}
