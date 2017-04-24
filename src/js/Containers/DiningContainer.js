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
import Dining from '../Components/Dining';
//This is the actual component that contains styling to be rendered
import * as API from '../API';

class DiningContainer extends Component {
    render() {
        //React render function to be called everytime there is new props
        var listSource =
            new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        const mappedData = API.convertArrayToMapDining(this.props.dining, this.props.day);
        var dataSource = listSource.cloneWithRowsAndSections(mappedData);
        return (
            <Dining dataSource={dataSource}/>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.diningReducer, ...state.navigationReducer }
}

export default connect(mapStateToProps)(DiningContainer) 

