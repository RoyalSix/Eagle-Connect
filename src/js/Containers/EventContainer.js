import React, { Component } from 'react';
//These are required for react to work
import { connect } from 'react-redux'
/**
 * This allows us to get acceess to the store from the state we pass 
 * {@see mapStateToProps}
 */
import { ListView } from 'react-native';
//This is the component that we will need to create a List ListView
//type of datasource to feed to the component
//{@link https://facebook.github.io/react-native/docs/listview.html}

//import 'Event' from Components/Event when you create github
import Event from '../Components/Events';
//Not sure if this will work????

//Create container to receive props from reducer 
class EventContainer extends Component {
    render() {

        //React render function to be called everytime there is new props
        var listSource =
            new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2
            });
        var dataSource = listSource.cloneWithRows(this.props.events);
        /*
         * This is going to be the data that will be sent to the child component
         * this.props.chapels is defined in chapelActions and is getting fetched in app container
         * From the action it goes to the reducer by the tyoe name RECIEVE_CHAPEL_LOAD
         * and then merged in the store
         * This is a standard redux flow Action -> Reducer -> Container (this file) -> Component (Chapel.js)
         */
        return (
            <Event dataSource={dataSource}/>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.eventReducer }
    /**
     * This function allows us to take whatever is in the store of our choosing (chapelReducer)
     * And send it the this containers props {@see this.props.chapel in render function}
     * This will take everything from the state in {@see chapelReducer}
     */
}

export default connect(mapStateToProps)(EventContainer)