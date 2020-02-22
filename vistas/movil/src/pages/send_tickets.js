import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground,TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from "react-router-native";
import axios from 'axios';

const API = "http://192.168.100.4:5000/film/";



export default class SendTickets extends Component {
  constructor(props) {
      super(props);
      this.state = {
        correo: '',
        sala: '',
        pelicula: '',
        horario: '',
        boletos: ''
      };
  }

  handleCorreo = text => {
    this.setState({ correo: text });
  };

  saveData = () => {
    this.post = {
        datos: {
          correo: this.state.correo,
          sala: this.state.sala,
          pelicula: this.state.pelicula,
          horario: this.state.horario,
          boletos: this.state.boletos
        }
    }

    if (this.post.datos.correo === "" ||
        this.post.datos.sala === "" ||
        this.post.datos.pelicula === "" ||
        this.post.datos.horario === "" ||
        this.post.datos.boletos === ""
        ) {
      alert("Complete todos los datos para continuar...");
    } else {
      axios.post(API+"send_mail", this.post)
      .then(response => {
        if ( response.data.ok === true ) {
          alert("Correo Enviado!")
        }
      })
      .catch(error => {
        alert(error)
      })
    }
  };

  asyncstorageGet = async () => {
    try {
      const idpelicula_titulo = await AsyncStorage.getItem('idpelicula_titulo')
      this.setState({pelicula: idpelicula_titulo})
      const idhorario_hora = await AsyncStorage.getItem('idhorario_hora')
      this.setState({horario: idhorario_hora})
      const idsala_nombre = await AsyncStorage.getItem('idsala_nombre')
      this.setState({sala: idsala_nombre})
      const numero_boletos = await AsyncStorage.getItem('numero_boletos')
      this.setState({boletos: numero_boletos})
    } catch (e) {
      alert(e)
    }
  }

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      alert(e)
    }
  }

  componentDidMount() {
    this.asyncstorageGet();
  }

  render() {
    return(
      <ImageBackground style={ styles.container } source={ require('../../assets/bg.jpg') }>
        <View style={ styles.overlayContainer}>
          <View style={ styles.top }>
            <Text style={ styles.header }>Enviar Boletos</Text>
          </View>

          <Card title="Dirección de Correo Electrónico">
            <TextInput 
              placeholder="user@gmail.com"  
              underlineColorAndroid='transparent'  
              style={styles.TextInputStyle}  
              keyboardType={'default'}
              onChangeText={ this.handleCorreo }
            />
          </Card>

            {/* <TouchableHighlight>
              <Link to="/" style={ styles.button } onPress={ () => this.asyncstorageClear() }>
                <Text>Cartelera</Text>
              </Link>
            </TouchableHighlight> */}

            <TouchableHighlight>
              <Link to="/" style={ styles.button } onPress={ () => this.saveData() }>
                <Text>Enviar Comprobante</Text>
              </Link>
            </TouchableHighlight>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%', 
    height: '100%',
    justifyContent:'center',
    backgroundColor: 'red',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(47,163,218, .4)',
  },
  top: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 28,
    borderColor: 'blue',
    borderRadius: 50,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255, .1)',
    textAlign: 'center'
  },
  button: {
    position: 'relative',
    bottom: '-4%',
    marginBottom: 5,
    borderWidth: 2,
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255, .2)',
    borderColor: '#fff',
  },
})