import { useState } from 'react'
import './SpinTheWheel.css'

const options = [
  'a song 🎶',
  'a joke 😂',
  'Funny video 📹',
  'meme 🎨',
  'a Compliment 💖'
]

export default function SpinTheWheel() {
  const [result, setResult] = useState(null)
  const [spinning, setSpinning] = useState(false)

  const spin = () => {
    setSpinning(true)
    setResult(null)
    setTimeout(() => {
      const choice = options[Math.floor(Math.random() * options.length)]
      setResult(choice)
      setSpinning(false)
    }, 2000)
  }

  return (
    <div className="spin-wheel">
      <div className="wheel">
        {spinning ? 'Spinning...' : result || '🎡 Spin Me!'}
      </div>
      <button className="spin-btn" onClick={spin} disabled={spinning}>
        Spin
      </button>
      {result && (
        <p>
          Send me: <strong>{result}</strong>
        </p>
      )}
    </div>
  )
}
