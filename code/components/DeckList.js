import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { addDeck, addDeckCard } from '../actions'

class DeckList extends React.Component {
  componentDidMount(){
    console.log(this.props)
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