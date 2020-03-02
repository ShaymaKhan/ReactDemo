import React from 'react';
import LoginAction from './Component/LoginAction';
import Listing from './Component/Listing'
import Map_com from './Component/Map_com'
import AddRecipe from './Component/AddRecipe';
import RecipeDetails from './Component/RecipeDetails'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator , TransitionPresets} from 'react-navigation-stack';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabBarStack = createBottomTabNavigator(
  {
    Listing: {
      screen: Listing,
      navigationOptions: {
        title: 'Listing'
      }
     
    },
    Map_com: {
      screen: Map_com,
      navigationOptions: {
        title: 'Map'
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgba(0,182,524,1)',
    }, 
    navigationOptions:{
      headerShown: false
    }
  }
)

const allNavigation = createStackNavigator({
  TabBarStack,
  RecipeDetails: { screen: RecipeDetails , navigationOptions:{ ...TransitionPresets.SlideFromRightIOS}},
  AddRecipe: { screen: AddRecipe , navigationOptions: { headerShown: false }}
});

const navigate = createSwitchNavigator({
  Login: {
    screen: LoginAction,
    navigationOptions: { headerShown: false }
  },
  allNavigation
});
const AppContainer = createAppContainer(navigate);
const initialState = {
  token: ''
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Token':
    return {token : action.token};
  default:
    return {token : action.token};

  }
}
const store = createStore(reducer)

export default function App() {
  return (<Provider store={store}>
    <AppContainer />
  </Provider>)
}
