import React from 'react'
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { newDeckCard } from '../utils/api'
import { addDeckCard } from '../actions'
import { white, lightblue } from '../utils/colors'

class AddCard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId+': Add Card'
    }
  }

  constructor(props){
    super(props)
    this.state = {
      question: '',
      answer: ''
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleQuestionChange(value) {
    this.setState({
      question:value
    })
  }

  handleAnswerChange(value) {
    this.setState({
      answer:value
    })
  }

  handleSubmit(){
    const question = this.state.question
    const answer = this.state.answer
    if (answer==='' || question===''){
      ToastAndroid.show('Please fill both the fields', ToastAndroid.LONG)
    } else {
      const card = {id:this.props.title, question:question, answer:answer}
      newDeckCard(card)
        .then(this.props.dispatch(addDeckCard(card)))
        .then(ToastAndroid.show('Card created!', ToastAndroid.LONG))
        .catch((err)=>{
          ToastAndroid.show('Sorry, something went wrong, couldnt save card', ToastAndroid.LONG)
          console.log(err)
        })
      
    }
  }

  render(){
    const { title, questions } = this.props
    return(
      <View style={styles.container}>
        <TextInput style={styles.inputBox} onChangeText={(value)=>this.handleQuestionChange(value)} placeholder='Question'/>
        <TextInput style={styles.inputBox} onChangeText={(value)=>this.handleAnswerChange(value)} placeholder='Answer'/>
        <TouchableOpacity style={styles.androidSubmitBtn} onPress={()=>this.handleSubmit()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    alignItems:'center',
  },
  inputBox: {
    alignSelf:'stretch',
    fontSize: 20,
    padding: 20,
    margin:20
  },
  androidSubmitBtn: {
    backgroundColor: lightblue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:25
  }
})

function mapStateToProps({...data}, { navigation }){
  return data[navigation.state.params.entryId]
  
}

export default connect(mapStateToProps)(AddCard)