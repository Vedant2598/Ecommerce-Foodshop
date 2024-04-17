let initialState={items:[],totalItems:0,changes:true,changeItems:[]}

// THIS IS FOR STORING CART ITEMS LIKE CACHE WITH NAME,PRICE AND DISCOUNTS
export const cartItemsReducers=(state=initialState,action)=>{
    switch(action.type){

        case "decrementItem":

            let flag2=true
            let change2=state.changeItems
            let arr2=state.items.map((item,index)=>{
                if(flag2){
                    if(item._id===action.payload.id && item.Quantity===action.payload.Quantity){
                        item.Quantity-=1
                        change2.push(index)
                        flag2=false
                    }
                }
                return item
            })
            
            
            state={...state,items:arr2,changeItems:[...new Set(change2)]}
            // console.log(state)
            // console.log(state.changeItems)
          
            return state

        case "incrementItem":

            let flag=true
            let change=state.changeItems
            let arr=state.items.map((item,index)=>{
                if(flag){
                    if(item._id===action.payload.id && item.Quantity===action.payload.Quantity){
                        item.Quantity+=1
                        change.push(index)
                        flag=false
                    }
                }
                return item
            })
            state={...state,items:arr,changeItems:[...new Set(change)]}
            // console.log(state)
            // console.log(state.changeItems)
            return state

        case "cartChanges":
            state={...state,changes:action.payload}
            // console.log(state)
            return state

        case "storeItems":
            state={...state,items:action.payload,totalItems:action.payload.length,changes:false}
            // console.log(state)
            return state

        case "addToCart":
            // console.log("action is ",action.payload)
            state={...state,totalItems:(state.totalItems+1),changes:true}
            // console.log(state)
            return state

        case "removeFromCart":
            let newChangeItems=state.changeItems
            newChangeItems.filter((indexes,index)=>{
                if(indexes===action.payload.index){
                    newChangeItems.splice(index,1)
                }
            })
        
            state={...state,totalItems:(state.totalItems-1),changes:true,changeItems:newChangeItems}
            // console.log(state)
            return state

        case "setlocalStorage":
            if(state.changeItems.length>0){

                let cart=state.changeItems.map((item)=>{
                    return state.items[item]
                })
                // console.log("storage",cart)
                localStorage.setItem("cart",JSON.stringify(cart))
            }
            return state


        default:
            return state
    }
}