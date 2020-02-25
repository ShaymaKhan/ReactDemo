import React from 'react';
import {View, StyleSheet, Text, Easing,TextInput, Animated,TouchableOpacity, Alert,ImageBackground,Keyboard,ActivityIndicator} from 'react-native'
import Listing from '../Component/Listing'
import LoadingIndicator from '../Component/LoadingIndic'
import {setToken,setProfilePic} from '../actions/userActions'


export default class LoginAction extends React.Component
{
    constructor()
    {
        super()
        this.state={isLoading: false ,email: 'jm1@example.com', password:'jay@123',isLoading: false,accessToken:null}

    }
    
    render()
    {
        if(this.state.accessToken == null){
        return <View style={styles.container}>
            <ImageBackground source={require("../assets/login1.jpg")}
            style={{
                height: '100%',
                width: '100%',
               position: 'absolute', 
              }}>
            </ImageBackground>
            <View style={styles.topView}>
                <Text style={styles.loginTitle}>Login </Text>
            </View>
            <LoadingIndicator isLoading={this.state.isLoading}></LoadingIndicator>
       
       <View style={styles.middleView}>     
            <TextInput
            keyboardType='email-address'
            placeholder='Enter Email'
            style={[styles.txtBoxes,styles.txtEmail]}
            value={this.email}
            onChangeText={(email) => this.setState({email})}
            ></TextInput>

            <TextInput
            secureTextEntry={true}
            placeholder='Enter Password'
            style={styles.txtBoxes}
            value={this.password}
            onChangeText={(password) => this.setState({password})}
            ></TextInput>
            

            <TouchableOpacity style={styles.btn_login} onPress={this.onLogin} >
                <Text style={styles.btn_login_text}>Login</Text>      
            </TouchableOpacity>
            </View>
        <View style={styles.bottomView}>
        </View>
        </View>
        }else{
            return <View style={[styles.listContainer,styles.shadow]}>
                <Listing token={this.state.accessToken}></Listing>
            </View>
        }
    }
    onLogin = () =>{
        Keyboard.dismiss()
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(this.state.email == '')
        {
            Alert.alert('React Native', 'Please Enter Email',[{
                text: 'Close',
                style: 'cancel'
            }])
        }
        else if(this.state.password == '')
        {
            Alert.alert('React Native', 'Please Enter Password',[{
                text: 'Close',
                style: 'cancel'
            }])
        }
        else if(reg.test(this.state.email) == false)
        {
            Alert.alert('React Native', 'Please Enter Valid Email',[{
                text: 'Close',
                style: 'cancel'
            }])
        }
        else{
        this.setState({isLoading: true})
        fetch('http://35.160.197.175:3006/api/v1/user/login',
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        }).then((response) => {
            if(response.status == 200){
                return response.json()
            } else if(response.status == 400){
                Alert.alert('React Native','Invalid Credential!!',[{
                    text:'Close',
                    style: 'cancel'
                }])
                return
            } else{
                Alert.alert('React Native','Login Fail!!',[{
                    text:'Close',
                    style: 'cancel'
                }])
            }
            this.setState({isLoading: false})
        }).then((responseJSON) => {
            console.log(responseJSON);
            if (responseJSON != null) {
                this.setState({accessToken: responseJSON.token})
                Alert.alert('React Native','Login Successfully!!',[{
                    text:'Close',
                    style: 'cancel'
                }]
                )
            }
        }).catch((error) => {
            this.setState({isLoading: false})
            console.log('===========');
            console.log(error);
            console.log('=======');
            
            
            
        })
    }
}

}

const styles = StyleSheet.create({
    listContainer:{
        flex:1
    },
    loginTitle:{
        fontSize:30,
        fontWeight:'bold',
        top: 30,
        fontFamily:'Times New Roman'
    },
    txtEmail:{
        bottom: 10,
    },
    txtBoxes:{
        borderWidth:2,
        width:'80%',
        height:40,
        paddingStart:10,
        fontFamily:'Times New Roman',
        color:'black'
    },
    btn_login:{
        top:30,
        backgroundColor: 'black',
        width: '80%',
        height: 40,
        alignItems:'center',
        justifyContent:'center'
    },
    btn_login_text:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Times New Roman'
    },
    container:{
        flex: 1
    },
    topView:{
        justifyContent:'center',
        alignItems:'center',
        flex: 0.2,
    },
    middleView:{
        flex:0.4,
        justifyContent:'center',
        alignItems:'center'
        
    },
    bottomView:{
        flex:0.4,
    },

    shadow: {
        shadowOffset: { width: 0.5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    }

})
