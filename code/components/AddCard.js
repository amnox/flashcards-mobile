import React from 'react'
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { newDeckCard } from '../utils/api'
import { addDeckCard } from '../actions'

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
      <View>
        <TextInput onChangeText={(value)=>this.handleQuestionChange(value)} placeholder='Question'/>
        <TextInput onChangeText={(value)=>this.handleAnswerChange(value)} placeholder='Answer'/>
        <TouchableOpacity onPress={()=>this.handleSubmit()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps({...data}, { navigation }){
  return data[navigation.state.params.entryId]
  
}

export default connect(mapStateToProps)(AddCard)