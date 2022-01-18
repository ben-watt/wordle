import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[],
  currentGuess: string,
  solutionLength: number,
  guessLimit: number
}

export const Grid = ({ guesses, currentGuess, solutionLength, guessLimit }: Props) => {
  const empties =
    guesses.length < guessLimit ? Array.from(Array(guessLimit - guesses.length)) : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < (solutionLength + 1) && <CurrentRow guess={currentGuess} length={solutionLength} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} length={solutionLength} />
      ))}
    </div>
  )
}
