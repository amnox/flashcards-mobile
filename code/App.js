import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import middleware from './middleware';
import reducer from './reducers';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { blue } from './utils/colors'
import { DeckList, AddDeck } from './components'

const dummy_data= {React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }
}
function AppStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Provider store = { createStore(reducer,middleware) } >
        <View style={{flex:1}}>
          <AppStatusBar backgroundColor={blue} barStyle='light-content'/>
          <DeckList/>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
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
