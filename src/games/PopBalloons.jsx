import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import db from '../firebase'
import './PopBalloons.css'

let id = 0
export default function PopBalloons() {
  const [balloons, setBalloons] = useState([])
  const [score, setScore] = useState(0)
  const [scoresList, setScoresList] = useState([])

  useEffect(() => {
    // Generate balloons every second
    const interval = setInterval(() => {
      const newBalloon = {
        id: id++,
        left: Math.random() * 90,
        delay: Math.random() * 3
      }
      setBalloons((prev) => [...prev, newBalloon])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Real-time leaderboard listener
  useEffect(() => {
    const q = query(collection(db, 'balloonScores'), orderBy('score', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setScoresList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const popBalloon = (id) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id))
    setScore((prev) => prev + 1)
  }

  // Save the current score to Firestore
  const saveScore = async () => {
    if (score === 0) return alert('Pop some balloons first!')
    try {
      await addDoc(collection(db, 'balloonScores'), {
        score,
        timestamp: new Date()
      })
      setScore(0) // reset score after saving
      alert('Score saved! 🎉')
    } catch (error) {
      alert('Error saving score: ' + error.message)
    }
  }

  return (
    <div>
      <div className="balloon-game">
        <p>🎯 Score: {score}</p>
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="balloon"
            style={{
              left: `${balloon.left}%`,
              animationDelay: `${balloon.delay}s`
            }}
            onClick={() => popBalloon(balloon.id)}
          >
            🎈
          </div>
        ))}
      </div>

      <button
        onClick={saveScore}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
      >
        Save Score
      </button>

      <h3>🏆 Leaderboard</h3>
      <ol>
        {scoresList.map(({ id, score }) => (
          <li key={id}>{score} 🎈</li>
        ))}
      </ol>
    </div>
  )
}
