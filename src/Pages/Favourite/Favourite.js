import React, { useEffect, useState } from 'react'
import './Favourite.css'
import {AiFillHeart} from 'react-icons/ai'
import ProductFavouriteCard from '../../Components/ProductFavouriteComponent/ProductFavouriteCard'
import { clientPostAxios } from '../../Methods/RequestHandler'

// let arr=[]
export default function Favourite() {
    const [arr, setarr] = useState([])
    const [show, setshow] = useState(false)
    const fetchData=async()=>{
        setshow(false)
        let payload={token:localStorage.getItem("token")}
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getFavourites",payload)
        if(result){
        //   arr=result.data
        setarr(result.data)
        }
        setshow(true)
      }
    useEffect(()=>{
        fetchData()

    },[])
  return (
    <>
        <div className='favourite-div-parent'>
        <h3 className="favourite_title"><span><AiFillHeart/></span><b>Favourite</b></h3>
            <div className='favourite_div'>
                {show&&
                <>
                    {arr.length>0?
                        <>
                        {arr.map((a)=>(

                            <ProductFavouriteCard productName={a.productName} quantity={a.Quantity} price={a.details[0].price} 
                            discount={a.details[0].discount}/>
                            ))
                        }
                    </>
                    :
                    <FavouriteNotFound/>
                    }
                </>
                }
            </div>
  
        </div>
    </>
  )
}


const FavouriteNotFound=()=>{
    return(
        <div className='favourite-not-found-div'>
            <img src={require("./Empty-amico.png")}/>
            <label>No Favourite Items Found</label>
        </div>
    )
}