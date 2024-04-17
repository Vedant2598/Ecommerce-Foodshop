let initialState={symbol:null,title:null,message:null,display:false}


export const NotifyBoxReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'NotifyBoxDisplay':
            state={...state,title:action.payload.title,message:action.payload.message,display:true}
            return state

        case "NotifyBoxClose":
            state={...state,title:null,message:null,display:false}
            return state
        default:
            return state
    }
}