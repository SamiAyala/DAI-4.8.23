import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
import Button from "../components/Button";

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
        setMensaje(res.data);
        
      } catch (e) {
        setMensaje("muy mal.");
      }
    } else{
      setMensaje("Vacios");
    }
  }

  return (
    <SafeAreaView>
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
      <Text>{mensaje}</Text>
      <Button onPress={submitLogIn} text={"Iniciar Sesión"}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width:200,  
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
  textoBoton: {
    fontFamily: " cursive",
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
});

export default LogIn;