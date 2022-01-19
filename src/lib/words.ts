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
  // January 1, 2022 Game Epoch
  // const epochMs = 1641013200000
  // const now = Date.now()
  // const msInDay = 86400000
  //const index = Math.floor((now - epochMs) / msInDay)
  const index = 1;

  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: index,
    solutionLength: WORDS[index].length
  }
}

export const { solution, solutionIndex, solutionLength } = getWordOfDay()
