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
    const idUsuario = route.params;
    const navigation = useNavigation()

    const [perfil, setPerfil] = useState({});

    useEffect(() => {
      const resp = axios.get("http://localhost:5000/perfil/:Id", {idusuario: idUsuario});
      console.log(resp);
      setPerfil(resp);
    }, [])

    let nombreUsuario ;
    let apellido ;
    let perfilVacio = {
      nombreUsuario: nombreUsuario,
      apellido: apellido,
    }
    if (typeof perfilVacio.nombreUsuario === "undefined" && typeof perfilVacio.apellido === "undefined") {
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