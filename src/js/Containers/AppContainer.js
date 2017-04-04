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

//Import the action you created to start the load 
import * as eventActions from '../Actions/eventActions';


export default class App extends Component {
    componentWillMount() {
        store.dispatch(chapelActions.startChapelLoad());

        //Call the action you created to start the load
        store.dispatch(eventActions.startEventLoad());
    }
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer dispatch={store.dispatch} />
            </Provider>
        )
    }
}