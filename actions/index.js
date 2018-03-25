export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const GET_DECK = 'GET_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addCard (deck) {
  return {
    type: ADD_CARD,
    deck
  }
}

export function receiveDeck (deck) {
  return {
    type: GET_DECK,
    deck
  }
}
