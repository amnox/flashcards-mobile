import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import middleware from './middleware';
import reducer from './reducers';
import { StyleSheet, View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { blue, white, purple } from './utils/colors'
import { DeckList, AddDeck, Deck } from './components'

function AppStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Your Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-book' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add New',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    }
  }
)

const MainNavigation = createStackNavigator(
  {
    Home: {
      screen:Tabs,
      navigationOptions: {
        header:null
      }
    },
    Deck: {
      screen:Deck,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }
    }
  }
)

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Provider store = { createStore(reducer,middleware) } >
        <View style={{flex:1}}>
          <AppStatusBar backgroundColor={blue} barStyle='light-content'/>
          <MainNavigation/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
