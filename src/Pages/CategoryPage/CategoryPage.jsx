import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CategoryPage.css"
import ProductCard from '../../Components/ProductCard/ProductCard'
import { clientPostAxios } from '../../Methods/RequestHandler'

export default function CategoryPage() {

    const [show, setshow] = useState(true)
    const navigate=useNavigate()
    const {category}=useParams()

    const [arr, setarr] = useState([])

    let fetchData=async()=>{
      let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getCategoryProducts",{category:category})
      if(result){
        if(result.data.length>0){
          setarr(result.data)
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
    {show&&
      <div className='category-page-parent'>
          <div className='category-heading'>{category}</div>
        <div className='category-page-card'>
            {arr.map((a)=>(
              <><ProductCard product_name={a.name} product_price={a.price} product_description={a.description} product_discount={a.discount} rating={a.rating.$numberDecimal}/></>
            ))}
          
        </div>
      </div>
    }
    </>
  )
}
