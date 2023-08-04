import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import axios from "axios";

export default function App() {
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
        setMensaje("Muy Bien!");
        console.log(res);
      } catch (e) {
        setMensaje("Muy Mal");
      }
    } else{
      setMensaje("Vacios");
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.texto}>LogIn</Text>
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
      <Button title="Press me" onPress={submitLogIn}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  texto: {
    fontSize: 25,
    marginBottom: 10,
    color: "black",
  },
});
