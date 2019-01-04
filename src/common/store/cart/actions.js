import {
  SELECT_OPTION,
  CLEAR_SELECTED_OPTION,
  UPDATE_TOPPING,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './types';

export const selectOption = (option) => {  
  return {
    type: SELECT_OPTION,
    option,
  }
};

export const clearSelectedOption = (option) => {  
  return {
    type: CLEAR_SELECTED_OPTION,
  }
};

export const updateTopping = (toppingName) => {  
  return {
    type: UPDATE_TOPPING,
    toppingName,
  }
};

export const addToCart = (pizza) => {  
  return {
    type: ADD_TO_CART,
    pizza,
  }
};

export const removeFromCart = (itemIndex) => {  
  return {
    type: REMOVE_FROM_CART,
    itemIndex,
  }
};
