import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from 'redux';

const blogReducer = (state = [], action) => {
  if (action.type === 'NEW_BLOG') {
    return state.concat(action.payload);
  }

  return state;
};

// creating a new blog manually by calling the dispatch method
// store.dispatch({
//   type: 'NEW_BLOG',
//   payload: {
//     title: 'using redux in the blog app',
//     author: 'redux',
//     url: 'www.redux.com',
//     id: 1
//   }
// });

const store = createStore(blogReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
  );
};

renderApp();
