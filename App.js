import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Lists from './Components/Lists'
import List from './Components/List'



function App() {
  return (
    <Lists/>
  );
}

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Lists: Lists,
    List: List
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions:{
      headerStyle:{
        backgroundColor: 'black'
      },
      headerTintColor: 'white'
    }
    // headerMode: 'none',
    // navigationOptions: {
    //   headerVisible: false,
    // }
  }
);

export default createAppContainer(AppNavigator);
