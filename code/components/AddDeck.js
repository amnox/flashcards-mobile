import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ToastAndroid
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux';
import { white, lightblue } from '../utils/colors'
import { addDeck } from '../actions'
import { newDeckItem, deleteStore } from '../utils/api'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.initializeDeck = this.initializeDeck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    //deleteStore()
  }

  handleChange(value) {
    this.setState({
      title: value
    })
  }

  initializeDeck(){
    const title = this.state.title
    var obj = {};
    obj[title] = {
      questions: [],
      title: title
    }
    return obj
  }

  handleSubmit() {
    const newDeck = this.initializeDeck()
    if(this.state.title!==''){
      newDeckItem(newDeck).then(()=>{
        this.props.dispatch(addDeck(newDeck))
        ToastAndroid.show(this.state.title+' deck created', ToastAndroid.LONG)
        this.setState({title: ''})
      }).catch(err => ToastAndroid.show('Request Failed', ToastAndroid.LONG))
    } else {
      ToastAndroid.show('Please enter a value', ToastAndroid.LONG)
    }
    
  }

  render(){

    return(
      <View style={styles.container}>
        <Text style={{fontSize:25}}>Enter the name of New Deck</Text>
        <TextInput style={styles.inputBox} textAlign={'center'} placeholder="My Deck" value={this.state.title} onChangeText={(value)=>this.handleChange(value)}/>
        <SubmitBtn onPress={()=>this.handleSubmit()}/>
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
    justifyContent:'center'
  },
  inputBox: {
    alignSelf:'stretch',
    fontSize: 20,
    padding: 20,
    margin:20
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
  }
})

function mapStateToProps({ ...decks }){
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)