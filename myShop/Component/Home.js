// import React, { Component } from 'react';
// import { Button, AsyncStorage, SafeAreaView, Text, TouchableOpacity,
//      ImageBackground, FlatList, ListItem, Alert, 
//      RefreshControl, StyleSheet, Image } from 'react-native';
// import constants from '../config/Constants';
// import RecipeListItem from './RecipeListItem';
// import { Icon } from 'react-native-elements';
// var globalStyle = require('../style');
// import { connect } from 'react-redux'

// class HomeScreen extends Component {

//     static navigationOptions = ({ navigation }) => {
//         return {
//           title: "Recipe List",
//         }
//       };

//     constructor() {
//         super()
//         this.state = {
//             data: [],
//             showProcess: false
//         }
//     }
//     render() {
//         return (
//             <ImageBackground
//                 source={require('../assets/background.jpg')}
//                 style={{ width: '100%', height: '100%' }}>
//                 <SafeAreaView>
//                     {/* <Text style = {[globalStyle.titleText, {padding: 10}]}>Recipes</Text> */}
//                     <FlatList
//                         style={
//                             { width: '100%', height: '100%' }
//                         }
//                         data={
//                             this.state.data
//                         }
//                         refreshControl={
//                             <RefreshControl
//                                 color = 'white'
//                                 refreshing={this.state.showProcess}
//                                 onRefresh={() => this.getRecipeList()}
//                             />
//                           }
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             //<Text style={globalStyle.subTitleText}>{item.name}</Text>
//                             <TouchableOpacity style={styles.card} onPress={() => { this._navigateToViewRecipe(item) }}>
//                                <RecipeListItem 
//                                      item = {item}
//                                 />
//                             </TouchableOpacity>
//                         )}
//                     />
//                 </SafeAreaView>
//             </ImageBackground>
//         );
//     }

    

//     componentDidMount() {
//         this.getRecipeList(this.props.token);
//     }

//     _navigateToViewRecipe = (item) => {
//         this.props.navigation.navigate('recipeDetailsScreen', {data: item})
//     }

//      async retrieveItem(key) {
//         try {
//           return await AsyncStorage.getItem(key);
//         } catch (error) {
//           console.log(error.message);
//         }
//         return
//       }

//     getRecipeList = (token) => {
//         this.setState({showProcess: true})
//         fetch(constants.recipeListUrl,
//             {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token
//                 }
//             }).then((response) => {
//                 if (response.status == 200) {
//                     return response.json()
//                 } else {

//                 }
//                 this.setState({showProcess: false})
//             }).then((responseJSON) => {
//                 this.setState({ showProcess: false })
//                 this.setState({ data: responseJSON });
//             })
//     }
// }

// const mapStateToProps = (state) => {
//     return { token: state.token }
// }

// export default connect(mapStateToProps)(HomeScreen)

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 20,
//         backgroundColor: "#eeeeee"
//     },
//     tasks: {
//         flex: 1,
//     },

//     cardContent: {
//         marginLeft: 20,
//         marginTop: 10,
//     },

//     image: {
//         width: null,
//         height: 100,
//     },

//     card: {
//         borderRadius: 10,
//         marginVertical: 5,
//         marginHorizontal: 10,
//         backgroundColor: "white",
//         height: 250,
//     },

//     description: {
//         fontSize: 18,
//         flex: 1,
//         color: "#008080",
//         fontWeight: 'bold',
//     },
//     date: {
//         fontSize: 14,
//         flex: 1,
//         color: "#696969",
//         marginTop: 5
//     },
// });  