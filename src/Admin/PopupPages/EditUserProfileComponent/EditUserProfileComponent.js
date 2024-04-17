import React,{useState} from 'react'
import "./EditUserProfileComponent.css"
import { FaRegAddressCard } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import AdminImageDisplayer from "../../Components/AdminImageComponent/AdminImageDisplayer"
import CustomInputWidget from '../../Components/CustomInputWidget/CustomInputWidget';
import { RxCross2 } from "react-icons/rx";
import BlackBackground from "../../Components/TransparentBackgroundComponent/BlackBackground"
import { validateCredentials } from '../../../Methods/SignupValidators';
import {adminAxiosPost} from "../../../Methods/RequestHandler"
import io from "socket.io-client"

const socket=io(process.env.REACT_APP_BASEURL,{query:`token=${localStorage.getItem("dd_")}`})

export default function EditUserProfileComponent(props) {
    // const [image, setimage] = useState(false)
    // const [imageExtension, setimageExtension] = useState()
    // const [imageurl, setimageurl] = useState()

    const [id, setid] = useState(props.value.userId)
    const [name, setname] = useState(props.value.Name)
    const [email, setemail] = useState(props.value.Email)
    const [phone, setphone] = useState(props.value.Phone)
    const [password, setpassword] = useState('')
    
    let symbolBackground="black" 
    let symbolColor="whitesmoke"
    
    const [createPage, setcreatePage] = useState(props.createPage)
    
    const createUser=async()=>{
        let payload={name:name,email:email,phone:phone,password,password}
        let areValid=validateCredentials(payload)
        if(areValid){
            let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/AdminCreateUserAccount",payload)
            if(result){
                alert("User Created")
                props.closeFunction()
            }
        }else{
            alert("Please fill the fields")
        }
    }

    const saveChanges=async()=>{
        let payload={id:id,name:name,email:email,phone:phone}
        let areValid=validateCredentials(payload)
        if(areValid){
            let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/AdminUpdateUserData",payload)
            if(result){
                alert("User Updated")
            }
        }else{
            alert("Please fill the fields")
        }
    }

    const deleteUser=async()=>{
        let payload={id:id}
        let areValid=validateCredentials(payload)
        if(areValid){
            let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/AdminDeleteUserAccount",payload)
            if(result){
                socket.emit('AdminDeleteUserAccount',payload)
                props.closeFunction()
                alert("User deleted")
            }
        }else{
            alert("Please fill the fields")
        }
    }

    //SETTING IMAGE IN THE STATE 
    // const setImageFn=(e)=>{
    //     try{
    //         setimage(e.target.files[0])
    //         setimageExtension(e.target.files[0].name.split(".")[1])
    //         let url=URL.createObjectURL(e.target.files[0])
    //         setimageurl(url)
    //     }catch(e){}
    // }

   

  return (
    <>

    <BlackBackground>

    <div className='profile-card'>

        <div className='profile-heading'><b>PROFILE</b>  <button onClick={props.closeFunction} className='cross-btn'><RxCross2 /></button></div>
      

        <div className='edit-profile-column-parent'>
            {/* COLUMN 1 - START*/}
            <div className='edit-profile-column-1'>

            {/* IMAGE FUNCTIONS DIVS : STORING AND DISPLAYINGS IMAGES WORK HERE*/}
                {/* <div className='profile-image-div'>
                    <div className='profile-image'>
                        {image?
                            <img style={{width:"100%",height:"100%"}} src={imageurl} alt=''/>
                            :   <AdminImageDisplayer id={props.id}/>
                        }
                    </div>
                    <input type='file' id='edit-image' onChange={setImageFn} style={{display:"none"}} />
                    <label for="edit-image"><b>Edit Profile</b></label>
                </div> */}
          

                {/* STORING THE EMAILS,PHONE AND NAME GOES HERE */}
                <div className='profile-credentials'>
                    <>
                        <CustomInputWidget value={name} changeFunction={(e)=>{setname(e.target.value)}} heading="Enter Name" placeholder="Name" symbol={<FaRegAddressCard />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                        <CustomInputWidget value={email} changeFunction={(e)=>{setemail(e.target.value)}} heading="Enter Email" placeholder="Email" symbol={<MdAlternateEmail />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                        <CustomInputWidget type={"number"} value={phone} changeFunction={(e)=>{setphone(e.target.value)}} heading="Enter Phone" placeholder="Phone" symbol={<FaPhoneAlt />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                        
                        {createPage&&
                            <CustomInputWidget value={password} changeFunction={(e)=>{setpassword(e.target.value)}} heading="Enter Password" placeholder="Password" symbol={<RiLockPasswordFill />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                        }
                        
                    </>
                    {createPage?
                        <button className='btn btn-success w-100' onClick={createUser}><b>Create User</b></button>
                    :
                    <>
                        <button className='btn btn-success w-100' onClick={saveChanges}><b>Save Changes</b></button>
                        <button className='btn btn-danger w-100 mt-2' onClick={deleteUser}><b>Delete User</b></button>
                    </>
                    }
                </div>
            </div>
            {/* COLUMN 1 - ENDS */}


            {/* COLUMN 2 - START*/}
            {/* <div className='edit-profile-column-1'>
                <div>
                    
                </div>
            </div>   */}
            {/* COLUMN 2 - ENDS */}
        </div>

        </div>
    </BlackBackground>
    </>
  )
}
