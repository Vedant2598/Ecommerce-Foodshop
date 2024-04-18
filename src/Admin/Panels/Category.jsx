import React, { useEffect, useState } from 'react'
import "./css/category.css"
import { TbCategoryFilled } from "react-icons/tb";
import CustomInputWidget from '../Components/CustomInputWidget/CustomInputWidget';
import {RxCross2} from "react-icons/rx"
import { adminAxiosPost } from '../../Methods/RequestHandler';


export default function Category() {

  const [popup, setpopup] = useState(false)
  const [arr, setarr] = useState([])
  const [pageDisplay, setpageDisplay] = useState(false)

  const addPageToggle=()=>{
    setpopup(!popup)
  }

  const fetchData=async()=>{
      setpageDisplay(false)
      let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/getCategory",{})
      if(result){
       
          setarr(result.data)
          if(result.data.length>0){
            setpageDisplay(true)
          }
        
      }
  }

  useEffect(()=>{
      fetchData()
  },[])

  return (
    <>
    <div className='admin-panel-screen-parent'>
        <div className='admin-panel-screen'>
            <div className='category-heading-div'>
                <h3>Category <span><TbCategoryFilled /></span></h3>
                <div>
                  <button className='btn btn-primary mr-2' onClick={fetchData}>Refresh</button>
                  <button className='btn btn-primary' onClick={addPageToggle}>Add</button>
                </div>
            </div>

            <div className='category-list-panel'>
              {pageDisplay&&
                <>
                {arr.map((a)=>(
                  <CategoryListComponent name={a.name}/>
                ))
                }
                </>
              }
                
            </div>
            {popup&&
              <CategoryAddPopup closeBtn={(e)=>{setpopup(!popup)}}/>
            }
        </div>
    </div>
    </>
  )
}


const CategoryListComponent=(props)=>{

  const [deleted, setdeleted] = useState(false)

  const deleteCategory=async()=>{
    if(props.name!==""){

      let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/deleteCategory",{name:props.name})
      if(result){
        setdeleted(true)
        alert("Category deleted")
      }else{
        alert("failed to add")
      }
    }
  }

  return(
    <>
    {deleted?
      <></>
    :
    <div className='category-list-component'>
      <b>{props.name}</b>
      <div>
        <button className='btn btn-dark' onClick={deleteCategory}>Delete</button>
      </div>
    </div>
    }
  </>
  )
}

const CategoryAddPopup=(props)=>{

  const [name, setname] = useState('')

  const addCategory=async()=>{
    if(name!==""){

      let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/addCategory",{name:name})
      if(result){
        props.closeBtn()
        alert("Category added")
      }else{
        alert("failed to add")
      }
    }
  }

  return(
    <>
      <div className='category-popup-background'>
          <div className='category-popup-parent'>
           <button className='cross-btn' onClick={props.closeBtn}><RxCross2 /></button>
            <CustomInputWidget value={name} changeFunction={(e)=>{setname(e.target.value)}} placeholder={"Category Name"} symbol={<TbCategoryFilled />} symbolBackground={"black"} symbolColor={"white"}/>
            <button className='btn btn-dark' onClick={addCategory}>Add Category</button>
          </div>
      </div>
    </>
  )
}
