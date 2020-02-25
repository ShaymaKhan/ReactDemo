import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import LoginAction from './Component/LoginAction';
import Listing from './Component/Listing'
import Map_com from './Component/Map_com'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

const HomeTab = createBottomTabNavigator(
  {
      Listing: Listing,
      Map1: Map_com
  },
  {
    initialRouteName: 'Listing',
    tabBarPosition: 'bottom'
    }
);
const LoginStack = createSwitchNavigator(
  {
    Login: LoginAction,
    //TandC: TermsAndConditionComponent
  },
  {
    navigationOptions: {
      headerShown: false
    },
  }
);
const AppContainer = createAppContainer (
  createStackNavigator (
    {
      LoginSwitch: LoginStack,
      home: HomeTab
    },
    {
      initialRouteName: 'LoginSwitch',
      mode: 'card'
   }
  )
)
export default function App() {
  return (<LoginAction></LoginAction>)
}
