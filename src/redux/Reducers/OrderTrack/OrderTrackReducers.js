let initialState={items:[],totalPrice:0,address:null,orderDate:null,status:null,deliverDate:null,orderId:null}

// JUST TO STORE THE ITEMS TO VIEW IN THE NEXT PAGE
export const TrackOrderReducer=(state=initialState,action)=>{
    switch(action.type){
        
        case "TrackOrder":
            let arr=action.payload.item
            // console.log("address is ",action.payload.address)
            state={...state,items:arr,orderId:action.payload.orderId, totalPrice:action.payload.totalPrice, address:action.payload.address,
                    orderDate:action.payload.orderDate, orderTime:action.payload.orderTime, status:action.payload.status}
                  
            return state

        case "TrackStatusChange":
            state={...state,status:action.payload.status}
            // console.log("State is :",state)
            return state

        case "TrackDeliveredDate":
            state={...state}
            return state

        default:
            return state
    }
}