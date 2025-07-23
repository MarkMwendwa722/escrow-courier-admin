import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      // Check localStorage first, then system preference
      const savedTheme = localStorage.getItem('escrow-theme') as Theme
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme
      }
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
      
      return 'light'
    } catch (error) {
      console.error('Error loading theme from localStorage:', error)
      return 'light'
    }
  })

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const applyTheme = () => {
      const root = document.documentElement
      
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('escrow-theme', theme)
      } catch (error) {
        console.error('Error saving theme to localStorage:', error)
      }
    }

    // Apply immediately and also after a small delay
    applyTheme()
    const timeoutId = setTimeout(applyTheme, 100)
    
    return () => clearTimeout(timeoutId)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
