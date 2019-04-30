const queryParams = {
  //  white space between multiple terms, serves as OR methodology and spaces between multiple terms (treated the same)
  multiTerm: {multiTermInput1} + '+' + {multiTermInput2},
  exactMatch: '"' + {exactMatchInput} + '"',
  anyOfThese: {anyOfThese1} + 'OR' + {anyOfThese2},
  noneOfThese: '-' + {noneOfTheseInput},
  range: {
    query: {rangeInput1} + '..' + {rangeInput2},
    unitsOfMeasure: {
      lb: this.query + ' lb'
    }
  },
  languages: [
    {
      language: 'Afrikaans',
      query: 'af'
    },
    {
      language: 'Arabic',
      query: 'ar'
    },
    {
      language: 'Armenian',
      query: 'hy'
    },
    {
      language: 'Belarusian',
      query: 'be'
    },
    {
      language: 'Bulgarian',
      query: 'bg'
    },
    {
      language: 'Croatian',
      query: 'hr'
    },
    {
      language: 'Czech',
      query: 'cs'
    },
    {
      language: 'Danish',
      query: 'da'
    },
    {
      language: 'Dutch',
      query: 'nl'
    },
    {
      language: 'English',
      query: 'en'
    },
    {
      language: 'Esperanto',
      query: 'eo'
    },
    {
      language: 'Estonian',
      query: 'et'
    },
    {
      language: 'Filipino',
      query: 'tl'
    },
    {
      language: 'Finnish',
      query: 'fi'
    },
    {
      language: 'French',
      query: 'fr'
    },
    {
      language: 'German',
      query: 'de'
    },
    {
      language: 'Greek',
      query: 'el'
    },
    {
      language: 'Hebrew',
      query: 'iw'
    },
    {
      language: 'Hungarian',
      query: 'hu'
    },
    {
      language: 'Icelandic',
      query: 'is'
    },
    {
      language: 'Indonesian',
      query: 'id'
    },
    {
      language: 'Italian',
      query: 'it'
    },
    {
      language: 'Japanese',
      query: 'ja'
    },
    {
      language: 'Korean',
      query: 'ko'
    },
    {
      language: 'Latvian',
      query: 'lv'
    },
    {
      language: 'Lithuanian',
      query: 'lt'
    },
    {
      language: 'Norwegian',
      query: 'no'
    },
    {
      language: 'Persian',
      query: 'fa'
    },
    {
      language: 'Polish',
      query: 'pl'
    },
    {
      language: 'Portuguese',
      query: 'pt'
    },
    {
      language: 'Romanian',
      query: 'ro'
    },
    {
      language: 'Russian',
      query: 'ru'
    },
    {
      language: 'Serbian',
      query: 'sr'
    },
    {
      language: 'Slovak',
      query: 'sk'
    },
    {
      language: 'Slovenian',
      query: 'sl'
    },
    {
      language: 'Spanish',
      query: 'es'
    },
    {
      language: 'Swedish',
      query: 'sv'
    },
    {
      language: 'Thai',
      query: 'th'
    },
    {
      language: 'Turkish',
      query: 'tr'
    },
    {
      language: 'Ukrainian',
      query: 'uk'
    },
    {
      language: 'Vietnamese',
      query: 'vi'
    },
    {
      language: 'Chinese Simplified',
      query: 'zh-CN'
    },
    {
      language: 'Chinese Traditional',
      query: 'zh-TW'
    }
  ],


}