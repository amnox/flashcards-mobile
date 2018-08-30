import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { addDeck, addDeckCard } from '../actions'

const dummy_data= {
  React: {
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

dummy_update = {
  id:'React',
  question:'do you suck?',
  answer:'nope'
}

class DeckList extends React.Component {
  componentDidMount(){
    console.log(this.props)
    this.props.dispatch(addDeck(dummy_data))
    this.props.dispatch(addDeckCard(dummy_update))
  }
  render(){
    return(
      <View>
        <Text>DECK LISTS</Text>
      </View>
    )
  }
}

function mapStateToProps(data){
  return data
}

export default connect(mapStateToProps)(DeckList)