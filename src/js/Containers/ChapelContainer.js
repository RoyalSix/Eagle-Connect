/**
 * @file This is the container for the actual component
 * This file should handle the business logic of the component
 * There should be no styling/css properties in this file
 * In this way we can have a separation of concerns handle
 * will allow for easier testing
 * {@link https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0}
 */

import React, { Component } from 'react';
//These are required for react to work
import { connect } from 'react-redux'
/**
 * This allows us to get access to the store from the state we pass 
 * {@see mapStateToProps}
 */
import { ListView } from 'react-native';
//This is the component that we will need to create a List ListView
//type of datasource to feed to the component
//{@link https://facebook.github.io/react-native/docs/listview.html}
import Chapel from '../Components/Chapel';
//This is the actual component that contains styling to be rendered

class ChapelContainer extends Component {
    render() {
        //React render function to be called everytime there is new props
        var listSource =
            new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        var dataSource = listSource.cloneWithRows(this.props.chapels);
        /*
         * This is going to be the data that will be sent to the child component
         * this.props.chapels is defined in chapelActions and is getting fetched in app container
         * From the action it goes to the reducer by the tyoe name RECIEVE_CHAPEL_LOAD
         * and then merged in the store
         * This is a standard redux flow Action -> Reducer -> Container (this file) -> Component (Chapel.js)
         */
        return (
            <Chapel dataSource={dataSource}/>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.chapelReducer }
    /**
     * This function allows us to take whatever is in the store of our choosing (chapelReducer)
     * And send it the this containers props {@see this.props.chapel in render function}
     * This will take everything from the state in {@see chapelReducer}
     */
}

export default connect(mapStateToProps)(ChapelContainer)