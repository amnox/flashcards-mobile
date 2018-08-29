export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'

export function receiveDecks (entries){
    return {
        type: RECEIVE_DECKS,
        entries
    }
}

export function addDeck (entry){
    return {
        type: ADD_DECK,
        entry
    }
}

export function addDeckCard (entry){
    return {
        type: ADD_DECK_CARD,
        entry
    }
}