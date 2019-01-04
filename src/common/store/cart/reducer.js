import {
  SELECT_OPTION,
  CLEAR_SELECTED_OPTION,
  UPDATE_TOPPING,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './types';

const initialState = {
  selectedOption: null,
  selected: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SELECT_OPTION:
    return {
      ...state,
      selectedOption: action.option,
    };

  case CLEAR_SELECTED_OPTION:
    return {
      ...state,
      selectedOption: null,
    };

  case UPDATE_TOPPING:
    const toppings = state.selectedOption.toppings
      .map((topping) => {
        if (topping.name === action.toppingName) {
          topping.selected = !topping.selected;
        }
        return topping;
      });

    const newState = {
      ...state,
      selectedOption: {
        ...state.selectedOption,
        toppings,
      }
    };
    return newState;

  case ADD_TO_CART:
    return {
      ...state,
      selected: state.selected.concat(action.pizza),
    };

  case REMOVE_FROM_CART:
    return {
      ...state,
      selected: state.selected
        .slice(0, action.itemIndex)
        .concat(state.selected.slice(action.itemIndex + 1, state.selected.length))
    };

  default:
    return state;
  }
};

export default reducer;
