import * as types from "./actionTypes";

const init = {
  cart: [],
};

export const cartReducer = (state = init, { type, payload }) => {
  switch (type) {
    case types.ADD_TO_CART:
      // check first item does exits or not
              let isPresent = state.cart.find(
                (prod) => prod.id == payload.id && prod.size == payload.size
              );
              let newCart;
              if (isPresent) {
                newCart = state.cart.map((prod) => {
                  if (prod.id == payload.id && prod.size == payload.size) {
                    return { ...prod, qty: prod.qty + 1 };
                  } else {
                    return prod;
                  }
                });
              } else {
                let newPayload = {
                  ...payload,
                  qty: 1,
                };
                newCart = [...state.cart, newPayload];
              }

              return { ...state, cart: newCart };

    case types.INCREASE_QTY: {
              let modified_prod = state.cart.map((el) => {
                if (el.size === payload.size && el.id === payload.id) {
                  return { ...el, qty: el.qty + 1 };
                } else {
                  return el;
                }
              });

              return { ...state, cart: modified_prod };
    }

    case types.DECREASE_QTY: {
          let resultant_prod = state.cart.map((el) => {
            if (el.size === payload.size && el.id === payload.id) {
              return { ...el, qty: el.qty - 1 };
            } else {
              return el;
            }
          });

          return { ...state, cart: resultant_prod };
    }

    case types.REMOVE_CART:{
        let remove_prod = state.cart.filter((el) => {
            return !(el.id === payload.id && el.size === payload.size)
          } 
        );
        console.log(remove_prod)
     
        return { ...state, cart: remove_prod };
      }


       default: return state;
  }
};
