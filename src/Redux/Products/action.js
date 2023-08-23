import axios from "axios"
import * as types from './actionType.js' 

export const storeData = (payload)=>{
      
    return {
        type:types.STORE_DATA,
        payload
    }
}

export const handleLoading = ()=>{
      
    return {
        type:types.IS_LOADING,
    
    }
}

export const handleError = ()=>{
      
    return {
        type:types.IS_ERROR
    }
}

export const getData = ()=> (dispatch)=>{
    dispatch(handleLoading())
    axios.get("http://localhost:7500/products")
    .then((res)=>dispatch(storeData(res.data)))
    .catch((err)=>{
       dispatch(handleError())
    })

}



export const SingleProductStoreData = (payload)=>{
      
    return {
        type:types.CURRENT_PRODUCT_DATA,
        payload
    }
}

export const handleSingleProductLoading = ()=>{
      
    return {
        type:types.CURRENT_PRODUCT_LOADING,
    
    }
}

export const handleSingleProductError = ()=>{
      
    return {
        type:types.CURRENT_PRODUCT_ERROR
    }
}

export const getSingleProductData = (id)=> (dispatch)=>{
    dispatch(handleSingleProductLoading())
    axios.get(`http://localhost:7500/products/${id}`)
    .then((res)=> dispatch(SingleProductStoreData(res.data)))
    .catch((err)=>{
       dispatch(handleSingleProductError())
    })

}


