import React, { useEffect, useState } from 'react'
import InputWidget from '../Components/InputWidget/InputWidget'
import { FaSearch } from "react-icons/fa";
import ListComponent from '../Components/ListComponent/ListComponent';
import { IoBag } from "react-icons/io5";
import BlackBackground from '../Components/TransparentBackgroundComponent/BlackBackground';
import { IoIosRefresh } from "react-icons/io";
import EditProductComponent from '../PopupPages/EditProductComponent/EditProductComponent';
import { adminAxiosPost } from '../../Methods/RequestHandler';

let arr=[]
export default function Products() {
    
    const [search, setsearch] = useState('')
    const [searchResult, setsearchResult] = useState(false)
    const [addProductPage, setaddProductPage] = useState(false)
    const [options, setoptions] = useState([])

    const productPageSwitch=(e)=>{
        if(addProductPage){
            setaddProductPage(false)
        }else{setaddProductPage(true)}
    }


    useEffect(()=>{
        let id=document.getElementById("cross-btn")
        if(id){
            id.addEventListener("click",()=>{
                setaddProductPage(false)
            })
        }
    })

    useEffect(()=>{
        searchProduct()
        categoryFetch()
    },[])

    const categoryFetch=async()=>{
        let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/getCategory",{})
        if(result){
          result.data.map((category)=>{
            options.push(category.name)
          })
   
        }
    }

    const searchProduct=async(e)=>{
        setsearchResult(false)
        let searchs=''
        arr=[]
        if(e){
          if(e.target.value){

            setsearch(e.target.value)
            searchs=e.target.value
          }else{
            setsearch(e.target.value)
          }
        }
       let result=await adminAxiosPost(process.env.REACT_APP_ADMIN_ROUTE+"/getProductData",{search:searchs})
       if(result){
           arr=result.data
           setsearchResult(true)
        }
    }

  return (
    <>
      <div className="admin-panel-screen-parent">
        <div className="admin-panel-screen">
          <div className="admin-search-div">
            <InputWidget
              symbol={<FaSearch />}
              value={search}
              onChange={searchProduct}
              placeholder="Search"
            />
          </div>
          <div className="admin-heading-div">
            Products{" "}
            <span>
              <IoBag />
            </span>
            <div>
              <button onClick={productPageSwitch}>
                <b>Add</b>
              </button>
              <button onClick={searchProduct}>
                <b
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.1cm",
                    fontSize: "0.5cm",
                  }}
                >
                  <IoIosRefresh />
                </b>
              </button>
            </div>
          </div>
          <div className="admin-panel-list-content-div">
            {searchResult && (
              <>
                {arr.map((item, index) => (
                  <ListComponent
                    id={item._id}
                    value={{ Name: item.name, Price: `₹ ${item.price}` }}
                    editComponent={
                      <EditProductComponent
                        id={item._id}
                        value={{
                          ProductName: item.name,
                          Discount: item.discount,
                          Price: item.price,
                          Description: item.description,
                          category: item.category,
                          sizeOption: {
                            small: Object.values(item.size_options)[0] || 0,
                            medium: Object.values(item.size_options)[1] || 0,
                            large: Object.values(item.size_options)[2] || 0,
                          },
                          rating:item.rating.$numberDecimal,
                          foodType:item.foodType,
                          options:options
                        }}
                      />
                    }
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {addProductPage && (
        <EditProductComponent
          onsubmit={(e) => {
            setaddProductPage(false);
          }}
          value={{
            ProductName: '',
            Discount: 0,
            Price: 0,
            Description: '',
            category: 'Burger',
            sizeOption: {
              small:0,
              medium: 0,
              large: 0,
            },
            rating:0,
            options:options
          }}
          createBtn={true}
        />
      )}
    </>
  );
}


