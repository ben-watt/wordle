import { Transition } from '@headlessui/react'
import { Cell } from './Cell'

type Props = {
  guess: string,
  length: number
}

export const CurrentRow = ({ guess, length }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(length - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Transition
          show={true}
          appear={true}
          enterFrom='scale-110 duration-200'
          enterTo='scale-100'>
          <Cell key={i} value={letter} />
        </Transition>
       
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
