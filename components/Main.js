import React, { Component } from "react";
import { View, Text  } from 'react-native'

import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../redux/actions/index";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export class Main extends Component{
    componentDidMount(){
      this.props.fetchUser();
      this.props.fetchUserPosts();
    }
    render(){
        return(
            <View style= {{flex:1, justifyContent: 'center'}}>
            <Text>User is logged in</Text>
            </View>
        )
    }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch)

export default connect(null, mapDispatchProps)(Main);