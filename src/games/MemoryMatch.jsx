import { useEffect, useState } from 'react'
import './MemoryMatch.css'

const items = ['🎁', '🎂', '🎈', '🎉']
const fullDeck = [...items, ...items]

function shuffle(array) {
  return array
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.val)
}

export default function MemoryMatch() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])

  useEffect(() => {
    setCards(shuffle(fullDeck))
  }, [])

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return
    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped
      if (cards[a] === cards[b]) {
        setMatched([...matched, a, b])
      }
      setTimeout(() => setFlipped([]), 1000)
    }
  }

  return (
    <div className="memory-game">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`card ${
            flipped.includes(i) || matched.includes(i) ? 'flipped' : ''
          }`}
          onClick={() => handleFlip(i)}
        >
          {flipped.includes(i) || matched.includes(i) ? card : '❓'}
        </div>
      ))}
    </div>
  )
}
