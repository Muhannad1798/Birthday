// Guestbook.jsx
import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore'
import db from './firebase'
import './Guestbook.css'

export default function Guestbook({ onMessageSubmit }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updated = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setEntries(updated)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name && message) {
      await addDoc(collection(db, 'guestbook'), {
        name,
        message,
        timestamp: new Date(),
        reactions: 0
      })
      setName('')
      setMessage('')
      if (onMessageSubmit) onMessageSubmit()
    }
  }

  const addReaction = async (id, current) => {
    const ref = doc(db, 'guestbook', id)
    await updateDoc(ref, { reactions: current + 1 })
  }

  return (
    <div className="guestbook">
      <h2>💌 Leave Me a Birthday Message</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send 🎉</button>
      </form>

      {loading && <p>Loading messages...</p>}

      <div className="entries">
        {entries.map((entry) => (
          <div key={entry.id} className="entry">
            <strong>{entry.name}</strong> says:
            <p>“{entry.message}”</p>
            <button onClick={() => addReaction(entry.id, entry.reactions || 0)}>
              ❤️ {entry.reactions || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
