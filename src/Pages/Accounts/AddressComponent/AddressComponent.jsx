import React,{useEffect, useState} from 'react'
import { CgProfile } from "react-icons/cg";
import "./AddressComponent.css"
import { FaAddressCard } from "react-icons/fa";
import { clientPostAxios } from '../../../Methods/RequestHandler';
import SelectComponent from '../../../Components/SelectComponent/SelectComponent';




export default function AddressComponent() {
    const [city1, setcity1] = useState('')
    const [state1, setstate1] = useState('')
    const [address1, setaddress1] = useState('')

    const [landmark1, setlandmark1] = useState('')
  
    const [city2, setcity2] = useState('')
    const [state2, setstate2] = useState('')
    const [address2, setaddress2] = useState('')

    const [landmark2, setlandmark2] = useState('')

    const save1=async()=>{
        let payload={token:localStorage.getItem("token"),city:city1,state:state1,address:address1,landmark:landmark1,index:0}
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/updateAddress",payload)
        if(result){
            console.log(result)
        }
    }

    const save2=async()=>{
        let payload={token:localStorage.getItem("token"),city:city2,state:state2,address:address2,landmark:landmark2,index:1}
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/updateAddress",payload)
        if(result){
            console.log(result)
        }
    }

    const fetchData=async()=>{
        let payload={token:localStorage.getItem("token")}
        let result=await clientPostAxios(process.env.REACT_APP_BASEURL+"/users/getAddress",payload)
        if(result){
            if(!result.data[0].index){
                let data=result.data[0]
                setaddress1(data.address)
                setcity1(data.city)
                setlandmark1(data.landmark)
                setstate1(data.state)
            }
            if(!result.data[1].index){
                let data=result.data[1]
                setaddress2(data.address)
                setcity2(data.city)
                setlandmark2(data.landmark)
                setstate2(data.state)
            }
        }
    }
    useEffect(()=>{ 
        fetchData()
    },[])

  return (
    <>
    <div className="edit-address-parent">
            <h1>Shipping address details</h1>
            <p>Save address details here to quickly use during orders.</p>
            <AddressSectionHeader title="Address 1" symbol={<FaAddressCard />}/>
            <div className="edit-address-credentials">
              <div className="edit-address-credentials-left">
                  {/* <AddressInput value={city1}  title="City" name="city" type="text" change={(e)=>{setcity1(e.target.value)}}/>
                  <AddressInput value={state1}  title="State" name="state" type="text" change={(e)=>{setstate1(e.target.value)}}/> */}
                  <SelectComponent heading="State" selectedOption={state1} options={['Maharashtra']} selectFunction={(e)=>{setstate1(e.target.value)}} />
                  <SelectComponent heading="City" selectedOption={city1} options={['Alibag','Pune','Mumbai']} selectFunction={(e)=>{setcity1(e.target.value)}}/>
                            
                  <AddressInput value={address1}  title="Address" name="address" type="text" change={(e)=>{setaddress1(e.target.value)}}/>
                  <AddressInput value={landmark1}  title="Landmark" name="Landmark" type="text" change={(e)=>{setlandmark1(e.target.value)}}/>
                <button className="save-btn" onClick={save1}>Save</button>
              </div>
             
            </div>

            <AddressSectionHeader title="Address 2" symbol={<FaAddressCard />}/>
            <div className="edit-address-credentials">
              <div className="edit-address-credentials-left">
                  {/* <AddressInput value={city2}  title="City" name="city" type="text" change={(e)=>{setcity2(e.target.value)}}/>
                  <AddressInput value={state2}  title="State" name="state" type="text" change={(e)=>{setstate2(e.target.value)}}/> */}

                  <SelectComponent heading="State" selectedOption={state2} options={['Maharashtra']} selectFunction={(e)=>{setstate2(e.target.value)}} />
                  <SelectComponent heading="City" selectedOption={city2} options={['Alibag','Pune','Mumbai']} selectFunction={(e)=>{setcity2(e.target.value)}}/>
                  <AddressInput value={address2}  title="Address" name="address" type="text" change={(e)=>{setaddress2(e.target.value)}}/>
                  <AddressInput value={landmark2}  title="Landmark" name="Landmark" type="text" change={(e)=>{setlandmark2(e.target.value)}}/>
                <button className="save-btn" onClick={save2}>Save</button>
              </div>
             
            </div>  
    </div>

    </>
  )
}

const AddressInput=(props)=>{
    return (
        <>
        <div className="edit-address-input-div">
                <label>{props.title}</label>
                <input type={props.type} value={props.value} name={props.name} onChange={props.change} />
        </div>
        </>
    )
}

const AddressSectionHeader=(props)=>{
    return(
      <>
      <div className="edit-address-section-header">
        <h5><text style={{marginRight:"0.2cm"}}>{props.symbol}</text> <text>{props.title}</text></h5>
        <span></span>
      </div>
      </>
    )
  }