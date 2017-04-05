import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView
} from 'react-native';
import { connect } from 'react-redux'
import ChapelContainer from './ChapelContainer';
import EventContainer from './EventContainer';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import ChapelTab from '../Components/TabBar/ChapelTab';

class NavigationContainer extends Component {
    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
        switch (name) {
            case 'CHAPELS':
                return <ChapelTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
            case 'EVENTS':
                return <ChapelTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;  
                break;
        }
    }
    render() {
        return (
            <ScrollableTabView tabBarPosition={'bottom'} initialPage={0} renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab} />}
                onChangeTab={this.handleChangeTab} tabBarBackgroundColor='black'
                locked={true}>
                <ChapelContainer tabLabel="CHAPELS" {...this.props}/>
                <EventContainer tabLabel="EVENTS" {...this.props}/>
            </ScrollableTabView>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.chapelReducer }
    //return { ...state.eventReducer }
}

export default connect(mapStateToProps)(NavigationContainer)