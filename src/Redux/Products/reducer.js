
import * as types from './actionType.js'

const initialState = {
    isLoading:false,
    isError:false,
    products:[],
    productDetails:{}
}


export const productReducer = (state = initialState , {type,payload})=>{
    switch(type){
        
        case types.IS_LOADING : 
             return {
                  ...state,
                  isLoading:true
             }
        

        case types.STORE_DATA : 
            return {
                 ...state,
                 isLoading:false,
                 products : payload,
                 isError:false
            }
       

       case types.IS_ERROR : 
        return {
             ...state,
             isLoading:false,
             products : [],
             isError:true
        }


        case types.CURRENT_PRODUCT_LOADING : 
        return {
             ...state,
             isLoading:true
        }
   

   case types.CURRENT_PRODUCT_DATA : 
       return {
            ...state,
            isLoading:false,
            productDetails : payload,
            isError:false
       }
  

  case types.CURRENT_PRODUCT_ERROR : 
   return {
        ...state,
        isLoading:false,
        productDetails : {},
        isError:true
   }
   

        default : return state

    }

}