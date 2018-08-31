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
import { white } from '../utils/colors'
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
    deleteStore()
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
      }).catch(err => ToastAndroid.show('Request Failed', ToastAndroid.LONG))
    } else {
      ToastAndroid.show('Please enter a value', ToastAndroid.LONG)
    }
    
  }

  render(){

    return(
      <View style={styles.container}>
        <Text>AddDeck</Text>
        <TextInput value={this.state.title} onChangeText={(value)=>this.handleChange(value)}/>
        <SubmitBtn onPress={()=>this.handleSubmit()}/>
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

function mapStateToProps({ ...decks }){
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)