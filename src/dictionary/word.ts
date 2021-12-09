export interface OxfordEntry {
  updated: string[]
  title: string[]
  link: any[]
}

export interface Word {
  title: string
  definition: string
  link?: string
  updated?: string
}

export class Word {
  constructor(worddata: Word) {
    this.title = worddata.title ?? worddata.definition
    this.definition = worddata.definition ?? worddata.title
    this.link = worddata.link
    this.updated = worddata.updated
  }

  /**
   * If the specified entry is updated theday, a Word is returned.
   * @param feedentry 
   * @param theday
   */
  static isWordOfTheDay(feedentry: OxfordEntry, theday: Date = new Date()) {
    const updatedday = new Date(feedentry.updated[0])
    if (updatedday.getFullYear() === theday.getFullYear()
      && updatedday.getMonth() === theday.getMonth()
      && updatedday.getDate() === theday.getDate()) {
      const title = feedentry.title[0];
      const updated = feedentry.updated[0];
      const {href:link} = feedentry.link[0].$;
      const definition = title;
      return new Word({title, updated, link, definition})
    }
    return null
  }
}
