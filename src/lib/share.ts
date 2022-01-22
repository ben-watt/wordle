import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'

export const shareStatus = (guesses: string[]) => {
  const shareText = `NSFWordle ${solutionIndex} ${guesses.length}/6\n\n${generateEmojiGrid(guesses)}\n\n`;

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
    // navigator.share already adds the link so for the clip board we must add it manually
    navigator.clipboard.writeText(shareText + "https://www.nsfwordle.com")
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
