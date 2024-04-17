let initialState={items:[],totalPrice:0}

export const BuyNowReducers=(state=initialState,action)=>{
    switch(action.type){
        
        case "BuyNowStore":
            let arr=[]
            arr.push(action.payload.item)
            // console.log(arr)
            state={...state,items:arr,totalPrice:action.payload.totalPrice}
            return state

        case "BuyAllStore":
            
            let arr2=action.payload.items
            state={...state,items:arr2,totalPrice:action.payload.totalPrice}
            // console.log(state)
            return state

        case "ClearBuyItems":
            state={...state,items:[],totalPrice:0}
            // console.log("your clear items",state)
            return state

        default:
            return state
    }
}