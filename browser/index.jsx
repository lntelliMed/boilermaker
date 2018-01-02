import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

// ReactDOM.render(
//   <div>
//     Hello, World!
//   </div>,
//   document.getElementById('app')
// );




ReactDOM.render(
  <Provider store={store}>
    {/* rest of your app goes here! */}
  </Provider>,
  document.getElementById('app')
);
