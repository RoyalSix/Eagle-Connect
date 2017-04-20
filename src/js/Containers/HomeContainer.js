import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Home from '../Components/Home';

class HomeContainer extends Component {
    render() {
        return (
            <Home {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.homeReducer
    }
}

const mapDispatchToState = (dispatch, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToState)(HomeContainer)
