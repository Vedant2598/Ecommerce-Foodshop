const data={totalPrice:0,totalItems:0,totalDiscount:0}

// THIS IS FOR TOTAL PRICE DETAILS
export const CartReducers=(state=data,action)=>{
    switch(action.type){
        case "totalItems":
            state={...state,totalItems:action.payload}
            // console.log(state)
            return state
        case "increment":
            state={...state,totalPrice:(state.totalPrice+action.payload.price),totalItems:Number(state.totalItems+1),totalDiscount:(state.totalDiscount+action.payload.savedPrice)}
            // console.log(state)
            return state

        case "decrement":
            state={...state,totalPrice:(state.totalPrice-action.payload.price),totalItems:Number(state.totalItems-1),totalDiscount:(state.totalDiscount-action.payload.savedPrice)}
            // console.log(state)
            return state

        case "removeItem":
            state = {
              ...state,
              totalPrice:
                state.totalPrice -
                action.payload.price * action.payload.quantity,

              totalItems: Number(state.totalItems - action.payload.quantity),

              totalDiscount:
                state.totalDiscount -
                (action.payload.savedPrice * action.payload.quantity),
            };
        
            return state
        
        case "totalDiscount":
            state={...state,totalDiscount:action.payload}
            return state

        case "total":
            state={...state,totalPrice:action.payload}
            return state
        default:
            return state
    }
}