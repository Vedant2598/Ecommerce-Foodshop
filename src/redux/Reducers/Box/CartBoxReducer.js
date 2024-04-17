let initialState={title:null,message:null,display:false}


export const CartBoxReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'CartBoxDisplay':
            state={...state,title:action.payload.title,message:action.payload.message,display:true}
            return state

        case "CartBoxClose":
            state={...state,title:null,message:null,display:false}
            return state
        default:
            return state
    }
}