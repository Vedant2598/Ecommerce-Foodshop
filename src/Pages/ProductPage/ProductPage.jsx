import React, { useEffect, useState } from 'react'
import "./ProductPage.css"
import ParentComponentFixed from '../../Components/ParentComponent/ParentComponentFixed'
import ImageDisplayer from '../../Components/ImageDisplayer/ImageDisplayer'
import { useParams } from 'react-router-dom'
import { clientPostAxios } from '../../Methods/RequestHandler'
import { FaArrowLeft } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate} from 'react-router-dom'
import QuantityComponent from '../../Components/QuantityComponent/QuantityComponent'
import { validateCredentials } from '../../Methods/SignupValidators'
import { useDispatch, useSelector } from 'react-redux'
import { cartItemsReducers } from '../../redux/Reducers/Cart/CartItemsStore'
import { authCheck } from '../../Methods/authHandler'
import { IoFastFoodSharp } from "react-icons/io5";
import CartBox from '../../Components/Box/CartBox/CartBox'
import FoodType from '../../Components/Symbol/FoodType/FoodType'
import RatingComponent from '../../Components/RatingComponent/RatingComponent'

export default function ProductPage() {

    const selector=useSelector((state)=>state.cartItemsReducers)
    const dispatch=useDispatch()
    const [auth, setauth] = useState(authCheck)
    const [cartNotify, setcartNotify] = useState(false)
    

    const [show, setshow] = useState(false)
    const [heart, setheart] = useState(false)
    const [foodType, setfoodType] = useState('')

    const [quantity, setquantity] = useState(1)
    const [price, setprice] = useState(0)
    const [description, setdescription] = useState('')
    const [discount, setdiscount] = useState(0)
    const [sizeOption, setsizeOption] = useState([])
    const [originalPrice, setoriginalPrice] = useState(0)
   

    //SIZE OPTION STATES
    const [selectedSizeOption, setselectedSizeOption] = useState("Small")
    const [sizePrice, setsizePrice] = useState(0)

    //RATINGS OPTION
    const [rating, setrating] = useState()

    const navigate=useNavigate()
    const {name}=useParams()

    const fetchData=async()=>{
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getSingleProductData",{name:name})
        // console.log(result)
        if(result){
          
            let data=result.data
            setdescription(data.description)
            setprice(data.price)
            setoriginalPrice(data.price)
            setdiscount(data.discount)
            setsizeOption(data.size_options)
            setrating(data.rating.$numberDecimal)
            setfoodType(data.foodType)
            setshow(true)
    
        }else{
            setTimeout(() => {
                
                navigate("/NotFound")
            }, 1000);
        }
    }
    const checkFavourites=async()=>{
        if(localStorage.getItem("token")){
           let result= await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getSingleFavourites",{token:localStorage.getItem("token"),ProductName:name})
           if(result.data){
            setheart(true)
           }
        }
    }

    useEffect(()=>{
        fetchData()
        checkFavourites()
    },[])
    
    const goBack=()=>{
        navigate(-1)
    }
    const share=async()=>{
        try{
            if(navigator.share){
                await navigator.share({
                    title: 'Your App Title',
                    text: 'Check out this amazing content!',
                    url: window.location.href,
                  });
            }
        }catch(e){
            alert("Something went Wrong")
        }
        
    }
    const increment=()=>{
        if(quantity<10){
            setquantity(quantity+1)
        }
    }

    const decrement=()=>{
        if(quantity>1){
            setquantity(quantity-1)
        }
    }


    // BACKEND FUNCTIONS
    const addToCart=async()=>{
        if(auth){

            let payload={token:localStorage.getItem("token"),ProductName:name,ProductQuantity:quantity,size:selectedSizeOption}
            let areCredentialsValid=validateCredentials(payload)
            if(areCredentialsValid){
                let result= await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/addToCart",payload)
           if(result){
            // alert("Item Added in Cart")
            setcartNotify(true)
            // setcartItemsCount((prev)=>prev+1)
            dispatch({type:"addToCart",payload:true})
            }
        }
    }else{
        navigate("/login")
    }
    }

    const BuyProduct=()=>{
        if(auth){

            dispatch({type:"BuyNowStore",payload:{item:{productName:name,Quantity:quantity,size:selectedSizeOption,details:[{price:originalPrice,discount:discount,size_options:sizeOption}]},
            totalPrice:((price-parseInt(price*(discount/100)))*quantity)}})
            navigate("/Buy")
        }else{
            navigate("/login")
        }
    }

    const heart_selected=async()=>{
        if(auth){
            let payload={token:localStorage.getItem("token"),ProductName:name}
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

   


  return (
    <>
    {cartNotify&&
        <CartBox closeFunction={(e)=>{setcartNotify(false)}}/>
    }
      <div className='product-info-fixed'>
    {show&&
    <>
    
    <div className='product-info-parent-navbar'>
        <span onClick={goBack} style={{display:"flex",alignItems:"center",color:"whitesmoke",fontSize:"0.76cm",cursor:"pointer"}}><FaArrowLeft /></span>
        <div>{auth&&<>
            <div className='product-info-favoutite-div'>
                    {heart?
                        <button onClick={heart_selected} className='heart-btn heart-btn-selected' ><AiFillHeart/></button>
                        :
                        <button onClick={heart_selected} className='heart-btn' ><AiFillHeart/></button>
                    }
                </div>
            <span className='icons_' style={{fontSize:"0.85cm"}}onClick={(e)=>{navigate("/Cart")}}><b className='cart-total-items'>{selector.totalItems}</b><IoCart /></span>
            </>
            }
            
            <span className='icons_' onClick={share}><FaShareAlt /></span>
        </div>
    </div>
    <div className='product-info-parent'>



        {/* PRODUCT LEFT COLUMN */}
        <div className='product-info-left-col'>
            <div className='product-info-image'>
                <ImageDisplayer productName={name}/>
            </div>
            <div style={{padding:"0cm 0.5cm"}} className='w-100'>
                <FoodType type={foodType}/>
            </div>
            <div style={{padding:"0.1cm 0.5cm"}}>
                
                <div className='product-info-title'>
                        <h4>{name}</h4>   
                </div>

                <div className='product-info-description'>
                   {description}
                </div>
                
                <div className='product-info-price'>
                {discount>0?
                    <>
                        <text style={{fontSize:"0.65cm"}} className="product-price-cut">₹ {price*quantity}.00</text>
                        <text style={{fontSize:"0.65cm"}} className="product-price">₹{(price-parseInt(price*(discount/100 )))*quantity}.00</text>
                        <b style={{fontSize:"0.4cm",marginLeft:"0.2cm"}} className='product-discount'>{discount}% Off</b>
                    </>
                    :
                        <text style={{fontSize:"0.65cm"}} className="product-price">₹ {price * quantity}.00 </text>
                    }
                </div>
               
            </div>
    
        </div>
        



        {/* PRODUCT RIGHT COLUMN */}
        <div className='product-info-right-col'>

            <div className='product-info-additional-options'>
                <div className='product-option-heading'>
                    <h4>Product Options</h4>
                    <span></span>
                </div>
                
            {sizeOption.length>1&&
            <>
             <text style={{fontSize:"0.55cm"}}>Size Option</text>
               <div className='product-page-size-option'>
                    
                    {sizeOption.map((a)=>(
                        <div>
                        <label>{Object.keys(a)[0]}</label> 
                        <input  type='radio' name='size'
                                onChange={(e)=>{
                                    setselectedSizeOption(Object.keys(a)[0]);
                                    setsizePrice(Number(Object.values(a)[0]));
                                    let newPrice=price-sizePrice
                                    setprice(newPrice+Number(Object.values(a)[0]));
                                }} 
                                
                                checked={selectedSizeOption===Object.keys(a)[0]?true:false}
                                />
                                
                                <label style={{marginLeft:"0.2cm"}}>
                                {Object.keys(a)[0]!=="Small"&&
                            <>+ ₹{Object.values(a)[0]}.00</>
                            }
                            </label>
                            </div>
                            
                    ))}
               </div>
               </>
                }
            <QuantityComponent quantity={quantity} increment={increment} decrement={decrement}/>
            </div>
            

            <div className='product-info-buttons'>
                <button onClick={addToCart} className='product-info-add-to-cart'>Add to Cart</button><b style={{padding:"0cm 0.05cm"}}></b>
                <button className='product-info-buy-now' onClick={BuyProduct}>Buy now</button>
            </div>
            <div>
                <RatingComponent rating={rating} title={name}/>
            </div>
        </div>


    </div>
    </>
    }   
    </div>
    </>
  )
}

