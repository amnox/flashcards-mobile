import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux'

class AddDeck extends React.Component {
  componentDidMount(){
  }
  render(){
    return(
      <View>
      <Text>AddDeck</Text>
      </View>
    )
  }
}

function mapStateToProps(data){
  return data
}

export default connect(mapStateToProps)(AddDeck)