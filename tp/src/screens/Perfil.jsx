import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import { Link , useNavigation } from "@react-navigation/native";

const Perfil = () => {
    const [perfil,setPerfil] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono,setTelefono] = useState("");
    const [mail, setMail] = useState("");

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>Formulario Perfil</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => setNombreUsuario(text)}
        keyboardType = "default"
        value={nombreUsuario}
        placeholder="Escriba su nombre de usuario aqui"
        />
        <TextInput
        style={styles.input}
        onChangeText={(text) => setApellido(text)}
        keyboardType = "default"
        value={apellido}
        placeholder="Escriba su apellido de usuario aqui"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTelefono(text)}
          keyboardType = "phone-pad"
          placeholder="Escriba su telefono aqui"
          value={telefono}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMail(text)}
          keyboardType = "email-address"
          placeholder="Escriba su mail aqui"
          value={mail}
        />
      </SafeAreaView>
    )
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

export default Perfil;