import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,Image,Alert} from 'react-native';
import db from '../config';

export default class LoginScreen extends React.Component{
    constructor (){
        super();
        this.state = {
            email:"",
            password:"",
        }
    };
    login = async(email,password)=>{
        if (email && password) {
            try{
                const response = await firebase.auth().
                signInWithEmailAndPassword(email,password)
                console.log("response success")
                if(response){
                 console.log("response success")
                  this.props.navigation.navigate('Transaction')
                }
              }
              catch(error){
                switch (error.code) {
                  case 'auth/user-not-found':
                    Alert.alert("user dosen't exists")
                    console.log("doesn't exist")
                    break
                  case 'auth/invalid-email':
                    Alert.alert('incorrect email or password')
                    console.log('invaild')
                    break
                }
              }
    
        }else {console.log("please enter email and password")}
    }
render(){

    return(

        <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20}}>
            <View>
                <Image source = {require("../assets/booklogo.jpg")}
                style = {{width:200,height:200}}>

                </Image>
            </View>
            <View>
            <TextInput style = {styles.loginBox}
            placeholder = "example@example.com"
            keyboardType = "email-address"
            onChangeText = {(text)=>{
                this.setState({
                    email:text
                })
            }}>
            
            </TextInput>
            <TextInput style = {styles.loginBox}
            placeholder = "enter password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({
                    password:text
                })
            }}>
            
            </TextInput>
            </View>
                <View>
                    <TouchableOpacity style = {styles.loginButton} 
                    onPress = {()=>{
                        this.login(this.state.email,this.state.password);
                    }}>
                        <Text style = {{textAlign:"center"}}>
                            log in
                        </Text>
                    </TouchableOpacity>
                </View>
            
        </KeyboardAvoidingView>
    )
}
}

const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,

    },
    loginButton:{
        alignItems:'center',
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        borderRadius:10,
        paddingTop:5,
    }
});