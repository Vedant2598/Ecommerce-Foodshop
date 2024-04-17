import React,{useState} from 'react'
import "./Account.css"
import ProfileComponent from './ProfileComponent/ProfileComponent'
import Footer from "../../Components/Footer/Footer"
import { FaEdit } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi";
import { FaAddressCard } from "react-icons/fa6";
import AddressComponent from './AddressComponent/AddressComponent';
import { SlOptionsVertical } from "react-icons/sl";


export default function Account() {

  const [page, setpage] = useState(0)
  const [drawer, setdrawer] = useState(false)


  return (
    <div className='accounts_main_div'>
      <div className='account-navbar'>
        <div><text>My Account</text></div>

          <div className='navigation-for-mobile'>
            <span onClick={(e)=>{setdrawer(!drawer)}}>
              <SlOptionsVertical />
            </span>

          </div>

          {drawer&&

            <div className='navigation-for-mobile-options'> 
              <div onClick={(e)=>{setpage(0)}}>
                <text>Edit Profile</text>
              </div>

              <div onClick={(e)=>{setpage(1)}}>
                <text>Address</text>
              </div>
          </div>
          }
         
      </div>
      
        <div className='account-card-parent'>
          <div className='navigation-for-pc'>
              <div className={page===0&& 'navigation-for-pc-active'} onClick={(e)=>{setpage(0)}}><span><FaEdit /></span> <text>Edit Profile</text></div>
              <div className={page===1&& 'navigation-for-pc-active'} onClick={(e)=>{setpage(1)}}><span><FaAddressCard /></span><text>Address</text></div>
              {/* <div className={page===2&& 'navigation-for-pc-active'} onClick={(e)=>{setpage(2)}}><span><HiCurrencyRupee /></span><text>Balance</text></div> */}
          </div>


          <div className='account-card'>
            {page===0?
              <ProfileComponent/>
            :page===1&&
              <AddressComponent/>
            }
          </div>
        </div>
        {/* <Footer/> */}
    </div>
  )
}
