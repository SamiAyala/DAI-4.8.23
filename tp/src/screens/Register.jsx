import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
import Button from "../components/Button";
import { Link } from "@react-navigation/native";


const Register =()=> {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContrasenia] = useState("");
    const [mensaje, setMensaje] = useState("hola");
  
    async function submitRegister  (event)  {
        event.preventDefault();
        let usuario = {
          nombre: nombre,
          contrasenia: contraseña,
        }
        console.log(usuario)
        if (nombre !== "" && contraseña !== "" ){
        const res = await axios.post('http://localhost:5000/registro', usuario)
          .then(res => {
            setMensaje("Muy bien");
          })
          .catch(e => {
            setMensaje("Muy mal");
            console.log(e);
          });
        }
        else{
          setMensaje("Vacios");
        }
      };

      function validateForm() {
        return nombre.length > 0 && contraseña.length > 0;
      }
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Registrarse</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNombre(text)}
          keyboardType = "default"
          value={nombre}
          placeholder="Escriba su nombre aqui"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setContrasenia(text)}
          keyboardType = "default"
          placeholder="Escriba su contraseña"
          secureTextEntry={true}
          value={contraseña}
        />
        <Button onPress={submitRegister} text={"Registrarse"} disabled={!validateForm()}/>
        <Link to={{screen : "Login"}} style={styles.textoLink}>Iniciar Sesion</Link>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      width:250,  
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    boton:{
      backgroundColor:"pink",
      borderWidth:2,
      borderColor: "black",
      width: 200, 
      padding: 5,
    },
    container:{
     textAlign: "center",
     justifyContent : "center",
     marginLeft: "40%",
     width: 'auto',
     height: "auto",
     padding:'200',
    },
    titulo:{
    fontSize : 40,
    },
    textoLink:{
      color : "red",
      fontSize: 30,
      textDecorationLine: 'Underline'
    },
    textoBoton: {
      fontFamily: " cursive",
      fontSize: 20,
      marginBottom: 10,
      color: "black",
    },
  });
  
  export default Register;