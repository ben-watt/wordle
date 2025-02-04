import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { MiniGrid } from '../mini-grid/MiniGrid'
import { shareStatus } from '../../lib/share'
import { XCircleIcon } from '@heroicons/react/outline'
import { formatNextWordMS, nextWordMs } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  handleShare: () => void
}


const winningMessages = [
  "Awesome, now wash your mouth out, you filthy animal!",
  "Well done, you dirty minded sicko.",
  "Greta Thunberg is wondering what you plan to do about your polluted mind.",
  "Impressive! Disgusting, but impressive.",
  "Awesome, in a sickening way. ",
  "Well peel that tangerine and throw it at a baby because you're a terrible human.",
  "Eat soap. Because you're filthy inside.",
  "Just got off the phone with David Attenborough. He said you're a different breed of human. ",
  "Good work, now look in the mirror and have a word with yourself. ",
  "Splendid. You've lost your place in heaven.",
  "I've lost what little respect I had left for you. ",
  "Bravo. Now have a think about what you said.",
  "You did it! By the way covid called, it wants advice on how to be awful.",
  "Correct! I don't know which aisle of B&Q has something for your broken mind.",
  "Filthier than Carol Baskin's past.",
  "Pack your bags and drive straight to hell. Satan's expecting you. ",
  "Were your parents chickens? Because you have fowl language!",
  "If Santa brings you presents this year it's because he feels sorry for you. ",
  "You did it! I get the feeling you weren't hugged enough as a child.",
]

export const WinModal = ({
  isOpen,
  handleClose,
  guesses,
  handleShare,
}: Props) => {

  let [countdown, setCountdown] = useState(nextWordMs());
  let [messageIndex] = useState(Math.floor(Math.random() * winningMessages.length));

  useEffect(() => {
    let timer = setTimeout(() => {
      setCountdown(nextWordMs())
    }, 1000);
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto text-slate-500"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleClose()}
                />
              </div>
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    You won!
                  </Dialog.Title>
                  <p className="text-lg text-gray-500 m-5">
                    {winningMessages[messageIndex]}
                  </p>
                  <div className="m-5">
                    <MiniGrid guesses={guesses} />
                  </div>
                </div>
                <div> 
                  <p className="text-center">Next word in: {formatNextWordMS(countdown)}</p>
                </div>
              </div>
              <div className="mt-2 sm:mt-2">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    shareStatus(guesses)
                    handleShare()
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
