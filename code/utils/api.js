import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = "flashcardsapp:decks"

export function deleteStore(){
  console.log("store deleted")
  AsyncStorage.removeItem(STORAGE_KEY)
}

function setDummyData () {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))
  console.log("store initialized")
  return dummyData

}

export async function getDecks () {
  results = await AsyncStorage.getItem(STORAGE_KEY)
  return results === null
    ? setDummyData()
    : JSON.parse(results)

}

export async function newDeckItem (item){
  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(item), () => {
    
  });
}

export async function newDeckCard(entry){
  var results = await AsyncStorage.getItem(STORAGE_KEY)
  results = JSON.parse(results)
  results[entry.id].questions.concat([{question:entry.question,answer:entry.answer}])
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
}