import React from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation'
import KittenList from './Views/kittenList'
import {KittenView} from './Views/kittenview'


const RootStack = createStackNavigator({
  list: {
    screen: KittenList,
    navigationOptions: () => ({
      title: 'Kitten List',
      headerLeft: null
    })
  },
  view: {
    screen: KittenView,
    navigationOptions: () => ({
      title: 'Kitten view',
    })
  },
});

const App = createAppContainer(RootStack);



export default App;