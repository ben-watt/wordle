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

export const getWordOfDay = () => {
  const epochMs = 1642630551663
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const wordOfTheDay =  WORDS[index].toUpperCase()

  return {
    solution: wordOfTheDay,
    solutionIndex: index,
    solutionLength: wordOfTheDay.length
  }
}

export const { solution, solutionIndex, solutionLength } = getWordOfDay()
