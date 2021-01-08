import { Word } from "./word"
import {crypto} from './crypto'

export class Dictionary {
  constructor(private root: any) {
    if (!root) {
      throw new Error(`${root} is not provided.`)
    }
  }

  /**
   * Save the specified word.
   * @param theDay
   * @param worddata
   */
  async createWordOfTheDay(worddata: Word, theDay: Date = new Date()) {
    // save to firebase under location of ROOT/chronological/YYYY/MM/DD
    const location = `${theDay.getFullYear()}/${theDay.getMonth()}/${theDay .getDate()}` // eslint-disable-line
    const chroSnap = await this.root.child(`chronological/${location}/`).once('value')
    if (!chroSnap.exists()) {
      await chroSnap.ref.set(worddata.title)
      // then save other detail attributes under ROOT/word
      const wordSnap = await this.root.child(`word/${worddata.title}`).once('value')
      if (!wordSnap.exists()) {
        // prevent property of title is saved again.
        let {definition, link, updated} = worddata
        wordSnap.ref.set({definition, link, updated})
      }
    }
  }

  /**
   * Get word of the day.
   * If theDay not specified, today is used.
   * @param theDay
   */
  async getWordOfTheDay(theDay:Date = new Date()) : Promise<Word> {
    const location = `${theDay.getFullYear()}/${theDay.getMonth()}/${theDay.getDate()}`
    let word = await this.lookupWordInChronological(location)
    return word
  }

  /**
   * Look up definition from this dictionary.
   * @param word 
   */
  async getWord(word: string) : Promise<Word>{
    return await this.lookupWord(word)
  }

  /**
   * Get any word.
   * This is implemented by randomly choosing one day in the past,
   * then corresponding word is returned, which was saved on that day.
   */
  async getAnyWord() : Promise<Word | null>{
    const maxLoop = 10

    const today = new Date();
    let word = null, randomDay, counter = 0
    do {
      console.log(`start to attempt getAnyWord [${counter++}].`)
      const year = crypto.randomInt(2017, today.getFullYear() + 1)
      const month = crypto.randomInt(0, 11 + 1)
      const day = crypto.randomInt(1, 31 + 1)
      randomDay = new Date(year, month, day)
      console.log(`random day: ${randomDay}.`)
      if (counter > maxLoop) {
        console.log(`attempt is suspended as the number of attempts exceeded maximum ${maxLoop}.`)
        break
      }
    } while(!(word = await this.getWordOfTheDay(randomDay)))

    return word
  }

  /**
   * Get number of total words this dictionary has saved.
   */
  async getWordCount() {
    return await this.root.child('word')
    .once('value')
    .then((snap: { numChildren: () => any; }) => snap.numChildren())
  }

  private async lookupWordInChronological(location: string) : Promise<Word>{
    let latest = await this.root.child(`chronological/${location}`).once('value').then( (latestsnap: { val: () => any; }) => latestsnap.val())
    let result = null
    if (latest) {
      result = this.lookupWord(latest)
    } else {
      // deal with the case the latest word not exist yet,
      // and if so null instead of exception is returned.
      console.log(`No value saved under :ROOT/chronological/${location}.`);
      result = Promise.resolve(null)
    }
    return result
  }

  private lookupWord(word: string) {
    return this.root.child('word')
      .child(word)
      .once('value')
      .then(
        (wordsnap: { val: () => any; }) => {
          if (wordsnap.val()) {
            return new Word(wordsnap.val())
          } else {
            return null
          }
        }
      )
  }
}
