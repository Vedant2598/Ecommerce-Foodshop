import React,{useEffect, useState} from 'react'
import "./RatingComponent.css"
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { MdStar } from "react-icons/md";
import { clientPostAxios } from '../../Methods/RequestHandler';




export default function RatingComponent(props) {


    const [stars, setstars] = useState(0)
    const [fixedStars, setfixedStars] = useState(0)

    const [ratingEdit, setratingEdit] = useState(false)
    const [alreadyHadRating, setalreadyHadRating] = useState(false)

    const StarsComponent=()=>{
        let arr=[]
        for(let i=1;i<=5;i++){
            arr.push(
                <>
                {stars>=i?
                    <span onClick={()=>{setstars(i);setfixedStars(i)}} onMouseLeave={(e)=>{setstars(fixedStars)}}><TiStarFullOutline /></span>:
                    <span onClick={()=>{setstars(i);setfixedStars(i)}} onMouseEnter={(e)=>{setstars(i)}} ><TiStarOutline /></span>
              }
                </>
            )
        }
        return arr
    }

    const AlreadyStarsAvailable=()=>{
        let arr=[]
        for(let i=1;i<=5;i++){
            arr.push(
                <>
                {stars>=i?
                    <span><TiStarFullOutline /></span>:
                    <span><TiStarOutline /></span>
                }
                </>
            )
        }
        return arr
    }

    const BarComponent=()=>{
        let arr=[]
        for(let i=5;i>=1;i--){
            arr.push(
                <>
                <div style={{display:"flex",width:'100%',alignItems:"center"}}>
                    <div className='rating-bars-div'>
                        <span className={`rating-${i}`} 
                        // style={{width:`${19*i}%`}}
                        ></span>
                    </div>
                    <b style={{padding:"0cm 0.3cm"}}>{i}</b>
                </div>
                </>
            )
        }
        return arr
    }


    //FUNCTIONS 

    let fetchData=async()=>{
        if(localStorage.getItem("token")){
            let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getUserRatings",{token:localStorage.getItem("token"),productName:props.title})
            if(result){
                if(result.data){
                    let data=result.data.rating

                    setratingEdit(true)
                    setfixedStars(data)
                    setstars(data)
                    console.log("stars",result.data)
                    if(data===0){
                        setalreadyHadRating(false)
                    }else{
                        setalreadyHadRating(true)
                    }
                }else{
                    setratingEdit(false)
                }
            }
        }
    }

    const submitRating=async()=>{
        if(fixedStars>0){

            let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/addRating",{token:localStorage.getItem("token"),productName:props.title,rating:fixedStars})
            if(result){
                alert("rating submitted")
                setalreadyHadRating(true)
            }
        }
    }

    const deleteRating=async()=>{
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/deleteRating",{token:localStorage.getItem("token"),productName:props.title,rating:fixedStars})
            if(result){
                alert("rating deleted")
                setfixedStars(0)
                setstars(0)
                setalreadyHadRating(false)
            }
    }

    useEffect(()=>{ 
       fetchData()
    },[])

  return (
    <>
        <div className='rating-product-parent'>
            <div>
                {ratingEdit&&
                <>
                <h3>Rate</h3>
                <div className='rating-stars'>
                    <div style={{display:"flex",}}>
                        {alreadyHadRating?
                            <AlreadyStarsAvailable/>
                            :
                            <StarsComponent/>
                        }
                    </div>
                </div>
                <div className='mt-2'>
                    {alreadyHadRating?
                        <button className='btn btn-primary' onClick={deleteRating}>Delete Rating</button>
                    :
                        <button className='btn btn-primary' onClick={submitRating}>Submit Rating</button>
                    }
                </div>
                </>
                }
                
            </div>

            <div className='rating-number-div'>
                <b>Rating</b>
                <div className='rating-number'><b>{props.rating}</b> <span><MdStar /></span></div>
            </div>
            
            <div className='rating-bars'>

                <BarComponent/>
            </div>
        </div>
    </>
  )
}
