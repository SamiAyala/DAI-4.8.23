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
import { useContext } from "react";
import { contextPerfil } from "../../App";

const Home = ({route}) => {
  const context = useContext(contextPerfil);
    console.log("route",route)
    const idUsuario = route.params;

    const navigation = useNavigation()

    useEffect(() => {
      async function getdata() {
        const resp = await axios.get(`http://localhost:5000/perfil/${idUsuario.id}`);
        console.log("resp",resp)
        context.setPerfil(resp.data);
      }
      getdata();
    }, [])

    if (typeof context.perfil.NombreUsuario === "undefined" && typeof context.perfil.Apellido === "undefined")
      
   {
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
                <Text>Bienvenido {context.perfil.NombreUsuario}{" "} {context.perfil.Apellido}</Text>
                <Button  onPress={() => navigation.navigate("Edit",{id:idUsuario})} text={"Edita tu perfil"}></Button>
                
        </SafeAreaView>
      )
    }
}


export default Home;