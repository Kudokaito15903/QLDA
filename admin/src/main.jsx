import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './context/LoginContext.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>,
)
