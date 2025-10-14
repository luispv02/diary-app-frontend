import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { DiaryApp } from './DiaryApp.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <DiaryApp />
  // </StrictMode>,
)
