import React, { useEffect ,useState} from 'react'
import "./PlaceOrder.css"
import { useNavigate } from 'react-router-dom'
import ProductCart from '../../Components/ProductCartComponent/ProductCart'
import PlaceOrderProductCard from '../../Components/PlaceOrderProductCard/PlaceOrderProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { clientPostAxios } from '../../Methods/RequestHandler'
import { validateCredentials } from '../../Methods/SignupValidators'
import { FaCheck } from "react-icons/fa6";
import SelectComponent from '../../Components/SelectComponent/SelectComponent'


export default function PlaceOrder() {

    const navigate=useNavigate()
    const selector=useSelector((state)=>state.BuyNowReducers)
    const dispatch=useDispatch()

    const [orderHasBeenPlaced, setorderHasBeenPlaced] = useState(false)
    
    const [balance, setbalance] = useState(10000)
    const [address, setaddress] = useState()
    const [savedAddress, setsavedAddress] = useState(false)
    const [addressIndex, setaddressIndex] = useState(-1)

    const [shippingAddress, setshippingAddress] = useState({city:'Alibag',state:'Maharashtra',address:'',landmark:''})
    // THIS ADDRESS BELOW IS USED FOR SAVING 
    const [savedShippingAddress, setsavedShippingAddress] = useState({city:'Alibag',state:'Maharashtra',address:'',landmark:''})

    const fetchRequiredData=async()=>{
        let addressData=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getAddress",{token:localStorage.getItem("token")})
        if(addressData){
            // console.log(addressData.data)
            setaddress(addressData.data)
        }
    }

    useEffect(()=>{
        fetchRequiredData()
        if(selector.items.length<1){
            navigate("/search")
        }

        return ()=>{
            dispatch({type:'ClearBuyItems'})
        }
        
    },[selector.items.length,navigate])


    //FUNCTION 
    const addressChange=(e)=>{
        setshippingAddress({...shippingAddress,[e.target.name]:e.target.value})
        setsavedShippingAddress({...shippingAddress,[e.target.name]:e.target.value})
        // console.log(savedShippingAddress)
        setsavedAddress(false)
    }

    const placeOrder=async()=>{
       let isCredentialsValid= validateCredentials(shippingAddress)
       if(isCredentialsValid){
      
           let result= await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/placeOrder",{token:localStorage.getItem("token"),address:shippingAddress,products:selector.items,totalPrice:selector.totalPrice})
           if(result){
            setorderHasBeenPlaced(true)
            if(selector.items.length>1){
                dispatch({type:"cartChanges",payload:true})
            }
           }
       }else{
        dispatch({type:"AlertBoxDisplay",payload:{title:"Enter Address",message:"Please enter address"}})
       }
    }



  return (
    <>
    <div className='place-order-parent'>
        {!orderHasBeenPlaced&&
            <div className='place-order-navbar'>
                <text>Place your Order</text>
            </div>
        }
        
        {orderHasBeenPlaced?
        <OrderPlaceSuccess/>
        :
        <div className='place-orders-list'> 
        {/* {JSON.stringify(selector.items)} */}
            <div className='place-orders-list-card'>
                
                <div>
                    <PlaceOrderHeader title="Products"/>
                    {selector.items.map((item)=>(
                        <PlaceOrderProductCard title={item.productName} price={item.details[0].price} discount={item.details[0].discount} quantity={item.Quantity} 
                        sizePrice={item.sizePrice} size={item.size} sizeOptions={item.details[0].size_options}/>
                     ))
                    }
         
                  
                </div>

                <div className='place-orders-final-price'>
                    <div>
                        <label>Total Price</label>
                        <label style={{display:"flex",justifyContent:"right",paddingRight:"0.8cm"}}>₹ {selector.totalPrice}</label>
                    </div>
                </div>

                <div>
                    <PlaceOrderHeader title="Address"/>
                    <div className='place-orders-address'>
                        <div className='place-orders-address-radios-div'>
                            <input type='radio' name='address' 
                            onClick={()=>{setsavedAddress(false);setshippingAddress(savedShippingAddress);setaddressIndex(-1)}}
                            checked={addressIndex===-1?true:false}
                            />
                             New

                            <input type='radio' name='address' 
                            onClick={()=>{setsavedAddress(true);setshippingAddress(address[0]);setaddressIndex(0)}} 
                            checked={addressIndex===0?true:false}
                            />
                             Address 1

                            <input type='radio' name='address' 
                            onClick={()=>{setsavedAddress(true);setshippingAddress(address[1]);setaddressIndex(1)}}
                            checked={addressIndex===1?true:false}
                            /> 
                            Address 2

                        </div>
                        <div className='place-orders-address-input-div'>
                            {/* <PlaceOrderInput value={shippingAddress.state} change={addressChange} title="State" name="state" type="text" disabled={savedAddress}/> */}
                            {/* <PlaceOrderInput value={shippingAddress.city} change={addressChange} title="City" name="city" type="text" disabled={savedAddress}/> */}
                            <SelectComponent heading="State" selectedOption={shippingAddress.state} options={['Maharashtra']} selectFunction={addressChange} disabled={savedAddress}/>
                            <SelectComponent heading="City" selectedOption={shippingAddress.city} options={['Alibag','Pune','Mumbai']} selectFunction={addressChange} disabled={savedAddress}/>
                            <PlaceOrderInput value={shippingAddress.address} change={addressChange} title="Address" name="address" type="text" disabled={savedAddress}/>
                            <PlaceOrderInput value={shippingAddress.landmark} change={addressChange} title="Landmark" name="landmark" type="text" disabled={savedAddress} />
                        </div>
                    </div>
                </div>

                <div>
                    <PlaceOrderHeader title="Payment"/>
                    <div className='place-orders-payment'>
                        <div>
                            <input type="radio" checked />
                            <label>Pay with Local Website Payment.Complete your purchase securely using our local website payment system.</label>
                        </div>
                    </div>
                </div>

                <div className='place-orders-final-price'>
                    <div>
                        <label>Your Balance</label>
                        <label style={{display:"flex",justifyContent:"right",paddingRight:"0.8cm"}}>₹ {balance}</label>
                    </div>

                    <div>
                        <label>Total Price</label>
                        <label style={{display:"flex",justifyContent:"right",paddingRight:"0.8cm",color:"red"}}>₹ {selector.totalPrice}</label>
                    </div>

                    <div>
                        <label>Balance Remains</label>
                        <label style={{display:"flex",justifyContent:"right",paddingRight:"0.8cm"}}>₹ {balance-selector.totalPrice}</label>
                    </div>
                </div>

                <button className='btn btn-warning w-100 mt-3' onClick={placeOrder}>Place order</button>
            </div>
        </div>
    }   
    </div>
    </>
  )
}

const PlaceOrderHeader=(props)=>{
    return(
        <>
           <div className='place-order-heading'>
                <b>{props.title}</b>
                {/* <span></span> */}
            </div>
        </>
    )
}

const PlaceOrderInput=(props)=>{
    return (
        <>
        <div className="place-orders-input-div">
                <label>{props.title}</label>
                <input value={props.value} name={props.name} type={props.type} disabled={props.disabled} onChange={props.change}/>
        </div>
        </>
    )
}

const OrderPlaceSuccess=()=>{
    const navigate=useNavigate()
    const track=()=>{
        navigate("/Orders")
    }

    return(
        <>
        <div className='order-success-page-parent'>
            <div className='order-success-page'>
                <div>
                    <span className='check-icon'>
                        <FaCheck />
                    </span>
                    <h3 style={{textAlign:"center"}}>Your order has been placed </h3>
                    <p>Thank you for your order! Our kitchen is buzzing with excitement to prepare your delicious meal.</p>
                    <button className='order-success-button' onClick={track}>Track</button>
                </div>
            </div>
        </div>
        </>
    )
}