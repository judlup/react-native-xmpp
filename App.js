import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,  
  TextInput,
  StatusBar,  
  TouchableHighlight,
  Text,
  Alert,
  View,
  ToastAndroid,  
} from 'react-native';

var XMPP = require('react-native-xmpp');  

XMPP.trustHosts(['xmpp.jp']);    
// XMPP.on('error', (message) => console.log('ERROR:' + message));
// XMPP.on('login', (message) => console.log('LOGGED!'));
XMPP.on('connect', () => {
  console.log('CONNECTED!');  
  ToastAndroid.show("Conectado", ToastAndroid.SHORT)
});

XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));

/*XMPP.on('message', (message) =>{
    console.log('MESSAGE:', JSON.parse(JSON.stringify(message)).body)
  }
);*/

export default class App extends Component{    
  constructor(){
    super();
    this.state = {
      usuario : 'juanhx@xmpp.jp',
      contrasena : 'dasa5684',
      mensaje : '',
      destinatario: 'judlup@xmpp.jp',
      mensajes: []
    }

    this.afterwait.bind(this);
    this.connect.bind(this);
    this.send.bind(this);
    this.mensajes.bind(this);
    XMPP.on('message', (message) =>{
        let mensaje = JSON.parse(JSON.stringify(message)).body;
        if(mensaje != null){
          //console.log('MESSAGE:', mensaje);
          this.setState({mensajes:[...this.state.mensajes,{mensaje:mensaje}]});
        }
        //console.log(this.state.mensajes)
      }
    );
  }

  afterwait() {
    //XMPP.message('Hola', 'judlup@xmpp.jp');
    console.log('Carga terminada');
  }

  connect(){
    // usuario => 'juanhx@xmpp.jp'
    // contraseña => 'dasa5684'
    // console.log(this.state.usuario,this.state.contrasena);
    XMPP.connect(this.state.usuario,this.state.contrasena);
    console.log('Waiting...');
    ToastAndroid.show("Conectando...", ToastAndroid.SHORT)
    setTimeout(()=>{this.afterwait()}, 2000);
  }

  send(usuario){
    XMPP.message(this.state.mensaje, usuario); // judlup@xmpp.jp
    this.setState({mensaje:''})
    ToastAndroid.show("Enviado", ToastAndroid.SHORT)
  }

  mensajes(){
    
  }
    
  render(){            
    return(
      <View>
        <Text>
          {this.state.prueba}
        </Text>
        <TextInput
            style={styles.inputstl}
            placeholder="Usuario"
            onChangeText={usuario => this.setState({'usuario':usuario})}
            defaultValue={this.state.usuario}
        />
        
        <TextInput
          style={styles.inputstl}
          secureTextEntry={true}
          placeholder="Contraseña"
          onChangeText={contrasena => this.setState({"contrasena":contrasena})}
          defaultValue={this.state.contrasena}
        />

        <TouchableHighlight underlayColor = {'blue'} onPress={()=>this.connect()} >
          <Text style = {styles.buttonStl}>
            Conectar
          </Text>
        </TouchableHighlight>

        <TextInput
          style={styles.inputstl}
          placeholder="Destinatario"
          onChangeText={destinatario => this.setState({'destinatario':destinatario})}
          defaultValue={this.state.destinatario}
        />

        <TextInput
          style={styles.inputstl}    
          placeholder="Mensaje"
          onChangeText={mensaje => this.setState({'mensaje':mensaje})}
          defaultValue={this.state.mensaje}
        />

        <TouchableHighlight underlayColor = {'green'} onPress={()=>this.send("judlup@xmpp.jp")} >
          <Text style = {styles.buttonStl}>
            Enviar
          </Text>
        </TouchableHighlight>
        
        {this.state.mensajes.map((data, key) => {
          return (
            <Text key={key} >
              {data.mensaje}
            </Text>
          );
        })}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputstl:{
    width:'80%',
    height:35,
    paddingLeft:15,
    borderColor:"#333333",
    borderWidth:1,
    borderRadius:5,
    position: "relative",
    left:"10%",
    marginBottom:5
  },
  buttonStl:{
    width:'80%',
    height:35,
    paddingLeft:15,
    backgroundColor:'#eeeeee',
    borderRadius:5,
    borderColor:"#333333",
    borderWidth:1,
    textAlign:"center",
    fontSize:15, 
    position: "relative",
    left:"10%",
    marginBottom:5,    
  },  
});

