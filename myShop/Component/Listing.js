import React, {Component} from 'react'
import {View,StyleSheet ,SafeAreaView, Text, FlatList, TouchableWithoutFeedback, RefreshControl, Alert, ImageBackground, ScrollView} from 'react-native'
import LoadingIndicator from '../Component/LoadingIndic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export default class Listing extends Component{
    static navigationOptions = ({ navigation })=>{
        return{
            title: 'JM\'s Recipes',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#f7495a'
              },
            headerLeft: () => <Button 
            title="Drawer" backgroundColor= 'white' color='white'
            onPress={() => navigation.pop()}
        />
        } 
    }
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            recioeLiating: []
        }
    }

    componentDidMount(){
        this.getRecipes();
    }

render()
{
    return (
    <View style={styles.container}>
         <ImageBackground source={require("../assets/login1.jpg")}
            style={{
                height: '100%',
                width: '100%',
               position: 'absolute', 
              }}/>
        <LoadingIndicator isLoading={this.state.isLoading}/>
        <SafeAreaView>
        <Text style={[styles.allText, styles.mainTitle, styles.shadow]}>Recipe List</Text>
            <ScrollView>
                  <FlatList 
            refreshControl=
            {
                <RefreshControl></RefreshControl>
            }
            data={this.state.itemList}
            renderItem=
            {({ item }) => 
            {
                return <View style={[styles.recipeCell,styles.shadow]}>
                        <TouchableWithoutFeedback style={styles.container}>
                        <ImageBackground source={this.getImageUrl(item.photo)} style={styles.recipeImage} imageStyle={{borderRadius:10}}>
                        <View style={styles.recipeBottomView}>
                        </View>
                        <View style={styles. recipeCenterView}>
                            <Text style={[styles.allText, styles.recipeMadeBy]}>Recipe Made By{item.firstName +' '+ item.lastName}</Text>
                            <Text style={[styles.allText, styles.recipeMadeBy, {fontSize: 15}]}>Serves: {item.Serves}</Text>
                            <Text style={[styles.allText, styles.recipeMadeBy]}>Complexity level :{item.complexity}</Text>
                        </View>
                        <View style={styles.recipeTopView}>
                            <Text style={[styles.shadow, styles.allText,styles.recipeTitle]}>{item.name}</Text>
                        </View>
                        </ImageBackground>
                        </TouchableWithoutFeedback>
                        </View>
            }
        }
               keyExtractor={(item) => item.id}>
                   </FlatList>
               </ScrollView>
        </SafeAreaView>
    </View>
    );
}
getImageUrl(url){
    console.log(url);
    if(url == null){
        return require('../assets/noData.jpg')
    } else{
        return { uri: url}
    }
    
}
getRecipes = async() =>{
    console.log(this.props.token);
    this.setState({isLoading: true})
    fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list',{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.props.token,
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if(response.status == 200){
            return response.json();
        }else{
            return null
        }
    }).then(response => {
        this.setState({
            isLoading: false,
            itemList: response
        })
    });
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
        // flexDirection: 'column-reverse',
    },
    mainTitle: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 15,
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
    }
})