import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { connect } from 'react-redux'

class Quiz extends React.Component {
  render(){
    return(
      <View>
        <Text>Quiz</Text>
      </View>
    )
  }
}

function mapStateToProps(data){
  return data
}

export default connect(mapStateToProps)(Quiz)