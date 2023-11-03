import { React, useEffect, useState } from "react";
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
  measurementId: "G-YY98MVBJRB"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = ({ route }) => {
  const [docSnap, setDocSnap] = useState({});
  const [loading, setLoading] = useState(true);
  const context = useContext(contextPerfil);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const id = route.params.Id;
    console.log("home id", id);
    const docRef = doc(db, "usuario", id);
    const fetchData = async () => {
      console.log("entre");
      let r = await getDoc(docRef);
      console.log("r", r.data());
      setDocSnap(r.data());
      context.setPerfil(r.data());
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("DOCSNAP", docSnap);
  }, [docSnap])

  /* if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
*/
  return loading ? (
    <>cargando</>
  ) : typeof context.perfil.NombreUsuario === "undefined" &&
    typeof context.perfil.Apellido === "undefined" ? (
    <SafeAreaView>
      <Text>Bienvenido {context.perfil.nombre}!!!</Text>
      <Button
        onPress={() => navigation.navigate("Perfil")}
        text={"Completa tu perfil"}
      ></Button>
    </SafeAreaView>
  ) : (
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
  return (<></>);
};

export default Home;
