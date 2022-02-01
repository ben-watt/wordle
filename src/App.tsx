import { CogIcon, InformationCircleIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline'
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
import { Transition } from '@headlessui/react'

const guessLimit = 6;

function App() {
  const [settingsOpen, setIsSettingsOpen] = useState(true)

  return (
    <div className="h-full py-2 max-w-xl sm:px-6 lg:px-8 mx-auto">
       <PageTransition
          className="h-full flex flex-col justify-between"
          show={!settingsOpen} >
          <GameView setIsSettingsOpen={setIsSettingsOpen} />
      </PageTransition>
      <PageTransition
        className="h-full flex flex-col justify-between"
        show={settingsOpen}>
           <SettingsView onClose={() => setIsSettingsOpen(false)} />
      </PageTransition>
    
    </div>
  )
}

const PageTransition = ({ className, show, children }) => {
  return (
    <Transition
    className={className}
    show={show}
    enter="transition-opacity duration-500"
    enterFrom='opacity-0 translate-y-20'>
      {children}
  </Transition>
  )
}

const SettingsView = ({ onClose }) => {
  return (
    <div>
      <div>
        <SettingsTitle text="Settings" onClose={() => onClose(false)} />
      </div>
      <div className="flex justify-between py-2">
        <div>
          <p>Dark Theme</p>
        </div>
        <div>
          <Toggle id="darkTheme" />
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div>
          <p>High Contrast</p>
        </div>
        <div>
          <Toggle id="highContrast" />
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div>
          <p>Hard Mode</p>
        </div>
        <div>
          <Toggle id="hardMode" />
        </div>
      </div>
      <div className="flex justify-between py-2">
        <div>
          <p>Feedback</p>
        </div>
        <div>
          <p><a href="mailto:ben.watt@gmail.com">Email</a> | <a href="https://github.com/users/ben-watt/projects/2/views/1">Feature Requets | Bugs</a></p>
        </div>
      </div>
    </div>
  )
}

const Toggle = ({ id }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="mb-3">
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input type="checkbox" name="toggle" id={id} onChange={() => setIsActive(!isActive)} className="outline-none focus:outline-none right-5 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-gray-400 appearance-none cursor-pointer"/>
        <label htmlFor={id} className={`block overflow-hidden h-6 rounded-full cursor-pointer duration-200 ease-in ${isActive ? "bg-pink-400" : "bg-gray-300" }`} />
      </div>
    </div>
  )
}

const GameView = ({ setIsSettingsOpen }) => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
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

  const onEnter = async () => {
    var isValidGuess = await isWordInWordList(currentGuess)
    if (!isValidGuess) {
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
    <>
      <div>
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
        <Title text="NSFWordle" setIsSettingsOpen={setIsSettingsOpen} />
      </div>

      <div className="grow">
        <Grid className="flex justify-center items-center h-full" isWordNotFoundAlertOpen={isWordNotFoundAlertOpen} guesses={guesses} currentGuess={currentGuess} solutionLength={solutionLength} guessLimit={guessLimit} />
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
      </div>
    </>
  )
}

const Title = ({ text, setIsSettingsOpen }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

  return (
    <>
      <div className="flex mx-auto items-center mb-3">
        <QuestionMarkCircleIcon className="h-6 w-6 cursor-pointer text-slate-500" onClick={() => setIsInfoModalOpen(true)} />        
        <h1 className="m-auto w-full text-center text-2xl font-bold tracking-widest">{text}</h1>
        <InformationCircleIcon  className="h-6 w-6 cursor-pointer text-slate-500" onClick={() => setIsAboutModalOpen(true)} />
        <CogIcon className="h-6 w-6 cursor-pointer text-slate-500 hover:rotate-90 duration-500" onClick={() => setIsSettingsOpen(true)} />
        <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
        <AboutModal
          isOpen={isAboutModalOpen}
          handleClose={() => setIsAboutModalOpen(false)}
        />
      </div>
      <hr />
    </>
  )
}



const SettingsTitle = ({ text, onClose }) => {
  return (
    <>
      <div className="flex mx-auto items-center mb-3">      
        <h1 className="m-auto w-full text-center text-2xl font-bold tracking-widest">{text}</h1>
        <XIcon className="h-6 w-6 cursor-pointer text-slate-500 hover:rotate-90 duration-500" onClick={onClose} />        
      </div>
      <hr />
    </>
  )
}

export default App
