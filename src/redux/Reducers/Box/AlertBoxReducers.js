let initialState={title:null,message:null,display:false}


export const AlertBoxReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'AlertBoxDisplay':
            state={...state,title:action.payload.title,message:action.payload.message,display:true}
            return state

        case "AlertBoxClose":
            state={...state,title:null,message:null,display:false}
            return state
        default:
            return state
    }
}