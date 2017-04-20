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

import navigationActions from '../Actions/navigationActions'

const home_icon = require('assets').home_icon;

class NavigationContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChangeTab = this.handleChangeTab.bind(this);
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
        //this.props.changeTab(index.i);
    }

    render() {
        return (
                <ScrollableTabView  tabBarPosition={'bottom'} renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab} />}
                    tabBarBackgroundColor='black' initialPage={2} locked={false} style={{ marginBottom: -1, backgroundColor:'black' }}
                    tabBarUnderlineStyle={{backgroundColor:'red'}}
                    >
                    <ChapelContainer tabLabel="CHAPELS" {...this.props} />
                    <DiningContainer tabLabel="DINING" {...this.props} />
                    <HomeContainer tabLabel="HOME" {...this.props} />
                    <NewsContainer tabLabel="NEWS" {...this.props} />
                    <EventsContainer tabLabel="EVENTS" {...this.props} />
                </ScrollableTabView>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToState = (dispatch, ownProps) => {
    return {
        changeTab: (index) => {
            dispatch(navigationActions.changeTab(index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToState)(NavigationContainer)