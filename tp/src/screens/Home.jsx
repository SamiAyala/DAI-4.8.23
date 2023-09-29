import { React, useEffect } from "react";
import {
  Text,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import axios from "axios";
import { useContext } from "react";
import { contextPerfil } from "../../App";

const Home = ({ route }) => {
  const context = useContext(contextPerfil);
  const { Id } = route.params;

  const navigation = useNavigation()

  useEffect(() => {
    async function getdata() {
      const resp = await axios.get(`http://localhost:5000/perfil/${Id}`);
      context.setPerfil(resp.data);
    }
    getdata();
  }, [])

  if (typeof context.perfil.NombreUsuario === "undefined" && typeof context.perfil.Apellido === "undefined") {
    return (
      <SafeAreaView>
        <Text>Bienvenido!!!</Text>
        <Button onPress={() => navigation.navigate("Perfil", { Id })} text={"Completa tu perfil"}></Button>
      </SafeAreaView>

    )
  }
  else {
    return (
      <SafeAreaView>
        <Text>Bienvenido {context.perfil.NombreUsuario}{" "} {context.perfil.Apellido}</Text>
        <Button onPress={() => navigation.navigate("Edit", { Id })} text={"Edita tu perfil"}></Button>

      </SafeAreaView>
    )
  }
}


export default Home;