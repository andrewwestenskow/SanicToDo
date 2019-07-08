import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Lists from './Components/Lists'
import List from './Components/List'



function App(props) {

  let pic = {
    uri: 'https://i.pinimg.com/originals/ad/3e/03/ad3e031b231cef2d414bb809759b8d17.png'
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SANIC'S awesome to-do app!</Text>
      <Image source={pic} style={styles.image} />
      <Button onPress={() => props.navigation.navigate('Lists')} title='See my Lists' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: 'yellow'
  },
  image: {
    width: 400,
    height: 500
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Lists: Lists,
    List: List
  },
  {
    initialRouteName: "Home",
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default createAppContainer(AppNavigator);
