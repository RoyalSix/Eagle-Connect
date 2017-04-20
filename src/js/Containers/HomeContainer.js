import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import * as homeActions from '../Actions/homeActions';
import Home from '../Components/Home';

class HomeContainer extends Component {
    componentWillMount() {
        this.props.setTime();
        window.setTimeout(() => {
            this.props.setTime();
        }, 60000)
    }
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

const mapDispatchToState = (dispatch, ownProps) => {
    return {
        setTime: () => {
            dispatch(homeActions.setTime());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToState)(HomeContainer)
