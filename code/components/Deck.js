import React from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class Deck extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId
    }
  }
  constructor(props){
    super(props)
    this.startQuiz = this.startQuiz.bind(this)
  }

  startQuiz(ques){
    console.log(ques.length)
    if(ques.length > 0){
      this.props.navigation.navigate(
        'Quiz',
        { entryId: this.props.title }
      )
      
    } else {
      ToastAndroid.show('There are no questions in this deck yet', ToastAndroid.LONG)
    }
  }
  
  render(){
    const { title, questions } = this.props
    return(
      <View>
        <Text>{title}</Text>
        <Text>{questions.length}</Text>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={()=>this.props.navigation.navigate(
            'AddCard',
            { entryId: this.props.title }
          )}
        >
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={()=>this.startQuiz(questions)}
        >
          <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function mapStateToProps({...data}, { navigation }){
  return data[navigation.state.params.entryId]
}

export default connect(mapStateToProps)(Deck)