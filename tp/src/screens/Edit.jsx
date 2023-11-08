import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext } from "react";
import { contextPerfil } from "../../App";
import { initializeApp } from "firebase/app";
import { addDoc, doc, getFirestore, updateDoc,setDoc, collection, getDoc} from "firebase/firestore";

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

const Edit = () => {
  const context = useContext(contextPerfil);
  const [nombreUsuario, setNombreUsuario] = useState(context.perfil.NombreUsuario);
  const [apellido, setApellido] = useState(context.perfil.Apellido);
  const [telefono, setTelefono] = useState(context.perfil.Telefono);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  console.log("context",context)

  async function submitForm(event) {
    event.preventDefault();
    let PerfilAux = {
      Id: context.perfil.Id,
      'NombreUsuario': nombreUsuario,
      'Apellido': apellido,
      'Telefono': telefono,
      'fechaNacimiento': fechaNacimiento
    }
    const docRef = doc(collection(db, "usuario" ),context.perfil.uid );
    console.log("docRef",docRef)
    await setDoc(docRef, {
      NombreUsuario: nombreUsuario,
      Apellido: apellido,
      Telefono: telefono,
      fechaNacimiento: fechaNacimiento
    },{ merge: true });
    context.setPerfil(PerfilAux);
    setNombreUsuario("")
    setApellido("")
    setTelefono("")
    setFechaNacimiento("")
    navigation.navigate("Home");
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
        keyboardType="default"
        value={nombreUsuario}
        placeholder={context.perfil.NombreUsuario}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setApellido(text)}
        keyboardType="default"
        value={apellido}
        placeholder={context.perfil.Apellido}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTelefono(text)}
        keyboardType="phone-pad"
        placeholder={context.perfil.Telefono}
        value={telefono}
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
      <Button onPress={submitForm} text={"Enviar"} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    textDecorationLine: 'Underline'
  },
  textoBoton: {
    fontFamily: " cursive",
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
});

export default Edit;