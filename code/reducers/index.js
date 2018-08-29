import { 
  RECEIVE_DECKS, 
  ADD_DECK, 
  ADD_DECK_CARD 
} from '../actions'

function decks (state={}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.entries
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.entry
      }
    case ADD_DECK_CARD:
      return {
        ...state,
        [action.entry.id] : {
          ...state[action.entry.id],
          questions: state[action.entry.id].questions.concat([{question:action.entry.question,answer:action.entry.answer}])
        }
      }
    default:
      return state
  }
}

export default decks