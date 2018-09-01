import React from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux'
import { white, lightblue, blue, grey } from '../utils/colors'

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
      <View style={styles.container}>
        <Text style={styles.deckName}>{title}</Text>
        <Text style={styles.cardCount}>Cards: {questions.length}</Text>
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
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn2}
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
    padding: 15,
    backgroundColor: white,
    alignItems:'center'
  },
  deckName:{
    alignSelf:'center',
    color:blue,
    fontSize: 35,
    fontWeight:'bold',
    marginTop:15
  },
  cardCount:{
    alignSelf:'center',
    color:grey,
    fontSize: 20,
    marginBottom:30
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
  },
  androidSubmitBtn2: {
    backgroundColor: white,
    borderColor:lightblue,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:25,
    borderWidth: 1,
  }
})

function mapStateToProps({...data}, { navigation }){
  return data[navigation.state.params.entryId]
}

export default connect(mapStateToProps)(Deck)