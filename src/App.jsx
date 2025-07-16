import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { Analytics } from '@vercel/analytics/next'
import Guestbook from './Guestbook'
import PopBalloons from './games/PopBalloons'
import MemoryMatch from './games/MemoryMatch'
import SpinTheWheel from './games/SpinTheWheel'
import './App.css'

function App() {
  const birthday = new Date('2025-07-17T00:00:00')
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [activeGame, setActiveGame] = useState(null)
  const [gameUnlocked, setGameUnlocked] = useState(false)

  function getTimeLeft() {
    const now = new Date()
    const diff = birthday - now
    if (diff <= 0) return null
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 🎉 Update: unlock games on July 17 or 18
  const isBirthday = (() => {
    const now = new Date()
    const month = now.getMonth() // July = 6
    const day = now.getDate()
    return month === 6 && (day === 17 || day === 18)
  })()

  return (
    <div className="App">
      {isBirthday && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <h1>🎉 Welcome to My Birthday! 🎉</h1>

      {timeLeft && !isBirthday ? (
        <div className="countdown">
          <h2>Countdown to the party:</h2>
          <p>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
            {timeLeft.seconds}s
          </p>
        </div>
      ) : (
        <>
          <h2>🎂 The celebration has begun! 🎂</h2>
          <p>Drop a message below and join the party!</p>
          <div className="emoji">🎈🎉🎁🍰</div>

          <Guestbook onMessageSubmit={() => setGameUnlocked(true)} />

          {gameUnlocked && (
            <>
              <h2>🎮 Mini Games</h2>
              <ul className="game-menu">
                <li onClick={() => setActiveGame('balloons')}>
                  🎈 Pop the Balloons
                </li>

                <li onClick={() => setActiveGame('memory')}>🧠 Memory Match</li>
                <li onClick={() => setActiveGame('wheel')}>
                  🎡 Spin the Wheel
                </li>
              </ul>

              {activeGame === 'balloons' && <PopBalloons />}
              {activeGame === 'memory' && <MemoryMatch />}
              {activeGame === 'wheel' && <SpinTheWheel />}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
