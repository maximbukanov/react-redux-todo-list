import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '~/reducers';
import App from '~/components/app';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDom.render(<Provider store={store}><App /></Provider>, document.querySelector('#app'));