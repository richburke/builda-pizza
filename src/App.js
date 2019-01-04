import React from 'react';
import PizzaBuilder from './components/pizzaBuilder';
import Cart from './components/cart';
import Constants from './common/constants';
import './App.css';

const App = () => (
  <div className="App">
    <h1>{Constants.AppName}</h1>
    <section>
      <PizzaBuilder />
    </section>
    <section>
      <Cart />
    </section>
  </div>
)

export default App;
