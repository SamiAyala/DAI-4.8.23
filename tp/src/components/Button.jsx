import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button =({onPress,text}) =>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.boton}><Text style={styles.textoBoton}> {text} </Text></TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boton:{
      backgroundColor:"pink",
      borderWidth:2,
      borderColor: "black",
      width: 200, 
      padding: 5,
    },
    textoBoton: {
      fontFamily: " cursive",
      fontSize: 20,
      marginBottom: 10,
      color: "black",
    },
  });
  


export default Button;
