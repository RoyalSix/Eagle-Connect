import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';

import { write_message } from 'assets';

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageValue: null
        }
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>Board</Text>
                <View style={{ borderColor: 'white', borderWidth: 1, height: 300, marginVertical: 10, marginHorizontal: 20 }}>
                    <ScrollView>
                        {this.props.boardMessages}
                    </ScrollView>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ borderColor: 'black', flex: 1, height: 30, borderWidth: 1, margin: 2 }}>
                            <TextInput onSubmitEditing={()=>{
                            this.props.postOnBoard(this.state.messageValue, this.props.username)
                            this.setState({messageValue:null})
                            }} returnKeyType={'send'} blurOnSubmit={true} value={this.state.messageValue} onChangeText={(textInput)=>this.setState({messageValue:textInput})} style={{ marginLeft: 2, flex: 1, marginRight: 5 }} />
                        </View>
                        <TouchableOpacity onPress={()=>{
                            this.props.postOnBoard(this.state.messageValue, this.props.username)
                            this.setState({messageValue:null})
                        }}>
                            <Image source={write_message} style={{ height: 30, width: 30, }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}