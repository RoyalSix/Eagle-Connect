import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView,
    TouchableHighlight
} from 'react-native';
const timer = require('react-native-timer');

import { connect } from 'react-redux'
import ChapelContainer from './ChapelContainer';
import DiningContainer from './DiningContainer';
import EventsContainer from './EventsContainer';
import NewsContainer from './NewsContainer';
import HomeContainer from './HomeContainer';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import ChapelTab from '../Components/TabBar/ChapelTab';
import DiningTab from '../Components/TabBar/DiningTab';
import CampusTab from '../Components/TabBar/CampusTab';
import EventsTab from '../Components/TabBar/EventsTab';
import HomeTab from '../Components/TabBar/HomeTab';

import * as navigationActions from '../Actions/navigationActions'

import { home_icon } from 'assets';

class NavigationContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentWillMount() {
        this.props.setTime();
        this.props.setDay();
        timer.setInterval('clockTimer', () => {
            this.props.setTime();
        }, 50000)
    }

    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
        switch (name) {
            case 'CHAPELS':
                return <ChapelTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
            case 'EVENTS':
                return <EventsTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
                break;
            case 'DINING':
                return <DiningTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
                break;
            case 'EVENTS':
                return <CampusTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
                break;
            case 'NEWS':
                return <CampusTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
                break;
            case 'HOME':
                return <HomeTab key={`${name}_${page}`} onPressHandler={onPressHandler} onLayoutHandler={onLayoutHandler} page={page} name={name} />;
                break;
        }
    }

    handleChangeTab(index) {
        this.props.changeTab(index.i);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'black', }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0)' }}>
                    <Text style={{ color: 'grey', fontSize: 17, margin: 10, flex: 1 }}>{this.props.day}</Text>
                    <Text style={{ color: 'grey', fontSize: 17, margin: 10 }}>{this.props.time}</Text>
                </View>
                <ScrollableTabView tabBarPosition={'bottom'} renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab} />}
                    onChangeTab={this.handleChangeTab}
                    tabBarBackgroundColor='black' initialPage={2} locked={false} style={{ flex: 1, marginBottom: -1, backgroundColor: 'black', zIndex: 1 }}
                    tabBarUnderlineStyle={{ backgroundColor: 'red' }}>
                    <ChapelContainer tabLabel="CHAPELS" {...this.props} />
                    <DiningContainer tabLabel="DINING" {...this.props} />
                    <HomeContainer tabLabel="HOME" {...this.props} />
                    <NewsContainer tabLabel="NEWS" {...this.props} />
                    <EventsContainer tabLabel="EVENTS" {...this.props} />
                </ScrollableTabView>
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return { ...state.navigationReducer }
}

const mapDispatchToState = (dispatch, ownProps) => {
    return {
        changeTab: (index) => {
            dispatch(navigationActions.changeTab(index));
        },
        setTime: () => {
            dispatch(navigationActions.setTime());
        },
        setDay: () => {
            dispatch(navigationActions.setDay());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToState)(NavigationContainer)