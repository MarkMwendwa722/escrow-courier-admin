import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Parcels from './pages/Parcels'
import Agents from './pages/Agents'
import Vendors from './pages/Vendors'
import Wallets from './pages/Wallets'
import Reports from './pages/Reports'
import Layout from './components/layout/Layout'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <Router>
        <Layout onLogout={handleLogout}>
                      <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/parcels" element={<Parcels />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/wallets" element={<Wallets />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
