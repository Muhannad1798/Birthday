import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.jsx'

createRoot(document.querySelector('#root')).render(<App />)
