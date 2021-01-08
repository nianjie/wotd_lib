// The database schema

// advantange/disadvantage of this structure:
// +) easy to track down words by dates
// +) give no chance to ignore word that has previously been appeared

// WOTD
//    |
//    |-chronological
//    |  |
//    |  |-2017
//    |  |    |
//    |  |    |-0
//    |  |    | |
//    |  |    | |-1
//    |  |    | | |-word A
//    |  |    | |
//    |  |    | |-2
//    |  |    | | |-word B
//    |  |    | |
//    |  |    | |-...
//    |  |    |   |-word C
//    |  |    |
//    |  |    |-1
//    |  |    | |
//    |  |    | |-1
//    |  |    | | |-word D
//    |  |    | |
//    |  |    | |-...
//    |  |    |    |-word E
//    |  |    |
//    |  |    |-+...
//    |  |
//    |  |-+2016
//    |  |
//    |  |-+20...
//    |
//    |-word
//       |-word A
//       |  |-definition:
//       |  |-link:
//       |  |-updated:
//       |-word B
//       |  |-definition:
//       |  |-link:
//       |  |-updated:
//       |-word ...
//          |-definition:
//          |-link:
//          |-updated:
//
export * from './dictionary'
export * from './word'
