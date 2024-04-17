import React,{useState} from 'react'
import "./ProductFavouriteCard.css"
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {BsCartFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {GoStarFill} from 'react-icons/go'
import ImageDisplayer from '../ImageDisplayer/ImageDisplayer'
import { clientPostAxios } from '../../Methods/RequestHandler'

export default function ProductFavouriteCard(props) {

    const navigate=useNavigate()
    const [heart, setheart] = useState(true)
    const [discount, setdiscount] = useState(props.discount)
    const [price, setprice] = useState(props.price)

    const heart_selected=async()=>{
        if(localStorage.getItem("token")){
            let payload={token:localStorage.getItem("token"),ProductName:props.productName}

            if(heart){
                await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/removeFromFavourite",payload)
                setheart(false)
            }
            else
            {
                await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/addToFavourite",payload)
                setheart(true)
            }
        }
    }

    const ViewPage=()=>{
        navigate(`/Product/${props.productName}`)
    }

  return (
    <>
    
        <div className="product-favourite-card" >

            <div className='product-favourite-image-div'>
                <ImageDisplayer productName={props.productName}/>
            </div>


            <div className="product-favourite-info">
            <h2 className="product-favourite-title">{props.productName}</h2>
            {discount>0?
            <>
                <text className="product-favourite-price-cut">₹ {price}.00</text>
                <text className="product-favourite-price">₹{price-parseInt(price*(discount/100 ))}.00</text>
                <br/><b className='product-favourite-discount'>{discount}% Off</b>
            </>
            :
                <p className="product-favourite-price">₹ {price}.00 </p>
            }


            <div className='product-favourite-btns'>

            <span className='rating'><GoStarFill/><b>4.1</b></span>
            
            
                <div>

                    {heart?
                        <button onClick={heart_selected} className='heart_btn heart_btn_selected' ><AiFillHeart/></button>
                        :
                        <button onClick={heart_selected} className='heart_btn' ><AiFillHeart/></button>
                    }
                  <button className='btn btn-primary ml-1 view-btn' onClick={ViewPage}>View</button>
                </div>
            
            </div>
            </div>

            
            </div>
  
    </>
  )
}
