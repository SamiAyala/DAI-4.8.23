import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Link , useNavigation } from "@react-navigation/native";
import { Route } from "@react-navigation/native";
import Button from "../components/Button";

const Home = ( ) => {
    const [perfil1,setPerfil] = useState([]);
    const navigation = useNavigation()
    let nombreUsuario ;
    let apellido ;
    let perfil = {
      nombreUsuario: nombreUsuario,
      apellido: apellido,
    }
    console.log(perfil)
    if (typeof perfil.nombreUsuario === "undefined" && typeof perfil.apellido === "undefined") {
      return (
        <SafeAreaView>
                <Text>Bienvenido!!!</Text>
                <Button  onPress={() => navigation.navigate("Perfil")} text={"Completa tu perfil"}></Button>
        </SafeAreaView>
      
    )
    }
    else{
      return(
      <SafeAreaView>
                <Text>Bienvenido {perfil.nombreUsuario} {perfil.apellido}</Text>
                
        </SafeAreaView>
      )
    }
}


export default Home;