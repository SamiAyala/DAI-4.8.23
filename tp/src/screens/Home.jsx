import { React, useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import Button from "../components/Button";
import axios from "axios";
import { useContext } from "react";
import { contextPerfil } from "../../App";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import CardProducto from "../components/CardProducto";
import { Button } from '@rneui/themed';
import { Header} from "@rneui/base";
import { Icon } from '@rneui/themed';

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

const Home = ({ route }) => {
  const [docSnap, setDocSnap] = useState({});
  const [loading, setLoading] = useState(true);
  const [listProducts, setListProducts] = useState();
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
      axios.get("https://dummyjson.com/products?limit=10&").then((res) => {
        setListProducts(res.data.products);
        console.log("res.data.products", res.data.products);
        setLoading(false);
      });
    };
    fetchData();
  }, []);
  return loading ? (
    <SafeAreaView style={styles.container}>
    <Button title="Solid" type="solid" loading />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <Header
      backgroundColor="gold"
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "Home",
        style: { color: "#fff" }
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: '100%' }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightComponent={<Pressable onPress={()=> typeof context.perfil.NombreUsuario === "undefined" &&
      typeof context.perfil.Apellido === "undefined" ? navigation.navigate("Perfil") : navigation.navigate("Edit")}><img style={{width:'30px',height:'auto'}}  src="https://freesvg.org/img/abstract-user-flat-4.png"></img></Pressable>}
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
      <View style={styles.container}>
        {listProducts.map(product=><CardProducto product={product}></CardProducto>)}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonStyleContainer: {
    padding:'2vh',
    flexDirection:'row',
    justifyContent: "space-around",
  },
  container:{
    flex: 1,
    flexDirection:"Col"
  }
});

export default Home;
