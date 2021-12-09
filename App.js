import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Homescreen from './components/Homescreen';
import Scannerscreen from './components/Scannerscreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Homescreen,
      cardStyle: {backgroundColor: 'transparent'},
    },
    Scanner: {
      screen: Scannerscreen,
    },
  },
  {
    initialRouteName: 'Scanner',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(AppNavigator);
