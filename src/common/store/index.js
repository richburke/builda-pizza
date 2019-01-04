import { createStore } from 'redux';
import cart from './cart/reducer';

export default () => {  
  return createStore(cart);
};
