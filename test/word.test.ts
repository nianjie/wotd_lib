import {Word} from '../src/dictionary'

describe.skip('word', () => {
  it('constructor works', () => {
    let data = {title: 'graceful', definition: 'graceful', updated: '2020-12-16T01:00:00Z', link: 'https://www.oxfordlearnersdictionaries.com/definition/english/graceful'}
    const word = new Word(data)
    expect(word.title).toEqual(data.title)
    expect(word.definition).toEqual(data.definition)
  })
})

describe('word', () => {
  it('is word of the day', () => {
    let feedentry = {title: ['graceful'], definition: ['graceful'], updated: ['2021-12-09T01:00:00Z'], link: [{$: {href: 'https://www.oxfordlearnersdictionaries.com/definition/english/graceful'}}]}
    const word = Word.isWordOfTheDay(feedentry)
    expect(word).toBeTruthy()
    if (word) {
      expect(word.title).toEqual(feedentry.title[0])
      expect(word.definition).toEqual(feedentry.definition[0])
      expect(word.link).toEqual(feedentry.link[0].$.href)
    }
  })
})

describe('word', () => {
  it('is not word of the day', () => {
    let feedentry = {title: ['graceful'], definition: ['graceful'], updated: ['2020-12-18T01:00:00Z'], link: [{$: {href: 'https://www.oxfordlearnersdictionaries.com/definition/english/graceful'}}]}
    const word = Word.isWordOfTheDay(feedentry)
    expect(word).toBeFalsy()
  })
})