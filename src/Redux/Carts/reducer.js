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

      return { ...state, cart : newCart };

    default:
      return state;
  }
};
