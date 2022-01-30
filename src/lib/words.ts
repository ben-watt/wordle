import { WORDS } from '../constants/wordlist'

export const isWordInWordList = async (word: string) => {
  
  let VALIDGUESSES = getValidGuessesFromStorage();
  if(VALIDGUESSES === null) {
    let importedGuesses = await import( '../constants/validGuesses');
    setValidGuessesInStorage(importedGuesses.VALIDGUESSES);
    VALIDGUESSES = importedGuesses.VALIDGUESSES
  }


  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

const getValidGuessesFromStorage = () : string[] => {
  return JSON.parse(localStorage.getItem("validGuesses"));
}

const setValidGuessesInStorage = (validGuesses : string[]) => {
  localStorage.setItem("validGuesses", JSON.stringify(validGuesses));
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

  return {
    solution: wordOfTheDay,
    solutionIndex: index,
    solutionLength: wordOfTheDay.length,
    nextWordMs: () => ((Date.now() - epochMs) - (daysPassed * msInDay)) * -1,
    formatNextWordMS: (nextWordMS: number) => {
      let millisecondsInDay = 86400000
      let millisecondsInHour = 3600000
      let millisecondsInMinute = 60000
      let millisecondsInSecond = 1000

      return appendLeadingZero(Math.floor((nextWordMS % millisecondsInDay) / millisecondsInHour))
      + ":" + appendLeadingZero(Math.round(((nextWordMS % millisecondsInDay) % millisecondsInHour) / millisecondsInMinute))
      + ":" + appendLeadingZero(Math.round((((nextWordMS % millisecondsInDay) % millisecondsInHour) % millisecondsInMinute) / millisecondsInSecond))
    }
  }
}

export const { solution, solutionIndex, solutionLength, nextWordMs, formatNextWordMS } = getWordOfDay()
