import React, { Component } from 'react'
import {View, ImageBackground} from 'react-native'


export default class RecipeDetails extends Component{
    state = {
        isLoadin: true,
        imgUri: undefined,
        isUploading: false
    }
    
    render(){
        return <View style={{flex:1}}>
            <ImageBackground style={{width:'100%', height: 300, flexDirection: 'row'}}
            source={this.state.imgUri != undefined}>
            </ImageBackground>
        </View>
    }
}