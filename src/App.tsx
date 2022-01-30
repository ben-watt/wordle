import { InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { WinModal } from './components/modals/WinModal'
import { isWordInWordList, isWinningWord, solution, solutionLength } from './lib/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

const guessLimit = 6;

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }

    if(loaded == null)
      return []

    if (loaded?.guesses.includes(solution)) {
      setIsGameWon(true)
    }

    return loaded.guesses
  })

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  const onChar = (value: string) => {
    if (currentGuess.length < solutionLength && guesses.length < guessLimit) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === solutionLength && guesses.length < guessLimit && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        return setIsGameWon(true)
      }

      if (guesses.length === guessLimit - 1) {
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 10000)
      }
    }
  }

  return (
    <div className="flex flex-col h-full justify-around py-2 max-w-xl mx-auto sm:px-6 lg:px-8">
      <div className="px-5">
        <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
        <Alert
          message={`Oh sweet child. The word was '${solution}'.`}
          isOpen={isGameLost}
        />
        <Alert
          message="Game copied to clipboard"
          isOpen={shareComplete}
          variant="success"
        />
        <div className="flex mx-auto items-center mb-3">
          <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer text-slate-500" onClick={() => setIsInfoModalOpen(true)} />        
          <h1 className=" m-auto w-full text-center text-2xl font-bold tracking-widest">NSFWordle</h1>
          <InformationCircleIcon  className="h-6 w-6 cursor-pointer text-slate-500" onClick={() => setIsAboutModalOpen(true)} />
        </div>
        <hr />
      </div>

      <div className="grow">
        <Grid className="flex justify-center items-center h-full" guesses={guesses} currentGuess={currentGuess} solutionLength={solutionLength} guessLimit={guessLimit} />
      </div>
     
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <div>
        <WinModal
          isOpen={isWinModalOpen}
          handleClose={() => setIsWinModalOpen(false)}
          guesses={guesses}
          handleShare={() => {
            setIsWinModalOpen(false)
            setShareComplete(true)
            return setTimeout(() => {
              setShareComplete(false)
            }, 2000)
          }}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <AboutModal
          isOpen={isAboutModalOpen}
          handleClose={() => setIsAboutModalOpen(false)}
        />
      </div>
    </div>
  )
}

export default App
