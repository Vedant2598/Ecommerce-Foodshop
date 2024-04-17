import React,{useRef,createContext} from "react";
import "./App.css"
import Home from "./Pages/Home/Home"
import Search from "./Pages/Search/Search"
import AdminLogin from "./Admin/Login/AdminLogin";
import Login from "./Pages/Credentials/Login/Login"
import Register from "./Pages/Credentials/Register/Register";
import Navbar from "./Pages/Navbar/Navbar";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import Favourite from "./Pages/Favourite/Favourite";
import AdminHome from "./Admin/Home/AdminHome";
import Error from "./Pages/ErrorPage/Error";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Account from "./Pages/Accounts/Account";
import PlaceOrder from "./Pages/PlaceOrderPage/PlaceOrder";
import CategoryPage from "./Pages/CategoryPage/CategoryPage"
import OrderTrackingPage from "./Pages/OrderTrackingPage/OrderTrackingPage";
import AlertBox from "./Components/Box/AlertBox/AlertBox";
import NotifyBox from "./Components/Box/NotifyBox/NotifyBox";

import {adminCheck, authCheck} from "./Methods/authHandler"
import { useEffect, useState } from "react";
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import Footer from "./Components/Footer/Footer";
import { clientPostAxios } from "./Methods/RequestHandler";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsReducers } from "./redux/Reducers/Cart/CartItemsStore";
import { returnData } from "./Methods/CartsHandler";
import {io} from "socket.io-client"
import { MdDeliveryDining } from "react-icons/md";
import axios from "axios";


const socket=io(process.env.REACT_APP_BASEURL,{query:{token:localStorage.getItem("token")}})



function App() {
  
  const [auth, setauth] = useState(authCheck)
  const [supreme, setsupreme] = useState(adminCheck)

  const [notifyDelivery, setnotifyDelivery] = useState(false)
 

  const alertSelector=useSelector(state=>state.AlertBoxReducer)
  const dispatch=useDispatch()

 
  let fetchCart=async()=>{
    if(localStorage.getItem("token")){
      let result =await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getCartItems",{token:localStorage.getItem("token")})
      if(result){

        dispatch({type:"storeItems",payload:result.data})
      }
    }
  }

  const fetchUserCheck=async()=>{
      
     
       let token=localStorage.getItem("token")
       
        if(token){
          await axios.post(process.env.REACT_APP_BASEURL+"/users/checkUser",{token:token})
          .then((response)=>{
            if(response.data.status==="failed"){
              localStorage.removeItem("token")
              window.location.reload()
            }
          })
        } 
  }


  

  useEffect(()=>{
    socket.on("TrackEmitClient",(payload)=>{
      if(payload.message==="Out for Delivery"){
        setnotifyDelivery(true)
        console.log("Notification Triggered")
      }
    })

    socket.on("DeleteUserReceiver",()=>{
      // alert("User Deleted")
      localStorage.removeItem("token")
      window.location.reload()
    })

    return ()=>{
      socket.off("TrackEmitClient")
      socket.off("DeleteUserReceiver")
    }
  })


 useEffect(()=>{

    if(localStorage.getItem("token")){
      socket.emit("JoinOwnChannel",{token:localStorage.getItem("token")})
    }
    
    // checkLocalStorage().then(fetchUserCheck)

    document.addEventListener("visibilitychange",returnData)
    window.addEventListener("beforeunload",returnData)
    fetchCart() 
    fetchUserCheck()

  
 },[])
  return (
    <>
    <div className="app-main">
      {alertSelector.display&&
       <AlertBox/>
      }

      {notifyDelivery&&
        <NotifyBox symbol={<MdDeliveryDining />} closeFunction={()=>{setnotifyDelivery(false)}}  message="Out for Delivery"/>
      }
   
      <Router>
        <Navbar/>

        <Routes>

          {/* LOGIN & REGISTER ROUTE */}
          {!auth&&
            <>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/Register" element={<Register/>}/>
            </>
          }
          

          {/* INTERFACE ROUTES */}
          {auth&&
            <>
              <Route path="/Account" element={<Account/>} />
              <Route path="/Favourite" element={<Favourite/>} />
              <Route path="/Orders" element={<Order/>}/>
              <Route path="/Cart" element={<Cart/>} />
              <Route path="/Buy" element={<PlaceOrder/>}/>
              <Route path="/OrderTrack" element={<OrderTrackingPage/>}/>
            </>
          }
          <Route path="/" element={<Home/>} />
          <Route path="/Search" element={<Search/>} />
          <Route path="/Product/:name" element={<ProductPage/>} />
          <Route path="/Category/:category" element={<CategoryPage/>} />
          <Route path="/NotFound" element={<Error/>}/>
          <Route path="*" element={<Error/>}/>



          {/* ADMIN ROUTES */}
          {!supreme?
            <Route path="/admin5148486465" element={<AdminLogin/>}/>
            :
            <>
            <Route path="/admin5148486465" element={<AdminHome/>}/>
          </>
          }

        </Routes>
  
       <Footer/>
      </Router>
    </div>
    </>
  );
}

export default App;
