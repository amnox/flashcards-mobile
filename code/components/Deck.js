import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux'

class Deck extends React.Component {
  render(){
    return(
      <View>
      <Text>Deck</Text>
      </View>
    )
  }
}

function mapStateToProps(data){
  return data
}

export default connect(mapStateToProps)(Deck)