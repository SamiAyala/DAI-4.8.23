
import { Text, Card, Button, Overlay } from '@rneui/themed';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const CardProducto = (props) => {
  const [visible, setVisible] = useState(false);
  console.log("props",props);
  let p = props.product;

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  
    return (
      <Card>
      <Card.Title>{p.title}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{ padding: 0 }}
        source={p.thumbnail}
      />
      <Card.Divider />
      <Text id='desc' style={{ marginBottom: 10 }}>
        {p.description}
      </Text>
      <Card.Divider />
      <View style={{flexDirection: 'row'}}>
      <Text id='precio' style={{fontWeight:'bold'}}>
        ${p.price} %{p.discountPercentage}
        </Text><Text id='marca' style={{marginLeft:'auto',color:'gray'}}>{p.brand}</Text>
      </View>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        onPress={toggleOverlay}
        title="Ver más"
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text style={styles.textPrimary}>Hello!</Text>
      <Text style={styles.textSecondary}>
        Welcome to React Native Elements
      </Text>
      <Button
        title="Close"
        onPress={toggleOverlay}
      />
    </Overlay>
    </Card>
    )
}
const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  });
export default CardProducto;