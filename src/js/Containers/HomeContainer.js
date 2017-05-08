import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import Home from '../Components/Home';
import * as homeActions from '../Actions/homeActions';

class HomeContainer extends Component {
    componentWillMount() {
        if (!this.props.loggedIn) {
            this.props.login();
        }
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
        getFBUsername: () => {
            dispatch(homeActions.getFBUsername());
        },
        login: () =>{
            dispatch(homeActions.loginFB())
        }
     }
}

export default connect(mapStateToProps, mapDispatchToState)(HomeContainer)
