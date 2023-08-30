import {legacy_createStore,applyMiddleware,compose,combineReducers} from "redux"
import { productReducer } from "./Products/reducer"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";
import { cartReducer } from "./Carts/reducer";

const persistConfig = {
       key: 'root',
       storage,
     }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
       product : productReducer,
       cart : cartReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = legacy_createStore(persistedReducer,composeEnhancers(applyMiddleware(thunk)))
const persistor = persistStore(store);
export {store, persistor}