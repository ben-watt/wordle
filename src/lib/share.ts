import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'

export const shareStatus = (guesses: string[]) => {
  const shareText = `NSFWordle ${solutionIndex} ${guesses.length}/6\n\n` 
  + `${generateEmojiGrid(guesses)}\n\nwww.nsfwordle.com`;

  if (navigator.share) {
    navigator.share({
      title: 'NSFWordle',
      text: shareText,
      url: window.location.toString()
    }).then(() => {
      console.debug('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    navigator.clipboard.writeText(shareText)
  }
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
