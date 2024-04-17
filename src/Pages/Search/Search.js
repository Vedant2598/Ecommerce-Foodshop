import React, { useEffect } from 'react'
import './Search.css'
import axios from 'axios'
import { useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import { clientPostAxios } from '../../Methods/RequestHandler'

const baseurl=process.env.REACT_APP_BASEURL
// let arr=[]
export default function Search() {
    const [arr, setarr] = useState([])
    const [search_value, setsearch_value] = useState('')
    const [searchResult, setsearchResult] = useState(false)

    //FUNCTIONS
    const searchProduct=async(e)=>{
        setsearchResult(false)
        let searchs=''
        // arr=[]
        setarr([])
        if(e){
            setsearch_value(e.target.value)
            searchs=e.target.value
        }
        
       let result=await clientPostAxios(baseurl+"/users/search",{search:searchs})
       
       if(result){
        //    arr=result.data
        setarr(result.data)
           //    console.log(arr)
           setsearchResult(true)
        }
    }

    useEffect(()=>{
        searchProduct()
    },[])

    return (
        <>
        <div className='search-div-main'>
           <div className='home_search'>
                <input className="form-control" value={search_value} type="text"  onChange={searchProduct} placeholder="Search" aria-label="Search" />
           </div>
           

           <div className='card_main_div'>
            <div className='card_main'>
               {searchResult&&
               <>
                   {arr.map((a)=>(
                    <><ProductCard product_name={a.name} product_price={a.price} product_description={a.description} product_discount={a.discount} rating={a.rating.$numberDecimal}/></>
                   ))}
               </>}
            </div>
            </div>
        </div>
        </>
    )
}
