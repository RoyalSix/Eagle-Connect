import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Home from '../Components/Home';
import * as homeActions from '../Actions/homeActions';

class HomeContainer extends Component {
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.homeReducer
    }
}
export default connect(mapStateToProps)(HomeContainer)
