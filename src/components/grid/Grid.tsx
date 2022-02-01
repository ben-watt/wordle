import { Transition } from '@headlessui/react'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[],
  currentGuess: string,
  solutionLength: number,
  guessLimit: number
  className: string,
}

export const Grid = ({ className = "", guesses, currentGuess, solutionLength, guessLimit }: Props) => {
  const numberofEmpties = guessLimit - (guesses.length + 1);
  const empties = guesses.length < guessLimit ? Array.from(Array(numberofEmpties)) : [];

  return (
    <div className={`pb-6 ${className}`}>
      <div>
        {guesses.map((guess, i) => (
            <CompletedRow key={i} guess={guess} />          
        ))}
        {guesses.length < guessLimit && <CurrentRow guess={currentGuess} length={solutionLength} />}
        {empties.map((_, i) => (
          <EmptyRow key={i} length={solutionLength} />
        ))}
      </div>
    </div>
  )
}
