import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Link , useNavigation } from "@react-navigation/native";
import { Route } from "@react-navigation/native";
import Button from "../components/Button";
import axios from "axios";

const Home = ({route}) => {
  console.log("route",route)
    const idUsuario = route.params;
    const PerfilCompleto = route.params;
    const navigation = useNavigation()

    const [perfil, setPerfil] = useState(PerfilCompleto);

    useEffect(() => {
      const resp = axios.get("http://localhost:5000/perfil/:Id", {idusuario: idUsuario.id});
      console.log("idUsuario",idUsuario.id)
      console.log("resp",resp);
      setPerfil(resp);
    }, [])

    if (typeof PerfilCompleto.nombreUsuario === "undefined" && typeof PerfilCompleto.Apellido === "undefined") {
      return (
        <SafeAreaView>
                <Text>Bienvenido!!!</Text>
                <Button  onPress={() => navigation.navigate("Perfil",{id:idUsuario})} text={"Completa tu perfil"}></Button>
        </SafeAreaView>
      
    )
    }
    else{
      return(
      <SafeAreaView>
                <Text>Bienvenido {perfil.nombreUsuario} {perfil.apellido}</Text>
                <Button  onPress={() => navigation.navigate("Perfil",{id:idUsuario})} text={"Edita tu perfil"}></Button>
                
        </SafeAreaView>
      )
    }
}


export default Home;