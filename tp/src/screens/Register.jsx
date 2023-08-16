import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import axios from "axios";
import Button from "../components/Button";


const Register =()=> {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContrasenia] = useState("");
    const [telefono,setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const [mensaje, setMensaje] = useState("hola");
  
    async function submitRegister  (event)  {
        event.preventDefault();
        let usuario = {
          nombre: nombre,
          contrasenia: contraseña,
          telefono: telefono,
          mail: mail,
        }
        console.log(usuario)
        const res = await axios.post('http://localhost:5000/registro', usuario)
          .then(res => {
            setMensaje("Muy bien");
          })
          .catch(e => {
            setMensaje("Muy mal");
            console.log(e);
          });
      };

      function validateForm() {
        return mail.length > 0 && contraseña.length > 0;
      }
  
    return (
      <SafeAreaView>
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
        <Text>{mensaje}</Text>
        <Button onPress={submitRegister} text={"Registrarse"} disabled={!validateForm()}/>
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
  
  export default Register;