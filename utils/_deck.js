// Utilities for backfilling the calendar.

import { AsyncStorage } from 'react-native'
import { getFlashcardMetaInfo } from './helpers'

export const DECKS_STORAGE_KEY = 'Flashcards:Decks1'

function setDummyData () {
  let dummyData = getFlashcardMetaInfo();
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData;
}

export function getDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}
