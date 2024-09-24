import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './components/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
