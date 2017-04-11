import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';
import * as reducers from '../Reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import NavigationContainer from './NavigationContainer';

/**We need these in order to create a store and use async actions */
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

import * as chapelActions from '../Actions/chapelActions';
import * as eventsActions from '../Actions/eventsActions';
import * as dinigActions from '../Actions/diningActions';
import * as newsActions from '../Actions/newsActions';

export default class App extends Component {
    componentWillMount() {
        store.dispatch(chapelActions.startChapelLoad());
        store.dispatch(dinigActions.startDiningLoad());
        store.dispatch(newsActions.startNewsLoad());
        store.dispatch(eventsActions.startEventsLoad());
    }
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer dispatch={store.dispatch} />
            </Provider>
        )
    }
}
