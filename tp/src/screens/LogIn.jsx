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

const LogIn =()=> {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("hola");

  async function submitLogIn() {
    console.log(nombre, contraseña);
    if (nombre !== "" && contraseña !== "") {
      try {
        const res = await axios.post("http://localhost:5000/login", {
          nombre,
          contrasenia: contraseña,
        });
        console.log("res: ",res.data);
        setMensaje("Muy bien");
        
      } catch (e) {
        setMensaje("muy mal.");
      }
    } else{
      setMensaje("Vacios");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>INICIO DE SESION</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNombre(text)}
        placeholder="Escriba su nombre aqui"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setContrasena(text)}
        placeholder="Escriba su contraseña"
      />
      <Button onPress={submitLogIn} text={"Iniciar Sesión"} />
      <Link to={{screen: "Register"}} style ={styles.textoLink}>Registrarse</Link>
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
  titulo:{
  fontSize : 40,
  },
  boton:{
    backgroundColor:"pink",
    borderWidth:2,
    borderColor: "black",
    width: "auto", 
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

export default LogIn;