import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}


const appendLeadingZero = (number: number): string => {
  if(number < 10)
    return `0${number}`
  return `${number}`
}

export const getWordOfDay = () => {
  const epochMs = Date.parse("20 Jan 2022")
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const wordOfTheDay =  WORDS[index].toUpperCase()
  const daysPassed = index + 1;
  const nextWordMs = () => (((Date.now() - epochMs) / daysPassed) - msInDay) * -1

  return {
    solution: wordOfTheDay,
    solutionIndex: index,
    solutionLength: wordOfTheDay.length,
    nextWordMs: nextWordMs(),
    nextWordFomatted: () => {
      const ms = nextWordMs();

      return appendLeadingZero(Math.floor((ms % 86400000) / 3600000))
      + ":" + appendLeadingZero(Math.round(((ms % 86400000) % 3600000) / 60000))
      + ":" + appendLeadingZero(Math.round((((ms % 86400000) % 3600000) % 60000) / 1000))
    }
  }
}

export const { solution, solutionIndex, solutionLength, nextWordMs, nextWordFomatted } = getWordOfDay()
