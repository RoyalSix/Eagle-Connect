import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text,
    Keyboard,
    Alert
} from 'react-native';
import *  as boardActions from '../Actions/boardActions';
import Board from '../Components/Board';
import * as API from '../API'
import * as homeActions from '../Actions/homeActions';

class BoardContainer extends Component {
    constructor(props) {
        super(props)
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);

    }
    componentWillMount() {
        this.props.silentLogin();
    }

    getBoardMessageViews(messagesObj) {
        var messageArray = [];
        var index = 0;
        for (var message in messagesObj) {
            var time = API.getTimeFromDateObject(new Date(messagesObj[message].time));
            messageArray.push(
                <View ref={index} key={`${time}_${message}`} style={{ borderColor: 'white', borderBottomWidth: .2, justifyContent: 'center' }}>
                    <Text style={{ marginHorizontal: 5, color: '#E0E0E0', textAlign: 'left', marginTop: 5 }}>{messagesObj[message].username}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text numberOfLines={3} style={{ color: 'grey', marginHorizontal: 5, marginBottom: 5, flex: 1 }}>{messagesObj[message].message}</Text>
                        <Text style={{ fontSize: 12, color: 'grey', margin: 5 }}>{time}</Text>
                    </View>
                </View>
            )
            index++;
        }
        return messageArray;
    }

    checkIfLoggedIn() {
        if (!this.props.loggedIn || !this.props.username) {
            Keyboard.dismiss();
            Alert.alert(
                'Not so fast...',
                'You must sign into Facebook to post on the board.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Login', onPress: () => this.props.login() },
                ],
                { cancelable: false }
            )
        };
    }

    render() {
        const boardMessages = this.getBoardMessageViews(this.props.messages)
        return (
            <View>
                {this.props.boardVisibility ? <Board checkIfLoggedIn={this.checkIfLoggedIn} boardMessages={boardMessages} {...this.props} /> : null}
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.boardReducer, ...state.homeReducer }
}

const mapDispatchToState = (dispatch, ownProps) => {
    return {
        postOnBoard: (message, username) => {
            dispatch(boardActions.postMesssageToBoad(message, username));
        },
        login: () => {
            dispatch(homeActions.loginFB());
        },
        silentLogin: () => {
            dispatch(homeActions.silentLogin());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToState)(BoardContainer)