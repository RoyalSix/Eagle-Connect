import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    TouchableOpacity,
    Modal,
    Image
} from 'react-native';
import style from 'css';
import WebViewContainer from '../Containers/WebViewContainer';
import * as API from '../API';
import { back_button } from 'assets';

export default class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            modalVisible: false,
            article:null
        }
    }
    onPress(url) {
        API.getHTMLFromURL(url, (obj) => {
            var articleView = (
                <WebViewContainer source={{ html: obj }} />
            )
            this.setState({
                modalVisible: true,
                article: articleView
            })
        })
    }
    renderRow(data) {
        return (
            <TouchableOpacity onPress={() => this.onPress(data.url)}
                style={{ paddingVertical: 10, paddingHorizontal: 5, borderRadius: 5 }}>
                <Text style={{ fontSize: 20, color: 'white' }}>{data.title}</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{data.author}</Text>
                <Text style={{ fontSize: 15, color: 'white' }}>{data.description}</Text>
                <Text style={{ fontSize: 12, color: 'white' }}>{data.date}</Text>
            </TouchableOpacity>
        )
    }
    renderHeader() {
        return <Text style={style.chapelHeading}>NEWS</Text>;
    }
    renderSeparator(sectionId, rowId) {
        return <View key={rowId} style={style.chapelSeparator} />;
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal animationType={"slide"} transparent={false} visible={this.state.modalVisible} onRequestClose={() => { }}>
                    <TouchableOpacity onPress={()=>this.setState({modalVisible:false})}
                    style={{flexDirection: 'row', justifyContent:'flex-start', margin:5, alignItems:'center'}}>
                        <Image resizeMode={'contain'} source={back_button} style={{height: 22, width: 22}} />
                        <Text style={{fontSize:17}}>Back</Text>
                    </TouchableOpacity>
                    {this.state.article}
                </Modal>
                <ListView enableEmptySections
                    style={style.chapelContainer}
                    dataSource={this.props.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.renderHeader}
                />
            </View>
        )
    }
}
