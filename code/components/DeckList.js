import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, deleteStore } from '../utils/api'


class DeckList extends React.Component {
  componentDidMount() {
    getDecks().then((data)=>{
      
      this.props.dispatch(receiveDecks(data))
      //deleteStore()
    })
  }
  render(){
    const decks = this.props.decks
    return(
      <View>
        
        
        {
          Object.keys(decks).map((deck)=>{
            return (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'Deck',
                  { entryId: deck }
                )}
                key = {deck}
              >
                <Text>{deck}</Text>
                <Text>{decks[deck].questions.length}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

function mapStateToProps({ ...decks }){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)