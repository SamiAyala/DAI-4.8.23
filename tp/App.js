import { React, useState } from "react";
import LogIn from "./src/screens/LogIn.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component={LogIn}/>
        {/* <Stack.Screen name ="Register" component={Register}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};
