import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home';
import Detail from './screens/detail';

// interface IProduct {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
// }

interface IProps {
  id: number;
  name: string;
  price: string;
  description: string;
  image: any;
}

export type RootStackParamList = {
  Home: undefined;
  Detail: {item: IProps};
};

const RootStack = createStackNavigator<RootStackParamList>();

const Routes = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Detail"
        component={Detail}
        options={{title: 'Detalhe'}}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default Routes;
