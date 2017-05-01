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
                <View key={`${time}_${message}`} style={{ borderColor: 'white', borderBottomWidth: .2, justifyContent:'center'  }}>
                    <Text style={{marginHorizontal:5, color:'#E0E0E0', textAlign:'left', marginTop:5}}>{messagesObj[message].username}</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text numberOfLines={3} style={{ color: 'grey', marginHorizontal:5, marginBottom: 5, flex: 1 }}>{messagesObj[message].message}</Text>
                        <Text style={{ fontSize: 12, color: 'grey', margin: 5 }}>{time}</Text>
                    </View>
                </View>
            )
        }
        return messageArray;
    }

    render() {
        const boardMessages = this.getBoardMessageViews(this.props.messages)
        return (
            <Board boardMessages={boardMessages} {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.boardReducer, ...state.homeReducer }
}

const mapDispatchToState = (dispatch, ownProps) => {
    return {
        postOnBoard: (message, username) => {
            dispatch(boardActions.postMesssageToBoad(message, username))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToState)(BoardContainer)