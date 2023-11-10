import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
import Button from "../components/Button";
import { Link, useNavigation } from "@react-navigation/native";
import {doc , setDoc , getFirestore , Toast } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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
const auth = getAuth();


const Register = () => {
  const [mail, setMail] = useState("");
  const [contraseña, setContrasenia] = useState("");
  const [error,setError] = useState("");
  const [mensaje, setMensaje] = useState('Complete los campos:');
  const navigation = useNavigation();

  async function submitRegister(event) {
    event.preventDefault();
    console.log("mail",mail);
    console.log("contraseña",contraseña);
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        mail,
        contraseña
      );
      console.log("user",user);
      const { uid } = user;
      const db = getFirestore();
      await setDoc(doc(db, "usuario", uid), {
        mail,
        contraseña,
        uid,
      });
      setMail("");
      setContrasenia("");
      navigation.navigate("Login");
      
    } catch (error) {
      setError(error.message);
      
    }
  };

  function validateForm() {
    return mail.length > 0 && contraseña.length > 0;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Registrarse</Text>
      <Text>{mensaje}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMail(text)}
        keyboardType="default"
        value={mail}
        placeholder="Escriba su mail aqui"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setContrasenia(text)}
        keyboardType="default"
        placeholder="Escriba su contraseña"
        secureTextEntry={true}
        value={contraseña}
      />
      <Text style={styles.error}>{error}</Text>
      <Button onPress={submitRegister} text={"Registrarse"} disabled={!validateForm()} />
      <Link to={{ screen: "Login" }} style={styles.textoLink}>Iniciar Sesion</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
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
  boton: {
    backgroundColor: "pink",
    borderWidth: 2,
    borderColor: "black",
    width: 200,
    padding: 5,
  },
  container: {
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "40%",
    width: 'auto',
    height: "auto",
    padding: '200',
  },
  titulo: {
    fontSize: 40,
  },
  textoLink: {
    color: "red",
    fontSize: 30,
  },
  textoBoton: {
    fontFamily: " cursive",
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
});

export default Register;