import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter is used to enable routing in the application, it wraps the entire application to provide routing capabilities to all components within it. */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>,
)
