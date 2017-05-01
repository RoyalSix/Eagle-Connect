import { connect } from 'react-redux'
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import *  as boardActions from '../Actions/boardActions';
import Board from '../Components/Board';
import * as API from '../API'

class BoardContainer extends Component {
    getBoardMessageViews(messagesObj) {
        var messageArray = [];
        for (var message in messagesObj) {
            var time = API.getTimeFromDateObject(new Date(messagesObj[message].time));
            messageArray.push(
                <View key={`${time}_${message}`} style={{ flexDirection:'row', height: 30, borderColor: 'white', borderBottomWidth: .2, flex: 1, justifyContent: 'flex-start' }}>
                    <Text style={{ color: 'grey', margin: 5, flex:1 }}>{messagesObj[message].message}</Text>
                    <Text style={{ fontSize: 12, color: 'grey', margin: 5 }}>{time}</Text>
                </View>
            )
        }
        return messageArray
    }
    render() {
        const boardMessages = this.getBoardMessageViews(this.props.messages)
        return (
            <Board boardMessages={boardMessages} {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.boardReducer }
}

const mapDispatchToState = (dispatch, ownProps) => {
    return {
        postOnBoard: (message) => {
            dispatch(boardActions.postMesssageToBoad(message))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToState)(BoardContainer)