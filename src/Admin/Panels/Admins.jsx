import React, { useState } from 'react'
import InputWidget from '../Components/InputWidget/InputWidget'
import { FaSearch } from "react-icons/fa";
import ListComponent from '../Components/ListComponent/ListComponent';
import { MdAccountCircle } from "react-icons/md";


export default function Admins() {
    const [search, setsearch] = useState('')

    return (
    <div className='admin-panel-screen-parent'>
        <div className='admin-panel-screen'>
            <div className='admin-search-div'>
            <InputWidget symbol={<FaSearch />} value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder="Search"/>
            </div>
            <div className='admin-heading-div'>
                Admin <span><MdAccountCircle /></span>
            </div>
            <div className='admin-panel-list-content-div'>
                <ListComponent value={{Name:"Vedant Vartak",Email:"vedant.vartak25@gmail.com"}} editComponent={<></>}/>  
            </div>
        </div>
    </div>
  )
}
