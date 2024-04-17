import { createStore,combineReducers,applyMiddleware } from "redux";

import thunk from "redux-thunk";
import {CartReducers} from "./Reducers/Cart/CartReducers"
import { cartItemsReducers } from "./Reducers/Cart/CartItemsStore";
import { BuyNowReducers } from "./Reducers/BuyNow/BuyNowReducers";
import { TrackOrderReducer } from "./Reducers/OrderTrack/OrderTrackReducers";
import { AlertBoxReducer } from "./Reducers/Box/AlertBoxReducers";
import {CartBoxReducer} from "./Reducers/Box/CartBoxReducer"


const combineReducer=combineReducers({CartReducers,cartItemsReducers,BuyNowReducers,TrackOrderReducer,
    AlertBoxReducer,CartBoxReducer})

const store=createStore(combineReducer,{},applyMiddleware(thunk))


export default store