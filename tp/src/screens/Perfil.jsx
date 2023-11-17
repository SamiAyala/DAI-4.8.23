import { React, useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, TextInput } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useContext } from "react";
import { contextPerfil } from "../../App";
import { addDoc, doc, getFirestore, updateDoc,setDoc,  collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
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


const Perfil = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const context = useContext(contextPerfil);

  useEffect(() => {
    console.log("context recien entro", context.perfil)
  })


  async function submitForm(event) {
    event.preventDefault();
    let PerfilAux = {
      NombreUsuario: nombreUsuario,
      Apellido: apellido,
      Telefono: telefono,
      fechaNacimiento: fechaNacimiento,
      uid:context.perfil.uid
    };
    console.log("Perfil context", context.perfil)
    console.log("Perfil", Perfil);
    /*const docRef = await addDoc(collection(db, "usuario"), {
      NombreUsuario: nombreUsuario,
      Apellido: apellido,
      Telefono: telefono,
      Mail: mail,
      fechaNacimiento: fechaNacimiento
    });*/
    const docRef = doc(collection(db, "usuario" ),context.perfil.uid );
    console.log("docRef",docRef)
    await setDoc(docRef, {
      NombreUsuario: nombreUsuario,
      Apellido: apellido,
      Telefono: telefono,
      fechaNacimiento: fechaNacimiento,
      uid:context.perfil.uid
    },{ merge: true });
    context.setPerfil(PerfilAux);
    console.log("perfil yo",context.perfil)
    setNombreUsuario("")
    setApellido("")
    setTelefono("")
    setFechaNacimiento("")
    navigation.navigate("Home");
    
  }
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
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Formulario Perfil</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNombreUsuario(text)}
        keyboardType="default"
        value={nombreUsuario}
        placeholder="Escriba su nombre de usuario aqui"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setApellido(text)}
        keyboardType="default"
        value={apellido}
        placeholder="Escriba su apellido de usuario aqui"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTelefono(text)}
        keyboardType="phone-pad"
        placeholder="Escriba su telefono aqui"
        value={telefono}
      />
      <Button onPress={showDatepicker} title="Show date picker!" style={{marginBottom:'3%'}}/>
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
      <Button onPress={submitForm}>Enviar</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    textAlign: "center",
    justifyContent: "center",
    alignItems:'center',
    width: "auto",
    height: "auto",
  },
  titulo: {
    fontSize: 40,
  }
});

export default Perfil;
