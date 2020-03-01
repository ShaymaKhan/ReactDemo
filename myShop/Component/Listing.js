import React, {Component,PropTypes} from 'react'
import {View,StyleSheet ,ActivityIndicator,SafeAreaView, Text, FlatList, TouchableWithoutFeedback, RefreshControl, Alert, ImageBackground, ScrollView,Image} from 'react-native'
import LoadingIndicator from '../Component/LoadingIndic'
import { Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";


class Listing extends Component{

    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            dataSource: [],
            isRefreshing: false
        }
    }
    RecipeList = () =>{
      this.setState({isLoading: true})
      const url = "http://35.160.197.175:3006/api/v1/recipe/feeds";
      fetch(url,{
          method: 'GET',
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              'Content-Type': 'application/json',
          },
      }).then(response => {
          if(response.status == 200){
              return response.json();
              
              
          }else{
           
          }
          console.log(response);
      }).then(responseJson => {
          this.setState({
              isLoading: false,
              dataSource: responseJson,
              isRefreshing: false
              
          })
          console.log(responseJson);
      });
  }

    async componentDidMount(){
    console.disableYellowBox = true;
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    return this.RecipeList();
    }

    renderItem = ({ item }) => {
        return (
          <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>
            <View style={styles.cardViewStyle}>
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end"
                }}
                source={this.checkImageURLNull(item.photo)}
                imageStyle={{ borderRadius: 10 }}
              >
                <ImageBackground
                  blurRadius={22}
                  style={styles.blurImage}
                  imageStyle={{
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                  }}
                  source={this.blurTextBackground(item.photo)}
                  
                >
                  <Text style={styles.allText}>Name : {item.name}</Text>
                  <Text style={styles.allText}>
                    Complexity : {item.complexity}
                  </Text>
                  <Text style={styles.allText}>
                    PreparationTime : {item.preparationTime}
                  </Text>
                </ImageBackground>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        );
      };
    
      actionOnRow(item) {
        console.log("Selected Item :", item);
        this.props.navigation.navigate("RecipeDetails", {
          selectItem: JSON.stringify(item)
        });
      }
    
      checkImageURLNull(url) {
        console.log(url);
        if (url == null) {
          return require("../assets/noData.jpg");
        } else {
          return { uri: url };
        }
      }
    
      blurTextBackground(url) {
        if (url == null) {
          return {
            uri:
              "http://35.160.197.175:3006/uploads/346e7d17-515a-4908-b3d0-5b4136a56b7c.jpg"
          };
        } else {
          return { uri: url };
        }
      }
    
      onRefresh() {
        this.setState({ isRefreshing: true }, function() {
          this.Recipe();
        });
      }


render()
{
    if (this.state.isLoading) {
        return (
          <View style={{ position: "absolute",
          width: "100%", 
          height: "110%",
          zIndex: 1}}>
            <ActivityIndicator
              size="large"
              color="cyan"
              style={{ flex: 1 }}
            ></ActivityIndicator>
          </View>
        );
      } 
      else{
    return (
        <Container>
          <Header style={{ alignItems: "center", justifyContent: "center" , }}>
            <Left></Left>
            <Body>
              <Title style={[styles.allText, styles.mainTitle, styles.shadow]}>Recipe List</Title>
            </Body>
            <Right>
              <Icon
                name="ios-add"
                onPress={() => this.props.navigation.navigate("AddRecipe")}
              >
                {" "}
              </Icon>
            </Right>
          </Header>

    <View style={styles.container}>
         <ImageBackground source={require("../assets/login1.jpg")}
            style={{
                height: '100%',
                width: '100%',
               position: 'absolute', 
              }}/>
        <LoadingIndicator isLoading={this.state.isLoading}/>
        <SafeAreaView>
        {/* <Text style={[styles.allText, styles.mainTitle, styles.shadow]}>Recipe List</Text> */}
            <ScrollView>
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(i, k) => k.toString()}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isRefreshing}
                    title="Loading..."
                  />
                }
              />
              </ScrollView>
                </SafeAreaView>
          </View>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black'
    },
    recipeTopView: {
        flex: 0.7
    },
    recipeBottomView:{
        backgroundColor: 'cyan',
        opacity: 0.8,
        flex: 0.3
    },
    recipeCenterView: {
        position: 'absolute',
        width: '100%',
        height: 85,
        backgroundColor: 'black',
        opacity: 0.8
    },
    recipeCell: {
        margin: 5,
        borderRadius: 10,
        height: 300,
       // borderColor: 'cyan',
        borderWidth: 5
    },
    recipeTitle: {
        position: 'absolute',
        margin: 10,
        fontSize: 25,
        fontWeight: '700',
       // backgroundColor: 'white',
    },
    recipeMadeBy: {
        fontSize:18,
        marginLeft: 10,
        marginTop: 5,
        color: 'white',
        alignSelf: 'flex-start',
        fontWeight: '500'
    },
    allText: {
        textAlign: 'center',
        color: 'white',
        shadowColor: 'black'
    },
    recipeImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.9,
    },
    mainTitle: {
        fontSize: 25,
        backgroundColor: 'black',
        fontWeight: '700'
    },
    shadow: {
        shadowOffset:
        { 
            width:0,
            height: 2 
        },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    cardViewStyle: {
      width: "95%",
      height: 250,
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      margin: 10
    },
    blurImage: {
      width: "100%",
      height: 80,
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    
})
const mapStateToProps = state => {
    return { token: state.token };
  };
  export default connect(mapStateToProps)(Listing);

    
//             renderItem= {({item }) => 
//             {
//                 return <View style={[styles.recipeCell,styles.shadow]}>
//                         <TouchableWithoutFeedback style={styles.container}>
//                         <ImageBackground source={this.getImageUrl(item.photo)} style={styles.recipeImage} imageStyle={{borderRadius:10}}>
//                         <View style={styles.recipeBottomView}>
//                         </View>
//                         <View style={styles. recipeCenterView}>
//                             <Text style={[styles.allText, styles.recipeMadeBy]}>Recipe Made By{item.firstName +' '+ item.lastName}</Text>
//                             <Text style={[styles.allText, styles.recipeMadeBy, {fontSize: 15}]}>Serves: {item.Serves}</Text>
//                             <Text style={[styles.allText, styles.recipeMadeBy]}>Complexity level :{item.complexity}</Text>
//                         </View>
//                         <View style={styles.recipeTopView}>
//                             <Text style={[styles.shadow, styles.allText,styles.recipeTitle]}>{item.name}</Text>
//                         </View>
//                         </ImageBackground>
//                         </TouchableWithoutFeedback>
//                         </View>
//             }
//         }
//                keyExtractor={(item) => item.id}>
//     );
// }
// getImageUrl(url){
//     console.log(url);
//     if(url == null){
//         return require('../assets/noData.jpg')
//     } else{
//         return { uri: url}
//     }
    
// }

