import React from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { white, lightblue, blue, grey, black } from '../utils/colors'

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
      <View style={{flex: 1}}>
        {
          current<questions.length 
          ? <View style={styles.container}>
            <Text style={{alignSelf:'flex-start'}}>{(current+1)+'/'+questions.length}</Text>
            <Text style={isQuestion?styles.questionText:styles.answerText}>{isQuestion ? questions[current].question : questions[current].answer}</Text>
            <TouchableOpacity onPress={()=>this.flipText()}>
              {isQuestion 
                ? <Text style={{color:'red'}}>Show Answer</Text>
                : <Text style={{color:'red'}}>Hide Answer</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.correctBtn} onPress={()=>this.markAnswer(true)}>
                <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.incorrectBtn} onPress={()=>this.markAnswer(false)}>
                <Text>Incorrect</Text>
            </TouchableOpacity>
          </View>
          : <View style={styles.container}>
            <Text style={styles.questionText}>Test Complete!</Text>
            <Text style={styles.answerText}>You Scored: {score}</Text>
            <TouchableOpacity style={styles.iosSubmitBtn} onPress={()=>this.setState({current: 0,score:0,isQuestion:true})}>
                <Text>Retake</Text>
            </TouchableOpacity>
          </View>
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: white,
    alignItems:'center',
    
  },
  questionText:{
    alignSelf:'center',
    color:black,
    fontSize: 35,
    fontWeight:'bold',
    margin:15
  },
  answerText:{
    alignSelf:'center',
    color:'green',
    fontSize: 25,
    margin:15
  },
  
  iosSubmitBtn: {
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
  },
  correctBtn: {
    backgroundColor: white,
    borderColor:'green',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:25,
    borderWidth: 2,
  },
  incorrectBtn: {
    backgroundColor: white,
    borderColor:'red',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:25,
    borderWidth: 2,
  }
})

function mapStateToProps({...data}, { navigation }){
  return {questions:data[navigation.state.params.entryId].questions}
}

export default connect(mapStateToProps)(Quiz)