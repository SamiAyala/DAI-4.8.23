import { React, useState } from "react";
import LogIn from "./src/screens/LogIn.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/screens/Register.jsx"
import Home from "./src/screens/Home.jsx"
import Perfil from "./src/screens/Perfil.jsx";
import Edit from "./src/screens/Edit";
import Productos from "./src/screens/Productos";
import { createContext } from "react";

const Stack = createNativeStackNavigator();

export const contextPerfil = createContext();

export default function App() {

  const [perfil, setPerfil] = useState({});

  return (
    <NavigationContainer>
      <contextPerfil.Provider value={{perfil, setPerfil}}>
        <Stack.Navigator>
          <Stack.Screen name ="Register" component={Register}/>
          <Stack.Screen name ="Login" component={LogIn}/> 
          <Stack.Screen name ="Home" component={Home}/>
          <Stack.Screen name ="Perfil" component={Perfil}/> 
          <Stack.Screen name = "Edit" component={Edit}/>
          <Stack.Screen name = "Productos" component={Productos}/>
        </Stack.Navigator>
      </contextPerfil.Provider>
    </NavigationContainer>
    
  );
};