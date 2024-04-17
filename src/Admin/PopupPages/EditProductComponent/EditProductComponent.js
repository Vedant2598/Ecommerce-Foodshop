import React,{useEffect, useState} from 'react'
import "./EditProductComponent.css"
import CustomInputWidget from '../../Components/CustomInputWidget/CustomInputWidget';
import { RxCross2 } from "react-icons/rx";
import BlackBackground from "../../Components/TransparentBackgroundComponent/BlackBackground"
import { FaRupeeSign } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { validateCredentials, validateFileExtension } from '../../../Methods/SignupValidators';
import SelectComponent from '../../Components/SelectComponent/SelectComponent';
import { adminAxiosPost,} from '../../../Methods/RequestHandler';
import AdminImageProductDisplayer from '../../Components/AdminImageComponent/AdminImageProductDisplayer';
import ProductSizeComponent from '../../Components/ProductSizeComponent/ProductSizeComponent';
import { FcRating } from "react-icons/fc";




export default function EditProductComponent(props) {

    const [createBtn] = useState(props.createBtn || false)

    //IMAGE STATES
    const [image, setimage] = useState(false)
    const [imageExtension, setimageExtension] = useState()
    const [imageurl, setimageurl] = useState()

    // DATA
    const [productName, setproductName] = useState(props.value.ProductName)
    const [price, setprice] = useState(props.value.Price)
    const [description, setdescription] = useState(props.value.Description)
    const [discount, setdiscount] = useState(props.value.Discount || 0)
    const [category, setcategory] = useState(props.value.category || 'Burger' )
    const [rating, setrating] = useState(props.value.rating || 0)
    const [foodType, setfoodType] = useState(props.value.foodType)
    const [options, setoptions] = useState(props.value.options)

    //SIZE OPTION DATA 
    const [smallOption, setSmallOption] = useState(false);
    const [mediumOption, setMediumOption] = useState(false);
    const [largeOption, setLargeOption] = useState(false);
    // const [smallSizePrice, setSmallSizePrice] = useState(props.value.sizeOption.small.Small || 0 );
    const [mediumSizePrice, setMediumSizePrice] = useState(props.value.sizeOption.medium.Medium || 0);
    const [largeSizePrice, setLargeSizePrice] = useState(props.value.sizeOption.large.Large || 0 );

    let symbolBackground="black" 
    let symbolColor="whitesmoke"

    //SETTING IMAGE IN THE STATE 
    const setImageFn=(e)=>{
        try{
            setimage(e.target.files[0])
            setimageExtension(e.target.files[0].name.split(".")[1])
            let url=URL.createObjectURL(e.target.files[0])
            setimageurl(url)
        }catch(e){}
    }

    const selectCategory=(e)=>{
        setcategory(e.target.value)
    }

    const selectfoodType=(e)=>{
        setfoodType(e.target.value)
        console.log(e.target.value)
    }

    useEffect(()=>{
        if(props.value.sizeOption.small){
            setSmallOption(true)
        }
        if(props.value.sizeOption.medium){
            setMediumOption(true)
        }
        if(props.value.sizeOption.large){
            setLargeOption(true)
        }
    },[])

    /* FUNCTIONS  */
    const createProduct=async()=>{
        if(image){

        let formdata=new FormData()
        let credentials={productName:productName,productDescription:description,productPrice:price,productDiscount:discount,rating:rating,Category:category,sizeOption:[],foodType:foodType}
        let areCredentialsValid=validateCredentials(credentials)
        let isExtensionValid=validateFileExtension(imageExtension)
        
        credentials.sizeOption.push({Small:0})
        
        if(mediumOption){
            credentials.sizeOption.push({Medium:mediumSizePrice})
        }
        if(largeOption){
            credentials.sizeOption.push({Large:largeSizePrice})
        }

        if(isExtensionValid && areCredentialsValid){
            let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/addProduct",credentials)
            if(result){
                formdata.append("productName",productName)
                formdata.append("file",image)
                

                let result2=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/addProductImage",formdata)
                if(result2){
                    alert("Product created Successfully")
                    props.onsubmit()
                }
            }
          }

        }
    }

    const deleteProduct=async()=>{
        let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/deleteProduct",{id:props.id})
        if(result){
            let btn=document.getElementById("cross-btn")
            btn.click()
        }
        
    }
    
    const saveProduct=async()=>{
        let credentials={id:props.id,productName:productName,productDescription:description,productPrice:price,productDiscount:discount,rating:rating,Category:category,sizeOption:[],foodType:foodType}
        let areCredentialsValid=validateCredentials(credentials)
        let isExtensionValid=validateFileExtension(imageExtension)
       
        credentials.sizeOption.push({Small:0})
        
        if(mediumOption){
            credentials.sizeOption.push({Medium:mediumSizePrice})
        }
        if(largeOption){
            credentials.sizeOption.push({Large:largeSizePrice})
        }
       
        if(image){
            if(isExtensionValid && areCredentialsValid){
                let step1=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/saveProduct",credentials)
                if(step1){
                    let formdata=new FormData()
                    formdata.append("productName",productName)
                    formdata.append('file',image)

                    let step2=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/addProductImage",formdata)
                    if(step2){
                        alert("Product Changes were Saved Successfully")
                    }
                }
            }
        }else{
            if(areCredentialsValid){
                let step1=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/saveProduct",credentials)
                if(step1){
                    alert("Product Changes were Saved Successfully")
                }
            }
        }
           
       
    }
    // const consoled=()=>{
    //     console.log(largeSizePrice,mediumSizePrice)
    // }


  return (
    <>

    <BlackBackground>

    <div className='edit-product-card'>

        <div className='edit-product-heading'><b>{createBtn?<>Add Product</>:<>Edit Product</>}</b>  <button id='cross-btn' className='cross-btn'><RxCross2 /></button></div>
      

        <div className='edit-product-column-parent'>
            {/* COLUMN 1 - START*/}
            <div className='edit-product-column-1'>

            {/* IMAGE FUNCTIONS DIVS : STORING AND DISPLAYINGS IMAGES WORK HERE*/}
                <div className='edit-product-image-div'>
                    <div className='edit-product-image'>
                        {image?
                            <img style={{width:"100%",height:"100%"}} src={imageurl} alt=''/>
                            :   <AdminImageProductDisplayer id={props.id}/>
                        }
                    </div>
                    <input type='file' id='edit-image' onChange={setImageFn} style={{display:"none"}} />
                    <label for="edit-image"><b>Product Image</b></label>
                </div>
          

                {/* STORING THE EMAILS,PHONE AND NAME GOES HERE */}
                <div className='edit-product-credentials'>
        
                        <CustomInputWidget value={productName} changeFunction={(e)=>{setproductName(e.target.value)}} heading="Enter Product Name" placeholder="Product Name" symbol={<FaProductHunt />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                        <CustomInputWidget value={price} changeFunction={(e)=>{setprice(e.target.value)}} heading="Enter Product Price" placeholder="Product Price" symbol={<FaRupeeSign />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                        <CustomInputWidget value={discount} changeFunction={(e)=>{setdiscount(e.target.value)}} heading="Enter Discount" placeholder="Discount" type="number" symbol={<FaPercent />} symbolBackground={symbolBackground} symbolColor={symbolColor}/> 
                        <SelectComponent key={1} options={options} selectFunction={selectCategory} heading="Choose the category" selectedOption={category}/>
                     
                </div>
            </div>
            {/* COLUMN 1 - ENDS */}





            {/* COLUMN 2 - START*/}
            <div className='edit-product-column-2'>
                <div className='edit-product-column-inner'>
                    <CustomInputWidget value={description} changeFunction={(e)=>{setdescription(e.target.value)}} heading="Enter Product Description" placeholder="Product Description" symbol={<MdDescription />} symbolColor={symbolColor} symbolBackground={symbolBackground}/>
                    
                           
                            <div className='size-options-div'>
                                <h5 style={{color:"whitesmoke"}}><b>Size Options (Additional Amount Only)</b></h5>
                                {/* <ProductSizeComponent title="Small" change={()=>{setSmallOption(!smallOption)}} value={smallOption} amountChange={(e)=>{setSmallSizePrice(e.target.value)}} amountValue={smallSizePrice}/> */}
                                <ProductSizeComponent title="Medium" change={()=>{setMediumOption(!mediumOption)}} value={mediumOption} amountChange={(e)=>{setMediumSizePrice(e.target.value)}} amountValue={mediumSizePrice}/>
                                <ProductSizeComponent title="Large" change={()=>{setLargeOption(!largeOption)}} value={largeOption} amountChange={(e)=>{setLargeSizePrice(e.target.value)}} amountValue={largeSizePrice}/>
                                {/* <button onClick={consoled}></button> */}
                            </div>
                    <CustomInputWidget value={rating} changeFunction={(e)=>{setrating(e.target.value)}} heading="Enter Rating" placeholder="Discount" type="number" symbol={<FcRating />} symbolBackground={symbolBackground} symbolColor={symbolColor}/> 
                    <SelectComponent heading="Veg | Non Veg " options={["None","Veg","Non Veg"]} selectedOption={foodType} selectFunction={selectfoodType}/>
                    {createBtn?
                        <button onClick={createProduct} className='edit-product-button'><b>Create Product</b></button>
                    :<>
                        <button onClick={saveProduct} className='edit-product-button'><b>Save Changes</b></button>
                        <button onClick={deleteProduct} className='edit-product-button bg-danger'><b>Delete Product</b></button>
                    </>
                    }
                </div>
            </div>  
            {/* COLUMN 2 - ENDS */}



            </div>
        </div>
    </BlackBackground>
    
    </>
  )
}

