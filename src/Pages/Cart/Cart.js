import React, { useEffect ,useState,useContext} from 'react'
import "./Cart.css"
import ProductCart from '../../Components/ProductCartComponent/ProductCart'
import { clientPostAxios } from '../../Methods/RequestHandler'
import { useDispatch, useSelector } from 'react-redux'
import { batch } from 'react-redux'
import { useSocket } from '../../Sockets/SocketWrapper'
import { cartCheck,returnData } from '../../Methods/CartsHandler'
import { BsCartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import CartBox from '../../Components/Box/CartBox/CartBox'



export default function Cart() {

  const [show, setshow] = useState(false)
  const navigate=useNavigate()

  const dispatch=useDispatch()
  const selector=useSelector((state)=>state.CartReducers)
  const cartItemsselector=useSelector((state)=>state.cartItemsReducers)
  
  const [arr, setarr] = useState([])
  const [sizeIndex] = useState({Small:0,Medium:1,Large:2})

  const fetchData=async()=>{


      setshow(false)
      if(cartItemsselector.changes){
        
        let payload={token:localStorage.getItem("token")}
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getCartItems",payload)
        if(result){
          // arr=result.data
          setarr(result.data)
          console.log(result.data)
          calculateTotal(result.data)
          setshow(true)
          dispatch({type:"storeItems",payload:result.data})
          
        }
      }else{
        // console.log("fetched from cache")
        // arr=cartItemsselector.items
        setarr(cartItemsselector.items)
        // console.log(cartItemsselector.items)
        calculateTotal(cartItemsselector.items)
        setshow(true)
        
      }
    
  }
  
  const calculateTotal = async (arr2) => {
    let sum = 0;
    let items = 0;
    let totalDiscountPrice = 0;
    
    arr2.map((a) => {
      let price = a.details[0].price;
      let discount = a.details[0].discount;
      let quantity = a.Quantity;
      let sizePrice=parseInt(Object.values(a.details[0].size_options[sizeIndex[a.size]]))
      price=price+sizePrice


      sum = sum + (price - parseInt(price * (discount / 100))) * quantity;
      items += quantity;
      totalDiscountPrice += parseInt(price * (discount / 100)) * quantity;
    });

    batch(() => {
      dispatch({ type: "total", payload: sum });
      dispatch({ type: "totalItems", payload: items });
      dispatch({ type: "totalDiscount", payload: totalDiscountPrice });
    });
  };



  const buyAll=async()=>{
    returnData()
    let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getCartItems",{token:localStorage.getItem("token")})
    if(result){
      let sum = 0;
   
      result.data.map((a) => {
        let price = a.details[0].price;
        let discount = a.details[0].discount;
        let quantity = a.Quantity;
        let sizePrice = parseInt(Object.values(a.details[0].size_options[sizeIndex[a.size]]))
        price = price + sizePrice

        sum = sum + (price - parseInt(price * (discount / 100))) * quantity;
      });
    
    dispatch({type:"BuyAllStore",payload:{items:result.data,totalPrice:sum}})
    navigate("/Buy")
    }
  }
 
  
  useEffect(()=>{
    fetchData()

    return async()=>{ 
        returnData()
    }
  },[])
  return (
    <>
   
      <div className='cart-parent'>
        <h3 className='cart-h3'><span style={{display:"flex",alignItems:"center",marginRight:"0.1cm"}}><BsCartFill/></span>Cart </h3>
      
        <div className='cart-colums'>
          <div className='cart-left-column'>
              {cartItemsselector.totalItems>0?
              <>{show&&
                <>
                {arr.map((a,index)=>(
                  <ProductCart 
                  id={a._id}
                  index={index}
                  productName={a.productName} 
                  quantity={a.Quantity} 
                  price={a.details[0].price} 
                  discount={a.details[0].discount} 
                  size={a.size} 
                  sizeOptions={a.details[0].size_options}
                  sizeValue={Object.values(a.details[0].size_options[sizeIndex[a.size]])[0]} />
                  ))}
                </>
                }
              </>
                :
                <ProductCartEmpty/>
              }
          </div>

          <div className='cart-right-column'>
          
              {cartItemsselector.totalItems>0&&
              <div className='cart-product-bill-main'>
                  <h5>Price Details</h5>
                  <div><text>Total Items</text> <b>{selector.totalItems}</b></div>
                  <div><text>Total Discount </text><b className='text-success'>₹{selector.totalDiscount}</b></div>
                  <div><span></span></div>
                  <div><text>Total amount </text><b>₹{selector.totalPrice}</b></div>
                 
                    <div className='mt-2'><button className='btn btn-success w-100' onClick={buyAll}>Buy All</button></div>
              </div>
                  }
          
          </div>
            
        </div>
      </div>
    </>
  )
}



const ProductCartEmpty=()=>{
  return(
    <>
      <div className='product-cart-empty'>
        <img src={require("./Add to Cart-amico.png")}/>
        <label style={{fontSize:"0.6cm",textAlign:"center",width:"9cm"}}>Cart is Empty.</label>
        <p style={{width:"9cm",textAlign:"center"}}>Oops! Your cart seems to be feeling a bit lonely. Fill it with your favorite items and let the shopping spree begin! </p>
      </div>
    </>
  )
}