import * as types from "./actionTypes"

export const addToCart  =  (payload)=>({
    type:types.ADD_TO_CART,
    payload
     
})

export const IncreaseCartQty = (payload)=>{
       return {
        type:types.INCREASE_QTY,
        payload
       }
}

export const DecreaseCartQty = (payload) =>{
    return {
        type:types.DECREASE_QTY,
        payload
       }
}

export const removeCart = (payload) =>{
    return {
        type:types.REMOVE_CART,
        payload
       }
}