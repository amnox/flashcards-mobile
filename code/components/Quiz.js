import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: entryId+' Quiz!'
    }
  }
  constructor(props){
    super(props)
    this.state = {
      current: 0,
      score:0,
      isQuestion:true
    }
    this.flipText = this.flipText.bind(this)
    this.markAnswer = this.markAnswer.bind(this)
  }

  markAnswer(correct) {
    this.setState((prev)=>{
      return{
        current: prev.current+1,
        score: correct ? prev.score+1 : prev.score,
        isQuestion: true
      }
    })
  }

  flipText(){
    this.setState((prev)=>{
      return {
        ...prev,
        isQuestion:prev.isQuestion?false:true
      }
      
    })
  }

  render(){
    const { current, score, isQuestion } = this.state
    const questions = this.props.questions
    return(
      <View>
        {
          current<questions.length 
          ? <View>
            <Text>{(current+1)+'/'+questions.length}</Text>
            <Text>{isQuestion ? questions[current].question : questions[current].answer}</Text>
            <TouchableOpacity onPress={()=>this.flipText()}>
              {isQuestion 
                ? <Text>Show Answer</Text>
                : <Text>Hide Answer</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.markAnswer(true)}>
                <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.markAnswer(false)}>
                <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
          : <View>
            <Text>Test Complete!</Text>
            <Text>You Scored: {score}</Text>
            <TouchableOpacity onPress={()=>this.setState({current: 0,score:0,isQuestion:true})}>
                <Text>Retake</Text>
            </TouchableOpacity>
          </View>
        }
      </View>

    )
  }
}

function mapStateToProps({...data}, { navigation }){
  return {questions:data[navigation.state.params.entryId].questions}
}

export default connect(mapStateToProps)(Quiz)