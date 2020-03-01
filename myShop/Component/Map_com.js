import React, { Component } from 'react'
import {View, Text, Image,StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MapView, {Polyline, Marker} from 'react-native-maps'
import * as Permission from 'expo-permissions'

export default class Map_com extends Component{
constructor(){
    super();

    this.state={
            latitude: 0,
            longitude: 0,
            image: null
    }}
    componentDidMount(){
        Permission.askAsync(Permission.LOCATION)
navigator.geolocation.watchPosition(this.onSuccess, this.onError)
    }
   
onSuccess=(position)=> {
    this.setState({latitude:position.coords.latitude,longitude: position.coords.longitude})
    }
    
onError = (error) =>{
    console.log(error)
}
render() {
    return (
        <View style={{ flex:1}}>
            {/* <Text style={{alignSelf: 'center', fontSize: 19, margin:10}}>Map View</Text> */}
            <MapView initialRegion={{
                    latitude: 23.0588416,
                    longitude: 72.5225,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                style={{ flex:1 }}
            >
           
                <Marker
                coordinate={{
                    latitude: 23.025836,
                    longitude: 72.503349,
                }}
                title='Solution Analysts'
                identifier='1'></Marker>
                <Polyline
                strokeWidth={5}
                strokeColor='#219199'
                coordinates={
                    [
                        {
                            latitude: 23.0588416,
                            longitude: 72.5225,
                        },
                        {
                            latitude: 23.027712,
                            longitude: 72.502839
                        },
                        {
                            latitude: 23.025836,
                            longitude: 72.503349,
                        }]}></Polyline>
            </MapView>
               </View>
    )
}
}
 