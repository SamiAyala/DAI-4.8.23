import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
//import Button from "../components/Button";
import { Link, useNavigation } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Button } from '@rneui/themed';


const firebaseConfig = {
  apiKey: "AIzaSyC7R-klcw1FAQUflOXdt9GbDIyaxfeAS7M",
  authDomain: "practica-d8353.firebaseapp.com",
  projectId: "practica-d8353",
  storageBucket: "practica-d8353.appspot.com",
  messagingSenderId: "102767442188",
  appId: "1:102767442188:web:9bb9c13dd986ddeeebb129",
  measurementId: "G-YY98MVBJRB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LogIn = () => {
  const [mail, setMail] = useState("");
  const [contraseña, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState('Complete los campos:');
  const [error,setError] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  async function submitLogIn() {

    signInWithEmailAndPassword(auth, mail, contraseña)
      .then((userCredential) => {
        // Signed in
        console.log("userCredential",userCredential.user);
        const user = userCredential.user;
        navigation.navigate("Home", { Id: user.uid });
        // ...
      })
      .catch((error) => {
        console.log("error",error.message)
        setError(error.message)
        const errorMessage = error.message;
      });

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Inicio de Sesión</Text>
      <Text >{mensaje}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMail(text)}
        placeholder="Escriba su mail aqui"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setContrasena(text)}
        placeholder="Escriba su contraseña"
        secureTextEntry={true}
      />
      <Text style={styles.error}>{error}</Text>
      <Button onPress={submitLogIn}>Iniciar Sesión</Button>
      <Link to={{ screen: "Register" }} style={styles.textoLink}>Registrarse</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error:{
    color:'red',
    fontSize:20
  },
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titulo: {
    fontSize: 40,
  },
  boton: {
    backgroundColor: "pink",
    borderWidth: 2,
    borderColor: "black",
    alignItems:'center',
    width: "auto",
    padding: 5,
  },
  container: {
    textAlign: "center",
    justifyContent: "center",
    alignItems:'center',
    width: 'auto',
    height: "auto",

  },
  textoLink: {
    color: "blue",
    fontSize: 20,
  },
  textoBoton: {
    fontFamily: " cursive",
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
});

export default LogIn;