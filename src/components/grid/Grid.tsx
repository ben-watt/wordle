import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
}

const wordLength = 8;
const guessAmount = 5;

export const Grid = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(guessAmount - guesses.length)) : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < (wordLength + 1) && <CurrentRow guess={currentGuess} length={wordLength} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} length={wordLength} />
      ))}
    </div>
  )
}
