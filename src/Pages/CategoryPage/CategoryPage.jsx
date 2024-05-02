import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CategoryPage.css"
import ProductCard from '../../Components/ProductCard/ProductCard'
import { clientPostAxios } from '../../Methods/RequestHandler'

export default function CategoryPage() {

    const [show, setshow] = useState(true)
    const navigate=useNavigate()
    const {category}=useParams()
    const [loading, setloading] = useState(true)

    const [arr, setarr] = useState([])

    let fetchData=async()=>{
      let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getCategoryProducts",{category:category})
      setloading(true)
      if(result){
        if(result.data.length>0){
          setarr(result.data)
          setloading(false)
        }else{
          navigate(-1)
         
        }
      }
    }

    useEffect(()=>{
      fetchData()
    },[])
  return (
    <>
      <div className='category-page-parent'>
          <div className='category-heading'>{category}</div>
      {show&&
        <div className='category-page-card'>
            {arr.map((a)=>(
              <><ProductCard product_name={a.name} product_price={a.price} product_description={a.description} product_discount={a.discount} rating={a.rating.$numberDecimal}/></>
            ))}
      
        </div>
        }
        {loading&&
          <div style={{position:"absolute",display:"flex",justifyContent:"center",alignItems:"center",top:"0",width:"98%",height:"12cm"}}>
            <SearchLoadingBar size="1.5"/>
          </div>
        }
      </div>
    </>
  )
}


const SearchLoadingBar=(props)=>{
  return(
      <>
      <div className='search-loading' style={{width:`${props.size}cm`,height:`${props.size}cm`}}></div>
      </>
  )
}