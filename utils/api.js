import { AsyncStorage } from 'react-native'
import { getDeckResults, DECKS_STORAGE_KEY } from './_deck'

export function fetchDeckResults () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(getDeckResults)
}

export function submitDeck ({ title, deck }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: deck
  }))
}

export function removeDeck({ title }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data;
    })
}

export function getDeck({ title }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[title];
    })
}

export function addCardInDeck({ title, card }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title].questions.push(card);
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
