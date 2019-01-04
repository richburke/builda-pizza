import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import configureStore from './common/store';
import Constants from './common/constants';
import './index.css';
import App from './App';

const store = configureStore();

const client = new ApolloClient({
  uri: Constants.Api.PIZZA_ENDPOINT,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
