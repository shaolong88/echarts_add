import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '../reducers/index.js';

import App from '../components/app.js';

const store = createStore(Reducer)
export default class RouterIndex extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App path={'/App'} />
                </BrowserRouter>
            </Provider>
        )
    }
}