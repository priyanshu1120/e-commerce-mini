import {legacy_createStore,applyMiddleware,compose,combineReducers} from "redux"
import { productReducer } from "./Products/reducer"
import thunk from "redux-thunk";
import { cartReducer } from "./Carts/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
       product : productReducer,
       cart : cartReducer
})
const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

export {store}