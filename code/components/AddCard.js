import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux'

class AddCard extends React.Component {
  render(){
    return(
      <View>
      <Text>AddCard</Text>
      </View>
    )
  }
}

function mapStateToProps(data){
  return data
}

export default connect(mapStateToProps)(AddCard)