import React, { useEffect } from 'react'
import "./css/Panel.css"
import InputWidget from '../Components/InputWidget/InputWidget'
import { FaSearch } from "react-icons/fa";
import ListComponent from '../Components/ListComponent/ListComponent';
import { useState } from 'react';
import { MdAccountCircle } from "react-icons/md";
import EditUserProfileComponent from '../PopupPages/EditUserProfileComponent/EditUserProfileComponent';
import { adminAxiosPost } from '../../Methods/RequestHandler';
import "./css/user.css"
import { IoIosRefresh } from 'react-icons/io';

export default function Users() {

    const [search, setsearch] = useState('')
    const [searchResult, setsearchResult] = useState(false)
    const [arr, setarr] = useState([])
    const [createPopup, setcreatePopup] = useState(false)

    const searchUser=async(e)=>{
        setsearchResult(false)
        let searchs=''
        setarr([])
        if(e){
          if(e.target.value){

            setsearch(e.target.value)
            searchs=e.target.value
          }else{
            setsearch(e.target.value)
          }
        }
       let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/getUserData",{search:searchs})
       if(result){
           
            // alert(result.data)
            setarr(result.data)
            if(result.data.length>0){
                setsearchResult(true)
            }
            
        }
    }
    useEffect(()=>{
        searchUser()
    },[])
    // useEffect(()=>{
    //     console.log(search)
    // },[search])

  return (
    <div className='admin-panel-screen-parent'>
        <div className='admin-panel-screen'>
            <div className='admin-heading-div-users'>
                <div className='w-25'>
                    Users Account <span><MdAccountCircle /></span>
                </div>
             
                <div className="admin-heading-users-buttons">
                    <button className='btn btn-primary mr-2' onClick={(e)=>{setcreatePopup(true)}}>Create</button>
                    <button className='btn btn-primary' onClick={searchUser}><IoIosRefresh /></button>
                </div>
            </div>
            <div className='admin-search-div'>
            <InputWidget symbol={<FaSearch />} value={search} onChange={searchUser} placeholder="Search"/>
            </div>
            <div className='admin-panel-list-content-div'>
                {/* <ListComponent value={{Name:"Vedant Vartak",Email:"vedant.vartak25@gmail.com"}} editComponent={<EditUserProfileComponent value={{Name:"Vedant Vartak",Email:"vedant.vartak25@gmail.com"}}/>}/>
                <ListComponent value={{Name:"xyz",Email:"xyz25@gmail.com"}} editComponent={<EditUserProfileComponent  value={{Name:"xyz",Email:"xyz25@gmail.com"}}/>}/> */}
            <table className='users-table' border="1">
                    <UserHeader/>
                <tbody>
                    {searchResult&&
                    <>
                    {arr.length>=0&&

                        <>
                        {arr.map((user)=>(
                            <>
                            <UserList userId={user._id} username={user.name} phone={user.phone} email={user.email}/>
            
                            </>
                        ))
                    }
                    </>
                    }
                    </>
                    }
                    
               
                </tbody>
            </table>
            </div>
            
            {createPopup&&
            <>
                <EditUserProfileComponent value={{Name:'',Email:'',Phone:'',userId:''}} closeFunction={()=>{setcreatePopup(false)}} createPage={true} />
            </>
            }

        </div>
    </div>
  )
}


const UserHeader=()=>{
    return(
        <>
        <thead>
            <tr>
                <th>UserId</th>
                <th>User</th>
                <th>Phone</th>
                <th>Buttons</th>
            </tr>
        </thead>
        </>
    )
}

const UserList=(props)=>{


    const [edit, setedit] = useState(false)

    return(
    <>
        <tr>
            <td>{props.userId}</td>
            <td>
                {props.username}<br/>
                <b>{props.email}</b>
            </td>
            <td>{props.phone}</td>
            <td>
                <button className='btn btn-dark mr-2' onClick={(e)=>{setedit(true)}}> Edit </button>

            </td>
        </tr>

        {edit&&
            <>
                <EditUserProfileComponent value={{Name:props.username,Email:props.email,Phone:props.phone,userId:props.userId}} closeFunction={()=>{setedit(false)}} createPage={false} />
            </>
        }
    </>
    )
}