import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileComponent.css"
import { CgProfile } from "react-icons/cg";
import { AiFillTool } from "react-icons/ai";
import { clientPostAxios } from "../../../Methods/RequestHandler";



export default function ProfileComponent() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')

    const fetchData=async()=>{
      let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getData",{token:localStorage.getItem("token")})
      if(result){
        // console.log(result)
        setname(result.data.name)
        setemail(result.data.email)
        setphone(result.data.phone)
      }
    }

    useEffect(()=>{
      fetchData()
    },[])



      return (
        <>
        <div className="edit-profile-parent">
                <h1>My details</h1>

                <ProfileSectionHeader title="Personal Information" symbol={<CgProfile/>}/>
                <div className="edit-profile-credentials">
                  <div className="edit-profile-credentials-left">
                    <p>
                      Your privacy is our priority. We do not share your personal information with any third parties.
                      Your data is kept secure and confidential within our platform, ensuring a trustworthy and private experience for you.
                    </p>
                  </div>
                  <div className="edit-profile-credentials-right">
                      <ProfileInput value={name} title="Name" type="text" change={(e)=>{setname(e.target.value)}} disabled={false}/>
                      <ProfileInput title="Birthdate" type="date" disabled={false}/>
                      <ProfileInput value={email} title="Email" type="email" disabled={true}/>
                      <ProfileInput value={phone} title="Phone" type="phone" disabled={true}/>
                    <button className="save-btn">Save</button>
                  </div>
                </div>


                <ProfileSectionHeader title="Settings" symbol={<AiFillTool />}/>
                <div className="edit-profile-credentials">
                  <div className="edit-profile-credentials-left">
                    <p>
                      
                      In this section, you also have the option to deactivate your account if needed. 
                      Your account deactivation can be initiated through the provided settings.
                    </p>
                  </div>
                  <div className="edit-profile-credentials-right">
                      <button className="btn btn-danger" disabled={true}>DeActivate Account</button>
                      <p> This Account will be deactivated in One Hour.</p>
                  </div>
                </div>

                
        </div>

        </>
      )
}

const ProfileInput=(props)=>{
    return (
        <>
        <div className="edit-profile-input-div">
                <label>{props.title}</label>
                <input value={props.value} type={props.type} disabled={props.disabled} onChange={props.change}/>
        </div>
        </>
    )
}

const ProfileSectionHeader=(props)=>{
  return(
    <>
    <div className="edit-profile-section-header">
      <h5><text style={{marginRight:"0.2cm"}}>{props.symbol}</text> <text>{props.title}</text></h5>
      <span></span>
    </div>
    </>
  )
}
