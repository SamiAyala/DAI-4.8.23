import { React, useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import axios from "axios";
import { useContext } from "react";
import { contextPerfil } from "../../App";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7R-klcw1FAQUflOXdt9GbDIyaxfeAS7M",
  authDomain: "practica-d8353.firebaseapp.com",
  projectId: "practica-d8353",
  storageBucket: "practica-d8353.appspot.com",
  messagingSenderId: "102767442188",
  appId: "1:102767442188:web:9bb9c13dd986ddeeebb129",
  measurementId: "G-YY98MVBJRB",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = async ({ route }) => {
  const context = useContext(contextPerfil);
  const navigation = useNavigation();
  console.log(route);
  const id = route.params.Id;
  console.log("home id", id);
  const docRef = doc(db, "usuario", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  if (
    typeof context.perfil.NombreUsuario === "undefined" &&
    typeof context.perfil.Apellido === "undefined"
  ) {
    return (
      <SafeAreaView>
        <Text>Bienvenido!!!</Text>
        <Button
          onPress={() => navigation.navigate("Perfil")}
          text={"Completa tu perfil"}
        ></Button>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Text>
          Bienvenido {context.perfil.NombreUsuario} {context.perfil.Apellido}
        </Text>
        <Button
          onPress={() => navigation.navigate("Edit")}
          text={"Edita tu perfil"}
        ></Button>
      </SafeAreaView>
    );
  }
};

export default Home;
