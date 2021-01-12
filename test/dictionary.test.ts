require('dotenv').config()
import {Dictionary} from '../src/dictionary'
import * as fireAdmin from 'firebase-admin'
const serviceAccount = require('./serviceAccount')

const firebaseApp = fireAdmin.initializeApp({
  databaseURL: serviceAccount.databaseURL,
  credential: fireAdmin.credential.cert(serviceAccount),
});
const root = firebaseApp.database().ref();

describe.skip('dictionary', () => {
    const dictionary = new Dictionary(root)
    const theDay = new Date(2020, 11, 16)
    it(`gets word of the day for: ${theDay}`, async () => {
        let word = await dictionary.getWordOfTheDay(theDay)
        expect(word.definition).toBe('graceful')
        console.log(word)
    })
})

describe.skip('dictionary', () => {
  const dictionary = new Dictionary(root)
  const word = {title: 'audit', definition: 'audit', link: 'https://www.oxfordlearnersdictionaries.com/definition/english/audit_1', updated: '2020-12-17T01:00:00Z'}
  it(`save word of the day:${JSON.stringify(word)}`, async () => {
    await dictionary.createWordOfTheDay(word)
    let today = new Date(2020, 11, 17)
    let saved = await dictionary.getWordOfTheDay(today)
    expect(saved).toEqual(word)
  })
})

describe.skip('dictionary', () => {
  const dictionary = new Dictionary(root)
  let lookup = 'graceful'
  it(`look up dictionary for: ${lookup}`, async () => {
      let word = await dictionary.getWord(lookup)
      expect(word.definition).toBe(lookup)
      expect(word.title).toBe(lookup)
      console.log(word)
  })
})

describe.skip('dictionary', () => {
  const dictionary = new Dictionary(root)
  it(`tell how many words have been saved.`, async () => {
      let count = await dictionary.getWordCount()
      expect(count).toBeGreaterThan(0)
      console.log(`the number is :${count}`)
  })
})

describe.skip('dictionary', () => {
  const dictionary = new Dictionary(root)
  it(`attempt to get any word.`, async () => {
      let word = await dictionary.getAnyWord()
      expect(word).toBeTruthy()
      if (word) {
        expect(word.title).toBeTruthy()
        console.log(`the word is :${JSON.stringify(word)}`)
      }
  })
})

describe.skip('dictionary', () => {
  const dictionary = new Dictionary(root)
  it(`attempt to get non-existed word.`, async () => {
      let word = await dictionary.getWord('not-existed')
      expect(word).toBeFalsy()
      if (!word) {
        console.log(`the word is :${word}`)
      }
  })
})
