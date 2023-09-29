import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import axios from "axios";
import { Link , useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext } from "react";
import { contextPerfil } from "../../App";

const Perfil = ({route}) => {
    console.log("PERFIL", route.params);
    const idUsuario = route.params.Id;
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono,setTelefono] = useState("");
    const [mail, setMail] = useState("");
    const [fkUsuario , setFkUsuario] = useState(idUsuario);
    const [fechaNacimiento,setFechaNacimiento] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const context = useContext(contextPerfil);
    console.log("idUsuario",idUsuario);
    async function submitForm  (event)  {
      event.preventDefault();
      let Perfil = {
        'NombreUsuario': nombreUsuario,
        'Apellido': apellido,
        'Telefono': telefono,
        'Mail': mail,
        'fkUsuario': fkUsuario,
        'fechaNacimiento':fechaNacimiento
      }
      
      console.log("Perfil",Perfil)
    {
      const res = await axios.post('http://localhost:5000/formPerfil', Perfil)
        .then(res => {
          context.setPerfil(Perfil);
        })
        .catch(e => {
          console.log(e);
        });
        navigation.navigate("Home",{Perfil});
      }
    };
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setFechaNacimiento(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

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
          <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {fechaNacimiento.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={fechaNacimiento}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
        <Button onPress={submitForm} text={"Enviar"}/>
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