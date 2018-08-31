import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks, deleteStore } from '../utils/api'
import { white, black, blue, grey } from '../utils/colors'

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
      <View style={styles.container}>
        
        
        {
          Object.keys(decks).map((deck)=>{
            return (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.props.navigation.navigate(
                  'Deck',
                  { entryId: deck }
                )}
                key = {deck}
              >
                <Text style={styles.deckName}>{deck}</Text>
                <Text style={styles.cardCount}>Cards: {decks[deck].questions.length}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems:'stretch'
  },
  listItem: {
    borderColor: grey,
    borderWidth: 1,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom:10
  },
  deckName:{
    alignSelf:'center',
    color:blue,
    fontSize: 20
  },
  cardCount:{
    alignSelf:'center',
    color:grey,
    fontSize: 13
  }
})

function mapStateToProps({ ...decks }){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)